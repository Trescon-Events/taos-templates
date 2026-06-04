"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { EVENT } from "@/config/event";

type Tab = "overview" | "snapshot" | "themes" | "speak";

type LiveSession = {
  session_id: number;
  title: string;
  description: string;
  type: string;
  tag: string;
  time: string;
  end_time: string;
  date: string;
  colour: string;
  location: string;
  speakers: { id: number; name: string; designation: string; organisation: string; image: string; linkedin: string }[];
};

const SESSIONS = [
  { time: "08:00", label: "Registration & Networking Breakfast", type: "networking" },
  { time: "09:00", label: "Opening Ceremony & Welcome Address", type: "plenary" },
  { time: "09:30", label: "Keynote: The CIO in the Age of AI — From Deployment to Business Value", type: "keynote" },
  { time: "10:15", label: "Panel: Cybersecurity in the Board Room — How CIOs Are Winning the Conversation", type: "panel" },
  { time: "11:00", label: "Coffee Break & Exhibition Floor Open", type: "networking" },
  { time: "11:30", label: "Fireside: Cloud Without Complexity — Multi-Cloud Strategies That Actually Work", type: "fireside" },
  { time: "12:15", label: "Keynote: Data Leadership — Building the Intelligent Enterprise", type: "keynote" },
  { time: "13:00", label: "Networking Lunch & Technology Showcase", type: "networking" },
  { time: "14:15", label: "Concurrent Roundtables: AI Strategy / Zero Trust Security / Cloud Migration", type: "roundtable" },
  { time: "15:30", label: "Panel: The Next-Generation CIO — Skills, Mindset, and the Evolving Mandate", type: "panel" },
  { time: "16:15", label: "Case Study Presentations: Digital Transformation at Scale", type: "case-study" },
  { time: "17:00", label: "Closing Keynote: Leading Through Uncertainty — A CIO&apos;s Playbook", type: "keynote" },
  { time: "17:45", label: "Big CIO Awards Ceremony — 100+ Categories", type: "awards" },
  { time: "19:30", label: "Gala Dinner & Networking", type: "networking" },
];

const TYPE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  keynote:    { label: "Keynote",    color: "#C084FC", bg: "rgba(192,132,252,0.10)" },
  panel:      { label: "Panel",      color: "#7C3AED", bg: "rgba(124,58,237,0.10)" },
  fireside:   { label: "Fireside",   color: "#7B5CFF", bg: "rgba(123,92,255,0.10)" },
  networking: { label: "Networking", color: "rgba(255,255,255,0.92)", bg: "rgba(255,255,255,0.05)" },
  roundtable: { label: "Roundtable", color: "#C084FC", bg: "rgba(192,132,252,0.08)" },
  "case-study":{ label: "Case Study", color: "#C9A84C", bg: "rgba(201,168,76,0.10)" },
  awards:     { label: "Awards",     color: "#C9A84C", bg: "rgba(201,168,76,0.12)" },
  plenary:    { label: "Plenary",    color: "#fff",    bg: "rgba(255,255,255,0.07)" },
};

