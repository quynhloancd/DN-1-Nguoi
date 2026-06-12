import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface ComboTool {
  id: string;
  tool_title: string;
  sort_order: number;
  tools?: { price: number } | null;
}

interface Combo {
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
  benefits: string | null;
  suitable_for: string | null;
  payment_link: string | null;
  redirect_after_purchase: string | null;
  faq: { q: string; a: string }[] | null;
}

function formatVND(price: number): string {
  return price.toLocaleString("vi-VN") + "?";
}

function BadgeLabel({ badge }: { badge: string | null }) {
  if (!badge) return null;
  const map: Record<string, { label: string; className: string }> = {
    recommended: {
      label: "?? xu?t",
      className:
        "border border-orange-400 text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full text-sm font-semibold",
    },
    bestseller: {
      label: "B�n ch?y",
      className:
        "bg-[#F97316] text-white px-3 py-1 rounded-full text-sm font-semibold",
    },
    sale: {
      label: "Khuy?n m�i",
      className:
        "bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold",
    },
    new: {
      label: "M?i",
      className:
        "bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold",
    },
  };
  const cfg = map[badge];
  if (!cfg) return null;
  return <span className={cfg.className}>{cfg.label}</span>;
}

export default async function ComboDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: combo } = await supabase
    .from("combos")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single<Combo>();

  if (!combo) notFound();

  // Fetch combo tools
  const { data: comboTools } = await supabase
    .from("combo_tools")
    .select("id, tool_title, sort_order, tools(price)")
    .eq("combo_id", combo.id)
    .order("sort_order");

  const tools: ComboTool[] = (comboTools as ComboTool[] | null) ?? [];

  const displayPrice = combo.sale_price ?? combo.price;
  const saving = combo.sale_price ? combo.price - combo.sale_price : 0;

  // T�nh t?ng gi� l? t? c�c tool
  const totalRetailPrice = tools.reduce((sum, t) => {
    const price = (t.tools as { price: number } | null)?.price ?? 0;
    return sum + price;
  }, 0);
  const savingVsRetail =
    totalRetailPrice > 0 ? totalRetailPrice - displayPrice : 0;

  const benefits = combo.benefits
    ? combo.benefits
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean)
    : [];

  const faqItems = Array.isArray(combo.faq) ? combo.faq : [];
  const paymentHref = combo.payment_link || "#mua";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#1C2A44] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex items-center gap-3 flex-wrap">
            <Link
              href="/combo"
              className="text-slate-400 text-sm hover:text-white transition-colors"
            >
              ? Xem t?t c? combo
            </Link>
            {combo.badge && <BadgeLabel badge={combo.badge} />}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {combo.title}
          </h1>
          {combo.short_description && (
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              {combo.short_description}
            </p>
          )}

          {/* Price + CTA in hero */}
          <div className="bg-white/10 rounded-2xl p-6 inline-block">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-extrabold text-[#F97316]">
                {formatVND(displayPrice)}
              </span>
              {combo.sale_price && (
                <span className="text-xl text-slate-400 line-through">
                  {formatVND(combo.price)}
                </span>
              )}
            </div>
            {saving > 0 && (
              <p className="text-green-400 text-sm font-medium mb-4">
                Ti?t ki?m {formatVND(saving)} so v?i gi� g?c
              </p>
            )}
            <a
              href={paymentHref}
              className="inline-block bg-[#F97316] text-white font-bold text-lg px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors"
            >
              Mua ngay
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* D�nh cho ai */}
        {combo.suitable_for && (
          <section>
            <h2 className="text-2xl font-bold text-[#1C2A44] mb-4">
              Combo n�y d�nh cho ai?
            </h2>
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
              <p className="text-slate-600 text-base leading-relaxed">
                {combo.suitable_for}
              </p>
            </div>
          </section>
        )}

        {/* Tool list */}
        {tools.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-[#1C2A44] mb-4">
              Combo g?m nh?ng tool n�o?
            </h2>
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              {tools.map((tool, idx) => {
                const toolPrice = (tool.tools as { price: number } | null)
                  ?.price;
                return (
                  <div
                    key={tool.id}
                    className={`flex items-center justify-between px-6 py-4 ${
                      idx < tools.length - 1
                        ? "border-b border-[#E2E8F0]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#1C2A44] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 font-medium">
                        {tool.tool_title}
                      </span>
                    </div>
                    {toolPrice !== undefined && toolPrice > 0 && (
                      <span className="text-slate-400 text-sm">
                        {formatVND(toolPrice)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* So s�nh gi� l? */}
        {totalRetailPrice > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-[#1C2A44] mb-4">
              N?u mua l? s? t?n bao nhi�u?
            </h2>
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>T?ng gi� khi mua l? t?ng tool</span>
                <span className="font-semibold line-through text-slate-400">
                  {formatVND(totalRetailPrice)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Gi� combo</span>
                <span className="font-bold text-[#F97316]">
                  {formatVND(displayPrice)}
                </span>
              </div>
              {savingVsRetail > 0 && (
                <div className="border-t border-[#E2E8F0] pt-3 flex justify-between">
                  <span className="font-semibold text-[#1C2A44]">
                    B?n ti?t ki?m ???c
                  </span>
                  <span className="font-extrabold text-green-500 text-lg">
                    {formatVND(savingVsRetail)}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-[#1C2A44] mb-4">
              B?n nh?n ???c g�?
            </h2>
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="text-green-500 font-bold mt-0.5 shrink-0">
                      ?
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Description HTML */}
        {combo.description_html && (
          <section>
            <div
              className="bg-white rounded-xl border border-[#E2E8F0] p-6 prose max-w-none text-slate-600"
              dangerouslySetInnerHTML={{ __html: combo.description_html }}
            />
          </section>
        )}

        {/* CTA block */}
        <section
          id="mua"
          className="bg-[#1C2A44] rounded-2xl p-8 text-center space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">{combo.title}</h2>
          <div className="flex items-baseline justify-center gap-3">
            <span className="text-4xl font-extrabold text-[#F97316]">
              {formatVND(displayPrice)}
            </span>
            {combo.sale_price && (
              <span className="text-xl text-slate-400 line-through">
                {formatVND(combo.price)}
              </span>
            )}
          </div>
          {saving > 0 && (
            <p className="text-green-400 text-sm">
              Ti?t ki?m {formatVND(saving)} so v?i gi� g?c
            </p>
          )}
          <a
            href={paymentHref}
            className="inline-block bg-[#F97316] text-white font-bold text-xl px-10 py-4 rounded-xl hover:bg-orange-600 transition-colors mt-2"
          >
            Mua ngay � {formatVND(displayPrice)}
          </a>
        </section>

        {/* FAQ */}
        {faqItems.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-[#1C2A44] mb-4">
              C�u h?i th??ng g?p
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-[#E2E8F0] p-6"
                >
                  <p className="font-semibold text-[#1C2A44] mb-2">{item.q}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
