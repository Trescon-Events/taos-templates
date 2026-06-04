import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EVENT } from "@/config/event";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: EVENT.seo.title_default,
  description: EVENT.description,
  keywords: EVENT.seo.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: "#080A0C" }}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
