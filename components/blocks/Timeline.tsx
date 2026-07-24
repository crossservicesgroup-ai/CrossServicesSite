import { timeline } from "@/content/timeline";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The acquisition story. Vertical on mobile, horizontal on desktop.
 *
 * Entries where we do not yet know the year render with a visible "year to
 * confirm" marker rather than a guess.
 */
export function Timeline() {
  return (
    <>
      {/* ------------------------------------------------ mobile: vertical */}
      <ol className="relative flex flex-col gap-8 border-l border-line pl-6 lg:hidden">
        {timeline.map((entry, i) => (
          <Reveal as="li" key={entry.title} delayIndex={i} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[31px] size-2.5 rounded-[2px] border-2 border-cross-blue bg-paper"
            />
            <p className="type-eyebrow text-cross-blue">
              {entry.yearConfirmed && entry.year ? entry.year : "Year to confirm"}
            </p>
            <h3 className="mt-2 text-[19px] leading-tight">{entry.title}</h3>
            <p className="mt-2 max-w-[52ch] text-[16px] text-muted">{entry.body}</p>
          </Reveal>
        ))}
      </ol>

      {/* ----------------------------------------------- desktop: horizontal */}
      <div className="hidden lg:block">
        <ol className="hide-scrollbar flex gap-8 overflow-x-auto pb-2">
          {timeline.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.title}
              delayIndex={i}
              className="w-[260px] shrink-0 border-t-2 border-line pt-5 first:border-t-cross-blue"
            >
              <p className="type-eyebrow text-cross-blue">
                {entry.yearConfirmed && entry.year ? entry.year : "Year to confirm"}
              </p>
              <h3 className="mt-3 text-[19px] leading-tight">{entry.title}</h3>
              <p className="mt-2 text-[16px] text-muted">{entry.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </>
  );
}
