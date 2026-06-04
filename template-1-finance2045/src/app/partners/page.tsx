import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partners | Finance 2045 Jakarta 2026",
  description: "Sponsor, exhibit, or partner as a media or association organisation at Finance 2045. Shape Southeast Asia's financial future.",
};

const OPTIONS = [
  {
    href: "/partners/sponsors",
    kicker: "Sponsors",
    label: "Sponsors",
    desc: "Discover the global industry leaders, sovereign funds, and tier-one innovators funding the Golden Indonesia vision and driving the keynote narrative.",
    cta: "View Our Sponsors",
  },
  {
    href: "/partners/exhibitors",
    kicker: "Exhibitors",
    label: "Exhibitors",
    desc: "Explore the cutting-edge solutions, embedded finance models, and transformative technologies being showcased on the exhibition floor.",
    cta: "View Exhibitor Directory",
  },
  {
    href: "/partners/media",
    kicker: "Media Partners",
    label: "Media Partners",
    desc: "Meet the top-tier international and regional media organizations amplifying the Finance 2045 narrative across podcasts, PR, and executive broadcasts.",
    cta: "View Media Partners",
  },
  {
    href: "/partners/associations",
    kicker: "Association Partners",
    label: "Association Partners",
    desc: "See the strategic alliances and key industry bodies shaping regional policy and accelerating Indonesia's digital financial inclusion.",
    cta: "View Association Partners",
  },
  {
    href: "/partners/ecosystem",
    kicker: "Strategic Ecosystem",
    label: "Strategic Partners",
    desc: "View the foundational government bodies, regulatory innovators, and strategic allies backing the 2045 roadmap and Project Garuda.",
    cta: "Explore our full partner ecosystem",
  },
  {
    href: "/partners/enterprise",
    kicker: "Attending Enterprises",
    label: "Buyer Delegations",
    desc: "Access a comprehensive breakdown of the organizations attending the summit. Review their profiles, immediate technological requirements, and allocated project budgets.",
    cta: "Unlock Delegation List",
    gold: true,
  },
];

export default function PartnersPage() {
  return (
    <>
      <style>{`
        .pt-page { min-height:100vh; background:var(--bg-primary); padding-top:72px; }
        .pt-hero {
          padding:80px 40px 64px; text-align:center;
          border-bottom:1px solid var(--border);
          background:linear-gradient(180deg,rgba(0,165,163,0.06) 0%,transparent 100%);
        }
        .pt-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:10px; font-weight:800; letter-spacing:0.18em;
          text-transform:uppercase; color:var(--teal); margin-bottom:18px;
        }
        .pt-hero h1 {
          font-size:clamp(32px,4.5vw,54px); font-weight:900;
          letter-spacing:-0.03em; color:#fff; margin-bottom:18px; line-height:1.08;
        }
        .pt-hero h1 span { color:var(--gold); }
        .pt-hero p {
          font-size:clamp(14px,1.4vw,17px); color:var(--text-body);
          max-width:600px; margin:0 auto; line-height:1.75;
        }
        .pt-grid {
          max-width:1100px; margin:0 auto; padding:64px 40px 100px;
          display:grid; grid-template-columns:repeat(3,1fr); gap:16px;
        }
        .pt-card {
          background:var(--bg-card); border:1px solid rgba(255,255,255,0.06);
          padding:36px 30px; text-decoration:none; display:flex; flex-direction:column;
          transition:border-color 0.2s,box-shadow 0.2s,transform 0.2s;
          position:relative; overflow:hidden;
        }
        .pt-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg, var(--gold), transparent);
          opacity:0; transition:opacity 0.3s;
        }
        .pt-card:hover { border-color:rgba(233,194,104,0.35); box-shadow:0 0 32px rgba(233,194,104,0.10); transform:translateY(-2px); }
        .pt-card:hover::before { opacity:1; }
        .pt-card-gold { border-color:rgba(233,194,104,0.20); background:rgba(233,194,104,0.03); }
        .pt-card-gold::before { opacity:0.5; }
        .pt-card-kicker {
          font-size:10px; font-weight:800; letter-spacing:0.18em;
          text-transform:uppercase; color:var(--teal); margin-bottom:14px;
        }
        .pt-card-gold .pt-card-kicker { color:var(--gold); }
        .pt-card h3 { font-size:22px; font-weight:900; color:#fff; margin-bottom:12px; }
        .pt-card p { font-size:13px; color:var(--text-body); line-height:1.72; flex:1; margin-bottom:28px; }
        .pt-cta {
          display:inline-flex; align-items:center; gap:8px;
          font-size:11px; font-weight:800; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--gold);
          transition:gap 0.2s;
        }
        .pt-card:not(.pt-card-gold) .pt-cta { color:var(--teal); }
        .pt-card:hover .pt-cta { gap:12px; }
        @media (max-width:900px) { .pt-grid { grid-template-columns:1fr 1fr; } }
        @media (max-width:560px) {
          .pt-grid { grid-template-columns:1fr; padding:40px 20px 80px; }
          .pt-hero { padding:52px 24px 48px; }
        }
      `}</style>
      <div className="pt-page">
        <div className="pt-hero">
          <div className="pt-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
            Partners
          </div>
          <h1>Partner With <span>Finance 2045</span></h1>
          <p>Six partnership tracks. One platform. Direct access to Indonesia&apos;s $18B fintech market and a combined audience of 2,000+ leaders co-located with the World AI Show.</p>
        </div>
        <div className="pt-grid">
          {OPTIONS.map((o) => (
            <Link key={o.href} href={o.href} className={`pt-card${o.gold ? " pt-card-gold" : ""}`}>
              <div className="pt-card-kicker">{o.kicker}</div>
              <h3>{o.label}</h3>
              <p>{o.desc}</p>
              <span className="pt-cta">
                {o.cta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
