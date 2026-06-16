/**
 * Quản lý quyền truy cập Tool/Combo theo đơn hàng.
 *
 * Không cần đổi schema: tham chiếu tool/combo được lưu ở field `note` của
 * bảng orders theo quy ước `tool:<id>` / `combo:<id>`. User có quyền dùng một
 * tool trả phí khi tồn tại order tương ứng với status đã được admin xác nhận.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

/** Trạng thái đơn coi là "đã được cấp quyền" */
export const CONFIRMED_STATUSES = ["paid", "delivered"] as const;

export function toolNoteRef(toolId: string): string {
  return `tool:${toolId}`;
}
export function comboNoteRef(comboId: string): string {
  return `combo:${comboId}`;
}

export type AccessOrder = {
  id: string;
  status: string;
  order_code: string;
  amount: number;
  created_at: string;
} | null;

export function isConfirmed(order: AccessOrder): boolean {
  return !!order && (CONFIRMED_STATUSES as readonly string[]).includes(order.status);
}

/** Lấy đơn mới nhất của user cho 1 tool (bất kỳ trạng thái) */
export async function getUserToolOrder(
  admin: SupabaseClient,
  userId: string,
  toolId: string
): Promise<AccessOrder> {
  const { data } = await admin
    .from("orders")
    .select("id, status, order_code, amount, created_at")
    .eq("user_id", userId)
    .eq("note", toolNoteRef(toolId))
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as AccessOrder) ?? null;
}

/**
 * Quyết định quyền xem nội dung dùng được của 1 tool.
 * - Tool miễn phí (price 0): cần đăng nhập là xem được.
 * - Tool trả phí: cần có đơn đã được admin xác nhận (paid/delivered).
 */
export function computeToolAccess(opts: {
  isLoggedIn: boolean;
  price: number;
  order: AccessOrder;
}): { hasAccess: boolean; isFree: boolean } {
  const isFree = opts.price === 0;
  if (!opts.isLoggedIn) return { hasAccess: false, isFree };
  if (isFree) return { hasAccess: true, isFree };
  return { hasAccess: isConfirmed(opts.order), isFree };
}

/** Thông tin chuyển khoản hiển thị cho khách (đọc env, fallback theo hạ tầng đã setup) */
export function getBankTransferInfo() {
  return {
    bankName: process.env.SEPAY_BANK_NAME || "MB Bank",
    bankCode: process.env.SEPAY_BANK_CODE || "MB",
    account: process.env.SEPAY_BANK_ACCOUNT || "3649111777",
    accountName: process.env.SEPAY_ACCOUNT_NAME || "DOANH NGHIEP 1 NGUOI",
  };
}
