import Image from "next/image";
import Link from "next/link";

/* --------------------------------------------------------------------------
   [NEEDS INPUT] SVG logo files — a full lockup plus a compact mark for
   mobile. Until those arrive this uses the supplied webp lockup on light
   backgrounds, and a type-only lockup on the navy footer, where the webp's
   white background would show as a box.

   To swap in the real SVG: save it to /public/images/brand/ and change
   LOGO_SRC below.
   -------------------------------------------------------------------------- */

const LOGO_SRC = "/images/brand/cross-services-logo.webp";

export function Logo({
  variant = "dark-on-light",
  className = "",
}: {
  variant?: "dark-on-light" | "light-on-dark";
  className?: string;
}) {
  if (variant === "light-on-dark") {
    return <WordmarkLockup variant={variant} className={className} />;
  }

  return (
    <Image
      src={LOGO_SRC}
      alt="Cross Services Group"
      width={750}
      height={291}
      priority
      className={`h-14 w-auto md:h-16 ${className}`}
    />
  );
}

/** Type-only lockup, used on the navy footer. */
export function WordmarkLockup({
  variant = "dark-on-light",
  className = "",
}: {
  variant?: "dark-on-light" | "light-on-dark";
  className?: string;
}) {
  const light = variant === "light-on-dark";
  return (
    <span
      className={`font-display text-[26px] leading-none font-medium whitespace-nowrap ${
        light ? "text-white" : "text-cross-navy"
      } ${className}`}
    >
      Cross Services Group
    </span>
  );
}

/** The logo wrapped in a link home. */
export function LogoLink({
  variant = "dark-on-light",
  onNavigate,
}: {
  variant?: "dark-on-light" | "light-on-dark";
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="inline-flex items-center rounded-[2px]"
      aria-label="Cross Services Group — home"
    >
      <Logo variant={variant} />
    </Link>
  );
}
