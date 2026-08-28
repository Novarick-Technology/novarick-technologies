# Novarick Technologies — Admin

Internal dashboard for managing portfolio projects, blog posts, testimonials, and reading contact form submissions. Built into the same Next.js app, not a separate service.

Read `CLAUDE.md` first for design tokens and stack.

---

## Access

No login screen, per the brief. That means one thing has to be true instead: **the routes must not be publicly reachable.**

An unauthenticated `/admin` on a live domain will be found. Bots crawl `/admin`, `/dashboard` and `/wp-admin` continuously. Anyone who lands on it can publish to the site and read every contact submission — real names, emails, phone numbers and free-text messages from prospective clients. Under Nigeria's NDPA that is a reportable breach.

So: implement middleware gated by an environment variable.

```ts
// middleware.ts
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] }
```

Behaviour:

- `ADMIN_PROTECTION=off` — routes open. Use this locally.
- `ADMIN_PROTECTION=basic` — HTTP Basic Auth against `ADMIN_USER` and `ADMIN_PASSWORD`. **Default for production.**

Basic Auth is roughly fifteen lines, needs no login page, no session handling and no database table. The browser remembers it. It is not a login screen in any way that costs you time, and it is the difference between a private tool and a public one.

Also add for every admin route:

```
X-Robots-Tag: noindex, nofollow
```

and exclude `/admin` from `sitemap.ts` and `robots.ts`.

If you decide you want it fully open in production regardless, set `ADMIN_PROTECTION=off` there — the switch exists. It should be a decision, not an accident.

---

## Schema

Prisma, Postgres on Neon.

```prisma
model Project {
  id             String   @id @default(cuid())
  slug           String   @unique
  title          String
  meta           String   // "INSURANCE - 2026"
  summary        String   // card body, ~2 sentences
  coverUrl       String
  tags           String[] // PRODUCT, DESIGN, ENGINEERING, HOSTED BY US

  aboutProject   String
  challenge      String
  approach       String
  product        String
  technology     String
  infrastructure String
  outcome        String

  productRole        String
  designRole         String
  engineeringRole    String
  infrastructureRole String

  published      Boolean  @default(false)
  order          Int      @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  excerpt     String
  coverUrl    String
  body        Json     // rich text
  publishedAt DateTime?
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Testimonial {
  id        String   @id @default(cuid())
  quote     String
  name      String   // "Operations lead"
  role      String   // "Novarick Group business"
  approved  Boolean  @default(false)
  published Boolean  @default(false)
  order     Int      @default(0)
  createdAt DateTime @default(now())
}

model Submission {
  id        String   @id @default(cuid())
  fullName  String
  email     String
  phone     String?
  need      String   // "What do you need"
  details   String   // "Give us more details"
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

The seven case-study fields on `Project` and the four role fields map one to one onto the Portfolio details design. Keep them as separate columns rather than a JSON blob — the template is fixed, and separate fields let the admin form mirror it exactly.

`Testimonial.approved` is deliberately separate from `published`. Quotes attributed to named roles at real businesses need sign-off from the person quoted before they go live. Nothing renders on the site unless both flags are true.

---

## Routes

```
/admin                      dashboard — counts, recent submissions
/admin/projects             list, reorder, toggle published
/admin/projects/new
/admin/projects/[id]
/admin/posts                list, toggle published
/admin/posts/new
/admin/posts/[id]
/admin/testimonials         list, approve, toggle published, reorder
/admin/testimonials/new
/admin/testimonials/[id]
/admin/submissions          list, filter unread, search
/admin/submissions/[id]     full detail, mark read
```

Server Actions for all mutations. No separate API layer.

---

## Interface

The admin does not need to match the marketing design. It needs to be fast to use. Reuse the tokens — Inter, the lime for primary actions, `#F2F2F2` panels, 12px input radius — but build plain forms, not the marketing components.

Every editor is a single-column form with a sticky action bar holding Save, Save and publish, and Delete. Delete asks for confirmation.

The project editor should present the seven case-study fields in the same order they appear on the live page: About Project, The challenge, The approach, The product, The technology, The infrastructure, The outcome. Then the four role fields. Label them exactly as they render on the site so there is no guessing about what goes where.

Show a live character count on `summary` and `excerpt`. Both sit in fixed-height card layouts on the site and long values will overflow the design. Aim for 120–160 characters on `summary`, 100–140 on `excerpt`.

---

## Uploads

Vercel Blob. A single `ImageUpload` component used by both the project and post editors.

- Accept JPEG, PNG and WebP. Reject anything else on both client and server.
- Cap at 8MB before upload.
- Convert to WebP and store two widths: 1440 and 780.
- Store the returned URL on the record. Do not store binary in Postgres.
- Show a thumbnail preview with a replace and a remove action.
- Validate the actual file type server-side from the buffer, not from the filename or the client-supplied MIME type.

Cover images are 16:9 on desktop. Show the crop guide in the uploader so the wrong aspect ratio is obvious before saving.

---

## Contact form

The public form posts to a Server Action that writes a `Submission` and sends a notification email through Resend.

Validate with Zod on the server. Client-side validation is for feedback only, never the gate.

```
fullName  required, 2–100 chars
email     required, valid email
phone     optional, 7–20 chars, digits and + ( ) - space
need      required, 2–200 chars
details   required, 10–2000 chars
```

Rate limit by IP: five submissions per hour. Add a honeypot field hidden with CSS — not `display:none` on the input itself, which some bots detect, but a wrapper positioned off-screen. If it is filled, accept the request and silently discard it.

On success show the submitted state in the form card. On failure show an error and keep the entered values — do not clear the form.

Notification email goes to a `CONTACT_NOTIFY_EMAIL` address with the submission contents and a link to `/admin/submissions/[id]`.

---

## Submissions view

List sorted newest first, unread in a heavier weight. Columns: date, name, email, need, read state. Row click opens detail.

Detail shows every field, a mailto link on the email, a tel link on the phone, and a mark read toggle.

Include CSV export of the current filtered set. It will be asked for eventually and it is twenty lines.

Do not add a delete-all action. Submissions are business records and the accidental click is not worth the convenience.

---

## Data protection

The `Submission` table holds personal data belonging to real people.

- Never log submission contents to the console or to an error tracker. Log the record ID only.
- Set a retention policy and honour it. Twenty-four months is a defensible default for sales enquiries.
- The privacy policy the footer links to must state what is collected, why, how long it is kept, and how someone requests deletion.
- If a deletion request arrives, it has to be actionable. Deleting the row by ID from the admin covers it.

---

## Environment

```
DATABASE_URL
BLOB_READ_WRITE_TOKEN
RESEND_API_KEY
CONTACT_NOTIFY_EMAIL
ADMIN_PROTECTION      off | basic
ADMIN_USER
ADMIN_PASSWORD
NEXT_PUBLIC_SITE_URL
```

Verify the sending domain with Resend and configure SPF, DKIM and DMARC on the DNS. Without those, notification emails land in spam and enquiries get missed.

---

## Seeding

Seed the database from the Figma content so pages render during development. Mark everything `published: false` and testimonials `approved: false`.

The Figma file currently repeats two portfolio projects and one blog post nine times as placeholders. Seed one of each rather than reproducing the duplication.
