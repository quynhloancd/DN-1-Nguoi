"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import TopBar from "@/components/layout/TopBar";
import { Save, Loader2, Trash2 } from "lucide-react";

export default function EditComboPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState("");
  const [badge, setBadge] = useState("");
  const [status, setStatus] = useState("draft");
  const [benefits, setBenefits] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [redirectAfterPurchase, setRedirectAfterPurchase] = useState("/cam-on");
  const [faqRaw, setFaqRaw] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const allowedRoles = ["admin", "manager", "editor"];
      if (!profile || !allowedRoles.includes(profile.role)) {
        router.push("/");
        return;
      }

      const { data: combo, error: fetchError } = await supabase
        .from("combos")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError || !combo) {
        setError("Không tìm thấy combo.");
        setLoading(false);
        return;
      }

      setTitle(combo.title ?? "");
      setSlug(combo.slug ?? "");
      setShortDescription(combo.short_description ?? "");
      setDescriptionHtml(combo.description_html ?? "");
      setThumbnailUrl(combo.thumbnail_url ?? "");
      setPrice(combo.price ?? 0);
      setSalePrice(combo.sale_price != null ? String(combo.sale_price) : "");
      setBadge(combo.badge ?? "");
      setStatus(combo.status ?? "draft");
      setBenefits(combo.benefits ?? "");
      setSuitableFor(combo.suitable_for ?? "");
      setPaymentLink(combo.payment_link ?? "");
      setRedirectAfterPurchase(combo.redirect_after_purchase ?? "/cam-on");
      setFaqRaw(
        combo.faq && Array.isArray(combo.faq) && combo.faq.length > 0
          ? JSON.stringify(combo.faq, null, 2)
          : ""
      );
      setSortOrder(combo.sort_order ?? 0);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!title.trim()) { setError("Tiêu đề không được để trống"); return; }
    if (!slug.trim()) { setError("Đường dẫn không được để trống"); return; }
    if (!price || price <= 0) { setError("Giá gốc phải lớn hơn 0"); return; }

    let faqParsed: unknown[] = [];
    if (faqRaw.trim()) {
      try {
        faqParsed = JSON.parse(faqRaw);
      } catch {
        setError('FAQ không đúng định dạng JSON. Ví dụ: [{"q":"...","a":"..."}]');
        return;
      }
    }

    setSubmitting(true);
    const { error: dbError } = await supabase
      .from("combos")
      .update({
        title: title.trim(),
        slug: slug.trim(),
        short_description: shortDescription.trim() || null,
        description_html: descriptionHtml.trim() || null,
        thumbnail_url: thumbnailUrl.trim() || null,
        price,
        sale_price: salePrice ? parseInt(salePrice) : null,
        badge: badge || null,
        status,
        benefits: benefits.trim() || null,
        suitable_for: suitableFor.trim() || null,
        payment_link: paymentLink.trim() || null,
        redirect_after_purchase: redirectAfterPurchase.trim() || "/cam-on",
        faq: faqParsed,
        sort_order: sortOrder,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (dbError) {
      setError(dbError.message);
      setSubmitting(false);
      return;
    }
    setSuccess(true);
    setSubmitting(false);
  }

  async function handleDelete() {
    if (
      !confirm(
        `Bạn có chắc muốn XÓA combo "${title}"? Hành động này không thể hoàn tác.`
      )
    )
      return;
    setDeleting(true);
    const { error: delError } = await supabase
      .from("combos")
      .delete()
      .eq("id", id);
    if (delError) {
      setError(delError.message);
      setDeleting(false);
      return;
    }
    router.push("/admin/combos");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar title="Chỉnh sửa combo" subtitle={title || "..."} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="card-dark p-6 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
              Đã lưu thay đổi thành công.
            </div>
          )}

          {/* Tên combo */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Tên combo <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-dark w-full"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Đường dẫn (slug) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="input-dark w-full"
              required
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              URL ảnh thumbnail
            </label>
            <input
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://..."
              className="input-dark w-full"
            />
          </div>

          {/* Mô tả ngắn */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Mô tả ngắn
            </label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={3}
              className="input-dark w-full resize-none"
            />
          </div>

          {/* Mô tả HTML */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Mô tả chi tiết (HTML)
            </label>
            <textarea
              value={descriptionHtml}
              onChange={(e) => setDescriptionHtml(e.target.value)}
              rows={6}
              className="input-dark w-full resize-none font-mono text-xs"
            />
          </div>

          {/* Giá */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Giá gốc (VNĐ) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                min={0}
                className="input-dark w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Giá bán (VNĐ)
              </label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                min={0}
                placeholder="Để trống nếu không khuyến mãi"
                className="input-dark w-full"
              />
            </div>
          </div>

          {/* Badge & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Badge</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="input-dark w-full"
              >
                <option value="">— Không có —</option>
                <option value="recommended">Đề xuất</option>
                <option value="bestseller">Bán chạy</option>
                <option value="sale">Khuyến mãi</option>
                <option value="new">Mới</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Trạng thái</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="input-dark w-full"
              >
                <option value="draft">Bản nháp</option>
                <option value="published">Đã xuất bản</option>
                <option value="hidden">Ẩn</option>
              </select>
            </div>
          </div>

          {/* Lợi ích */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Lợi ích chính (mỗi dòng 1 lợi ích)
            </label>
            <textarea
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              rows={4}
              className="input-dark w-full resize-none"
            />
          </div>

          {/* Phù hợp với ai */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Phù hợp với ai
            </label>
            <input
              type="text"
              value={suitableFor}
              onChange={(e) => setSuitableFor(e.target.value)}
              className="input-dark w-full"
            />
          </div>

          {/* Link thanh toán */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Link thanh toán
            </label>
            <input
              type="url"
              value={paymentLink}
              onChange={(e) => setPaymentLink(e.target.value)}
              placeholder="https://..."
              className="input-dark w-full"
            />
          </div>

          {/* Redirect sau mua */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Redirect sau khi mua
            </label>
            <input
              type="text"
              value={redirectAfterPurchase}
              onChange={(e) => setRedirectAfterPurchase(e.target.value)}
              className="input-dark w-full"
            />
          </div>

          {/* FAQ JSON */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              FAQ (JSON array)
            </label>
            <textarea
              value={faqRaw}
              onChange={(e) => setFaqRaw(e.target.value)}
              placeholder={'[{"q":"Câu hỏi?","a":"Trả lời."}]'}
              rows={5}
              className="input-dark w-full resize-none font-mono text-xs"
            />
            <p className="text-xs text-gray-500 mt-1">
              Định dạng: {`[{"q":"câu hỏi","a":"trả lời"}]`}
            </p>
          </div>

          {/* Thứ tự */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Thứ tự sắp xếp
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              min={0}
              className="input-dark w-full"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <button
              type="submit"
              disabled={submitting}
              className="btn-green flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-500 border border-red-300 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Xóa combo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
