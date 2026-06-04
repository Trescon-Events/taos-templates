import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Indonesia Emas 2045 — The Vision | Finance 2045",
  description: "By its centenary in 2045, Indonesia will be a fully developed, high-income nation. The engine driving this? An aggressive 8% GDP growth target, an $18 Billion fintech market.",
};

const FRONTIERS = [
  {
    n: "01",
    title: "The Enterprise Backbone",
    stats: "65M+ MSMEs, driving 60% of GDP and employing 97% of the workforce.",
    play: "Digitizing this sector through embedded finance and alternative credit is Indonesia's highest commercial priority.",
  },
  {
    n: "02",
    title: "The Inclusion Imperative",
    stats: "77M+ Unbanked Adults.",
    play: "A $12 billion digital wallet and micro-lending opportunity, fueled by a national mandate to hit 80.51% financial inclusion by 2026.",
  },
  {
    n: "03",
    title: "The Sharia Arbitrage",
    stats: "The world's largest Muslim population, yet Islamic banking penetration remains under 8%.",
    play: "The single largest untapped Islamic finance and green Sukuk market in the Asia-Pacific region.",
  },
  {
    n: "04",
    title: "The Digital Rails (Project Garuda)",
    stats: "Total modernization of the digital economy.",
    play: "Bank Indonesia is rewriting the nation's financial plumbing. From the Digital Rupiah (CBDC) to real-time cross-border payment interoperability across ASEAN, the infrastructure is primed for scale.",
  },
];

