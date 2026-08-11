"use client";

import type { ReactNode } from "react";

/* Every field gets a real label, the right autocomplete and inputmode, and
   an inline error under it that says what to fix without apologising. */

const inputBase =
  "w-full rounded-[2px] border bg-surface px-4 py-3 text-[17px] min-h-12 " +
  "placeholder:text-muted/60 transition-colors";

export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[16px] font-medium">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-cross-blue">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {hint ? <p className="text-[15px] text-muted">{hint}</p> : null}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[15px] text-cross-blue">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
};

export function TextInput({
  id,
  name,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  maxLength,
  required,
}: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputMode={inputMode}
      autoComplete={autoComplete}
      placeholder={placeholder}
      maxLength={maxLength}
      required={required}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} ${error ? "border-cross-blue" : "border-line focus:border-cross-blue"}`}
    />
  );
}

export function TextArea({
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  rows = 4,
  required,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} resize-y ${error ? "border-cross-blue" : "border-line focus:border-cross-blue"}`}
    />
  );
}

export function Select({
  id,
  name,
  value,
  onChange,
  error,
  options,
  autoComplete,
  placeholder = "Choose one",
  required,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: readonly string[];
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      autoComplete={autoComplete}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} appearance-none bg-[length:16px] bg-[right_16px_center] bg-no-repeat pr-12 ${
        error ? "border-cross-blue" : "border-line focus:border-cross-blue"
      }`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%235C6270' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 6l5 5 5-5'/></svg>\")",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
