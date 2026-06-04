import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers has no Sharp server — unoptimized=true makes
    // next/image serve source URLs directly, eliminating /_next/image 404s.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "media.konfhub.com",
      },
    ],
  },
  async redirects() {
    return [
      // Old ecosystem routes → new /partners routes (308 permanent)
      { source: "/ecosystem/sponsors",    destination: "/partners/sponsors",          permanent: true },
      { source: "/ecosystem/exhibitors",  destination: "/partners/exhibitors",        permanent: true },
      { source: "/ecosystem/media",       destination: "/partners/media",             permanent: true },
      { source: "/ecosystem/association", destination: "/partners/associations",      permanent: true },
      // Old standalone pages
      { source: "/collaborate",           destination: "/partners",                   permanent: true },
      { source: "/experience",            destination: "/networking",                 permanent: true },
      { source: "/fintech-worldcup",      destination: "/startups/pitch-competition", permanent: true },
      { source: "/themes",                destination: "/agenda/themes",              permanent: true },
      // Old /blog kept alive — no redirect, page still exists
      { source: "/enquiry",            destination: "/enquire",                    permanent: true },
    ];
  },
};

export default nextConfig;
