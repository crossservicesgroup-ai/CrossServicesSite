"use client";

import { useEffect, useState } from "react";

/* --------------------------------------------------------------------------
   THE SIGNATURE ELEMENT

   A real to-do list that strikes itself off, one line at a time, with a
   hand-drawn feeling SVG line. This is the one place the site is bold.

   Under prefers-reduced-motion every item renders already struck off, with
   no animation at all — the message survives, the movement does not.
   -------------------------------------------------------------------------- */

const STEP_MS = 620;
const START_MS = 500;

export function HeroChecklist({
  items,
  tone = "light",
}: {
  items: string[];
  /** "light" = white text on a dark photo. "dark" = ink on paper. */
  tone?: "light" | "dark";
}) {
  const [struck, setStruck] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setStruck(items.length);
      return;
    }

    const timers = items.map((_, i) =>
      setTimeout(() => setStruck(i + 1), START_MS + i * STEP_MS),
    );
    return () => timers.forEach(clearTimeout);
  }, [items]);

  const light = tone === "light";

  return (
    <ul
      className={`flex flex-col gap-1.5 ${light ? "text-white" : "text-ink"}`}
      aria-label="A few of the things we take off your list"
    >
      {items.map((item, i) => {
        const isStruck = i < struck;
        return (
          <li key={item} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={`inline-flex size-6 shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-300 ${
                isStruck
                  ? "border-cross-blue bg-cross-blue text-white"
                  : light
                    ? "border-white/45 bg-white/10 text-transparent"
                    : "border-line bg-surface text-transparent"
              }`}
            >
              <svg
                viewBox="0 0 14 14"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 7.5 5.5 11 12 3.5" />
              </svg>
            </span>

            <span className="relative inline-block">
              <span
                className={`text-[18px] transition-opacity duration-300 md:text-[20px] ${
                  isStruck ? (light ? "opacity-65" : "opacity-55") : "opacity-100"
                }`}
              >
                {item}
              </span>
              <StrikeLine active={isStruck} light={light} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** The hand-drawn line. Deliberately not straight. */
function StrikeLine({ active, light }: { active: boolean; light: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      className="pointer-events-none absolute top-1/2 left-[-2%] h-[10px] w-[104%] -translate-y-1/2 overflow-visible"
    >
      <path
        d="M2 7.4 C 48 4.2, 96 9.1, 146 5.8 S 232 8.6, 298 5.2"
        fill="none"
        stroke={light ? "#ffffff" : "#1255a2"}
        strokeWidth="2.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="strike-path"
        data-struck={active ? "true" : "false"}
        style={{ "--strike-length": "310" } as React.CSSProperties}
      />
    </svg>
  );
}
