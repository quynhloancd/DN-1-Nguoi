/**
 * Email Client — powered by Resend (refactored from AWS SES)
 * File name retained as ses.ts for backwards compatibility with imports.
 */
import { Resend } from "resend";
import type {
  SendEmailParams,
  BulkEmailEntry,
  SendResult,
  BulkSendResult,
} from "./types";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.startsWith("dummy") || apiKey.includes("your-")) {
      throw new Error("Missing RESEND_API_KEY in env");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

function getFromAddress(): string {
  const email = process.env.EMAIL_FROM || "noreply@doanhnghiep1nguoi.online";
  const name = process.env.EMAIL_FROM_NAME || "KDON Academy";
  return `${name} <${email}>`;
}

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
      text: textBody,
      replyTo: replyTo,
    });
    if (error) {
      console.error(`[Resend] Failed to send to ${to}:`, error);
      return { success: false, error: error.message };
    }
    return { success: true, messageId: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown send error";
    console.error(`[Resend] Exception sending to ${to}:`, message);
    return { success: false, error: message };
  }
}

export async function sendEmailWithParams(
  params: SendEmailParams
): Promise<SendResult> {
  try {
    const client = getResendClient();
    const fromEmail = params.fromEmail || process.env.EMAIL_FROM || "noreply@doanhnghiep1nguoi.online";
    const fromName = params.fromName || process.env.EMAIL_FROM_NAME || "KDON Academy";
    const fromAddress = `${fromName} <${fromEmail}>`;

    const { data, error } = await client.emails.send({
      from: fromAddress,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
      replyTo: params.replyTo,
      headers: params.headers,
      tags: params.tags
        ? Object.entries(params.tags).map(([name, value]) => ({ name, value }))
        : undefined,
    });
    if (error) {
      console.error(`[Resend] sendEmailWithParams failed to ${params.to}:`, error);
      return { success: false, error: error.message };
    }
    return { success: true, messageId: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email send error";
    console.error(`[Resend] sendEmailWithParams exception to ${params.to}:`, message);
    return { success: false, error: message };
  }
}

export async function sendBulkEmails(
  emails: BulkEmailEntry[],
  delayMs: number = 100
): Promise<BulkSendResult> {
  const results: BulkSendResult["results"] = [];
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    const result = await sendEmail(email.to, email.subject, email.html, email.text);
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

export async function sendTemplatedEmail(
  to: string,
  templateName: string,
  templateData: Record<string, string>
): Promise<SendResult> {
  // Resend doesn't have server-side templates like SES. Stub kept for API compatibility.
  console.warn(`[Resend] sendTemplatedEmail not supported (template=${templateName}, to=${to}, data=${JSON.stringify(templateData).slice(0,80)})`);
  return { success: false, error: "Templated emails not supported by Resend driver" };
}

// Kept for backwards compatibility — some callers may still reference getSESClient
export function getSESClient(): never {
  throw new Error("getSESClient deprecated — use Resend driver");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
