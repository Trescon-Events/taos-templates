"use client";
import { useState } from "react";
import Link from "next/link";

const PASS_URL = "https://konfhub.com/checkout/big-cio-show-awards-2026?ticketId=93845%7C1%3B&selectedCode=MKTWEBSITE";
type Tab = "sessions" | "reports" | "insights";

const SESSIONS = [
  { edition: "2025", title: "The Agentic Enterprise: AI That Acts, Not Just Advises", speaker: "Panel — 5 CIOs", category: "AI & Automation" },
  { edition: "2025", title: "Zero-Trust in Practice: What Actually Worked Across 3 Sectors", speaker: "CISO Panel", category: "Cybersecurity" },
  { edition: "2025", title: "From Cloud Migration to Cloud ROI: The Numbers That Matter", speaker: "CDO Roundtable", category: "Cloud" },
  { edition: "2024", title: "The Modern Data Stack: Architecture Decisions for 2025", speaker: "VP Data, Infosys", category: "Data & Analytics" },
  { edition: "2024", title: "IT as a Revenue Centre: How CIOs Are Changing the Conversation", speaker: "CIO Keynote", category: "Leadership" },
  { edition: "2024", title: "Supply Chain Resilience: What IT Leaders Learned from Disruption", speaker: "Manufacturing CIO Panel", category: "Industry" },
];

const REPORTS = [
  { year: "2025", title: "India CIO Benchmarking Report 2025", pages: "62 pages", desc: "Enterprise technology investment trends, vendor satisfaction scores, and technology priorities across 400+ Indian CIOs." },
  { year: "2025", title: "State of Enterprise AI in India", pages: "38 pages", desc: "Adoption rates, use cases in production, budget allocation, and CIO sentiment on generative AI across 12 industries." },
  { year: "2024", title: "India CIO Benchmarking Report 2024", pages: "58 pages", desc: "Technology spend, vendor preferences, cloud adoption, and security investment priorities across Indian enterprises." },
  { year: "2024", title: "Cybersecurity Maturity Report: Indian Enterprise", pages: "44 pages", desc: "CISO survey — zero-trust adoption, incident response maturity, budget allocation, and board-level engagement." },
];

