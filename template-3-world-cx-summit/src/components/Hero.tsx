"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { EVENT } from "@/config/event";

const PASS_URL = EVENT.register_url;

/* ── Rolling stat digit ── */
const DIGIT_H = 44;

function StatDigit({ char, animKey, delay }: { char: string; animKey: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (animKey === 0 || !/[0-9]/.test(char)) return;
    if (ref.current) ref.current.style.transform = "translateY(0)";
    const endY = -20 * DIGIT_H;
    let raf: number;
    const t = setTimeout(() => {
      requestAnimationFrame(() => {
        let start: number | null = null;
        const run = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1200, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          if (ref.current) ref.current.style.transform = `translateY(${ease * endY}px)`;
          if (p < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      });
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [animKey, char, delay]);

  if (!/[0-9]/.test(char)) return <span style={{ display: "inline-block" }}>{char}</span>;
  const target = parseInt(char);
  const strip = [...Array(20).keys()].map(i => i % 10).concat([target]);
  return (
    <span style={{ display: "inline-block", height: DIGIT_H, overflow: "hidden", verticalAlign: "bottom" }}>
      <span ref={ref} style={{ display: "flex", flexDirection: "column", willChange: "transform" }}>
        {strip.map((d, i) => (
          <span key={i} style={{ display: "block", height: DIGIT_H, lineHeight: `${DIGIT_H}px`, textAlign: "center" }}>{d}</span>
        ))}
      </span>
    </span>
  );
}

function StatNum({ text, animKey, delay = 0 }: { text: string; animKey: number; delay?: number }) {
  let di = 0;
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end" }}>
      {text.split("").map((ch, i) => {
        const isD = /[0-9]/.test(ch);
        const d = isD ? di++ : 0;
        return isD
          ? <StatDigit key={i} char={ch} animKey={animKey} delay={delay + d * 100} />
          : <span key={i} style={{ display: "inline-block" }}>{ch}</span>;
      })}
    </span>
  );
}

/* ── Main Hero ── */
export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsKey, setStatsKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsKey(k => k + 1); },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = EVENT.stats;

  return (
    <>
      <style>{`
        /* ── Hero shell ── */
        .wcx-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0A1628;
        }

        /* ── Background video ── */
        .wcx-hero-video {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
          z-index: 0;
          opacity: 1;
        }
        .wcx-hero-video-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom,
              rgba(10,22,40,0.72) 0%,
              rgba(10,22,40,0.55) 50%,
              rgba(10,22,40,0.94) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* ── Animated gradient orbs ── */
        .wcx-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          will-change: transform, opacity;
          z-index: 2;
        }
        .wcx-orb-1 {
          width: 700px; height: 700px;
          top: -200px; left: -200px;
          background: radial-gradient(circle, rgba(54,188,176,0.12) 0%, transparent 70%);
          animation: wcx-drift-1 18s ease-in-out infinite;
        }
        .wcx-orb-2 {
          width: 600px; height: 600px;
          top: 40%; right: -150px;
          background: radial-gradient(circle, rgba(54,188,176,0.08) 0%, transparent 70%);
          animation: wcx-drift-2 22s ease-in-out infinite;
        }
        .wcx-orb-3 {
          width: 500px; height: 500px;
          bottom: -100px; left: 30%;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
          animation: wcx-drift-3 16s ease-in-out infinite;
        }
        .wcx-orb-4 {
          width: 400px; height: 400px;
          top: 30%; left: 20%;
          background: radial-gradient(circle, rgba(54,188,176,0.05) 0%, transparent 70%);
          animation: wcx-drift-4 25s ease-in-out infinite;
        }

        @keyframes wcx-drift-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(120px, 80px) scale(1.1); }
          66%      { transform: translate(-60px, 140px) scale(0.95); }
        }
        @keyframes wcx-drift-2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-100px, -60px) scale(1.08); }
          70%      { transform: translate(60px, 100px) scale(0.92); }
        }
        @keyframes wcx-drift-3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-80px, -120px) scale(1.15); }
        }
        @keyframes wcx-drift-4 {
          0%,100% { transform: translate(0,0); }
          30%      { transform: translate(140px, -80px); }
          70%      { transform: translate(-100px, 60px); }
        }


        /* ── Floating particles ── */
        .wcx-particles {
          position: absolute; inset: 0;
          pointer-events: none; overflow: hidden;
          z-index: 3;
        }
        .wcx-particle {
          position: absolute;
          border-radius: 50%;
          animation: wcx-float linear infinite;
          opacity: 0;
        }
        @keyframes wcx-float {
          0%   { transform: translateY(100vh) translateX(0); opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-10vh) translateX(var(--dx, 20px)); opacity: 0; }
        }


        /* ── Content layer ── */
        .wcx-hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 130px 40px 80px;
          max-width: 960px;
          width: 100%;
        }

        /* ── Badge runner (animated border) ── */
        .wcx-hero-badge-runner {
          position: relative;
          border-radius: 6px;
          padding: 2px;
          overflow: hidden;
          margin-bottom: 28px;
        }
        .wcx-hero-badge-runner::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            transparent 62%,
            rgba(54,188,176,0.55) 78%,
            rgba(255,255,255,0.32) 86%,
            rgba(54,188,176,0.30) 92%,
            transparent 100%
          );
          animation: wcx-runner-spin 9s linear infinite;
        }
        @keyframes wcx-runner-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* ── Badge row (logos) ── */
        .wcx-hero-badge {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 28px;
          margin-bottom: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
          /* Glass card */
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 4px;
          padding: 24px 36px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.10);
        }
        .wcx-hero-badge.in { opacity: 1; transform: none; }
        .wcx-hero-badge-sep {
          width: 1px; height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.40) 30%, rgba(255,255,255,0.40) 70%, transparent);
          flex-shrink: 0;
        }
        .wcx-hero-badge-trescon-wrap {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
        }
        .wcx-hero-badge-event-by {
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.75);
        }
        .wcx-hero-badge-trescon-logo {
          display: block;
          height: 72px;
          width: auto;
          object-fit: contain;
        }

        /* ── Headline ── */
        .wcx-hero-h1 {
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: #fff;
          margin-bottom: 36px;
          text-wrap: balance;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.40s, transform 0.8s ease 0.40s;
        }
        .wcx-hero-h1.in { opacity: 1; transform: none; }

        /* Teal + gold gradient on key word */
        .wcx-hero-h1 .wcx-grad {
          background: linear-gradient(100deg, #36BCB0 0%, #4ECFC4 45%, #C9A84C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }


        /* ── Meta (date / venue) ── */
        .wcx-hero-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s;
        }
        .wcx-hero-meta.in { opacity: 1; transform: none; }
        .wcx-hero-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.04em;
        }
        .wcx-hero-meta-item svg { color: var(--coral); flex-shrink: 0; }
        .wcx-hero-meta-div {
          width: 1px; height: 14px;
          background: rgba(255,255,255,0.2);
        }

        /* ── CTA row ── */
        .wcx-hero-ctas {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease 0.52s, transform 0.7s ease 0.52s;
        }
        .wcx-hero-ctas.in { opacity: 1; transform: none; }

        /* ── Scroll cue ── */
        .wcx-scroll-cue {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0;
          animation: wcx-fade-in 1s ease 1.4s forwards;
          z-index: 10;
        }
        .wcx-scroll-cue span {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }
        .wcx-scroll-mouse {
          width: 22px; height: 34px;
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 11px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }
        .wcx-scroll-mouse::before {
          content: '';
          width: 3px; height: 7px;
          background: var(--coral);
          border-radius: 2px;
          animation: wcx-scroll 1.8s ease infinite;
        }
        @keyframes wcx-scroll {
          0%   { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        @keyframes wcx-fade-in {
          to { opacity: 1; }
        }

        /* ── Stat strip ── */
        .wcx-stats {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0;
          background: rgba(10,22,40,0.96);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(54,188,176,0.20);
        }
        .wcx-stat {
          padding: 28px 52px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }
        .wcx-stat::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          width: 0; height: 2px;
          background: var(--coral);
          transition: width 0.6s ease;
        }
        .wcx-stat:hover::after { width: 60%; }
        .wcx-stat:last-child { border-right: none; }
        .wcx-stat-num {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 6px;
        }
        .wcx-stat-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .wcx-hero-content { padding: 96px 24px 56px; }
          .wcx-hero-badge-runner { margin-bottom: 32px; }
          .wcx-hero-badge { gap: 16px; margin-bottom: 0; padding: 20px 24px; }
          .wcx-hero-badge-sep { height: 56px; }
          .wcx-hero-badge-trescon-logo { height: 54px; }
          .wcx-stat { padding: 18px 24px; }
          .wcx-stat-num { font-size: 22px; }
          .wcx-hero-meta { gap: 10px; margin-bottom: 28px; }
          .wcx-hero-meta-div { display: none; }
          .wcx-hero-h1 { margin-bottom: 18px; }
        }
        @media (max-width: 520px) {
          .wcx-hero-content { padding: 88px 20px 48px; }
          /* Stack badge vertically on small screens */
          .wcx-hero-badge-runner { margin-bottom: 24px; }
          .wcx-hero-badge {
            flex-direction: column; gap: 10px; margin-bottom: 0; padding: 16px 20px;
          }
          .wcx-hero-badge-sep { width: 40px; height: 1px; }
          .wcx-hero-badge-trescon-logo { height: 40px; }
          .wcx-hero-badge-trescon-wrap { flex-direction: row; align-items: center; gap: 8px; }
          .wcx-hero-badge-event-by { font-size: 9px; }
          .wcx-hero-h1 { font-size: clamp(26px, 8vw, 40px); margin-bottom: 14px; }
          .wcx-hero-meta { margin-bottom: 22px; }
          /* Hide speak CTA on small screens to reduce crowding */
          .wcx-hero-ctas a:last-child { display: none; }
          .wcx-hero-ctas { flex-direction: column; align-items: center; width: 100%; gap: 10px; }
          .wcx-hero-ctas a, .wcx-hero-ctas .wcx-btn-primary,
          .wcx-hero-ctas .wcx-btn-gold { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ── Hero section ── */}
      <section className="wcx-hero">

        {/* Background video */}
        <video
          className="wcx-hero-video"
          src="/hero-bg.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="wcx-hero-video-overlay" />

        {/* Animated gradient orbs */}
        <div className="wcx-orb wcx-orb-1" />
        <div className="wcx-orb wcx-orb-2" />
        <div className="wcx-orb wcx-orb-3" />
        <div className="wcx-orb wcx-orb-4" />



        {/* Floating particles */}
        <div className="wcx-particles">
          {[
            { left: "8%",  size: 3, delay: 0,   dur: 14, dx: "30px",  color: "#36BCB0" },
            { left: "18%", size: 2, delay: 2.5, dur: 11, dx: "-20px", color: "#C9A84C" },
            { left: "28%", size: 4, delay: 1,   dur: 16, dx: "15px",  color: "#36BCB0" },
            { left: "40%", size: 2, delay: 4,   dur: 12, dx: "-30px", color: "#fff"    },
            { left: "52%", size: 3, delay: 0.5, dur: 18, dx: "25px",  color: "#C9A84C" },
            { left: "63%", size: 2, delay: 3,   dur: 13, dx: "-15px", color: "#36BCB0" },
            { left: "75%", size: 4, delay: 1.5, dur: 15, dx: "20px",  color: "#fff"    },
            { left: "85%", size: 2, delay: 5,   dur: 11, dx: "-25px", color: "#C9A84C" },
            { left: "93%", size: 3, delay: 2,   dur: 17, dx: "10px",  color: "#36BCB0" },
          ].map((p, i) => (
            <div
              key={i}
              className="wcx-particle"
              style={{
                left: p.left,
                bottom: 0,
                width: p.size,
                height: p.size,
                background: p.color,
                opacity: 0.6,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`,
                ["--dx" as string]: p.dx,
              }}
            />
          ))}
        </div>

        {/* ── Content ── */}
        <div className="wcx-hero-content">

          {/* Logos */}
          <div className="wcx-hero-badge-runner">
          <div className={`wcx-hero-badge${mounted ? " in" : ""}`}>
            <Logo width={180} />
            <div className="wcx-hero-badge-sep" />
            <div className="wcx-hero-badge-trescon-wrap">
              <span className="wcx-hero-badge-event-by">Event by</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trescon-logo.png" alt="Trescon Global" className="wcx-hero-badge-trescon-logo" />
            </div>
          </div>
          </div>

          {/* Meta row */}
          <div className={`wcx-hero-meta${mounted ? " in" : ""}`}>
            <div className="wcx-hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {EVENT.date_display}
            </div>
            <div className="wcx-hero-meta-div" />
            <div className="wcx-hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
              </svg>
              {EVENT.venue_city}, {EVENT.venue_country}
            </div>
            <div className="wcx-hero-meta-div" />
            <div className="wcx-hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              1-Day Summit & Awards
            </div>
          </div>

          {/* H1 */}
          <h1 className={`wcx-hero-h1${mounted ? " in" : ""}`}>
            Where Leaders Come to <span className="wcx-grad">Reimagine CX</span>
          </h1>

          {/* CTAs */}
          <div className={`wcx-hero-ctas${mounted ? " in" : ""}`}>
            <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-primary">
              {EVENT.cta_primary_label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href={EVENT.sponsor_enquire_url} className="wcx-btn-gold">
              Sponsor / Exhibit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href={EVENT.speak_enquire_url} className="wcx-btn-outline">{EVENT.cta_secondary_label}</a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="wcx-scroll-cue">
          <div className="wcx-scroll-mouse" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Stat strip ── */}
      <div className="wcx-stats" ref={statsRef}>
        {stats.map((s) => (
          <div key={s.label} className="wcx-stat">
            <div className="wcx-stat-num">
              <StatNum text={s.num} animKey={statsKey} delay={s.delay} />
            </div>
            <div className="wcx-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
