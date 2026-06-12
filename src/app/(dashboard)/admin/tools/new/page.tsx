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
    .replace(/[?-?]/g, "")
    .replace(/?/g, "d")
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
    if (!title || !slug) { setError("T�n v� slug kh�ng ???c ?? tr?ng."); return; }
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
      <TopBar title="Th�m Tool AI m?i" subtitle="?i?n th�ng tin tool AI" />
      <div className="p-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* T�n & Slug */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Th�ng tin c? b?n</h3>
            <div>
              <label className="label-form">T�n tool *</label>
              <input
                className="input-form"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="VD: Tool T?o Video Th?i Trang"
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
              <label className="label-form">Danh m?c</label>
              <select className="input-form" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">-- Ch?n danh m?c --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-form">URL ?nh thumbnail</label>
              <input
                className="input-form"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* M� t? */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">M� t?</h3>
            <div>
              <label className="label-form">M� t? ng?n</label>
              <textarea
                className="input-form"
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="1-2 c�u m� t? tool..."
              />
            </div>
            <div>
              <label className="label-form">M� t? chi ti?t (HTML)</label>
              <textarea
                className="input-form"
                rows={4}
                value={descriptionHtml}
                onChange={(e) => setDescriptionHtml(e.target.value)}
                placeholder="<p>N?i dung chi ti?t...</p>"
              />
            </div>
          </div>

          {/* Gi� & Badge */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Gi� & Tr?ng th�i</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-form">Gi� g?c (VND)</label>
                <input
                  type="number"
                  className="input-form"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                  min={0}
                />
              </div>
              <div>
                <label className="label-form">Gi� b�n (VND)</label>
                <input
                  type="number"
                  className="input-form"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  min={0}
                  placeholder="?? tr?ng n?u kh�ng gi?m gi�"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-form">Badge</label>
                <select className="input-form" value={badge} onChange={(e) => setBadge(e.target.value)}>
                  <option value="">-- Kh�ng c� --</option>
                  <option value="free">Mi?n ph�</option>
                  <option value="featured">N?i b?t</option>
                  <option value="bestseller">B�n ch?y</option>
                  <option value="new">M?i</option>
                  <option value="sale">Gi?m gi�</option>
                </select>
              </div>
              <div>
                <label className="label-form">Tr?ng th�i</label>
                <select className="input-form" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="draft">Nh�p</option>
                  <option value="published">?ang b�n</option>
                  <option value="hidden">?n</option>
                </select>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Links & T�i nguy�n</h3>
            <div>
              <label className="label-form">URL demo video (YouTube)</label>
              <input className="input-form" value={demoVideoUrl} onChange={(e) => setDemoVideoUrl(e.target.value)} placeholder="https://youtube.com/..." />
            </div>
            <div>
              <label className="label-form">Link tool sau mua</label>
              <input className="input-form" value={toolLink} onChange={(e) => setToolLink(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className="label-form">URL h??ng d?n</label>
              <input className="input-form" value={guideUrl} onChange={(e) => setGuideUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          {/* N?i dung landing page */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">N?i dung trang landing</h3>
            <div>
              <label className="label-form">Prompt m?u</label>
              <textarea className="input-form" rows={4} value={promptTemplate} onChange={(e) => setPromptTemplate(e.target.value)} placeholder="D�n prompt m?u v�o ?�y..." />
            </div>
            <div>
              <label className="label-form">Ng??i mua nh?n ???c g� (m?i d�ng 1 ?i?m)</label>
              <textarea className="input-form" rows={4} value={whatYouGet} onChange={(e) => setWhatYouGet(e.target.value)} placeholder="Link tool&#10;Prompt m?u&#10;H??ng d?n chi ti?t" />
            </div>
            <div>
              <label className="label-form">Ph� h?p v?i ai (m?i d�ng 1 ??i t??ng)</label>
              <textarea className="input-form" rows={3} value={suitableFor} onChange={(e) => setSuitableFor(e.target.value)} placeholder="Shop th?i trang&#10;Content creator&#10;Ng??i m?i b?t ??u" />
            </div>
          </div>

          {/* Thanh to�n */}
          <div className="card-dark p-5 space-y-4">
            <h3 className="font-semibold text-[#1B2A4A] text-sm">Thanh to�n & CTA</h3>
            <div>
              <label className="label-form">Text n�t CTA</label>
              <input className="input-form" value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="Mua ngay" />
            </div>
            <div>
              <label className="label-form">Link thanh to�n (PayOS / SePay)</label>
              <input className="input-form" value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} placeholder="https://pay.payos.vn/..." />
            </div>
            <div>
              <label className="label-form">Trang redirect sau thanh to�n</label>
              <input className="input-form" value={redirectAfterPurchase} onChange={(e) => setRedirectAfterPurchase(e.target.value)} placeholder="/cam-on" />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/tools")}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50"
            >
              Hu?
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-green"
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
              Th�m tool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
