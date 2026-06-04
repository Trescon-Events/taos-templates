import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CoreDirectivesSlideshow from "@/components/CoreDirectivesSlideshow";

export const metadata: Metadata = {
  title: "Attend Finance 2045 | Jakarta, 7–8 July 2026",
  description: "Secure your place at Southeast Asia's preeminent financial summit. 1,000+ C-suite leaders, investors, and policymakers. Sheraton Grand Jakarta.",
};

const OPTIONS = [
  { href: "/attend/delegate",    label: "Delegate",    desc: "An exclusive pass for senior executives, investors, and policymakers. Subject to committee approval.", cta: "Apply for a Pass",       accent: "var(--teal)" },
  { href: "/attend/sponsor",     label: "Sponsor",     desc: "Build your deal pipeline. Access 1,000+ pre-qualified decision-makers with verified budgets.",          cta: "Explore Sponsorship",   accent: "var(--gold)" },
  { href: "/attend/exhibit",     label: "Exhibit",     desc: "Showcase your product on the FinTech World Cup floor to 12,000+ high-intent buyers.",                  cta: "Reserve Space",         accent: "var(--teal)" },
  { href: "/attend/media",       label: "Media",       desc: "Accreditation for journalists and media organisations covering Indonesia's digital finance story.",      cta: "Apply for Accreditation", accent: "var(--gold)" },
  { href: "/attend/association", label: "Association", desc: "Shape policy, gain a global platform, and deliver direct value to your member base.",                  cta: "Partner With Us",       accent: "var(--teal)" },
  { href: "/attend/faqs",        label: "FAQs",        desc: "Answers to the most common questions about attending, sponsoring, and exhibiting.",                    cta: "Read FAQs",             accent: "var(--gold)" },
];

const DIRECTIVES = [
  { n: "01", title: "Digital Infrastructure & Payments", body: "Scaling intelligent banking, AI, and cross-border interoperability through systems like QRIS." },
  { n: "02", title: "Financial Inclusion", body: "Unlocking alternative credit for 64M+ MSMEs and capturing the last-mile opportunity of 66M unbanked adults." },
  { n: "03", title: "Green Finance", body: "Mobilizing regional and international capital for Indonesia's USD 281 billion net-zero climate opportunity." },
  { n: "04", title: "Islamic Finance & Web3", body: "Advancing syariah digital finance, InsurTech, and sustainable institutional digital asset adoption." },
  { n: "05", title: "Fintech Investment", body: "Connecting smart venture capital with high-growth innovators to build the region's next generation of unicorns." },
];

const COMMUNITY = [
  { n: "1,000+", label: "Total Delegates",                   desc: "A rigorously qualified audience of decision-makers and deal-flow architects." },
  { n: "100+",   label: "Global Capital Partners",           desc: "Top-tier venture capital, private equity, and funds deploying rapid capital." },
  { n: "300+",   label: "BFSI Innovators",                   desc: "Visionary CEOs, CTOs, and digital transformation chiefs from top-tier banks." },
  { n: "500+",   label: "Enterprise & SME Leaders",          desc: "Bold founders and enterprise executives scaling Indonesia's digital economy." },
  { n: "100+",   label: "Government & Policy Makers",        desc: "Core officials and regulators shaping the future of regional finance policy." },
  { n: "40+",    label: "Elite Global Voices",               desc: "The vanguard of international finance delivering actionable, smart insights." },
  { n: "20+",    label: "Tier-1 & Niche Media Partners",     desc: "Curated press networks amplifying your solutions to a vast digital audience." },
  { n: "20+",    label: "Strategic Association Partners",    desc: "Direct gateways to niche industry ecosystems required to scale market reach." },
];

