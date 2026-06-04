"use client";
import Image from "next/image";
import Link from "next/link";
import { speakers } from "@/data/speakers";

const looped = [...speakers, ...speakers, ...speakers];

export default function SpeakersSection() {
  return (
    <>
      <style>{`
        .spk-root {
          background: var(--bg-primary);
          padding: 96px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .spk-root::before {
          content: '';
          position: absolute;
          bottom: -120px; left: -120px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,165,163,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .spk-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Carousel ── */
        .spk-carousel-wrap {
          overflow: hidden;
          margin: 0 -40px;
          padding: 16px 0 24px;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        @keyframes spk-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }

        .spk-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: spk-scroll 44s linear infinite;
        }
        .spk-carousel-wrap:hover .spk-track {
          animation-play-state: paused;
        }

        /* ── Card — static, no flip ── */
        .spk-card {
          width: 240px;
          flex-shrink: 0;
          position: relative;
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          cursor: default;
          transition:
            border-color 0.3s,
            box-shadow 0.3s,
            transform 0.3s;
        }
        .spk-card:hover {
          border-color: rgba(0,165,163,0.5);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15);
          transform: translateY(-4px);
        }

        /* Photo */
        .spk-card-img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--bg-card);
        }
        .spk-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.5s ease;
        }
        .spk-card:hover .spk-card-img { transform: scale(1.04); }
        .spk-card-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(
            to top,
            rgba(10,15,24,1) 0%,
            rgba(10,15,24,0.85) 35%,
            rgba(10,15,24,0.4) 60%,
            transparent 100%
          );
          padding: 40px 14px 14px;
        }
        .spk-card-name {
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }
        .spk-card-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--teal);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1.4;
          margin-bottom: 2px;
        }
        .spk-card-company {
          font-size: 12px;
          color: rgba(255,255,255,0.65);
          line-height: 1.3;
        }

        /* Teal accent bar at bottom of card */
        .spk-card-bar {
          height: 2px;
          background: linear-gradient(90deg, var(--teal), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .spk-card:hover .spk-card-bar { opacity: 1; }

        .spk-cta { text-align: center; margin-top: 44px; }

        @media (max-width: 768px) {
          .spk-card { width: 200px; }
          .spk-inner { padding: 0 20px; }
          .spk-carousel-wrap { margin: 0 -20px; }
          .spk-root { padding: 64px 0 56px; }
        }
      `}</style>

      <section className="spk-root">
        <div className="spk-inner">
          <div className="f45-section-head">
            <div className="f45-eyebrow">
              <span className="f45-eyebrow-dot" />
              Speakers
            </div>
            <h2>World-Class <span>Financial Leaders</span></h2>
            <p>CFOs, regulators, central bankers, and fintech founders shaping the future of finance in Indonesia and across the region.</p>
          </div>
        </div>

        <div className="spk-carousel-wrap">
          <div className="spk-track">
            {looped.map((spk, i) => (
              <div key={i} className="spk-card">
                <div className="spk-card-img-wrap">
                  <Image
                    src={spk.image}
                    alt={spk.name}
                    width={400}
                    height={533}
                    quality={90}
                    className="spk-card-img"
                  />
                  <div className="spk-card-overlay">
                    <div className="spk-card-name">{spk.name}</div>
                    <div className="spk-card-title">{spk.title}</div>
                    <div className="spk-card-company">{spk.company}</div>
                  </div>
                </div>
                <div className="spk-card-bar" />
              </div>
            ))}
          </div>
        </div>

        <div className="spk-inner">
          <div className="spk-cta">
            <Link href="/speakers" className="f45-btn-outline">View All Speakers</Link>
          </div>
        </div>
      </section>
    </>
  );
}
