"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

/**
 * The only accordion on the site. Native details/summary would be simpler,
 * but this gives us the keyboard behaviour and ARIA state we want without
 * fighting the browser default marker.
 */
export function Faq({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <ul className="border-t border-line">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <li key={faq.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full items-start justify-between gap-5 py-5 text-left text-[17px] font-medium text-ink transition-colors hover:text-cross-blue md:text-[19px]"
              >
                <span className="max-w-[52ch]">{faq.q}</span>
                <Plus
                  aria-hidden="true"
                  className={`mt-1 size-5 shrink-0 text-cross-blue transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
            >
              <p className="max-w-[68ch] pb-6 text-[17px] text-muted">{faq.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
