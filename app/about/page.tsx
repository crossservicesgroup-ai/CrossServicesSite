import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { TeamGrid } from "@/components/blocks/TeamGrid";

export const metadata: Metadata = pageMetadata({
  /* Not "About Cross Services Group" — the root layout already appends
     "| Cross Services Group", which made the brand appear twice. */
  title: `About Us — ${site.address.city}, ${site.address.state}`,
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
              <h1 className="text-center text-[26px] leading-[1.05] text-cross-blue md:text-[40px]">
                About us
              </h1>
              <div className="mt-8 flex max-w-[68ch] flex-col gap-4 text-[18px]">
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
                alt="19 Tech Cir #1023, the Cross Services Group building in Natick"
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
          lead="Our leadership team combines decades of experience in operations, finance, and real estate. With several members having been with Cross Services Group for more than ten years, they play a vital role in delivering the outstanding service, trusted relationships, and long-term growth that have been the foundation of our company since 1989."
          eyebrowClassName="font-display! text-[19px]! font-semibold! normal-case! tracking-normal! text-cross-blue!"
          titleClassName="text-[22px]! md:text-[28px]! lg:text-[32px]!"
        />
        <div className="mt-10 md:mt-14">
          <TeamGrid />
        </div>
        <p className="mt-8 rounded-[2px] border border-dashed border-line bg-paper p-4 text-[15px] text-muted">
          <span className="type-eyebrow block text-muted">Draft — assets needed</span>
          <span className="mt-2 block">
            Headshots are needed for everyone, and bios for Warren III, Megan, Joe,
            Brian and Abby. The Irrigation and Car Detailing division heads still
            need names as well as headshots. Until then those cards show initials and
            just a name and title, which is deliberate — a company logo never stands
            in for a person.
          </span>
        </p>
      </Section>
    </>
  );
}
