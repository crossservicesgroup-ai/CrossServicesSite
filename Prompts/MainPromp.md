# Cross Services Group Website Build Prompt

This document is the full brief for rebuilding crossservicesgroup.com. Read the whole thing before writing any code. Build in the phase order at the end. Ask me before inventing anything not covered here.

---

## 0. How to use this document

- Sections 1 to 5 are the facts and the content model. Treat them as source of truth.
- Sections 6 to 10 are design and page specs. Follow them closely.
- Sections 11 to 13 are the quality floor. Non negotiable.
- Section 14 is the build order. Stop at each checkpoint and show me what you have.
- Anything marked `[NEEDS INPUT]` is a placeholder I have to fill in. Build around it with clearly labeled dummy content, do not guess and do not silently make something up.

---

## 1. Project brief

Rebuild the Cross Services Group website. It is currently a dated Squarespace site. The content is decent, the structure is the problem.

**The job of the site:** get a homeowner or a property manager to request a quote or pick up the phone, in as few taps as possible, from a phone.

**The positioning:** one call handles everything your property needs. Cross has been doing this for over 30 years, is family owned, and has acquired a set of specialist companies that now sit under the Cross umbrella.

**Primary success metric:** quote form submissions and tap-to-call events from mobile.

**What is wrong with the current site, so you do not repeat it:**

1. All eleven services sit in one flat dropdown with no grouping.
2. The strongest selling points (30+ years, the Cross Guarantee, one call for everything) are buried in gray paragraphs.
3. The contact form makes you pick a single service from a dropdown, which contradicts the entire single source pitch.
4. The portfolio companies are invisible. They show up as a stray logo or a line in someone's bio.
5. The squash club and gym, which are membership revenue, are in the footer.
6. Leftover Squarespace cart and search pages that do nothing.
7. Wide letter spaced all caps used on everything, which is the single biggest thing making it feel old.
8. Team page has real bios for some people and a truck logo placeholder for others.

---

## 2. Company facts (source of truth)

**Name:** Cross Services Group, Inc.
**Tagline:** Cross it off your list.
**Founded:** 1989 by Warren Cross Jr. The first business was Classic Shine, the car cleaning division. Services were added over the following 30+ years through acquisition.
**Address:** 19 Tech Circle, Natick, MA 01760
**Phone:** 508-652-1910
**Email:** CSG@CrossServicesGroup.com
**Service area:** MetroWest Boston. Named towns: Natick, Wellesley, Weston, Needham, Newton, Dover, Sherborn.

**Both residential and commercial.** Every service is offered to homeowners and to commercial properties. There is no separate site section for each. Copy on every service page must speak to both.

**Social:**
- Instagram: https://www.instagram.com/crossservicesgroup/
- LinkedIn: https://www.linkedin.com/company/cross-services-group-inc/
- Facebook: https://www.facebook.com/people/Cross-Services-Group/61572752550872/

**External links:**
- Club membership and court booking: https://app.courtreserve.com/Online/Portal/Index/13265
- The Furies (Cape Cod cleaning): https://furiescapecodcleaning.com

**The Cross Guarantee.** The exact wording lives on the current homepage and about page. Copy it verbatim from there, do not rewrite it. It is roughly: if you are not completely satisfied with the service, they will do it again free of charge, no questions asked. This is the most important trust element on the entire site.

**Leadership team** (for the About page):

| Name | Title |
|---|---|
| Warren Cross Jr. | President and CEO |
| Warren Cross III | Vice President |
| Chris Mastrodicasa | Chief Financial Officer |
| Chip Tarbell | Vice President of Operations |
| Campbell Armstrong | Business Development and Real Estate Manager |
| Megan Griffith | Customer Development Manager |
| Giulia Palizzolo | Operations Associate |
| Grace Silva | Head of House Cleaning |
| Joe Slavik | Operations Analyst |
| Brian Rothwell | Technology |

Bios exist on the current site for Warren Jr., Chris, Chip, Campbell, and Grace. The rest have no bio and no headshot. Build the team component so a missing bio or missing photo degrades gracefully. Never render a company logo in place of a headshot, which is what the current site does. Use initials in a circle instead.

