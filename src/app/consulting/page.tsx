import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Tư Vấn 1-1 Setup AI | Doanh Nghiệp 1 Người",
  description: "Thiết lập hệ thống AI tùy chỉnh cho shop hoặc doanh nghiệp — phân tích quy trình, setup workflow n8n, đào tạo team.",
  alternates: { canonical: "https://doanhnghiep1nguoi.online/consulting" },
};

const packages = [
  {
    name: "Tư Vấn Khám Phá",
    duration: "60 phút • Zoom",
    price: "1.000.000đ",
    features: ["Phân tích quy trình hiện tại","Xác định 3-5 điểm AI thay thế được","Lộ trình triển khai cụ thể"],
    highlight: false,
  },
  {
    name: "Setup Toàn Bộ",
    duration: "3 giờ + hỗ trợ 30 ngày",
    price: "3.000.000đ",
    badge: "Phổ biến nhất",
    features: ["Bao gồm Tư Vấn Khám Phá","Setup workflow n8n tùy chỉnh","Đào tạo team sử dụng","Hỗ trợ Zalo 30 ngày","Cập nhật workflow khi cần"],
    highlight: true,
  },
];

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-white text-[#1B2A4A] pt-24 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{background:"rgba(232,93,4,0.15)",color:"#E85D04"}}>
            💼 Tư Vấn 1-1
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Setup AI <span style={{color:"#E85D04"}}>Cho Doanh Nghiệp Bạn</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Thiên Huệ phân tích quy trình, setup workflow n8n tùy chỉnh và đào tạo team — tiết kiệm 5-10h/tuần ngay từ tuần đầu.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {packages.map((pkg, i) => (
            <div key={i} className="bg-white rounded-2xl p-8" style={{border: pkg.highlight ? "2px solid rgba(232,93,4,0.5)" : "1px solid #E5E7EB"}}>
              {pkg.badge && (
                <span className="text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block" style={{background:"#E85D04",color:"#fff"}}>{pkg.badge}</span>
              )}
              <h2 className="text-xl font-bold mb-1">{pkg.name}</h2>
              <div className="text-3xl font-extrabold mb-1" style={{color:"#E85D04"}}>{pkg.price}</div>
              <div className="text-sm text-gray-500 mb-6">{pkg.duration}</div>
              <ul className="space-y-2 mb-8">
                {pkg.features.map((f,j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                    <span style={{color:"#E85D04"}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href={siteConfig.socials.zalo} target="_blank" rel="noopener noreferrer"
                className="block text-center py-3 rounded-xl font-bold text-sm" style={{background:"#E85D04",color:"#fff"}}>
                Đặt lịch qua Zalo →
              </a>
            </div>
          ))}
        </div>

        <div className="bg-[#F8F9FA] rounded-2xl p-8 text-center" style={{border:"1px solid #E5E7EB"}}>
          <h3 className="text-lg font-bold mb-2">Không chắc gói nào phù hợp?</h3>
          <p className="text-gray-400 mb-4 text-sm">Chat Zalo miễn phí để được tư vấn trước khi quyết định.</p>
          <a href={siteConfig.socials.zalo} target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-xl font-bold text-sm" style={{border:"1px solid rgba(232,93,4,0.4)",color:"#E85D04"}}>
            💬 Chat Zalo ngay
          </a>
        </div>
      </div>
    </div>
  );
}
