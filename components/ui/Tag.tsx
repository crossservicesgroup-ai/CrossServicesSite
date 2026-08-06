import type { ReactNode } from "react";

/** Small boxed label. Mono, uppercase — the one allowed all-caps style. */
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

/** Used on every service card and service page. Plain caption text, not a boxed chip. */
export function BothAudiencesTag({
  tone = "default",
  label = "Residential & Commercial",
}: {
  tone?: "default" | "blue" | "light";
  /** Override for services that are not offered to both audiences. */
  label?: string;
}) {
  const tones = {
    default: "text-muted",
    blue: "text-cross-blue",
    light: "text-white/70",
  } as const;

  return <p className={`text-[14px] italic ${tones[tone]}`}>{label}</p>;
}
