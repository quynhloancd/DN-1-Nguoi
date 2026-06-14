import TopBar from "@/components/layout/TopBar";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";
import {
  Building2,
  User,
  Mail,
  ToggleRight,
  Info,
} from "lucide-react";

async function requireAdmin() {
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
}

// ─── Reusable display row ───
function Field({
  label,
  value,
  env,
}: {
  label: string;
  value: string;
  env: string;
}) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-[#E2E8F0] last:border-b-0">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <code className="text-[10px] text-gray-400 bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#E2E8F0]">
          {env}
        </code>
      </div>
      <span className="text-sm text-[#1B2A4A] break-words">
        {value && value.trim() !== "" ? (
          value
        ) : (
          <span className="text-gray-400 italic">— (chưa đặt)</span>
        )}
      </span>
    </div>
  );
}

// ─── Section wrapper ───
function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-dark p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(249,115,22,0.1)" }}
        >
          {icon}
        </div>
        <h3 className="font-bold text-[#1B2A4A] text-sm">{title}</h3>
      </div>
      {children}
      <div className="flex items-start gap-2 mt-4 pt-3 border-t border-[#E2E8F0]">
        <Info size={13} className="text-gray-400 mt-0.5 shrink-0" />
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Để thay đổi, cập nhật biến môi trường{" "}
          <span className="font-medium">NEXT_PUBLIC_...</span> trên Vercel rồi
          deploy lại.
        </p>
      </div>
    </div>
  );
}

// ─── Feature badge ───
function FeatureRow({
  label,
  enabled,
  env,
}: {
  label: string;
  enabled: boolean;
  env: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-[#E2E8F0] last:border-b-0">
      <div className="flex flex-col">
        <span className="text-sm text-[#1B2A4A]">{label}</span>
        <code className="text-[10px] text-gray-400">{env}</code>
      </div>
      {enabled ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#F97316] border border-orange-200">
          Bật
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
          Tắt
        </span>
      )}
    </div>
  );
}

export default async function AdminSettingsPage() {
  await requireAdmin();

  const { name, shortName, domain, tagline, description, owner, socials, supportEmail, features } =
    siteConfig;

  const featureList: { label: string; enabled: boolean; env: string }[] = [
    { label: "Affiliate (Tiếp thị liên kết)", enabled: features.affiliate, env: "NEXT_PUBLIC_FEATURE_AFFILIATE" },
    { label: "Community (Cộng đồng)", enabled: features.community, env: "NEXT_PUBLIC_FEATURE_COMMUNITY" },
    { label: "Leaderboard (Bảng xếp hạng)", enabled: features.leaderboard, env: "NEXT_PUBLIC_FEATURE_LEADERBOARD" },
    { label: "Events (Sự kiện)", enabled: features.events, env: "NEXT_PUBLIC_FEATURE_EVENTS" },
    { label: "Blog", enabled: features.blog, env: "NEXT_PUBLIC_FEATURE_BLOG" },
    { label: "CRM (Quản lý khách hàng)", enabled: features.crm, env: "NEXT_PUBLIC_FEATURE_CRM" },
    { label: "Email Marketing", enabled: features.emailMarketing, env: "NEXT_PUBLIC_FEATURE_EMAIL_MARKETING" },
  ];

  return (
    <div>
      <TopBar
        title="Cài đặt"
        subtitle="Cấu hình thương hiệu, liên hệ và tính năng của nền tảng"
      />

      <div className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Intro note */}
        <div
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)" }}
        >
          <Info size={18} className="text-[#F97316] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#1B2A4A] mb-0.5">
              Cấu hình qua biến môi trường
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Trang này hiển thị cấu hình hiện tại của nền tảng (đọc từ{" "}
              <code className="text-[#F97316]">siteConfig</code>). Các giá trị
              được nạp từ biến môi trường khi build. Muốn đổi: vào Vercel →
              Settings → Environment Variables, cập nhật biến tương ứng rồi
              deploy lại.
            </p>
          </div>
        </div>

        {/* Thương hiệu */}
        <Section
          icon={<Building2 size={18} className="text-[#F97316]" />}
          title="Thương hiệu"
        >
          <Field label="Tên website" value={name} env="NEXT_PUBLIC_SITE_NAME" />
          <Field label="Tên rút gọn" value={shortName} env="NEXT_PUBLIC_SITE_SHORT_NAME" />
          <Field label="Tên miền" value={domain} env="NEXT_PUBLIC_SITE_DOMAIN" />
          <Field label="Khẩu hiệu (tagline)" value={tagline} env="NEXT_PUBLIC_SITE_TAGLINE" />
          <Field label="Mô tả" value={description} env="NEXT_PUBLIC_SITE_DESCRIPTION" />
        </Section>

        {/* Chủ sở hữu */}
        <Section
          icon={<User size={18} className="text-[#F97316]" />}
          title="Chủ sở hữu"
        >
          <Field label="Tên" value={owner.name} env="NEXT_PUBLIC_OWNER_NAME" />
          <Field label="Giới thiệu (bio)" value={owner.bio} env="NEXT_PUBLIC_OWNER_BIO" />
          <Field label="Ảnh đại diện (avatar)" value={owner.avatar} env="NEXT_PUBLIC_OWNER_AVATAR" />
        </Section>

        {/* Liên hệ & Mạng xã hội */}
        <Section
          icon={<Mail size={18} className="text-[#F97316]" />}
          title="Liên hệ & Mạng xã hội"
        >
          <Field label="Email hỗ trợ" value={supportEmail} env="NEXT_PUBLIC_SUPPORT_EMAIL" />
          <Field label="Facebook" value={socials.facebook} env="NEXT_PUBLIC_SOCIAL_FACEBOOK" />
          <Field label="YouTube" value={socials.youtube} env="NEXT_PUBLIC_SOCIAL_YOUTUBE" />
          <Field label="Zalo" value={socials.zalo} env="NEXT_PUBLIC_SOCIAL_ZALO" />
          <Field label="TikTok" value={socials.tiktok} env="NEXT_PUBLIC_SOCIAL_TIKTOK" />
          <Field label="Instagram" value={socials.instagram} env="NEXT_PUBLIC_SOCIAL_INSTAGRAM" />
        </Section>

        {/* Tính năng */}
        <Section
          icon={<ToggleRight size={18} className="text-[#F97316]" />}
          title="Tính năng đang bật/tắt"
        >
          {featureList.map((f) => (
            <FeatureRow key={f.env} label={f.label} enabled={f.enabled} env={f.env} />
          ))}
        </Section>
      </div>
    </div>
  );
}
