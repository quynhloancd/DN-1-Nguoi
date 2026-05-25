import type { Metadata } from "next";
import CompleteProfileClient from "./CompleteProfileClient";
import { siteConfig } from "@/lib/site-config";

export function generateMetadata(): Metadata {
  return {
    title: `Hoàn tất hồ sơ — ${siteConfig.name}`,
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

export default function CompleteProfilePage() {
  return <CompleteProfileClient />;
}