export default function AttendPage() {
  return (
    <>
      <style>{`
        /* ── Base ── */
        .at-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }

        /* ── Hero ── */
        .at-hero { padding: 80px 40px 64px; text-align: center; border-bottom: 1px solid var(--border); background: linear-gradient(180deg, rgba(0,165,163,0.06) 0%, transparent 100%); }
        .at-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 18px; }
        .at-hero h1 { font-size: clamp(30px, 4.5vw, 58px); font-weight: 900; letter-spacing: -0.03em; line-height: 1.08; color: #fff; margin-bottom: 18px; }
        .at-hero h1 span { color: var(--gold); }
        .at-hero p { font-size: clamp(14px, 1.4vw, 17px); color: var(--text-body); max-width: 600px; margin: 0 auto 40px; line-height: 1.75; }
        .at-stats { display: flex; justify-content: center; gap: 0; flex-wrap: wrap; border: 1px solid var(--border); max-width: 600px; margin: 0 auto; background: var(--bg-surface); }
        .at-stat { flex: 1; padding: 20px 24px; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); min-width: 120px; }
        .at-stat:last-child { border-right: none; }
        .at-stat-n { font-size: 26px; font-weight: 900; color: var(--gold); line-height: 1; margin-bottom: 6px; }
        .at-stat-l { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); }

        /* ── Core Directives ── */
        .at-dir { padding: 96px 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border); }
        .at-dir-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .at-dir-left {}
        .at-dir-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 14px; }
        .at-dir-left h2 { font-size: clamp(26px, 3vw, 40px); font-weight: 900; letter-spacing: -0.025em; line-height: 1.1; color: #fff; margin-bottom: 20px; }
        .at-dir-left > p { font-size: 14px; color: var(--text-body); line-height: 1.8; margin-bottom: 36px; }
        .at-dir-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
        .at-dir-item { display: flex; gap: 16px; align-items: flex-start; }
        .at-dir-num { flex-shrink: 0; width: 36px; height: 36px; background: rgba(0,165,163,0.12); border: 1px solid rgba(0,165,163,0.30); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; color: var(--teal); letter-spacing: 0.06em; }
        .at-dir-text { padding-top: 6px; }
        .at-dir-text strong { font-size: 13px; font-weight: 700; color: #fff; display: block; margin-bottom: 3px; }
        .at-dir-text span { font-size: 12px; color: var(--text-body); line-height: 1.65; }
        .at-dir-link { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 800; letter-spacing: 0.10em; text-transform: uppercase; color: var(--teal); transition: gap 0.2s; }
        .at-dir-link:hover { gap: 13px; }
        .at-dir-right { position: relative; }
        .at-dir-img-wrap { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 4/5; box-shadow: 0 0 56px rgba(0,165,163,0.15), 0 24px 60px rgba(0,0,0,0.5); border: 1px solid rgba(0,165,163,0.22); }
        .at-dir-img-wrap::before { content: ""; position: absolute; inset: 0; background: linear-gradient(160deg, rgba(0,165,163,0.12) 0%, transparent 60%); z-index: 1; pointer-events: none; }
        .at-dir-badge { position: absolute; bottom: 24px; left: 24px; z-index: 2; background: rgba(31,39,51,0.88); border: 1px solid var(--border); backdrop-filter: blur(10px); border-radius: 10px; padding: 12px 18px; }
        .at-dir-badge-n { font-size: 22px; font-weight: 900; color: var(--gold); line-height: 1; }
        .at-dir-badge-l { font-size: 10px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 3px; }

        /* ── Community ── */
        .at-comm { padding: 96px 40px; background: var(--bg-primary); border-bottom: 1px solid var(--border); }
        .at-comm-head { max-width: 680px; margin: 0 auto 64px; text-align: center; }
        .at-comm-head h2 { font-size: clamp(26px, 3vw, 42px); font-weight: 900; letter-spacing: -0.025em; color: #fff; margin-bottom: 16px; }
        .at-comm-head h2 span { color: var(--teal); }
        .at-comm-head p { font-size: 15px; color: var(--text-body); line-height: 1.8; }
        .at-comm-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(0,165,163,0.14); border: 1px solid rgba(0,165,163,0.14); }
        .at-comm-cell { background: var(--bg-card); padding: 32px 28px; transition: background 0.2s; }
        .at-comm-cell:hover { background: var(--bg-card-2); }
        .at-comm-cell-n { font-size: 34px; font-weight: 900; color: var(--gold); line-height: 1; margin-bottom: 6px; letter-spacing: -0.02em; }
        .at-comm-cell-label { font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .at-comm-cell-desc { font-size: 12px; color: var(--text-muted); line-height: 1.65; }
        .at-comm-cta { text-align: center; margin-top: 48px; }

        /* ── Option grid ── */
        .at-grid { max-width: 1100px; margin: 0 auto; padding: 80px 40px 100px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .at-grid-head { max-width: 1100px; margin: 0 auto; padding: 72px 40px 0; }
        .at-grid-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 12px; }
        .at-grid-head h2 { font-size: clamp(22px, 2.5vw, 34px); font-weight: 900; letter-spacing: -0.02em; color: #fff; }
        .at-card { background: var(--bg-card); border: 1px solid rgba(255,255,255,0.06); padding: 32px 28px; display: flex; flex-direction: column; gap: 0; transition: border-color 0.2s, box-shadow 0.2s; text-decoration: none; }
        .at-card:hover { border-color: rgba(0,165,163,0.35); box-shadow: 0 0 28px rgba(0,165,163,0.12); }
        .at-card-label { font-size: 10px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 16px; }
        .at-card h3 { font-size: 22px; font-weight: 900; color: #fff; margin-bottom: 12px; letter-spacing: -0.01em; }
        .at-card p { font-size: 13px; color: var(--text-body); line-height: 1.7; flex: 1; margin-bottom: 24px; }
        .at-card-cta { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; letter-spacing: 0.10em; text-transform: uppercase; color: var(--teal); transition: gap 0.2s; }
        .at-card-cta:hover { gap: 12px; }

        /* ── Responsive ── */
        @media (max-width: 1024px) { .at-comm-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 900px) { .at-dir-inner { grid-template-columns: 1fr; gap: 48px; } .at-dir-right { display: none; } .at-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) { .at-dir { padding: 64px 24px; } .at-comm { padding: 64px 24px; } .at-comm-grid { grid-template-columns: 1fr 1fr; } .at-grid { grid-template-columns: 1fr; padding: 40px 20px 80px; } .at-hero { padding: 56px 24px 48px; } .at-grid-head { padding: 48px 20px 0; } }
      `}</style>

      <div className="at-page">

        {/* ── Hero ── */}
        <div className="at-hero">
          <div className="at-eyebrow"><span style={{ width:6,height:6,borderRadius:"50%",background:"var(--teal)",display:"inline-block" }} />Attend</div>
          <h1>One Summit.<br /><span>Every Deal That Matters.</span></h1>
          <p>Finance 2045 is not a conference — it is a curated deal room. Every participant is pre-qualified. Every connection is engineered. Every conversation drives pipeline.</p>
          <div className="at-stats">
            {[{n:"1,000+",l:"Leaders"},{n:"$18B",l:"Market"},{n:"2",l:"Days"},{n:"270M",l:"Population"}].map(s=>(
              <div key={s.l} className="at-stat"><div className="at-stat-n">{s.n}</div><div className="at-stat-l">{s.l}</div></div>
            ))}
          </div>
        </div>

        {/* ── Section 1: Core Directives ── */}
        <section className="at-dir">
          <div className="at-dir-inner">
            <div className="at-dir-left">
              <div className="at-dir-eyebrow">Agenda Focus</div>
              <h2>Finance 2045<br />Core Directives</h2>
              <p>Finance 2045 bridges global capital with Indonesia's digital boom. As the Asia-Pacific's premier platform, it unites regulators, banks, fintechs, and investors to drive financial inclusion, shape digital policy, and accelerate Indonesia's rise as a global financial hub.</p>
              <div className="at-dir-list">
                {DIRECTIVES.map(d => (
                  <div key={d.n} className="at-dir-item">
                    <div className="at-dir-num">{d.n}</div>
                    <div className="at-dir-text">
                      <strong>{d.title}</strong>
                      <span>{d.body}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/agenda/full" className="at-dir-link">
                Explore the full Agenda
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            <div className="at-dir-right">
              <div className="at-dir-img-wrap">
                <CoreDirectivesSlideshow />
                <div className="at-dir-badge">
                  <div className="at-dir-badge-n">5</div>
                  <div className="at-dir-badge-l">Core Directives</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: The Community ── */}
        <section className="at-comm">
          <div className="at-comm-head">
            <h2>The Finance 2045 <span>Community</span></h2>
            <p>Finance 2045 is meticulously engineered for networking and meaningful alliances. We focus entirely on bringing the right minds together in one space.</p>
          </div>

          <div className="at-comm-grid">
            {COMMUNITY.map(c => (
              <div key={c.label} className="at-comm-cell">
                <div className="at-comm-cell-n">{c.n}</div>
                <div className="at-comm-cell-label">{c.label}</div>
                <div className="at-comm-cell-desc">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="at-comm-cta">
            <Link href="/enquire" className="f45-btn-primary">
              Join the Ecosystem
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </section>

        {/* ── Section 3: How to Attend (card grid) ── */}
        <div className="at-grid-head">
          <div className="at-grid-eyebrow">Your Path In</div>
          <h2>How Will You Attend?</h2>
        </div>
        <div className="at-grid">
          {OPTIONS.map(o=>(
            <Link key={o.href} href={o.href} className="at-card">
              <div className="at-card-label" style={{color:o.accent}}>{o.label}</div>
              <h3>{o.label}</h3>
              <p>{o.desc}</p>
              <span className="at-card-cta">{o.cta}<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
            </Link>
          ))}
        </div>

      </div>
    </>
  );
}