**Commercial credibility fact worth using:** the company operates across roughly 130,000 square feet of commercial buildings in Natick and Needham business parks. Confirm the exact number with me before publishing.

---

## 3. Tech stack and hosting

- **Next.js 15**, App Router, TypeScript
- **Tailwind CSS v4**
- **No UI component library.** Build the components. Do not install shadcn, Material, Chakra, or similar.
- Only allowed dependencies beyond the framework: `next/font`, `lucide-react` for icons, `resend` for form email, `zod` for form validation. Ask before adding anything else.
- **Hosting:** Vercel, deployed from a GitHub repo.
- **No CMS.** All content lives in typed data files. See section 5.
- **No database.**
- Images live in `/public/images/` and are served through `next/image`.

The person maintaining this site is not a developer. Every piece of editable content must live in a plain data file with clear comments, not scattered through JSX.

---

## 4. Repo structure

```
/app
  layout.tsx
  page.tsx                      home
  /services
    page.tsx                    services index
    /[slug]
      page.tsx                  service detail, generated from data
  /club
    page.tsx
  /about
    page.tsx
  /careers
    page.tsx
  /contact
    page.tsx
  /quote
    page.tsx                    multi step quote form
  /api/quote/route.ts           form handler
  not-found.tsx
  sitemap.ts
  robots.ts
/components
  /layout       Header, MobileMenu, StickyCallBar, Footer
  /ui           Button, Card, Eyebrow, Section, Tag, Checkbox
  /blocks       Hero, ServiceGrid, GuaranteeBlock, HowItWorks, Proof,
                ServiceAreaBlock, Reviews, BrandCard, RelatedServices,
                BeforeAfter, ClubBand, QuoteForm, TeamGrid, Timeline
/content
  services.ts                   all 11 services
  brands.ts                     portfolio companies
  site.ts                       phone, address, hours, socials, towns
  team.ts                       leadership
  reviews.ts                    testimonials
  timeline.ts                   company history
/lib
  seo.ts
/public/images
  /services /brands /team /hero
```

---

## 5. Content model

### 5.1 `content/services.ts`

This file drives the services index, all eleven detail pages, the nav dropdown, the quote form checkboxes, and the sitemap. One file, one edit, everything updates.

```ts
export type ServiceGroup =
  | 'grounds'      // Grounds & exterior
  | 'cleaning'     // Cleaning
  | 'repairs'      // Repairs & projects
  | 'property'     // Property management
  | 'vehicles';    // Vehicles

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  tagline: string;          // one sentence, used on cards
  intro: string;            // 2 to 3 sentences, top of detail page
  includes: string[];       // "What's included" checklist
  brandId: string | null;   // key into brands.ts, null = Cross does it directly
  secondaryBrandId?: string;
  related: string[];        // 2 to 3 slugs
  heroImage: string;
  gallery: string[];
  faqs: { q: string; a: string }[];
  legacyPath: string;       // old Squarespace URL, for redirects
};
```

**The eleven services.** Slugs, groups, brand mapping, and related links are fixed. Fill `intro`, `includes`, and `faqs` by migrating copy from the current live pages. Where the current page has a "We Offer" list, that becomes `includes` almost verbatim.

| slug | name | group | brandId | related | legacyPath |
|---|---|---|---|---|---|
| `landscaping-irrigation` | Landscaping & Irrigation | grounds | null | power-washing, gutter-cleaning, property-management | /landscaping-copy |
| `power-washing` | Power Washing | grounds | new-view | window-washing, gutter-cleaning, landscaping-irrigation | /power-washing |
| `window-washing` | Window Washing | grounds | new-view | power-washing, gutter-cleaning, residential-cleaning | /window-washing |
| `gutter-cleaning` | Gutter Cleaning | grounds | new-view | power-washing, window-washing, painting-handyman | /gutter-cleaning |
| `residential-cleaning` | Residential Cleaning | cleaning | null | window-washing, junk-removal, janitorial-cleaning | /residential-cleaning |
| `janitorial-cleaning` | Janitorial Cleaning | cleaning | null | property-management, window-washing, junk-removal | /janitorial-cleaning |
| `painting-handyman` | Painting & Handyman | repairs | null | gutter-cleaning, junk-removal, audio-video | /painting-handyman |
| `junk-removal` | Junk Removal | repairs | null | residential-cleaning, painting-handyman, property-management | /junk-removal |
| `audio-video` | Audio & Video | repairs | null | painting-handyman, property-management, residential-cleaning | /new-page-2 |
| `property-management` | Property Management | property | null | janitorial-cleaning, landscaping-irrigation, painting-handyman | /property-management |
| `car-detailing` | Car Detailing | vehicles | classic-shine | residential-cleaning, power-washing, property-management | /car-detailing |

