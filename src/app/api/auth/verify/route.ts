import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";

/**
 * POST /api/auth/verify — xác thực OTP token_hash từ email.
 *
 * Tách khỏi GET /auth/confirm để chống email-scanner prefetch: scanner chỉ
 * GET trang HTML (không chạy JS), còn verify thật chỉ chạy khi trình duyệt
 * thực thi JS rồi POST tới đây → token một-lần không bị tiêu thụ trước.
 */
export async function POST(request: NextRequest) {
  let body: { token_hash?: string; type?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }

  const token_hash = body.token_hash;
  const type = body.type as EmailOtpType | undefined;

  if (!token_hash || !type) {
    return NextResponse.json({ error: "Thiếu thông tin xác thực" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({ type, token_hash });

  if (error || !data?.user) {
    return NextResponse.json(
      { error: "Link xác thực không hợp lệ hoặc đã hết hạn." },
      { status: 400 }
    );
  }

  const admin = await createAdminClient();
  const userId = data.user.id;

  // Cập nhật last_login cho mọi user xác thực thành công
  await admin
    .from("profiles")
    .update({ last_login: new Date().toISOString() })
    .eq("id", userId);

  // Các tác vụ sau khi xác nhận đăng ký
  if (type === "signup") {
    // Auto-enroll khoá học miễn phí (nếu có)
    const { data: freeProduct } = await admin
      .from("products")
      .select("id")
      .eq("price", 0)
      .limit(1)
      .single();
    if (freeProduct) {
      try {
        await admin.from("enrollments").upsert(
          { user_id: userId, product_id: freeProduct.id, source: "free" },
          { onConflict: "user_id,product_id" }
        );
      } catch {}
    }

    // Cộng XP đăng ký
    try {
      await admin.from("xp_events").insert({
        user_id: userId,
        action: "register",
        xp_amount: 100,
      });
    } catch {}

    // Gửi email chào mừng
    try {
      const { data: profile } = await admin
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .single();
      const { sendWelcomeEmail } = await import("@/lib/email/transactional");
      await sendWelcomeEmail(data.user.email || "", profile?.full_name || "bạn").catch(() => {});
    } catch {}
  }

  return NextResponse.json({ success: true });
}
