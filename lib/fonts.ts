import localFont from "next/font/local";
import { Inter, Manrope, Libre_Barcode_128 } from "next/font/google";

// Mona Sans Variable — exact font used by landonorris.com for condensed heavy headings
export const displayFont = localFont({
  src: "../public/fonts/MonaSans-Variable.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "200 900",
});

// Brier Bold — exact high-contrast editorial serif font used by landonorris.com
export const serifFont = localFont({
  src: "../public/fonts/Brier-Bold.woff2",
  variable: "--font-serif",
  display: "swap",
  weight: "100 900",
});

// Clean sans-serif for body/UI text
export const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Manrope for Hero "never stop creating" difference-blend display
export const manropeFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

// Libre Barcode 128 for Storm Lab HUD barcode
export const barcodeFont = Libre_Barcode_128({
  variable: "--font-barcode",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
