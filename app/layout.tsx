import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont, serifFont } from "@/lib/fonts";
import { SiteShell } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KAIKI — Digital Creative | Design & Development",
    template: "%s | KAIKI — Digital Creative",
  },
  description:
    "Portfolio of Mohammad Rifky Wicaksana (Kaiki) — Informatics Engineering student, freelance graphic designer, and social media strategist. Crafting experiences at the intersection of code and creativity.",
  openGraph: {
    title: "KAIKI — Digital Creative",
    description: "Code × Design × Content. Portfolio by Kaiki.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${serifFont.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
