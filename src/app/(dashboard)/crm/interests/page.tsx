import TopBar from "@/components/layout/TopBar";
import { createAdminClient } from "@/lib/supabase/server";
import {
  Users,
  Mail,
  MessageCircle,
  Download,
  Search,
  Filter,
  Tag,
  Inbox,
  CheckCircle,
  XCircle,
} from "lucide-react";

/* ---------- Types ---------- */

// Bảng public.leads — dữ liệu thu từ form phễu (migration 20260606_leads_table.sql)
interface LeadRow {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  subscribed: boolean;
  created_at: string;
  // Các trường mở rộng (có thể chưa có trong schema hiện tại):
  zalo?: string | null;
  resource?: string | null;
}

/* ---------- Helpers ---------- */

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });
}

// Nhãn nguồn khách dễ đọc
const SOURCE_LABELS: Record<string, string> = {
  "lo-trinh": "Lộ trình",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  zalo: "Zalo",
  seo: "SEO",
  ads: "Quảng cáo",
};

function sourceLabel(source: string | null): string {
  if (!source) return "Không rõ";
  return SOURCE_LABELS[source] ?? source;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/* ---------- Page ---------- */

export default async function CRMLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; source?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const sourceFilter = (params.source ?? "").trim();

  const admin = await createAdminClient();

  let query = admin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (sourceFilter) {
    query = query.eq("source", sourceFilter);
  }

  const { data, error } = await query;

  let leads = ((data ?? []) as unknown as LeadRow[]);

  // Tìm kiếm theo tên / email
  if (q) {
    const lower = q.toLowerCase();
    leads = leads.filter(
      (l) =>
        (l.name ?? "").toLowerCase().includes(lower) ||
        (l.email ?? "").toLowerCase().includes(lower)
    );
  }

  // Thống kê
  const totalLeads = leads.length;
  const subscribedCount = leads.filter((l) => l.subscribed).length;
  const unsubscribedCount = totalLeads - subscribedCount;

  // Danh sách nguồn để lọc
  const sourceSet = new Map<string, number>();
  for (const l of data ?? []) {
    const s = (l as LeadRow).source ?? "";
    if (s) sourceSet.set(s, (sourceSet.get(s) ?? 0) + 1);
  }
  const sources = Array.from(sourceSet.keys()).sort();

  const stats = [
    { label: "Tổng lead", value: totalLeads, icon: Users, color: "#3b82f6" },
    { label: "Đang theo dõi", value: subscribedCount, icon: CheckCircle, color: "#22c55e" },
    { label: "Đã huỷ nhận", value: unsubscribedCount, icon: XCircle, color: "#6b7280" },
    { label: "Nguồn khác nhau", value: sources.length, icon: Tag, color: "#F97316" },
  ];

  return (
    <div>
      <TopBar
        title="Khách quan tâm (Lead)"
        subtitle={`${totalLeads} lead thu từ form phễu`}
      />

      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="card-dark p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">{s.label}</span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: s.color + "20" }}
                >
                  <s.icon size={14} style={{ color: s.color }} />
                </div>
              </div>
              <div className="text-xl font-bold text-[#1B2A4A]">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card-dark p-4">
          <form className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-gray-500 mb-1 block">Tìm kiếm</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Tên hoặc email..."
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg pl-9 pr-3 py-2 text-sm text-[#1B2A4A] placeholder:text-gray-400 focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
            </div>
            <div className="min-w-[160px]">
              <label className="text-xs text-gray-500 mb-1 block">Nguồn</label>
              <select
                name="source"
                defaultValue={sourceFilter}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1B2A4A] focus:outline-none focus:border-[#F97316]"
              >
                <option value="">Tất cả nguồn</option>
                {sources.map((s) => (
                  <option key={s} value={s}>
                    {sourceLabel(s)}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn-green text-sm py-2 px-4 inline-flex items-center gap-1.5"
            >
              <Filter size={14} /> Lọc
            </button>
          </form>
        </div>

        {/* Lead table */}
        {error ? (
          <div className="card-dark p-8 text-center text-sm text-red-500">
            Lỗi khi tải lead: {error.message}
          </div>
        ) : leads.length === 0 ? (
          <div className="card-dark p-10 text-center">
            <Inbox size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              {q || sourceFilter
                ? "Không tìm thấy lead nào khớp bộ lọc."
                : "Chưa có lead nào thu từ form."}
            </p>
          </div>
        ) : (
          <div className="card-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                    {[
                      "Khách hàng",
                      "Email",
                      "Zalo",
                      "Tài nguyên đã tải",
                      "Nguồn",
                      "Trạng thái",
                      "Ngày đăng ký",
                    ].map((col) => (
                      <th
                        key={col}
                        className="text-left text-xs font-semibold text-gray-500 px-5 py-3 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, idx) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#FFF7ED] transition-colors"
                      style={{
                        borderBottom:
                          idx < leads.length - 1 ? "1px solid #F1F2F4" : "none",
                      }}
                    >
                      {/* Khách hàng */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
                          >
                            {getInitials(lead.name || lead.email || "?")}
                          </div>
                          <span className="font-medium text-[#1B2A4A]">
                            {lead.name || "—"}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-3.5">
                        <a
                          href={`mailto:${lead.email}`}
                          className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#F97316] transition-colors"
                        >
                          <Mail size={12} className="text-gray-400" />
                          {lead.email}
                        </a>
                      </td>

                      {/* Zalo */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {lead.zalo ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-blue-600">
                            <MessageCircle size={12} />
                            {lead.zalo}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>

                      {/* Tài nguyên đã tải */}
                      <td className="px-5 py-3.5">
                        {lead.resource ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                            <Download size={12} className="text-gray-400" />
                            {lead.resource}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>

                      {/* Nguồn */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: "rgba(249,115,22,0.1)",
                            color: "#EA580C",
                            border: "1px solid rgba(249,115,22,0.2)",
                          }}
                        >
                          {sourceLabel(lead.source)}
                        </span>
                      </td>

                      {/* Trạng thái */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {lead.subscribed ? (
                          <span
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium"
                            style={{
                              background: "rgba(34,197,94,0.1)",
                              color: "#16a34a",
                              border: "1px solid rgba(34,197,94,0.2)",
                            }}
                          >
                            <CheckCircle size={11} /> Đang theo dõi
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium"
                            style={{
                              background: "rgba(107,114,128,0.1)",
                              color: "#6b7280",
                              border: "1px solid rgba(107,114,128,0.2)",
                            }}
                          >
                            <XCircle size={11} /> Đã huỷ nhận
                          </span>
                        )}
                      </td>

                      {/* Ngày đăng ký */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="text-xs text-gray-500">
                          {formatDate(lead.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
