import type { Metadata } from "next";
import { siteConfig, getBaseUrl } from "@/lib/site-config";
import BookingForm from "@/components/booking/BookingForm";
import { CheckCircle, Clock, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: `Đặt lịch tư vấn 1-1 AI Workflow | ${siteConfig.name}`,
  description:
    "Thiết lập hệ thống AI tùy chỉnh cho shop/doanh nghiệp của bạn. Phân tích quy trình, setup n8n workflow, đào tạo team — 1-3 triệu/buổi.",
  alternates: { canonical: `${getBaseUrl()}/tuvan` },
  openGraph: {
    title: `Đặt lịch tư vấn 1-1 — ${siteConfig.owner.name}`,
    description: "Thiết lập AI workflow riêng cho doanh nghiệp của bạn trong 1 buổi.",
    url: `${getBaseUrl()}/tuvan`,
  },
};

const BENEFITS = [
  { icon: Zap, title: "Phân tích quy trình thực tế", desc: "Xem xét công việc hàng ngày của bạn và chỉ ra chỗ nào AI thay thế được ngay" },
  { icon: CheckCircle, title: "Setup workflow n8n tùy chỉnh", desc: "Tôi cài đặt và cấu hình workflow phù hợp với shop/doanh nghiệp của bạn" },
  { icon: Clock, title: "Tiết kiệm 20-50h/tháng", desc: "ROI rõ ràng — 1 buổi đầu tư tiết kiệm được hàng chục giờ nhân công mỗi tháng" },
  { icon: Shield, title: "Hỗ trợ 30 ngày sau setup", desc: "Tôi theo dõi và hỗ trợ bạn sau buổi tư vấn để đảm bảo hệ thống chạy ổn" },
];

export default function TuvanPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0a0a0a", color: "#f5f5f5" }}>
      {/* Hero */}
      <section className="py-16 px-4 text-center" style={{ borderBottom: "1px solid #1a1a1a" }}>
        <div className="max-w-2xl mx-auto">
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(232,93,4,0.15)", color: "#E85D04" }}
          >
            TƯ VẤN 1-1 · GIÁ 1–3 TRIỆU/BUỔI
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Thiết lập hệ thống AI<br />
            <span style={{ color: "#E85D04" }}>riêng cho doanh nghiệp của bạn</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Không học lý thuyết — tôi đến, phân tích quy trình của bạn, setup workflow AI
            chạy được ngay trong 1 buổi. Hỗ trợ 30 ngày sau setup.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Một buổi tư vấn bao gồm:</h2>
              <div className="space-y-5">
                {BENEFITS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(232,93,4,0.12)" }}
                    >
                      <Icon size={18} style={{ color: "#E85D04" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">{title}</div>
                      <div className="text-gray-400 text-sm leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(232,93,4,0.06)", border: "1px solid rgba(232,93,4,0.2)" }}
            >
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Chi phí</div>
              <div className="text-3xl font-bold text-white mb-1">
                1–3 triệu <span className="text-lg font-normal text-gray-400">/ buổi</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Tuỳ theo độ phức tạp của hệ thống cần setup. Tôi báo giá cụ thể sau khi
                trao đổi sơ bộ — không phát sinh chi phí ẩn.
              </p>
            </div>

            {/* Social proof */}
            <blockquote
              className="rounded-2xl p-5"
              style={{ background: "#111", border: "1px solid #222" }}
            >
              <p className="text-gray-300 text-sm leading-relaxed italic mb-3">
                &ldquo;Tôi 42 tuổi, không rành công nghệ. Vậy mà sau 2 buổi tư vấn 1-1, hệ thống
                của tôi đã tự động trả lời khách, tạo đơn và thông báo. Không nghĩ AI lại dễ vậy.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(232,93,4,0.2)", color: "#E85D04" }}
                >
                  HG
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Hùng</div>
                  <div className="text-xs text-gray-500">Chủ shop online, 42 tuổi</div>
                </div>
              </div>
            </blockquote>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "#111", border: "1px solid #1f1f1f" }}
          >
            <h2 className="text-lg font-bold text-white mb-1">Đặt lịch tư vấn</h2>
            <p className="text-sm text-gray-500 mb-6">
              Tôi sẽ liên hệ lại trong vòng 24 giờ để xác nhận lịch hẹn.
            </p>
            <BookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}
