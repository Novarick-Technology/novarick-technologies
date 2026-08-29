import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function ProjectCard({
  slug,
  coverUrl,
  meta,
  title,
  summary,
  tags,
}: {
  slug: string;
  coverUrl: string;
  meta: string;
  title: string;
  summary: string;
  tags: string[];
}) {
  return (
    <Link href={`/portfolio/${slug}`} className="block">
      <Card tone="light" border className="flex flex-col gap-5 p-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-[12px]">
          <Image src={coverUrl} alt="" fill className="object-cover" />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-4">
            <p className="font-heading text-[12px] font-medium text-text-body">
              {meta}
            </p>
            <div className="flex flex-col gap-3">
              <p className="font-heading text-[30px] font-medium tracking-[-1.5px] text-black">
                {title}
              </p>
              <p className="font-body text-[16px] leading-[22px] text-text-body">
                {summary}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-pill bg-white px-[11px] py-1.5 font-body text-[10px] text-text-body"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