Group display names and order on the services index:

1. Grounds & exterior
2. Cleaning
3. Repairs & projects
4. Property management
5. Vehicles

`residential-cleaning` gets `secondaryBrandId: 'the-furies'` with a note that on Cape Cod, sister company The Furies handles residential cleaning.

### 5.2 `content/brands.ts`

```ts
export type Brand = {
  id: string;
  name: string;
  logo: string;
  blurb: string;          // one sentence, max ~20 words
  externalUrl?: string;   // if the brand has its own site
  joinedYear?: number;
};
```

| id | name | notes |
|---|---|---|
| `classic-shine` | Classic Shine | The original Cross business, founded 1989. Car detailing. |
| `new-view` | New-View | Window cleaning, power washing, gutter cleaning division. |
| `the-furies` | The Furies | Cape Cod residential cleaning. External site. |
| `cross-courts` | Cross Courts | Squash and fitness club. Used on the Club page, not on services. |

`[NEEDS INPUT]` I need to confirm this list is complete and that the brand to service mapping is right. Build the file so brands can be added or reassigned without touching any component.

Every brand needs a logo file. `[NEEDS INPUT]` on logo assets.

### 5.3 `content/site.ts`

Phone (raw and formatted), email, street address, city, state, zip, Google Maps embed URL, hours `[NEEDS INPUT]`, social URLs, service area town list, CourtReserve URL, legal name, founded year.

### 5.4 `content/reviews.ts`

Four real testimonials exist on the current homepage, tagged Irrigation, Handyman, Window Washing / Power Washing, and House Cleaning, attributed to first names. Migrate them. Each review object needs `quote`, `author`, `serviceSlug`, and optional `rating`.

---

## 6. Design system

### 6.1 Direction

Not a contractor website. A well run local institution. The company is 30+ years old, family owned, and owns commercial real estate. It should feel established and calm, with a lot of air, real photography, restrained color, and confident typography.

The failure mode to avoid: everything at the same visual weight, which is exactly what the current site does. Every section needs a clear focal point.

### 6.2 The signature element

The tagline is "Cross it off your list." Build the entire visual language around **the checklist**.

- The hero contains a list of services rendered like a real to do list, with items struck through one by one on load. The strike is a hand drawn feeling line, slightly imperfect, drawn with an SVG path animation.
- Every service card has a checkbox in the corner. On hover or tap it fills with the Cross blue and gets a check.
- Section eyebrows are set in monospace with a small check glyph, like a job ticket.
- The "What's included" list on service pages uses the same checkbox mark.

This is the one place to spend boldness. Everything around it stays quiet.

### 6.3 Color tokens

Define these as CSS variables in `globals.css` and map them into Tailwind theme.

```
--cross-blue     #2A54A4   [NEEDS INPUT: pull exact hex from the logo file]
--cross-navy     #12305F   [NEEDS INPUT: same]
--paper          #F7F6F2   page background, warm neutral
--surface        #FFFFFF   cards
--ink            #1B1D21   body text
--muted          #5C6270   secondary text
--line           #E4E2DB   hairline borders
```

Rules:

- Blue is the action color. Buttons, links, active states, the checkbox fill. Nothing else.
- Navy is for large headlines and the footer.
- Page background is `--paper`, not pure white. Cards are white so they lift off it.
- **Maximum two full bleed blue or navy sections per page.** The current site uses giant flat blue slabs and it flattens everything.
- No third accent color. No gradients anywhere.

