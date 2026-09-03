# Novarick Technologies — Website

Marketing site for Novarick Technologies, the technology delivery and infrastructure arm of Novarick Group. Twelve pages, designed in Figma at 1440px desktop and 390px mobile. Both breakpoints are fully designed — do not invent layouts for either.

Figma file: `TAJ0j8I2mJfXwDlDw05tX7`, page "Website Design". Desktop frames and their mobile counterparts sit side by side.

---

## Stack

- Next.js 15, App Router, TypeScript
- Tailwind CSS
- Prisma + Postgres (Supabase)
- Vercel Blob for image uploads
- Motion for animation
- Resend for transactional email
- Deployed on Vercel

Do not add a UI component library. The design system here is specific and small; shadcn or MUI will fight it.

---

## Design tokens

Put these in `tailwind.config.ts` and `app/globals.css` as CSS variables before writing any component. Every value below is taken from the Figma file — do not approximate.

### Colour

```
--black            #000000
--ink              #131313   near-black cards, dark sections
--ink-deep         #0A0A0A   pricing dark card, dark buttons
--ink-soft         #343434   infrastructure feature card
--lime             #D6FD70   primary accent
--green            #6F9900   heading highlight on light backgrounds
--paper            #FFFFFF
--paper-muted      #F2F2F2   light card fill
--paper-warm       #F6F5F2   calendar text on dark

Text
--text-body        #6E7A76   default muted body on light
--text-body-alt    #4C4E4D
--text-body-deep   #4F4F4F
--text-body-soft   #666666
--text-meta        #8E8E8E   FROM / PER MONTH labels
--text-back        #7B7B7B   "Go back to blogs"
--text-on-dark     #C0C0C0
--text-on-dark-alt #D1D1D1
--text-on-dark-lo  #DFDFDF
--text-on-dark-hi  #F0F0F0
--text-dim         #A9B0AD   muted copy on dark
--text-dim-alt     #9AA3A0   card numbers on dark
--text-calendar    #DEDEDE
--text-calendar-lo #A6A49F

Lines
--line-light       #E3E3E3   KV row dividers
--line-light-alt   #E4E4E4   pricing list dividers
--line-dark        #2E2E2E   dark pricing list dividers
--line-dark-alt    #3A3A3A   infrastructure dark card
--line-cal         #323235   calendar day outline
```

### Radius

```
--r-pill    80px   buttons
--r-round   100px  time-slot buttons
--r-card    24px   feature and content cards
--r-panel   16px   article cards, pricing cards, images, process strip
--r-input   12px   form inputs
--r-cell    8px    calendar day cells
```

### Type

Headings: **Inter** (Medium 500, Regular 400).
Body: **Jost** (Regular 400, Medium 500).

Both load from `next/font/google`. Expose them as `--font-heading` and `--font-body` and reference only those variables — do not hardcode family names in components.

Jost is final, not a stand-in. Earlier drafts of this design used Satoshi; any reference to it is historical.

Jost sets optically smaller than Inter at the same point size. If body copy reads light against the Figma frames, raise the size rather than the weight — Jost Medium is noticeably heavier and will not match the design.

The date tile on the booking confirmation page uses **DM Sans** (Bold, SemiBold) and **Dela Gothic One** (Regular). Both are Google fonts. That component is the only place they appear.

Letter-spacing values below are percentages, applied via Tailwind `tracking-[-0.06em]` style arbitrary values.

| Role | Desktop | Mobile | Tracking | Font |
|---|---|---|---|---|
| Hero headline | 80/90 | 40/44 | -6% | Inter Medium |
| Section heading | 52–60 | 32/38 | -6% | Inter Medium |
| Sub-section heading | 48 | 30/36 | -6% | Inter Medium |
| Statement paragraph | 40/55 | 22/30 | -2% | Inter Medium |
| Card title large | 30 | 24 | -5% | Inter Medium |
| Card title | 28 | 22 | -5% | Inter Medium |
| Card title small | 24–26 | 20 | -4% | Inter Medium |
| KV label | 24/26 | 20/26 | -4% | Inter Medium |
| Price | 38 | 38 | -3.2% | Inter Medium |
| Body | 16–20 | 14/22 | 0 to -2% | Body font |
| Article body | 20/24 | 15/24 | 0 | Body font |
| Card body | 16/24 | 14/24 | -2% | Body font |
| Meta / eyebrow | 12 | 12 | 0 | Inter Medium |
| Tag | 10 | 10 | 0 | Body font |
| Button label | 14 | 14 | 0 | Inter Medium |
| List number | 12 | 12 | +10% | Body font |
| Calendar day name | 10 | 10 | +10% | Inter Regular |

