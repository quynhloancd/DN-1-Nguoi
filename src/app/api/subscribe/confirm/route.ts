import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.redirect(new URL("/?subscribe=error", req.url));

  const supabase = await createAdminClient();
  const { data } = await supabase
    .from("subscribers")
    .update({ status: "active", confirmed_at: new Date().toISOString() })
    .eq("email", email)
    .eq("status", "pending")
    .select("id")
    .single();

  if (!data) return NextResponse.redirect(new URL("/?subscribe=invalid", req.url));
  return NextResponse.redirect(new URL("/?subscribe=confirmed", req.url));
}
