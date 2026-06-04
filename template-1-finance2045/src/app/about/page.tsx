"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const DIGIT_H = 52;

function RollingDigit({ char, active, delay }: { char: string; active: boolean; delay: number }) {
  const stripRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!active || !/[0-9]/.test(char)) return;
    const endY = -20 * DIGIT_H;
    let rafId: number;
    const t = setTimeout(() => {
      let start: number | null = null;
      const run = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1500, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        if (stripRef.current) stripRef.current.style.transform = `translateY(${ease * endY}px)`;
        if (p < 1) rafId = requestAnimationFrame(run);
      };
      rafId = requestAnimationFrame(run);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(rafId); };
  }, [active, char, delay]);

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

function RollingNumber({ text, active, delay = 0 }: { text: string; active: boolean; delay?: number }) {
  let di = 0;
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end" }}>
      {text.split("").map((ch, i) => {
        const isD = /[0-9]/.test(ch);
        const d = isD ? di++ : 0;
        return isD
          ? <RollingDigit key={i} char={ch} active={active} delay={delay + d * 80} />
          : <span key={i} style={{ display: "inline-block" }}>{ch}</span>;
      })}
    </span>
  );
}

export default function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsActive(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <style>{`
        .abp-page {
          padding-top: 88px;
          background: var(--bg-primary);
        }

        /* ── HERO ── */
        .abp-hero {
          padding: 80px 40px 72px;
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
        }
        .abp-hero h1 {
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: #fff;
          margin-bottom: 20px;
        }
        .abp-hero h1 span {
          background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .abp-hero-sub {
          font-size: 17px;
          color: rgba(255,255,255,0.58);
          line-height: 1.78;
          max-width: 620px;
          margin: 0 auto;
        }

        /* ── CONTENT SECTIONS ── */
        .abp-content {
          background: var(--bg-surface);
          position: relative;
        }
        .abp-content::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.35), transparent);
        }
        .abp-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 80px 40px;
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        /* Split row */
        .abp-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .abp-split.abp-reverse { direction: rtl; }
        .abp-split.abp-reverse > * { direction: ltr; }

        .abp-text-block h2 {
          font-size: clamp(22px, 2.5vw, 32px);
          font-weight: 900;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: #fff;
          margin-bottom: 6px;
        }
        .abp-text-block h2 span {
          background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .abp-text-divider {
          width: 40px; height: 2px;
          background: #00a5a3;
          margin: 16px 0 24px;
        }
        .abp-text-block p {
          font-size: 15px;
          color: rgba(255,255,255,0.65);
          line-height: 1.85;
          margin-bottom: 16px;
        }
        .abp-text-block p:last-of-type { margin-bottom: 0; }

        /* Photo in split */
        .abp-split-photo {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(0,165,163,0.2);
          aspect-ratio: 4/3;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5);
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .abp-split-photo:hover {
          border-color: rgba(0,165,163,0.5);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 10px 36px rgba(0,0,0,0.45);
        }
        .abp-split-photo img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.6s ease;
        }
        .abp-split-photo:hover img { transform: scale(1.04); }
        .abp-split-photo-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, #00a5a3, rgba(0,165,163,0.2));
        }
        .abp-split-photo-tag {
          position: absolute; bottom: 16px; left: 16px;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #00a5a3;
          background: rgba(10,15,24,0.85);
          border: 1px solid rgba(0,165,163,0.3);
          padding: 5px 12px;
          border-radius: 4px;
        }

        /* ── STATS ── */
        .abp-stats-wrap {
          background: var(--bg-primary);
          position: relative;
        }
        .abp-stats-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.3), transparent);
        }
        .abp-stats {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .abp-stat {
          padding: 52px 36px 44px;
          border-right: 1px solid rgba(0,165,163,0.08);
          position: relative;
          overflow: hidden;
          transition: background 0.35s, box-shadow 0.4s;
        }
        .abp-stat:last-child { border-right: none; }
        .abp-stat:hover {
          background: rgba(0,165,163,0.04);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 10px 36px rgba(0,0,0,0.45);
          z-index: 1;
        }
        .abp-stat::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #00a5a3, transparent);
          opacity: 0; transform: scaleY(0); transform-origin: top;
          transition: opacity 0.35s, transform 0.35s;
        }
        .abp-stat:hover::before { opacity: 1; transform: scaleY(1); }
        .abp-stat-num {
          font-size: clamp(36px, 3.5vw, 52px);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 12px;
        }
        .abp-stat-label {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 6px;
        }
        .abp-stat-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          line-height: 1.5;
        }

        /* ── CTA ── */
        .abp-cta {
          background: var(--bg-surface);
          padding: 64px 40px;
          text-align: center;
          position: relative;
        }
        .abp-cta::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.3), transparent);
        }
        .abp-cta-btns {
          display: flex; gap: 16px;
          justify-content: center; flex-wrap: wrap;
          margin-top: 24px;
        }

        @media (max-width: 960px) {
          .abp-split { grid-template-columns: 1fr; gap: 36px; }
          .abp-split.abp-reverse { direction: ltr; }
          .abp-stats { grid-template-columns: 1fr 1fr; }
          .abp-stat { border-bottom: 1px solid rgba(0,165,163,0.08); }
        }
        @media (max-width: 640px) {
          .abp-hero { padding: 48px 20px 40px; }
          .abp-inner { padding: 56px 20px; gap: 56px; }
          .abp-stat { padding: 36px 24px 32px; }
          .abp-cta { padding: 48px 20px; }
        }
      `}</style>

      <div className="abp-page">

        {/* ── HERO ── */}
        <div className="abp-hero">
          <h1>Empowering Indonesia&apos;s<br /><span>Emas 2045 Vision</span></h1>
          <p className="abp-hero-sub">
            Where frontier technology and global capital converge to reshape the financial future of Southeast Asia.
          </p>
        </div>

        {/* ── CONTENT ── */}
        <div className="abp-content">
          <div className="abp-inner">

            {/* Split 1: text left, panel photo right */}
            <div className="abp-split">
              <div className="abp-text-block">
                <div className="f45-eyebrow">The Event</div>
                <h2>What is <span>Finance 2045</span>?</h2>
                <div className="abp-text-divider" />
                <p>
                  Finance 2045 is Southeast Asia&apos;s preeminent financial summit, convening 1,000+ elite decision-makers over two intensive days to forge strategic partnerships within Indonesia&apos;s booming $18 billion fintech market.
                </p>
                <p>
                  Co-located with World AI Show 2026, it provides an unparalleled platform where frontier technology and global capital converge — aligning with the government&apos;s Golden Indonesia 2045 vision to drive digital economic transformation and financial inclusion across the region.
                </p>
              </div>
              <div className="abp-split-photo">
                <div className="abp-split-photo-bar" />
                <Image
                  src="/about-panel.jpg"
                  alt="Finance 2045 panel discussion"
                  width={560}
                  height={420}
                  quality={90}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="abp-split-photo-tag">Jakarta · July 2026</div>
              </div>
            </div>

            {/* Split 2: speaker photo left, text right */}
            <div className="abp-split abp-reverse">
              <div className="abp-text-block">
                <div className="f45-eyebrow">The Opportunity</div>
                <h2>An Economy at an <span>Inflection Point</span></h2>
                <div className="abp-text-divider" />
                <p>
                  With 77M+ unbanked adults, 65M+ MSMEs, and a government committed to the Emas 2045 national vision, the conditions for transformative financial innovation have never been more favourable.
                </p>
                <p>
                  Finance 2045 brings together CFOs, regulators, central bank governors, venture capitalists, and technology founders to architect the financial ecosystem that will power Indonesia&apos;s golden decade — at Sheraton Grand Jakarta on 7–8 July 2026.
                </p>
              </div>
              <div className="abp-split-photo">
                <div className="abp-split-photo-bar" />
                <Image
                  src="/about-speaker.jpg"
                  alt="Finance 2045 keynote speaker"
                  width={560}
                  height={420}
                  quality={90}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="abp-split-photo-tag">Keynote Address</div>
              </div>
            </div>

          </div>
        </div>

        {/* ── STATS ── */}
        <div className="abp-stats-wrap" ref={statsRef}>
          <div className="abp-stats">
            {[
              { num: "1,000+", label: "Elite Decision-Makers", sub: "Attending across two immersive days", delay: 0 },
              { num: "$18B",   label: "Indonesia Fintech Market", sub: "Projected market size by 2030", delay: 120 },
              { num: "77M+",  label: "Unbanked Adults", sub: "The opportunity Finance 2045 addresses", delay: 240 },
              { num: "65M+",  label: "MSMEs to be Reached", sub: "Through digital financial inclusion", delay: 360 },
            ].map((s) => (
              <div key={s.label} className="abp-stat">
                <div className="abp-stat-num">
                  <RollingNumber text={s.num} active={statsActive} delay={s.delay} />
                </div>
                <div className="abp-stat-label">{s.label}</div>
                <div className="abp-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="abp-cta">
          <div className="f45-eyebrow" style={{ justifyContent: "center" }}>
            <span className="f45-eyebrow-dot" />
            7 – 8 July 2026 · Sheraton Grand Jakarta
          </div>
          <div className="abp-cta-btns">
            <Link href="/" className="f45-btn-primary">
              Book a Pass
            </Link>
            <Link href="/enquire" className="f45-btn-outline">Enquire Now</Link>
          </div>
        </div>

      </div>
    </>
  );
}
