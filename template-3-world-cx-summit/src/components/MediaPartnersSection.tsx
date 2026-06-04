"use client";

const mediaPartners = [
  { name: "Silicon India",      img: "/media-partners/silicon-india.webp"    },
  { name: "Analytics Insight",  img: "/media-partners/analytics-insight.png" },
  { name: "CIO Tech Outlook",   img: "/media-partners/cio-tech.webp"         },
  { name: "Startup News",       img: "/media-partners/startupnews.png"       },
  { name: "CIO Tech World",     img: "/media-partners/ciotechworld.webp"     },
  { name: "CIO World Media",    img: "/media-partners/cio-world-media.png"   },
  { name: "Insights Success",   img: "/media-partners/insights-success.png"  },
  { name: "CIO Look",           img: "/media-partners/cio-look.webp"         },
  { name: "The Magnate Media",  img: "/media-partners/magnate-media.png"     },
  { name: "CIO Prime",          img: "/media-partners/cio-prime.png"         },
  { name: "The Women Globe",    img: "/media-partners/the-women-globe.png"   },
  { name: "The Prime Today",    img: "/media-partners/the-prime-today.png"   },
  { name: "The Dubai Icons",    img: "/media-partners/the-dubai-icons.png"   },
  { name: "Zex PR Wire",        img: "/media-partners/zex.webp"              },
  { name: "The African Icons",  img: "/media-partners/the-african-icons.png" },
  { name: "Healthcare Elites",  img: "/media-partners/healthcare-elites.png" },
  { name: "News Karnataka",     img: "/media-partners/news-karnataka.png"    },
  { name: "ACN Newswire",       img: "/media-partners/Acnnewswire.webp"      },
];

const sponsors = [
  { name: "Tata Communications", img: "/sponsors/tata-communications.png", tier: "Gold Partner"         },
  { name: "Tata Tele Services",  img: "/sponsors/tata-teleservice.png",    tier: "Silver Partner"       },
  { name: "HyperFace",           img: "/sponsors/hyperface.png",           tier: "Lanyard Partner"      },
  { name: "SurveySensum",        img: "/sponsors/SurveySensum.png",        tier: "Bronze Partner"       },
  { name: "ICCS",                img: "/sponsors/iccs.png",                tier: "Exhibitor"            },
  { name: "LimeChat",            img: "/sponsors/lime-chat.png",           tier: "Exhibitor"            },
  { name: "KonfHub",             img: "/sponsors/konfhub.png",             tier: "Event Tech Partner"   },
  { name: "Business Standard",   img: "/sponsors/business-standard.png",   tier: "Print Media Partner"  },
];

// Triple for seamless loop
const loopedMedia = [...mediaPartners, ...mediaPartners, ...mediaPartners];
const loopedSponsors = [...sponsors, ...sponsors, ...sponsors];

export default function MediaPartnersSection() {
  return (
    <>
      <style>{`
        .mp-section {
          background: var(--bg-surface);
          padding: 72px 0 80px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* subtle gradient backdrop */
        .mp-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(54,188,176,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .mp-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative; z-index: 2;
        }

        /* ── Section label ── */
        .mp-label-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .mp-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .mp-label-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.08), transparent);
        }

        /* ── Scroller ── */
        .mp-scroller {
          overflow: hidden;
          margin: 0 -40px;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
        }

        @keyframes mp-scroll-fwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes mp-scroll-rev {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }

        .mp-track {
          display: flex;
          gap: 12px;
          width: max-content;
          padding: 8px 0;
          animation: mp-scroll-fwd 40s linear infinite;
        }
        .mp-track.rev {
          animation: mp-scroll-rev 44s linear infinite;
        }
        .mp-scroller:hover .mp-track {
          animation-play-state: paused;
        }

        /* ── Logo tile ── */
        .mp-tile {
          flex-shrink: 0;
          width: 180px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 10px 16px;
          transition: box-shadow 0.3s, transform 0.3s;
          cursor: default;
        }
        .mp-tile:hover {
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
          transform: translateY(-2px);
        }
        .mp-tile img {
          max-width: 100%;
          max-height: 78px;
          width: auto;
          height: auto;
          object-fit: contain;
          opacity: 0.85;
          transition: opacity 0.3s;
        }
        .mp-tile:hover img {
          opacity: 1;
        }

        /* ── Sponsors row ── */
        .mp-sponsors-label-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 40px 0 28px;
        }
        .mp-spons-scroller {
          overflow: hidden;
          margin: 0 -40px;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
        }
        .mp-spons-track {
          display: flex;
          gap: 12px;
          width: max-content;
          padding: 8px 0;
          animation: mp-scroll-rev 36s linear infinite;
        }
        .mp-spons-scroller:hover .mp-spons-track {
          animation-play-state: paused;
        }

        /* Sponsor tile — slightly larger */
        .mp-spons-tile {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 200px;
          height: 110px;
          background: #ffffff;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 12px 20px;
          transition: box-shadow 0.3s, transform 0.3s;
          cursor: default;
        }
        .mp-spons-tile:hover {
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
          transform: translateY(-2px);
        }
        .mp-spons-tile img {
          max-width: 100%;
          max-height: 78px;
          width: auto;
          height: auto;
          object-fit: contain;
          opacity: 0.85;
          transition: opacity 0.3s;
        }
        .mp-spons-tile:hover img { opacity: 1; }
        .mp-spons-tier {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .mp-spons-tile:hover .mp-spons-tier { opacity: 1; }

        @media (max-width: 1024px) {
          .mp-inner { padding: 0 32px; }
          .mp-scroller { margin: 0 -32px; }
          .mp-spons-scroller { margin: 0 -32px; }
        }
        @media (max-width: 768px) {
          .mp-inner { padding: 0 20px; }
          .mp-scroller { margin: 0 -20px; }
          .mp-spons-scroller { margin: 0 -20px; }
          .mp-section { padding: 56px 0 64px; }
          .mp-tile { width: 150px; height: 70px; }
          .mp-spons-tile { width: 160px; height: 80px; }
        }
        @media (max-width: 480px) {
          .mp-section { padding: 44px 0 52px; }
          .mp-tile { width: 130px; height: 62px; }
          .mp-spons-tile { width: 140px; height: 72px; }
        }
      `}</style>

      <section className="mp-section">

        <div className="mp-inner">
          <div className="mp-label-row">
            <div className="mp-label">Sponsors &amp; Partners</div>
            <div className="mp-label-line" />
          </div>
        </div>

        {/* Sponsors scroller */}
        <div className="mp-spons-scroller">
          <div className="mp-spons-track">
            {loopedSponsors.map((s, i) => (
              <div key={i} className="mp-spons-tile" title={s.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.name} />
                <div className="mp-spons-tier">{s.tier}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mp-inner">
          <div className="mp-sponsors-label-row">
            <div className="mp-label">Media Partners</div>
            <div className="mp-label-line" />
          </div>
        </div>

        {/* Media partners scroller — reverse direction */}
        <div className="mp-scroller">
          <div className="mp-track rev">
            {loopedMedia.map((p, i) => (
              <div key={i} className="mp-tile" title={p.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.name} />
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}
