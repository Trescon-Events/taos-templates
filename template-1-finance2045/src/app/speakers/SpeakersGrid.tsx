"use client";
import Image from "next/image";
import { useState } from "react";
import type { KonfHubSpeaker } from "@/types/konfhub";
import HubSpotForm from "@/components/HubSpotForm";

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function firstSessionTitle(s: KonfHubSpeaker): string {
  return s.sessions?.[0]?.session_title ?? "";
}

export default function SpeakersGrid({ speakers }: { speakers: KonfHubSpeaker[] }) {
  const [modal, setModal] = useState<KonfHubSpeaker | null>(null);

  return (
    <>
      <style>{`
        .spk-page {
          padding-top: 100px;
          min-height: 100vh;
          background: var(--bg-primary);
        }
        .spk-hero {
          padding: 80px 40px 72px;
          max-width: 1240px;
          margin: 0 auto;
          text-align: center;
        }
        .spk-hero h1 {
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 16px;
        }
        .spk-hero h1 span { color: var(--teal); }
        .spk-hero p {
          font-size: 17px;
          color: var(--text-body);
          max-width: 560px;
          margin: 0 auto;
        }

        .spk-grid {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px 100px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        .spk-flip {
          perspective: 1200px;
          height: 460px;
          cursor: pointer;
        }
        .spk-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
        }
        .spk-flip:hover .spk-flip-inner {
          transform: rotateY(180deg);
        }

        .spk-front,
        .spk-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 1px solid var(--border-dark);
          overflow: hidden;
        }

        .spk-front {
          background: var(--bg-card);
          display: flex;
          flex-direction: column;
        }
        .spk-front-img-wrap {
          flex: 0 0 62%;
          position: relative;
          overflow: hidden;
        }
        .spk-front-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.5s ease;
        }
        .spk-flip:hover .spk-front-img { transform: scale(1.04); }
        .spk-front-hint {
          position: absolute;
          top: 12px; right: 12px;
          width: 26px; height: 26px;
          border-radius: 50%;
          background: rgba(0,165,163,0.2);
          border: 1px solid rgba(0,165,163,0.5);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal);
        }
        .spk-front-panel {
          flex: 1;
          background: var(--bg-surface);
          border-top: 2px solid var(--teal);
          padding: 16px 18px 18px;
          display: flex; flex-direction: column;
          justify-content: center; gap: 4px;
        }
        .spk-front-name {
          font-size: 14px; font-weight: 800;
          color: #fff; line-height: 1.25; letter-spacing: -0.01em;
        }
        .spk-front-title {
          font-size: 11px; font-weight: 600;
          color: var(--teal); text-transform: uppercase;
          letter-spacing: 0.07em; line-height: 1.4;
        }
        .spk-front-company {
          font-size: 12px;
          color: rgba(255,255,255,0.60); line-height: 1.35;
        }

        .spk-back {
          background: var(--bg-surface);
          transform: rotateY(180deg);
          display: flex; flex-direction: column;
          padding: 18px; overflow-y: auto;
          scrollbar-width: none;
        }
        .spk-back::-webkit-scrollbar { display: none; }
        .spk-back-accent {
          height: 2px;
          background: linear-gradient(90deg, var(--teal), var(--gold));
          margin: -18px -18px 12px; flex-shrink: 0;
        }
        .spk-back-country {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 6px;
          display: flex; align-items: center; gap: 5px; flex-shrink: 0;
        }
        .spk-back-name {
          font-size: 14px; font-weight: 800;
          color: #fff; line-height: 1.2; margin-bottom: 4px;
          letter-spacing: -0.01em; flex-shrink: 0;
        }
        .spk-back-title {
          font-size: 11px; font-weight: 600;
          color: var(--teal); text-transform: uppercase;
          letter-spacing: 0.07em; line-height: 1.4;
          margin-bottom: 2px; flex-shrink: 0;
        }
        .spk-back-company {
          font-size: 12px; line-height: 1.4;
          color: rgba(255,255,255,0.60);
          margin-bottom: 10px; padding-bottom: 10px;
          border-bottom: 1px solid var(--border-dark); flex-shrink: 0;
        }
        .spk-back-bio-wrap { flex: 1; min-height: 0; overflow: hidden; }
        .spk-back-bio { font-size: 12px; color: var(--text-body); line-height: 1.7; }
        .spk-back-topic {
          margin-top: 10px; padding: 8px 10px;
          background: var(--teal-dim);
          border-left: 2px solid var(--teal); flex-shrink: 0;
        }
        .spk-back-topic-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 3px;
        }
        .spk-back-topic-text {
          font-size: 12px; color: rgba(255,255,255,0.82);
          line-height: 1.5; font-weight: 500;
        }

        .spk-empty {
          text-align: center; padding: 80px 40px;
          color: var(--text-muted); font-size: 14px;
        }

        .spk-cta { text-align: center; padding: 0 0 100px; }

        @media (max-width: 1024px) {
          .spk-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .spk-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 0 20px 80px; }
          .spk-hero { padding: 60px 20px 48px; }
          .spk-flip { height: 420px; }
        }
        @media (max-width: 480px) {
          .spk-grid { grid-template-columns: 1fr 1fr; }
          .spk-flip { height: 400px; }
        }

        /* Touch: tap to flip */
        @media (hover: none) {
          .spk-flip.flipped .spk-flip-inner { transform: rotateY(180deg); }
        }

        /* Mobile modal */
        .spk-modal-backdrop { display: none; }
        @media (hover: none) {
          .spk-modal-backdrop {
            display: flex; position: fixed; inset: 0; z-index: 2000;
            background: rgba(10,14,22,0.92); backdrop-filter: blur(8px);
            align-items: flex-end; justify-content: center;
            animation: spk-modal-in 0.28s ease;
          }
          @keyframes spk-modal-in { from { opacity: 0; } to { opacity: 1; } }
          .spk-modal {
            width: 100%; max-height: 92vh;
            background: var(--bg-surface);
            border-top: 2px solid var(--teal); border-radius: 0;
            overflow-y: auto;
            animation: spk-sheet-up 0.3s cubic-bezier(0.32, 0.72, 0, 1);
          }
          @keyframes spk-sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
          .spk-modal-img { width: 100%; height: 260px; object-fit: cover; object-position: center top; display: block; }
          .spk-modal-body { padding: 24px 24px 40px; }
          .spk-modal-bar { height: 2px; background: linear-gradient(90deg, var(--teal), var(--gold)); margin: -24px -24px 20px; }
          .spk-modal-country { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
          .spk-modal-name { font-size: 22px; font-weight: 900; color: #fff; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 6px; }
          .spk-modal-title { font-size: 10px; font-weight: 700; color: var(--teal); text-transform: uppercase; letter-spacing: 0.08em; line-height: 1.4; margin-bottom: 3px; }
          .spk-modal-company { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border-dark); line-height: 1.4; }
          .spk-modal-bio { font-size: 14px; color: var(--text-body); line-height: 1.78; margin-bottom: 20px; }
          .spk-modal-topic { padding: 12px 14px; background: var(--teal-dim); border-left: 3px solid var(--teal); margin-bottom: 28px; }
          .spk-modal-topic-label { font-size: 8px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); margin-bottom: 4px; }
          .spk-modal-topic-text { font-size: 13px; color: rgba(255,255,255,0.85); line-height: 1.55; font-weight: 500; }
          .spk-modal-close { position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; border-radius: 50%; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; -webkit-tap-highlight-color: transparent; }
          .spk-modal-wrapper { position: relative; width: 100%; }
          .spk-modal-drag-handle { width: 40px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; margin: 12px auto 0; }
        }
      `}</style>

      <div className="spk-page">
        <div className="spk-hero">
          <div className="f45-eyebrow" style={{ justifyContent: "center" }}>
            <span className="f45-eyebrow-dot" />
            Speakers
          </div>
          <h1>World-Class <span>Financial Leaders</span></h1>
          <p>CFOs, regulators, and fintech founders shaping Indonesia&apos;s financial future. Hover a card to view their profile.</p>
        </div>

        {speakers.length === 0 ? (
          <div className="spk-empty">Speakers will be announced shortly.</div>
        ) : (
          <div className="spk-grid">
            {speakers.map((s) => (
              <div key={s.speaker_id} className="spk-flip" onClick={() => setModal(s)}>
                <div className="spk-flip-inner">

                  {/* Front */}
                  <div className="spk-front">
                    <div className="spk-front-img-wrap">
                      {s.image_url ? (
                        <Image
                          src={s.image_url}
                          alt={s.name}
                          fill
                          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
                          quality={90}
                          className="spk-front-img"
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                        </div>
                      )}
                      <div className="spk-front-hint">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4"/>
                        </svg>
                      </div>
                    </div>
                    <div className="spk-front-panel">
                      <div className="spk-front-name">{s.name}</div>
                      <div className="spk-front-title">{s.designation}</div>
                      <div className="spk-front-company">{s.organisation}</div>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="spk-back">
                    <div className="spk-back-accent" />
                    {s.location && (
                      <div className="spk-back-country">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {s.location}
                      </div>
                    )}
                    <div className="spk-back-name">{s.name}</div>
                    <div className="spk-back-title">{s.designation}</div>
                    <div className="spk-back-company">{s.organisation}</div>
                    <div className="spk-back-bio-wrap">
                      <div className="spk-back-bio">{stripHtml(s.about)}</div>
                    </div>
                    {firstSessionTitle(s) && (
                      <div className="spk-back-topic">
                        <div className="spk-back-topic-label">Speaking on</div>
                        <div className="spk-back-topic-text">{firstSessionTitle(s)}</div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        <div className="spk-cta">
          <a href="https://www.finance2045.com" target="_blank" rel="noopener noreferrer" className="f45-btn-primary">
            Register for Finance 2045
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      {/* Become a Speaker */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid rgba(0,165,163,0.2)", padding: "80px 40px 100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="f45-eyebrow" style={{ justifyContent: "center" }}>
              <span className="f45-eyebrow-dot" />
              Speak at Finance 2045
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", marginBottom: 16 }}>
              Share Your Vision on the <span style={{ color: "var(--teal)" }}>Global Stage</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-body)", maxWidth: 540, margin: "0 auto", lineHeight: 1.75 }}>
              Finance 2045 brings together 1,000+ investors, executives and innovators from Southeast Asia&apos;s financial ecosystem.
            </p>
          </div>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-dark)", padding: "40px 40px 32px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Speaker Application Form</div>
            <HubSpotForm formId="3ee2996a-b202-445e-87e7-bc621d8af558" targetId="hs-speaker-application" />
          </div>
        </div>
      </section>

      {/* Mobile modal */}
      {modal && (
        <div className="spk-modal-backdrop" onClick={() => setModal(null)}>
          <div className="spk-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="spk-modal-drag-handle" />
            <div className="spk-modal">
              {modal.image_url && (
                <Image
                  src={modal.image_url}
                  alt={modal.name}
                  width={600}
                  height={260}
                  quality={90}
                  className="spk-modal-img"
                />
              )}
              <button className="spk-modal-close" onClick={() => setModal(null)} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              <div className="spk-modal-body">
                <div className="spk-modal-bar" />
                {modal.location && (
                  <div className="spk-modal-country">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {modal.location}
                  </div>
                )}
                <div className="spk-modal-name">{modal.name}</div>
                <div className="spk-modal-title">{modal.designation}</div>
                <div className="spk-modal-company">{modal.organisation}</div>
                <div className="spk-modal-bio">{stripHtml(modal.about)}</div>
                {firstSessionTitle(modal) && (
                  <div className="spk-modal-topic">
                    <div className="spk-modal-topic-label">Speaking on</div>
                    <div className="spk-modal-topic-text">{firstSessionTitle(modal)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
