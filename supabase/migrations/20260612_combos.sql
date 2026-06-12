-- Combos table
CREATE TABLE IF NOT EXISTS public.combos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_description text,
  description_html text,
  thumbnail_url text,
  price integer NOT NULL,
  sale_price integer,
  badge text CHECK (badge IN ('recommended','bestseller','sale','new')),
  status text DEFAULT 'draft' CHECK (status IN ('draft','published','hidden')),
  benefits text,
  suitable_for text,
  payment_link text,
  redirect_after_purchase text DEFAULT '/cam-on',
  faq jsonb DEFAULT '[]',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_combos_slug ON public.combos(slug);
CREATE INDEX IF NOT EXISTS idx_combos_status ON public.combos(status);

-- Combo items (tools in combo)
CREATE TABLE IF NOT EXISTS public.combo_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  combo_id uuid NOT NULL REFERENCES public.combos(id) ON DELETE CASCADE,
  tool_id uuid REFERENCES public.tools(id) ON DELETE SET NULL,
  tool_title text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_combo_tools_combo_id ON public.combo_tools(combo_id);

-- Insert 4 sample combos
INSERT INTO public.combos (slug, title, short_description, price, sale_price, badge, status, suitable_for) VALUES
  ('combo-nguoi-moi', 'Combo Người Mới', 'Dành cho người mới muốn thử tool AI dễ dùng. Gồm 2-3 tool cơ bản + prompt mẫu + group Zalo.', 299000, 199000, 'new', 'published', 'Người mới bắt đầu với AI, chưa biết dùng tool nào'),
  ('combo-video-ai', 'Combo Video AI', 'Dành cho người muốn làm video nhanh hơn. Tool video thời trang, hàng loạt, storyboard, KOL/podcast.', 799000, 499000, 'recommended', 'published', 'Creator, chủ shop muốn làm video bán hàng chuyên nghiệp'),
  ('combo-chu-shop-online', 'Combo Chủ Shop Online', 'Dành cho chủ shop muốn tự làm ảnh, content, video bán hàng. Tool content, ảnh sản phẩm, video ngắn, lịch đăng bài.', 999000, 699000, null, 'published', 'Chủ shop thời trang, mỹ phẩm, đồ gia dụng'),
  ('combo-doanh-nghiep-1-nguoi', 'Combo Doanh Nghiệp 1 Người', 'Bộ tool đầy đủ để tự vận hành content một mình. Nhiều tool + quy trình + hỗ trợ ưu tiên.', 1499000, 999000, 'bestseller', 'published', 'Người muốn tự vận hành toàn bộ content marketing')
ON CONFLICT (slug) DO NOTHING;

-- RLS
ALTER TABLE public.combos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.combo_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Public can read published combos" ON public.combos
  FOR SELECT USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Admin can manage combos" ON public.combos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','staff'))
  );

CREATE POLICY IF NOT EXISTS "Public can read combo tools" ON public.combo_tools
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Admin can manage combo tools" ON public.combo_tools
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','staff'))
  );
