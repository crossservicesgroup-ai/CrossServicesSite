import Image from "next/image";
import { site } from "@/content/site";
import { imageExists } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HeroChecklist } from "@/components/blocks/HeroChecklist";

const HERO_IMAGE = "/images/hero/office.webp";

/* The 19 Cross office on Route 9. It sits far back in the mix — a texture
   behind the navy rather than a picture you look at, so the headline and the
   checklist keep every bit of their contrast. Swap the file at this path and
   the treatment carries over. */

const CHECKLIST = [
  "Windows washed",
  "Gutters cleared",
  "Lawn looked after",
  "House cleaned",
  "That list of small jobs",
];

export function Hero() {
  const hasPhoto = imageExists(HERO_IMAGE);

  return (
    /* Full screen minus the header, which is sticky and so occupies layout
       space above this: h-20 + 1px border on phones, h-24 + 1px from md up.
       svh rather than vh so mobile browser chrome cannot push "Our Services"
       to a sliver above the fold. Content is centred in whatever is left. */
    <section className="relative isolate flex min-h-[calc(100svh-81px)] items-center overflow-hidden bg-cross-navy md:min-h-[calc(100svh-97px)]">
      {hasPhoto ? (
        <>
          {/* Full bleed: the photo covers the section edge to edge, with no
              mask and no shift. It is anchored to the section, not the page,
              so it scrolls away with the hero. */}
          <Image
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_56%] opacity-[0.12] saturate-[0.6]"
          />

          {/* Two scrims. The first is an even veil rather than the old
              left-weighted gradient — with the photo running the full width,
              a one-sided ramp would reintroduce exactly the fade that is not
              wanted. It costs a little of the photo everywhere in exchange for
              the headline holding contrast anywhere it sits. The second
              darkens the bottom edge, so the hero hands off to the section
              below on flat navy rather than mid-shrubbery. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cross-navy/35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-cross-navy via-transparent via-35% to-transparent"
          />
        </>
      ) : (
        // No hero photo yet: a faint job-ticket grid keeps the navy from
        // reading as an empty slab. It disappears the moment a photo lands.
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 88px), repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 88px)",
          }}
        />
      )}

      <Container className="relative py-16 md:py-24 lg:py-32">
        {/* Two columns from xl up, stacked below it. The split waits for xl on
            purpose: the tagline is whitespace-nowrap at 64px, so the copy column
            cannot be squeezed under about 550px without the section's
            overflow-hidden clipping the headline. At xl the container leaves
            roughly 710px beside the card, which clears it. */}
        <div className="flex flex-col gap-12 xl:flex-row xl:items-center xl:justify-between xl:gap-16">
          <div className="flex max-w-[56ch] flex-col items-start text-left">
            <p className="type-eyebrow mb-6 text-white/70">
              MetroWest Boston · Since {site.foundedYear}
            </p>

            {/* The tagline holds one line at every width. Rather than let it wrap
                on narrow screens, the size tracks the viewport and only stops at
                64px — the clamp is set so the longest line still clears the
                container padding on a small phone. */}
            <h1
              className="leading-[1.05] whitespace-nowrap text-white"
              style={{ fontSize: "clamp(26px, 7vw, 64px)" }}
            >
              {site.tagline}
            </h1>

            <p className="mt-5 max-w-[46ch] text-[18px] text-pretty text-white/85 md:text-[20px]">
              One call handles your residential or commercial property. Cleaning, grounds,
              repairs, property management and detailing, from one family-owned company.
            </p>

            {/* Both buttons carry the same outlined treatment. A coloured
                primary beside a plain secondary was reading as generic. */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/quote" size="lg" variant="outline-on-dark">
                Get a quote
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="outline-on-dark">
                Browse services
              </ButtonLink>
            </div>
          </div>

          {/* shrink-0 so the flex row takes its space out of the copy column
              rather than compressing the card. */}
          <div className="w-full max-w-[30ch] shrink-0 rounded-[3px] border border-white/15 bg-white/6 p-6 text-left backdrop-blur-[2px] md:max-w-[34ch]">
            <p className="type-eyebrow mb-4 text-white/60">Today&apos;s list</p>
            <HeroChecklist items={CHECKLIST} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Photo note for whoever maintains this: the hero crops hard on short viewports,
   so the object-position above is tuned to hold the building and the sign in
   frame. A replacement photo will almost certainly want that value retuned. */
