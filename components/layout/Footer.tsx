import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/ui/SocialIcons";
import { site } from "@/content/site";
import { servicesByGroup } from "@/content/services";
import { Container } from "@/components/ui/Section";
import { WordmarkLockup } from "@/components/layout/Logo";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "The Club", href: "/club" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Get a quote", href: "/quote" },
];

const SOCIALS = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedinIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
];

export function Footer() {
  const groups = servicesByGroup();

  return (
    <footer className="on-navy bg-cross-navy text-white/80">
      <Container className="py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.1fr_1.4fr_0.8fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <WordmarkLockup variant="light-on-dark" />
            <p className="mt-5 font-display text-[22px] leading-snug text-white">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-[34ch] text-[15px] text-white/70">
              One call handles your home or your building. Serving MetroWest since{" "}
              {site.foundedYear}.
            </p>
            <ul className="mt-6 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Cross Services Group on ${label}`}
                    className="inline-flex size-11 items-center justify-center rounded-[2px] border border-white/20 text-white transition-colors hover:bg-white/10"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services, grouped */}
          <nav aria-label="Services">
            <p className="type-eyebrow mb-5 text-white/60">Services</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              {groups.map((group) => (
                <div key={group.id}>
                  <p className="mb-2 text-[15px] font-medium text-white">{group.name}</p>
                  <ul className="flex flex-col gap-1">
                    {group.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-block py-0.5 text-[15px] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <p className="type-eyebrow mb-5 text-white/60">Company</p>
            <ul className="flex flex-col gap-1">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-9 items-center text-[16px] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.courtReserveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center text-[16px] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Club membership
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="type-eyebrow mb-5 text-white/60">Get in touch</p>
            <ul className="flex flex-col gap-3 text-[16px]">
              <li>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-9 items-center gap-2.5 text-white underline-offset-4 hover:underline"
                >
                  <Phone aria-hidden="true" className="size-4.5 shrink-0 text-white/60" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-9 items-center gap-2.5 break-all text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  <Mail aria-hidden="true" className="size-4.5 shrink-0 text-white/60" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-start gap-2.5 text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  <MapPin aria-hidden="true" className="mt-1 size-4.5 shrink-0 text-white/60" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-6 overflow-hidden rounded-[3px] border border-white/15">
              <iframe
                src={site.address.mapEmbedUrl}
                title="Map showing 19 Tech Circle, Natick, Massachusetts"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-36 w-full grayscale-[0.4]"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-8 text-[14px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.address.full} · {site.phone.display}
          </p>
        </div>
      </Container>
    </footer>
  );
}
