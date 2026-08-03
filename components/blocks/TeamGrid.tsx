"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { team, initialsOf, type TeamMember } from "@/content/team";

/**
 * Team grid that degrades gracefully. A member with no photo gets their
 * initials in a circle — never a company logo, which is what the old site
 * did. A member with no bio simply has no "Read bio" control.
 */
export function TeamGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeMember = team.find((member) => member.id === activeId) ?? null;
  const leadership = team.filter((member) => !member.isDivisionHead);
  const divisionHeads = team.filter((member) => member.isDivisionHead);

  return (
    <>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {leadership.map((member) => (
          <TeamCard key={member.id} member={member} onOpen={() => setActiveId(member.id)} />
        ))}
      </ul>

      {divisionHeads.length > 0 ? (
        <div className="mt-12">
          <p className="type-eyebrow mb-6 text-[15px]! text-cross-blue">Division heads</p>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {divisionHeads.map((member) => (
              <TeamCard key={member.id} member={member} onOpen={() => setActiveId(member.id)} />
            ))}
          </ul>
        </div>
      ) : null}

      <BioModal member={activeMember} onClose={() => setActiveId(null)} />
    </>
  );
}

function TeamCard({ member, onOpen }: { member: TeamMember; onOpen: () => void }) {
  const hasBio = Boolean(member.bio);

  return (
    <li className="flex flex-col rounded-[3px] border border-line bg-surface p-6">
      <div className="flex items-center gap-4">
        <Avatar member={member} />
        <div className="min-w-0">
          <h3 className="text-[19px] leading-tight">{member.name}</h3>
          <p className="mt-1 text-[15px] text-muted">{member.title}</p>
        </div>
      </div>

      {hasBio ? (
        <div className="mt-5">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex min-h-11 items-center text-[16px] font-medium text-cross-blue underline-offset-4 hover:underline"
          >
            {`Read ${member.name.split(" ")[0]}'s bio`}
          </button>
        </div>
      ) : null}
    </li>
  );
}

function Avatar({ member }: { member: TeamMember }) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt={`${member.name}, ${member.title} at Cross Services Group`}
        width={80}
        height={80}
        className="size-20 shrink-0 rounded-full border border-line object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-20 shrink-0 items-center justify-center rounded-full border border-line bg-paper font-display text-[22px] text-cross-navy"
    >
      {initialsOf(member.name)}
    </span>
  );
}

function BioModal({ member, onClose }: { member: TeamMember | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(member);

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

  if (!member) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name}'s bio`}
      className="fixed inset-0 z-50 flex flex-col bg-paper"
    >
      <div className="flex h-20 shrink-0 items-center justify-end border-b border-line px-5 md:px-8">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close bio"
          className="inline-flex size-11 items-center justify-center rounded-[2px] text-ink"
        >
          <X aria-hidden="true" className="size-6" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-10 md:px-8">
        <div className="mx-auto max-w-[760px]">
          <div className="flex items-center gap-5">
            <Avatar member={member} />
            <div className="min-w-0">
              <h2 className="text-[26px] leading-tight md:text-[32px]">{member.name}</h2>
              <p className="mt-1 text-[17px] text-muted">{member.title}</p>
            </div>
          </div>
          <div className="mt-8 flex max-w-[68ch] flex-col gap-4 text-[18px] leading-relaxed text-ink">
            {member.bio?.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}
