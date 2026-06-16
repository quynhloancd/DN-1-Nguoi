import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { randomBytes } from "crypto";
import { rateLimit } from "@/lib/rate-limit";
import {
  toolNoteRef,
  getUserToolOrder,
  isConfirmed,
  getBankTransferInfo,
} from "@/lib/tool-access";

/**
 * Sinh mã đơn ngắn gọn dạng "DK" + số thứ tự (vd DK1, DK2, DK128).
 * Giữ tiền tố "DK" để SePay webhook tự nhận diện và auto-xác nhận.
 */
async function genOrderCode(admin: Awaited<ReturnType<typeof createAdminClient>>): Promise<string> {
  const { count } = await admin
    .from("orders")
    .select("id", { count: "exact", head: true });
  let n = (count ?? 0) + 1;
  for (let i = 0; i < 100; i++) {
    const code = `DK${n}`;
    const { data: exists } = await admin
      .from("orders")
      .select("id")
      .eq("order_code", code)
      .maybeSingle();
    if (!exists) return code;
    n++;
  }
  // Fallback cực hiếm khi đụng độ: thêm hậu tố ngẫu nhiên
  return `DK${n}${randomBytes(2).toString("hex").toUpperCase()}`;
}

/**
 * POST /api/tools/buy  { tool_id }
 * Tạo đơn hàng (status pending) cho 1 tool trả phí → trả thông tin chuyển
 * khoản. Khách chuyển khoản xong, admin xác nhận đơn → user được cấp quyền.
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const rl = await rateLimit(`tool-buy:${ip}`, 10, 60);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Quá nhiều yêu cầu. Thử lại sau." }, { status: 429 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Vui lòng đăng nhập để mua." }, { status: 401 });
  }

  let body: { tool_id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }
  const toolId = body.tool_id;
  if (!toolId) {
    return NextResponse.json({ error: "Thiếu tool_id" }, { status: 400 });
  }

  const admin = await createAdminClient();

  const { data: tool } = await admin
    .from("tools")
    .select("id, title, price, sale_price, status")
    .eq("id", toolId)
    .single();

  if (!tool || tool.status !== "published") {
    return NextResponse.json({ error: "Không tìm thấy tool" }, { status: 404 });
  }

  const amount = tool.sale_price || tool.price;
  const bank = getBankTransferInfo();

  // Tool miễn phí → không cần mua
  if (!amount || amount <= 0) {
    return NextResponse.json({ free: true });
  }

  // Đã có đơn?
  const existing = await getUserToolOrder(admin, user.id, toolId);
  if (isConfirmed(existing)) {
    return NextResponse.json({ alreadyOwned: true });
  }
  if (existing && existing.status === "pending") {
    return NextResponse.json({
      success: true,
      pending: true,
      order_code: existing.order_code,
      amount: existing.amount,
      bank,
    });
  }

  // Lấy thông tin khách từ profile
  const { data: profile } = await admin
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .single();

  const orderCode = await genOrderCode(admin);
  const { data: order, error: orderErr } = await admin
    .from("orders")
    .insert({
      order_code: orderCode,
      user_id: user.id,
      amount,
      status: "pending",
      payment_method: "bank_transfer",
      product_type: "tool",
      product_title: tool.title,
      note: toolNoteRef(toolId),
      customer_name: profile?.full_name || user.email,
      customer_email: user.email,
      customer_phone: profile?.phone || null,
    })
    .select("order_code, amount")
    .single();

  if (orderErr || !order) {
    console.error("[tools/buy] insert order error:", orderErr?.message);
    return NextResponse.json({ error: "Không thể tạo đơn. Vui lòng thử lại." }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    pending: true,
    order_code: order.order_code,
    amount: order.amount,
    bank,
  });
}
