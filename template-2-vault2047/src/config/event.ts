// ── Template 2: Vault 2047 ──────────────────────────────────────────────────
// All event-specific values live here. When generating a new site from TAOS,
// replace the values in this file. Everything else adapts automatically.
// ────────────────────────────────────────────────────────────────────────────

export const EVENT = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name:            "Vault 2047",
  short_name:      "V47",
  tagline:         "Where Cyber Defence Meets National Strategy",
  headline_line1:  "WHERE",
  headline_main:   "CYBER DEFENCE",
  headline_line3:  "MEETS NATIONAL STRATEGY",
  description:     "India's flagship global cybersecurity resilience platform. Where policy, technology, and capital converge to build the next generation of cybersecurity ecosystems. Mumbai, India.",
  edition:         "2026",
  organiser:       "Trescon Global",

  // ── Dates ─────────────────────────────────────────────────────────────────
  date_display:    "SEPTEMBER 2026",
  date_detail:     "2-DAY SUMMIT",
  date_iso_start:  "2026-09-15",
  date_iso_end:    "2026-09-16",

  // ── Venue ─────────────────────────────────────────────────────────────────
  venue_name:      "Jio World Convention Centre",
  venue_city:      "Mumbai",
  venue_country:   "India",
  venue_display:   "JIO WORLD CONVENTION CENTRE, MUMBAI",
  venue_address:   "G Block BKC, Bandra Kurla Complex, Mumbai, Maharashtra 400051",

  // ── URLs ──────────────────────────────────────────────────────────────────
  site_url:        "https://www.vault2047.com",
  register_url:    "#register",
  enquire_url:     "#contact",
  cta_primary_label:   "Apply to Attend",
  cta_secondary_label: "Enquire",

  // ── Brand Colors ─────────────────────────────────────────────────────────
  colors: {
    bg_primary:    "#020F0F",     // Deep dark — hero bg
    bg_surface:    "#13130E",     // Stats bar, sections
    bg_nav:        "#1E2323",     // Navbar background
    accent:        "#0D6665",     // Teal — primary accent
    accent_dim:    "#0A4F4E",     // Teal dim
    highlight:     "#B86A2E",     // Copper/orange — stats, CTAs
    highlight_light: "#C97A3A",   // Copper hover
    text_primary:  "#F0EDE8",
    text_secondary:"rgba(240,237,232,0.55)",
    text_dim:      "rgba(240,237,232,0.30)",
    border:        "rgba(240,237,232,0.08)",
    border_accent: "rgba(184,106,46,0.30)",
  },

  // ── Media Assets (paths relative to /public) ─────────────────────────────
  assets: {
    logo:         "/vault-logo.png",    // Primary event logo
    logo_white:   "/vault-logo.png",    // (same on dark bg)
    hero_video:   "/vault-highlights.webm",
    hero_poster:  "/vault-hero-poster.jpg",
    og_image:     "/og-image.jpg",
    favicon:      "/favicon.ico",
  },

  // ── Hero Stats ────────────────────────────────────────────────────────────
  stats: [
    { target: 2000, label: "Attendees",           suffix: "+" },
    { target: 100,  label: "Exhibitors",          suffix: "+" },
    { target: 50,   label: "Global Cyber Leaders",suffix: "+" },
    { target: 100,  label: "Investors & Funds",   suffix: "+" },
    { target: 25,   label: "Countries",           suffix: "" },
  ],

  // ── Navigation ────────────────────────────────────────────────────────────
  nav_items: [
    {
      label: "Attend",
      links: [
        { label: "Overview",           href: "#about" },
        { label: "Delegates",          href: "#register" },
        { label: "Sponsors",           href: "#partners" },
        { label: "Media",              href: "#media" },
        { label: "Associations",       href: "#partners" },
        { label: "FAQs",               href: "#faqs" },
      ],
    },
    {
      label: "Agenda",
      links: [
        { label: "Overview",     href: "#agenda" },
        { label: "Full Agenda",  href: "#agenda" },
        { label: "Themes",       href: "#themes" },
      ],
    },
    {
      label: "Ecosystem",
      links: [
        { label: "Overview",     href: "#partners" },
        { label: "Sponsors",     href: "#partners" },
        { label: "Exhibitors",   href: "#partners" },
        { label: "Media Partners", href: "#media" },
      ],
    },
    {
      label: "Knowledge Hub",
      links: null,
      href: "#media",
    },
  ],

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    tagline: "India's flagship global cybersecurity resilience platform. Where policy, technology, and capital converge.",
    social: {
      twitter:   "https://twitter.com/TresconGlobal",
      linkedin:  "https://www.linkedin.com/company/trescon-global/",
      facebook:  "https://www.facebook.com/TresconGlobal",
    },
    columns: [
      {
        heading: "Event",
        links: [
          { label: "About Vault 2047",    href: "#about" },
          { label: "Agenda",              href: "#agenda" },
          { label: "Speakers",            href: "#speakers" },
          { label: "Exhibition",          href: "#partners" },
          { label: "Mumbai Accord",       href: "#roadmap" },
        ],
      },
      {
        heading: "Participate",
        links: [
          { label: "Register as Delegate", href: "#register" },
          { label: "Speak at Vault",        href: "#contact" },
          { label: "Exhibit / Partner",     href: "#contact" },
          { label: "Media Accreditation",   href: "#contact" },
          { label: "Group Registration",    href: "#register" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Press Releases", href: "#media" },
          { label: "Media Kit",      href: "#media" },
          { label: "Event Reports",  href: "#media" },
          { label: "FAQs",           href: "#faqs" },
          { label: "Contact",        href: "#contact" },
        ],
      },
    ],
    trescon_stats: [
      { num: "500,000+", label: "Attendees" },
      { num: "10,000+",  label: "Enterprises" },
      { num: "5,000+",   label: "Exhibitors" },
      { num: "3,500+",   label: "Investors" },
      { num: "3,000+",   label: "Speakers" },
      { num: "100+",     label: "Countries" },
      { num: "50+",      label: "Governments" },
    ],
    copyright: `© ${new Date().getFullYear()} Trescon Global. All rights reserved.`,
  },

  // ── Fonts ─────────────────────────────────────────────────────────────────
  fonts: {
    heading: "Orbitron",
    body:    "IBM Plex Sans",
    google_import: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap",
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title_default:  "Vault 2047 — India's Flagship Global Cybersecurity Resilience Platform",
    title_template: "%s | Vault 2047",
    keywords: ["cybersecurity", "India", "CISO", "cyber defence", "critical infrastructure", "Vault 2047"],
  },

  // ── Database (Neon/Postgres) ──────────────────────────────────────────────
  db: {
    tables: {
      speakers:     "speakers",
      agenda:       "agenda",
      partners:     "partners",
      exhibitors:   "exhibitors",
      testimonials: "testimonials",
      blogs:        "blogs",
    },
  },

  // ── TAOS Template Metadata ────────────────────────────────────────────────
  _template: {
    id:          "template-2-vault2047",
    label:       "Vault 2047",
    description: "Cyber/tech dark theme, Orbitron headlines, copper + teal palette, full admin panel with DB-backed content (speakers, agenda, exhibitors, blogs). Best for: cybersecurity, tech, enterprise summits.",
    preview:     "/template-previews/template-2.jpg",
    tech:        ["Next.js", "Neon Postgres", "Framer Motion", "Lenis scroll", "Admin panel"],
    pages:       ["home", "speakers", "agenda", "partners", "exhibitors", "media", "blog", "register", "admin"],
  },
}

export type EventConfig = typeof EVENT
