/**
 * Post.body's shape (Prisma stores it as untyped Json). Block-based rather
 * than raw HTML so the admin editor stays a set of plain textareas, not a
 * WYSIWYG. Inline **bold** and [text](url) links are parsed out of any
 * block's text at render time — see parseInline below — rather than
 * needing separate mark-up UI, per CLAUDE.md's "Support headings,
 * paragraphs, bold, links and lists."
 */
export type RichTextBlock =
  | { type: "paragraph"; text: string }
  | { type: "subhead"; text: string }
  | { type: "list"; items: string[] }
  | { type: "blank" };

export type InlineSegment =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "link"; text: string; href: string };

const INLINE_PATTERN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

/** Splits "some **bold** and a [link](https://x.com)" into typed segments. */
export function parseInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(INLINE_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      segments.push({ kind: "text", text: text.slice(lastIndex, index) });
    }
    if (match[1] !== undefined) {
      segments.push({ kind: "bold", text: match[1] });
    } else {
      segments.push({ kind: "link", text: match[2], href: match[3] });
    }
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ kind: "text", text: text.slice(lastIndex) });
  }
  return segments;
}

export function isRichTextBlockArray(value: unknown): value is RichTextBlock[] {
  return (
    Array.isArray(value) &&
    value.every(
      (block) =>
        block &&
        typeof block === "object" &&
        typeof (block as { type?: unknown }).type === "string",
    )
  );
}
