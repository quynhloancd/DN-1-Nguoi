import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";

/**
 * GET /auth/confirm — xác thực email NGAY trên server khi user bấm link.
 *
 * Verify server-side (không phụ thuộc JS trình duyệt — tương thích mọi
 * trình duyệt/email client). Có fallback type=signup nếu param bị hỏng do
 * email client encode `&amp;` sai.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  // token_hash có thể bị dính tiền tố nếu client encode `&amp;` sai
  const token_hash =
    searchParams.get("token_hash") || searchParams.get("amp;token_hash") || null;

  // type: lấy từ param, fallback "signup" (các link này đều là xác nhận đăng ký)
  const rawType =
    searchParams.get("type") || searchParams.get("amp;type") || "signup";
  const type = rawType as EmailOtpType;

  const rawNext =
    searchParams.get("next") || searchParams.get("amp;next") || "/dashboard";
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") && !rawNext.includes("://")
      ? rawNext
      : "/dashboard";

  if (token_hash) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error && data?.user) {
      const admin = await createAdminClient();
      const userId = data.user.id;

      await admin
        .from("profiles")
        .update({ last_login: new Date().toISOString() })
        .eq("id", userId);

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

        try {
          await admin
            .from("xp_events")
            .insert({ user_id: userId, action: "register", xp_amount: 100 });
        } catch {}

        try {
          const { data: profile } = await admin
            .from("profiles")
            .select("full_name")
            .eq("id", userId)
            .single();
          const { sendWelcomeEmail } = await import("@/lib/email/transactional");
          await sendWelcomeEmail(data.user.email || "", profile?.full_name || "bạn").catch(
            () => {}
          );
        } catch {}
      }

      // Xác thực + đăng nhập thành công → vào hệ thống
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Token sai/hết hạn/đã dùng → về login kèm thông báo (tài khoản có thể đã
  // được xác thực trước đó, user chỉ cần đăng nhập).
  return NextResponse.redirect(
    `${origin}/login?message=${encodeURIComponent(
      "Link xác thực đã hết hạn hoặc đã được dùng. Nếu đã xác thực, vui lòng đăng nhập. Nếu chưa, bấm 'Gửi lại email xác nhận'."
    )}`
  );
}
