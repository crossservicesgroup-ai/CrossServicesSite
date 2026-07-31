import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHeader } from "@/components/ui/Section";
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
    </>
  );
}
