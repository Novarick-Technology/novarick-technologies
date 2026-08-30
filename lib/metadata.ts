import type { Metadata } from "next";

/**
 * Next doesn't merge a page's own openGraph/twitter object into the root
 * layout's — a page that declares openGraph at all REPLACES the parent's
 * entire object, dropping type/siteName/images, not just adding title
 * and description to it (confirmed: a page setting only
 * `openGraph: { title, description }` lost og:image entirely, since
 * app/opengraph-image.tsx only auto-attaches to routes that don't
 * declare their own openGraph object). Every static page's metadata
 * export should go through this rather than a bare object literal, so
 * every page's social card carries the full set, not just the two
 * fields the page cared about overriding.
 */
export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Novarick Technologies",
      title,
      description,
      images: "/opengraph-image",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
