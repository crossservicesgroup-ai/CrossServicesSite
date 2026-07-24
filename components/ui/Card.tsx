import Link from "next/link";
import type { ReactNode } from "react";

/** Plain white card on the warm paper background. No shadow at rest. */
export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={`rounded-[3px] border border-line bg-surface ${className}`}
    >
      {children}
    </Tag>
  );
}

/** A card that is entirely clickable, with the lift-on-hover treatment. */
export function LinkCard({
  href,
  children,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`card-lift group block overflow-hidden rounded-[3px] border border-line bg-surface hover:border-cross-blue/30 ${className}`}
    >
      {children}
    </Link>
  );
}
