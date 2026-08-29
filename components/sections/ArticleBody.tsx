import type { BlogBodyBlock } from "@/lib/data/blog";

/**
 * Renders a blog post's rich-text body. Desktop wrapper is a narrow
 * px-[200px] inset (node 471:9436) — much narrower than the 1280 content
 * cap — while mobile is just the page's own px-16 (node 535:75). Subheads
 * are Jost Medium at the same size as body copy, not a larger heading
 * size, per CLAUDE.md.
 */
export function ArticleBody({ blocks }: { blocks: BlogBodyBlock[] }) {
  return (
    <div className="flex w-full flex-col px-4 pb-10 lg:px-[200px] lg:pb-20">
      {blocks.map((block, i) => {
        if (block.type === "blank") {
          return <p key={i} className="font-body text-[14px] leading-[22px] lg:text-[20px] lg:leading-6">&nbsp;</p>;
        }
        return (
          <p
            key={i}
            className={`font-body text-[14px] leading-[22px] text-black lg:text-[20px] lg:leading-6 ${
              block.type === "subhead" ? "font-medium" : "font-normal"
            }`}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
