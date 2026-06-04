"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const TITLE = [
  { name: "Intel",            logo: "/partners/intel-logo.webp",        type: "Presenting Technology Partner" },
  { name: "Dell Technologies",logo: "/partners/dell-technologies.webp", type: "Infrastructure Partner"        },
];

const PLATINUM = [
  { name: "Cisco",              logo: "/partners/cisco.webp"             },
  { name: "HPE",                logo: "/partners/hpe.webp"               },
  { name: "SAP Concur",         logo: "/partners/sap-concur.webp"        },
  { name: "Tata Communications",logo: "/partners/tata-communications.webp"},
  { name: "Fortinet",           logo: "/partners/fortinet.webp"          },
  { name: "ManageEngine",       logo: "/partners/manageengine.webp"      },
];

const GOLD = [
  { name: "Check Point",        logo: "/partners/check-point.webp"       },
  { name: "Okta",               logo: "/partners/okta-acpl.webp"         },
  { name: "Darktrace",          logo: "/partners/darktrace-logo.webp"    },
  { name: "Amazon",             logo: "/partners/amazon-trianz.webp"     },
  { name: "Confluent",          logo: "/partners/confluent_logo.webp"    },
  { name: "Genesys",            logo: "/partners/genesys-logo.webp"      },
  { name: "Aryaka",             logo: "/partners/aryaka_logo.webp"       },
  { name: "Thales Technobind",  logo: "/partners/thales-technobind.webp" },
];

const ASSOCIATE = [
  { name: "Antworks",           logo: "/partners/antworks.webp"          },
  { name: "Awaya",              logo: "/partners/awaya.webp"             },
  { name: "Denodo",             logo: "/partners/denodo.webp"            },
  { name: "Dista",              logo: "/partners/dista_logo.webp"        },
  { name: "Finesse",            logo: "/partners/finesse.webp"           },
  { name: "Happiest Minds",     logo: "/partners/happiest-minds.webp"    },
  { name: "Infor",              logo: "/partners/infor.webp"             },
  { name: "Kodak Alaris",       logo: "/partners/kodak-alaris.webp"      },
  { name: "Data Semantics",     logo: "/partners/data-semantics.webp"    },
  { name: "Neosoft",            logo: "/partners/neosoft_technologies.webp"},
  { name: "Webwerks",           logo: "/partners/webwerks-logo.webp"     },
  { name: "C-Team Computers",   logo: "/partners/c-team-computers.webp"  },
];

const MEDIA = [
  "Silicon India", "Analytics Insight", "CIO Tech World", "StartupNews",
  "Insights Success", "CXO Today", "CISO Mag", "Express Computer",
];

const STATS = [
  { val: "500+",  lbl: "Technology Partners" },
  { val: "15+",   lbl: "Global Editions"     },
  { val: "8,500+",lbl: "CIOs Reached"        },
  { val: "20+",   lbl: "Industries"          },
];

type Tab = "overview" | "sponsors" | "exhibitors" | "media" | "associations" | "startups";
const VALID_TABS: Tab[] = ["overview", "sponsors", "exhibitors", "media", "associations", "startups"];

type LiveEntity = { id: number; name: string; image: string; website: string };

