/**
 * Confirmed configurations so far (all four "headline" instances checked
 * — About Us, What we do, Infrastructure — share identical structure,
 * sizes and padding, so this is genuinely one reusable shape, unlike the
 * paragraph-card grids):
 *
 * - Homepage (desktop node 437:4023, mobile node 501:4): paragraph only,
 *   40px/22px, own padding (px-20 py-16 desktop, px-16 py-60 mobile).
 * - About Us / What we do / Infrastructure (e.g. desktop nodes 450:5835,
 *   458:7241, 466:7791; mobile 524:66, 527:4, 529:67): headline above the
 *   paragraph, paragraph drops to 20px/14px, padding px-80 pt-100 pb-40
 *   desktop / px-16 py-40 mobile. Passing `headline` switches to this
 *   configuration. The paragraph highlight is optional here — About Us
 *   highlights "Novarick Technologies" in it, What we do and
 *   Infrastructure don't highlight anything in the paragraph at all
 *   (confirmed on both, not an oversight). The headline itself sometimes
 *   has a literal line break before the highlighted portion at desktop
 *   only (What we do, Infrastructure) — `headlineBreakBeforeHighlight`.
 *
 * Both configurations' highlighted span is Jost Regular on desktop but
 * Jost Medium on mobile — a real per-breakpoint difference, not a single
 * "highlight" style scaled down.
 */
/**
 * Portfolio list's headline highlights two separate phrases ("Problem."
 * and "Outcome.", with plain text in between and after — node 466:8298),
 * not just one. Splitting sequentially on each highlight in turn handles
 * both the one- and two-highlight cases with the same code.
 */
function HighlightedText({
  text,
  highlight,
  breakBefore = false,
}: {
  text: string;
  highlight?: string | string[];
  breakBefore?: boolean;
}) {
  if (!highlight) return <>{text}</>;
  const highlights = Array.isArray(highlight) ? highlight : [highlight];

  const parts: { text: string; isHighlight: boolean }[] = [{ text, isHighlight: false }];
  for (const h of highlights) {
    const last = parts[parts.length - 1];
    if (last.isHighlight) continue;
    const index = last.text.indexOf(h);
    if (index === -1) {
      throw new Error(`WhoWeAre: highlight "${h}" not found in text`);
    }
    parts.pop();
    parts.push({ text: last.text.slice(0, index), isHighlight: false });
    parts.push({ text: h, isHighlight: true });
    parts.push({ text: last.text.slice(index + h.length), isHighlight: false });
  }

  let highlightIndex = -1;
  return (
    <>
      {parts.map((part, i) => {
        if (!part.isHighlight) return <span key={i}>{part.text}</span>;
        highlightIndex += 1;
        return (
          <span key={i}>
            {breakBefore && highlightIndex === 0 && <br aria-hidden className="hidden lg:block" />}
            <span className="font-medium text-green lg:font-normal">{part.text}</span>
          </span>
        );
      })}
    </>
  );
}

export function WhoWeAre({
  text,
  highlight,
  headline,
  headlineHighlight,
  headlineBreakBeforeHighlight = false,
}: {
  text: string;
  /** Optional — What we do and Infrastructure's paragraphs have no
   * highlighted phrase at all, confirmed on both, not an oversight. */
  highlight?: string;
  /** Presence switches to the headline configuration — see module comment. */
  headline?: string;
  /** Portfolio list highlights two separate phrases in its headline
   * ("Problem." and "Outcome.", node 466:8298) — pass an array for that
   * case. */
  headlineHighlight?: string | string[];
  /** Literal desktop-only line break right before the highlighted portion
   * of the headline (What we do / Infrastructure; not present on About Us). */
  headlineBreakBeforeHighlight?: boolean;
}) {
  if (headline) {
    if (!headlineHighlight) {
      throw new Error("WhoWeAre: headlineHighlight is required when headline is set");
    }
    return (
      <div className="flex w-full flex-col items-center justify-center gap-7 px-4 py-10 text-center lg:gap-8 lg:px-20 lg:pb-10 lg:pt-[100px]">
        <p className="font-heading text-[32px] font-medium tracking-[-1.92px] text-black lg:w-[930px] lg:text-[60px] lg:leading-[66px] lg:tracking-[-3.6px]">
          <HighlightedText
            text={headline}
            highlight={headlineHighlight}
            breakBefore={headlineBreakBeforeHighlight}
          />
        </p>
        <p className="font-body text-[14px] leading-[22px] text-text-body lg:w-[759px] lg:text-[20px] lg:leading-7">
          <HighlightedText text={text} highlight={highlight} />
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-[60px] lg:px-20 lg:py-16">
      <p className="text-center font-body text-[22px] leading-[30px] tracking-[-0.44px] text-text-body lg:w-[1078px] lg:text-[40px] lg:leading-[55px] lg:tracking-[-0.8px]">
        <HighlightedText text={text} highlight={highlight} />
      </p>
    </div>
  );
}
