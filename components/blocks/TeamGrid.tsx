"use client";

import Image from "next/image";
import { useState } from "react";
import { team, initialsOf, type TeamMember } from "@/content/team";

/**
 * Team grid that degrades gracefully. A member with no photo gets their
 * initials in a circle — never a company logo, which is what the old site
 * did. A member with no bio simply has no "Read bio" control.
 */
export function TeamGrid() {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <TeamCard key={member.id} member={member} />
      ))}
    </ul>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
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
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`bio-${member.id}`}
            className="inline-flex min-h-11 items-center text-[16px] font-medium text-cross-blue underline-offset-4 hover:underline"
          >
            {open ? "Hide bio" : `Read ${member.name.split(" ")[0]}'s bio`}
          </button>
          <div id={`bio-${member.id}`} hidden={!open}>
            <p className="mt-2 text-[16px] text-muted">{member.bio}</p>
          </div>
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
        width={72}
        height={72}
        className="size-18 shrink-0 rounded-full border border-line object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-18 shrink-0 items-center justify-center rounded-full border border-line bg-paper font-display text-[22px] text-cross-navy"
    >
      {initialsOf(member.name)}
    </span>
  );
}
