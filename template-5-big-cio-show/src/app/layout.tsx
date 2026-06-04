import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EVENT } from "@/config/event";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: EVENT.seo.title_default,
  description: EVENT.description,
  keywords: EVENT.seo.keywords,
  openGraph: {
    title: EVENT.seo.title_default,
    description: EVENT.description,
    type: "website",
    locale: "en_IN",
    siteName: EVENT.name,
    url: EVENT.site_url,
    images: [{ url: EVENT.assets.og_image }],
  },
  twitter: {
    card: "summary_large_image",
    title: EVENT.seo.title_default,
    description: EVENT.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
