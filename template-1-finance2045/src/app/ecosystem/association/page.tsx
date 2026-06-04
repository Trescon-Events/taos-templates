"use client";
import Link from "next/link";

const partnerBenefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Agenda Co-Creation",
    desc: "Shape discussion tracks, nominate speakers, and co-chair sessions that directly reflect your members&apos; priorities.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Member Delegate Access",
    desc: "Preferential registration rates and dedicated delegate quota for your member organisations.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Thought Leadership Panel",
    desc: "Host an association-branded session with your own moderator and handpicked panellists on stage.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
    ),
    title: "Joint Communications",
    desc: "Co-branded press releases, joint social media campaigns, and featured placement in Finance 2045 newsletters.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "Regional Credibility",
    desc: "Strengthen your association&apos;s regional presence alongside the most senior finance gathering in Indonesia.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: "Branded Exhibition Space",
    desc: "Dedicated association pavilion or networking table — a home base for your delegation throughout the summit.",
  },
];

const assocTypes = [
  "Banking & Financial Institutions",
  "Insurance & Risk Management",
  "Capital Markets & Investment",
  "Fintech & Digital Finance",
  "Accounting & Audit Bodies",
  "Regulatory & Compliance",
  "Islamic Finance",
  "Sustainable Finance",
  "Venture Capital & PE",
  "Consumer Finance",
];

export default function AssociationEcosystemPage() {
  return (
    <>
      <style>{`
        .asc-page {
          padding-top: 80px;
          min-height: 100vh;
          background: var(--bg-primary);
        }
        .asc-hero {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 72px 40px 64px;
          position: relative;
          overflow: hidden;
        }
        .asc-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 70% at 70% 50%, rgba(0,165,163,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .asc-hero-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 2; }
        .asc-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 24px;
        }
        .asc-breadcrumb a { color: var(--teal); text-decoration: none; }
        .asc-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 18px;
        }
        .asc-eyebrow::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .asc-hero-h1 {
          font-size: clamp(30px, 4.5vw, 54px);
          font-weight: 900; letter-spacing: -0.03em; color: #fff;
          line-height: 1.1; margin-bottom: 20px; max-width: 700px;
        }
        .asc-hero-h1 span { color: var(--teal); }
        .asc-hero-sub { font-size: 16px; color: var(--text-body); line-height: 1.75; max-width: 580px; margin-bottom: 36px; }
        .asc-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px; text-decoration: none; transition: background 0.2s;
        }
        .asc-hero-cta:hover { background: var(--teal-light); }

        /* Benefits */
        .asc-benefits { padding: 80px 40px; max-width: 1240px; margin: 0 auto; }
        .asc-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .asc-section-label::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .asc-section-h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 900; letter-spacing: -0.03em; color: #fff; margin-bottom: 48px; }
        .asc-section-h2 span { color: var(--teal); }
        .asc-benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .asc-benefit-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-dark);
          padding: 28px 24px;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .asc-benefit-card:hover { border-color: var(--border); box-shadow: 0 0 24px rgba(0,165,163,0.12); }
        .asc-benefit-icon {
          width: 44px; height: 44px;
          background: var(--teal-dim); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal); margin-bottom: 16px;
        }
        .asc-benefit-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .asc-benefit-desc { font-size: 13px; color: var(--text-body); line-height: 1.65; }

        /* Sectors */
        .asc-sectors {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-dark);
          border-bottom: 1px solid var(--border-dark);
          padding: 72px 40px;
        }
        .asc-sectors-inner { max-width: 1240px; margin: 0 auto; }
        .asc-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 40px; }
        .asc-chip {
          font-size: 12px; font-weight: 600;
          padding: 8px 18px;
          border: 1px solid var(--border);
          color: rgba(255,255,255,0.80);
          background: var(--bg-card);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .asc-chip:hover { border-color: var(--teal); color: var(--teal); background: var(--teal-dim); }

        /* CTA */
        .asc-cta { padding: 72px 40px; text-align: center; }
        .asc-cta h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 900; color: #fff; margin-bottom: 12px; letter-spacing: -0.02em; }
        .asc-cta h2 span { color: var(--teal); }
        .asc-cta p { font-size: 15px; color: var(--text-body); margin-bottom: 32px; }
        .asc-cta-btns { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .asc-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px; text-decoration: none; transition: background 0.2s;
        }
        .asc-btn-primary:hover { background: var(--teal-light); }
        .asc-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1.5px solid rgba(255,255,255,0.3); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 28px; text-decoration: none; transition: border-color 0.2s;
        }
        .asc-btn-outline:hover { border-color: var(--teal); color: var(--teal); }

        @media (max-width: 1024px) { .asc-benefits-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) {
          .asc-hero { padding: 60px 20px 52px; }
          .asc-benefits { padding: 60px 20px; }
          .asc-benefits-grid { grid-template-columns: 1fr; }
          .asc-sectors { padding: 56px 20px; }
          .asc-cta { padding: 52px 20px; }
        }
      `}</style>

      <div className="asc-page">

        <div className="asc-hero">
          <div className="asc-hero-inner">
            <div className="asc-breadcrumb">
              <Link href="/ecosystem">Ecosystem</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              <span>Association Partners</span>
            </div>
            <div className="asc-eyebrow">Association Partnership</div>
            <h1 className="asc-hero-h1">
              Amplify Your Association&apos;s <span>Voice</span> at Finance 2045
            </h1>
            <p className="asc-hero-sub">
              Finance 2045 invites leading industry associations to co-shape the agenda, bring member delegations, and drive meaningful conversations that strengthen Indonesia&apos;s financial ecosystem.
            </p>
            <Link href="/collaborate?tab=association" className="asc-hero-cta">
              Apply as Association Partner
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="asc-benefits">
          <div className="asc-section-label">Partnership Benefits</div>
          <h2 className="asc-section-h2">What Your <span>Association</span> Gets</h2>
          <div className="asc-benefits-grid">
            {partnerBenefits.map((b) => (
              <div key={b.title} className="asc-benefit-card">
                <div className="asc-benefit-icon">{b.icon}</div>
                <div className="asc-benefit-title">{b.title}</div>
                <p className="asc-benefit-desc" dangerouslySetInnerHTML={{ __html: b.desc }} />
              </div>
            ))}
          </div>
        </div>

        {/* Sectors */}
        <div className="asc-sectors">
          <div className="asc-sectors-inner">
            <div className="asc-section-label">Who We Welcome</div>
            <h2 className="asc-section-h2">Association <span>Sectors</span></h2>
            <div className="asc-chips">
              {assocTypes.map((a) => (
                <div key={a} className="asc-chip">{a}</div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="asc-cta">
          <h2>Become an <span>Association Partner</span></h2>
          <p>Join the growing community of associations shaping Indonesia&apos;s financial future at Finance 2045.</p>
          <div className="asc-cta-btns">
            <Link href="/collaborate?tab=association" className="asc-btn-primary">
              Apply Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/enquire" className="asc-btn-outline">
              Enquire
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
