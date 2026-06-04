"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { themes } from "@/data/themes";

const THEME_IMAGES = [
  "/theme-1.png",  // Digital Banking & Neobanking
  "/theme-2.png",  // AI & Emerging Technologies
  "/theme-3.png",  // Payments Innovation
  "/theme-4.png",  // SME & MSME Finance
  "/theme-5.png",  // Financial Inclusion
  "/theme-6.png",  // Halal Finance
  "/theme-7.png",  // Enterprise Banking
  "/theme-8.png",  // Digital Assets & Blockchain
  "/theme-9.png",  // Regulation & Compliance
  "/theme-10.png", // Sustainable Finance & ESG
];

const TAGS: Record<string, string[]> = {
  "Digital Banking & Neobanking":               ["BaaS","Embedded Finance","Neobanks","Digital-First UX","Branch Evolution"],
  "AI & Emerging Technologies":                 ["Agentic AI","Fraud Detection","Automation","Risk Analytics","LLM in Finance"],
  "Payments Innovation & Cross-Border Finance": ["QRIS","Digital Wallets","Stablecoins","Real-Time Payments","ASEAN Interop"],
  "SME & MSME Finance":                         ["Digital Credit","Working Capital","Supply Chain Finance","UMKM","ERP Lending"],
  "Financial Inclusion & Banking the Unbanked": ["Alt Credit Scoring","Last-Mile Access","77M+ Adults","Digital Expansion","Microfinance"],
  "Halal Finance & Shariah Innovation":         ["Sukuk","Islamic Fintech","Sharia Banking","Islamic Capital Markets","Halal Products"],
  "Enterprise Banking & Corporate Finance":     ["Corporate Treasury","B2B Payments","ISO 20022","Composable Banking","Supply Chain"],
  "Digital Assets & Blockchain":               ["Tokenisation","CBDC","Project Garuda","DeFi","Institutional Crypto"],
  "Regulation, Policy & Compliance":           ["OJK Roadmap","RegTech","KYC/AML","Licensing","Regulatory Sandbox"],
  "Sustainable Finance & ESG":                 ["Green Bonds","Climate Risk","ESG Frameworks","Energy Transition","Sustainable Markets"],
};

