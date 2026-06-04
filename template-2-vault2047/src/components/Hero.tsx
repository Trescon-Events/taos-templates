"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EVENT } from "@/config/event";

// ── Counting animation ───────────────────────────────────────────────────────
function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTs: number | null = null;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return value;
}

// ── Stats data ───────────────────────────────────────────────────────────────
const STATS = EVENT.stats;

function StatItem({ stat, index, active }: { stat: typeof STATS[0]; index: number; active: boolean }) {
  const count = useCounter(stat.target, 2000 + index * 250, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        padding: "32px 16px",
        textAlign: "center",
        borderRight: index < STATS.length - 1 ? "1px solid rgba(13,102,101,0.18)" : "none",
      }}
    >
      {/* Number + superscript + */}
      <div style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: 2,
        lineHeight: 1,
      }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "clamp(28px, 3vw, 52px)",
          fontWeight: 900,
          color: "#0D6665",
          letterSpacing: "-0.02em",
        }}>
          {active ? count.toLocaleString() : "0"}
        </span>
        <sup style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "clamp(13px, 1.3vw, 22px)",
          fontWeight: 700,
          color: "#B86A2E",
          marginTop: "0.2em",
          lineHeight: 1,
        }}>+</sup>
      </div>
      <div style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        color: "rgba(240,237,232,0.55)",
        marginTop: 10,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsActive(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: "#020F0F",
    }}>

      {/* ── Video — brighter ── */}
      <video autoPlay muted loop playsInline style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        objectFit: "cover",
        zIndex: 0,
        opacity: 0.58,
      }}>
        <source src={EVENT.assets.hero_video} type="video/webm" />
      </video>

      {/* ── Dark overlay — lighter than before ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(165deg, rgba(2,15,15,0.68) 0%, rgba(2,15,15,0.42) 50%, rgba(2,15,15,0.75) 100%)",
        zIndex: 1,
      }} />

      {/* ── Sentinel Teal gradient wash ── */}
      <div style={{
        position: "absolute", inset: 0,
        background:
          "linear-gradient(135deg, rgba(13,102,101,0.28) 0%, transparent 55%), " +
          "linear-gradient(to top, rgba(13,102,101,0.18) 0%, transparent 45%)",
        zIndex: 2,
      }} />

      {/* ── Tesseract L-brackets ── */}
      <svg style={{ position: "absolute", bottom: 72, right: 64, zIndex: 3, opacity: 0.09, pointerEvents: "none" }}
        width="180" height="180" viewBox="0 0 180 180" fill="none">
        <path d="M180 0 L180 180 L0 180" stroke="#0D6665" strokeWidth="14"/>
        <path d="M180 48 L180 180 L48 180" stroke="#0D6665" strokeWidth="7" opacity="0.5"/>
      </svg>
      <svg style={{ position: "absolute", top: 96, left: 64, zIndex: 3, opacity: 0.06, pointerEvents: "none" }}
        width="130" height="130" viewBox="0 0 130 130" fill="none">
        <path d="M0 130 L0 0 L130 0" stroke="#0D6665" strokeWidth="12"/>
      </svg>

      {/* ── Main content ── */}
      <div style={{
        position: "relative", zIndex: 4,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 40px 56px",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}>

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ marginBottom: 48 }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 0,
            padding: "12px 28px",
            border: "1px solid rgba(13,102,101,0.45)",
            background: "rgba(13,102,101,0.10)",
            backdropFilter: "blur(8px)",
          }}>
            {[EVENT.date_display, EVENT.date_detail, EVENT.venue_display].map((item, i, arr) => (
              <span key={item} style={{ display: "inline-flex", alignItems: "center" }}>
                <span style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "rgba(240,237,232,0.92)",
                  textTransform: "uppercase",
                }}>
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span style={{
                    display: "inline-block",
                    width: 4, height: 4,
                    borderRadius: "50%",
                    background: "#0D6665",
                    margin: "0 20px",
                    flexShrink: 0,
                  }} />
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Headline — 3 lines, all caps, Orbitron ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28 }}
          style={{ marginBottom: 56 }}
        >
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", margin: 0, lineHeight: 1.06 }}>

            {/* Line 1 */}
            <span style={{
              display: "block",
              fontSize: "clamp(24px, 3.6vw, 52px)",
              fontWeight: 600,
              color: "rgba(240,237,232,0.72)",
              letterSpacing: "0.28em",
              marginBottom: "0.1em",
            }}>
              {EVENT.headline_line1}
            </span>

            {/* Line 2 — animated copper shimmer */}
            <span className="hero-copper-text" style={{
              display: "block",
              fontSize: "clamp(44px, 8.5vw, 116px)",
              fontWeight: 900,
              letterSpacing: "0.07em",
              marginBottom: "0.1em",
              background: "linear-gradient(90deg, #9E5520, #B86A2E, #E8A850, #F2BB60, #E0A040, #C07030, #B86A2E, #9E5520)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {EVENT.headline_main}
            </span>

            {/* Line 3 */}
            <span style={{
              display: "block",
              fontSize: "clamp(16px, 2.6vw, 38px)",
              fontWeight: 400,
              color: "rgba(240,237,232,0.58)",
              letterSpacing: "0.26em",
            }}>
              {EVENT.headline_line3}
            </span>

          </h1>
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.50 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
        >
          {/* Enquire — teal fill sweep on hover */}
          <a href={EVENT.enquire_url} className="btn-hero-ghost">{EVENT.cta_secondary_label}</a>

          {/* Apply to Attend — shimmer sweep + lift */}
          <a href={EVENT.register_url} className="btn-hero-primary">
            {EVENT.cta_primary_label}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>

      {/* ── Stats bar ── */}
      <div ref={statsRef} style={{
        position: "relative", zIndex: 4,
        background: "#13130E",
        borderTop: "1px solid rgba(13,102,101,0.28)",
        display: "grid",
        gridTemplateColumns: `repeat(${STATS.length}, 1fr)`,
      }}>
        {STATS.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} active={statsActive} />
        ))}
      </div>

      <style>{`
        /* Copper shimmer animation on headline */
        @keyframes copperShimmer {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .hero-copper-text {
          animation: copperShimmer 5s ease-in-out infinite;
        }

        /* Enquire — teal fill slides in from left */
        .btn-hero-ghost {
          display: inline-flex;
          align-items: center;
          padding: 16px 40px;
          border: 1px solid rgba(240,237,232,0.28);
          color: #F0EDE8;
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-decoration: none;
          background: transparent;
          position: relative;
          overflow: hidden;
          transition: color 0.32s, border-color 0.32s;
        }
        .btn-hero-ghost::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #0D6665;
          transform: translateX(-101%);
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-hero-ghost:hover::before { transform: translateX(0); }
        .btn-hero-ghost:hover { color: #fff; border-color: #0D6665; }
        .btn-hero-ghost > * { position: relative; z-index: 1; }

        /* Apply to Attend — shimmer sweep + lift + glow */
        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: #0D6665;
          color: #fff;
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
        }
        .btn-hero-primary::after {
          content: '';
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg);
          transition: left 0.55s ease;
        }
        .btn-hero-primary:hover::after { left: 150%; }
        .btn-hero-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(13,102,101,0.50);
          background: #0F7A79;
        }

        @media (max-width: 768px) {
          div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
