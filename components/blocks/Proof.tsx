import { site } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/* --------------------------------------------------------------------------
   Proof strip. Four facts, two by two on mobile, hairline dividers, no boxes.

   Every claim here comes from the brief or the current site. Nothing is
   invented — note there is no customer count and no star rating, because
   we do not have verified numbers for either yet.
   [NEEDS INPUT] Google rating and review count, if you want them here.
   -------------------------------------------------------------------------- */

const yearsInBusiness = new Date().getFullYear() - site.foundedYear;

const ITEMS: { stat: string; label: string }[] = [
  { stat: `${yearsInBusiness}+`, label: "Years serving MetroWest" },
  { stat: "Family", label: "Owned and operated since 1989" },
  { stat: "11", label: "Services under one phone number" },
  { stat: "Free", label: "Redo if you are not satisfied" },
];

export function Proof() {
  return (
    <section aria-label="Why people use Cross" className="border-b border-line bg-paper">
      <Container className="py-12 md:py-16">
        <ul className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal
              as="li"
              key={item.label}
              delayIndex={i}
              className={[
                "pr-4",
                // hairline dividers: between the two columns on mobile,
                // between all four from lg up
                i % 2 === 1 ? "border-l border-line pl-5" : "",
                i !== 0 ? "lg:border-l lg:border-line lg:pl-6" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="font-display text-[30px] leading-none text-cross-navy md:text-[38px]">
                {item.stat}
              </p>
              <p className="mt-2 max-w-[22ch] text-[15px] text-muted">{item.label}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
