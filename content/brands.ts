/* ==========================================================================
   PORTFOLIO COMPANIES
   The specialist companies that sit under the Cross umbrella.

   To add a company: copy one of the blocks below, give it a new `id`, and
   reference that id from a service in services.ts (`brandId`).
   Nothing else needs to change.
   ========================================================================== */

export type Brand = {
  id: string;
  name: string;
  /** Path to the logo inside /public. Leave as-is until the real logo arrives. */
  logo: string;
  /** One sentence, roughly 20 words max. */
  blurb: string;
  /** Only set this if the company has its own separate website. */
  externalUrl?: string;
  /** Year it came under the Cross umbrella. */
  joinedYear?: number;
};

export const brands: Brand[] = [
  {
    id: "classic-shine",
    name: "Classic Shine",
    logo: "/images/brands/classic-shine.svg", // [NEEDS INPUT] logo file
    blurb:
      "The original Cross business, founded in 1989. Car, truck and van detailing done by hand.",
    joinedYear: 1989,
  },
  {
    id: "new-view",
    name: "New-View",
    logo: "/images/brands/new-view.svg", // [NEEDS INPUT] logo file
    blurb:
      "The Cross exterior division: window cleaning, power washing and gutter cleaning.",
    // [NEEDS INPUT] year New-View joined the group
  },
  {
    id: "the-furies",
    name: "The Furies",
    logo: "/images/brands/the-furies.svg", // [NEEDS INPUT] logo file
    blurb: "Our sister company handling residential cleaning on Cape Cod.",
    externalUrl: "https://furiescapecodcleaning.com",
    // [NEEDS INPUT] year The Furies joined the group
  },
  {
    id: "cross-courts",
    name: "Cross Courts",
    logo: "/images/brands/cross-courts.svg", // [NEEDS INPUT] logo file
    blurb:
      "Squash and fitness club in Natick, built by Cross in 2007. Four international courts.",
    joinedYear: 2007,
  },
];

/* --------------------------------------------------------------------------
   [NEEDS INPUT] Confirm this list is complete and that the company-to-service
   mapping in services.ts is right.
   -------------------------------------------------------------------------- */

/** Look up a company by id. Returns undefined if the id is not in the list. */
export function getBrand(id: string | null | undefined): Brand | undefined {
  if (!id) return undefined;
  return brands.find((b) => b.id === id);
}
