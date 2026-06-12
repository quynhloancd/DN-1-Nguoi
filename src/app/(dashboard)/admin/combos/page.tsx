import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { Package, Plus, Edit2, ExternalLink } from "lucide-react";

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "?";
}

type ComboStatus = "draft" | "published" | "hidden";

const STATUS_CONFIG: Record<ComboStatus, { label: string; className: string }> =
  {
    published: {
      label: "?� xu?t b?n",
      className:
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-900/30 text-green-400 border border-green-800/40",
    },
    draft: {
      label: "B?n nh�p",
      className:
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700",
    },
    hidden: {
      label: "?n",
      className:
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-900/30 text-red-400 border border-red-800/40",
    },
  };

function StatusBadge({ status }: { status: ComboStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return <span className={cfg.className}>{cfg.label}</span>;
}

const BADGE_LABELS: Record<string, string> = {
  recommended: "?? xu?t",
  bestseller: "B�n ch?y",
  sale: "Khuy?n m�i",
  new: "M?i",
};

export default async function AdminCombosPage() {
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

  const allowedRoles = ["admin", "manager", "editor"];
  if (!profile || !allowedRoles.includes(profile.role)) redirect("/dashboard");

  const adminClient = await createAdminClient();
  const { data: combos } = await adminClient
    .from("combos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const list = combos ?? [];
  const totalPublished = list.filter((c) => c.status === "published").length;

  return (
    <div>
      <TopBar
        title="Qu?n l� Combo"
        subtitle="T?o v� qu?n l� c�c combo tool AI"
      />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-[#1B2A4A] text-base">
              Danh s�ch combo
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {list.length} combo � {totalPublished} ?� xu?t b?n
            </p>
          </div>
          <Link href="/admin/combos/new" className="btn-green">
            <Plus size={15} />
            T?o combo m?i
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="stat-card flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(212,168,67,0.09)" }}
            >
              <Package size={20} className="text-[#E85D04]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1B2A4A] leading-none mb-1">
                {list.length}
              </div>
              <div className="text-xs text-gray-500">T?ng combo</div>
            </div>
          </div>
          <div className="stat-card flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(34,197,94,0.09)" }}
            >
              <Package size={20} className="text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1B2A4A] leading-none mb-1">
                {totalPublished}
              </div>
              <div className="text-xs text-gray-500">?� xu?t b?n</div>
            </div>
          </div>
          <div className="stat-card flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(59,130,246,0.09)" }}
            >
              <Package size={20} className="text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1B2A4A] leading-none mb-1">
                {list.length - totalPublished}
              </div>
              <div className="text-xs text-gray-500">B?n nh�p / ?n</div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {list.length === 0 && (
            <div className="card-dark flex flex-col items-center justify-center py-16 text-center">
              <Package size={40} className="text-gray-700 mb-3" />
              <p className="text-gray-500 text-sm">Ch?a c� combo n�o.</p>
              <Link href="/admin/combos/new" className="btn-green mt-4">
                <Plus size={14} />
                T?o combo ??u ti�n
              </Link>
            </div>
          )}

          {list.map((combo) => (
            <div
              key={combo.id}
              className="card-dark p-5 hover:bg-[#F8F9FA] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Thumbnail + Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {combo.thumbnail_url ? (
                    <img
                      src={combo.thumbnail_url}
                      alt={combo.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#1C2A44]"
                    >
                      <Package size={22} className="text-orange-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-[#1B2A4A] text-sm leading-snug">
                        {combo.title}
                      </h3>
                      <StatusBadge
                        status={(combo.status as ComboStatus) ?? "draft"}
                      />
                      {combo.badge && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-100 text-orange-600 border border-orange-200">
                          {BADGE_LABELS[combo.badge] ?? combo.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 mb-1">
                      {combo.short_description || "Ch?a c� m� t?"}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <ExternalLink size={10} />
                        /combo/{combo.slug}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-6 text-xs shrink-0">
                  <div className="text-center min-w-[100px]">
                    <div className="text-gray-400 mb-0.5">Gi� b�n</div>
                    <div className="font-semibold text-[#E85D04]">
                      {formatPrice(combo.sale_price ?? combo.price ?? 0)}
                    </div>
                    {combo.sale_price && (
                      <div className="text-gray-400 text-[10px] line-through">
                        {formatPrice(combo.price ?? 0)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/combo/${combo.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-gray-600 hover:text-[#1B2A4A] hover:bg-white/5"
                    style={{ border: "1px solid #2a2a2a" }}
                  >
                    <ExternalLink size={12} />
                    Xem
                  </Link>
                  <Link
                    href={`/admin/combos/${combo.id}/edit`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-gray-600 hover:text-[#1B2A4A] hover:bg-white/5"
                    style={{ border: "1px solid #2a2a2a" }}
                  >
                    <Edit2 size={12} />
                    S?a
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
