/**
 * Placeholder project data — the real content is DB-driven per ADMIN.md
 * (the Project model). Only "kolanut-africa" has confirmed literal
 * case-study copy from Figma (node 474:10086 desktop / 532:67 mobile);
 * the other three only appear as list-card placeholders in the source
 * (their own case-study pages were never designed), so their detail
 * fields are left undefined rather than invented — the details page
 * 404s for those slugs until real content exists.
 */
export type ProjectSummary = {
  slug: string;
  coverUrl: string;
  meta: string;
  title: string;
  summary: string;
  tags: string[];
};

export type ProjectDetail = ProjectSummary & {
  coverDetailUrl: string;
  aboutProject: string;
  challenge: string;
  approach: string;
  product: string;
  technology: string;
  infrastructure: string;
  outcome: string;
  productRole: string;
  designRole: string;
  engineeringRole: string;
  infrastructureRole: string;
};

const placeholderCover = "https://placehold.co/1160x760/7a7a7a/7a7a7a.png";

export const projects: (ProjectSummary | ProjectDetail)[] = [
  {
    slug: "kolanut-africa",
    coverUrl: placeholderCover,
    coverDetailUrl: placeholderCover,
    meta: "INSURANCE - 2026",
    title: "Kolanut Africa Web Application",
    summary:
      "An insurtech platform where customers buy insurance, manage policies and track claims — with underwriter integrations.",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
    aboutProject:
      "Kolanut Africa is a web insurtech platform where customers buy insurance, manage policies and track claims — with underwriter integrations and an operations back office behind it.",
    challenge:
      "Insurance in Nigeria still moved on paper and WhatsApp. Customers could not see what they had bought, agents re-keyed the same details into three systems, and claims stalled because nobody could tell where a policy sat.",
    approach:
      "We ran discovery with agents, underwriters and customers before writing a line of code, then mapped every policy state from quote to claim payout. That state map became the product spec and, later, the database schema.",
    product:
      "A quote-to-purchase flow that issues a policy in minutes, a customer dashboard for documents and renewals, an agent workspace, and a claims journey that shows the customer exactly what stage they are at.",
    technology:
      "A web platform on a service layer with a structured policy database, payments through a local gateway, and direct integrations into underwriter rating and policy systems.",
    // Note: "backups nightly with a tested restore procedure" — kept
    // literal per the standing direction to follow Figma copy strictly.
    infrastructure:
      "Deployed to a Novarick-managed environment with separate production, staging and development stacks. HTTPS and DNS managed by us, uptime and error rates monitored, backups nightly with a tested restore procedure.",
    outcome:
      "Policy issuance moved from days to minutes, agents work in one system instead of three, and the operations team can answer a claim status question without opening a spreadsheet.",
    productRole: "Discovery, requirements, roadmap, product management",
    designRole: "UX research, journey design, UI system, prototypes",
    engineeringRole:
      "Web platform, customer dashboard, payment and underwriter APIs, claims workflow",
    infrastructureRole:
      "Production and staging environments, managed database, domain and SSL, monitoring, nightly backups",
  },
  {
    slug: "buyback-web",
    coverUrl: placeholderCover,
    meta: "REAL ESTATE - 2025",
    title: "Buyback Web Application",
    summary:
      "A web application where investors access the feature, start a transaction and follow every related activity in one place.",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
  },
  {
    slug: "buyback-mobile",
    coverUrl: placeholderCover,
    meta: "REAL ESTATE - 2025",
    title: "Buyback Mobile Application",
    summary:
      "A cross-platform application for iOS and Android on the same API layer as the web product, with status updates pushed as they happen.",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
  },
  {
    slug: "novarick-homes",
    coverUrl: placeholderCover,
    meta: "REAL ESTATE · MARKETING SITE · 2025",
    title: "Novarick Homes Website",
    summary:
      "A complete redesign — clearer property presentation, a stronger enquiry path, and a CMS the marketing team runs themselves.",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
  },
];

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  const project = projects.find((p) => p.slug === slug);
  if (project && "aboutProject" in project) return project;
  return undefined;
}
