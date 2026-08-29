# Novarick Technologies — Website

Marketing site + lightweight admin for Novarick Technologies. Built to a Figma
design (1440px desktop / 390px mobile) and a written spec — see
[`CLAUDE.md`](./CLAUDE.md) for the full design system, page list and build
order, and [`ADMIN.md`](./ADMIN.md) for the admin/data-model spec. Read those
two files before making changes — they're the source of truth for design
decisions, not this README.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.ts` (see
  `app/globals.css`)
- **Prisma 7** + Postgres (Supabase), using the `pg` driver adapter
- **Vercel Blob** + **sharp** for image uploads (admin — converts to WebP
  at two widths on upload)
- **Resend** for transactional email (Contact form notifications)
- **Cal.com Platform atoms** for booking (not yet built)

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL at minimum to run Prisma commands
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site renders and builds without a database connection — Prisma is only
needed once you're running `npm run db:seed`, `prisma studio`, etc. against a
real Supabase database.

### Useful commands

```bash
npm run dev       # dev server
npm run build     # production build (also typechecks + lints)
npm run lint      # eslint only
npx prisma studio # browse the database
npx prisma db seed # seed placeholder Project/Post/Testimonial rows
```

## Project structure

```
app/                       Routes (App Router) — the marketing site's pages
                             (Home, About, What we do, Infrastructure,
                             Portfolio, Blog, Contact, Pricing) live directly
                             under app/, one folder per route.
  globals.css               Design tokens as CSS variables, mapped through
                             Tailwind v4's @theme. Read this before adding
                             any new color/radius/font value.
  layout.tsx                Root layout — loads Inter/Jost/DM Sans/Dela
                             Gothic One via next/font/google.
  admin/                     The admin dashboard — see below. Everything
                             under app/admin/** is gated by middleware.ts
                             and deliberately doesn't share the marketing
                             page/layout tree.
    layout.tsx                Admin chrome (sidebar) + `dynamic =
                               "force-dynamic"`, inherited by every admin
                               route so nothing here is ever prerendered.
    page.tsx                   Dashboard — counts, recent submissions.
    projects/ posts/            One folder per resource: page.tsx (list),
    testimonials/ submissions/   new/page.tsx, [id]/page.tsx, actions.ts
                                 (Server Actions — no separate API layer,
                                 per ADMIN.md), and a *Form.tsx client
                                 component shared by the new/edit pages.
    upload-image.ts             Shared Server Action behind the ImageUpload
                                 component — validates the file server-side
                                 from the decoded buffer, converts to WebP,
                                 uploads two widths to Vercel Blob.

middleware.ts               Admin auth gate — ADMIN_PROTECTION=off (open,
                             local dev) or "basic" (HTTP Basic Auth,
                             production default). Matches /admin/:path* and
                             /api/admin/:path*; see ADMIN.md's Access section.

components/
  ui/                        Reusable primitives with no page-specific
                             content: Section, Button, Card, NumberedCard,
                             KVRow, ListRow, Navbar, Footer, Logo,
                             MobileMenuDrawer.
  cards/                     Composite cards built from ui/ primitives, each
                             tied to a Prisma model: ProjectCard, ArticleCard,
                             PricingCard, TestimonialCard.
  sections/                  Larger page-specific blocks that are either
                             unique to one page (Hero) or reused verbatim
                             across several (InfrastructureInner, FinalCTA,
                             WhoWeAre) per CLAUDE.md.
  admin/                     Admin-only primitives — deliberately separate
                             from ui/, since ADMIN.md calls for plain forms,
                             not the marketing components: AdminButton,
                             AdminSidebar, PageHeader, StatCard, SaveBar,
                             PublishToggle, ReorderButtons, ImageUpload,
                             BlockEditor (the Post body rich-text editor),
                             MarkReadButton, and form/ (Field, TextAreaField,
                             Toggle).

lib/
  rich-text.ts               RichTextBlock type (Post.body's shape) and the
                             inline **bold**/[link](url) parser — shared by
                             the admin BlockEditor and the public ArticleBody
                             renderer, so both sides agree on the format.
  admin/                     slug.ts, csv.ts — small helpers used only by
                             the admin routes.

prisma/
  schema.prisma              Project / Post / Testimonial / Submission models.
  migrations/                 Initial migration (generated statically —
                              no live DB was available when it was created).
  seed.ts                     Seeds one placeholder row per model, matching
                              ADMIN.md's seeding rules.

lib/
  prisma.ts                  Prisma client singleton (pg adapter, Supabase-ready).

docs/
  component-inventory.md     Cross-page audit of every recurring visual
                              pattern in the Figma file, resolved to one
                              canonical component each. Read this before
                              building a new primitive — it likely already
                              exists or is documented as a deliberate
                              variant.
```

## Design system

Every token (`--lime`, `--r-card`, `--font-heading`, etc.) lives in
`app/globals.css` and is documented with its source in `CLAUDE.md`. Never
hardcode a hex value or pixel radius in a component — if the token you need
doesn't exist yet, add it to `globals.css` first, matching CLAUDE.md's naming
convention.

Two breakpoints are designed in Figma: mobile (390px, the default/unprefixed
Tailwind classes throughout this codebase) and desktop (1440px, `lg:`
prefix). There is no tablet design — `md:` is used sparingly for a
conservative intermediate layout per CLAUDE.md's guidance, not for pixel-
accurate tablet frames that don't exist.

**A rule this codebase follows strictly**: component code should match the
literal Figma data (colors, spacing, breakpoint differences) rather than
interpolating or assuming one breakpoint from another. Where the two
breakpoints genuinely differ in ways that look like they shouldn't (e.g. a
different font weight, a skipped list item, a button rendering a different
literal string), that's usually intentional and called out in a code
comment with the Figma node ID it was checked against — don't "fix" it
without checking the source first.

## Environment variables

See `.env.example`. `ADMIN_PROTECTION=off` is the local default; production
must use `basic` (see `ADMIN.md`'s Access section — this is a hard
requirement, not a suggestion, given the personal data the contact form and
admin routes handle).

## What's built so far

Homepage only. See `CLAUDE.md`'s Build order section for what's next
(About Us, What we do, Infrastructure, then Portfolio/Blog, Contact,
Booking, Pricing, Admin, SEO, accessibility pass).