export default function ThemesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<number>(0);
  const safeActive = active < 0 ? 0 : active;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .th-root {
          background: var(--bg-surface);
          padding: 96px 0 88px;
          position: relative;
          overflow: hidden;
        }
        .th-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.35), transparent);
        }
        .th-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Layout: list left + panel right ── */
        .th-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .th-body.th-in { opacity: 1; transform: translateY(0); }

        /* ── Left: numbered list ── */
        .th-list {
          display: flex;
          flex-direction: column;
        }
        .th-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          position: relative;
          transition: padding-left 0.25s ease;
        }
        .th-item:first-child { border-top: 1px solid rgba(255,255,255,0.05); }
        .th-item:hover { padding-left: 6px; }

        /* Active left teal bar */
        .th-item::before {
          content: '';
          position: absolute; left: -40px; top: 0; bottom: 0;
          width: 3px;
          background: #00a5a3;
          opacity: 0;
          transform: scaleY(0);
          transform-origin: center;
          transition: opacity 0.25s, transform 0.25s;
        }
        .th-item.th-active::before { opacity: 1; transform: scaleY(1); }

        .th-num {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(0,165,163,0.4);
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
          width: 28px;
          transition: color 0.25s;
        }
        .th-item.th-active .th-num,
        .th-item:hover .th-num { color: #00a5a3; }

        .th-title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.45);
          line-height: 1.3;
          transition: color 0.25s;
          flex: 1;
        }
        .th-item.th-active .th-title,
        .th-item:hover .th-title { color: #fff; }

        .th-chevron {
          color: rgba(0,165,163,0);
          flex-shrink: 0;
          transition: color 0.25s, transform 0.25s;
        }
        .th-item.th-active .th-chevron,
        .th-item:hover .th-chevron {
          color: rgba(0,165,163,0.6);
          transform: translateX(3px);
        }

        /* ── Right: detail panel ── */
        .th-panel {
          position: sticky;
          top: 100px;
          background: #1a2233;
          border: 1px solid rgba(0,165,163,0.5);
          border-radius: 8px;
          overflow: hidden;
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 10px 36px rgba(0,0,0,0.45);
        }
        /* Teal top bar */
        .th-panel::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, #00a5a3, rgba(0,165,163,0.2));
          z-index: 3;
        }
        /* Photo background */
        .th-panel-bg {
          position: absolute; inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .th-panel-bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10,14,22,0.88) 0%,
            rgba(10,14,22,0.72) 55%,
            rgba(10,14,22,0.85) 100%
          );
          z-index: 1;
        }
        .th-panel { background: #0a0e16; }
        .th-panel-inner {
          padding: 40px 36px 36px;
          position: relative;
          z-index: 2;
        }

        /* Large watermark number */
        .th-panel-wm {
          position: absolute;
          top: -10px; right: 16px;
          font-size: 120px;
          font-weight: 900;
          color: rgba(0,165,163,0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.04em;
        }

        .th-panel-eyebrow {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #00a5a3;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .th-panel-eyebrow::before {
          content: '';
          width: 24px; height: 1px;
          background: #00a5a3;
        }
        .th-panel-title {
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.2;
          background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          position: relative; z-index: 1;
        }
        .th-panel-divider {
          height: 1px;
          background: linear-gradient(to right, rgba(0,165,163,0.4), transparent);
          margin-bottom: 20px;
        }
        .th-panel-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.72);
          line-height: 1.85;
          margin-bottom: 24px;
          position: relative; z-index: 1;
        }
        /* Keyword tags */
        .th-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
          position: relative; z-index: 1;
        }
        .th-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(0,165,163,0.8);
          border: 1px solid rgba(0,165,163,0.2);
          background: rgba(0,165,163,0.06);
          padding: 5px 11px;
          border-radius: 4px;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .th-tag:hover {
          border-color: rgba(0,165,163,0.5);
          background: rgba(0,165,163,0.12);
          color: #00a5a3;
        }
        /* Session strip */
        .th-panel-sessions {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(0,165,163,0.05);
          border: 1px solid rgba(0,165,163,0.12);
          border-radius: 6px;
          margin-bottom: 24px;
          position: relative; z-index: 1;
        }
        .th-panel-sessions-icon { color: #00a5a3; flex-shrink: 0; }
        .th-panel-sessions-text {
          font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.4;
        }
        .th-panel-sessions-text strong { color: #fff; font-weight: 700; }
        .th-panel-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
          position: relative; z-index: 1;
        }
        .th-panel-count {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
          font-variant-numeric: tabular-nums;
        }
        .th-panel-count em { color: #00a5a3; font-style: normal; }
        .th-panel-link {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00a5a3;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s;
        }
        .th-panel-link:hover { gap: 10px; }

        /* Fade transition for panel content */
        .th-panel-content {
          transition: opacity 0.2s ease;
        }
        .th-panel-content.th-fade { opacity: 0; }

        .th-cta { text-align: center; margin-top: 56px; }

        /* ── Mobile: accordion ── */
        .th-accordion-desc {
          display: none;
        }
        @media (max-width: 900px) {
          .th-body { grid-template-columns: 1fr; gap: 0; }
          .th-panel { display: none; }
          .th-inner { padding: 0 20px; }
          .th-item { padding: 18px 0; flex-wrap: wrap; gap: 0; align-items: center; }
          .th-item::before { left: 0; width: 2px; }
          .th-num { width: 28px; flex-shrink: 0; }
          .th-title { flex: 1; padding: 0 12px; }
          .th-chevron { transition: color 0.25s, transform 0.3s; }
          .th-item.th-active .th-chevron { transform: rotate(90deg); color: #00a5a3; }
          /* Accordion description */
          .th-accordion-desc {
            display: block;
            width: 100%;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.3s ease;
            padding: 0 0 0 40px;
            font-size: 13px;
            color: rgba(255,255,255,0.6);
            line-height: 1.78;
          }
          .th-item.th-active .th-accordion-desc {
            max-height: 200px;
            padding: 12px 0 4px 40px;
          }
          .th-root { padding: 64px 0 56px; }
          .th-cta { margin-top: 40px; }
        }
      `}</style>

      <section className="th-root" ref={ref}>
        <div className="th-inner">

          <div className="f45-section-head">
            <div className="f45-eyebrow">
              <span className="f45-eyebrow-dot" />
              Thematic Pillars
            </div>
            <h2>10 High-Impact <span>Finance Themes</span></h2>
            <p>Curated topic tracks spanning the full spectrum of Indonesia&apos;s financial transformation journey.</p>
          </div>

          <div className={`th-body${visible ? " th-in" : ""}`}>

            {/* LEFT — numbered list */}
            <div className="th-list">
              {themes.map((t, i) => (
                <div
                  key={t.title}
                  className={`th-item${active === i ? " th-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(prev => prev === i ? -1 : i)}
                >
                  <span className="th-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="th-title">{t.title}</span>
                  <svg className="th-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  {/* Mobile accordion description — hidden on desktop via CSS */}
                  <span className="th-accordion-desc">{t.description}</span>
                </div>
              ))}
            </div>

            {/* RIGHT — sticky detail panel */}
            <div className="th-panel gc">
              <div className="th-panel-bg">
                <Image
                  key={safeActive}
                  src={THEME_IMAGES[safeActive]}
                  alt={themes[safeActive].title}
                  fill
                  sizes="(max-width: 900px) 0px, 580px"
                  quality={90}
                  style={{ objectFit: "cover", objectPosition: "center top", opacity: 1, transition: "opacity 0.45s ease" }}
                  priority={safeActive === 0}
                />
              </div>
              <div className="th-panel-bg-overlay" />
              <div className="th-panel-inner">
                <span className="th-panel-wm">{String(safeActive + 1).padStart(2, "0")}</span>
                <div className="th-panel-eyebrow">Theme {String(safeActive + 1).padStart(2, "0")}</div>
                <div className="th-panel-title">{themes[safeActive].title}</div>
                <div className="th-panel-divider" />
                <div className="th-panel-desc">{themes[safeActive].description}</div>

                {/* Keyword tags */}
                <div className="th-tags">
                  {(TAGS[themes[safeActive].title] || []).map(tag => (
                    <span key={tag} className="th-tag">{tag}</span>
                  ))}
                </div>

                {/* Sessions info */}
                <div className="th-panel-sessions">
                  <svg className="th-panel-sessions-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <div className="th-panel-sessions-text">
                    <strong>Keynotes, panels & roundtables</strong> — attended by ministers, central bankers & C-suite leaders
                  </div>
                </div>

                <div className="th-panel-footer">
                  <span className="th-panel-count">
                    <em>{safeActive + 1}</em> / {themes.length}
                  </span>
                  <Link href="/themes" className="th-panel-link">
                    Explore All Themes
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="th-cta">
            <Link href="/themes" className="f45-btn-outline">View All Themes</Link>
          </div>

        </div>
      </section>
    </>
  );
}
