import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.project.upsert({
    where: { slug: "placeholder-project" },
    update: {},
    create: {
      slug: "placeholder-project",
      title: "Placeholder Project",
      meta: "INSURANCE - 2026",
      summary:
        "Placeholder summary copy for local development. Replace with real case-study content before launch.",
      coverUrl: "https://placehold.co/1600x900",
      tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
      aboutProject: "Placeholder about-project copy.",
      challenge: "Placeholder challenge copy.",
      approach: "Placeholder approach copy.",
      product: "Placeholder product copy.",
      technology: "Placeholder technology copy.",
      infrastructure: "Placeholder infrastructure copy.",
      outcome: "Placeholder outcome copy.",
      productRole: "Placeholder product role.",
      designRole: "Placeholder design role.",
      engineeringRole: "Placeholder engineering role.",
      infrastructureRole: "Placeholder infrastructure role.",
      published: false,
      order: 0,
    },
  });

  await prisma.post.upsert({
    where: { slug: "placeholder-post" },
    update: {},
    create: {
      slug: "placeholder-post",
      title: "Placeholder Post",
      excerpt: "Placeholder excerpt copy for local development.",
      coverUrl: "https://placehold.co/1600x900",
      body: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Placeholder article body." }],
          },
        ],
      },
      published: false,
    },
  });

  await prisma.testimonial.upsert({
    where: { id: "placeholder-testimonial" },
    update: {},
    create: {
      id: "placeholder-testimonial",
      quote: "Placeholder testimonial quote for local development.",
      name: "Operations lead",
      role: "Novarick Group business",
      approved: false,
      published: false,
      order: 0,
    },
  });
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