export default function KnowledgeHubPage() {
  const [tab, setTab] = useState<Tab>("sessions");

  return (
    <>
      <style>{`
        .bkh-page { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }
        .bkh-tabbar {
          background: var(--bg-surface); border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .bkh-tabbar-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: flex; overflow-x: auto; scrollbar-width: none;
        }
        .bkh-tabbar-inner::-webkit-scrollbar { display: none; }
        .bkh-tab {
          font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.90);
          padding: 16px 22px; cursor: pointer; border: none; background: none;
          font-family: inherit; border-bottom: 2px solid transparent;
          white-space: nowrap; transition: color 0.2s, border-color 0.2s;
        }
        .bkh-tab:hover { color: #ffffff; }
        .bkh-tab.active { color: var(--cyan); border-bottom-color: var(--cyan); }

        .bkh-hero {
          background: var(--bg-surface); padding: 80px 40px 72px;
          text-align: center; position: relative; overflow: hidden;
          border-bottom: 1px solid rgba(124,58,237,0.10);
        }
        .bkh-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .bkh-hero-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .bkh-h1 { font-size: clamp(22px, 2.6vw, 38px); font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1.15; margin-bottom: 16px; }
        .bkh-h1 em { font-style: normal; color: var(--cyan); }
        .bkh-sub { font-size: 18px; color: var(--text-body); max-width: 560px; margin: 0 auto 36px; line-height: 1.75; }
        .bkh-section { max-width: 1320px; margin: 0 auto; padding: 72px 40px 80px; }

        .bkh-session-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
          padding: 28px 32px; margin-bottom: 12px;
          display: flex; align-items: flex-start; justify-content: space-between; gap: 24;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bkh-session-card:hover {
          border-color: rgba(124,58,237,0.45);
          box-shadow: 0 0 24px rgba(124,58,237,0.15);
        }
        .bkh-session-cat {
          font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--cyan); background: rgba(192,132,252,0.08); border: 1px solid rgba(192,132,252,0.20);
          padding: 3px 10px; border-radius: 100px; display: inline-block; margin-bottom: 10px;
        }
        .bkh-session-title { font-size: 18px; font-weight: 800; color: #fff; line-height: 1.4; margin-bottom: 6px; }
        .bkh-session-speaker { font-size: 18px; color: var(--text-body); }
        .bkh-session-year { font-size: 18px; font-weight: 700; color: rgba(255,255,255,0.25); white-space: nowrap; flex-shrink: 0; }

        .bkh-report-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
          padding: 36px 32px; margin-bottom: 12px;
          display: flex; gap: 32px; align-items: flex-start;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bkh-report-card:hover {
          border-color: rgba(124,58,237,0.45);
          box-shadow: 0 0 24px rgba(124,58,237,0.15);
        }
        .bkh-report-icon {
          width: 56px; height: 56px; border-radius: 12px; flex-shrink: 0;
          background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.25);
          display: flex; align-items: center; justify-content: center; color: var(--cyan);
        }
        .bkh-report-year { font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--cyan); margin-bottom: 6px; }
        .bkh-report-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; line-height: 1.3; }
        .bkh-report-pages { font-size: 18px; color: rgba(255,255,255,0.72); margin-bottom: 10px; }
        .bkh-report-desc { font-size: 18px; color: var(--text-body); line-height: 1.65; margin-bottom: 18px; }

        .bkh-cta-strip {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.15);
          padding: 36px 40px; display: flex; align-items: center;
          justify-content: space-between; gap: 32px; flex-wrap: wrap; border-radius: 16px;
          margin-top: 48px;
        }

        @media (max-width: 768px) {
          .bkh-hero { padding: 56px 24px 48px; }
          .bkh-section { padding: 48px 24px 64px; }
          .bkh-tabbar-inner { padding: 0 16px; }
          .bkh-report-card { flex-direction: column; gap: 16px; }
          .bkh-session-card { flex-direction: column; gap: 8px; }
          .bkh-cta-strip { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="bkh-page">
        <div className="bkh-tabbar">
          <div className="bkh-tabbar-inner">
            {([
              ["sessions",  "Session Recordings"],
              ["reports",   "Research Reports"],
              ["insights",  "CIO Insights"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} className={`bkh-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bkh-hero">
          <div className="bkh-hero-inner">
            <div className="bcio-eyebrow">Knowledge Hub</div>
            <h1 className="bkh-h1">15 Editions of <em>Enterprise Intelligence</em></h1>
            <p className="bkh-sub">
              Access session recordings from past Big CIO Show editions, exclusive CIO research reports, and industry insights from India&apos;s most senior technology leaders.
            </p>
            <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
              Register for Full Access
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        {/* SESSIONS */}
        {tab === "sessions" && (
          <div className="bkh-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Session Recordings</h2>
                <p style={{ fontSize: 13, color: "var(--text-body)" }}>Full recordings from past Big CIO Show editions — available to registered delegates.</p>
              </div>
              <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                Register to Watch
              </a>
            </div>
            {SESSIONS.map((s, i) => (
              <div key={i} className="bkh-session-card">
                <div style={{ flex: 1 }}>
                  <div className="bkh-session-cat">{s.category}</div>
                  <div className="bkh-session-title">{s.title}</div>
                  <div className="bkh-session-speaker">{s.speaker}</div>
                </div>
                <div className="bkh-session-year">{s.edition}</div>
              </div>
            ))}
            <div className="bkh-cta-strip">
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>100+ session recordings available</div>
                <div style={{ fontSize: 13, color: "var(--text-body)" }}>Full library accessible to all registered delegates for 30 days post-event.</div>
              </div>
              <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                Register for Access
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        )}

        {/* REPORTS */}
        {tab === "reports" && (
          <div className="bkh-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Research Reports</h2>
                <p style={{ fontSize: 13, color: "var(--text-body)" }}>Annual CIO benchmarking research from the Big CIO Show editorial team.</p>
              </div>
            </div>
            {REPORTS.map((r, i) => (
              <div key={i} className="bkh-report-card">
                <div className="bkh-report-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="bkh-report-year">{r.year} Edition</div>
                  <div className="bkh-report-title">{r.title}</div>
                  <div className="bkh-report-pages">{r.pages}</div>
                  <div className="bkh-report-desc">{r.desc}</div>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline" style={{ display: "inline-flex", fontSize: 11, padding: "8px 18px" }}>
                    Request Report
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INSIGHTS */}
        {tab === "insights" && (
          <div className="bkh-section">
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>CIO Insights</h2>
              <p style={{ fontSize: 13, color: "var(--text-body)" }}>Perspectives, opinions, and analysis from India&apos;s top technology leaders — curated from 15 editions of Big CIO Show.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
              {[
                { tag: "AI & Automation",   title: "Why 73% of Indian CIOs Are Prioritising AI Governance in 2026", excerpt: "After two years of experimentation, Indian enterprise CIOs are shifting from AI pilots to AI policy — building frameworks for responsible deployment at scale.", date: "March 2026" },
                { tag: "Cybersecurity",     title: "Zero Trust Is Not a Product. Here Is What Indian CIOs Actually Implemented.", excerpt: "The gap between zero-trust marketing and zero-trust implementation is wider than vendors claim. Six CISO perspectives from the Big CIO Show roundtable.", date: "February 2026" },
                { tag: "Cloud",             title: "The Cloud ROI Question Indian CIOs Are Finally Asking Out Loud", excerpt: "Three years post-migration, Indian enterprises are scrutinising cloud costs with the same rigour they once applied to capex. What the numbers look like.", date: "January 2026" },
                { tag: "Leadership",        title: "The CIO as Business Co-Creator: India&apos;s IT Leaders Redefine the Role", excerpt: "Across BFSI, healthcare, and manufacturing, Indian CIOs are moving from back-office enablers to strategic revenue partners. Here is what that transition looks like.", date: "December 2025" },
                { tag: "Data & Analytics",  title: "Data Governance in Indian Enterprises: Where the Gaps Still Are", excerpt: "Despite significant investments in data platforms, Indian enterprises continue to struggle with data quality, ownership, and governance at scale.", date: "November 2025" },
                { tag: "Industry",          title: "Manufacturing CIOs on Digital Transformation: Honest Assessments", excerpt: "Six manufacturing CIOs share what actually changed after their digital transformation programs — and what they would do differently.", date: "October 2025" },
              ].map((ins, i) => (
                <div key={i} style={{
                  background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16,
                  padding: "28px 28px", transition: "border-color 0.3s",
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.20)", padding: "3px 10px", borderRadius: "100px", display: "inline-block", marginBottom: 12 }}>{ins.tag}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", lineHeight: 1.4, marginBottom: 10 }}>{ins.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-body)", lineHeight: 1.7, marginBottom: 16 }}>{ins.excerpt}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>{ins.date}</div>
                </div>
              ))}
            </div>
            <div className="bkh-cta-strip">
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Full library of CIO insights — register for access</div>
                <div style={{ fontSize: 13, color: "var(--text-body)" }}>100+ articles, 15 research reports, and post-event session recordings available to delegates.</div>
              </div>
              <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                Register Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
