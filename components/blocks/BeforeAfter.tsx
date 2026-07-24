"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";

/**
 * The one slider on this site. Drag or use the arrow keys to wipe between a
 * before and after photo. It only renders when both photos actually exist —
 * see the server-side check in the service page.
 */
export function BeforeAfter({
  before,
  after,
  alt,
  caption,
}: {
  before: string;
  after: string;
  alt: string;
  caption?: string;
}) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const labelId = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <figure>
      <div
        ref={frameRef}
        className="relative aspect-[3/2] w-full touch-none overflow-hidden rounded-[3px] border border-line bg-line select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <Image
          src={after}
          alt={`${alt} — after`}
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover"
        />
        {/* Clipped rather than resized, so the "before" photo never squashes */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`${alt} — before`}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
        </div>

        <span className="type-eyebrow pointer-events-none absolute top-4 left-4 rounded-[2px] bg-cross-navy/80 px-3 py-1.5 text-white">
          Before
        </span>
        <span className="type-eyebrow pointer-events-none absolute top-4 right-4 rounded-[2px] bg-cross-navy/80 px-3 py-1.5 text-white">
          After
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
          style={{ left: `${position}%` }}
        />

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(position)}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-labelledby={labelId}
          aria-valuetext={`${Math.round(position)} percent before, ${
            100 - Math.round(position)
          } percent after`}
          className="absolute inset-x-0 bottom-0 h-12 w-full cursor-ew-resize opacity-0"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2px] border-2 border-white bg-cross-blue text-white shadow-[0_2px_12px_rgb(0_0_0_/_0.35)]"
          style={{ left: `${position}%` }}
        >
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 5 4 10l4 5M12 5l4 5-4 5" />
          </svg>
        </span>
      </div>

      <figcaption id={labelId} className="mt-3 text-[15px] text-muted">
        {caption ?? alt} Drag the handle, or use the arrow keys, to compare.
      </figcaption>
    </figure>
  );
}
