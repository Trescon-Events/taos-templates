"use client";
/**
 * © 2025 Trescon Global. All Rights Reserved.
 * Proprietary and confidential. Unauthorised copying, distribution,
 * or modification of this file is strictly prohibited.
 * Designed and developed by Durga Charan for Trescon Global.
 */
import { useState, useEffect } from "react";
import Link from "next/link";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function inferType(title: string): string {
  const t = title.toUpperCase();
  if (t.includes("REGISTRATION") || t.includes("NETWORKING") || t.includes("LUNCH") || t.includes("COFFEE") || t.includes("CLOSING REMARKS") || t.includes("FAREWELL")) return "networking";
  if (t.includes("FINTECH WORLD CUP") || t.includes("FINTECHWORLD") || t.includes("FWC")) return "featured";
  return "session";
}

/** Convert UTC timestamp "2026-07-07 01:00:00" to WIB (UTC+7) "HH:MM" */
function toWIBTime(utc: string | null | undefined): string {
  if (!utc) return "";
  try {
    const d = new Date(utc.replace(" ", "T") + "Z");
    const h = (d.getUTCHours() + 7) % 24;
    const m = d.getUTCMinutes();
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  } catch {
    return "";
  }
}

/** Compute duration string from two UTC timestamps */
function computeDuration(start: string | null | undefined, end: string | null | undefined): string {
  if (!start || !end) return "";
  try {
    const s = new Date(start.replace(" ", "T") + "Z");
    const e = new Date(end.replace(" ", "T") + "Z");
    const mins = Math.round((e.getTime() - s.getTime()) / 60000);
    if (mins <= 0) return "";
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  } catch {
    return "";
  }
}

