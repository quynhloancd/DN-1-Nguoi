import Link from "next/link";

interface Combo {
  slug: string;
  title: string;
  short_description: string;
  price: number;
  sale_price: number;
  badge: string | null;
  suitable_for: string;
  benefits: string[] | null;
  highlight?: boolean;
}

const COMBOS: Combo[] = [
  {
    slug: "combo-nguoi-moi",
    title: "Combo Ng??i M?i",
    short_description:
      "D�nh cho ng??i m?i mu?n th? tool AI d? d�ng. G?m 2-3 tool c? b?n + prompt m?u + group Zalo.",
    price: 299000,
    sale_price: 199000,
    badge: "new",
    suitable_for: "Ng??i m?i b?t ??u v?i AI, ch?a bi?t d�ng tool n�o",
    benefits: [
      "2�3 tool AI c? b?n, d? d�ng ngay",
      "Prompt m?u c� s?n ?? d�ng li?n",
      "V�o group Zalo h? tr?",
    ],
  },
  {
    slug: "combo-video-ai",
    title: "Combo Video AI",
    short_description:
      "D�nh cho ng??i mu?n l�m video nhanh h?n. Tool video th?i trang, h�ng lo?t, storyboard, KOL/podcast.",
    price: 799000,
    sale_price: 499000,
    badge: "recommended",
    suitable_for: "Creator, ch? shop mu?n l�m video b�n h�ng chuy�n nghi?p",
    benefits: [
      "Tool video th?i trang & h�ng lo?t",
      "Storyboard AI t? ??ng",
      "KOL/Podcast AI",
      "H??ng d?n quy tr�nh th?c chi?n",
    ],
  },
  {
    slug: "combo-chu-shop-online",
    title: "Combo Ch? Shop Online",
    short_description:
      "D�nh cho ch? shop mu?n t? l�m ?nh, content, video b�n h�ng. Tool content, ?nh s?n ph?m, video ng?n, l?ch ??ng b�i.",
    price: 999000,
    sale_price: 699000,
    badge: null,
    suitable_for: "Ch? shop th?i trang, m? ph?m, ?? gia d?ng",
    benefits: [
      "Tool t?o ?nh s?n ph?m chuy�n nghi?p",
      "Content b�n h�ng t? ??ng",
      "Video ng?n b�n h�ng",
      "L?ch ??ng b�i h�ng tu?n",
    ],
  },
  {
    slug: "combo-doanh-nghiep-1-nguoi",
    title: "Combo Doanh Nghi?p 1 Ng??i",
    short_description:
      "B? tool ??y ?? ?? t? v?n h�nh content m?t m�nh. Nhi?u tool + quy tr�nh + h? tr? ?u ti�n.",
    price: 1499000,
    sale_price: 999000,
    badge: "bestseller",
    suitable_for: "Ng??i mu?n t? v?n h�nh to�n b? content marketing",
    benefits: [
      "To�n b? tool AI th?c chi?n",
      "Quy tr�nh v?n h�nh content ??y ??",
      "H? tr? ?u ti�n 1-1",
      "C?p nh?t tool m?i mi?n ph� 3 th�ng",
    ],
    highlight: true,
  },
];

function formatVND(price: number): string {
  return price.toLocaleString("vi-VN") + "?";
}

function BadgeLabel({ badge }: { badge: string | null }) {
  if (!badge) return null;
  const map: Record<string, { label: string; className: string }> = {
    recommended: {
      label: "?? xu?t",
      className:
        "border border-orange-400 text-orange-400 bg-orange-400/10 px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
    bestseller: {
      label: "B�n ch?y",
      className:
        "bg-[#F97316] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
    sale: {
      label: "Khuy?n m�i",
      className:
        "bg-red-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
    new: {
      label: "M?i",
      className:
        "bg-blue-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
  };
  const cfg = map[badge];
  if (!cfg) return null;
  return <span className={cfg.className}>{cfg.label}</span>;
}

export default function ComboPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#1C2A44] py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Combo Tool AI Cho Doanh Nghi?p 1 Ng??i
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
          Ti?t ki?m h?n mua l? t?ng tool � mua combo ?? c� ?? b? v� ti?t ki?m ??n 40%
        </p>
      </section>

      {/* Grid combo cards */}
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMBOS.map((combo) => {
            const saving = combo.price - combo.sale_price;
            const isHighlight = combo.highlight;

            return (
              <div
                key={combo.slug}
                className={`rounded-2xl flex flex-col overflow-hidden transition-all ${
                  isHighlight
                    ? "bg-[#1C2A44] text-white shadow-xl ring-2 ring-[#F97316] ring-offset-2"
                    : combo.badge === "recommended"
                    ? "bg-white border border-orange-300 shadow-md shadow-orange-100"
                    : "bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md"
                }`}
              >
                {/* Thumbnail placeholder */}
                <div
                  className={`h-36 flex items-center justify-center text-2xl font-bold ${
                    isHighlight
                      ? "bg-[#162236]"
                      : "bg-gradient-to-br from-[#1C2A44] to-[#2d4a7a]"
                  }`}
                >
                  <span
                    className={`text-4xl font-black tracking-tight ${
                      isHighlight ? "text-orange-400" : "text-white/30"
                    }`}
                  >
                    {combo.title.charAt(6).toUpperCase()}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  {/* Badge + title */}
                  <div className="flex items-start gap-2 flex-wrap">
                    {combo.badge && <BadgeLabel badge={combo.badge} />}
                  </div>
                  <h2
                    className={`text-xl font-bold leading-snug ${
                      isHighlight ? "text-white" : "text-[#1C2A44]"
                    }`}
                  >
                    {combo.title}
                  </h2>

                  {/* Short desc */}
                  <p
                    className={`text-sm leading-relaxed ${
                      isHighlight ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {combo.short_description}
                  </p>

                  {/* Benefits checklist */}
                  {combo.benefits && (
                    <ul className="space-y-1.5">
                      {combo.benefits.map((b, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2 text-sm ${
                            isHighlight ? "text-slate-200" : "text-slate-600"
                          }`}
                        >
                          <span className="text-green-400 mt-0.5 shrink-0">?</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Ph� h?p v?i ai */}
                  <p
                    className={`text-xs ${
                      isHighlight ? "text-slate-400" : "text-slate-400"
                    }`}
                  >
                    Ph� h?p v?i: {combo.suitable_for}
                  </p>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-[#F97316]">
                        {formatVND(combo.sale_price)}
                      </span>
                      <span
                        className={`text-sm line-through ${
                          isHighlight ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        {formatVND(combo.price)}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-green-400">
                      Ti?t ki?m {formatVND(saving)} so v?i mua l?
                    </p>
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
                      Xem chi ti?t
                    </Link>
                    <Link
                      href={`/combo/${combo.slug}#mua`}
                      className="flex-1 text-center text-sm font-semibold bg-[#F97316] text-white rounded-lg py-2 hover:bg-orange-600 transition-colors"
                    >
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA cu?i */}
      <section className="bg-white border-t border-[#E2E8F0] py-12 px-4 text-center">
        <p className="text-slate-600 text-base">
          Ch?a ch?c ch?n combo n�o?{" "}
          <Link
            href="/tool-ai"
            className="text-[#F97316] font-semibold hover:underline"
          >
            Xem t?ng tool tr??c ?
          </Link>
        </p>
      </section>
    </div>
  );
}
