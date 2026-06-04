"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── SWAP THESE WHEN YOU HAVE YOUR HUBSPOT FORM IDs ────────────────────────
const HS_PORTAL_ID     = "2953901";
const HS_FORM_DELEGATE = "b91487d4-9b3a-40c8-a1f4-47e92cd97e27";
// ─────────────────────────────────────────────────────────────────────────

const delegateFeatures = [
  "All keynote & panel sessions",
  "Product showcase floor",
  "Networking lunch & coffee breaks",
  "Awards ceremony attendance",
  "Event app & speaker materials",
  "Access to 400+ senior CX leaders",
];

export default function RegisterPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hsLoaded, setHsLoaded]   = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalOpen) return;

    const initForm = () => {
      if (typeof (window as any).hbspt === "undefined") return;
      const target = document.getElementById("rg-hs-form-target");
      if (!target) return;
      target.innerHTML = "";
      (window as any).hbspt.forms.create({
        region: "na1",
        portalId: HS_PORTAL_ID,
        formId: HS_FORM_DELEGATE,
        target: "#rg-hs-form-target",
      });
      setHsLoaded(true);
    };

    const existing = document.getElementById("hs-embed-script");
    if (existing) { initForm(); return; }
    const script = document.createElement("script");
    script.id = "hs-embed-script";
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.onload = initForm;
    document.head.appendChild(script);
  }, [modalOpen]);

  useEffect(() => { if (!modalOpen) setHsLoaded(false); }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <>
      <style>{`
        .rg-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 72px;
        }

        /* ── Hero ── */
        .rg-hero {
          background: #060F1C;
          padding: 80px 40px 72px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .rg-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 110%, rgba(54,188,176,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 15% 90%, rgba(201,168,76,0.05) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 85% 90%, rgba(201,168,76,0.05) 0%, transparent 55%);
          pointer-events: none;
        }
        .rg-hero::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--coral) 35%, var(--gold) 65%, transparent);
          opacity: 0.25;
        }
        .rg-hero-inner { max-width: 680px; margin: 0 auto; position: relative; z-index: 2; }
        .rg-overline {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: var(--coral); margin-bottom: 20px;
        }
        .rg-overline::before, .rg-overline::after {
          content: ''; width: 24px; height: 1px;
          background: var(--coral); opacity: 0.60; flex-shrink: 0;
        }
        .rg-h1 {
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.12; margin: 0 0 18px;
        }
        .rg-h1 em { font-style: normal; color: var(--coral); }
        .rg-sub {
          font-size: 15px; color: var(--text-body);
          line-height: 1.8; max-width: 520px; margin: 0 auto;
        }
        .rg-meta {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; flex-wrap: wrap; margin-top: 28px;
        }
        .rg-meta-pill {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
          color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 99px;
          padding: 5px 14px;
        }
        .rg-meta-pill svg { color: var(--coral); flex-shrink: 0; }
        .rg-meta-sep { color: rgba(255,255,255,0.15); font-size: 16px; }

        /* ── Pass section ── */
        .rg-section {
          max-width: 860px; margin: 0 auto;
          padding: 80px 40px 40px;
        }

        /* ── Delegate card ── */
        .rg-delegate-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          background: var(--bg-surface);
          border: 1px solid rgba(54,188,176,0.28);
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.10),
            0 0 60px rgba(54,188,176,0.10),
            0 24px 64px rgba(0,0,0,0.45);
          transition: box-shadow 0.35s, border-color 0.35s;
        }
        .rg-delegate-wrap:hover {
          border-color: rgba(54,188,176,0.55);
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.28),
            0 0 48px rgba(54,188,176,0.22),
            0 0 96px rgba(54,188,176,0.10),
            inset 0 0 40px rgba(54,188,176,0.04),
            0 24px 64px rgba(0,0,0,0.45);
        }

        /* Left panel */
        .rg-delegate-left {
          padding: 48px 44px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
        }
        .rg-delegate-left::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--coral), var(--gold));
        }
        .rg-free-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.20em;
          text-transform: uppercase;
          color: var(--coral);
          background: rgba(54,188,176,0.08);
          border: 1px solid rgba(54,188,176,0.25);
          border-radius: 99px;
          padding: 5px 14px;
          margin-bottom: 24px; width: fit-content;
        }
        .rg-free-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--coral);
          box-shadow: 0 0 6px var(--coral);
          animation: wcx-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .rg-pass-name {
          font-size: 26px; font-weight: 900; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 8px;
        }
        .rg-price-row {
          display: flex; align-items: baseline; gap: 10px;
          margin-bottom: 6px;
        }
        .rg-price {
          font-size: 42px; font-weight: 900; letter-spacing: -0.04em;
          color: var(--coral); line-height: 1;
        }
        .rg-price-note {
          font-size: 10px; font-weight: 600; letter-spacing: 0.10em;
          text-transform: uppercase; color: var(--text-muted);
          margin-bottom: 24px;
        }
        .rg-pass-desc {
          font-size: 14px; color: var(--text-body);
          line-height: 1.8; margin-bottom: 0; flex: 1;
        }

        /* Right panel */
        .rg-delegate-right {
          padding: 48px 44px;
          display: flex; flex-direction: column;
          background: rgba(54,188,176,0.02);
        }
        .rg-features-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--text-muted);
          margin-bottom: 20px;
        }
        .rg-features {
          list-style: none; display: flex; flex-direction: column;
          gap: 14px; margin-bottom: 36px; flex: 1;
        }
        .rg-feature {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 13.5px; color: var(--text-body); line-height: 1.45;
        }
        .rg-feature-check {
          width: 20px; height: 20px; flex-shrink: 0;
          border-radius: 50%;
          background: rgba(54,188,176,0.12);
          color: var(--coral);
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
        }
        .rg-register-btn {
          display: flex; align-items: center; justify-content: center; gap: 9px;
          width: 100%; padding: 15px 24px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--coral); color: #fff;
          border: none; border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .rg-register-btn:hover {
          background: var(--coral-light);
          transform: translateY(-1px);
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.40),
            0 0 24px rgba(54,188,176,0.45),
            0 0 52px rgba(54,188,176,0.20);
        }

        /* ── Why attend ── */
        .rg-why {
          max-width: 860px; margin: 48px auto 0;
          padding: 0 40px;
        }
        .rg-why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .rg-why-item {
          text-align: center; padding: 24px 16px;
          background: var(--bg-surface);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .rg-why-item:hover {
          border-color: rgba(54,188,176,0.55);
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.25),
            0 0 24px rgba(54,188,176,0.28),
            0 0 52px rgba(54,188,176,0.12);
          transform: translateY(-3px);
        }
        .rg-why-num {
          font-size: 32px; font-weight: 900; letter-spacing: -0.04em;
          color: var(--coral); line-height: 1; margin-bottom: 6px;
        }
        .rg-why-desc {
          font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
          color: rgba(255,255,255,0.55); text-transform: uppercase;
        }

        /* ── Sponsorship strip ── */
        .rg-spons {
          max-width: 860px; margin: 48px auto 0;
          padding: 0 40px 96px;
        }
        .rg-spons-card {
          background: var(--bg-surface);
          border: 1px solid rgba(201,168,76,0.20);
          border-radius: 20px;
          padding: 40px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          position: relative; overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .rg-spons-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .rg-spons-card:hover {
          border-color: rgba(201,168,76,0.45);
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.20),
            0 0 40px rgba(201,168,76,0.12),
            0 16px 48px rgba(0,0,0,0.35);
        }
        .rg-spons-left {}
        .rg-spons-tag {
          font-size: 9px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .rg-spons-tag::before {
          content: ''; width: 16px; height: 1.5px;
          background: var(--gold); flex-shrink: 0;
        }
        .rg-spons-title {
          font-size: 22px; font-weight: 900; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 10px;
        }
        .rg-spons-title span { color: var(--gold); }
        .rg-spons-desc {
          font-size: 13px; color: var(--text-body);
          line-height: 1.75; max-width: 420px;
        }
        .rg-spons-btns {
          display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0;
        }

        /* ── Modal ── */
        .rg-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(5,12,24,0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .rg-modal-overlay.open { opacity: 1; pointer-events: all; }
        .rg-modal {
          background: var(--bg-surface);
          border: 1px solid rgba(54,188,176,0.22);
          border-radius: 20px;
          width: 100%; max-width: 580px;
          max-height: 90vh; overflow-y: auto;
          position: relative;
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.10),
            0 0 60px rgba(54,188,176,0.10),
            0 32px 80px rgba(0,0,0,0.65);
          transform: translateY(24px) scale(0.97);
          transition: transform 0.3s ease;
        }
        .rg-modal-overlay.open .rg-modal { transform: translateY(0) scale(1); }
        .rg-modal-top {
          padding: 32px 36px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 0;
          background: var(--bg-surface);
          z-index: 2; border-radius: 20px 20px 0 0;
        }
        .rg-modal-overline {
          font-size: 9px; font-weight: 700; letter-spacing: 0.24em;
          text-transform: uppercase; color: var(--coral);
          margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .rg-modal-overline::before {
          content: ''; width: 18px; height: 1.5px;
          background: var(--coral); flex-shrink: 0;
        }
        .rg-modal-title {
          font-size: 22px; font-weight: 900; letter-spacing: -0.02em;
          color: #fff; line-height: 1.2;
        }
        .rg-modal-title span { color: var(--coral); }
        .rg-modal-sub {
          font-size: 13px; color: var(--text-body);
          margin-top: 8px; line-height: 1.6;
        }
        .rg-modal-close {
          position: absolute; top: 20px; right: 20px;
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          color: rgba(255,255,255,0.55);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .rg-modal-close:hover {
          background: rgba(54,188,176,0.12);
          border-color: rgba(54,188,176,0.35);
          color: var(--coral);
        }
        .rg-modal-body { padding: 28px 36px 36px; }

        /* HubSpot resets */
        .rg-modal-body .hs-form fieldset { max-width: 100% !important; }
        .rg-modal-body .hs-form .hs-input {
          width: 100% !important;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-radius: 8px !important;
          color: #fff !important;
          padding: 10px 14px !important;
          font-family: inherit !important;
          font-size: 14px !important;
        }
        .rg-modal-body .hs-form .hs-input:focus {
          border-color: rgba(54,188,176,0.50) !important;
          outline: none !important;
        }
        .rg-modal-body .hs-form label {
          color: rgba(255,255,255,0.75) !important;
          font-size: 12px !important; font-weight: 600 !important;
          letter-spacing: 0.04em !important; margin-bottom: 6px !important;
          display: block !important;
        }
        .rg-modal-body .hs-form .hs-button {
          background: var(--coral) !important; color: #fff !important;
          border: none !important; border-radius: 10px !important;
          padding: 13px 32px !important; font-size: 12px !important;
          font-weight: 700 !important; letter-spacing: 0.1em !important;
          text-transform: uppercase !important; cursor: pointer !important;
          transition: background 0.2s !important;
        }
        .rg-modal-body .hs-form .hs-button:hover { background: var(--coral-light) !important; }
        .rg-modal-body .hs-error-msgs { color: #ff6b6b !important; font-size: 12px !important; }

        .rg-loading {
          display: flex; flex-direction: column;
          align-items: center; gap: 16px;
          padding: 48px 0;
          color: var(--text-muted); font-size: 13px;
        }
        .rg-spinner {
          width: 32px; height: 32px;
          border: 2px solid rgba(54,188,176,0.18);
          border-top-color: var(--coral);
          border-radius: 50%;
          animation: rg-spin 0.8s linear infinite;
        }
        @keyframes rg-spin { to { transform: rotate(360deg); } }

        @media (max-width: 768px) {
          .rg-delegate-wrap { grid-template-columns: 1fr; }
          .rg-delegate-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 36px 24px; }
          .rg-delegate-right { padding: 32px 24px; }
          .rg-why-grid { grid-template-columns: repeat(2, 1fr); }
          .rg-spons-card { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
          .rg-section, .rg-why, .rg-spons { padding-left: 20px; padding-right: 20px; }
          .rg-section { padding-top: 56px; }
          .rg-hero { padding: 60px 24px 52px; }
          .rg-modal-top { padding: 24px 20px 20px; }
          .rg-modal-body { padding: 20px 20px 28px; }
          .rg-spons-btns { width: 100%; }
          .rg-spons-btns a { width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) {
          .rg-why-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .rg-delegate-left, .rg-delegate-right { padding: 28px 20px; }
          .rg-hero { padding: 48px 20px 44px; }
          .rg-meta { gap: 6px; }
        }
      `}</style>

      <div className="rg-page">

        {/* ── Hero ── */}
        <div className="rg-hero">
          <div className="rg-hero-inner">
            <div className="rg-overline">World CX Summit · Bengaluru 2026</div>
            <h1 className="rg-h1">Register for the<br /><em>Summit</em></h1>
            <p className="rg-sub">
              Join 400+ senior CX leaders, innovators and technology partners for one full day of high-impact sessions — 4 June 2026, Bengaluru.
            </p>
            <div className="rg-meta">
              <div className="rg-meta-pill">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                4 June 2026
              </div>
              <span className="rg-meta-sep">·</span>
              <div className="rg-meta-pill">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Bengaluru, India
              </div>
              <span className="rg-meta-sep">·</span>
              <div className="rg-meta-pill">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                400+ Attendees
              </div>
            </div>
          </div>
        </div>

        {/* ── Delegate Pass ── */}
        <div className="rg-section">
          <div className="rg-delegate-wrap">

            {/* Left — pass info */}
            <div className="rg-delegate-left">
              <div className="rg-free-badge">
                <span className="rg-free-badge-dot" />
                Complimentary Pass
              </div>
              <div className="rg-pass-name">Delegate Pass</div>
              <div className="rg-price-row">
                <span className="rg-price">Free</span>
              </div>
              <div className="rg-price-note">Pre-qualified delegates only · Subject to approval</div>
              <p className="rg-pass-desc">
                Attend one full day of keynotes, panel discussions, product showcases and peer networking — at no cost. World CX Summit is an invite-led event for senior CX professionals. Submit your details and our team will confirm your seat.
              </p>
            </div>

            {/* Right — features + CTA */}
            <div className="rg-delegate-right">
              <div className="rg-features-label">What&apos;s Included</div>
              <ul className="rg-features">
                {delegateFeatures.map(f => (
                  <li key={f} className="rg-feature">
                    <span className="rg-feature-check">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="rg-register-btn" onClick={() => setModalOpen(true)}>
                Register as Delegate
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* ── Why attend ── */}
        <div className="rg-why">
          <div className="rg-why-grid">
            {[
              { num: "400+", desc: "Senior CX Leaders" },
              { num: "40+",  desc: "Expert Speakers" },
              { num: "8",    desc: "Discussion Tracks" },
              { num: "1",    desc: "Power Day" },
            ].map(item => (
              <div key={item.desc} className="rg-why-item">
                <div className="rg-why-num">{item.num}</div>
                <div className="rg-why-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sponsorship enquiry ── */}
        <div className="rg-spons">
          <div className="rg-spons-card">
            <div className="rg-spons-left">
              <div className="rg-spons-tag">For Technology Providers & Brands</div>
              <div className="rg-spons-title">
                Sponsor or <span>Exhibit</span>
              </div>
              <p className="rg-spons-desc">
                Showcase your products to 400+ senior CX decision-makers. We build bespoke sponsorship and exhibition packages — from branded tables to keynote slots.
              </p>
            </div>
            <div className="rg-spons-btns">
              <Link href="/enquire" className="wcx-btn-gold">
                Enquire for Sponsorship
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ── Registration modal ── */}
      <div
        className={`rg-modal-overlay${modalOpen ? " open" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
      >
        <div className="rg-modal" role="dialog" aria-modal="true">
          <div className="rg-modal-top">
            <div className="rg-modal-overline">World CX Summit 2026 · Bengaluru</div>
            <div className="rg-modal-title">
              Register as a <span>Delegate</span>
            </div>
            <p className="rg-modal-sub">
              Fill in your details below. Our team will review and confirm your complimentary seat within 48 hours.
            </p>
            <button className="rg-modal-close" onClick={() => setModalOpen(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="rg-modal-body">
            {!hsLoaded && (
              <div className="rg-loading">
                <div className="rg-spinner" />
                Loading registration form…
              </div>
            )}
            <div id="rg-hs-form-target" ref={formRef} />
          </div>
        </div>
      </div>
    </>
  );
}
