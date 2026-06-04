// ──────────────────────────────────────────────
// Site Configuration — Customize via Environment Variables
// ──────────────────────────────────────────────
// Tất cả giá trị đều có thể override bằng env vars trên Vercel.
// Học viên KHÔNG cần sửa file này — chỉ cần set env vars.
// ──────────────────────────────────────────────

const env = (key: string, fallback: string): string =>
  (typeof process !== "undefined" ? process.env?.[key] : undefined) || fallback;

export const siteConfig = {
  // ─── Brand ───
  // Env: NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_SITE_SHORT_NAME, NEXT_PUBLIC_SITE_DOMAIN
  //      NEXT_PUBLIC_SITE_TAGLINE, NEXT_PUBLIC_SITE_DESCRIPTION
  name: env("NEXT_PUBLIC_SITE_NAME", "Doanh Nghiệp 1 Người"),
  shortName: env("NEXT_PUBLIC_SITE_SHORT_NAME", "DN1N"),
  domain: env("NEXT_PUBLIC_SITE_DOMAIN", "doanhnghiep1nguoi.online"),
  tagline: env("NEXT_PUBLIC_SITE_TAGLINE", "Ứng dụng AI vào công việc — dùng được ngay, không cần code"),
  description: env(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "Tôi giúp người 35–50 tuổi đang kinh doanh hoặc đi làm ứng dụng AI vào công việc thực tế — thông qua các tool và workflow đóng gói sẵn, không cần biết code."
  ),

  // ─── Owner ───
  // Env: NEXT_PUBLIC_OWNER_NAME, NEXT_PUBLIC_OWNER_BIO, NEXT_PUBLIC_OWNER_AVATAR
  owner: {
    name: env("NEXT_PUBLIC_OWNER_NAME", "Thiên Huệ AI"),
    bio: env("NEXT_PUBLIC_OWNER_BIO", "Chuyên gia AI Workflow cho người kinh doanh & đi làm 35-50 tuổi"),
    avatar: env("NEXT_PUBLIC_OWNER_AVATAR", "/images/about/portrait.jpg"),
  },

  // ─── Colors (CSS values) ───
  // Env: NEXT_PUBLIC_COLOR_BRAND, NEXT_PUBLIC_COLOR_BRAND_HOVER
  //      NEXT_PUBLIC_COLOR_BG, NEXT_PUBLIC_COLOR_SURFACE, NEXT_PUBLIC_COLOR_TEXT
  colors: {
    brand: env("NEXT_PUBLIC_COLOR_BRAND", "#E85D04"),
    brandHover: env("NEXT_PUBLIC_COLOR_BRAND_HOVER", "#F97316"),
    background: env("NEXT_PUBLIC_COLOR_BG", "#0a0a0a"),
    surface: env("NEXT_PUBLIC_COLOR_SURFACE", "#111111"),
    text: env("NEXT_PUBLIC_COLOR_TEXT", "#f5f5f5"),
  },

  // ─── Social Links ───
  // Env: NEXT_PUBLIC_SOCIAL_FACEBOOK, NEXT_PUBLIC_SOCIAL_YOUTUBE,
  //      NEXT_PUBLIC_SOCIAL_ZALO, NEXT_PUBLIC_SOCIAL_TIKTOK, NEXT_PUBLIC_SOCIAL_INSTAGRAM
  socials: {
    facebook: env("NEXT_PUBLIC_SOCIAL_FACEBOOK", "https://facebook.com/doanhnghiep1nguoi"),
    youtube: env("NEXT_PUBLIC_SOCIAL_YOUTUBE", "https://youtube.com/@doanhnghiep1nguoi"),
    zalo: env("NEXT_PUBLIC_SOCIAL_ZALO", "https://zalo.me/doanhnghiep1nguoi"),
    tiktok: env("NEXT_PUBLIC_SOCIAL_TIKTOK", ""),
    instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM", ""),
  },

  // ─── Contact ───
  // Env: NEXT_PUBLIC_SUPPORT_EMAIL
  supportEmail: env("NEXT_PUBLIC_SUPPORT_EMAIL", "support@doanhnghiep1nguoi.online"),

  // ─── Footer ───
  // Env: NEXT_PUBLIC_FOOTER_COPYRIGHT
  footer: {
    copyright: env(
      "NEXT_PUBLIC_FOOTER_COPYRIGHT",
      `© ${new Date().getFullYear()} Doanh Nghiệp 1 Người | Thiên Huệ AI`
    ),
  },

  // ─── Features (toggle on/off) ───
  // Env: NEXT_PUBLIC_FEATURE_AFFILIATE, NEXT_PUBLIC_FEATURE_COMMUNITY, etc.
  // Set to "false" to disable
  features: {
    affiliate: env("NEXT_PUBLIC_FEATURE_AFFILIATE", "true") !== "false",
    community: env("NEXT_PUBLIC_FEATURE_COMMUNITY", "true") !== "false",
    leaderboard: env("NEXT_PUBLIC_FEATURE_LEADERBOARD", "true") !== "false",
    events: env("NEXT_PUBLIC_FEATURE_EVENTS", "true") !== "false",
    blog: env("NEXT_PUBLIC_FEATURE_BLOG", "true") !== "false",
    crm: env("NEXT_PUBLIC_FEATURE_CRM", "true") !== "false",
    emailMarketing: env("NEXT_PUBLIC_FEATURE_EMAIL_MARKETING", "true") !== "false",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Extracts the phone number from the Zalo URL (e.g. "https://zalo.me/0782276727" → "0782276727").
 * Falls back to the raw URL if parsing fails.
 */
export function getZaloPhone(): string {
  const match = siteConfig.socials.zalo.match(/zalo\.me\/(\d+)/);
  return match?.[1] ?? siteConfig.socials.zalo;
}

/**
 * Returns the canonical base URL for the site.
 * Uses NEXT_PUBLIC_APP_URL env var, falling back to the configured domain.
 * Never returns a trailing slash.
 */
export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (envUrl && envUrl.startsWith("http")) return envUrl.replace(/\/$/, "");
  const domain = siteConfig.domain?.trim() || "doanhnghiep1nguoi.online";
  return `https://${domain}`;
}
