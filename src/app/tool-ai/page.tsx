import Image from "next/image";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ToolListClient, { type ToolCard } from "@/components/tool-ai/ToolListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kho Tool AI Thực Chiến",
  description:
    "Chọn tool phù hợp để tự tạo content, ảnh, video và workflow bán hàng nhanh hơn.",
};

type ToolRow = {
  slug: string;
  title: string;
  short_description: string | null;
  thumbnail_url: string | null;
  price: number;
  sale_price: number | null;
  badge: string | null;
  payment_link: string | null;
  sort_order: number | null;
  tool_categories: { name: string } | { name: string }[] | null;
};

function categoryName(rel: ToolRow["tool_categories"]): string {
  if (!rel) return "Khác";
  if (Array.isArray(rel)) return rel[0]?.name ?? "Khác";
  return rel.name ?? "Khác";
}

export default async function ToolAIPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("tools")
    .select(
      "slug, title, short_description, thumbnail_url, price, sale_price, badge, payment_link, sort_order, tool_categories(name)"
    )
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const tools: ToolCard[] = ((data as ToolRow[] | null) ?? []).map((t) => ({
    slug: t.slug,
    title: t.title,
    short_description: t.short_description,
    thumbnail_url: t.thumbnail_url,
    price: t.price ?? 0,
    sale_price: t.sale_price,
    badge: t.badge,
    category: categoryName(t.tool_categories),
    payment_link: t.payment_link,
  }));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Tiêu đề */}
      <section className="bg-[#1C2A44] py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Kho Tool AI Thực Chiến
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
          Chọn tool phù hợp để tự tạo content, ảnh, video và workflow bán hàng
          nhanh hơn.
        </p>
      </section>

      {/* Bộ lọc + lưới tool (client) */}
      <ToolListClient tools={tools} />

      {/* Giới thiệu người tuyển chọn tool */}
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
          <p className="text-[#64748B] text-base leading-relaxed">
            <span className="font-semibold text-[#1C2A44]">Thiên Huệ</span> test
            và đóng gói từng tool trước khi đưa vào kho. Bạn chỉ cần dùng, không
            cần tốn thời gian tìm kiếm.
          </p>
        </div>
      </section>
    </div>
  );
}
