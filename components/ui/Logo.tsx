import Image from "next/image";

export function Logo({
  tone = "black",
  className = "",
}: {
  tone?: "black" | "white";
  className?: string;
}) {
  const src = tone === "black" ? "/logo/novarick-black.svg" : "/logo/novarick-white.svg";
  // Aspect ratio differs slightly between the two lockups in the source file
  // (3.86:1 black, 3.33:1 white) — intrinsic size lets each keep its own ratio.
  const [width, height] = tone === "black" ? [100, 26] : [146, 44];
  // No default h-auto/w-auto here: Tailwind resolves competing classes on
  // the same CSS property by stylesheet order, not className string order,
  // so a default here can silently beat a caller's own size override
  // (this is exactly what made the Hero mobile logo render at its full
  // intrinsic 146x44 instead of the intended 72x21.6 — node 499:7).
  // Callers without a size override get the raw width/height attributes,
  // which is the correct full intrinsic size for that usage (e.g. Footer).
  return (
    <Image
      src={src}
      alt="Novarick Technologies"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
