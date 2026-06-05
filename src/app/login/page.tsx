import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: `Đăng nhập — ${siteConfig.name}`,
  description: `Đăng nhập vào tài khoản ${siteConfig.name} để truy cập các khoá học và nội dung độc quyền.`,
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "radial-gradient(ellipse at top, #0d1a12 0%, #0a0a0a 60%)" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mb-4 inline-flex items-center justify-center">
            <Image src="/images/logo.png" alt={siteConfig.name} width={64} height={64} className="rounded-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">Đăng nhập</h1>
          <p className="text-gray-400 mt-1 text-sm">
            <span className="text-white font-semibold">Thiên Huệ AI</span> — Chào mừng trở lại
          </p>
        </div>

        {/* Card */}
        <div className="card-dark p-6 sm:p-8">
          {/* Login Form */}
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>

          <p className="text-center text-sm text-gray-500 mt-5">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-[#E85D04] font-medium hover:underline">Đăng ký miễn phí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
