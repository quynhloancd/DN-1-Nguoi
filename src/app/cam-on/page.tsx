import type { Metadata } from "next";
import { siteConfig, getBaseUrl } from "@/lib/site-config";
import CamOnClient from "./CamOnClient";

const BASE_URL = getBaseUrl();

export const metadata: Metadata = {
  title: `Cảm ơn bạn! — ${siteConfig.name}`,
  description: "Tài nguyên AI miễn phí đang trên đường đến hộp thư của bạn. Cảm ơn bạn đã đăng ký!",
  alternates: { canonical: `${BASE_URL}/cam-on` },
  robots: { index: false, follow: false },
};

export default function CamOnPage() {
  return <CamOnClient />;
}