export default function PartnersPage() {
  const [tab, setTab]                   = useState<Tab>("overview");
  const [liveMedia, setLiveMedia]       = useState<LiveEntity[]>([]);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [liveSponsors, setLiveSponsors] = useState<{category_name: string; entities: {id:number; name:string; image:string; website:string}[]}[]>([]);
  const [sponsorsLoading, setSponsorsLoading] = useState(true);
  const [liveExhibitors, setLiveExhibitors] = useState<{category_name: string; entities: {id:number; name:string; image:string; website:string}[]}[]>([]);
  const [exhibitorsLoading, setExhibitorsLoading] = useState(true);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab") as Tab | null;
    if (t && VALID_TABS.includes(t)) setTab(t);
  }, []);

  useEffect(() => {
    fetch("/api/entity?type=2")
      .then(r => r.json())
      .then(d => {
        const all: LiveEntity[] = [
          ...(d.uncategorized ?? []),
          ...(d.categorized ?? []).flatMap((c: { entities: LiveEntity[] }) => c.entities),
        ];
        if (all.length > 0) setLiveMedia(all);
      })
      .catch(() => {})
      .finally(() => setMediaLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/entity?type=1")
      .then(r => r.json())
      .then(d => {
        const cats = d.categorized ?? [];
        if (cats.length > 0 || (d.uncategorized ?? []).length > 0) {
          const all = [...cats];
          if ((d.uncategorized ?? []).length > 0) {
            all.push({ category_name: "Other Sponsors", entities: d.uncategorized });
          }
          setLiveSponsors(all);
        }
      })
      .catch(() => {})
      .finally(() => setSponsorsLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/entity?type=3")
      .then(r => r.json())
      .then(d => {
        const cats = d.categorized ?? [];
        if (cats.length > 0 || (d.uncategorized ?? []).length > 0) {
          const all = [...cats];
          if ((d.uncategorized ?? []).length > 0) {
            all.push({ category_name: "Exhibitors", entities: d.uncategorized });
          }
          setLiveExhibitors(all);
        }
      })
      .catch(() => {})
      .finally(() => setExhibitorsLoading(false));
  }, []);

  const changeTab = (t: Tab) => {
    setTab(t);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", t);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <>
      <style>{`
        .bpt-page { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }

        /* ── TABBAR ── */
        .bpt-tabbar {
          background: var(--bg-surface); border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky; top: 72px; z-index: 50;
        }
        .bpt-tabbar-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: flex; overflow-x: auto; scrollbar-width: none;
        }
        .bpt-tabbar-inner::-webkit-scrollbar { display: none; }
        .bpt-tab {
          font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.90);
          padding: 16px 22px; cursor: pointer; border: none; background: none;
          font-family: inherit; border-bottom: 2px solid transparent;
          white-space: nowrap; transition: color 0.2s, border-color 0.2s;
        }
        .bpt-tab:hover { color: #ffffff; }
        .bpt-tab.active { color: var(--cyan); border-bottom-color: var(--cyan); }

        /* ── HERO ── */
        .bpt-hero {
          background: var(--bg-surface); padding: 80px 40px 72px;
          border-bottom: 1px solid rgba(124,58,237,0.12);
          position: relative; overflow: hidden; text-align: center;
        }
        .bpt-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 65%);
          pointer-events: none;
        }
        .bpt-hero-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .bpt-h1 { font-size: clamp(22px, 2.6vw, 38px); font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1.15; margin-bottom: 16px; }
        .bpt-h1 em { font-style: normal; color: var(--cyan); }
        .bpt-sub { font-size: 18px; color: var(--text-body); max-width: 580px; margin: 0 auto 48px; line-height: 1.75; }
        .bpt-hero-stats {
          display: flex; justify-content: center; gap: 56px; flex-wrap: wrap;
          padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.07);
        }
        .bpt-stat-val {
          font-size: 30px; font-weight: 800; letter-spacing: -0.02em;
          background: linear-gradient(135deg, #7C3AED, #C084FC);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: 5px;
        }
        .bpt-stat-lbl {
          font-size: 13px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(255,255,255,0.92);
        }

        /* ── BODY ── */
        .bpt-body { max-width: 1320px; margin: 0 auto; padding: 80px 40px 100px; }
        .bpt-section { margin-bottom: 72px; }
        .bpt-section-head {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 28px;
        }
        .bpt-section-label {
          font-size: 13px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--cyan);
          white-space: nowrap;
        }
        .bpt-section-rule { flex: 1; height: 1px; background: rgba(124,58,237,0.15); }

        /* ── TITLE SPONSORS ── */
        .bpt-title-row { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
        .bpt-title-card {
          background: var(--bg-card);
          border: 1px solid rgba(124,58,237,0.22);
          border-radius: 20px;
          padding: 48px 40px;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 20px;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .bpt-title-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7C3AED, #C084FC);
        }
        .bpt-title-card:hover {
          border-color: rgba(124,58,237,0.60);
          box-shadow: 0 0 0 1px rgba(124,58,237,0.28), 0 0 32px rgba(124,58,237,0.30), 0 0 64px rgba(124,58,237,0.12);
          transform: translateY(-4px);
        }
        .bpt-title-logo-wrap {
          display: flex; align-items: center;
          height: 72px;
        }
        .bpt-title-logo {
          max-height: 56px; max-width: 220px;
          object-fit: contain; object-position: left center;
          filter: brightness(0) invert(1);
          opacity: 0.90;
        }
        .bpt-title-card:hover .bpt-title-logo { opacity: 1; }
        .bpt-title-name { font-size: 20px; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
        .bpt-title-type {
          font-size: 13px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--cyan);
          background: rgba(192,132,252,0.08); border: 1px solid rgba(192,132,252,0.20);
          padding: 4px 12px; border-radius: 100px; display: inline-block;
        }
        .bpt-title-desc { font-size: 18px; color: var(--text-body); line-height: 1.7; margin-top: 4px; }

        /* ── LOGO GRIDS ── */
        .bpt-logo-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        .bpt-logo-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
        .bpt-logo-tile {
          background: var(--bg-card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          height: 110px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 12px; padding: 0 20px;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          cursor: default;
        }
        .bpt-logo-tile:hover {
          border-color: rgba(124,58,237,0.55);
          box-shadow: 0 0 0 1px rgba(124,58,237,0.25), 0 0 24px rgba(124,58,237,0.28), 0 0 48px rgba(124,58,237,0.10);
          transform: translateY(-3px);
        }
        .bpt-logo-img-wrap {
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 52px;
        }
        .bpt-logo-img {
          max-height: 44px; max-width: 120px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.70;
          transition: opacity 0.3s;
        }
        .bpt-logo-tile:hover .bpt-logo-img { opacity: 1; }
        .bpt-logo-name {
          font-size: 13px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(255,255,255,0.72);
          text-align: center; line-height: 1.3;
          transition: color 0.3s;
        }
        .bpt-logo-tile:hover .bpt-logo-name { color: #ffffff; }

        /* ── MEDIA PARTNERS ── */
        .bpt-media-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .bpt-media-logo-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px;
          margin-bottom: 16px;
        }
        .bpt-media-logo-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 12px; padding: 16px 12px;
          display: flex; align-items: center; justify-content: center;
          min-height: 72px; transition: border-color 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .bpt-media-logo-card:hover {
          border-color: rgba(124,58,237,0.35);
          box-shadow: 0 0 16px rgba(124,58,237,0.10);
        }
        .bpt-media-logo-card img {
          max-width: 130px; max-height: 44px; width: auto; height: auto;
          object-fit: contain; filter: grayscale(0.3) brightness(1.05);
          transition: filter 0.2s;
        }
        .bpt-media-logo-card:hover img { filter: grayscale(0) brightness(1.1); }
        .bpt-media-logo-name {
          font-size: 18px; font-weight: 700; color: #ffffff;
          text-align: center; line-height: 1.3;
        }
        .bpt-media-pill {
          background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px; padding: 8px 20px;
          font-size: 18px; font-weight: 700; color: #ffffff;
          letter-spacing: 0.04em;
          transition: border-color 0.3s, color 0.3s;
        }
        .bpt-media-pill:hover { border-color: rgba(124,58,237,0.40); color: #ffffff; }

        /* ── CTA ── */
        .bpt-cta {
          background: var(--bg-surface); border: 1px solid rgba(124,58,237,0.15);
          border-radius: 20px; padding: 72px 48px; text-align: center;
          position: relative; overflow: hidden;
        }
        .bpt-cta::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .bpt-cta-inner { position: relative; z-index: 2; }
        .bpt-cta h2 { font-size: clamp(18px,2.2vw,28px); font-weight: 800; letter-spacing: -0.02em; color: #fff; margin-bottom: 12px; }
        .bpt-cta h2 em { font-style: normal; color: var(--cyan); }
        .bpt-cta p { font-size: 18px; color: var(--text-body); max-width: 500px; margin: 0 auto 32px; line-height: 1.75; }
        .bpt-packages {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 12px;
          max-width: 760px; margin: 0 auto 40px;
        }
        .bpt-package {
          background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 20px 16px; text-align: center;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bpt-package:hover {
          border-color: rgba(124,58,237,0.50);
          box-shadow: 0 0 20px rgba(124,58,237,0.22);
        }
        .bpt-pkg-label { font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cyan); margin-bottom: 8px; }
        .bpt-pkg-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 4px; }
        .bpt-pkg-desc { font-size: 18px; color: var(--text-body); line-height: 1.6; }

        /* ── BENEFIT GRID ── */
        .bpt-benefit-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 48px; }
        .bpt-benefit-card { background: var(--bg-card); border: 1px solid var(--border); padding: 28px 24px; border-radius: 16px; }
        .bpt-bnum { font-size: 13px; font-weight: 900; letter-spacing: 0.12em; color: var(--cyan); margin-bottom: 14px; }
        .bpt-btitle { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.3; }
        .bpt-bdesc { font-size: 18px; color: var(--text-body); line-height: 1.7; }

        /* ── PARTNER CATEGORIES ── */
        .bpt-cat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 56px; }
        .bpt-cat-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 14px; padding: 24px 20px; text-align: center;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bpt-cat-card:hover {
          border-color: rgba(124,58,237,0.45);
          box-shadow: 0 0 20px rgba(124,58,237,0.18);
        }
        .bpt-cat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(124,58,237,0.10); border: 1px solid rgba(124,58,237,0.22);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px; color: var(--cyan);
        }
        .bpt-cat-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .bpt-cat-desc { font-size: 18px; color: var(--text-body); line-height: 1.65; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .bpt-logo-grid { grid-template-columns: repeat(4, 1fr); }
          .bpt-packages { grid-template-columns: 1fr; max-width: 360px; }
          .bpt-benefit-grid { grid-template-columns: repeat(2,1fr); }
          .bpt-cat-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .bpt-hero { padding: 56px 24px 48px; }
          .bpt-body { padding: 48px 24px 72px; }
          .bpt-title-row { grid-template-columns: 1fr; }
          .bpt-logo-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .bpt-cta { padding: 48px 24px; }
          .bpt-hero-stats { gap: 28px; }
          .bpt-tabbar-inner { padding: 0 16px; }
        }
        @media (max-width: 480px) {
          .bpt-logo-grid { grid-template-columns: repeat(2, 1fr); }
          .bpt-benefit-grid, .bpt-cat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="bpt-page">

        {/* HERO */}
        <div className="bpt-hero">
          <div className="bpt-hero-inner">
            <div className="bcio-eyebrow">Partners &amp; Sponsors</div>
            <h1 className="bpt-h1">Powering Enterprise Innovation <em>Together</em></h1>
            <p className="bpt-sub">
              BIG CIO brings together global technology providers, enterprise innovators, media networks and industry associations to shape the future of digital transformation.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                Become a Partner
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Explore Sponsorship</Link>
            </div>
            <div className="bpt-hero-stats">
              {STATS.map(s => (
                <div key={s.lbl} style={{ textAlign: "center" }}>
                  <div className="bpt-stat-val">{s.val}</div>
                  <div className="bpt-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TAB BAR */}
        <div className="bpt-tabbar">
          <div className="bpt-tabbar-inner">
            {([
              ["overview",      "Overview"],
              ["sponsors",      "Sponsors"],
              ["exhibitors",    "Exhibitors"],
              ["media",         "Media Partners"],
              ["associations",  "Associations"],
              ["startups",      "Startups"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} className={`bpt-tab${tab === id ? " active" : ""}`} onClick={() => changeTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="bpt-body">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontSize: "clamp(20px,2.4vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 12 }}>
                The Ecosystem Behind <span style={{ color: "var(--cyan)" }}>BIG CIO Show</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 620, margin: "0 auto 12px", lineHeight: 1.75 }}>
                BIG CIO partners are not advertisers — they are collaborators. Our ecosystem is built on co-creation, industry leadership, innovation enablement, and executive engagement.
              </p>
            </div>

            {/* Partner categories */}
            <div className="bpt-cat-grid">
              {[
                {
                  title: "Sponsors",
                  desc: "Title, Platinum, Gold and category sponsors — maximum brand visibility and CXO access.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
                },
                {
                  title: "Exhibitors",
                  desc: "Showcase innovations live to enterprise buyers actively evaluating technology investments.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
                },
                {
                  title: "Media Partners",
                  desc: "Industry publications, podcasts, and digital communities amplifying the CIO conversation.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg>,
                },
                {
                  title: "Associations",
                  desc: "CIO forums, technology councils, and industry bodies building India's enterprise ecosystem.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                },
                {
                  title: "Knowledge Partners",
                  desc: "Research organisations and analyst platforms co-creating enterprise intelligence.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                },
                {
                  title: "Innovation Partners",
                  desc: "Ecosystem builders driving AI, cybersecurity, and digital transformation initiatives.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.2 6l-.8.6V18h-6v-2.4l-.8-.6A7 7 0 0 1 12 2z"/><path d="M9 21h6M10 18h4"/></svg>,
                },
                {
                  title: "Community Partners",
                  desc: "Networks and online communities extending BIG CIO's reach across India's tech landscape.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                },
                {
                  title: "Startup Partners",
                  desc: "High-growth B2B startups gaining direct access to enterprise buyers and investors.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
                },
              ].map(c => (
                <div key={c.title} className="bpt-cat-card">
                  <div className="bpt-cat-icon">{c.icon}</div>
                  <div className="bpt-cat-title">{c.title}</div>
                  <div className="bpt-cat-desc">{c.desc}</div>
                </div>
              ))}
            </div>

            {/* Why brands partner */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Why Brands Partner With BIG CIO</div>
                <div className="bpt-section-rule" />
              </div>
              <div className="bpt-benefit-grid">
                {[
                  { num: "01", title: "Enterprise Visibility",       desc: "Your brand in front of 8,500+ verified CIOs and technology decision-makers who control enterprise budgets across India." },
                  { num: "02", title: "Direct CXO Access",           desc: "Structured 1:1 meetings, roundtables, and networking sessions with the exact seniority and industries you target." },
                  { num: "03", title: "Thought Leadership",          desc: "Keynote slots, panel participation, and session sponsorships that position your brand as an enterprise authority." },
                  { num: "04", title: "Strategic Networking",        desc: "Private boardrooms, VIP lounges, and hosted buyer meetings designed for meaningful business conversations." },
                  { num: "05", title: "Market Positioning",          desc: "Association with India's most credible CIO platform — 15 editions of trust built with Fortune 500 brands." },
                  { num: "06", title: "Ecosystem Engagement",        desc: "Year-round digital visibility across 100,000+ IT professionals through newsletters, social, and event communications." },
                ].map(b => (
                  <div key={b.num} className="bpt-benefit-card">
                    <div className="bpt-bnum">{b.num}</div>
                    <div className="bpt-btitle">{b.title}</div>
                    <div className="bpt-bdesc">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact metrics */}
            <div className="bpt-cta">
              <div className="bpt-cta-inner">
                <h2>Become Part of the <em>BIG CIO Ecosystem</em></h2>
                <p>Partner with enterprise technology leaders and position your brand at the centre of India&apos;s most influential CIO platform.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, maxWidth: 760, margin: "0 auto 40px" }}>
                  {[
                    { val: "500+",  lbl: "Enterprise Leaders" },
                    { val: "30+",   lbl: "Strategic Sessions" },
                    { val: "100+",  lbl: "Partner Meetings" },
                    { val: "15+",   lbl: "Editions of Trust" },
                  ].map(s => (
                    <div key={s.lbl} style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                      <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #7C3AED, #C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 6 }}>{s.val}</div>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.90)" }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                    Start Your Partnership
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Talk to Our Team</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPONSORS */}
        {tab === "sponsors" && (
          <div className="bpt-body">
            {/* Why Sponsor */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(20px,2.4vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 12 }}>
                Engage Enterprise Decision Makers <span style={{ color: "var(--cyan)" }}>at BIG CIO</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 620, margin: "0 auto", lineHeight: 1.75 }}>
                Position your brand at the centre of enterprise innovation. BIG CIO sponsors do not buy visibility — they buy influence, positioning, access, pipeline, and thought leadership.
              </p>
            </div>

            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Why Sponsor BIG CIO</div>
                <div className="bpt-section-rule" />
              </div>
              <div className="bpt-benefit-grid">
                {[
                  { num: "01", title: "Connect With Qualified Enterprise Buyers",  desc: "8,500+ verified CIOs, CTOs, and senior technology decision-makers controlling enterprise budgets across India." },
                  { num: "02", title: "Build Executive Relationships",             desc: "Private roundtables, VIP lounges, hosted buyer meetings — formats designed for meaningful business conversations." },
                  { num: "03", title: "Showcase Innovation",                       desc: "Live demos, innovation spotlights, and exhibition booths to put your solutions in front of active buyers." },
                  { num: "04", title: "Drive Strategic Conversations",             desc: "Keynote slots, panel participation, and session sponsorships that position your brand as an enterprise authority." },
                  { num: "05", title: "Generate Enterprise Leads",                 desc: "Pre-qualified meeting facilitation and lead scanning technology included with every sponsorship package." },
                  { num: "06", title: "Strengthen Market Positioning",             desc: "Association with India&apos;s most credible CIO platform — 15 editions of trust built with Fortune 500 brands." },
                ].map(b => (
                  <div key={b.num} className="bpt-benefit-card">
                    <div className="bpt-bnum">{b.num}</div>
                    <div className="bpt-btitle">{b.title}</div>
                    <div className="bpt-bdesc">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thought Leadership */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Thought Leadership Opportunities</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {["Keynote Sessions", "Panel Discussions", "Fireside Chats", "Executive Boardrooms", "Industry Reports", "Podcast Features", "Interview Opportunities", "Innovation Spotlights"].map(c => (
                  <span key={c} style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.20)", padding: "6px 14px", borderRadius: 8 }}>{c}</span>
                ))}
              </div>
            </div>

            {/* Audience Intelligence */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Audience Intelligence</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 32 }}>
                {[
                  { val: "C-Suite", lbl: "Seniority", sub: "CIOs, CTOs, CISOs, CDOs" },
                  { val: "50+",     lbl: "Industries", sub: "BFSI, Mfg, Healthcare, Retail" },
                  { val: "$5M+",    lbl: "Avg Tech Budget", sub: "Enterprise decision-makers" },
                  { val: "82%",     lbl: "Decision Authority", sub: "Final or joint authority" },
                ].map(s => (
                  <div key={s.lbl} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "24px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #7C3AED, #C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 4 }}>{s.val}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.92)", marginBottom: 4 }}>{s.lbl}</div>
                    <div style={{ fontSize: 10, color: "var(--text-body)" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["CIOs", "CTOs", "CISOs", "Chief Data Officers", "Heads of AI", "IT Directors", "Enterprise Architects", "Digital Transformation Leaders"].map(r => (
                  <span key={r} style={{ fontSize: 11, fontWeight: 700, color: "#ffffff", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "5px 12px", borderRadius: 8 }}>{r}</span>
                ))}
              </div>
            </div>

            {/* Current Sponsors */}
            {sponsorsLoading ? (
              <div style={{ padding: "48px 0", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>Loading sponsors...</div>
            ) : liveSponsors.length > 0 ? (
              liveSponsors.map(cat => (
                <div key={cat.category_name} className="bpt-section">
                  <div className="bpt-section-head">
                    <div className="bpt-section-label">{cat.category_name}</div>
                    <div className="bpt-section-rule" />
                  </div>
                  <div className="bpt-logo-grid">
                    {cat.entities.map(e => (
                      e.website ? (
                        <a key={e.id} href={e.website} target="_blank" rel="noopener noreferrer" className="bpt-logo-tile" style={{ textDecoration: "none" }}>
                          <div className="bpt-logo-img-wrap">
                            {e.image
                              ? <img src={e.image} alt={e.name} className="bpt-logo-img" />
                              : <span className="bpt-logo-name">{e.name}</span>
                            }
                          </div>
                          {e.image && <div className="bpt-logo-name">{e.name}</div>}
                        </a>
                      ) : (
                        <div key={e.id} className="bpt-logo-tile">
                          <div className="bpt-logo-img-wrap">
                            {e.image
                              ? <img src={e.image} alt={e.name} className="bpt-logo-img" />
                              : <span className="bpt-logo-name">{e.name}</span>
                            }
                          </div>
                          {e.image && <div className="bpt-logo-name">{e.name}</div>}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              ))
            ) : (
              /* FALLBACK — static hardcoded data */
              <>
                <div className="bpt-section">
                  <div className="bpt-section-head">
                    <div className="bpt-section-label">Title Sponsors</div>
                    <div className="bpt-section-rule" />
                  </div>
                  <div className="bpt-title-row">
                    {TITLE.map(s => (
                      <div key={s.name} className="bpt-title-card">
                        <div className="bpt-title-logo-wrap">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={s.logo} alt={s.name} className="bpt-title-logo" />
                        </div>
                        <div>
                          <div className="bpt-title-name">{s.name}</div>
                        </div>
                        <div className="bpt-title-type">{s.type}</div>
                        <div className="bpt-title-desc">
                          Exclusive title sponsorship — maximum brand visibility across all event touchpoints, keynote association, and direct access to 500+ senior technology decision-makers.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bpt-section">
                  <div className="bpt-section-head">
                    <div className="bpt-section-label">Platinum Partners</div>
                    <div className="bpt-section-rule" />
                  </div>
                  <div className="bpt-logo-grid">
                    {PLATINUM.map(s => (
                      <div key={s.name} className="bpt-logo-tile">
                        <div className="bpt-logo-img-wrap">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={s.logo} alt={s.name} className="bpt-logo-img" />
                        </div>
                        <div className="bpt-logo-name">{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bpt-section">
                  <div className="bpt-section-head">
                    <div className="bpt-section-label">Gold Partners</div>
                    <div className="bpt-section-rule" />
                  </div>
                  <div className="bpt-logo-grid">
                    {GOLD.map(s => (
                      <div key={s.name} className="bpt-logo-tile">
                        <div className="bpt-logo-img-wrap">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={s.logo} alt={s.name} className="bpt-logo-img" />
                        </div>
                        <div className="bpt-logo-name">{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bpt-section">
                  <div className="bpt-section-head">
                    <div className="bpt-section-label">Associate Partners</div>
                    <div className="bpt-section-rule" />
                  </div>
                  <div className="bpt-logo-grid">
                    {ASSOCIATE.map(s => (
                      <div key={s.name} className="bpt-logo-tile">
                        <div className="bpt-logo-img-wrap">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={s.logo} alt={s.name} className="bpt-logo-img" />
                        </div>
                        <div className="bpt-logo-name">{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ROI Metrics */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">ROI &amp; Business Outcomes</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 32 }}>
                {[
                  { val: "3,000+", lbl: "Qualified Meetings" },
                  { val: "82%",    lbl: "Post-Event Follow-Ups" },
                  { val: "92%",    lbl: "Sponsor Retention Rate" },
                  { val: "15+",    lbl: "Editions of Proven ROI" },
                ].map(s => (
                  <div key={s.lbl} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "24px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #7C3AED, #C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 6 }}>{s.val}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.90)" }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bpt-cta">
              <div className="bpt-cta-inner">
                <h2>Start Your <em>Partnership Journey</em></h2>
                <p>
                  Connect with enterprise buyers. Build executive relationships. Drive strategic conversations. Limited packages available for BIG CIO Show 2026.
                </p>
                <div className="bpt-packages">
                  {[
                    { label: "Title",    title: "Exclusive",    desc: "Maximum visibility across all event touchpoints and keynote association" },
                    { label: "Platinum", title: "Platinum",     desc: "Premium branding, panel participation, and dedicated exhibition space" },
                    { label: "Gold",     title: "Gold",         desc: "Strong brand presence, exhibition booth, and delegate networking access" },
                  ].map(p => (
                    <div key={p.label} className="bpt-package">
                      <div className="bpt-pkg-label">{p.label}</div>
                      <div className="bpt-pkg-title">{p.title} Sponsor</div>
                      <div className="bpt-pkg-desc">{p.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="https://share.hsforms.com/1HRqBcmZiR4OeUbvlwn5lWQ1rb8t" className="bcio-btn-primary">
                    Request Sponsorship Deck
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Talk to Our Team</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EXHIBITORS */}
        {tab === "exhibitors" && (
          <div className="bpt-body">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontSize: "clamp(20px,2.4vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 12 }}>
                Showcase Your Solutions to <span style={{ color: "var(--cyan)" }}>Enterprise Technology Leaders</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 580, margin: "0 auto", lineHeight: 1.75 }}>
                Demonstrate your solutions, connect with buyers and position your brand among the industry&apos;s leading innovators. A live innovation marketplace for enterprise technology.
              </p>
            </div>

            {/* Why Exhibit */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Why Exhibit at BIG CIO</div>
                <div className="bpt-section-rule" />
              </div>
              <div className="bpt-benefit-grid">
                {[
                  { num: "01", title: "Live Demonstrations",         desc: "Show your solution in action to active enterprise buyers — not a slide deck, a live product experience." },
                  { num: "02", title: "Product Launches",            desc: "BIG CIO Show is the highest-impact venue to announce new products to 8,500+ enterprise technology leaders." },
                  { num: "03", title: "Direct CXO Engagement",       desc: "The exhibition floor delivers direct access to CIOs, CTOs, and CISOs during dedicated showcase periods." },
                  { num: "04", title: "Brand Visibility",            desc: "Booth branding, digital promotion, and platform presence across all show communications and the attendee app." },
                  { num: "05", title: "Lead Generation",             desc: "Lead scanning technology, meeting scheduler integration, and pre-qualified buyer introductions included." },
                  { num: "06", title: "Market Expansion",            desc: "Reach new verticals, geographic markets, and enterprise buyer segments in a single, high-density environment." },
                ].map(b => (
                  <div key={b.num} className="bpt-benefit-card">
                    <div className="bpt-bnum">{b.num}</div>
                    <div className="bpt-btitle">{b.title}</div>
                    <div className="bpt-bdesc">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exhibition Floor */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Exhibition Floor — 2026</div>
                <div className="bpt-section-rule" />
              </div>
              {exhibitorsLoading ? (
                <div style={{ padding: "48px 0", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>Loading exhibitors...</div>
              ) : liveExhibitors.length > 0 ? (
                liveExhibitors.map(cat => (
                  <div key={cat.category_name} style={{ marginBottom: 32 }}>
                    {liveExhibitors.length > 1 && (
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 12 }}>{cat.category_name}</div>
                    )}
                    <div className="bpt-logo-grid">
                      {cat.entities.map(e => (
                        e.website ? (
                          <a key={e.id} href={e.website} target="_blank" rel="noopener noreferrer" className="bpt-logo-tile" style={{ textDecoration: "none" }}>
                            <div className="bpt-logo-img-wrap">
                              {e.image ? <img src={e.image} alt={e.name} className="bpt-logo-img" /> : <span className="bpt-logo-name">{e.name}</span>}
                            </div>
                            {e.image && <div className="bpt-logo-name">{e.name}</div>}
                          </a>
                        ) : (
                          <div key={e.id} className="bpt-logo-tile">
                            <div className="bpt-logo-img-wrap">
                              {e.image ? <img src={e.image} alt={e.name} className="bpt-logo-img" /> : <span className="bpt-logo-name">{e.name}</span>}
                            </div>
                            {e.image && <div className="bpt-logo-name">{e.name}</div>}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bpt-logo-grid">
                  {[...PLATINUM, ...GOLD].map(s => (
                    <div key={s.name} className="bpt-logo-tile">
                      <div className="bpt-logo-img-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.logo} alt={s.name} className="bpt-logo-img" />
                      </div>
                      <div className="bpt-logo-name">{s.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Exhibition Experience */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Exhibition Experience</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {["Innovation Zones", "Interactive Showcases", "Demo Theatres", "Networking Lounges", "Startup Connect", "High-Traffic Footfall", "Buyer Meeting Zones"].map(c => (
                  <span key={c} style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.20)", padding: "6px 14px", borderRadius: 8 }}>{c}</span>
                ))}
              </div>
            </div>

            {/* Exhibition Categories */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Exhibition Categories</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {["AI & Automation", "Cybersecurity", "Cloud & Infrastructure", "Data & Analytics", "Smart Manufacturing", "Enterprise SaaS", "Digital Workplace", "Future Workplace"].map(c => (
                  <span key={c} style={{ fontSize: 11, fontWeight: 700, color: "#ffffff", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "6px 14px", borderRadius: 8 }}>{c}</span>
                ))}
              </div>
            </div>

            {/* Visitor Profile */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Visitor Profile</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 16, padding: "32px 36px", marginBottom: 32 }}>
                <p style={{ fontSize: 13, color: "var(--text-body)", marginBottom: 20, lineHeight: 1.75 }}>Every delegate visiting the exhibition floor is a verified enterprise technology leader with active evaluation and purchasing authority:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["CIOs", "CTOs", "CISOs", "IT Decision-Makers", "Enterprise Architects", "Digital Leaders", "VPs of Technology", "Heads of Infrastructure"].map(r => (
                    <span key={r} style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.20)", padding: "6px 14px", borderRadius: 8 }}>{r}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Innovation Showcase */}
            <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(192,132,252,0.05) 100%)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: 16, padding: "36px 40px", marginBottom: 48 }}>
              <h3 style={{ fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: 10 }}>
                The <span style={{ color: "var(--cyan)" }}>Innovation Showcase</span>
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.75, maxWidth: 620 }}>
                A curated environment for breakthrough technologies and enterprise-ready innovation. The Innovation Showcase is BIG CIO Show&apos;s premium exhibition experience — high footfall, structured demos, and direct buyer engagement in a dynamic, purpose-built showcase zone.
              </p>
            </div>

            <div className="bpt-cta">
              <div className="bpt-cta-inner">
                <h2>Reserve Your <em>Exhibition Space</em></h2>
                <p>Live demonstrations, enterprise visibility, direct buyer engagement. Booth packages, demo slots, and pre-qualified meetings included.</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="https://share.hsforms.com/1HRqBcmZiR4OeUbvlwn5lWQ1rb8t" className="bcio-btn-gold">
                    Request Exhibitor Pack
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="/exhibitor-portal" className="bcio-btn-outline">Exhibitor Portal</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MEDIA PARTNERS */}
        {tab === "media" && (
          <div className="bpt-body">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontSize: "clamp(20px,2.4vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 12 }}>
                Amplifying Enterprise Technology <span style={{ color: "var(--cyan)" }}>Conversations</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 580, margin: "0 auto", lineHeight: 1.75 }}>
                Partner with one of India&apos;s most influential CIO platforms. BIG CIO Show media partners gain exclusive access, executive interviews, and co-branded content opportunities.
              </p>
            </div>

            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Media Partners</div>
                <div className="bpt-section-rule" />
              </div>
              {mediaLoading ? (
                <div style={{ color: "var(--text-muted)", fontSize: 13, padding: "32px 0" }}>Loading media partners...</div>
              ) : liveMedia.length > 0 ? (
                <div className="bpt-media-logo-grid">
                  {liveMedia.map(m => (
                    m.website ? (
                      <a key={m.id} href={m.website} target="_blank" rel="noopener noreferrer" className="bpt-media-logo-card">
                        {m.image
                          ? <img src={m.image} alt={m.name} />
                          : <span className="bpt-media-logo-name">{m.name}</span>
                        }
                      </a>
                    ) : (
                      <div key={m.id} className="bpt-media-logo-card">
                        {m.image
                          ? <img src={m.image} alt={m.name} />
                          : <span className="bpt-media-logo-name">{m.name}</span>
                        }
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="bpt-media-grid">
                  {MEDIA.map(m => (
                    <div key={m} className="bpt-media-pill">{m}</div>
                  ))}
                </div>
              )}
            </div>

            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Why Media Partners Join</div>
                <div className="bpt-section-rule" />
              </div>
              <div className="bpt-benefit-grid">
                {[
                  { num: "01", title: "Executive Access",          desc: "VIP access to all sessions, roundtables, and the Big CIO Awards ceremony with unrestricted editorial access." },
                  { num: "02", title: "Speaker Interviews",        desc: "Pre-arranged 1:1 interview slots with confirmed keynote speakers — coordinated by our dedicated media team." },
                  { num: "03", title: "Exclusive Content Rights",  desc: "First access to award winners, major announcements, and exclusive research data for breaking stories." },
                  { num: "04", title: "Co-Branded Opportunities",  desc: "Podcast features, newsletter collaborations, live broadcasting, and social media co-creation with BIG CIO." },
                  { num: "05", title: "Brand Visibility",          desc: "Logo placement on event website, venue signage, app, and all communications reaching 100,000+ IT professionals." },
                  { num: "06", title: "Audience Amplification",    desc: "Your coverage promoted across BIG CIO Show&apos;s website, social channels, and email newsletters." },
                ].map(b => (
                  <div key={b.num} className="bpt-benefit-card">
                    <div className="bpt-bnum">{b.num}</div>
                    <div className="bpt-btitle">{b.title}</div>
                    <div className="bpt-bdesc">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Content Opportunities</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["AI Leadership Trends", "CIO Interviews", "Digital Transformation Stories", "Cybersecurity Insights", "Enterprise Strategy", "Innovation Showcases", "Industry Reports", "Awards Coverage"].map(c => (
                  <span key={c} style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.20)", padding: "6px 14px", borderRadius: 8 }}>{c}</span>
                ))}
              </div>
            </div>

            <div className="bpt-cta">
              <div className="bpt-cta-inner">
                <h2>Become a <em>Media Partner</em></h2>
                <p>Amplify enterprise innovation stories. Join 350+ media organisations that have covered BIG CIO Show across 15 editions.</p>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                  Apply for Media Partnership
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ASSOCIATIONS */}
        {tab === "associations" && (
          <div className="bpt-body">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontSize: "clamp(20px,2.4vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 12 }}>
                Building Stronger Industry <span style={{ color: "var(--cyan)" }}>Ecosystems Together</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 580, margin: "0 auto", lineHeight: 1.75 }}>
                Collaborating with associations driving digital transformation. BIG CIO Show is not just an event — it is an ecosystem builder that amplifies association missions at scale.
              </p>
            </div>

            {/* Why Associations Partner */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Why Associations Partner With BIG CIO</div>
                <div className="bpt-section-rule" />
              </div>
              <div className="bpt-benefit-grid">
                {[
                  { num: "01", title: "Industry Visibility",        desc: "Co-brand your association with India&apos;s most influential CIO platform — reaching 8,500+ enterprise technology leaders." },
                  { num: "02", title: "Member Engagement",          desc: "Bring your members as a verified delegation — association-branded access, co-promotional communications, and on-site presence." },
                  { num: "03", title: "Strategic Networking",        desc: "Connect your members with enterprise decision-makers, technology providers, and ecosystem stakeholders in structured formats." },
                  { num: "04", title: "Thought Leadership",          desc: "Co-host panels, roundtables, and keynote sessions that elevate your association&apos;s policy agenda and industry voice." },
                  { num: "05", title: "Collaborative Initiatives",   desc: "Co-author research reports, benchmarking studies, and industry white papers that drive enterprise decisions." },
                  { num: "06", title: "Ecosystem Growth",           desc: "12-month co-marketing across BIG CIO&apos;s digital channels — website, newsletter, and LinkedIn reaching 100,000+ IT professionals." },
                ].map(b => (
                  <div key={b.num} className="bpt-benefit-card">
                    <div className="bpt-bnum">{b.num}</div>
                    <div className="bpt-btitle">{b.title}</div>
                    <div className="bpt-bdesc">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Types of Associations */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Types of Associations We Work With</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 16, padding: "32px 36px", marginBottom: 32 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["CIO Forums", "Technology Councils", "Chambers of Commerce", "Industry Bodies", "Innovation Clusters", "Startup Ecosystems", "Digital Transformation Networks", "Professional IT Associations"].map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.20)", padding: "6px 14px", borderRadius: 8 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Collaboration Opportunities */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Collaboration Opportunities</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
                {[
                  { title: "Co-Hosted Sessions",       desc: "Co-brand a panel or roundtable — your agenda, your speakers, your members in the room." },
                  { title: "Research Reports",          desc: "Co-author the annual CIO Benchmarking Report with member survey data and editorial perspective." },
                  { title: "Member Activations",        desc: "Dedicated on-site space for member meet-and-greet, membership drives, and association visibility." },
                  { title: "Awards Category",           desc: "Title an awards category aligned to your sector — healthcare IT, fintech, government technology." },
                  { title: "Community Outreach",        desc: "Joint campaigns, co-promotional communications, and shared digital reach across both ecosystems." },
                  { title: "Innovation Initiatives",    desc: "Co-develop innovation programmes, hackathons, or challenge initiatives within the BIG CIO ecosystem." },
                ].map(o => (
                  <div key={o.title} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "22px 20px" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{o.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text-body)", lineHeight: 1.65 }}>{o.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits for Members */}
            <div className="bpt-section">
              <div className="bpt-section-head">
                <div className="bpt-section-label">Benefits for Your Members</div>
                <div className="bpt-section-rule" />
              </div>
              <div style={{ background: "var(--bg-surface)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 16, padding: "32px 40px", marginBottom: 32 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                  {[
                    "Executive networking with India&apos;s largest CIO community",
                    "Learning opportunities across 40+ curated sessions",
                    "Visibility at India&apos;s most influential CIO gathering",
                    "Access to enterprise leaders and decision-makers",
                    "Strategic partnerships across industries",
                    "Preferred delegate access and pricing",
                  ].map(item => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12, color: "var(--text-body)", lineHeight: 1.65 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(192,132,252,0.05) 100%)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: 16, padding: "36px 40px", marginBottom: 48 }}>
              <h3 style={{ fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: 10 }}>
                Community <span style={{ color: "var(--cyan)" }}>Impact</span>
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.75, marginBottom: 16 }}>
                BIG CIO Show enables knowledge exchange, accelerates innovation, connects industries, and supports digital growth across India&apos;s enterprise technology ecosystem. Association partnerships amplify this impact beyond the event day.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Knowledge Exchange", "Innovation Acceleration", "Industry Connection", "Digital Growth", "Community Building"].map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.20)", padding: "6px 14px", borderRadius: 8 }}>{t}</span>
                ))}
              </div>
            </div>

            <div className="bpt-cta">
              <div className="bpt-cta-inner">
                <h2>Join the <em>BIG CIO Partner Ecosystem</em></h2>
                <p>Collaborate with enterprise leaders. Industry bodies, professional networks, and CIO councils partner with Big CIO Show to engage their members at India&apos;s largest CIO gathering.</p>
                <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-primary">
                  Become an Association Partner
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* STARTUPS */}
        {tab === "startups" && (
          <div className="bpt-body">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontSize: "clamp(20px,2.4vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 12 }}>
                Startups at Big CIO Show
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-body)", maxWidth: 580, margin: "0 auto", lineHeight: 1.75 }}>
                High-growth B2B startups attend, exhibit, and pitch at Big CIO Show — gaining direct access to enterprise buyers and investors from India&apos;s largest CIO community.
              </p>
            </div>
            <div className="bpt-benefit-grid">
              {[
                { num: "01", title: "Startup Zone Exhibition",  desc: "Dedicated Startup Zone on the exhibition floor — demo pods, lead scanning, and structured meetings with enterprise CIOs." },
                { num: "02", title: "Innovation Spotlight",     desc: "2-minute lightning pitches on the main stage between sessions — your product in front of 8,500+ technology decision-makers." },
                { num: "03", title: "Pitch Competition",        desc: "Apply for the Big CIO Startup Pitch — 8 selected startups pitch live to a CIO jury for prizes and co-marketing opportunities." },
                { num: "04", title: "Investor Introductions",   desc: "VCs and corporate venture arms attend Big CIO Show. Startup exhibitors are introduced to relevant investors through the event team." },
                { num: "05", title: "CIO Mentorship",          desc: "Winners of the Startup Pitch Competition receive a 12-month mentorship program with senior CIOs from India&apos;s largest organisations." },
                { num: "06", title: "Featured in CIO Report",  desc: "Top startups are featured in the post-event CIO Benchmarking Report, distributed to 100,000+ IT professionals." },
              ].map(b => (
                <div key={b.num} className="bpt-benefit-card">
                  <div className="bpt-bnum">{b.num}</div>
                  <div className="bpt-btitle">{b.title}</div>
                  <div className="bpt-bdesc">{b.desc}</div>
                </div>
              ))}
            </div>
            <div className="bpt-cta">
              <div className="bpt-cta-inner">
                <h2>Is your startup <em>enterprise-ready</em>?</h2>
                <p>Apply for the Startup Zone, the Pitch Competition, or general startup attendance at Big CIO Show 2026.</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/startups" className="bcio-btn-primary">
                    Explore Startup Opportunities
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
