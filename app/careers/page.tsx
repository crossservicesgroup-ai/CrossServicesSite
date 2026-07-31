import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Work at Cross Services Group in Natick, MA. Crews, technicians and office roles across cleaning, grounds, exteriors, carpentry, technology and detailing.",
  path: "/careers",
});

/* [NEEDS INPUT] Open roles. Add objects here as positions open up and they
   render automatically. */
const OPEN_ROLES: { title: string; division: string; type: string }[] = [];

export default function CareersPage() {
  return (
    <>
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
          <div className="mt-8 flex flex-col gap-4 rounded-[3px] border border-line bg-surface p-6 text-[17px] md:p-8">
            <p>
              We don&rsquo;t have any current openings, but we&rsquo;re always
              interested in connecting with great people.
            </p>
            <p>
              If you&rsquo;re interested in joining Cross Services Group, send us a
              brief note about your background, experience, and which area
              you&rsquo;re most interested in. We&rsquo;ll keep your information on
              file and reach out if a position becomes available that matches your
              skills.
            </p>
            <p>We appreciate your interest and look forward to hearing from you!</p>
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
