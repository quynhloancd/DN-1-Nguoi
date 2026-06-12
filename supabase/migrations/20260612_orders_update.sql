-- ─── ORDERS UPDATE: thêm các trường còn thiếu cho MVP ───────────────────────
-- Migration: 20260612_orders_update.sql

-- 1. Thêm customer_zalo (liên hệ Zalo)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_zalo text;

-- 2. Thêm product_type để phân biệt loại sản phẩm
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS product_type text
    CHECK (product_type IN ('tool', 'course', 'combo') OR product_type IS NULL);

-- 3. Thêm product_title snapshot tên sản phẩm tại thời điểm mua
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS product_title text;

-- 4. Thêm notes (admin ghi chú — tách khỏi note field tự động của system)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS notes text;

-- 5. Mở rộng status để hỗ trợ 'delivered' và 'error'
--    (DROP CONSTRAINT cũ và tạo lại với các giá trị mới)
ALTER TABLE public.orders
  DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE public.orders
  ADD CONSTRAINT orders_status_check
    CHECK (status IN ('pending', 'paid', 'delivered', 'refunded', 'cancelled', 'error'));

-- 6. Mở rộng payment_method để hỗ trợ 'payos' và 'manual'
ALTER TABLE public.orders
  DROP CONSTRAINT IF EXISTS orders_payment_method_check;

ALTER TABLE public.orders
  ADD CONSTRAINT orders_payment_method_check
    CHECK (payment_method IN ('sepay', 'payos', 'bank_transfer', 'manual') OR payment_method IS NULL);
