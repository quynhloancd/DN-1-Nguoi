import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Bảng Giá Sản Phẩm | Doanh Nghiệp 1 Người — Thiên Huệ",
  description:
    "Từ checklist miễn phí đến workflow n8n 149k và tư vấn 1-1 — chọn gói phù hợp để bắt đầu ứng dụng AI vào công việc ngay hôm nay.",
  alternates: {
    canonical: "https://doanhnghiep1nguoi.online/pricing",
  },
  openGraph: {
    title: "Bảng Giá Sản Phẩm | Doanh Nghiệp 1 Người",
    description:
      "Checklist miễn phí → Workflow n8n 149k → Tư vấn 1-1. Ứng dụng AI vào công việc — dùng được ngay, không cần code.",
    type: "website",
    url: "https://doanhnghiep1nguoi.online/pricing",
    images: [
      {
        url: "/images/hero/offer-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Bảng Giá Sản Phẩm — Doanh Nghiệp 1 Người",
      },
    ],
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
