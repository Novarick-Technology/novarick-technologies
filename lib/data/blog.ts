/**
 * Placeholder blog data — real content is DB-driven per ADMIN.md (the
 * BlogPost model, body as rich text). The Figma file repeats one post
 * nine times as a placeholder (CLAUDE.md); seeded once here and reused
 * for every card, matching that.
 *
 * Body blocks: "paragraph" and "subhead" (Jost Medium at the same size
 * as surrounding body copy, per CLAUDE.md — not a larger heading size).
 * The reference article's four Jost:Medium lines (nodes under 471:9436 /
 * 535:75) are the quoted question and the three title-case lines; a
 * blank block reproduces the source's blank spacer paragraphs between
 * blocks.
 */
export type BlogBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "subhead"; text: string }
  | { type: "blank" };

export type BlogPostSummary = {
  slug: string;
  coverUrl: string;
  date: string;
  title: string;
  excerpt: string;
};

export type BlogPostDetail = BlogPostSummary & {
  coverDetailUrl: string;
  body: BlogBodyBlock[];
};

const placeholderCover = "https://placehold.co/384x280/7a7a7a/7a7a7a.png";
const placeholderCoverDetail = "https://placehold.co/1160x760/7a7a7a/7a7a7a.png";

const referencePost: BlogPostDetail = {
  slug: "what-we-check-before-we-agree-to-ship",
  coverUrl: placeholderCover,
  coverDetailUrl: placeholderCoverDetail,
  date: "12th August, 2026",
  title: "What we check before we agree to ship",
  excerpt: "The pre-flight list we run on an",
  body: [
    { type: "paragraph", text: "Technology is easy to talk about. Building something that actually works for a business is a different challenge." },
    { type: "paragraph", text: "At Novarick Technologies, we've learned that the best solutions rarely start with “What technology should we use?”" },
    { type: "blank" },
    { type: "paragraph", text: "They start with a much simpler question:" },
    { type: "blank" },
    { type: "subhead", text: "“What problem are we actually trying to solve?”" },
    { type: "blank" },
    { type: "paragraph", text: "Every business has its own way of working. Different customers. Different teams. Different constraints. And sometimes, the problem isn't that a business needs more technology—it's that the technology it already has isn't working hard enough for it." },
    { type: "blank" },
    { type: "paragraph", text: "That's where we come in." },
    { type: "blank" },
    { type: "subhead", text: "Building for the reality, not the idea" },
    { type: "blank" },
    { type: "paragraph", text: "A product can look great in a presentation and still fail when it meets the real world." },
    { type: "paragraph", text: "People miss steps. Teams change. Customers behave differently from what was expected. Processes that seemed simple on paper turn out to have five more layers behind them." },
    { type: "blank" },
    { type: "paragraph", text: "This is why we believe technology should be built around the reality of a business—not around assumptions." },
    { type: "paragraph", text: "We spend time understanding how a business operates, where things slow down, what customers struggle with, and where technology can genuinely make a difference." },
    { type: "blank" },
    { type: "subhead", text: "Shipping is only the beginning" },
    { type: "blank" },
    { type: "paragraph", text: "For us, launching a product isn't the finish line." },
    { type: "paragraph", text: "Once something is live, we get to see how people actually use it. We see what works, what doesn't, and what needs to change." },
    { type: "blank" },
    { type: "paragraph", text: "That feedback matters. Because when you're responsible for what you build, you can't simply hand over the product and walk away. You have to live with it and that changes the way you build." },
    { type: "blank" },
    { type: "subhead", text: "Technology with something to prove" },
    { type: "blank" },
    { type: "paragraph", text: "We're not interested in building technology just because we can. We want to build systems, products, and digital experiences that help businesses operate better, serve their customers better, and create room for what comes next." },
    { type: "blank" },
    { type: "paragraph", text: "The build matters. But what happens after the build matters even more." },
    { type: "blank" },
    { type: "paragraph", text: "That's what Beyond the Build is about—sharing the lessons, ideas, challenges, and perspectives that come from building technology for real businesses." },
  ],
};

export const blogPosts: BlogPostSummary[] = Array.from({ length: 9 }, () => referencePost);

export const blogPostSlugs: string[] = [referencePost.slug];

export function getBlogPost(slug: string): BlogPostDetail | undefined {
  return referencePost.slug === slug ? referencePost : undefined;
}
