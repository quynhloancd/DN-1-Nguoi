import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import TopBar from "@/components/layout/TopBar";
import { CONFIRMED_STATUSES } from "@/lib/tool-access";

export const dynamic = "force-dynamic";

export default async function ToolCuaToiPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/tool-cua-toi");

  const admin = await createAdminClient();

  // Đơn hàng tool của user
  const { data: orders } = await admin
    .from("orders")
    .select("note, status, order_code, amount, product_title, created_at")
    .eq("user_id", user.id)
    .like("note", "tool:%")
    .order("created_at", { ascending: false });

  const list = orders ?? [];
  const toolIds = list.map((o) => (o.note as string).replace("tool:", ""));

  // Lấy slug/thumbnail tool
  const toolMap = new Map<string, { slug: string; title: string; thumbnail_url: string | null }>();
  if (toolIds.length > 0) {
    const { data: tools } = await admin
      .from("tools")
      .select("id, slug, title, thumbnail_url")
      .in("id", toolIds);
    (tools ?? []).forEach((t) =>
      toolMap.set(t.id, { slug: t.slug, title: t.title, thumbnail_url: t.thumbnail_url })
    );
  }

  const confirmed = (s: string) => (CONFIRMED_STATUSES as readonly string[]).includes(s);

  return (
    <div>
      <TopBar title="Tool của tôi" subtitle="Các tool bạn đã mua hoặc đang chờ xác nhận" />
      <div className="p-6 max-w-3xl mx-auto">
        {list.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🛒</div>
            <p className="text-gray-600 mb-4">Bạn chưa mua tool nào.</p>
            <Link
              href="/tool-ai"
              className="inline-block px-6 py-3 rounded-xl font-bold text-white"
              style={{ background: "#F97316" }}
            >
              Khám phá kho Tool AI
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((o, i) => {
              const toolId = (o.note as string).replace("tool:", "");
              const t = toolMap.get(toolId);
              const ok = confirmed(o.status);
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                    {t?.thumbnail_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.thumbnail_url} alt={t.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">🤖</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1C2A44] truncate">
                      {t?.title || o.product_title || "Tool"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Mã đơn: {o.order_code} · {(o.amount as number).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  {ok ? (
                    <Link
                      href={t ? `/tool-ai/${t.slug}#mua` : "/tool-ai"}
                      className="px-4 py-2 rounded-lg text-sm font-bold text-white shrink-0"
                      style={{ background: "#16a34a" }}
                    >
                      Mở tool →
                    </Link>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-200 shrink-0">
                      Chờ xác nhận
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
