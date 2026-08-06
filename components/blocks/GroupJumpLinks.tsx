"use client";

import { useEffect, useState } from "react";
import type { ServiceGroup } from "@/content/services";

/** Sticky group jump links. Desktop only — on mobile you just scroll. */
export function GroupJumpLinks({
  groups,
}: {
  groups: { id: ServiceGroup; name: string }[];
}) {
  const [active, setActive] = useState<string>(groups[0]?.id ?? "");

  useEffect(() => {
    const sections = groups
      .map((g) => document.getElementById(g.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [groups]);

  return (
    <nav aria-label="Jump to a service group" className="hidden lg:block">
      <div className="sticky top-28">
        <p className="font-display mb-4 text-[17px] font-semibold text-cross-navy">
          On this page
        </p>
        <ul className="flex flex-col gap-1 border-l border-line">
          {groups.map((group) => (
            <li key={group.id}>
              <a
                href={`#${group.id}`}
                aria-current={active === group.id ? "true" : undefined}
                className={`-ml-px flex border-l-2 py-2 pl-4 text-[16px] transition-colors ${
                  active === group.id
                    ? "border-cross-blue font-medium text-cross-blue"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {group.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
