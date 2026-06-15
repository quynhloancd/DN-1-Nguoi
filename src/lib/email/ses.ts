/**
 * Email Client — powered by Resend (gọi thẳng HTTP API, KHÔNG dùng SDK)
 *
 * Lưu ý: file vẫn tên `ses.ts` để giữ nguyên các import hiện có, nhưng
 * bên trong dùng Resend (hạ tầng email thật: domain doanhnghiep1nguoi.online
 * đã verify trên Resend, sender noreply@...).
 *
 * Vì sao gọi HTTP API trực tiếp thay vì SDK `resend`: bản SDK mới thêm
 * validation phía client từ chối display name non-ASCII ("Doanh Nghiệp 1
 * Người") → "Invalid from field...". HTTP API của Resend chấp nhận non-ASCII
 * bình thường, nên gọi trực tiếp để tránh phụ thuộc version SDK.
 *
 * Env cần: RESEND_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME
 */

import type {
  SendEmailParams,
  BulkEmailEntry,
  SendResult,
  BulkSendResult,
} from "./types";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function getApiKey(): string {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("Missing RESEND_API_KEY. Cần có RESEND_API_KEY trong env để gửi email.");
  }
  return key;
}

/** Lấy địa chỉ From đầy đủ: "Tên <email>" */
function getFromAddress(): string {
  const email = process.env.EMAIL_FROM || "noreply@doanhnghiep1nguoi.online";
  const name = process.env.EMAIL_FROM_NAME || "Doanh Nghiệp 1 Người";
  return `${name} <${email}>`;
}

interface ResendPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text?: string;
  reply_to?: string;
  headers?: Record<string, string>;
  tags?: Array<{ name: string; value: string }>;
}

/** Resend tag name/value chỉ cho phép ASCII chữ/số/_/-; chuẩn hoá để không bị reject */
function sanitizeTags(
  tags?: Record<string, string>
): Array<{ name: string; value: string }> | undefined {
  if (!tags) return undefined;
  const clean = (s: string) => s.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 256);
  return Object.entries(tags).map(([name, value]) => ({
    name: clean(name),
    value: clean(value),
  }));
}

/** Gửi 1 request tới Resend HTTP API */
async function postResend(payload: ResendPayload): Promise<SendResult> {
  const recipient = payload.to.join(", ");
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      error?: string;
      name?: string;
    };

    if (!res.ok) {
      const message = data?.message || data?.error || data?.name || `Resend HTTP ${res.status}`;
      console.error(`[Resend] Gửi email thất bại đến ${recipient}:`, message);
      return { success: false, error: message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lỗi không xác định khi gửi email";
    console.error(`[Resend] Gửi email thất bại đến ${recipient}:`, message);
    return { success: false, error: message };
  }
}

// ─── Send Single Email ───────────────────────────────────────

/**
 * Gửi 1 email qua Resend
 * @returns Resend message ID nếu thành công
 */
export async function sendEmail(
  to: string,
  subject: string,
  htmlBody: string,
  textBody?: string,
  replyTo?: string
): Promise<SendResult> {
  return postResend({
    from: getFromAddress(),
    to: [to],
    subject,
    html: htmlBody,
    ...(textBody ? { text: textBody } : {}),
    ...(replyTo ? { reply_to: replyTo } : {}),
  });
}

// ─── Send with Full Params ───────────────────────────────────

/**
 * Gửi email với đầy đủ tham số (custom from name/email, headers, tags)
 */
export async function sendEmailWithParams(
  params: SendEmailParams
): Promise<SendResult> {
  const fromEmail = params.fromEmail || process.env.EMAIL_FROM || "noreply@doanhnghiep1nguoi.online";
  const fromName = params.fromName || process.env.EMAIL_FROM_NAME || "Doanh Nghiệp 1 Người";

  return postResend({
    from: `${fromName} <${fromEmail}>`,
    to: [params.to],
    subject: params.subject,
    html: params.html,
    ...(params.text ? { text: params.text } : {}),
    ...(params.replyTo ? { reply_to: params.replyTo } : {}),
    ...(params.headers ? { headers: params.headers } : {}),
    ...(sanitizeTags(params.tags) ? { tags: sanitizeTags(params.tags) } : {}),
  });
}

// ─── Send Bulk Emails ────────────────────────────────────────

/**
 * Gửi email hàng loạt — mỗi email có nội dung riêng.
 * Gửi tuần tự với delay để tránh vượt rate limit Resend (~2 req/giây).
 *
 * @param emails - Mảng email cần gửi
 * @param delayMs - Delay giữa mỗi email (mặc định 600ms ~ an toàn rate limit)
 */
export async function sendBulkEmails(
  emails: BulkEmailEntry[],
  delayMs: number = 600
): Promise<BulkSendResult> {
  const results: BulkSendResult["results"] = [];
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    const result = await sendEmail(
      email.to,
      email.subject,
      email.html,
      email.text
    );

    results.push({
      to: email.to,
      success: result.success,
      messageId: result.messageId,
      error: result.error,
    });

    if (result.success) sent++;
    else failed++;

    if (delayMs > 0) await sleep(delayMs);
  }

  return { total: emails.length, sent, failed, results };
}

// ─── Helpers ─────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
