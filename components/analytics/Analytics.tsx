"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID, analyticsEnabled, trackEvent } from "@/lib/analytics";

/**
 * Loads gtag.js, and records every tap on a phone number.
 *
 * Phone links appear in thirteen places across the site — header, footer,
 * sticky mobile bar, both forms, several page bodies — and most of them sit
 * inside server components. Rather than convert all of those to client
 * components just to hang an onClick on each link, one delegated listener on
 * the document catches any click on a tel: link wherever it is, including any
 * added later.
 *
 * The gate lives in here rather than in the layout so there is a single place
 * that decides whether analytics runs at all.
 */
export function Analytics() {
  useEffect(() => {
    if (!analyticsEnabled) return;

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (!link) return;

      trackEvent("phone_click", {
        phone_number: link.getAttribute("href")?.replace("tel:", "") ?? "",
      });
    };

    /* Capture phase, so the tap is recorded even if something downstream
       stops the event before it reaches the document. */
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!analyticsEnabled) return null;

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
