/* ==========================================================================
   COMPANY TIMELINE — the acquisition story, shown on the About page.

   Set `yearConfirmed: false` on any entry where we do not yet know the real
   year. Those entries render without a year rather than showing a made-up
   one, and they are listed in CONTENT-STATUS.md so nothing gets forgotten.
   ========================================================================== */

export type TimelineEntry = {
  /** The year, or null if we do not know it yet. */
  year: number | null;
  title: string;
  body: string;
  yearConfirmed: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    year: 1989,
    title: "Classic Shine opens",
    body: "Warren Cross Jr. starts the company out of college with a single business: hand car detailing in Natick.",
    yearConfirmed: true,
  },
  {
    year: 2007,
    title: "Cross Courts is built",
    body: "Warren develops Cross Courts Squash and Fitness Center at 19 Tech Circle, with four international squash courts and a full fitness facility.",
    yearConfirmed: true,
  },
  {
    year: null,
    title: "New-View joins the group",
    body: "Window cleaning, power washing and gutter cleaning come under the Cross umbrella as the exterior division.",
    yearConfirmed: false, // [NEEDS INPUT] acquisition year
  },
  {
    year: null,
    title: "House cleaning added",
    body: "Residential cleaning joins the group, bringing weekly and bi-weekly home visits alongside the exterior work.",
    yearConfirmed: false, // [NEEDS INPUT] acquisition year
  },
  {
    year: null,
    title: "Landscaping and irrigation added",
    body: "Grounds care and automated sprinkler systems join, so a whole property can be looked after by one company.",
    yearConfirmed: false, // [NEEDS INPUT] acquisition year
  },
  {
    year: null,
    title: "Carpentry, painting and junk removal added",
    body: "The projects side of the business arrives: interior and exterior painting, handyman work and full-property cleanouts.",
    yearConfirmed: false, // [NEEDS INPUT] acquisition year
  },
  {
    year: null,
    title: "The Furies joins on Cape Cod",
    body: "A sister company extends residential cleaning to Cape Cod.",
    yearConfirmed: false, // [NEEDS INPUT] acquisition year
  },
  {
    year: null,
    title: "Technology division launches",
    body: "Audio and video, network cameras, data networking and hosted phone systems become the newest Cross service.",
    yearConfirmed: false, // [NEEDS INPUT] launch year
  },
];
