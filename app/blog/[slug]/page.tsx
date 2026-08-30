import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { blogPostSlugs, getBlogPost } from "@/lib/data/blog";

export function generateStaticParams() {
  return blogPostSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const meta = pageMetadata(post.title, post.excerpt);
  return { ...meta, openGraph: { ...meta.openGraph, type: "article" } };
}

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />

      {/* Nodes 471:9430 desktop / 534:67 mobile. Desktop gap-32/px-200,
       * mobile gap-24/px-16 — a fixed inset, not the shared max-w-[1280px]
       * content cap used elsewhere. */}
      <div className="flex w-full flex-col items-start gap-6 px-4 py-10 lg:gap-8 lg:px-[200px] lg:pb-10 lg:pt-20">
        <Link
          href="/blog"
          className="flex shrink-0 items-center gap-1 text-[14px] text-[#7b7b7b] lg:text-[16px]"
        >
          <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} className="size-5 lg:size-6" />
          Go back to blogs
        </Link>

        <p className="font-heading text-[30px] font-medium leading-9 tracking-[-1.8px] text-black lg:text-[48px] lg:leading-[normal] lg:tracking-[-2.88px]">
          {post.title}
        </p>

        <div className="relative h-[200px] w-full overflow-hidden rounded-panel lg:h-[500px]">
          <Image
            src={post.coverDetailUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 1116px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <ArticleBody html={post.body} />

      <Section>
        <FinalCTA />
      </Section>

      <Footer />
    </>
  );
}
