-- Tool categories
CREATE TABLE IF NOT EXISTS public.tool_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tools (AI Tools)
CREATE TABLE IF NOT EXISTS public.tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_description text,
  description_html text,
  thumbnail_url text,
  category_id uuid REFERENCES public.tool_categories(id),
  price integer DEFAULT 0,
  sale_price integer,
  badge text CHECK (badge IN ('free','featured','bestseller','new','sale')),
  status text DEFAULT 'draft' CHECK (status IN ('draft','published','hidden')),
  demo_video_url text,
  tool_link text,
  guide_url text,
  prompt_template text,
  what_you_get text,
  suitable_for text,
  cta_text text DEFAULT 'Mua ngay',
  payment_link text,
  redirect_after_purchase text DEFAULT '/cam-on',
  faq jsonb DEFAULT '[]',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tools_slug ON public.tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_status ON public.tools(status);

-- Insert default categories
INSERT INTO public.tool_categories (slug, name, sort_order) VALUES
  ('tat-ca', 'Tất cả', 0),
  ('lam-video', 'Làm video', 1),
  ('lam-anh', 'Làm ảnh', 2),
  ('content-ban-hang', 'Content bán hàng', 3),
  ('kol-avatar-podcast', 'KOL / Avatar / Podcast', 4),
  ('automation-n8n', 'Automation / n8n', 5),
  ('theo-nganh', 'Theo ngành', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert 3 sample tools
INSERT INTO public.tools (slug, title, short_description, price, sale_price, badge, status, cta_text) VALUES
  ('tool-video-thoi-trang-google-flow', 'Tool Tạo Video Thời Trang với Google Flow', 'Dành cho shop thời trang muốn tạo video sản phẩm/bộ đồ bằng AI, không cần quay mẫu thật.', 200000, 150000, 'featured', 'published', 'Mua ngay'),
  ('tool-video-hang-loat', 'Tool Tạo Video Hàng Loạt Cực Nhanh', 'Dành cho người làm content, affiliate, bán hàng online muốn tạo nhiều video nhanh từ template/prompt có sẵn.', 500000, 350000, 'bestseller', 'published', 'Mua ngay'),
  ('tool-kol-podcast-ai', 'Tool KOL Podcast AI', 'Dành cho creator, người bán khóa học/dịch vụ, người muốn tạo nội dung dạng KOL/podcast bằng AI.', 400000, 299000, 'new', 'published', 'Mua ngay')
ON CONFLICT (slug) DO NOTHING;

-- RLS
ALTER TABLE public.tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Public can read published tools" ON public.tools
  FOR SELECT USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Admin can manage tools" ON public.tools
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','staff'))
  );

CREATE POLICY IF NOT EXISTS "Public can read tool categories" ON public.tool_categories
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Admin can manage tool categories" ON public.tool_categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','staff'))
  );
