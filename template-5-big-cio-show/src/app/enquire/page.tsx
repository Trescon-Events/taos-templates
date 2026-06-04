"use client";
import { useState } from "react";

type EnquiryType = "sponsor" | "delegate" | "speaker" | "media" | "general";

export default function EnquirePage() {
  const [type, setType] = useState<EnquiryType>("sponsor");
  const [submitted, setSubmitted] = useState(false);

  const TYPES: { id: EnquiryType; label: string; desc: string }[] = [
    { id: "sponsor",  label: "Sponsor / Exhibit", desc: "Packages, pricing, and partnership options" },
    { id: "delegate", label: "Delegate",           desc: "Group bookings and registration queries" },
    { id: "speaker",  label: "Speak",              desc: "Speaker applications and nominations" },
    { id: "media",    label: "Media Partner",      desc: "Accreditation and media partnerships" },
    { id: "general",  label: "General",            desc: "Any other enquiry" },
  ];

  return (
    <>
      <style>{`
        .beq-page { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }
        .beq-hero {
          background: var(--bg-surface); padding: 72px 40px 64px;
          border-bottom: 1px solid rgba(124,58,237,0.10);
          position: relative; overflow: hidden;
        }
        .beq-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .beq-hero-inner { position: relative; z-index: 2; max-width: 700px; }
        .beq-h1 { font-size: clamp(22px, 2.6vw, 38px); font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1.12; margin-bottom: 14px; }
        .beq-h1 em { font-style: normal; color: var(--cyan); }
        .beq-sub { font-size: 18px; color: var(--text-body); max-width: 480px; line-height: 1.75; }

        .beq-wrap {
          max-width: 1320px; margin: 0 auto; padding: 72px 40px 100px;
          display: grid; grid-template-columns: 1fr 1.6fr; gap: 56px; align-items: start;
        }
        .beq-info {}
        .beq-info-section { margin-bottom: 40px; }
        .beq-info-label { font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 16px; }
        .beq-info-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
        .beq-info-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          background: rgba(124,58,237,0.10); border: 1px solid rgba(124,58,237,0.20);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          color: var(--cyan);
        }
        .beq-info-val { font-size: 18px; color: #ffffff; line-height: 1.5; }
        .beq-info-key { font-size: 13px; color: rgba(255,255,255,0.70); letter-spacing: 0.06em; margin-top: 2px; }

        .beq-form-card {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.15);
          border-radius: 16px; padding: 48px 40px;
        }
        .beq-type-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 32px; }
        .beq-type-btn {
          padding: 12px 10px; border-radius: 8px; cursor: pointer;
          border: 1px solid var(--border); background: var(--bg-card);
          text-align: center; transition: border-color 0.2s, background 0.2s;
        }
        .beq-type-btn.active { border-color: var(--cyan); background: rgba(192,132,252,0.08); }
        .beq-type-label { font-size: 13px; font-weight: 700; color: #fff; letter-spacing: 0.04em; }
        .beq-type-desc { font-size: 18px; color: rgba(255,255,255,0.90); margin-top: 3px; line-height: 1.4; }
        .beq-field { margin-bottom: 18px; }
        .beq-label { font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.92); margin-bottom: 6px; display: block; }
        .beq-input {
          width: 100%; background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 8px; padding: 12px 14px; font-size: 13.5px;
          font-family: inherit; color: #fff; outline: none;
          transition: border-color 0.2s;
        }
        .beq-input:focus { border-color: rgba(124,58,237,0.50); }
        .beq-input::placeholder { color: rgba(255,255,255,0.20); }
        .beq-textarea { resize: vertical; min-height: 110px; }
        .beq-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .beq-submit {
          width: 100%; padding: 15px; border: none; border-radius: 8px;
          background: linear-gradient(135deg, #7C3AED, #C084FC);
          color: #fff; font-size: 13px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          font-family: inherit; margin-top: 8px;
        }
        .beq-submit:hover { opacity: 0.88; transform: translateY(-1px); }

        .beq-success {
          text-align: center; padding: 64px 40px;
        }
        .beq-success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(192,132,252,0.12); border: 1px solid rgba(192,132,252,0.25);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; color: var(--cyan);
        }
        .beq-success h2 { font-size: 28px; font-weight: 900; letter-spacing: -0.02em; color: #fff; margin-bottom: 10px; }
        .beq-success p { font-size: 18px; color: var(--text-body); max-width: 400px; margin: 0 auto; line-height: 1.7; }

        @media (max-width: 900px) {
          .beq-wrap { grid-template-columns: 1fr; gap: 40px; }
          .beq-hero { padding: 56px 24px 48px; }
        }
        @media (max-width: 600px) {
          .beq-wrap { padding: 48px 24px 72px; }
          .beq-form-card { padding: 32px 24px; }
          .beq-type-grid { grid-template-columns: 1fr 1fr; }
          .beq-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="beq-page">
        <div className="beq-hero">
          <div className="beq-hero-inner" style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div className="bcio-eyebrow">Get in Touch</div>
            <h1 className="beq-h1">Let&apos;s <em>Connect</em></h1>
            <p className="beq-sub">Whether you&apos;re looking to sponsor, attend, speak, or partner — our team responds within one business day.</p>
          </div>
        </div>

        <div className="beq-wrap">
          <div className="beq-info">
            <div className="beq-info-section">
              <div className="beq-info-label">Contact</div>
              <div className="beq-info-item">
                <div className="beq-info-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div className="beq-info-val">info@bigcioshow.com</div>
                  <div className="beq-info-key">General Enquiries</div>
                </div>
              </div>
              <div className="beq-info-item">
                <div className="beq-info-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                </div>
                <div>
                  <div className="beq-info-val">Bengaluru, India</div>
                  <div className="beq-info-key">15th Edition · 2026</div>
                </div>
              </div>
            </div>
            <div className="beq-info-section">
              <div className="beq-info-label">Organised By</div>
              <div className="beq-info-item">
                <div className="beq-info-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <div>
                  <div className="beq-info-val">Trescon Global</div>
                  <div className="beq-info-key">Event Organiser</div>
                </div>
              </div>
            </div>
          </div>

          <div className="beq-form-card">
            {submitted ? (
              <div className="beq-success">
                <div className="beq-success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2>Message Sent</h2>
                <p>Our team will get back to you within one business day. Thank you for your interest in Big CIO Show &amp; Awards 2026.</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.70)", marginBottom: 12 }}>I am enquiring about</div>
                  <div className="beq-type-grid">
                    {TYPES.map(t => (
                      <div key={t.id} className={`beq-type-btn${type === t.id ? " active" : ""}`} onClick={() => setType(t.id)}>
                        <div className="beq-type-label">{t.label}</div>
                        <div className="beq-type-desc">{t.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="beq-row">
                  <div className="beq-field">
                    <label className="beq-label">First Name</label>
                    <input className="beq-input" type="text" placeholder="Ravi" />
                  </div>
                  <div className="beq-field">
                    <label className="beq-label">Last Name</label>
                    <input className="beq-input" type="text" placeholder="Kumar" />
                  </div>
                </div>
                <div className="beq-field">
                  <label className="beq-label">Work Email</label>
                  <input className="beq-input" type="email" placeholder="ravi.kumar@company.com" />
                </div>
                <div className="beq-row">
                  <div className="beq-field">
                    <label className="beq-label">Company</label>
                    <input className="beq-input" type="text" placeholder="Your Organisation" />
                  </div>
                  <div className="beq-field">
                    <label className="beq-label">Job Title</label>
                    <input className="beq-input" type="text" placeholder="CIO / CTO / VP IT" />
                  </div>
                </div>
                <div className="beq-field">
                  <label className="beq-label">Message</label>
                  <textarea className="beq-input beq-textarea" placeholder="Tell us how we can help..." />
                </div>
                <button className="beq-submit" onClick={() => setSubmitted(true)}>
                  Send Message
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 8 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
