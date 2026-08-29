/**
 * Two confirmed configurations, not one component reused verbatim:
 *
 * - Homepage (desktop node 437:4023, mobile node 501:4): paragraph only,
 *   40px/22px, own padding (px-20 py-16 desktop, px-16 py-60 mobile).
 * - About Us (desktop node 450:5835, mobile node 524:66): an extra
 *   headline above the paragraph, and the paragraph itself drops to
 *   20px/14px — different padding again (px-80 pt-100 pb-40 desktop,
 *   px-16 py-40 mobile). Passing `headline` switches to this
 *   configuration; other pages get pulled and checked against their own
 *   instance before assuming either shape applies.
 *
 * Both configurations' highlighted span is Jost Regular on desktop but
 * Jost Medium on mobile — a real per-breakpoint difference, not a single
 * "highlight" style scaled down.
 */
function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  const index = text.indexOf(highlight);
  if (index === -1) {
    throw new Error(`WhoWeAre: highlight "${highlight}" not found in text`);
  }
  return (
    <>
      {text.slice(0, index)}
      <span className="font-medium text-green lg:font-normal">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}

export function WhoWeAre({
  text,
  highlight,
  headline,
  headlineHighlight,
}: {
  text: string;
  highlight: string;
  /** Presence switches to the About-Us-style configuration — see module comment. */
  headline?: string;
  headlineHighlight?: string;
}) {
  if (headline) {
    if (!headlineHighlight) {
      throw new Error("WhoWeAre: headlineHighlight is required when headline is set");
    }
    return (
      <div className="flex w-full flex-col items-center justify-center gap-7 px-4 py-10 text-center lg:gap-8 lg:px-20 lg:pb-10 lg:pt-[100px]">
        <p className="font-heading text-[32px] font-medium tracking-[-1.92px] text-black lg:w-[930px] lg:text-[60px] lg:leading-[66px] lg:tracking-[-3.6px]">
          <HighlightedText text={headline} highlight={headlineHighlight} />
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
