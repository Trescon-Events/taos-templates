"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "The networking opportunities here are genuinely valuable for all of us.",
    role: "Senior Vice President & Head of Business Technology",
    company: "HDFC Bank",
  },
  {
    quote: "There's always something new to discover and great people to connect with.",
    role: "Vice President",
    company: "Deutsche Bank AG",
  },
  {
    quote: "Events like this are where we meet global FinTech players, share ideas, and see all the cool innovations happening.",
    role: "Head of Wholesale Digital Banking",
    company: "Mashreq",
  },
  {
    quote: "The pre-qualification brought in some really serious business buyers from multiple sectors.",
    role: "Director of Global Business Development",
    company: "Techforce.ai",
  },
];

const AUTO_MS = 3000;

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);

  const advanceTo = (idx: number) => {
    setFading(true);
    setProgress(0);
    setTimeout(() => { setActive(idx); setFading(false); }, 220);
  };

  const startProgress = () => {
    if (progressTimer.current) clearInterval(progressTimer.current);
    setProgress(0);
    progressTimer.current = setInterval(() => {
      if (!isPaused.current) setProgress(p => Math.min(p + 100 / (AUTO_MS / 50), 100));
    }, 50);
  };

  const startAuto = () => {
    if (timer.current) clearInterval(timer.current);
    startProgress();
    timer.current = setInterval(() => {
      if (!isPaused.current) {
        setActive(prev => { advanceTo((prev + 1) % testimonials.length); return prev; });
        startProgress();
      }
    }, AUTO_MS);
  };

  const goTo = (idx: number) => {
    if (idx === active) return;
    if (timer.current) clearInterval(timer.current);
    advanceTo(idx);
    startAuto();
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Entry animation + auto-start
    const entryObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); startAuto(); } },
      { threshold: 0.2 }
    );
    entryObs.observe(el);

    // Auto-mute when scrolled off screen
    const muteObs = new IntersectionObserver(
      ([e]) => { if (!e.isIntersecting) setMuted(true); },
      { threshold: 0.01 }
    );
    muteObs.observe(el);

    return () => {
      entryObs.disconnect();
      muteObs.disconnect();
      if (timer.current) clearInterval(timer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  const t = testimonials[active];

  return (
    <>
      <style>{`
        .tm-root {
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 52% 48%;
        }
        .tm-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.35), transparent);
          z-index: 3;
        }

        /* ── Video side ── */
        .tm-video-side {
          position: relative;
          overflow: hidden;
          min-height: 560px;
        }
        .tm-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: contain;
          object-position: center center;
          background: #000;
          display: block;
        }
        .tm-video-side::after {
          content: '';
          position: absolute; top: 0; right: 0; bottom: 0;
          width: 55%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(10,14,22,0.15) 30%,
            rgba(10,14,22,0.55) 60%,
            rgba(10,14,22,0.88) 80%,
            var(--bg-primary) 100%
          );
          z-index: 2;
        }
        .tm-video-side::before {
          content: '';
          position: absolute; left: 0; right: 0; bottom: 0;
          height: 80px;
          background: linear-gradient(to top, var(--bg-primary), transparent);
          z-index: 2;
        }

        /* Mute toggle */
        .tm-mute-btn {
          position: absolute;
          bottom: 20px; left: 20px;
          z-index: 5;
          display: flex; align-items: center; gap: 8px;
          background: rgba(10,14,22,0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0,165,163,0.35);
          border-radius: 6px;
          padding: 8px 14px;
          color: rgba(255,255,255,0.85);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s;
        }
        .tm-mute-btn:hover {
          border-color: rgba(0,165,163,0.7);
          background: rgba(0,165,163,0.12);
          color: #fff;
          box-shadow: 0 0 14px rgba(0,165,163,0.25);
        }
        .tm-mute-btn svg { flex-shrink: 0; color: #00a5a3; }

        /* ── Quote side ── */
        .tm-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 72px 64px 72px 52px;
          position: relative;
          overflow: hidden;
          border-left: 1px solid rgba(0,165,163,0.08);
          /* entry */
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
        }
        .tm-root.tm-in .tm-content { opacity: 1; transform: translateX(0); }

        /* Ambient teal glow — bottom-right corner */
        .tm-content::after {
          content: '';
          position: absolute; bottom: -100px; right: -100px;
          width: 360px; height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,165,163,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Trescon logo watermark */
        .tm-logo-watermark {
          position: absolute;
          bottom: 32px; right: -20px;
          width: 340px;
          opacity: 0.07;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* Top row: eyebrow + counter */
        .tm-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .tm-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #00a5a3;
        }
        .tm-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #00a5a3; flex-shrink: 0;
        }
        .tm-counter {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.18);
          font-variant-numeric: tabular-nums;
        }
        .tm-counter em { color: rgba(255,255,255,0.55); font-style: normal; }

        /* Heading — compact, not competing with quote */
        .tm-heading {
          font-size: clamp(20px, 1.9vw, 26px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.2;
          color: rgba(255,255,255,0.55);
          margin-bottom: 44px;
        }
        .tm-heading span {
          background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Quote block — the hero ── */
        .tm-quote-zone {
          flex: 1;
          position: relative;
        }

        /* Ghost decorative quote mark */
        .tm-qmark-bg {
          position: absolute;
          top: -24px; left: -12px;
          font-size: 180px;
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 900;
          color: #E9C268;
          opacity: 0.07;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .tm-quote-block {
          position: relative; z-index: 1;
          transition: opacity 0.22s ease, transform 0.22s ease;
          opacity: 1; transform: translateY(0);
        }
        .tm-quote-block.tm-fading { opacity: 0; transform: translateY(8px); }

        /* Opening quote mark — visible, gold */
        .tm-open-quote {
          display: block;
          font-size: 36px;
          font-family: Georgia, 'Times New Roman', serif;
          color: #E9C268;
          line-height: 1;
          margin-bottom: 16px;
          opacity: 0.9;
        }

        .tm-quote-text {
          font-size: clamp(18px, 1.65vw, 22px);
          font-weight: 600;
          color: #fff;
          line-height: 1.68;
          letter-spacing: -0.015em;
          margin-bottom: 36px;
        }

        /* Thin separator */
        .tm-sep {
          height: 1px;
          background: linear-gradient(to right, rgba(0,165,163,0.4), rgba(0,165,163,0.05), transparent);
          margin-bottom: 28px;
        }

        /* Author */
        .tm-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .tm-author-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          flex-shrink: 0;
          background: rgba(0,165,163,0.1);
          border: 1px solid rgba(0,165,163,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #00a5a3;
        }
        .tm-author-role {
          font-size: 12px; font-weight: 700;
          color: rgba(255,255,255,0.65);
          line-height: 1.45;
          margin-bottom: 5px;
        }
        .tm-author-company {
          font-size: 12px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #E9C268;
        }

        /* Navigation bar */
        .tm-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 44px;
        }
        .tm-dot-btn {
          position: relative;
          height: 2px; width: 28px;
          border-radius: 2px;
          background: rgba(255,255,255,0.1);
          border: none; padding: 0;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.3s, width 0.3s;
        }
        .tm-dot-btn.tm-dot-active {
          width: 56px;
          background: rgba(0,165,163,0.2);
        }
        .tm-dot-fill {
          position: absolute; left: 0; top: 0; bottom: 0;
          background: #00a5a3; border-radius: 2px;
        }
        .tm-dot-btn:not(.tm-dot-active):hover { background: rgba(255,255,255,0.25); }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .tm-root { grid-template-columns: 1fr; }
          .tm-video-side { min-height: 300px; }
          .tm-video-side::after { display: none; }
          .tm-content {
            padding: 48px 24px 56px;
            border-left: none;
            border-top: 1px solid rgba(0,165,163,0.08);
            transform: translateY(16px);
          }
          .tm-root.tm-in .tm-content { transform: translateY(0); }
          .tm-heading { margin-bottom: 32px; }
        }
      `}</style>

      <section
        className={`tm-root${visible ? " tm-in" : ""}`}
        ref={sectionRef}
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
      >
        {/* ── LEFT: Video ── */}
        <div className="tm-video-side">
          <video
            ref={videoRef}
            className="tm-video"
            src="/testimonials.webm"
            autoPlay loop muted={muted} playsInline
          />
          <button
            className="tm-mute-btn"
            onClick={() => setMuted(m => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
                Tap to Unmute
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
                Mute
              </>
            )}
          </button>
        </div>

        {/* ── RIGHT: Quote ── */}
        <div className="tm-content">
          {/* Trescon logo — large embossed watermark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-trescon-10years.jpeg" alt="" className="tm-logo-watermark" aria-hidden="true" />

          {/* Eyebrow + counter */}
          <div className="tm-top-row">
            <div className="tm-eyebrow">
              <span className="tm-eyebrow-dot" />
              Testimonials
            </div>
            <div className="tm-counter">
              <em>{String(active + 1).padStart(2, "0")}</em> / {String(testimonials.length).padStart(2, "0")}
            </div>
          </div>

          {/* Heading */}
          <h2 className="tm-heading">
            What Leaders <span>Say About Us</span>
          </h2>

          {/* Quote zone */}
          <div className="tm-quote-zone">
            <span className="tm-qmark-bg">&ldquo;</span>

            <div className={`tm-quote-block${fading ? " tm-fading" : ""}`}>
              <span className="tm-open-quote">&ldquo;</span>
              <p className="tm-quote-text">{t.quote}</p>
              <div className="tm-sep" />
              <div className="tm-author">
                <div className="tm-author-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <div className="tm-author-role">{t.role}</div>
                  <div className="tm-author-company">{t.company}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="tm-nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`tm-dot-btn${i === active ? " tm-dot-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Testimonial ${i + 1}`}
              >
                {i === active && <div className="tm-dot-fill" style={{ width: `${progress}%` }} />}
              </button>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
