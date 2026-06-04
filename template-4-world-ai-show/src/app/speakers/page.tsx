"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const speakers = [
  {
    name: "H.E. Prof. Dr. Pratikno",
    title: "Coordinating Minister of Human Development and Culture",
    org: "Republic of Indonesia",
    country: "Indonesia",
    img: "/images/speaker-pratikno.png",
    topic: "AI & National Policy",
    tag: "Keynote",
    bio: "Coordinating Minister of Human Development and Culture of the Republic of Indonesia. A senior statesman and academic leader shaping national policy on education, culture, and human capital development in Indonesia's digital transformation era.",
  },
  {
    name: "Vivi Yulaswati",
    title: "Deputy for Economic Affairs and Digital Transformation",
    org: "BAPPENAS",
    country: "Indonesia",
    img: "/images/speaker-vivi-yulaswati.png",
    topic: "AI & National Development Policy",
    tag: "Keynote",
    bio: "Led the formulation of Indonesia's National Action Plan for the SDGs, revision of the SDGs 2030 Roadmap, and Indonesia's Voluntary National Review to the UN. Key architect of national poverty reduction programs including PNPM and PKH, the National Strategy for Financial Inclusion, and the National Social Security System. Currently shaping the Economic Transformation agenda and Long-Term Development Plan 2020–2045.",
  },
  {
    name: "Sujala Pant",
    title: "Deputy Resident Representative",
    org: "UNDP Indonesia",
    country: "Indonesia",
    img: "/images/speaker-sujala-pant.png",
    topic: "Sustainable Development & AI",
    tag: "Keynote",
    bio: "Deputy Resident Representative at UNDP Indonesia since 2022, providing strategic leadership on sustainable development. With over two decades of experience across Asia-Pacific, the Arab States, and Eastern Europe, she specialises in governance, climate finance, and advancing inclusive, sustainable development.",
  },
  {
    name: "David Hardoon",
    title: "Former Chief Data Officer",
    org: "Monetary Authority of Singapore",
    country: "Singapore",
    img: "/images/speaker-david-hardoon.png",
    topic: "AI in Financial Regulation",
    tag: "Keynote",
    bio: "Former Chief Data Officer of the Monetary Authority of Singapore, one of Asia's most influential figures in AI governance, data strategy, and responsible AI deployment in financial services. A globally recognised thought leader on the intersection of AI, ethics, and regulatory frameworks.",
  },
  {
    name: "Wempi Saputra",
    title: "Executive Director",
    org: "The World Bank",
    country: "Indonesia",
    img: "/images/speaker-wempi-saputra.png",
    topic: "AI Policy & Governance",
    tag: "Panel",
    bio: "Executive Director at The World Bank, contributing to Indonesia's national AI policy and digital governance agenda. Brings extensive experience in public sector leadership and the development of regulatory frameworks that enable responsible AI deployment at a national scale.",
  },
  {
    name: "Eryk Budi Pratama",
    title: "Vice Chairman, AI & PDP Committee",
    org: "KADIN Indonesia",
    country: "Indonesia",
    img: "/images/speaker-eryk-pratama.png",
    topic: "AI Security & Data Protection",
    tag: "Panel",
    bio: "One of Indonesia's foremost professionals in cybersecurity, data protection & privacy, and AI GRC & Security. With over a decade of experience spanning strategy, regulation, implementation, and advisory roles across the private and public sectors. Serves as Vice Chairman of the Standing Committee for Artificial Intelligence & Personal Data Protection at KADIN Indonesia, Chairman of several think tanks, and a strategic advisor to various Indonesian government bodies shaping policy on Cybersecurity, Data Protection, and AI Governance.",
  },
  {
    name: "Charles Budiman",
    title: "Chief Digital Banking Officer",
    org: "PT. Bank Maybank Indonesia",
    country: "Indonesia",
    img: "/images/speaker-charles-budiman.png",
    topic: "AI in Digital Banking",
    tag: "Panel",
    bio: "Chief Digital Banking Officer at PT. Bank Maybank Indonesia, driving the bank's digital transformation strategy and AI adoption across retail and corporate banking. A senior banking executive with deep expertise in digital financial services across Southeast Asia.",
  },
  {
    name: "Sajal Bhatnagar",
    title: "Chief Digital Officer",
    org: "PT Allo Bank Indonesia Tbk",
    country: "Indonesia",
    img: "/images/speaker-sajal-bhatnagar.png",
    topic: "Digital Transformation & AI",
    tag: "Panel",
    bio: "Chief Digital Officer at PT Allo Bank Indonesia Tbk, leading digital innovation and AI strategy for one of Indonesia's fastest-growing digital banks. Bringing extensive experience in digital product development, data-driven banking, and AI-powered customer experience.",
  },
  {
    name: "Dr. Irvan Bastian Arief",
    title: "VP of Technology GRAND, Data and AI",
    org: "tiket.com",
    country: "Indonesia",
    img: "/images/speaker-irvan-arief.png",
    topic: "AI in E-Commerce & Travel",
    tag: "Panel",
    bio: "VP of Technology GRAND, Data and AI at tiket.com, one of Indonesia's leading online travel and lifestyle platforms. Leading large-scale AI and data platform initiatives that power personalisation, demand forecasting, and operational efficiency across millions of transactions.",
  },
  {
    name: "Mark Jefferson Go",
    title: "Chief Strategy, Research and Development Officer",
    org: "PT. Erajaya Swasembada, Tbk",
    country: "Indonesia",
    img: "/images/speaker-mark-jefferson-go.png",
    topic: "AI Strategy & Innovation",
    tag: "Panel",
    bio: "Chief Strategy, Research and Development Officer at PT. Erajaya Swasembada, Tbk, one of Indonesia's largest consumer electronics and technology distribution groups. Driving AI-enabled business strategy, product innovation, and digital transformation across the enterprise.",
  },
  {
    name: "Vikas Sinha",
    title: "Vice President Director",
    org: "Prudential Indonesia",
    country: "Indonesia",
    img: "/images/speaker-vikas-sinha.png",
    topic: "AI in Insurance & Financial Services",
    tag: "Panel",
    bio: "Vice President Director at Prudential Indonesia, one of the country's leading life insurance companies. A senior executive driving AI adoption, digital transformation, and data-driven innovation across Prudential's Indonesia operations.",
  },
  {
    name: "Nicholas T.",
    title: "Head of Retail Banking",
    org: "PT Bank Jago Tbk",
    country: "Indonesia",
    img: "/images/speaker-nicholas-t.png",
    topic: "AI in Financial Services",
    tag: "Panel",
    bio: "Head of Retail Banking at PT Bank Jago Tbk, driving AI-powered innovation in digital banking across Southeast Asia. Bringing deep expertise in retail banking transformation, customer experience design, and the deployment of intelligent financial services at scale.",
  },
  {
    name: "Edy Susanto",
    title: "IT Director",
    org: "PT. Trans Retail Indonesia",
    country: "Indonesia",
    img: "/images/speaker-edy-susanto.png",
    topic: "AI in Retail & Operations",
    tag: "Panel",
    bio: "IT Director at PT. Trans Retail Indonesia, one of the country's largest retail groups. Leading enterprise technology strategy and AI implementation across retail operations, supply chain, and customer experience at scale.",
  },
  {
    name: "Arie Purwanto",
    title: "Deputy Director of Data Science and Governance",
    org: "Badan Pemeriksa Keuangan",
    country: "Indonesia",
    img: "/images/speaker-arie-purwanto.png",
    topic: "AI Implementation at Scale",
    tag: "Panel",
    bio: "Deputy Director of Data Science and Governance at Badan Pemeriksa Keuangan (BPK), Indonesia's Supreme Audit Institution. Leading large-scale AI and data science initiatives across Indonesia's public sector, championing practical AI deployment strategies that deliver measurable impact.",
  },
  {
    name: "Dian Martin",
    title: "Chairman",
    org: "Indonesian AI Association",
    country: "Indonesia",
    img: "/images/speaker-dian-martin.png",
    topic: "Responsible AI & Talent Development",
    tag: "Panel",
    bio: "Chairman of the Indonesian AI Association, focusing on responsible AI adoption, talent development, and AI-driven digital transformation across industry and public sectors in Indonesia. Leading the national conversation on ethical AI deployment, workforce readiness, and building Indonesia's AI innovation ecosystem.",
  },
  {
    name: "Arief Setiawan",
    title: "Chief Technology Officer",
    org: "PT Asian Bulk Logistics",
    country: "Indonesia",
    img: "/images/speaker-arief-setiawan.png",
    topic: "Enterprise AI & Digital Transformation",
    tag: "Panel",
    bio: "Award-winning technology leader blending technology with business consulting to build efficient corporations and optimised business processes. Recognised as Best CTO of the Year 2024 by BusinessAsia, Top CIO on Digital Implementation 2024 & 2025 at TOP Digital Awards IT Works, and HR Excellence SWA Award 2021. Expert in profit centre management, IT consulting, and enterprise AI implementation.",
  },
  {
    name: "Andre E. Susanto",
    title: "Chief Technology Officer",
    org: "Quantum Power Asia",
    country: "Indonesia",
    img: "/images/speaker-andre-susanto.png",
    topic: "AI Infrastructure & Innovation",
    tag: "Panel",
    bio: "Chief Technology Officer at Quantum Power Asia, leading the development of next-generation AI infrastructure and quantum-ready technology solutions across Southeast Asia. A recognised technology innovator driving the intersection of advanced computing, artificial intelligence, and sustainable energy.",
  },
];

