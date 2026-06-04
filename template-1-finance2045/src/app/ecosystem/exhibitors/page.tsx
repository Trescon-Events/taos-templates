"use client";
import Link from "next/link";

const boothTypes = [
  {
    name: "Island Booth",
    size: "60–100 sqm",
    tag: "Premium",
    color: "var(--gold)",
    colorDim: "rgba(233,194,104,0.10)",
    colorBorder: "rgba(233,194,104,0.30)",
    features: [
      "Open 4-side access — maximum footfall",
      "Custom build-out with full branding",
      "Private meeting area included",
      "Power, internet & AV package",
      "6 exhibitor staff passes",
      "Lead capture badge scanner",
    ],
  },
  {
    name: "Corner Booth",
    size: "30–50 sqm",
    tag: "Standard",
    color: "var(--teal)",
    colorDim: "rgba(0,165,163,0.10)",
    colorBorder: "rgba(0,165,163,0.30)",
    features: [
      "2-side open access",
      "Shell scheme with branded graphics",
      "One counter + display unit",
      "Power & internet connectivity",
      "4 exhibitor staff passes",
      "Lead capture badge scanner",
    ],
  },
  {
    name: "Inline Booth",
    size: "9–18 sqm",
    tag: "Starter",
    color: "var(--teal)",
    colorDim: "rgba(0,165,163,0.08)",
    colorBorder: "rgba(0,165,163,0.20)",
    features: [
      "Single-front access",
      "Shell scheme included",
      "Branded fascia board",
      "Power connectivity",
      "2 exhibitor staff passes",
      "Event listing in delegate app",
    ],
  },
  {
    name: "Demo Pod",
    size: "4–6 sqm",
    tag: "Product Focus",
    color: "var(--teal)",
    colorDim: "rgba(0,165,163,0.08)",
    colorBorder: "rgba(0,165,163,0.20)",
    features: [
      "Dedicated product demo station",
      "High-visibility placement on floor",
      "Screen & AV equipment included",
      "1 exhibitor pass",
      "Event app listing",
    ],
  },
];

const whyExhibit = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Direct Access to Decision Makers",
    desc: "1,000+ C-suite leaders walk past your booth — not observers, buyers.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Live Product Demonstrations",
    desc: "Show — don&apos;t just tell. A live demo in front of 1,000+ is worth 10 webinars.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Qualified Lead Generation",
    desc: "Badge scanning + matchmaking app gives you a verified lead list post-event.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "Southeast Asia Market Entry",
    desc: "Indonesia is ASEAN&apos;s largest economy — the exhibition floor is your market entry point.",
  },
];

