// ── Template 5: Big CIO Show & Awards ───────────────────────────────────────
// All event-specific values live here. When generating a new site from TAOS,
// replace the values in this file. Everything else adapts automatically.
// ────────────────────────────────────────────────────────────────────────────

export const EVENT = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name:        "Big CIO Show & Awards",
  short_name:  "BCS",
  tagline:     "India's Premier Summit for CIO, CISO & CDO Leaders",
  description: "Join India's largest CIO summit. 500+ senior technology executives, 27+ confirmed speakers, 100+ award categories. The 15th Edition.",
  edition:     "2026",
  edition_num: "15th",
  organiser:   "Trescon Global",

  // ── Dates ─────────────────────────────────────────────────────────────────
  date_display:    "2026 · BENGALURU",
  date_iso_start:  "2026-09-01",  // Update when confirmed
  date_iso_end:    "2026-09-02",

  // ── Venue ─────────────────────────────────────────────────────────────────
  venue_name:    "TBA",
  venue_city:    "Bengaluru",
  venue_country: "India",
  venue_display: "BENGALURU, INDIA",
  venue_address: "Bengaluru, Karnataka, India",

  // ── URLs ──────────────────────────────────────────────────────────────────
  site_url:           "https://www.bigcioshow.com",
  register_url:       "https://konfhub.com/checkout/big-cio-show-awards-2026?ticketId=93845%7C1%3B&selectedCode=MKTWEBSITE",
  enquire_url:        "/enquire",
  cta_primary_label:  "Register Now",
  cta_secondary_label:"Enquire",

  // ── Brand Colors ─────────────────────────────────────────────────────────
  colors: {
    bg_primary:    "#0D0F14",     // Deep dark
    bg_surface:    "#13151C",     // Sections
    bg_card:       "#1A1D27",     // Cards
    accent:        "#3B6FE8",     // Blue — primary accent
    accent_bright: "#5584F0",     // Blue hover
    highlight:     "#F0B732",     // Gold/amber — awards, highlights
    text_primary:  "rgba(255,255,255,0.92)",
    text_muted:    "rgba(255,255,255,0.50)",
    border:        "rgba(255,255,255,0.08)",
    border_accent: "rgba(59,111,232,0.25)",
  },

  // ── Media Assets (paths relative to /public) ─────────────────────────────
  assets: {
    logo:        "/logo.svg",
    logo_white:  "/logo-white.svg",
    hero_video:  "/hero-bg.webm",
    hero_poster: "/hero-poster.jpg",
    og_image:    "/og-image.jpg",
    favicon:     "/favicon.ico",
  },

  // ── Hero Stats ────────────────────────────────────────────────────────────
  stats: [
    { value: "400+",  label: "Attendees" },
    { value: "15+",   label: "Sponsors & Partners" },
    { value: "40+",   label: "Speakers" },
    { value: "100+",  label: "Awards" },
    { value: "30+",   label: "Media Partners" },
  ],

  // ── Discussion Themes ─────────────────────────────────────────────────────
  themes: [
    { ghost: "AI",   title: "Artificial Intelligence and Automation",  desc: "From AI strategy to enterprise-wide deployment — scaling intelligent systems, automating operations, and measuring real returns on AI investments." },
    { ghost: "SEC",  title: "Cyber Security and Risk Management",       desc: "Zero-trust frameworks, AI-powered threat intelligence, and building board-level cyber resilience in an era of sophisticated attacks." },
    { ghost: "CLD",  title: "Cloud Transformation",                     desc: "Multi-cloud and hybrid strategies, workload migration, FinOps, and aligning cloud investments with business agility." },
    { ghost: "DAT",  title: "Data & Analytics",                         desc: "Governing AI-ready data estates, real-time intelligence, and closing the gap between insight and action." },
    { ghost: "DX",   title: "Digital Business Transformation",          desc: "Modernising legacy systems, aligning IT roadmaps with business strategy, and leading change that delivers measurable enterprise outcomes." },
    { ghost: "ROI",  title: "Tech-Investments and Returns",              desc: "Optimising technology budgets, demonstrating ROI to the board, and making investment decisions that drive competitive advantage." },
    { ghost: "DEV",  title: "DevOps",                                   desc: "Moving beyond tooling to shared accountability, continuous delivery, and dev-ops-business alignment." },
    { ghost: "CHG",  title: "Continuous Change Leadership",              desc: "Building change-ready cultures, managing transformation fatigue, and sustaining momentum across multi-year enterprise programmes." },
    { ghost: "WRK",  title: "Future of Digital Workforce",              desc: "Talent strategy for the AI era, reskilling at scale, hybrid work architecture, and building teams that thrive alongside intelligent automation." },
  ],

  // ── Navigation ────────────────────────────────────────────────────────────
  nav_items: [
    { label: "Attend",        href: "/attend" },
    { label: "Agenda",        href: "/agenda" },
    { label: "Speakers",      href: "#speakers" },
    { label: "Awards",        href: "/awards" },
    { label: "Partners",      href: "/partners" },
    { label: "Knowledge Hub", href: "/knowledge-hub" },
    { label: "Networking",    href: "/networking" },
  ],

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    tagline: "India's largest forum for senior technology leaders.",
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
          { label: "Speakers", href: "#speakers" },
          { label: "Awards",   href: "/awards" },
          { label: "Themes",   href: "#themes" },
        ],
      },
      {
        heading: "Attend",
        links: [
          { label: "Register",    href: "/attend" },
          { label: "Sponsor",     href: "/attend#sponsor" },
          { label: "Exhibit",     href: "/attend#exhibit" },
          { label: "Startups",    href: "/startups" },
          { label: "Networking",  href: "/networking" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Knowledge Hub",    href: "/knowledge-hub" },
          { label: "Exhibitor Portal", href: "/exhibitor-portal" },
          { label: "Enquire",          href: "/enquire" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Trescon Global. All rights reserved.`,
  },

  // ── Fonts ─────────────────────────────────────────────────────────────────
  fonts: {
    heading: "Plus Jakarta Sans",
    body:    "Plus Jakarta Sans",
    google_import: "Plus_Jakarta_Sans:wght@400;500;600;700;800",
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title_default:  "Big CIO Show & Awards 2026 — India's Premier CIO Summit | Bengaluru",
    title_template: "%s | Big CIO Show",
    keywords: [
      "CIO summit India 2026", "Big CIO Show", "CIO conference Bengaluru",
      "CIO awards India", "enterprise technology summit", "Chief Information Officer conference",
    ],
  },

  // ── TAOS Template Metadata ────────────────────────────────────────────────
  _template: {
    id:          "template-5-big-cio-show",
    label:       "Big CIO Show",
    description: "Clean enterprise CIO/awards format, Konfhub ticketing, awards showcase, discussion themes grid. Best for: enterprise IT, CIO/CISO events, awards ceremonies.",
    preview:     "/template-previews/template-5.jpg",
    tech:        ["Next.js", "Plus Jakarta Sans", "Konfhub ticketing", "Awards module", "Themes grid"],
    pages:       ["home", "agenda", "speakers", "awards", "partners", "attend", "networking", "startups", "knowledge-hub", "exhibitor-portal"],
  },
}

export type EventConfig = typeof EVENT
