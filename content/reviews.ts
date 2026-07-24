/* ==========================================================================
   REVIEWS
   Real customer testimonials, migrated word for word from the current site.
   `serviceSlug` must match a slug in services.ts — it drives the tag shown
   under the quote.
   ========================================================================== */

export type Review = {
  quote: string;
  author: string;
  /** A slug from services.ts, or null for a general review. */
  serviceSlug: string | null;
  /** Out of 5. Leave undefined to hide the stars. */
  rating?: number;
  /** Set true for a business customer — used by the commercial proof block. */
  isCommercial?: boolean;
};

export const reviews: Review[] = [
  {
    quote:
      "Professional and very informative. The gentlemen took the time to go over options BEFORE fixing my irrigation system.",
    author: "Rochelle",
    serviceSlug: "landscaping-irrigation",
    rating: 5,
  },
  {
    quote:
      "Cross Services Group are fantastic! They go above and beyond to accommodate the client and their work is first rate!",
    author: "Stephanie",
    serviceSlug: "painting-handyman",
    rating: 5,
  },
  {
    quote:
      "Your guys did a GREAT job!!! Thank you so much. The windows are sparkling, the roof is power washed and totally free from whatever moss was growing on it.",
    author: "Linda",
    serviceSlug: "window-washing",
    rating: 5,
  },
  {
    quote:
      "Cross Services does an excellent job. My house has lots of nooks and crannies as well as several bathrooms. Everything was clean and gleaming.",
    author: "Victoria",
    serviceSlug: "residential-cleaning",
    rating: 5,
  },
  /* --------------------------------------------------------------------
     [NEEDS INPUT] A commercial testimonial from a property or facility
     manager. The homepage has a block reserved for one — until a real
     quote arrives that block shows the buildings we run instead.
     -------------------------------------------------------------------- */
];

export const commercialReview = reviews.find((r) => r.isCommercial) ?? null;
