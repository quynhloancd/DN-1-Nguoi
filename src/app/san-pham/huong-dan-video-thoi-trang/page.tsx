import type { Metadata } from "next";
import { siteConfig, getBaseUrl } from "@/lib/site-config";
import SalesPageClient from "./SalesPageClient";

const BASE_URL = getBaseUrl();

export const metadata: Metadata = {
  title: `Bộ hướng dẫn tự tạo video thời trang bằng AI — 100k — ${siteConfig.name}`,
  description:
    "Chủ shop thời trang — chỉ cần thay bộ đồ, AI tạo video xịn cho bạn đăng ngay. Không cần máy quay, không cần người mẫu. Chỉ 100.000đ.",
  alternates: { canonical: `${BASE_URL}/san-pham/huong-dan-video-thoi-trang` },
};

export default function SalesPage() {
  return <SalesPageClient />;
}
