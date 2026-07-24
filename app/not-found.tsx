import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceGroupLinks } from "@/components/blocks/ServiceGrid";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-16 md:py-28">
      <div className="max-w-[68ch]">
        <p className="type-eyebrow mb-5 text-cross-blue">404</p>
        <h1 className="text-[34px] leading-[1.05] md:text-[48px]">
          That page is not here any more
        </h1>
        <p className="mt-5 text-[18px] text-muted">
          We rebuilt this site, so a few old addresses have moved. Everything we do is
          in one of these five groups.
        </p>

        <div className="mt-10">
          <ServiceGroupLinks />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/services" size="lg">
            Browse all services
          </ButtonLink>
          <ButtonLink href={site.phone.href} variant="secondary" size="lg">
            <Phone aria-hidden="true" className="size-4.5" />
            {site.phone.display}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