function SpeakerCard({ s, onSelect }: { s: typeof speakers[0]; onSelect: (s: typeof speakers[0]) => void }) {
  const [flipped, setFlipped] = useState(false);
  const isKeynote = s.tag === "Keynote";

  return (
    <div
      className="sc-wrap"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => onSelect(s)}
    >
      <div className={`sc-flipper${flipped ? " sc-flipped" : ""}`}>

        {/* FRONT */}
        <div className="sc-face sc-front">
          <div className="sc-photo">
            <Image
              src={s.img} alt={s.name} fill
              unoptimized={s.img.startsWith("http")}
              sizes="(max-width:640px) 50vw, (max-width:1200px) 33vw, 300px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
            <div className="sc-grad" />
            {isKeynote && <span className="sc-badge">Keynote</span>}
            <div className="sc-foot">
              <div className="sc-name">{s.name}</div>
              <div className="sc-role">{s.title}</div>
              <div className="sc-org">{s.org}</div>
            </div>
          </div>
        </div>

        {/* BACK — desktop hover only */}
        <div className="sc-face sc-back">
          <div className="sc-accent" style={{ background: isKeynote ? "#c0f43c" : "#1b9ad6" }} />
          <div className="sc-back-body">
            <div className="sc-back-top">
              <div className="sc-av">
                <Image src={s.img} alt={s.name} fill sizes="52px"
                  unoptimized={s.img.startsWith("http")}
                  style={{ objectFit: "cover", objectPosition: "top center" }} />
              </div>
              <div>
                <div className="sc-bname">{s.name}</div>
                <div className="sc-brole" style={{ color: isKeynote ? "#c0f43c" : "#1b9ad6" }}>{s.title}</div>
                <div className="sc-borg">{s.org}</div>
              </div>
            </div>
            <div className="sc-rule" />
            <div className="sc-topic">
              <span className="sc-topic-dot" style={{ background: isKeynote ? "#c0f43c" : "#1b9ad6" }} />
              {s.topic}
            </div>
            <p className="sc-bio">{s.bio}</p>
            <div className="sc-back-foot">
              <span className="sc-tag"
                style={{ background: isKeynote ? "rgba(192,244,60,0.12)" : "rgba(27,154,214,0.12)",
                         color: isKeynote ? "#c0f43c" : "#1b9ad6" }}>
                {s.tag} Speaker
              </span>
              <span className="sc-ctry">{s.country}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function SpeakerModal({ s, onClose }: { s: typeof speakers[0] | null; onClose: () => void }) {
  const isKeynote = s?.tag === "Keynote";
  const accent = s ? (isKeynote ? "#c0f43c" : "#1b9ad6") : "#1b9ad6";

  // Lock body scroll when open
  useEffect(() => {
    if (s) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [s]);

  if (!s) return null;

  return (
    <div className="sm-overlay" onClick={onClose}>
      <div className="sm-modal" onClick={e => e.stopPropagation()}>

        {/* Sticky top bar: accent + close */}
        <div className="sm-topbar">
          <div className="sm-accent-bar" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          <button className="sm-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Hero image */}
        <div className="sm-hero">
          <Image src={s.img} alt={s.name} fill sizes="(max-width:600px) 100vw, 480px"
            unoptimized={s.img.startsWith("http")}
            style={{ objectFit: "cover", objectPosition: "top center" }} />
          <div className="sm-hero-grad" />
          {isKeynote && <span className="sm-badge">Keynote</span>}
        </div>

        {/* Content */}
        <div className="sm-body">
          <div className="sm-tag-row">
            <span className="sm-tag" style={{ background: isKeynote ? "rgba(192,244,60,0.12)" : "rgba(27,154,214,0.12)", color: accent, border: `1px solid ${accent}40` }}>
              {s.tag} Speaker
            </span>
            <span className="sm-ctry">{s.country}</span>
          </div>

          <h2 className="sm-name">{s.name}</h2>
          <div className="sm-title" style={{ color: accent }}>{s.title}</div>
          <div className="sm-org">{s.org}</div>

          <div className="sm-rule" />

          <div className="sm-topic-row">
            <span className="sm-topic-dot" style={{ background: accent }} />
            <span className="sm-topic-text">{s.topic}</span>
          </div>

          <p className="sm-bio">{s.bio}</p>
        </div>

      </div>
    </div>
  );
}

export default function SpeakersPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeSpeaker, setActiveSpeaker] = useState<typeof speakers[0] | null>(null);
  const [liveSpeakers, setLiveSpeakers] = useState<typeof speakers>(speakers);
  const [loading, setLoading] = useState(true);

  // Fetch live speaker data from API (pulls from worldaishow.com)
  useEffect(() => {
    fetch("/api/speakers")
      .then(r => r.json())
      .then(data => {
        if (data.speakers && data.speakers.length > 0) {
          setLiveSpeakers(data.speakers);
        }
      })
      .catch(() => { /* silently fall back to hardcoded list */ })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    el.querySelectorAll(".reveal").forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [liveSpeakers]);

  return (
    <div ref={ref} className="sp-page">

      {/* Decorative elements */}
      <div className="sp-grid-bg" />
      <div className="sp-glow-tr" />
      <div className="sp-glow-bl" />

      <div className="sp-wrap">

        {/* ══ PAGE HEADER — compact, sits right above grid ══ */}
        <div className="sp-header">

          {/* Left: title block */}
          <div className="sp-header-left reveal">
            <div className="sp-eyebrow">
              <span className="sp-dot" />
              World AI Show Indonesia 2026 · Jakarta, 7–8 July
            </div>
            <h1 className="sp-h1">Confirmed<br /><span className="sp-h1-accent">Speakers</span></h1>
            <p className="sp-sub">Policymakers, enterprise leaders &amp; AI innovators — live on stage, shaping Indonesia&apos;s sovereign AI agenda.</p>
          </div>

          {/* Right: stats + action */}
          <div className="sp-header-right reveal reveal-delay-2">
            <div className="sp-stats">
              {[
                { n: String(liveSpeakers.length), l: "Confirmed" },
                { n: "2",  l: "Keynotes"  },
                { n: "2",  l: "Days"      },
                { n: "4",  l: "Themes"    },
              ].map((s, i) => (
                <div key={i} className="sp-stat">
                  <span className="sp-stat-n">{s.n}</span>
                  <span className="sp-stat-l">{s.l}</span>
                </div>
              ))}
            </div>
            <Link href="/enquire" className="sp-cta-btn">Apply to Speak</Link>
          </div>

        </div>

        {/* Thin rule between header and grid */}
        <div className="sp-divider reveal" />

        {/* ══ GRID — immediately below header ══ */}
        <div className="sp-grid">
          {liveSpeakers.map((s, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <SpeakerCard s={s} onSelect={setActiveSpeaker} />
            </div>
          ))}
        </div>

        {/* ══ FOOTER CTA ══ */}
        <div className="sp-footer reveal">
          <p className="sp-footer-text">
            More speakers to be announced. &nbsp;
            <Link href="/enquire" className="sp-footer-link">Register interest to speak →</Link>
          </p>
          <Link href="/agenda" className="sp-agenda-btn">View Full Agenda</Link>
        </div>

      </div>{/* /sp-wrap */}

      <SpeakerModal s={activeSpeaker} onClose={() => setActiveSpeaker(null)} />

      <style>{`
        /* ── Page shell ── */
        .sp-page {
          position: relative;
          background: #060b24;
          min-height: 100vh;
          overflow: hidden;
        }
        .sp-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(27,154,214,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,154,214,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .sp-glow-tr {
          position: absolute; top: -5%; right: -8%; pointer-events: none; z-index: 0;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(27,154,214,0.09) 0%, transparent 65%);
        }
        .sp-glow-bl {
          position: absolute; bottom: 10%; left: -5%; pointer-events: none; z-index: 0;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(192,244,60,0.05) 0%, transparent 65%);
        }

        /* ── Content wrapper ── */
        .sp-wrap {
          position: relative; z-index: 2;
          max-width: 1300px; margin: 0 auto;
          padding: 120px 40px 80px;
        }

        /* ══ Header ══ */
        .sp-header {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: flex-end;
          margin-bottom: 36px;
        }

        /* Left */
        .sp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-space); font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.3); letter-spacing: 0.14em; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .sp-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #c0f43c; flex-shrink: 0;
          animation: spDot 2.5s ease-in-out infinite;
        }
        @keyframes spDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.3; transform:scale(0.65); }
        }
        .sp-h1 {
          font-family: var(--font-space);
          font-size: clamp(44px, 6vw, 80px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.035em; line-height: 1.05;
          margin-bottom: 18px;
        }
        .sp-h1-accent {
          /* Gradient text */
          background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sp-sub {
          font-family: var(--font-inter);
          font-size: clamp(14px, 1.3vw, 16px);
          color: rgba(255,255,255,0.42); line-height: 1.7;
          max-width: 440px;
        }

        /* Right */
        .sp-header-right {
          display: flex; flex-direction: column; align-items: flex-end; gap: 20px;
          padding-bottom: 4px;
        }
        .sp-stats {
          display: flex; gap: 0;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; overflow: hidden;
          background: rgba(255,255,255,0.03);
        }
        .sp-stat {
          display: flex; flex-direction: column; align-items: center;
          padding: 14px 22px; gap: 3px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .sp-stat:last-child { border-right: none; }
        .sp-stat-n {
          font-family: var(--font-space); font-size: 28px; font-weight: 800;
          color: #c0f43c; line-height: 1;
        }
        .sp-stat-l {
          font-family: var(--font-inter); font-size: 10px; font-weight: 500;
          color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em;
        }
        .sp-cta-btn {
          font-family: var(--font-space); font-size: 13px; font-weight: 700;
          color: #1a1f4e; background: #c0f43c;
          padding: 11px 24px; border-radius: 100px;
          display: inline-block; white-space: nowrap;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 16px rgba(192,244,60,0.25);
        }
        .sp-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 20px rgba(192,244,60,0.55), 0 8px 24px rgba(192,244,60,0.3); }

        /* ── Divider ── */
        .sp-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(27,154,214,0.4), rgba(192,244,60,0.25), transparent);
          margin-bottom: 36px;
        }

        /* ══ Speaker grid ══ */
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 56px;
        }

        /* ── Flip card ── */
        .sc-wrap {
          perspective: 1100px;
          height: 390px;
          cursor: pointer;
          transition: filter 0.3s;
        }
        .sc-wrap:hover {
          filter: drop-shadow(0 0 16px rgba(27,154,214,0.45)) drop-shadow(0 0 32px rgba(27,154,214,0.18));
        }
        .sc-flipper {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
          border-radius: 16px;
        }
        .sc-flipped { transform: rotateY(180deg); }
        .sc-face {
          position: absolute; inset: 0; border-radius: 16px; overflow: hidden;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }

        /* Front */
        .sc-photo { position: relative; width: 100%; height: 100%; background: #0a1030; }
        .sc-grad {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to bottom, transparent 30%, rgba(3,7,26,0.55) 62%, rgba(3,7,26,0.97) 100%);
        }
        .sc-badge {
          position: absolute; top: 12px; right: 12px; z-index: 3;
          font-family: var(--font-space); font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          background: #c0f43c; color: #1a1f4e;
          padding: 3px 9px; border-radius: 100px;
        }
        .sc-foot {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
          padding: 14px 16px 18px;
        }
        .sc-name {
          font-family: var(--font-space); font-size: 15px; font-weight: 700;
          color: #fff; line-height: 1.2; margin-bottom: 3px;
        }
        .sc-role {
          font-family: var(--font-inter); font-size: 11px;
          color: rgba(255,255,255,0.5); margin-bottom: 2px; line-height: 1.3;
        }
        .sc-org {
          font-family: var(--font-inter); font-size: 11px; font-weight: 600; color: #1b9ad6;
        }

        /* Back */
        .sc-back {
          background: #0c1236;
          border: 1px solid rgba(255,255,255,0.07);
          transform: rotateY(180deg);
          display: flex; flex-direction: column;
        }
        .sc-accent { height: 3px; flex-shrink: 0; }
        .sc-back-body {
          flex: 1; display: flex; flex-direction: column;
          padding: 18px 18px 16px; overflow: hidden;
        }
        .sc-back-top {
          display: flex; gap: 11px; align-items: flex-start; margin-bottom: 12px;
        }
        .sc-av {
          position: relative; width: 50px; height: 50px; flex-shrink: 0;
          border-radius: 10px; overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.1);
        }
        .sc-bname {
          font-family: var(--font-space); font-size: 13.5px; font-weight: 700;
          color: #fff; line-height: 1.2; margin-bottom: 2px;
        }
        .sc-brole {
          font-family: var(--font-inter); font-size: 11px; font-weight: 600;
          line-height: 1.3; margin-bottom: 1px;
        }
        .sc-borg {
          font-family: var(--font-inter); font-size: 10px;
          color: rgba(255,255,255,0.3); line-height: 1.3;
        }
        .sc-rule { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 10px; flex-shrink: 0; }
        .sc-topic {
          display: flex; align-items: center; gap: 6px; margin-bottom: 9px; flex-shrink: 0;
          font-family: var(--font-inter); font-size: 9.5px; font-weight: 700;
          color: rgba(255,255,255,0.32); text-transform: uppercase; letter-spacing: 0.12em;
        }
        .sc-topic-dot { width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; }
        .sc-bio {
          font-family: var(--font-inter); font-size: 11.5px; color: rgba(255,255,255,0.48);
          line-height: 1.7; flex: 1;
          overflow: hidden;
          display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical;
        }
        .sc-back-foot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 10px; flex-shrink: 0;
        }
        .sc-tag {
          font-family: var(--font-space); font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          border-radius: 100px; padding: 3px 10px;
        }
        .sc-ctry {
          font-family: var(--font-inter); font-size: 9.5px;
          color: rgba(255,255,255,0.18); letter-spacing: 0.06em;
        }

        /* ── Footer ── */
        .sp-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap; gap: 20px;
        }
        .sp-footer-text {
          font-family: var(--font-inter); font-size: 14px;
          color: rgba(255,255,255,0.32);
        }
        .sp-footer-link {
          color: #c0f43c; font-weight: 600;
          transition: opacity 0.18s;
        }
        .sp-footer-link:hover { opacity: 0.75; }
        .sp-agenda-btn {
          font-family: var(--font-space); font-size: 13px; font-weight: 600;
          color: #fff; border: 1.5px solid rgba(255,255,255,0.18);
          padding: 10px 24px; border-radius: 100px;
          display: inline-block; white-space: nowrap;
          transition: border-color 0.18s;
        }
        .sp-agenda-btn:hover { border-color: rgba(255,255,255,0.55); box-shadow: 0 0 16px rgba(255,255,255,0.10); }

        /* ── Speaker modal (full screen popup) ── */
        .sm-overlay {
          position: fixed; inset: 0; z-index: 1100;
          background: rgba(4,8,28,0.88);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: sm-fade-in 0.25s ease both;
        }
        @keyframes sm-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .sm-modal {
          position: relative;
          background: #0c1236;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          width: 100%; max-width: 480px;
          max-height: 92vh;
          overflow-y: auto;
          animation: sm-slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
        @media (max-width: 480px) {
          .sm-overlay { padding: 0; align-items: flex-end; }
          .sm-modal { max-width: 100%; max-height: 95vh; border-radius: 20px 20px 0 0; }
          .sm-topbar { border-radius: 20px 20px 0 0; }
          .sm-accent-bar { border-radius: 20px 20px 0 0; }
          .sm-close { width: 46px; height: 46px; }
        }
        @keyframes sm-slide-up {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: none; }
        }
        .sm-topbar {
          position: sticky; top: 0; z-index: 10;
          display: flex; flex-direction: row;
          align-items: center; justify-content: flex-end;
          background: #0c1236;
          border-radius: 24px 24px 0 0;
          padding: 14px 14px 10px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          min-height: 56px;
        }
        .sm-accent-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 4px; border-radius: 24px 24px 0 0; flex-shrink: 0;
        }
        .sm-close {
          background: rgba(255,255,255,0.18); border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 50%; width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .sm-close:hover { background: rgba(255,255,255,0.32); transform: scale(1.08); }
        .sm-close svg { stroke-width: 2.5; }
        .sm-hero {
          position: relative; width: 100%; height: 340px;
          background: #0a1030; overflow: hidden;
        }
        .sm-hero-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(12,18,54,0.1) 0%, transparent 25%, transparent 55%, #0c1236 100%);
          z-index: 1;
        }
        @media (max-width: 480px) {
          .sm-hero { height: 55vw; min-height: 260px; }
        }
        .sm-badge {
          position: absolute; top: 12px; left: 12px; z-index: 2;
          font-family: var(--font-space); font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          background: #c0f43c; color: #1a1f4e; padding: 3px 10px; border-radius: 100px;
        }
        .sm-body { padding: 0 24px 32px; }
        .sm-tag-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .sm-tag {
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; border-radius: 100px; padding: 4px 12px;
        }
        .sm-ctry { font-family: var(--font-inter); font-size: 11px; color: rgba(255,255,255,0.25); }
        .sm-name { font-family: var(--font-space); font-size: 24px; font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 6px; }
        .sm-title { font-family: var(--font-inter); font-size: 13px; font-weight: 600; margin-bottom: 4px; line-height: 1.4; }
        .sm-org { font-family: var(--font-inter); font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 20px; }
        .sm-rule { height: 1px; background: rgba(255,255,255,0.07); margin-bottom: 16px; }
        .sm-topic-row { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
        .sm-topic-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .sm-topic-text { font-family: var(--font-inter); font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.12em; }
        .sm-bio { font-family: var(--font-inter); font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.8; }

        /* Disable flip on mobile — tap opens modal */
        @media (max-width: 900px) {
          .sc-flipper { transition: none !important; }
          .sc-flipped { transform: none !important; }
          .sc-back { display: none; }
          .sc-wrap { cursor: pointer; }
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .sp-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .sp-wrap { padding: 110px 28px 64px; }
          .sp-header { grid-template-columns: 1fr; gap: 28px; }
          .sp-header-right { align-items: flex-start; }
          .sp-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .sc-wrap { height: 360px; }
        }
        @media (max-width: 560px) {
          .sp-wrap { padding: 100px 16px 56px; }
          .sp-h1 { font-size: 42px; }
          .sp-stats { flex-wrap: wrap; }
          .sp-grid { gap: 10px; }
          .sc-wrap { height: 330px; }
          .sc-name { font-size: 13px; }
          .sp-footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
