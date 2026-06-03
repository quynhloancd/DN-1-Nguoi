import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import PageTracker from "@/components/analytics/PageTracker";
import FacebookPixel from "@/components/analytics/FacebookPixel";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import ScrollTracker from "@/components/analytics/ScrollTracker";
import AffiliateTracker from "@/components/affiliate/AffiliateTracker";
import CookieConsent from "@/components/CookieConsent";
import ErrorBoundary from "@/components/providers/ErrorBoundary";
import WebsiteJsonLd from "@/components/seo/WebsiteJsonLd";
import { siteConfig, getBaseUrl } from "@/lib/site-config";
import { validateEnv } from "@/lib/env-check";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

// Validate environment variables once at server startup
validateEnv();

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${siteConfig.owner.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: `${siteConfig.owner.name}, AI workflow, n8n automation, ứng dụng AI, workflow tự động hoá, doanh nghiệp 1 người, AI không cần code, tiết kiệm thời gian AI, ${siteConfig.shortName}`,
  manifest: "/manifest.json",
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: `${siteConfig.owner.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/hero/offer-banner.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.owner.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.owner.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/hero/offer-banner.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },
  verification: {
    google: "google8a3986c0e71cd00b",
  },
};

export const viewport: Viewport = {
  themeColor: "#E85D04",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  let supabaseHostname: string | null = null;
  try {
    if (supabaseUrl && supabaseUrl.startsWith("https://")) {
      supabaseHostname = new URL(supabaseUrl).hostname;
    }
  } catch { /* invalid URL — skip preconnect */ }

  return (
    <html lang="vi" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {supabaseHostname && (
          <link rel="preconnect" href={`https://${supabaseHostname}`} />
        )}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        {/* Google Analytics 4 — must be in <head> for Search Console verification */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased min-h-screen" style={{ background: "#0a0a0a", color: "#f5f5f5" }} suppressHydrationWarning>
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#E85D04] focus:text-black focus:text-sm focus:font-semibold focus:outline-none"
        >
          Chuyển đến nội dung chính
        </a>
        <Suspense fallback={null}>
          <PageTracker />
          <FacebookPixel />
          <MicrosoftClarity />
          <AffiliateTracker />
          <ScrollTracker />
        </Suspense>
        <ErrorBoundary>
          <main id="main-content">{children}</main>
        </ErrorBoundary>
        <CookieConsent />
        <WebsiteJsonLd />
      </body>
    </html>
  );
}
