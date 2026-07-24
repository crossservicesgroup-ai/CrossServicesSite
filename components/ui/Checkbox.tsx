import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   The checkbox mark is the signature element of this site. It shows up in
   three places: the corner of every service card, the "What's included"
   lists, and the quote form.

   Everything in this file is static — no JavaScript is shipped for it.
   The interactive form checkbox lives in CheckboxField.tsx.
   -------------------------------------------------------------------------- */

/**
 * Decorative square check mark. Inside a `group`, it fills with Cross blue
 * when the parent card is hovered or focused.
 */
export function CheckMark({
  checked = false,
  size = 24,
  className = "",
}: {
  checked?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-200",
        checked
          ? "border-cross-blue bg-cross-blue text-white"
          : "border-line bg-surface text-transparent group-hover:border-cross-blue group-hover:bg-cross-blue group-hover:text-white group-focus-within:border-cross-blue group-focus-within:bg-cross-blue group-focus-within:text-white",
        className,
      ].join(" ")}
    >
      <svg
        viewBox="0 0 14 14"
        width={size * 0.6}
        height={size * 0.6}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 7.5 5.5 11 12 3.5" />
      </svg>
    </span>
  );
}

/** A "What's included" list item. */
export function CheckListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckMark checked size={22} className="mt-1" />
      <span className="text-[17px]">{children}</span>
    </li>
  );
}

export function CheckList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => (
        <CheckListItem key={item}>{item}</CheckListItem>
      ))}
    </ul>
  );
}
