-- =============================================================================
-- Migration: 20260612_update_payment_links.sql
-- Má»¥c Ä‘Ã­ch: Set payment_link cho cÃ¡c tool vÃ  combo máº«u
--
-- SePay payment link format:
--   https://sepay.vn/thanh-toan.html?bank=MB&acc=3649111777&amount=AMOUNT&des=ORDERDESC&template=compact
--
-- HÆ¯á»šNG DáºªN:
--   Thay MB  = giÃ¡ trá»‹ SEPAY_BANK_CODE trong .env (vd: BIDV, VCB, MB, TCB...)
--   Thay 3649111777 = giÃ¡ trá»‹ SEPAY_BANK_ACCOUNT trong .env (sá»‘ tÃ i khoáº£n)
--   MÃ´ táº£ Ä‘Æ¡n hÃ ng (des) dÃ¹ng tÃªn ngáº¯n khÃ´ng dáº¥u â€” SePay giá»›i háº¡n ~50 kÃ½ tá»±
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TOOLS (3 tool máº«u)
-- sale_price: 150k, 350k, 299k
-- -----------------------------------------------------------------------------

-- Tool 1: Tool Táº¡o Video Thá»i Trang vá»›i Google Flow â€” 150,000Ä‘
UPDATE public.tools
SET payment_link = 'https://sepay.vn/thanh-toan.html?bank=MB&acc=3649111777&amount=150000&des=Tool+Video+Thoi+Trang+Google+Flow&template=compact'
WHERE slug = 'tool-video-thoi-trang-google-flow';

-- Tool 2: Tool Táº¡o Video HÃ ng Loáº¡t Cá»±c Nhanh â€” 350,000Ä‘
UPDATE public.tools
SET payment_link = 'https://sepay.vn/thanh-toan.html?bank=MB&acc=3649111777&amount=350000&des=Tool+Tao+Video+Hang+Loat&template=compact'
WHERE slug = 'tool-video-hang-loat';

-- Tool 3: Tool KOL Podcast AI â€” 299,000Ä‘
UPDATE public.tools
SET payment_link = 'https://sepay.vn/thanh-toan.html?bank=MB&acc=3649111777&amount=299000&des=Tool+KOL+Podcast+AI&template=compact'
WHERE slug = 'tool-kol-podcast-ai';

-- -----------------------------------------------------------------------------
-- COMBOS (4 combo máº«u)
-- sale_price: 199k, 499k, 699k, 999k
-- -----------------------------------------------------------------------------

-- Combo 1: Combo NgÆ°á»i Má»›i â€” 199,000Ä‘
UPDATE public.combos
SET payment_link = 'https://sepay.vn/thanh-toan.html?bank=MB&acc=3649111777&amount=199000&des=Combo+Nguoi+Moi&template=compact'
WHERE slug = 'combo-nguoi-moi';

-- Combo 2: Combo Video AI â€” 499,000Ä‘
UPDATE public.combos
SET payment_link = 'https://sepay.vn/thanh-toan.html?bank=MB&acc=3649111777&amount=499000&des=Combo+Video+AI&template=compact'
WHERE slug = 'combo-video-ai';

-- Combo 3: Combo Chá»§ Shop Online â€” 699,000Ä‘
UPDATE public.combos
SET payment_link = 'https://sepay.vn/thanh-toan.html?bank=MB&acc=3649111777&amount=699000&des=Combo+Chu+Shop+Online&template=compact'
WHERE slug = 'combo-chu-shop-online';

-- Combo 4: Combo Doanh Nghiá»‡p 1 NgÆ°á»i â€” 999,000Ä‘
UPDATE public.combos
SET payment_link = 'https://sepay.vn/thanh-toan.html?bank=MB&acc=3649111777&amount=999000&des=Combo+Doanh+Nghiep+1+Nguoi&template=compact'
WHERE slug = 'combo-doanh-nghiep-1-nguoi';

