"use client";
import Link from "next/link";
import Image from "next/image";

const brands = [
  { name: "Komainu",           src: "/sp-logo-0.webp",  w: 140 },
  { name: "Mastercard",        src: "/sp-logo-1.webp",  w:  72 },
  { name: "Montran",           src: "/sp-logo-2.webp",  w: 130 },
  { name: "Network",           src: "/sp-logo-3.webp",  w: 130 },
  { name: "Pay10",             src: "/sp-logo-4.webp",  w: 100 },
  { name: "Dubai Islamic Bank",src: "/sp-logo-5.webp",  w: 130 },
  { name: "Digit9",            src: "/sp-logo-6.webp",  w: 110 },
  { name: "Finvasia",          src: "/sp-logo-7.webp",  w: 120 },
  { name: "Infosys Finacle",   src: "/sp-logo-8.webp",  w: 120 },
  { name: "InvestSuite",       src: "/sp-logo-9.webp",  w: 130 },
  { name: "TerraPay",          src: "/sp-logo-10.webp", w: 120 },
  { name: "Visa",              src: "/sp-logo-11.webp", w:  80 },
  { name: "Payomatix",         src: "/sp-logo-12.webp", w: 130 },
  { name: "Perfios",           src: "/sp-logo-13.webp", w: 110 },
  { name: "Ripple",            src: "/sp-logo-14.webp", w: 100 },
  { name: "SC Ventures",       src: "/sp-logo-15.webp", w: 140 },
  { name: "Sumsub",            src: "/sp-logo-16.webp", w: 120 },
];

const track = [...brands, ...brands, ...brands];

export default function SponsorsSection() {
  return (
    <>
      <style>{`
        .sp-root {
          background: #f8f9fa;
          padding: 72px 0 80px;
          position: relative;
          overflow: hidden;
        }

        /* ── Header ── */
        .sp-head {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 48px;
          padding: 0 24px;
        }
        .sp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00a5a3;
          margin-bottom: 14px;
        }
        .sp-eyebrow-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #00a5a3;
          flex-shrink: 0;
        }
        .sp-title {
          font-size: clamp(22px, 2.4vw, 30px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #0f1923;
          margin-bottom: 10px;
        }
        .sp-title span { color: #00a5a3; }
        .sp-sub {
          font-size: 14px;
          color: #6b7a8d;
          line-height: 1.7;
        }

        /* ── Marquee strip ── */
        .sp-marquee-wrap {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border-top: 1px solid #e8ecf0;
          border-bottom: 1px solid #e8ecf0;
        }

        .sp-shelf {
          display: flex;
          align-items: center;
          width: max-content;
          animation: sp-scroll 38s linear infinite;
        }
        .sp-shelf:hover { animation-play-state: paused; }

        @keyframes sp-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }

        .sp-logo-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 44px;
          height: 160px;
          border-right: 1px solid #f0f2f4;
          flex-shrink: 0;
          transition: background 0.25s;
        }
        .sp-logo-cell:hover { background: #f8fafc; }

        .sp-logo-img {
          display: block;
          height: 120px;
          width: 240px;
          object-fit: contain;
          filter: saturate(1.4) contrast(1.15);
          opacity: 1;
          transition: filter 0.3s;
        }
        .sp-logo-cell:hover .sp-logo-img {
          filter: saturate(1.6) contrast(1.2);
        }

        /* ── Bottom row ── */
        .sp-bottom {
          max-width: 1160px;
          margin: 36px auto 0;
          padding: 0 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .sp-count {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b0bac5;
        }
        .sp-cta-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .sp-cta-label {
          font-size: 13px;
          color: #6b7a8d;
        }
        .sp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(0,165,163,0.5);
          color: #00a5a3;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 24px;
          border-radius: 4px;
          background: transparent;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .sp-cta-btn:hover {
          background: #00a5a3;
          border-color: #00a5a3;
          color: #fff;
        }

        @media (max-width: 640px) {
          .sp-root { padding: 56px 0 64px; }
          .sp-marquee-wrap::before,
          .sp-marquee-wrap::after { width: 48px; }
          .sp-logo-cell { padding: 0 28px; height: 80px; }
          .sp-bottom { padding: 0 24px; flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="sp-root">

        <div className="sp-head">
          <div className="sp-eyebrow">
            <span className="sp-eyebrow-dot" />
            Partners & Sponsors
          </div>
          <h2 className="sp-title">
            Finance Brands We&apos;ve <span>Partnered With</span>
          </h2>
          <p className="sp-sub">
            Global institutions and fintech innovators powering the Finance 2045 ecosystem.
          </p>
        </div>

        <div className="sp-marquee-wrap">
          <div className="sp-shelf">
            {track.map((b, i) => (
              <div key={i} className="sp-logo-cell" title={b.name}>
                <Image
                  src={b.src}
                  alt={b.name}
                  width={240}
                  height={120}
                  quality={90}
                  className="sp-logo-img"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sp-bottom">
          <span className="sp-count">17 Official Partners & Sponsors</span>
          <div className="sp-cta-wrap">
            <span className="sp-cta-label">Interested in sponsoring Finance 2045?</span>
            <Link href="/enquire" className="sp-cta-btn">
              Partner With Us
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

      </section>
    </>
  );
}
