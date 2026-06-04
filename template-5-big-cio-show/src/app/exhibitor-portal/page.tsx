"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "overview" | "leads" | "booth" | "checklist";

export default function ExhibitorPortalPage() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <>
      <style>{`
        .bep-page { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }
        .bep-tabbar {
          background: var(--bg-surface); border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .bep-tabbar-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: flex; overflow-x: auto; scrollbar-width: none;
        }
        .bep-tabbar-inner::-webkit-scrollbar { display: none; }
        .bep-tab {
          font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.90);
          padding: 16px 22px; cursor: pointer; border: none; background: none;
          font-family: inherit; border-bottom: 2px solid transparent;
          white-space: nowrap; transition: color 0.2s, border-color 0.2s;
        }
        .bep-tab:hover { color: #ffffff; }
        .bep-tab.active { color: var(--cyan); border-bottom-color: var(--cyan); }

        .bep-hero {
          background: var(--bg-surface); padding: 80px 40px 72px;
          text-align: center; position: relative; overflow: hidden;
          border-bottom: 1px solid rgba(124,58,237,0.10);
        }
        .bep-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .bep-hero-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .bep-h1 { font-size: clamp(22px, 2.6vw, 38px); font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1.15; margin-bottom: 16px; }
        .bep-h1 em { font-style: normal; color: var(--cyan); }
        .bep-sub { font-size: 18px; color: var(--text-body); max-width: 560px; margin: 0 auto 36px; line-height: 1.75; }
        .bep-section { max-width: 1320px; margin: 0 auto; padding: 72px 40px 80px; }
        .bep-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 48px; }
        .bep-card { background: var(--bg-card); border: 1px solid var(--border); padding: 28px 24px; border-radius: 16px; }
        .bep-num { font-size: 13px; font-weight: 900; letter-spacing: 0.12em; color: var(--cyan); margin-bottom: 14px; }
        .bep-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.3; }
        .bep-desc { font-size: 18px; color: var(--text-body); line-height: 1.7; }

        .bep-login-box {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.25);
          border-radius: 20px; padding: 64px 48px; text-align: center;
          max-width: 520px; margin: 0 auto;
          position: relative; overflow: hidden;
        }
        .bep-login-box::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7C3AED, #C084FC);
        }
        .bep-checklist-row {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .bep-check-box {
          width: 20px; height: 20px; border: 2px solid rgba(124,58,237,0.40); border-radius: 5px;
          flex-shrink: 0; margin-top: 1px;
        }
        .bep-cta-strip {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.15);
          padding: 36px 40px; display: flex; align-items: center;
          justify-content: space-between; gap: 32px; flex-wrap: wrap; border-radius: 16px;
          margin-top: 48px;
        }

        @media (max-width: 768px) {
          .bep-hero { padding: 56px 24px 48px; }
          .bep-section { padding: 48px 24px 64px; }
          .bep-tabbar-inner { padding: 0 16px; }
          .bep-grid { grid-template-columns: repeat(2,1fr); }
          .bep-login-box { padding: 40px 24px; }
          .bep-cta-strip { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 480px) {
          .bep-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="bep-page">
        <div className="bep-tabbar">
          <div className="bep-tabbar-inner">
            {([
              ["overview",   "Overview"],
              ["leads",      "Lead Management"],
              ["booth",      "Booth Setup"],
              ["checklist",  "Exhibitor Checklist"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} className={`bep-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <>
            <div className="bep-hero">
              <div className="bep-hero-inner">
                <div className="bcio-eyebrow">Exhibitor Portal</div>
                <h1 className="bep-h1">Your Command Centre for <em>Big CIO Show 2026</em></h1>
                <p className="bep-sub">
                  Everything your team needs to prepare for, execute, and follow up from your Big CIO Show exhibition — lead scanning, meeting management, booth setup, and post-event reporting.
                </p>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-gold">
                  Contact Your Account Manager
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
            <div className="bep-section">
              <div className="bep-grid">
                {[
                  { num: "01", title: "Lead Scanning App",            desc: "Scan any delegate badge in under 3 seconds. Add notes, tag lead quality, and export to your CRM the same day." },
                  { num: "02", title: "Pre-Scheduled Meetings",       desc: "View, confirm, and manage your 1:1 meeting schedule with pre-matched CIOs in the exhibitor dashboard." },
                  { num: "03", title: "Booth Management",             desc: "Access booth dimensions, power layout, AV specs, and setup guidelines from one organised portal." },
                  { num: "04", title: "Staff Badges & Access",        desc: "Manage your team&apos;s onsite access, print exhibitor badges, and allocate booth roles — all before the event day." },
                  { num: "05", title: "Demo Slot Scheduler",          desc: "Set your available demo times and let interested delegates book 15-minute product demonstrations at your booth." },
                  { num: "06", title: "Post-Event Lead Report",       desc: "Clean lead export with full contact data, interaction timestamp, and lead quality tags — delivered within 48 hours." },
                  { num: "07", title: "Brand Asset Submission",       desc: "Submit your logos, artwork, and digital assets for all pre-event communications through the portal." },
                  { num: "08", title: "Direct Account Manager Line",  desc: "Every exhibitor has a dedicated Big CIO Show account manager reachable via WhatsApp, email, or phone." },
                ].map(b => (
                  <div key={b.num} className="bep-card">
                    <div className="bep-num">{b.num}</div>
                    <div className="bep-title">{b.title}</div>
                    <div className="bep-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
              <div className="bep-cta-strip">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Portal access is provided 4 weeks before the event</div>
                  <div style={{ fontSize: 13, color: "var(--text-body)" }}>Exhibitors and sponsors receive login credentials after contract confirmation. Contact your account manager for access.</div>
                </div>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                  Contact Account Manager
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* LEAD MANAGEMENT */}
        {tab === "leads" && (
          <>
            <div className="bep-hero">
              <div className="bep-hero-inner">
                <div className="bcio-eyebrow">Lead Scanning & Management</div>
                <h1 className="bep-h1">Capture Every CIO Interaction. <em>Miss Nothing.</em></h1>
                <p className="bep-sub">
                  The Big CIO Show lead management system lets your booth team scan, tag, and sync leads in real time — directly from any smartphone, without additional hardware.
                </p>
              </div>
            </div>
            <div className="bep-section">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 20 }}>How It Works</div>
                  {[
                    { step: "1", title: "Open the Lead App",           desc: "Access the exhibitor app from your phone browser — no download required. Log in with your portal credentials." },
                    { step: "2", title: "Scan the Badge QR",           desc: "Point your camera at any delegate&apos;s event badge QR code. Contact data populates instantly." },
                    { step: "3", title: "Add Notes & Tags",            desc: "Mark lead quality (Hot / Warm / Cold), add follow-up notes, and tag by product interest — on the spot." },
                    { step: "4", title: "Sync to Your CRM",            desc: "All leads sync to the portal dashboard in real time. Export as CSV or integrate directly with Salesforce, HubSpot, and Zoho CRM." },
                  ].map(s => (
                    <div key={s.step} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#C084FC)", color: "#fff", fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.step}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{s.title}</div>
                        <div style={{ fontSize: 12, color: "var(--text-body)", lineHeight: 1.65 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 20 }}>Lead Data Captured</div>
                  {[
                    "Full name & job title", "Company name & size", "Industry vertical",
                    "Work email address", "Phone number", "LinkedIn profile",
                    "Technology interests (from registration)", "Buying stage", "Session attendance",
                    "Timestamp & booth interaction log",
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 11, alignItems: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: 13, color: "#ffffff" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bep-cta-strip">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Lead scanning is included in all exhibition packages</div>
                  <div style={{ fontSize: 13, color: "var(--text-body)" }}>Post-event lead report delivered within 48 hours. CRM integrations available on request.</div>
                </div>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                  Get Exhibitor Pack
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* BOOTH SETUP */}
        {tab === "booth" && (
          <div className="bep-section">
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Booth Setup Guidelines</h2>
            <p style={{ fontSize: 13, color: "var(--text-body)", marginBottom: 48, lineHeight: 1.75 }}>
              All booth specifications, branding requirements, AV setup, and logistics information for Big CIO Show 2026 exhibitors.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 48 }}>
              {[
                {
                  title: "Standard Booth (9 sqm)",
                  items: ["3m × 3m floor space", "1 × 6ft table + 4 chairs", "2 × 100W power sockets", "1 × HDMI monitor (42-inch)", "Carpet flooring included", "Wi-Fi — shared exhibitor network", "Booth name fascia (provided by BCIO)", "Access from 7am on event day"],
                },
                {
                  title: "Premium Booth (18 sqm)",
                  items: ["6m × 3m floor space", "Custom table setup", "4 × 100W power sockets", "2 × HDMI monitors (55-inch)", "Premium carpet flooring", "Dedicated Wi-Fi SSID", "Custom fascia (artwork by exhibitor)", "Access from 6am on event day"],
                },
              ].map(b => (
                <div key={b.title} style={{ background: "var(--bg-card)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 16, padding: "32px 28px" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 20 }}>{b.title}</div>
                  {b.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: 12, color: "#ffffff" }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "32px 28px", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Brand Asset Submission Deadlines</div>
              {[
                { deadline: "14 May 2026", item: "Booth fascia artwork (AI/PDF, CMYK, print-ready)" },
                { deadline: "20 May 2026", item: "Digital assets for app and event website (logos — PNG, SVG)" },
                { deadline: "25 May 2026", item: "Demo slide deck for spotlight stage slots" },
                { deadline: "28 May 2026", item: "Final exhibitor team badge list (names + designations)" },
              ].map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 20, paddingBottom: 12, marginBottom: 12, borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none", flexWrap: "wrap" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", minWidth: 100, flexShrink: 0 }}>{d.deadline}</div>
                  <div style={{ fontSize: 12, color: "var(--text-body)" }}>{d.item}</div>
                </div>
              ))}
            </div>
            <div className="bep-cta-strip">
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Need help with your booth setup?</div>
                <div style={{ fontSize: 13, color: "var(--text-body)" }}>Your account manager handles all on-ground logistics coordination.</div>
              </div>
              <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline" style={{ flexShrink: 0 }}>Contact Account Manager</Link>
            </div>
          </div>
        )}

        {/* EXHIBITOR CHECKLIST */}
        {tab === "checklist" && (
          <div className="bep-section" style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Exhibitor Checklist</h2>
            <p style={{ fontSize: 13, color: "var(--text-body)", marginBottom: 48, lineHeight: 1.75 }}>
              Everything your team needs to complete before Big CIO Show 2026. Use this as your master preparation list.
            </p>
            {[
              {
                section: "6–8 Weeks Before",
                items: [
                  "Confirm exhibition package and contract with your account manager",
                  "Submit payment and receive portal login credentials",
                  "Register all booth staff for exhibitor badges (max based on package)",
                  "Submit high-resolution logo (PNG + SVG) for event website and app",
                  "Define your 1:1 meeting target profile for AI matchmaking",
                ],
              },
              {
                section: "4 Weeks Before",
                items: [
                  "Submit booth fascia artwork (print-ready AI/PDF, CMYK)",
                  "Confirm AV and power requirements with the logistics team",
                  "Set up lead scanning app on all booth team devices",
                  "Review your pre-matched meeting list and confirm/reject requests",
                  "Finalize your 2-minute innovation spotlight script (if applicable)",
                ],
              },
              {
                section: "1 Week Before",
                items: [
                  "Submit final demo slide deck for spotlight stage",
                  "Confirm meeting schedule with all pre-matched delegates",
                  "Brief your booth team on lead scanning procedure and quality tagging",
                  "Organise printed collateral, giveaways, and branding materials",
                  "Confirm booth setup access time with your account manager",
                ],
              },
              {
                section: "On Event Day",
                items: [
                  "Arrive at setup time (see booth specifications for your package)",
                  "Test lead scanning app with a live badge scan from your team",
                  "Confirm demo equipment and AV connections",
                  "Log all 1:1 meetings as complete or rescheduled in the app",
                  "Collect business cards and cross-reference with scanned leads",
                ],
              },
              {
                section: "Post-Event (48 Hours)",
                items: [
                  "Download lead export CSV from the exhibitor portal",
                  "Import leads to your CRM with source tag 'Big CIO Show 2026'",
                  "Send personalised follow-up emails within 48 hours of the event",
                  "Review engagement analytics and session attendance data",
                  "Submit NPS feedback to your account manager",
                ],
              },
            ].map(section => (
              <div key={section.section} style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16 }}>{section.section}</div>
                {section.items.map((item, i) => (
                  <div key={i} className="bep-checklist-row">
                    <div className="bep-check-box" />
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.92)", lineHeight: 1.55 }}>{item}</div>
                  </div>
                ))}
              </div>
            ))}
            <div className="bep-cta-strip">
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Your account manager is your single point of contact</div>
                <div style={{ fontSize: 13, color: "var(--text-body)" }}>For any checklist item requiring coordination with the Big CIO Show team, contact your dedicated account manager directly.</div>
              </div>
              <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary" style={{ flexShrink: 0 }}>
                Contact Us
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
