/**
 * Renders a blog post's rich-text body — plain HTML from the admin's
 * WYSIWYG editor (see components/admin/RichTextEditor.tsx), not a custom
 * block model. Safe to render directly: only authenticated admin writers
 * ever produce this HTML. Desktop wrapper is a narrow px-[200px] inset
 * (node 471:9436) — much narrower than the 1280 content cap — while
 * mobile is just the page's own px-16 (node 535:75). Element styling
 * (headings, lists, blockquote, code, hr, links) lives in the
 * `.article-body` rules in app/globals.css, not Tailwind classes here,
 * since the content is raw HTML rather than JSX we control per-element.
 */
export function ArticleBody({ html }: { html: string }) {
  return (
    <div
      className="article-body flex w-full flex-col px-4 pb-10 font-body text-[14px] leading-[22px] text-black lg:px-[200px] lg:pb-20 lg:text-[20px] lg:leading-6"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
