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
      <Card tone="light" border radius="panel" className="flex flex-col gap-4 px-4 pb-6 pt-4">
        <div className="relative h-[210px] w-full overflow-hidden rounded-panel md:aspect-video md:h-auto">
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
