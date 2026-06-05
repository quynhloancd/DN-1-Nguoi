import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.redirect(new URL("/?subscribe=error", req.url));

  const supabase = await createAdminClient();

  // Activate subscriber
  const { data: subscriber } = await supabase
    .from("subscribers")
    .update({ status: "active", confirmed_at: new Date().toISOString() })
    .eq("email", email)
    .eq("status", "pending")
    .select("id, full_name, tags")
    .single();

  if (!subscriber) {
    // Already confirmed or not found — redirect gracefully
    return NextResponse.redirect(new URL("/?subscribe=confirmed", req.url));
  }

  // Send lead magnet email after confirmation (best-effort)
  try {
    const { sendLeadMagnetEmail } = await import("@/lib/email/transactional");
    await sendLeadMagnetEmail(email, subscriber.full_name || undefined).catch(() => {});
  } catch { /* non-critical */ }

  // Trigger drip automation for "newsletter" tag (best-effort)
  try {
    const { onTagAdded } = await import("@/lib/email/automation-triggers");
    const tags = (subscriber.tags as string[]) || ["newsletter"];
    for (const tag of tags) {
      await onTagAdded(supabase, subscriber.id, tag).catch(() => {});
    }
  } catch { /* non-critical */ }

  return NextResponse.redirect(new URL("/?subscribe=confirmed", req.url));
}
