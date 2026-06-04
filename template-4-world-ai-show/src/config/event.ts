// ── Template 4: World AI Show ────────────────────────────────────────────────
// All event-specific values live here. When generating a new site from TAOS,
// replace the values in this file. Everything else adapts automatically.
// ────────────────────────────────────────────────────────────────────────────

export const EVENT = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name:        "World AI Show",
  short_name:  "WAIS",
  tagline:     "Architecting Indonesia's Sovereign & Scalable AI Future",
  description: "The premier AI event in Southeast Asia. Bringing together 1,000+ business and tech leaders to shape the future of AI in the region.",
  edition:     "2026",
  organiser:   "Trescon Global",

  // ── Dates ─────────────────────────────────────────────────────────────────
  date_display:    "7–8 JULY 2026",
  date_iso_start:  "2026-07-07",
  date_iso_end:    "2026-07-08",

  // ── Venue ─────────────────────────────────────────────────────────────────
  venue_name:    "Sheraton Grand",
  venue_city:    "Jakarta",
  venue_country: "Indonesia",
  venue_display: "SHERATON GRAND JAKARTA, INDONESIA",
  venue_address: "Jl. Gatot Subroto, Jakarta, Indonesia",

  // ── URLs ──────────────────────────────────────────────────────────────────
  site_url:           "https://www.worldaishow.com/indonesia",
  register_url:       "https://konfhub.com/checkout/wais-indonesia-2026",
  enquire_url:        "/enquire",
  aftermovie_url:     "https://www.youtube.com/watch?v=-ZnPXlSqUbQ",
  cta_primary_label:  "Register for 2026",
  cta_secondary_label:"Watch 2025 Aftermovie",

  // ── Brand Colors ─────────────────────────────────────────────────────────
  colors: {
    bg_primary:    "#F5F0EB",     // Warm off-white — unique light theme
    bg_surface:    "#EDE8E2",     // Slightly darker surface
    bg_dark:       "#060b24",     // Deep navy for dark sections
    bg_card:       "#050c2a",     // Card dark backgrounds
    accent_blue:   "#1b9ad6",     // Electric blue — data streams, links
    accent_green:  "#c0f43c",     // Lime green — CTAs, highlights
    accent_purple: "#a78bfa",     // Purple — decorative
    text_dark:     "#1a1f4e",     // Dark navy text on light bg
    text_light:    "rgba(255,255,255,0.90)",
    text_muted:    "rgba(255,255,255,0.60)",
    border:        "rgba(26,31,78,0.12)",
  },

  // ── Media Assets (paths relative to /public) ─────────────────────────────
  assets: {
    logo:        "/wais-logo.svg",
    logo_dark:   "/wais-logo-dark.svg",
    hero_video:  "/videos/hero-bg.webm",
    hero_poster: "/hero-poster.jpg",
    og_image:    "/og-image.jpg",
    favicon:     "/favicon.ico",
  },

  // ── Hero Stats (in AboutSection) ─────────────────────────────────────────
  stats: [
    { value: 1000, suffix: "+", label: "Business & Tech Leaders" },
    { value: 40,   suffix: "+", label: "Sponsors & Exhibitors" },
    { value: 40,   suffix: "+", label: "Speakers" },
    { value: 40,   suffix: "+", label: "Media & Association Partners" },
  ],

  // ── Navigation ────────────────────────────────────────────────────────────
  nav_items: [
    { label: "Speakers",      href: "/speakers" },
    { label: "Agenda",        href: "/agenda" },
    { label: "Partners",      href: "/partners" },
    { label: "Register",      href: "/register" },
    { label: "Enquire",       href: "/enquire" },
    { label: "Knowledge Hub", href: "/knowledge-hub" },
  ],

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    tagline: "The premier AI event in Southeast Asia.",
    social: {
      linkedin:  "https://www.linkedin.com/company/trescon-global/",
      twitter:   "https://twitter.com/TresconGlobal",
      instagram: "https://www.instagram.com/tresconglobal/",
      youtube:   "https://www.youtube.com/@TresconGlobal",
    },
    columns: [
      {
        heading: "Programme",
        links: [
          { label: "Speakers",  href: "/speakers" },
          { label: "Agenda",    href: "/agenda" },
          { label: "Partners",  href: "/partners" },
        ],
      },
      {
        heading: "Attend",
        links: [
          { label: "Register",  href: "/register" },
          { label: "Enquire",   href: "/enquire" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Knowledge Hub", href: "/knowledge-hub" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Trescon Global. All rights reserved.`,
  },

  // ── Fonts ─────────────────────────────────────────────────────────────────
  fonts: {
    heading: "Space Grotesk",
    body:    "Inter",
    google_import: "Space_Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600",
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title_default:  "World AI Show Indonesia 2026 | Jakarta",
    title_template: "%s | World AI Show Indonesia",
    keywords: ["World AI Show", "Indonesia", "Jakarta", "AI Conference", "Artificial Intelligence", "Southeast Asia"],
  },

  // ── TAOS Template Metadata ────────────────────────────────────────────────
  _template: {
    id:          "template-4-world-ai-show",
    label:       "World AI Show",
    description: "Distinctive light-bg hero with animated data streams, parallax scroll, dark stats section. Best for: AI, tech, innovation events. Unique warm off-white aesthetic.",
    preview:     "/template-previews/template-4.jpg",
    tech:        ["Next.js", "Space Grotesk", "Inter", "SVG data-stream animation", "Parallax scroll"],
    pages:       ["home", "speakers", "agenda", "partners", "register", "enquire", "knowledge-hub"],
  },
}

export type EventConfig = typeof EVENT
