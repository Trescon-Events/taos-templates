import type { Metadata } from "next";
import HubSpotForm from "@/components/HubSpotForm";

export const metadata: Metadata = {
  title: "Buyer Delegations | Finance 2045 Jakarta 2026",
  description: "Access the full attending enterprise delegation list for Finance 2045 Jakarta 2026 — organisation profiles, technology requirements, and allocated project budgets.",
};

const STATS = [
  { num: "500+", label: "Attending Enterprises & SMEs" },
  { num: "100+", label: "Investors & Funds" },
  { num: "$18B", label: "Indonesia Fintech Market" },
  { num: "2,000+", label: "Leaders (combined with WAIS)" },
];

export default function EnterprisePage() {
  return (
    <>
      <style>{`
        .ent-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }

        /* Hero */
        .ent-hero {
          padding: 80px 40px 64px; text-align: center;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(233,194,104,0.06) 0%, transparent 100%);
        }
        .ent-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 18px;
        }
        .ent-hero h1 {
          font-size: clamp(28px, 4vw, 52px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; margin-bottom: 18px; line-height: 1.08;
        }
        .ent-hero h1 span { color: var(--gold); }
        .ent-hero p {
          font-size: clamp(14px, 1.4vw, 16px); color: var(--text-body);
          max-width: 600px; margin: 0 auto; line-height: 1.75;
        }

        /* Stat strip */
        .ent-stats {
          display: flex; flex-wrap: wrap;
          border-bottom: 1px solid var(--border);
          background: var(--bg-surface);
        }
        .ent-stat {
          flex: 1; min-width: 160px; padding: 28px 32px; text-align: center;
          border-right: 1px solid var(--border);
        }
        .ent-stat:last-child { border-right: none; }
        .ent-stat-num { font-size: 26px; font-weight: 900; color: var(--gold); letter-spacing: -0.02em; line-height: 1; margin-bottom: 4px; }
        .ent-stat-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }

        /* Body */
        .ent-body { max-width: 960px; margin: 0 auto; padding: 72px 40px 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }

        /* Left — What you get */
        .ent-left-head {
          font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .ent-left-head::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .ent-left h2 {
          font-size: clamp(22px, 2.5vw, 34px); font-weight: 900;
          letter-spacing: -0.02em; color: #fff; line-height: 1.18; margin-bottom: 20px;
        }
        .ent-left h2 span { color: var(--gold); }
        .ent-left p { font-size: 14px; color: var(--text-body); line-height: 1.78; margin-bottom: 32px; }
        .ent-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .ent-list li {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 13px; color: var(--text-body); line-height: 1.6;
        }
        .ent-list-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0; margin-top: 6px;
        }
        .ent-list strong { color: #fff; }

        /* Right — Form */
        .ent-form-wrap {
          background: var(--bg-card); border: 1px solid rgba(233,194,104,0.18);
          padding: 36px 32px;
          position: sticky; top: 88px;
        }
        .ent-form-head {
          font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 8px;
        }
        .ent-form-title { font-size: 18px; font-weight: 900; color: #fff; margin-bottom: 6px; line-height: 1.3; }
        .ent-form-sub { font-size: 12px; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; }
        .ent-form-divider { height: 1px; background: rgba(255,255,255,0.07); margin-bottom: 24px; }

        /* Responsive */
        @media (max-width: 860px) {
          .ent-body { grid-template-columns: 1fr; gap: 48px; padding: 48px 20px 80px; }
          .ent-form-wrap { position: static; }
          .ent-hero { padding: 52px 24px 48px; }
          .ent-stat { padding: 22px 20px; }
        }
        @media (max-width: 540px) {
          .ent-stats { flex-direction: column; }
          .ent-stat { border-right: none; border-bottom: 1px solid var(--border); }
          .ent-stat:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="ent-page">

        {/* Hero */}
        <div className="ent-hero">
          <div className="ent-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            Attending Enterprises
          </div>
          <h1>Unlock the Full <span>Buyer Delegation List</span></h1>
          <p>A comprehensive breakdown of every organisation attending Finance 2045 — including their technology requirements and allocated project budgets.</p>
        </div>

        {/* Stats */}
        <div className="ent-stats">
          {STATS.map((s) => (
            <div key={s.label} className="ent-stat">
              <div className="ent-stat-num">{s.num}</div>
              <div className="ent-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="ent-body">
          <div className="ent-left">
            <div className="ent-left-head">What&apos;s Inside</div>
            <h2>Qualified Buyers. <span>Verified Budgets.</span></h2>
            <p>
              The Finance 2045 Delegation List is a curated, verified dossier of every enterprise, government body, and institutional fund attending the summit. Request access and know exactly who is in the room before you arrive.
            </p>
            <ul className="ent-list">
              <li>
                <span className="ent-list-dot" />
                <span><strong>Organisation Profiles</strong> — Full company background, sector, and decision-maker details</span>
              </li>
              <li>
                <span className="ent-list-dot" />
                <span><strong>Technology Requirements</strong> — Immediate procurement priorities and open RFPs</span>
              </li>
              <li>
                <span className="ent-list-dot" />
                <span><strong>Allocated Budgets</strong> — Disclosed project spend ranges per attending organisation</span>
              </li>
              <li>
                <span className="ent-list-dot" />
                <span><strong>500+ Enterprises & SMEs</strong> — Spanning BFSI, fintech, government, and institutional sectors</span>
              </li>
              <li>
                <span className="ent-list-dot" />
                <span><strong>Combined 2,000+ Leaders</strong> — Co-located audience with the World AI Show Indonesia</span>
              </li>
            </ul>
          </div>

          <div className="ent-form-wrap">
            <div className="ent-form-head">Gated Access</div>
            <div className="ent-form-title">Request the Delegation List</div>
            <div className="ent-form-sub">Complete the form below. Our team will verify your details and share the full list within 48 hours.</div>
            <div className="ent-form-divider" />
            <HubSpotForm formId="7409e076-5d19-4b1b-ab03-a3f317415527" targetId="hs-enterprise-form" />
          </div>
        </div>

      </div>
    </>
  );
}