export default function VisionPage() {
  return (
    <>
      <style>{`
        .vs-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }

        /* ── Hero ── */
        .vs-hero {
          position: relative; overflow: hidden;
          min-height: 620px; display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid var(--border); text-align: center;
        }
        .vs-hero-img { position: absolute; inset: 0; }
        .vs-hero-grad {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(180deg, rgba(15,20,28,0.70) 0%, rgba(15,20,28,0.88) 100%),
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(233,194,104,0.10), transparent 70%);
        }
        /* Kinetic gold overlay */
        .vs-hero-kinetic {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background:
            repeating-linear-gradient(
              120deg,
              rgba(233,194,104,0.03) 0px,
              rgba(233,194,104,0.03) 1px,
              transparent 1px,
              transparent 80px
            ),
            repeating-linear-gradient(
              60deg,
              rgba(233,194,104,0.025) 0px,
              rgba(233,194,104,0.025) 1px,
              transparent 1px,
              transparent 80px
            );
          animation: vs-drift 18s linear infinite;
        }
        @keyframes vs-drift { from { background-position: 0 0, 0 0; } to { background-position: 200px 200px, -200px 200px; } }
        .vs-hero-inner {
          position: relative; z-index: 3;
          max-width: 820px; margin: 0 auto; padding: 100px 40px;
          width: 100%;
        }
        .vs-hero-kicker {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 28px;
        }
        .vs-hero-kicker-line { width: 28px; height: 1px; background: var(--gold); }
        .vs-hero h1 {
          font-size: clamp(40px, 7vw, 88px); font-weight: 900;
          letter-spacing: -0.04em; line-height: 0.95; color: #fff;
          margin-bottom: 12px;
        }
        .vs-hero-sub-head {
          font-size: clamp(18px, 2.5vw, 28px); font-weight: 700;
          color: var(--gold); letter-spacing: 0.02em; margin-bottom: 28px;
        }
        .vs-hero-body {
          font-size: clamp(14px, 1.4vw, 17px); color: rgba(255,255,255,0.68);
          max-width: 640px; line-height: 1.82; margin: 0 auto 44px;
        }
        .vs-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #1F2733; padding: 16px 36px;
          font-size: 12px; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .vs-hero-cta:hover { background: #f5d47c; transform: translateY(-1px); }

        /* ── Opportunity ── */
        .vs-opportunity {
          padding: 96px 40px; max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .vs-opp-label {
          font-size: 10px; font-weight: 800; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 8px;
          display: flex; align-items: center; gap: 10px;
        }
        .vs-opp-label::before { content: ''; width: 20px; height: 1px; background: var(--teal); }
        .vs-opp-h {
          font-size: clamp(26px, 2.8vw, 42px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; line-height: 1.08; margin-bottom: 24px;
        }
        .vs-opp-h span { color: var(--gold); }
        .vs-opp-body { font-size: 15px; color: var(--text-body); line-height: 1.82; margin-bottom: 16px; }

        /* Stats column */
        .vs-opp-stats { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--border); }
        .vs-opp-stat {
          padding: 32px 36px; border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 24px;
          transition: background 0.25s; position: relative; overflow: hidden;
        }
        .vs-opp-stat:last-child { border-bottom: none; }
        .vs-opp-stat::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: var(--gold); transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.35s ease;
        }
        .vs-opp-stat:hover { background: rgba(233,194,104,0.03); }
        .vs-opp-stat:hover::before { transform: scaleY(1); }
        .vs-opp-stat-n {
          font-size: 44px; font-weight: 900; color: var(--gold);
          line-height: 1; letter-spacing: -0.03em; flex-shrink: 0;
        }
        .vs-opp-stat-l {
          font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--text-muted); line-height: 1.4;
        }

        /* ── Four Frontiers ── */
        .vs-frontiers {
          background: var(--bg-surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 96px 40px;
        }
        .vs-frontiers-inner { max-width: 1100px; margin: 0 auto; }
        .vs-frontiers-header { text-align: center; margin-bottom: 60px; }
        .vs-frontiers-kicker {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 14px;
        }
        .vs-frontiers-h {
          font-size: clamp(26px, 3vw, 42px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; line-height: 1.1;
        }
        .vs-frontiers-h span { color: var(--gold); }
        .vs-frontiers-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
        }
        .vs-frontier-card {
          background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.07);
          padding: 44px 40px; position: relative; overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
        }
        .vs-frontier-card::after {
          content: ''; position: absolute; inset: 0;
          box-shadow: inset 0 0 0 1px rgba(233,194,104,0);
          transition: box-shadow 0.35s;
        }
        .vs-frontier-card:hover {
          border-color: rgba(233,194,104,0.35);
          box-shadow: 0 8px 40px rgba(233,194,104,0.09);
          transform: translateY(-3px);
        }
        .vs-frontier-card:hover::after {
          box-shadow: inset 0 0 0 1px rgba(233,194,104,0.18);
        }
        .vs-frontier-n {
          font-size: 56px; font-weight: 900; line-height: 1;
          color: rgba(233,194,104,0.10); margin-bottom: 20px; letter-spacing: -0.04em;
        }
        .vs-frontier-title {
          font-size: 18px; font-weight: 900; color: #fff; margin-bottom: 14px; line-height: 1.2;
        }
        .vs-frontier-stats-label {
          font-size: 10px; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 6px;
        }
        .vs-frontier-stats {
          font-size: 13px; color: rgba(255,255,255,0.80); line-height: 1.65;
          margin-bottom: 16px; font-weight: 600;
        }
        .vs-frontier-play-label {
          font-size: 10px; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 6px;
        }
        .vs-frontier-play { font-size: 13px; color: var(--text-body); line-height: 1.72; }

        /* ── Catalyst Banner ── */
        .vs-catalyst {
          position: relative; overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          min-height: 420px; display: flex; align-items: center; justify-content: center;
        }
        .vs-catalyst-img { position: absolute; inset: 0; }
        .vs-catalyst-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: rgba(15,20,28,0.72);
        }
        .vs-catalyst-inner {
          position: relative; z-index: 2;
          max-width: 680px; text-align: center; padding: 80px 40px;
        }
        .vs-catalyst-kicker {
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 28px;
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .vs-catalyst-kicker::before,
        .vs-catalyst-kicker::after { content: ''; width: 28px; height: 1px; background: var(--teal); }
        .vs-catalyst-quote {
          font-size: clamp(18px, 2.2vw, 26px); font-weight: 700;
          color: #fff; line-height: 1.60; font-style: italic;
          border-left: 3px solid var(--gold);
          padding-left: 28px; text-align: left;
          background: rgba(15,20,28,0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 32px 36px; border-radius: 2px;
        }

        /* ── Destination ── */
        .vs-destination {
          background: #0a0e15;
          border-bottom: 1px solid var(--border);
          padding: 100px 40px;
        }
        .vs-destination-inner { max-width: 900px; margin: 0 auto; text-align: center; }
        .vs-dest-kicker {
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 20px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .vs-dest-kicker::before, .vs-dest-kicker::after { content: ''; width: 20px; height: 1px; background: var(--teal); }
        .vs-dest-h {
          font-size: clamp(30px, 4vw, 52px); font-weight: 900;
          letter-spacing: -0.035em; color: #fff; line-height: 1.06;
          margin-bottom: 28px;
        }
        .vs-dest-h span { color: var(--gold); }
        .vs-dest-body {
          font-size: clamp(14px, 1.4vw, 17px); color: var(--text-body);
          line-height: 1.82; margin-bottom: 16px; max-width: 700px; margin-left: auto; margin-right: auto;
        }
        .vs-dest-accent {
          font-size: clamp(15px, 1.5vw, 18px); font-weight: 700;
          color: rgba(255,255,255,0.90); margin-bottom: 52px; line-height: 1.6;
        }
        .vs-dest-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .vs-dest-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #1F2733; padding: 16px 36px;
          font-size: 12px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .vs-dest-btn-primary:hover { background: #f5d47c; transform: translateY(-1px); }
        .vs-dest-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid rgba(233,194,104,0.45); color: var(--gold); padding: 16px 36px;
          font-size: 12px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .vs-dest-btn-secondary:hover { background: rgba(233,194,104,0.06); border-color: rgba(233,194,104,0.7); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .vs-opportunity { grid-template-columns: 1fr; gap: 56px; padding: 64px 24px; }
          .vs-frontiers-grid { grid-template-columns: 1fr; }
          .vs-frontiers { padding: 64px 24px; }
          .vs-hero-inner { padding: 80px 24px; }
          .vs-catalyst-inner { padding: 64px 24px; }
          .vs-destination { padding: 72px 24px; }
        }
        @media (max-width: 600px) {
          .vs-opp-stat-n { font-size: 34px; }
          .vs-frontier-card { padding: 32px 28px; }
          .vs-dest-btns { flex-direction: column; align-items: center; }
          .vs-dest-btn-primary, .vs-dest-btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="vs-page">

        {/* Hero */}
        <div className="vs-hero">
          <div className="vs-hero-img">
            <Image src="/f45-golden-1.jpg" alt="Indonesia Emas 2045" fill sizes="100vw" quality={90} style={{ objectFit: "cover", objectPosition: "center 40%" }} priority />
          </div>
          <div className="vs-hero-grad" />
          <div className="vs-hero-kinetic" />
          <div className="vs-hero-inner">
            <div className="vs-hero-kicker">
              <span className="vs-hero-kicker-line" />
              The Vision
              <span className="vs-hero-kicker-line" />
            </div>
            <h1>INDONESIA EMAS 2045</h1>
            <div className="vs-hero-sub-head">The Golden Era is Now.</div>
            <p className="vs-hero-body">
              By its centenary in 2045, Indonesia will be a fully developed, high-income nation. The engine driving this?
              An aggressive 8% GDP growth target, an $18 Billion fintech market, and you.
            </p>
            <Link href="/attend/delegate" className="vs-hero-cta">
              Enter the Finance 2045 Deal Room
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* The Opportunity */}
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="vs-opportunity">
            <div>
              <div className="vs-opp-label">The Opportunity</div>
              <h2 className="vs-opp-h">Not Emerging-Market Risk.<br /><span>A Policy-Backed Arbitrage.</span></h2>
              <p className="vs-opp-body">
                While mature markets grapple with high acquisition costs and shrinking margins, Indonesia offers the exact inverse.
              </p>
              <p className="vs-opp-body">
                We are looking at 270 million people with a median age of 29. We have a pro-innovation regulatory architecture driven by Bank Indonesia and the OJK. Most importantly, we offer transaction margins that global players haven&apos;t yet competed away.
              </p>
              <p className="vs-opp-body">
                This isn&apos;t just an expanding market; it is underpinned by government mandates that actively reward foreign capital and technology partnerships.
              </p>
            </div>
            <div className="vs-opp-stats">
              {[
                { n: "270M", l: "People" },
                { n: "29 Yrs", l: "Median Age" },
                { n: "$18B", l: "Fintech Market Value" },
              ].map((s) => (
                <div key={s.l} className="vs-opp-stat">
                  <div className="vs-opp-stat-n">{s.n}</div>
                  <div className="vs-opp-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Four Frontiers */}
        <div className="vs-frontiers">
          <div className="vs-frontiers-inner">
            <div className="vs-frontiers-header">
              <div className="vs-frontiers-kicker">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
                The Landscape
              </div>
              <h2 className="vs-frontiers-h">The Four Frontiers of <span>Opportunity</span></h2>
            </div>
            <div className="vs-frontiers-grid">
              {FRONTIERS.map((f) => (
                <div key={f.n} className="vs-frontier-card">
                  <div className="vs-frontier-n">{f.n}</div>
                  <div className="vs-frontier-title">{f.title}</div>
                  <div className="vs-frontier-stats-label">The Stats</div>
                  <div className="vs-frontier-stats">{f.stats}</div>
                  <div className="vs-frontier-play-label">The Play</div>
                  <div className="vs-frontier-play">{f.play}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Catalyst Banner */}
        <div className="vs-catalyst">
          <div className="vs-catalyst-img">
            <Image src="/f45-golden-2.jpg" alt="Jakarta skyline" fill sizes="100vw" quality={90} style={{ objectFit: "cover", objectPosition: "center 60%" }} />
          </div>
          <div className="vs-catalyst-overlay" />
          <div className="vs-catalyst-inner">
            <div className="vs-catalyst-kicker">The Catalyst</div>
            <blockquote className="vs-catalyst-quote">
              &ldquo;An 8% growth rate requires unprecedented foreign direct investment and a total modernization of the digital economy. The vision is set. Now, it must be funded.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* The Destination */}
        <div className="vs-destination">
          <div className="vs-destination-inner">
            <div className="vs-dest-kicker">The Destination</div>
            <h2 className="vs-dest-h">Finance 2045:<br /><span>Funding the Golden Future</span></h2>
            <p className="vs-dest-body">
              The vision of Indonesia Emas 2045 cannot be realized in silos. Finance 2045 is the international deal room built to fund this exact transformation.
            </p>
            <p className="vs-dest-body">
              We are the nexus where the government&apos;s strategic roadmaps meet the global investors, enterprise leaders, and technology partners required to make the 2045 vision a reality.
            </p>
            <p className="vs-dest-accent">Don&apos;t just watch the Golden Era unfold. Capitalize on it.</p>
            <div className="vs-dest-btns">
              <Link href="/attend/delegate" className="vs-dest-btn-primary">
                Reserve Your Seat at Finance 2045
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/attend/sponsor" className="vs-dest-btn-secondary">
                Inquire About Partnership
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
