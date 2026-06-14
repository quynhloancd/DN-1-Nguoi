import Link from "next/link";

interface Course {
  title: string;
  teacher: string;
  suitable_for: string;
  outcomes: string[];
  price: string;
  affiliate_link: string;
  affiliate_note: boolean;
}

const COURSES: Course[] = [
  {
    title: "Khóa học AI Automation với n8n",
    teacher: "Thầy Đặng Khương",
    suitable_for: "Người muốn tự động hóa workflow, chủ shop online, freelancer",
    outcomes: [
      "Tạo workflow n8n từ cơ bản đến nâng cao",
      "Tự động hóa đăng content, trả lời khách",
      "Tiết kiệm 5-10h/tuần",
    ],
    price: "Liên hệ",
    affiliate_link: "#",
    affiliate_note: true,
  },
  {
    title: "Làm Video AI với Runway, Kling, Hailuo",
    teacher: "Cộng đồng AI Việt Nam",
    suitable_for: "Creator, người bán hàng muốn làm video nhanh bằng AI",
    outcomes: [
      "Tạo video AI chuyên nghiệp",
      "Làm thumbnail, storyboard",
      "Workflow làm video hàng loạt",
    ],
    price: "từ 500.000đ",
    affiliate_link: "#",
    affiliate_note: true,
  },
  {
    title: "Content Marketing với AI",
    teacher: "Chuyên gia Marketing",
    suitable_for: "Người làm marketing, chủ shop, solopreneur",
    outcomes: [
      "Viết caption bán hàng bằng AI",
      "Lên lịch content 1 tháng trong 2h",
      "Tạo hook và CTA hiệu quả",
    ],
    price: "từ 299.000đ",
    affiliate_link: "#",
    affiliate_note: true,
  },
  {
    title: "Kinh doanh Online 1 Người với AI",
    teacher: "Thiên Huệ (đề xuất)",
    suitable_for: "Người muốn khởi nghiệp online, chủ shop nhỏ",
    outcomes: [
      "Chọn sản phẩm và niche phù hợp",
      "Tự tạo content AI mỗi ngày",
      "Xây dựng phễu bán hàng đơn giản",
    ],
    price: "từ 199.000đ",
    affiliate_link: "#",
    affiliate_note: true,
  },
];

export default function KhoaHocDeXuatPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Khóa học AI / Automation được đề xuất
        </h1>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          Mình tuyển chọn một số khóa học AI, automation, content, video từ các
          Thầy/cộng đồng uy tín. Nếu bạn muốn học bài bản hơn, có thể tham
          khảo tại đây.
        </p>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          * Đây là trang khóa học đề xuất / affiliate. Khi bạn đăng ký qua
          link, mình có thể nhận hoa hồng giới thiệu.
        </p>
      </section>

      {/* Course Grid */}
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Thumbnail Placeholder */}
              <div className="aspect-video rounded-t-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <span className="text-slate-400 text-sm">Thumbnail khóa học</span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-semibold text-slate-800 text-base leading-snug mb-1">
                  {course.title}
                </h3>

                {/* Teacher */}
                <p className="text-xs text-slate-400 mb-4">{course.teacher}</p>

                {/* Suitable For */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Phù hợp với ai
                  </p>
                  <p className="text-sm text-slate-500">{course.suitable_for}</p>
                </div>

                {/* Outcomes */}
                <div className="mb-4 flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Học xong làm được
                  </p>
                  <ul className="space-y-1">
                    {course.outcomes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <p className="text-lg font-bold text-[#F97316] mb-4">
                  {course.price}
                </p>

                {/* CTA Button */}
                <a
                  href={course.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block text-center text-sm font-semibold bg-[#F97316] text-white rounded-lg py-2.5 hover:bg-orange-600 transition-colors mb-3"
                >
                  Đăng ký khóa học
                </a>

                {/* Affiliate Tag */}
                {course.affiliate_note && (
                  <p className="text-xs text-center" style={{ color: "#64748B" }}>
                    Đây là link giới thiệu/affiliate.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-[#E2E8F0] py-14 px-4 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">
          Muốn dùng tool AI ngay không cần học nhiều?
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Kho Tool AI có sẵn prompt, workflow, hướng dẫn chi tiết — dùng được ngay.
        </p>
        <Link
          href="/tool-ai"
          className="inline-block px-6 py-3 bg-[#F97316] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
          Xem kho Tool AI
        </Link>
      </section>
    </div>
  );
}
