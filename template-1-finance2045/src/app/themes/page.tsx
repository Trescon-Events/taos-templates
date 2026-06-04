import Link from "next/link";
import { themes } from "@/data/themes";

export default function ThemesPage() {
  return (
    <>
      <style>{`
        .th-page {
          padding-top: 100px;
          min-height: 100vh;
          background: var(--bg-primary);
        }
        .th-hero {
          padding: 80px 40px 64px;
          max-width: 1240px;
          margin: 0 auto;
          text-align: center;
        }
        .th-hero h1 {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 16px;
          text-shadow: 0 2px 24px rgba(0,0,0,0.5);
        }
        .th-hero h1 span { color: var(--teal); }
        .th-hero p {
          font-size: 17px;
          color: var(--text-body);
          max-width: 600px;
          margin: 0 auto;
        }
        .th-grid {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px 100px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .th-card {
          background: var(--bg-card);
          border: 1px solid var(--border-dark);
          padding: 36px 32px;
          display: flex;
          gap: 24px;
          align-items: flex-start;
          transition: border-color 0.2s;
        }
        .th-card:hover { border-color: var(--teal); }
        .th-num {
          font-size: 40px;
          font-weight: 900;
          color: var(--teal);
          opacity: 0.25;
          line-height: 1;
          flex-shrink: 0;
          width: 48px;
        }
        .th-text {}
        .th-title {
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
          text-shadow: 0 1px 6px rgba(0,0,0,0.4);
        }
        .th-desc {
          font-size: 14px;
          color: var(--text-body);
          line-height: 1.75;
        }
        @media (max-width: 768px) {
          .th-grid { grid-template-columns: 1fr; padding: 0 20px 80px; }
          .th-hero { padding: 60px 20px 48px; }
        }
      `}</style>

      <div className="th-page">
        <div className="th-hero">
          <div className="f45-eyebrow" style={{ justifyContent: "center" }}>
            <span className="f45-eyebrow-dot" />
            Themes
          </div>
          <h1>10 High-Impact <span>Finance Themes</span></h1>
          <p>Curated topic tracks spanning Indonesia&apos;s full financial transformation — from digital banking to ESG and beyond.</p>
        </div>

        <div className="th-grid">
          {themes.map((t, i) => (
            <div key={t.title} className="th-card">
              <div className="th-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="th-text">
                <div className="th-title">{t.title}</div>
                <div className="th-desc">{t.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
