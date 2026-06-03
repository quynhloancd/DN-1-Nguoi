export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export const IS_GA_ENABLED = !!GA_MEASUREMENT_ID;

/**
 * Track a page view in GA4.
 */
export function pageview(url: string) {
  if (!IS_GA_ENABLED || typeof window === "undefined") return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

/**
 * Track a custom event in GA4.
 */
export function event(action: string, params?: Record<string, unknown>) {
  if (!IS_GA_ENABLED || typeof window === "undefined") return;
  window.gtag("event", action, params);
}

/**
 * Track a purchase event (GA4 e-commerce).
 * Reads UTM attribution from sessionStorage key "dk_utm" and appends to event.
 */
export function trackPurchase(
  transactionId: string,
  value: number,
  currency = "VND",
  items?: unknown[],
) {
  // Đọc UTM từ sessionStorage nếu có
  let utmData: Record<string, string> = {};
  try {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("dk_utm") : null;
    if (stored) utmData = JSON.parse(stored);
  } catch { /* ignore */ }

  event("purchase", {
    transaction_id: transactionId,
    value,
    currency,
    items,
    // UTM attribution
    ...(utmData.utm_source && { campaign_source: utmData.utm_source }),
    ...(utmData.utm_medium && { campaign_medium: utmData.utm_medium }),
    ...(utmData.utm_campaign && { campaign_name: utmData.utm_campaign }),
  });
}

/**
 * Track a begin_checkout event (GA4 e-commerce).
 */
export function trackBeginCheckout(value: number, items?: unknown[]) {
  event("begin_checkout", {
    value,
    currency: "VND",
    items,
  });
}

// ---------------------------------------------------------------------------
// Global type augmentation so TypeScript knows about gtag / dataLayer
// ---------------------------------------------------------------------------
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
