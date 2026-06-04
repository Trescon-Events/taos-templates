"use client";
import { useState } from "react";
import Link from "next/link";

const PASS_URL = "https://konfhub.com/checkout/big-cio-show-awards-2026?ticketId=93845%7C1%3B&selectedCode=MKTWEBSITE";
type Tab = "overview" | "app" | "ai" | "gallery" | "whatsapp";

export default function NetworkingPage() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <>
      <style>{`
        .bnt-page { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }
        .bnt-tabbar {
          background: var(--bg-surface); border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .bnt-tabbar-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: flex; overflow-x: auto; scrollbar-width: none;
        }
        .bnt-tabbar-inner::-webkit-scrollbar { display: none; }
        .bnt-tab {
          font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.90);
          padding: 16px 22px; cursor: pointer; border: none; background: none;
          font-family: inherit; border-bottom: 2px solid transparent;
          white-space: nowrap; transition: color 0.2s, border-color 0.2s;
        }
        .bnt-tab:hover { color: #ffffff; }
        .bnt-tab.active { color: var(--cyan); border-bottom-color: var(--cyan); }

        .bnt-hero {
          background: var(--bg-surface); padding: 80px 40px 72px;
          text-align: center; position: relative; overflow: hidden;
          border-bottom: 1px solid rgba(124,58,237,0.10);
        }
        .bnt-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .bnt-hero-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .bnt-h1 { font-size: clamp(22px, 2.6vw, 38px); font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1.15; margin-bottom: 16px; }
        .bnt-h1 em { font-style: normal; color: var(--cyan); }
        .bnt-sub { font-size: 18px; color: var(--text-body); max-width: 560px; margin: 0 auto 36px; line-height: 1.75; }
        .bnt-section { max-width: 1320px; margin: 0 auto; padding: 72px 40px 80px; }
        .bnt-section-narrow { max-width: 900px; margin: 0 auto; padding: 72px 40px 80px; }

        .bnt-sh { font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cyan); margin-bottom: 20px; }
        .bnt-h2 { font-size: clamp(18px,2.2vw,28px); font-weight: 800; letter-spacing: -0.02em; color: #fff; margin-bottom: 12px; }
        .bnt-h2 em { font-style: normal; color: var(--cyan); }

        .bnt-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 48px; }
        .bnt-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; margin-bottom: 48px; }
        .bnt-card { background: var(--bg-card); border: 1px solid var(--border); padding: 28px 24px; border-radius: 16px; }
        .bnt-num { font-size: 13px; font-weight: 900; letter-spacing: 0.12em; color: var(--cyan); margin-bottom: 14px; }
        .bnt-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.3; }
        .bnt-desc { font-size: 18px; color: var(--text-body); line-height: 1.7; }

        .bnt-format-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 48px; }
        .bnt-format {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
          padding: 24px 20px; text-align: center;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bnt-format:hover {
          border-color: rgba(124,58,237,0.45);
          box-shadow: 0 0 24px rgba(124,58,237,0.20);
        }
        .bnt-format-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.25);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px; color: var(--cyan);
        }
        .bnt-format-label { font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.92); margin-bottom: 6px; }
        .bnt-format-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .bnt-format-desc { font-size: 18px; color: var(--text-body); line-height: 1.65; }

        .bnt-philosophy-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 12px; margin-bottom: 48px; }
        .bnt-philosophy-card {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.18);
          border-radius: 14px; padding: 24px 16px; text-align: center;
        }
        .bnt-philosophy-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(124,58,237,0.10); display: flex; align-items: center;
          justify-content: center; margin: 0 auto 12px; color: var(--cyan);
        }
        .bnt-philosophy-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .bnt-philosophy-desc { font-size: 18px; color: var(--text-body); line-height: 1.6; }

        .bnt-stats-strip {
          display: flex; gap: 0; background: var(--bg-card);
          border: 1px solid var(--border); border-radius: 16px;
          overflow: hidden; margin-bottom: 48px;
        }
        .bnt-stat { flex: 1; padding: 28px 20px; text-align: center; border-right: 1px solid var(--border); }
        .bnt-stat:last-child { border-right: none; }
        .bnt-stat-val { font-size: 28px; font-weight: 900; letter-spacing: -0.02em; background: linear-gradient(135deg, #7C3AED, #C084FC); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 6px; }
        .bnt-stat-lbl { font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.90); }

        .bnt-outcome-block {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.18);
          border-radius: 16px; padding: 36px 40px; margin-bottom: 32px;
        }
        .bnt-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .bnt-chip {
          font-size: 18px; font-weight: 700; color: var(--cyan);
          background: rgba(192,132,252,0.08); border: 1px solid rgba(192,132,252,0.20);
          padding: 6px 14px; border-radius: 8px;
        }

        .bnt-app-screen {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.25);
          border-radius: 20px; padding: 48px; margin-bottom: 32px;
          position: relative; overflow: hidden;
        }
        .bnt-app-screen::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7C3AED, #C084FC);
        }

        .bnt-journey { display: grid; grid-template-columns: repeat(7,1fr); gap: 0; margin-bottom: 48px; position: relative; }
        .bnt-journey::before {
          content: ''; position: absolute; top: 28px; left: 5%; right: 5%; height: 1px;
          background: rgba(124,58,237,0.20); z-index: 0;
        }
        .bnt-step { text-align: center; position: relative; z-index: 1; }
        .bnt-step-num {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 900; color: var(--cyan);
          margin: 0 auto 12px;
        }
        .bnt-step-label { font-size: 18px; font-weight: 700; color: #ffffff; line-height: 1.4; padding: 0 4px; }

        .bnt-smart-block {
          background: linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(192,132,252,0.06) 100%);
          border: 1px solid rgba(124,58,237,0.25); border-radius: 16px;
          padding: 40px 48px; margin-bottom: 32px;
        }

        .bnt-ai-steps { counter-reset: step; margin-bottom: 40px; }
        .bnt-ai-step { display: flex; gap: 20px; margin-bottom: 20px; align-items: flex-start; }
        .bnt-ai-step-num {
          width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
          background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 900; color: var(--cyan);
        }

        .bnt-privacy-block {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.18);
          border-radius: 16px; padding: 36px 40px; margin-bottom: 32px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
        }

        .bnt-gallery-placeholder {
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: 16px; height: 300px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 32px; color: rgba(255,255,255,0.20);
          font-size: 18px; font-weight: 700;
        }
        .bnt-gallery-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 48px;
        }
        .bnt-gallery-tile {
          background: var(--bg-surface); border: 1px solid var(--border); border-radius: 12px;
          height: 160px; display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 8px; color: rgba(255,255,255,0.15);
          font-size: 18px; font-weight: 700;
        }
        .bnt-gallery-microcopy {
          font-size: 18px; font-style: italic; color: rgba(255,255,255,0.70);
          margin-top: 6px;
        }

        .bnt-before-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 48px; }
        .bnt-before-col {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
          padding: 28px 24px;
        }
        .bnt-before-phase {
          font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--cyan); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
        }
        .bnt-before-phase::after {
          content: ''; flex: 1; height: 1px; background: rgba(124,58,237,0.20);
        }
        .bnt-before-item { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 12px; font-size: 18px; color: var(--text-body); line-height: 1.6; }

        .bnt-guidelines { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 32px; }
        .bnt-guideline {
          background: var(--bg-surface); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 18px 20px; font-size: 18px; color: var(--text-body);
          display: flex; gap: 10px; align-items: flex-start; line-height: 1.6;
        }

        .bnt-cta-strip {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.15);
          padding: 36px 40px; display: flex; align-items: center;
          justify-content: space-between; gap: 32px; flex-wrap: wrap; border-radius: 16px;
        }
        .bnt-final-cta {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.20);
          border-radius: 20px; padding: 64px 48px; text-align: center;
          position: relative; overflow: hidden;
        }
        .bnt-final-cta::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .bnt-final-cta-inner { position: relative; z-index: 2; }

        .bnt-check-item { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 12px; font-size: 18px; color: var(--text-body); line-height: 1.65; }

        @media (max-width: 1100px) {
          .bnt-philosophy-grid { grid-template-columns: repeat(3,1fr); }
          .bnt-journey { grid-template-columns: repeat(4,1fr); gap: 16px; }
          .bnt-journey::before { display: none; }
          .bnt-privacy-block { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 900px) {
          .bnt-grid-3, .bnt-format-row, .bnt-gallery-grid, .bnt-before-grid { grid-template-columns: repeat(2,1fr); }
          .bnt-cta-strip { flex-direction: column; align-items: flex-start; }
          .bnt-philosophy-grid { grid-template-columns: repeat(2,1fr); }
          .bnt-stats-strip { flex-wrap: wrap; }
          .bnt-stat { min-width: 40%; }
          .bnt-journey { grid-template-columns: repeat(3,1fr); }
        }
        @media (max-width: 600px) {
          .bnt-hero { padding: 56px 24px 48px; }
          .bnt-section, .bnt-section-narrow { padding: 48px 24px 64px; }
          .bnt-tabbar-inner { padding: 0 16px; }
          .bnt-grid-3, .bnt-grid-2, .bnt-format-row, .bnt-gallery-grid, .bnt-before-grid { grid-template-columns: 1fr; }
          .bnt-app-screen { padding: 28px 24px; }
          .bnt-philosophy-grid { grid-template-columns: 1fr; }
          .bnt-guidelines { grid-template-columns: 1fr; }
          .bnt-journey { grid-template-columns: repeat(2,1fr); }
          .bnt-smart-block { padding: 32px 24px; }
        }
      `}</style>

      <div className="bnt-page">
        {/* Tab bar */}
        <div className="bnt-tabbar">
          <div className="bnt-tabbar-inner">
            {([
              ["overview",  "Overview"],
              ["app",       "Attendee App"],
              ["ai",        "AI Matchmaking"],
              ["gallery",   "Photo Gallery"],
              ["whatsapp",  "WhatsApp Networking"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} className={`bnt-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── OVERVIEW ─── */}
        {tab === "overview" && (
          <>
            <div className="bnt-hero">
              <div className="bnt-hero-inner">
                <div className="bcio-eyebrow">Networking at Big CIO Show</div>
                <h1 className="bnt-h1">Where Enterprise Connections <em>Turn Into Opportunities</em></h1>
                <p className="bnt-sub">
                  BIG CIO creates curated networking experiences that bring together CIOs, technology leaders, innovators, partners and decision-makers — structured for quality, not just quantity.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                    Register to Attend
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Explore Networking Opportunities</Link>
                </div>
              </div>
            </div>

            <div className="bnt-section">
              {/* Stats */}
              <div className="bnt-stats-strip" style={{ marginBottom: 64 }}>
                {[
                  { val: "8,500+", lbl: "CIOs & Tech Leaders" },
                  { val: "1:1",    lbl: "Structured Meetings" },
                  { val: "9",      lbl: "Networking Formats" },
                  { val: "50+",    lbl: "Industries Represented" },
                  { val: "1 Day",  lbl: "Maximum Focus" },
                ].map(s => (
                  <div key={s.lbl} className="bnt-stat">
                    <div className="bnt-stat-val">{s.val}</div>
                    <div className="bnt-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Why Networking Matters */}
              <div className="bnt-sh">Why Networking Matters at BIG CIO</div>
              <div className="bnt-grid-3">
                {[
                  { num: "01", title: "Enterprise Collaboration",  desc: "Connect with peers tackling the same transformation challenges — build partnerships that extend beyond the event day." },
                  { num: "02", title: "Peer Learning",             desc: "Exchange insights with senior leaders who have implemented what you are planning. Real decisions, real outcomes." },
                  { num: "03", title: "Strategic Partnerships",    desc: "Find technology partners, consulting allies, and ecosystem collaborators in an environment built for trust." },
                  { num: "04", title: "Innovation Discovery",      desc: "Meet the startups and vendors solving tomorrow's enterprise problems — before the market catches up." },
                  { num: "05", title: "Business Growth",           desc: "Every conversation at BIG CIO is a potential pipeline moment. Structured introductions, not random encounters." },
                  { num: "06", title: "Knowledge Exchange",        desc: "From boardrooms to breakout sessions — informal conversations that shape your strategy for the next 12 months." },
                ].map(b => (
                  <div key={b.num} className="bnt-card">
                    <div className="bnt-num">{b.num}</div>
                    <div className="bnt-title">{b.title}</div>
                    <div className="bnt-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Networking Experiences */}
              <div className="bnt-sh">Networking Experiences</div>
              <div className="bnt-format-row">
                {[
                  { label: "AI-Powered",    title: "AI Matchmaking",         desc: "Intelligent connections based on role, industry, technology needs, and business priorities.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/><path d="M18.5 3C20 4.5 21 6.5 21 8.5"/></svg> },
                  { label: "Closed-Door",   title: "Executive Roundtables",  desc: "12–15 person discussions on specific enterprise challenges. Moderated by senior CIOs.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  { label: "Open Floor",    title: "Networking Lounge",      desc: "Curated lounge spaces designed for organic peer-to-peer conversations across industries.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                  { label: "Exclusive",     title: "VIP Meetings",           desc: "Private hosted buyer meetings between senior technology executives and strategic solution providers.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
                  { label: "Sector-Focused",title: "Industry Meetups",       desc: "BFSI, manufacturing, healthcare, retail — dedicated industry-focused networking sessions.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
                  { label: "Startup Zone",  title: "Startup Connect",        desc: "Enterprise CIOs meet high-growth startups in structured introductions designed for rapid evaluation.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> },
                  { label: "Capital",       title: "Investor Networking",     desc: "VCs, corporate venture arms, and enterprise buyers connect with high-growth technology companies.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                  { label: "Pre-Qualified", title: "Hosted Buyer Meetings",   desc: "Structured meetings between solution providers and pre-matched enterprise buyers with confirmed authority.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
                  { label: "Community",     title: "WhatsApp Networking",     desc: "Year-round peer conversations across 8,500+ verified CIOs — active before, during and after the event.",
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
                ].map(f => (
                  <div key={f.title} className="bnt-format">
                    <div className="bnt-format-icon">{f.icon}</div>
                    <div className="bnt-format-label">{f.label}</div>
                    <div className="bnt-format-title">{f.title}</div>
                    <div className="bnt-format-desc">{f.desc}</div>
                  </div>
                ))}
              </div>

              {/* Curated Networking Philosophy */}
              <div className="bnt-sh">Curated Networking Philosophy</div>
              <div className="bnt-philosophy-grid">
                {[
                  { title: "Quality Over Quantity",        desc: "Every introduction is purposeful. We limit attendee lists for depth, not breadth.",
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
                  { title: "Curated Introductions",        desc: "AI-powered matching and editorial curation ensure relevance at every connection point.",
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                  { title: "Role-Based Engagement",        desc: "CIOs meet peers. Vendors meet buyers. Investors meet founders. No crossed wires.",
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  { title: "Industry-Focused Conversations",desc: "Structured sessions group leaders by sector so conversations are commercially relevant.",
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
                  { title: "Business-Relevant Interactions", desc: "Every networking format at BIG CIO is designed to produce a pipeline moment.",
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                ].map(p => (
                  <div key={p.title} className="bnt-philosophy-card">
                    <div className="bnt-philosophy-icon">{p.icon}</div>
                    <div className="bnt-philosophy-title">{p.title}</div>
                    <div className="bnt-philosophy-desc">{p.desc}</div>
                  </div>
                ))}
              </div>

              {/* Who You'll Meet */}
              <div className="bnt-outcome-block">
                <div className="bnt-sh">Who You&apos;ll Meet</div>
                <div className="bnt-chips">
                  {["CIOs", "CTOs", "CISOs", "Enterprise Buyers", "Startup Founders", "Technology Providers", "Investors", "Digital Leaders", "Government Stakeholders", "Chief Data Officers", "IT Directors", "Heads of AI"].map(r => (
                    <span key={r} className="bnt-chip">{r}</span>
                  ))}
                </div>
              </div>

              {/* Networking Outcomes */}
              <div className="bnt-outcome-block">
                <div className="bnt-sh">Networking Outcomes</div>
                <div className="bnt-chips">
                  {["Strategic Partnerships", "Enterprise Collaborations", "Business Opportunities", "Investor Conversations", "Ecosystem Expansion", "Peer Learning", "Technology Discovery", "Long-Term Relationships"].map(o => (
                    <span key={o} className="bnt-chip">{o}</span>
                  ))}
                </div>
              </div>

              {/* Networking Statistics */}
              <div className="bnt-stats-strip" style={{ marginBottom: 32 }}>
                {[
                  { val: "3,000+", lbl: "1:1 Meetings Facilitated" },
                  { val: "500+",   lbl: "Curated Introductions" },
                  { val: "25+",    lbl: "Networking Sessions" },
                  { val: "8,500+", lbl: "Executive Attendees" },
                  { val: "50+",    lbl: "Industries Represented" },
                ].map(s => (
                  <div key={s.lbl} className="bnt-stat">
                    <div className="bnt-stat-val">{s.val}</div>
                    <div className="bnt-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>

              <div className="bnt-final-cta">
                <div className="bnt-final-cta-inner">
                  <h2 className="bnt-h2">Build <em>Meaningful Enterprise Connections</em></h2>
                  <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.75 }}>
                    Join the BIG CIO Networking Experience. Every delegate gets a pre-event meeting scheduler — browse the attendee list, send requests, and arrive with a full day of confirmed meetings.
                  </p>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                      Register Now
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Talk to Our Team</Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ─── ATTENDEE APP ─── */}
        {tab === "app" && (
          <>
            <div className="bnt-hero">
              <div className="bnt-hero-inner">
                <div className="bcio-eyebrow">Big CIO Attendee App</div>
                <h1 className="bnt-h1">Your BIG CIO Experience, <em>Powered by the App</em></h1>
                <p className="bnt-sub">
                  Access sessions, connect with attendees, schedule meetings and personalise your event experience through the BIG CIO attendee platform. Available on iOS, Android, and web.
                </p>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                  Register to Access the App
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
            <div className="bnt-section">
              {/* Core Features */}
              <div className="bnt-sh">Core App Features</div>
              <div className="bnt-grid-3" style={{ marginBottom: 16 }}>
                {[
                  { title: "Personalised Agenda",         desc: "Build your day around sessions and meetings that match your technology priorities and role." },
                  { title: "AI Matchmaking",              desc: "Smart recommendations connect you with the most relevant attendees, speakers, and exhibitors." },
                  { title: "Meeting Scheduler",           desc: "Send and accept 1:1 meeting requests with pre-assigned time slots across the event day." },
                  { title: "Live Notifications",          desc: "Room changes, schedule updates, and speaker announcements delivered in real time." },
                  { title: "Networking Chat",             desc: "Message any registered attendee directly — break the ice before you arrive." },
                  { title: "Speaker Profiles",            desc: "Full speaker bios, company context, and session details accessible before each presentation." },
                  { title: "Interactive Floor Map",       desc: "Navigate the venue, locate exhibitor booths, and find networking zones instantly." },
                  { title: "Session Bookmarking",         desc: "Save sessions you want to attend and receive push reminders 10 minutes before they start." },
                  { title: "QR Badge Scanning",           desc: "Instant contact exchange — scan any attendee&apos;s badge to save their details to your network." },
                ].map(f => (
                  <div key={f.title} className="bnt-card">
                    <div className="bnt-title">{f.title}</div>
                    <div className="bnt-desc">{f.desc}</div>
                  </div>
                ))}
              </div>

              {/* User Journey */}
              <div className="bnt-sh" style={{ marginBottom: 32 }}>Your Journey With the App</div>
              <div className="bnt-journey">
                {[
                  "Register for BIG CIO",
                  "Access Attendee App",
                  "Personalise Interests",
                  "Receive AI Recommendations",
                  "Schedule Meetings",
                  "Attend Sessions",
                  "Continue Networking Post-Event",
                ].map((step, i) => (
                  <div key={i} className="bnt-step">
                    <div className="bnt-step-num">{i + 1}</div>
                    <div className="bnt-step-label">{step}</div>
                  </div>
                ))}
              </div>

              {/* Smart Networking Experience */}
              <div className="bnt-smart-block" style={{ marginBottom: 32 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
                  <div>
                    <div className="bnt-sh">Smart Networking Experience</div>
                    <h3 className="bnt-h2">An <em>Intelligent</em>, Personalised Platform</h3>
                    <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.75, marginBottom: 20 }}>
                      The BIG CIO attendee app is built around networking, not scheduling. Every feature is designed to make your connections more productive, your sessions more relevant, and your time more valuable.
                    </p>
                    <div className="bnt-chips">
                      {["Intelligent", "Personalised", "Productivity-Driven", "Networking-First"].map(t => (
                        <span key={t} className="bnt-chip">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[
                        { val: "iOS",      lbl: "Available on" },
                        { val: "Android",  lbl: "Available on" },
                        { val: "Web",      lbl: "Also on" },
                        { val: "30 Days",  lbl: "Post-event access" },
                      ].map(s => (
                        <div key={s.val} style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                          <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{s.val}</div>
                          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.90)" }}>{s.lbl}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Why It Matters */}
              <div style={{ background: "var(--bg-card)", border: "1px solid rgba(201,168,76,0.20)", borderRadius: 16, padding: "32px 40px", marginBottom: 32, display: "flex", gap: 24, alignItems: "flex-start" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Why It Matters</div>
                  <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.75, margin: 0 }}>
                    The attendee app transforms BIG CIO from a two-day event into an ongoing networking ecosystem. Your connections, your schedule, and your content — all in one intelligent platform that works before, during, and 30 days after the event.
                  </p>
                </div>
              </div>

              <div className="bnt-cta-strip">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>App access is included with every delegate registration</div>
                  <div style={{ fontSize: 13, color: "var(--text-body)" }}>Pre-event access opens 2 weeks before the event — start scheduling meetings early.</div>
                </div>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                  Unlock the Full BIG CIO Experience
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </>
        )}

        {/* ─── AI MATCHMAKING ─── */}
        {tab === "ai" && (
          <>
            <div className="bnt-hero">
              <div className="bnt-hero-inner">
                <div className="bcio-eyebrow">AI-Powered Matchmaking</div>
                <h1 className="bnt-h1">Meet the <em>Right People</em> at BIG CIO</h1>
                <p className="bnt-sub">
                  Our AI matchmaking platform connects attendees based on interests, goals, industries and business priorities — saving networking time and improving meeting quality for every delegate.
                </p>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                  Register to Get Matched
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
            <div className="bnt-section">
              {/* How It Works */}
              <div className="bnt-sh">How AI Matchmaking Works</div>
              <div className="bnt-ai-steps" style={{ maxWidth: 640, marginBottom: 56 }}>
                {[
                  { step: "01", title: "Create Your Profile",          desc: "Set your role, company size, industry, technology interests, and stated networking goals." },
                  { step: "02", title: "Select Your Interests",        desc: "Choose your priority technology categories, business challenges, and meeting objectives." },
                  { step: "03", title: "AI Analyses Relevance",        desc: "Our algorithm cross-references thousands of attendee profiles to surface your most relevant matches." },
                  { step: "04", title: "Get Recommended Connections",  desc: "Personalised match suggestions arrive in your app with a relevance score and reasoning." },
                  { step: "05", title: "Schedule Meetings Instantly",  desc: "Accept a match and the system auto-assigns an available time slot for your 1:1 meeting." },
                ].map(s => (
                  <div key={s.step} className="bnt-ai-step">
                    <div className="bnt-ai-step-num">{s.step}</div>
                    <div>
                      <div className="bnt-title" style={{ marginBottom: 4 }}>{s.title}</div>
                      <div className="bnt-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Matchmaking Categories */}
              <div className="bnt-sh">Matchmaking Categories</div>
              <div className="bnt-grid-3" style={{ marginBottom: 16 }}>
                {[
                  { num: "01", title: "CIO to CIO Networking",       desc: "Peer connections across industries — enabling candid knowledge exchange between leaders at the same level." },
                  { num: "02", title: "Enterprise Buyers & Vendors",  desc: "Pre-qualified introductions between enterprise technology buyers and relevant solution providers." },
                  { num: "03", title: "Startups & Investors",         desc: "High-growth B2B startups matched with VCs and corporate venture arms actively seeking investments." },
                  { num: "04", title: "Media & Thought Leaders",      desc: "Journalists and editors connected with speakers, innovators, and enterprise executives for editorial coverage." },
                  { num: "05", title: "Industry-Specific Introductions", desc: "BFSI, manufacturing, healthcare — sector-matched introductions for focused business conversations." },
                  { num: "06", title: "Technology Partnerships",      desc: "Ecosystem partnerships between complementary solution providers and systems integrators." },
                ].map(b => (
                  <div key={b.num} className="bnt-card">
                    <div className="bnt-num">{b.num}</div>
                    <div className="bnt-title">{b.title}</div>
                    <div className="bnt-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Matchmaking Data Points */}
              <div className="bnt-outcome-block" style={{ marginBottom: 32 }}>
                <div className="bnt-sh">Matchmaking Data Points</div>
                <div className="bnt-chips">
                  {["Job Title & Seniority", "Company Size", "Industry Vertical", "Technology Budget", "Evaluation Stage", "Product Categories", "Geographic Focus", "Investment Horizon", "Past Attendance", "Stated Goals"].map(t => (
                    <span key={t} className="bnt-chip">{t}</span>
                  ))}
                </div>
              </div>

              {/* Privacy & Professionalism */}
              <div className="bnt-privacy-block">
                <div>
                  <div className="bnt-sh">Privacy &amp; Professionalism</div>
                  <h3 className="bnt-h2">A <em>Secure</em> Professional Ecosystem</h3>
                  <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.75, marginBottom: 20 }}>
                    BIG CIO AI matchmaking operates within a fully curated, verified attendee environment. Every connection is opt-in, every interaction is professional, and every piece of data is handled with enterprise-grade security.
                  </p>
                </div>
                <div>
                  {[
                    { title: "Secure Networking",             desc: "All attendee data is encrypted and never shared with third parties." },
                    { title: "Permission-Based Interactions", desc: "You choose who you connect with — no unsolicited meeting requests accepted." },
                    { title: "Professional Ecosystem",        desc: "All attendees are verified enterprise leaders — no open registration." },
                    { title: "Curated Attendee Environment",  desc: "Editorial oversight ensures the right people are in the room." },
                  ].map(p => (
                    <div key={p.title} className="bnt-check-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                      <div>
                        <span style={{ fontWeight: 700, color: "#fff" }}>{p.title}</span> — <span>{p.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Matchmaking Outcomes */}
              <div className="bnt-stats-strip" style={{ marginBottom: 32 }}>
                {[
                  { val: "3,000+", lbl: "Qualified Meetings Facilitated" },
                  { val: "87%",    lbl: "Meeting Satisfaction Rate" },
                  { val: "500+",   lbl: "Strategic Conversations" },
                  { val: "92%",    lbl: "Better ROI for Attendees" },
                ].map(s => (
                  <div key={s.lbl} className="bnt-stat">
                    <div className="bnt-stat-val">{s.val}</div>
                    <div className="bnt-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>

              <div className="bnt-cta-strip">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Start Intelligent Networking</div>
                  <div style={{ fontSize: 13, color: "var(--text-body)" }}>Connect with the right enterprise leaders — AI handles the matching, you handle the conversation.</div>
                </div>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                  Register to Get Matched
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </>
        )}

        {/* ─── PHOTO GALLERY ─── */}
        {tab === "gallery" && (
          <>
            <div className="bnt-hero">
              <div className="bnt-hero-inner">
                <div className="bcio-eyebrow">15 Editions of Enterprise Leadership</div>
                <h1 className="bnt-h1">Inside the <em>BIG CIO Experience</em></h1>
                <p className="bnt-sub">
                  Explore highlights from keynote sessions, networking experiences, innovation showcases and executive interactions across 15 editions of India&apos;s most influential CIO gathering.
                </p>
              </div>
            </div>
            <div className="bnt-section">
              {/* Gallery Categories */}
              <div className="bnt-sh">Gallery Categories</div>
              <div className="bnt-outcome-block" style={{ marginBottom: 40 }}>
                <div className="bnt-chips">
                  {["Keynotes", "Networking Sessions", "Exhibition Floor", "Startup Showcase", "Awards Ceremony", "VIP Meetings", "Roundtables", "Fireside Chats", "Innovation Zones"].map(c => (
                    <span key={c} className="bnt-chip">{c}</span>
                  ))}
                </div>
              </div>

              <div className="bnt-gallery-grid">
                {[
                  { label: "Keynote Stage", microcopy: "Where ideas sparked new collaborations." },
                  { label: "Networking Lunch", microcopy: "Technology leaders exchanging future-focused insights." },
                  { label: "1:1 Meeting Zone", microcopy: "Moments shaping enterprise innovation." },
                  { label: "Exhibition Floor", microcopy: "A live marketplace of enterprise technology." },
                  { label: "Awards Ceremony", microcopy: "Recognising excellence in digital transformation." },
                  { label: "Roundtable Sessions", microcopy: "Candid conversations with 12-15 senior peers." },
                  { label: "Startup Zone", microcopy: "Breakthrough technologies meeting enterprise buyers." },
                  { label: "CIO Panel", microcopy: "Perspectives from across the enterprise landscape." },
                  { label: "Gala Dinner", microcopy: "The year's most valuable networking moment." },
                ].map((item, i) => (
                  <div key={i} className="bnt-gallery-tile">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgba(255,255,255,0.15)" }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span>{item.label}</span>
                    <span className="bnt-gallery-microcopy">&ldquo;{item.microcopy}&rdquo;</span>
                  </div>
                ))}
              </div>

              {/* Video Highlights */}
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.20)", borderRadius: 16, padding: "36px 40px", marginBottom: 32 }}>
                <div className="bnt-sh">Video Highlights</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                  {[
                    { label: "Event Recap", desc: "The BIG CIO Show 2025 — highlights from keynotes, networking, and the awards ceremony." },
                    { label: "Speaker Snippets", desc: "Key insights from our most memorable keynote speakers across this edition." },
                    { label: "Attendee Testimonials", desc: "Enterprise leaders share their BIG CIO experience in their own words." },
                  ].map(v => (
                    <div key={v.label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px", display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.30)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{v.label}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-body)", lineHeight: 1.65 }}>{v.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Sharing */}
              <div style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px", marginBottom: 32, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Share the BIG CIO Moment</div>
                  <div style={{ fontSize: 12, color: "var(--text-body)" }}>Tag your photos with <span style={{ color: "var(--cyan)", fontWeight: 700 }}>#BigCIOShow</span> on LinkedIn and Instagram — join thousands of enterprise leaders celebrating this moment.</div>
                </div>
                <div className="bnt-chips">
                  {["#BigCIOShow", "#BigCIOAwards", "#CIOCommunity"].map(t => (
                    <span key={t} className="bnt-chip">{t}</span>
                  ))}
                </div>
              </div>

              <div className="bnt-cta-strip" style={{ justifyContent: "center", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Experience BIG CIO in Action</div>
                <div style={{ fontSize: 13, color: "var(--text-body)", marginBottom: 24 }}>Contact our media team to access high-resolution photos from past BIG CIO Show editions.</div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                    Join the Next BIG CIO Experience
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Request Media Gallery Access</Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ─── WHATSAPP NETWORKING ─── */}
        {tab === "whatsapp" && (
          <>
            <div className="bnt-hero">
              <div className="bnt-hero-inner">
                <div className="bcio-eyebrow">WhatsApp Networking Community</div>
                <h1 className="bnt-h1">Join the BIG CIO <em>WhatsApp Community</em></h1>
                <p className="bnt-sub">
                  Connect with attendees, receive event updates and engage with the BIG CIO community through our curated WhatsApp networking groups. 8,500+ members. Year-round peer conversations.
                </p>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                  Join the Community
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
            <div className="bnt-section">
              {/* Why Join */}
              <div className="bnt-sh">Why Join the WhatsApp Community</div>
              <div className="bnt-grid-3">
                {[
                  { num: "01", title: "Real-Time Updates",          desc: "Event announcements, speaker reveals, and agenda changes reach the WhatsApp community before any other channel." },
                  { num: "02", title: "Year-Round Conversations",   desc: "Industry news, peer opinions, job alerts, and leadership insights — shared daily by 8,500+ senior technology executives." },
                  { num: "03", title: "Peer Advisory Network",      desc: "Stuck on a vendor decision? Post to the group. Your question reaches 8,500 experienced CIOs who have been there." },
                  { num: "04", title: "Networking Opportunities",   desc: "Pre-event introductions, real-time meetup coordination during the event, and post-event follow-ups." },
                  { num: "05", title: "Sub-Groups by Sector",       desc: "BFSI CIOs, healthcare IT, manufacturing tech, and government — dedicated sub-groups for focused conversations." },
                  { num: "06", title: "Community Discussions",      desc: "Quick pulse surveys, research polls, and enterprise technology debates that shape the annual CIO Benchmarking Report." },
                ].map(b => (
                  <div key={b.num} className="bnt-card">
                    <div className="bnt-num">{b.num}</div>
                    <div className="bnt-title">{b.title}</div>
                    <div className="bnt-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Before During After */}
              <div className="bnt-sh">Before, During &amp; After the Event</div>
              <div className="bnt-before-grid">
                {[
                  {
                    phase: "Before the Event",
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
                    items: ["Attendee introductions", "Networking planning", "Session recommendations", "Venue & logistics updates", "Community announcements"],
                  },
                  {
                    phase: "During the Event",
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
                    items: ["Live updates & schedule changes", "Meetup coordination", "Networking opportunities", "Session highlights", "Real-time interaction"],
                  },
                  {
                    phase: "After the Event",
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                    items: ["Continued conversations", "Partnership follow-ups", "Community engagement", "Research sharing", "Year-round networking"],
                  },
                ].map(col => (
                  <div key={col.phase} className="bnt-before-col">
                    <div className="bnt-before-phase">
                      <span style={{ color: "var(--cyan)" }}>{col.icon}</span>
                      {col.phase}
                    </div>
                    {col.items.map(item => (
                      <div key={item} className="bnt-before-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Community Guidelines */}
              <div className="bnt-sh">Community Guidelines</div>
              <div className="bnt-guidelines" style={{ marginBottom: 32 }}>
                {[
                  { title: "Curated Environment",        desc: "Entry is restricted to verified enterprise leaders. Quality is maintained editorially." },
                  { title: "Respectful Communication",   desc: "All interactions are professional. The community is moderated by the BIG CIO team." },
                  { title: "Business-Focused Discussions",desc: "Conversations stay commercially relevant. No off-topic content." },
                  { title: "No Spam Policy",             desc: "Zero-tolerance for unsolicited promotion. Violators are removed immediately." },
                ].map(g => (
                  <div key={g.title} className="bnt-guideline">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    <div>
                      <span style={{ fontWeight: 700, color: "#fff" }}>{g.title}</span> — {g.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Exclusive Access */}
              <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(192,132,252,0.05) 100%)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: 16, padding: "36px 40px", marginBottom: 32 }}>
                <div className="bnt-sh">Exclusive Access</div>
                <h3 className="bnt-h2">An Extension of the <em>BIG CIO Ecosystem</em></h3>
                <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.75, marginBottom: 20 }}>
                  The WhatsApp community is not a broadcast channel — it is a living ecosystem of 8,500+ enterprise technology leaders sharing insights year-round.
                </p>
                <div className="bnt-chips">
                  {["Insider Updates", "Networking Opportunities", "Community-First Announcements", "Curated Interactions", "Peer Advisory Access"].map(t => (
                    <span key={t} className="bnt-chip">{t}</span>
                  ))}
                </div>
              </div>

              <div className="bnt-cta-strip">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>WhatsApp access is included with delegate registration</div>
                  <div style={{ fontSize: 13, color: "var(--text-body)" }}>Register for Big CIO Show 2026 and our team will add you to the verified CIO community.</div>
                </div>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                  Register &amp; Get Access
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
