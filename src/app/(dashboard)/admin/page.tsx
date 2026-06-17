import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import {
  Users, BookOpen, ShoppingCart, FileText, Mail,
  TrendingUp, Plus, Settings, ArrowRight, AlertCircle, DollarSign, Wrench, Clock
} from "lucide-react";
import AnalyticsDashboard from "@/components/admin/analytics/AnalyticsDashboardWrapper";
import UserAvatar from "@/components/admin/UserAvatar";

export default async function AdminPage() {
  const supabase = await createClient();

  // Auth + admin check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (!["admin", "manager"].includes(profile?.role ?? "")) redirect("/dashboard");

  // Use admin client for stats (bypasses RLS to see all data)
  const admin = await createAdminClient();

  const [
    { count: userCount },
    { count: orderCount },
    { count: pendingCount },
    { data: crmData },
    { count: blogCount },
    { count: subscriberCount },
    { data: recentUsers },
    { data: recentOrders },
  ] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("orders").select("id", { count: "exact", head: true }).eq("status", "paid"),
    admin.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("crm_overview").select("*").single(),
    admin.from("blog_posts").select("id", { count: "exact", head: true }),
    admin.from("subscribers").select("id", { count: "exact", head: true }).eq("status", "active"),
    admin
      .from("profiles")
      .select("full_name, avatar_url, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    admin
      .from("orders")
      .select("order_code, amount, status, customer_name, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  // Today's revenue
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { data: todayOrders } = await admin
    .from("orders")
    .select("amount")
    .eq("status", "paid")
    .gte("paid_at", todayStart.toISOString());

  const todayRevenue = (todayOrders ?? []).reduce((s, o) => s + o.amount, 0);
  const totalRevenue = (crmData as { total_revenue?: number } | null)?.total_revenue ?? 0;

  const quickStats = [
    {
      label: "Doanh thu hôm nay",
      value: todayRevenue.toLocaleString("vi-VN") + "đ",
      change: "Hôm nay",
      color: "#E85D04",
    },
    {
      label: "Đơn hàng hôm nay",
      value: String(todayOrders?.length ?? 0),
      change: "Hôm nay",
      color: "#f59e0b",
    },
    {
      label: "Tổng khách hàng",
      value: (userCount ?? 0).toLocaleString("vi-VN"),
      change: "tài khoản",
      color: "#3b82f6",
    },
    {
      label: "Tổng doanh thu",
      value: totalRevenue.toLocaleString("vi-VN") + "đ",
      change: "tất cả thời gian",
      color: "#a855f7",
    },
  ];

  const adminCards = [
    {
      icon: Wrench,
      title: "Tool AI",
      desc: "Sản phẩm chính — thêm/sửa tool, giá bán và nội dung mở khoá",
      count: "Kho tool",
      color: "#F97316",
      actions: [
        { label: "Thêm tool", href: "/admin/tools/new" },
        { label: "Danh sách", href: "/admin/tools" },
      ],
    },
    {
      icon: ShoppingCart,
      title: "Đơn hàng",
      desc: "Xác nhận thanh toán khi khách báo đã chuyển khoản",
      count: `${orderCount ?? 0} đơn đã thanh toán`,
      color: "#f59e0b",
      actions: [
        { label: "Chờ xác nhận", href: "/admin/orders?status=pending" },
        { label: "Tất cả đơn", href: "/admin/orders" },
      ],
    },
    {
      icon: Users,
      title: "Khách hàng",
      desc: "Danh sách, phân quyền và theo dõi đơn của từng khách",
      count: `${(userCount ?? 0).toLocaleString("vi-VN")} khách hàng`,
      color: "#3b82f6",
      actions: [
        { label: "Danh sách", href: "/admin/users" },
        { label: "Phân quyền", href: "/admin/roles" },
      ],
    },
    {
      icon: BookOpen,
      title: "Khoá học đề xuất",
      desc: "Link affiliate khoá học — thêm khoá, gắn link & ảnh",
      count: "Affiliate",
      color: "#a855f7",
      actions: [
        { label: "Thêm khoá học", href: "/admin/courses/new" },
        { label: "Danh sách", href: "/admin/courses" },
      ],
    },
    {
      icon: FileText,
      title: "Blog",
      desc: "Viết bài SEO kéo traffic về kho tool",
      count: `${blogCount ?? 0} bài viết`,
      color: "#8b5cf6",
      actions: [
        { label: "Viết bài", href: "/admin/blog/new" },
        { label: "Danh sách", href: "/admin/blog" },
      ],
    },
    {
      icon: Mail,
      title: "Email Marketing",
      desc: "Template, automation chào mừng và subscribers",
      count: `${(subscriberCount ?? 0).toLocaleString("vi-VN")} subscribers`,
      color: "#ec4899",
      actions: [
        { label: "Mở Email", href: "/email" },
      ],
    },
    {
      icon: TrendingUp,
      title: "CRM & Analytics",
      desc: "Doanh thu, chuyển đổi và phễu bán hàng",
      count: "Báo cáo",
      color: "#14b8a6",
      actions: [
        { label: "Khách quan tâm", href: "/crm/interests" },
        { label: "Pipeline", href: "/crm/pipeline" },
      ],
    },
  ];

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} phút trước`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} giờ trước`;
    return `${Math.floor(hrs / 24)} ngày trước`;
  }

  return (
    <div>
      <TopBar title="Admin Panel" subtitle="Quản lý toàn bộ nền tảng Doanh Nghiệp 1 Người" />

      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* Warning banner */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <AlertCircle size={15} className="text-[#f59e0b] shrink-0" />
          <span className="text-[#f59e0b] font-medium">Khu vực Admin</span>
          <span className="text-gray-400">
            — Xin chào {profile?.full_name ?? user.email}. Mọi thay đổi có hiệu lực ngay lập tức.
          </span>
        </div>

        {/* Đơn chờ xác nhận — nối thẳng với luồng "khách đã chuyển khoản" */}
        {(pendingCount ?? 0) > 0 && (
          <Link
            href="/admin/orders?status=pending"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors hover:brightness-95"
            style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.25)" }}
          >
            <Clock size={16} className="text-[#F97316] shrink-0" />
            <span className="text-[#F97316] font-semibold">
              {pendingCount} đơn đang chờ xác nhận thanh toán
            </span>
            <span className="text-gray-500 hidden sm:inline">
              — khách đã bấm &ldquo;Đã chuyển khoản&rdquo;, bấm để duyệt.
            </span>
            <ArrowRight size={14} className="text-[#F97316] ml-auto shrink-0" />
          </Link>
        )}

        {/* Real stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((s) => (
            <div key={s.label} className="card-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={14} style={{ color: s.color }} />
                <span className="text-xs text-gray-500">{s.label}</span>
              </div>
              <div className="text-xl font-bold text-[#1B2A4A]">{s.value}</div>
              <div className="text-[11px] mt-1" style={{ color: s.color }}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />

        {/* Admin cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {adminCards.map((card) => (
            <div key={card.title} className="card-dark p-5 hover:bg-[#F8F9FA] transition-all">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: card.color + "18" }}
                >
                  <card.icon size={20} style={{ color: card.color }} />
                </div>
                <span className="text-xs text-gray-500 font-medium">{card.count}</span>
              </div>
              <h3 className="font-semibold text-[#1B2A4A] mb-1">{card.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{card.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {card.actions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                    style={{
                      background: card.color + "15",
                      color: card.color,
                      border: `1px solid ${card.color}25`,
                    }}
                  >
                    {action.label.startsWith("Thêm") || action.label.startsWith("Viết") || action.label.startsWith("Tạo")
                      ? <Plus size={11} />
                      : <ArrowRight size={11} />}
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent users */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#1B2A4A] text-sm">Khách hàng mới</h2>
              <Link
                href="/admin/users"
                className="text-xs font-medium text-[#3b82f6] flex items-center gap-1 hover:underline"
              >
                Xem tất cả <ArrowRight size={11} />
              </Link>
            </div>
            <div className="card-dark divide-y divide-[#2a2a2a]">
              {(recentUsers ?? []).length === 0 && (
                <div className="p-4 text-sm text-gray-500">Chưa có khách hàng nào.</div>
              )}
              {(recentUsers ?? []).map((u, i) => (
                <div key={i} className="flex items-center gap-3 p-3 hover:bg-[#F0F1F3] transition-colors">
                  <UserAvatar
                    src={u.avatar_url}
                    initials={(u.full_name ?? "?").slice(0, 2).toUpperCase()}
                    role="student"
                    tier="free"
                    size={28}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-[#1B2A4A] truncate">{u.full_name ?? "Thành viên"}</div>
                  </div>
                  <div className="text-xs text-gray-500 shrink-0">{timeAgo(u.created_at)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent orders */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#1B2A4A] text-sm">Đơn hàng gần đây</h2>
              <Link
                href="/admin/orders"
                className="text-xs font-medium text-[#f59e0b] flex items-center gap-1 hover:underline"
              >
                Xem tất cả <ArrowRight size={11} />
              </Link>
            </div>
            <div className="card-dark divide-y divide-[#2a2a2a]">
              {(recentOrders ?? []).length === 0 && (
                <div className="p-4 text-sm text-gray-500">Chưa có đơn hàng nào.</div>
              )}
              {(recentOrders ?? []).map((o, i) => (
                <div key={i} className="flex items-center gap-3 p-3 hover:bg-[#F0F1F3] transition-colors">
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mt-0.5"
                    style={{
                      background:
                        o.status === "paid"
                          ? "#E85D04"
                          : o.status === "pending"
                          ? "#f59e0b"
                          : "#6b7280",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-[#1B2A4A] truncate">
                      {o.customer_name ?? o.order_code}
                    </div>
                    <div className="text-xs text-gray-500">{o.order_code}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-[#1B2A4A]">
                      {o.amount.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="text-xs text-gray-500">{timeAgo(o.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="font-bold text-[#1B2A4A] mb-3 text-sm">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { label: "Thêm Tool AI", icon: Wrench, color: "#F97316", href: "/admin/tools/new" },
              { label: "Đơn chờ xác nhận", icon: ShoppingCart, color: "#f59e0b", href: "/admin/orders?status=pending" },
              { label: "Khách hàng", icon: Users, color: "#8b5cf6", href: "/admin/users" },
              { label: "Cài đặt", icon: Settings, color: "#6b7280", href: "/settings" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors card-dark hover:bg-[#F8F9FA]"
              >
                <item.icon size={15} style={{ color: item.color }} />
                <span className="text-gray-600">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* License watermark */}
        <div className="mt-6 text-center text-xs text-gray-600">
          {process.env.NEXT_PUBLIC_LICENSE_NAME && process.env.NEXT_PUBLIC_LICENSE_NAME !== "UNLICENSED"
            ? `Licensed to: ${process.env.NEXT_PUBLIC_LICENSE_NAME}`
            : "Unlicensed Copy"}
        </div>
      </div>
    </div>
  );
}
