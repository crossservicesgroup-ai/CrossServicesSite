import type { ReactNode } from "react";

/** Small pill label. Mono, uppercase — the one allowed all-caps style. */
export function Tag({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "blue" | "light";
  className?: string;
}) {
  const tones = {
    default: "border-line bg-paper text-muted",
    blue: "border-cross-blue/25 bg-cross-blue/8 text-cross-blue",
    light: "border-white/25 bg-white/10 text-white/85",
  } as const;

  return (
    <span
      className={`type-eyebrow inline-flex items-center rounded-[2px] border px-3 py-1.5 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Used on every service card and service page. */
export function BothAudiencesTag({ tone = "default" }: { tone?: "default" | "blue" | "light" }) {
  return <Tag tone={tone}>Residential &amp; commercial</Tag>;
}
