import { site } from "@/content/site";
import { servicesByGroup, type Service } from "@/content/services";
import { LinkCard } from "@/components/ui/Card";
import { CheckMark } from "@/components/ui/Checkbox";
import { MediaFrame } from "@/components/ui/Media";
import { BothAudiencesTag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

/** One service card. Photo, name, one-line tagline, tag, checkbox mark. */
export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <Reveal as="li" delayIndex={index} className="h-full">
      <LinkCard
        href={service.externalUrl ?? `/services/${service.slug}`}
        className="flex h-full flex-col"
        ariaLabel={`${service.name} — ${service.tagline}`}
      >
        <MediaFrame
          src={service.heroImage}
          alt={`${service.name} by Cross Services Group`}
          ratio="3/2"
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
          rounded="rounded-none"
          note={`${service.name} job photo`}
        />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[19px] leading-[1.25] md:text-[22px]">{service.name}</h3>
            <CheckMark size={24} className="mt-0.5" />
          </div>
          <p className="mt-2 text-[15px] text-muted">{service.tagline}</p>
          {/* mt-auto pins the tag to the bottom so cards in a row line up */}
          <div className="mt-auto pt-5">
            <BothAudiencesTag label={service.audienceLabel} />
          </div>
        </div>
      </LinkCard>
    </Reveal>
  );
}

/** All eleven services, grouped into the five buckets. */
export function ServiceGrid({
  headingLevel = "h3",
}: {
  /** Use h3 when the grid sits under a section h2. */
  headingLevel?: "h2" | "h3";
}) {
  const groups = servicesByGroup();
  const GroupHeading = headingLevel;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {groups.map((group) => (
        <div key={group.id} id={group.id} className="scroll-mt-28">
          <div className="mb-6 border-b border-line pb-4 md:mb-8">
            <GroupHeading className="text-[22px] font-medium text-cross-blue md:text-[26px]">
              {group.name}
            </GroupHeading>
          </div>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {group.services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Two or three related services, shown at the bottom of a service page. */
export function RelatedServices({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal as="li" key={service.slug} delayIndex={i} className="h-full">
          <LinkCard href={`/services/${service.slug}`} className="flex h-full flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[19px] leading-[1.25]">{service.name}</h3>
              <CheckMark size={22} className="mt-0.5" />
            </div>
            <p className="mt-2 text-[15px] text-muted">{service.tagline}</p>
            <p className="mt-4 text-[15px] font-medium text-cross-blue">
              Add it to the same visit →
            </p>
          </LinkCard>
        </Reveal>
      ))}
    </ul>
  );
}

/** Used by the 404 page — the five groups as plain links. */
export function ServiceGroupLinks() {
  const groups = servicesByGroup();
  return (
    <ul className="flex flex-col gap-3">
      {groups.map((group) => (
        <li key={group.id}>
          <a
            href={`/services#${group.id}`}
            className="text-[17px] text-cross-blue underline-offset-4 hover:underline"
          >
            {group.name}
          </a>
          <span className="ml-2 text-[15px] text-muted">
            {group.services.map((s) => s.name).join(", ")}
          </span>
        </li>
      ))}
      <li className="mt-2 text-[15px] text-muted">
        Or just call us on{" "}
        <a href={site.phone.href} className="text-cross-blue underline underline-offset-4">
          {site.phone.display}
        </a>
        .
      </li>
    </ul>
  );
}
