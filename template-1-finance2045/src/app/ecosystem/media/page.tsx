"use client";
import Link from "next/link";

const mediaPerks = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
        <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
        <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
        <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
      </svg>
    ),
    title: "Exclusive Content Access",
    desc: "Pre-summit speaker briefings, embargo content packages, and first access to research reports released at Finance 2045.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Speaker Interview Access",
    desc: "Dedicated interview slots with 40+ keynote speakers and panellists — access unavailable to general attendees.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "Global Brand Co-Branding",
    desc: "Your logo and editorial brand alongside Finance 2045 across digital, print, and broadcast — reaching 100,000+ readers.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: "Networking & Press Lounge",
    desc: "Dedicated press lounge with charging stations, private interview booths, and direct access to the summit floor.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Audience & Distribution Synergy",
    desc: "Joint newsletters, social amplification, and cross-promotion to our combined audience of 50,000+ finance professionals.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Official Event Media Badge",
    desc: "Certified Finance 2045 Official Media Partner status for editorial use — recognisable across Indonesia&apos;s finance sector.",
  },
];

const mediaTypes = [
  { label: "Business Publications", desc: "Financial newspapers, finance magazines, trade publications" },
  { label: "Digital & Online Media", desc: "News portals, finance blogs, newsletters, podcasts" },
  { label: "Broadcast Media", desc: "TV, radio, streaming platforms covering business and finance" },
  { label: "Research Firms", desc: "Financial research houses, analyst groups, think tanks" },
  { label: "Industry Associations", desc: "Association publications and membership newsletters" },
];

export default function MediaEcosystemPage() {
  return (
    <>
      <style>{`
        .med-page {
          padding-top: 80px;
          min-height: 100vh;
          background: var(--bg-primary);
        }
        .med-hero {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 72px 40px 64px;
          position: relative;
          overflow: hidden;
        }
        .med-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 70% at 72% 45%, rgba(0,165,163,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .med-hero-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 2; }
        .med-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 24px;
        }
        .med-breadcrumb a { color: var(--teal); text-decoration: none; }
        .med-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 18px;
        }
        .med-eyebrow::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .med-hero-h1 {
          font-size: clamp(30px, 4.5vw, 54px);
          font-weight: 900; letter-spacing: -0.03em; color: #fff;
          line-height: 1.1; margin-bottom: 20px; max-width: 700px;
        }
        .med-hero-h1 span { color: var(--teal); }
        .med-hero-sub { font-size: 16px; color: var(--text-body); line-height: 1.75; max-width: 580px; margin-bottom: 36px; }
        .med-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px; text-decoration: none; transition: background 0.2s;
        }
        .med-hero-cta:hover { background: var(--teal-light); }

        /* Perks */
        .med-perks { padding: 80px 40px; max-width: 1240px; margin: 0 auto; }
        .med-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .med-section-label::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .med-section-h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 900; letter-spacing: -0.03em; color: #fff; margin-bottom: 48px; }
        .med-section-h2 span { color: var(--teal); }
        .med-perks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .med-perk-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-dark);
          padding: 28px 24px;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .med-perk-card:hover { border-color: var(--border); box-shadow: 0 0 24px rgba(0,165,163,0.12); }
        .med-perk-icon {
          width: 44px; height: 44px;
          background: var(--teal-dim); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal); margin-bottom: 16px;
        }
        .med-perk-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .med-perk-desc { font-size: 13px; color: var(--text-body); line-height: 1.65; }

        /* Who */
        .med-who {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-dark);
          border-bottom: 1px solid var(--border-dark);
          padding: 80px 40px;
        }
        .med-who-inner { max-width: 1240px; margin: 0 auto; }
        .med-who-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
        .med-who-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-dark);
          padding: 24px;
        }
        .med-who-label { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .med-who-desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

        /* CTA */
        .med-cta { padding: 72px 40px; text-align: center; }
        .med-cta h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 900; color: #fff; margin-bottom: 12px; letter-spacing: -0.02em; }
        .med-cta h2 span { color: var(--teal); }
        .med-cta p { font-size: 15px; color: var(--text-body); margin-bottom: 32px; }
        .med-cta-btns { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .med-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px; text-decoration: none; transition: background 0.2s;
        }
        .med-btn-primary:hover { background: var(--teal-light); }
        .med-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1.5px solid rgba(255,255,255,0.3); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 28px; text-decoration: none; transition: border-color 0.2s;
        }
        .med-btn-outline:hover { border-color: var(--teal); color: var(--teal); }

        @media (max-width: 1024px) { .med-perks-grid { grid-template-columns: repeat(2, 1fr); } .med-who-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) {
          .med-hero { padding: 60px 20px 52px; }
          .med-perks { padding: 60px 20px; }
          .med-perks-grid { grid-template-columns: 1fr; }
          .med-who { padding: 60px 20px; }
          .med-who-grid { grid-template-columns: 1fr; }
          .med-cta { padding: 52px 20px; }
        }
      `}</style>

      <div className="med-page">

        <div className="med-hero">
          <div className="med-hero-inner">
            <div className="med-breadcrumb">
              <Link href="/ecosystem">Ecosystem</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              <span>Media Partners</span>
            </div>
            <div className="med-eyebrow">Media Partnership</div>
            <h1 className="med-hero-h1">
              Be the <span>Voice</span> of Southeast Asia&apos;s Finance Transformation
            </h1>
            <p className="med-hero-sub">
              Finance 2045 Official Media Partners gain exclusive access to speakers, content, and an audience of 1,000+ senior finance professionals — all while co-branding with Southeast Asia&apos;s leading finance summit.
            </p>
            <Link href="/collaborate?tab=media" className="med-hero-cta">
              Apply as Media Partner
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Perks */}
        <div className="med-perks">
          <div className="med-section-label">Media Benefits</div>
          <h2 className="med-section-h2">What You Get as an <span>Official Media Partner</span></h2>
          <div className="med-perks-grid">
            {mediaPerks.map((p) => (
              <div key={p.title} className="med-perk-card">
                <div className="med-perk-icon">{p.icon}</div>
                <div className="med-perk-title">{p.title}</div>
                <p className="med-perk-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who qualifies */}
        <div className="med-who">
          <div className="med-who-inner">
            <div className="med-section-label">Who Can Apply</div>
            <h2 className="med-section-h2">Eligible <span>Media Categories</span></h2>
            <div className="med-who-grid">
              {mediaTypes.map((m) => (
                <div key={m.label} className="med-who-card">
                  <div className="med-who-label">{m.label}</div>
                  <div className="med-who-desc">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="med-cta">
          <h2>Apply for <span>Media Accreditation</span></h2>
          <p>Limited media partner slots available — apply early to secure your position.</p>
          <div className="med-cta-btns">
            <Link href="/collaborate?tab=media" className="med-btn-primary">
              Apply Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/enquire" className="med-btn-outline">
              General Enquiry
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
