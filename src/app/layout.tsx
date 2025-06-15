// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navigation from "@/components/navigation";
import LenisProvider from "@/components/lenis-provider"; // 👈 import here

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cristian Jay",
  description:
    "Personal portfolio website of Cristian Jay – Developer & Designer",
  keywords: ["Cristian Jay", "portfolio", "developer", "designer"],
  authors: [{ name: "Cristian Jay" }],
  icons: {
    icon: "/images/jack.svg",
  },
  openGraph: {
    title: "Cristian Jay",
    description:
      "Explore the portfolio of Cristian Jay – developer, designer, and creative problem-solver.",
    url: "https://cristianjay.me",
    siteName: "Cristian Jay",
    images: [
      {
        url: "https://cristianjay.me/images/thumbnail.png", // 👈 Place your image in /public
        width: 1200,
        height: 630,
        alt: "Cristian Jay Portfolio Preview",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-zinc-950 font-sans antialiased min-h-screen flex flex-col">
        {/* Lenis behavior */}
        <LenisProvider />

        <header className="bg-zinc-950/50 backdrop-blur text-white shadow-lg sticky top-0 z-50 border-b border-zinc-500/20">
          <div className="container mx-auto px-4">
            <Navigation />
          </div>
        </header>

        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
