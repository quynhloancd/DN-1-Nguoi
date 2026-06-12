"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  "Táº¥t cáº£",
  "LÃ m video",
  "LÃ m áº£nh",
  "Content bÃ¡n hÃ ng",
  "KOL / Avatar / Podcast",
  "Automation / n8n",
  "Theo ngÃ nh",
];

interface Tool {
  title: string;
  category: string;
  description: string;
  price: number;
  badge: string;
  slug: string;
}

const TOOLS: Tool[] = [
  {
    title: "Tool Táº¡o Video Thá»i Trang vá»›i Google Flow",
    category: "LÃ m video",
    description:
      "DÃ nh cho shop thá»i trang muá»‘n táº¡o video sáº£n pháº©m/bá»™ Ä‘á»“ báº±ng AI, khÃ´ng cáº§n quay máº«u tháº­t.",
    price: 150000,
    badge: "Ná»•i báº­t",
    slug: "tool-video-thoi-trang-google-flow",
  },
  {
    title: "Tool Táº¡o Video HÃ ng Loáº¡t Cá»±c Nhanh",
    category: "LÃ m video",
    description:
      "DÃ nh cho ngÆ°á»i lÃ m content, affiliate, bÃ¡n hÃ ng online muá»‘n táº¡o nhiá»u video nhanh tá»« template/prompt cÃ³ sáºµn.",
    price: 350000,
    badge: "BÃ¡n cháº¡y",
    slug: "tool-video-hang-loat",
  },
  {
    title: "Tool KOL Podcast AI",
    category: "KOL / Avatar / Podcast",
    description:
      "DÃ nh cho creator, ngÆ°á»i bÃ¡n khÃ³a há»c/dá»‹ch vá»¥, ngÆ°á»i muá»‘n táº¡o ná»™i dung dáº¡ng KOL/podcast báº±ng AI.",
    price: 299000,
    badge: "Má»›i",
    slug: "tool-kol-podcast-ai",
  },
];

function formatVND(price: number): string {
  return price.toLocaleString("vi-VN") + "Ä‘";
}

function getBadgeColor(badge: string): string {
  if (badge === "Má»›i") return "bg-blue-500 text-white";
  return "bg-orange-500 text-white";
}

export default function ToolAIPage() {
  const [activeCategory, setActiveCategory] = useState("Táº¥t cáº£");

  const filteredTools =
    activeCategory === "Táº¥t cáº£"
      ? TOOLS
      : TOOLS.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#1C2A44] py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Kho Tool AI Thá»±c Chiáº¿n
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
          Chá»n tool phÃ¹ há»£p Ä‘á»ƒ tá»± táº¡o content, áº£nh, video vÃ  workflow bÃ¡n hÃ ng
          nhanh hÆ¡n.
        </p>
      </section>

      {/* Filter */}
      <section className="px-4 py-6 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#F97316] text-white border border-[#F97316]"
                  : "bg-white text-slate-600 border border-slate-300 hover:border-[#F97316] hover:text-[#F97316]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Tool Grid */}
      <section className="px-4 pb-16 max-w-6xl mx-auto">
        {filteredTools.length === 0 ? (
          <p className="text-center text-slate-500 py-12">
            ChÆ°a cÃ³ tool nÃ o trong danh má»¥c nÃ y.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.slug}
                className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-t-xl overflow-hidden bg-gradient-to-br from-[#1C2A44] to-[#2d4a7a]">
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${getBadgeColor(tool.badge)}`}
                  >
                    {tool.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-slate-400 mb-1">
                    {tool.category}
                  </span>
                  <h3 className="font-semibold text-slate-800 text-base leading-snug mb-2 line-clamp-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                    {tool.description}
                  </p>

                  {/* Price */}
                  <p className="text-lg font-bold text-[#1C2A44] mb-4">
                    {formatVND(tool.price)}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/tool-ai/${tool.slug}`}
                      className="flex-1 text-center text-sm font-medium border border-slate-300 text-slate-700 rounded-lg py-2 hover:border-[#1C2A44] hover:text-[#1C2A44] transition-colors"
                    >
                      Xem chi tiáº¿t
                    </Link>
                    <Link
                      href={`/tool-ai/${tool.slug}#mua`}
                      className="flex-1 text-center text-sm font-semibold bg-[#F97316] text-white rounded-lg py-2 hover:bg-orange-600 transition-colors"
                    >
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Curator section */}
      <section className="bg-white border-t border-[#E2E8F0] py-14 px-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#E2E8F0]">
            <Image
              src="/anh/thien-hue-tool-curator.jpg"
              alt="ThiÃªn Huá»‡ - ngÆ°á»i tuyá»ƒn chá»n vÃ  test tool AI"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-slate-600 text-base leading-relaxed">
            <span className="font-semibold text-[#1C2A44]">ThiÃªn Huá»‡</span>{" "}
            test vÃ  Ä‘Ã³ng gÃ³i tá»«ng tool trÆ°á»›c khi Ä‘Æ°a vÃ o kho. Báº¡n chá»‰ cáº§n
            dÃ¹ng, khÃ´ng cáº§n tá»‘n thá»i gian tÃ¬m kiáº¿m.
          </p>
        </div>
      </section>
    </div>
  );
}

