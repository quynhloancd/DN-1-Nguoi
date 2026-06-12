import type { Metadata } from "next";
import { siteConfig, getBaseUrl } from "@/lib/site-config";
import LoTrinhClient from "./LoTrinhClient";

const BASE_URL = getBaseUrl();

export const metadata: Metadata = {
  title: `Checklist: Đồng nghiệp dùng AI làm được gì mà bạn chưa biết? — ${siteConfig.name}`,
  description:
    "5 bước đơn giản để chủ shop thời trang tự làm ảnh, video, content bán hàng bằng AI — không cần biết kỹ thuật.",
  alternates: { canonical: `${BASE_URL}/lo-trinh` },
};

export default function LoTrinhPage() {
  return <LoTrinhClient />;
}
