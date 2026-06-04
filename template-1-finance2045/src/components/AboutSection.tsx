"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DIGIT_H = 52;

function RollingDigit({ char, animKey, delay }: { char: string; animKey: number; delay: number }) {
  const stripRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (animKey === 0 || !/[0-9]/.test(char)) return;
    // Snap to top first, then animate after browser has painted the reset
    if (stripRef.current) stripRef.current.style.transform = "translateY(0)";
    const endY = -20 * DIGIT_H;
    let rafId: number;
    const t = setTimeout(() => {
      requestAnimationFrame(() => {
        let start: number | null = null;
        const run = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1500, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          if (stripRef.current) stripRef.current.style.transform = `translateY(${ease * endY}px)`;
          if (p < 1) rafId = requestAnimationFrame(run);
        };
        rafId = requestAnimationFrame(run);
      });
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(rafId); };
  }, [animKey, char, delay]);

  if (!/[0-9]/.test(char)) return <span style={{ display: "inline-block" }}>{char}</span>;
  const target = parseInt(char);
  const strip = [...Array(20).keys()].map(i => i % 10).concat([target]);
  return (
    <span style={{ display: "inline-block", height: DIGIT_H, overflow: "hidden", verticalAlign: "bottom" }}>
      <span ref={stripRef} style={{ display: "flex", flexDirection: "column", willChange: "transform" }}>
        {strip.map((d, i) => (
          <span key={i} style={{ display: "block", height: DIGIT_H, lineHeight: `${DIGIT_H}px`, textAlign: "center" }}>{d}</span>
        ))}
      </span>
    </span>
  );
}

function RollingNumber({ text, animKey, delay = 0 }: { text: string; animKey: number; delay?: number }) {
  let di = 0;
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end" }}>
      {text.split("").map((ch, i) => {
        const isD = /[0-9]/.test(ch);
        const d = isD ? di++ : 0;
        return isD
          ? <RollingDigit key={i} char={ch} animKey={animKey} delay={delay + d * 80} />
          : <span key={i} style={{ display: "inline-block" }}>{ch}</span>;
      })}
    </span>
  );
}

