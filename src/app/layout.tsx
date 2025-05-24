import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navigation from "./components/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cristian Jay",
  description: "Personal portfolio website of Cristian Jay - Developer & Designer",
  keywords: ["Cristian Jay", "portfolio", "developer", "designer"],
  authors: [{ name: "Cristian Jay" }],
  icons: {
    icon: "/jack.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-zinc-950 font-sans antialiased min-h-screen flex flex-col">
        <header className="bg-zinc-950/50 backdrop-blur text-white shadow-lg sticky top-0 z-50 border-b border-zinc-500/20">
          <div className="container mx-auto px-4">
            <Navigation />
          </div>
        </header>
        
        <main className="flex-1 text-white ">
          {children}
        </main>
        
        {/* <footer className="bg-zinc-800 text-white text-center py-6 mt-auto">
          <div className="container mx-auto px-4">
            <p className="text-sm">
              © {new Date().getFullYear()} Cristian Jay. All rights reserved.
            </p>
          </div>
        </footer> */}
        
        <Analytics />
      </body>
    </html>
  );
}
