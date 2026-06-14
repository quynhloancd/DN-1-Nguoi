"use client";

import { useState } from "react";
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

const BADGE_LABELS: Record<string, string> = {
  free: "Miễn phí",
  featured: "Nổi bật",
  bestseller: "Bán chạy",
  new: "Mới",
  sale: "Giảm giá",
};

export type ToolCard = {
  slug: string;
  title: string;
  short_description: string | null;
  thumbnail_url: string | null;
  price: number;
  sale_price: number | null;
  badge: string | null;
  category: string;
  payment_link: string | null;
};

function formatVND(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function badgeClass(badge: string): string {
  return badge === "new"
    ? "bg-blue-500 text-white"
    : "bg-[#F97316] text-white";
}

export default function ToolListClient({ tools }: { tools: ToolCard[] }) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredTools =
    activeCategory === "Tất cả"
      ? tools
      : tools.filter((t) => t.category === activeCategory);

  return (
    <>
      {/* Bộ lọc danh mục */}
      <section className="px-4 py-6 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#F97316] text-white border border-[#F97316]"
                  : "bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#F97316] hover:text-[#F97316]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Lưới tool */}
      <section className="px-4 pb-16 max-w-6xl mx-auto">
        {filteredTools.length === 0 ? (
          <p className="text-center text-[#64748B] py-12">
            Chưa có tool nào trong danh mục này.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const displayPrice =
                tool.sale_price && tool.sale_price > 0
                  ? tool.sale_price
                  : tool.price;
              const hasPayment = !!(
                tool.payment_link && tool.payment_link.trim()
              );
              return (
                <div
                  key={tool.slug}
                  className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-t-xl overflow-hidden bg-gradient-to-br from-[#1C2A44] to-[#2d4a7a]">
                    {tool.thumbnail_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={tool.thumbnail_url}
                        alt={tool.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    {tool.badge && (
                      <span
                        className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${badgeClass(
                          tool.badge
                        )}`}
                      >
                        {BADGE_LABELS[tool.badge] ?? tool.badge}
                      </span>
                    )}
                  </div>

                  {/* Nội dung */}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs text-[#64748B] mb-1">
                      {tool.category}
                    </span>
                    <h3 className="font-semibold text-[#0F172A] text-base leading-snug mb-2 line-clamp-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-[#64748B] line-clamp-2 mb-4 flex-1">
                      {tool.short_description}
                    </p>

                    {/* Giá */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-lg font-bold text-[#F97316]">
                        {displayPrice === 0
                          ? "Miễn phí"
                          : formatVND(displayPrice)}
                      </span>
                      {tool.sale_price &&
                        tool.sale_price > 0 &&
                        tool.price > tool.sale_price && (
                          <span className="text-sm text-[#94A3B8] line-through">
                            {formatVND(tool.price)}
                          </span>
                        )}
                    </div>

                    {/* Nút */}
                    <div className="flex gap-2">
                      <Link
                        href={`/tool-ai/${tool.slug}`}
                        className="flex-1 text-center text-sm font-medium border border-[#E2E8F0] text-[#0F172A] rounded-lg py-2 hover:border-[#1C2A44] hover:text-[#1C2A44] transition-colors"
                      >
                        Xem chi tiết
                      </Link>
                      {hasPayment && (
                        <a
                          href={tool.payment_link!}
                          className="flex-1 text-center text-sm font-semibold bg-[#F97316] text-white rounded-lg py-2 hover:bg-[#EA580C] transition-colors"
                        >
                          Mua ngay
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
