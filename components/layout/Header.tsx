"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { site } from "@/content/site";
import { servicesByGroup } from "@/content/services";
import { ButtonLink } from "@/components/ui/Button";
import { LogoLink } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";

const NAV = [
  { label: "Cross Courts", href: "/club" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "border-b border-line bg-paper/95 backdrop-blur-sm"
            : "border-b border-transparent bg-paper md:bg-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between gap-4 px-5 md:h-24 md:px-8"
        >
          <LogoLink />

          {/* ------------------------------------------------ desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            <ServicesDropdown pathname={pathname} />
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-[2px] px-3.5 text-[18px] transition-colors hover:text-cross-blue ${
                  pathname === item.href ? "text-cross-blue" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <ButtonLink href="/quote">Get a quote</ButtonLink>
          </div>

          {/* ------------------------------------------------- mobile nav */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={site.phone.href}
              className="inline-flex size-11 items-center justify-center rounded-[2px] text-cross-blue"
              aria-label={`Call Cross Services Group on ${site.phone.display}`}
            >
              <Phone aria-hidden="true" className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="inline-flex size-11 items-center justify-center rounded-[2px] text-ink"
            >
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function ServicesDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const groups = servicesByGroup();
  const isActive = pathname.startsWith("/services");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="services-menu"
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-[2px] px-3.5 text-[18px] transition-colors hover:text-cross-blue ${
          isActive ? "text-cross-blue" : "text-ink"
        }`}
      >
        Services
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div
          id="services-menu"
          className="absolute top-full left-0 z-50 w-max max-w-[min(92vw,980px)] pt-3"
        >
          <div className="rounded-[3px] border border-line bg-surface p-8 shadow-[0_24px_48px_-24px_rgb(11_54_101_/_0.3)]">
            <div className="grid grid-cols-3 gap-x-10 gap-y-8">
              {groups.map((group) => (
                <div key={group.id}>
                  <p className="type-eyebrow mb-3 text-muted">{group.name}</p>
                  <ul className="flex flex-col gap-0.5">
                    {group.services.map((service) =>
                      service.externalUrl ? (
                        <li key={service.slug}>
                          <a
                            href={service.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-[2px] py-1.5 text-[16px] text-ink transition-colors hover:text-cross-blue"
                          >
                            {service.name}
                          </a>
                        </li>
                      ) : (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="block rounded-[2px] py-1.5 text-[16px] text-ink transition-colors hover:text-cross-blue"
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
            <div className="mt-6 border-t border-line pt-5">
              <Link
                href="/services"
                className="text-[16px] font-medium text-cross-blue underline-offset-4 hover:underline"
              >
                See all services and how they fit together →
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
