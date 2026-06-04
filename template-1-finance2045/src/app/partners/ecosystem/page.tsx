import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Partner Ecosystem | Finance 2045 Jakarta 2026",
  description: "Explore the full strategic partner ecosystem powering Finance 2045 and the World AI Show Indonesia — sponsors, exhibitors, technology partners, and association allies.",
};

const CATEGORIES = [
  {
    label: "Lead Sponsor",
    tier: "lead",
    partners: [
      { name: "Datadog", logo: "/ecosystem-logos/datadog.png" },
    ],
  },
  {
    label: "Gold Sponsors",
    tier: "gold",
    partners: [
      { name: "Zoom", logo: "/ecosystem-logos/zoom.png" },
      { name: "UCloud Global", logo: "/ecosystem-logos/ucloud.png" },
    ],
  },
  {
    label: "Silver Sponsor",
    tier: "silver",
    partners: [
      { name: "Data Labs", logo: "/ecosystem-logos/datalabs.svg" },
    ],
  },
  {
    label: "Exhibitors",
    tier: "exhibitor",
    partners: [
      { name: "Fanruan", logo: "/ecosystem-logos/fanruan.png" },
      { name: "Ingram Micro", logo: "/ecosystem-logos/ingram.png" },
      { name: "Kuventa", logo: "/ecosystem-logos/uventa.png" },
      { name: "Infraloka", logo: "/ecosystem-logos/infraloka.png" },
      { name: "Mekari", logo: "/ecosystem-logos/mekari.png" },
      { name: "Xtremax", logo: "/ecosystem-logos/xtremax.png" },
      { name: "Primary Guard", logo: "/ecosystem-logos/primary-guard.png" },
      { name: "IPINFRA IoT", logo: "/ecosystem-logos/ipinfra.svg" },
    ],
  },
  {
    label: "Technology Partner",
    tier: "tech",
    partners: [
      { name: "KonfHub", logo: "/ecosystem-logos/konfhub.png" },
    ],
  },
  {
    label: "Association Partner",
    tier: "assoc",
    partners: [
      { name: "Starfindo", logo: "/ecosystem-logos/starfindo.png" },
    ],
  },
];

export default function EcosystemPage() {
  return (
    <>
      <style>{`
        .eco-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }
        .eco-hero {
          padding: 80px 40px 64px; text-align: center;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(0,165,163,0.06) 0%, transparent 100%);
        }
        .eco-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 18px;
        }
        .eco-hero h1 {
          font-size: clamp(32px, 4.5vw, 54px); font-weight: 900;
          letter-spacing: -0.03em; color: #fff; margin-bottom: 18px; line-height: 1.08;
        }
        .eco-hero h1 span { color: var(--gold); }
        .eco-hero p {
          font-size: clamp(14px, 1.4vw, 16px); color: var(--text-body);
          max-width: 580px; margin: 0 auto; line-height: 1.75;
        }

        .eco-body { max-width: 1100px; margin: 0 auto; padding: 72px 40px 100px; }

        .eco-section { margin-bottom: 72px; }
        .eco-section:last-child { margin-bottom: 0; }

        .eco-section-label {
          font-size: 10px; font-weight: 800; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--teal);
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 28px;
        }
        .eco-section-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--border), transparent);
        }

        /* ── Logo grids by tier ── */
        .eco-logos {
          display: grid; gap: 16px;
        }
        /* Lead: 1 big centred card */
        .eco-logos-lead { grid-template-columns: repeat(1, minmax(0,380px)); }
        /* Gold / Silver / Tech / Assoc: up to 3 across */
        .eco-logos-gold,
        .eco-logos-silver,
        .eco-logos-tech,
        .eco-logos-assoc { grid-template-columns: repeat(3, 1fr); }
        /* Exhibitors: 4 across */
        .eco-logos-exhibitor { grid-template-columns: repeat(4, 1fr); }

        .eco-logo-card {
          background: #ffffff;
          border-radius: 4px;
          padding: 28px 36px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
          min-height: 110px;
        }
        .eco-logos-lead .eco-logo-card { min-height: 140px; padding: 36px 64px; }
        .eco-logo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.30);
        }
        .eco-logo-card img {
          width: 100%; height: auto;
          max-height: 64px;
          object-fit: contain;
        }
        .eco-logos-lead .eco-logo-card img { max-height: 80px; }

        .eco-wais-note {
          margin-top: 64px; padding: 28px 32px;
          border: 1px solid rgba(0,165,163,0.20);
          background: rgba(0,165,163,0.04);
          display: flex; align-items: flex-start; gap: 16px;
        }
        .eco-wais-note-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--teal); flex-shrink: 0; margin-top: 6px;
        }
        .eco-wais-note p {
          font-size: 13px; color: var(--text-body); line-height: 1.72; margin: 0;
        }
        .eco-wais-note strong { color: #fff; }

        @media (max-width: 900px) {
          .eco-logos-exhibitor { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .eco-body { padding: 48px 20px 80px; }
          .eco-hero { padding: 52px 24px 48px; }
          .eco-logos-lead,
          .eco-logos-gold,
          .eco-logos-silver,
          .eco-logos-tech,
          .eco-logos-assoc { grid-template-columns: repeat(2, 1fr); }
          .eco-logos-exhibitor { grid-template-columns: repeat(2, 1fr); }
          .eco-logo-card { padding: 20px 24px; min-height: 90px; }
          .eco-logos-lead .eco-logo-card { padding: 24px 32px; min-height: 110px; }
        }
      `}</style>

      <div className="eco-page">
        <div className="eco-hero">
          <div className="eco-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
            Strategic Ecosystem
          </div>
          <h1>Our <span>Full Partner Ecosystem</span></h1>
          <p>The global brands, technology innovators, and industry associations co-powering Finance 2045 and the World AI Show Indonesia in Jakarta.</p>
        </div>

        <div className="eco-body">
          {CATEGORIES.map((cat) => (
            <div key={cat.label} className="eco-section">
              <div className="eco-section-label">{cat.label}</div>
              <div className={`eco-logos eco-logos-${cat.tier}`}>
                {cat.partners.map((p) => (
                  <div key={p.name} className="eco-logo-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt={p.name} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="eco-wais-note">
            <div className="eco-wais-note-dot" />
            <p>
              <strong>Finance 2045 is co-located with the World AI Show Indonesia.</strong> Partners listed above span both events and represent the full cross-industry coalition driving Southeast Asia&apos;s digital transformation agenda in July 2026.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
