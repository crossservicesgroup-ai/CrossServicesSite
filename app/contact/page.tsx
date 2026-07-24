import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ContactForm } from "@/components/blocks/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Call ${site.phone.display}, email ${site.email}, or visit us at ${site.address.full}. Cross Services Group serves MetroWest Boston.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-12 md:py-20">
          <p className="type-eyebrow mb-5 text-cross-blue">Contact</p>
          <h1 className="max-w-[18ch] text-[34px] leading-[1.05] md:text-[52px]">
            Talk to a person in Natick
          </h1>
          <p className="mt-5 max-w-[68ch] text-[18px] text-muted">
            Our office is at 19 Tech Circle and the phone is answered by someone who can
            actually help.{" "}
            <Link
              href="/quote"
              className="font-medium text-cross-blue underline underline-offset-4"
            >
              Looking for a quote? Use the quote form instead
            </Link>{" "}
            — it takes about a minute and lets you tick everything at once.
          </p>
        </Container>
      </section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* --------------------------------------------------- details */}
          <div>
            <h2 className="text-[26px] leading-[1.15] md:text-[34px]">Get in touch</h2>

            <ul className="mt-8 flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-cross-blue" />
                <div>
                  <p className="type-eyebrow text-muted">Phone</p>
                  <a
                    href={site.phone.href}
                    className="mt-1 inline-block text-[19px] font-medium text-cross-blue underline-offset-4 hover:underline"
                  >
                    {site.phone.display}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-cross-blue" />
                <div className="min-w-0">
                  <p className="type-eyebrow text-muted">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 inline-block break-all text-[17px] text-cross-blue underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-cross-blue" />
                <div>
                  <p className="type-eyebrow text-muted">Address</p>
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[17px] underline-offset-4 hover:text-cross-blue hover:underline"
                  >
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-cross-blue" />
                <div>
                  <p className="type-eyebrow text-muted">Hours</p>
                  <dl className="mt-2 flex flex-col gap-1 text-[17px]">
                    {site.hours.map((h) => (
                      <div key={h.days} className="flex gap-3">
                        <dt className="w-[10.5rem] shrink-0 text-muted">{h.days}</dt>
                        <dd>{h.display}</dd>
                      </div>
                    ))}
                  </dl>
                  {site.hoursArePlaceholder ? (
                    <p className="mt-3 rounded-[2px] border border-dashed border-line bg-surface p-3 text-[14px] text-muted">
                      <span className="type-eyebrow block text-muted">
                        Draft — to confirm
                      </span>
                      <span className="mt-1.5 block">
                        These are placeholder hours. Send the real ones and they update
                        here, on the club page and in the Google listing data.
                      </span>
                    </p>
                  ) : null}
                </div>
              </li>
            </ul>

            <div className="mt-8 overflow-hidden rounded-[3px] border border-line">
              <iframe
                src={site.address.mapEmbedUrl}
                title="Map showing Cross Services Group at 19 Tech Circle, Natick"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[280px] w-full"
              />
            </div>

            <div className="mt-8 rounded-[3px] border border-line bg-surface p-6">
              <p className="type-eyebrow mb-3 text-cross-blue">Cross Courts members</p>
              <p className="text-[16px] text-muted">
                Court bookings, memberships and program sign-ups are handled in the
                club portal.
              </p>
              <div className="mt-4">
                <ButtonLink href={site.courtReserveUrl} external variant="secondary">
                  Open the club portal
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------ form */}
          <div>
            <SectionHeader
              eyebrow="General inquiry"
              title="Send us a message"
              lead="For anything that is not a quote request — an existing job, an invoice, a question about whether we cover your town."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
