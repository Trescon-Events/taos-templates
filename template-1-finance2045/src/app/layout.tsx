import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import GlowCards from "@/components/GlowCards";
import { EVENT } from "@/config/event";

export const metadata: Metadata = {
  metadataBase: new URL(EVENT.site_url),
  title: {
    default: EVENT.seo.title_default,
    template: EVENT.seo.title_template,
  },
  description: EVENT.description,
  keywords: EVENT.seo.keywords,
  authors: [{ name: EVENT.organiser }],
  creator: EVENT.organiser,
  publisher: EVENT.organiser,
  alternates: { canonical: EVENT.site_url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: EVENT.site_url,
    siteName: EVENT.name,
    title: EVENT.seo.title_default,
    description: EVENT.description,
    images: [{ url: EVENT.assets.og_image, width: 1200, height: 630, alt: `${EVENT.name} — ${EVENT.venue_city}, ${EVENT.date_display}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: EVENT.seo.title_default,
    description: EVENT.description,
    images: [EVENT.assets.og_image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload all Lufga weights to break CSS-discovered font chain */}
        <link rel="preload" href="/fonts/LufgaRegular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/LufgaMedium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/LufgaSemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/LufgaBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/LufgaExtraBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/LufgaBlack.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Preload hero poster — LCP element */}
        <link rel="preload" as="image" href={EVENT.assets.hero_poster} />
        {/* Favicon */}
        <link rel="icon" href={EVENT.assets.favicon} sizes="any" />
        <link rel="icon" href={EVENT.assets.logo_mark} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={EVENT.assets.logo_mark} />
      </head>
      <body>
        <GlowCards />
        <Navbar />
        <SubNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
