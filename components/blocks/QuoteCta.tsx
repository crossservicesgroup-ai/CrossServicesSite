import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing call to action. `service` pre-selects that service in the quote
 * form, which is what makes the form feel like it already knows why you
 * are there.
 */
export function QuoteCta({
  title = "Ready to cross it off your list?",
  body = "Tick everything you need in one go. We will come back with one quote covering all of it.",
  service,
}: {
  title?: string;
  body?: string;
  service?: string;
}) {
  const href = service ? `/quote?service=${service}` : "/quote";

  return (
    <section
      aria-labelledby="quote-cta-heading"
      className="on-navy bg-cross-blue text-white"
    >
      <Container className="py-16 md:py-20">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[46ch]">
            <h2
              id="quote-cta-heading"
              className="text-[26px] leading-[1.15] text-white md:text-[34px]"
            >
              {title}
            </h2>
            <p className="mt-3 text-[17px] text-white/85">{body}</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={href} variant="on-navy" size="lg">
              Get a quote
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
        </Reveal>
      </Container>
    </section>
  );
}
