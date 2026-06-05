import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-reset-secret");
  if (secret !== "dn1-temp-2026") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^﻿/, "").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").replace(/^﻿/, "").trim();
  // List users to find admin
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await supabase.auth.admin.listUsers({ perPage: 50 });
  if (error) return NextResponse.json({ error: error.message, url: url.slice(0,40) });
  const admin = data.users.find(u => u.email === 'vhuythai0339@gmail.com');
  return NextResponse.json({ url: url.slice(0,40), total: data.users.length, admin: admin ? {id: admin.id, email: admin.email} : null });
}
