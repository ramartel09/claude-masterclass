import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { getAllLessonsWithMeta } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Claude Masterclass",
  description: "Master AI-assisted development with Claude — from prompting to shipping real products.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allLessons = await getAllLessonsWithMeta();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-zinc-950 text-zinc-100 antialiased`}>
        <AppShell lessons={allLessons}>{children}</AppShell>
      </body>
    </html>
  );
}
