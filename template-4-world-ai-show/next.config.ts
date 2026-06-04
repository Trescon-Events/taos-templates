import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — page cannot be embedded in iframes on other domains
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop browsers sniffing MIME types — prevents drive-by download attacks
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Controls how much referrer info is sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Force HTTPS for 1 year (enable once domain + SSL are confirmed live)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Disable browser features not needed by this site
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Content Security Policy — allows own assets + trusted third parties only
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: own domain + KonfHub widget + HubSpot forms
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://konfhub.com https://js.hsforms.net https://js.hs-scripts.com https://www.youtube.com",
      // Styles: own domain + inline (needed for CSS-in-JS)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: own domain + randomuser.me (testimonials) + KonfHub speaker photos
      "img-src 'self' data: blob: https://randomuser.me https://media.konfhub.com",
      // iframes: KonfHub + HubSpot share forms + YouTube
      "frame-src https://konfhub.com https://share.hsforms.com https://www.youtube.com https://www.youtube-nocookie.com",
      // Connections: own domain + KonfHub API + HubSpot API
      "connect-src 'self' https://konfhub.com https://api.hsforms.com https://forms.hubspot.com",
      // Media: own domain (hero video)
      "media-src 'self'",
      // Block all plugins (Flash etc.)
      "object-src 'none'",
      // Force HTTPS for all subresources
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
