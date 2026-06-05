import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const BookingSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên").max(100),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ").max(15),
  business: z.string().min(2, "Vui lòng mô tả lĩnh vực kinh doanh").max(200),
  preferredTime: z.string().min(2, "Vui lòng chọn thời gian mong muốn").max(200),
  message: z.string().min(10, "Vui lòng mô tả ngắn vấn đề bạn muốn giải quyết").max(2000),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = await rateLimit(`booking:${ip}`, 3, 3600); // max 3/hour per IP
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Quá nhiều yêu cầu. Vui lòng thử lại sau." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = BookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { name, email, phone, business, preferredTime, message } = parsed.data;

  const submittedAt = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const bookingData = { name, email, phone, business, preferredTime, message, submittedAt };

  // Fire-and-forget emails — don't block response on email failure
  try {
    const { sendBookingNotificationToAdmin, sendBookingConfirmationToUser } =
      await import("@/lib/email/transactional");
    await Promise.allSettled([
      sendBookingNotificationToAdmin(bookingData),
      sendBookingConfirmationToUser(bookingData),
    ]);
  } catch {
    // Email errors are non-critical — booking is still recorded
    console.error("[Booking] Email send failed");
  }

  return NextResponse.json({ success: true });
}
