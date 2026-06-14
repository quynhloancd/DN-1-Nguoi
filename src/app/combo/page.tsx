import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface Combo {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  price: number;
  sale_price: number | null;
  badge: string | null;
  suitable_for: string | null;
  benefits: string | null;
  sort_order: number | null;
}

function formatVND(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function parseBenefits(benefits: string | null): string[] {
  if (!benefits) return [];
  return benefits
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);
}

function BadgeLabel({ badge }: { badge: string | null }) {
  if (!badge) return null;
  const map: Record<string, { label: string; className: string }> = {
    recommended: {
      label: "Đề xuất",
      className:
        "border border-orange-400 text-orange-500 bg-orange-50 px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
    bestseller: {
      label: "Bán chạy",
      className:
        "bg-[#F97316] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
    sale: {
      label: "Tiết kiệm",
      className:
        "bg-red-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
    new: {
      label: "Mới",
      className:
        "bg-blue-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
  };
  const cfg = map[badge];
  if (!cfg) return null;
  return <span className={cfg.className}>{cfg.label}</span>;
}

export default async function ComboPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("combos")
    .select(
      "id, slug, title, short_description, price, sale_price, badge, suitable_for, benefits, sort_order"
    )
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("price", { ascending: true });

  const combos: Combo[] = (data as Combo[] | null) ?? [];

  // Combo có giá cao nhất sẽ được làm nổi bật bằng nền navy.
  const maxPrice = combos.reduce(
    (max, c) => Math.max(max, c.sale_price ?? c.price),
    0
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#1C2A44] py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Combo Tool AI Cho Doanh Nghiệp 1 Người
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
          Tiết kiệm hơn mua lẻ từng tool — mua combo để có đủ bộ tool và tiết
          kiệm chi phí.
        </p>
      </section>

      {/* Grid combo cards */}
      <section className="px-4 py-12 max-w-5xl mx-auto">
        {combos.length === 0 ? (
          <div className="text-center text-slate-500 py-16">
            <p className="text-lg">Chưa có combo nào đang được bán.</p>
            <p className="text-sm mt-2">
              Vui lòng quay lại sau hoặc{" "}
              <Link
                href="/tool-ai"
                className="text-[#F97316] font-semibold hover:underline"
              >
                xem từng tool lẻ
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {combos.map((combo) => {
              const displayPrice = combo.sale_price ?? combo.price;
              const saving = combo.sale_price
                ? combo.price - combo.sale_price
                : 0;
              const benefits = parseBenefits(combo.benefits);
              const isHighlight =
                displayPrice === maxPrice && combos.length > 1;
              const isRecommended = combo.badge === "recommended";

              return (
                <div
                  key={combo.id}
                  className={`rounded-2xl flex flex-col overflow-hidden transition-all ${
                    isHighlight
                      ? "bg-[#1C2A44] text-white shadow-xl ring-2 ring-[#F97316] ring-offset-2"
                      : isRecommended
                      ? "bg-white border-2 border-orange-400 shadow-md shadow-orange-100"
                      : "bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    {/* Badge + title */}
                    {combo.badge && (
                      <div className="flex items-start gap-2 flex-wrap">
                        <BadgeLabel badge={combo.badge} />
                      </div>
                    )}
                    <h2
                      className={`text-xl font-bold leading-snug ${
                        isHighlight ? "text-white" : "text-[#1C2A44]"
                      }`}
                    >
                      {combo.title}
                    </h2>

                    {/* Short desc */}
                    {combo.short_description && (
                      <p
                        className={`text-sm leading-relaxed ${
                          isHighlight ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {combo.short_description}
                      </p>
                    )}

                    {/* Benefits checklist — danh sách nhận được */}
                    {benefits.length > 0 && (
                      <ul className="space-y-1.5">
                        {benefits.map((b, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 text-sm ${
                              isHighlight ? "text-slate-200" : "text-slate-600"
                            }`}
                          >
                            <span className="text-green-400 mt-0.5 shrink-0">
                              ✓
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Phù hợp với ai */}
                    {combo.suitable_for && (
                      <p
                        className={`text-xs ${
                          isHighlight ? "text-slate-400" : "text-slate-400"
                        }`}
                      >
                        Phù hợp với: {combo.suitable_for}
                      </p>
                    )}

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Price — giá cam */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-[#F97316]">
                          {formatVND(displayPrice)}
                        </span>
                        {saving > 0 && (
                          <span
                            className={`text-sm line-through ${
                              isHighlight ? "text-slate-500" : "text-slate-400"
                            }`}
                          >
                            {formatVND(combo.price)}
                          </span>
                        )}
                      </div>
                      {saving > 0 && (
                        <p className="text-xs font-medium text-green-400">
                          Tiết kiệm {formatVND(saving)} so với mua lẻ
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 pt-1">
                      <Link
                        href={`/combo/${combo.slug}`}
                        className={`flex-1 text-center text-sm font-medium rounded-lg py-2 border transition-colors ${
                          isHighlight
                            ? "border-white/20 text-white hover:border-white/50"
                            : "border-slate-300 text-slate-700 hover:border-[#1C2A44] hover:text-[#1C2A44]"
                        }`}
                      >
                        Xem combo
                      </Link>
                      <Link
                        href={`/combo/${combo.slug}#mua`}
                        className="flex-1 text-center text-sm font-semibold bg-[#F97316] text-white rounded-lg py-2 hover:bg-[#EA580C] transition-colors"
                      >
                        Mua ngay
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA cuối */}
      <section className="bg-white border-t border-[#E2E8F0] py-12 px-4 text-center">
        <p className="text-slate-600 text-base">
          Chưa chắc chọn combo nào?{" "}
          <Link
            href="/tool-ai"
            className="text-[#F97316] font-semibold hover:underline"
          >
            Xem từng tool trước →
          </Link>
        </p>
      </section>
    </div>
  );
}
