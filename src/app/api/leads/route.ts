import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, source, zalo, resource } = body as {
      name?: string;
      email?: string;
      source?: string;
      zalo?: string;
      resource?: string;
    };

    if (!email || !name) {
      return NextResponse.json({ error: "Thiếu tên hoặc email" }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
    }

    const supabase = await createAdminClient();

    // Upsert lead — nếu email đã tồn tại thì chỉ update source/updated_at
    const { error } = await supabase.from("leads").upsert(
      {
        email: email.toLowerCase().trim(),
        name: name.trim(),
        source: source ?? "lo-trinh",
        zalo: zalo?.trim() || null,
        resource: resource?.trim() || null,
        subscribed: true,
        created_at: new Date().toISOString(),
      },
      { onConflict: "email", ignoreDuplicates: false }
    );

    if (error) {
      // Table may not exist yet — log but don't break UX
      console.error("[leads] DB error:", error.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
