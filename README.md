# Cross Services Group

The crossservicesgroup.com rebuild. Next.js 15 (App Router), TypeScript, Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

---

## Editing content — start here

**You do not need to touch any component to change what the site says.**
Everything editable lives in `/content` as plain, commented files.

| File | What it controls |
|---|---|
| `content/services.ts` | All eleven services. Drives the services index, every detail page, the nav dropdown, the mobile menu, the quote form checkboxes, the footer and the sitemap |
| `content/site.ts` | Phone, email, address, hours, socials, service-area towns, the Cross Guarantee wording |
| `content/brands.ts` | The portfolio companies (Classic Shine, New-View, The Furies, Cross Courts) |
| `content/team.ts` | Leadership names, titles, bios and headshots |
| `content/reviews.ts` | Customer testimonials |
| `content/timeline.ts` | The company history shown on the About page |

Colors, fonts and spacing live at the top of `app/globals.css`.

### Adding a twelfth service

1. Copy an existing block in `content/services.ts`, change the fields.
2. Drop its photos into `/public/images/services/` at the paths you named.

That is the whole job. The card, the detail page, the nav dropdown, the quote-form
checkbox, the footer link, the sitemap entry and (if you set `legacyPath`) the 301
redirect all appear on their own.

### Adding photos

Every image slot checks whether the file actually exists in `/public`. If it does, the
photo renders through `next/image`. If it does not, a labelled panel shows the exact
path being waited on. **So: save the file at the path shown on the placeholder and
refresh.** No code change, no broken image, and no stock photography in between.

See `CONTENT-STATUS.md` for the full list of what is still outstanding.

---

## Email

The quote form and the contact form both send through [Resend](https://resend.com).
Copy `.env.example` to `.env.local` and fill in the two values, and set the same two in
Vercel.

**Until those are set**, both forms validate correctly and confirm to the visitor, but
the submission is logged to the server console instead of being emailed. Check
`CONTENT-STATUS.md` before launch.

---

## How it is put together

```
/app
  page.tsx                  home
  /services                 index + [slug] detail template
  /club /about /careers /contact /quote
  /styleguide               internal reference — not linked, not indexed
  /api/quote  /api/contact  form handlers (Resend + zod + rate limit + honeypot)
  sitemap.ts  robots.ts  not-found.tsx  opengraph-image.tsx
/components
  /layout   Header, MobileMenu, StickyCallBar, Footer, Logo
  /ui       Button, Card, Section, Tag, Checkbox, Field, Media, Reveal
  /blocks   the page sections
/content    everything editable
/lib        seo.ts, images.ts, quote-schema.ts
```

**Redirects** from the old Squarespace URLs are in `next.config.ts`. The eleven service
redirects are generated from each service's `legacyPath`, so they stay in sync
automatically.

**The styleguide** at `/styleguide` shows every color, type size, spacing step and base
component in one place. It is blocked in `robots.ts` and linked from nowhere.

---

## Design notes for whoever picks this up next

- The tagline is "Cross it off your list", so the checklist is the visual motif: the
  hero list strikes itself off, service cards carry a checkbox that fills on hover,
  section eyebrows use a mono check glyph, and "What's included" lists use the same mark.
- **Blue (`#1255A2`, sampled from the logo) is the action color only** — buttons, links,
  active states, the checkbox fill. Navy is for large headlines and the footer.
- Maximum two full-bleed blue or navy sections per page.
- The only all-caps + letter-spaced style on the site is the mono eyebrow. That wide
  letter-spaced all-caps was the single biggest thing making the old site feel dated.
- The complete list of animations: fade-and-rise on scroll into view, hover lift on
  cards, the hero strike-through. All wrapped in a `prefers-reduced-motion` check.
- Mobile first. Base classes describe the 375px phone; `md:` and `lg:` add to it.

## Deploying

Push to GitHub and import the repo into Vercel. It needs no build configuration beyond
the two environment variables above.
