"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Users } from "lucide-react";

// âš ï¸ Äiá»n link Zalo group tháº­t vÃ o Ä‘Ã¢y
const ZALO_GROUP_LINK = "https://zalo.me/g/placeholder";

export default function CamOnClient() {
  return (
    <div className="min-h-screen bg-gray-50 text-[#1C2A44]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="ThiÃªn Huá»‡ AI"
              width={36}
              height={36}
              className="rounded-lg object-contain"
            />
            <span className="text-sm font-bold text-[#1C2A44] hidden sm:block">ThiÃªn Huá»‡ AI</span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* KHá»I 1: XÃ¡c nháº­n */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-gray-100 shadow-sm">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(249,115,22,0.12)" }}
            >
              <CheckCircle size={32} className="text-[#F97316]" />
            </div>
            <h1 className="text-2xl font-extrabold mb-3">
              Xong rá»“i! TÃ i nguyÃªn Ä‘ang Ä‘Æ°á»£c gá»­i cho báº¡n.
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Náº¿u chÆ°a tháº¥y sau vÃ i phÃºt, hÃ£y kiá»ƒm tra <strong>Spam</strong> hoáº·c vÃ o group Zalo bÃªn dÆ°á»›i Ä‘á»ƒ nháº­n nhanh hÆ¡n.
            </p>
            <div className="mt-5 rounded-xl overflow-hidden max-w-xs mx-auto">
              <Image
                src="/áº¢NH/thien-hue-thank-you.jpg"
                alt="ThiÃªn Huá»‡ cáº£m Æ¡n"
                width={320}
                height={240}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* KHá»I 2: Má»i Zalo */}
          <div
            className="rounded-2xl p-6 sm:p-8 text-white"
            style={{ background: "#1C2A44" }}
          >
            <h2 className="text-lg font-extrabold mb-2">
              VÃ o group Zalo Ä‘á»ƒ nháº­n tool má»›i, prompt má»›i vÃ  file máº«u má»—i tuáº§n
            </h2>
            <p className="text-gray-300 text-sm mb-5">
              Cá»™ng Ä‘á»“ng ngÆ°á»i kinh doanh online dÃ¹ng AI â€” cáº­p nháº­t liÃªn tá»¥c, miá»…n phÃ­.
            </p>
            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: "#F97316", color: "#fff" }}
            >
              <Users size={16} />
              VÃ o group Zalo ngay
              <ArrowRight size={16} />
            </a>
          </div>

          {/* KHá»I 3: Soft sell */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-base font-extrabold mb-4 text-[#1C2A44]">
              Trong khi chá» email, báº¡n cÃ³ thá»ƒ xem ngay:
            </h2>
            <div className="space-y-3">
              {/* Card tool ná»•i báº­t */}
              <div className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl p-4 bg-gray-50">
                <div>
                  <p className="font-bold text-sm text-[#1C2A44] leading-snug">
                    Tool Táº¡o Video Thá»i Trang vá»›i Google Flow
                  </p>
                  <p className="text-[#F97316] font-semibold text-sm mt-0.5">150.000Ä‘</p>
                </div>
                <Link
                  href="/tool-ai/tool-video-thoi-trang-google-flow"
                  className="shrink-0 px-4 py-2 rounded-xl text-white text-xs font-bold transition-all hover:opacity-90 whitespace-nowrap"
                  style={{ background: "#F97316" }}
                >
                  Xem chi tiáº¿t
                </Link>
              </div>

              {/* Card combo */}
              <div className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl p-4 bg-gray-50">
                <div>
                  <p className="font-bold text-sm text-[#1C2A44] leading-snug">
                    Combo NgÆ°á»i Má»›i
                  </p>
                  <p className="text-[#F97316] font-semibold text-sm mt-0.5">chá»‰ 199.000Ä‘</p>
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

          {/* KHá»I 4: Giá»›i thiá»‡u ThiÃªn Huá»‡ */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#F97316]/30">
                <Image
                  src="/áº¢NH/thien-hue-avatar.jpg"
                  alt="ThiÃªn Huá»‡"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  MÃ¬nh lÃ  <strong className="text-[#1C2A44]">ThiÃªn Huá»‡</strong> â€” ngÆ°á»i test tool vÃ  Ä‘Ã³ng gÃ³i quy trÃ¬nh AI Ä‘á»ƒ báº¡n dÃ¹ng Ä‘Æ°á»£c ngay mÃ  khÃ´ng cáº§n há»c nhiá»u.
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
              â† Vá» trang chá»§
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

