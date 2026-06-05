import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminSb = await createAdminClient();
  const { data: profile } = await adminSb
    .from("profiles").select("role").eq("id", user.id).single();
  if (!["admin", "manager"].includes(profile?.role ?? ""))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { payout_id } = await req.json();
  if (!payout_id) return NextResponse.json({ error: "payout_id required" }, { status: 400 });

  const { data: payout, error: fetchErr } = await adminSb
    .from("affiliate_payouts")
    .select("id, affiliate_id, amount, status")
    .eq("id", payout_id)
    .single();

  if (fetchErr || !payout) return NextResponse.json({ error: "Payout not found" }, { status: 404 });
  if (payout.status !== "pending") return NextResponse.json({ error: "Payout không ở trạng thái pending" }, { status: 400 });

  // Mark payout as completed
  const { error: updateErr } = await adminSb
    .from("affiliate_payouts")
    .update({
      status: "completed",
      processed_by: user.id,
      processed_at: new Date().toISOString(),
    })
    .eq("id", payout_id);

  if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });

  // Atomically increment total_paid
  await adminSb.rpc("increment_affiliate_total_paid", {
    p_affiliate_id: payout.affiliate_id,
    p_paid_amount: payout.amount,
  });

  // Mark related approved conversions as paid
  await adminSb
    .from("affiliate_conversions")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("affiliate_id", payout.affiliate_id)
    .eq("status", "approved");

  return NextResponse.json({ success: true });
}
