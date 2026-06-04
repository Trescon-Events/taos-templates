"use client";
import Image from "next/image";
import Link from "next/link";


export default function FWCSection() {
  return (
    <>
      <style>{`
        .fwc-root {
          background: var(--bg-primary);
          padding: 96px 0 88px;
          position: relative;
          overflow: hidden;
        }
        .fwc-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.35), transparent);
        }
        /* Faint radial bg */
        .fwc-root::after {
          content: '';
          position: absolute; bottom: -160px; right: -160px;
          width: 560px; height: 560px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,165,163,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .fwc-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
          position: relative; z-index: 1;
        }

        /* ── LEFT: collage image ── */
        .fwc-collage {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(0,165,163,0.2);
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .fwc-collage:hover {
          border-color: rgba(0,165,163,0.5);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 10px 36px rgba(0,0,0,0.45);
        }
        .fwc-collage img {
          width: 100%; height: auto;
          display: block;
        }
        .fwc-collage::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, #00a5a3, rgba(0,165,163,0.15));
          z-index: 2;
        }

        /* ── RIGHT: content ── */
        .fwc-content {}

        .fwc-heading {
          font-size: clamp(30px, 3.6vw, 46px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: #fff;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        /* "Indonesia Qualifiers" pill */
        .fwc-pill {
          display: inline-flex;
          align-items: center;
          background: #00a5a3;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 7px 18px;
          border-radius: 100px;
          margin-bottom: 22px;
        }

        /* Organised by strip */
        .fwc-org {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .fwc-org-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          flex-shrink: 0;
        }
        .fwc-org-trescon {
          height: 40px;
          width: auto;
          object-fit: contain;
          background: transparent;
          padding: 5px 10px;
          border-radius: 6px;
        }
        .fwc-org-divider {
          width: 1px; height: 20px;
          background: rgba(255,255,255,0.15);
          flex-shrink: 0;
        }
        .fwc-org-ignyte {
          height: 14px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.7;
        }

        .fwc-divider {
          height: 1px;
          background: linear-gradient(to right, rgba(0,165,163,0.3), transparent);
          margin-bottom: 22px;
        }

        .fwc-road {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }
        .fwc-sub {
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--gold);
          margin-bottom: 16px;
        }
        .fwc-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.58);
          line-height: 1.82;
          margin-bottom: 28px;
        }

        .fwc-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #00a5a3;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 12px 24px;
          border-radius: 8px;
          transition: background 0.2s, transform 0.15s;
        }
        .fwc-cta:hover {
          background: #00bfbd;
          transform: translateY(-1px);
        }

        @media (max-width: 960px) {
          .fwc-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .fwc-content { order: -1; }
        }
        @media (max-width: 640px) {
          .fwc-root { padding: 64px 0 56px; }
          .fwc-inner { padding: 0 24px; }
        }
      `}</style>

      <section className="fwc-root">
        <div className="fwc-inner">

          {/* LEFT — exact collage image from finance2045.com */}
          <div className="fwc-collage gc">
            <Image
              src="/fwc-qualifiers.webp"
              alt="FinTech World Cup — previous edition highlights"
              width={600}
              height={500}
              quality={90}
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* RIGHT — content */}
          <div className="fwc-content">
            <div className="fwc-heading">FinTech<br />World Cup</div>

            <div className="fwc-pill">Indonesia Qualifiers</div>

            <div className="fwc-org">
              <span className="fwc-org-label">Organised by</span>
              <Image
                src="/logo-trescon.png"
                alt="Trescon"
                width={200}
                height={60}
                className="fwc-org-trescon"
              />
              <div className="fwc-org-divider" />
              <span className="fwc-org-label">Powered by</span>
              <Image
                src="/logo-ignyte.svg"
                alt="Ignyte"
                width={80}
                height={16}
                className="fwc-org-ignyte"
              />
            </div>

            <div className="fwc-divider" />

            <div className="fwc-road">The Road to</div>
            <div className="fwc-sub">Dubai FinTech Summit 2026</div>

            <p className="fwc-desc">
              Finance 2045 is proud to host the FinTech World Cup 2026 Indonesia Qualifiers in Jakarta. The region&apos;s most disruptive startups will pitch live to global venture partners, competing for international funding, mentorship, and a spot in the grand finale at the Dubai FinTech Summit.
            </p>

            <Link href="/fintech-worldcup/apply" className="fwc-cta">
              Apply Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
