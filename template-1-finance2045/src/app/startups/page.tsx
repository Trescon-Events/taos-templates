import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Startup Ecosystem | Finance 2045 — Indonesia's Next Fintech Unicorns",
  description: "Finance 2045 is the launchpad for Indonesia's next fintech unicorns. Connect with 100+ global investors, enter the FinTech World Cup Qualifiers, and secure your pod in the Startup Innovation Precinct.",
};

const ADVANTAGES = [
  {
    title: "Unfiltered Access",
    body: "Connect directly with top-tier venture capitalists and angel investors. Pitch your ideas face-to-face to the decision-makers who are actively looking to fund the next big breakthrough in Southeast Asia.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Skip the Wait",
    body: "Don't spend months chasing emails, navigating gatekeepers, and trying to secure meetings. Condense your networking, fundraising, and customer acquisition pipeline into 48 highly productive hours.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Relevant Engagements",
    body: "Get your technology in front of the right people. Engage with government leaders, regulators, and enterprise executives who actually hold the power to sign contracts and launch pilot programs with your startup.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const VALUE_PROPS = [
  {
    title: "The Fintech World Cup Qualifiers",
    body: "Startups exhibiting at Finance 2045 gain automatic, direct entry into the official regional qualifiers. Pitch live on stage to a panel of global VCs for the ultimate chance to compete at the Dubai FinTech Summit 2026 Grand Finale.",
    img: "/startup-f45-1.jpg",
    imgAlt: "Founders pitching at Finance 2045",
  },
  {
    title: "100+ Global Investors",
    body: "Bypass the noise. Showcase your breakthrough innovations and build strategic connections with a curated, high-level list of over 100 venture capital, private equity, and institutional funds actively deploying capital in the region.",
    img: "/startup-f45-2.jpg",
    imgAlt: "Investor meetings at Finance 2045",
  },
  {
    title: "The Startup Innovation Precinct",
    body: "Command your presence in the beating heart of Finance 2045. Secure a dedicated 4 SQM exhibition pod designed for high-impact interactions. Run live product demos, host pre-scheduled investor meetings, and scale your brand with absolute confidence.",
    img: "/startup-f45-3.jpg",
    imgAlt: "Startup exhibition pods at Finance 2045",
  },
];

export default function StartupsPage() {
  return (
    <>
      <style>{`
        .st-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }

        /* ── Hero ── */
        .st-hero {
          position: relative; overflow: hidden; text-align: center;
          padding: 80px 40px 64px; border-bottom: 1px solid var(--border);
        }
        .st-hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 55% at 50% -10%, rgba(233,194,104,0.13), transparent 65%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(0,165,163,0.05), transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(0,165,163,0.04), transparent 60%);
        }
        /* Data grid overlay */
        .st-hero-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%);
        }
        .st-eyebrow {
          position: relative; display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 18px;
        }
        .st-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); }
        .st-hero h1 {
          position: relative; font-size: clamp(32px, 4.5vw, 54px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; margin-bottom: 18px; line-height: 1.08;
        }
        .st-hero-sub {
          position: relative; font-size: clamp(14px, 1.4vw, 17px); color: var(--text-body);
          max-width: 620px; margin: 0 auto 44px; line-height: 1.82;
        }
        .st-hero-cta {
          position: relative; display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #1F2733; font-size: 12px; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase; padding: 16px 36px;
          text-decoration: none; transition: background 0.2s, transform 0.15s;
        }
        .st-hero-cta:hover { background: #f5d47c; transform: translateY(-1px); }

        /* ── Advantage ── */
        .st-advantage {
          background: var(--bg-surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 96px 40px;
        }
        .st-advantage-inner { max-width: 1100px; margin: 0 auto; }
        .st-advantage-header { text-align: center; margin-bottom: 60px; }
        .st-adv-kicker {
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 14px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .st-adv-kicker::before, .st-adv-kicker::after { content: ''; width: 20px; height: 1px; background: var(--teal); }
        .st-adv-h {
          font-size: clamp(26px, 3vw, 42px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; line-height: 1.1;
        }
        .st-adv-h span { color: var(--gold); }
        .st-adv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .st-adv-card {
          background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.07);
          padding: 40px 32px; text-align: center;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .st-adv-card::after {
          content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 0; height: 2px; background: var(--gold);
          transition: width 0.35s ease;
        }
        .st-adv-card:hover { border-color: rgba(233,194,104,0.30); box-shadow: 0 8px 32px rgba(233,194,104,0.08); transform: translateY(-3px); }
        .st-adv-card:hover::after { width: 60%; }
        .st-adv-icon {
          width: 56px; height: 56px; border: 1px solid rgba(233,194,104,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); margin: 0 auto 20px;
          transition: background 0.25s, border-color 0.25s;
        }
        .st-adv-card:hover .st-adv-icon { background: rgba(233,194,104,0.07); border-color: rgba(233,194,104,0.55); }
        .st-adv-title { font-size: 17px; font-weight: 900; color: #fff; margin-bottom: 14px; }
        .st-adv-body { font-size: 13px; color: var(--text-body); line-height: 1.75; }

        /* ── Value Props ── */
        .st-value { max-width: 1100px; margin: 0 auto; padding: 96px 40px; }
        .st-value-header { text-align: center; margin-bottom: 72px; }
        .st-val-kicker {
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 14px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .st-val-kicker::before, .st-val-kicker::after { content: ''; width: 20px; height: 1px; background: var(--teal); }
        .st-val-h {
          font-size: clamp(26px, 3vw, 42px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; line-height: 1.1;
        }
        .st-val-h span { color: var(--gold); }
        .st-val-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
          align-items: center; margin-bottom: 72px;
        }
        .st-val-row:last-child { margin-bottom: 0; }
        .st-val-row.reverse { direction: rtl; }
        .st-val-row.reverse > * { direction: ltr; }
        .st-val-img {
          position: relative; aspect-ratio: 4/3; border: 1px solid var(--border); overflow: hidden;
        }
        .st-val-img img { transition: transform 0.6s ease; }
        .st-val-img:hover img { transform: scale(1.04); }
        .st-val-num {
          font-size: 56px; font-weight: 900; line-height: 1;
          color: rgba(233,194,104,0.10); margin-bottom: 12px; letter-spacing: -0.04em;
        }
        .st-val-title { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 16px; line-height: 1.2; }
        .st-val-body { font-size: 15px; color: var(--text-body); line-height: 1.82; }

        /* ── Final CTA ── */
        .st-final {
          position: relative; overflow: hidden;
          border-top: 1px solid var(--border);
          background: #0a0e15;
          padding: 100px 40px;
          text-align: center;
        }
        .st-final-bg {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(233,194,104,0.10), transparent 65%);
        }
        .st-final-inner { position: relative; max-width: 700px; margin: 0 auto; }
        .st-final-kicker {
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 20px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .st-final-kicker::before, .st-final-kicker::after { content: ''; width: 20px; height: 1px; background: var(--gold); }
        .st-final h2 {
          font-size: clamp(30px, 4vw, 52px); font-weight: 900;
          letter-spacing: -0.035em; color: #fff; line-height: 1.06; margin-bottom: 18px;
        }
        .st-final h2 span { color: var(--gold); }
        .st-final p { font-size: 15px; color: var(--text-body); line-height: 1.80; margin-bottom: 48px; }
        .st-final-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #1F2733; padding: 18px 44px;
          font-size: 13px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .st-final-btn:hover { background: #f5d47c; transform: translateY(-2px); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .st-adv-grid { grid-template-columns: 1fr; }
          .st-val-row { grid-template-columns: 1fr; gap: 40px; }
          .st-val-row.reverse { direction: ltr; }
          .st-hero { padding: 72px 24px 60px; }
          .st-advantage { padding: 64px 24px; }
          .st-value { padding: 64px 24px; }
          .st-final { padding: 72px 24px; }
        }
        @media (max-width: 600px) {
          .st-adv-card { text-align: left; }
          .st-adv-icon { margin-left: 0; }
        }
      `}</style>

      <div className="st-page">

        {/* Hero */}
        <div className="st-hero">
          <div className="st-hero-bg" />
          <div className="st-hero-grid" />
          <div className="st-eyebrow">
            <span className="st-eyebrow-dot" />
            The Startup Ecosystem
          </div>
          <h1>The <span style={{ color: "var(--gold)" }}>Startup Ecosystem</span></h1>
          <p className="st-hero-sub">
            Finance 2045 isn&apos;t just an exhibition; it is a catalyst. Built from the ground up with founders in mind,
            this is where disruptive technology meets the capital and influence required to scale it across Golden Indonesia and beyond.
          </p>
          <Link href="/attend/exhibit" className="st-hero-cta">
            Book Your Startup Space Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {/* The Advantage */}
        <div className="st-advantage">
          <div className="st-advantage-inner">
            <div className="st-advantage-header">
              <div className="st-adv-kicker">The Advantage</div>
              <h2 className="st-adv-h">Compress Years of Growth into <span>Two Days</span></h2>
            </div>
            <div className="st-adv-grid">
              {ADVANTAGES.map((a, i) => (
                <div key={i} className="st-adv-card">
                  <div className="st-adv-icon">{a.icon}</div>
                  <div className="st-adv-title">{a.title}</div>
                  <div className="st-adv-body">{a.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Value Props */}
        <div className="st-value">
          <div className="st-value-header">
            <div className="st-val-kicker">The Opportunity</div>
            <h2 className="st-val-h">The Core <span>Value Proposition</span></h2>
          </div>
          {VALUE_PROPS.map((v, i) => (
            <div key={i} className={`st-val-row${i % 2 === 1 ? " reverse" : ""}`}>
              <div className="st-val-img">
                <Image src={v.img} alt={v.imgAlt} fill sizes="(max-width: 900px) 100vw, 50vw" quality={90} style={{ objectFit: "cover" }} />
              </div>
              <div>
                <div className="st-val-num">0{i + 1}</div>
                <div className="st-val-title">{v.title}</div>
                <div className="st-val-body">{v.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="st-final">
          <div className="st-final-bg" />
          <div className="st-final-inner">
            <div className="st-final-kicker">Your Stage Awaits</div>
            <h2>Ready to Scale Your <span>Startup?</span></h2>
            <p>
              Space in the Startup Innovation Precinct and slots for the FinTech World Cup Qualifiers are strictly limited.
              Secure your pod and put your company in front of the capital shaping 2045.
            </p>
            <Link href="/attend/exhibit" className="st-final-btn">
              Book Your Space Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
