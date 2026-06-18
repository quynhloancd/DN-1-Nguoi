import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/home/LeadForm";

/* ─── Mock data ─────────────────────────────────────────────── */

const painPoints = [
  { emoji: "😓", text: "Hôm nay chưa biết đăng gì" },
  { emoji: "📸", text: "Có sản phẩm nhưng ảnh/video chưa đủ cuốn" },
  { emoji: "💸", text: "Thuê người làm content tốn tiền mà vẫn phải sửa đi sửa lại" },
  { emoji: "🤔", text: "Muốn dùng AI nhưng không biết tool nào đáng dùng" },
  { emoji: "🛠️", text: "Có quá nhiều công cụ, nhưng thiếu quy trình đơn giản để ra kết quả" },
  { emoji: "😴", text: "Cảm giác làm mãi mà không hết việc, từ sáng sớm đến tận tối khuya" },
];

const features = [
  { emoji: "🔗", title: "Link tool sẵn sàng", desc: "Truy cập ngay, không cần tìm kiếm lung tung." },
  { emoji: "💬", title: "Prompt mẫu copy-paste ngay", desc: "Prompt đã được test và tối ưu cho từng tool." },
  { emoji: "📋", title: "Hướng dẫn từng bước", desc: "Video và tài liệu chi tiết dễ làm theo ngay lần đầu." },
  { emoji: "👥", title: "Group Zalo hỗ trợ", desc: "Cộng đồng hỗ trợ, giải đáp thắc mắc nhanh chóng." },
];

const featuredTools = [
  {
    slug: "tool-tao-video-thoi-trang-google-flow",
    name: "Tool Tạo Video Thời Trang với Google Flow",
    desc: "Tạo video thời trang chuyên nghiệp tự động chỉ với vài thao tác — không cần quay, không cần dựng.",
    price: "150.000đ",
    badge: "Nổi bật",
    badgeColor: "#F97316",
  },
  {
    slug: "tool-tao-video-hang-loat",
    name: "Tool Tạo Video Hàng Loạt Cực Nhanh",
    desc: "Sản xuất hàng chục video sản phẩm trong vài phút — lý tưởng cho shop bán hàng online.",
    price: "350.000đ",
    badge: "Bán chạy",
    badgeColor: "#1C2A44",
  },
  {
    slug: "tool-kol-podcast-ai",
    name: "Tool KOL Podcast AI",
    desc: "Tạo podcast và video KOL bằng AI — xây dựng thương hiệu cá nhân mà không cần lên sóng thật.",
    price: "299.000đ",
    badge: "Mới",
    badgeColor: "#FBBF24",
  },
];

const combos = [
  {
    slug: "combo",
    name: "Combo Người Mới",
    price: "199.000đ",
    desc: "Dành cho người mới, 2-3 tool dễ dùng nhất để bắt đầu làm content ngay.",
    badge: null,
    highlight: false,
    navy: false,
  },
  {
    slug: "combo",
    name: "Combo Video AI",
    price: "499.000đ",
    desc: "Tool video thời trang, hàng loạt, storyboard, KOL — đủ bộ để làm video chuyên nghiệp.",
    badge: "Đề xuất",
    highlight: true,
    navy: false,
  },
  {
    slug: "combo",
    name: "Combo Doanh Nghiệp 1 Người",
    price: "999.000đ+",
    desc: "Bộ tool đầy đủ tự vận hành content — dành cho người muốn hệ thống hóa hoàn toàn.",
    badge: null,
    highlight: false,
    navy: true,
  },
];

const freeResources = [
  "Checklist 5 bước dùng AI làm content bán hàng",
  "10 prompt tạo video AI",
  "Danh sách tool AI miễn phí cho người mới",
  "Template kế hoạch nội dung 7 ngày",
];

