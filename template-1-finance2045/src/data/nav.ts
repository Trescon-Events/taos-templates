import { EVENT } from "@/config/event";

export const NAV_TOP: { href: string; label: string }[] = EVENT.nav_top;

// Sections with sub-pages. Key = section root path.
// /speakers and /knowledge-hub intentionally omitted (flat direct links).
export const SUB_NAV: Record<string, { href: string; label: string }[]> = {
  "/attend": [
    { href: "/attend",             label: "Overview" },
    { href: "/attend/delegate",    label: "Delegate" },
    { href: "/attend/sponsor",     label: "Sponsor" },
    { href: "/attend/exhibit",     label: "Exhibit" },
    { href: "/attend/media",       label: "Media" },
    { href: "/attend/association", label: "Association" },
    { href: "/attend/faqs",        label: "FAQs" },
  ],
  "/agenda": [
    { href: "/agenda",        label: "Overview" },
    { href: "/agenda/vision", label: "The 2045 Vision" },
    { href: "/agenda/full",   label: "Agenda" },
    { href: "/agenda/themes", label: "Themes" },
  ],
  "/partners": [
    { href: "/partners",               label: "Overview" },
    { href: "/partners/sponsors",      label: "Sponsors" },
    { href: "/partners/exhibitors",    label: "Exhibitors" },
    { href: "/partners/media",         label: "Media Partners" },
    { href: "/partners/associations",  label: "Association Partners" },
  ],
  "/startups": [
    { href: "/startups",                   label: "Overview" },
    { href: "/startups/pitch-competition", label: "Pitch Competition" },
  ],
  "/networking": [
    { href: "/networking",                label: "Overview" },
    { href: "/networking/attendee-app",   label: "Attendee App" },
    { href: "/networking/ai-matchmaking", label: "AI Matchmaking" },
    { href: "/networking/photo-gallery",  label: "Photo Gallery" },
    { href: "/networking/whatsapp",       label: "WhatsApp Networking" },
  ],
};
