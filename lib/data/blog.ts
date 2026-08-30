/**
 * Placeholder blog data — real content is DB-driven per ADMIN.md (the
 * Post model, body as HTML from the admin's WYSIWYG editor). The Figma
 * file repeats one post nine times as a placeholder (CLAUDE.md); seeded
 * once here and reused for every card, matching that.
 */
export type BlogPostSummary = {
  slug: string;
  coverUrl: string;
  date: string;
  title: string;
  excerpt: string;
};

export type BlogPostDetail = BlogPostSummary & {
  coverDetailUrl: string;
  body: string;
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
  body: `
<p>Technology is easy to talk about. Building something that actually works for a business is a different challenge.</p>
<p>At Novarick Technologies, we've learned that the best solutions rarely start with &ldquo;What technology should we use?&rdquo;</p>
<p>They start with a much simpler question:</p>
<h3>&ldquo;What problem are we actually trying to solve?&rdquo;</h3>
<p>Every business has its own way of working. Different customers. Different teams. Different constraints. And sometimes, the problem isn't that a business needs more technology&mdash;it's that the technology it already has isn't working hard enough for it.</p>
<p>That's where we come in.</p>
<h3>Building for the reality, not the idea</h3>
<p>A product can look great in a presentation and still fail when it meets the real world.</p>
<p>People miss steps. Teams change. Customers behave differently from what was expected. Processes that seemed simple on paper turn out to have five more layers behind them.</p>
<p>This is why we believe technology should be built around the reality of a business&mdash;not around assumptions.</p>
<p>We spend time understanding how a business operates, where things slow down, what customers struggle with, and where technology can genuinely make a difference.</p>
<h3>Shipping is only the beginning</h3>
<p>For us, launching a product isn't the finish line.</p>
<p>Once something is live, we get to see how people actually use it. We see what works, what doesn't, and what needs to change.</p>
<p>That feedback matters. Because when you're responsible for what you build, you can't simply hand over the product and walk away. You have to live with it and that changes the way you build.</p>
<h3>Technology with something to prove</h3>
<p>We're not interested in building technology just because we can. We want to build systems, products, and digital experiences that help businesses operate better, serve their customers better, and create room for what comes next.</p>
<p>The build matters. But what happens after the build matters even more.</p>
<p>That's what Beyond the Build is about&mdash;sharing the lessons, ideas, challenges, and perspectives that come from building technology for real businesses.</p>
`.trim(),
};

export const blogPosts: BlogPostSummary[] = Array.from({ length: 9 }, () => referencePost);

export const blogPostSlugs: string[] = [referencePost.slug];

export function getBlogPost(slug: string): BlogPostDetail | undefined {
  return referencePost.slug === slug ? referencePost : undefined;
}
