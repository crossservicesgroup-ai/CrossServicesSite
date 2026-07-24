import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/* Numbered here because it genuinely is a sequence. */
const STEPS = [
  {
    n: "01",
    title: "Tell us what you need",
    body: "Tick everything on the list — one job or nine. There is no dropdown forcing you to pick just one.",
  },
  {
    n: "02",
    title: "We schedule the right crew",
    body: "Our own teams handle cleaning, grounds, exteriors, carpentry, tech and detailing, so nothing gets subcontracted out and forgotten.",
  },
  {
    n: "03",
    title: "You get one point of contact",
    body: "One person who knows your property, one schedule, one invoice. And the Cross Guarantee behind all of it.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="surface" labelledBy="how-it-works-heading">
      <SectionHeader
        id="how-it-works-heading"
        eyebrow="How it works"
        title="Three steps, one phone call"
        lead="The point of Cross is that you stop managing vendors. Here is what that looks like in practice."
      />
      <ol className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-3 md:gap-10">
        {STEPS.map((step, i) => (
          <Reveal as="li" key={step.n} delayIndex={i}>
            <div className="border-t-2 border-cross-blue pt-5">
              <p className="type-eyebrow text-cross-blue">Step {step.n}</p>
              <h3 className="mt-3 text-[19px] leading-[1.25] md:text-[22px]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[16px] text-muted">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
