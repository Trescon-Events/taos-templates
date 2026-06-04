"use client";
import Link from "next/link";

const sponsorTiers = [
  {
    name: "Title Sponsor",
    badge: "Exclusive",
    color: "var(--gold)",
    colorDim: "rgba(233,194,104,0.10)",
    colorBorder: "rgba(233,194,104,0.35)",
    perks: [
      "Title naming rights for the event",
      "Prime keynote speaking slot (Day 1 opening)",
      "150 sqm premium exhibition space",
      "Full delegate list with contact details",
      "20 VIP delegate passes",
      "Premium logo placement on all materials",
      "Dedicated press release & social campaign",
      "On-stage branding & stage backdrop",
    ],
  },
  {
    name: "Gold Sponsor",
    badge: "2 Available",
    color: "var(--gold)",
    colorDim: "rgba(233,194,104,0.08)",
    colorBorder: "rgba(233,194,104,0.25)",
    perks: [
      "Keynote speaking or panel moderation slot",
      "100 sqm exhibition space",
      "Delegate list (post-event)",
      "10 VIP delegate passes",
      "Logo on main stage backdrop",
      "Brand visibility in event app",
      "Networking dinner co-branding",
    ],
  },
  {
    name: "Silver Sponsor",
    badge: "4 Available",
    color: "var(--teal)",
    colorDim: "rgba(0,165,163,0.10)",
    colorBorder: "rgba(0,165,163,0.30)",
    perks: [
      "Panel speaking opportunity",
      "60 sqm exhibition space",
      "6 delegate passes",
      "Logo on event signage & digital",
      "Social media mentions",
      "Session branding rights",
    ],
  },
  {
    name: "Bronze Sponsor",
    badge: "6 Available",
    color: "var(--teal)",
    colorDim: "rgba(0,165,163,0.08)",
    colorBorder: "rgba(0,165,163,0.20)",
    perks: [
      "30 sqm exhibition space",
      "4 delegate passes",
      "Logo on event website & app",
      "Branded networking break",
      "Social media mention",
    ],
  },
];

const whySponsor = [
  { num: "1,000+", label: "Senior Attendees" },
  { num: "40+", label: "Countries Represented" },
  { num: "100+", label: "Active Investors" },
  { num: "2", label: "Full Event Days" },
];

