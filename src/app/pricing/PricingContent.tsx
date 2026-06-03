"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Crown,
  Sparkles,
  Users,
  BookOpen,
  MessageCircle,
  FileText,
  Award,
  Headphones,
  Star,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/* ─── Types ──────────────────────────────────────────── */

interface PricingTier {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted: boolean;
  badge?: string;
}

/* ─── Data ───────────────────────────────────────────── */

const TIERS: PricingTier[] = [
  {
    name: "Bắt Đầu",
    price: "0đ",
    priceNote: "Mãi mãi miễn phí",
    description: "Nhận checklist thực tế và bắt đầu tiết kiệm thời gian ngay hôm nay.",
    icon: Users,
    features: [
      "Checklist: 5 việc giao cho AI ngay",
      "Truy cập cộng đồng học viên",
      "Blog & tài nguyên AI miễn phí",
      "Cập nhật tip AI workflow hàng tuần",
    ],
    cta: "Nhận miễn phí ngay",
    ctaHref: "/register",
    highlighted: false,
  },
  {
    name: "Workflow n8n",
    price: "149.000đ",
    priceNote: "một lần, dùng mãi",
    description: "Bộ workflow tự động hoá đóng gói sẵn — cài xong dùng ngay, tiết kiệm 5-10h/tuần.",
    icon: BookOpen,
    features: [
      "Bộ workflow n8n cơ bản sẵn sàng import",
      "Hướng dẫn từng bước bằng video tiếng Việt",
      "Tài liệu cấu hình chi tiết",
      "Hỗ trợ qua Zalo khi cài đặt",
      "Cập nhật workflow khi có phiên bản mới",
    ],
    cta: "Mua ngay — 149.000đ",
    ctaHref: "/courses",
    highlighted: true,
    badge: "Phổ biến nhất",
  },
  {
    name: "Tư Vấn 1-1",
    price: "1.000.000đ",
    priceNote: "từ / buổi",
    description: "Thiết lập hệ thống AI riêng cho shop hoặc doanh nghiệp của bạn — trọn gói.",
    icon: Crown,
    features: [
      "Phân tích quy trình công việc hiện tại",
      "Setup workflow n8n tùy chỉnh theo yêu cầu",
      "Đào tạo team sử dụng thành thục",
      "Hỗ trợ sau setup 30 ngày",
      "Tư vấn qua Zoom hoặc gặp trực tiếp (TP.HCM)",
    ],
    cta: "Đặt lịch tư vấn",
    ctaHref: siteConfig.socials.zalo,
    highlighted: false,
  },
];

const FAQ_DATA = [
  {
    q: "Tôi không rành công nghệ, có dùng được workflow n8n không?",
    a: "Hoàn toàn được! Bộ workflow được đóng gói sẵn với hướng dẫn từng bước bằng tiếng Việt. Bạn chỉ cần làm theo video là xong, thường dưới 30 phút. Có hỗ trợ qua Zalo nếu gặp khó khăn.",
  },
  {
    q: "Mua workflow n8n 149k xong thì nhận được gì?",
    a: "Bạn nhận: file workflow n8n sẵn sàng import, video hướng dẫn từng bước, tài liệu cấu hình, và hỗ trợ qua Zalo trong quá trình cài đặt. Dùng vĩnh viễn, không phí hàng tháng.",
  },
  {
    q: "Tư vấn 1-1 dành cho loại hình doanh nghiệp nào?",
    a: "Phù hợp nhất với: chủ shop online, SME dưới 20 người, quản lý muốn tự động hoá báo cáo, đại lý/phân phối muốn tối ưu quy trình. Thiên Huệ sẽ phân tích cụ thể quy trình của bạn trước khi đề xuất giải pháp.",
  },
  {
    q: "Chứng chỉ hoàn thành khoá học có giá trị gì?",
    a: "Chứng chỉ được cấp bởi Doanh Nghiệp 1 Người sau khi bạn hoàn thành khoá học và vượt qua bài kiểm tra. Bạn có thể chia sẻ chứng chỉ trên LinkedIn và CV.",
  },
  {
    q: "Thanh toán bằng phương thức nào?",
    a: "Hỗ trợ chuyển khoản ngân hàng qua mã QR — xác nhận tự động, kích hoạt tài khoản ngay lập tức sau khi thanh toán thành công.",
  },
];

/* ─── Component ──────────────────────────────────────── */