/* ─── Page ───────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen text-[#1C2A44] overflow-x-hidden">

      {/* ═══ KHỐI 1 — HERO ═══ */}
      <section className="bg-[#1C2A44] pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text trái */}
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.15] text-white mb-5">
                Kho{" "}
                <span style={{ color: "#F97316" }}>tool AI</span>{" "}
                cho người kinh doanh online một mình
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
                Tự làm content, ảnh, video và workflow bán hàng bằng AI — không cần thuê team, không cần biết code.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/tool-ai"
                  className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#ea6c0a] text-white font-bold py-3.5 px-7 rounded-xl transition-colors text-base"
                >
                  Xem kho Tool AI
                </Link>
                <Link
                  href="/tai-nguyen-mien-phi"
                  className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white font-semibold py-3.5 px-7 rounded-xl transition-colors text-base"
                >
                  Nhận tài nguyên miễn phí
                </Link>
              </div>
            </div>

            {/* Ảnh phải */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/anh/one-person-business-ai-system.jpg"
                  alt="Hệ thống AI cho doanh nghiệp 1 người"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KHỐI 2 — NỖI ĐAU ═══ */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-14">
            Một mình làm online, bạn đang phải gồng quá nhiều việc?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl p-5 border"
                style={{ background: "#F8FAFC", borderColor: "#E2E8F0" }}
              >
                <span className="text-3xl shrink-0">{p.emoji}</span>
                <p className="text-base font-medium text-[#1C2A44] leading-snug mt-1">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KHỐI 3 — GIẢI PHÁP ═══ */}
      <section className="bg-[#1C2A44] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-white mb-4">
            Không cần học AI quá sâu. Chỉ cần đúng tool, đúng prompt, đúng quy trình.
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12 text-base leading-relaxed">
            Mỗi tool trên Doanh Nghiệp 1 Người được đóng gói theo hướng dùng được ngay: link tool, prompt mẫu, hướng dẫn từng bước, video/demo và group Zalo hỗ trợ.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-base mb-2 text-white">{f.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KHỐI 4 — TOOL NỔI BẬT ═══ */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-14">
            Tool AI đang bán chạy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredTools.map((tool, i) => (
              <div key={i} className="flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-5xl">🤖</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {/* Badge */}
                  <span
                    className="inline-block self-start text-xs font-bold px-2.5 py-1 rounded-md mb-3"
                    style={{
                      background: tool.badgeColor,
                      color: tool.badgeColor === "#FBBF24" ? "#1C2A44" : "#ffffff",
                    }}
                  >
                    {tool.badge}
                  </span>
                  <h3 className="font-bold text-base text-[#1C2A44] mb-2 leading-snug">{tool.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{tool.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-extrabold" style={{ color: "#F97316" }}>{tool.price}</span>
                    <Link
                      href={`/tool-ai/${tool.slug}`}
                      className="text-sm font-semibold text-[#1C2A44] border border-gray-200 hover:border-[#F97316] hover:text-[#F97316] px-4 py-2 rounded-lg transition-colors"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/tool-ai"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#F97316] hover:underline"
            >
              Xem toàn bộ kho Tool AI →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ KHỐI 5 — COMBO ĐỀ XUẤT (ẩn tạm — chưa dùng tới) ═══ */}
      {false && (
      <section className="bg-[#1C2A44] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-white mb-10 sm:mb-14">
            Combo tiết kiệm hơn mua lẻ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {combos.map((c, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 flex flex-col border ${
                  c.navy
                    ? "bg-[#1C2A44] border-[#1C2A44]"
                    : c.highlight
                    ? "bg-white border-[#F97316]"
                    : "bg-white border-gray-100"
                } shadow-sm`}
              >
                {c.badge && (
                  <span
                    className="inline-block self-start text-xs font-bold px-2.5 py-1 rounded-md mb-3 text-white"
                    style={{ background: "#F97316" }}
                  >
                    {c.badge}
                  </span>
                )}
                <h3
                  className={`font-extrabold text-xl mb-1 ${c.navy ? "text-white" : "text-[#1C2A44]"}`}
                >
                  {c.name}
                </h3>
                <p
                  className="text-2xl font-extrabold mb-3"
                  style={{ color: "#F97316" }}
                >
                  {c.price}
                </p>
                <p
                  className={`text-sm leading-relaxed flex-1 mb-6 ${c.navy ? "text-gray-300" : "text-gray-500"}`}
                >
                  {c.desc}
                </p>
                <Link
                  href={`/${c.slug}`}
                  className={`inline-flex items-center justify-center font-bold py-3 px-6 rounded-xl transition-colors text-sm ${
                    c.navy
                      ? "bg-[#F97316] hover:bg-[#ea6c0a] text-white"
                      : c.highlight
                      ? "bg-[#F97316] hover:bg-[#ea6c0a] text-white"
                      : "border border-gray-200 hover:border-[#F97316] text-[#1C2A44] hover:text-[#F97316]"
                  }`}
                >
                  Xem combo
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/combo"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#F97316] hover:underline"
            >
              Xem tất cả combo →
            </Link>
          </div>

        </div>
      </section>
      )}

      {/* ═══ KHỐI 6 — TÀI NGUYÊN MIỄN PHÍ ═══ */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-[#1C2A44] mb-8 sm:mb-10">
            Nhận bộ tài nguyên AI miễn phí
          </h2>
          <div className="relative w-full max-w-3xl mx-auto aspect-[16/6] rounded-2xl overflow-hidden shadow-sm mb-10 sm:mb-14">
            <Image
              src="/anh/thien-hue-ai-workspace-banner.jpg"
              alt="Bộ tài nguyên AI miễn phí cho người kinh doanh online một mình"
              fill
              sizes="(max-width: 1024px) 90vw, 768px"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Checklist trái */}
            <div className="space-y-4">
              {freeResources.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-xl" style={{ color: "#F97316" }}>✓</span>
                  <p className="text-[#1C2A44] text-base leading-relaxed">{item}</p>
                </div>
              ))}
              <Link
                href="/tai-nguyen-mien-phi"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#F97316] hover:underline pt-2"
              >
                Xem tất cả tài nguyên miễn phí →
              </Link>
            </div>
            {/* Form phải */}
            <div className="flex justify-center lg:justify-end">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KHỐI 7 — GIỚI THIỆU THIÊN HUỆ ═══ */}
      <section className="bg-[#1C2A44] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Ảnh */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/anh/thien-hue-working.jpg"
                  alt="Thiên Huệ đang làm việc với AI"
                  fill
                  sizes="(max-width: 1024px) 320px, 320px"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 leading-snug">
                Mình là Thiên Huệ — người gom tool và quy trình để bạn dùng AI dễ hơn
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Mình không dạy lý thuyết AI phức tạp. Mình test tool, gom prompt, đóng gói quy trình và hướng dẫn lại bằng cách dễ hiểu để người kinh doanh online một mình có thể tự làm content, ảnh, video và workflow bán hàng nhanh hơn.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