export default function AgendaPage() {
  const [tab, setTab]               = useState<Tab>("overview");
  const [liveSessions, setLive]     = useState<LiveSession[]>([]);
  const [sessionsLoading, setLoading] = useState(true);
  const [speakFormOpen, setSpeakFormOpen] = useState(false);

  useEffect(() => {
    fetch("/api/agenda")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.sessions)) setLive(d.sessions); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .bag-page { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }
        .bag-tabbar {
          background: var(--bg-surface); border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .bag-tabbar-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: flex; overflow-x: auto; scrollbar-width: none;
        }
        .bag-tabbar-inner::-webkit-scrollbar { display: none; }
        .bag-tab {
          font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.90);
          padding: 16px 22px; cursor: pointer; border: none; background: none;
          font-family: inherit; border-bottom: 2px solid transparent;
          white-space: nowrap; transition: color 0.2s, border-color 0.2s;
        }
        .bag-tab:hover { color: #ffffff; }
        .bag-tab.active { color: var(--cyan); border-bottom-color: var(--cyan); }

        .bag-hero {
          background: var(--bg-surface); padding: 80px 40px 72px;
          text-align: center; position: relative; overflow: hidden;
          border-bottom: 1px solid rgba(124,58,237,0.10);
        }
        .bag-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .bag-hero-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .bag-h1 { font-size: clamp(22px, 2.6vw, 38px); font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1.15; margin-bottom: 16px; }
        .bag-h1 em { font-style: normal; color: var(--cyan); }
        .bag-sub { font-size: 18px; color: var(--text-body); max-width: 560px; margin: 0 auto; line-height: 1.75; }
        .bag-sub-mb { margin-bottom: 36px; }

        .bag-sh { font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cyan); margin-bottom: 20px; }
        .bag-h2 { font-size: clamp(18px,2.2vw,28px); font-weight: 800; letter-spacing: -0.02em; color: #fff; margin-bottom: 12px; }
        .bag-h2 em { font-style: normal; color: var(--cyan); }

        /* OV STATS */
        .bag-ov-stats {
          display: flex; justify-content: center; gap: 0;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden; margin-bottom: 56px;
        }
        .bag-ov-stat { flex: 1; padding: 32px 24px; text-align: center; border-right: 1px solid var(--border); }
        .bag-ov-stat:last-child { border-right: none; }
        .bag-ov-val { font-size: 32px; font-weight: 900; letter-spacing: -0.02em; color: var(--cyan); line-height: 1; }
        .bag-ov-lbl { font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.90); margin-top: 6px; }

        /* OVERVIEW BODY */
        .bag-ov-body { max-width: 1320px; margin: 0 auto; padding: 72px 40px 100px; }

        /* FORMAT GRID */
        .bag-format-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 56px; }
        .bag-format-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px 20px; transition: border-color 0.3s, box-shadow 0.3s; }
        .bag-format-card:hover { border-color: rgba(124,58,237,0.45); box-shadow: 0 0 20px rgba(124,58,237,0.18); }
        .bag-format-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(124,58,237,0.10); border: 1px solid rgba(124,58,237,0.22); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; color: var(--cyan); }
        .bag-format-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .bag-format-why { font-size: 13px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: rgba(201,168,76,0.80); margin-bottom: 4px; }
        .bag-format-desc { font-size: 18px; color: var(--text-body); line-height: 1.65; }

        /* CARD GRID */
        .bag-card-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 48px; }
        .bag-card { background: var(--bg-card); border: 1px solid var(--border); padding: 24px; border-radius: 16px; }
        .bag-card-num { font-size: 13px; font-weight: 900; letter-spacing: 0.12em; color: var(--cyan); margin-bottom: 12px; }
        .bag-card-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; }
        .bag-card-desc { font-size: 18px; color: var(--text-body); line-height: 1.7; }

        /* CHIPS */
        .bag-chips-block { background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.18); border-radius: 16px; padding: 32px 36px; margin-bottom: 48px; }
        .bag-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .bag-chip { font-size: 18px; font-weight: 700; color: var(--cyan); background: rgba(192,132,252,0.08); border: 1px solid rgba(192,132,252,0.20); padding: 6px 14px; border-radius: 8px; }

        /* OUTCOME SECTION */
        .bag-outcome-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 48px; }
        .bag-outcome-item { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px; display: flex; gap: 12px; align-items: flex-start; }

        /* PAST SESSIONS */
        .bag-past-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 48px; }
        .bag-past-card { background: var(--bg-surface); border: 1px solid rgba(201,168,76,0.15); border-radius: 14px; padding: 24px 20px; }
        .bag-past-label { font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(201,168,76,0.70); margin-bottom: 8px; }
        .bag-past-title { font-size: 18px; font-weight: 800; color: #fff; line-height: 1.4; }

        /* FINAL CTA */
        .bag-final-cta { background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.20); border-radius: 20px; padding: 64px 48px; text-align: center; position: relative; overflow: hidden; }
        .bag-final-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%); pointer-events: none; }
        .bag-final-cta-inner { position: relative; z-index: 2; }

        /* TIMELINE */
        .bag-body { max-width: 900px; margin: 0 auto; padding: 72px 40px 100px; }
        .bag-session {
          display: flex; gap: 24px; margin-bottom: 12px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 16px; padding: 20px 24px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bag-session:hover {
          border-color: rgba(124,58,237,0.45);
          box-shadow: 0 0 20px rgba(124,58,237,0.15);
        }
        .bag-time { min-width: 56px; font-size: 18px; font-weight: 800; color: rgba(255,255,255,0.92); padding-top: 2px; }
        .bag-session-body { flex: 1; }
        .bag-session-title { font-size: 18px; font-weight: 700; color: #fff; line-height: 1.4; margin-bottom: 8px; }
        .bag-badge {
          display: inline-flex; align-items: center;
          font-size: 13px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; padding: 3px 10px; border-radius: 100px;
        }

        /* THEMES */
        .bag-themes-body { max-width: 1320px; margin: 0 auto; padding: 72px 40px 100px; }
        .bag-themes-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 56px; }
        .bcio-session-card {
          background: var(--bg-card); border: 1px solid var(--border); padding: 28px 24px; border-radius: 16px;
        }
        .bag-theme-num { font-size: 13px; font-weight: 900; color: var(--cyan); letter-spacing: 0.12em; margin-bottom: 12px; }
        .bag-theme-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.3; }
        .bag-theme-desc { font-size: 18px; color: var(--text-body); line-height: 1.7; }

        /* THEME INDUSTRY MAPPING */
        .bag-mapping-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 14px; margin-bottom: 48px; }
        .bag-mapping-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px;
          padding: 22px 20px 18px; display: flex; flex-direction: column; gap: 14px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .bag-mapping-card:hover { transform: translateY(-3px); }
        .bag-mapping-bar { height: 3px; border-radius: 100px; margin-bottom: 2px; }
        .bag-mapping-theme { font-size: 15px; font-weight: 800; color: #fff; line-height: 1.3; }
        .bag-mapping-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .bag-mapping-tag {
          font-size: 11px; font-weight: 700; letter-spacing: 0.03em;
          border-radius: 100px; padding: 4px 12px;
        }

        /* SPEAK */
        .bag-speak-body { max-width: 860px; margin: 0 auto; padding: 72px 40px 100px; }

        @media (max-width: 1200px) {
          .bag-themes-grid { grid-template-columns: repeat(3, 1fr); }
          .bag-mapping-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 1024px) {
          .bag-format-grid { grid-template-columns: repeat(2,1fr); }
          .bag-themes-grid { grid-template-columns: repeat(2, 1fr); }
          .bag-mapping-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .bag-hero { padding: 56px 24px 48px; }
          .bag-body, .bag-speak-body, .bag-ov-body, .bag-themes-body { padding: 48px 24px 72px; }
          .bag-format-grid, .bag-card-grid, .bag-outcome-grid, .bag-past-grid { grid-template-columns: 1fr; }
          .bag-ov-stats { flex-direction: column; }
          .bag-ov-stat { border-right: none; border-bottom: 1px solid var(--border); }
          .bag-ov-stat:last-child { border-bottom: none; }
          .bag-tabbar-inner { padding: 0 16px; }
          .bag-final-cta { padding: 48px 24px; }
        }
        @media (max-width: 540px) {
          .bag-themes-grid { grid-template-columns: 1fr; }
          .bag-mapping-grid { grid-template-columns: 1fr; }
        }

        /* ── SPEAK MODAL ── */
        .bag-modal-backdrop {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(0,0,0,0.78); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .bag-modal {
          background: #fff; border-radius: 12px;
          width: 100%; max-width: 680px; max-height: 90vh;
          display: flex; flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.60);
        }
        .bag-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 1px solid #e5e7eb;
          background: #fff; flex-shrink: 0;
        }
        .bag-modal-title {
          font-size: 15px; font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: #111827;
        }
        .bag-modal-close {
          background: none; border: none; cursor: pointer;
          color: #6b7280; padding: 4px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px; transition: background 0.15s, color 0.15s;
        }
        .bag-modal-close:hover { background: #f3f4f6; color: #111827; }
        .bag-modal iframe {
          flex: 1; border: none; width: 100%;
          min-height: 600px;
        }
      `}</style>

      <div className="bag-page">
        <div className="bag-tabbar">
          <div className="bag-tabbar-inner">
            {([
              ["overview",  "Overview"],
              ["snapshot",  "Agenda"],
              ["themes",    "Themes"],
              ["speak",     "Call for Speakers"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} className={`bag-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── OVERVIEW ─── */}
        {tab === "overview" && (
          <>
            <div className="bag-hero">
              <div className="bag-hero-inner">
                <div className="bcio-eyebrow">{EVENT.edition_num} Edition · {EVENT.edition}</div>
                <h1 className="bag-h1">The Strategic Agenda <em>Powering Enterprise Transformation</em></h1>
                <p className={`bag-sub bag-sub-mb`}>
                  A curated executive programme combining enterprise AI, cybersecurity, cloud, digital transformation, leadership, governance, and innovation — built around real-world challenges CIOs are actively solving.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="bcio-btn-primary" onClick={() => setTab("snapshot")}>
                    Explore Full Agenda
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <button className="bcio-btn-outline" onClick={() => setTab("themes")}>View Themes</button>
                </div>
              </div>
            </div>

            <div className="bag-ov-body">
              {/* Stats */}
              <div className="bag-ov-stats">
                {EVENT.stats.map(s => (
                  <div key={s.label} className="bag-ov-stat">
                    <div className="bag-ov-val">{s.value}</div>
                    <div className="bag-ov-lbl">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Agenda Philosophy */}
              <div className="bag-sh">Agenda Philosophy</div>
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 16, padding: "36px 40px", marginBottom: 56 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
                  <div>
                    <h3 className="bag-h2">How the Agenda Is <em>Curated</em></h3>
                    <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.75, marginBottom: 20 }}>
                      The BIG CIO programme is not designed around what vendors want to present. It is built with industry leaders, focused on practical enterprise outcomes, and designed around real-world transformation challenges.
                    </p>
                  </div>
                  <div>
                    {[
                      "Built with industry leaders, not marketing teams",
                      "Focused on practical enterprise outcomes",
                      "Designed around real-world transformation challenges",
                      "Combining strategic vision with implementation insights",
                    ].map(item => (
                      <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12, fontSize: 12, color: "var(--text-body)", lineHeight: 1.65 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bag-sh">What to Expect</div>
              <div className="bag-format-grid">
                {[
                  { title: "Visionary Keynotes",       why: "Highest-level strategic sessions", desc: "Opening and closing sessions with global enterprise leaders setting the technology agenda for the year ahead.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
                  { title: "Enterprise Case Studies",  why: "Real implementation stories", desc: "CIOs sharing what actually worked — from enterprise AI deployments to cloud migrations and cybersecurity transformations.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
                  { title: "CIO Panels",               why: "Multi-perspective discussions", desc: "4–5 CIOs from different industries debating the same challenge — BFSI, manufacturing, healthcare, and retail perspectives combined.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  { title: "AI Leadership Sessions",   why: "Enterprise AI at scale", desc: "From GenAI experimentation to enterprise-wide deployment — practical AI strategy sessions led by leaders who have done it.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/></svg> },
                  { title: "Closed-Door Roundtables",  why: "Candid CIO conversations", desc: "Invite-only sessions of 12–15 senior leaders tackling the same enterprise challenge. Moderated. Confidential. Highly valued.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg> },
                  { title: "Fireside Chats",           why: "Personal leadership conversations", desc: "One-on-one conversations exploring the personal journey behind major enterprise transformation decisions.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                  { title: "Innovation Showcases",     why: "Solution discovery", desc: "Short, focused technology demonstrations from enterprise-ready innovators — no sales pitches, just solution context.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.2 6l-.8.6V18h-6v-2.4l-.8-.6A7 7 0 0 1 12 2z"/><path d="M9 21h6M10 18h4"/></svg> },
                  { title: "Interactive Discussions",  why: "Audience-led learning", desc: "Workshop-format sessions with audience participation, real-time polls, and structured group output.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> },
                  { title: "Networking Sessions",      why: "Structured relationship-building", desc: "Dedicated networking breaks, structured introductions, and the flagship Awards Gala Dinner — built into the programme, not bolted on.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> },
                ].map(f => (
                  <div key={f.title} className="bag-format-card">
                    <div className="bag-format-icon">{f.icon}</div>
                    <div className="bag-format-title">{f.title}</div>
                    <div className="bag-format-why">{f.why}</div>
                    <div className="bag-format-desc">{f.desc}</div>
                  </div>
                ))}
              </div>

              {/* Core Discussion Areas */}
              <div className="bag-sh">Core Discussion Areas</div>
              <div className="bag-chips-block">
                <div className="bag-chips">
                  {["Enterprise AI Adoption", "Cybersecurity & Resilience", "Data & Governance", "Cloud Modernisation", "Digital Infrastructure", "Workforce Transformation", "Automation & Intelligent Operations", "Responsible AI", "Future Enterprise Architecture"].map(c => (
                    <span key={c} className="bag-chip">{c}</span>
                  ))}
                </div>
              </div>

              {/* Who the Agenda Is For */}
              <div className="bag-sh">Who the Agenda Is Designed For</div>
              <div className="bag-chips-block">
                <div className="bag-chips">
                  {["CIOs", "CTOs", "CISOs", "Chief Data Officers", "Heads of AI", "Enterprise Architects", "Digital Transformation Leaders", "Innovation Heads", "VPs of Technology", "IT Directors"].map(r => (
                    <span key={r} className="bag-chip">{r}</span>
                  ))}
                </div>
              </div>

              {/* Industry Relevance */}
              <div className="bag-sh">Industry Relevance</div>
              <div className="bag-chips-block" style={{ marginBottom: 56 }}>
                <div style={{ fontSize: 12, color: "var(--text-body)", marginBottom: 16, lineHeight: 1.65 }}>Sessions are designed to deliver value across every major industry sector represented at BIG CIO Show:</div>
                <div className="bag-chips">
                  {["BFSI", "Manufacturing", "Healthcare", "Retail", "Government", "Telecom", "Logistics", "Energy", "Pharma", "Education", "Real Estate"].map(i => (
                    <span key={i} className="bag-chip">{i}</span>
                  ))}
                </div>
              </div>

              {/* Strategic Outcomes */}
              <div className="bag-sh">Strategic Outcomes</div>
              <div className="bag-outcome-grid">
                {[
                  { title: "Build AI Transformation Strategies",   desc: "Leave with a framework for scaling AI from pilot to enterprise — including governance, talent, and change management." },
                  { title: "Benchmark Digital Maturity",           desc: "Compare your transformation progress against peers across industries — data from the CIO Benchmarking Report." },
                  { title: "Strengthen Cybersecurity Readiness",   desc: "Understand zero-trust architectures, AI-driven threat intelligence, and the board-level security narrative." },
                  { title: "Discover Scalable Enterprise Solutions",desc: "Evaluate technology providers in context — innovation showcases, demo zones, and structured vendor introductions." },
                  { title: "Learn from Peer-Led Case Studies",     desc: "Real enterprise implementations from CIOs who have navigated the challenges you are currently facing." },
                  { title: "Build Strategic Partnerships",         desc: "Structured networking, AI matchmaking, and hosted buyer meetings — every format drives business outcomes." },
                ].map(o => (
                  <div key={o.title} className="bag-outcome-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{o.title}</div>
                      <div style={{ fontSize: 11, color: "var(--text-body)", lineHeight: 1.65 }}>{o.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Past Session Highlights */}
              <div className="bag-sh">Past Session Highlights</div>
              <div className="bag-past-grid" style={{ marginBottom: 56 }}>
                {[
                  "AI Beyond Pilots: Scaling Enterprise Adoption",
                  "Cybersecurity in the Era of Autonomous Systems",
                  "Building the Intelligent Enterprise",
                  "Data Governance for AI-Driven Organisations",
                  "The CIO as Chief Value Officer",
                  "Zero Trust: From Concept to Enterprise Deployment",
                  "Cloud Cost Governance: The FinOps Imperative",
                  "The Future of Work: Building Digital-First Cultures",
                ].map(t => (
                  <div key={t} className="bag-past-card">
                    <div className="bag-past-label">Past Highlight</div>
                    <div className="bag-past-title">&ldquo;{t}&rdquo;</div>
                  </div>
                ))}
              </div>

              <div className="bag-final-cta">
                <div className="bag-final-cta-inner">
                  <h2 className="bag-h2">Explore the Conversations <em>Defining Enterprise Technology</em></h2>
                  <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.75 }}>
                    View the full executive agenda and secure your seat at India&apos;s most influential CIO gathering — {EVENT.edition_num} edition, {EVENT.edition}.
                  </p>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="bcio-btn-primary" onClick={() => setTab("snapshot")}>
                      View the Full Executive Agenda
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                    <a href={EVENT.register_url} target="_blank" rel="noopener noreferrer" className="bcio-btn-outline">Register to Attend</a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ─── AGENDA SNAPSHOT ─── */}
        {tab === "snapshot" && (
          <>
            <div className="bag-hero">
              <div className="bag-hero-inner">
                <div className="bcio-eyebrow">Executive Programme · 2026</div>
                <h1 className="bag-h1">The BIG CIO <em>Conference Agenda</em></h1>
                <p className="bag-sub">Curated sessions featuring enterprise leaders, industry innovators and technology strategists. Final schedule and confirmed speakers to be announced.</p>
              </div>
            </div>
            <div className="bag-body">
              {sessionsLoading ? (
                <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)", fontSize: 13 }}>Loading agenda...</div>
              ) : liveSessions.length > 0 ? (
                <>
                  {liveSessions.map(s => {
                    const t = TYPE_LABELS[s.type] || TYPE_LABELS.plenary;
                    return (
                      <div key={s.session_id} className="bag-session">
                        <div className="bag-time">{s.time}</div>
                        <div className="bag-session-body">
                          <div className="bag-session-title">{s.title}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <span className="bag-badge" style={{ color: t.color, background: t.bg }}>{s.tag || t.label}</span>
                            {s.end_time && <span style={{ fontSize: 10, color: "var(--text-muted)" }}>until {s.end_time}</span>}
                          </div>
                          {s.speakers.length > 0 && (
                            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {s.speakers.map(sp => (
                                <span key={sp.id} style={{ fontSize: 11, color: "var(--cyan)", fontWeight: 600 }}>
                                  {sp.name}{sp.organisation ? ` · ${sp.organisation}` : ""}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                SESSIONS.map((s, i) => {
                  const t = TYPE_LABELS[s.type] || TYPE_LABELS.plenary;
                  return (
                    <div key={i} className="bag-session">
                      <div className="bag-time">{s.time}</div>
                      <div className="bag-session-body">
                        <div className="bag-session-title" dangerouslySetInnerHTML={{ __html: s.label }} />
                        <span className="bag-badge" style={{ color: t.color, background: t.bg }}>{t.label}</span>
                      </div>
                    </div>
                  );
                })
              )}
              <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginTop: 32, marginBottom: 48 }}>
                Programme is indicative. Final schedule subject to change.
              </p>
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 16, padding: "36px 40px", textAlign: "center" }}>
                <p style={{ fontSize: 14, color: "var(--text-body)", marginBottom: 24, lineHeight: 1.75 }}>Secure your delegate pass and join the conversations shaping enterprise technology leadership.</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={EVENT.register_url} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                    Secure Your Delegate Pass
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <button onClick={() => setSpeakFormOpen(true)} className="bcio-btn-outline">Speak at BIG CIO</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ─── THEMES ─── */}
        {tab === "themes" && (
          <>
            <div className="bag-hero">
              <div className="bag-hero-inner">
                <div className="bcio-eyebrow">8 Strategic Focus Areas</div>
                <h1 className="bag-h1">The Themes Defining <em>Enterprise Technology</em></h1>
                <p className="bag-sub">Critical trends, technologies and leadership priorities shaping the enterprise landscape — curated around what CIOs are actively investing in, not what vendors want to present.</p>
              </div>
            </div>
            <div className="bag-themes-body">
              {/* 10 Themes */}
              <div className="bag-themes-grid">
                {[
                  { num: "01", title: "Artificial Intelligence and Automation",              desc: "From AI strategy to enterprise-wide deployment — scaling intelligent systems, automating operations, and measuring real returns on AI investments." },
                  { num: "02", title: "Cyber Security and Risk Management",                  desc: "Zero-trust frameworks, AI-powered threat intelligence, resilience architecture, and building board-level security narratives." },
                  { num: "03", title: "Cloud Transformation",                                desc: "Multi-cloud and hybrid strategies, workload migration, FinOps governance, and aligning cloud investments with business agility." },
                  { num: "04", title: "Data & Analytics – Beyond the Oil-Field",            desc: "Governing AI-ready data estates, real-time intelligence, predictive analytics, and closing the gap between insight and action." },
                  { num: "05", title: "Digital Business Transformation",                     desc: "Modernising legacy systems, aligning IT roadmaps with business strategy, and leading change that delivers measurable enterprise outcomes." },
                  { num: "06", title: "Tech-Investments and Returns",                        desc: "Optimising technology budgets, demonstrating ROI to the board, and making investment decisions that drive competitive advantage." },
                  { num: "07", title: "DevOps – Towards a Cultural & Philosophical Shift",  desc: "Moving beyond tooling to shared accountability, continuous delivery, and genuine dev-ops-business alignment across the enterprise." },
                  { num: "08", title: "Continuous Change Leadership",                        desc: "Building change-ready cultures, managing transformation fatigue, and sustaining momentum across multi-year enterprise programmes." },
                  { num: "09", title: "Future of Digital Workforce",                         desc: "Talent strategy for the AI era, reskilling at scale, hybrid work architecture, and building teams that thrive alongside automation." },
                  { num: "10", title: "Role of CIOs in Mergers, Collaborations & Acquisitions", desc: "Technology due diligence, system integration, culture alignment, and extracting synergy through smart IT strategy in M&A scenarios." },
                ].map(t => (
                  <div key={t.num} className="bcio-session-card">
                    <div className="bag-theme-num">{t.num}</div>
                    <div className="bag-theme-title">{t.title}</div>
                    <div className="bag-theme-desc">{t.desc}</div>
                  </div>
                ))}
              </div>

              {/* Why These Themes Matter */}
              <div className="bag-sh">Why These Themes Matter</div>
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 16, padding: "36px 40px", marginBottom: 48 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                  <div>
                    <h3 className="bag-h2">Commercially <em>Relevant</em> by Design</h3>
                    <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.75 }}>
                      These themes are designed around the real priorities enterprise leaders are actively investing in. Not what is trending on LinkedIn — what is in the budget and on the board agenda.
                    </p>
                  </div>
                  <div>
                    {[
                      "Based on CIO investment priorities research",
                      "Validated by our editorial advisory board",
                      "Aligned to enterprise transformation challenges",
                      "Updated annually to reflect market shifts",
                    ].map(item => (
                      <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12, fontSize: 12, color: "var(--text-body)", lineHeight: 1.65 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Theme-to-Industry Mapping */}
              <div className="bag-sh">Theme — Industry Relevance</div>
              <div className="bag-mapping-grid" style={{ marginBottom: 48 }}>
                {[
                  { theme: "AI & Automation",          inds: ["BFSI", "Healthcare", "Retail", "Manufacturing"],   accent: "#C084FC" },
                  { theme: "Cybersecurity & Risk",      inds: ["All Industries", "Universal Priority"],            accent: "#F43F5E" },
                  { theme: "Cloud Transformation",      inds: ["IT", "Telecom", "Government", "Enterprise"],       accent: "#60A5FA" },
                  { theme: "Data & Analytics",          inds: ["Healthcare", "BFSI", "Telecom", "Retail"],         accent: "#2DD4BF" },
                  { theme: "Digital Business Transformation", inds: ["All Industries", "All Sectors"],             accent: "#FB923C" },
                  { theme: "Tech-Investments & ROI",    inds: ["BFSI", "Pharma", "Enterprise", "Government"],      accent: "#C9A84C" },
                  { theme: "DevOps",                    inds: ["IT", "SaaS", "Fintech", "Telecom"],                accent: "#4ADE80" },
                  { theme: "Change Leadership",         inds: ["All Industries", "Leadership & Culture"],          accent: "#A3E635" },
                  { theme: "Digital Workforce",         inds: ["IT", "BFSI", "Healthcare", "Education"],           accent: "#38BDF8" },
                  { theme: "CIO in M&A",                inds: ["BFSI", "Pharma", "Telecom", "Conglomerates"],      accent: "#F472B6" },
                ].map(m => (
                  <div key={m.theme} className="bag-mapping-card" style={{ borderTop: `3px solid ${m.accent}` }}>
                    <div className="bag-mapping-bar" style={{ background: m.accent }} />
                    <div className="bag-mapping-theme">{m.theme}</div>
                    <div className="bag-mapping-tags">
                      {m.inds.map(tag => (
                        <span key={tag} className="bag-mapping-tag" style={{ background: `${m.accent}18`, color: m.accent, border: `1px solid ${m.accent}40` }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* What Leaders Will Learn */}
              <div className="bag-sh">What Leaders Will Learn</div>
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "36px 40px", marginBottom: 48 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                  {[
                    "How enterprises are deploying AI at scale",
                    "Building resilient digital ecosystems",
                    "Securing the modern enterprise",
                    "Modernising legacy infrastructure",
                    "Driving ROI from transformation investments",
                    "Leading through workforce and culture change",
                    "Implementing responsible and ethical AI governance",
                    "Preparing for Industry 4.0 and smart operations",
                  ].map(item => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12, color: "var(--text-body)", lineHeight: 1.65 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bag-final-cta">
                <div className="bag-final-cta-inner">
                  <h2 className="bag-h2">Explore the Themes <em>Shaping Tomorrow&apos;s Enterprise</em></h2>
                  <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.75 }}>
                    Join the conversations that matter most. Secure your place at BIG CIO Show 2026 and engage with the themes defining the enterprise technology landscape.
                  </p>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <a href={EVENT.register_url} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                      Register to Attend
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <button className="bcio-btn-outline" onClick={() => setTab("snapshot")}>View Full Agenda</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ─── CALL FOR SPEAKERS ─── */}
        {tab === "speak" && (
          <>
            <div className="bag-hero">
              <div className="bag-hero-inner">
                <div className="bcio-eyebrow">Applications Open</div>
                <h1 className="bag-h1">Share Your <em>CIO Story</em></h1>
                <p className="bag-sub">We are curating speakers for the {EVENT.edition_num} edition. We want real transformation stories — not vendor case studies. If you have led a technology initiative that moved the needle, apply now.</p>
              </div>
            </div>
            <div className="bag-speak-body">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 48 }}>
                {[
                  { title: "Keynote Speaker", desc: "30-minute solo presentation on a strategic enterprise technology topic. Highest visibility slot." },
                  { title: "Panel Speaker",   desc: "60-minute moderated panel with 4–5 peers. Invitation-based — apply and we'll match you to the right panel." },
                  { title: "Fireside Chat",   desc: "Intimate 20-minute conversation with our editorial chair. Best for single transformation stories." },
                  { title: "Roundtable Lead",  desc: "Facilitate a 45-minute roundtable of 12–15 CIO peers on a specific technical challenge." },
                ].map(f => (
                  <div key={f.title} className="bcio-session-card">
                    <div className="bag-theme-num">Format</div>
                    <div className="bag-theme-title">{f.title}</div>
                    <div className="bag-theme-desc">{f.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.20)", borderRadius: 16, padding: "48px 40px", textAlign: "center" }}>
                <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 12 }}>
                  Apply to <span style={{ color: "var(--cyan)" }}>Speak in {EVENT.edition}</span>
                </h2>
                <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.75 }}>
                  Submissions are reviewed by our editorial team. We prioritise practitioner insights over vendor-led content.
                </p>
                <button onClick={() => setSpeakFormOpen(true)} className="bcio-btn-primary">
                  Submit Application
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* SPEAKER APPLICATION MODAL */}
      {speakFormOpen && (
        <div className="bag-modal-backdrop" onClick={() => setSpeakFormOpen(false)}>
          <div className="bag-modal" onClick={e => e.stopPropagation()}>
            <div className="bag-modal-header">
              <span className="bag-modal-title">Speaker Application — {EVENT.name} {EVENT.edition}</span>
              <button className="bag-modal-close" onClick={() => setSpeakFormOpen(false)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <iframe src="https://share.hsforms.com/17VGEEbEbTyKJfeJncVy0DA1rb8t" title="Speaker Application Form" loading="lazy" />
          </div>
        </div>
      )}
    </>
  );
}
