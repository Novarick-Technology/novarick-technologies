import type { Project, Post, Testimonial, Submission } from "@/app/generated/prisma/client";
import { getProjectDetail } from "@/lib/data/projects";
import { getBlogPost } from "@/lib/data/blog";
import { testimonials as siteTestimonials } from "@/lib/data/testimonials";

/**
 * Temporary — lets the admin UI be fully clicked through (lists, detail/
 * edit forms, the dashboard) before a real database is connected. Only
 * ever used as safeQuery's fallback, so it disappears the moment
 * DATABASE_URL points at something real; nothing here is read by the
 * public site. Remove this whole file (and the dummy fallbacks that
 * reference it) once Supabase is wired up.
 */

const now = new Date();

const kolanut = getProjectDetail("kolanut-africa")!;

export const dummyProjects: Project[] = [
  {
    id: "dummy-project-1",
    slug: kolanut.slug,
    title: kolanut.title,
    meta: kolanut.meta,
    summary: kolanut.summary,
    coverUrl: kolanut.coverUrl,
    tags: kolanut.tags,
    aboutProject: kolanut.aboutProject,
    challenge: kolanut.challenge,
    approach: kolanut.approach,
    product: kolanut.product,
    technology: kolanut.technology,
    infrastructure: kolanut.infrastructure,
    outcome: kolanut.outcome,
    productRole: kolanut.productRole,
    designRole: kolanut.designRole,
    engineeringRole: kolanut.engineeringRole,
    infrastructureRole: kolanut.infrastructureRole,
    published: true,
    order: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "dummy-project-2",
    slug: "buyback-web",
    title: "Buyback Web Application",
    meta: "REAL ESTATE - 2025",
    summary:
      "A web application where investors access the feature, start a transaction and follow every related activity in one place.",
    coverUrl: "https://placehold.co/1160x760/7a7a7a/7a7a7a.png",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
    aboutProject: "Placeholder — fill in once this project's case study is written up.",
    challenge: "Placeholder — fill in once this project's case study is written up.",
    approach: "Placeholder — fill in once this project's case study is written up.",
    product: "Placeholder — fill in once this project's case study is written up.",
    technology: "Placeholder — fill in once this project's case study is written up.",
    infrastructure: "Placeholder — fill in once this project's case study is written up.",
    outcome: "Placeholder — fill in once this project's case study is written up.",
    productRole: "Discovery, requirements, roadmap",
    designRole: "UX research, UI system",
    engineeringRole: "Web platform, transaction flow",
    infrastructureRole: "Hosting, monitoring",
    published: false,
    order: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "dummy-project-3",
    slug: "novarick-homes",
    title: "Novarick Homes Website",
    meta: "REAL ESTATE · MARKETING SITE · 2025",
    summary:
      "A complete redesign — clearer property presentation, a stronger enquiry path, and a CMS the marketing team runs themselves.",
    coverUrl: "https://placehold.co/1160x760/7a7a7a/7a7a7a.png",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
    aboutProject: "Placeholder — fill in once this project's case study is written up.",
    challenge: "Placeholder — fill in once this project's case study is written up.",
    approach: "Placeholder — fill in once this project's case study is written up.",
    product: "Placeholder — fill in once this project's case study is written up.",
    technology: "Placeholder — fill in once this project's case study is written up.",
    infrastructure: "Placeholder — fill in once this project's case study is written up.",
    outcome: "Placeholder — fill in once this project's case study is written up.",
    productRole: "Discovery, content strategy",
    designRole: "Visual design, CMS UX",
    engineeringRole: "Marketing site, CMS integration",
    infrastructureRole: "Hosting, domain, SSL",
    published: false,
    order: 2,
    createdAt: now,
    updatedAt: now,
  },
];

const referencePost = getBlogPost("what-we-check-before-we-agree-to-ship")!;

export const dummyPosts: Post[] = [
  {
    id: "dummy-post-1",
    slug: referencePost.slug,
    title: referencePost.title,
    excerpt: referencePost.excerpt,
    coverUrl: referencePost.coverUrl,
    body: referencePost.body,
    published: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "dummy-post-2",
    slug: "why-good-technology-starts-with-understanding-the-business",
    title: "Why good technology starts with understanding the business",
    excerpt:
      "Technology is easy to talk about. Building something that actually works for a business is a different challenge.",
    coverUrl: "https://placehold.co/384x280/7a7a7a/7a7a7a.png",
    body: "<p>Draft — not yet written.</p>",
    published: false,
    publishedAt: null,
    createdAt: now,
    updatedAt: now,
  },
];

export function filterDummyPosts(params: { filter?: string; q?: string }): Post[] {
  let result = dummyPosts;
  if (params.filter === "published") {
    result = result.filter((p) => p.published);
  } else if (params.filter === "draft") {
    result = result.filter((p) => !p.published);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q),
    );
  }
  return result;
}

export const dummyTestimonials: Testimonial[] = siteTestimonials.map((t, i) => ({
  id: `dummy-testimonial-${i + 1}`,
  quote: t.quote,
  name: t.name,
  role: t.role,
  approved: i === 0,
  published: i === 0,
  order: i,
  createdAt: now,
}));

export function filterDummySubmissions(params: { filter?: string; q?: string }): Submission[] {
  let result = dummySubmissions;
  if (params.filter === "unread") {
    result = result.filter((s) => !s.read);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(
      (s) => s.fullName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.need.toLowerCase().includes(q),
    );
  }
  return result;
}

export const dummySubmissions: Submission[] = [
  {
    id: "dummy-submission-1",
    fullName: "Amaka Obi",
    email: "amaka.obi@example.com",
    phone: "+234 801 234 5678",
    need: "Web application build",
    details:
      "We run a small logistics business and need a customer-facing dashboard for tracking deliveries in real time. Looking to start with a discovery call.",
    read: false,
    createdAt: now,
  },
  {
    id: "dummy-submission-2",
    fullName: "Tunde Bakare",
    email: "tunde.bakare@example.com",
    phone: null,
    need: "Technology strategy & consulting",
    details:
      "Our current system is held together with spreadsheets and WhatsApp. We need an outside read on what to fix first before committing to a full rebuild.",
    read: true,
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "dummy-submission-3",
    fullName: "Chiamaka Eze",
    email: "chiamaka.eze@example.com",
    phone: "+234 802 345 6789",
    need: "Mobile application build",
    details:
      "Looking to build a companion mobile app for our existing web platform, iOS and Android, on the same backend.",
    read: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5),
  },
];
