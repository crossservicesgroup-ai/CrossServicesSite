import type { Metadata } from "next";
import { Container } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, LinkCard } from "@/components/ui/Card";
import { CheckList, CheckMark } from "@/components/ui/Checkbox";
import { CheckGlyph, SectionHeader } from "@/components/ui/Section";
import { BothAudiencesTag, Tag } from "@/components/ui/Tag";
import { MediaFrame } from "@/components/ui/Media";

/* Internal reference page. Not linked from anywhere and blocked in
   robots.ts — it exists so design decisions stay checkable in one place. */

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const COLORS = [
  { name: "--cross-blue", hex: "#1255A2", note: "Actions only. Exact hex from the logo.", class: "bg-cross-blue" },
  { name: "--cross-navy", hex: "#0B3665", note: "Large headlines and the footer.", class: "bg-cross-navy" },
  { name: "--paper", hex: "#F7F6F2", note: "Page background.", class: "bg-paper" },
  { name: "--surface", hex: "#FFFFFF", note: "Cards.", class: "bg-surface" },
  { name: "--ink", hex: "#1B1D21", note: "Body text.", class: "bg-ink" },
  { name: "--muted", hex: "#5C6270", note: "Secondary text.", class: "bg-muted" },
  { name: "--line", hex: "#E4E2DB", note: "Hairline borders.", class: "bg-line" },
];

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

