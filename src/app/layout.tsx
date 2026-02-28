import type { Metadata } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const shippori = Shippori_Mincho({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
  display: "swap",
  preload: false,
});

const zenMaru = Zen_Maru_Gothic({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-zen-maru",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Iizuna Apple Flyer Studio",
  description: "A tool to create flyers with the warmth of Iizuna Town.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${shippori.variable} ${zenKaku.variable} ${zenMaru.variable} font-serif antialiased bg-washi text-ink texture-paper min-h-screen`}
      >
        {/* SVG Filter for Ink Bleed effect (Wabi-sabi) */}
        <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
          <filter id="ink-bleed">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}
