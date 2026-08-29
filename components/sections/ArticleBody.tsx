import type { RichTextBlock } from "@/lib/rich-text";
import { parseInline } from "@/lib/rich-text";

/**
 * Renders a blog post's rich-text body. Desktop wrapper is a narrow
 * px-[200px] inset (node 471:9436) — much narrower than the 1280 content
 * cap — while mobile is just the page's own px-16 (node 535:75). Subheads
 * are Jost Medium at the same size as body copy, not a larger heading
 * size, per CLAUDE.md. Lists and inline bold/links are supported per
 * ADMIN.md's content model but don't appear in the one reference article
 * pulled from Figma, so there's no literal instance to match styling
 * against — kept visually consistent with the surrounding paragraph copy.
 */
function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((segment, i) => {
        if (segment.kind === "bold") return <strong key={i} className="font-medium">{segment.text}</strong>;
        if (segment.kind === "link") {
          return (
            <a key={i} href={segment.href} className="underline underline-offset-2 hover:text-text-body">
              {segment.text}
            </a>
          );
        }
        return <span key={i}>{segment.text}</span>;
      })}
    </>
  );
}

export function ArticleBody({ blocks }: { blocks: RichTextBlock[] }) {
  return (
    <div className="flex w-full flex-col px-4 pb-10 lg:px-[200px] lg:pb-20">
      {blocks.map((block, i) => {
        if (block.type === "blank") {
          return <p key={i} className="font-body text-[14px] leading-[22px] lg:text-[20px] lg:leading-6">&nbsp;</p>;
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="list-disc py-1 pl-5 font-body text-[14px] leading-[22px] text-black lg:text-[20px] lg:leading-6">
              {block.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className={`font-body text-[14px] leading-[22px] text-black lg:text-[20px] lg:leading-6 ${
              block.type === "subhead" ? "font-medium" : "font-normal"
            }`}
          >
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
