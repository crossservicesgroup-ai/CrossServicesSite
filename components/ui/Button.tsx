import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "on-navy" | "outline-on-dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] font-medium " +
  "transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none " +
  "text-[17px] leading-none";

const sizes: Record<Size, string> = {
  // 48px tall on mobile — comfortably over the 44px tap-target minimum
  md: "min-h-12 px-6 py-3",
  lg: "min-h-14 px-8 py-4 text-[18px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-cross-blue text-white hover:bg-cross-blue-hover",
  secondary:
    "border border-cross-blue text-cross-blue bg-transparent hover:bg-cross-blue/8",
  tertiary:
    "text-cross-blue px-0 min-h-11 underline-offset-4 hover:underline decoration-1",
  "on-navy": "bg-white text-cross-navy hover:bg-white/90",
  /* Transparent fill, hairline outline. Used in pairs on dark hero sections
     so two adjacent buttons read as one considered set rather than as a
     loud primary sitting next to a quiet secondary. */
  "outline-on-dark":
    "border border-white/45 text-white bg-transparent hover:border-white/80 hover:bg-white/8",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, sizes[size], variants[variant], className].filter(Boolean).join(" ");
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  /** Set for links leaving the site — adds the right rel attributes. */
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external = false,
  ...rest
}: ButtonLinkProps) {
  const cls = classes(variant, size, className);

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
