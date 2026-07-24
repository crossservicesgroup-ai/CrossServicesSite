import type { Metadata } from "next";
import { brands } from "@/content/brands";
import { serviceGroups } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { BrandStrip } from "@/components/blocks/BrandCard";
import { QuoteCta } from "@/components/blocks/QuoteCta";
import { GroupJumpLinks } from "@/components/blocks/GroupJumpLinks";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "All eleven Cross Services Group services — grounds and exterior, cleaning, repairs and projects, property management and vehicles. Residential and commercial across MetroWest Boston.",
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-12 md:py-20">
          <p className="type-eyebrow mb-5 text-cross-blue">Services</p>
          <h1 className="max-w-[20ch] text-[34px] leading-[1.05] md:text-[52px]">
            Everything a property needs, from one company
          </h1>
          <p className="mt-5 max-w-[68ch] text-[18px] text-muted">
            Eleven services, grouped the way a property actually works. Every one of
            them is available to homeowners and to commercial properties, and you can
            book as many as you like on a single visit.
          </p>
        </Container>
      </section>

      <Section tone="paper">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
          <GroupJumpLinks groups={serviceGroups} />
          <div>
            <ServiceGrid showGroupBlurbs headingLevel="h2" />
          </div>
        </div>
      </Section>

      {/* The family of brands is acknowledged here, and nowhere else. */}
      <section className="border-t border-line bg-surface">
        <Container className="py-14 md:py-20">
          <SectionHeader
            eyebrow="Our companies"
            title="The companies behind our services"
            lead="Cross has grown by acquiring specialists and keeping them specialist. These are the names you will see on the vans."
          />
          <div className="mt-8">
            <BrandStrip brands={brands} />
          </div>
        </Container>
      </section>

      <QuoteCta
        title="Not sure which of these you need?"
        body="Tick everything that sounds close. We will work out the rest with you on the phone."
      />
    </>
  );
}