### Layout

**Desktop (1440):** sections are full-bleed, 80px horizontal padding, content max-width 1280. Vertical padding varies by section — read it off the Figma frame rather than assuming.

**Mobile (390):** sections full-bleed, radius 0.

```
Section padding    16px horizontal, 40px vertical
Hero               16px horizontal, 24px vertical
Navbar section     16px all round
Footer             16px horizontal, 40px vertical
Card padding       16px horizontal, 24px vertical
Capability cards   24px all round (exception)
Card gap in grid   12px
Button height      48px
Button padding     20px left, 4px right, 4px vertical
Knob               40px
```

Continuation sections — where a block reads as part of the one above it — take 0 top padding. This applies to Detail on About Us, What we do on the What we do page, and the grid sections on Portfolio list and Blog list.

There is no tablet breakpoint in the design. Use `md:` at 768 to switch from the mobile layout to a two-column intermediate, then the full desktop layout at `lg:` 1024. Keep the intermediate conservative: single-column content, wider gutters.

---

## Component primitives

Build these first, before any page. Every page is assembled from them.

- `Section` — full-bleed wrapper handling the padding rules above, with a `continuation` prop for 0 top padding and a `tone` prop for light/dark/image backgrounds.
- `Button` — variants `primary` (lime fill, black text), `dark` (ink fill, white text), `ghost` (transparent, white border, used on dark image backgrounds). Optional `knob` arrow. Full-width on mobile, hug on desktop.
- `Card` — fill and radius variants covering the light `#F2F2F2` card, the dark `#131313` card, and the bordered white card.
- `NumberedCard` — eyebrow number, title, body. Used on Homepage, About Us, What we do and Infrastructure with different numbers of items.
- `KVRow` — label plus value with a top divider. Desktop puts the label in a fixed 280–326px column beside the value; mobile stacks them with a 12px gap. Used on About Us, Infrastructure, Portfolio details and Pricing.
- `ListRow` — bordered list item, optionally with a leading number or dot.
- `ProjectCard`, `ArticleCard`, `PricingCard`, `TestimonialCard`.
- `Navbar` and `Footer` — real components, used on every page.

The navbar on desktop is a pill with the logo, six links and a lime CTA. On mobile it collapses to logo plus hamburger. **The mobile menu drawer is not designed.** Build a full-screen overlay: black background, links at 24px Inter Medium stacked with 24px gaps, the lime CTA at the bottom, close button top right, fade plus slide-up on open. Flag it for design review rather than treating it as final.

---

## Pages

1. **Homepage** — Hero, Who we are, What we do (4 cards), Infrastructure inner, Portfolio, Tracks, Pricing, Testimonials, Insights, Final CTA, Footer
2. **About Us** — Navbar, Who we are, Detail, What we do (6 cards), Infrastructure inner, Testimonials, Final CTA, Footer
3. **What we do** — Navbar, Who we are, What we do (4 cards), Detail, Services (6 cards), Final CTA, Footer
4. **Infrastructure** — Navbar, Who we are, What we operate (8 cards) with nested Detail, Final CTA, Footer
5. **Portfolio list** — Navbar, Who we are, project grid, Final CTA, Footer
6. **Portfolio details** — Navbar, title, cover, case-study card, roles card, Other Projects, Final CTA, Footer
7. **Blog list** — Navbar, Who we are, article grid, Final CTA, Footer
8. **Blog details** — Navbar, back link, title, cover, article body, Final CTA, Footer
9. **Contact** — Navbar, Who we are, form card, contact details card, Testimonials, Footer. The single lead-capture path: every "Start a project" CTA site-wide links here, and a successful submission shows an in-place confirmation on the same page rather than moving elsewhere.
10. **Pricing** — Navbar, Who we are, pricing plans, terms Detail, Footer

