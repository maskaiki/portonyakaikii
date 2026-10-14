import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont, serifFont } from "@/lib/fonts";
import { SiteShell } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rifky Wicaksana",
    template: "%s | Rifky Wicaksana",
  },
  description:
    "Informatics Engineering student building at the intersection of software, AI/data, blockchain, and creative technology. Technology × Creativity.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#20261a",
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