export default function PricingContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-[#1B2A4A]">
      {/* ═══ HERO ═══ */}
      <section className="pt-28 sm:pt-36 pb-10 sm:pb-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{
              background: "rgba(232,93,4,0.1)",
              border: "1px solid rgba(232,93,4,0.25)",
              color: "#E85D04",
            }}
          >
            <Sparkles size={13} /> Chọn gói phù hợp với bạn
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.3] sm:leading-[1.25] mb-6">
            Đầu tư cho{" "}
            <span className="text-[#E85D04]">tương lai của bạn</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Bắt đầu miễn phí hoặc chọn gói nâng cao để truy cập toàn bộ khoá
            học, tài liệu và hỗ trợ từ {siteConfig.name}.
          </p>
        </div>
      </section>

      {/* ═══ PRICING CARDS ═══ */}
      <section className="pb-14 sm:pb-20 px-4">
        <div className="max-w-5xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-7 sm:p-8 rounded-2xl transition-all duration-200 ${
                tier.highlighted ? "md:-translate-y-3" : ""
              }`}
              style={{
                background: tier.highlighted
                  ? "linear-gradient(180deg, rgba(232,93,4,0.06) 0%, #FFFFFF 40%)"
                  : "#FFFFFF",
                border: tier.highlighted
                  ? "2px solid rgba(232,93,4,0.5)"
                  : "1px solid #E5E7EB",
              }}
            >
              {/* Badge */}
              {tier.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #E85D04, #FBBF24)",
                    color: "#131921",
                  }}
                >
                  <Star size={11} className="inline -mt-0.5 mr-1" />
                  {tier.badge}
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: tier.highlighted
                        ? "#FFF3E0"
                        : "#F8F9FA",
                    }}
                  >
                    <tier.icon
                      size={20}
                      style={{
                        color: tier.highlighted ? "#E85D04" : "#888",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B2A4A]">{tier.name}</h3>
                </div>

                <div className="flex items-baseline gap-1.5 mb-3">
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold ${
                      tier.highlighted ? "text-[#E85D04]" : "text-[#1B2A4A]"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {tier.priceNote}
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Features */}
              <div className="flex-1 mb-8">
                <div className="space-y-3">
                  {tier.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`shrink-0 mt-0.5 ${
                          tier.highlighted
                            ? "text-[#E85D04]"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {tier.ctaHref.startsWith("http") ? (
                <a
                  href={tier.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-lg transition-all duration-200 ${
                    tier.highlighted
                      ? "btn-green"
                      : "bg-[#F8F9FA] text-[#1B2A4A] hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  <MessageCircle size={16} />
                  {tier.cta}
                </a>
              ) : (
                <Link
                  href={tier.ctaHref}
                  className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-lg transition-all duration-200 ${
                    tier.highlighted
                      ? "btn-green"
                      : "bg-[#F8F9FA] text-[#1B2A4A] hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {tier.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURE COMPARISON ═══ */}
      <section className="pb-14 sm:pb-20 px-4" style={{ background: "#F8F9FA" }}>
        <div className="max-w-3xl mx-auto pt-14 sm:pt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            So sánh các gói
          </h2>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #E5E7EB" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#F8F9FA" }}>
                  <th className="text-left p-4 sm:p-5 text-gray-600 font-medium">
                    Tính năng
                  </th>
                  <th className="p-4 sm:p-5 text-gray-600 font-medium text-center">
                    Miễn Phí
                  </th>
                  <th
                    className="p-4 sm:p-5 font-medium text-center"
                    style={{ color: "#E85D04" }}
                  >
                    Standard
                  </th>
                  <th className="p-4 sm:p-5 text-gray-600 font-medium text-center">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Cộng đồng học viên", free: true, standard: true, premium: true },
                  { feature: "Khoá học miễn phí", free: "1", standard: "Tất cả", premium: "Tất cả" },
                  { feature: "Blog & tài nguyên", free: true, standard: true, premium: true },
                  { feature: "Quiz & chứng chỉ", free: false, standard: true, premium: true },
                  { feature: "Tài liệu khoá học", free: false, standard: true, premium: true },
                  { feature: "Tư vấn 1-1", free: false, standard: false, premium: true },
                  { feature: "Tài liệu độc quyền", free: false, standard: false, premium: true },
                  { feature: "Ưu tiên hỗ trợ", free: false, standard: false, premium: true },
                  { feature: "Nhóm mastermind", free: false, standard: false, premium: true },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "#FFFFFF" : "#F8F9FA",
                      borderTop: "1px solid #E5E7EB",
                    }}
                  >
                    <td className="p-4 sm:p-5 text-gray-700">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-center">
                      <ComparisonCell value={row.free} />
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <ComparisonCell value={row.standard} highlighted />
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <ComparisonCell value={row.premium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ TRUST SIGNALS ═══ */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Award,
                title: "Chứng chỉ uy tín",
                desc: "Nhận chứng chỉ hoàn thành từ Doanh Nghiệp 1 Người.",
              },
              {
                icon: Headphones,
                title: "Hỗ trợ tận tâm",
                desc: "Đội ngũ hỗ trợ sẵn sàng giải đáp mọi thắc mắc của bạn.",
              },
              {
                icon: FileText,
                title: "Nội dung cập nhật",
                desc: "Khoá học được cập nhật liên tục với xu hướng mới nhất.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-xl text-center"
                style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#FFF3E0" }}
                >
                  <item.icon size={22} className="text-[#E85D04]" />
                </div>
                <h3 className="font-semibold text-[#1B2A4A] text-sm sm:text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section
        className="py-14 sm:py-20 px-4"
        style={{ background: "#F8F9FA" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Câu Hỏi Thường Gặp
          </h2>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                >
                  <span className="text-sm sm:text-base font-medium text-[#1B2A4A]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-500 shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openFaq === i ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Tham gia cộng đồng hơn 1,200+ học viên đang làm chủ Video AI và xây
            dựng thương hiệu cá nhân cùng {siteConfig.name}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="btn-green text-sm sm:text-base py-3.5 px-8"
            >
              Bắt đầu miễn phí
            </Link>
            <Link
              href="/courses"
              className="text-sm sm:text-base py-3.5 px-8 font-bold rounded-lg bg-[#F8F9FA] text-[#1B2A4A] hover:bg-gray-200 border border-gray-200 transition-all duration-200"
            >
              Xem khoá học
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Helper ──────────────────────────────────────────── */

function ComparisonCell({
  value,
  highlighted,
}: {
  value: boolean | string;
  highlighted?: boolean;
}) {
  if (typeof value === "string") {
    return (
      <span
        className={`text-sm font-medium ${
          highlighted ? "text-[#E85D04]" : "text-gray-700"
        }`}
      >
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <Check
        size={16}
        className={`inline-block ${
          highlighted ? "text-[#E85D04]" : "text-green-500"
        }`}
      />
    );
  }
  return <span className="text-gray-500">—</span>;
}
