import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function ArticleCard({
  slug,
  coverUrl,
  date,
  title,
  excerpt,
}: {
  slug: string;
  coverUrl: string;
  date: string;
  title: string;
  excerpt: string;
}) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      {/* border-black/10 directly — Card's `border` boolean is specifically
       * the #4D4D4D Track-card border and would be wrong here. */}
      <Card tone="light" radius="panel" className="flex flex-col gap-4 border border-black/10 px-4 pb-6 pt-4">
        {/* Literal cover dims from Figma: mobile Image is a fixed 220px tall
         * (Blog list — Mobile, node 534:73, at up to 326px wide), desktop
         * Image is 384x280 (Blog list, node 471:9612). Neither is 16:9 —
         * kept as the two literal values instead of one assumed ratio. */}
        <div className="relative h-[220px] w-full overflow-hidden rounded-panel lg:aspect-[384/280] lg:h-auto">
          <Image src={coverUrl} alt="" fill className="object-cover" />
        </div>
        <div className="flex w-full flex-col gap-3.5">
          <p className="font-body text-[12px] text-text-body">{date}</p>
          <div className="flex flex-col gap-3">
            <p className="font-heading text-[20px] font-medium leading-[26px] tracking-[-0.8px] text-black">
              {title}
            </p>
            <p className="line-clamp-1 font-body text-[16px] text-text-body">
              {excerpt}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
