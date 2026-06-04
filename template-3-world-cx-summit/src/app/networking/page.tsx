"use client";
import { useState, useEffect } from "react";
import Link from "next/link";


type Tab = "overview" | "attendee-app" | "ai-matchmaking" | "photo-gallery" | "whatsapp";

const PASS_URL = "https://konfhub.com/checkout/world-cx-summit-awards?ticketId=93844%7C1%3B&selectedCode=MKTWEBSITE";

const ATTENDEE_FEATURES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: "Personalised Agenda",
    desc: "Your schedule, built around your interests. Sessions curated to what matters most to you.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    title: "Everything in One Place",
    desc: "Schedule, speakers, sessions, sponsors — all accessible from a single app, no juggling required.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    title: "Seamless Networking",
    desc: "Browse attendee profiles, send connection requests, and schedule 1:1 meetings — before you even arrive.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    title: "Real-Time Notifications",
    desc: "Stay updated on session changes, meeting reminders, and announcements the moment they happen.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    title: "AI-Powered Matchmaking",
    desc: "Our AI analyses your goals, role, and interests to suggest the connections that will matter most.",
  },
];

const SPONSOR_FEATURES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Connect with High-Intent Attendees",
    desc: "Every delegate in the app is a qualified CX decision-maker. No noise — just relevant, high-value connections.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: "Drive Booth Traffic",
    desc: "Targeted in-app visibility pushes attendees to your exhibition space at the right moments throughout the day.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: "Direct In-App Interactions",
    desc: "Message delegates, schedule meetings, and share resources directly via the app — no middleman needed.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><path d="M3 17a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z"/></svg>,
    title: "Capture Meaningful Leads",
    desc: "QR-based lead capture with full delegate profiles — not just names, but roles, interests, and buying intent.",
  },
];

