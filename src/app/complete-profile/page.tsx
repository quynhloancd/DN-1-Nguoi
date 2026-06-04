import type { Metadata } from "next";
import CompleteProfileClient from "./CompleteProfileClient";

export const metadata: Metadata = {
  title: "Hoàn tất hồ sơ — Doanh Nghiệp 1 Người",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function CompleteProfilePage() {
  return <CompleteProfileClient />;
}
