"use client";
import { useState } from "react";
import Link from "next/link";

const PASS_URL = "https://konfhub.com/checkout/big-cio-show-awards-2026?ticketId=93845%7C1%3B&selectedCode=MKTWEBSITE";
type Tab = "attend" | "exhibit" | "pitch";

export default function StartupsPage() {
  const [tab, setTab] = useState<Tab>("attend");

  return (
    <>
      <style>{`
        .bst-page { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }
        .bst-tabbar {
          background: var(--bg-surface); border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .bst-tabbar-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: flex; overflow-x: auto; scrollbar-width: none;
        }
        .bst-tabbar-inner::-webkit-scrollbar { display: none; }
        .bst-tab {
          font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.90);
          padding: 16px 22px; cursor: pointer; border: none; background: none;
          font-family: inherit; border-bottom: 2px solid transparent;
          white-space: nowrap; transition: color 0.2s, border-color 0.2s;
        }
        .bst-tab:hover { color: #ffffff; }
        .bst-tab.active { color: var(--cyan); border-bottom-color: var(--cyan); }

        .bst-hero {
          background: var(--bg-surface); padding: 80px 40px 72px;
          text-align: center; position: relative; overflow: hidden;
          border-bottom: 1px solid rgba(124,58,237,0.10);
        }
        .bst-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .bst-hero-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .bst-h1 { font-size: clamp(22px, 2.6vw, 38px); font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1.15; margin-bottom: 16px; }
        .bst-h1 em { font-style: normal; color: var(--cyan); }
        .bst-sub { font-size: 18px; color: var(--text-body); max-width: 560px; margin: 0 auto 36px; line-height: 1.75; }

        .bst-section { max-width: 1320px; margin: 0 auto; padding: 72px 40px 80px; }
        .bst-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 48px; }
        .bst-card { background: var(--bg-card); border: 1px solid var(--border); padding: 28px 24px; border-radius: 16px; }
        .bst-num { font-size: 13px; font-weight: 900; letter-spacing: 0.12em; color: var(--cyan); margin-bottom: 14px; }
        .bst-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.3; }
        .bst-desc { font-size: 18px; color: var(--text-body); line-height: 1.7; }

        .bst-pitch-card {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.25);
          border-radius: 20px; padding: 48px; text-align: center;
          position: relative; overflow: hidden; margin-bottom: 24px;
        }
        .bst-pitch-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7C3AED, #C084FC);
        }
        .bst-steps {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 48px 0;
        }
        .bst-step {
          text-align: center; padding: 24px 16px;
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
        }
        .bst-step-num {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #7C3AED, #C084FC);
          color: #fff; font-size: 18px; font-weight: 900;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px;
        }
        .bst-step-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .bst-step-desc { font-size: 18px; color: var(--text-body); line-height: 1.65; }
        .bst-cta-strip {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.15);
          padding: 36px 40px; display: flex; align-items: center;
          justify-content: space-between; gap: 32px; flex-wrap: wrap; border-radius: 16px;
        }

        @media (max-width: 900px) {
          .bst-grid { grid-template-columns: repeat(2, 1fr); }
          .bst-steps { grid-template-columns: repeat(2, 1fr); }
          .bst-cta-strip { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 600px) {
          .bst-hero { padding: 56px 24px 48px; }
          .bst-section { padding: 48px 24px 64px; }
          .bst-tabbar-inner { padding: 0 16px; }
          .bst-grid { grid-template-columns: 1fr; }
          .bst-steps { grid-template-columns: 1fr; }
          .bst-pitch-card { padding: 32px 24px; }
        }
      `}</style>

      <div className="bst-page">
        {/* Tab bar */}
        <div className="bst-tabbar">
          <div className="bst-tabbar-inner">
            {([
              ["attend",  "Attend as a Startup"],
              ["exhibit", "Exhibit as a Startup"],
              ["pitch",   "Pitch Competition"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} className={`bst-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ATTEND */}
        {tab === "attend" && (
          <>
            <div className="bst-hero">
              <div className="bst-hero-inner">
                <div className="bcio-eyebrow">Startups at Big CIO Show</div>
                <h1 className="bst-h1">The Room Where <em>CIOs Decide</em></h1>
                <p className="bst-sub">
                  Every year, a select cohort of high-growth B2B startups earn a seat at India&apos;s largest CIO gathering. Network directly with 8,500+ enterprise technology decision-makers — no cold outreach, no gatekeepers.
                </p>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                  Apply for Startup Access
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
            <div className="bst-section">
              <div className="bst-grid">
                {[
                  { num: "01", title: "Direct CIO Access",         desc: "Attend all sessions alongside India&apos;s most senior technology executives. Be in the room where buying decisions are shaped." },
                  { num: "02", title: "Curated 1:1 Meetings",      desc: "Pre-scheduled meetings with CIOs matched to your target industry and use case. No cold introductions — warm, structured conversations." },
                  { num: "03", title: "Startup Networking Lounge", desc: "Dedicated lounge area for startups to connect with each other, investors, and enterprise sponsors throughout the day." },
                  { num: "04", title: "Investor Introductions",    desc: "Big CIO Show hosts VCs and corporate venture arms. Startup attendees are introduced to relevant investors as part of the program." },
                  { num: "05", title: "Event App Profile",         desc: "Your startup profile is visible to all 8,500+ registered delegates and sponsors in the event app before and during the event." },
                  { num: "06", title: "Featured in CIO Report",    desc: "Top startups attending Big CIO Show are featured in the post-event CIO Benchmarking Report circulated to 100,000+ IT professionals." },
                ].map(b => (
                  <div key={b.num} className="bst-card">
                    <div className="bst-num">{b.num}</div>
                    <div className="bst-title">{b.title}</div>
                    <div className="bst-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
              <div className="bst-cta-strip">
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.70)", marginBottom: 12 }}>Who Should Apply</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Enterprise SaaS", "Cybersecurity", "AI / ML", "Cloud Infrastructure", "Data & Analytics", "ERP & Automation", "IT Services"].map(r => (
                      <span key={r} style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.20)", padding: "5px 12px", borderRadius: 6, whiteSpace: "nowrap" }}>{r}</span>
                    ))}
                  </div>
                </div>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                  Register Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </>
        )}

        {/* EXHIBIT */}
        {tab === "exhibit" && (
          <>
            <div className="bst-hero">
              <div className="bst-hero-inner">
                <div className="bcio-eyebrow">Startup Exhibition</div>
                <h1 className="bst-h1">Showcase Your Product to <em>Enterprise Buyers</em></h1>
                <p className="bst-sub">
                  Big CIO Show offers a dedicated Startup Zone within the main exhibition floor. Live demos, structured meeting slots, and brand visibility designed for early-stage to growth-stage B2B companies.
                </p>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-gold">
                  Enquire About Startup Zone
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
            <div className="bst-section">
              <div className="bst-grid">
                {[
                  { num: "01", title: "Startup Zone Booth",       desc: "Compact, high-traffic booth in the dedicated Startup Zone — designed for demos, conversations, and lead capture." },
                  { num: "02", title: "Demo Slots",               desc: "Structured 15-minute demo sessions with pre-matched CIOs throughout the event day." },
                  { num: "03", title: "Lead Scanning App",        desc: "Scan delegate badges and capture verified contact data using the exhibitor lead app." },
                  { num: "04", title: "Innovation Spotlight",     desc: "2-minute lightning spotlight on the main stage — pitch your product to the entire audience between sessions." },
                  { num: "05", title: "Startup Badge Branding",   desc: "Startup exhibitors are prominently labeled in the event app and printed materials so CIOs can find and visit you." },
                  { num: "06", title: "Post-Event Lead Report",   desc: "All scanned leads, demo attendees, and badge interactions delivered as a clean report within 48 hours post-event." },
                ].map(b => (
                  <div key={b.num} className="bst-card">
                    <div className="bst-num" style={{ color: "var(--gold)" }}>{b.num}</div>
                    <div className="bst-title">{b.title}</div>
                    <div className="bst-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
              <div className="bst-cta-strip" style={{ borderColor: "rgba(201,168,76,0.20)" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Startup Zone packages start at a fraction of the cost of standard exhibition.</div>
                  <div style={{ fontSize: 13, color: "var(--text-body)" }}>Limited slots available — applications are reviewed and approved based on product relevance.</div>
                </div>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-gold" style={{ flexShrink: 0 }}>
                  Apply Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* PITCH COMPETITION */}
        {tab === "pitch" && (
          <div className="bst-section" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="bst-pitch-card">
              <div className="bcio-eyebrow" style={{ marginBottom: 16 }}>Big CIO Startup Pitch</div>
              <h2 style={{ fontSize: "clamp(22px, 2.6vw, 38px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 16, lineHeight: 1.15 }}>
                Pitch to <span style={{ color: "var(--cyan)" }}>India&apos;s Top CIOs</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-body)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.75 }}>
                The Big CIO Startup Pitch is a live, curated competition held on the main stage at Big CIO Show. 8 selected startups pitch their enterprise product to a jury of senior CIOs, CTOs, and investors — in front of 8,500+ technology decision-makers.
              </p>
              <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                Apply for the Pitch Competition
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            <div className="bst-steps">
              {[
                { n: "1", title: "Apply Online",         desc: "Submit your pitch deck, product demo video, and traction metrics via our application form." },
                { n: "2", title: "Shortlist Review",     desc: "Our jury of CIOs reviews all applications. Top 20 are invited to a 15-minute virtual screening call." },
                { n: "3", title: "Final 8 Selected",     desc: "8 startups are selected for the live stage. Finalists receive exhibitor access + coaching session." },
                { n: "4", title: "Live Pitch on Stage",  desc: "6-minute pitch + 4-minute Q&A with the jury on the Big CIO Show main stage before 8,500+ attendees." },
              ].map(s => (
                <div key={s.n} className="bst-step">
                  <div className="bst-step-num">{s.n}</div>
                  <div className="bst-step-title">{s.title}</div>
                  <div className="bst-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 48 }}>
              {[
                { label: "Winner",      prize: "₹5 Lakh",        desc: "Cash prize + 12-month CIO mentorship program + featured case study in CIO Report" },
                { label: "Runner Up",   prize: "₹2 Lakh",        desc: "Cash prize + investor introductions + featured in event media coverage" },
                { label: "Jury Choice", prize: "Special Award",   desc: "CIO Jury Choice Award + 6 months of co-marketing with Big CIO Show channels" },
              ].map(p => (
                <div key={p.label} style={{
                  background: "var(--bg-card)", border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: 16, padding: "28px 24px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>{p.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>{p.prize}</div>
                  <div style={{ fontSize: 12, color: "var(--text-body)", lineHeight: 1.65 }}>{p.desc}</div>
                </div>
              ))}
            </div>

            <div className="bst-cta-strip" style={{ borderColor: "rgba(201,168,76,0.20)", textAlign: "center", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Applications close 30 April 2026</div>
                <div style={{ fontSize: 13, color: "var(--text-body)", marginBottom: 24 }}>Early-stage to Series B startups with an enterprise B2B product are eligible to apply.</div>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">Apply for Pitch Competition</Link>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Download Criteria PDF</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