### 6.4 Typography

Load through `next/font/google`.

- **Display:** Newsreader. Used for h1 and h2 only. Sentence case, tight leading, optical sizing on.
- **Body and UI:** IBM Plex Sans. Everything else.
- **Eyebrows, labels, tags:** IBM Plex Mono, uppercase, 12px, letter spacing 0.08em. This is the only place all caps and letter spacing are allowed.

Scale (mobile first, desktop in parentheses):

| Role | Size | Weight | Leading |
|---|---|---|---|
| h1 / hero | 34px (64px) | 500 | 1.05 |
| h2 / section | 26px (40px) | 500 | 1.15 |
| h3 / card title | 19px (22px) | 500 | 1.25 |
| Body | 17px | 400 | 1.65 |
| Small / caption | 15px | 400 | 1.5 |
| Eyebrow | 12px | 500 | 1 |

Body text never goes below 16px, because iOS zooms the page when a form input is under 16px. Line length capped at 68 characters using `max-w-[68ch]`.

**Do not use wide letter spaced all caps for headings.** That is the main thing making the current site feel dated.

### 6.5 Spacing, radius, motion

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Nothing off scale.
- Section vertical padding: 64px mobile, 96px tablet, 128px desktop.
- Content max width 1200px, gutters 20px mobile and 32px up.
- Radius: 12px on cards, 8px on buttons and inputs, 999px on tags.
- Borders: 1px `--line`. No drop shadows at rest. On card hover, translate up 2px and add a soft shadow, 200ms ease out.
- Motion: fade and rise 12px on scroll into view, 400ms, staggered 60ms within a group. Hover lift on cards. The hero strike through animation. **That is the complete list.** No parallax, no counting up numbers, no carousels, no auto playing anything.
- Wrap every animation in a `prefers-reduced-motion` check.

---

## 7. Mobile first, non negotiable

Build the 375px layout first and add breakpoints upward. In Tailwind that means base classes describe the phone and `md:` and `lg:` add to it. Never the reverse. Do not build desktop and squeeze it down.

