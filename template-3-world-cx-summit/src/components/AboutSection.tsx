"use client";
import { EVENT } from "@/config/event";

const PASS_URL = EVENT.register_url;

export default function AboutSection() {
  return (
    <>
      <style>{`
        .wcx-about {
          background: var(--bg-primary);
          padding: 88px 40px;
          position: relative;
          overflow: hidden;
        }
        .wcx-about-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 50% 60% at 0% 50%, rgba(54,188,176,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 100% 30%, rgba(201,168,76,0.04) 0%, transparent 70%);
        }
        .wcx-about-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* Left — text */
        .wcx-about-left {}
        .wcx-about-overline {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--coral);
          margin-bottom: 20px;
        }
        .wcx-about-overline::before {
          content: '';
          width: 28px; height: 1.5px;
          background: var(--coral);
          flex-shrink: 0;
        }
        .wcx-about-h2 {
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 28px;
        }
        .wcx-about-h2 span { color: var(--coral); }

        .wcx-about-body {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 40px;
        }
        .wcx-about-body p {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-body);
        }
        .wcx-about-body p strong {
          color: #fff;
          font-weight: 600;
        }

        .wcx-about-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Right — stat cards */
        .wcx-about-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .wcx-about-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .wcx-about-card:hover {
          border-color: rgba(54,188,176,0.35);
          transform: translateY(-3px);
        }
        .wcx-about-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--coral), transparent);
        }
        .wcx-about-card-num {
          font-size: 40px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 8px;
        }
        .wcx-about-card-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .wcx-about-card-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin-top: 6px;
          line-height: 1.5;
        }

        /* Span full width for last card if odd */
        .wcx-about-card.full { grid-column: span 2; }


        @media (max-width: 900px) {
          .wcx-about-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .wcx-about { padding: 60px 24px; }
        }
        @media (max-width: 480px) {
          .wcx-about { padding: 48px 20px; }
          .wcx-about-right { grid-template-columns: 1fr 1fr; gap: 10px; }
          .wcx-about-card { padding: 24px 18px; }
          .wcx-about-card-num { font-size: 30px; }
          .wcx-about-ctas { flex-direction: column; }
          .wcx-about-ctas a, .wcx-about-ctas button { width: 100%; justify-content: center; }
        }
      `}</style>

      <section className="wcx-about">
        <div className="wcx-about-glow" />
        <div className="wcx-about-inner">

          {/* Left — text block */}
          <div className="wcx-about-left">
            <div className="wcx-about-overline">About the Summit</div>
            <h2 className="wcx-about-h2">
              Where CX Leaders<br />
              <span>Shape What&apos;s Next</span>
            </h2>
            <div className="wcx-about-body">
              <p>
                <strong>World CX Summit</strong> is India&apos;s leading customer experience conference — a high-impact, invite-led event where <strong>400+ senior CX leaders, digital innovators and enterprise technology providers</strong> converge to set the agenda for the future of CX.
              </p>
              <p>
                Taking place on <strong>4 June 2026 in Bengaluru</strong>, the Summit brings together the brightest minds across AI, omnichannel, personalisation and digital transformation — through power-packed keynotes, real-world enterprise use-cases, live product showcases, C-suite panel discussions and hands-on CX tech talks.
              </p>
              <p>
                World CX Summit is the definitive platform for <strong>CEOs, Heads of CX, Chief Digital Officers, CIOs, CMOs and Heads of Digital Transformation</strong> to benchmark strategies, forge high-value connections and engage directly with the technology leaders reshaping the next era of customer experience.
              </p>
            </div>
            <div className="wcx-about-ctas">
              <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-primary">
                {EVENT.cta_primary_label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href={EVENT.sponsor_enquire_url} className="wcx-btn-outline">
                Explore Sponsorship
              </a>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="wcx-about-right">
            {EVENT.stats.map((s) => (
              <div key={s.label} className="wcx-about-card">
                <div className="wcx-about-card-num">{s.num}</div>
                <div className="wcx-about-card-label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
