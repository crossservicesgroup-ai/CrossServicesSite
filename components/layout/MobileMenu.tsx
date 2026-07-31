"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Phone, X } from "lucide-react";
import { site } from "@/content/site";
import { servicesByGroup } from "@/content/services";
import { ButtonLink } from "@/components/ui/Button";
import { LogoLink } from "@/components/layout/Logo";

const PAGES = [
  { label: "Cross Courts", href: "/club" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const groups = servicesByGroup();

  // Close on route change.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll, close on Escape, and keep focus inside the overlay.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
    >
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-5">
        <LogoLink onNavigate={onClose} />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex size-11 items-center justify-center rounded-[2px] text-ink"
        >
          <X aria-hidden="true" className="size-6" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
        <nav aria-label="Services">
          <Link
            href="/services"
            onClick={onClose}
            className="type-eyebrow mb-5 inline-flex text-cross-blue"
          >
            All services →
          </Link>
          <div className="flex flex-col gap-6">
            {groups.map((group) => (
              <div key={group.id}>
                <p className="type-eyebrow mb-2 text-muted">{group.name}</p>
                <ul className="flex flex-col">
                  {group.services.map((service) =>
                    service.externalUrl ? (
                      <li key={service.slug}>
                        <a
                          href={service.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className="flex min-h-12 items-center border-b border-line text-[18px] text-ink"
                        >
                          {service.name}
                        </a>
                      </li>
                    ) : (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={onClose}
                          className="flex min-h-12 items-center border-b border-line text-[18px] text-ink"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <nav aria-label="Pages" className="mt-8">
          <ul className="flex flex-col">
            {PAGES.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  onClick={onClose}
                  aria-current={pathname === page.href ? "page" : undefined}
                  className="flex min-h-13 items-center border-b border-line font-display text-[22px] text-cross-navy"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shrink-0 border-t border-line bg-surface px-5 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <a
          href={site.phone.href}
          className="mb-3 flex min-h-11 items-center justify-center gap-2 text-[18px] font-medium text-cross-blue"
        >
          <Phone aria-hidden="true" className="size-5" />
          {site.phone.display}
        </a>
        <ButtonLink href="/quote" className="w-full" onClick={onClose}>
          Get a quote
        </ButtonLink>
      </div>
    </div>
  );
}
