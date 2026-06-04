"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── SWAP THESE WHEN YOU HAVE YOUR HUBSPOT IDs ──────────────────────────────
const HS_PORTAL_ID = "2953901";
const HS_FORM_ID   = "c5a765f2-77cc-40a6-8fa8-9e266ee81069";
// ──────────────────────────────────────────────────────────────────────────


const BASE = "/speakers/";

const speakers = [
  { name: "Gurpreet Jolly",      title: "Head - CX Operations & Service Delivery",          company: "AJIO",                  img: `${BASE}Gurpreet.png`          },
  { name: "Kedar Ravangave",     title: "Head - Customer Experience",                       company: "Amazon India",           img: `${BASE}Kedar.png`             },
  { name: "Lakshman Velayutham", title: "Head - Customer Service",                          company: "Ujjivan Small Finance Bank", img: `${BASE}Lakshman.png`      },
  { name: "Pinkustar Borah",     title: "Head - Customer Experience",                       company: "Hindustan Unilever",     img: `${BASE}Pinkustar.png`         },
  { name: "Deepak Nayak",        title: "Sr Vice President - Customer Experience",          company: "Gameskraft",             img: `${BASE}Deepak-Nayak.png`      },
  { name: "Nikhil Godbole",      title: "Group Head of Customer Service",                   company: "Jupiter Money",          img: `${BASE}Nikhil.png`            },
  { name: "Satish Patil",        title: "Director - CX",                                    company: "Samsung Research India", img: `${BASE}Satish-Patil.png`      },
  { name: "Satish Bettadapur",   title: "Director - Customer Experience",                   company: "HP",                     img: `${BASE}Satish.png`            },
  { name: "Sirishkar B",         title: "Vice President - CX Solutions",                    company: "Tata Communications",    img: `${BASE}Sirishkar.png`         },
  { name: "Deepak Maloo",        title: "AVP, Customer Experience & Restaurant Experience", company: "Swiggy",                img: `${BASE}Deepak.png`            },
];

// Triple the array so the carousel loop is seamless
const looped = [...speakers, ...speakers, ...speakers];

