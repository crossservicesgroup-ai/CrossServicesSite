"use client";

import { sendGAEvent } from "@next/third-parties/google";

/* ==========================================================================
   GOOGLE ANALYTICS

   The measurement ID is not a secret — it ships in the page source of every
   site that uses GA — so it lives here as a constant rather than an
   environment variable. Nothing to set in Vercel, nothing to forget on a
   deploy, and no way for the tracking to silently stop working.

   Analytics only runs in production builds, so `npm run dev` on a laptop
   never lands in the reports.
   ========================================================================== */

export const GA_MEASUREMENT_ID = "G-Y7VKHVK21W";

export const analyticsEnabled = process.env.NODE_ENV === "production";

/** The events we send. Listed here so names never drift between callers. */
export type AnalyticsEvent =
  | "quote_submitted"
  | "contact_submitted"
  | "phone_click";

/**
 * Send one event to GA4.
 *
 * GA4 attaches the page address to its own automatic `page_view` events but
 * not to custom ones, so `page_path` rides along on every event here. That is
 * what makes it possible to ask "which pages produce leads" rather than only
 * "how many leads came in".
 */
export function trackEvent(
  name: AnalyticsEvent,
  params: Record<string, string | number | boolean> = {},
) {
  if (!analyticsEnabled) return;

  sendGAEvent("event", name, {
    page_path: window.location.pathname,
    ...params,
  });
}
