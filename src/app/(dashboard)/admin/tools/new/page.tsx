"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import TopBar from "@/components/layout/TopBar";
import { Plus, Loader2 } from "lucide-react";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/gu, "")
    .replace(/[đ]/gu, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Category = { id: string; name: string };

export default function NewToolPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<string>("");
  const [badge, setBadge] = useState("");
  const [status, setStatus] = useState("draft");
  const [demoVideoUrl, setDemoVideoUrl] = useState("");
  const [toolLink, setToolLink] = useState("");
  const [guideUrl, setGuideUrl] = useState("");
  const [promptTemplate, setPromptTemplate] = useState("");
  const [whatYouGet, setWhatYouGet] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [ctaText, setCtaText] = useState("Mua ngay");
  const [paymentLink, setPaymentLink] = useState("");
  const [redirectAfterPurchase, setRedirectAfterPurchase] = useState("/cam-on");

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || !["admin", "manager", "editor"].includes(profile.role)) {
        router.push("/dashboard");
        return;
      }

      const { data: cats } = await supabase
        .from("tool_categories")
        .select("id, name")
        .order("sort_order");
      setCategories(cats ?? []);
      setLoading(false);
    }
    init();
  }, []);

  function handleTitleChange(v: string) {
    setTitle(v);
    setSlug(generateSlug(v));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !slug) { setError("Tên và slug không được để trống."); return; }
    setSubmitting(true);
    setError(null);

    const payload = {
      title,
      slug,
      category_id: categoryId || null,
      thumbnail_url: thumbnailUrl || null,
      short_description: shortDescription || null,
      description_html: descriptionHtml || null,
      price,
      sale_price: salePrice ? parseInt(salePrice) : null,
      badge: badge || null,
      status,
      demo_video_url: demoVideoUrl || null,
      tool_link: toolLink || null,
      guide_url: guideUrl || null,
      prompt_template: promptTemplate || null,
      what_you_get: whatYouGet || null,
      suitable_for: suitableFor || null,
      cta_text: ctaText || "Mua ngay",
      payment_link: paymentLink || null,
      redirect_after_purchase: redirectAfterPurchase || "/cam-on",
    };

    const { error: err } = await supabase.from("tools").insert(payload);
    if (err) { setError(err.message); setSubmitting(false); return; }
    router.push("/admin/tools");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Thêm Tool AI mới" subtitle="Điền thông tin tool AI" />
      <div className="p-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Tên & Slug */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Thông tin cơ bản</h3>
            <div>
              <label className="label-form">Tên tool *</label>
              <input
                className="input-form"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="VD: Tool Tạo Video Thời Trang"
                required
              />
            </div>
            <div>
              <label className="label-form">Slug (URL)</label>
              <input
                className="input-form"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="tool-tao-video-thoi-trang"
              />
            </div>
            <div>
              <label className="label-form">Danh mục</label>
              <select className="input-form" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-form">URL ảnh thumbnail</label>
              <input
                className="input-form"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Mô tả */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Mô tả</h3>
            <div>
              <label className="label-form">Mô tả ngắn</label>
              <textarea
                className="input-form"
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="1-2 câu mô tả tool..."
              />
            </div>
            <div>
              <label className="label-form">Mô tả chi tiết (HTML)</label>
              <textarea
                className="input-form"
                rows={4}
                value={descriptionHtml}
                onChange={(e) => setDescriptionHtml(e.target.value)}
                placeholder="<p>Nội dung chi tiết...</p>"
              />
            </div>
          </div>

          {/* Giá & Badge */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Giá & Trạng thái</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-form">Giá gốc (VND)</label>
                <input
                  type="number"
                  className="input-form"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                  min={0}
                />
              </div>
              <div>
                <label className="label-form">Giá bán (VND)</label>
                <input
                  type="number"
                  className="input-form"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  min={0}
                  placeholder="Để trống nếu không giảm giá"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-form">Badge</label>
                <select className="input-form" value={badge} onChange={(e) => setBadge(e.target.value)}>
                  <option value="">-- Không có --</option>
                  <option value="free">Miễn phí</option>
                  <option value="featured">Nổi bật</option>
                  <option value="bestseller">Bán chạy</option>
                  <option value="new">Mới</option>
                  <option value="sale">Giảm giá</option>
                </select>
              </div>
              <div>
                <label className="label-form">Trạng thái</label>
                <select className="input-form" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="draft">Nháp</option>
                  <option value="published">Đang bán</option>
                  <option value="hidden">Ẩn</option>
                </select>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Links & Tài nguyên</h3>
            <div>
              <label className="label-form">URL demo video (YouTube)</label>
              <input className="input-form" value={demoVideoUrl} onChange={(e) => setDemoVideoUrl(e.target.value)} placeholder="https://youtube.com/..." />
            </div>
            <div>
              <label className="label-form">Link tool sau mua</label>
              <input className="input-form" value={toolLink} onChange={(e) => setToolLink(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className="label-form">URL hướng dẫn</label>
              <input className="input-form" value={guideUrl} onChange={(e) => setGuideUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          {/* Nội dung landing page */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Nội dung trang landing</h3>
            <div>
              <label className="label-form">Prompt mẫu</label>
              <textarea className="input-form" rows={4} value={promptTemplate} onChange={(e) => setPromptTemplate(e.target.value)} placeholder="Dán prompt mẫu vào đây..." />
            </div>
            <div>
              <label className="label-form">Người mua nhận được gì (mỗi dòng 1 điểm)</label>
              <textarea className="input-form" rows={4} value={whatYouGet} onChange={(e) => setWhatYouGet(e.target.value)} placeholder="Link tool&#10;Prompt mẫu&#10;Hướng dẫn chi tiết" />
            </div>
            <div>
              <label className="label-form">Phù hợp với ai (mỗi dòng 1 đối tượng)</label>
              <textarea className="input-form" rows={3} value={suitableFor} onChange={(e) => setSuitableFor(e.target.value)} placeholder="Shop thời trang&#10;Content creator&#10;Người mới bắt đầu" />
            </div>
          </div>

          {/* Thanh toán */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Thanh toán & CTA</h3>
            <div>
              <label className="label-form">Text nút CTA</label>
              <input className="input-form" value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="Mua ngay" />
            </div>
            <div>
              <label className="label-form">Link thanh toán (PayOS / SePay)</label>
              <input className="input-form" value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} placeholder="https://pay.payos.vn/..." />
            </div>
            <div>
              <label className="label-form">Trang redirect sau thanh toán</label>
              <input className="input-form" value={redirectAfterPurchase} onChange={(e) => setRedirectAfterPurchase(e.target.value)} placeholder="/cam-on" />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/tools")}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-green"
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
              Thêm tool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
