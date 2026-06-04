"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Entity {
  id: string;
  entity_name: string;
  image_url: string;
  website_url: string;
  category_name: string;
  category_order: number;
  entity_order: number;
}

interface ApiResponse {
  categorized: {
    category_id: string;
    category_name: string;
    category_order: number;
    entity: Entity[];
  }[];
  uncategorized: Entity[];
}

interface Props {
  sponsorData: ApiResponse;
  partnerData: ApiResponse;
}

function cleanCategory(name: string) {
  return name.includes(" || ") ? name.split(" || ").pop()! : name;
}

const F45 = "Finance 2045 ||";

export default function EcosystemClient({ sponsorData, partnerData }: Props) {
  const sponsorCategorized = sponsorData?.categorized ?? [];
  const partnerCategorized = partnerData?.categorized ?? [];

  // Only Finance 2045 tracks — filter by prefix, non-empty only
  const f45SponsorCats = sponsorCategorized
    .filter((cat) => cat.category_name.startsWith(F45) && cat.entity?.length > 0)
    .sort((a, b) => a.category_order - b.category_order);

  const f45MediaEntities = partnerCategorized
    .filter((cat) => cat.category_name.startsWith(F45) && cat.category_name.toLowerCase().includes("media") && cat.entity?.length > 0)
    .flatMap((cat) => cat.entity);

  const f45AssocEntities = partnerCategorized
    .filter((cat) => cat.category_name.startsWith(F45) && cat.category_name.toLowerCase().includes("association") && cat.entity?.length > 0)
    .flatMap((cat) => cat.entity);

  // Build tabs dynamically — only show if data exists
  type TabId = "sponsors" | "media" | "associations";
  const allTabs: { id: TabId; label: string; hasData: boolean }[] = [
    { id: "sponsors", label: "Sponsors", hasData: f45SponsorCats.length > 0 },
    { id: "media", label: "Media Partners", hasData: f45MediaEntities.length > 0 },
    { id: "associations", label: "Associations", hasData: f45AssocEntities.length > 0 },
  ];
  const visibleTabs = allTabs.filter((t) => t.hasData);

  const [activeTab, setActiveTab] = useState<TabId>(() => visibleTabs[0]?.id ?? "media");

  return (
    <>
      <style>{`
        .eco-page {
          padding-top: 72px;
          min-height: 100vh;
          background: var(--bg-primary);
        }

        /* ── Hero ── */
        .eco-hero {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 80px 40px 72px;
          position: relative;
          overflow: hidden;
        }
        .eco-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 70% 50%, rgba(0,165,163,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .eco-hero-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 2; }
        .eco-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 20px;
        }
        .eco-eyebrow::before { content: ''; width: 24px; height: 1.5px; background: var(--teal); }
        .eco-hero-h1 {
          font-size: clamp(32px, 5vw, 58px);
          font-weight: 900; letter-spacing: -0.03em; color: #fff;
          line-height: 1.05; margin-bottom: 20px; max-width: 720px;
        }
        .eco-hero-h1 span { color: var(--teal); }
        .eco-hero-sub {
          font-size: 16px; color: var(--text-body); line-height: 1.75;
          max-width: 580px; margin-bottom: 40px;
        }
        .eco-hero-stats {
          display: flex; gap: 40px; flex-wrap: wrap;
        }
        .eco-hero-stat-num {
          font-size: 28px; font-weight: 900; color: var(--gold); line-height: 1;
        }
        .eco-hero-stat-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--text-muted); margin-top: 5px;
        }

        /* ── Ticker ── */
        .eco-ticker {
          background: rgba(0,165,163,0.06);
          border-top: 1px solid rgba(0,165,163,0.18);
          border-bottom: 1px solid rgba(0,165,163,0.18);
          padding: 14px 0;
          overflow: hidden;
          position: relative;
        }
        .eco-ticker::before, .eco-ticker::after {
          content: '';
          position: absolute; top: 0; bottom: 0;
          width: 80px; z-index: 2;
          pointer-events: none;
        }
        .eco-ticker::before { left: 0; background: linear-gradient(to right, var(--bg-surface), transparent); }
        .eco-ticker::after { right: 0; background: linear-gradient(to left, var(--bg-surface), transparent); }
        .eco-ticker-label {
          position: absolute; left: 20px; top: 50%; transform: translateY(-50%);
          font-size: 9px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--teal); z-index: 3;
          background: var(--bg-surface);
          padding-right: 12px;
        }
        .eco-ticker-track {
          display: flex; gap: 48px;
          animation: ticker-scroll 40s linear infinite;
          width: max-content;
        }
        .eco-ticker-track:hover { animation-play-state: paused; }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .eco-ticker-item {
          font-size: 11px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: rgba(255,255,255,0.50);
          white-space: nowrap; flex-shrink: 0;
        }
        .eco-ticker-item::before {
          content: '·'; margin-right: 48px; color: rgba(0,165,163,0.40);
        }

        /* ── Tab bar ── */
        .eco-tabs-wrap {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-dark);
          position: sticky; top: 72px; z-index: 100;
        }
        .eco-tabs {
          max-width: 1240px; margin: 0 auto; padding: 0 40px;
          display: flex; gap: 0; overflow-x: auto; scrollbar-width: none;
        }
        .eco-tabs::-webkit-scrollbar { display: none; }
        .eco-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 18px 28px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: var(--text-muted);
          border: none; background: none; cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .eco-tab:hover { color: rgba(255,255,255,0.85); }
        .eco-tab.active { color: var(--teal); border-bottom-color: var(--teal); }

        /* ── Content ── */
        .eco-content {
          max-width: 1240px; margin: 0 auto; padding: 64px 40px 80px;
        }

        /* ── Sponsor tier ── */
        .eco-tier { margin-bottom: 56px; }
        .eco-tier-label {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--teal);
          margin-bottom: 24px;
        }
        .eco-tier-label::after { content: ''; flex: 1; height: 1px; background: rgba(0,165,163,0.20); width: 60px; }
        .eco-logos-grid {
          display: flex; flex-wrap: wrap; gap: 16px; align-items: center;
        }
        .eco-logo-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-dark);
          display: flex; align-items: center; justify-content: center;
          padding: 24px 32px;
          transition: border-color 0.2s, box-shadow 0.2s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .eco-logo-card:hover {
          border-color: rgba(0,165,163,0.40);
          box-shadow: 0 0 28px rgba(0,165,163,0.10);
        }
        .eco-logo-card.large { min-width: 260px; padding: 32px 48px; }
        .eco-logo-card.medium { min-width: 200px; padding: 24px 36px; }
        .eco-logo-card.small { min-width: 160px; padding: 20px 28px; }
        .eco-logo-img {
          max-height: 52px; width: auto; object-fit: contain;
          filter: brightness(0) invert(1); opacity: 0.75;
          transition: opacity 0.2s, filter 0.2s;
        }
        .eco-logo-card.large .eco-logo-img { max-height: 68px; }
        .eco-logo-card.small .eco-logo-img { max-height: 40px; }
        .eco-logo-card:hover .eco-logo-img { opacity: 1; filter: brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(155deg); }

        /* ── Media grid ── */
        .eco-media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .eco-media-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-dark);
          padding: 32px 24px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 16px;
          text-decoration: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          min-height: 140px;
        }
        .eco-media-card:hover {
          border-color: rgba(0,165,163,0.40);
          box-shadow: 0 0 28px rgba(0,165,163,0.10);
        }
        .eco-media-img {
          max-height: 44px; max-width: 160px; width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1); opacity: 0.70;
          transition: opacity 0.2s;
        }
        .eco-media-card:hover .eco-media-img { opacity: 1; }
        .eco-media-name {
          font-size: 10px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: var(--text-muted);
          text-align: center; line-height: 1.4;
        }

        /* ── Association grid ── */
        .eco-assoc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
        .eco-assoc-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-dark);
          padding: 40px 32px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 16px;
          text-decoration: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          min-height: 160px;
        }
        .eco-assoc-card:hover {
          border-color: rgba(0,165,163,0.40);
          box-shadow: 0 0 28px rgba(0,165,163,0.10);
        }
        .eco-assoc-img {
          max-height: 52px; max-width: 180px; width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1); opacity: 0.75;
          transition: opacity 0.2s;
        }
        .eco-assoc-card:hover .eco-assoc-img { opacity: 1; }
        .eco-assoc-name {
          font-size: 11px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: var(--text-muted); text-align: center;
        }

        /* ── Empty / coming soon ── */
        .eco-empty {
          text-align: center; padding: 80px 20px;
        }
        .eco-empty-title {
          font-size: 18px; font-weight: 700; color: rgba(255,255,255,0.40);
          margin-bottom: 10px;
        }
        .eco-empty-sub { font-size: 14px; color: var(--text-muted); }

        /* ── CTA strip ── */
        .eco-cta {
          background: var(--bg-surface);
          border-top: 1px solid var(--border);
          padding: 64px 40px;
          text-align: center;
        }
        .eco-cta-inner { max-width: 600px; margin: 0 auto; }
        .eco-cta-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 16px;
        }
        .eco-cta-h2 {
          font-size: clamp(24px, 3vw, 38px); font-weight: 900;
          letter-spacing: -0.02em; color: #fff; margin-bottom: 14px;
        }
        .eco-cta-sub { font-size: 15px; color: var(--text-body); margin-bottom: 32px; line-height: 1.7; }
        .eco-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .eco-cta-primary {
          font-size: 11px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: #fff;
          background: var(--teal); padding: 14px 32px;
          text-decoration: none; transition: background 0.2s;
        }
        .eco-cta-primary:hover { background: #00bfbd; }
        .eco-cta-secondary {
          font-size: 11px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: #fff;
          background: transparent; padding: 13px 32px;
          border: 1.5px solid rgba(255,255,255,0.30);
          text-decoration: none; transition: border-color 0.2s, color 0.2s;
        }
        .eco-cta-secondary:hover { border-color: var(--teal); color: var(--teal); }

        @media (max-width: 768px) {
          .eco-hero { padding: 64px 20px 56px; }
          .eco-tabs { padding: 0 16px; }
          .eco-content { padding: 48px 20px 64px; }
          .eco-cta { padding: 48px 20px; }
          .eco-hero-stats { gap: 24px; }
          .eco-tab { padding: 14px 18px; font-size: 10px; }
        }
      `}</style>

      <div className="eco-page">

        {/* Hero */}
        <div className="eco-hero">
          <div className="eco-hero-inner">
            <div className="eco-eyebrow">Ecosystem</div>
            <h1 className="eco-hero-h1">
              The Finance 2045<br /><span>Ecosystem</span>
            </h1>
            <p className="eco-hero-sub">
              An elite network of sponsors, exhibitors, media, and associations powering Southeast Asia&apos;s most important finance and fintech event.
            </p>
            <div className="eco-hero-stats">
              {[
                { num: "40+", label: "Speakers" },
                { num: "100+", label: "Investors" },
                { num: "300+", label: "BFSI Leaders" },
                { num: "500+", label: "Enterprise & SMEs" },
                { num: "20+", label: "Media Partners" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="eco-hero-stat-num">{s.num}</div>
                  <div className="eco-hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendee ticker */}
        <div className="eco-ticker">
          <div className="eco-ticker-label">Attendees from</div>
          <div className="eco-ticker-track">
            {[...TICKER_COMPANIES, ...TICKER_COMPANIES].map((name, i) => (
              <span key={i} className="eco-ticker-item">{name}</span>
            ))}
          </div>
        </div>

        {/* Tab bar — only rendered if more than one tab has data */}
        {visibleTabs.length > 1 && (
          <div className="eco-tabs-wrap">
            <div className="eco-tabs">
              {visibleTabs.map((t) => (
                <button
                  key={t.id}
                  className={`eco-tab${activeTab === t.id ? " active" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="eco-content">

          {/* SPONSORS */}
          {activeTab === "sponsors" && (
            <>
              {f45SponsorCats.map((cat) => {
                const label = cleanCategory(cat.category_name);
                const isLead = label.toLowerCase().includes("lead") || label.toLowerCase().includes("powered") || label.toLowerCase().includes("title");
                const isGold = label.toLowerCase().includes("gold");
                const isSilver = label.toLowerCase().includes("silver");
                const size = isLead ? "large" : isGold ? "medium" : isSilver ? "medium" : "small";
                return (
                  <div key={cat.category_id} className="eco-tier">
                    <div className="eco-tier-label">{label}</div>
                    <div className="eco-logos-grid">
                      {cat.entity
                        .sort((a, b) => a.entity_order - b.entity_order)
                        .map((entity) => (
                          <a
                            key={entity.id}
                            href={entity.website_url || "#"}
                            className={`eco-logo-card ${size}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={entity.entity_name}
                          >
                            {entity.image_url ? (
                              <img src={entity.image_url} alt={entity.entity_name} className="eco-logo-img" />
                            ) : (
                              <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>
                                {entity.entity_name}
                              </span>
                            )}
                          </a>
                        ))}
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: "16px" }}>
                <Link href="/collaborate?tab=sponsor" className="eco-cta-primary">Become a Sponsor</Link>
              </div>
            </>
          )}

          {/* MEDIA PARTNERS */}
          {activeTab === "media" && (
            <>
              <div className="eco-media-grid">
                {f45MediaEntities
                  .sort((a, b) => a.entity_order - b.entity_order)
                  .map((entity) => (
                    <a
                      key={entity.id}
                      href={entity.website_url || "#"}
                      className="eco-media-card"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={entity.entity_name}
                    >
                      {entity.image_url && (
                        <img src={entity.image_url} alt={entity.entity_name} className="eco-media-img" />
                      )}
                      <div className="eco-media-name">{entity.entity_name}</div>
                    </a>
                  ))}
              </div>
              <div style={{ marginTop: "40px" }}>
                <Link href="/collaborate?tab=media" className="eco-cta-primary">Become a Media Partner</Link>
              </div>
            </>
          )}

          {/* ASSOCIATIONS */}
          {activeTab === "associations" && (
            <>
              <div className="eco-assoc-grid">
                {f45AssocEntities.map((entity) => (
                  <a
                    key={entity.id}
                    href={entity.website_url || "#"}
                    className="eco-assoc-card"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={entity.entity_name}
                  >
                    {entity.image_url && (
                      <img src={entity.image_url} alt={entity.entity_name} className="eco-assoc-img" />
                    )}
                    <div className="eco-assoc-name">{entity.entity_name}</div>
                  </a>
                ))}
              </div>
              <div style={{ marginTop: "40px" }}>
                <Link href="/collaborate?tab=association" className="eco-cta-primary">Partner as an Association</Link>
              </div>
            </>
          )}

        </div>

        {/* CTA strip */}
        <div className="eco-cta">
          <div className="eco-cta-inner">
            <div className="eco-cta-label">Join the Ecosystem</div>
            <h2 className="eco-cta-h2">Partner with Finance 2045</h2>
            <p className="eco-cta-sub">
              Position your brand at the centre of Southeast Asia&apos;s most influential finance and fintech gathering. Sponsor, exhibit, or join as a media or association partner.
            </p>
            <div className="eco-cta-btns">
              <Link href="/collaborate" className="eco-cta-primary">Get in Touch</Link>
              <Link href="/attend" className="eco-cta-secondary">View the Event</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

const TICKER_COMPANIES = [
  "Ministry of Energy", "AirAsia", "SMBC", "Blue Bird", "Kalbe Farma",
  "Goto Financial", "Bank Mandiri", "OJK", "Tokopedia", "Bank BRI",
  "Pertamina", "Garuda Indonesia", "Telkom Indonesia", "Bukalapak",
  "Traveloka", "Sea Group", "Bank BCA", "Grab Financial", "Gojek", "Xendit",
];
