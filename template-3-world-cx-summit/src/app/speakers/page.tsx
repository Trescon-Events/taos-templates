"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PASS_URL  = "https://konfhub.com/checkout/world-cx-summit-awards?ticketId=93844%7C1%3B&selectedCode=MKTWEBSITE";

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  img: string;
  bio: string;
  linkedin: string;
  twitter: string;
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/speakers")
      .then(r => r.json())
      .then(d => {
        setSpeakers(d.speakers ?? []);
        if (d.error) setError(d.error);
      })
      .catch(() => setError("Failed to load speakers"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .spk-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 72px;
        }

        /* Hero */
        .spk-hero {
          background: var(--bg-surface);
          padding: 72px 40px 64px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }
        .spk-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 70% at 100% 50%, rgba(201,168,76,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .spk-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative; z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .spk-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 14px;
        }
        .spk-overline::before {
          content: ''; width: 24px; height: 1.5px;
          background: var(--gold); flex-shrink: 0;
        }
        .spk-h1 {
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.12; margin-bottom: 14px;
        }
        .spk-h1 span { color: var(--gold); }
        .spk-sub {
          font-size: 15px; color: var(--text-body);
          max-width: 540px; line-height: 1.7;
        }
        .spk-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--gold);
          background: rgba(201,168,76,0.10); border: 1px solid rgba(201,168,76,0.25);
          padding: 10px 18px; margin-top: 20px;
        }
        .spk-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); box-shadow: 0 0 8px var(--gold);
          animation: spk-pulse 2s ease-in-out infinite;
        }
        @keyframes spk-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.65); }
        }

        /* Body */
        .spk-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 40px 100px;
        }

        /* Section heading */
        .spk-section-head {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 32px;
        }
        .spk-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--text-muted); white-space: nowrap;
        }
        .spk-section-label.live { color: #36BCB0; }
        .spk-section-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--border), transparent);
        }

        /* Grid */
        .spk-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 64px;
        }

        /* Card */
        .spk-card {
          position: relative; overflow: hidden;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .spk-card:hover {
          border-color: rgba(201,168,76,0.30);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.10);
        }
        .spk-img-wrap {
          aspect-ratio: 3/4; overflow: hidden; position: relative;
        }
        .spk-img-wrap::after {
          content: '';
          position: absolute; inset: 0;
          box-shadow: inset 0 0 32px rgba(54,188,176,0.22), inset 0 0 8px rgba(54,188,176,0.10);
          pointer-events: none; z-index: 3;
        }
        .spk-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          transition: transform 0.5s ease; display: block;
        }
        .spk-card:hover .spk-img { transform: scale(1.05); }
        .spk-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(10,22,40,0.7) 80%, rgba(10,22,40,0.95) 100%);
          z-index: 2;
        }
        .spk-fallback {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #0F1E38 0%, #152233 100%);
        }
        .spk-fallback-initials {
          font-size: 48px; font-weight: 900; letter-spacing: -0.03em;
          color: rgba(201,168,76,0.35); user-select: none;
        }
        .spk-company-pill {
          position: absolute; bottom: 14px; left: 14px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: var(--gold);
          background: rgba(10,22,40,0.80); backdrop-filter: blur(8px);
          border: 1px solid rgba(201,168,76,0.25); padding: 5px 12px;
          z-index: 3;
        }
        .spk-bar {
          height: 2px;
          background: linear-gradient(90deg, var(--coral), var(--gold));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s ease;
        }
        .spk-card:hover .spk-bar { transform: scaleX(1); }
        .spk-info { padding: 18px 20px 20px; }
        .spk-name {
          font-size: 15px; font-weight: 800; color: #fff;
          letter-spacing: -0.01em; line-height: 1.3; margin-bottom: 5px;
        }
        .spk-role { font-size: 11px; color: var(--text-muted); line-height: 1.5; }

        /* Loading skeleton */
        .spk-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-bottom: 64px;
        }
        .spk-skeleton-card {
          background: var(--bg-surface); border: 1px solid var(--border);
          overflow: hidden;
        }
        .spk-skeleton-img {
          aspect-ratio: 3/4;
          background: linear-gradient(90deg, #0F1E38 25%, #152233 50%, #0F1E38 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .spk-skeleton-text {
          padding: 18px 20px;
        }
        .spk-skeleton-line {
          height: 12px; border-radius: 4px; margin-bottom: 8px;
          background: linear-gradient(90deg, #0F1E38 25%, #152233 50%, #0F1E38 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Coming soon state */
        .spk-coming-soon {
          text-align: center; padding: 80px 40px;
          background: var(--bg-surface); border: 1px solid var(--border);
          margin-bottom: 64px;
        }
        .spk-cs-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(201,168,76,0.10); border: 1px solid rgba(201,168,76,0.25);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px; color: var(--gold);
        }
        .spk-cs-title { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 10px; }
        .spk-cs-sub { font-size: 14px; color: var(--text-muted); max-width: 440px; margin: 0 auto; line-height: 1.65; }

        /* CTA */
        .spk-cta-box {
          background: var(--bg-surface);
          border: 1px solid rgba(201,168,76,0.15);
          padding: 48px 40px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .spk-cta-box::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .spk-cta-h3 {
          font-size: 24px; font-weight: 900; color: #fff;
          letter-spacing: -0.02em; margin-bottom: 12px;
        }
        .spk-cta-h3 span { color: var(--gold); }
        .spk-cta-p {
          font-size: 14px; color: var(--text-body);
          max-width: 480px; margin: 0 auto 28px; line-height: 1.7;
        }
        .spk-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 1024px) { .spk-grid, .spk-skeleton-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .spk-grid, .spk-skeleton-grid { grid-template-columns: repeat(2, 1fr); }
          .spk-hero { padding: 56px 24px 48px; }
          .spk-body { padding: 40px 24px 72px; }
        }
        @media (max-width: 480px) {
          .spk-grid, .spk-skeleton-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .spk-cta-box { padding: 36px 24px; }
        }
      `}</style>

      <div className="spk-page">

        {/* Hero */}
        <div className="spk-hero">
          <div className="spk-hero-inner">
            <div>
              <div className="spk-overline">Speaker Lineup</div>
              <h1 className="spk-h1">
                <span>World CX Summit</span><br />
                2026 Speakers
              </h1>
              <p className="spk-sub">
                India&apos;s most senior customer experience leaders — keynote speakers, panellists, and fireside guests for 4 June 2026 in Bengaluru.
              </p>
              <div className="spk-badge">
                <span className="spk-badge-dot" />
                {loading ? "Loading lineup…" : speakers.length > 0 ? `${speakers.length} Confirmed Speakers` : "Lineup Announcements Coming Soon"}
              </div>
            </div>
            <a href="/attend?tab=speaker#enquire-form" className="wcx-btn-outline">
              Apply to Speak
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        {/* Body */}
        <div className="spk-body">

          {/* Loading state */}
          {loading && (
            <>
              <div className="spk-section-head">
                <div className="spk-section-label live">Loading speakers…</div>
                <div className="spk-section-line" />
              </div>
              <div className="spk-skeleton-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="spk-skeleton-card">
                    <div className="spk-skeleton-img" />
                    <div className="spk-skeleton-text">
                      <div className="spk-skeleton-line" style={{ width: "70%" }} />
                      <div className="spk-skeleton-line" style={{ width: "50%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Speakers loaded */}
          {!loading && speakers.length > 0 && (
            <>
              <div className="spk-section-head">
                <div className="spk-section-label live">2026 Confirmed — {speakers.length} Speakers</div>
                <div className="spk-section-line" />
              </div>

              <div className="spk-grid">
                {speakers.map((s) => {
                  const initials = s.name.split(" ").slice(0, 2).map(w => w[0]).join("");
                  return (
                    <div key={s.id || s.name} className="spk-card">
                      <div className="spk-img-wrap">
                        {s.img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={s.img}
                            alt={s.name}
                            className="spk-img"
                            onError={(e) => {
                              const wrap = (e.target as HTMLImageElement).parentElement!;
                              (e.target as HTMLImageElement).style.display = "none";
                              if (!wrap.querySelector(".spk-fallback")) {
                                const fb = document.createElement("div");
                                fb.className = "spk-fallback";
                                fb.innerHTML = `<span class="spk-fallback-initials">${initials}</span>`;
                                wrap.prepend(fb);
                              }
                            }}
                          />
                        ) : (
                          <div className="spk-fallback">
                            <span className="spk-fallback-initials">{initials}</span>
                          </div>
                        )}
                        <div className="spk-img-overlay" />
                        {s.company && <div className="spk-company-pill">{s.company}</div>}
                      </div>
                      <div className="spk-bar" />
                      <div className="spk-info">
                        <div className="spk-name">{s.name}</div>
                        <div className="spk-role">{s.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* No speakers — coming soon */}
          {!loading && speakers.length === 0 && (
            <>
              <div className="spk-section-head">
                <div className="spk-section-label">2026 Speaker Lineup</div>
                <div className="spk-section-line" />
              </div>
              <div className="spk-coming-soon">
                <div className="spk-cs-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="spk-cs-title">Speaker Announcements Coming Soon</div>
                <div className="spk-cs-sub">
                  The 2026 speaker lineup is being curated right now.
                  Applications to speak are open — join 400+ senior CX leaders on 4 June 2026 in Bengaluru.
                  {error && <span style={{ display: "block", marginTop: 12, color: "rgba(255,255,255,0.25)", fontSize: 11 }}>{error}</span>}
                </div>
              </div>
            </>
          )}

          {/* CTA */}
          <div className="spk-cta-box">
            <div className="spk-cta-h3">Want to speak at <span>World CX Summit 2026?</span></div>
            <p className="spk-cta-p">
              Applications for keynotes, panel discussions, and fireside chats are open.
              Join 400+ senior CX leaders on stage in Bengaluru.
            </p>
            <div className="spk-cta-btns">
              <a href="/attend?tab=speaker#enquire-form" className="wcx-btn-gold">
                Apply to Speak
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-primary">
                Get Your Pass
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
