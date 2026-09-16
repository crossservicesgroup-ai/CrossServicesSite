import { site } from "@/content/site";

const MESSAGE = "Now Booking Fall Irrigation Blowouts — Call Today!";

/* Seamless loop: the track holds two copies of the message back to back and
   scrolls exactly 50% of its own width, so the moment it resets, copy #2 is
   sitting exactly where copy #1 started. Any other duplicate count needs a
   matching change to the -50% in the marquee keyframes in globals.css. */
export function AnnouncementBanner() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-cross-navy py-3">
      <a
        href={site.phone.href}
        aria-label={`${MESSAGE} ${site.phone.display}`}
        className="marquee-track flex w-max items-center gap-16 whitespace-nowrap"
      >
        {[0, 1].map((copy) => (
          <span key={copy} aria-hidden={copy === 1} className="flex items-center gap-16">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-[15px] font-semibold tracking-wide text-white md:text-[17px]"
              >
                {MESSAGE}
              </span>
            ))}
          </span>
        ))}
      </a>
    </div>
  );
}
