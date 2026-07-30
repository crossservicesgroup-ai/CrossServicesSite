import type { Metadata } from "next";
import { site } from "@/content/site";
import { localBusinessSchema, pageMetadata } from "@/lib/seo";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Hero } from "@/components/blocks/Hero";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { Reviews } from "@/components/blocks/Reviews";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  description:
    "One call handles your home or your building. Cleaning, landscaping, power washing, repairs, property management and car detailing across MetroWest Boston since 1989.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />

      {/* 1 */} <Hero />

      {/* 2 */}
      <Section
        tone="paper"
        labelledBy="services-heading"
        className="!pt-8 md:!pt-12 lg:!pt-16"
      >
        <SectionHeader id="services-heading" title="Our Services" align="center" />
        <div className="mt-12 md:mt-16">
          <ServiceGrid />
        </div>
      </Section>

      {/* 3 */} <Reviews />
    </>
  );
}