export default function SpeakersSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hsLoaded, setHsLoaded] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Load HubSpot embed script once and render form into the div
  useEffect(() => {
    if (!modalOpen) return;
    if (hsLoaded) return;

    const existing = document.getElementById("hs-embed-script");
    const initForm = () => {
      if (typeof (window as any).hbspt === "undefined") return;
      if (!formRef.current || formRef.current.querySelector("form")) return;
      (window as any).hbspt.forms.create({
        region: "na1",
        portalId: HS_PORTAL_ID,
        formId: HS_FORM_ID,
        target: "#wcx-hs-form-target",
      });
      setHsLoaded(true);
    };

    if (existing) {
      initForm();
    } else {
      const script = document.createElement("script");
      script.id = "hs-embed-script";
      script.src = "//js.hsforms.net/forms/embed/v2.js";
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.onload = initForm;
      document.head.appendChild(script);
    }
  }, [modalOpen, hsLoaded]);

  // Close on Escape key
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      <style>{`
        .wcx-spk {
          background: var(--bg-primary);
          padding: 96px 0 16px;
          position: relative;
          overflow: hidden;
        }
        .wcx-spk::before {
          content: '';
          position: absolute;
          bottom: -120px; right: -120px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .wcx-spk-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* Header */
        .wcx-spk-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 52px;
          flex-wrap: wrap;
        }
        .wcx-spk-overline {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 14px;
        }
        .wcx-spk-overline::before {
          content: '';
          width: 28px; height: 1.5px;
          background: var(--gold);
          flex-shrink: 0;
        }
        .wcx-spk-h2 {
          font-size: clamp(26px, 3.2vw, 44px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 10px;
        }
        .wcx-spk-h2 span { color: var(--gold); }
        .wcx-spk-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(201,168,76,0.10);
          border: 1px solid rgba(201,168,76,0.25);
          padding: 8px 16px;
          margin-top: 14px;
        }
        .wcx-spk-badge svg { flex-shrink: 0; }

        /* Carousel */
        .wcx-spk-carousel {
          overflow: hidden;
          margin: 0 -40px;
          padding: 16px 0 24px;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        @keyframes wcx-spk-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }

        .wcx-spk-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: wcx-spk-scroll 50s linear infinite;
        }
        .wcx-spk-carousel:hover .wcx-spk-track {
          animation-play-state: paused;
        }

        /* Card */
        .wcx-spk-card {
          width: 240px;
          flex-shrink: 0;
          position: relative;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .wcx-spk-card:hover {
          border-color: rgba(201,168,76,0.45);
          box-shadow:
            0 0 28px rgba(201,168,76,0.20),
            0 0 56px rgba(201,168,76,0.08),
            0 16px 40px rgba(0,0,0,0.5);
          transform: translateY(-4px);
        }

        /* Photo */
        .wcx-spk-img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--bg-card);
        }
        /* Coral rim glow — replaces the residual blue fringe, matches brand */
        .wcx-spk-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 32px rgba(54,188,176,0.22),
                      inset 0 0 8px  rgba(54,188,176,0.10);
          pointer-events: none;
          z-index: 3;
        }
        .wcx-spk-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.5s ease;
        }
        .wcx-spk-card:hover .wcx-spk-img { transform: scale(1.04); }

        .wcx-spk-img-tint {
          display: none;
        }

        /* Fallback when image is missing */
        .wcx-spk-fallback {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0F1E38 0%, #152233 100%);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .wcx-spk-fallback-initials {
          font-size: 40px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: rgba(201,168,76,0.35);
          line-height: 1;
          user-select: none;
        }

        /* Overlay — name + title at bottom of image */
        .wcx-spk-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(
            to top,
            rgba(10,22,40,1) 0%,
            rgba(10,22,40,0.88) 35%,
            rgba(10,22,40,0.4) 60%,
            transparent 100%
          );
          padding: 44px 14px 16px;
          z-index: 2;
        }
        .wcx-spk-name {
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }
        .wcx-spk-title {
          font-size: 8.5px;
          font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1.4;
          margin-bottom: 2px;
        }
        .wcx-spk-company {
          font-size: 10px;
          color: rgba(255,255,255,0.55);
          line-height: 1.3;
        }

        /* Gold accent bar */
        .wcx-spk-bar {
          height: 2px;
          background: linear-gradient(90deg, var(--gold), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .wcx-spk-card:hover .wcx-spk-bar { opacity: 1; }

        /* Footer */
        .wcx-spk-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: 40px;
          padding: 24px 0 72px;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
        }
        .wcx-spk-coming {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-muted);
        }
        .wcx-spk-coming-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--coral);
          box-shadow: 0 0 8px var(--coral);
          animation: wcx-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* ── Apply to Speak button ── */
        .wcx-spk-apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--coral);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 32px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .wcx-spk-apply-btn:hover {
          background: var(--coral-light);
          transform: translateY(-1px);
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.40),
            0 0 24px rgba(54,188,176,0.45),
            0 0 56px rgba(54,188,176,0.20);
        }

        /* ── Modal overlay ── */
        .wcx-speak-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5,12,24,0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .wcx-speak-modal-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        .wcx-speak-modal {
          background: var(--bg-surface);
          border: 1px solid rgba(54,188,176,0.22);
          border-radius: 20px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.15),
            0 0 60px rgba(54,188,176,0.12),
            0 32px 80px rgba(0,0,0,0.60);
          transform: translateY(20px) scale(0.98);
          transition: transform 0.3s ease;
        }
        .wcx-speak-modal-overlay.open .wcx-speak-modal {
          transform: translateY(0) scale(1);
        }
        .wcx-speak-modal-top {
          padding: 32px 36px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky;
          top: 0;
          background: var(--bg-surface);
          z-index: 2;
          border-radius: 20px 20px 0 0;
        }
        .wcx-speak-modal-overline {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--coral);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .wcx-speak-modal-overline::before {
          content: '';
          width: 20px; height: 1.5px;
          background: var(--coral);
          flex-shrink: 0;
        }
        .wcx-speak-modal-title {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #fff;
          line-height: 1.2;
        }
        .wcx-speak-modal-title span { color: var(--coral); }
        .wcx-speak-modal-sub {
          font-size: 13px;
          color: var(--text-body);
          margin-top: 8px;
          line-height: 1.6;
        }
        .wcx-speak-modal-close {
          position: absolute;
          top: 20px; right: 20px;
          width: 36px; height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          color: rgba(255,255,255,0.60);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .wcx-speak-modal-close:hover {
          background: rgba(54,188,176,0.12);
          border-color: rgba(54,188,176,0.35);
          color: var(--coral);
        }
        .wcx-speak-modal-body {
          padding: 28px 36px 36px;
        }

        /* HubSpot form resets inside modal */
        .wcx-speak-modal-body .hs-form fieldset { max-width: 100% !important; }
        .wcx-speak-modal-body .hs-form .hs-input {
          width: 100% !important;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-radius: 8px !important;
          color: #fff !important;
          padding: 10px 14px !important;
          font-family: inherit !important;
          font-size: 14px !important;
        }
        .wcx-speak-modal-body .hs-form .hs-input:focus {
          border-color: rgba(54,188,176,0.50) !important;
          outline: none !important;
        }
        .wcx-speak-modal-body .hs-form label {
          color: rgba(255,255,255,0.75) !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          letter-spacing: 0.04em !important;
          margin-bottom: 6px !important;
          display: block !important;
        }
        .wcx-speak-modal-body .hs-form .hs-button {
          background: var(--coral) !important;
          color: #fff !important;
          border: none !important;
          border-radius: 10px !important;
          padding: 13px 32px !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          cursor: pointer !important;
          transition: background 0.2s !important;
        }
        .wcx-speak-modal-body .hs-form .hs-button:hover {
          background: var(--coral-light) !important;
        }
        .wcx-speak-modal-body .hs-error-msgs { color: #ff6b6b !important; font-size: 12px !important; }

        /* Loading spinner shown while HubSpot loads */
        .wcx-speak-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 40px 0;
          color: var(--text-muted);
          font-size: 13px;
        }
        .wcx-speak-spinner {
          width: 32px; height: 32px;
          border: 2px solid rgba(54,188,176,0.20);
          border-top-color: var(--coral);
          border-radius: 50%;
          animation: wcx-spin 0.8s linear infinite;
        }
        @keyframes wcx-spin { to { transform: rotate(360deg); } }

        @media (max-width: 1024px) {
          .wcx-spk-inner { padding: 0 32px; }
          .wcx-spk-carousel { margin: 0 -32px; }
        }
        @media (max-width: 768px) {
          .wcx-spk-card { width: 200px; }
          .wcx-spk-inner { padding: 0 20px; }
          .wcx-spk-carousel { margin: 0 -20px; }
          .wcx-spk { padding: 64px 0 12px; }
          .wcx-speak-modal-top { padding: 24px 20px 20px; }
          .wcx-speak-modal-body { padding: 20px 20px 28px; }
        }
        @media (max-width: 480px) {
          .wcx-spk-card { width: 176px; }
          .wcx-spk { padding: 52px 0 12px; }
          .wcx-spk-footer { flex-direction: column; align-items: flex-start; gap: 20px; }
          .wcx-spk-apply-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <section className="wcx-spk">
        <div className="wcx-spk-inner">
          <div className="wcx-spk-head">
            <div>
              <div className="wcx-spk-overline">Featured Voices</div>
              <h2 className="wcx-spk-h2">
                <span>Past Speakers</span><br />Who Shaped the Conversation
              </h2>
              <div className="wcx-spk-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
                2026 Speaker Lineup — Coming Soon
              </div>
            </div>
            <Link href="/speakers" className="wcx-btn-outline">
              View All Speakers
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Scrolling carousel */}
        <div className="wcx-spk-carousel">
          <div className="wcx-spk-track">
            {looped.map((s, i) => {
              const initials = s.name.split(" ").slice(0,2).map((w: string) => w[0]).join("");
              return (
                <div key={i} className="wcx-spk-card">
                  <div className="wcx-spk-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.img}
                      alt={s.name}
                      className="wcx-spk-img"
                      onError={(e) => {
                        const wrap = (e.target as HTMLImageElement).parentElement!;
                        (e.target as HTMLImageElement).style.display = "none";
                        if (!wrap.querySelector(".wcx-spk-fallback")) {
                          const fb = document.createElement("div");
                          fb.className = "wcx-spk-fallback";
                          fb.innerHTML = `<span class="wcx-spk-fallback-initials">${initials}</span>`;
                          wrap.prepend(fb);
                        }
                      }}
                    />
                    <div className="wcx-spk-img-tint" />
                    <div className="wcx-spk-overlay">
                      <div className="wcx-spk-name">{s.name}</div>
                      <div className="wcx-spk-title">{s.title}</div>
                      <div className="wcx-spk-company">{s.company}</div>
                    </div>
                  </div>
                  <div className="wcx-spk-bar" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="wcx-spk-inner">
          <div className="wcx-spk-footer">
            <div className="wcx-spk-coming">
              <span className="wcx-spk-coming-dot" />
              New speakers for 2026 being announced soon — check back regularly
            </div>
            <a href="/attend?tab=speaker#enquire-form" className="wcx-spk-apply-btn">
              Apply to Speak
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Apply to Speak modal ── */}
      <div
        className={`wcx-speak-modal-overlay${modalOpen ? " open" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
      >
        <div className="wcx-speak-modal" role="dialog" aria-modal="true" aria-label="Apply to Speak">
          <div className="wcx-speak-modal-top">
            <div className="wcx-speak-modal-overline">World CX Summit 2026</div>
            <div className="wcx-speak-modal-title">
              Apply to <span>Speak</span>
            </div>
            <p className="wcx-speak-modal-sub">
              Share your expertise with 400+ senior CX leaders. Fill in your details and our team will be in touch.
            </p>
            <button className="wcx-speak-modal-close" onClick={() => setModalOpen(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="wcx-speak-modal-body">
            {!hsLoaded && (
              <div className="wcx-speak-loading">
                <div className="wcx-speak-spinner" />
                Loading form…
              </div>
            )}
            <div id="wcx-hs-form-target" ref={formRef} />
          </div>
        </div>
      </div>
    </>
  );
}
