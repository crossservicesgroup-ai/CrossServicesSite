import { site } from "@/content/site";
import { commercialReview } from "@/content/reviews";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/Checkbox";
import { Reveal } from "@/components/ui/Reveal";

/* --------------------------------------------------------------------------
   Aimed squarely at property and facility managers, so they do not bounce
   thinking this is a homeowner-only company.

   [NEEDS INPUT] Confirm the square footage and building count in
   content/site.ts before launch. Both come from Warren's bio on the current
   site rather than from you directly.
   -------------------------------------------------------------------------- */

const FOR_MANAGERS = [
  "Nightly janitorial with a named relationship manager",
  "Grounds, irrigation and snow-season clean-ups",
  "Window and exterior programs on a fixed schedule",
  "Carpentry, painting and turnovers between tenants",
  "Cameras, networking and phone systems",
  "24/7 emergency contact on managed properties",
];

export function CommercialProof() {
  return (
    <Section tone="paper" labelledBy="commercial-heading">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeader
            id="commercial-heading"
            eyebrow="For property & facility managers"
            title="We run buildings, not just houses"
            lead={`Cross owns and operates roughly ${site.commercial.squareFeet} square feet of commercial space across the ${site.commercial.parks}. We know what a building costs to keep standing, because we pay for ours.`}
          />

          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8">
            <div>
              <dt className="type-eyebrow text-muted">Square feet operated</dt>
              <dd className="mt-2 font-display text-[30px] leading-none text-cross-navy md:text-[38px]">
                {site.commercial.squareFeet}
              </dd>
            </div>
            <div className="border-l border-line pl-6">
              <dt className="type-eyebrow text-muted">Commercial buildings</dt>
              <dd className="mt-2 font-display text-[30px] leading-none text-cross-navy md:text-[38px]">
                {site.commercial.buildingCount}
              </dd>
            </div>
          </dl>

          {commercialReview ? (
            <blockquote className="mt-8 border-l-2 border-cross-blue pl-5">
              <p className="text-[17px]">&ldquo;{commercialReview.quote}&rdquo;</p>
              <footer className="mt-2 text-[15px] text-muted">
                {commercialReview.author}
              </footer>
            </blockquote>
          ) : (
            /* No commercial testimonial supplied yet. Rather than invent one,
               this space stays empty until a real quote arrives in
               content/reviews.ts. */
            null
          )}

          <div className="mt-8">
            <ButtonLink href="/quote?type=business">Get a commercial quote</ButtonLink>
          </div>
        </Reveal>

        <Reveal delayIndex={1}>
          <div className="rounded-[3px] border border-line bg-surface p-6 md:p-8">
            <p className="type-eyebrow mb-5 text-cross-blue">What we cover for you</p>
            <CheckList items={FOR_MANAGERS} />
            <p className="mt-6 border-t border-line pt-5 text-[15px] text-muted">
              Prefer to talk it through? Call{" "}
              <a
                href={site.phone.href}
                className="font-medium text-cross-blue underline underline-offset-4"
              >
                {site.phone.display}
              </a>{" "}
              and ask for operations.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