const STATS = [
  {
    text: "1,000+",
    label: "Elite Decision-Makers",
    context: "Attending across two immersive days",
    delay: 0,
  },
  {
    text: "$18B",
    label: "Indonesia Fintech Market",
    context: "Projected market size by 2030",
    delay: 120,
  },
  {
    text: "77M+",
    label: "Unbanked Adults",
    context: "The opportunity Finance 2045 addresses",
    delay: 240,
  },
  {
    text: "65M+",
    label: "MSMEs to be Reached",
    context: "Through digital financial inclusion",
    delay: 360,
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimKey(k => k + 1); },
      { threshold: 0 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ═══════════════════════════
           ABOUT SECTION
           ═══════════════════════════ */
        .ab-root {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background-color: #0a0e16;
        }
        /* Conference photo — top area only */
        .ab-bg-photo {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 100%;
          background-image: url('/empowering-indonesia-emas.webp');
          background-size: cover;
          background-position: center 30%;
          background-attachment: fixed;
          z-index: 0;
        }
        /* Dark teal overlay for readability */
        .ab-bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,14,22,0.78) 0%,
            rgba(10,14,22,0.72) 40%,
            rgba(10,14,22,0.90) 70%,
            rgba(10,14,22,1.0) 100%
          );
          z-index: 1;
        }
        /* Teal top border line */
        .ab-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.5), transparent);
          z-index: 3;
        }

        /* ── TOP: Statement row ── */
        .ab-top {
          max-width: 1240px;
          margin: 0 auto;
          padding: 88px 40px 72px;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 64px;
          align-items: center;
          position: relative; z-index: 2;
        }

        /* Left text */
        .ab-h2 {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 900;
          letter-spacing: -0.035em;
          line-height: 1.06;
          color: #fff;
          margin: 14px 0 24px;
        }
        .ab-h2 em {
          font-style: normal;
          background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ab-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.65);
          line-height: 1.82;
          max-width: 500px;
          margin-bottom: 32px;
        }
        .ab-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00a5a3;
          transition: gap 0.2s;
        }
        .ab-link:hover { gap: 12px; }

        /* Right: Event brief card */
        .ab-card {
          background: #1a2233;
          border: 1px solid rgba(0,165,163,0.5);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 10px 36px rgba(0,0,0,0.45);
          transition: box-shadow 0.4s, border-color 0.4s;
        }
        .ab-card:hover {
          border-color: rgba(0,165,163,0.8);
          box-shadow:
            0 0 36px rgba(0,165,163,0.5),
            0 0 72px rgba(0,165,163,0.22),
            0 12px 40px rgba(0,0,0,0.5);
        }
        /* Teal top bar */
        .ab-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, #00a5a3, #e9c268);
        }
        .ab-card-inner { padding: 36px 32px 28px; }
        .ab-card-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: #e9c268;
          border: 1px solid rgba(233,194,104,0.3);
          background: rgba(233,194,104,0.06);
          padding: 5px 12px;
          margin-bottom: 20px;
        }
        .ab-card-date {
          font-size: 28px; font-weight: 900;
          letter-spacing: -0.03em; color: #fff;
          line-height: 1; margin-bottom: 6px;
        }
        .ab-card-venue {
          font-size: 13px; color: rgba(255,255,255,0.8);
          margin-bottom: 24px; padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          line-height: 1.6;
        }
        .ab-card-venue strong { color: #fff; font-weight: 700; display: block; margin-bottom: 2px; }
        .ab-card-rows {
          display: flex; flex-direction: column; gap: 12px;
          margin-bottom: 28px;
        }
        .ab-card-row {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; color: rgba(255,255,255,0.82); font-weight: 500;
        }
        .ab-card-row-dot {
          width: 5px; height: 5px; background: #00a5a3; flex-shrink: 0;
        }
        .ab-card-cta {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);
        }
        .ab-card-cta-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,255,255,0.55);
        }
        .ab-card-cta-btn {
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: #00a5a3;
          display: flex; align-items: center; gap: 6px;
          transition: gap 0.2s;
        }
        .ab-card-cta-btn:hover { gap: 10px; }

        /* ── STATS ROW ── */
        .ab-stats {
          border-top: 1px solid rgba(0,165,163,0.1);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative; z-index: 2;
        }
        .ab-stat {
          padding: 44px 36px 40px;
          border-right: 1px solid rgba(0,165,163,0.08);
          border-bottom: 1px solid rgba(0,165,163,0.08);
          position: relative;
          overflow: hidden;
          transition: background 0.35s, box-shadow 0.4s, border-color 0.4s;
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat:hover {
          background: rgba(0,165,163,0.04);
          border-color: rgba(0,165,163,0.5);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 10px 36px rgba(0,0,0,0.45);
          z-index: 1;
        }

        /* Left accent bar on hover */
        .ab-stat::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #00a5a3, transparent);
          opacity: 0; transform: scaleY(0); transform-origin: top;
          transition: opacity 0.35s, transform 0.35s;
        }
        .ab-stat:hover::before { opacity: 1; transform: scaleY(1); }

        /* Faint watermark */
        .ab-stat-bg {
          position: absolute; bottom: -10px; right: -4px;
          font-size: 90px; font-weight: 900;
          color: rgba(0,165,163,0.04);
          line-height: 1; pointer-events: none; user-select: none;
          letter-spacing: -0.04em;
          transition: color 0.35s;
        }
        .ab-stat:hover .ab-stat-bg { color: rgba(0,165,163,0.08); }

        .ab-stat-num {
          font-size: clamp(36px, 3.2vw, 48px);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #e9c268;
          line-height: 1;
          margin-bottom: 10px;
          overflow: hidden;
          display: block;
          position: relative; z-index: 1;
        }
        .ab-stat-label {
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          margin-bottom: 8px;
          position: relative; z-index: 1;
        }
        .ab-stat-context {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
          position: relative; z-index: 1;
          transition: color 0.3s;
        }
        .ab-stat:hover .ab-stat-context { color: rgba(255,255,255,0.55); }

        /* ── BOTTOM INFO STRIP ── */
        .ab-strip {
          border-top: 1px solid rgba(0,165,163,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          padding: 20px 40px;
          flex-wrap: wrap;
          position: relative; z-index: 2;
          position: relative; z-index: 1;
          background: rgba(0,0,0,0.15);
        }
        .ab-strip-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.04em;
        }
        .ab-strip-item svg { color: #00a5a3; flex-shrink: 0; }
        .ab-strip-divider {
          width: 1px; height: 16px;
          background: rgba(255,255,255,0.1);
        }

        /* Scroll-reveal for stats */
        .ab-stat-reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ab-active .ab-stat-reveal { opacity: 1; transform: translateY(0); }
        .ab-stat-reveal:nth-child(1) { transition-delay: 0.05s; }
        .ab-stat-reveal:nth-child(2) { transition-delay: 0.12s; }
        .ab-stat-reveal:nth-child(3) { transition-delay: 0.19s; }
        .ab-stat-reveal:nth-child(4) { transition-delay: 0.26s; }

        @media (max-width: 1024px) {
          .ab-top { grid-template-columns: 1fr; gap: 40px; }
          .ab-card { max-width: 480px; }
          .ab-stats { grid-template-columns: 1fr 1fr; }
          .ab-stat { border-bottom: 1px solid rgba(0,165,163,0.08); }
        }
        @media (max-width: 640px) {
          .ab-top { padding: 56px 20px 48px; }
          .ab-stats { grid-template-columns: 1fr 1fr; }
          .ab-stat { padding: 32px 20px 28px; }
          .ab-stat-num { font-size: 40px; }
          .ab-strip { gap: 20px; padding: 16px 20px; }
          .ab-strip-divider { display: none; }
        }
      `}</style>

      <section className={`ab-root${animKey > 0 ? " ab-active" : ""}`} ref={ref}>
        <div className="ab-bg-photo" />
        <div className="ab-bg-overlay" />

        {/* ── TOP ── */}
        <div className="ab-top">
          <div>
            <div className="f45-eyebrow">
              <span className="f45-eyebrow-dot" />
              About Finance 2045
            </div>
            <h2 className="ab-h2">
              Empowering<br />
              Indonesia&apos;s <em>Emas 2045</em><br />
              Vision
            </h2>
            <p className="ab-desc">
              Southeast Asia&apos;s preeminent financial summit — where elite decision-makers forge the partnerships, policy directives and capital flows that will define Indonesia&apos;s $18B fintech economy and its path to becoming a top-five global economy by 2045.
            </p>
            <Link href="/enquire" className="ab-link">
              Register Your Interest
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Event brief card */}
          <div className="ab-card gc">
            <div className="ab-card-inner">
              <div className="ab-card-badge">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="#e9c268"><circle cx="4" cy="4" r="4"/></svg>
                Confirmed Event
              </div>
              <div className="ab-card-date">7 – 8 July 2026</div>
              <div className="ab-card-venue">
                <strong>Sheraton Grand Jakarta</strong><br />
                Gandaria City · Jakarta, Indonesia
              </div>
              <div className="ab-card-rows">
                {[
                  "By invitation — open registration available",
                  "Co-located with World AI Show Indonesia",
                  "FinTech World Cup Indonesia Qualifiers",
                  "Ministerial keynotes & closed roundtables",
                ].map(r => (
                  <div key={r} className="ab-card-row">
                    <span className="ab-card-row-dot" />
                    {r}
                  </div>
                ))}
              </div>
              <div className="ab-card-cta">
                <span className="ab-card-cta-label">Organised by Trescon</span>
                <Link href="/enquire" className="ab-card-cta-btn">
                  Secure Your Seat
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="ab-stats">
          {STATS.map((s) => (
            <div key={s.label} className="ab-stat ab-stat-reveal gc">
              <span className="ab-stat-bg">{s.text.replace(/[^0-9$+BMK]/g, "")}</span>
              <div className="ab-stat-num">
                <RollingNumber text={s.text} animKey={animKey} delay={s.delay} />
              </div>
              <div className="ab-stat-label">{s.label}</div>
              <div className="ab-stat-context">{s.context}</div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div className="ab-strip">
          {[
            { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>, text: "7 – 8 July 2026" },
            { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: "Sheraton Grand Jakarta" },
            { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, text: "1,000+ Leaders" },
            { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, text: "Global Audience" },
          ].map((item, i, arr) => (
            <span key={i} style={{ display: "contents" }}>
              <div className="ab-strip-item">
                {item.icon}
                {item.text}
              </div>
              {i < arr.length - 1 && <div className="ab-strip-divider" />}
            </span>
          ))}
        </div>

      </section>
    </>
  );
}
