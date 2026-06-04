"use client";
import { useEffect, useRef, useState } from "react";

const items = [
  {
    img: "/happening/power-networking.jpg",
    tag: "Connect",
    num: "01",
    title: "Power Networking",
    desc: "Hear from global CX, Marketing & Tech experts on the best practices to make CX an integral part of any business and create customer-first experiences in a fast-moving digital world.",
  },
  {
    img: "/happening/keynote-presentation.jpg",
    tag: "Learn",
    num: "02",
    title: "Keynote Presentation",
    desc: "Learn from early adopters and understand how CX impacts the willingness of a customer turning into a brand advocate and the potential of a great CX strategy to revolutionize customer journeys.",
  },
  {
    img: "/happening/panel-discussion.jpg",
    tag: "Discuss",
    num: "03",
    title: "Panel Discussions",
    desc: "Brainstorm and exchange ideas with some of the greatest minds in CX & related fields — seasoned veterans from varied sectors forming a bridge between experience and business outcomes.",
  },
  {
    img: "/happening/product-showcase.jpg",
    tag: "Discover",
    num: "04",
    title: "Product Showcase",
    desc: "Global technology providers showcase their latest innovations — live demos, use-case studies and educational sessions designed to help businesses adopt robust CX strategies.",
  },
];

export default function HappeningsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .hap-section {
          background: var(--bg-primary);
          padding: 48px 40px 100px;
          position: relative;
          overflow: hidden;
        }
        .hap-orb-1 {
          position: absolute;
          width: 700px; height: 700px; border-radius: 50%;
          top: -200px; right: -200px;
          background: radial-gradient(circle, rgba(54,188,176,0.05) 0%, transparent 65%);
          pointer-events: none;
        }
        .hap-orb-2 {
          position: absolute;
          width: 500px; height: 500px; border-radius: 50%;
          bottom: -100px; left: -100px;
          background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%);
          pointer-events: none;
        }
        .hap-inner {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ── Header ── */
        .hap-header {
          margin-bottom: 48px;
        }
        .hap-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--coral); margin-bottom: 14px;
        }
        .hap-overline::before {
          content: ''; width: 28px; height: 1.5px;
          background: var(--coral); flex-shrink: 0;
        }
        .hap-h2 {
          font-size: clamp(26px, 3.2vw, 48px);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.08; color: #fff; margin: 0 0 12px;
        }
        .hap-h2 em { font-style: normal; color: var(--coral); }
        .hap-sub {
          font-size: 15px; color: var(--text-body);
          max-width: 580px; line-height: 1.85;
        }
        .hap-sub-detail {
          font-size: 14px; color: var(--text-body);
          max-width: 580px; line-height: 1.85; margin-top: 14px;
        }
        .hap-sub-detail strong { color: rgba(255,255,255,0.75); font-weight: 600; }

        /* ── Bento grid — 3 cols, 2 EQUAL rows ── */
        .hap-bento {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr 1.1fr;
          grid-template-rows: 260px 260px;
          gap: 12px;
        }

        /* Placement */
        .hap-c0 { grid-column: 1; grid-row: 1 / 3; }   /* left tall   */
        .hap-c1 { grid-column: 2; grid-row: 1; }        /* mid top     */
        .hap-c2 { grid-column: 2; grid-row: 2; }        /* mid bottom  */
        .hap-c3 { grid-column: 3; grid-row: 1 / 3; }   /* right tall  */

        /* ── Card ── */
        .hap-card {
          position: relative;
          overflow: hidden;
          cursor: default;
          opacity: 0;
          transform: translateY(24px) scale(0.99);
          transition: opacity 0.65s ease, transform 0.65s ease,
                      box-shadow 0.35s;
        }
        .hap-card.vis { opacity: 1; transform: translateY(0) scale(1); }
        .hap-card:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.55),
                      0 0 0 1px rgba(54,188,176,0.22);
          z-index: 2;
        }

        /* Image fills entire card */
        .hap-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 15%;
          display: block;
          transition: transform 0.7s ease;
          filter: brightness(0.82);
        }
        .hap-card:hover .hap-img {
          transform: scale(1.06);
          filter: brightness(0.92);
        }

        /* Gradient overlay */
        .hap-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,22,40,0.05) 0%,
            rgba(10,22,40,0.18) 38%,
            rgba(10,22,40,0.72) 65%,
            rgba(10,22,40,0.96) 100%
          );
          transition: opacity 0.4s;
        }

        /* Coral top accent bar */
        .hap-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, var(--coral), var(--gold), transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease; z-index: 4;
        }
        .hap-card:hover .hap-bar { transform: scaleX(1); }

        /* Outer border frame */
        .hap-frame {
          position: absolute; inset: 0;
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.35s;
          pointer-events: none; z-index: 5;
        }
        .hap-card:hover .hap-frame {
          border-color: rgba(54,188,176,0.25);
        }

        /* Tag — top left */
        .hap-tag {
          position: absolute; top: 14px; left: 14px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--coral);
          background: rgba(10,22,40,0.78);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(54,188,176,0.32);
          padding: 5px 12px; z-index: 3;
        }

        /* Content overlay — bottom */
        .hap-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 22px 20px 20px; z-index: 3;
        }
        .hap-num {
          font-size: 10px; font-weight: 800; letter-spacing: 0.14em;
          color: rgba(54,188,176,0.50); margin-bottom: 6px;
        }
        .hap-title {
          font-size: 17px; font-weight: 900; color: #fff;
          letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 8px;
          transition: color 0.25s;
        }
        /* Tall cards get bigger title */
        .hap-c0 .hap-title,
        .hap-c3 .hap-title { font-size: 21px; }

        .hap-card:hover .hap-title { color: var(--coral); }

        .hap-desc {
          font-size: 12px; color: rgba(255,255,255,0.60);
          line-height: 1.75;
          /* Clamp desc on short cards */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.25s;
        }
        .hap-card:hover .hap-desc { color: rgba(255,255,255,0.78); }

        /* Explore arrow */
        .hap-arrow {
          display: inline-flex; align-items: center; gap: 5px;
          margin-top: 12px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(54,188,176,0);
          transition: color 0.25s, gap 0.25s;
        }
        .hap-card:hover .hap-arrow { color: var(--coral); gap: 9px; }

        /* ── Footer ── */
        .hap-footer {
          margin-top: 48px;
          display: flex; align-items: center; justify-content: center;
          gap: 24px; flex-wrap: wrap;
        }
        .hap-rule {
          flex: 1; max-width: 280px; height: 1px;
        }
        .hap-rule:first-child {
          background: linear-gradient(90deg, transparent, rgba(54,188,176,0.20));
        }
        .hap-rule:last-child {
          background: linear-gradient(90deg, rgba(54,188,176,0.20), transparent);
        }
        .hap-venue {
          font-size: 13px; color: var(--text-body);
          text-align: center; line-height: 1.7;
        }
        .hap-venue strong { color: #fff; font-weight: 700; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hap-bento {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 260px 260px;
          }
          .hap-c0 { grid-column: 1; grid-row: 1; }
          .hap-c1 { grid-column: 2; grid-row: 1; }
          .hap-c2 { grid-column: 1; grid-row: 2; }
          .hap-c3 { grid-column: 2; grid-row: 2; }
        }
        @media (max-width: 600px) {
          .hap-section { padding: 40px 20px 72px; }
          .hap-bento {
            grid-template-columns: 1fr;
            grid-template-rows: 280px 280px 280px 280px;
          }
          .hap-c0,
          .hap-c1,
          .hap-c2,
          .hap-c3 { grid-column: 1; }
          .hap-c0 { grid-row: 1; }
          .hap-c1 { grid-row: 2; }
          .hap-c2 { grid-row: 3; }
          .hap-c3 { grid-row: 4; }
        }
      `}</style>

      <section className="hap-section" ref={sectionRef}>
        <div className="hap-orb-1" />
        <div className="hap-orb-2" />

        <div className="hap-inner">

          {/* Header */}
          <div className="hap-header">
            <div>
              <div className="hap-overline">Happenings</div>
              <h2 className="hap-h2">
                Not Just Talks.<br /><em>Built for Impact.</em>
              </h2>
              <p className="hap-sub">
                One full day designed to move you — from the opening keynote to the final handshake. Every format is engineered to deliver insight you can act on, connections that actually matter, and a front-row view of where CX is heading next.
              </p>
              <p className="hap-sub-detail">
                Whether you&apos;re here to <strong>benchmark your CX strategy</strong>, discover the technologies redefining customer experience, or build relationships with the leaders shaping it — this is where it happens. No filler. No generic panels. Just real conversations, real decisions, and real impact.
              </p>
            </div>
          </div>

          {/* Bento */}
          <div className="hap-bento">
            {items.map((item, i) => (
              <div
                key={item.title}
                className={`hap-card hap-c${i}${visible ? " vis" : ""}`}
                style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.title} className="hap-img" />
                <div className="hap-overlay" />
                <div className="hap-bar" />
                <div className="hap-frame" />
                <div className="hap-tag">{item.tag}</div>
                <div className="hap-content">
                  <div className="hap-num">{item.num}</div>
                  <div className="hap-title">{item.title}</div>
                  <div className="hap-desc">{item.desc}</div>
                  <div className="hap-arrow">
                    Explore
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="hap-footer">
            <div className="hap-rule" />
            <div className="hap-venue">
              <strong>4 June 2026 &middot; Bengaluru, India</strong><br />
              400+ attendees &nbsp;&middot;&nbsp; 1 full day &nbsp;&middot;&nbsp; Unlimited connections
            </div>
            <div className="hap-rule" />
          </div>

        </div>
      </section>
    </>
  );
}
