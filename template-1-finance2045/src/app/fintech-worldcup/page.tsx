"use client";
import Link from "next/link";
import HubSpotForm from "@/components/HubSpotForm";

const prizes = [
  {
    rank: "1st",
    label: "Grand Prize",
    value: "USD 25,000",
    color: "var(--gold)",
    colorDim: "rgba(233,194,104,0.12)",
    colorBorder: "rgba(233,194,104,0.35)",
    perks: [
      "USD 25,000 prize money",
      "Fast-track to investor meetings",
      "Stage time in front of 1,000+ attendees",
      "12-month mentorship programme",
      "Finance 2045 Startup of the Year award",
    ],
  },
  {
    rank: "2nd",
    label: "Runner-Up",
    value: "USD 10,000",
    color: "rgba(200,200,200,0.9)",
    colorDim: "rgba(200,200,200,0.06)",
    colorBorder: "rgba(200,200,200,0.20)",
    perks: [
      "USD 10,000 prize money",
      "Investor introduction sessions",
      "Exhibition booth at Finance 2045",
      "6-month advisory access",
    ],
  },
  {
    rank: "3rd",
    label: "Third Place",
    value: "USD 5,000",
    color: "rgba(180,120,80,0.9)",
    colorDim: "rgba(180,120,80,0.06)",
    colorBorder: "rgba(180,120,80,0.22)",
    perks: [
      "USD 5,000 prize money",
      "Investor networking access",
      "Finance 2045 recognition award",
      "Media partner coverage",
    ],
  },
];

const criteria = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Innovation",
    desc: "How novel and disruptive is the solution in the context of financial services or fintech?",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: "Traction & Validation",
    desc: "Revenue, users, pilots, or partnerships demonstrating real-world demand.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    title: "Market Opportunity",
    desc: "Size and accessibility of the target market, with focus on Southeast Asia and emerging economies.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      </svg>
    ),
    title: "Team Strength",
    desc: "Founding team experience, domain expertise, and execution capability.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: "Business Model",
    desc: "Clarity of monetisation strategy, unit economics, and path to profitability.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Impact & Sustainability",
    desc: "Potential to improve financial inclusion, sustainability outcomes, or economic development.",
  },
];

const timeline = [
  { date: "1 Mar 2026", label: "Applications Open" },
  { date: "30 Apr 2026", label: "Application Deadline" },
  { date: "15 May 2026", label: "Shortlist Announced" },
  { date: "1 Jun 2026", label: "Finalist Briefing" },
  { date: "7 Jul 2026", label: "Semi-Final Pitches" },
  { date: "8 Jul 2026", label: "Grand Final & Awards" },
];

const eligibility = [
  "Fintech, finance, or adjacent technology startup",
  "Founded within the last 7 years",
  "Raising or have raised Pre-Seed to Series B",
  "Headquartered or operating in Southeast Asia (preferred)",
  "Working product or validated prototype",
  "Founding team available to pitch in person in Jakarta",
];

