import type { Metadata } from "next";
import { Inter, Jost, DM_Sans, Dela_Gothic_One } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Novarick Technologies",
  description:
    "Novarick Technologies is the technology delivery and infrastructure arm of Novarick Group.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jost.variable} ${dmSans.variable} ${delaGothicOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
