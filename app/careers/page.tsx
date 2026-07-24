import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/Checkbox";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Work at Cross Services Group in Natick, MA. Crews, technicians and office roles across cleaning, grounds, exteriors, carpentry, technology and detailing.",
  path: "/careers",
});

const WHY = [
  "A family-owned company, in business since 1989",
  "Year-round work rather than one busy season",
  "Room to move between divisions as you learn them",
  "Local routes across MetroWest — you are home at night",
  "Work you can point at when it is finished",
];

/* [NEEDS INPUT] Benefits. The list below is deliberately empty rather than
   invented — send over what Cross actually offers (health, PTO, vehicle,
   training, retirement) and it goes straight in. */
const BENEFITS: string[] = [];

/* [NEEDS INPUT] Open roles. Add objects here as positions open up and they
   render automatically. */
const OPEN_ROLES: { title: string; division: string; type: string }[] = [];

export default function CareersPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-12 md:py-20">
          <p className="type-eyebrow mb-5 text-cross-blue">Careers</p>
          <h1 className="max-w-[20ch] text-[34px] leading-[1.05] md:text-[52px]">
            Come and do the job properly
          </h1>
          <p className="mt-5 max-w-[68ch] text-[18px] text-muted">
            Cross has been in Natick since 1989. We run our own crews across cleaning,
            grounds, exteriors, carpentry, technology and detailing, which means there is
            usually somewhere to start and somewhere to go next.
          </p>
          <div className="mt-8">
            <ButtonLink href={`mailto:${site.email}?subject=Careers%20inquiry`} size="lg">
              <Mail aria-hidden="true" className="size-4.5" />
              Email us about a job
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section tone="surface" labelledBy="why-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader id="why-heading" eyebrow="Why work here" title="What the job is like" />
            <div className="mt-8">
              <CheckList items={WHY} />
            </div>
          </Reveal>

          <Reveal delayIndex={1}>
            <div className="rounded-[3px] border border-line bg-paper p-6 md:p-8">
              <h2 className="text-[22px]">Benefits</h2>
              {BENEFITS.length > 0 ? (
                <div className="mt-5">
                  <CheckList items={BENEFITS} />
                </div>
              ) : (
                <p className="mt-4 rounded-[2px] border border-dashed border-line bg-surface p-4 text-[15px] text-muted">
                  <span className="type-eyebrow block text-muted">To confirm</span>
                  <span className="mt-2 block">
                    The benefits list has not been supplied yet. Rather than guess at
                    health cover, time off or training, this space stays empty until
                    Cross confirms what is actually offered.
                  </span>
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" labelledBy="roles-heading">
        <SectionHeader id="roles-heading" eyebrow="Open roles" title="What we are hiring for" />

        {OPEN_ROLES.length > 0 ? (
          <ul className="mt-8 flex flex-col gap-3">
            {OPEN_ROLES.map((role) => (
              <li
                key={role.title}
                className="flex flex-col gap-3 rounded-[3px] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-[19px]">{role.title}</h3>
                  <p className="mt-1 text-[15px] text-muted">
                    {role.division} · {role.type}
                  </p>
                </div>
                <ButtonLink
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                  variant="secondary"
                >
                  Apply by email
                </ButtonLink>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-[3px] border border-line bg-surface p-6 md:p-8">
            <p className="text-[17px]">
              There is no current vacancy list on this page yet. We take applications
              year round, so send a note with what you have done and which side of the
              business interests you.
            </p>
            <p className="mt-4 rounded-[2px] border border-dashed border-line bg-paper p-4 text-[15px] text-muted">
              <span className="type-eyebrow block text-muted">To confirm</span>
              <span className="mt-2 block">
                Send me the open positions and they will list here with their own apply
                links. Add them to OPEN_ROLES in app/careers/page.tsx.
              </span>
            </p>
          </div>
        )}
      </Section>

      <section className="on-navy bg-cross-blue text-white">
        <Container className="py-16 md:py-20">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[46ch]">
              <h2 className="text-[26px] leading-[1.15] text-white md:text-[34px]">
                Tell us what you are good at
              </h2>
              <p className="mt-3 text-[17px] text-white/85">
                Email a note and a résumé if you have one. If you would rather talk,
                call the office and ask for operations.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink
                href={`mailto:${site.email}?subject=Careers%20inquiry`}
                variant="on-navy"
                size="lg"
              >
                {site.email}
              </ButtonLink>
              <ButtonLink
                href={site.phone.href}
                variant="secondary"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10"
              >
                <Phone aria-hidden="true" className="size-4.5" />
                {site.phone.display}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
