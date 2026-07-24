# Content status

Everything on the site that is not final, in one list. Nothing here is invented —
where a fact was missing, the page shows a labelled placeholder rather than a guess.

Last updated when the site was built.

---

## 1. Assets still needed

| Item | Where it goes | What happens until then |
|---|---|---|
| Logo as SVG (full lockup + compact mobile mark) | `/public/images/brand/` then update `LOGO_SRC` in `components/layout/Logo.tsx` | The supplied `.webp` lockup is used on light backgrounds; the navy footer uses a type-only lockup |
| Hero photo — a real Cross crew or truck | `/public/images/hero/crew.jpg` | Hero renders on navy with a faint grid |
| Founder photo, or an early Classic Shine photo | `/public/images/hero/warren-cross.jpg` | Labelled "photo needed" panel on the About page |
| Job photos for all 11 services | `/public/images/services/` — exact paths are listed on each placeholder and in `content/services.ts` | Labelled "photo needed" panels |
| Before/after pairs | `power-washing`, `car-detailing`, `landscaping-irrigation` — paths in `content/services.ts` under `beforeAfter` | The slider is skipped entirely; the hero photo shows instead |
| Club and court photography | `/public/images/club/courts-hero.jpg`, `squash.jpg`, `garage-gym.jpg` | Club hero renders on navy; section photos show placeholders |
| Portfolio company logos — Classic Shine, New-View, The Furies, Cross Courts | `/public/images/brands/` — filenames in `content/brands.ts` | Brand cards show the company initials, never a stock or invented mark |
| Team headshots (all ten) | `/public/images/team/`, then set `photo:` in `content/team.ts` | Initials in a circle. Never a company logo — that is the thing the old site did wrong |

**Drop a file at the named path and it appears automatically.** Every image slot checks
whether the file exists on disk; no code changes needed.

---

## 2. Facts I need from you

| Item | Where it lives | Current state |
|---|---|---|
| Business hours | `content/site.ts` → `hours` | **Draft placeholder hours are showing.** Set `hoursArePlaceholder: false` once they are real. They feed the contact page, the club page and the Google listing data |
| Club and court hours | Same as above | Club page shows a "to confirm" note |
| Membership tiers and pricing | `app/club/page.tsx` | Shows a "to confirm" note and points at the booking portal |
| Square footage and building count (130,000 sq ft, 6 buildings) | `content/site.ts` → `commercial` | **Taken from Warren's bio on the current site, not from you.** Confirm before launch |
| Acquisition years for the timeline | `content/timeline.ts` | 1989 and 2007 are confirmed. Six entries show "Year to confirm" rather than a guessed date |
| Bios for Warren III, Megan, Giulia, Joe and Brian | `content/team.ts` | Card shows name and title only, with no "read bio" control |
| Open roles and benefits | `app/careers/page.tsx` → `OPEN_ROLES`, `BENEFITS` | Both empty, with a visible note. Nothing about health cover, time off or training is claimed |
| Confirmation that the brand → service mapping is right | `content/brands.ts`, `content/services.ts` | Built as specified: New-View on power washing / window washing / gutter cleaning, Classic Shine on car detailing, The Furies as a second card on residential cleaning |
| Google rating and review count | `components/blocks/Proof.tsx` | **Not shown.** The proof strip uses only verifiable facts, because we have no confirmed rating |
| A commercial testimonial | `content/reviews.ts` | The homepage commercial block leaves the quote space empty rather than inventing one |

---

## 3. Copy status

**Verbatim from the current site** — do not reword without checking:

- The Cross Guarantee (`content/site.ts`)
- All four testimonials, with their names and service tags (`content/reviews.ts`)
- Every `includes` list on all eleven services (`content/services.ts`)
- All five existing team bios (`content/team.ts`)
- The founding story on the About page
- The squash and fitness copy on the Club page

**Draft copy, written for this rebuild** — reads fine, but review it:

- The `intro` paragraph on each service page. Rewritten from the current site copy so each one addresses a homeowner and a property manager in the same paragraph.
- The `tagline` on each service (the one-liner on cards).
- All FAQs. Four per service. **None of them states a price, a timeframe, a certification or a guarantee beyond the real Cross Guarantee** — they are deliberately safe.
- The "How it works" three steps on the homepage.
- The commercial block aimed at property managers.
- The careers page copy.

---

## 4. Before this goes live

- [ ] Set `RESEND_API_KEY` and `QUOTE_FROM_EMAIL` in Vercel (see `.env.example`). **Until these exist, the quote form validates and confirms to the user but logs the lead to the server console instead of emailing it.**
- [ ] Send one real test lead end to end and check it lands in `CSG@CrossServicesGroup.com`
- [ ] Confirm the square footage and building count
- [ ] Confirm business hours, then flip `hoursArePlaceholder` to `false`
- [ ] Replace the placeholder photography (the site works without it, but it looks like a site waiting for photos, because it is)
- [ ] Point the domain at Vercel and confirm the legacy redirects resolve on the live domain
