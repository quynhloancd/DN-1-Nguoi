// ??????????????????????????????????????????????
// Site Configuration � Customize via Environment Variables
// ??????????????????????????????????????????????
// T?t c? gi� tr? ??u c� th? override b?ng env vars tr�n Vercel.
// H?c vi�n KH�NG c?n s?a file n�y � ch? c?n set env vars.
// ??????????????????????????????????????????????

const env = (key: string, fallback: string): string =>
  (typeof process !== "undefined" ? process.env?.[key] : undefined) || fallback;

export const siteConfig = {
  // ??? Brand ???
  // Env: NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_SITE_SHORT_NAME, NEXT_PUBLIC_SITE_DOMAIN
  //      NEXT_PUBLIC_SITE_TAGLINE, NEXT_PUBLIC_SITE_DESCRIPTION
  name: env("NEXT_PUBLIC_SITE_NAME", "Doanh Nghi?p 1 Ng??i"),
  shortName: env("NEXT_PUBLIC_SITE_SHORT_NAME", "DN1N"),
  domain: env("NEXT_PUBLIC_SITE_DOMAIN", "doanhnghiep1nguoi.online"),
  tagline: env("NEXT_PUBLIC_SITE_TAGLINE", "Kho tool AI th?c chi?n cho ng??i kinh doanh online m?t m�nh"),
  description: env(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "Doanh Nghi?p 1 Ng??i l� kho tool AI th?c chi?n � t? l�m content, ?nh, video v� workflow b�n h�ng m� kh�ng c?n thu� team, kh�ng c?n bi?t code."
  ),
  keywords: "kho tool AI, tool AI b�n h�ng, AI kh�ng c?n code, doanh nghi?p 1 ng??i",

  // ??? Owner ???
  // Env: NEXT_PUBLIC_OWNER_NAME, NEXT_PUBLIC_OWNER_BIO, NEXT_PUBLIC_OWNER_AVATAR
  owner: {
    name: env("NEXT_PUBLIC_OWNER_NAME", "Thi�n Hu? AI"),
    bio: env("NEXT_PUBLIC_OWNER_BIO", "Chuy�n gia AI Workflow cho ng??i kinh doanh & ?i l�m 35-50 tu?i"),
    avatar: env("NEXT_PUBLIC_OWNER_AVATAR", "/images/portrait.png"),
  },

  // ??? Colors (CSS values) ???
  // Env: NEXT_PUBLIC_COLOR_BRAND, NEXT_PUBLIC_COLOR_BRAND_HOVER
  //      NEXT_PUBLIC_COLOR_BG, NEXT_PUBLIC_COLOR_SURFACE, NEXT_PUBLIC_COLOR_TEXT
  colors: {
    brand: env("NEXT_PUBLIC_COLOR_BRAND", "#E85D04"),
    brandHover: env("NEXT_PUBLIC_COLOR_BRAND_HOVER", "#F97316"),
    background: env("NEXT_PUBLIC_COLOR_BG", "#0a0a0a"),
    surface: env("NEXT_PUBLIC_COLOR_SURFACE", "#111111"),
    text: env("NEXT_PUBLIC_COLOR_TEXT", "#f5f5f5"),
  },

  // ??? Social Links ???
  // Env: NEXT_PUBLIC_SOCIAL_FACEBOOK, NEXT_PUBLIC_SOCIAL_YOUTUBE,
  //      NEXT_PUBLIC_SOCIAL_ZALO, NEXT_PUBLIC_SOCIAL_TIKTOK, NEXT_PUBLIC_SOCIAL_INSTAGRAM
  socials: {
    facebook: env("NEXT_PUBLIC_SOCIAL_FACEBOOK", "https://facebook.com/doanhnghiep1nguoi"),
    youtube: env("NEXT_PUBLIC_SOCIAL_YOUTUBE", "https://youtube.com/@doanhnghiep1nguoi"),
    zalo: env("NEXT_PUBLIC_SOCIAL_ZALO", "https://zalo.me/doanhnghiep1nguoi"),
    tiktok: env("NEXT_PUBLIC_SOCIAL_TIKTOK", ""),
    instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM", ""),
  },

  // ??? Contact ???
  // Env: NEXT_PUBLIC_SUPPORT_EMAIL
  supportEmail: env("NEXT_PUBLIC_SUPPORT_EMAIL", "support@doanhnghiep1nguoi.online"),

  // ??? Footer ???
  // Env: NEXT_PUBLIC_FOOTER_COPYRIGHT
  footer: {
    copyright: env(
      "NEXT_PUBLIC_FOOTER_COPYRIGHT",
      `� ${new Date().getFullYear()} Doanh Nghi?p 1 Ng??i | Thi�n Hu? AI`
    ),
  },

  // ??? Features (toggle on/off) ???
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
 * Extracts the phone number from the Zalo URL (e.g. "https://zalo.me/0782276727" ? "0782276727").
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