Book call / Book call confirmed (originally pages 10–11 in the Figma file) were removed by deliberate decision — see Booking section below.

Infrastructure inner, Testimonials, Final CTA and the pricing block are identical across the pages that use them. Build each once.

---

## Content model

Portfolio, blog posts, testimonials and form submissions all come from the database. Everything else is hardcoded in the page components — it is marketing copy that changes rarely and does not justify a CMS.

Schema, admin routes and upload handling are specified in `ADMIN.md`. Read it before building any page that renders dynamic content.

Blog details renders the article body from a rich text field. Support headings, paragraphs, bold, links and lists. Subheads inside the article are Jost Medium at the same size as surrounding body copy — not a larger heading size. Four subheads appear in the reference article, with blank spacer lines between blocks.

---

## Booking

Dropped. The `/book-call` and `/book-call/confirmed` pages, `BookingWidget`, `AppointmentCard` and `lib/booking.ts` were built as static UI early in the project (Cal.com was never actually wired up — see the original plan below), then removed entirely once the decision was made to route every "Start a project" CTA straight to the Contact form instead, with an in-place success message on submission. There is currently no booking flow anywhere on the site.

If booking comes back later, the original plan was: do not build the booking backend yourself (availability, timezone handling, DST, double-booking prevention, calendar sync and invite emails are a genuine product, not a feature) — use **Cal.com Platform** with their atoms, which let you keep a designed UI while Cal owns the logic.

---

## Build order

Commit at each step.

1. Project scaffold, Tailwind config, fonts, tokens
2. Prisma schema and migration (see `ADMIN.md`)
3. Primitives listed above, in isolation
4. Navbar, Footer, mobile menu drawer
5. Homepage
6. About Us, What we do, Infrastructure
7. Portfolio list and details, Blog list and details
8. Contact form with validation and submission handling — the site's single lead-capture path (see Booking)
9. Pricing
10. Admin (see `ADMIN.md`)
11. SEO, sitemap, robots, Open Graph, analytics
12. Accessibility and performance pass

Before step 3, produce a component inventory across all twelve pages. The same card pattern recurs under different Figma layer names — resolve it to one component per pattern, not one per page.

---

## Conventions

- Server Components by default. `"use client"` only where interaction requires it: the mobile menu, the booking widget, form state, and any animated component.
- No `any`. Infer types from Prisma where possible.
- Images through `next/image` with explicit width and height. Portfolio and blog covers are 16:9 on desktop, and the mobile crops are shorter — 200 to 220px tall at 358px wide.
- Animation belongs on scroll-in reveals and hover states only. Respect `prefers-reduced-motion`.
- Every interactive element needs a visible focus ring. The lime works as a focus colour on dark, the ink on light.

---

## Things the design does not cover

Decide these deliberately rather than letting them get invented:

- Mobile menu drawer (guidance above)
- Tablet breakpoint (guidance above)
- 404 and 500 pages
- Loading and empty states for portfolio and blog lists
- Form validation, error and success states
- Privacy policy and terms pages — the footer needs to link to them, and the contact form collects names, emails and phone numbers from Nigerian users, so NDPA applies

---

## Accessibility notes

- `#D6FD70` fails WCAG AA for text on white. It is correct as a button fill with black text, and as a heading highlight on dark. Never use it as text on a light background.
- The 40% opacity time-slot buttons fail contrast. They represent unavailable slots, so mark them `aria-disabled` and do not rely on opacity alone to convey state.
- Calendar cells are 44px tall on mobile, which meets the touch-target minimum. Keep it there.
- The hamburger needs an accessible label and `aria-expanded`.

---

## Copy accuracy

Two lines make checkable factual claims and must not be reintroduced if content is regenerated:

- Anything asserting that this website itself runs on infrastructure Novarick operates. The Infrastructure page subcopy was rewritten to remove this.
- Two lines claim a restore procedure has "actually" been run. Keep them only if that drill has genuinely happened.

Portfolio outcome figures, testimonials and blog posts in the Figma file are placeholder content pending real material. Do not treat them as final copy.
