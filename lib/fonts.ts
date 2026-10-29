import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Hanya preload 1 font utama agar FCP & LCP di Mobile Slow 4G instan
export const displayFont = localFont({
  src: "../public/fonts/MonaSans-Variable.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "200 900",
  preload: true,
});

export const serifFont = localFont({
  src: "../public/fonts/Brier-Bold.woff2",
  variable: "--font-serif",
  display: "swap",
  weight: "100 900",
  preload: false,
});

export const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