export default function ExhibitorsEcosystemPage() {
  return (
    <>
      <style>{`
        .ex-page {
          padding-top: 80px;
          min-height: 100vh;
          background: var(--bg-primary);
        }
        .ex-hero {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 72px 40px 64px;
          position: relative;
          overflow: hidden;
        }
        .ex-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 80% at 75% 50%, rgba(0,165,163,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ex-hero-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 2; }
        .ex-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 24px;
        }
        .ex-breadcrumb a { color: var(--teal); text-decoration: none; }
        .ex-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 18px;
        }
        .ex-eyebrow::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .ex-hero-h1 {
          font-size: clamp(30px, 4.5vw, 54px);
          font-weight: 900; letter-spacing: -0.03em; color: #fff;
          line-height: 1.1; margin-bottom: 20px; max-width: 680px;
        }
        .ex-hero-h1 span { color: var(--teal); }
        .ex-hero-sub {
          font-size: 16px; color: var(--text-body);
          line-height: 1.75; max-width: 580px; margin-bottom: 36px;
        }
        .ex-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px; text-decoration: none; transition: background 0.2s;
        }
        .ex-hero-cta:hover { background: var(--teal-light); }

        /* Why Exhibit */
        .ex-why { padding: 80px 40px; max-width: 1240px; margin: 0 auto; }
        .ex-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .ex-section-label::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .ex-section-h2 {
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 900; letter-spacing: -0.03em; color: #fff; margin-bottom: 48px;
        }
        .ex-section-h2 span { color: var(--teal); }
        .ex-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .ex-why-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-dark);
          padding: 32px 28px;
          display: flex; gap: 20px; align-items: flex-start;
        }
        .ex-why-icon {
          width: 48px; height: 48px;
          background: var(--teal-dim); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal); flex-shrink: 0;
        }
        .ex-why-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .ex-why-desc { font-size: 13.5px; color: var(--text-body); line-height: 1.65; }

        /* Booth Types */
        .ex-booths {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-dark);
          border-bottom: 1px solid var(--border-dark);
          padding: 80px 40px;
        }
        .ex-booths-inner { max-width: 1240px; margin: 0 auto; }
        .ex-booths-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 48px; }
        .ex-booth-card {
          background: var(--bg-primary);
          border: 1px solid;
          padding: 32px 28px;
          transition: box-shadow 0.25s;
        }
        .ex-booth-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .ex-booth-name { font-size: 18px; font-weight: 800; color: #fff; }
        .ex-booth-tag {
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 4px 10px; border: 1px solid;
        }
        .ex-booth-size { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 20px; }
        .ex-booth-features { list-style: none; display: flex; flex-direction: column; gap: 9px; }
        .ex-booth-features li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: var(--text-body); line-height: 1.5;
        }
        .ex-booth-features li span.dot {
          width: 5px; height: 5px; border-radius: 50%;
          margin-top: 7px; flex-shrink: 0; display: inline-block;
        }

        /* CTA */
        .ex-cta {
          padding: 72px 40px; text-align: center;
          max-width: 1240px; margin: 0 auto;
        }
        .ex-cta h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 900; color: #fff; margin-bottom: 12px; letter-spacing: -0.02em; }
        .ex-cta h2 span { color: var(--teal); }
        .ex-cta p { font-size: 15px; color: var(--text-body); margin-bottom: 32px; }
        .ex-cta-btns { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .ex-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px; text-decoration: none; transition: background 0.2s;
        }
        .ex-btn-primary:hover { background: var(--teal-light); }
        .ex-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1.5px solid rgba(255,255,255,0.3); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 28px; text-decoration: none; transition: border-color 0.2s;
        }
        .ex-btn-outline:hover { border-color: var(--teal); color: var(--teal); }

        @media (max-width: 1024px) {
          .ex-why-grid { grid-template-columns: 1fr; }
          .ex-booths-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .ex-hero { padding: 60px 20px 52px; }
          .ex-why { padding: 60px 20px; }
          .ex-booths { padding: 60px 20px; }
          .ex-cta { padding: 52px 20px; }
          .ex-why-card { flex-direction: column; }
        }
      `}</style>

      <div className="ex-page">

        <div className="ex-hero">
          <div className="ex-hero-inner">
            <div className="ex-breadcrumb">
              <Link href="/ecosystem">Ecosystem</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              <span>Exhibitors</span>
            </div>
            <div className="ex-eyebrow">Exhibit at Finance 2045</div>
            <h1 className="ex-hero-h1">
              Put Your Product in Front of <span>Southeast Asia&apos;s Buyers</span>
            </h1>
            <p className="ex-hero-sub">
              The Finance 2045 exhibition floor is where deals are made. Showcase your solution to 1,000+ senior finance and fintech leaders across 2 full days in the heart of Jakarta.
            </p>
            <Link href="/collaborate?tab=exhibitor" className="ex-hero-cta">
              Apply to Exhibit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Why Exhibit */}
        <div className="ex-why">
          <div className="ex-section-label">Why Exhibit</div>
          <h2 className="ex-section-h2">Turn Presence into <span>Pipeline</span></h2>
          <div className="ex-why-grid">
            {whyExhibit.map((w) => (
              <div key={w.title} className="ex-why-card">
                <div className="ex-why-icon">{w.icon}</div>
                <div>
                  <div className="ex-why-title">{w.title}</div>
                  <p className="ex-why-desc" dangerouslySetInnerHTML={{ __html: w.desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booth Types */}
        <div className="ex-booths">
          <div className="ex-booths-inner">
            <div className="ex-section-label">Exhibition Options</div>
            <h2 className="ex-section-h2">Find Your Perfect <span>Booth</span></h2>
            <div className="ex-booths-grid">
              {boothTypes.map((b) => (
                <div key={b.name} className="ex-booth-card" style={{ borderColor: b.colorBorder }}>
                  <div className="ex-booth-top">
                    <div className="ex-booth-name">{b.name}</div>
                    <div className="ex-booth-tag" style={{ color: b.color, borderColor: b.colorBorder, background: b.colorDim }}>
                      {b.tag}
                    </div>
                  </div>
                  <div className="ex-booth-size" style={{ color: b.color }}>{b.size}</div>
                  <ul className="ex-booth-features">
                    {b.features.map((f) => (
                      <li key={f}>
                        <span className="dot" style={{ background: b.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="ex-cta">
          <h2>Ready to <span>Exhibit?</span></h2>
          <p>Contact our team to book your space and choose your booth type.</p>
          <div className="ex-cta-btns">
            <Link href="/collaborate?tab=exhibitor" className="ex-btn-primary">
              Apply Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/enquire" className="ex-btn-outline">
              Speak to the Team
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
