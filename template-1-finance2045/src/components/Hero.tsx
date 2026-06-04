"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { EVENT } from "@/config/event";

/* ── Simple count-up — single span, no DOM explosion ── */
function StatNum({ text, animKey }: { text: string; animKey: number }) {
  const match = text.match(/^([\d,]+)(.*)$/);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (animKey === 0 || !match) return;
    const target = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2] ?? "";
    const hasComa = match[1].includes(",");
    const duration = 1400;
    let start: number | null = null;
    let rafId: number;

    const run = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(eased * target);
      setDisplay((hasComa ? current.toLocaleString() : String(current)) + suffix);
      if (p < 1) rafId = requestAnimationFrame(run);
    };
    rafId = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafId);
  }, [animKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span>{display}</span>;
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [statsKey, setStatsKey] = useState(0);

  /* Trigger count-up on scroll into view */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsKey(k => k + 1); },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Lazy-load hero video after page is interactive */
  useEffect(() => {
    const load = () => {
      const v = videoRef.current;
      if (!v) return;
      v.src = EVENT.assets.hero_video;
      v.load();
      v.play().catch(() => {});
    };

    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(load, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(load, 1500);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <>
      <style>{`
        .f45-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .f45-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .f45-hero-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(15,20,30,0.55) 0%,
            rgba(15,20,30,0.45) 50%,
            rgba(15,20,30,0.70) 100%
          );
          pointer-events: none;
        }
        .f45-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 80px 40px 32px;
          max-width: 900px;
          width: 100%;
        }

        /* ── Logo zone ── */
        .f45-hero-logo-zone {
          display: inline-flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .f45-logo-beam-wrap {
          display: inline-block;
          position: relative;
        }

        /* Corner brackets — opacity-only animation (GPU composited) */
        .f45-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          pointer-events: none;
          z-index: 3;
          opacity: 0.2;
        }
        .f45-corner-tl { top: 0; left: 0;   border-top: 2px solid #00a5a3; border-left: 2px solid #00a5a3;   border-radius: 3px 0 0 0; }
        .f45-corner-tr { top: 0; right: 0;  border-top: 2px solid #00a5a3; border-right: 2px solid #00a5a3;  border-radius: 0 3px 0 0; }
        .f45-corner-bl { bottom: 0; left: 0;  border-bottom: 2px solid #00a5a3; border-left: 2px solid #00a5a3;  border-radius: 0 0 0 3px; }
        .f45-corner-br { bottom: 0; right: 0; border-bottom: 2px solid #00a5a3; border-right: 2px solid #00a5a3; border-radius: 0 0 3px 0; }

        /* Opacity-only — composited, no filter */
        @keyframes f45-corner-glow {
          0%, 15%   { opacity: 0.15; }
          30%, 55%  { opacity: 1; }
          80%, 100% { opacity: 0.15; }
        }
        .f45-corner-tl { animation: f45-corner-glow 2.4s ease-in-out infinite 0.0s; }
        .f45-corner-tr { animation: f45-corner-glow 2.4s ease-in-out infinite 0.6s; }
        .f45-corner-br { animation: f45-corner-glow 2.4s ease-in-out infinite 1.2s; }
        .f45-corner-bl { animation: f45-corner-glow 2.4s ease-in-out infinite 1.8s; }

        /* Logo row */
        .f45-hero-logo-row {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          padding: 20px 36px;
          background: rgba(8,13,22,0.35);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,165,163,0.15);
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.45);
          overflow: hidden;
          z-index: 1;
        }
        /* Shimmer — uses transform (composited), not left */
        .f45-hero-logo-row::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 55%; height: 100%;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
          transform: translateX(-240%);
          animation: f45-shimmer 7s ease-in-out infinite 0.8s;
          pointer-events: none;
        }
        @keyframes f45-shimmer {
          0%        { transform: translateX(-240%); }
          40%, 100% { transform: translateX(480%); }
        }

        .f45-hero-logo-f45 {
          filter: drop-shadow(0 0 14px rgba(0,165,163,0.40));
          position: relative; z-index: 1;
        }
        .f45-hero-logo-sep {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent);
          flex-shrink: 0;
        }
        .f45-hero-logo-wais-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }
        .f45-hero-coloc-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
          line-height: 1;
        }
        .f45-hero-h1 {
          font-size: clamp(20px, 3vw, 40px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: #fff;
          text-shadow: 0 2px 32px rgba(0,0,0,0.7), 0 0 60px rgba(0,165,163,0.15);
          margin-bottom: 16px;
        }
        .f45-hero-h1 span { color: #00a5a3; }
        .f45-hero-sub {
          font-size: clamp(13px, 1.4vw, 16px);
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
          max-width: 680px;
          margin: 0 auto 16px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.6);
        }
        .f45-hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .f45-hero-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.80);
        }
        .f45-hero-meta-item svg { color: #00a5a3; flex-shrink: 0; }
        .f45-hero-meta-divider { width: 1px; height: 14px; background: rgba(255,255,255,0.2); }
        .f45-hero-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Stats bar */
        .f45-hero-stats {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
          border-top: 1px solid rgba(0,165,163,0.15);
          background: rgba(27,35,47,0.9);
          backdrop-filter: blur(8px);
        }
        .f45-hero-stat {
          padding: 24px 48px;
          text-align: center;
          border-right: 1px solid rgba(0,165,163,0.12);
        }
        .f45-hero-stat:last-child { border-right: none; }
        .f45-hero-stat-num {
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #E9C268;
          line-height: 1;
          margin-bottom: 4px;
        }
        .f45-hero-stat-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }

        @media (max-width: 768px) {
          .f45-hero-content { padding: 96px 20px 60px; }
          .f45-hero-logo-zone { margin-bottom: 36px; }
          .f45-hero-logo-row { padding: 16px 20px; gap: 16px; }
          .f45-hero-stat { padding: 20px 24px; }
          .f45-hero-stat-num { font-size: 22px; }
          .f45-hero-meta { gap: 12px; }
          .f45-hero-meta-divider { display: none; }
        }
        @media (max-width: 480px) {
          .f45-hero-cta-row { flex-direction: column; align-items: center; }
        }
      `}</style>

      <section className="f45-hero">
        {/* Video: no src in HTML — lazy-loaded by useEffect after idle */}
        <video
          ref={videoRef}
          className="f45-hero-video"
          loop
          muted
          playsInline
          poster={EVENT.assets.hero_poster}
          preload="none"
        />
        <div className="f45-hero-vignette" />

        <div className="f45-hero-content">

          {/* Logo zone */}
          <div className="f45-hero-logo-zone">
            <div className="f45-logo-beam-wrap">
              <span className="f45-corner f45-corner-tl" />
              <span className="f45-corner f45-corner-tr" />
              <span className="f45-corner f45-corner-bl" />
              <span className="f45-corner f45-corner-br" />

              <div className="f45-hero-logo-row">
                <div className="f45-hero-logo-f45">
                  <Logo width={260} />
                </div>
                <div className="f45-hero-logo-sep" />
                <div className="f45-hero-logo-wais-wrap">
                  <span className="f45-hero-coloc-label">Co-located with</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/wais-clean.svg"
                    alt="World AI Show by Trescon"
                    width={180}
                    height={56}
                    style={{ height: 56, width: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* EKRAF — Supported by */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <div style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6,
              background: "#FFFFFF",
              borderRadius: 10,
              boxShadow: "0 8px 48px rgba(0,0,0,0.35)",
              padding: "10px 24px 10px",
            }}>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(30,30,30,0.45)",
                whiteSpace: "nowrap", textAlign: "center",
              }}>Strategic Government Partner:</span>
              {/* overflow crop — clips PNG's internal whitespace (37% top, 32% bottom) */}
              <div style={{ overflow: "hidden", height: 80, display: "flex", justifyContent: "center" }}>
                <a href="https://ekraf.go.id/" target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ekraf-logo.png"
                    alt="EKRAF — Ministry of Creative Economy, Republic of Indonesia"
                    width={1080}
                    height={1081}
                    style={{ height: 265, width: "auto", display: "block", marginTop: -100 }}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Date & venue */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 16,
            marginBottom: 16, flexWrap: "wrap", justifyContent: "center",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {EVENT.date_display}
            </span>
            <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.20)" }} />
            <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {EVENT.venue_display}
            </span>
          </div>

          <h1 className="f45-hero-h1">
            {EVENT.tagline}
          </h1>

          <div className="f45-hero-cta-row">
            <a
              href={EVENT.register_url}
              target="_blank"
              rel="noopener noreferrer"
              className="f45-btn-primary"
            >
              {EVENT.cta_primary_label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href={EVENT.enquire_url} className="f45-btn-outline">{EVENT.cta_secondary_label}</Link>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <div className="f45-hero-stats" ref={statsRef}>
        {EVENT.stats.map((s) => (
          <div key={s.label} className="f45-hero-stat">
            <div className="f45-hero-stat-num">
              <StatNum text={s.num} animKey={statsKey} />
            </div>
            <div className="f45-hero-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
