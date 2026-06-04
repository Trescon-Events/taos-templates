"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

type AgendaSession = {
  id: number;
  title: string;
  desc: string;
  start: string;
  end: string;
  type: string;
  location: string;
  order: number;
  speakers: { name: string; designation: string; organisation: string; image_url: string }[];
};

const PASS_URL  = "https://konfhub.com/checkout/world-cx-summit-awards?ticketId=93844%7C1%3B&selectedCode=MKTWEBSITE";

const CONTENT_PILLARS = [
  {
    num: "01",
    title: "AI-First Customer Experience",
    desc: "How AI is reshaping every touchpoint — from intelligent chatbots to predictive personalisation at enterprise scale.",
    color: "#36BCB0",
  },
  {
    num: "02",
    title: "Hyper-Personalisation",
    desc: "Moving beyond segments to real-time, individual-level personalisation powered by data and machine learning.",
    color: "#C9A84C",
  },
  {
    num: "03",
    title: "Omnichannel Excellence",
    desc: "Delivering seamless, consistent experiences across every channel — digital, voice, in-store, and beyond.",
    color: "#36BCB0",
  },
  {
    num: "04",
    title: "Human-AI Balance",
    desc: "Finding the right equilibrium between automation and the irreplaceable human touch in customer interactions.",
    color: "#C9A84C",
  },
  {
    num: "05",
    title: "CX Metrics & ROI",
    desc: "Connecting customer experience investments to business outcomes — NPS, CSAT, CLV, and beyond.",
    color: "#36BCB0",
  },
  {
    num: "06",
    title: "Voice of the Customer",
    desc: "Advanced listening strategies — real-time feedback loops, sentiment analysis, and closing the loop at scale.",
    color: "#C9A84C",
  },
  {
    num: "07",
    title: "CX in BFSI & Healthcare",
    desc: "Sector-specific deep dives into regulated industries where CX is a competitive differentiator.",
    color: "#36BCB0",
  },
  {
    num: "08",
    title: "Future of Customer Loyalty",
    desc: "Rethinking loyalty programmes, emotional connection, and long-term retention in a hyper-competitive market.",
    color: "#C9A84C",
  },
];


const TYPE_STYLES: Record<string, { dot: string; badge: string; badgeText: string; label: string }> = {
  keynote:      { dot: "#36BCB0", badge: "rgba(54,188,176,0.12)",  badgeText: "#36BCB0",  label: "Keynote"      },
  panel:        { dot: "#C9A84C", badge: "rgba(201,168,76,0.12)",  badgeText: "#C9A84C",  label: "Panel"        },
  fireside:     { dot: "#a78bfa", badge: "rgba(167,139,250,0.12)", badgeText: "#a78bfa",  label: "Fireside"     },
  break:        { dot: "rgba(255,255,255,0.3)", badge: "rgba(255,255,255,0.05)", badgeText: "rgba(255,255,255,0.4)", label: "Break" },
  registration: { dot: "rgba(255,255,255,0.3)", badge: "rgba(255,255,255,0.05)", badgeText: "rgba(255,255,255,0.4)", label: "Registration" },
  networking:   { dot: "rgba(255,255,255,0.3)", badge: "rgba(255,255,255,0.05)", badgeText: "rgba(255,255,255,0.4)", label: "Networking" },
  ceremony:     { dot: "#C9A84C", badge: "rgba(201,168,76,0.12)",  badgeText: "#C9A84C",  label: "Opening"      },
  awards:       { dot: "#C9A84C", badge: "rgba(201,168,76,0.18)",  badgeText: "#C9A84C",  label: "Awards"       },
  techtalk:     { dot: "#6366f1", badge: "rgba(99,102,241,0.12)", badgeText: "#6366f1",  label: "Tech Talk"    },
};


type Tab = "overview" | "agenda" | "themes";

const TYPE_FILTERS = [
  { value: "",           label: "All" },
  { value: "keynote",    label: "Keynote" },
  { value: "panel",      label: "Panel" },
  { value: "techtalk",   label: "Tech Talk" },
  { value: "fireside",   label: "Fireside" },
  { value: "networking", label: "Networking" },
  { value: "break",      label: "Break" },
] as const;

