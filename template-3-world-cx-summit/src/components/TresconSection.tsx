"use client";

export default function TresconSection() {
  return (
    <>
      <style>{`
        .trc-banner {
          background: linear-gradient(100deg, #0A1628 0%, #0F3A36 50%, #0A2040 100%);
          border-top: none;
          border-bottom: none;
          position: relative;
          overflow: hidden;
        }

        /* ghost logo behind */
        .trc-ghost {
          position: absolute;
          right: -60px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none; z-index: 0;
        }
        .trc-ghost img {
          height: 200px; width: auto;
          filter: brightness(0) invert(1);
          opacity: 0.10;
          user-select: none;
        }

        .trc-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 28px 40px;
          display: flex;
          align-items: center;
          gap: 32px;
          position: relative; z-index: 2;
        }

        /* Left divider label */
        /* Logo + label stacked */
        .trc-logo-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          flex-shrink: 0;
        }
        .trc-managed {
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(255,255,255,0.60);
          white-space: nowrap;
        }
        .trc-divider {
          width: 1px; height: 80px;
          background: rgba(255,255,255,0.25);
          flex-shrink: 0;
        }

        /* Logo */
        .trc-logo {
          height: 77px; width: auto;
          object-fit: contain;
        }

        /* Text */
        .trc-text {
          flex: 1;
          font-size: 12.5px;
          color: rgba(255,255,255,0.82);
          line-height: 1.65;
        }

        /* CTA */
        .trc-cta {
          display: inline-flex; align-items: center; gap: 7px;
          flex-shrink: 0;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #fff;
          background: rgba(0,0,0,0.20);
          border: 1px solid rgba(255,255,255,0.40);
          padding: 9px 20px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.25s, border-color 0.25s;
        }
        .trc-cta:hover {
          background: rgba(0,0,0,0.35);
          border-color: rgba(255,255,255,0.70);
        }

        @media (max-width: 860px) {
          .trc-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 28px 24px;
          }
          .trc-divider { display: none; }
          .trc-managed { margin-bottom: 0; }
        }
        @media (max-width: 480px) {
          .trc-inner { padding: 24px 20px; gap: 14px; }
          .trc-cta { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="trc-banner">
        <div className="trc-ghost">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trescon-logo.png" alt="" aria-hidden="true" />
        </div>

        <div className="trc-inner">
          <div className="trc-logo-block">
            <div className="trc-managed">Event Managed By</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/trescon-logo.png" alt="Trescon" className="trc-logo" />
          </div>
          <div className="trc-divider" />
          <div className="trc-text">
            Trescon is a global business events and consulting firm that provides a wide range of business services to a diversified client base. With a deep understanding of the realities and requirements of the growth markets we operate in — we strive to deliver innovative and high quality business platforms for our clients.
          </div>
          <a
            href="https://www.tresconglobal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="trc-cta"
          >
            Visit Trescon Global
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
