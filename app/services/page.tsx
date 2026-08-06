import type { Metadata } from "next";
import { serviceGroups } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/Section";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
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
          <p className="font-display mb-5 text-[19px] font-semibold text-cross-blue">
            Services
          </p>
          <h1 className="max-w-[20ch] text-[34px] leading-[1.05] md:text-[52px]">
            Everything a property needs, from one company
          </h1>
        </Container>
      </section>

      <Section tone="paper">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
          <GroupJumpLinks groups={serviceGroups} />
          <div>
            <ServiceGrid headingLevel="h2" />
          </div>
        </div>
      </Section>
    </>
  );
}
