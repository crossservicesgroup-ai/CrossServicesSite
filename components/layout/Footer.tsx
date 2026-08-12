import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/ui/SocialIcons";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { WordmarkLockup } from "@/components/layout/Logo";

const SOCIALS = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedinIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="on-navy bg-cross-navy text-white/80">
      <Container className="py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {/* Brand */}
          <div>
            <WordmarkLockup variant="light-on-dark" />
            <p className="mt-4 max-w-[34ch] text-[15px] text-white/70">
              One call handles your home or your building. Serving MetroWest since{" "}
              {site.foundedYear}.
            </p>
            <ul className="mt-5 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Cross Services Group on ${label}`}
                    className="inline-flex size-10 items-center justify-center rounded-[2px] border border-white/20 text-white transition-colors hover:bg-white/10"
                  >
                    <Icon className="size-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-display mb-3 text-[17px] font-semibold text-white">
              Get in touch
            </p>
            <ul className="flex flex-col gap-2 text-[15px]">
              <li>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-8 items-center gap-2.5 text-white underline-offset-4 hover:underline"
                >
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-white/60" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-8 items-center gap-2.5 break-all text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-white/60" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-8 items-start gap-2.5 text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-white/60" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-5 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            {/* legalName already ends in "Inc." — no extra full stop, or it
                renders as "Inc..". */}
            © {new Date().getFullYear()} {site.legalName} All rights reserved.
          </p>
          <p>
            {site.address.full} · {site.phone.display}
          </p>
        </div>
      </Container>
    </footer>
  );
}
