"use client";

import { useState } from "react";
import type { RichTextBlock } from "@/lib/rich-text";

const blockLabels: Record<RichTextBlock["type"], string> = {
  paragraph: "Paragraph",
  subhead: "Subhead",
  list: "List",
  blank: "Blank spacer",
};

function emptyBlock(type: RichTextBlock["type"]): RichTextBlock {
  if (type === "list") return { type, items: [""] };
  if (type === "blank") return { type };
  return { type, text: "" };
}

export function BlockEditor({ name, defaultValue }: { name: string; defaultValue: RichTextBlock[] }) {
  const [blocks, setBlocks] = useState<RichTextBlock[]>(defaultValue.length > 0 ? defaultValue : [emptyBlock("paragraph")]);

  function update(index: number, block: RichTextBlock) {
    setBlocks((prev) => prev.map((b, i) => (i === index ? block : b)));
  }

  function remove(index: number) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= blocks.length) return;
    setBlocks((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function add(type: RichTextBlock["type"]) {
    setBlocks((prev) => [...prev, emptyBlock(type)]);
  }

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={JSON.stringify(blocks)} />

      {blocks.map((block, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-panel border border-black/10 bg-white p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="font-heading text-[12px] font-medium text-text-body">{blockLabels[block.type]}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(i, "up")}
                disabled={i === 0}
                aria-label="Move block up"
                className="font-heading text-[12px] text-text-body hover:text-black disabled:opacity-30"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => move(i, "down")}
                disabled={i === blocks.length - 1}
                aria-label="Move block down"
                className="font-heading text-[12px] text-text-body hover:text-black disabled:opacity-30"
              >
                ▼
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="ml-2 font-heading text-[12px] text-text-body hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>

          {block.type === "paragraph" || block.type === "subhead" ? (
            <textarea
              rows={block.type === "subhead" ? 1 : 3}
              value={block.text}
              onChange={(e) => update(i, { type: block.type, text: e.target.value })}
              placeholder="Supports **bold** and [link text](https://…)"
              className="w-full resize-y rounded-input border border-black/10 bg-white px-3 py-2 font-body text-[14px] text-black focus:outline-none focus:ring-1 focus:ring-black/20"
            />
          ) : block.type === "list" ? (
            <textarea
              rows={Math.max(3, block.items.length)}
              value={block.items.join("\n")}
              onChange={(e) => update(i, { type: "list", items: e.target.value.split("\n") })}
              placeholder="One item per line"
              className="w-full resize-y rounded-input border border-black/10 bg-white px-3 py-2 font-body text-[14px] text-black focus:outline-none focus:ring-1 focus:ring-black/20"
            />
          ) : (
            <p className="font-body text-[12px] italic text-text-body">Renders as a blank spacer line.</p>
          )}
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="font-body text-[12px] text-text-body">Add:</span>
        {(["paragraph", "subhead", "list", "blank"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => add(type)}
            className="rounded-pill border border-black/10 bg-white px-3 py-1 font-heading text-[12px] text-black hover:bg-black/5"
          >
            {blockLabels[type]}
          </button>
        ))}
      </div>
    </div>
  );
}
