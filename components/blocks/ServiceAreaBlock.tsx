import { site } from "@/content/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Town names as real text — this is what local search actually reads. */
export function ServiceAreaBlock() {
  return (
    <Section tone="paper" labelledBy="service-area-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <SectionHeader
            id="service-area-heading"
            eyebrow="Service area"
            title={`Where we work in ${site.serviceAreaLabel}`}
            lead="Based at 19 Tech Circle in Natick, and out on the road across the towns below every day. Not sure if you are in range? Call and ask."
          />
          <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
            {site.serviceAreaTowns.map((town) => (
              <li
                key={town}
                className="rounded-[2px] border border-line bg-surface px-4 py-2 text-[16px]"
              >
                {town}, MA
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-muted">
            Residential cleaning on Cape Cod is handled by our sister company, The Furies.
          </p>
        </Reveal>

        <Reveal delayIndex={1}>
          <div className="overflow-hidden rounded-[3px] border border-line bg-surface">
            <iframe
              src={site.address.mapEmbedUrl}
              title="Map of the Cross Services Group service area around Natick, Massachusetts"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[280px] w-full md:h-[380px]"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
