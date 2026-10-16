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
};

export const reviews: Review[] = [
  {
    quote:
      "Professional and very informative. The gentlemen took the time to go over options BEFORE fixing my irrigation system.",
    author: "Rochelle",
    serviceSlug: "irrigation",
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
];

/* ==========================================================================
   VIDEO TESTIMONIALS
   Shown on /testimonials. Add an entry per video and it renders
   automatically.

   Two ways to supply a video:
   - `src`: an .mp4 saved in /public/videos/testimonials/, e.g.
     "/videos/testimonials/rochelle.mp4". Add `poster` (a still image in
     /public/images/...) so the card has a thumbnail before it plays.
   - `youtubeId`: the ID from a YouTube link (the part after "v=" or after
     "youtu.be/"). Use this for long or large videos.
   ========================================================================== */

export type VideoTestimonial = {
  /** Leave undefined for a compilation video with several clients. */
  author?: string;
  /** A slug from services.ts, or null for a general testimonial. */
  serviceSlug: string | null;
  /** Optional one-line pull quote shown under the video. */
  quote?: string;
  src?: string;
  poster?: string;
  youtubeId?: string;
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    serviceSlug: null,
    src: "/videos/testimonials/home-management-testimonials.mp4",
  },
];
