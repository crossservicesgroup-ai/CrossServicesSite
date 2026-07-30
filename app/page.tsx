import type { Metadata } from "next";
import { site } from "@/content/site";
import { localBusinessSchema, pageMetadata } from "@/lib/seo";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Hero } from "@/components/blocks/Hero";
import { Proof } from "@/components/blocks/Proof";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { GuaranteeBlock } from "@/components/blocks/GuaranteeBlock";
import { HowItWorks } from "@/components/blocks/HowItWorks";
import { Reviews } from "@/components/blocks/Reviews";
import { ServiceAreaBlock } from "@/components/blocks/ServiceAreaBlock";
import { ClubBand } from "@/components/blocks/ClubBand";
import { QuoteCta } from "@/components/blocks/QuoteCta";

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
      {/* 2 */} <Proof />

      {/* 3 */}
      <Section tone="paper" labelledBy="services-heading">
        <SectionHeader
          id="services-heading"
          eyebrow="Everything we do"
          title="Twelve services, one phone number"
          lead="Grouped the way a property actually works, not alphabetically. Every one of them is available to homeowners and to commercial properties."
        />
        <div className="mt-12 md:mt-16">
          <ServiceGrid showGroupBlurbs />
        </div>
      </Section>

      {/* 4 */} <GuaranteeBlock />
      {/* 5 */} <HowItWorks />
      {/* 6 */} <Reviews />
      {/* 7 */} <ServiceAreaBlock />
      {/* 8 */} <ClubBand />
      {/* 9 */} <QuoteCta />
    </>
  );
}
