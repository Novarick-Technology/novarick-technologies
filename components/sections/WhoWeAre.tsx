/**
 * Confirmed against Homepage's instance only (desktop node 437:4023,
 * mobile node 501:4). Reused across other pages per CLAUDE.md's page
 * list, but their copy hasn't been pulled yet — text is a prop, not
 * hardcoded, so this stays literal per-page rather than assumed reusable
 * copy.
 *
 * The highlighted span is Jost Regular on desktop but Jost Medium on
 * mobile — a real per-breakpoint difference, not a single "highlight"
 * style scaled down.
 */
export function WhoWeAre({
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
  const before = text.slice(0, index);
  const after = text.slice(index + highlight.length);

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-[60px] lg:px-20 lg:py-16">
      <p className="text-center font-body text-[22px] leading-[30px] tracking-[-0.44px] text-text-body lg:w-[1078px] lg:text-[40px] lg:leading-[55px] lg:tracking-[-0.8px]">
        {before}
        <span className="font-medium text-green lg:font-normal">{highlight}</span>
        {after}
      </p>
    </div>
  );
}