Breakpoints: base 375, `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

Rules that apply everywhere:

- Tap targets minimum 44 by 44 px with at least 8px between adjacent targets.
- One column by default. Two at `md`. Three at `lg`.
- Phone numbers are `tel:` links. Email is `mailto:`. The address opens in maps.
- Sticky bottom bar on mobile only, with two buttons: Call and Get a quote. It appears after the user scrolls past the hero and stays. Page content gets bottom padding so the bar never covers anything.
- Forms are one question per screen on mobile. Correct `inputmode` and `autocomplete` attributes on every field.
- Images use `next/image` with explicit `sizes` so phones never download a desktop sized file.
- Test on a real phone, not the browser device emulator.

---

## 8. Global components

### Header

Mobile: logo left, phone icon and hamburger right. Height 64px, sticky, background goes from transparent to `--paper` with a hairline bottom border once scrolled.

Desktop: logo left. Nav center or right: **Services, The Club, About, Contact**. A solid blue **Get a quote** button on the far right, always visible.

Services opens a dropdown on desktop that shows all eleven services grouped by the five groups, in columns, with the group name as a mono eyebrow above each column. Not one long alphabetical list.

### Mobile menu

Full screen overlay, not a small dropdown. Close button top right within thumb reach. Services listed under their group headings, then The Club, About, Careers, Contact. Phone number and Get a quote button pinned at the bottom of the overlay. Locks body scroll while open. Closes on route change and on Escape.

### Footer

Navy background. Four blocks: brand and tagline, services list by group, company links, contact block with address, phone, email, and a small map. Social icons. Service area town list as plain text, which helps local SEO. Copyright line with the legal name.

### Buttons

- Primary: solid blue, white text, 8px radius, 48px tall on mobile.
- Secondary: transparent with a blue border.
- Tertiary: text with an underline on hover.
- Every button label says what happens. "Get a quote" not "Submit."

---

## 9. Page specs

### 9.1 Home `/`

1. **Hero.** Full width photo of a real Cross crew or truck, darkened slightly for text contrast. H1: "Cross it off your list." Sub line covering both audiences, something close to "One call handles your home or your building. Serving MetroWest since 1989." Two buttons: Get a quote (primary), Browse services (secondary). Below the buttons, the checklist signature element with four or five services striking through in sequence.
2. **Proof strip.** Four items in a row, two by two on mobile: 30+ years, family owned and operated, thousands of clients, Google rating. Thin hairline dividers, no boxes.
3. **Services grid.** All eleven, grouped into the five buckets, each group with a mono eyebrow heading. Each card: photo, name, one line tagline, a "Residential & commercial" tag, and the checkbox mark. Entire card clickable.
4. **The Cross Guarantee.** Full bleed navy. Serif pull quote of the guarantee, large. Attribution to Warren Cross Jr. This is the emotional center of the page and should be the most distinctive block on it.
5. **How it works.** Three steps: tell us what you need, we schedule the right crew, you get one point of contact. Numbered here is fine because it is a real sequence.
6. **Commercial proof.** One short block aimed at property and facility managers so they do not bounce thinking this is homeowner only. Square footage managed, building count, a commercial testimonial.
7. **Reviews.** Four testimonials with name, service tag, and stars. Link out to the Google reviews page.
8. **Service area.** Town names as real text plus a simple map. Good for local search.
9. **Club band.** One horizontal band for Cross Courts squash and the gym, with a button out to CourtReserve. Different audience, so it sits low and stays visually separate.
10. **Quote CTA.** Short form or a button through to `/quote`.

### 9.2 Services index `/services`

Page title, one line of intro, then all eleven grouped into the five buckets with mono eyebrow headings. Sticky group jump links on desktop.

At the bottom, a quiet strip of portfolio company logos under a line like "The companies behind our services." No link to a separate companies page. This page is where the family of brands is acknowledged.

### 9.3 Service detail `/services/[slug]`

One template, generated from `services.ts` with `generateStaticParams`.

Order:

1. Breadcrumb: Home / Services / Name
2. H1 service name, "Residential & commercial" tag, `tagline`
3. Hero image, or a before and after slider where good pairs exist (power washing, car detailing, landscaping)
4. `intro` copy, written to address both a homeowner and a property manager in the same paragraph
5. **What's included.** The `includes` array as a checklist using the checkbox mark.
6. **Who does this work.** The brand card. Renders only when `brandId` is not null. Off white panel, logo left, brand name and blurb right, small mono label reading "A Cross Services Group company." Quiet, not a banner. On `residential-cleaning` a second card appears for The Furies noting Cape Cod coverage, linking out.
7. **Gallery.** Real job photos, lazy loaded.
8. **Often paired with.** The two or three `related` services as cards. This is where the single source pitch earns money.
9. **FAQ.** Three to five questions in an accordion, with FAQPage schema.
10. **Quote CTA.** Pre selects this service in the form.

Desktop layout is two column: content left, a sticky quote card on the right that follows down the page. On mobile that card collapses into the sticky bottom bar.

### 9.4 Club `/club`

Merges the current squash page and garage gym page, which say nearly the same thing across two thin pages.

Hero with court photography. Sections for squash (four international courts, four pros, junior academy with 175+ juniors and nationally ranked players, adult leagues and box league) and fitness (fitness center, garage gym, warm up and stretch room, lounge with wifi, locker rooms with steam). One clear membership button out to CourtReserve, repeated at the top and bottom. Hours and location. `[NEEDS INPUT]` on current hours and pricing.

### 9.5 About `/about`

One scrolling page, merging the current About Us, Our Team, and history.

1. Founding story: Warren Cross Jr., 1989, Classic Shine first.
2. **Timeline.** Vertical on mobile, horizontal on desktop. Each entry is a year and a brand or service added. This is the acquisition story and it is far better than the current wall of text. Data lives in `timeline.ts`. `[NEEDS INPUT]` on exact acquisition years.
3. The Cross Guarantee again, smaller treatment than the homepage.
4. **Team grid.** Photo or initials circle, name, title, expandable bio where one exists. Graceful when a bio or photo is missing.
5. Careers teaser linking to `/careers`.

### 9.6 Careers `/careers`

Why work here, benefits, open roles `[NEEDS INPUT]`, and an application form or a mailto. Keep it simple.

### 9.7 Contact `/contact`

Phone, email, address, hours, map, and a short general enquiry form. This is for people who are not requesting a quote. Do not duplicate the full quote flow here, link to it.

### 9.8 Quote `/quote`

See section 10.

### 9.9 404

Custom page with links to the five service groups and the phone number.

---

## 10. Quote form spec

This is the most important flow on the site. Multi step, one question per screen on mobile, progress dots at the top, back button on every step after the first.

**Step 1. What do you need?**
Multi select checkboxes covering all eleven services, grouped by the five buckets. Multiple selections encouraged, because that is the whole point of the company. Pre checked when the user arrives from a service page via `?service=slug`.

**Step 2. Is this for a home or a business?**
Two large buttons. This routes the lead internally, it does not change the site.

**Step 3. Where?**
Street address, town (dropdown seeded with the service area towns plus an Other option), zip.

**Step 4. Contact details.**
Name, phone, email, optional message, and a "how did you hear about us" field.

**Step 5. Confirmation.**
Confirm what was submitted, say who will be in touch and how quickly, and show the phone number for anyone who does not want to wait.

Technical:

- Validate with `zod` on client and server.
- Post to `/api/quote`, which sends via Resend to `CSG@CrossServicesGroup.com` with a subject line listing the selected services.
- Send the customer an acknowledgement email.
- Honeypot field plus a simple rate limit. No CAPTCHA.
- Keep state in a URL query param or React state so a back navigation does not wipe the form.
- Every field gets a real `<label>`, correct `autocomplete`, and correct `inputmode`. Errors appear inline under the field, describe what to fix, and do not apologize.
- `[NEEDS INPUT]` Resend API key and verified sending domain.

---

## 11. SEO, schema, and redirects

- Unique `title` and `meta description` per page, generated from the data files.
- `LocalBusiness` JSON-LD on the homepage with name, address, phone, geo, opening hours, service area towns, and `sameAs` social links.
- `Service` JSON-LD on each service page. `FAQPage` schema on service FAQs.
- Open Graph and Twitter images per page.
- `app/sitemap.ts` generating URLs from `services.ts` so new services are included automatically.
- Canonical URLs on every page.
- Alt text on every image, written for a person, not stuffed with keywords.

**Redirects.** The old site has Google ranking. Every legacy URL must 301 to its new home in `next.config.ts`.

| Old | New |
|---|---|
| `/car-detailing` | `/services/car-detailing` |
| `/power-washing` | `/services/power-washing` |
| `/window-washing` | `/services/window-washing` |
| `/landscaping-copy` | `/services/landscaping-irrigation` |
| `/junk-removal` | `/services/junk-removal` |
| `/painting-handyman` | `/services/painting-handyman` |
| `/gutter-cleaning` | `/services/gutter-cleaning` |
| `/property-management` | `/services/property-management` |
| `/janitorial-cleaning` | `/services/janitorial-cleaning` |
| `/residential-cleaning` | `/services/residential-cleaning` |
| `/new-page-2` | `/services/audio-video` |
| `/cardetailing` | `/services` |
| `/about-us` | `/about` |
| `/about-us-1` | `/about` |
| `/our-team` | `/about#team` |
| `/join-our-team` | `/careers` |
| `/contact-us` | `/contact` |
| `/cross-courts-squash` | `/club` |
| `/garage-gym` | `/club` |
| `/cart` | `/` |
| `/search` | `/` |