const APP_SCREENS = [
  { label: "Agenda",   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: "Network",  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { label: "Speakers", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
  { label: "Scan",     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><path d="M21 16h-3v3"/><path d="M21 21h-3v-3"/></svg> },
  { label: "Sponsors", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
];

const AUDIENCE = [
  { role: "Chief Experience Officers",          count: "60+"  },
  { role: "VP / Head of Customer Experience",   count: "80+"  },
  { role: "Chief Marketing Officers",           count: "40+"  },
  { role: "Chief Digital Officers",             count: "35+"  },
  { role: "Head of Contact Centre Operations",  count: "50+"  },
  { role: "CX Technology Leaders",              count: "45+"  },
  { role: "Founders & CEOs",                    count: "30+"  },
  { role: "Senior CX Consultants",              count: "60+"  },
];

const INDUSTRIES = [
  "Banking & Financial Services", "Insurance", "Retail & E-commerce",
  "Telecom", "Healthcare", "Hospitality & Travel",
  "Automotive", "EdTech", "Logistics", "FMCG",
];

const WA_GROUPS = [
  { label: "CX Leaders",          color: "#36BCB0" },
  { label: "AI & Digital",        color: "#C9A84C" },
  { label: "BFSI",                color: "#a78bfa" },
  { label: "Retail & E-commerce", color: "#36BCB0" },
  { label: "Healthcare CX",       color: "#C9A84C" },
  { label: "Contact Centres",     color: "#a78bfa" },
  { label: "CX Technology",       color: "#36BCB0" },
  { label: "Founders & CEOs",     color: "#C9A84C" },
];

export default function NetworkingPage() {
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as Tab | null;
    if (t && (["overview","attendee-app","ai-matchmaking","photo-gallery","whatsapp"] as string[]).includes(t)) {
      setTab(t);
    }
  }, []);

  const TABS: [Tab, string][] = [
    ["overview",       "Overview"],
    ["attendee-app",   "Attendee App"],
    ["ai-matchmaking", "AI Matchmaking"],
    ["photo-gallery",  "Photo Gallery"],
    ["whatsapp",       "WhatsApp Networking"],
  ];

  return (
    <>
      <style>{`
        .net-page { padding-top: 72px; background: var(--bg-primary); }

        /* ── Tab bar ── */
        .net-tabbar {
          background: var(--bg-surface);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .net-tabbar-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
          display: flex; gap: 0; overflow-x: auto; scrollbar-width: none;
        }
        .net-tabbar-inner::-webkit-scrollbar { display: none; }
        .net-tab {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
          padding: 16px 22px; cursor: pointer;
          border: none; background: none; font-family: inherit;
          border-bottom: 2px solid transparent; white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
        }
        .net-tab:hover { color: rgba(255,255,255,0.7); }
        .net-tab.active { color: #36BCB0; border-bottom-color: #36BCB0; }

        /* ── Shared section styles ── */
        .net-section { max-width: 1200px; margin: 0 auto; padding: 64px 40px; }
        .net-overline {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--coral); margin-bottom: 12px;
        }
        .net-h1 {
          font-size: clamp(36px, 5.5vw, 64px); font-weight: 900; line-height: 1.06;
          letter-spacing: -0.03em; color: #fff;
        }
        .net-h1 em { font-style: normal; color: var(--coral); }
        .net-h2 {
          font-size: clamp(28px, 3.5vw, 48px); font-weight: 900; line-height: 1.08;
          letter-spacing: -0.03em; color: #fff;
        }
        .net-h2 em { font-style: normal; color: var(--coral); }
        .net-lead { font-size: 15px; color: var(--text-body); line-height: 1.8; }

        /* ── Hero ── */
        .net-hero {
          position: relative; padding: 90px 40px 72px;
          text-align: center; overflow: hidden;
        }
        .net-hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 55% at 50% 0%, rgba(54,188,176,0.13) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 20% 100%, rgba(201,168,76,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .net-hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--coral); border: 1px solid rgba(54,188,176,0.3); padding: 6px 16px; margin-bottom: 28px;
        }
        .net-hero-stats {
          display: flex; align-items: center; justify-content: center; gap: 56px;
          flex-wrap: wrap; margin-top: 56px; padding-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .net-stat { text-align: center; }
        .net-stat-num { font-size: 38px; font-weight: 900; letter-spacing: -0.03em; color: var(--coral); line-height: 1; }
        .net-stat-label { font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 6px; }

        /* ── App band ── */
        .net-app-band {
          background: var(--bg-surface);
          border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 80px 40px; position: relative; overflow: hidden;
        }
        .net-app-band::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 80% at 50% 50%, rgba(54,188,176,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .net-app-band-inner {
          max-width: 1200px; margin: 0 auto; position: relative; z-index: 2;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .net-app-kicker {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--coral); margin-bottom: 14px; display: flex; align-items: center; gap: 10px;
        }
        .net-app-kicker::before { content: ''; width: 24px; height: 1px; background: var(--coral); opacity: 0.6; }
        .net-app-h2 {
          font-size: clamp(26px, 3.5vw, 44px); font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.1; color: #fff; margin-bottom: 16px;
        }
        .net-app-h2 em { font-style: normal; color: var(--gold); }
        .net-app-desc { font-size: 15px; color: var(--text-body); line-height: 1.8; margin-bottom: 32px; }
        .net-app-konfhub {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-muted); padding: 8px 0;
        }
        .net-app-konfhub span { color: rgba(255,255,255,0.5); }

        /* ═══ PHONE SHELL — Premium Realistic ═══ */
        .net-phone-wrap { display: flex; justify-content: center; align-items: flex-end; gap: 28px; }

        .net-phone {
          width: 192px;
          height: 416px;
          background: #fff;
          border: 10px solid #1a1a1a;
          border-radius: 46px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow:
            0 0 0 1px #444,
            0 0 0 3px #0a0a0a,
            20px 60px 100px rgba(0,0,0,0.65),
            0 20px 50px rgba(0,0,0,0.4),
            -10px 20px 60px rgba(0,0,0,0.3),
            0 0 80px rgba(54,188,176,0.20);
        }
        /* Glass screen reflection — diagonal highlight */
        .net-phone::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(150deg, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
          z-index: 100;
          border-radius: 36px 36px 0 0;
        }
        .net-phone.large { width: 215px; height: 460px; transform: translateY(-26px); z-index: 2; }

        /* Dynamic island */
        .net-phone-notch {
          height: 28px; background: #fff;
          display: flex; align-items: flex-start; justify-content: center;
          flex-shrink: 0; position: relative; z-index: 10;
        }
        .net-phone-notch-pill {
          width: 80px; height: 28px;
          background: #111;
          border-radius: 0 0 20px 20px;
          display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        /* Camera dot inside island */
        .net-phone-notch-pill::after {
          content: '';
          width: 7px; height: 7px; border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #2a2a2a, #111);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 4px rgba(0,0,0,0.9);
        }

        /* Status bar */
        .net-phone-status {
          display: flex; justify-content: space-between; align-items: center;
          padding: 3px 16px 5px;
          font-size: 7.5px; font-weight: 800; color: #111; background: #fff;
          flex-shrink: 0; position: relative; z-index: 10;
        }

        /* Screen area — fills remaining height, clips overflow */
        .net-phone-screen { padding: 10px 12px; background: #fff; flex: 1; min-height: 0; overflow: hidden; position: relative; z-index: 10; }

        /* Content */
        .net-phone-greeting { font-size: 9px; color: #9ca3af; margin-bottom: 3px; font-weight: 600; }
        .net-phone-event-name { font-size: 11.5px; font-weight: 900; color: #0D1E35; line-height: 1.25; margin-bottom: 12px; }
        .net-phone-section-label { font-size: 7.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #36BCB0; margin-bottom: 6px; }
        .net-phone-session-card {
          background: rgba(54,188,176,0.06); border: 1px solid rgba(54,188,176,0.20);
          border-left: 3px solid #36BCB0; border-radius: 10px; padding: 9px 10px; margin-bottom: 7px;
        }
        .net-phone-session-time { font-size: 7.5px; color: #36BCB0; font-weight: 700; margin-bottom: 2px; }
        .net-phone-session-title { font-size: 9px; font-weight: 800; color: #0D1E35; line-height: 1.3; }
        .net-phone-session-tag {
          display: inline-block; font-size: 6.5px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: #36BCB0; background: rgba(54,188,176,0.10);
          border: 1px solid rgba(54,188,176,0.28); border-radius: 20px; padding: 2px 7px; margin-top: 4px;
        }
        .net-phone-people-label { font-size: 7.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin: 10px 0 6px; }
        .net-phone-person { display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
        .net-phone-person-info { display: flex; align-items: center; gap: 7px; }
        .net-phone-avatar {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(54,188,176,0.12); border: 1.5px solid rgba(54,188,176,0.32);
          display: flex; align-items: center; justify-content: center;
          font-size: 8px; font-weight: 800; color: #36BCB0; flex-shrink: 0;
        }
        .net-phone-person-name { font-size: 8.5px; font-weight: 700; color: #0D1E35; }
        .net-phone-person-role { font-size: 7px; color: #6b7280; margin-top: 1px; }
        .net-phone-connect-btn {
          font-size: 7px; font-weight: 700; background: #36BCB0; color: #fff;
          padding: 4px 10px; border-radius: 20px; white-space: nowrap; flex-shrink: 0;
        }

        /* Bottom nav */
        .net-phone-nav {
          display: flex; justify-content: space-around; align-items: center;
          padding: 9px 8px 5px; border-top: 1px solid #f0f0f0; background: #fff;
          flex-shrink: 0; position: relative; z-index: 10;
        }
        .net-phone-nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 6px; font-weight: 700; color: #9ca3af; letter-spacing: 0.04em; }
        .net-phone-nav-item.active { color: #36BCB0; }

        /* Home indicator bar */
        .net-phone-home {
          height: 20px; background: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; z-index: 10;
        }
        .net-phone-home::after {
          content: '';
          width: 56px; height: 4px; border-radius: 2px;
          background: rgba(0,0,0,0.14);
        }

        /* ── App nav tabs ── */
        .net-app-nav-preview { background: var(--bg-surface); border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 56px 40px; }
        .net-app-nav-inner { max-width: 1200px; margin: 0 auto; }
        .net-app-nav-label { text-align: center; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 32px; }
        .net-app-tabs { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
        .net-app-tab { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 10px 20px; border: 1px solid var(--border); color: var(--text-muted); background: var(--bg-card); transition: border-color 0.2s, color 0.2s; }
        .net-app-tab:hover, .net-app-tab.active { color: var(--coral); border-color: rgba(54,188,176,0.4); }

        /* ── Split layout ── */
        .net-features-section { max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
        .net-features-header { text-align: center; margin-bottom: 56px; }
        .net-features-kicker { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--coral); margin-bottom: 12px; }
        .net-features-h2 { font-size: clamp(26px, 3.5vw, 42px); font-weight: 900; letter-spacing: -0.03em; color: #fff; line-height: 1.1; margin-bottom: 14px; }
        .net-features-h2 em { font-style: normal; color: var(--coral); }
        .net-features-sub { font-size: 15px; color: var(--text-body); max-width: 540px; margin: 0 auto; line-height: 1.7; }
        .net-split { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .net-split-panel { background: var(--bg-surface); padding: 48px 40px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.09); transition: border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease; }
        .net-split-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 14px; margin-bottom: 32px; }
        .net-split-badge.teal { color: var(--coral); border: 1px solid rgba(54,188,176,0.35); background: rgba(54,188,176,0.06); }
        .net-split-badge.gold { color: var(--gold); border: 1px solid rgba(201,168,76,0.35); background: rgba(201,168,76,0.06); }
        .net-split-title { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 28px; letter-spacing: -0.02em; }
        .net-feature-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 22px; }
        .net-feature-icon-wrap { width: 36px; height: 36px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 8px; }
        .net-feature-icon-wrap.teal { background: rgba(54,188,176,0.10); color: var(--coral); }
        .net-feature-icon-wrap.gold { background: rgba(201,168,76,0.10); color: var(--gold); }
        .net-feature-text-title { font-size: 13px; font-weight: 800; color: #fff; margin-bottom: 4px; }
        .net-feature-text-desc { font-size: 12px; color: var(--text-body); line-height: 1.65; }

        /* ── Who you'll meet ── */
        .net-audience { background: var(--bg-surface); border-top: 1px solid rgba(255,255,255,0.06); }
        .net-audience-inner { max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
        .net-audience-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
        .net-section-kicker { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--coral); margin-bottom: 10px; }
        .net-section-h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 900; letter-spacing: -0.02em; color: #fff; margin-bottom: 32px; }
        .net-role-list { display: flex; flex-direction: column; }
        .net-role-row { display: flex; align-items: center; justify-content: space-between; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .net-role-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.82); }
        .net-role-count { font-size: 13px; font-weight: 800; color: var(--coral); }
        .net-ind-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 14px; }
        .net-ind-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .net-ind-tag { font-size: 11px; font-weight: 600; padding: 5px 12px; background: rgba(54,188,176,0.06); border: 1px solid rgba(54,188,176,0.16); color: rgba(255,255,255,0.7); }
        .net-pre-event-box { background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.2); padding: 22px 24px; border-radius: 20px; }
        .net-pre-event-title { font-size: 13px; font-weight: 800; color: var(--gold); margin-bottom: 8px; }
        .net-pre-event-desc { font-size: 12px; color: var(--text-body); line-height: 1.7; }

        /* ── CTA ── */
        .net-cta { padding: 90px 40px; text-align: center; background: linear-gradient(180deg, var(--bg-primary) 0%, #081526 100%); }
        .net-cta-inner { max-width: 660px; margin: 0 auto; }
        .net-cta-h2 { font-size: clamp(26px, 3.5vw, 42px); font-weight: 900; letter-spacing: -0.03em; color: #fff; line-height: 1.1; margin-bottom: 16px; }
        .net-cta-h2 em { font-style: normal; color: var(--coral); }
        .net-cta-p { font-size: 15px; color: var(--text-body); line-height: 1.75; margin-bottom: 36px; }
        .net-cta-btns { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }

        /* ── AI feature layouts ── */
        .net-ai-row { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: flex-start; margin-bottom: 4px; }

        /* Face scan */
        .net-scan-wrap { margin: 14px auto; width: 130px; height: 160px; position: relative; display: flex; align-items: center; justify-content: center; }
        .net-scan-corner { position: absolute; width: 20px; height: 20px; border-style: solid; border-width: 0; border-color: #36BCB0; }
        .net-scan-corner.tl { top: 0; left: 0; border-top-width: 2px; border-left-width: 2px; }
        .net-scan-corner.tr { top: 0; right: 0; border-top-width: 2px; border-right-width: 2px; }
        .net-scan-corner.bl { bottom: 0; left: 0; border-bottom-width: 2px; border-left-width: 2px; }
        .net-scan-corner.br { bottom: 0; right: 0; border-bottom-width: 2px; border-right-width: 2px; }
        @keyframes net-scanline { 0%,100% { top: 6px; } 50% { top: calc(100% - 8px); } }
        .net-scan-line { position: absolute; left: 4px; right: 4px; height: 1.5px; background: linear-gradient(90deg,transparent,#36BCB0,transparent); top: 6px; animation: net-scanline 2.5s ease-in-out infinite; }
        .net-scan-face { color: rgba(54,188,176,0.55); }

        /* Photo grid */
        .net-photo-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; border-radius: 4px; overflow: hidden; }
        .net-photo-cell { aspect-ratio: 1; }

        /* WhatsApp phone — premium shell, dark WhatsApp interior */
        .net-wa-phone {
          width: 215px; height: 460px; background: #111b21;
          border: 10px solid #1a1a1a;
          border-radius: 46px; overflow: hidden;
          display: flex; flex-direction: column; position: relative;
          box-shadow:
            0 0 0 1px #444,
            0 0 0 3px #0a0a0a,
            20px 60px 100px rgba(0,0,0,0.65),
            0 20px 50px rgba(0,0,0,0.4),
            0 0 80px rgba(37,211,102,0.16);
        }
        /* Glass reflection on WhatsApp phone */
        .net-wa-phone::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 45%;
          background: linear-gradient(150deg, rgba(255,255,255,0.05) 0%, transparent 60%);
          pointer-events: none; z-index: 100; border-radius: 36px 36px 0 0;
        }
        /* WhatsApp notch must be dark, not white */
        .net-wa-phone .net-phone-notch { background: #111b21; }
        .net-wa-phone .net-phone-notch-pill { background: #1a1a1a; }
        .net-wa-header { background: #1f2c34; padding: 8px 14px 10px; }
        .net-wa-status { font-size: 7px; font-weight: 700; color: rgba(255,255,255,0.6); margin-bottom: 8px; display: flex; justify-content: space-between; }
        .net-wa-chat-header { display: flex; align-items: center; gap: 8px; }
        .net-wa-avatar-group { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg,#36BCB0,#25D366); display: flex; align-items: center; justify-content: center; }
        .net-wa-chat-name { font-size: 9px; font-weight: 800; color: #fff; }
        .net-wa-chat-sub { font-size: 7px; color: rgba(255,255,255,0.45); }
        .net-wa-messages { padding: 10px; display: flex; flex-direction: column; gap: 6px; }
        .net-wa-bubble { max-width: 80%; padding: 6px 9px; border-radius: 7px; font-size: 7.5px; line-height: 1.4; color: #fff; }
        .net-wa-bubble.recv { background: #1f2c34; align-self: flex-start; border-radius: 0 7px 7px 7px; }
        .net-wa-bubble.sent { background: #005c4b; align-self: flex-end; border-radius: 7px 7px 0 7px; }
        .net-wa-bubble-name { font-size: 6.5px; font-weight: 700; color: #25D366; margin-bottom: 2px; }
        .net-wa-time { font-size: 6px; color: rgba(255,255,255,0.35); text-align: right; margin-top: 2px; }
        .net-wa-input { background: #1f2c34; margin: 6px 10px 10px; border-radius: 20px; padding: 7px 12px; font-size: 7.5px; color: rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: space-between; }

        /* Responsive */
        @media (max-width: 1024px) {
          .net-app-band-inner, .net-ai-row { grid-template-columns: 1fr; gap: 48px; }
          .net-phone-wrap { justify-content: center; }
          .net-split { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .net-audience-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .net-hero, .net-features-section, .net-audience-inner,
          .net-cta, .net-app-band, .net-app-nav-preview { padding-left: 20px; padding-right: 20px; }
          .net-hero-stats { gap: 24px; }
          .net-split-panel { padding: 32px 20px; }
          .net-phone-wrap { gap: 12px; }
          .net-phone { width: 160px; }
          .net-phone.large { width: 175px; }
          .net-tabbar-inner { padding: 0 16px; }
          .net-tab { padding: 14px 14px; font-size: 10px; }
        }
      `}</style>

      <div className="net-page">

        {/* ── Tab bar ── */}
        <div className="net-tabbar">
          <div className="net-tabbar-inner">
            {TABS.map(([id, label]) => (
              <button key={id} className={`net-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            TAB: OVERVIEW
        ══════════════════════════════════════════ */}
        {tab === "overview" && (
          <>
            <div className="net-hero">
              <div className="net-hero-bg" />
              <div className="net-hero-tag">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                Smart Connections
              </div>
              <h1 className="net-h1" style={{ marginBottom: 20 }}>
                Every Conversation.<br /><em>By Design.</em>
              </h1>
              <p className="net-lead" style={{ maxWidth: 600, margin: "0 auto 40px" }}>
                400+ of Asia-Pacific&apos;s most senior CX decision-makers. One room. Smart tools built to ensure every handshake, every conversation, and every connection you make is worth your time.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-primary">
                  Claim Your Pass
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="/enquire" className="wcx-btn-outline">Enquire</a>
              </div>
              <div className="net-hero-stats">
                {[
                  { num: "400+", label: "Senior Attendees"    },
                  { num: "40+",  label: "Countries Represented"},
                  { num: "12+",  label: "Roundtable Topics"   },
                  { num: "AI",   label: "Powered Matchmaking"  },
                ].map(s => (
                  <div key={s.label} className="net-stat">
                    <div className="net-stat-num">{s.num}</div>
                    <div className="net-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's in the app — quick nav cards */}
            <div className="net-section">
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div className="net-overline">The Full Experience</div>
                <h2 className="net-h2" style={{ marginBottom: 12 }}>Four Powerful Ways to <em>Connect</em></h2>
                <p className="net-lead" style={{ maxWidth: 540, margin: "0 auto" }}>
                  Depth over breadth. Every tool here is engineered to make your connections more intentional, more relevant, and worth your time.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
                {([
                  ["attendee-app",   "Attendee App",       "Schedule, speakers, sponsors and seamless networking — all from a single AI-powered app.", "#36BCB0"],
                  ["ai-matchmaking", "AI Matchmaking",     "Get recommended the right connections based on your interests, role, and goals.", "#C9A84C"],
                  ["photo-gallery",  "AI Photo Gallery",   "Find every photo of yourself from the event instantly using AI face recognition.", "#a78bfa"],
                  ["whatsapp",       "WhatsApp Networking","Join a pre-event peer community and start connecting 2 weeks before you arrive.", "#25D366"],
                ] as [Tab, string, string, string][]).map(([id, title, desc, color]) => (
                  <button key={id} onClick={() => setTab(id)} className="wcx-glow-hover" style={{ background: "var(--bg-surface)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "32px 24px", textAlign: "left", cursor: "pointer", transition: "border-color 0.28s, box-shadow 0.28s, transform 0.28s" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-body)", lineHeight: 1.65 }}>{desc}</div>
                    <div style={{ marginTop: 16, fontSize: 11, fontWeight: 700, color, display: "flex", alignItems: "center", gap: 6 }}>
                      Explore
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Who you'll meet */}
            <div className="net-audience">
              <div className="net-audience-inner">
                <div className="net-section-kicker">In the Room</div>
                <h2 className="net-section-h2">400+ Leaders. <em>One Room.</em></h2>
                <div className="net-audience-grid">
                  <div className="net-role-list">
                    {AUDIENCE.map(a => (
                      <div key={a.role} className="net-role-row">
                        <span className="net-role-name">{a.role}</span>
                        <span className="net-role-count">{a.count}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="net-ind-label">Industries Represented</div>
                    <div className="net-ind-tags">
                      {INDUSTRIES.map(ind => <span key={ind} className="net-ind-tag">{ind}</span>)}
                    </div>
                    <div className="net-pre-event-box">
                      <div className="net-pre-event-title">Your Network Starts Before Day One</div>
                      <div className="net-pre-event-desc">
                        Registered delegates get early access to the event app and WhatsApp community 2 weeks before the summit — browse profiles, request 1:1 meetings, and walk in already connected.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="net-cta">
              <div className="net-cta-inner">
                <h2 className="net-cta-h2">One Pass.<br /><em>Every Connection.</em></h2>
                <p className="net-cta-p">
                  Secure your place at World CX Summit 2026 and unlock the full networking suite — AI matchmaking, the event app, WhatsApp community, and a room of 400+ senior CX decision-makers.
                </p>
                <div className="net-cta-btns">
                  <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-primary">
                    Claim Your Pass
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <a href="/attend?tab=sponsor#enquire-form" className="wcx-btn-outline">Enquire About Sponsorship</a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            TAB: ATTENDEE APP
        ══════════════════════════════════════════ */}
        {tab === "attendee-app" && (
          <>
            <div className="net-app-band">
              <div className="net-app-band-inner">
                <div>
                  <div className="net-app-kicker">Powered by KonfHub</div>
                  <h2 className="net-app-h2">
                    Your Day,<br /><em>Fully in Hand</em>
                  </h2>
                  <p className="net-app-desc">
                    The World CX Summit Event App is your command centre on the ground. Agenda, speakers, sponsors, live networking — all unified in one AI-powered platform so nothing slips through.
                  </p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
                    {["Agenda", "Networking", "Speakers", "Sponsors", "QR Scan", "Business Cards", "Chat"].map(tag => (
                      <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", padding: "5px 12px", border: "1px solid rgba(54,188,176,0.2)", color: "rgba(255,255,255,0.55)", background: "rgba(54,188,176,0.05)" }}>{tag}</span>
                    ))}
                  </div>
                  <div className="net-app-konfhub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                    <span>KonfHub</span> · AI Powered Platform
                  </div>
                </div>

                <div className="net-phone-wrap">
                  {/* Phone 1 — Agenda */}
                  <div className="net-phone">
                    <div className="net-phone-notch"><div className="net-phone-notch-pill" /></div>
                    <div className="net-phone-screen">
                      <div className="net-phone-greeting">Hi, Welcome back</div>
                      <div className="net-phone-event-name">World CX Summit<br />&amp; Awards 2026</div>
                      <div className="net-phone-section-label">Upcoming Session</div>
                      <div className="net-phone-session-card">
                        <div className="net-phone-session-time">09:00 – 09:30 IST</div>
                        <div className="net-phone-session-title">Opening Ceremony &amp; Welcome Address</div>
                        <span className="net-phone-session-tag">Keynote</span>
                      </div>
                      <div className="net-phone-session-card" style={{ background: "rgba(201,168,76,0.07)", borderColor: "rgba(201,168,76,0.25)", borderLeft: "3px solid #C9A84C" }}>
                        <div className="net-phone-session-time" style={{ color: "#C9A84C" }}>10:30 – 12:30 IST</div>
                        <div className="net-phone-session-title">Panel: AI-First Customer Experience</div>
                        <span className="net-phone-session-tag">Panel</span>
                      </div>
                      <div className="net-phone-people-label">Recommended Connections</div>
                      {[
                        { init: "OW", name: "Oliver Whitmore", role: "MD, Whitmore & Assoc." },
                        { init: "CF", name: "Claudia Fernandes", role: "Sr. Partner, Vertex" },
                      ].map(p => (
                        <div key={p.init} className="net-phone-person">
                          <div className="net-phone-person-info">
                            <div className="net-phone-avatar">{p.init}</div>
                            <div>
                              <div className="net-phone-person-name">{p.name}</div>
                              <div className="net-phone-person-role">{p.role}</div>
                            </div>
                          </div>
                          <div className="net-phone-connect-btn">Connect</div>
                        </div>
                      ))}
                    </div>
                    <div className="net-phone-nav">
                      {APP_SCREENS.map((s, i) => (
                        <div key={s.label} className={`net-phone-nav-item${i === 0 ? " active" : ""}`}>{s.icon}{s.label}</div>
                      ))}
                    </div>
                    <div className="net-phone-home" />
                  </div>

                  {/* Phone 2 — Networking */}
                  <div className="net-phone large">
                    <div className="net-phone-notch"><div className="net-phone-notch-pill" /></div>
                    <div className="net-phone-screen">
                      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                        {["Recommended", "All", "My Network"].map((t, i) => (
                          <div key={t} style={{ fontSize: "7px", fontWeight: 700, padding: "3px 7px", background: i === 0 ? "#36BCB0" : "#f3f4f6", border: `1px solid ${i === 0 ? "#36BCB0" : "#e5e7eb"}`, color: i === 0 ? "#fff" : "#6b7280", borderRadius: 20 }}>{t}</div>
                        ))}
                      </div>
                      <div style={{ background: "rgba(54,188,176,0.08)", border: "1px solid rgba(54,188,176,0.25)", borderRadius: 8, padding: "7px 9px", marginBottom: 8, fontSize: 9, color: "#36BCB0", fontWeight: 700 }}>
                        Configure your interests &amp; goals
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4, verticalAlign: "middle" }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                      {[
                        { init: "AF", name: "Alan Ferdinand",  role: "Investor, Infy"      },
                        { init: "AM", name: "Anna Mary",       role: "Product Mgr, Infy"   },
                        { init: "JC", name: "Jane Claire",     role: "Sr. Partner, Vertex" },
                        { init: "DS", name: "Deepak Singh",    role: "CEO, LinkedIn"       },
                        { init: "HM", name: "Hannah",          role: "Product Mgr, Infy"   },
                        { init: "JS", name: "Jay Smith",       role: "Head CX, Acme"       },
                      ].map(p => (
                        <div key={p.init} className="net-phone-person">
                          <div className="net-phone-person-info">
                            <div className="net-phone-avatar" style={{ width: 28, height: 28, fontSize: 9 }}>{p.init}</div>
                            <div>
                              <div className="net-phone-person-name">{p.name}</div>
                              <div className="net-phone-person-role">{p.role}</div>
                            </div>
                          </div>
                          <div className="net-phone-connect-btn">Connect</div>
                        </div>
                      ))}
                    </div>
                    <div className="net-phone-nav">
                      {APP_SCREENS.map((s, i) => (
                        <div key={s.label} className={`net-phone-nav-item${i === 1 ? " active" : ""}`}>{s.icon}{s.label}</div>
                      ))}
                    </div>
                    <div className="net-phone-home" />
                  </div>
                </div>
              </div>
            </div>

            {/* App modules strip */}
            <div className="net-app-nav-preview">
              <div className="net-app-nav-inner">
                <div className="net-app-nav-label">One app. Every touchpoint covered.</div>
                <div className="net-app-tabs">
                  {[
                    { label: "Agenda",         icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, active: true },
                    { label: "Networking",     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
                    { label: "Speakers",       icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
                    { label: "Sponsors",       icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                    { label: "Exhibitors",     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
                    { label: "QR Scan",        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/></svg> },
                    { label: "Business Cards", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="2" y1="12" x2="8" y2="12"/></svg> },
                    { label: "Chat",           icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                  ].map(t => (
                    <div key={t.label} className={`net-app-tab${t.active ? " active" : ""}`}>{t.icon}{t.label}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features split */}
            <div className="net-features-section">
              <div className="net-features-header">
                <div className="net-features-kicker">App Features</div>
                <h2 className="net-features-h2">Built for Every <em>Role in the Room</em></h2>
                <p className="net-features-sub">Whether you&apos;re a delegate, sponsor, or exhibitor — the app is designed to give you a different and better experience.</p>
              </div>
              <div className="net-split">
                <div className="net-split-panel">
                  <div className="net-split-badge teal">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    For Attendees
                  </div>
                  <div className="net-split-title">Make every hour count</div>
                  {ATTENDEE_FEATURES.map(f => (
                    <div key={f.title} className="net-feature-item">
                      <div className="net-feature-icon-wrap teal">{f.icon}</div>
                      <div>
                        <div className="net-feature-text-title">{f.title}</div>
                        <div className="net-feature-text-desc">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="net-split-panel" style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="net-split-badge gold">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    For Sponsors &amp; Exhibitors
                  </div>
                  <div className="net-split-title">Turn visibility into pipeline</div>
                  {SPONSOR_FEATURES.map(f => (
                    <div key={f.title} className="net-feature-item">
                      <div className="net-feature-icon-wrap gold">{f.icon}</div>
                      <div>
                        <div className="net-feature-text-title">{f.title}</div>
                        <div className="net-feature-text-desc">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            TAB: AI MATCHMAKING
        ══════════════════════════════════════════ */}
        {tab === "ai-matchmaking" && (
          <div style={{ padding: "48px 40px 80px", background: "var(--bg-primary)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div className="net-ai-row" style={{ alignItems: "flex-start" }}>
                {/* Copy */}
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)", marginBottom: 14 }}>AI-Powered Matchmaking</div>
                  <h2 className="net-h2" style={{ marginBottom: 16 }}>
                    Meet the Right People.<br /><span style={{ color: "var(--coral)" }}>Every Time.</span>
                  </h2>
                  <p className="net-lead" style={{ marginBottom: 28 }}>
                    Set your goals once. Our AI reads your role, interests, and intent — then surfaces the connections most likely to matter. No cold introductions. No wasted handshakes.
                  </p>
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>Pick your focus areas — AI does the rest</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {[
                        { label: "AI & Data",                  active: true  },
                        { label: "Marketing & Branding",       active: true  },
                        { label: "Finance & Investment",       active: false },
                        { label: "Leadership & Management",    active: true  },
                        { label: "Sustainable Tech",           active: false },
                        { label: "Health & Wellness",          active: false },
                        { label: "Startup & Entrepreneurship", active: false },
                        { label: "Digital Transformation",     active: false },
                        { label: "Product Development",        active: true  },
                      ].map(({ label, active }) => (
                        <span key={label} style={{ fontSize: 11, fontWeight: 700, padding: "6px 13px", border: `1px solid ${active ? "rgba(54,188,176,0.5)" : "rgba(255,255,255,0.10)"}`, background: active ? "rgba(54,188,176,0.10)" : "transparent", color: active ? "var(--coral)" : "rgba(255,255,255,0.35)" }}>{label}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ borderLeft: "3px solid #36BCB0", paddingLeft: 20, paddingTop: 4, paddingBottom: 4 }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>Right People. <span style={{ color: "var(--coral)" }}>Real Connections.</span></div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>AI Powered Platform · KonfHub</div>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="net-phone large" style={{ width: 240 }}>
                    <div className="net-phone-notch"><div className="net-phone-notch-pill" /></div>
                    <div className="net-phone-status">
                      <span>9:41</span>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <svg width="10" height="8" viewBox="0 0 20 16" fill="#1C1C1E"><rect x="0" y="8" width="3" height="8"/><rect x="5" y="5" width="3" height="11"/><rect x="10" y="2" width="3" height="14"/><rect x="15" y="0" width="3" height="16"/></svg>
                        <div style={{ width: 18, height: 8, border: "1px solid #d1d5db", borderRadius: 2, padding: "1px 2px", display: "flex", alignItems: "center" }}>
                          <div style={{ width: "80%", height: "100%", background: "#36BCB0", borderRadius: 1 }} />
                        </div>
                      </div>
                    </div>
                    <div className="net-phone-screen" style={{ paddingTop: 4 }}>
                      <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                        {["Recommended", "All", "My Network", "Received"].map((t, i) => (
                          <div key={t} style={{ fontSize: "6.5px", fontWeight: 700, padding: "3px 6px", background: i === 0 ? "#36BCB0" : "#f3f4f6", border: `1px solid ${i === 0 ? "#36BCB0" : "#e5e7eb"}`, color: i === 0 ? "#fff" : "#6b7280", borderRadius: 20, whiteSpace: "nowrap" }}>{t}</div>
                        ))}
                      </div>
                      <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "5px 9px", fontSize: 8, color: "#9ca3af", marginBottom: 7, display: "flex", alignItems: "center", gap: 5 }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                        Search
                      </div>
                      <div style={{ background: "rgba(54,188,176,0.08)", border: "1px solid rgba(54,188,176,0.28)", borderRadius: 7, padding: "7px 9px", marginBottom: 9, fontSize: 8, color: "#36BCB0", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        Configure your interests &amp; goals
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                      {[
                        { init: "AF", name: "Alan Ferdinand", role: "Investor, Infy",      color: "#36BCB0" },
                        { init: "AM", name: "Anna Mary",      role: "Product Mgr, Infy",  color: "#C9A84C" },
                        { init: "JC", name: "Jane Claire",    role: "Product Mgr, Infy",  color: "#a78bfa" },
                        { init: "DS", name: "Deepak Singh",   role: "CEO, LinkedIn",      color: "#36BCB0" },
                        { init: "HM", name: "Hannah M.",      role: "Sr. CX Lead, Infy",  color: "#C9A84C" },
                        { init: "JS", name: "Jay Smith",      role: "Head CX, Acme",      color: "#a78bfa" },
                      ].map(p => (
                        <div key={p.init} className="net-phone-person">
                          <div className="net-phone-person-info">
                            <div className="net-phone-avatar" style={{ width: 26, height: 26, fontSize: 8, background: `${p.color}18`, color: p.color, border: `1.5px solid ${p.color}44` }}>{p.init}</div>
                            <div>
                              <div className="net-phone-person-name" style={{ fontSize: 8.5 }}>{p.name}</div>
                              <div className="net-phone-person-role">{p.role}</div>
                            </div>
                          </div>
                          <div className="net-phone-connect-btn">Connect</div>
                        </div>
                      ))}
                    </div>
                    <div className="net-phone-nav">
                      {[
                        { label: "Home",    icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
                        { label: "Agenda",  icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                        { label: "Scan",    icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/></svg> },
                        { label: "Profile", icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>, active: true },
                      ].map(n => (
                        <div key={n.label} className={`net-phone-nav-item${n.active ? " active" : ""}`}>{n.icon}{n.label}</div>
                      ))}
                    </div>
                    <div className="net-phone-home" />
                  </div>
                </div>
              </div>

              {/* Dual benefits */}
              <div className="net-split" style={{ marginTop: 4 }}>
                <div className="net-split-panel">
                  <div className="net-split-badge teal">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    For Attendees
                  </div>
                  <div className="net-split-title">Meet the right people,<br />not just more people</div>
                  {["Get personalized recommendations based on interests, role, and goals", "Have meaningful, high-quality conversations instead of random networking", "Leave with valuable connections and real opportunities"].map(p => (
                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--coral)", flexShrink: 0, marginTop: 2 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="net-split-panel" style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="net-split-badge gold">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    For Sponsors &amp; Exhibitors
                  </div>
                  <div className="net-split-title">Connect with high-intent,<br />relevant prospects</div>
                  {["Focus on quality leads, not just volume", "Maximize ROI through meaningful interactions", "Increase booth engagement via targeted attendee recommendations"].map(p => (
                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: 4, padding: "40px", background: "var(--bg-surface)", border: "1px solid rgba(54,188,176,0.10)" }}>
                <div style={{ fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff" }}>
                  From <span style={{ color: "var(--gold)" }}>Random</span> Interactions To <span style={{ color: "var(--coral)" }}>Meaningful</span> Connections
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB: PHOTO GALLERY
        ══════════════════════════════════════════ */}
        {tab === "photo-gallery" && (
          <div style={{ background: "var(--bg-primary)", padding: "48px 40px 80px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div className="net-ai-row" style={{ alignItems: "flex-start" }}>
                {/* Phone */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="net-phone large" style={{ width: 240 }}>
                    <div className="net-phone-notch"><div className="net-phone-notch-pill" /></div>
                    <div className="net-phone-status">
                      <span>9:41</span>
                      <div style={{ width: 18, height: 8, border: "1px solid #d1d5db", borderRadius: 2, padding: "1px 2px", display: "flex", alignItems: "center" }}>
                        <div style={{ width: "75%", height: "100%", background: "#36BCB0", borderRadius: 1 }} />
                      </div>
                    </div>
                    <div className="net-phone-screen">
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#36BCB0", border: "1px solid rgba(54,188,176,0.35)", background: "rgba(54,188,176,0.08)", padding: "3px 8px", borderRadius: 20, marginBottom: 10 }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/></svg>
                        AI Photo Gallery
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 900, color: "#0D1E35", marginBottom: 4, lineHeight: 1.3 }}>Find Your Photos</div>
                      <div style={{ fontSize: 8, color: "#6b7280", marginBottom: 10, lineHeight: 1.5 }}>Upload a selfie to instantly find your event moments</div>
                      <div className="net-scan-wrap">
                        <div className="net-scan-corner tl" /><div className="net-scan-corner tr" />
                        <div className="net-scan-corner bl" /><div className="net-scan-corner br" />
                        <div className="net-scan-line" />
                        <svg className="net-scan-face" width="60" height="72" viewBox="0 0 60 72" fill="none">
                          <ellipse cx="30" cy="26" rx="18" ry="22" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M12 60c0-10 8-16 18-16s18 6 18 16" stroke="currentColor" strokeWidth="1.5"/>
                          <circle cx="22" cy="24" r="3" fill="currentColor" opacity="0.5"/>
                          <circle cx="38" cy="24" r="3" fill="currentColor" opacity="0.5"/>
                          <path d="M24 32c1.5 2 4.5 2 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div style={{ background: "#36BCB0", borderRadius: 20, padding: "9px 0", textAlign: "center", fontSize: 10, fontWeight: 800, color: "#fff", marginTop: 8, letterSpacing: "0.06em" }}>Find My Photos</div>
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 8, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Your Gallery</div>
                        <div className="net-photo-grid">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="net-photo-cell" style={{ background: i % 3 === 0 ? "linear-gradient(135deg,rgba(54,188,176,0.22),rgba(54,188,176,0.08))" : i % 3 === 1 ? "linear-gradient(135deg,rgba(54,188,176,0.14),rgba(54,188,176,0.05))" : "linear-gradient(135deg,rgba(54,188,176,0.18),rgba(54,188,176,0.06))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#36BCB0" strokeWidth="1.5" style={{ opacity: 0.5 }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="net-phone-home" />
                  </div>
                </div>

                {/* Copy */}
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.06)", padding: "5px 14px", marginBottom: 16 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/></svg>
                    AI Photo Gallery
                  </div>
                  <h2 className="net-h2" style={{ marginBottom: 16 }}>
                    Find Your Event<br /><span style={{ color: "var(--gold)" }}>Photos Instantly</span>
                  </h2>
                  <p className="net-lead" style={{ marginBottom: 32 }}>
                    Upload a photo or take a selfie. Our AI scans the full event library and finds every moment featuring you — no scrolling, no searching.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 32 }}>
                    {[
                      { step: "01", label: "Scan Your Face",    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 9H7a2 2 0 0 0-2 2v2M15 9h2a2 2 0 0 1 2 2v2M9 15H7a2 2 0 0 1-2-2v-2M15 15h2a2 2 0 0 0 2-2v-2"/><circle cx="12" cy="12" r="2"/></svg> },
                      { step: "02", label: "Get Your Photos",   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
                      { step: "03", label: "Share Your Photos", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> },
                    ].map((s, i) => (
                      <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, marginBottom: i < 2 ? 8 : 0, transition: "border-color 0.25s, box-shadow 0.25s" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(54,188,176,0.10)", border: "1px solid rgba(54,188,176,0.28)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--coral)", flexShrink: 0 }}>{s.icon}</div>
                        <div>
                          <div style={{ fontSize: 9, fontWeight: 700, color: "var(--coral)", letterSpacing: "0.12em", marginBottom: 2 }}>Step {s.step}</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{s.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderLeft: "3px solid #C9A84C", paddingLeft: 20, paddingTop: 4, paddingBottom: 4 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>Smart <span style={{ color: "var(--gold)" }}>AI.</span> Seamless <span style={{ color: "var(--coral)" }}>Experience.</span></div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Your photos, instantly yours · KonfHub</div>
                  </div>
                </div>
              </div>

              {/* Dual benefits */}
              <div className="net-split" style={{ marginTop: 4 }}>
                <div className="net-split-panel">
                  <div className="net-split-badge teal">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    For Attendees
                  </div>
                  <div className="net-split-title">Your photos,<br />instantly yours</div>
                  {["Find your photos instantly with AI face recognition", "No more scrolling through hundreds of images", "Get a personalized gallery of your moments", "View, download, and share in real-time"].map(p => (
                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--coral)", flexShrink: 0, marginTop: 2 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="net-split-panel" style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="net-split-badge gold">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    For Sponsors &amp; Exhibitors
                  </div>
                  <div className="net-split-title">Stay visible<br />beyond the event</div>
                  {["Branded photo experiences with logos and frames", "Drive social visibility through attendee sharing", "Stay visible beyond the event", "Turn photos into a subtle lead engagement channel"].map(p => (
                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB: WHATSAPP NETWORKING
        ══════════════════════════════════════════ */}
        {tab === "whatsapp" && (
          <div style={{ background: "var(--bg-primary)", padding: "48px 40px 80px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div className="net-ai-row" style={{ alignItems: "flex-start" }}>

                {/* Copy */}
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#25D366", border: "1px solid rgba(37,211,102,0.3)", background: "rgba(37,211,102,0.06)", padding: "5px 14px", marginBottom: 20 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    WhatsApp Community
                  </div>
                  <h2 className="net-h2" style={{ marginBottom: 16 }}>
                    Walk In<br /><span style={{ color: "#25D366" }}>Already Connected.</span>
                  </h2>
                  <p className="net-lead" style={{ marginBottom: 32 }}>
                    Registered delegates get exclusive entry to a curated WhatsApp community 2 weeks before the summit. Identify the right people, start the right conversations, and arrive with momentum — not a blank slate.
                  </p>

                  {/* Community groups */}
                  <div style={{ marginBottom: 32 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>Peer networking groups</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {WA_GROUPS.map(g => (
                        <span key={g.label} style={{ fontSize: 11, fontWeight: 700, padding: "6px 14px", border: `1px solid ${g.color}33`, background: `${g.color}0e`, color: g.color }}>{g.label}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderLeft: "3px solid #25D366", paddingLeft: 20, paddingTop: 4, paddingBottom: 4 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>
                      2 Weeks Early. <span style={{ color: "#25D366" }}>Zero Cold Introductions.</span>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Community access unlocks the moment you register</div>
                  </div>
                </div>

                {/* WhatsApp phone mockup */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="net-wa-phone">
                    <div className="net-phone-notch"><div className="net-phone-notch-pill" /></div>
                    <div className="net-wa-header">
                      <div className="net-wa-status">
                        <span>9:41</span>
                        <span style={{ color: "#25D366" }}>WhatsApp</span>
                      </div>
                      <div className="net-wa-chat-header">
                        <div className="net-wa-avatar-group">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.9"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div>
                          <div className="net-wa-chat-name">World CX Summit — CX Leaders</div>
                          <div className="net-wa-chat-sub">127 members · Organised by Trescon</div>
                        </div>
                      </div>
                    </div>
                    <div className="net-wa-messages">
                      <div className="net-wa-bubble recv">
                        <div className="net-wa-bubble-name">Priya M. · Chief CX, HDFC</div>
                        Hi all! Excited for June 4th. Anyone else focusing on AI in contact centres this year?
                        <div className="net-wa-time">10:14 AM</div>
                      </div>
                      <div className="net-wa-bubble recv">
                        <div className="net-wa-bubble-name">Rahul S. · VP CX, Flipkart</div>
                        Yes! We just completed a rollout. Happy to connect 1:1 at the event.
                        <div className="net-wa-time">10:17 AM</div>
                      </div>
                      <div className="net-wa-bubble sent">
                        Looking forward to the fireside on omnichannel — see you there!
                        <div className="net-wa-time">10:19 AM</div>
                      </div>
                      <div className="net-wa-bubble recv">
                        <div className="net-wa-bubble-name">Amit K. · CDO, Bajaj Finserv</div>
                        Same. See you all in Bengaluru
                        <div className="net-wa-time">10:21 AM</div>
                      </div>
                    </div>
                    <div className="net-wa-input">
                      <span>Message...</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </div>
                    <div style={{ height: 20, background: "#111b21", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 56, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dual benefits */}
              <div className="net-split" style={{ marginTop: 56 }}>
                <div className="net-split-panel">
                  <div className="net-split-badge teal">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    For Attendees
                  </div>
                  <div className="net-split-title">Day one starts<br />two weeks early</div>
                  {["Exclusive pre-event community access 2 weeks before the summit", "Join role-specific groups — CX Leaders, BFSI, AI & Digital, and more", "Identify and request 1:1 meetings with the people you want to meet", "Get event day alerts, session reminders, and real-time updates"].map(p => (
                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="net-split-panel" style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="net-split-badge gold">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    For Sponsors &amp; Exhibitors
                  </div>
                  <div className="net-split-title">Warm up your<br />audience early</div>
                  {["Get featured visibility in the pre-event WhatsApp community", "Share product teasers and thought leadership before the event", "Direct WhatsApp access to engaged, opted-in delegates", "Post-event follow-up channel to continue the conversation"].map(p => (
                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ textAlign: "center", marginTop: 4, padding: "48px 40px", background: "var(--bg-surface)", border: "1px solid rgba(37,211,102,0.10)" }}>
                <div style={{ fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 24 }}>
                  Your community is waiting.<br />Register and get <span style={{ color: "#25D366" }}>WhatsApp access</span> instantly.
                </div>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-primary">
                  Claim Your Pass
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
