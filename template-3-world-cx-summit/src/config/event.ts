// ── Template 3: World CX Summit & Awards ────────────────────────────────────
// All event-specific values live here. When generating a new site from TAOS,
// replace the values in this file. Everything else adapts automatically.
// ────────────────────────────────────────────────────────────────────────────

export const EVENT = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name:        "World CX Summit & Awards",
  short_name:  "WCX",
  tagline:     "The Future of Customer Experience",
  description: "The premier customer experience summit bringing together 400+ CX leaders, innovators, and technology partners.",
  edition:     "2026",
  organiser:   "Trescon Global",

  // ── Dates ─────────────────────────────────────────────────────────────────
  date_display:    "4 JUNE 2026",
  date_iso_start:  "2026-06-04",
  date_iso_end:    "2026-06-04",

  // ── Venue ─────────────────────────────────────────────────────────────────
  venue_name:    "TBA",
  venue_city:    "Bengaluru",
  venue_country: "India",
  venue_display: "BENGALURU, INDIA",
  venue_address: "Bengaluru, Karnataka, India",

  // ── URLs ──────────────────────────────────────────────────────────────────
  site_url:           "https://www.worldcxsummit.com",
  register_url:       "https://konfhub.com/checkout/world-cx-summit-awards?ticketId=93844%7C1%3B&selectedCode=MKTWEBSITE",
  sponsor_enquire_url:"/attend?tab=sponsor#enquire-form",
  speak_enquire_url:  "/attend?tab=speaker#enquire-form",
  cta_primary_label:  "Register Now",
  cta_secondary_label:"Speak at the Summit",

  // ── Brand Colors ─────────────────────────────────────────────────────────
  colors: {
    bg_primary:    "#0A1628",     // Deep navy
    bg_surface:    "#0F1E38",     // Section backgrounds
    bg_card:       "#152233",     // Card backgrounds
    accent:        "#36BCB0",     // Teal — primary accent
    accent_light:  "#4ECFC4",     // Teal hover
    highlight:     "#C9A84C",     // Gold — stats, awards
    highlight_light:"#DBC06A",    // Gold hover
    text_primary:  "rgba(255,255,255,0.88)",
    text_muted:    "rgba(255,255,255,0.58)",
    border:        "rgba(255,255,255,0.10)",
    border_accent: "rgba(54,188,176,0.30)",
  },

  // ── Media Assets (paths relative to /public) ─────────────────────────────
  assets: {
    logo:        "/logo.svg",
    logo_white:  "/logo-white.svg",
    hero_video:  "/videos/hero-bg.webm",
    hero_poster: "/hero-poster.jpg",
    og_image:    "/og-image.jpg",
    favicon:     "/favicon.ico",
  },

  // ── Hero Stats ────────────────────────────────────────────────────────────
  stats: [
    { num: "400+", label: "Attendees",         delay: 0   },
    { num: "15+",  label: "Sponsors",          delay: 100 },
    { num: "40+",  label: "Speakers",          delay: 200 },
    { num: "100+", label: "Award Categories",  delay: 300 },
    { num: "30+",  label: "Media Partners",    delay: 400 },
  ],

  // ── Navigation ────────────────────────────────────────────────────────────
  nav_items: [
    { label: "Attend",        href: "/attend" },
    { label: "Agenda",        href: "/agenda" },
    { label: "Speakers",      href: "/speakers" },
    { label: "Awards",        href: "/awards" },
    { label: "Partners",      href: "/partners" },
    { label: "Blog",          href: "/blog" },
    { label: "Knowledge Hub", href: "/knowledge-hub" },
  ],

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    tagline: "Connecting CX leaders, innovators, and technology partners across Asia.",
    email: "cx@worldcxsummit.com",
    social: {
      linkedin:  "https://www.linkedin.com/company/trescon-global/",
      twitter:   "https://twitter.com/TresconGlobal",
      instagram: "https://www.instagram.com/tresconglobal/",
    },
    columns: [
      {
        heading: "Programme",
        links: [
          { label: "Agenda",   href: "/agenda" },
          { label: "Speakers", href: "/speakers" },
          { label: "Awards",   href: "/awards" },
        ],
      },
      {
        heading: "Attend",
        links: [
          { label: "Register",  href: "/attend" },
          { label: "Sponsor",   href: "/attend?tab=sponsor" },
          { label: "Exhibit",   href: "/attend?tab=exhibit" },
          { label: "Speak",     href: "/attend?tab=speaker" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Blog",          href: "/blog" },
          { label: "Knowledge Hub", href: "/knowledge-hub" },
          { label: "Networking",    href: "/networking" },
          { label: "Enquire",       href: "/enquire" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Trescon Global. All rights reserved.`,
  },

  // ── Fonts ─────────────────────────────────────────────────────────────────
  fonts: {
    heading:       "Plus Jakarta Sans",
    body:          "Plus Jakarta Sans",
    google_import: "Plus_Jakarta_Sans:wght@400;500;600;700;800",
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title_default:  "World CX Summit & Awards 2026 — Bengaluru",
    title_template: "%s | World CX Summit",
    keywords: ["CX summit", "customer experience", "Bengaluru", "India", "CX awards", "Trescon"],
  },

  // ── TAOS Template Metadata ────────────────────────────────────────────────
  _template: {
    id:          "template-3-world-cx-summit",
    label:       "World CX Summit",
    description: "Clean enterprise design, navy + teal + gold, rolling digit stats, cursor glow effect, Vercel Blob for assets. Best for: CX, enterprise tech, awards events.",
    preview:     "/template-previews/template-3.jpg",
    tech:        ["Next.js", "Vercel Blob", "Plus Jakarta Sans", "CursorGlow"],
    pages:       ["home", "agenda", "speakers", "awards", "partners", "attend", "blog", "networking", "knowledge-hub"],
  },
}

export type EventConfig = typeof EVENT