async function fetchKonfHubAgenda(): Promise<AgendaDay[]> {
  try {
    const res = await fetch("/api/konfhub/agenda", { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    const days: AgendaDay[] = (json.data ?? [])
      .filter((d: any) => d.sessions && d.sessions.length > 0)
      .map((d: any, i: number) => ({
        day: `Day ${i + 1}`,
        date: new Date(d.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
        dateShort: new Date(d.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        theme: i === 0 ? "Indonesia's Financial Future" : "Capital, Technology & Sovereignty",
        sessions: d.sessions.map((s: any) => ({
          time: toWIBTime(s.start_timestamp),
          duration: computeDuration(s.start_timestamp, s.end_timestamp),
          title: s.session_title,
          type: inferType(s.session_title),
          desc: s.session_description ? stripHtml(s.session_description) : undefined,
          featured: inferType(s.session_title) === "featured",
        })),
      }));
    return days.length > 0 ? days : [];
  } catch {
    return [];
  }
}

interface AgendaDay {
  day: string;
  date: string;
  dateShort: string;
  theme: string;
  sessions: Array<{
    time: string; duration: string; title: string;
    type: string; desc?: string; featured?: boolean;
  }>;
}

const FALLBACK_AGENDA: AgendaDay[] = [
  {
    day: "Day 1",
    date: "7 July 2026",
    dateShort: "7 Jul",
    theme: "Indonesia's Financial Future",
    sessions: [
      {
        time: "08:00",
        duration: "60 min",
        title: "Registration & Welcome Coffee",
        type: "networking",
        desc: "Delegate registration, welcome refreshments, and early networking in the exhibition hall.",
      },
      {
        time: "09:00",
        duration: "45 min",
        title: "Opening Keynote: Indonesia's Emas 2045 Vision — The Financial Roadmap",
        type: "keynote",
        desc: "Setting the stage for Indonesia's journey to become the world's fourth-largest economy by 2045, with capital markets and digital finance at the core.",
        featured: true,
      },
      {
        time: "09:45",
        duration: "45 min",
        title: "Fireside Chat: Regulating the Digital Banking Revolution — OJK Perspectives",
        type: "fireside",
        desc: "A candid conversation with Indonesia's top financial regulator on balancing innovation, stability, and inclusion.",
      },
      {
        time: "10:30",
        duration: "60 min",
        title: "Panel: AI & Machine Learning in Fraud Detection and Risk Analytics",
        type: "panel",
        desc: "How leading Indonesian and regional banks are deploying AI to reduce fraud losses and sharpen credit risk models.",
      },
      {
        time: "11:30",
        duration: "30 min",
        title: "Networking & Exhibition Break",
        type: "networking",
      },
      {
        time: "12:00",
        duration: "60 min",
        title: "Keynote: The Future of QRIS — ASEAN Payment Interoperability 2026",
        type: "keynote",
        desc: "Indonesia's QRIS is already ASEAN's most ambitious payment rail. What comes next for cross-border digital payments across the region?",
      },
      {
        time: "13:00",
        duration: "90 min",
        title: "Lunch & Precision Matchmaking Sessions",
        type: "networking",
        desc: "Curated investor-founder and buyer-vendor introductions facilitated by our AI matchmaking engine.",
      },
      {
        time: "14:30",
        duration: "60 min",
        title: "Panel: Digital Credit for Indonesia's 65M+ MSMEs",
        type: "panel",
        desc: "Alternative data, embedded finance, and Buy Now Pay Later — unpacking the credit infrastructure serving Indonesia's backbone economy.",
      },
      {
        time: "15:30",
        duration: "60 min",
        title: "Session: Halal Finance & Sukuk Markets — The Islamic Fintech Opportunity",
        type: "session",
        desc: "Indonesia is the world's largest Muslim-majority nation. Shariah-compliant digital finance is the next frontier.",
      },
      {
        time: "16:30",
        duration: "90 min",
        title: "FinTech World Cup — Indonesia Qualifiers: Pitch Round 1",
        type: "featured",
        desc: "Eight shortlisted Indonesian fintechs pitch to a panel of global investors and industry leaders. Voting open to all delegates.",
        featured: true,
      },
      {
        time: "18:00",
        duration: "120 min",
        title: "Evening Networking Reception",
        type: "networking",
        desc: "Cocktails and canapés — the most productive two hours of the summit.",
      },
    ],
  },
  {
    day: "Day 2",
    date: "8 July 2026",
    dateShort: "8 Jul",
    theme: "Capital, Technology & Sovereignty",
    sessions: [
      {
        time: "09:00",
        duration: "45 min",
        title: "Keynote: Digital Assets, CBDC & Project Garuda — Indonesia's Blockchain Future",
        type: "keynote",
        desc: "Bank Indonesia's Project Garuda is one of Asia's most ambitious CBDC programmes. What does full implementation mean for banks, fintechs, and consumers?",
        featured: true,
      },
      {
        time: "09:45",
        duration: "60 min",
        title: "Panel: Sustainable Finance & ESG — Green Bonds and Climate Risk in Banking",
        type: "panel",
        desc: "Indonesia has pledged net-zero by 2060. How are capital markets, DFIs, and banks financing the transition?",
      },
      {
        time: "10:45",
        duration: "45 min",
        title: "Session: Real-World Asset Tokenisation — Institutional Adoption Playbook",
        type: "session",
        desc: "From property tokens to trade finance on-chain — mapping the institutional path to tokenised assets in Southeast Asia.",
      },
      {
        time: "11:30",
        duration: "30 min",
        title: "Networking & Exhibition Break",
        type: "networking",
      },
      {
        time: "12:00",
        duration: "60 min",
        title: "Panel: Banking the Unbanked — Reaching 77M+ Adults Through Alternative Models",
        type: "panel",
        desc: "Agent banking, digital wallets, and embedded finance — the business case and the human case for financial inclusion at scale.",
      },
      {
        time: "13:00",
        duration: "90 min",
        title: "Lunch & Curated Investor Meetings",
        type: "networking",
        desc: "Pre-scheduled one-to-one meetings between investors and high-growth fintech founders.",
      },
      {
        time: "14:30",
        duration: "60 min",
        title: "Session: Enterprise Banking & ISO 20022 Adoption in Indonesia",
        type: "session",
        desc: "The global messaging standard is reshaping how banks communicate. Indonesia's migration timeline and what it means for corporate treasurers.",
      },
      {
        time: "15:30",
        duration: "60 min",
        title: "FinTech World Cup — Grand Finale & Award Ceremony",
        type: "featured",
        desc: "The top three pitches return for the grand finale. Live delegate voting. Trophy presentation and global media coverage.",
        featured: true,
      },
      {
        time: "16:30",
        duration: "45 min",
        title: "Closing Keynote: Capital Flows, Digital Sovereignty & Indonesia's 2045 Destination",
        type: "keynote",
        desc: "A forward-looking close — synthesising two days of insight into the defining opportunities of the next decade.",
      },
      {
        time: "17:15",
        duration: "45 min",
        title: "Closing Remarks & Farewell Networking",
        type: "networking",
        desc: "Final connections, delegate gifts, and the close of Finance 2045 Indonesia.",
      },
    ],
  },
];

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  keynote:    { label: "Keynote",     color: "#E9C268", bg: "rgba(233,194,104,0.08)", border: "#E9C268" },
  fireside:   { label: "Fireside",    color: "#00A5A3", bg: "rgba(0,165,163,0.08)",   border: "#00A5A3" },
  panel:      { label: "Panel",       color: "#00A5A3", bg: "rgba(0,165,163,0.06)",   border: "#00A5A3" },
  session:    { label: "Session",     color: "rgba(255,255,255,0.6)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.2)" },
  networking: { label: "Networking",  color: "rgba(255,255,255,0.28)", bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.07)" },
  featured:   { label: "FinTech Cup", color: "#E9C268", bg: "rgba(233,194,104,0.08)", border: "#E9C268" },
};

export default function AgendaPage() {
  const [agenda, setAgenda] = useState<AgendaDay[]>(FALLBACK_AGENDA);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetchKonfHubAgenda().then((data) => {
      if (data.length > 0) setAgenda(data);
      setLoading(false);
    });
  }, []);

  const day = agenda[activeDay] ?? agenda[0];

  return (
    <>
      <style>{`
        /* ── Page shell ── */
        .ag-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding-top: 100px;
          overflow-x: hidden;
        }

        /* ── Hero ── */
        .ag-hero {
          position: relative;
          padding: 72px 24px 60px;
          text-align: center;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .ag-hero-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 60% at 50% -10%, rgba(233,194,104,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,165,163,0.05) 0%, transparent 60%);
        }
        .ag-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 20px;
          border: 1px solid rgba(0,165,163,0.25); padding: 5px 14px;
        }
        .ag-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--teal);
          animation: ag-blink 2.5s ease-in-out infinite;
        }
        @keyframes ag-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        .ag-h1 {
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 900; letter-spacing: -0.03em; line-height: 1.08;
          color: #fff; margin-bottom: 18px;
        }
        .ag-h1 span { color: var(--teal); }
        .ag-sub {
          font-size: clamp(14px, 1.5vw, 17px);
          color: var(--text-body); max-width: 520px; margin: 0 auto 44px;
          line-height: 1.78;
        }

        /* Stats bar */
        .ag-stats {
          display: flex; justify-content: center; align-items: stretch;
          gap: 0; flex-wrap: wrap;
          border: 1px solid var(--border);
          max-width: 680px; margin: 0 auto;
          background: var(--bg-surface);
        }
        .ag-stat {
          flex: 1; padding: 22px 24px; text-align: center;
          border-right: 1px solid var(--border);
          min-width: 110px; position: relative;
        }
        .ag-stat::after {
          content: ''; position: absolute; top: 0; left: 50%;
          transform: translateX(-50%); width: 0; height: 2px;
          background: var(--gold); transition: width 0.3s;
        }
        .ag-stat:hover::after { width: 50%; }
        .ag-stat:last-child { border-right: none; }
        .ag-stat-num {
          font-size: 30px; font-weight: 900;
          color: var(--gold); line-height: 1; margin-bottom: 7px;
          letter-spacing: -0.02em;
        }
        .ag-stat-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--text-muted);
        }

        /* ── Day tabs ── */
        .ag-tabs-wrap {
          position: sticky; top: 72px; z-index: 50;
          background: rgba(31,39,51,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .ag-tabs {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: stretch; justify-content: center;
          padding: 0 24px;
          overflow-x: auto; scrollbar-width: none;
        }
        .ag-tabs::-webkit-scrollbar { display: none; }
        .ag-tab {
          flex-shrink: 0;
          display: flex; flex-direction: column;
          padding: 18px 36px; cursor: pointer; border: none;
          background: transparent; text-align: left;
          border-bottom: 3px solid transparent;
          transition: all 0.2s; color: var(--text-muted);
          gap: 3px;
        }
        .ag-tab.active {
          border-bottom-color: var(--gold);
          color: #fff;
          background: rgba(233,194,104,0.04);
        }
        .ag-tab-day {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gold);
        }
        .ag-tab-date {
          font-size: 16px; font-weight: 800; line-height: 1.2; color: #fff;
        }
        .ag-tab-theme {
          font-size: 11px; color: var(--text-muted); margin-top: 1px;
        }
        .ag-tab.active .ag-tab-theme { color: var(--teal); }

        /* ── Sessions ── */
        .ag-body {
          max-width: 920px; margin: 0 auto;
          padding: 48px 24px 80px;
        }

        /* Day banner — sharp, gold left border */
        .ag-day-banner {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
          margin-bottom: 32px;
          padding: 20px 28px;
          background: var(--bg-surface);
          border: 1px solid var(--border-dark);
          border-left: 4px solid var(--gold);
        }
        .ag-day-banner-day {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 5px;
        }
        .ag-day-banner-title {
          font-size: 20px; font-weight: 800; color: #fff;
        }
        .ag-day-banner-date {
          font-size: 12px; color: var(--teal); font-weight: 600;
          border: 1px solid var(--border);
          padding: 7px 18px;
          white-space: nowrap; letter-spacing: 0.04em;
        }

        /* Sessions list */
        .ag-sessions { display: flex; flex-direction: column; gap: 3px; }

        .ag-session {
          position: relative;
          display: flex; gap: 0;
          cursor: pointer;
          transition: filter 0.15s;
          border: 1px solid var(--border-dark);
          border-left: none;
        }
        .ag-session:hover { filter: brightness(1.08); }
        .ag-session.is-networking { opacity: 0.6; cursor: default; }
        .ag-session.is-networking:hover { filter: none; opacity: 0.8; }
        .ag-session.is-featured {
          border-color: rgba(233,194,104,0.18);
        }

        /* Left accent bar */
        .ag-session-bar { width: 4px; flex-shrink: 0; }

        /* Time column */
        .ag-session-time-col {
          width: 82px; flex-shrink: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-start;
          padding: 18px 10px 18px 16px;
          background: rgba(0,0,0,0.18);
          border-right: 1px solid var(--border-dark);
        }
        .ag-session-time {
          font-size: 16px; font-weight: 800;
          color: #fff; line-height: 1; letter-spacing: -0.02em;
        }
        .ag-session-ampm {
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-muted); margin-top: 3px;
        }
        .ag-session-dur {
          font-size: 9px; color: var(--text-muted);
          margin-top: 8px; letter-spacing: 0.02em;
          border-top: 1px solid var(--border-dark);
          padding-top: 6px; width: 100%; text-align: center;
        }

        /* Main content */
        .ag-session-main {
          flex: 1; padding: 16px 20px;
          display: flex; flex-direction: column; gap: 0;
        }
        .ag-session-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
        }
        .ag-session-title {
          font-size: 14px; font-weight: 700;
          color: #fff; line-height: 1.45; flex: 1;
        }
        .ag-session.is-networking .ag-session-title {
          font-size: 13px; font-weight: 500;
          color: var(--text-muted);
        }
        .ag-session.is-featured .ag-session-title { font-size: 15px; }
        .ag-session-pill {
          flex-shrink: 0;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 3px 9px;
          border: 1px solid; white-space: nowrap;
        }
        .ag-session-desc {
          font-size: 12.5px; color: var(--text-muted);
          line-height: 1.7; margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid var(--border-dark);
          display: none;
        }
        .ag-session.open .ag-session-desc { display: block; }

        /* Featured badge */
        .ag-featured-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #1F2733; background: var(--gold);
          padding: 3px 9px;
          margin-bottom: 6px; align-self: flex-start;
        }

        /* Expanded / open state glow */
        .ag-session.open {
          border-color: rgba(0,165,163,0.50);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15);
          z-index: 2;
          position: relative;
        }

        /* Expand chevron */
        .ag-chevron {
          width: 20px; height: 20px; flex-shrink: 0;
          margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
          transition: transform 0.2s, color 0.2s;
        }
        .ag-session.open .ag-chevron {
          transform: rotate(180deg);
          color: var(--teal);
        }
        .ag-session.is-networking .ag-chevron { display: none; }

        /* ── CTA section ── */
        .ag-cta-wrap {
          border-top: 1px solid var(--border);
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,165,163,0.06), transparent 65%);
        }
        .ag-cta {
          text-align: center;
          padding: 72px 24px 96px;
          max-width: 640px; margin: 0 auto;
        }
        .ag-cta-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 16px;
        }
        .ag-cta-h {
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 900; color: #fff;
          letter-spacing: -0.025em; margin-bottom: 14px; line-height: 1.1;
        }
        .ag-cta-h span { color: var(--teal); }
        .ag-cta-sub {
          font-size: 15px; color: var(--text-body);
          margin-bottom: 36px; line-height: 1.75;
        }
        .ag-cta-btns {
          display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .ag-day-banner { flex-direction: column; align-items: flex-start; gap: 8px; }
          .ag-stats { max-width: 100%; }
          .ag-stat { min-width: 80px; }
        }
        @media (max-width: 640px) {
          .ag-hero { padding: 52px 20px 44px; }
          .ag-tab { padding: 14px 18px; }
          .ag-tab-date { font-size: 14px; }
          .ag-tab-theme { display: none; }
          .ag-session-time-col { width: 62px; padding: 14px 8px 14px 10px; }
          .ag-session-time { font-size: 14px; }
          .ag-session-main { padding: 14px 12px; }
          .ag-session-title { font-size: 13px; }
          .ag-session.is-featured .ag-session-title { font-size: 13px; }
          .ag-stat { padding: 16px 12px; min-width: 80px; }
          .ag-stat-num { font-size: 22px; }
          .ag-day-banner { padding: 16px 18px; }
          .ag-day-banner-title { font-size: 15px; }
          .ag-body { padding: 28px 14px 60px; }
          .ag-cta { padding: 56px 20px 72px; }
        }
        @media (max-width: 400px) {
          .ag-session-pill { display: none; }
          .ag-session-time-col { display: none; }
          .ag-session-bar { width: 3px; }
        }
      `}</style>

      <div className="ag-page">

        {/* ── Hero ── */}
        <div className="ag-hero">
          <div className="ag-hero-glow" />
          <div className="ag-eyebrow">
            <span className="ag-eyebrow-dot" />
            Finance 2045 Indonesia · 7–8 July 2026
          </div>
          <h1 className="ag-h1">
            Two Days of<br />
            <span>Capital. Intelligence. Impact.</span>
          </h1>
          <p className="ag-sub">
            Keynotes from regulators and market leaders. Panels on AI, digital assets, and inclusion.
            Precision matchmaking. And the FinTech World Cup.
          </p>
          <div className="ag-stats">
            {[
              { num: loading ? "—" : String(agenda.reduce((t,d)=>t+d.sessions.filter(s=>s.type!=="networking").length,0))+"+", label: "Sessions" },
              { num: "40+", label: "Speakers" },
              { num: "2",   label: "Days" },
              { num: "1,000+", label: "Delegates" },
            ].map((s) => (
              <div key={s.label} className="ag-stat">
                <div className="ag-stat-num">{s.num}</div>
                <div className="ag-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          {!loading && (
            <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", opacity: 0.8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
              Live from KonfHub · Updates automatically
            </div>
          )}
        </div>

        {/* ── Day tabs ── */}
        <div className="ag-tabs-wrap">
          <div className="ag-tabs">
            {agenda.map((d, i) => (
              <button
                key={i}
                className={`ag-tab${activeDay === i ? " active" : ""}`}
                onClick={() => { setActiveDay(i); setExpanded(null); }}
              >
                <span className="ag-tab-day">{d.day}</span>
                <span className="ag-tab-date">{d.date}</span>
                <span className="ag-tab-theme">{d.theme}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Sessions ── */}
        <div className="ag-body">

          {/* Day banner */}
          <div className="ag-day-banner">
            <div className="ag-day-banner-left">
              <div className="ag-day-banner-day">{day.day}</div>
              <div className="ag-day-banner-title">{day.theme}</div>
            </div>
            <div className="ag-day-banner-date">{day.date} · Sheraton Grand, Jakarta</div>
          </div>

          <div className="ag-sessions">
            {day.sessions.map((s, i) => {
              const cfg = TYPE_CONFIG[s.type] || TYPE_CONFIG.session;
              const isNet = s.type === "networking";
              const isFeat = s.type === "featured";
              const isOpen = expanded === i;
              const hasDesc = !!s.desc;

              return (
                <div
                  key={i}
                  className={`ag-session${isNet ? " is-networking" : ""}${isFeat ? " is-featured" : ""}${isOpen ? " open" : ""}`}
                  style={{ background: cfg.bg }}
                  onClick={() => hasDesc && !isNet && setExpanded(isOpen ? null : i)}
                >
                  {/* Left colour bar */}
                  <div className="ag-session-bar" style={{ background: cfg.border }} />

                  {/* Time — only shown when available */}
                  {s.time && (
                    <div className="ag-session-time-col">
                      <div className="ag-session-time">{s.time}</div>
                      <div className="ag-session-ampm">{parseInt(s.time) < 12 ? "AM" : "PM"}</div>
                      {!isNet && <div className="ag-session-dur">{s.duration}</div>}
                    </div>
                  )}

                  {/* Content */}
                  <div className="ag-session-main">
                    <div className="ag-session-top">
                      <div style={{ flex: 1 }}>
                        {isFeat && (
                          <div className="ag-featured-badge">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                            Featured Event
                          </div>
                        )}
                        <div className="ag-session-title">{s.title}</div>
                        {hasDesc && !isNet && (
                          <div className="ag-session-desc" style={{ color: cfg.color === "rgba(255,255,255,0.35)" ? "var(--text-muted)" : "var(--text-body)" }}>
                            {s.desc}
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexShrink: 0, paddingTop: isFeat ? 24 : 0 }}>
                        {!isNet && (
                          <span
                            className="ag-session-pill"
                            style={{ color: cfg.color, borderColor: cfg.border + "60", background: "transparent" }}
                          >
                            {cfg.label}
                          </span>
                        )}
                        {hasDesc && !isNet && (
                          <div className="ag-chevron">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M6 9l6 6 6-6"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="ag-cta-wrap">
          <div className="ag-cta">
            <div className="ag-cta-label">Secure Your Place</div>
            <h2 className="ag-cta-h">Be in the Room <span>Where It Happens</span></h2>
            <p className="ag-cta-sub">
              Limited delegate passes available. Finance leaders, investors, and regulators from across Southeast Asia and the Gulf.
            </p>
            <div className="ag-cta-btns">
              <Link href="/attend/delegate" className="f45-btn-primary">
                Get Your Pass
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/enquire" className="f45-btn-outline">Enquire About Sponsorship</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
