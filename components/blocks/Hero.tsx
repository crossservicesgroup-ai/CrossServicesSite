import Image from "next/image";
import { site } from "@/content/site";
import { imageExists } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HeroChecklist } from "@/components/blocks/HeroChecklist";

const HERO_IMAGE = "/images/hero/crew.jpg";

/* [NEEDS INPUT] A real photo of a Cross crew or truck for the hero.
   Save it as /public/images/hero/crew.jpg and it takes over automatically.
   Until then the hero renders on navy, which still looks deliberate. */

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
    <section className="relative isolate overflow-hidden bg-cross-navy">
      {hasPhoto ? (
        <>
          <Image
            src={HERO_IMAGE}
            alt="A Cross Services Group crew at work on a property in MetroWest Boston"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Darkened so the headline keeps its contrast on any photo */}
          <div aria-hidden="true" className="absolute inset-0 bg-cross-navy/72" />
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
        <div className="max-w-[54ch]">
          <p className="type-eyebrow mb-6 text-white/70">
            MetroWest Boston · Since {site.foundedYear}
          </p>

          <h1 className="text-[34px] leading-[1.05] text-white md:text-[52px] lg:text-[64px]">
            {site.tagline}
          </h1>

          <p className="mt-5 max-w-[46ch] text-[18px] text-white/85 md:text-[20px]">
            One call handles your home or your building. Cleaning, grounds, repairs,
            property management and detailing, from one family-owned company.
          </p>

          {/* Both buttons carry the same outlined treatment. A coloured
              primary beside a plain secondary was reading as generic. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quote" size="lg" variant="outline-on-dark">
              Get a quote
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline-on-dark">
              Browse services
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 max-w-[30ch] rounded-[3px] border border-white/15 bg-white/6 p-6 backdrop-blur-[2px] md:mt-16 md:max-w-[34ch]">
          <p className="type-eyebrow mb-4 text-white/60">Today&apos;s list</p>
          <HeroChecklist items={CHECKLIST} />
        </div>
      </Container>
    </section>
  );
}

/* Photo credit note for whoever maintains this: if the hero photo is a wide
   landscape shot, crop it to roughly 16:9 before saving. Anything taller
   gets cropped by the browser and you lose the truck. */
