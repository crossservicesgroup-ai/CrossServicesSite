import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { GuaranteeBlock } from "@/components/blocks/GuaranteeBlock";
import { Timeline } from "@/components/blocks/Timeline";
import { TeamGrid } from "@/components/blocks/TeamGrid";

export const metadata: Metadata = pageMetadata({
  title: "About Cross Services Group",
  description:
    "Founded in Natick in 1989 by Warren Cross Jr. and family owned ever since. The story of how one car detailing business became eleven services under one roof.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* ------------------------------------------------ founding story */}
      <section className="border-b border-line bg-paper">
        <Container className="py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="type-eyebrow mb-5 text-cross-blue">About us</p>
              <h1 className="max-w-[20ch] text-[34px] leading-[1.05] md:text-[52px]">
                One company, built one business at a time
              </h1>
              <div className="mt-6 flex max-w-[68ch] flex-col gap-4 text-[18px]">
                <p>
                  Cross Services Group was founded by Warren Cross Jr. in {site.foundedYear},
                  and has been providing the very best in car and property maintenance
                  services to the MetroWest area ever since.
                </p>
                <p>
                  It started with one business: Classic Shine, the car cleaning division.
                  Over the following thirty-odd years Warren acquired complementary
                  companies — house cleaning, window cleaning, power washing, gutter
                  cleaning, landscaping, irrigation, commercial cleaning, junk removal,
                  carpentry and painting — and kept each of them specialist while putting
                  one phone number in front of all of them.
                </p>
                <p>
                  It is still family owned. Outstanding service is the number one
                  priority, and the growth has come almost entirely from repeat business
                  and referrals.
                </p>
              </div>
            </div>
            <Reveal delayIndex={1}>
              <MediaFrame
                src="/images/hero/warren-cross.jpg"
                alt="Warren Cross Jr., founder of Cross Services Group"
                ratio="4/3"
                sizes="(min-width: 1024px) 480px, 90vw"
                note="Founder photo, or an early Classic Shine photo"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- timeline */}
      <Section tone="surface" labelledBy="timeline-heading">
        <SectionHeader
          id="timeline-heading"
          eyebrow="How we got here"
          title="Thirty-plus years of adding one more thing"
          lead="Each of these was a company in its own right before it became a Cross division."
        />
        <div className="mt-10 md:mt-14">
          <Timeline />
        </div>
        <p className="mt-8 rounded-[2px] border border-dashed border-line bg-paper p-4 text-[15px] text-muted">
          <span className="type-eyebrow block text-muted">Draft — years to confirm</span>
          <span className="mt-2 block">
            The 1989 and 2007 dates are confirmed. The acquisition years for the other
            divisions are still needed — send them over and they replace the
            &ldquo;year to confirm&rdquo; markers above.
          </span>
        </p>
      </Section>

      {/* ------------------------------------------------------ guarantee */}
      <Section tone="paper">
        <div className="mx-auto max-w-[880px]">
          <GuaranteeBlock size="small" />
        </div>
      </Section>

      {/* ----------------------------------------------------------- team */}
      <Section tone="surface" id="team" labelledBy="team-heading" className="scroll-mt-24">
        <SectionHeader
          id="team-heading"
          eyebrow="Leadership"
          title="The people who run it"
          lead="Between them they cover operations, finance, real estate, house cleaning and technology. Several have been here more than a decade."
        />
        <div className="mt-10 md:mt-14">
          <TeamGrid />
        </div>
        <p className="mt-8 rounded-[2px] border border-dashed border-line bg-paper p-4 text-[15px] text-muted">
          <span className="type-eyebrow block text-muted">Draft — assets needed</span>
          <span className="mt-2 block">
            Headshots are needed for everyone, and bios for Warren III, Megan, Giulia,
            Joe and Brian. Until then those cards show initials and just a name and
            title, which is deliberate — a company logo never stands in for a person.
          </span>
        </p>
      </Section>

      {/* -------------------------------------------------------- careers */}
      <Section tone="paper" labelledBy="careers-teaser-heading">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[52ch]">
            <p className="type-eyebrow mb-4 text-cross-blue">Careers</p>
            <h2
              id="careers-teaser-heading"
              className="text-[26px] leading-[1.15] md:text-[34px]"
            >
              We are usually hiring
            </h2>
            <p className="mt-3 text-[17px] text-muted">
              Crews, technicians and office staff across every division. If you like
              doing the job properly, we would like to hear from you.
            </p>
          </div>
          <ButtonLink href="/careers" variant="secondary" size="lg">
            See careers at Cross
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
