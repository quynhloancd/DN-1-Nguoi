import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { Plus, Edit2, ExternalLink, Wrench } from "lucide-react";

function formatPrice(price: number): string {
  if (price === 0) return "Mi?n ph�";
  return price.toLocaleString("vi-VN") + "?";
}

const BADGE_LABELS: Record<string, string> = {
  free: "Mi?n ph�",
  featured: "N?i b?t",
  bestseller: "B�n ch?y",
  new: "M?i",
  sale: "Gi?m gi�",
};

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  published: {
    label: "?ang b�n",
    className:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-900/30 text-green-400 border border-green-800/40",
  },
  draft: {
    label: "Nh�p",
    className:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700",
  },
  hidden: {
    label: "?n",
    className:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-900/30 text-red-400 border border-red-800/40",
  },
};

export default async function AdminToolsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "manager", "editor"].includes(profile.role)) {
    redirect("/dashboard");
  }

  const adminClient = await createAdminClient();

  const { data: tools } = await adminClient
    .from("tools")
    .select("*, tool_categories(name)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const items = tools ?? [];
  const publishedCount = items.filter((t) => t.status === "published").length;

  return (
    <div>
      <TopBar
        title="Qu?n l� Tool AI"
        subtitle="T?o v� qu?n l� danh s�ch tool AI tr�n n?n t?ng"
      />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-[#1B2A4A] text-base">
              Danh s�ch Tool AI
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {items.length} tool � {publishedCount} ?ang b�n
            </p>
          </div>
          <Link href="/admin/tools/new" className="btn-green">
            <Plus size={15} />
            Th�m tool m?i
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          <div className="stat-card flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(232,93,4,0.09)" }}
            >
              <Wrench size={20} className="text-[#E85D04]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1B2A4A] leading-none mb-1">
                {items.length}
              </div>
              <div className="text-xs text-gray-500">T?ng tool</div>
            </div>
          </div>
          <div className="stat-card flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(34,197,94,0.09)" }}
            >
              <ExternalLink size={20} className="text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1B2A4A] leading-none mb-1">
                {publishedCount}
              </div>
              <div className="text-xs text-gray-500">?ang b�n</div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {items.length === 0 && (
            <div className="card-dark flex flex-col items-center justify-center py-16 text-center">
              <Wrench size={40} className="text-gray-700 mb-3" />
              <p className="text-gray-500 text-sm">Ch?a c� tool n�o.</p>
              <Link href="/admin/tools/new" className="btn-green mt-4">
                <Plus size={14} />
                Th�m tool ??u ti�n
              </Link>
            </div>
          )}

          {items.map((tool) => {
            const statusCfg = STATUS_CONFIG[tool.status] ?? STATUS_CONFIG.draft;
            return (
              <div
                key={tool.id}
                className="card-dark p-5 hover:bg-[#F8F9FA] transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Thumbnail + Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {tool.thumbnail_url ? (
                      <img
                        src={tool.thumbnail_url}
                        alt={tool.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                    ) : (
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: "#252525",
                          border: "1px solid #2a2a2a",
                        }}
                      >
                        <Wrench size={22} className="text-gray-500" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-[#1B2A4A] text-sm leading-snug">
                          {tool.title}
                        </h3>
                        <span className={statusCfg.className}>
                          {statusCfg.label}
                        </span>
                        {tool.badge && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-900/30 text-orange-400 border border-orange-800/40">
                            {BADGE_LABELS[tool.badge] ?? tool.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-1 mb-1">
                        {tool.short_description || "Ch?a c� m� t?"}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-gray-500">
                        <span>/tool-ai/{tool.slug}</span>
                        {tool.tool_categories?.name && (
                          <span className="text-blue-400">
                            {tool.tool_categories.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center shrink-0">
                    <div className="text-gray-400 text-xs mb-0.5">Gi� b�n</div>
                    <div className="font-semibold text-[#E85D04] text-sm">
                      {formatPrice(tool.sale_price ?? tool.price ?? 0)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/tool-ai/${tool.slug}`}
                      target="_blank"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:text-[#1B2A4A] transition-colors"
                      style={{ border: "1px solid #2a2a2a" }}
                    >
                      <ExternalLink size={12} />
                      Xem
                    </Link>
                    <Link
                      href={`/admin/tools/${tool.id}/edit`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{
                        background: "rgba(212,168,67,0.1)",
                        color: "#E85D04",
                        border: "1px solid rgba(212,168,67,0.2)",
                      }}
                    >
                      <Edit2 size={12} />
                      S?a
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
