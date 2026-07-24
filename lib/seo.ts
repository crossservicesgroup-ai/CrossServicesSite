/* ==========================================================================
   SEO helpers — page titles, descriptions, canonical URLs, and the
   structured data Google reads.
   ========================================================================== */

import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Service } from "@/content/services";

export const SITE_URL = site.url;

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Defaults to the shared social share image. */
  image?: string;
};

/** Builds a full metadata object for a page, including canonical + social tags. */
export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}

/* --------------------------------------------------------------------------
   Structured data (JSON-LD)
   -------------------------------------------------------------------------- */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.state,
  postalCode: site.address.zip,
  addressCountry: "US",
};

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: site.legalName,
    alternateName: site.name,
    url: SITE_URL,
    telephone: site.phone.display,
    email: site.email,
    foundingDate: String(site.foundedYear),
    slogan: site.tagline,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    openingHoursSpecification: site.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    areaServed: site.serviceAreaTowns.map((town) => ({
      "@type": "City",
      name: `${town}, MA`,
    })),
    sameAs: [site.social.instagram, site.social.linkedin, site.social.facebook],
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.tagline,
    serviceType: service.name,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${SITE_URL}/#business`,
      name: site.legalName,
      telephone: site.phone.display,
      address: postalAddress,
    },
    areaServed: site.serviceAreaTowns.map((town) => ({
      "@type": "City",
      name: `${town}, MA`,
    })),
    audience: [
      { "@type": "Audience", audienceType: "Homeowners" },
      { "@type": "Audience", audienceType: "Commercial property managers" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} — what's included`,
      itemListElement: service.includes.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
