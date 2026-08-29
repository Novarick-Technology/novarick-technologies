import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client.js";
import { getProjectDetail } from "../lib/data/projects";
import { getBlogPost } from "../lib/data/blog";
import { testimonials } from "../lib/data/testimonials";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Seeds from the confirmed Figma content already pulled into lib/data/*
 * for the marketing pages, per ADMIN.md: "Seed the database from the
 * Figma content... Seed one of each rather than reproducing the
 * duplication" (the source repeats two projects and one post nine times
 * as placeholders). Everything lands published: false / approved: false —
 * a real person still has to review and flip it live.
 */
async function main() {
  const project = getProjectDetail("kolanut-africa");
  if (!project) throw new Error("kolanut-africa project data not found in lib/data/projects.ts");

  await prisma.project.upsert({
    where: { slug: project.slug },
    update: {},
    create: {
      slug: project.slug,
      title: project.title,
      meta: project.meta,
      summary: project.summary,
      coverUrl: project.coverUrl,
      tags: project.tags,
      aboutProject: project.aboutProject,
      challenge: project.challenge,
      approach: project.approach,
      product: project.product,
      technology: project.technology,
      infrastructure: project.infrastructure,
      outcome: project.outcome,
      productRole: project.productRole,
      designRole: project.designRole,
      engineeringRole: project.engineeringRole,
      infrastructureRole: project.infrastructureRole,
      published: false,
      order: 0,
    },
  });

  const post = getBlogPost("what-we-check-before-we-agree-to-ship");
  if (!post) throw new Error("reference blog post not found in lib/data/blog.ts");

  await prisma.post.upsert({
    where: { slug: post.slug },
    update: {},
    create: {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverUrl: post.coverUrl,
      body: post.body,
      published: false,
    },
  });

  for (const [index, testimonial] of testimonials.entries()) {
    await prisma.testimonial.upsert({
      where: { id: `seed-testimonial-${index}` },
      update: {},
      create: {
        id: `seed-testimonial-${index}`,
        quote: testimonial.quote,
        name: testimonial.name,
        role: testimonial.role,
        approved: false,
        published: false,
        order: index,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
