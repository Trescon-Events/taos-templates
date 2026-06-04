"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const stats = [
  { num: "20,000+", label: "Business Leaders" },
  { num: "3,000+",  label: "Investors" },
  { num: "1,000+",  label: "Speakers" },
  { num: "400+",    label: "Exhibitors" },
  { num: "120+",    label: "Countries" },
];

export default function TresconSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("tr-visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .tr-root {
          position: relative;
          height: 560px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }

        /* ── Background photo ── */
        .tr-bg-img {
          position: absolute;
          inset: 0;
          object-fit: cover;
          object-position: center 15%;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        /* Overlay: black top (hides sign) + dark bottom (text legibility) */
        .tr-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(to bottom,
              rgba(10,14,22,1.00) 0%,
              rgba(10,14,22,0.85) 20%,
              rgba(10,14,22,0.40) 42%,
              rgba(10,14,22,0.55) 60%,
              rgba(10,14,22,0.92) 100%
            );
        }

        /* ── Content ── */
        .tr-content {
          position: relative;
          z-index: 2;
          max-width: 1160px;
          margin: 0 auto;
          width: 100%;
          padding: 0 48px 72px;
        }

        /* Caption at top */
        .tr-caption {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 48px;
          padding: 7px 16px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(8px);
          border-radius: 100px;
        }
        .tr-caption-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #00a5a3;
          flex-shrink: 0;
        }
        .tr-caption-text {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }

        /* Bottom grid: text left, stats right */
        .tr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: end;
        }

        /* Entrance animations */
        .tr-left {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .tr-right {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
        }
        .tr-caption-wrap {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .tr-visible .tr-left,
        .tr-visible .tr-right,
        .tr-visible .tr-caption-wrap { opacity: 1; transform: translateY(0); }

        .tr-h2 {
          font-size: clamp(30px, 3.5vw, 48px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.08;
          margin-bottom: 20px;
          text-shadow: 0 2px 24px rgba(0,0,0,0.6);
        }
        .tr-h2 span { color: #00a5a3; }

        .tr-body {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.85;
          margin-bottom: 12px;
          max-width: 480px;
        }
        .tr-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #00a5a3;
          margin-top: 24px;
          transition: gap 0.2s;
        }
        .tr-link:hover { gap: 10px; }

        /* Stats */
        .tr-stats-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #00a5a3;
          margin-bottom: 20px;
        }
        .tr-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          background: rgba(10,14,22,0.4);
        }
        .tr-stat {
          padding: 20px 18px;
          border-right: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .tr-stat:nth-child(3n) { border-right: none; }
        .tr-stat:nth-child(4),
        .tr-stat:nth-child(5) { border-bottom: none; }
        .tr-stat-num {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #E9C268;
          line-height: 1;
          margin-bottom: 5px;
        }
        .tr-stat-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        @media (max-width: 900px) {
          .tr-root { height: auto; min-height: 500px; }
          .tr-content { padding: 0 24px 56px; }
          .tr-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 640px) {
          .tr-root { min-height: 480px; }
          .tr-stats { grid-template-columns: 1fr 1fr; }
          .tr-stat:nth-child(2n) { border-right: none; }
          .tr-stat:nth-child(3n) { border-right: 1px solid rgba(255,255,255,0.08); }
          .tr-stat:last-child { border-right: none; border-bottom: none; }
        }
      `}</style>

      <section className="tr-root" ref={ref}>

        {/* Full-screen background photo */}
        <Image
          src="/event-by-trescon.webp"
          alt="Trescon Team — Dubai Fintech Summit"
          fill
          className="tr-bg-img"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          sizes="100vw"
          quality={90}
          priority={false}
        />

        {/* Gradient overlay */}
        <div className="tr-overlay" />

        {/* Content sits at the bottom over the photo */}
        <div className="tr-content">

          <div className="tr-grid">
            <div className="tr-left">
              <div className="f45-eyebrow">
                <span className="f45-eyebrow-dot" />
                About the Organiser
              </div>
              <h2 className="tr-h2">An Event By <span>Trescon</span></h2>
              <p className="tr-body">
                With over 60 years of collective expertise, Trescon stands as a premier architect of global financial technology ecosystems — the strategic force behind the Dubai Fintech Summit and a series of high-impact fintech forums worldwide.
              </p>
              <p className="tr-body">
                We bridge traditional finance and future-forward innovation, curating elite platforms where central bank governors, regulators, and entrepreneurs converge to redefine the global economy.
              </p>
              <a
                href="https://www.trescongroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="tr-link"
              >
                Explore Our Legacy
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            <div className="tr-right">
              <div className="tr-stats-label">Trescon&apos;s Global Ecosystem</div>
              <div className="tr-stats">
                {stats.map((s) => (
                  <div key={s.label} className="tr-stat">
                    <div className="tr-stat-num">{s.num}</div>
                    <div className="tr-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
