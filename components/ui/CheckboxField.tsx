"use client";

/** The real, interactive checkbox used in the quote form. */
export function CheckboxField({
  id,
  name,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={[
        "group flex min-h-14 cursor-pointer items-start gap-3 rounded-[3px] border p-4",
        "transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2",
        "has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cross-blue",
        checked
          ? "border-cross-blue bg-cross-blue/6"
          : "border-line bg-surface hover:border-cross-blue/40",
      ].join(" ")}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={[
          "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-150",
          checked
            ? "border-cross-blue bg-cross-blue text-white"
            : "border-line bg-surface text-transparent",
        ].join(" ")}
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
      <span className="flex flex-col">
        <span className="text-[17px] leading-snug font-medium">{label}</span>
        {description ? (
          <span className="mt-1 text-[15px] leading-snug text-muted">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
