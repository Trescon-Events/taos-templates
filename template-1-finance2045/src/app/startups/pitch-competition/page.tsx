import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "FinTech World Cup 2026 — Indonesia Qualifiers | Finance 2045",
  description: "Finance 2045 hosts the FinTech World Cup 2026 Indonesia Qualifiers. Pitch live to global VCs, compete for international funding, and earn your spot at the Dubai FinTech Summit Grand Finale.",
};

const BREAKTHROUGHS = [
  { label: "Potential Funding", desc: "Direct access to deployable capital." },
  { label: "Mentorship", desc: "Guidance from the industry's heaviest hitters." },
  { label: "Networking & Partnership", desc: "Forge alliances that scale your product." },
  { label: "Global Exposure", desc: "Put your brand on the international map." },
  { label: "Startup Development", desc: "Accelerate your product roadmap and market fit." },
];

const STAKES = [
  {
    n: "01",
    title: "The Pitch",
    body: "Deliver your vision live to an elite judging panel. You will be presenting to over 100 global venture capitalists, angel investors, private equity firms, VC funds, HNIs, and institutional investors.",
  },
  {
    n: "02",
    title: "The Capital",
    body: "This isn't just about trophies. Compete to secure immediate regional funding, negotiate term sheets, and unlock strategic mentorship from the financial industry's leading minds.",
  },
  {
    n: "03",
    title: "The Global Finale",
    body: "The ultimate prize. The regional champion wins an exclusive, guaranteed spot to fly to the UAE and compete for the global title at the Dubai FinTech Summit 2026.",
  },
];

const ECOSYSTEM = [
  {
    audience: "For Start-ups",
    body: "Elevate your FinTech innovation on the global stage. Connect with mentors and industry leaders, build strategic partnerships, gain actionable insights from investment experts, and compete for unmatched global recognition.",
    img: "/startup-f45-4.jpg",
    imgAlt: "Founder speaking at Finance 2045",
  },
  {
    audience: "For Enterprises & Governments",
    body: "Explore the frontier of FinTech innovation. Connect with global pioneers and engage in strategic collaborations. Meet the start-ups, industry leaders, and policymakers who are driving macroeconomic growth and technological transformation.",
    img: "/fwc-3.webp",
    imgAlt: "Enterprise executives at Finance 2045",
  },
  {
    audience: "For Investors",
    body: "Discover highly curated, future FinTech disruptors. Access exclusive, vetted deal flow, expand your international network, and directly influence the transformation of the financial industry by backing groundbreaking founders.",
    img: "/fwc-4.webp",
    imgAlt: "Investors reviewing data at Finance 2045",
  },
];

const JOURNEY = [
  { step: "Step 1", title: "The Indonesia Qualifiers", desc: "Hosted exclusively at Finance 2045 in Jakarta. The nation's top disruptors battle it out on stage for regional supremacy." },
  { step: "Step 2", title: "The Global Circuit", desc: "The FinTech World Cup is a worldwide phenomenon. Regional winners are fiercely selected from multiple qualifiers held globally throughout the year." },
  { step: "Step 3", title: "The Grand Finale", desc: "The regional champions converge. The Indonesia Qualifier winner will step onto the global stage at the Dubai FinTech Summit 2026 to compete for the ultimate crown." },
];

