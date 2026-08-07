import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { CheckGlyph } from "@/components/ui/Section";

/**
 * Sticky quote card on the right of a service page on desktop. Hidden on
 * mobile, where the sticky bottom bar already does this job.
 */
export function QuoteSidebar({ serviceSlug, serviceName }: { serviceSlug: string; serviceName: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 rounded-[3px] border border-line bg-surface p-6">
        <p className="font-display mb-4 flex items-center gap-2 text-[19px] font-semibold text-cross-blue">
          <CheckGlyph />
          Get a quote
        </p>
        <p className="text-[17px]">
          Start with {serviceName.toLowerCase()} — we will pre-select it for you, and you
          can add anything else while you are there.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <ButtonLink href={`/quote?service=${serviceSlug}`} className="w-full">
            Get a quote
          </ButtonLink>
          <ButtonLink href={site.phone.href} variant="secondary" className="w-full">
            <Phone aria-hidden="true" className="size-4.5" />
            {site.phone.display}
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}
