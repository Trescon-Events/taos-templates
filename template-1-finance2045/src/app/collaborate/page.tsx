"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import HubSpotForm from "@/components/HubSpotForm";

const TABS = [
  {
    id: "sponsor",
    label: "Sponsor / Exhibit",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    formId: "1c7871e5-0c38-4f0e-b757-4890269cafd1",
    targetId: "hs-collaborate-sponsor",
    title: "Sponsor or Exhibit at Finance 2045",
    desc: "Position your brand centre-stage in front of 1,000+ senior finance and fintech executives across Southeast Asia. Our team will craft a bespoke package for your objectives.",
    learnMore: "/ecosystem/sponsors",
  },
  {
    id: "exhibitor",
    label: "Exhibitor",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    formId: "1c7871e5-0c38-4f0e-b757-4890269cafd1",
    targetId: "hs-collaborate-exhibitor",
    title: "Book an Exhibition Booth",
    desc: "Showcase your product or platform on the Finance 2045 exhibition floor. Booths range from Demo Pods to large Island Booths — all putting you in front of qualified buyers.",
    learnMore: "/ecosystem/exhibitors",
  },
  {
    id: "media",
    label: "Media Partner",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/>
        <circle cx="5" cy="19" r="2"/>
      </svg>
    ),
    formId: "767617c1-4e24-462b-9a80-2b6a5e81a253",
    targetId: "hs-collaborate-media",
    title: "Become an Official Media Partner",
    desc: "Co-brand with Finance 2045 and gain exclusive speaker access, content rights, and audience amplification to your readership and beyond.",
    learnMore: "/ecosystem/media",
  },
  {
    id: "association",
    label: "Association",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    formId: "a0bfbb93-274c-4014-afc7-f546b65c8c5b",
    targetId: "hs-collaborate-association",
    title: "Partner as an Industry Association",
    desc: "Shape the agenda, bring member delegations, and co-chair sessions that reflect your industry's most pressing conversations at Finance 2045.",
    learnMore: "/ecosystem/association",
  },
];

export default function CollaboratePage() {
  const [activeTab, setActiveTab] = useState("sponsor");

  // Check for URL tab param on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && TABS.find((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, []);

  const currentTab = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <>
      <style>{`
        .col-page {
          padding-top: 80px;
          min-height: 100vh;
          background: var(--bg-primary);
        }

        /* ── Hero ── */
        .col-hero {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 72px 40px 64px;
          position: relative;
          overflow: hidden;
        }
        .col-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 70% at 65% 45%, rgba(0,165,163,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .col-hero-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 2; }
        .col-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 18px;
        }
        .col-eyebrow::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .col-hero-h1 {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900; letter-spacing: -0.03em; color: #fff;
          line-height: 1.1; margin-bottom: 18px; max-width: 680px;
        }
        .col-hero-h1 span { color: var(--teal); }
        .col-hero-sub { font-size: 16px; color: var(--text-body); line-height: 1.75; max-width: 560px; }

        /* ── Tab bar ── */
        .col-tabs-wrap {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-dark);
          position: sticky;
          top: 72px;
          z-index: 100;
        }
        .col-tabs {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .col-tabs::-webkit-scrollbar { display: none; }
        .col-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 18px 24px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .col-tab:hover { color: rgba(255,255,255,0.85); }
        .col-tab.active {
          color: var(--teal);
          border-bottom-color: var(--teal);
        }

        /* ── Content area ── */
        .col-content {
          max-width: 1240px;
          margin: 0 auto;
          padding: 64px 40px 80px;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 72px;
          align-items: start;
        }
        .col-left-title {
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .col-left-title span { color: var(--teal); }
        .col-left-desc {
          font-size: 15px;
          color: var(--text-body);
          line-height: 1.75;
          margin-bottom: 28px;
        }
        .col-learn-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--teal);
          text-decoration: none;
          transition: gap 0.2s;
          margin-bottom: 40px;
        }
        .col-learn-more:hover { gap: 12px; }
        .col-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .col-stat {
          background: var(--bg-surface);
          border: 1px solid var(--border-dark);
          padding: 18px 20px;
        }
        .col-stat-num { font-size: 24px; font-weight: 900; color: var(--gold); margin-bottom: 4px; }
        .col-stat-label { font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }

        /* Form panel */
        .col-form-panel {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          padding: 40px;
        }
        .col-form-title {
          font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 6px;
        }
        .col-form-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 28px; }

        @media (max-width: 1024px) {
          .col-content { grid-template-columns: 1fr; gap: 48px; }
          .col-tabs { padding: 0 20px; }
        }
        @media (max-width: 640px) {
          .col-hero { padding: 60px 20px 52px; }
          .col-content { padding: 48px 20px 64px; }
          .col-form-panel { padding: 24px 20px; }
          .col-tab { padding: 14px 16px; font-size: 10px; }
        }
      `}</style>

      <div className="col-page">

        {/* Hero */}
        <div className="col-hero">
          <div className="col-hero-inner">
            <div className="col-eyebrow">Collaborate</div>
            <h1 className="col-hero-h1">
              Partner with <span>Finance 2045</span>
            </h1>
            <p className="col-hero-sub">
              Whether you want to sponsor, exhibit, amplify through media, or shape the agenda as an association — Finance 2045 has a partnership path designed for your goals.
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="col-tabs-wrap">
          <div className="col-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`col-tab${activeTab === t.id ? " active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="col-content">
          <div>
            <h2 className="col-left-title">{currentTab.title}</h2>
            <p className="col-left-desc">{currentTab.desc}</p>
            <Link href={currentTab.learnMore} className="col-learn-more">
              Learn about {currentTab.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <div className="col-stats">
              {[
                { num: "1,000+", label: "Attendees" },
                { num: "40+", label: "Countries" },
                { num: "100+", label: "Investors" },
                { num: "2", label: "Days" },
              ].map((s) => (
                <div key={s.label} className="col-stat">
                  <div className="col-stat-num">{s.num}</div>
                  <div className="col-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-form-panel">
            <div className="col-form-title">Send Your Application</div>
            <div className="col-form-sub">Our partnerships team will respond within 24 hours.</div>
            <HubSpotForm
              key={currentTab.id}
              formId={currentTab.formId}
              targetId={currentTab.targetId}
            />
          </div>
        </div>

      </div>
    </>
  );
}