export default function PitchCompetitionPage() {
  return (
    <>
      <style>{`
        .pc-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }

        /* ── Hero ── */
        .pc-hero { position: relative; overflow: hidden; border-bottom: 1px solid var(--border); text-align: center; }
        .pc-hero-img { position: absolute; inset: 0; }
        .pc-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(15,20,28,0.78) 0%, rgba(15,20,28,0.92) 100%);
        }
        /* Spotlight effect */
        .pc-hero-spotlight {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(233,194,104,0.12), transparent 65%);
        }
        .pc-hero-inner {
          position: relative; z-index: 2;
          max-width: 860px; margin: 0 auto; padding: 60px 40px 88px;
        }
        /* FWC Logo */
        .pc-fwc-logo {
          display: flex; justify-content: center; margin-bottom: 36px;
        }
        .pc-fwc-logo img { height: 160px; width: auto; object-fit: contain; filter: drop-shadow(0 0 32px rgba(233,194,104,0.45)); }
        .pc-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 22px;
          border: 1px solid rgba(233,194,104,0.30); padding: 6px 16px;
        }
        .pc-hero h1 {
          font-size: clamp(30px, 5.5vw, 64px); font-weight: 900;
          letter-spacing: -0.04em; color: #fff; margin-bottom: 12px; line-height: 1.02;
        }
        .pc-hero h1 span { color: var(--gold); }
        .pc-hero-sub-head {
          font-size: clamp(16px, 1.8vw, 22px); font-weight: 700;
          color: rgba(255,255,255,0.85); margin-bottom: 24px;
        }
        .pc-hero-sub {
          font-size: clamp(14px, 1.4vw, 17px); color: var(--text-body);
          max-width: 660px; margin: 0 auto 44px; line-height: 1.82;
        }
        .pc-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #1F2733; font-size: 12px; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase; padding: 16px 36px;
          text-decoration: none; transition: background 0.2s, transform 0.15s;
        }
        .pc-hero-cta:hover { background: #f5d47c; transform: translateY(-1px); }

        /* ── Breakthroughs ── */
        .pc-breakthroughs {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 64px 40px;
        }
        .pc-breakthroughs-inner { max-width: 1100px; margin: 0 auto; }
        .pc-bt-kicker {
          text-align: center; font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 40px;
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .pc-bt-kicker::before, .pc-bt-kicker::after { content: ''; flex: 0 0 24px; height: 1px; background: var(--teal); }
        .pc-bt-grid { display: flex; gap: 0; border: 1px solid var(--border); }
        .pc-bt-item {
          flex: 1; padding: 32px 24px; border-right: 1px solid var(--border);
          text-align: center; transition: background 0.25s;
          position: relative; overflow: hidden;
        }
        .pc-bt-item:last-child { border-right: none; }
        .pc-bt-item::before {
          content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 0; height: 2px; background: var(--gold);
          transition: width 0.35s ease;
        }
        .pc-bt-item:hover { background: rgba(233,194,104,0.03); }
        .pc-bt-item:hover::before { width: 60%; }
        .pc-bt-label {
          font-size: 12px; font-weight: 800; color: #fff; margin-bottom: 6px; line-height: 1.3;
        }
        .pc-bt-desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

        /* ── Stakes ── */
        .pc-stakes { max-width: 1100px; margin: 0 auto; padding: 96px 40px; }
        .pc-stakes-header { text-align: center; margin-bottom: 60px; }
        .pc-stakes-kicker {
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 14px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .pc-stakes-kicker::before, .pc-stakes-kicker::after { content: ''; width: 20px; height: 1px; background: var(--teal); }
        .pc-stakes-h {
          font-size: clamp(26px, 3vw, 42px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; line-height: 1.1;
        }
        .pc-stakes-h span { color: var(--gold); }
        .pc-stakes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .pc-stake-card {
          background: var(--bg-card); border: 1px solid rgba(255,255,255,0.07);
          padding: 44px 36px; position: relative; overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
        }
        .pc-stake-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .pc-stake-card:hover { border-color: rgba(233,194,104,0.30); box-shadow: 0 8px 32px rgba(233,194,104,0.09); transform: translateY(-4px); }
        .pc-stake-card:hover::before { opacity: 1; }
        .pc-stake-n {
          font-size: 60px; font-weight: 900; line-height: 1;
          color: rgba(233,194,104,0.10); margin-bottom: 20px; letter-spacing: -0.04em;
        }
        .pc-stake-title { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 14px; }
        .pc-stake-body { font-size: 14px; color: var(--text-body); line-height: 1.78; }

        /* ── Ecosystem ── */
        .pc-ecosystem {
          background: var(--bg-surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 96px 40px;
        }
        .pc-ecosystem-inner { max-width: 1100px; margin: 0 auto; }
        .pc-eco-header { text-align: center; margin-bottom: 60px; }
        .pc-eco-kicker {
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 14px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .pc-eco-kicker::before, .pc-eco-kicker::after { content: ''; width: 20px; height: 1px; background: var(--teal); }
        .pc-eco-h {
          font-size: clamp(26px, 3vw, 42px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; line-height: 1.1;
        }
        .pc-eco-h span { color: var(--gold); }
        .pc-eco-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .pc-eco-panel {
          position: relative; overflow: hidden; aspect-ratio: 3/4;
          border: 1px solid var(--border);
          cursor: default;
        }
        .pc-eco-panel img { transition: opacity 0.35s; }
        .pc-eco-panel:hover img { opacity: 0.55; }
        .pc-eco-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(15,20,28,0.25) 0%, rgba(15,20,28,0.85) 55%, rgba(15,20,28,0.97) 100%);
          z-index: 1; transition: background 0.35s;
        }
        .pc-eco-panel:hover .pc-eco-overlay {
          background: linear-gradient(180deg, rgba(15,20,28,0.45) 0%, rgba(15,20,28,0.88) 50%, rgba(15,20,28,0.98) 100%);
        }
        .pc-eco-content {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
          padding: 32px 28px; transition: transform 0.3s ease;
        }
        .pc-eco-audience {
          font-size: 10px; font-weight: 800; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 10px;
        }
        .pc-eco-body { font-size: 13px; color: rgba(255,255,255,0.80); line-height: 1.70; }

        /* ── Journey ── */
        .pc-journey { max-width: 1100px; margin: 0 auto; padding: 96px 40px; }
        .pc-journey-header { text-align: center; margin-bottom: 64px; }
        .pc-journey-kicker {
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 14px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .pc-journey-kicker::before, .pc-journey-kicker::after { content: ''; width: 20px; height: 1px; background: var(--teal); }
        .pc-journey-h {
          font-size: clamp(26px, 3vw, 42px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; line-height: 1.1;
        }
        .pc-journey-h span { color: var(--gold); }
        .pc-journey-track { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
        .pc-journey-track::before {
          content: ''; position: absolute; top: 28px; left: calc(100% / 6);
          right: calc(100% / 6); height: 2px;
          background: linear-gradient(90deg, var(--teal), var(--gold));
          z-index: 0;
        }
        .pc-journey-step { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 24px; position: relative; z-index: 1; }
        .pc-journey-dot {
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--bg-primary); border: 2px solid var(--teal);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 900; color: var(--teal);
          margin-bottom: 24px; flex-shrink: 0;
          transition: border-color 0.3s, color 0.3s, box-shadow 0.3s;
        }
        .pc-journey-step:last-child .pc-journey-dot { border-color: var(--gold); color: var(--gold); }
        .pc-journey-step:hover .pc-journey-dot { box-shadow: 0 0 20px rgba(233,194,104,0.25); }
        .pc-journey-step-label { font-size: 10px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: var(--teal); margin-bottom: 8px; }
        .pc-journey-step:last-child .pc-journey-step-label { color: var(--gold); }
        .pc-journey-title { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 10px; }
        .pc-journey-desc { font-size: 13px; color: var(--text-body); line-height: 1.70; }

        /* ── Final CTA ── */
        .pc-final {
          position: relative; overflow: hidden;
          border-top: 1px solid var(--border);
          background: #080c12;
          padding: 100px 40px; text-align: center;
        }
        .pc-final-bg {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 65% at 50% 0%, rgba(233,194,104,0.12), transparent 65%);
        }
        .pc-final-inner { position: relative; max-width: 680px; margin: 0 auto; }
        .pc-final-kicker {
          font-size: 10px; font-weight: 800; letter-spacing: 0.24em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 20px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .pc-final-kicker::before, .pc-final-kicker::after { content: ''; width: 20px; height: 1px; background: var(--gold); }
        .pc-final h2 {
          font-size: clamp(30px, 4.5vw, 56px); font-weight: 900;
          letter-spacing: -0.04em; color: #fff; line-height: 1.04; margin-bottom: 20px;
        }
        .pc-final h2 span { color: var(--gold); }
        .pc-final p { font-size: 15px; color: var(--text-body); line-height: 1.82; margin-bottom: 52px; }
        .pc-final-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .pc-final-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #1F2733; padding: 17px 40px;
          font-size: 12px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .pc-final-btn-primary:hover { background: #f5d47c; transform: translateY(-2px); }
        .pc-final-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid rgba(233,194,104,0.45); color: var(--gold); padding: 17px 40px;
          font-size: 12px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .pc-final-btn-secondary:hover { background: rgba(233,194,104,0.06); border-color: rgba(233,194,104,0.7); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .pc-hero-inner { padding: 52px 24px 72px; }
          .pc-fwc-logo img { height: 100px; }
          .pc-bt-grid { flex-direction: column; }
          .pc-bt-item { border-right: none; border-bottom: 1px solid var(--border); }
          .pc-bt-item:last-child { border-bottom: none; }
          .pc-stakes-grid { grid-template-columns: 1fr; }
          .pc-eco-grid { grid-template-columns: 1fr; }
          .pc-eco-panel { aspect-ratio: 16/9; }
          .pc-journey-track { grid-template-columns: 1fr; gap: 32px; }
          .pc-journey-track::before { display: none; }
          .pc-journey-step { flex-direction: row; text-align: left; align-items: flex-start; gap: 24px; }
          .pc-journey-dot { flex-shrink: 0; }
          .pc-breakthroughs { padding: 56px 24px; }
          .pc-stakes { padding: 64px 24px; }
          .pc-ecosystem { padding: 64px 24px; }
          .pc-journey { padding: 64px 24px; }
          .pc-final { padding: 72px 24px; }
        }
        @media (max-width: 600px) {
          .pc-final-btns { flex-direction: column; align-items: center; }
          .pc-final-btn-primary, .pc-final-btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="pc-page">

        {/* Hero */}
        <div className="pc-hero">
          <div className="pc-hero-img">
            <Image src="/fwc-bg.webp" alt="FinTech World Cup stage" fill sizes="100vw" quality={90} style={{ objectFit: "cover", objectPosition: "center 20%", opacity: 0.4 }} priority />
          </div>
          <div className="pc-hero-overlay" />
          <div className="pc-hero-spotlight" />
          <div className="pc-hero-inner">
            <div className="pc-fwc-logo">
              <Image src="/fwc-logo-official.png" alt="FinTech World Cup" width={400} height={160} style={{ height: 160, width: "auto", objectFit: "contain" }} />
            </div>
            <p className="pc-hero-sub">
              Finance 2045 is proud to host the FinTech World Cup 2026 Indonesia Qualifiers in Jakarta.
              This is where the region&apos;s most disruptive startups take the stage to pitch live to global venture
              partners — competing for international funding, elite mentorship, and a coveted spot in the grand finale
              at the Dubai FinTech Summit.
            </p>
            <Link href="/fintech-worldcup/apply" className="pc-hero-cta">
              Apply Now to Pitch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Fostering Breakthroughs */}
        <div className="pc-breakthroughs">
          <div className="pc-breakthroughs-inner">
            <div className="pc-bt-kicker">Fostering Breakthroughs in FinTech</div>
            <div className="pc-bt-grid">
              {BREAKTHROUGHS.map((b) => (
                <div key={b.label} className="pc-bt-item">
                  <div className="pc-bt-label">{b.label}</div>
                  <div className="pc-bt-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Stakes */}
        <div className="pc-stakes">
          <div className="pc-stakes-header">
            <div className="pc-stakes-kicker">The Arena</div>
            <h2 className="pc-stakes-h">The Stakes Have Never <span>Been Higher</span></h2>
          </div>
          <div className="pc-stakes-grid">
            {STAKES.map((s) => (
              <div key={s.n} className="pc-stake-card">
                <div className="pc-stake-n">{s.n}</div>
                <div className="pc-stake-title">{s.title}</div>
                <div className="pc-stake-body">{s.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Attend — Ecosystem */}
        <div className="pc-ecosystem">
          <div className="pc-ecosystem-inner">
            <div className="pc-eco-header">
              <div className="pc-eco-kicker">The Ecosystem</div>
              <h2 className="pc-eco-h">Why You Need to <span>Be in the Room</span></h2>
            </div>
            <div className="pc-eco-grid">
              {ECOSYSTEM.map((e) => (
                <div key={e.audience} className="pc-eco-panel">
                  <Image src={e.img} alt={e.imgAlt} fill sizes="(max-width: 900px) 100vw, 33vw" quality={90} style={{ objectFit: "cover" }} />
                  <div className="pc-eco-overlay" />
                  <div className="pc-eco-content">
                    <div className="pc-eco-audience">{e.audience}</div>
                    <div className="pc-eco-body">{e.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Journey */}
        <div className="pc-journey">
          <div className="pc-journey-header">
            <div className="pc-journey-kicker">The Journey</div>
            <h2 className="pc-journey-h">The Road to the <span>Grand Finale</span></h2>
          </div>
          <div className="pc-journey-track">
            {JOURNEY.map((j, i) => (
              <div key={i} className="pc-journey-step">
                <div className="pc-journey-dot">{i + 1}</div>
                <div>
                  <div className="pc-journey-step-label">{j.step}</div>
                  <div className="pc-journey-title">{j.title}</div>
                  <div className="pc-journey-desc">{j.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="pc-final">
          <div className="pc-final-bg" />
          <div className="pc-final-inner">
            <div className="pc-final-kicker">Step Into the Arena</div>
            <h2>Will You Be Indonesia&apos;s <span>Champion?</span></h2>
            <p>
              Applications for the FinTech World Cup Indonesia Qualifiers are closing soon.
              Do not miss your chance to pitch the world.
            </p>
            <div className="pc-final-btns">
              <Link href="/fintech-worldcup/apply" className="pc-final-btn-primary">
                Apply Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/attend/delegate" className="pc-final-btn-secondary">
                Secure Your Attendee Pass
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
