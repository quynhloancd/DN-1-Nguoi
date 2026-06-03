import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";
import { sendLeadMagnetEmail } from "@/lib/email/transactional";

const SubscribeSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  name: z.string().min(1).max(100).optional(),
  phone: z.string().max(20).optional(),
  source: z.string().max(100).optional(),
  tags: z.array(z.string()).optional(),
});

// POST /api/subscribe — public newsletter subscription (no auth required)
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const rateLimitResult = await rateLimit(`subscribe:${ip}`, 5, 60);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Quá nhiều yêu cầu. Vui lòng thử lại sau." },
      { status: 429, headers: { "Retry-After": String(rateLimitResult.retryAfterSec) } }
    );
  }

  try {
    const body = await req.json();

    const parseResult = SubscribeSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, name, phone, source, tags: customTags } = parseResult.data;

    const normalizedEmail = email.trim().toLowerCase();
    const supabase = await createAdminClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("email", normalizedEmail)
      .single();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json(
          { error: "Email này đã được đăng ký rồi." },
          { status: 409 }
        );
      }

      // Re-activate if previously unsubscribed
      const { error: updateError } = await supabase
        .from("subscribers")
        .update({
          status: "active",
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null,
        })
        .eq("id", existing.id);

      if (updateError) {
        console.error("Reactivate subscriber error:", updateError.message);
        return NextResponse.json(
          { error: "Có lỗi xảy ra. Vui lòng thử lại." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Đăng ký thành công! Chào mừng bạn quay lại.",
      });
    }

    // Insert new subscriber
    const subscriberTags = customTags && Array.isArray(customTags) ? customTags : ["newsletter"];
    const { data: subscriber, error: insertError } = await supabase
      .from("subscribers")
      .insert({
        email: normalizedEmail,
        full_name: name || null,
        phone: phone || null,
        status: "active",
        source: source || "blog_newsletter",
        tags: subscriberTags,
        subscribed_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert subscriber error:", insertError.message);
      return NextResponse.json(
        { error: "Có lỗi xảy ra. Vui lòng thử lại." },
        { status: 500 }
      );
    }

    // Try to add to a default newsletter list (best-effort, don't fail if list doesn't exist)
    if (subscriber) {
      const { data: defaultList } = await supabase
        .from("email_lists")
        .select("id")
        .ilike("name", "%newsletter%")
        .limit(1)
        .single();

      if (defaultList) {
        await supabase.from("subscriber_list_members").insert({
          subscriber_id: subscriber.id,
          list_id: defaultList.id,
          added_at: new Date().toISOString(),
        });
      }
    }

    // Send lead magnet email (best-effort, don't block response)
    sendLeadMagnetEmail(normalizedEmail, name).catch((err) => {
      console.error("sendLeadMagnetEmail error:", err);
    });

    return NextResponse.json(
      { message: "Đăng ký thành công! Cảm ơn bạn đã theo dõi." },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/subscribe error:", err);
    return NextResponse.json(
      { error: "Có lỗi xảy ra. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
