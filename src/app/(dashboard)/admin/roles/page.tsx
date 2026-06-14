import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { Shield, Search, Save, ShieldAlert } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = "student" | "admin" | "manager" | "marketing" | "sale" | "support";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email?: string | null;
  role: Role;
}

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Quản lý" },
  { value: "marketing", label: "Marketing" },
  { value: "sale", label: "Sale" },
  { value: "support", label: "CSKH" },
  { value: "student", label: "Học viên" },
];

const roleConfig: Record<Role, { label: string; bg: string; color: string; border: string }> = {
  admin: { label: "Admin", bg: "rgba(239,68,68,0.1)", color: "#ef4444", border: "rgba(239,68,68,0.25)" },
  manager: { label: "Quản lý", bg: "rgba(168,85,247,0.1)", color: "#a855f7", border: "rgba(168,85,247,0.25)" },
  marketing: { label: "Marketing", bg: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "rgba(59,130,246,0.25)" },
  sale: { label: "Sale", bg: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  support: { label: "CSKH", bg: "rgba(212,168,67,0.1)", color: "#E85D04", border: "rgba(212,168,67,0.25)" },
  student: { label: "Học viên", bg: "rgba(107,114,128,0.1)", color: "#6b7280", border: "rgba(107,114,128,0.25)" },
};

// ─── Auth guard: CHỈ admin ───────────────────────────────────────────────────

async function requireAdmin(): Promise<string> {
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
  if (!profile || profile.role !== "admin") {
    redirect("/dashboard");
  }
  return user.id;
}

// ─── Server Action: đổi role ─────────────────────────────────────────────────

async function updateUserRole(formData: FormData) {
  "use server";
  const adminUserId = await requireAdmin();

  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "") as Role;

  const validRoles: Role[] = ["student", "admin", "manager", "marketing", "sale", "support"];
  if (!userId || !validRoles.includes(role)) return;

  // Không cho admin tự hạ quyền chính mình
  if (userId === adminUserId && role !== "admin") {
    return;
  }

  const adminClient = await createAdminClient();
  await adminClient.from("profiles").update({ role }).eq("id", userId);
  revalidatePath("/admin/roles");
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function AdminRolesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = (params.q ?? "").trim();

  const myUserId = await requireAdmin();

  const supabase = await createAdminClient();

  const [profilesRes, authUsersRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, avatar_url, role")
      .order("role", { ascending: true })
      .order("full_name", { ascending: true }),
    supabase.auth.admin.listUsers({ perPage: 10000 }),
  ]);

  const emailMap = new Map<string, string>();
  for (const au of authUsersRes.data?.users ?? []) {
    if (au.email) emailMap.set(au.id, au.email);
  }

  let users: Profile[] = (profilesRes.data ?? []).map((p) => ({
    ...p,
    email: emailMap.get(p.id) ?? null,
  })) as Profile[];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    users = users.filter(
      (u) =>
        (u.full_name ?? "").toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q)
    );
  }

  const staffCount = users.filter((u) =>
    ["admin", "manager", "marketing", "sale", "support"].includes(u.role)
  ).length;

  return (
    <div>
      <TopBar
        title="Phân quyền"
        subtitle="Quản lý vai trò (role) của người dùng trong hệ thống"
      />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(232,93,4,0.09)" }}
          >
            <Shield size={20} className="text-[#E85D04]" />
          </div>
          <div>
            <h2 className="font-bold text-[#1B2A4A] text-base">Danh sách phân quyền</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {users.length} người dùng — {staffCount} nhân viên
            </p>
          </div>
        </div>

        {/* Cảnh báo */}
        <div
          className="flex items-start gap-2 p-3 rounded-xl text-xs"
          style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", color: "#b45309" }}
        >
          <ShieldAlert size={16} className="shrink-0 mt-0.5 text-[#f59e0b]" />
          <span>
            Chỉ <strong>Admin</strong> mới có quyền đổi vai trò. Bạn không thể tự hạ quyền của
            chính mình.
          </span>
        </div>

        {/* Search */}
        <form
          method="GET"
          className="flex gap-3 p-3 rounded-xl"
          style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
        >
          <div className="flex items-center gap-2 flex-1 px-3 rounded-lg" style={{ border: "1px solid #E2E8F0" }}>
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Tìm theo tên hoặc email..."
              className="flex-1 py-2 text-sm bg-transparent outline-none text-[#1B2A4A]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-lg font-medium text-white"
            style={{ background: "#F97316" }}
          >
            Tìm
          </button>
          {searchQuery && (
            <Link
              href="/admin/roles"
              className="flex items-center px-3 py-2 text-xs text-gray-500 hover:text-[#1B2A4A] transition-colors"
            >
              Xoá
            </Link>
          )}
        </form>

        {/* Table */}
        <div
          className="overflow-hidden rounded-xl"
          style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                  {["Người dùng", "Email", "Vai trò hiện tại", "Đổi vai trò"].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-gray-500 text-sm">
                      {searchQuery
                        ? "Không tìm thấy người dùng phù hợp."
                        : "Chưa có người dùng nào."}
                    </td>
                  </tr>
                ) : (
                  users.map((u, idx) => {
                    const cfg = roleConfig[u.role] ?? roleConfig.student;
                    const isSelf = u.id === myUserId;
                    return (
                      <tr
                        key={u.id}
                        className="transition-colors hover:bg-[#F8FAFC]"
                        style={{
                          borderBottom: idx < users.length - 1 ? "1px solid #E2E8F0" : "none",
                        }}
                      >
                        {/* Avatar + Name */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {u.avatar_url ? (
                              <img
                                src={u.avatar_url}
                                alt={u.full_name || ""}
                                className="w-9 h-9 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <div
                                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                                style={{ background: "#F97316" }}
                              >
                                {getInitials(u.full_name)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="font-medium text-[#1B2A4A] truncate">
                                {u.full_name || "Chưa đặt tên"}
                                {isSelf && (
                                  <span className="ml-1.5 text-[10px] text-[#F97316] font-semibold">
                                    (Bạn)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                          {u.email || "—"}
                        </td>

                        {/* Current role */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                          >
                            {cfg.label}
                          </span>
                        </td>

                        {/* Change role form */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <form action={updateUserRole} className="flex items-center gap-2">
                            <input type="hidden" name="userId" value={u.id} />
                            <select
                              name="role"
                              defaultValue={u.role}
                              className="px-3 py-1.5 text-sm rounded-lg text-[#1B2A4A] bg-white outline-none"
                              style={{ border: "1px solid #E2E8F0" }}
                            >
                              {ROLE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <button
                              type="submit"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-opacity hover:opacity-90"
                              style={{ background: "#F97316" }}
                            >
                              <Save size={13} />
                              Lưu
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
