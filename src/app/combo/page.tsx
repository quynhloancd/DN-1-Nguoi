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
    title: "Combo Người Mới",
    short_description:
      "Dành cho người mới muốn thử tool AI dễ dùng. Gồm 2-3 tool cơ bản + prompt mẫu + group Zalo.",
    price: 299000,
    sale_price: 199000,
    badge: "new",
    suitable_for: "Người mới bắt đầu với AI, chưa biết dùng tool nào",
    benefits: [
      "2–3 tool AI cơ bản, dễ dùng ngay",
      "Prompt mẫu có sẵn để dùng liền",
      "Vào group Zalo hỗ trợ",
    ],
  },
  {
    slug: "combo-video-ai",
    title: "Combo Video AI",
    short_description:
      "Dành cho người muốn làm video nhanh hơn. Tool video thời trang, hàng loạt, storyboard, KOL/podcast.",
    price: 799000,
    sale_price: 499000,
    badge: "recommended",
    suitable_for: "Creator, chủ shop muốn làm video bán hàng chuyên nghiệp",
    benefits: [
      "Tool video thời trang & hàng loạt",
      "Storyboard AI tự động",
      "KOL/Podcast AI",
      "Hướng dẫn quy trình thực chiến",
    ],
  },
  {
    slug: "combo-chu-shop-online",
    title: "Combo Chủ Shop Online",
    short_description:
      "Dành cho chủ shop muốn tự làm ảnh, content, video bán hàng. Tool content, ảnh sản phẩm, video ngắn, lịch đăng bài.",
    price: 999000,
    sale_price: 699000,
    badge: null,
    suitable_for: "Chủ shop thời trang, mỹ phẩm, đồ gia dụng",
    benefits: [
      "Tool tạo ảnh sản phẩm chuyên nghiệp",
      "Content bán hàng tự động",
      "Video ngắn bán hàng",
      "Lịch đăng bài hàng tuần",
    ],
  },
  {
    slug: "combo-doanh-nghiep-1-nguoi",
    title: "Combo Doanh Nghiệp 1 Người",
    short_description:
      "Bộ tool đầy đủ để tự vận hành content một mình. Nhiều tool + quy trình + hỗ trợ ưu tiên.",
    price: 1499000,
    sale_price: 999000,
    badge: "bestseller",
    suitable_for: "Người muốn tự vận hành toàn bộ content marketing",
    benefits: [
      "Toàn bộ tool AI thực chiến",
      "Quy trình vận hành content đầy đủ",
      "Hỗ trợ ưu tiên 1-1",
      "Cập nhật tool mới miễn phí 3 tháng",
    ],
    highlight: true,
  },
];

function formatVND(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function BadgeLabel({ badge }: { badge: string | null }) {
  if (!badge) return null;
  const map: Record<string, { label: string; className: string }> = {
    recommended: {
      label: "Đề xuất",
      className:
        "border border-orange-400 text-orange-400 bg-orange-400/10 px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
    bestseller: {
      label: "Bán chạy",
      className:
        "bg-[#F97316] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold",
    },
    sale: {
      label: "Khuyến mãi",
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

export default function ComboPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#1C2A44] py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Combo Tool AI Cho Doanh Nghiệp 1 Người
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
          Tiết kiệm hơn mua lẻ từng tool — mua combo để có đủ bộ và tiết kiệm đến 40%
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
                          <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Phù hợp với ai */}
                  <p
                    className={`text-xs ${
                      isHighlight ? "text-slate-400" : "text-slate-400"
                    }`}
                  >
                    Phù hợp với: {combo.suitable_for}
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
                      Tiết kiệm {formatVND(saving)} so với mua lẻ
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
                      Xem chi tiết
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
