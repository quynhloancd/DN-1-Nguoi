"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  "Tất cả",
  "Làm video",
  "Làm ảnh",
  "Content bán hàng",
  "KOL / Avatar / Podcast",
  "Automation / n8n",
  "Theo ngành",
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
    title: "Tool Tạo Video Thời Trang với Google Flow",
    category: "Làm video",
    description:
      "Dành cho shop thời trang muốn tạo video sản phẩm/bộ đồ bằng AI, không cần quay mẫu thật.",
    price: 150000,
    badge: "Nổi bật",
    slug: "tool-video-thoi-trang-google-flow",
  },
  {
    title: "Tool Tạo Video Hàng Loạt Cực Nhanh",
    category: "Làm video",
    description:
      "Dành cho người làm content, affiliate, bán hàng online muốn tạo nhiều video nhanh từ template/prompt có sẵn.",
    price: 350000,
    badge: "Bán chạy",
    slug: "tool-video-hang-loat",
  },
  {
    title: "Tool KOL Podcast AI",
    category: "KOL / Avatar / Podcast",
    description:
      "Dành cho creator, người bán khóa học/dịch vụ, người muốn tạo nội dung dạng KOL/podcast bằng AI.",
    price: 299000,
    badge: "Mới",
    slug: "tool-kol-podcast-ai",
  },
];

function formatVND(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function getBadgeColor(badge: string): string {
  if (badge === "Mới") return "bg-blue-500 text-white";
  return "bg-orange-500 text-white";
}

export default function ToolAIPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredTools =
    activeCategory === "Tất cả"
      ? TOOLS
      : TOOLS.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#1C2A44] py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Kho Tool AI Thực Chiến
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
          Chọn tool phù hợp để tự tạo content, ảnh, video và workflow bán hàng
          nhanh hơn.
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
            Chưa có tool nào trong danh mục này.
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
                      Xem chi tiết
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
              alt="Thiên Huệ - người tuyển chọn và test tool AI"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-slate-600 text-base leading-relaxed">
            <span className="font-semibold text-[#1C2A44]">Thiên Huệ</span>{" "}
            test và đóng gói từng tool trước khi đưa vào kho. Bạn chỉ cần
            dùng, không cần tốn thời gian tìm kiếm.
          </p>
        </div>
      </section>
    </div>
  );
}

