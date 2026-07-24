"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Fade + rise 12px when the element scrolls into view. 400ms, staggered by
 * 60ms within a group. Under prefers-reduced-motion the CSS shows content
 * immediately, and the observer never has anything to do.
 */
export function Reveal({
  children,
  delayIndex = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  /** Position within a group — multiplied by 60ms for the stagger. */
  delayIndex?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-visible={visible ? "true" : "false"}
      style={{ "--reveal-delay": `${Math.min(delayIndex, 8) * 60}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
