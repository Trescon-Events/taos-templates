"use client";
import { useEffect, useRef, useState } from "react";

const PILLARS = [
  {
    title: "Global Capital",
    body: "Connect with investment mandates funding Indonesia's digital leap. Engage sovereign wealth funds, family offices, and institutional investors deploying capital across Southeast Asia.",
    tag: "Investment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        <path d="M2 8h20M2 16h20"/>
      </svg>
    ),
  },
  {
    title: "Policy & Regulation",
    body: "Shape sovereign strategy alongside ministers and central bank governors. Co-author the regulatory frameworks that will define Indonesia's financial architecture through 2045.",
    tag: "Regulatory",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: "Frontier Technology",
    body: "Deploy AI and fintech at scale across a 77M unbanked opportunity. From LLM-powered credit scoring to blockchain settlement rails — built and deployed right now.",
    tag: "Innovation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
        <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
      </svg>
    ),
  },
];

export default function PillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .pl-root {
          background: #151c26;
          padding: 64px 0 72px;
          position: relative;
        }
        .pl-root::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,165,163,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .pl-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          position: relative; z-index: 1;
        }

        /* ── Card ── */
        .pl-item {
          background: #1a2233;
          border: 1px solid rgba(0,165,163,0.18);
          border-radius: 8px;
          padding: 40px 32px 32px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease,
            border-color 0.4s ease,
            box-shadow 0.4s ease;
          box-shadow: 0 6px 24px rgba(0,0,0,0.3);
        }
        .pl-item.pl-in { opacity: 1; transform: translateY(0); }
        .pl-item:hover {
          border-color: rgba(0,165,163,0.6);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 10px 36px rgba(0,0,0,0.45);
        }
        /* Top accent bar */
        .pl-item::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, #00a5a3, rgba(0,165,163,0.1));
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }
        .pl-item:hover::before { opacity: 1; }

        /* ── Title with design highlight ── */
        .pl-title-wrap {
          position: relative;
          margin-bottom: 20px;
          padding-left: 16px;
        }
        /* Teal left bar */
        .pl-title-wrap::before {
          content: '';
          position: absolute;
          left: 0; top: 2px; bottom: 2px;
          width: 3px;
          background: #00a5a3;
          opacity: 0;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.5s ease 0.2s, opacity 0.3s ease 0.2s;
        }
        .pl-item.pl-in .pl-title-wrap::before {
          opacity: 1;
          transform: scaleY(1);
        }
        .pl-title {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.2;
          background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
          transition: filter 0.3s ease;
        }
        .pl-item:hover .pl-title {
          filter: drop-shadow(0 0 10px rgba(0,165,163,0.5));
        }
        /* Animated underline on title */
        .pl-title-line {
          display: block;
          height: 1px;
          background: linear-gradient(to right, #00a5a3, transparent);
          margin-top: 8px;
          width: 0;
          transition: width 0.6s ease 0.35s;
        }
        .pl-item.pl-in .pl-title-line { width: 100%; }

        /* ── Background icon watermark ── */
        .pl-icon-bg {
          position: absolute;
          bottom: -16px; right: -16px;
          width: 160px; height: 160px;
          color: #00a5a3;
          opacity: 0.055;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.4s ease, transform 0.5s ease;
        }
        .pl-item:hover .pl-icon-bg {
          opacity: 0.1;
          transform: scale(1.08) rotate(-4deg);
        }

        /* ── Body ── */
        .pl-body {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          line-height: 1.78;
          flex: 1;
          transition: color 0.3s;
        }
        .pl-item:hover .pl-body { color: rgba(255,255,255,0.7); }

        /* ── Animated tag ── */
        @keyframes pl-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pl-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(0,165,163,0.6); }
          50%       { opacity: 0.6; transform: scale(0.8); box-shadow: 0 0 0 4px rgba(0,165,163,0); }
        }
        @keyframes pl-border-glow {
          0%, 100% { box-shadow: 0 0 4px rgba(0,165,163,0.2), inset 0 0 4px rgba(0,165,163,0.05); }
          50%       { box-shadow: 0 0 10px rgba(0,165,163,0.5), inset 0 0 6px rgba(0,165,163,0.12); }
        }

        .pl-footer {
          margin-top: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pl-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #00a5a3;
          border: 1px solid rgba(0,165,163,0.3);
          padding: 6px 12px;
          position: relative;
          overflow: hidden;
          /* Continuous border glow pulse */
          animation: pl-border-glow 2.4s ease-in-out infinite;
          /* Shimmer sweep on hover */
          background: rgba(0,165,163,0.06);
          transition: background 0.3s, border-color 0.3s, color 0.3s;
        }
        .pl-tag::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0,165,163,0.18) 40%,
            rgba(255,255,255,0.08) 50%,
            rgba(0,165,163,0.18) 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          background-position: -200% center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .pl-item:hover .pl-tag::after {
          opacity: 1;
          animation: pl-shimmer 1.4s ease-in-out infinite;
        }
        .pl-item:hover .pl-tag {
          border-color: rgba(0,165,163,0.6);
          background: rgba(0,165,163,0.1);
        }
        /* Pulsing dot */
        .pl-dot {
          width: 6px; height: 6px;
          background: #00a5a3;
          border-radius: 50%;
          flex-shrink: 0;
          animation: pl-dot-pulse 2s ease-in-out infinite;
        }

        @media (max-width: 860px) {
          .pl-inner { grid-template-columns: 1fr; gap: 16px; }
          .pl-item { padding: 32px 24px 28px; }
        }
        @media (max-width: 600px) {
          .pl-inner { padding: 0 20px; }
          .pl-root { padding: 48px 0 56px; }
        }
      `}</style>

      <div className="pl-root" ref={ref}>
        <div className="pl-inner">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className={`pl-item gc${active ? " pl-in" : ""}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Background icon watermark */}
              <div className="pl-icon-bg" aria-hidden="true">{p.icon}</div>

              {/* Title with left-bar + gradient + underline */}
              <div className="pl-title-wrap">
                <span className="pl-title">{p.title}</span>
                <span className="pl-title-line" />
              </div>

              {/* Body */}
              <div className="pl-body">{p.body}</div>

              {/* Animated tag */}
              <div className="pl-footer">
                <div className="pl-tag">
                  <span className="pl-dot" />
                  {p.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
