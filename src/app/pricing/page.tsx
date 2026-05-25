import type { Metadata } from "next";
import PricingContent from "./PricingContent";
import { siteConfig } from "@/lib/site-config";

export function generateMetadata(): Metadata {
  return {
    title: `Bảng Giá Khoá Học | ${siteConfig.name}`,
    description: `Chọn gói học phù hợp tại ${siteConfig.name} — từ miễn phí đến Premium với tư vấn 1-1 và tài liệu độc quyền.`,
    alternates: {
      canonical: `https://${siteConfig.domain}/pricing`,
    },
    openGraph: {
      title: `Bảng Giá Khoá Học | ${siteConfig.name}`,
      description: "Chọn gói học phù hợp — Miễn phí, Standard hoặc Premium. Truy cập khoá học, chứng chỉ, tư vấn 1-1 và tài liệu độc quyền.",
      type: "website",
      url: `https://${siteConfig.domain}/pricing`,
      images: [
        {
          url: `https://${siteConfig.domain}/og-pricing.jpg`,
          width: 1200,
          height: 630,
          alt: `Bảng Giá Khoá Học — ${siteConfig.name}`,
        },
      ],
    },
  };
}

export default function PricingPage() {
  return <PricingContent />;
}