export default function SponsorsEcosystemPage() {
  return (
    <>
      <style>{`
        .sp-page {
          padding-top: 80px;
          min-height: 100vh;
          background: var(--bg-primary);
        }
        .sp-hero {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 72px 40px 64px;
          position: relative;
          overflow: hidden;
        }
        .sp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 70% at 75% 50%, rgba(233,194,104,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .sp-hero-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 2; }
        .sp-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 24px;
        }
        .sp-breadcrumb a { color: var(--teal); text-decoration: none; transition: opacity 0.2s; }
        .sp-breadcrumb a:hover { opacity: 0.75; }
        .sp-breadcrumb svg { color: var(--text-muted); }
        .sp-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 18px;
        }
        .sp-eyebrow::before { content: ''; width: 24px; height: 1.5px; background: var(--gold); }
        .sp-hero-h1 {
          font-size: clamp(30px, 4.5vw, 54px);
          font-weight: 900; letter-spacing: -0.03em; color: #fff;
          line-height: 1.1; margin-bottom: 20px; max-width: 700px;
        }
        .sp-hero-h1 span { color: var(--gold); }
        .sp-hero-sub {
          font-size: 16px; color: var(--text-body);
          line-height: 1.75; max-width: 580px; margin-bottom: 36px;
        }
        .sp-hero-stats {
          display: flex; gap: 0;
          border: 1px solid rgba(233,194,104,0.25);
          display: inline-flex; flex-wrap: wrap;
        }
        .sp-hero-stat {
          padding: 18px 32px;
          border-right: 1px solid rgba(233,194,104,0.15);
        }
        .sp-hero-stat:last-child { border-right: none; }
        .sp-hero-stat-num { font-size: 26px; font-weight: 900; color: var(--gold); line-height: 1; margin-bottom: 4px; }
        .sp-hero-stat-label { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); }

        /* ── Tiers ── */
        .sp-tiers { padding: 80px 40px; max-width: 1240px; margin: 0 auto; }
        .sp-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .sp-section-label::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .sp-section-h2 {
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 900; letter-spacing: -0.03em; color: #fff; margin-bottom: 48px;
        }
        .sp-section-h2 span { color: var(--gold); }
        .sp-tiers-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .sp-tier-card {
          background: var(--bg-surface);
          border: 1px solid;
          padding: 36px 32px;
          transition: box-shadow 0.25s, transform 0.2s;
        }
        .sp-tier-card:hover { transform: translateY(-2px); }
        .sp-tier-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
        .sp-tier-name { font-size: 20px; font-weight: 800; color: #fff; }
        .sp-tier-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 4px 12px; border: 1px solid;
        }
        .sp-tier-perks { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .sp-tier-perks li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13.5px; color: var(--text-body); line-height: 1.5;
        }
        .sp-tier-perks li::before {
          content: '';
          width: 5px; height: 5px; border-radius: 50%;
          margin-top: 7px; flex-shrink: 0;
        }

        /* ── CTA ── */
        .sp-cta {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-dark);
          padding: 72px 40px;
          text-align: center;
        }
        .sp-cta h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 900; color: #fff; margin-bottom: 12px; letter-spacing: -0.02em; }
        .sp-cta h2 span { color: var(--gold); }
        .sp-cta p { font-size: 15px; color: var(--text-body); margin-bottom: 32px; }
        .sp-cta-btns { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .sp-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #1F2733;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px; text-decoration: none; transition: background 0.2s;
        }
        .sp-btn-primary:hover { background: #f5d47c; }
        .sp-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1.5px solid var(--teal); color: var(--teal);
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 28px; text-decoration: none; transition: background 0.2s;
        }
        .sp-btn-outline:hover { background: var(--teal-dim); }

        @media (max-width: 1024px) { .sp-tiers-grid { grid-template-columns: 1fr; } }
        @media (max-width: 640px) {
          .sp-hero { padding: 60px 20px 52px; }
          .sp-tiers { padding: 60px 20px; }
          .sp-tier-card { padding: 24px 20px; }
          .sp-cta { padding: 52px 20px; }
          .sp-hero-stat { padding: 14px 20px; }
        }
      `}</style>

      <div className="sp-page">

        {/* Hero */}
        <div className="sp-hero">
          <div className="sp-hero-inner">
            <div className="sp-breadcrumb">
              <Link href="/ecosystem">Ecosystem</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              <span>Sponsors</span>
            </div>
            <div className="sp-eyebrow">Sponsor Finance 2045</div>
            <h1 className="sp-hero-h1">
              Lead the Room.<br />Define the <span>Narrative.</span>
            </h1>
            <p className="sp-hero-sub">
              Finance 2045 sponsorship gives your brand unprecedented access to Southeast Asia&apos;s most influential finance decision-makers — on stage, in the exhibition hall, and in every conversation that matters.
            </p>
            <div className="sp-hero-stats">
              {whySponsor.map((s) => (
                <div key={s.label} className="sp-hero-stat">
                  <div className="sp-hero-stat-num">{s.num}</div>
                  <div className="sp-hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tiers */}
        <div className="sp-tiers">
          <div className="sp-section-label">Sponsorship Packages</div>
          <h2 className="sp-section-h2">Choose Your <span>Impact Level</span></h2>
          <div className="sp-tiers-grid">
            {sponsorTiers.map((t) => (
              <div key={t.name} className="sp-tier-card"
                style={{ borderColor: t.colorBorder }}
              >
                <div className="sp-tier-top">
                  <div className="sp-tier-name">{t.name}</div>
                  <div className="sp-tier-badge" style={{ color: t.color, borderColor: t.colorBorder, background: t.colorDim }}>
                    {t.badge}
                  </div>
                </div>
                <ul className="sp-tier-perks">
                  {t.perks.map((p) => (
                    <li key={p} style={{ "--dot-color": t.color } as React.CSSProperties}>
                      <span style={{
                        display: "inline-block",
                        width: 5, height: 5, borderRadius: "50%",
                        background: t.color, marginTop: 7, flexShrink: 0
                      }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="sp-cta">
          <h2>Become a <span>Sponsor</span></h2>
          <p>Our partnership team will create a bespoke package tailored to your objectives.</p>
          <div className="sp-cta-btns">
            <Link href="/collaborate?tab=sponsor" className="sp-btn-primary">
              Apply to Sponsor
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/enquire" className="sp-btn-outline">
              Enquire First
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
