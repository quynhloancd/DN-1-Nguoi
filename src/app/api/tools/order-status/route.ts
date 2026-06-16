import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { CONFIRMED_STATUSES } from "@/lib/tool-access";

/**
 * GET /api/tools/order-status?code=DK123
 * Trả trạng thái đơn của user hiện tại (để client poll, tự mở khóa khi
 * thanh toán được xác nhận).
 */
export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ error: "missing code" }, { status: 400 });

  const admin = await createAdminClient();
  const { data } = await admin
    .from("orders")
    .select("status")
    .eq("order_code", code)
    .eq("user_id", user.id)
    .maybeSingle();

  const status = (data?.status as string) || "unknown";
  const confirmed = (CONFIRMED_STATUSES as readonly string[]).includes(status);
  return NextResponse.json({ status, confirmed });
}
