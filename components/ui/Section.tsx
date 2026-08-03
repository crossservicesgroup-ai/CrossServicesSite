import type { ElementType, ReactNode } from "react";

/** Content max width 1200px, 20px gutters on phones, 32px from tablet up. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

type Tone = "paper" | "surface" | "navy" | "blue";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  navy: "bg-cross-navy text-white on-navy",
  blue: "bg-cross-blue text-white on-navy",
};

/** Section padding: 64px mobile, 96px tablet, 128px desktop. */
export function Section({
  children,
  tone = "paper",
  className = "",
  as: Tag = "section",
  id,
  bleed = false,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  as?: ElementType;
  id?: string;
  /** True when the block wants to manage its own horizontal padding. */
  bleed?: boolean;
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`${tones[tone]} py-16 md:py-24 lg:py-32 ${className}`}
    >
      {bleed ? children : <Container>{children}</Container>}
    </Tag>
  );
}

/** Standard heading block: mono eyebrow, serif h2, optional lead paragraph. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  align = "left",
  tone = "dark",
  eyebrowClassName = "",
  titleClassName = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** Extra classes appended to the eyebrow, e.g. to bump its size for one instance. */
  eyebrowClassName?: string;
  /** Extra classes appended to the h2, e.g. to shrink it for one instance. */
  titleClassName?: string;
}) {
  const isLight = tone === "light";
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow ? (
        <p
          className={`type-eyebrow mb-4 flex items-center gap-2 ${
            align === "center" ? "justify-center" : ""
          } ${isLight ? "text-white/70" : "text-muted"} ${eyebrowClassName}`}
        >
          <CheckGlyph className={isLight ? "text-white/70" : "text-cross-blue"} />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`text-[26px] leading-[1.15] md:text-[34px] lg:text-[40px] ${
          isLight ? "text-white" : ""
        } ${titleClassName}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-4 max-w-[68ch] text-[17px] ${
            align === "center" ? "mx-auto" : ""
          } ${isLight ? "text-white/80" : "text-muted"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** The small check glyph that sits in front of every eyebrow, like a job ticket. */
export function CheckGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d="M1.5 6.5 4.5 9.5 10.5 2.5" />
    </svg>
  );
}
