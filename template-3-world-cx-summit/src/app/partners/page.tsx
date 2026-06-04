"use client";
import Link from "next/link";
import { useState, useEffect } from "react";


type TabKey = "overview" | "sponsors" | "exhibitors" | "media";

type Partner = {
  name: string;
  logo: string;
  desc: string;
  category?: string;
};

export default function PartnersPage() {
  const [active, setActive] = useState<Partner | null>(null);
  const [tab, setTab] = useState<TabKey>("overview");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as TabKey | null;
    if (t && (["overview","sponsors","exhibitors","media"] as string[]).includes(t)) {
      setTab(t);
    }
  }, []);

  // Live data from KonfHub
  const [sponsorCategories, setSponsorCategories] = useState<{ name: string; order: number; sponsors: Partner[] }[]>([]);
  const [exhibitors,   setExhibitors]   = useState<Partner[]>([]);
  const [mediaPartners, setMediaPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then((d) => {
        setSponsorCategories(d.sponsorCategories ?? []);
        setExhibitors(d.exhibitors ?? []);
        setMediaPartners(d.mediaPartners ?? []);
      })
      .catch(() => {/* silently keep empty arrays */})
      .finally(() => setPartnersLoading(false));
  }, []);

  const totalSponsors = sponsorCategories.reduce((acc, c) => acc + c.sponsors.length, 0);
  const LEGACY_MEDIA = mediaPartners;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <style>{`
        .pt-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 72px;
        }

        /* ── Hero ── */
        .pt-hero {
          background: #060F1C;
          padding: 64px 40px 56px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pt-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(54,188,176,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(201,168,76,0.06) 0%, transparent 55%);
          pointer-events: none;
        }
        .pt-hero::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--coral) 40%, var(--gold) 60%, transparent);
          opacity: 0.30;
        }
        .pt-hero-inner {
          max-width: 860px; margin: 0 auto;
          position: relative; z-index: 2;
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
          flex-wrap: wrap;
        }
        .pt-hero-left { text-align: left; }
        .pt-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: var(--coral); margin-bottom: 10px;
        }
        .pt-overline::before {
          content: ''; width: 20px; height: 1px;
          background: var(--coral); flex-shrink: 0; opacity: 0.60;
        }
        .pt-h1 {
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.12; color: #fff; margin: 0;
        }
        .pt-h1 em { font-style: normal; color: var(--coral); }

        /* ── Tab bar ── */
        .pt-tabbar {
          background: var(--bg-surface);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .pt-tabbar-inner {
          max-width: 1240px; margin: 0 auto;
          padding: 0 40px;
          display: flex; gap: 0;
          overflow-x: auto; scrollbar-width: none;
        }
        .pt-tabbar-inner::-webkit-scrollbar { display: none; }
        .pt-tab {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
          padding: 16px 22px; cursor: pointer;
          border: none; background: none; font-family: inherit;
          border-bottom: 2px solid transparent; white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
        }
        .pt-tab:hover { color: rgba(255,255,255,0.7); }
        .pt-tab.active { color: var(--coral); border-bottom-color: var(--coral); }

        /* ── Section ── */
        .pt-section {
          max-width: 1240px; margin: 0 auto; padding: 56px 40px;
        }
        .pt-section-alt {
          background: var(--bg-surface);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .pt-section-alt .pt-section { padding: 56px 40px; }

        /* Section page-level heading */
        .pt-block-head {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: 16px; margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
        }
        .pt-block-title {
          font-size: clamp(18px, 2vw, 26px);
          font-weight: 900; letter-spacing: -0.02em; color: #fff;
        }
        .pt-block-title em { font-style: normal; color: var(--coral); }
        .pt-block-count {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--text-muted);
        }
        .pt-sec-head { text-align: center; margin-bottom: 40px; }
        .pt-sec-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--coral); margin-bottom: 10px;
        }
        .pt-sec-overline::before, .pt-sec-overline::after {
          content: ''; width: 20px; height: 1.5px;
          background: var(--coral); opacity: 0.55;
        }
        .pt-sec-h2 {
          font-size: clamp(26px, 3vw, 40px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.1; margin: 0;
        }
        .pt-sec-h2 em { font-style: normal; color: var(--coral); }
        .pt-sec-sub {
          font-size: 14px; color: var(--text-body);
          line-height: 1.7; max-width: 500px; margin: 10px auto 0;
        }

        /* ── Tier label ── */
        .pt-tier-label {
          display: flex; align-items: center; justify-content: center;
          gap: 16px; margin-bottom: 20px; margin-top: 8px;
        }
        .pt-tier-text {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.20em; text-transform: uppercase;
          white-space: nowrap; line-height: 1;
        }
        .pt-tier-text.coral { color: var(--coral); }
        .pt-tier-text.gold  { color: var(--gold); }
        .pt-tier-line { width: 48px; height: 1px; flex-shrink: 0; }
        .pt-tier-line.coral { background: rgba(54,188,176,0.40); }
        .pt-tier-line.gold  { background: rgba(201,168,76,0.35); }

        /* ── Shared tile base ── */
        .pt-tile {
          background: #fff;
          cursor: pointer;
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          transition: box-shadow 0.3s, transform 0.25s, border-color 0.3s;
        }
        .pt-tile::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--coral), var(--gold));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s ease;
        }
        .pt-tile:hover::after { transform: scaleX(1); }

        /* info hint bottom-right */
        .pt-tile-hint {
          position: absolute; bottom: 6px; right: 8px;
          font-size: 8px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(10,22,40,0.25);
          display: flex; align-items: center; gap: 3px;
          transition: color 0.2s;
          pointer-events: none;
        }
        .pt-tile:hover .pt-tile-hint { color: var(--coral); }

        /* ── Strategic ── */
        .pt-strategic-row {
          display: flex; gap: 16px; justify-content: center;
          flex-wrap: wrap; margin-bottom: 44px;
        }
        .pt-strategic-tile {
          flex: 1; min-width: 240px; max-width: 360px;
          padding: 28px 32px; min-height: 100px;
          border: 1px solid rgba(54,188,176,0.18);
        }
        .pt-strategic-tile:hover {
          border-color: rgba(54,188,176,0.45);
          box-shadow: 0 0 28px rgba(54,188,176,0.14), 0 8px 32px rgba(0,0,0,0.30);
          transform: translateY(-3px);
        }
        .pt-strategic-tile img {
          width: 92%; max-height: 135px;
          height: auto; object-fit: contain; display: block;
        }
        .pt-strategic-badge {
          position: absolute; top: 8px; right: 10px;
          font-size: 7px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--coral);
          background: rgba(54,188,176,0.06);
          border: 1px solid rgba(54,188,176,0.18);
          padding: 2px 7px;
        }

        /* ── Associate ── */
        .pt-associate-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
        }
        .pt-associate-tile {
          padding: 20px 24px; min-height: 88px;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .pt-associate-tile:hover {
          border-color: rgba(201,168,76,0.32);
          box-shadow: 0 0 20px rgba(201,168,76,0.09), 0 6px 22px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
        .pt-associate-tile img {
          width: 85%; max-height: 72px;
          height: auto; object-fit: contain; display: block;
        }

        /* ── Media ── */
        .pt-media-grid {
          display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;
        }
        .pt-media-tile {
          padding: 14px 12px; min-height: 72px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .pt-media-tile:hover {
          border-color: rgba(54,188,176,0.22);
          box-shadow: 0 0 18px rgba(54,188,176,0.09), 0 6px 18px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
        .pt-media-tile img {
          width: 88%; max-height: 58px;
          height: auto; object-fit: contain; display: block;
        }

        /* ── Modal overlay ── */
        .pt-modal-overlay {
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(8,6,22,0.82);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: pt-fade-in 0.18s ease;
        }
        @keyframes pt-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .pt-modal {
          background: var(--bg-surface);
          border: 1px solid rgba(255,255,255,0.09);
          width: 100%; max-width: 480px;
          position: relative; overflow: hidden;
          animation: pt-slide-up 0.22s ease;
        }
        @keyframes pt-slide-up {
          from { transform: translateY(18px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        /* top accent bar */
        .pt-modal::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--coral), var(--gold), transparent);
        }

        .pt-modal-logo-area {
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          padding: 32px 40px; min-height: 120px;
        }
        .pt-modal-logo-area img {
          max-height: 72px; max-width: 220px;
          width: auto; height: auto; object-fit: contain; display: block;
        }

        .pt-modal-body {
          padding: 28px 28px 32px;
        }
        .pt-modal-cat {
          font-size: 9px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--coral);
          margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }
        .pt-modal-cat::before {
          content: ''; width: 16px; height: 1px; background: var(--coral);
        }
        .pt-modal-name {
          font-size: 20px; font-weight: 900; letter-spacing: -0.02em;
          color: #fff; line-height: 1.2; margin-bottom: 14px;
        }
        .pt-modal-desc {
          font-size: 13.5px; color: var(--text-body);
          line-height: 1.80;
        }

        /* Close button */
        .pt-modal-close {
          position: absolute; top: 14px; right: 14px;
          width: 34px; height: 34px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.60);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          z-index: 10;
          /* large tap target on mobile */
          touch-action: manipulation;
        }
        .pt-modal-close:hover {
          background: rgba(54,188,176,0.15);
          border-color: rgba(54,188,176,0.40);
          color: var(--coral);
        }
        .pt-modal-close:active {
          background: rgba(54,188,176,0.25);
          transform: scale(0.94);
        }

        /* ── CTA ── */
        .pt-cta {
          background: linear-gradient(120deg, #0A1628 0%, #0F3A36 50%, #0A2040 100%);
          padding: 72px 40px; text-align: center;
          position: relative; overflow: hidden;
        }
        .pt-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 80% at 50% 120%, rgba(0,0,0,0.25) 0%, transparent 60%);
          pointer-events: none;
        }
        .pt-cta-inner { max-width: 640px; margin: 0 auto; position: relative; z-index: 2; }
        .pt-cta-h2 {
          font-size: clamp(24px, 3.5vw, 42px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.1; margin-bottom: 14px;
        }
        .pt-cta-p { font-size: 15px; color: rgba(255,255,255,0.82); line-height: 1.7; margin-bottom: 32px; }
        .pt-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .pt-btn-white {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase;
          background: #fff; color: #0A1628; padding: 14px 28px; text-decoration: none;
          transition: background 0.25s, transform 0.25s;
        }
        .pt-btn-white:hover { background: rgba(255,255,255,0.88); transform: translateY(-1px); }
        .pt-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase;
          background: rgba(0,0,0,0.20); color: #fff;
          border: 1px solid rgba(255,255,255,0.45);
          padding: 14px 28px; text-decoration: none;
          transition: background 0.25s, border-color 0.25s;
        }
        .pt-btn-ghost:hover { background: rgba(0,0,0,0.35); border-color: rgba(255,255,255,0.75); }

        /* ── Sponsor tier rows (new layout) ── */
        .spt-tiers {
          display: flex; flex-direction: column; gap: 20px;
        }
        .spt-tier {
          position: relative; overflow: hidden;
          border: 1px solid; border-radius: 20px;
          padding: 48px 52px;
          transition: border-color 0.3s;
        }
        .spt-band {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
        }
        .spt-inner {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 260px 1fr;
          gap: 48px; align-items: center;
        }
        .spt-label {
          display: flex; flex-direction: column; gap: 14px;
        }
        .spt-pill {
          display: inline-flex; align-items: center; gap: 8px; width: fit-content;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          border: 1px solid; padding: 7px 18px; border-radius: 100px;
        }
        .spt-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .spt-desc {
          font-size: 14px; line-height: 1.65;
          color: rgba(255,255,255,0.45); margin: 0;
        }
        .spt-vline {
          width: 2px; height: 40px; border-radius: 2px; align-self: flex-start;
        }
        .spt-cards {
          display: flex; flex-wrap: wrap; gap: 20px; align-items: center;
        }
        .spt-card {
          position: relative;
          border: 1px solid; border-radius: 18px; overflow: hidden;
          cursor: pointer; transition: transform 0.22s, box-shadow 0.22s;
          min-width: 260px; min-height: 150px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.01);
        }
        .spt-card-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 2;
        }
        .spt-logo-wrap {
          background: #fff; border-radius: 14px;
          padding: 20px 32px; margin: 16px;
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
        }
        .spt-logo-wrap img {
          max-width: 200px; max-height: 80px;
          width: auto; height: auto; object-fit: contain; display: block;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .pt-media-grid { grid-template-columns: repeat(4, 1fr); }
          .pt-associate-grid { grid-template-columns: repeat(2, 1fr); }
          .spt-inner { grid-template-columns: 200px 1fr; gap: 32px; }
        }
        @media (max-width: 768px) {
          .pt-hero { padding: 48px 24px 40px; }
          .pt-hero-inner { flex-direction: column; align-items: flex-start; gap: 20px; }
          .pt-section { padding: 40px 24px; }
          .pt-media-grid { grid-template-columns: repeat(3, 1fr); }
          .pt-strategic-row { flex-direction: column; align-items: stretch; }
          .pt-strategic-tile { max-width: 100%; min-width: unset; padding: 20px 28px; }
          .pt-modal { max-width: 100%; }
          .pt-modal-body { padding: 20px 18px 26px; }
          .pt-modal-logo-area { padding: 20px 24px; }
          .spt-tier { padding: 36px 28px; }
          .spt-inner { grid-template-columns: 1fr; gap: 24px; }
          .spt-vline { display: none; }
          .spt-card { min-width: unset; width: 100%; }
        }
        @media (max-width: 480px) {
          .pt-media-grid { grid-template-columns: repeat(3, 1fr); }
          .pt-associate-grid { grid-template-columns: repeat(2, 1fr); }
          .pt-modal-overlay { padding: 12px; align-items: flex-end; }
          .pt-modal { max-width: 100%; }
          .pt-tier-text { font-size: 11px; }
          .spt-tier { padding: 28px 20px; }
        }
      `}</style>

      <div className="pt-page">

        {/* ── Hero ── */}
        <div className="pt-hero">
          <div className="pt-hero-inner">
            <div className="pt-hero-left">
              <div className="pt-overline">World CX Summit 2026</div>
              <h1 className="pt-h1">Our <em>Partners</em><br />&amp; Sponsors</h1>
            </div>
            <a href="/attend?tab=sponsor#enquire-form" className="wcx-btn-primary">
              Become a Partner
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="pt-tabbar">
          <div className="pt-tabbar-inner">
            {([
              ["overview",   "Overview"],
              ["sponsors",   "Sponsors"],
              ["exhibitors", "Exhibitors"],
              ["media",      "Media"],
            ] as [TabKey, string][]).map(([id, label]) => (
              <button key={id} className={`pt-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && (
          <>
            <div className="pt-section">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, background: "rgba(255,255,255,0.04)", marginBottom: 48 }}>
                {[
                  { val: partnersLoading ? "..." : `${totalSponsors}`, lbl: "Sponsors" },
                  { val: partnersLoading ? "..." : `${exhibitors.length}`, lbl: "Exhibitors" },
                  { val: partnersLoading ? "..." : `${mediaPartners.length}`, lbl: "Media Partners" },
                  { val: "40+", lbl: "Countries Reached" },
                ].map(s => (
                  <div key={s.lbl} style={{ background: "var(--bg-surface)", padding: "28px 24px", textAlign: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: "var(--gold)", marginBottom: 8 }}>{s.val}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{s.lbl}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[
                  { title: "Sponsors", count: `${totalSponsors} Partner${totalSponsors !== 1 ? "s" : ""}`, desc: "Category-exclusive, premium brand positioning across all summit touchpoints — from keynote branding to delegate bags.", cta: "sponsors" as TabKey, accent: "var(--coral)" },
                  { title: "Exhibitors", count: `${exhibitors.length} Partners`, desc: "Strong visibility with exhibition space, delegate communications, and session branding opportunities.", cta: "sponsors" as TabKey, accent: "var(--gold)" },
                  { title: "Media Partners", count: `${mediaPartners.length} Publications`, desc: "Pan-India and global media coverage across digital, print, and broadcast reaching millions of business readers.", cta: "media" as TabKey, accent: "var(--coral)" },
                ].map(item => (
                  <div key={item.title} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", padding: "28px 24px", cursor: "pointer", transition: "border-color 0.3s" }}
                    onClick={() => setTab(item.cta)}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: item.accent, marginBottom: 8 }}>{item.count}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "var(--bg-surface)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="pt-section">
                <div className="pt-sec-head">
                  <div className="pt-sec-overline">Why Partner</div>
                  <h2 className="pt-sec-h2">The <em>Partnership</em> Advantage</h2>
                  <p className="pt-sec-sub">400+ senior CX decision-makers. 40+ countries. One day that defines the year.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                  {[
                    { num: "01", title: "Qualified Audience", desc: "Every delegate is Head of CX, VP, or C-suite. Zero filler — your message reaches buyers and influencers only." },
                    { num: "02", title: "Category Leadership", desc: "Be the definitive brand in your category at India's most prestigious CX event of the year." },
                    { num: "03", title: "Lead Generation", desc: "Live demos, hosted buyer meetings, and lead scanning turn conversations into pipeline at the event." },
                    { num: "04", title: "Content Integration", desc: "Sponsor panels, whitepapers, and fireside chats — put your expertise at the heart of the programme." },
                    { num: "05", title: "Media Amplification", desc: "18+ media partners amplify your participation to millions of business readers across India and globally." },
                    { num: "06", title: "Awards Presence", desc: "The World CX Awards Gala — India's most prestigious CX evening — is the highest-impact branding moment of the year." },
                  ].map(item => (
                    <div key={item.num} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", padding: "28px 24px" }}>
                      <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: "var(--gold)", opacity: 0.3, marginBottom: 12 }}>{item.num}</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-body)", lineHeight: 1.7 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── SPONSORS TAB ── */}
        {tab === "sponsors" && (
        <div className="pt-section">
          <div className="pt-block-head">
            <div className="pt-block-title">Official <em>Sponsors</em></div>
            <div className="pt-block-count">{partnersLoading ? "Loading..." : `${totalSponsors} Partner${totalSponsors !== 1 ? "s" : ""}`} · 4 June 2026</div>
          </div>

          {partnersLoading && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)", fontSize: 13 }}>Loading sponsors...</div>
          )}

          {!partnersLoading && totalSponsors === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)", fontSize: 13 }}>Sponsors to be announced.</div>
          )}

          <div className="spt-tiers">
            {sponsorCategories.map((cat) => {
              const n = cat.name.toLowerCase();
              const color = n.includes("gold") ? "#D4AF37"
                : n.includes("silver") ? "#C0C0C0"
                : n.includes("bronze") ? "#CD7F32"
                : n.includes("platinum") ? "#E8D5B7"
                : n.includes("lead") || n.includes("title") || n.includes("headline") ? "#36BCB0"
                : "var(--coral)";
              const colorRgb = n.includes("gold") ? "212,175,55"
                : n.includes("silver") ? "192,192,192"
                : n.includes("bronze") ? "205,127,50"
                : n.includes("platinum") ? "232,213,183"
                : n.includes("lead") || n.includes("title") || n.includes("headline") ? "54,188,176"
                : "232,132,92";
              const desc = n.includes("gold") ? "Premier partners driving the World CX Summit experience."
                : n.includes("silver") ? "Supporting sponsors amplifying the CX Summit reach."
                : n.includes("bronze") ? "Valued sponsors supporting the CX Summit community."
                : n.includes("platinum") ? "Headline partners with exclusive summit positioning."
                : n.includes("lead") || n.includes("title") ? "Our headline partner shaping the future of CX."
                : "Official partner of World CX Summit 2026.";

              return (
                <div key={cat.name} className="spt-tier" style={{ borderColor: `rgba(${colorRgb},0.18)`, background: `rgba(${colorRgb},0.02)` }}>
                  <div className="spt-band" style={{ background: `radial-gradient(ellipse 70% 100% at 0% 50%, rgba(${colorRgb},0.10) 0%, transparent 70%)` }} />
                  <div className="spt-inner">
                    {/* Left label */}
                    <div className="spt-label">
                      <div className="spt-pill" style={{ color, borderColor: `rgba(${colorRgb},0.4)`, background: `rgba(${colorRgb},0.10)` }}>
                        <span className="spt-dot" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                        {cat.name}
                      </div>
                      <p className="spt-desc">{desc}</p>
                      <div className="spt-vline" style={{ background: `linear-gradient(to bottom, ${color}88, transparent)` }} />
                    </div>
                    {/* Right cards */}
                    <div className="spt-cards">
                      {cat.sponsors.map((s) => (
                        <div
                          key={s.name}
                          className="spt-card"
                          style={{ borderColor: `rgba(${colorRgb},0.25)` }}
                          onClick={() => setActive(s)}
                          role="button" tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && setActive(s)}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px rgba(${colorRgb},0.2), 0 0 0 1px rgba(${colorRgb},0.35)`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                        >
                          <div className="spt-card-bar" style={{ background: `linear-gradient(90deg, ${color}, rgba(${colorRgb},0.3))` }} />
                          <div className="spt-logo-wrap">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={s.logo} alt={s.name} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* ── EXHIBITORS TAB ── */}
        {tab === "exhibitors" && (
          <div className="pt-section-alt">
            <div className="pt-section">
              <div className="pt-sec-head">
                <div className="pt-sec-overline">Exhibitors</div>
                <h2 className="pt-sec-h2">Exhibition <em>Floor</em></h2>
                <p className="pt-sec-sub">{partnersLoading ? "Loading..." : `${exhibitors.length} exhibiting brand${exhibitors.length !== 1 ? "s" : ""}`} · 4 June 2026 · Bengaluru</p>
              </div>
              <div className="pt-associate-grid">
                {exhibitors.map((s) => (
                  <div key={s.name} className="pt-tile pt-associate-tile" onClick={() => setActive(s)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setActive(s)} aria-label={`Learn more about ${s.name}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.logo} alt={s.name} />
                    <div className="pt-tile-hint">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      About
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 40, textAlign: "center" }}>
                <a href="/attend?tab=sponsor#enquire-form" className="wcx-btn-primary" style={{ display: "inline-flex" }}>
                  Enquire About Exhibition Space
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── MEDIA TAB ── */}
        {tab === "media" && (
          <div className="pt-section-alt">
            <div className="pt-section">
              <div className="pt-sec-head">
                <div className="pt-sec-overline">Media Partners</div>
                <h2 className="pt-sec-h2">Our <em>Media</em> Network</h2>
                <p className="pt-sec-sub">{partnersLoading ? "Loading..." : `${mediaPartners.length} publications`} across India and globally amplifying World CX Summit coverage.</p>
              </div>
              <div className="pt-media-grid">
                {LEGACY_MEDIA.map((m) => (
                  <div key={m.name} className="pt-tile pt-media-tile" onClick={() => setActive(m)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setActive(m)} aria-label={`Learn more about ${m.name}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.logo} alt={m.name} />
                    <div className="pt-tile-hint">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      Info
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 40, textAlign: "center" }}>
                <a href="/attend?tab=media-partner#enquire-form" className="wcx-btn-primary" style={{ display: "inline-flex" }}>
                  Become a Media Partner
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── CTA — shown on all tabs ── */}
        <div className="pt-cta">
          <div className="pt-cta-inner">
            <h2 className="pt-cta-h2">Partner with World CX Summit</h2>
            <p className="pt-cta-p">
              Position your brand in front of 400+ senior CX leaders, technology heads and innovators. Explore exclusive sponsorship and media partnership opportunities.
            </p>
            <div className="pt-cta-btns">
              <a href="/attend?tab=sponsor#enquire-form" className="pt-btn-white">
                Enquire Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <Link href="/register" className="pt-btn-ghost">
                View Packages
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ── Modal ── */}
      {active && (
        <div className="pt-modal-overlay" onClick={() => setActive(null)} role="dialog" aria-modal="true" aria-label={active.name}>
          <div className="pt-modal" onClick={(e) => e.stopPropagation()}>
            {/* X close button */}
            <button className="pt-modal-close" onClick={() => setActive(null)} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Logo on white */}
            <div className="pt-modal-logo-area">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.logo} alt={active.name} />
            </div>

            {/* Text */}
            <div className="pt-modal-body">
              {active.category && <div className="pt-modal-cat">{active.category}</div>}
              <div className="pt-modal-name">{active.name}</div>
              <p className="pt-modal-desc">{active.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
