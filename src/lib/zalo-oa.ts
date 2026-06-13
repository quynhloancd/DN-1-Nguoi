/**
 * Zalo OA Integration
 *
 * ENV vars required:
 *   ZALO_OA_ACCESS_TOKEN  - OA access token (from Zalo OA Dashboard)
 *   ZALO_OA_APP_ID        - Zalo app ID
 *   ZALO_OA_SECRET_KEY    - Zalo app secret key
 *   ZALO_OA_REFRESH_TOKEN - For token refresh
 *
 * Docs: https://developers.zalo.me/docs/official-account
 */

const ZALO_API_BASE = "https://openapi.zalo.me/v3.0/oa";

interface ZaloMessageResult {
  success: boolean;
  error?: string;
  message_id?: string;
}

// Get access token (with auto-refresh logic)
async function getAccessToken(): Promise<string | null> {
  return process.env.ZALO_OA_ACCESS_TOKEN || null;
}

// Send text message to a Zalo user (who follows the OA)
export async function sendZaloMessage(
  zaloUserId: string,
  text: string
): Promise<ZaloMessageResult> {
  const token = await getAccessToken();
  if (!token) return { success: false, error: "ZALO_OA_ACCESS_TOKEN not configured" };

  try {
    const res = await fetch(`${ZALO_API_BASE}/message/cs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: token,
      },
      body: JSON.stringify({
        recipient: { user_id: zaloUserId },
        message: { text },
      }),
    });
    const data = await res.json();
    if (data.error === 0) {
      return { success: true, message_id: data.data?.message_id };
    }
    return { success: false, error: data.message || `Zalo error ${data.error}` };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

// Send purchase confirmation
export async function sendPurchaseNotification(
  zaloUserId: string,
  customerName: string,
  productName: string,
  amount: number,
  orderCode: string
): Promise<ZaloMessageResult> {
  const text = `Xác nhận thanh toán thành công!

Xin chào ${customerName},

Đơn hàng của bạn đã được xác nhận:
Sản phẩm: ${productName}
Số tiền: ${amount.toLocaleString("vi-VN")}đ
Mã đơn: ${orderCode}

Quyền truy cập đã được kích hoạt. Hãy đăng nhập để bắt đầu học ngay!

Cảm ơn bạn đã tin tưởng!`;

  return sendZaloMessage(zaloUserId, text);
}

// Send welcome notification (after registration)
export async function sendWelcomeNotification(
  zaloUserId: string,
  name: string
): Promise<ZaloMessageResult> {
  const text = `Chào mừng ${name} đến với nền tảng!

Tài khoản của bạn đã được tạo thành công. Hãy khám phá các khóa học và bắt đầu hành trình học tập ngay nhé!

Mẹo: Theo dõi OA để nhận thông báo khi có khóa học mới hoặc khuyến mãi đặc biệt.`;

  return sendZaloMessage(zaloUserId, text);
}

// Send new lesson notification
export async function sendNewLessonNotification(
  zaloUserId: string,
  courseName: string,
  lessonName: string
): Promise<ZaloMessageResult> {
  const text = `Bài học mới!

Khóa học "${courseName}" vừa cập nhật bài học mới:
${lessonName}

Đăng nhập ngay để học bài mới nhé!`;

  return sendZaloMessage(zaloUserId, text);
}

// Send study reminder
export async function sendStudyReminder(
  zaloUserId: string,
  name: string,
  courseName: string,
  progressPercent: number
): Promise<ZaloMessageResult> {
  const text = `Nhắc nhở học tập

Xin chào ${name},

Bạn đã hoàn thành ${progressPercent}% khóa học "${courseName}". Hãy dành chút thời gian để tiếp tục học nhé!

Kiên trì là chìa khóa thành công!`;

  return sendZaloMessage(zaloUserId, text);
}

// Check if Zalo OA is configured
export function isZaloOAConfigured(): boolean {
  return !!process.env.ZALO_OA_ACCESS_TOKEN;
}
