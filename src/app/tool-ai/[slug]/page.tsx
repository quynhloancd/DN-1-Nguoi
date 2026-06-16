import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import ToolBuyPanel from "@/components/tool-ai/ToolBuyPanel";
import {
  getUserToolOrder,
  computeToolAccess,
  getBankTransferInfo,
} from "@/lib/tool-access";

export const dynamic = "force-dynamic";

type Tool = {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  description_html: string | null;
  thumbnail_url: string | null;
  price: number;
  sale_price: number | null;
  badge: string | null;
  status: string;
  demo_video_url: string | null;
  tool_link: string | null;
  guide_url: string | null;
  prompt_template: string | null;
  what_you_get: string | null;
  suitable_for: string | null;
  cta_text: string;
  payment_link: string | null;
  faq: { q: string; a: string }[] | null;
};

const BADGE_LABELS: Record<string, string> = {
  free: "Miễn phí",
  featured: "Nổi bật",
  bestseller: "Bán chạy",
  new: "Mới",
  sale: "Giảm giá",
};

function formatPrice(p: number) {
  return p.toLocaleString("vi-VN") + "đ";
}

function getYouTubeId(url: string) {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/
  );
  return m ? m[1] : null;
}

function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("tools")
    .select("title, short_description")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  return {
    title: data?.title ?? "Tool AI",
    description: data?.short_description ?? "",
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: tool } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single<Tool>();

  if (!tool) notFound();

  // ── Quyền truy cập ──────────────────────────────────────────────
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;
  const price = tool.sale_price || tool.price;
  let order = null;
  if (isLoggedIn && price > 0) {
    const admin = await createAdminClient();
    order = await getUserToolOrder(admin, user!.id, tool.id);
  }
  const { hasAccess } = computeToolAccess({ isLoggedIn, price, order });
  const pendingInfo =
    order && order.status === "pending"
      ? { order_code: order.order_code, amount: order.amount }
      : null;
  const bank = getBankTransferInfo();

  const ctaHref = "#mua";
  const ytId = tool.demo_video_url ? getYouTubeId(tool.demo_video_url) : null;
  const whatLines = tool.what_you_get ? parseLines(tool.what_you_get) : [];
  const suitableLines = tool.suitable_for ? parseLines(tool.suitable_for) : [];
  const faqs = Array.isArray(tool.faq) ? tool.faq : [];

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section style={{ background: "#1C2A44" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 text-white">
            {tool.badge && (
              <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white">
                {BADGE_LABELS[tool.badge] ?? tool.badge}
              </span>
            )}
            <h1 className="text-2xl md:text-4xl font-extrabold leading-snug mb-4">
              {tool.title}
            </h1>
            {tool.short_description && (
              <p className="text-blue-100 text-base mb-6 leading-relaxed">
                {tool.short_description}
              </p>
            )}
            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6">
              {tool.sale_price ? (
                <>
                  <span className="text-3xl font-extrabold text-orange-400">
                    {formatPrice(tool.sale_price)}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(tool.price)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-extrabold text-orange-400">
                  {tool.price === 0 ? "Miễn phí" : formatPrice(tool.price)}
                </span>
              )}
            </div>
            <a
              href={ctaHref}
              className="inline-block px-8 py-3 rounded-xl font-bold text-white text-base transition-all"
              style={{ background: "#E85D04" }}
            >
              {tool.cta_text}
            </a>
          </div>

          {tool.thumbnail_url && (
            <div className="shrink-0 w-full md:w-72">
              <img
                src={tool.thumbnail_url}
                alt={tool.title}
                className="rounded-2xl w-full object-cover shadow-2xl"
              />
            </div>
          )}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-14">
        {/* ── Tool giúp bạn làm gì ───────────────────────────────────────── */}
        {whatLines.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-[#1C2A44] mb-5">
              Tool này giúp bạn làm gì?
            </h2>
            <ul className="space-y-3">
              {whatLines.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-orange-500 shrink-0">✓</span>
                  <span className="text-gray-700">{line}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Bạn nhận được gì ───────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[#1C2A44] mb-5">
            Bạn nhận được gì?
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
            {[
              tool.tool_link && "Link truy cập tool sau khi thanh toán",
              tool.prompt_template && "Prompt mẫu kèm hướng dẫn cách dùng",
              tool.guide_url && "Hướng dẫn sử dụng từng bước",
              "Hỗ trợ qua nhóm Zalo",
              tool.demo_video_url && "Video demo thực tế",
            ]
              .filter(Boolean)
              .map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-green-500 text-lg">✔</span>
                  <span className="text-gray-800">{item as string}</span>
                </div>
              ))}
          </div>
        </section>

        {/* ── Dành cho ai ────────────────────────────────────────────────── */}
        {suitableLines.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-[#1C2A44] mb-5">
              Dành cho ai?
            </h2>
            <ul className="space-y-3">
              {suitableLines.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-blue-500 shrink-0">→</span>
                  <span className="text-gray-700">{line}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Truy cập / Mua (khóa nội dung theo quyền) ──────────────────── */}
        <section id="mua">
          {hasAccess ? (
            <>
              <h2 className="text-xl font-bold text-[#1C2A44] mb-4">
                Nội dung tool của bạn ✅
              </h2>
              <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 space-y-4">
                {tool.tool_link && (
                  <a
                    href={tool.tool_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                    style={{ background: "#16a34a" }}
                  >
                    → Mở tool ngay
                  </a>
                )}
                {tool.guide_url && (
                  <div>
                    <a
                      href={tool.guide_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      📘 Hướng dẫn sử dụng từng bước
                    </a>
                  </div>
                )}
                {tool.prompt_template && (
                  <div>
                    <p className="font-semibold text-[#1C2A44] mb-2">Prompt mẫu:</p>
                    <pre className="bg-white rounded-xl p-5 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed overflow-x-auto border border-gray-200">
                      {tool.prompt_template}
                    </pre>
                  </div>
                )}
                {!tool.tool_link && !tool.guide_url && !tool.prompt_template && (
                  <p className="text-gray-600">
                    Tool đã được mở khóa. Nội dung chi tiết sẽ được gửi qua Zalo/email.
                  </p>
                )}
              </div>
            </>
          ) : (
            <ToolBuyPanel
              toolId={tool.id}
              amount={price}
              ctaText={tool.cta_text}
              isLoggedIn={isLoggedIn}
              initialPending={pendingInfo}
              bank={bank}
            />
          )}
        </section>

        {/* ── Demo video ─────────────────────────────────────────────────── */}
        {ytId && (
          <section>
            <h2 className="text-xl font-bold text-[#1C2A44] mb-4">
              Video demo
            </h2>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                title="Demo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </section>
        )}

        {/* ── Cách nhận tool ─────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[#1C2A44] mb-5">
            Cách nhận tool
          </h2>
          <ol className="space-y-3">
            {[
              "Chọn tool phù hợp",
              "Thanh toán qua link bên dưới",
              "Nhận link tool + hướng dẫn sử dụng",
              "Vào nhóm Zalo để được hỗ trợ",
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  {i + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-[#1C2A44] mb-5">
              Câu hỏi thường gặp
            </h2>
            <div className="space-y-3">
              {faqs.map((item, i) => (
                <details
                  key={i}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-[#1C2A44] select-none hover:bg-gray-50">
                    {item.q}
                  </summary>
                  <div className="px-5 py-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 bg-gray-50">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA cuối ───────────────────────────────────────────────────── */}
        <section className="text-center py-8 space-y-4">
          <a
            href={ctaHref}
            className="inline-block px-10 py-4 rounded-xl font-bold text-white text-lg transition-all"
            style={{ background: "#E85D04" }}
          >
            {tool.cta_text}
          </a>
          <div>
            <Link
              href="/combo"
              className="text-sm text-blue-600 hover:underline"
            >
              Xem combo tiết kiệm hơn →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
