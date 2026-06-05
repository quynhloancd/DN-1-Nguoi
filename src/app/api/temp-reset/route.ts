import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-reset-secret");
  if (secret !== "dn1-temp-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { userId, password } = await req.json();
  // Strip BOM from env vars
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^﻿/, "").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").replace(/^﻿/, "").trim();
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await supabase.auth.admin.updateUserById(userId, { password });
  if (error) return NextResponse.json({ error: error.message, url: url.slice(0,20) }, { status: 500 });
  return NextResponse.json({ success: true, email: data.user?.email });
}
