import type { Metadata } from "next";
import { Inter, Jost, DM_Sans, Dela_Gothic_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const inter = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-date-sans",
  subsets: ["latin"],
});

const delaGothicOne = Dela_Gothic_One({
  variable: "--font-date-display",
  subsets: ["latin"],
  weight: "400",
});

const description =
  "Novarick Technologies is the technology delivery and infrastructure arm of Novarick Group. We build, deploy, host and operate durable technology for real businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Novarick Technologies",
    template: "%s | Novarick Technologies",
  },
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Novarick Technologies",
    title: "Novarick Technologies",
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Novarick Technologies",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jost.variable} ${dmSans.variable} ${delaGothicOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
