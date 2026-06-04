import Image from "next/image";
import { themes } from "@/data/themes";

const happenings = [
  {
    title: "Top-Tier Content",
    desc: "Thought leadership sessions from CFOs, regulators, and central bank governors navigating Indonesia's financial transformation.",
    img: "/hap-1.webp",
    tag: "Sessions",
  },
  {
    title: "Elite Keynotes",
    desc: "High-impact keynotes from Indonesia's top financial minds and global industry visionaries setting the agenda for 2045.",
    img: "/hap-4.webp",
    tag: "Keynotes",
  },
  {
    title: "A Frontier for Technologies",
    desc: "Exhibition floor featuring the latest in RegTech, WealthTech, PayTech, and AI-powered financial infrastructure.",
    img: "/hap-3.webp",
    tag: "Exhibition",
  },
  {
    title: "Precision Matchmaking",
    desc: "Bypass the noise with curated meetings designed strictly for immediate capital deployment between investors and founders.",
    img: "/hap-5.webp",
    tag: "Meetings",
  },
  {
    title: "Networking Like No Other",
    desc: "Build high-value relationships with the exact executives shaping the financial landscape — in curated roundtables and evening events.",
    img: "/hap-2.webp",
    tag: "Networking",
  },
  {
    title: "Global Amplification",
    desc: "Pan-regional and global media coverage ensuring your brand story reaches decision-makers across Asia, the Middle East, and beyond.",
    img: "/hap-6.webp",
    tag: "Media",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <style>{`
        .exp-page {
          background: var(--bg-primary);
        }

        /* ── Hero ── */
        .exp-hero {
          position: relative;
          padding: 148px 40px 96px;
          text-align: center;
          overflow: hidden;
        }
        .exp-hero-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,165,163,0.12) 0%, transparent 70%);
        }
        .exp-hero-grid {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
          background-image:
            linear-gradient(rgba(0,165,163,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,165,163,1) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 70%);
        }
        .exp-hero-inner {
          position: relative; z-index: 1;
          max-width: 800px; margin: 0 auto;
        }
        .exp-hero h1 {
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: #fff;
          margin-bottom: 20px;
        }
        .exp-hero h1 span {
          background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .exp-hero p {
          font-size: 16px;
          color: rgba(255,255,255,0.55);
          line-height: 1.8;
          max-width: 520px;
          margin: 0 auto 40px;
        }
        .exp-hero-stats {
          display: inline-flex;
          align-items: stretch;
          border: 1px solid rgba(0,165,163,0.2);
          background: rgba(0,165,163,0.04);
        }
        .exp-hero-stat {
          padding: 16px 28px;
          text-align: center;
          border-right: 1px solid rgba(0,165,163,0.15);
        }
        .exp-hero-stat:last-child { border-right: none; }
        .exp-hero-stat-num {
          font-size: 22px; font-weight: 900;
          color: #00a5a3; line-height: 1; letter-spacing: -0.03em;
        }
        .exp-hero-stat-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); margin-top: 5px;
        }

        /* ── Themes section ── */
        .exp-themes {
          background: var(--bg-surface);
          position: relative;
        }
        .exp-themes::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.35), transparent);
        }
        .exp-themes-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px 88px;
        }
        .exp-themes-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .exp-themes-header h2 {
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #fff;
          margin: 8px 0 0;
        }
        .exp-themes-header h2 span { color: #00a5a3; }
        .exp-themes-header-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 340px;
          flex-shrink: 0;
        }
        .exp-themes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }
        .exp-theme-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 28px 32px;
          display: flex;
          gap: 22px;
          align-items: flex-start;
          transition: background 0.25s, border-color 0.25s;
          position: relative;
          overflow: hidden;
        }
        .exp-theme-card::after {
          content: '';
          position: absolute; top: 0; left: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #00a5a3, rgba(0,165,163,0.1));
          opacity: 0;
          transition: opacity 0.25s;
        }
        .exp-theme-card:hover {
          background: rgba(0,165,163,0.05);
          border-color: rgba(0,165,163,0.25);
        }
        .exp-theme-card:hover::after { opacity: 1; }
        .exp-theme-num {
          font-size: 11px; font-weight: 800;
          color: #00a5a3; opacity: 0.5;
          line-height: 1; flex-shrink: 0;
          width: 28px; letter-spacing: 0.04em;
          padding-top: 3px; transition: opacity 0.25s;
        }
        .exp-theme-card:hover .exp-theme-num { opacity: 1; }
        .exp-theme-title {
          font-size: 14px; font-weight: 800;
          color: #fff; margin-bottom: 7px;
          letter-spacing: -0.01em; line-height: 1.3;
        }
        .exp-theme-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,0.42);
          line-height: 1.72;
        }

        /* ── Happenings grid ── */
        .exp-hap {
          background: var(--bg-primary);
          position: relative;
        }
        .exp-hap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.35), transparent);
        }
        .exp-hap-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px 88px;
        }
        .exp-hap-header {
          margin-bottom: 48px;
        }
        .exp-hap-header h2 {
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #fff;
          margin: 8px 0 12px;
        }
        .exp-hap-header h2 span { color: #00a5a3; }
        .exp-hap-header p {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 520px;
        }

        /* 3-column grid */
        .exp-hap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* Card */
        .exp-hap-card {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 4/3;
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.35s, box-shadow 0.35s;
        }
        .exp-hap-card:hover {
          border-color: rgba(0,165,163,0.55);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 10px 36px rgba(0,0,0,0.55);
        }
        .exp-hap-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, #00a5a3, rgba(0,165,163,0.2));
          z-index: 3; opacity: 0;
          transition: opacity 0.35s;
        }
        .exp-hap-card:hover::before { opacity: 1; }

        .exp-hap-photo {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .exp-hap-card:hover .exp-hap-photo { transform: scale(1.06); }

        .exp-hap-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,14,22,0.96) 0%,
            rgba(10,14,22,0.72) 40%,
            rgba(10,14,22,0.18) 100%
          );
          z-index: 1;
        }

        .exp-hap-body {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 24px 22px;
          z-index: 2;
        }
        .exp-hap-tag {
          display: inline-flex;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #00a5a3;
          border: 1px solid rgba(0,165,163,0.3);
          background: rgba(0,165,163,0.08);
          padding: 4px 10px; border-radius: 4px;
          margin-bottom: 10px;
        }
        .exp-hap-title {
          font-size: 17px; font-weight: 800;
          letter-spacing: -0.02em; line-height: 1.2;
          color: #fff; margin-bottom: 10px;
        }
        .exp-hap-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .exp-hap-grid { grid-template-columns: repeat(2, 1fr); }
          .exp-themes-grid { grid-template-columns: 1fr; }
          .exp-themes-inner, .exp-hap-inner { padding: 60px 20px 72px; }
          .exp-themes-header { flex-direction: column; align-items: flex-start; gap: 12px; }
          .exp-themes-header-desc { max-width: 100%; }
        }
        @media (max-width: 640px) {
          .exp-hero { padding: 120px 20px 72px; }
          .exp-hap-grid { grid-template-columns: 1fr; }
          .exp-hero-stats { flex-wrap: wrap; }
          .exp-hero-stat { flex: 1; min-width: 100px; }
        }
      `}</style>

      <div className="exp-page">

        {/* Hero */}
        <div className="exp-hero">
          <div className="exp-hero-glow" />
          <div className="exp-hero-grid" />
          <div className="exp-hero-inner">
            <div className="f45-eyebrow" style={{ justifyContent: "center" }}>
              <span className="f45-eyebrow-dot" />
              Finance 2045 · Jakarta
            </div>
            <h1>The Full <span>Summit Experience</span></h1>
            <p>
              10 high-impact finance themes. Every session format engineered for capital deployment, strategic connection, and actionable insight.
            </p>
            <div className="exp-hero-stats">
              {[
                { num: "10",   label: "Theme Tracks" },
                { num: "20+",  label: "Session Formats" },
                { num: "2",    label: "Power Days" },
                { num: "500+", label: "Delegates" },
              ].map((s) => (
                <div key={s.label} className="exp-hero-stat">
                  <div className="exp-hero-stat-num">{s.num}</div>
                  <div className="exp-hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Themes */}
        <div className="exp-themes">
          <div className="exp-themes-inner">
            <div className="exp-themes-header">
              <div>
                <div className="f45-eyebrow">
                  <span className="f45-eyebrow-dot" />
                  Thematic Pillars
                </div>
                <h2>10 High-Impact <span>Finance Themes</span></h2>
              </div>
              <p className="exp-themes-header-desc">Curated topic tracks spanning the full spectrum of Indonesia&apos;s financial transformation journey.</p>
            </div>
            <div className="exp-themes-grid">
              {themes.map((t, i) => (
                <div key={t.title} className="exp-theme-card">
                  <div className="exp-theme-num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="exp-theme-title">{t.title}</div>
                    <div className="exp-theme-desc">{t.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Happenings — full grid, no carousel */}
        <div className="exp-hap">
          <div className="exp-hap-inner">
            <div className="exp-hap-header">
              <div className="f45-eyebrow">
                <span className="f45-eyebrow-dot" />
                Happenings
              </div>
              <h2>The Architecture of <span>Opportunity</span></h2>
              <p>Every format, every interaction — engineered for capital deployment and high-impact deal flow.</p>
            </div>
            <div className="exp-hap-grid">
              {happenings.map((h) => (
                <div key={h.title} className="exp-hap-card">
                  <Image
                    src={h.img}
                    alt={h.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                    className="exp-hap-photo"
                    draggable={false}
                  />
                  <div className="exp-hap-overlay" />
                  <div className="exp-hap-body">
                    <div className="exp-hap-tag">{h.tag}</div>
                    <div className="exp-hap-title">{h.title}</div>
                    <div className="exp-hap-desc">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
