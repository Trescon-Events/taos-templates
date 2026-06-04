/**
 * © 2025 Trescon Global. All Rights Reserved.
 * Proprietary and confidential. Unauthorised copying, distribution,
 * or modification of this file is strictly prohibited.
 * Designed and developed by Durga Charan for Trescon Global.
 */
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EVENT } from "@/config/event";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: EVENT.seo.title_default,
  description: EVENT.description,
  keywords: EVENT.seo.keywords.join(", "),
  openGraph: {
    title: EVENT.seo.title_default,
    description: EVENT.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      {/* © 2025 Trescon Global. All Rights Reserved. Designed & developed by Durga Charan. Unauthorised copying or reproduction of this source code is strictly prohibited. */}
      <head>
        <meta name="copyright" content="© 2025 Trescon Global. All Rights Reserved." />
        <meta name="author" content="Durga Charan — designed and developed for Trescon Global" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
