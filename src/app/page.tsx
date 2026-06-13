import type { Metadata } from "next";
import { siteConfig, getBaseUrl } from "@/lib/site-config";
import HomePage from "./HomePage";
import FAQJsonLd from "@/components/seo/FAQJsonLd";
import PublicPageShell from "@/components/layout/PublicPageShell";

const BASE_URL = getBaseUrl();

export const metadata: Metadata = {
  title: `${siteConfig.owner.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: BASE_URL,
  },
};

export const revalidate = 3600; // ISR — tái tạo mỗi 1 giờ

const homepageFaqs = [
  { question: "Tôi 40-50 tuổi, không rành công nghệ — có dùng được AI không?", answer: "Hoàn toàn được! Thiên Huệ thiết kế workflow dành riêng cho người 35-50 tuổi bận rộn, không có nền tảng kỹ thuật. Mọi thứ đều có hướng dẫn từng bước, dùng được ngay." },
  { question: "n8n là gì? Tôi cần cài đặt phức tạp không?", answer: "n8n là công cụ tự động hoá kéo-thả, không cần code. Bộ workflow của Thiên Huệ đã được đóng gói sẵn — bạn chỉ cần làm theo hướng dẫn từng bước là xong, thường dưới 30 phút." },
  { question: "Tôi cần bao nhiêu thời gian để thấy kết quả?", answer: "Sau ngày đầu tiên bạn đã có thể tiết kiệm được thời gian với checklist miễn phí. Sau khi cài workflow n8n, thường tiết kiệm được 5-10 giờ/tuần ngay từ tuần đầu tiên." },
  { question: "Chi phí bắt đầu là bao nhiêu?", answer: `Bạn có thể bắt đầu hoàn toàn miễn phí với checklist "5 việc giao cho AI ngay". Bộ workflow n8n cơ bản chỉ 149.000đ — một lần, dùng mãi. Tham khảo tại ${BASE_URL}/pricing.` },
];

export default function Page() {
  return (
    <PublicPageShell>
      <FAQJsonLd questions={homepageFaqs} />
      <HomePage />
    </PublicPageShell>
  );
}
