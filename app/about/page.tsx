import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
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
                  services to the Metro-West area ever since. CSG&rsquo;s first business
                  was Classic Shine, our car cleaning division. Over the next 33 years,
                  through strategic acquisitions, we have added a number of services:
                  Residential House Cleaning, Window Cleaning, Power Washing and Gutter
                  Cleaning, Landscaping, Irrigation, Commercial Cleaning, Junk Removal and
                  Carpentry/Painting.
                </p>
                <p>
                  As a locally owned and operated company, outstanding service is our #1
                  priority, and we try and deliver exceptional service in everything we
                  do. We have handled thousands of satisfied clients since our inception,
                  and have grown over the years through repeat business and referrals.
                </p>
                <p>
                  We are so convinced you will love any of our services, we have our
                  Cross Guarantee: &ldquo;If you are not completely satisfied with the
                  service we provide, then we will do it again, free of charge. No
                  Questions Asked.&rdquo;
                </p>
              </div>
            </div>
            <Reveal delayIndex={1}>
              <MediaFrame
                src="/images/hero/19-tech-circle.jpg"
                alt="19 Tech Circle, the Cross Services Group building in Natick"
                ratio="4/3"
                sizes="(min-width: 1024px) 480px, 90vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

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
    </>
  );
}