---

## 12. Accessibility

- Semantic HTML. One `h1` per page, headings in order.
- Visible keyboard focus ring on every interactive element. Do not remove outlines without replacing them.
- Skip to content link as the first focusable element.
- Text contrast at least 4.5:1. Check white on `--cross-blue` and confirm it passes before using it for body sized text.
- Accordions, the mobile menu, and the multi step form all need correct ARIA and full keyboard operation.
- `prefers-reduced-motion` respected everywhere.
- Never convey information with color alone.

---

## 13. Performance targets

- Lighthouse mobile: performance 90+, accessibility 100, best practices 100, SEO 100.
- Largest Contentful Paint under 2.0s on simulated 4G.
- Cumulative Layout Shift under 0.05. Every image needs explicit dimensions.
- All images served as WebP or AVIF through `next/image`. Hero image gets `priority`, everything else lazy loads.
- No client side JavaScript on pages that do not need it. Service pages should be almost entirely server components.
- Fonts loaded with `display: swap` and preloaded.

---

## 14. Build order

Stop at each checkpoint, deploy a Vercel preview, and show me before continuing.

**Phase 1. Foundation.** Repo, Next.js, Tailwind, fonts, color tokens, the spacing scale, and a `/styleguide` route rendering every token and base component. *Checkpoint: I want to see the styleguide.*