export default function PitchCompetitionPage() {
  return (
    <>
      <style>{`
        .pc-page {
          padding-top: 80px;
          min-height: 100vh;
          background: var(--bg-primary);
        }

        /* ── Hero ── */
        .pc-hero {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 80px 40px 72px;
          position: relative;
          overflow: hidden;
        }
        .pc-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 80% at 70% 45%, rgba(233,194,104,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .pc-hero-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 2; }
        .pc-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 18px;
        }
        .pc-eyebrow::before { content: ''; width: 24px; height: 1.5px; background: var(--gold); }
        .pc-hero-h1 {
          font-size: clamp(34px, 5.5vw, 64px);
          font-weight: 900; letter-spacing: -0.03em; color: #fff;
          line-height: 1.05; margin-bottom: 20px; max-width: 760px;
        }
        .pc-hero-h1 span { color: var(--gold); }
        .pc-hero-sub { font-size: 17px; color: var(--text-body); line-height: 1.75; max-width: 600px; margin-bottom: 36px; }
        .pc-hero-prize {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: rgba(233,194,104,0.08);
          border: 1px solid rgba(233,194,104,0.30);
          padding: 16px 24px;
          margin-bottom: 32px;
        }
        .pc-hero-prize-value { font-size: 32px; font-weight: 900; color: var(--gold); line-height: 1; }
        .pc-hero-prize-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.70); }
        .pc-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #1F2733;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px; text-decoration: none; transition: background 0.2s;
        }
        .pc-hero-cta:hover { background: #f5d47c; }

        /* ── Prizes ── */
        .pc-prizes { padding: 80px 40px; max-width: 1240px; margin: 0 auto; }
        .pc-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .pc-section-label::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .pc-section-h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 900; letter-spacing: -0.03em; color: #fff; margin-bottom: 48px; }
        .pc-section-h2 span { color: var(--gold); }
        .pc-prizes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .pc-prize-card {
          border: 1px solid;
          padding: 36px 28px;
          position: relative;
          transition: box-shadow 0.25s;
        }
        .pc-prize-card:first-child { box-shadow: 0 0 28px rgba(0,165,163,0.15); }
        .pc-prize-rank {
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          margin-bottom: 12px;
        }
        .pc-prize-label { font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 12px; }
        .pc-prize-value { font-size: 32px; font-weight: 900; line-height: 1; margin-bottom: 24px; }
        .pc-prize-perks { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .pc-prize-perks li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: var(--text-body); line-height: 1.5;
        }
        .pc-prize-perks li span.dot {
          width: 5px; height: 5px; border-radius: 50%;
          margin-top: 7px; flex-shrink: 0; display: inline-block;
        }

        /* ── Timeline ── */
        .pc-timeline {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-dark);
          border-bottom: 1px solid var(--border-dark);
          padding: 80px 40px;
        }
        .pc-timeline-inner { max-width: 1240px; margin: 0 auto; }
        .pc-timeline-track {
          display: flex;
          gap: 0;
          margin-top: 48px;
          position: relative;
          overflow-x: auto;
        }
        .pc-timeline-track::before {
          content: '';
          position: absolute;
          top: 20px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--teal), var(--gold));
          z-index: 0;
        }
        .pc-tl-item {
          flex: 1;
          min-width: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
          padding: 0 8px;
        }
        .pc-tl-dot {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 2px solid var(--teal);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          font-size: 11px;
          font-weight: 800;
          color: var(--teal);
        }
        .pc-tl-item:first-child .pc-tl-dot { border-color: var(--teal); }
        .pc-tl-item:last-child .pc-tl-dot { border-color: var(--gold); color: var(--gold); }
        .pc-tl-date { font-size: 11px; font-weight: 700; color: var(--gold); margin-bottom: 4px; }
        .pc-tl-label { font-size: 12px; color: rgba(255,255,255,0.75); line-height: 1.4; }

        /* ── Criteria ── */
        .pc-criteria { padding: 80px 40px; max-width: 1240px; margin: 0 auto; }
        .pc-criteria-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .pc-criteria-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-dark);
          padding: 24px 22px;
        }
        .pc-criteria-icon {
          width: 40px; height: 40px;
          background: var(--teal-dim); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal); margin-bottom: 14px;
        }
        .pc-criteria-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .pc-criteria-desc { font-size: 12.5px; color: var(--text-body); line-height: 1.65; }

        /* ── Eligibility + Form ── */
        .pc-apply {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-dark);
          padding: 80px 40px;
        }
        .pc-apply-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 72px;
          align-items: start;
        }
        .pc-elig-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 32px; }
        .pc-elig-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 14px; color: var(--text-body); line-height: 1.5;
        }
        .pc-elig-check {
          width: 20px; height: 20px;
          background: var(--teal-dim); border: 1px solid var(--teal);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--teal);
        }
        .pc-form-panel {
          background: var(--bg-primary);
          border: 1px solid var(--border);
          padding: 40px;
        }
        .pc-form-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; }
        .pc-form-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 28px; }

        @media (max-width: 1024px) {
          .pc-prizes-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; }
          .pc-criteria-grid { grid-template-columns: repeat(2, 1fr); }
          .pc-apply-inner { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 640px) {
          .pc-hero { padding: 64px 20px 56px; }
          .pc-prizes { padding: 60px 20px; }
          .pc-timeline { padding: 60px 20px; }
          .pc-criteria { padding: 60px 20px; }
          .pc-criteria-grid { grid-template-columns: 1fr; }
          .pc-apply { padding: 60px 20px; }
          .pc-form-panel { padding: 24px 20px; }
        }
      `}</style>

      <div className="pc-page">

        {/* Hero */}
        <div className="pc-hero">
          <div className="pc-hero-inner">
            <div className="pc-eyebrow">Pitch Competition</div>
            <h1 className="pc-hero-h1">
              Finance 2045<br /><span>Startup Pitch</span> Competition
            </h1>
            <p className="pc-hero-sub">
              Indonesia&apos;s most prestigious fintech pitch stage. 20 finalists. 3 podium winners. Pitch your vision to 100+ active investors and 1,000+ senior finance leaders at Finance 2045.
            </p>
            <div className="pc-hero-prize">
              <div>
                <div className="pc-hero-prize-value">USD 40K+</div>
              </div>
              <div className="pc-hero-prize-label">Total Prize Pool<br />+ Investor Access</div>
            </div>
            <br />
            <Link href="#apply" className="pc-hero-cta">
              Apply to Pitch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Prizes */}
        <div className="pc-prizes">
          <div className="pc-section-label">Awards</div>
          <h2 className="pc-section-h2">Win More Than <span>Prize Money</span></h2>
          <div className="pc-prizes-grid">
            {prizes.map((p) => (
              <div key={p.rank} className="pc-prize-card" style={{ borderColor: p.colorBorder, background: p.colorDim }}>
                <div className="pc-prize-rank" style={{ color: p.color }}>{p.rank} Place</div>
                <div className="pc-prize-label">{p.label}</div>
                <div className="pc-prize-value" style={{ color: p.color }}>{p.value}</div>
                <ul className="pc-prize-perks">
                  {p.perks.map((perk) => (
                    <li key={perk}>
                      <span className="dot" style={{ background: p.color }} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="pc-timeline">
          <div className="pc-timeline-inner">
            <div className="pc-section-label">Schedule</div>
            <h2 className="pc-section-h2">Competition <span>Timeline</span></h2>
            <div className="pc-timeline-track">
              {timeline.map((t, i) => (
                <div key={t.date} className="pc-tl-item">
                  <div className="pc-tl-dot">{i + 1}</div>
                  <div className="pc-tl-date">{t.date}</div>
                  <div className="pc-tl-label">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Criteria */}
        <div className="pc-criteria">
          <div className="pc-section-label">Judging</div>
          <h2 className="pc-section-h2">How Startups Are <span>Evaluated</span></h2>
          <div className="pc-criteria-grid">
            {criteria.map((c) => (
              <div key={c.title} className="pc-criteria-card">
                <div className="pc-criteria-icon">{c.icon}</div>
                <div className="pc-criteria-title">{c.title}</div>
                <p className="pc-criteria-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility + Form */}
        <div className="pc-apply" id="apply">
          <div className="pc-apply-inner">
            <div>
              <div className="pc-section-label">Eligibility</div>
              <h2 className="pc-section-h2" style={{ marginBottom: 0 }}>Who Can <span>Apply</span></h2>
              <ul className="pc-elig-list">
                {eligibility.map((e) => (
                  <li key={e} className="pc-elig-item">
                    <div className="pc-elig-check">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pc-form-panel">
              <div className="pc-form-title">Apply to Pitch</div>
              <div className="pc-form-sub">Applications reviewed on a rolling basis. Apply early.</div>
              <HubSpotForm formId="3ee2996a-b202-445e-87e7-bc621d8af558" targetId="hs-pitch-application" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
