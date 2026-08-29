# Component inventory

Cross-referenced against all 12 desktop frames + 12 mobile frames on the "Website Design"
page (file `TAJ0j8I2mJfXwDlDw05tX7`). Figma layer names are inconsistent across pages —
"What we do" is reused for at least four structurally different sections, generic frames
are named "Card" / "Row" / "KV" / "G" everywhere — so this resolves everything to one
canonical primitive per visual pattern, per CLAUDE.md's instruction. Node IDs are cited
so any of these can be re-checked against the source frame.

## Primitives (build these first — matches CLAUDE.md's primitive list)

### `Section`
Full-bleed wrapper. Every top-level block on every page (Hero, Who we are, What we do,
Infrastructure inner, Portfolio, Tracks, Pricing, Testimonials, Insights, Final CTA,
Footer) is one of these. Needs:
- `tone`: `light` (paper/paper-muted bg) | `dark` (ink bg, e.g. Hero, Final CTA) | `image` (Hero, Final CTA — dark photographic/gradient background)
- `continuation`: zero top padding, per CLAUDE.md's list (Detail on About Us, What we do on the What we do page, grid sections on Portfolio/Blog list)

### `Navbar`
Confirmed identical structure on every inner page (`Navbar` frame present on all 11
non-homepage desktop frames, e.g. `458:7025`, `466:7723`, `486:3507`) and on Homepage via
Hero. Desktop: pill containing logo (`NOVARICK TECHLOGIES LOGO BLACK 1`), 6 links (About,
What We Do, Infrastructure, Portfolio, Pricing, Blogs), and a `Button / Start a Project`
CTA ("Book a Strategy Call") — dark pill, lime knob. Mobile (`529:5`, etc.): `Navbar pill`
collapses to Logo + `Menu / Hamburger`, no links. **Mobile drawer is not designed** — build
per CLAUDE.md's guidance (full-screen black overlay, 24px Inter Medium links, lime CTA,
close top-right, fade + slide-up) and flag for design review.

### `Footer`
Identical on every page (`437:4430`, `486:3606`, mobile `525:797`, etc.): `Brand` column
(logo + one-line description), three link columns (`Capability`, `Infrastructure`,
`Company`), and a `Bottom` bar (copyright + tagline). Build once.

### `Button`
Three variants confirmed visually (Hero screenshot, node `450:5410`):
- **`primary`** — lime fill, black text, black circular knob with lime arrow. Figma
  instances named `Button / Primary` (18 occurrences) and `Button / Start a Project`
  (16 occurrences, always the navbar CTA — same variant, different copy).
- **`dark`** — ink/black pill fill, white text, **lime** knob (navbar CTA on the Hero
  reads as this against the light pill — actually the navbar CTA itself uses a dark pill
  fill regardless of section tone: confirm fill is `--ink-deep` not pure black at build
  time). Use for CTAs that need to sit on a light section without lime's contrast
  problem.
- **`ghost`** — transparent fill, white 1px border, white text, no knob. Confirmed on
  Hero ("EXPLORE OUR WORK") and Final CTA ("EXPLORE INFRASTRUCTURE") — dark/image
  backgrounds only, per CLAUDE.md.

