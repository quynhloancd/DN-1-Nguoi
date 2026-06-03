import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminSb = await createAdminClient();
  const { data: profile } = await adminSb
    .from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { conversion_id } = await req.json();
  if (!conversion_id) return NextResponse.json({ error: "conversion_id required" }, { status: 400 });

  const { error } = await adminSb
    .from("affiliate_conversions")
    .update({ status: "approved", approved_at: new Date().toISOString() })
    .eq("id", conversion_id)
    .eq("status", "pending");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
