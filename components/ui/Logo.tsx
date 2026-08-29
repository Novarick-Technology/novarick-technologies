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
  return (
    <Image
      src={src}
      alt="Novarick Technologies"
      width={width}
      height={height}
      className={`h-auto w-auto ${className}`}
      priority
    />
  );
}
