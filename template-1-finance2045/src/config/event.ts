// ── Template 1: Finance 2045 ────────────────────────────────────────────────
// All event-specific values live here. When generating a new site from TAOS,
// replace the values in this file. Everything else adapts automatically.
// ────────────────────────────────────────────────────────────────────────────

export const EVENT = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name:            "Finance 2045",
  short_name:      "F45",
  tagline:         "Bridging Global Capital to Indonesia's Digital Boom",
  description:     "Southeast Asia's preeminent financial summit. 7–8 July 2026, Sheraton Grand Jakarta. 1,000+ Government and Business Leaders. Co-located with World AI Show.",
  edition:         "2026",
  organiser:       "Trescon Global",

  // ── Dates ─────────────────────────────────────────────────────────────────
  date_display:    "7–8 JULY 2026",
  date_iso_start:  "2026-07-07",
  date_iso_end:    "2026-07-08",

  // ── Venue ─────────────────────────────────────────────────────────────────
  venue_name:      "Sheraton Grand",
  venue_city:      "Jakarta",
  venue_country:   "Indonesia",
  venue_display:   "SHERATON GRAND · JAKARTA, INDONESIA",
  venue_address:   "Jl. Gatot Subroto, Jakarta, Indonesia",

  // ── URLs ──────────────────────────────────────────────────────────────────
  site_url:        "https://www.finance2045.com",
  register_url:    "https://konfhub.com/checkout/wais-f45-indonesia?ticketId=93922",
  enquire_url:     "/enquire",
  cta_primary_label: "Book a Pass",
  cta_secondary_label: "Enquire Now",

  // ── Brand Colors ─────────────────────────────────────────────────────────
  colors: {
    bg_primary:    "#1F2733",     // Capital Core — app background
    bg_surface:    "#2C3644",     // Panels, sections
    bg_card:       "#243040",     // Card backgrounds
    accent:        "#00A5A3",     // Capital Flow — teal
    accent_light:  "#00bfbd",     // Teal hover
    highlight:     "#E9C268",     // Reserve Gold — stats, premium
    text_primary:  "#ffffff",
    text_muted:    "rgba(255,255,255,0.50)",
    border:        "rgba(0,165,163,0.20)",
  },

  // ── Media Assets (paths relative to /public) ─────────────────────────────
  assets: {
    logo:          "/logo.svg",        // Primary event logo (SVG)
    logo_white:    "/logo-white.svg",  // White version for dark bg
    hero_video:    "/hero-bg.webm",    // Hero background video
    hero_poster:   "/f45-golden-3.webp", // Hero poster / fallback image
    og_image:      "/og-image.jpg",    // OpenGraph 1200×630
    favicon:       "/favicon.ico",
    logo_mark:     "/wais-logo-mark.svg",
  },

  // ── Hero Stats ────────────────────────────────────────────────────────────
  stats: [
    { num: "40+",   label: "Speakers" },
    { num: "100+",  label: "Investors" },
    { num: "300+",  label: "BFSI Leaders" },
    { num: "500+",  label: "Enterprise & SMEs" },
    { num: "100+",  label: "Govt. Policy Makers" },
  ],

  // ── Navigation ────────────────────────────────────────────────────────────
  nav_top: [
    { href: "/attend",        label: "Attend" },
    { href: "/agenda",        label: "Agenda" },
    { href: "/speakers",      label: "Speakers" },
    { href: "/partners",      label: "Partners" },
    { href: "/startups",      label: "Startups" },
    { href: "/networking",    label: "Networking" },
    { href: "/knowledge-hub", label: "Knowledge Hub" },
  ],

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    tagline: "Southeast Asia's preeminent capital-markets summit.",
    email:   "delegate@finance2045.com",
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
          { label: "Agenda",    href: "/agenda" },
          { label: "Speakers",  href: "/speakers" },
          { label: "Themes",    href: "/themes" },
        ],
      },
      {
        heading: "Attend",
        links: [
          { label: "Delegate",    href: "/attend/delegate" },
          { label: "Sponsor",     href: "/attend/sponsor" },
          { label: "Exhibit",     href: "/attend/exhibit" },
          { label: "Media",       href: "/attend/media" },
        ],
      },
      {
        heading: "Partners",
        links: [
          { label: "Sponsors",      href: "/partners/sponsors" },
          { label: "Exhibitors",    href: "/partners/exhibitors" },
          { label: "Media Partners",href: "/partners/media" },
        ],
      },
      {
        heading: "Connect",
        links: [
          { label: "Knowledge Hub", href: "/knowledge-hub" },
          { label: "Networking",    href: "/networking" },
          { label: "Enquire",       href: "/enquire" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Trescon Global. All rights reserved.`,
  },

  // ── Fonts (Google Fonts or self-hosted name) ──────────────────────────────
  fonts: {
    heading: "Lufga",  // Self-hosted in /public/fonts/
    body:    "Lufga",
    google_import: null,  // null = self-hosted; set to Google Fonts URL string if needed
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title_default:  "Finance 2045 | Bridging Global Capital to Indonesia's Digital Boom",
    title_template: "%s | Finance 2045",
    keywords: [
      "Finance 2045", "Indonesia fintech summit", "BFSI conference Jakarta",
      "financial technology Indonesia", "investment summit 2026", "Trescon",
      "digital banking Indonesia", "Southeast Asia finance",
    ],
  },

  // ── Konfhub / Ticketing integration ──────────────────────────────────────
  konfhub: {
    event_id: "wais-f45-indonesia",
    api_base: "https://api.konfhub.com",
  },

  // ── TAOS Template Metadata ────────────────────────────────────────────────
  _template: {
    id:          "template-1-finance2045",
    label:       "Finance 2045",
    description: "Glassmorphism hero, dark teal + gold palette, multi-page with subnav. Best for: finance, BFSI, investment summits.",
    preview:     "/template-previews/template-1.jpg",
    tech:        ["Next.js", "Cloudflare Workers", "Konfhub API", "Lufga font"],
    pages:       ["home", "agenda", "speakers", "partners", "attend", "networking", "startups", "knowledge-hub", "blog"],
  },
}

export type EventConfig = typeof EVENT
