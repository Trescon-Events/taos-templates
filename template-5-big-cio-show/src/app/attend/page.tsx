"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PASS_URL = "https://konfhub.com/checkout/big-cio-show-awards-2026?ticketId=93845%7C1%3B&selectedCode=MKTWEBSITE";
type Tab = "overview" | "delegates" | "sponsors" | "exhibitor" | "association" | "faqs" | "media";
type Speaker = { id: string; name: string; title: string; company: string; img: string; bio: string };

const VALID_TABS: Tab[] = ["overview", "delegates", "sponsors", "exhibitor", "association", "faqs", "media"];

export default function AttendPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab") as Tab | null;
    if (t && VALID_TABS.includes(t)) setTab(t);
  }, []);

  const changeTab = (t: Tab) => {
    setTab(t);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", t);
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    fetch("/api/speakers")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.speakers)) setSpeakers(d.speakers.slice(0, 12)); })
      .catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        .bat-page { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }
        .bat-tabbar {
          background: var(--bg-surface); border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .bat-tabbar-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: flex; overflow-x: auto; scrollbar-width: none;
        }
        .bat-tabbar-inner::-webkit-scrollbar { display: none; }
        .bat-tab {
          font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.90);
          padding: 16px 22px; cursor: pointer; border: none; background: none;
          font-family: inherit; border-bottom: 2px solid transparent;
          white-space: nowrap; transition: color 0.2s, border-color 0.2s;
        }
        .bat-tab:hover { color: #ffffff; }
        .bat-tab.active { color: var(--cyan); border-bottom-color: var(--cyan); }

        .bat-hero {
          background: var(--bg-surface); padding: 88px 40px 80px;
          text-align: center; position: relative; overflow: hidden;
          border-bottom: 1px solid rgba(124,58,237,0.10);
        }
        .bat-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 70% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .bat-hero-inner { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; }
        .bat-h1 { font-size: clamp(24px, 3vw, 44px); font-weight: 900; letter-spacing: -0.03em; color: #fff; line-height: 1.10; margin-bottom: 20px; }
        .bat-h1 em { font-style: normal; color: var(--cyan); }
        .bat-sub { font-size: 18px; color: var(--text-body); max-width: 600px; margin: 0 auto 40px; line-height: 1.75; }

        .bat-section { max-width: 1320px; margin: 0 auto; padding: 80px 40px 96px; }
        .bat-section-narrow { max-width: 900px; margin: 0 auto; padding: 80px 40px 96px; }

        /* Cards */
        .bat-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 48px; }
        .bat-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 48px; }
        .bat-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; margin-bottom: 48px; }
        .bat-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 16px; padding: 28px 24px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bat-card:hover {
          border-color: rgba(124,58,237,0.40);
          box-shadow: 0 0 20px rgba(124,58,237,0.14);
        }
        .bat-num { font-size: 13px; font-weight: 900; letter-spacing: 0.12em; color: var(--cyan); margin-bottom: 14px; }
        .bat-num-gold { font-size: 13px; font-weight: 900; letter-spacing: 0.12em; color: var(--gold); margin-bottom: 14px; }
        .bat-card-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.3; }
        .bat-card-desc { font-size: 18px; color: var(--text-body); line-height: 1.7; }

        /* Section heading */
        .bat-sh { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; }
        .bat-sh-label { font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--cyan); white-space: nowrap; }
        .bat-sh-rule { flex: 1; height: 1px; background: rgba(124,58,237,0.15); }

        /* Highlight icon cards */
        .bat-hl-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 56px; }
        .bat-hl-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 20px; padding: 32px 28px;
          display: flex; flex-direction: column; gap: 16px;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .bat-hl-card:hover {
          border-color: rgba(124,58,237,0.45);
          box-shadow: 0 0 28px rgba(124,58,237,0.18);
          transform: translateY(-3px);
        }
        .bat-hl-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: rgba(124,58,237,0.10); border: 1px solid rgba(124,58,237,0.22);
          display: flex; align-items: center; justify-content: center; color: var(--cyan);
        }
        .bat-hl-title { font-size: 18px; font-weight: 800; color: #fff; line-height: 1.3; }
        .bat-hl-desc { font-size: 18px; color: var(--text-body); line-height: 1.7; }

        /* Stats row */
        .bat-stats-row {
          display: flex; gap: 0;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden; margin-bottom: 56px;
        }
        .bat-stat { flex: 1; padding: 28px 20px; text-align: center; border-right: 1px solid var(--border); }
        .bat-stat:last-child { border-right: none; }
        .bat-stat-val { font-size: 28px; font-weight: 900; letter-spacing: -0.02em; line-height: 1; margin-bottom: 6px; }
        .bat-stat-lbl { font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.92); }

        /* Journey steps */
        .bat-journey { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; margin-bottom: 48px; }
        .bat-step {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 16px; padding: 24px 20px; position: relative;
        }
        .bat-step-n { font-size: 28px; font-weight: 900; color: rgba(124,58,237,0.25); letter-spacing: -0.04em; line-height: 1; margin-bottom: 10px; }
        .bat-step-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .bat-step-desc { font-size: 18px; color: var(--text-body); line-height: 1.65; }

        /* Industries grid */
        .bat-ind-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 48px; }
        .bat-ind-pill {
          font-size: 18px; font-weight: 700; color: #ffffff;
          background: var(--bg-card); border: 1px solid var(--border);
          padding: 8px 16px; border-radius: 100px;
          transition: border-color 0.2s, color 0.2s;
        }
        .bat-ind-pill:hover { border-color: rgba(124,58,237,0.45); color: #fff; }

        /* Why it matters */
        .bat-matters-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 12px; margin-bottom: 56px; }
        .bat-matter-card {
          background: var(--bg-card); border: 1px solid rgba(124,58,237,0.18);
          border-radius: 14px; padding: 24px 18px; text-align: center;
        }
        .bat-matter-title { font-size: 18px; font-weight: 800; color: #fff; line-height: 1.4; }

        /* Testimonials */
        .bat-testi-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; margin-bottom: 56px; }
        .bat-testi {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.18);
          border-radius: 16px; padding: 32px 28px; position: relative;
        }
        .bat-testi::before {
          content: '"'; position: absolute; top: 16px; left: 24px;
          font-size: 64px; font-weight: 900; line-height: 1;
          color: rgba(124,58,237,0.18); font-family: Georgia, serif;
        }
        .bat-testi-quote { font-size: 18px; color: #fff; font-weight: 600; line-height: 1.7; margin-bottom: 16px; font-style: italic; }
        .bat-testi-name { font-size: 13px; font-weight: 700; color: var(--cyan); letter-spacing: 0.06em; }
        .bat-testi-role { font-size: 18px; color: var(--text-muted); margin-top: 2px; }

        /* Speakers grid */
        .bat-spk-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 56px;
        }
        .bat-spk-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 16px; padding: 24px 20px; text-align: center;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .bat-spk-card:hover {
          border-color: rgba(124,58,237,0.45);
          box-shadow: 0 0 24px rgba(124,58,237,0.16);
          transform: translateY(-3px);
        }
        .bat-spk-img {
          width: 72px; height: 72px; border-radius: 50%; object-fit: cover;
          border: 2px solid rgba(124,58,237,0.30); margin: 0 auto 14px; display: block;
        }
        .bat-spk-avatar {
          width: 72px; height: 72px; border-radius: 50%; background: rgba(124,58,237,0.12);
          border: 2px solid rgba(124,58,237,0.30); margin: 0 auto 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; font-weight: 900; color: var(--cyan); letter-spacing: -0.02em;
        }
        .bat-spk-name { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 4px; line-height: 1.3; }
        .bat-spk-title { font-size: 18px; color: var(--text-body); line-height: 1.5; margin-bottom: 4px; }
        .bat-spk-co { font-size: 13px; font-weight: 700; letter-spacing: 0.06em; color: var(--cyan); }

        @media (max-width: 1024px) { .bat-spk-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 640px)  { .bat-spk-grid { grid-template-columns: repeat(2,1fr); } }

        /* CTA strip */
        .bat-cta-strip {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.15);
          padding: 36px 40px; display: flex; align-items: center;
          justify-content: space-between; gap: 32px; flex-wrap: wrap; border-radius: 16px;
        }
        .bat-cta-label { font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.70); margin-bottom: 12px; }
        .bat-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .bat-chip {
          font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
          color: var(--cyan); background: rgba(192,132,252,0.08);
          border: 1px solid rgba(192,132,252,0.20); padding: 5px 12px; border-radius: 6px; white-space: nowrap;
        }
        .bat-chip-gold {
          font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
          color: var(--gold); background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.22); padding: 5px 12px; border-radius: 6px; white-space: nowrap;
        }

        /* Final CTA banner */
        .bat-final-cta {
          background: linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(192,132,252,0.08) 100%);
          border: 1px solid rgba(124,58,237,0.30); border-radius: 20px;
          padding: 64px 48px; text-align: center; position: relative; overflow: hidden;
        }
        .bat-final-cta::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .bat-final-cta-inner { position: relative; z-index: 2; }
        .bat-final-cta h2 { font-size: clamp(20px,2.8vw,36px); font-weight: 900; letter-spacing: -0.02em; color: #fff; margin-bottom: 14px; }
        .bat-final-cta h2 em { font-style: normal; color: var(--cyan); }
        .bat-final-cta p { font-size: 18px; color: var(--text-body); max-width: 540px; margin: 0 auto 36px; line-height: 1.75; }

        /* Audience breakdown */
        .bat-audience-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; margin-bottom: 48px; }
        .bat-audience-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 28px 24px; }
        .bat-audience-title { font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }

        /* Sponsorship packages */
        .bat-pkg-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 48px; }
        .bat-pkg {
          background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 22px 18px; text-align: center;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bat-pkg:hover { border-color: rgba(201,168,76,0.40); box-shadow: 0 0 20px rgba(201,168,76,0.14); }
        .bat-pkg-label { font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
        .bat-pkg-name { font-size: 18px; font-weight: 800; color: #fff; }

        /* Checklist */
        .bat-checklist { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 48px; }
        .bat-check-item { display: flex; align-items: flex-start; gap: 10px; font-size: 18px; color: rgba(255,255,255,0.92); line-height: 1.5; }
        .bat-check-item svg { color: var(--cyan); flex-shrink: 0; margin-top: 2px; }
        .bat-check-item-gold svg { color: var(--gold); }

        /* FAQ categories */
        .bat-faq-cat { margin-bottom: 48px; }
        .bat-faq-cat-label {
          font-size: 13px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--cyan);
          display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
        }
        .bat-faq-cat-label::after { content: ''; flex: 1; height: 1px; background: rgba(124,58,237,0.15); }
        .bat-faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 24px; margin-bottom: 24px; }
        .bat-faq-item:last-child { border-bottom: none; margin-bottom: 0; }
        .bat-faq-q { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.4; }
        .bat-faq-a { font-size: 18px; color: var(--text-body); line-height: 1.8; }

        /* Pass */
        .bat-pass { max-width: 900px; margin: 0 auto; padding: 72px 40px 100px; }
        .bat-pass-hero { text-align: center; margin-bottom: 48px; }
        .bat-pass-hero h2 { font-size: clamp(18px, 2.2vw, 28px); font-weight: 800; letter-spacing: -0.02em; color: #fff; margin-bottom: 12px; }
        .bat-pass-hero h2 span { color: var(--cyan); }
        .bat-pass-hero p { font-size: 18px; color: var(--text-body); max-width: 480px; margin: 0 auto; line-height: 1.75; }
        .bat-pass-card { background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.25); border-radius: 16px; position: relative; overflow: hidden; }
        .bat-pass-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #7C3AED, #C084FC); }
        .bat-pass-inner { display: grid; grid-template-columns: 1fr 1fr; }
        .bat-pass-left { padding: 48px 40px; border-right: 1px solid rgba(255,255,255,0.07); }
        .bat-pass-right { padding: 48px 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: rgba(124,58,237,0.04); }
        .bat-pass-type { font-size: 13px; font-weight: 700; letter-spacing: 0.20em; text-transform: uppercase; color: var(--cyan); margin-bottom: 8px; }
        .bat-pass-name { font-size: 22px; font-weight: 900; color: #fff; letter-spacing: -0.02em; margin-bottom: 24px; }
        .bat-pass-includes-label { font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.70); margin-bottom: 14px; }
        .bat-pass-item { display: flex; align-items: flex-start; gap: 10px; font-size: 18px; color: #ffffff; margin-bottom: 11px; line-height: 1.5; }
        .bat-pass-item svg { color: var(--cyan); flex-shrink: 0; margin-top: 2px; }
        .bat-pass-price { font-size: 44px; font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--cyan); margin-bottom: 6px; }
        .bat-pass-note { font-size: 18px; color: rgba(255,255,255,0.70); margin-bottom: 28px; }
        .bat-pass-btn { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #7C3AED, #C084FC); color: #fff; font-size: 13px; font-weight: 800; letter-spacing: 0.10em; text-transform: uppercase; padding: 16px 32px; border-radius: 8px; text-decoration: none; width: 100%; justify-content: center; transition: opacity 0.2s, transform 0.2s; }
        .bat-pass-btn:hover { opacity: 0.88; transform: translateY(-2px); }

        @media (max-width: 1024px) {
          .bat-grid-4 { grid-template-columns: repeat(2,1fr); }
          .bat-matters-grid { grid-template-columns: repeat(3,1fr); }
          .bat-pkg-grid { grid-template-columns: repeat(3,1fr); }
          .bat-audience-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .bat-hl-grid, .bat-journey, .bat-grid-3 { grid-template-columns: repeat(2,1fr); }
          .bat-testi-grid, .bat-checklist { grid-template-columns: 1fr; }
          .bat-pass-inner { grid-template-columns: 1fr; }
          .bat-pass-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .bat-cta-strip { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 640px) {
          .bat-hero { padding: 60px 24px 52px; }
          .bat-section, .bat-section-narrow { padding: 52px 24px 72px; }
          .bat-pass { padding: 48px 24px 72px; }
          .bat-tabbar-inner { padding: 0 16px; }
          .bat-grid-4, .bat-grid-3, .bat-grid-2, .bat-hl-grid, .bat-journey, .bat-matters-grid, .bat-pkg-grid { grid-template-columns: 1fr; }
          .bat-stats-row { flex-direction: column; }
          .bat-stat { border-right: none; border-bottom: 1px solid var(--border); }
          .bat-stat:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="bat-page">
        {/* Tab bar */}
        <div className="bat-tabbar">
          <div className="bat-tabbar-inner">
            {([
              ["overview",     "Overview"],
              ["delegates",    "Delegates"],
              ["sponsors",     "Sponsors"],
              ["exhibitor",    "Exhibitors"],
              ["association",  "Association Partners"],
              ["media",        "Media"],
              ["faqs",         "FAQs"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} className={`bat-tab${tab === id ? " active" : ""}`} onClick={() => changeTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <>
            <div className="bat-hero">
              <div className="bat-hero-inner">
                <div className="bcio-eyebrow">4 June 2026 · Bengaluru, India</div>
                <h1 className="bat-h1">India&apos;s Most Influential <em>CIO &amp; Technology Leadership Platform</em></h1>
                <p className="bat-sub">The definitive gathering for enterprise technology leadership — 8,500+ decision-makers, 20+ industries, 40+ global speakers, government participation, and India&apos;s most prestigious technology awards.</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                    Apply to Attend
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-gold">Partner With Us</Link>
                  <Link href="/agenda" className="bcio-btn-outline">Explore Agenda</Link>
                </div>
              </div>
            </div>

            <div className="bat-section">

              {/* Stats */}
              <div className="bat-stats-row" style={{ marginBottom: 72 }}>
                {[
                  { val: "8,500+", lbl: "Enterprise Decision-Makers", color: "var(--cyan)" },
                  { val: "20+",    lbl: "Industries Represented",      color: "var(--cyan)" },
                  { val: "40+",    lbl: "Global Speakers",             color: "var(--cyan)" },
                  { val: "100+",   lbl: "Award Categories",            color: "var(--gold)" },
                  { val: "15",     lbl: "Editions of Trust",           color: "var(--cyan)" },
                ].map(s => (
                  <div key={s.lbl} className="bat-stat">
                    <div className="bat-stat-val" style={{ color: s.color }}>{s.val}</div>
                    <div className="bat-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Why BIG CIO Exists */}
              <div style={{ marginBottom: 72 }}>
                <div className="bat-sh"><div className="bat-sh-label">Why BIG CIO Exists</div><div className="bat-sh-rule"/></div>
                <div className="bat-grid-2" style={{ marginBottom: 0 }}>
                  <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 20, padding: "40px 36px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16 }}>The Context</div>
                    <h3 style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}>Digital transformation is no longer optional. CIOs are now business architects.</h3>
                    <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.8, marginBottom: 0 }}>
                      AI, cybersecurity, cloud, data and governance are reshaping every industry — and the CIO sits at the centre of every critical decision. The pressure to transform, secure, and scale has never been greater.
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { title: "Enterprise AI is moving from pilot to production", desc: "CIOs need real frameworks, not vendor roadmaps. BIG CIO brings practitioners who have done it." },
                      { title: "Cybersecurity is a board-level conversation", desc: "CISOs and CIOs are navigating threats that didn't exist three years ago. Peer intelligence is irreplaceable." },
                      { title: "Cloud and data complexity is accelerating", desc: "Multi-cloud, data governance, and FinOps require decisions that shape organisations for a decade." },
                      { title: "BIG CIO is where these conversations happen", desc: "Not promotional. Not vendor-led. Practitioner-first, enterprise-grade, built for senior leaders." },
                    ].map((item, i) => (
                      <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{item.title}</div>
                          <div style={{ fontSize: 12, color: "var(--text-body)", lineHeight: 1.65 }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Highlights */}
              <div style={{ marginBottom: 72 }}>
                <div className="bat-sh"><div className="bat-sh-label">Event Highlights</div><div className="bat-sh-rule"/></div>
                <div className="bat-hl-grid">
                  {[
                    { title: "Visionary Keynotes",   desc: "Strategic talks from global and Indian CIOs shaping enterprise technology for 2026 and beyond.",
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
                    { title: "CIO Boardrooms",        desc: "Invite-only closed-door sessions with 12–15 senior leaders tackling the same enterprise challenges.",
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
                    { title: "CIO Roundtables",       desc: "Peer-led group discussions on AI, cybersecurity, cloud, and transformation — real challenges, real outcomes.",
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                    { title: "Networking Lounge",     desc: "Structured and open networking throughout the day with AI-matched meeting recommendations.",
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                    { title: "Big CIO Awards",        desc: "India&apos;s most recognised CIO awards night — 100+ categories across sectors, org sizes, and leadership areas.",
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 21h8M12 17v4M17 3H7l-2 6h14l-2-6zM5 9c0 3.866 3.134 7 7 7s7-3.134 7-7"/></svg> },
                    { title: "AI Showcases",          desc: "Live demonstrations of enterprise AI deployments, GenAI applications, and intelligent automation.",
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
                    { title: "Innovation Zone",       desc: "50+ enterprise technology brands showcasing breakthrough solutions to senior decision-makers.",
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.2 6l-.8.6V18h-6v-2.4l-.8-.6A7 7 0 0 1 12 2z"/><path d="M9 21h6M10 18h4"/></svg> },
                    { title: "VIP Networking",        desc: "Private hosted buyer sessions, executive dinners, and curated introductions for senior leaders.",
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                    { title: "Fireside Chats",        desc: "Intimate leadership conversations exploring transformation journeys, board dynamics, and enterprise outcomes.",
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> },
                  ].map(h => (
                    <div key={h.title} className="bat-hl-card">
                      <div className="bat-hl-icon">{h.icon}</div>
                      <div>
                        <div className="bat-hl-title">{h.title}</div>
                        <div className="bat-hl-desc" style={{ marginTop: 6 }}>{h.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Attends */}
              <div style={{ marginBottom: 72 }}>
                <div className="bat-sh"><div className="bat-sh-label">Who Attends</div><div className="bat-sh-rule"/></div>
                <div className="bat-grid-2" style={{ marginBottom: 24 }}>
                  <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "28px 28px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16 }}>Roles &amp; Titles</div>
                    <div className="bat-chips">
                      {["CIOs", "CTOs", "CISOs", "Heads of AI", "Digital Transformation Leaders", "Cloud Leaders", "Data & Analytics Executives", "Government Technology Leaders", "Enterprise Architects", "Chief Digital Officers", "IT Directors", "Heads of Innovation"].map(r => (
                        <span key={r} className="bat-chip">{r}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "28px 28px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Industries Represented</div>
                    <div className="bat-ind-grid" style={{ marginBottom: 0 }}>
                      {["BFSI", "Manufacturing", "Retail", "Healthcare", "Government", "Telecom", "Energy", "Logistics", "Pharma"].map(ind => (
                        <span key={ind} className="bat-ind-pill">{ind}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Why It Matters */}
              <div style={{ marginBottom: 72 }}>
                <div className="bat-sh"><div className="bat-sh-label">Why It Matters</div><div className="bat-sh-rule"/></div>
                <div className="bat-matters-grid">
                  {[
                    "Enterprise-First Conversations",
                    "Closed-Door Networking",
                    "Curated Decision-Maker Audience",
                    "Strategic Partnerships",
                    "Real-World Use Cases",
                  ].map(m => (
                    <div key={m} className="bat-matter-card">
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.22)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "var(--cyan)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div className="bat-matter-title">{m}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Themes */}
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 16, padding: "36px 40px", marginBottom: 56 }}>
                <div className="bat-sh" style={{ marginBottom: 20 }}><div className="bat-sh-label">Featured Themes</div><div className="bat-sh-rule"/></div>
                <div className="bat-chips">
                  {["Enterprise AI", "Cybersecurity", "Digital Infrastructure", "Data Governance", "Future of Work", "Smart Manufacturing", "Cloud Modernisation", "Automation", "Responsible AI", "GenAI for Enterprise"].map(t => (
                    <span key={t} className="bat-chip">{t}</span>
                  ))}
                </div>
              </div>

              {/* Featured Leaders / Past Speakers */}
              <div style={{ marginBottom: 72 }}>
                <div className="bat-sh"><div className="bat-sh-label">Featured Leaders &amp; Past Speakers</div><div className="bat-sh-rule"/></div>
                {speakers.length > 0 ? (
                  <>
                    <div className="bat-spk-grid">
                      {speakers.map(s => {
                        const initials = s.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
                        return (
                          <div key={s.id || s.name} className="bat-spk-card">
                            {s.img
                              ? <img src={s.img} alt={s.name} className="bat-spk-img" />
                              : <div className="bat-spk-avatar">{initials}</div>
                            }
                            <div className="bat-spk-name">{s.name}</div>
                            {s.title   && <div className="bat-spk-title">{s.title}</div>}
                            {s.company && <div className="bat-spk-co">{s.company}</div>}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Link href="/speakers" className="bcio-btn-outline">View All Speakers</Link>
                    </div>
                  </>
                ) : (
                  <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 16, padding: "40px", textAlign: "center" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
                      {["CIO, Fortune 500 Conglomerate","CTO, Global Technology Leader","CISO, Leading BFSI Group","Chief Digital Officer, Public Sector"].map((label,i) => (
                        <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "24px 16px", textAlign: "center" }}>
                          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(124,58,237,0.12)", border: "2px solid rgba(124,58,237,0.25)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "var(--cyan)" }}>
                            {["CIO","CTO","CISO","CDO"][i]}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--text-body)", lineHeight: 1.5 }}>{label}</div>
                        </div>
                      ))}
                    </div>
                    <Link href="/speakers" className="bcio-btn-outline">View All Confirmed Speakers</Link>
                  </div>
                )}
              </div>

              {/* Testimonials */}
              <div style={{ marginBottom: 56 }}>
                <div className="bat-sh"><div className="bat-sh-label">What Attendees Say</div><div className="bat-sh-rule"/></div>
                <div className="bat-testi-grid">
                  <div className="bat-testi">
                    <div className="bat-testi-quote">&ldquo;One of the most valuable technology leadership forums in the region. The quality of conversations and calibre of peers is genuinely unmatched.&rdquo;</div>
                    <div className="bat-testi-name">Senior CIO, Fortune 500 Enterprise</div>
                    <div className="bat-testi-role">Manufacturing Sector · Bengaluru</div>
                  </div>
                  <div className="bat-testi">
                    <div className="bat-testi-quote">&ldquo;Highly curated conversations with real enterprise value. This is not a vendor expo — it is a genuine peer learning environment for technology leaders.&rdquo;</div>
                    <div className="bat-testi-name">Chief Technology Officer, Leading BFSI Group</div>
                    <div className="bat-testi-role">Banking & Financial Services · Mumbai</div>
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="bat-final-cta">
                <div className="bat-final-cta-inner">
                  <h2>Join the Leaders Defining the <em>Future of Enterprise Technology</em></h2>
                  <p>Apply to attend BIG CIO Show 2026 and be part of India&apos;s most influential technology leadership gathering.</p>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                      Apply to Attend BIG CIO Show
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Partner With Us</Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── DELEGATES ── */}
        {tab === "delegates" && (
          <>
            <div className="bat-hero">
              <div className="bat-hero-inner">
                <div className="bcio-eyebrow">Why Attend as a Delegate</div>
                <h1 className="bat-h1">Designed for <em>Enterprise Technology Decision Makers</em></h1>
                <p className="bat-sub">Connect, learn and lead at BIG CIO Show. Curated networking, actionable insights, peer learning, and enterprise case studies — all in a single high-signal day.</p>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                  Apply for Delegate Pass
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
            <div className="bat-section">

              {/* Why Attend */}
              <div className="bat-sh"><div className="bat-sh-label">Why Attend</div><div className="bat-sh-rule"/></div>
              <div className="bat-grid-3">
                {[
                  { num: "01", title: "Strategic Networking",       desc: "1:1 AI-matched meetings and open networking with 8,500+ CIOs, CTOs, and senior technology executives." },
                  { num: "02", title: "Learn From Real Deployments", desc: "Enterprise case studies from practitioners who have deployed AI, cloud, and cybersecurity at scale." },
                  { num: "03", title: "Meet Solution Providers",    desc: "50+ enterprise technology vendors — structured demos, live POCs, no unsolicited cold pitches." },
                  { num: "04", title: "Gain Market Intelligence",   desc: "Benchmark your technology strategy against peers and discover what India&apos;s top CIOs are prioritising." },
                  { num: "05", title: "Discover AI Innovations",    desc: "The AI Showcase brings together the most compelling GenAI and enterprise AI products launching in 2026." },
                  { num: "06", title: "Benchmark Against Peers",    desc: "Roundtables and boardrooms designed specifically for peer comparison — no vendors, no pitching." },
                ].map(b => (
                  <div key={b.num} className="bat-card">
                    <div className="bat-num">{b.num}</div>
                    <div className="bat-card-title">{b.title}</div>
                    <div className="bat-card-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Delegate Experience Journey */}
              <div className="bat-sh"><div className="bat-sh-label">Your Day at BIG CIO</div><div className="bat-sh-rule"/></div>
              <div className="bat-journey">
                {[
                  { n: "1", title: "VIP Registration",       desc: "Priority check-in with your event badge, personalised schedule, and pre-matched meeting list." },
                  { n: "2", title: "Curated Networking",      desc: "Pre-event app access to browse attendees and book 1:1 meetings before you arrive." },
                  { n: "3", title: "Executive Sessions",      desc: "Keynotes, panels, and fireside chats with enterprise technology leaders all morning." },
                  { n: "4", title: "Lunch Networking",        desc: "90-minute networking lunch — the most organic, high-quality meeting time of the day." },
                  { n: "5", title: "Innovation Showcase",     desc: "Explore 50+ exhibitors in the afternoon — live demos, meetings, and product evaluations." },
                  { n: "6", title: "Closed-Door Roundtables", desc: "Invitation-only 45-minute sessions with 12–15 peers on your most pressing enterprise challenges." },
                ].map(s => (
                  <div key={s.n} className="bat-step">
                    <div className="bat-step-n">{s.n.padStart(2,"0")}</div>
                    <div className="bat-step-title">{s.title}</div>
                    <div className="bat-step-desc">{s.desc}</div>
                  </div>
                ))}
              </div>

              {/* What Delegates Access */}
              <div className="bat-sh"><div className="bat-sh-label">What You&apos;ll Access</div><div className="bat-sh-rule"/></div>
              <div className="bat-checklist" style={{ marginBottom: 48 }}>
                {["Conference sessions & keynotes","Exhibition floor & live demos","Executive networking & 1:1 meetings","Big CIO Awards ceremony","Workshops & interactive sessions","AI showcase & demonstrations","AI matchmaking opportunities","Roundtable discussions","Event app & pre-networking","Post-event recordings & reports"].map(item => (
                  <div key={item} className="bat-check-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>

              {/* Networking Statistics */}
              <div className="bat-stats-row" style={{ marginBottom: 48 }}>
                {[
                  { val: "500+",  lbl: "Enterprise Leaders",         color: "var(--cyan)" },
                  { val: "1:1",   lbl: "Networking Opportunities",   color: "var(--cyan)" },
                  { val: "30+",   lbl: "Strategic Sessions",         color: "var(--cyan)" },
                  { val: "20+",   lbl: "Industry Partners",          color: "var(--gold)" },
                ].map(s => (
                  <div key={s.lbl} className="bat-stat">
                    <div className="bat-stat-val" style={{ color: s.color }}>{s.val}</div>
                    <div className="bat-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Ideal Profiles */}
              <div className="bat-cta-strip">
                <div>
                  <div className="bat-cta-label">Ideal Delegate Profiles</div>
                  <div className="bat-chips">
                    {["CIO", "CTO", "CISO", "IT Director", "Head of Innovation", "Enterprise Architect", "Chief Data Officer", "Digital Transformation Leader"].map(r => (
                      <span key={r} className="bat-chip">{r}</span>
                    ))}
                  </div>
                </div>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                  Apply for Delegate Pass
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </>
        )}

        {/* ── SPONSORS ── */}
        {tab === "sponsors" && (
          <>
            <div className="bat-hero">
              <div className="bat-hero-inner">
                <div className="bcio-eyebrow">Sponsorship Opportunities</div>
                <h1 className="bat-h1">Engage Enterprise Technology <em>Decision Makers at Scale</em></h1>
                <p className="bat-sub">Position your brand at the centre of enterprise innovation. No other event in India gives technology vendors direct, structured access to this many verified CIOs in a single day.</p>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-gold">
                  Become a Sponsor
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
            <div className="bat-section">

              {/* Key messaging */}
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(201,168,76,0.22)", borderRadius: 16, padding: "32px 40px", marginBottom: 48 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>What Sponsors Buy at BIG CIO</div>
                <div style={{ fontSize: 14, color: "#ffffff", lineHeight: 1.75, marginBottom: 16 }}>Sponsors do not buy visibility. They buy:</div>
                <div className="bat-chips">
                  {["Influence", "Positioning", "Access", "Pipeline", "Thought Leadership"].map(m => (
                    <span key={m} className="bat-chip-gold">{m}</span>
                  ))}
                </div>
              </div>

              {/* Why Sponsor */}
              <div className="bat-sh"><div className="bat-sh-label">Why Sponsor BIG CIO</div><div className="bat-sh-rule"/></div>
              <div className="bat-grid-3">
                {[
                  { num: "01", title: "Connect With Enterprise Buyers",        desc: "8,500+ verified CIOs with confirmed technology budgets and active evaluation cycles." },
                  { num: "02", title: "Generate Qualified Leads",              desc: "Pre-qualified meetings with pre-matched delegates at your target seniority and industry." },
                  { num: "03", title: "Build Strategic Partnerships",          desc: "Beyond leads — create alliances, channel relationships, and long-term enterprise partnerships." },
                  { num: "04", title: "Position Executives as Thought Leaders", desc: "Keynote slots, panel seats, and roundtable facilitation in front of India&apos;s top CIOs." },
                  { num: "05", title: "Showcase Enterprise Solutions",         desc: "Live demos, product launches, and structured POCs with decision-makers actively evaluating." },
                  { num: "06", title: "Drive Market Visibility",               desc: "Brand across venue, app, website, and all communications reaching 100,000+ IT professionals." },
                ].map(b => (
                  <div key={b.num} className="bat-card">
                    <div className="bat-num-gold">{b.num}</div>
                    <div className="bat-card-title">{b.title}</div>
                    <div className="bat-card-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Audience Breakdown */}
              <div className="bat-sh"><div className="bat-sh-label">Audience Breakdown</div><div className="bat-sh-rule"/></div>
              <div className="bat-audience-grid" style={{ marginBottom: 48 }}>
                <div className="bat-audience-card">
                  <div className="bat-audience-title">Seniority Split</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { role: "CIO / CTO / CISO / CDO", pct: "68%" },
                      { role: "VP / Head of Technology", pct: "22%" },
                      { role: "IT Director / Sr Manager", pct: "10%" },
                    ].map(r => (
                      <div key={r.role} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "var(--text-body)" }}>{r.role}</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{r.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bat-audience-card">
                  <div className="bat-audience-title">Industries</div>
                  <div className="bat-ind-grid" style={{ marginBottom: 0 }}>
                    {["BFSI", "Manufacturing", "Retail", "Healthcare", "Government", "Telecom", "Energy", "Logistics"].map(i => (
                      <span key={i} className="bat-ind-pill">{i}</span>
                    ))}
                  </div>
                </div>
                <div className="bat-audience-card">
                  <div className="bat-audience-title">Company Size</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { size: "Enterprise (5,000+ employees)", pct: "54%" },
                      { size: "Mid-Market (500–5,000)",        pct: "32%" },
                      { size: "Growth (100–500)",              pct: "14%" },
                    ].map(s => (
                      <div key={s.size} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "var(--text-body)" }}>{s.size}</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{s.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bat-audience-card">
                  <div className="bat-audience-title">Job Titles</div>
                  <div className="bat-chips">
                    {["CIO", "CTO", "CISO", "CDO", "VP IT", "Head of AI", "Enterprise Architect", "IT Director"].map(t => (
                      <span key={t} className="bat-chip-gold">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sponsorship Opportunities */}
              <div className="bat-sh"><div className="bat-sh-label">Sponsorship Packages</div><div className="bat-sh-rule"/></div>
              <div className="bat-pkg-grid" style={{ marginBottom: 48 }}>
                {[
                  "Title Sponsor", "Platinum Sponsor", "Gold Sponsor",
                  "Silver Sponsor", "Innovation Partner", "AI Partner",
                  "Networking Partner", "Lanyard Sponsor", "Coffee Sponsor",
                ].map(p => (
                  <div key={p} className="bat-pkg">
                    <div className="bat-pkg-label">Package</div>
                    <div className="bat-pkg-name">{p}</div>
                  </div>
                ))}
              </div>

              {/* Branding Deliverables */}
              <div className="bat-sh"><div className="bat-sh-label">Branding Deliverables</div><div className="bat-sh-rule"/></div>
              <div className="bat-checklist" style={{ marginBottom: 48 }}>
                {["Stage branding & signage","Digital branding on app & website","Email campaign inclusion","Social media amplification","Media interview opportunities","Sponsored speaker opportunities","Dedicated exhibition space","VIP private meeting room"].map(item => (
                  <div key={item} className="bat-check-item bat-check-item-gold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--gold)" }}><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ color: "rgba(255,255,255,0.92)" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Lead Generation */}
              <div className="bat-sh"><div className="bat-sh-label">Lead Generation Opportunities</div><div className="bat-sh-rule"/></div>
              <div className="bat-grid-3" style={{ marginBottom: 48 }}>
                {[
                  { num: "01", title: "Curated 1:1 Meetings",        desc: "Pre-scheduled 1:1 meetings with delegates matched to your target industry and buying stage." },
                  { num: "02", title: "Hosted Buyer Introductions",  desc: "Event team facilitated introductions with pre-qualified enterprise decision-makers." },
                  { num: "03", title: "Networking Lounge Access",    desc: "Priority access to networking sessions for organic prospect conversations." },
                  { num: "04", title: "Demo Sessions",               desc: "Structured live product demonstrations with interested CIOs booked in advance." },
                  { num: "05", title: "Executive Roundtables",       desc: "Facilitate a sponsored roundtable — 45 minutes with 12 senior leaders on your chosen topic." },
                  { num: "06", title: "Post-Event Lead Report",      desc: "Scanned leads, engagement data, and qualified prospect report delivered within 48 hours." },
                ].map(b => (
                  <div key={b.num} className="bat-card">
                    <div className="bat-num-gold">{b.num}</div>
                    <div className="bat-card-title">{b.title}</div>
                    <div className="bat-card-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* ROI Metrics */}
              <div className="bat-stats-row" style={{ marginBottom: 48 }}>
                {[
                  { val: "8,500+", lbl: "Decision-Maker Audience",  color: "var(--gold)" },
                  { val: "C-Suite", lbl: "Enterprise-Level Participation", color: "var(--gold)" },
                  { val: "100K+",  lbl: "Total Brand Reach",         color: "var(--gold)" },
                  { val: "15",     lbl: "Editions of Credibility",   color: "var(--gold)" },
                ].map(s => (
                  <div key={s.lbl} className="bat-stat">
                    <div className="bat-stat-val" style={{ color: s.color }}>{s.val}</div>
                    <div className="bat-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>

              <div className="bat-cta-strip" style={{ borderColor: "rgba(201,168,76,0.20)" }}>
                <div>
                  <div className="bat-cta-label">Past Sponsors Include</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
                    {[
                      { name: "Intel",              logo: "https://bigcioshow.com/assets/img/clients/intel-logo.webp" },
                      { name: "Dell Technologies",  logo: "https://bigcioshow.com/assets/img/clients/dell-technologies.webp" },
                      { name: "Cisco",              logo: "https://bigcioshow.com/assets/img/clients/cisco.webp" },
                      { name: "HPE",                logo: "https://bigcioshow.com/assets/img/clients/hpe.webp" },
                      { name: "SAP",                logo: "https://bigcioshow.com/assets/img/clients/sap-concur.webp" },
                      { name: "Fortinet",           logo: "https://bigcioshow.com/assets/img/clients/fortinet.webp" },
                      { name: "ManageEngine",       logo: "https://bigcioshow.com/assets/img/clients/manageengine.webp" },
                      { name: "Tata Communications",logo: "https://bigcioshow.com/assets/img/clients/tata-communications.webp" },
                    ].map(s => (
                      <div key={s.name} style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.20)", borderRadius: 10, height: 52, padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.logo} alt={s.name} style={{ maxHeight: 28, maxWidth: 100, objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.75 }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flexShrink: 0 }}>
                  <Link href="https://share.hsforms.com/1HRqBcmZiR4OeUbvlwn5lWQ1rb8t" className="bcio-btn-gold">
                    Download Sponsorship Brochure
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Schedule a Partnership Call</Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── EXHIBITORS ── */}
        {tab === "exhibitor" && (
          <>
            <div className="bat-hero">
              <div className="bat-hero-inner">
                <div className="bcio-eyebrow">Exhibition Opportunities</div>
                <h1 className="bat-h1">Showcase Your Solutions to <em>Enterprise Technology Leaders</em></h1>
                <p className="bat-sub">Demonstrate your solutions, connect with buyers, and position your brand among the industry&apos;s leading innovators — directly in front of 8,500+ enterprise decision-makers.</p>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-gold">
                  Book Your Booth
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
            <div className="bat-section">

              {/* Why Exhibit */}
              <div className="bat-sh"><div className="bat-sh-label">Why Exhibit</div><div className="bat-sh-rule"/></div>
              <div className="bat-grid-3" style={{ marginBottom: 56 }}>
                {[
                  { num: "01", title: "Live Product Demonstrations",  desc: "Structured 20-minute demo slots with interested decision-makers — no cold pitches, only warm prospects." },
                  { num: "02", title: "Enterprise Visibility",        desc: "Your brand in front of 8,500+ CIOs and technology leaders across India&apos;s largest sectors." },
                  { num: "03", title: "Direct Buyer Engagement",      desc: "Pre-qualified 1:1 meetings with enterprise buyers matched to your target industry and buying stage." },
                  { num: "04", title: "Brand Positioning",            desc: "Exhibit alongside Intel, Dell, Cisco — build credibility through association with India&apos;s most trusted CIO platform." },
                  { num: "05", title: "Partnership Opportunities",    desc: "Meet resellers, integrators, and ecosystem partners looking for complementary enterprise solutions." },
                ].map(b => (
                  <div key={b.num} className="bat-card">
                    <div className="bat-num-gold">{b.num}</div>
                    <div className="bat-card-title">{b.title}</div>
                    <div className="bat-card-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* What You Receive */}
              <div className="bat-sh"><div className="bat-sh-label">What You Receive</div><div className="bat-sh-rule"/></div>
              <div className="bat-checklist" style={{ marginBottom: 56 }}>
                {["Dedicated booth space with full branding rights","10–15 pre-scheduled 1:1 meetings with matched CIOs","Lead scanning app for badge capture and lead tagging","Networking access throughout the event day","Optional speaking slot or panel seat","Post-event lead report within 48 hours"].map(item => (
                  <div key={item} className="bat-check-item bat-check-item-gold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--gold)" }}><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ color: "rgba(255,255,255,0.92)" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Exhibition Zones */}
              <div className="bat-sh"><div className="bat-sh-label">Exhibition Zones</div><div className="bat-sh-rule"/></div>
              <div className="bat-grid-4" style={{ marginBottom: 56 }}>
                {["AI & Automation", "Cybersecurity", "Cloud & Infrastructure", "Data & Analytics", "Smart Manufacturing", "Enterprise SaaS", "Future Workplace"].map(z => (
                  <div key={z} style={{ background: "var(--bg-card)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: 14, padding: "20px 18px", textAlign: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>{z}</div>
                  </div>
                ))}
              </div>

              {/* Visitor Profile */}
              <div className="bat-sh"><div className="bat-sh-label">Visitor Profile</div><div className="bat-sh-rule"/></div>
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "28px 32px", marginBottom: 48 }}>
                <div className="bat-chips">
                  {["CIOs", "CTOs", "CISOs", "IT Decision-Makers", "Enterprise Architects", "Digital Leaders", "Heads of AI", "Chief Data Officers", "IT Directors"].map(r => (
                    <span key={r} className="bat-chip">{r}</span>
                  ))}
                </div>
              </div>

              {/* Floor Experience */}
              <div className="bat-sh"><div className="bat-sh-label">Floor Experience</div><div className="bat-sh-rule"/></div>
              <div className="bat-grid-2" style={{ marginBottom: 48 }}>
                {[
                  { title: "High-Traffic Areas",   desc: "Strategic booth placement in high-footfall zones with direct access to all session exits and catering areas.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, accent: "var(--cyan)" },
                  { title: "Networking Lounges",   desc: "Dedicated lounge spaces adjacent to exhibitor zones encouraging organic peer-to-exhibitor conversations.",   icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, accent: "#C084FC" },
                  { title: "Live Demo Zones",      desc: "Structured demo theatres with scheduled CIO audiences — pre-booked and promoted by the event team.",         icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, accent: "var(--gold)" },
                  { title: "Innovation Showcases", desc: "Curated displays of breakthrough solutions positioned as editorial recommendations to the delegate audience.",  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, accent: "#F472B6" },
                ].map(f => (
                  <div key={f.title} className="bat-card" style={{ borderLeft: `3px solid ${f.accent}30`, paddingLeft: 22 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.accent}15`, border: `1px solid ${f.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", color: f.accent, marginBottom: 16 }}>
                      {f.icon}
                    </div>
                    <div className="bat-card-title" style={{ fontSize: 15 }}>{f.title}</div>
                    <div className="bat-card-desc" style={{ marginTop: 8 }}>{f.desc}</div>
                  </div>
                ))}
              </div>

              <div className="bat-final-cta">
                <div className="bat-final-cta-inner">
                  <h2>Reserve Your <em>Exhibition Space</em></h2>
                  <p>Limited booths available. Secure your position on India&apos;s most influential enterprise technology exhibition floor.</p>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-gold">
                      Book Your Booth
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                    <Link href="/exhibitor-portal" className="bcio-btn-outline">Exhibitor Portal</Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── MEDIA ── */}
        {tab === "media" && (
          <>
            <div className="bat-hero">
              <div className="bat-hero-inner">
                <div className="bcio-eyebrow">Media Partnership</div>
                <h1 className="bat-h1">Amplify Enterprise Technology <em>Stories That Matter</em></h1>
                <p className="bat-sub">350+ media organisations have covered BIG CIO Show across 15 editions. Join India&apos;s most influential enterprise technology platform as a media partner.</p>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                  Become a Media Partner
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
            <div className="bat-section">

              {/* Why Partner */}
              <div className="bat-sh"><div className="bat-sh-label">Why Media Partners Join</div><div className="bat-sh-rule"/></div>
              <div className="bat-grid-3">
                {[
                  { num: "01", title: "Executive Audience Access",   desc: "VIP press access to all sessions, boardrooms, and the Big CIO Awards ceremony." },
                  { num: "02", title: "Brand Visibility",            desc: "Logo on event website, venue signage, app, and all communications reaching 100,000+ IT professionals." },
                  { num: "03", title: "Speaker Interview Slots",     desc: "Pre-arranged 1:1 interviews with keynote speakers — coordinated by our dedicated media team." },
                  { num: "04", title: "Content Collaboration",       desc: "Co-branded content, podcast features, and newsletter collaborations with BIG CIO Show." },
                  { num: "05", title: "Event Coverage Rights",       desc: "First access to award winners, announcements, and exclusive research data for breaking stories." },
                  { num: "06", title: "Social Amplification",        desc: "Your coverage promoted across BIG CIO Show&apos;s digital channels and 100,000+ strong community." },
                ].map(b => (
                  <div key={b.num} className="bat-card">
                    <div className="bat-num">{b.num}</div>
                    <div className="bat-card-title">{b.title}</div>
                    <div className="bat-card-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Media Partner Benefits */}
              <div className="bat-sh"><div className="bat-sh-label">Media Partner Benefits</div><div className="bat-sh-rule"/></div>
              <div className="bat-checklist" style={{ marginBottom: 48 }}>
                {["Logo placement across all event materials","Editorial collaborations & co-branded content","Speaker & CIO interview access","Podcast & broadcast opportunities","Press lounge access with Wi-Fi & facilities","VIP networking access","Press kit with high-res assets & press releases","Post-event data & research for editorial use"].map(item => (
                  <div key={item} className="bat-check-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>

              {/* Content Opportunities */}
              <div className="bat-sh"><div className="bat-sh-label">Content Opportunities</div><div className="bat-sh-rule"/></div>
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "28px 32px", marginBottom: 48 }}>
                <div className="bat-chips">
                  {["Thought Leadership", "AI Trends", "CIO Interviews", "Industry Reports", "Live Coverage", "Digital Transformation Stories", "Cybersecurity Insights", "Enterprise Strategy"].map(c => (
                    <span key={c} className="bat-chip">{c}</span>
                  ))}
                </div>
              </div>

              {/* Audience Reach */}
              <div className="bat-sh"><div className="bat-sh-label">Audience &amp; Reach</div><div className="bat-sh-rule"/></div>
              <div className="bat-stats-row" style={{ marginBottom: 48 }}>
                {[
                  { val: "100K+",  lbl: "IT Professionals Reached", color: "var(--cyan)" },
                  { val: "8,500+", lbl: "Event Attendees",          color: "var(--cyan)" },
                  { val: "15+",    lbl: "Editions Covered",         color: "var(--cyan)" },
                  { val: "350+",   lbl: "Media Partners",           color: "var(--cyan)" },
                ].map(s => (
                  <div key={s.lbl} className="bat-stat">
                    <div className="bat-stat-val" style={{ color: s.color }}>{s.val}</div>
                    <div className="bat-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>

              <div className="bat-final-cta">
                <div className="bat-final-cta-inner">
                  <h2>Become a <em>Media Partner</em></h2>
                  <p>Amplify enterprise innovation stories. Apply for media accreditation or partnership for BIG CIO Show 2026.</p>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                    Apply for Media Partnership
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── ASSOCIATION PARTNER ── */}
        {tab === "association" && (
          <>
            <div className="bat-hero">
              <div className="bat-hero-inner">
                <div className="bcio-eyebrow">Association Partnership</div>
                <h1 className="bat-h1">Building Stronger Industry <em>Ecosystems Together</em></h1>
                <p className="bat-sub">Collaborate with BIG CIO Show to empower industry dialogue, support digital transformation, and strengthen member engagement across India&apos;s enterprise technology community.</p>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                  Partner With BIG CIO
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
            <div className="bat-section">

              {/* Why Collaborate */}
              <div className="bat-sh"><div className="bat-sh-label">Why Collaborate</div><div className="bat-sh-rule"/></div>
              <div className="bat-grid-2" style={{ marginBottom: 48 }}>
                {[
                  { num: "01", title: "Empower Industry Dialogue",        desc: "Co-create conversations that shape India&apos;s enterprise technology agenda — not just attend them." },
                  { num: "02", title: "Support Digital Transformation",   desc: "Position your association at the forefront of enterprise AI, cybersecurity, and cloud adoption." },
                  { num: "03", title: "Strengthen Member Engagement",     desc: "Bring your members to India&apos;s most prestigious CIO gathering and create lasting value for your community." },
                  { num: "04", title: "Co-Create Knowledge Initiatives",  desc: "Joint research, benchmarking reports, and knowledge sessions that carry both your brands forward." },
                ].map(b => (
                  <div key={b.num} className="bat-card">
                    <div className="bat-num">{b.num}</div>
                    <div className="bat-card-title">{b.title}</div>
                    <div className="bat-card-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="bat-sh"><div className="bat-sh-label">Association Benefits</div><div className="bat-sh-rule"/></div>
              <div className="bat-grid-3" style={{ marginBottom: 48 }}>
                {[
                  { num: "01", title: "Community Visibility",      desc: "Logo on event website, venue, app, and all event communications reaching 100,000+ IT professionals." },
                  { num: "02", title: "Speaking Opportunities",    desc: "Co-host a roundtable or panel under your association&apos;s brand with full agenda input." },
                  { num: "03", title: "Joint Initiatives",         desc: "Research partnerships, joint press releases, and co-branded communications to both audiences." },
                  { num: "04", title: "Branding & Recognition",   desc: "Association title sponsor of an awards category aligned to your sector focus and community." },
                  { num: "05", title: "Networking Access",         desc: "Full delegate access for key association staff and priority introductions for member delegations." },
                  { num: "06", title: "On-Site Association Desk",  desc: "Dedicated table for member meet-and-greet, literature distribution, and membership activation." },
                ].map(b => (
                  <div key={b.num} className="bat-card">
                    <div className="bat-num">{b.num}</div>
                    <div className="bat-card-title">{b.title}</div>
                    <div className="bat-card-desc">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Ideal Associations */}
              <div className="bat-sh"><div className="bat-sh-label">Ideal Association Partners</div><div className="bat-sh-rule"/></div>
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "28px 32px", marginBottom: 48 }}>
                <div className="bat-chips">
                  {["Tech Councils", "Industry Chambers", "CIO Forums", "Trade Associations", "Innovation Networks", "Government Bodies", "Digital Transformation Networks", "Startup Ecosystems"].map(a => (
                    <span key={a} className="bat-chip">{a}</span>
                  ))}
                </div>
              </div>

              {/* Collaboration Opportunities */}
              <div className="bat-sh"><div className="bat-sh-label">Collaboration Opportunities</div><div className="bat-sh-rule"/></div>
              <div className="bat-checklist" style={{ marginBottom: 48 }}>
                {["Knowledge sessions & educational panels","Executive roundtables for member communities","Joint research & benchmarking reports","Community outreach & member activation","Co-branded innovation initiatives","Member delegation programme","Year-round digital co-marketing"].map(item => (
                  <div key={item} className="bat-check-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>

              <div className="bat-final-cta">
                <div className="bat-final-cta-inner">
                  <h2>Partner With <em>BIG CIO Show</em></h2>
                  <p>Industry bodies, professional networks, and CIO councils — let&apos;s build India&apos;s enterprise technology ecosystem together.</p>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                    Start the Conversation
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── FAQs ── */}
        {tab === "faqs" && (
          <div className="bat-section-narrow">
            <h2 style={{ fontSize: "clamp(20px,2.4vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 8, textAlign: "center" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-body)", textAlign: "center", marginBottom: 64, lineHeight: 1.75 }}>
              Everything you need to know before attending, sponsoring, or exhibiting at Big CIO Show &amp; Awards 2026.
            </p>

            {/* General */}
            <div className="bat-faq-cat">
              <div className="bat-faq-cat-label">General</div>
              {[
                { q: "What is BIG CIO Show?", a: "BIG CIO Show & Awards is India's largest enterprise technology leadership gathering — bringing together 8,500+ CIOs, CTOs, CISOs, and senior technology executives for a single high-signal day of keynotes, roundtables, networking, and India's most recognised technology awards." },
                { q: "Who should attend BIG CIO Show?", a: "BIG CIO Show is designed for CIOs, CTOs, CISOs, Chief Digital Officers, Heads of AI, Digital Transformation Leaders, Enterprise Architects, Data & Analytics Executives, and senior IT decision-makers from enterprise organisations across all industries." },
              ].map((faq, i) => (
                <div key={i} className="bat-faq-item">
                  <div className="bat-faq-q">{faq.q}</div>
                  <div className="bat-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>

            {/* Registration */}
            <div className="bat-faq-cat">
              <div className="bat-faq-cat-label">Registration</div>
              {[
                { q: "How do I register for BIG CIO Show?", a: "Click 'Get Your Pass' on this page. You will be directed to KonfHub to complete your registration. Approval is typically confirmed within 2 business days via email." },
                { q: "Is there a delegate fee?", a: "Senior technology leaders from end-user organisations attend at no cost. Technology vendors, consultants, and solution providers must engage as sponsors or exhibitors to attend." },
                { q: "Will I receive a confirmation?", a: "Yes. Once your registration is reviewed and approved, you will receive a confirmation email with your delegate details, event schedule, and access to the event app." },
              ].map((faq, i) => (
                <div key={i} className="bat-faq-item">
                  <div className="bat-faq-q">{faq.q}</div>
                  <div className="bat-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>

            {/* Venue */}
            <div className="bat-faq-cat">
              <div className="bat-faq-cat-label">Venue</div>
              {[
                { q: "Where is BIG CIO Show 2026 taking place?", a: "Big CIO Show & Awards 2026 is on 4 June 2026 in Bengaluru, India. The exact venue address is shared with confirmed registered delegates closer to the event." },
                { q: "Is accommodation available near the venue?", a: "Yes. Our team will share recommended hotel options and negotiated delegate rates in the confirmation email. The venue is centrally located with several accommodation options nearby." },
                { q: "Is parking available at the venue?", a: "Yes. The venue has dedicated parking facilities. Details including parking zones and instructions are included in the event day guide sent to confirmed delegates." },
                { q: "Is travel support available?", a: "Travel support queries can be directed to our team via the Enquire page. For group delegations, we can assist with coordination on request." },
              ].map((faq, i) => (
                <div key={i} className="bat-faq-item">
                  <div className="bat-faq-q">{faq.q}</div>
                  <div className="bat-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>

            {/* Sponsorship & Exhibition */}
            <div className="bat-faq-cat">
              <div className="bat-faq-cat-label">Sponsorship &amp; Exhibition</div>
              {[
                { q: "How do I become a sponsor?", a: "Contact us via the Enquire page. Our partnerships team will share the sponsorship brochure, package details, availability, and pricing within 24 hours." },
                { q: "How do I book an exhibition booth?", a: "Submit your enquiry via the Enquire page or the Exhibitor tab above. We will share booth specifications, pricing, and available zones for Big CIO Show 2026." },
              ].map((faq, i) => (
                <div key={i} className="bat-faq-item">
                  <div className="bat-faq-q">{faq.q}</div>
                  <div className="bat-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>

            {/* Speaking */}
            <div className="bat-faq-cat">
              <div className="bat-faq-cat-label">Speaking</div>
              {[
                { q: "Can I apply to speak at BIG CIO Show?", a: "Yes. We welcome speaking applications from enterprise CIOs and senior technology practitioners with real transformation stories. Visit the Agenda page and click 'Call for Speakers' to submit your application. We prioritise practitioner insights over vendor-led content." },
              ].map((faq, i) => (
                <div key={i} className="bat-faq-item">
                  <div className="bat-faq-q">{faq.q}</div>
                  <div className="bat-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>

            {/* Media */}
            <div className="bat-faq-cat">
              <div className="bat-faq-cat-label">Media</div>
              {[
                { q: "How can media organisations participate?", a: "Media organisations can apply for accreditation or a media partnership via the Enquire page. Our media team reviews applications and responds within 3 business days. Media partners receive VIP access, speaker interview slots, press kits, and co-promotion." },
              ].map((faq, i) => (
                <div key={i} className="bat-faq-item">
                  <div className="bat-faq-q">{faq.q}</div>
                  <div className="bat-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>

            {/* Policies */}
            <div className="bat-faq-cat">
              <div className="bat-faq-cat-label">Policies</div>
              {[
                { q: "What is the cancellation policy?", a: "Delegate registrations may be transferred to a colleague from the same organisation. For sponsorship and exhibition cancellations, please refer to the terms in your signed agreement. Contact our team for any special circumstances." },
                { q: "What is the badge policy?", a: "All attendees must wear their event badge at all times. Badges are non-transferable. Lost badges can be replaced at the registration desk on the day at a nominal charge." },
                { q: "What is the photography policy?", a: "Photography for personal and editorial use is permitted in all general areas. Filming of sessions requires prior written approval from the event team. Photography inside closed-door boardrooms is not permitted." },
              ].map((faq, i) => (
                <div key={i} className="bat-faq-item">
                  <div className="bat-faq-q">{faq.q}</div>
                  <div className="bat-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "32px 40px", textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Still have questions?</div>
              <div style={{ fontSize: 13, color: "var(--text-body)", marginBottom: 24, lineHeight: 1.7 }}>Our team is happy to help with anything not covered here.</div>
              <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                Contact Us
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
