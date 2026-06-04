"use client";

// 22 attendee company logos
const LOGOS = [
  1,2,3,4,5,6,7,8,9,10,11,13,15,16,17,18,19,20,21,22
].map(n => `/attendee-logos/${n}.png`);

// Duplicate for seamless infinite scroll
const ITEMS = [...LOGOS, ...LOGOS];

export default function AnnouncementsMarquee() {
  return (
    <>
      <style>{`
        /* ── Outer wrapper ── */
        .att-wrap {
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          overflow: hidden;
          position: relative;
          height: 72px;
          display: flex;
          align-items: stretch;
        }

        /* ── Left edge fade-out over the white bg ── */
        .att-wrap::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(to left, #ffffff, transparent);
          z-index: 2;
          pointer-events: none;
        }

        /* ── Label pill ── */
        .att-label-bar {
          position: relative;
          z-index: 3;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 28px 0 32px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          white-space: nowrap;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00A5A3;
          min-width: 0;
        }

        /* ── Pulsing dot ── */
        .att-label-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00A5A3;
          flex-shrink: 0;
          animation: att-pulse 1.8s ease-in-out infinite;
        }
        @keyframes att-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        /* ── Scrolling track ── */
        .att-track-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
        }
        /* left fade */
        .att-track-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 40px;
          background: linear-gradient(to right, #ffffff, transparent);
          z-index: 2;
          pointer-events: none;
        }

        .att-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          height: 72px;
          animation: att-scroll 60s linear infinite;
        }
        .att-track:hover { animation-play-state: paused; }

        @keyframes att-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .att-track { animation: none; }
        }

        /* ── Individual logo cell ── */
        .att-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 72px;
          padding: 0 40px;
          border-right: 1px solid #e5e7eb;
          flex-shrink: 0;
        }

        .att-logo {
          max-height: 65px;
          width: auto;
          max-width: 160px;
          object-fit: contain;
          display: block;
          filter: none;
          transition: opacity 0.2s;
        }
        .att-track:hover .att-logo {
          opacity: 0.85;
        }

        /* ── Mobile: slightly smaller logos ── */
        @media (max-width: 640px) {
          .att-label-bar { padding: 0 18px 0 20px; font-size: 9px; }
          .att-logo { max-height: 48px; max-width: 110px; }
          .att-item { padding: 0 28px; }
        }
      `}</style>

      <div className="att-wrap">

        {/* LEFT: ATTENDEE SPOTLIGHT label */}
        <div className="att-label-bar">
          <span className="att-label-dot" />
          Attendee Spotlight
        </div>

        {/* SCROLLING LOGOS */}
        <div className="att-track-wrap">
          <div className="att-track">
            {ITEMS.map((src, i) => (
              <div key={i} className="att-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Attending company"
                  className="att-logo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