`Knob` is a nested sub-element (32–40px depending on context, per CLAUDE.md's 40px token)
whose fill/arrow colour depends on the parent button's fill — implement as a prop-driven
child, not a separate component.

### `Card`
Two fill variants confirmed side by side in the same grid (`466:8124`, `437:4291`):
- **light** — `--paper-muted` (#F2F2F2) fill, black/dark-gray text
- **dark** — `--ink` (#131313) fill, white/lime text

Both use `--r-card` (24px) radius. Underlies `NumberedCard`, `TestimonialCard`, and the
plain bordered white card used in the Portfolio-details roles card.

### `NumberedCard`
Card + eyebrow + title + body. Two content sub-variants found:
- **paragraph body** — "What we do" 4-card grids (Homepage `466:8124`, About Us `450:6988`
  as 6 cards, What we do page `466:7661` as 4, Infrastructure `466:7829` as 8): eyebrow is
  a plain `01`/`02`/... number, body is a paragraph.
- **list body** — Tracks section (`437:4291`, 3 cards): eyebrow is `TRACK 01` (lime on the
  dark card, gray on light cards), body is a bulleted list instead of a paragraph.

Card count varies per page (4/6/8/3) — the primitive must not assume a fixed grid size.

### `KVRow`
Confirmed on About Us `Detail` (`450:6751`, 4 rows: Mission/Vision/Our approach/Why
Novarick Technologies), What we do page Detail (4 rows), Infrastructure Detail, Pricing
terms Detail (`486:3743`, 5 rows), and Portfolio-details case-study card (7 rows: About
Project/Challenge/Approach/Product/Technology/Infrastructure/Outcome — the seven fields
from `Project` in ADMIN.md, confirming the schema maps 1:1). Top divider line, label
column fixed-width on desktop per CLAUDE.md (280–326px), stacked with 12px gap on mobile.

### `ListRow`
Confirmed in `PricingCard`'s feature list (`488:4241`, 5 `Item` rows, ~48px each, no
visible bullet/number in the render — plain divided rows) and in the Pricing/mobile
"terms" `List`. CLAUDE.md's "optionally with a leading number or dot" — this instance
uses neither; keep those as opt-in props, not defaults.

## Page-specific composite cards (build once, reused where noted)

### `ProjectCard`
Confirmed on Portfolio list (`466:8668`, 2-up `Row` of cards) and reused as "Other
Projects" on Portfolio details, and as the Homepage Portfolio section (3-up). Structure:
16:9 cover (`Shot`), meta line (e.g. "INSURANCE - 2026"), title, 2-sentence summary, and
a `Tags` row of pill chips (PRODUCT / DESIGN / ENGINEERING / HOSTED BY US) — matches
`Project.tags` in ADMIN.md exactly.

### `ArticleCard`
Confirmed on Blog list (`471:9611`, 3×3 grid across three `Grid` frames) and reused in
Homepage "Insights" (3-up). Structure: cover, date line, title, excerpt.

### `PricingCard`
Confirmed on Pricing page (`488:4233`/`488:4175`/`487:3867`, 3 cards: Managed retainer /
Build project / Consulting) and duplicated on Homepage's `Tracks`-adjacent pricing block
and mobile `Plans`. Structure: title, price block (`FROM` / amount / `per month` — matches
CLAUDE.md's Price type role), description, `ListRow` list, `Button / Primary` CTA.

### `TestimonialCard`
Confirmed identical on every page that has a Testimonials section (Homepage `437:4366`,
About Us `450:6133`, Contact `482:533`, Book call `482:1168`, 3-up every time). Light
`--paper-muted` card, quote, then name (bold, black) + role (gray) — matches
`Testimonial.name`/`Testimonial.role` in ADMIN.md.

### Booking-specific (Cal.com atom wrappers, not custom-built per CLAUDE.md)
- **Calendar** (`482:1275`–`482:1356`): ~30 day cells (`Container`, 83×28) — maps to
  Cal.com's date-picker atom.
- **Time slots** (`482:1281` onward): grid of `Button` cells (68×65) — maps to Cal.com's
  slot-picker atom. Preserve the 40%-opacity-plus-`aria-disabled` treatment for
  unavailable slots per the accessibility notes.
- **Date tile** (confirmed on Book call confirmed — Mobile, `538:74`, 112×112): month
  abbreviation (DM Sans), large day number (Dela Gothic One), weekday (DM Sans) — the
  **only** component using those two fonts, per CLAUDE.md.

## Notes for the primitives build (step 3)

- Card counts per grid are data-driven (3, 4, 6, or 8) — don't hardcode column counts
  into `NumberedCard`'s container; that belongs to the page-level grid.
- `NumberedCard`'s two content variants (paragraph vs. bullet list) and two eyebrow
  styles (plain number vs. `TRACK ##` label) should be props, not separate components.
- Button `dark` variant's exact fill needs confirming against `--ink` vs `--ink-deep`
  when building the primitive — pull `get_design_context` on one instance at build time
  rather than guessing from the screenshot alone.