export default function AgendaPage() {
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as Tab | null;
    if (t && (["overview","agenda","themes"] as string[]).includes(t)) {
      setTab(t);
    }
  }, []);

  const [sessions, setSessions] = useState<AgendaSession[]>([]);
  const [agendaLoading, setAgendaLoading] = useState(false);
  const [agendaError, setAgendaError] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    if (tab !== "agenda" || sessions.length > 0) return;
    setAgendaLoading(true);
    setAgendaError(false);
    fetch("/api/agenda")
      .then((r) => r.json())
      .then((d) => {
        setSessions(d.sessions ?? []);
        setAgendaLoading(false);
      })
      .catch(() => {
        setAgendaError(true);
        setAgendaLoading(false);
      });
  }, [tab, sessions.length]);

  return (
    <>
      <style>{`
        .ag-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 72px;
        }

        /* ── Tab bar ── */
        .ag-tabbar {
          background: var(--bg-surface);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .ag-tabbar-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 40px;
          display: flex; gap: 0;
          overflow-x: auto; scrollbar-width: none;
        }
        .ag-tabbar-inner::-webkit-scrollbar { display: none; }
        .ag-tab {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
          padding: 16px 22px; cursor: pointer;
          border: none; background: none; font-family: inherit;
          border-bottom: 2px solid transparent; white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
        }
        .ag-tab:hover { color: rgba(255,255,255,0.7); }
        .ag-tab.active { color: #36BCB0; border-bottom-color: #36BCB0; }

        /* ── Shared section styles ── */
        .ag-section { max-width: 1200px; margin: 0 auto; padding: 64px 40px; }
        .ag-section-alt { background: var(--bg-surface); border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ag-section-alt .ag-section { padding: 64px 40px; }
        .ag-overline {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--coral); margin-bottom: 12px;
        }
        .ag-h1 {
          font-size: clamp(28px, 4vw, 54px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; line-height: 1.12;
          margin-bottom: 20px;
        }
        .ag-h1 em { color: var(--gold); font-style: normal; }
        .ag-h2 {
          font-size: clamp(24px, 3vw, 40px); font-weight: 900;
          letter-spacing: -0.02em; color: #fff; margin-bottom: 12px;
        }
        .ag-h2 em { color: var(--gold); font-style: normal; }
        .ag-lead {
          font-size: 16px; color: var(--text-body);
          max-width: 620px; line-height: 1.75; margin-bottom: 36px;
        }

        /* ── OVERVIEW ── */
        .ag-ov-hero {
          background: var(--bg-surface);
          padding: 80px 40px 64px; text-align: center;
          border-bottom: 1px solid rgba(54,188,176,0.10);
          position: relative; overflow: hidden;
        }
        .ag-ov-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(54,188,176,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ag-ov-hero-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .ag-ov-stats {
          display: flex; justify-content: center; gap: 48px;
          flex-wrap: wrap; margin-top: 48px; padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .ag-ov-stat { text-align: center; }
        .ag-ov-stat-val {
          font-size: 32px; font-weight: 900;
          letter-spacing: -0.02em; color: var(--gold); line-height: 1;
        }
        .ag-ov-stat-lbl {
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.45);
          margin-top: 6px;
        }
        .ag-ov-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .ag-ov-card {
          background: var(--bg-surface); border: 1px solid var(--border);
          padding: 28px 24px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .ag-ov-card:hover {
          border-color: rgba(54,188,176,0.35); transform: translateY(-3px);
        }
        .ag-ov-card-icon {
          width: 40px; height: 40px;
          background: rgba(54,188,176,0.10); border: 1px solid rgba(54,188,176,0.20);
          display: flex; align-items: center; justify-content: center;
          color: #36BCB0; margin-bottom: 16px;
        }
        .ag-ov-card-title { font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .ag-ov-card-desc { font-size: 12px; color: var(--text-body); line-height: 1.7; }

        /* ── AGENDA SNAPSHOT ── */
        .ag-timeline { position: relative; }
        .ag-tl-line {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px; background: rgba(255,255,255,0.06); overflow: hidden;
        }
        .ag-tl-sparkle {
          position: absolute; left: 0; right: 0; height: 120px; top: -120px;
          background: linear-gradient(to bottom, transparent, rgba(54,188,176,0.6), #C9A84C, rgba(255,255,255,0.9), #C9A84C, rgba(54,188,176,0.6), transparent);
          animation: ag-travel 9s linear infinite;
        }
        @keyframes ag-travel { 0% { top: -120px; } 100% { top: 100%; } }
        .ag-session {
          display: grid; grid-template-columns: 100px 1fr;
          gap: 24px; padding: 0 0 28px 28px; position: relative;
        }
        .ag-session::before {
          content: ''; position: absolute; left: -5px; top: 6px;
          width: 12px; height: 12px; border-radius: 50%;
          border: 2px solid var(--bg-primary); background: var(--coral);
        }
        .ag-session.awards-type::before,
        .ag-session.ceremony-type::before { background: var(--gold); }
        .ag-session.break-type::before,
        .ag-session.registration-type::before,
        .ag-session.networking-type::before { background: rgba(255,255,255,0.25); }
        .ag-session.fireside-type::before { background: #a78bfa; }

        /* Shimmer skeleton */
        @keyframes ag-shimmer { 0% { opacity: 0.4; } 50% { opacity: 0.7; } 100% { opacity: 0.4; } }
        .ag-shimmer { background: rgba(255,255,255,0.08); animation: ag-shimmer 1.4s ease-in-out infinite; }

        /* Speaker chips inside sessions */
        .ag-session-speakers { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .ag-spk-chip {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          padding: 4px 10px 4px 4px; border-radius: 20px;
        }
        .ag-spk-chip-avatar {
          width: 22px; height: 22px; border-radius: 50%; object-fit: cover;
        }
        .ag-spk-chip-initials {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(54,188,176,0.15); display: flex; align-items: center;
          justify-content: center; font-size: 9px; font-weight: 800; color: #36BCB0;
        }
        .ag-spk-chip-name { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.7); }
        .ag-session-location { margin-top: 8px; font-size: 10px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; }
        .ag-session-time-start { font-size: 12px; font-weight: 800; color: #fff; margin-bottom: 3px; }
        .ag-session-time-end { font-size: 10px; color: var(--text-muted); }
        .ag-session-card {
          background: var(--bg-surface); border: 1px solid var(--border);
          padding: 20px 22px; border-radius: 12px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .ag-session.break-type .ag-session-card,
        .ag-session.registration-type .ag-session-card,
        .ag-session.networking-type .ag-session-card {
          background: transparent; border-color: rgba(255,255,255,0.05);
        }
        .ag-session-card:hover { border-color: rgba(54,188,176,0.30); transform: translateX(4px); }
        .ag-session-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 3px 9px; margin-bottom: 8px;
          border-radius: 4px;
        }
        .ag-session-title { font-size: 14px; font-weight: 800; color: #fff; line-height: 1.4; margin-bottom: 6px; }
        .ag-session-desc { font-size: 12px; color: var(--text-body); line-height: 1.7; }
        .ag-session-desc ul { margin: 6px 0 0 16px; padding: 0; list-style: disc; }
        .ag-session-desc li { margin-bottom: 4px; }
        .ag-session-desc p { margin: 0 0 4px; }
        .ag-snap-note {
          background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.15);
          padding: 18px 24px; margin-top: 32px; border-radius: 10px;
          font-size: 12px; color: var(--gold); font-weight: 600; text-align: center;
        }

        /* ── Filter pills ── */
        .ag-filter-bar {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;
        }
        .ag-filter-pill {
          font-size: 10px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; padding: 5px 14px; border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.12); background: transparent;
          color: rgba(255,255,255,0.45); cursor: pointer; font-family: inherit;
          transition: color 0.18s, border-color 0.18s, background 0.18s;
        }
        .ag-filter-pill:hover { color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.28); }
        .ag-filter-pill.active {
          background: rgba(54,188,176,0.12); border-color: #36BCB0; color: #36BCB0;
        }

        /* ── CONTENT PILLARS ── */
        .ag-pillars-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
          background: rgba(255,255,255,0.04);
        }
        .ag-pillar {
          background: var(--bg-surface); padding: 32px 24px;
          transition: background 0.2s;
          position: relative; overflow: hidden;
        }
        .ag-pillar:hover { background: rgba(54,188,176,0.05); }
        .ag-pillar::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
        }
        .ag-pillar-num {
          font-size: 36px; font-weight: 900; letter-spacing: -0.04em;
          line-height: 1; margin-bottom: 14px; opacity: 0.15;
        }
        .ag-pillar-title {
          font-size: 14px; font-weight: 800; color: #fff;
          line-height: 1.4; margin-bottom: 10px;
        }
        .ag-pillar-desc { font-size: 12px; color: var(--text-body); line-height: 1.7; }

        /* ── SPEAKERS ── */
        .ag-spk-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
        }
        .ag-spk-card {
          background: var(--bg-surface); border: 1px solid var(--border);
          overflow: hidden; transition: border-color 0.3s, transform 0.3s;
        }
        .ag-spk-card:hover { border-color: rgba(201,168,76,0.30); transform: translateY(-4px); }
        .ag-spk-img-wrap { aspect-ratio: 3/4; overflow: hidden; position: relative; }
        .ag-spk-img-wrap::after {
          content: ''; position: absolute; inset: 0;
          box-shadow: inset 0 0 28px rgba(54,188,176,0.18);
          pointer-events: none; z-index: 3;
        }
        .ag-spk-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: transform 0.5s; display: block; }
        .ag-spk-card:hover .ag-spk-img { transform: scale(1.05); }
        .ag-spk-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(10,22,40,0.95) 100%);
          z-index: 2;
        }
        .ag-spk-company {
          position: absolute; bottom: 12px; left: 12px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: var(--gold);
          background: rgba(10,22,40,0.80); backdrop-filter: blur(8px);
          border: 1px solid rgba(201,168,76,0.25); padding: 4px 10px; z-index: 4;
        }
        .ag-spk-bar { height: 2px; background: linear-gradient(90deg, var(--coral), var(--gold)); transform: scaleX(0); transform-origin: left; transition: transform 0.35s; }
        .ag-spk-card:hover .ag-spk-bar { transform: scaleX(1); }
        .ag-spk-info { padding: 16px 18px 18px; }
        .ag-spk-name { font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 4px; }
        .ag-spk-role { font-size: 11px; color: var(--text-muted); line-height: 1.5; }
        .ag-spk-fallback {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #0F1E38, #152233);
        }
        .ag-spk-initials { font-size: 44px; font-weight: 900; color: rgba(201,168,76,0.3); }
        .ag-spk-2026-note {
          background: rgba(54,188,176,0.06); border: 1px solid rgba(54,188,176,0.15);
          padding: 28px 32px; margin-top: 32px; display: flex;
          align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;
        }
        .ag-spk-2026-note p { font-size: 14px; color: rgba(255,255,255,0.7); }
        .ag-spk-2026-note strong { color: #36BCB0; }


        /* Responsive */
        @media (max-width: 1024px) {
          .ag-pillars-grid { grid-template-columns: repeat(2, 1fr); }
          .ag-spk-grid { grid-template-columns: repeat(3, 1fr); }
          .ag-ov-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ag-ov-hero { padding: 56px 24px 48px; }
          .ag-section { padding: 40px 24px; }
          .ag-spk-grid { grid-template-columns: repeat(2, 1fr); }
          .ag-cfs-criteria { grid-template-columns: 1fr; padding: 0 24px 48px; }
          .ag-cfs-hero { padding: 56px 24px 48px; }
          .ag-cfs-form { padding: 32px 24px; margin: 0 24px 48px; }
          .ag-session { grid-template-columns: 80px 1fr; }
          .ag-tabbar-inner { padding: 0 16px; }
          .ag-tab { padding: 14px 14px; }
          .ag-ov-stats { gap: 28px; }
        }
        @media (max-width: 480px) {
          .ag-pillars-grid { grid-template-columns: 1fr; }
          .ag-spk-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .ag-ov-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ag-page">

        {/* Tab bar */}
        <div className="ag-tabbar">
          <div className="ag-tabbar-inner">
            {([
              ["overview", "Overview"],
              ["agenda",   "Agenda"],
              ["themes",   "Themes"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} className={`ag-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <>
            <div className="ag-ov-hero">
              <div className="ag-ov-hero-inner">
                <div className="ag-overline">4 June 2026 · Bengaluru, India</div>
                <h1 className="ag-h1">1 Day, 40+ <em>CX Voices,</em><br />Zero Filler</h1>
                <p className="ag-lead" style={{ margin: "0 auto 36px", textAlign: "center" }}>
                  The World CX Summit agenda is curated for one purpose — outcomes. Every session, every speaker, every conversation is selected to move the needle on customer experience in India.
                </p>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-primary">
                  Get Your Pass
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <div className="ag-ov-stats">
                  {[
                    { val: "40+",  lbl: "Speakers" },
                    { val: "400+", lbl: "Attendees" },
                    { val: "8",    lbl: "Content Tracks" },
                    { val: "100+", lbl: "Award Categories" },
                    { val: "1",    lbl: "Unmissable Day" },
                  ].map(s => (
                    <div key={s.lbl} className="ag-ov-stat">
                      <div className="ag-ov-stat-val">{s.val}</div>
                      <div className="ag-ov-stat-lbl">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ag-section">
              <div className="ag-overline" style={{ textAlign: "center", marginBottom: 40 }}>What Happens on the Day</div>
              <div className="ag-ov-grid">
                {([
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="9" y="2" width="6" height="11" rx="3"/>
                        <path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8"/>
                      </svg>
                    ),
                    title: "Keynotes",
                    desc: "Senior CX leaders from India's largest enterprises share transformation stories and future strategies.",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    ),
                    title: "Panel Discussions",
                    desc: "Cross-industry debates on the most pressing CX challenges — AI, loyalty, omnichannel, and more.",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        <path d="M8 10h.01M12 10h.01M16 10h.01"/>
                      </svg>
                    ),
                    title: "Fireside Chats",
                    desc: "Intimate one-on-one conversations with Chief Customer Officers and CX innovators.",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <path d="M8 21h8M12 17v4"/>
                        <path d="M9 8l2 2 4-4"/>
                      </svg>
                    ),
                    title: "Product Showcases",
                    desc: "Technology providers demonstrate live solutions for the CX challenges you face every day.",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="5" r="2"/>
                        <circle cx="4" cy="19" r="2"/>
                        <circle cx="20" cy="19" r="2"/>
                        <path d="M12 7v4M12 11l-6.5 6.5M12 11l6.5 6.5"/>
                      </svg>
                    ),
                    title: "Power Networking",
                    desc: "Structured 1:1 meetings and open networking with 400+ pre-qualified CX decision-makers.",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M8 21h8M12 17v4M17 9a5 5 0 0 1-10 0V4h10v5z"/>
                      </svg>
                    ),
                    title: "World CX Awards",
                    desc: "India's most prestigious CX recognition — 100+ categories celebrating excellence across every sector.",
                  },
                ] as { icon: React.ReactNode; title: string; desc: string }[]).map(item => (
                  <div key={item.title} className="ag-ov-card">
                    <div className="ag-ov-card-icon">{item.icon}</div>
                    <div className="ag-ov-card-title">{item.title}</div>
                    <div className="ag-ov-card-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", padding: "0 40px 64px" }}>
              <button className="wcx-btn-gold" onClick={() => setTab("agenda")}>
                View Agenda
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </>
        )}

        {/* ── AGENDA ── */}
        {tab === "agenda" && (
          <>
            <div style={{ background: "var(--bg-surface)", padding: "56px 40px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div className="ag-overline">4 June 2026</div>
                <h2 className="ag-h2">Agenda <em>Snapshot</em></h2>
                <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 560, lineHeight: 1.7 }}>
                  A full day from 08:00 to 21:00 IST. Sessions, timings, and speakers subject to change — final agenda published closer to the event.
                </p>
              </div>
            </div>

            <div className="ag-section" style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 48, alignItems: "start" }}>
              {/* Sidebar */}
              <div style={{ position: "sticky", top: 144 }}>
                <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", padding: "24px 20px", marginBottom: 12 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Date & Venue</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "var(--gold)", marginBottom: 4 }}>4 June 2026</div>
                  <div style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.5 }}>Bengaluru, India<br />Venue TBA</div>
                </div>
                <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", padding: "24px 20px", marginBottom: 12 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>Session Types</div>
                  {[
                    { label: "Keynote",           dot: "#36BCB0" },
                    { label: "Panel Discussion",  dot: "#C9A84C" },
                    { label: "Fireside Chat",     dot: "#a78bfa" },
                    { label: "Awards Ceremony",   dot: "#C9A84C" },
                    { label: "Tech Talk",          dot: "#6366f1" },
                    { label: "Break / Networking",dot: "rgba(255,255,255,0.3)" },
                  ].map(({ label, dot }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: dot, flexShrink: 0 }} />
                      {label}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 4 }}>
                  <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Get Your Pass
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>

              {/* Timeline */}
              <div>
                {/* Filter pills */}
                <div className="ag-filter-bar">
                  {TYPE_FILTERS.map(f => (
                    <button
                      key={f.value}
                      className={`ag-filter-pill${typeFilter === f.value ? " active" : ""}`}
                      onClick={() => setTypeFilter(f.value)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="ag-timeline">
                  <div className="ag-tl-line"><div className="ag-tl-sparkle" /></div>

                  {/* Loading skeletons */}
                  {agendaLoading && Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="ag-session break-type">
                      <div>
                        <div className="ag-shimmer" style={{ width: 54, height: 13, borderRadius: 4 }} />
                        <div className="ag-shimmer" style={{ width: 38, height: 10, borderRadius: 4, marginTop: 5 }} />
                      </div>
                      <div className="ag-session-card" style={{ opacity: 0.6 }}>
                        <div className="ag-shimmer" style={{ width: 72, height: 20, borderRadius: 4, marginBottom: 10 }} />
                        <div className="ag-shimmer" style={{ width: "65%", height: 14, borderRadius: 4, marginBottom: 7 }} />
                        <div className="ag-shimmer" style={{ width: "85%", height: 11, borderRadius: 4 }} />
                      </div>
                    </div>
                  ))}

                  {/* Error */}
                  {agendaError && (
                    <div style={{ padding: "48px 0", textAlign: "center" }}>
                      <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>Could not load agenda. Please refresh and try again.</div>
                      <button
                        onClick={() => { setAgendaError(false); setSessions([]); }}
                        style={{ fontSize: 12, color: "var(--coral)", background: "none", border: "1px solid rgba(255,100,80,0.3)", padding: "6px 16px", cursor: "pointer" }}
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {/* Live sessions */}
                  {!agendaLoading && !agendaError && sessions.filter(s => !typeFilter || s.type === typeFilter).map((s) => {
                    const cfg = TYPE_STYLES[s.type] || TYPE_STYLES.break;
                    return (
                      <div key={s.id} className={`ag-session ${s.type}-type`}>
                        <div>
                          <div className="ag-session-time-start">{s.start}</div>
                          <div className="ag-session-time-end">{s.end}</div>
                        </div>
                        <div className="ag-session-card">
                          <span className="ag-session-badge" style={{ background: cfg.badge, color: cfg.badgeText, border: `1px solid ${cfg.badgeText}22` }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
                            {cfg.label}
                          </span>
                          <div className="ag-session-title">{s.title as string}</div>
                          {s.desc && <div className="ag-session-desc" dangerouslySetInnerHTML={{ __html: s.desc as string }} />}
                          {s.speakers.length > 0 && (
                            <div className="ag-session-speakers">
                              {s.speakers.map((sp, i) => (
                                <div key={i} className="ag-spk-chip">
                                  {sp.image_url ? (
                                    <img src={sp.image_url as string} alt={sp.name as string} className="ag-spk-chip-avatar" />
                                  ) : (
                                    <div className="ag-spk-chip-initials">{(sp.name as string).charAt(0)}</div>
                                  )}
                                  <span className="ag-spk-chip-name">{sp.name as string}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {s.location && (
                            <div className="ag-session-location">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                              {s.location as string}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!agendaLoading && !agendaError && sessions.length > 0 && (
                  <div className="ag-snap-note">
                    Agenda is live — speaker details and timings are updated as confirmed closer to 4 June 2026.
                  </div>
                )}
                {!agendaLoading && !agendaError && sessions.length === 0 && (
                  <div className="ag-snap-note">
                    Full agenda with confirmed speakers and session details will be published closer to the event.
                  </div>
                )}
                {!agendaLoading && !agendaError && sessions.length > 0 && sessions.filter(s => !typeFilter || s.type === typeFilter).length === 0 && (
                  <div className="ag-snap-note" style={{ color: "rgba(255,255,255,0.45)" }}>
                    No sessions match this filter.
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── THEMES ── */}
        {tab === "themes" && (
          <>
            <div style={{ background: "var(--bg-surface)", padding: "64px 40px 56px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div className="ag-overline">8 Focus Areas</div>
                <h2 className="ag-h2">Content <em>Pillars</em></h2>
                <p style={{ fontSize: 15, color: "var(--text-body)", maxWidth: 580, lineHeight: 1.75 }}>
                  Every session at World CX Summit maps to one of eight carefully chosen content pillars — the themes that define where CX is headed in India and globally.
                </p>
              </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px 80px" }}>
              <div className="ag-pillars-grid">
                {CONTENT_PILLARS.map(p => (
                  <div key={p.num} className="ag-pillar" style={{ "--pillar-color": p.color } as React.CSSProperties}>
                    <style>{`.ag-pillar:nth-child(${parseInt(p.num)})::before { background: ${p.color}; }`}</style>
                    <div className="ag-pillar-num" style={{ color: p.color }}>{p.num}</div>
                    <div className="ag-pillar-title">{p.title}</div>
                    <div className="ag-pillar-desc">{p.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 48 }}>
                <a href="/attend?tab=speaker#enquire-form" className="wcx-btn-gold" style={{ display: "inline-flex" }}>
                  Apply to Speak on These Topics
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </>
        )}



      </div>
    </>
  );
}