export default function StyleguidePage() {
  return (
    <Container className="py-12 md:py-20">
      <p className="type-eyebrow mb-5 text-cross-blue">Internal</p>
      <h1 className="text-[34px] leading-[1.05] md:text-[52px]">Styleguide</h1>
      <p className="mt-4 max-w-[68ch] text-[18px] text-muted">
        Every token and base component in one place. Not linked from the site and not
        indexed by search engines.
      </p>

      {/* ---------------------------------------------------------- color */}
      <Block title="Colour" eyebrow="Tokens">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map((color) => (
            <li key={color.name} className="rounded-[3px] border border-line bg-surface p-4">
              <div className={`h-16 rounded-[2px] border border-line ${color.class}`} />
              <p className="mt-3 font-mono text-[13px]">{color.name}</p>
              <p className="font-mono text-[13px] text-muted">{color.hex}</p>
              <p className="mt-1 text-[15px] text-muted">{color.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[68ch] text-[15px] text-muted">
          White text on <code className="font-mono">--cross-blue</code> measures 7.4:1,
          which clears WCAG AA (4.5:1) and AAA (7:1) at body size. Maximum two full-bleed
          blue or navy sections per page. No third accent color, no gradients.
        </p>
      </Block>

      {/* ------------------------------------------------------ typography */}
      <Block title="Typography" eyebrow="Type scale">
        <div className="flex flex-col gap-8">
          <Specimen role="h1 / hero" spec="34px mobile, 64px desktop · 500 · 1.05">
            <p className="font-display text-[34px] leading-[1.05] font-medium text-cross-navy md:text-[64px]">
              Cross it off your list.
            </p>
          </Specimen>
          <Specimen role="h2 / section" spec="26px mobile, 40px desktop · 500 · 1.15">
            <p className="font-display text-[26px] leading-[1.15] font-medium text-cross-navy md:text-[40px]">
              Eleven services, one phone number
            </p>
          </Specimen>
          <Specimen role="h3 / card title" spec="19px mobile, 22px desktop · 500 · 1.25">
            <p className="text-[19px] leading-[1.25] font-medium md:text-[22px]">
              Landscaping &amp; Irrigation
            </p>
          </Specimen>
          <Specimen role="Body" spec="17px · 400 · 1.65 · max 68 characters">
            <p className="max-w-[68ch] text-[17px]">
              New England weather is not just hard on us, it is hard on our buildings
              too. Our crews power wash siding, roofs, decks, patios, walkways and courts
              using environmentally safe products.
            </p>
          </Specimen>
          <Specimen role="Small / caption" spec="15px · 400 · 1.5">
            <p className="text-[15px] text-muted">
              Serving Natick, Wellesley, Weston, Needham, Newton, Dover and Sherborn.
            </p>
          </Specimen>
          <Specimen role="Eyebrow" spec="12px mono · 500 · uppercase · 0.08em">
            <p className="type-eyebrow flex items-center gap-2 text-muted">
              <CheckGlyph className="text-cross-blue" />
              Grounds &amp; exterior
            </p>
          </Specimen>
        </div>
        <p className="mt-8 max-w-[68ch] text-[15px] text-muted">
          Newsreader for h1 and h2 only. IBM Plex Sans everywhere else. IBM Plex Mono for
          eyebrows, labels and tags — the only place uppercase and letter spacing are
          used. Body never drops below 16px, because iOS zooms inputs under 16px.
        </p>
      </Block>

      {/* ---------------------------------------------------------- spacing */}
      <Block title="Spacing" eyebrow="Scale">
        <ul className="flex flex-col gap-2">
          {SPACING.map((step) => (
            <li key={step} className="flex items-center gap-4">
              <span className="w-14 font-mono text-[13px] text-muted">{step}px</span>
              <span className="h-4 bg-cross-blue/25" style={{ width: step }} />
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[68ch] text-[15px] text-muted">
          Section padding 64 / 96 / 128. Content max width 1200px, gutters 20px on phones
          and 32px from tablet up. Radius is deliberately near-square: 3px on cards, 2px
          on buttons, inputs, tags and the checkbox mark. Nothing is pill-shaped.
        </p>
      </Block>

      {/* ---------------------------------------------------------- buttons */}
      <Block title="Buttons" eyebrow="Components">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Get a quote</Button>
          <Button variant="secondary">Browse services</Button>
          <Button variant="tertiary">See all eleven</Button>
          <Button disabled>Sending…</Button>
        </div>
        <div className="mt-6 rounded-[3px] bg-cross-navy p-6">
          <ButtonLink href="#" variant="on-navy">
            On navy
          </ButtonLink>
        </div>
        <p className="mt-6 max-w-[68ch] text-[15px] text-muted">
          48px tall on mobile, comfortably over the 44px tap-target minimum. Every label
          says what happens — &ldquo;Get a quote&rdquo;, never &ldquo;Submit&rdquo;.
        </p>
      </Block>

      {/* ------------------------------------------------------- checkboxes */}
      <Block title="The checkbox mark" eyebrow="Signature element">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <CheckMark />
            <span className="font-mono text-[12px] text-muted">rest</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckMark checked />
            <span className="font-mono text-[12px] text-muted">checked</span>
          </div>
        </div>
        <div className="mt-8 max-w-[52ch]">
          <CheckList
            items={[
              "Interior and exterior washing",
              "Storm window washing",
              "Screens and sills wiped down",
            ]}
          />
        </div>
      </Block>

      {/* -------------------------------------------------------- tags */}
      <Block title="Tags" eyebrow="Components">
        <div className="flex flex-wrap items-center gap-3">
          <BothAudiencesTag />
          <Tag tone="blue">Window Washing</Tag>
          <Tag>Grounds &amp; exterior</Tag>
          <span className="rounded-[2px] bg-cross-navy p-3">
            <Tag tone="light">On navy</Tag>
          </span>
        </div>
      </Block>

      {/* -------------------------------------------------------- cards */}
      <Block title="Cards" eyebrow="Components">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-[19px]">Static card</h3>
            <p className="mt-2 text-[15px] text-muted">
              White on paper, 1px hairline border, no shadow at rest.
            </p>
          </Card>
          <LinkCard href="/styleguide" className="p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[19px]">Link card</h3>
              <CheckMark />
            </div>
            <p className="mt-2 text-[15px] text-muted">
              Hover it: lifts 2px, soft shadow, and the checkbox fills blue.
            </p>
          </LinkCard>
        </div>
      </Block>

      {/* -------------------------------------------------------- media */}
      <Block title="Images" eyebrow="Components">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <MediaFrame
            src="/images/services/does-not-exist.jpg"
            alt="Example of a missing photo"
            ratio="3/2"
            sizes="(min-width: 768px) 45vw, 90vw"
            note="This is what an unsupplied photo looks like"
          />
          <MediaFrame
            src="/images/brand/cross-services-logo.webp"
            alt="The Cross Services Group logo"
            ratio="3/2"
            sizes="(min-width: 768px) 45vw, 90vw"
          />
        </div>
        <p className="mt-6 max-w-[68ch] text-[15px] text-muted">
          Every image slot checks whether the file exists in /public. If it does, the
          photo renders through next/image. If it does not, a labelled placeholder shows
          the path we are waiting on. No stock photography, and no broken images.
        </p>
      </Block>

      {/* -------------------------------------------------------- headers */}
      <Block title="Section header" eyebrow="Components">
        <SectionHeader
          eyebrow="How it works"
          title="Three steps, one phone call"
          lead="The point of Cross is that you stop managing vendors. Here is what that looks like in practice."
        />
      </Block>

      {/* -------------------------------------------------------- motion */}
      <Block title="Motion" eyebrow="Rules">
        <ul className="flex max-w-[68ch] flex-col gap-3 text-[16px] text-muted">
          <li>1. Fade and rise 12px on scroll into view, 400ms, staggered 60ms.</li>
          <li>2. Hover lift 2px on cards, 200ms ease out.</li>
          <li>3. The hero checklist strike-through, drawn as an SVG path.</li>
        </ul>
        <p className="mt-4 max-w-[68ch] text-[15px] text-muted">
          That is the complete list. No parallax, no counting numbers, no carousels, no
          autoplay. Everything is wrapped in a prefers-reduced-motion check.
        </p>
      </Block>
    </Container>
  );
}

function Block({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 border-t border-line pt-10 md:mt-24">
      <p className="type-eyebrow mb-3 text-cross-blue">{eyebrow}</p>
      <h2 className="mb-8 text-[26px] leading-[1.15] md:text-[34px]">{title}</h2>
      {children}
    </section>
  );
}

function Specimen({
  role,
  spec,
  children,
}: {
  role: string;
  spec: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-[180px_1fr] md:gap-8">
      <div>
        <p className="type-eyebrow text-muted">{role}</p>
        <p className="mt-2 font-mono text-[12px] text-muted">{spec}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
