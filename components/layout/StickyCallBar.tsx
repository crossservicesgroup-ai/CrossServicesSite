"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/content/site";

/**
 * Mobile-only bar pinned to the bottom of the screen with the two things
 * that matter: call, and get a quote. It appears once the visitor has
 * scrolled past roughly one screen. Page content carries bottom padding
 * (`.has-call-bar`) so the bar never covers anything.
 */
export function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/97 backdrop-blur-sm transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      // Hidden from assistive tech and keyboard while off screen — the same
      // two actions are always available in the menu and in the page.
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-center gap-3 px-5 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <a
          href={site.phone.href}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[2px] border border-cross-blue text-[17px] font-medium text-cross-blue"
        >
          <Phone aria-hidden="true" className="size-4.5" />
          Call
        </a>
        <Link
          href="/quote"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[2px] bg-cross-blue text-[17px] font-medium text-white"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