**Phase 2. Content model.** All files in `/content` with real data for the eleven services, brands, site, team, reviews. Copy migrated from the current site, placeholders clearly marked where I still owe you content. *Checkpoint: I review the data files.*

**Phase 3. Shell.** Header, desktop services dropdown, full screen mobile menu, footer, sticky mobile call bar. *Checkpoint: navigate the empty shell on a phone.*

**Phase 4. Home.** All ten sections including the checklist hero animation. *Checkpoint.*

**Phase 5. Services.** Index page and the detail template, including the brand card and related services. *Checkpoint: check that a null `brandId` renders nothing and does not leave a gap.*

**Phase 6. Quote form.** Full multi step flow plus the API route and emails. *Checkpoint: submit a real test lead end to end.*

**Phase 7. Remaining pages.** Club, About with the timeline and team, Careers, Contact, 404.

**Phase 8. SEO and redirects.** Metadata, schema, sitemap, robots, every redirect in the table.

**Phase 9. Polish.** Lighthouse, real device testing, reduced motion, keyboard pass, alt text audit.

---

## 15. Assets I owe you

- Logo files in SVG, both the full lockup and a compact mark for mobile
- Exact brand hex codes
- Portfolio company logos: Classic Shine, New-View, The Furies, Cross Courts
- Real job photography for each of the eleven services, plus before and after pairs where possible
- Team headshots for the six people currently missing one
- Club and court photography
- Business hours
- Acquisition years for the timeline
- Confirmation of the brand to service mapping
- Resend API key and sending domain

Until these arrive, use clearly labeled placeholders. Do not use stock photography and do not generate fake logos.

---

## 16. Constraints

Things not to do:

- No component library, no Bootstrap, no jQuery.
- No carousels, no sliders except the deliberate before and after component, no accordions outside the FAQ.
- No parallax, no counting up numbers, no typewriter effects, no scroll jacking.
- No gradients, no glassmorphism, no neon, no dark mode toggle.
- No cookie banner unless we add analytics that require one.
- No wide letter spaced all caps outside the mono eyebrow style.
- No stock photography.
- No invented statistics, awards, certifications, or customer counts. If a number is not in this document, ask me.
- No lorem ipsum in anything you show me. Use plausible draft copy and mark it as draft.
- No `any` in TypeScript.

---

## 17. Acceptance checklist

Before calling it done:

- [ ] Every page usable one handed on a 375px screen
- [ ] Sticky call bar visible on mobile on every page and covering nothing
- [ ] Adding a twelfth service requires editing only `services.ts` and dropping in images
- [ ] A service with `brandId: null` renders no brand card and no empty space
- [ ] Quote form pre selects the correct service when reached from a service page
- [ ] Every legacy URL 301s correctly
- [ ] Lighthouse mobile scores hit the targets in section 13
- [ ] Full keyboard pass with no traps and visible focus throughout
- [ ] Every image has meaningful alt text
- [ ] Test lead arrives in the inbox with the right services listed
- [ ] No placeholder content left unmarked