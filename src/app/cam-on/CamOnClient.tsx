"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Users } from "lucide-react";

// ⚠️ Điền link Zalo group thật vào đây
const ZALO_GROUP_LINK = "https://zalo.me/g/rwbdziccjrlrzxhsbdja";

export default function CamOnClient() {
  return (
    <div className="min-h-screen bg-gray-50 text-[#1C2A44]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="Thiên Huệ AI"
              width={36}
              height={36}
              className="rounded-lg object-contain"
            />
            <span className="text-sm font-bold text-[#1C2A44] hidden sm:block">Thiên Huệ AI</span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* KHỐI 1: Xác nhận */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-gray-100 shadow-sm">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(249,115,22,0.12)" }}
            >
              <CheckCircle size={32} className="text-[#F97316]" />
            </div>
            <h1 className="text-2xl font-extrabold mb-3">
              Xong rồi! Tài nguyên đang được gửi cho bạn.
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nếu chưa thấy sau vài phút, hãy kiểm tra <strong>Spam</strong> hoặc vào group Zalo bên dưới để nhận nhanh hơn.
            </p>
            <div className="mt-5 rounded-xl overflow-hidden max-w-xs mx-auto">
              <Image
                src="/anh/thien-hue-thank-you.jpg"
                alt="Thiên Huệ cảm ơn"
                width={320}
                height={240}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* KHỐI 2: Mời Zalo */}
          <div
            className="rounded-2xl p-6 sm:p-8 text-white"
            style={{ background: "#1C2A44" }}
          >
            <h2 className="text-lg font-extrabold mb-2">
              Vào group Zalo để nhận tool mới, prompt mới và file mẫu mỗi tuần
            </h2>
            <p className="text-gray-300 text-sm mb-5">
              Cộng đồng người kinh doanh online dùng AI — cập nhật liên tục, miễn phí.
            </p>
            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: "#F97316", color: "#fff" }}
            >
              <Users size={16} />
              Vào group Zalo ngay
              <ArrowRight size={16} />
            </a>
          </div>

          {/* KHỐI 3: Soft sell */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-base font-extrabold mb-4 text-[#1C2A44]">
              Trong khi chờ email, bạn có thể xem ngay:
            </h2>
            <div className="space-y-3">
              {/* Card tool nổi bật */}
              <div className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl p-4 bg-gray-50">
                <div>
                  <p className="font-bold text-sm text-[#1C2A44] leading-snug">
                    Tool Tạo Video Thời Trang với Google Flow
                  </p>
                  <p className="text-[#F97316] font-semibold text-sm mt-0.5">150.000đ</p>
                </div>
                <Link
                  href="/tool-ai/tool-video-thoi-trang-google-flow"
                  className="shrink-0 px-4 py-2 rounded-xl text-white text-xs font-bold transition-all hover:opacity-90 whitespace-nowrap"
                  style={{ background: "#F97316" }}
                >
                  Xem chi tiết
                </Link>
              </div>

              {/* Card combo */}
              <div className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl p-4 bg-gray-50">
                <div>
                  <p className="font-bold text-sm text-[#1C2A44] leading-snug">
                    Combo Người Mới
                  </p>
                  <p className="text-[#F97316] font-semibold text-sm mt-0.5">chỉ 199.000đ</p>
                </div>
                <Link
                  href="/combo"
                  className="shrink-0 px-4 py-2 rounded-xl text-white text-xs font-bold transition-all hover:opacity-90 whitespace-nowrap"
                  style={{ background: "#1C2A44" }}
                >
                  Xem combo
                </Link>
              </div>
            </div>
          </div>

          {/* KHỐI 4: Giới thiệu Thiên Huệ */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#F97316]/30">
                <Image
                  src="/anh/thien-hue-avatar.jpg"
                  alt="Thiên Huệ"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mình là <strong className="text-[#1C2A44]">Thiên Huệ</strong> — người test tool và đóng gói quy trình AI để bạn dùng được ngay mà không cần học nhiều.
                </p>
                <Link
                  href="/tool-ai"
                  className="inline-flex items-center gap-1 text-[#F97316] text-sm font-semibold mt-2 hover:underline"
                >
                  Xem kho Tool AI <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 pt-2">
            <Link href="/" className="hover:text-[#F97316] transition-colors">
              ← Về trang chủ
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}



