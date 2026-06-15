/**
 * Email Client — powered by Resend
 *
 * Lưu ý: file vẫn tên `ses.ts` để giữ nguyên các import hiện có, nhưng
 * bên trong đã chuyển từ AWS SES sang Resend (hạ tầng email thật của dự án:
 * domain doanhnghiep1nguoi.online đã verify trên Resend, sender noreply@...).
 *
 * Env cần: RESEND_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME
 */

import { Resend } from "resend";
import type {
  SendEmailParams,
  BulkEmailEntry,
  SendResult,
  BulkSendResult,
} from "./types";

// ─── Resend Client Singleton ─────────────────────────────────

let resendClient: Resend | null = null;

/** Lấy Resend client singleton — khởi tạo 1 lần duy nhất */
export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing RESEND_API_KEY. Cần có RESEND_API_KEY trong env để gửi email."
      );
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// ─── Sender Address ──────────────────────────────────────────

/** Lấy địa chỉ From đầy đủ: "Tên <email>" */
function getFromAddress(): string {
  const email = process.env.EMAIL_FROM || "noreply@doanhnghiep1nguoi.online";
  const name = process.env.EMAIL_FROM_NAME || "Doanh Nghiệp 1 Người";
  return `${name} <${email}>`;
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
  try {
    const client = getResendClient();
    const { data, error } = await client.emails.send({
      from: getFromAddress(),
      to: [to],
      subject,
      html: htmlBody,
      ...(textBody ? { text: textBody } : {}),
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error(`[Resend] Gửi email thất bại đến ${to}:`, error.message);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Lỗi không xác định khi gửi email";
    console.error(`[Resend] Gửi email thất bại đến ${to}:`, message);
    return { success: false, error: message };
  }
}

// ─── Send with Full Params ───────────────────────────────────

/**
 * Gửi email với đầy đủ tham số (custom from name/email, headers, tags)
 */
export async function sendEmailWithParams(
  params: SendEmailParams
): Promise<SendResult> {
  try {
    const client = getResendClient();

    const fromEmail = params.fromEmail || process.env.EMAIL_FROM || "noreply@doanhnghiep1nguoi.online";
    const fromName = params.fromName || process.env.EMAIL_FROM_NAME || "Doanh Nghiệp 1 Người";
    const fromAddress = `${fromName} <${fromEmail}>`;

    const { data, error } = await client.emails.send({
      from: fromAddress,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      ...(params.text ? { text: params.text } : {}),
      ...(params.replyTo ? { replyTo: params.replyTo } : {}),
      ...(params.headers ? { headers: params.headers } : {}),
      ...(sanitizeTags(params.tags) ? { tags: sanitizeTags(params.tags) } : {}),
    });

    if (error) {
      console.error(`[Resend] sendEmailWithParams thất bại đến ${params.to}:`, error.message);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lỗi gửi email";
    console.error(`[Resend] sendEmailWithParams thất bại đến ${params.to}:`, message);
    return { success: false, error: message };
  }
}

// ─── Send Bulk Emails ────────────────────────────────────────

/**
 * Gửi email hàng loạt — mỗi email có nội dung riêng.
 * Gửi tuần tự với delay để tránh vượt rate limit Resend.
 *
 * @param emails - Mảng email cần gửi
 * @param delayMs - Delay giữa mỗi email (mặc định 100ms ~ 10 emails/giây)
 */
export async function sendBulkEmails(
  emails: BulkEmailEntry[],
  delayMs: number = 100
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
