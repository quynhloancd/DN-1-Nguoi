import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

// TEMPORARY endpoint — delete after use
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-reset-secret");
  if (secret !== "dn1-temp-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { userId, password } = await req.json();
  const supabase = await createAdminClient();
  const { data, error } = await supabase.auth.admin.updateUserById(userId, { password });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, email: data.user?.email });
}
