"use client";

const PASS_URL    = "https://konfhub.com/checkout/world-cx-summit-awards?ticketId=93844%7C1%3B&selectedCode=MKTWEBSITE";

const roles = [
  "Heads of CX", "Heads of Customer Relations", "Heads of Customer Service",
  "Heads of Customer Loyalty", "Heads of Contact Centre",
  "Heads of Product & Innovation", "Heads of Customer Operations",
  "Heads of UX", "Chief Digital Officers", "Chief Technology Officers",
  "Heads of Marketing", "Heads of Consumer Insights", "CEOs & COOs",
  "Chief Marketing Officers", "Chief Data Officers",
];

const industries = [
  "Manufacturing", "Retail & CPG", "BFSI", "Transport & Logistics",
  "E-Commerce", "Fintech & Payments", "Hospitality", "Utilities",
  "Tourism", "Aviation", "Pharma & Healthcare", "OTT",
];

export default function SponsorshipSection() {
  return (
    <>
      <style>{`
        .sp-section {
          background: var(--bg-surface);
          border-top: 2px solid rgba(54,188,176,0.25);
          padding: 96px 0 100px;
          position: relative;
          overflow: hidden;
        }

        .sp-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .sp-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(54,188,176,0.14);
          min-height: 520px;
        }

        /* ── LEFT: pitch panel — teal-tinted ── */
        .sp-pitch {
          background: linear-gradient(150deg, rgba(54,188,176,0.14) 0%, rgba(54,188,176,0.05) 50%, rgba(10,22,40,0.0) 100%),
                      #0F1E38;
          border-right: 1px solid rgba(54,188,176,0.14);
          padding: 52px 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .sp-pitch::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(54,188,176,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .sp-pitch-top { position: relative; z-index: 2; }
        .sp-pitch-overline {
          font-size: 9px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--coral);
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 20px;
        }
        .sp-pitch-overline::before {
          content: ''; width: 20px; height: 1.5px;
          background: var(--coral); flex-shrink: 0;
        }
        .sp-pitch-h2 {
          font-size: clamp(24px, 2.2vw, 34px);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.1; color: #fff;
          margin: 0 0 16px;
        }
        .sp-pitch-h2 em { font-style: normal; color: var(--coral); }
        .sp-pitch-p {
          font-size: 14px; color: var(--text-body);
          line-height: 1.75; margin-bottom: 0;
        }

        /* Stats row */
        .sp-stats {
          display: flex; gap: 0;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          overflow: hidden;
          margin: 32px 0;
          position: relative; z-index: 2;
        }
        .sp-stat {
          flex: 1;
          padding: 18px 16px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .sp-stat:last-child { border-right: none; }
        .sp-stat-n {
          font-size: 30px; font-weight: 900;
          letter-spacing: -0.02em; color: var(--gold);
          line-height: 1; margin-bottom: 4px;
        }
        .sp-stat-n span { color: var(--gold); }
        .sp-stat-l {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }

        /* Buttons */
        .sp-pitch-btns {
          display: flex; flex-direction: column; gap: 10px;
          position: relative; z-index: 2;
        }
        .sp-pitch-btns a {
          text-align: center;
          justify-content: center;
        }

        /* ── RIGHT: audience panel ── */
        .sp-audience {
          padding: 48px 44px 52px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          background: var(--bg-primary);
        }

        .sp-aud-block-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.20em;
          text-transform: uppercase; color: #fff;
          margin-bottom: 14px;
          display: flex; align-items: center; gap: 12px;
        }
        .sp-aud-block-label::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.10);
        }

        /* Role chips */
        .sp-chips {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .sp-chip-role {
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.80);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 8px;
          padding: 7px 14px;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          cursor: default;
          white-space: nowrap;
        }
        .sp-chip-role:hover {
          background: rgba(54,188,176,0.10);
          border-color: rgba(54,188,176,0.30);
          color: #fff;
        }

        /* Industry chips — gold tint */
        .sp-chip-ind {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.03em;
          color: var(--gold);
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.20);
          border-radius: 8px;
          padding: 6px 14px;
          transition: background 0.2s, border-color 0.2s;
          cursor: default;
          white-space: nowrap;
        }
        .sp-chip-ind:hover {
          background: rgba(201,168,76,0.13);
          border-color: rgba(201,168,76,0.38);
        }

        /* bottom CTA strip */
        .sp-strip {
          background: rgba(54,188,176,0.08);
          border: 1px solid rgba(54,188,176,0.22);
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-top: auto;
        }
        .sp-strip-text {
          font-size: 14px; color: #fff;
          font-weight: 600; line-height: 1.5;
        }
        .sp-strip-text span { color: var(--coral); }
        .sp-strip-sub {
          font-size: 12px; color: var(--text-muted);
          margin-top: 2px;
        }
        .sp-strip-btns { display: flex; gap: 10px; flex-wrap: wrap; }

        @media (max-width: 1024px) {
          .sp-section { padding: 72px 0 80px; }
          .sp-inner { padding: 0 32px; }
          .sp-grid { grid-template-columns: 1fr; }
          .sp-pitch { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 48px 32px; }
          .sp-pitch-btns { flex-direction: row; }
          .sp-pitch-btns a { flex: 1; }
          .sp-audience { padding: 40px 32px; }
        }
        @media (max-width: 640px) {
          .sp-section { padding: 56px 0 64px; }
          .sp-inner { padding: 0 20px; }
          .sp-stats { flex-direction: column; }
          .sp-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .sp-stat:last-child { border-bottom: none; }
          .sp-pitch-btns { flex-direction: column; }
        }
      `}</style>

      <section className="sp-section">
        <div className="sp-inner">
          <div className="sp-grid">

            {/* LEFT — sponsorship pitch */}
            <div className="sp-pitch">
              <div className="sp-pitch-top">
                <div className="sp-pitch-overline">Sponsorship</div>
                <h2 className="sp-pitch-h2">
                  Showcase Your Brand<br />to <em>India&apos;s Top</em><br />CX Decision-Makers
                </h2>
                <p className="sp-pitch-p">
                  Win business, launch products, and build thought leadership at the most senior CX gathering in India.
                </p>

                <div className="sp-stats">
                  <div className="sp-stat">
                    <div className="sp-stat-n">400<span>+</span></div>
                    <div className="sp-stat-l">Attendees</div>
                  </div>
                  <div className="sp-stat">
                    <div className="sp-stat-n">12<span>+</span></div>
                    <div className="sp-stat-l">Sectors</div>
                  </div>
                  <div className="sp-stat">
                    <div className="sp-stat-n">1</div>
                    <div className="sp-stat-l">Power Day</div>
                  </div>
                </div>
              </div>

              <div className="sp-pitch-btns">
                <a href="/attend?tab=sponsor#enquire-form" className="wcx-btn-primary">
                  Explore Sponsorship
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-outline">
                  Register
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {/* RIGHT — audience breakdown */}
            <div className="sp-audience">

              <div>
                <div className="sp-aud-block-label">Who You Will Meet</div>
                <div className="sp-chips">
                  {roles.map((r) => (
                    <div key={r} className="sp-chip-role">{r}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="sp-aud-block-label">Industry Sectors</div>
                <div className="sp-chips">
                  {industries.map((ind) => (
                    <div key={ind} className="sp-chip-ind">{ind}</div>
                  ))}
                </div>
              </div>

              {/* bottom strip CTA */}
              <div className="sp-strip">
                <div>
                  <div className="sp-strip-text">
                    Limited seats. <span>4 June 2026 · Bengaluru.</span>
                  </div>
                  <div className="sp-strip-sub">Early-bird passes available — don&apos;t miss your spot.</div>
                </div>
                <div className="sp-strip-btns">
                  <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-gold">
                    Register Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
