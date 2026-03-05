import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Claude Masterclass",
  description: "Master AI-assisted development with Claude — from prompting to shipping real products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-zinc-950 text-zinc-100 antialiased`}>
        <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-white hover:text-indigo-400 transition-colors">
              Claude Masterclass
            </Link>
            <span className="text-zinc-600 text-sm hidden sm:inline">
              Master AI collaboration, one lesson at a time
            </span>
          </div>
        </header>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
