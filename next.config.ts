import type { NextConfig } from "next";

/* ==========================================================================
   REDIRECTS

   The old Squarespace site has Google ranking we do not want to throw away.
   Every legacy address permanently redirects (301) to its new home, so both
   Google and anyone's old bookmark land in the right place.

   Service redirects are generated from content/services.ts using each
   service's `legacyPath`, so adding a service with an old URL wires up its
   redirect automatically.
   ========================================================================== */

import { services } from "./content/services";

const serviceRedirects = services
  .filter((service) => service.legacyPath)
  .map((service) => ({
    source: service.legacyPath!,
    destination: `/services/${service.slug}`,
    statusCode: 301 as const,
  }));

const pageRedirects = [
  { source: "/cardetailing", destination: "/services", statusCode: 301 as const },
  { source: "/about-us", destination: "/about", statusCode: 301 as const },
  { source: "/about-us-1", destination: "/about", statusCode: 301 as const },
  { source: "/our-team", destination: "/about#team", statusCode: 301 as const },
  { source: "/join-our-team", destination: "/careers", statusCode: 301 as const },
  { source: "/contact-us", destination: "/contact", statusCode: 301 as const },
  { source: "/cross-courts-squash", destination: "/club", statusCode: 301 as const },
  { source: "/garage-gym", destination: "/club", statusCode: 301 as const },
  // Leftover Squarespace pages that never did anything
  { source: "/cart", destination: "/", statusCode: 301 as const },
  { source: "/search", destination: "/", statusCode: 301 as const },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [...serviceRedirects, ...pageRedirects];
  },
};

export default nextConfig;
