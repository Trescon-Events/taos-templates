"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const HS_PORTAL_ID  = "2953901";
const HS_FORM_ID    = "a6e0172c-e29d-4e0c-8549-94bc8b4e8ec6";

function AwardsNominationForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const init = () => {
      if (typeof (window as any).hbspt === "undefined") return;
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";
      (window as any).hbspt.forms.create({
        portalId: HS_PORTAL_ID,
        formId: HS_FORM_ID,
        region: "na1",
        target: "#hs-awards-nomination",
      });
    };

    if (typeof (window as any).hbspt !== "undefined") {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "//js.hsforms.net/forms/embed/v2.js";
      script.charset = "utf-8";
      script.onload = () => setTimeout(init, 100);
      document.head.appendChild(script);
    }
  }, []);

  return <div id="hs-awards-nomination" ref={containerRef} style={{ minHeight: 120 }} />;
}

const whyNominate = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: "Premier Thought Leadership",
    desc: "Position yourself as a benchmark-setter in India's most prestigious CX recognition programme — watched by 400+ senior industry leaders.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Elite Networking",
    desc: "Connect with India's top CX practitioners, technology innovators and C-suite leaders under one roof at the awards ceremony.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "Global Recognition",
    desc: "Showcase your achievements to the global CX community — award credentials recognised across the 14th Global Edition of World CX Summit.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: "Benchmark Your Excellence",
    desc: "The awards were conceptualized in collaboration with global CX thought leaders — winning validates your impact against the industry's highest standards.",
  },
];

const criteria = [
  { label: "Concept", desc: "The originality and vision behind the initiative or leadership approach." },
  { label: "Purpose & Necessity", desc: "How clearly the project or role addresses a real business or customer need." },
  { label: "Technologies Utilised", desc: "The sophistication and relevance of tools and platforms deployed." },
  { label: "Degree of Innovation", desc: "How significantly the work advances beyond conventional practice." },
  { label: "Project Outcomes", desc: "Measurable business and customer results achieved." },
  { label: "Market Acceptance", desc: "The broader industry impact and adoption of the initiative." },
];

const jury = [
  {
    name: "Dr. Satyam Priyadarshy",
    title: "Founder",
    company: "ReIgnite Future",
    initials: "SP",
  },
  {
    name: "Dr. Ganesh Natarajan",
    title: "Founder & Chairman",
    company: "5F World | Chairman, Honeywell Automation | Board Director, SBI Payments",
    initials: "GN",
  },
];

const steps = [
  { num: "01", label: "Register", desc: "Register as an approved delegate at World CX Summit & Awards 2026." },
  { num: "02", label: "Nominate", desc: "Fill in the nomination form with your achievements, metrics and impact." },
  { num: "03", label: "Review", desc: "Our advisory jury evaluates every submission against the selection parameters." },
  { num: "04", label: "Celebrate", desc: "Winners announced and honoured live on stage — 4 June 2026, Bengaluru." },
];

export default function AwardsPage() {
  return (
    <>
      <style>{`
        .aw-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 72px;
        }

        /* ── Hero ── */
        .aw-hero {
          position: relative;
          overflow: hidden;
          background: #060F1C;
          text-align: center;
        }
        /* Subtle vignette corners */
        .aw-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(8,6,22,0.35) 100%);
          pointer-events: none; z-index: 2;
        }
        /* Bottom shimmer line */
        .aw-hero::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold) 40%, var(--gold) 60%, transparent);
          opacity: 0.35;
          z-index: 3;
        }

        /* Full-bleed background image */
        .aw-hero-bg {
          position: absolute; inset: 0;
          background-image: url('/awards/waia.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          z-index: 0;
        }
        /* Dark overlay — preserves readability */
        .aw-hero-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(8,6,22,0.60) 0%, rgba(8,6,22,0.45) 40%, rgba(8,6,22,0.80) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* Award logo strip floating on top of photo */
        .aw-hero-banner {
          position: relative; z-index: 2;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          padding: 80px 40px 32px;
        }
        .aw-hero-banner img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          max-height: 260px;
          filter: drop-shadow(0 4px 32px rgba(0,0,0,0.60));
        }

        .aw-hero-inner {
          max-width: 820px; margin: 0 auto;
          padding: 0 40px 88px;
          position: relative; z-index: 2;
        }

        /* ── Why Nominate bg ── */
        .aw-section-alt-img {
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .aw-section-alt-img-bg {
          position: absolute; inset: 0;
          background-image: url('/awards/why-nominate.jpg');
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        .aw-section-alt-img-overlay {
          position: absolute; inset: 0;
          background: rgba(15,30,56,0.90);
          z-index: 1;
        }
        .aw-section-alt-img > .aw-section { position: relative; z-index: 2; }

        /* ── Eligibility bg ── */
        .aw-section-elig-img {
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .aw-section-elig-img-bg {
          position: absolute; inset: 0;
          background-image: url('/awards/awards-eligibility.jpg');
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        .aw-section-elig-img-overlay {
          position: absolute; inset: 0;
          background: rgba(8,6,22,0.88);
          z-index: 1;
        }
        .aw-section-elig-img > .aw-section { position: relative; z-index: 2; }
        .aw-trophy {
          display: flex; justify-content: center;
          margin-bottom: 28px;
        }
        .aw-trophy-icon {
          width: 72px; height: 72px;
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--gold);
          background: rgba(201,168,76,0.06);
          box-shadow: 0 0 40px rgba(201,168,76,0.15), 0 0 80px rgba(201,168,76,0.06);
          animation: aw-pulse 3s ease-in-out infinite;
        }
        @keyframes aw-pulse {
          0%,100% { box-shadow: 0 0 40px rgba(201,168,76,0.15), 0 0 80px rgba(201,168,76,0.06); }
          50%      { box-shadow: 0 0 60px rgba(201,168,76,0.28), 0 0 120px rgba(201,168,76,0.10); }
        }
        .aw-overline {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 20px;
        }
        .aw-overline::before, .aw-overline::after {
          content: ''; width: 28px; height: 1px;
          background: var(--gold); flex-shrink: 0; opacity: 0.60;
        }
        .aw-h1 {
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.12; color: #fff; margin: 0 0 16px;
        }
        .aw-h1 span { color: var(--gold); }
        .aw-sub {
          font-size: 18px; color: var(--text-body);
          line-height: 1.65; max-width: 600px;
          margin: 0 auto 36px;
        }
        .aw-hero-meta {
          display: flex; align-items: center; justify-content: center;
          gap: 32px; flex-wrap: wrap;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 36px;
        }
        .aw-hero-meta span { display: flex; align-items: center; gap: 8px; }
        .aw-hero-meta svg { color: var(--gold); }
        .aw-hero-meta-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(201,168,76,0.35);
        }
        .aw-hero-btns {
          display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
        }

        /* ── Section shell ── */
        .aw-section {
          max-width: 1240px; margin: 0 auto;
          padding: 80px 40px;
        }
        .aw-section-alt {
          background: var(--bg-surface);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .aw-section-alt .aw-section { padding: 80px 40px; }

        .aw-sec-head {
          text-align: center; margin-bottom: 56px;
        }
        .aw-sec-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 14px;
        }
        .aw-sec-overline::before, .aw-sec-overline::after {
          content: ''; width: 20px; height: 1px; background: var(--gold); opacity: 0.50;
        }
        .aw-sec-h2 {
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.1; margin: 0;
        }
        .aw-sec-h2 span { color: var(--gold); }
        .aw-sec-sub {
          font-size: 15px; color: var(--text-body);
          line-height: 1.75; max-width: 560px;
          margin: 14px auto 0;
        }

        /* ── Award categories ── */
        .aw-awards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .aw-award-card {
          background: #060F1C;
          border: 1px solid rgba(201,168,76,0.15);
          padding: 48px 44px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .aw-award-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--coral), transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s ease;
        }
        .aw-award-card:hover {
          border-color: rgba(201,168,76,0.35);
          box-shadow: 0 0 40px rgba(201,168,76,0.12), 0 20px 60px rgba(0,0,0,0.5);
        }
        .aw-award-card:hover::before { transform: scaleX(1); }

        /* Glow orb in corner */
        .aw-award-card::after {
          content: '';
          position: absolute; bottom: -60px; right: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .aw-award-num {
          font-size: 11px; font-weight: 800; letter-spacing: 0.18em;
          color: rgba(201,168,76,0.40); margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .aw-award-num::after {
          content: ''; flex: 1; max-width: 40px; height: 1px;
          background: rgba(201,168,76,0.20);
        }
        .aw-award-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--gold);
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.20);
          padding: 6px 14px; margin-bottom: 24px;
        }
        .aw-award-h3 {
          font-size: clamp(20px, 2.5vw, 30px);
          font-weight: 900; letter-spacing: -0.02em;
          color: #fff; line-height: 1.2; margin-bottom: 18px;
        }
        .aw-award-h3 span { color: var(--gold); }
        .aw-award-desc {
          font-size: 14px; color: var(--text-body);
          line-height: 1.80; margin-bottom: 32px;
        }

        /* ── Why Nominate ── */
        .aw-why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .aw-why-card {
          background: rgba(10,22,40,0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.10);
          padding: 32px 28px;
          display: flex; gap: 20px;
          position: relative; overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .aw-why-card::before {
          content: '';
          position: absolute; top: 0; left: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--gold), transparent);
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.4s ease;
        }
        .aw-why-card:hover {
          border-color: rgba(201,168,76,0.25);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .aw-why-card:hover::before { transform: scaleY(1); }
        .aw-why-icon {
          width: 48px; height: 48px; flex-shrink: 0;
          border: 1px solid rgba(201,168,76,0.20);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); background: rgba(201,168,76,0.06);
        }
        .aw-why-title {
          font-size: 15px; font-weight: 800; color: #fff;
          letter-spacing: -0.01em; margin-bottom: 8px;
        }
        .aw-why-desc {
          font-size: 13px; color: var(--text-body); line-height: 1.7;
        }

        /* ── Nomination steps ── */
        .aw-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }
        .aw-steps::before {
          content: '';
          position: absolute;
          top: 36px; left: 12.5%; right: 12.5%;
          height: 1px;
          background: linear-gradient(90deg, var(--gold) 0%, rgba(201,168,76,0.20) 100%);
          z-index: 0;
        }
        .aw-step {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; padding: 0 24px;
          position: relative; z-index: 1;
        }
        .aw-step-num {
          width: 72px; height: 72px; border-radius: 50%;
          background: #060F1C;
          border: 1px solid rgba(201,168,76,0.30);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 900; letter-spacing: -0.02em;
          color: var(--gold);
          margin-bottom: 20px;
          box-shadow: 0 0 24px rgba(201,168,76,0.12);
        }
        .aw-step-label {
          font-size: 13px; font-weight: 800; color: #fff;
          letter-spacing: -0.01em; margin-bottom: 8px;
        }
        .aw-step-desc {
          font-size: 12px; color: var(--text-body); line-height: 1.7;
        }

        /* ── Selection criteria ── */
        .aw-criteria-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .aw-crit-card {
          background: var(--bg-surface);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 28px 24px;
          position: relative; overflow: hidden;
          transition: border-color 0.3s;
        }
        .aw-crit-card:hover { border-color: rgba(201,168,76,0.25); }
        .aw-crit-num {
          font-size: 36px; font-weight: 900; letter-spacing: -0.05em;
          color: rgba(201,168,76,0.08);
          position: absolute; top: 12px; right: 16px;
          line-height: 1; user-select: none;
        }
        .aw-crit-label {
          font-size: 13px; font-weight: 800; color: var(--gold);
          letter-spacing: -0.01em; margin-bottom: 8px;
        }
        .aw-crit-desc { font-size: 12.5px; color: var(--text-body); line-height: 1.7; }

        /* ── Jury ── */
        .aw-jury-grid {
          display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;
        }
        .aw-jury-card {
          background: #060F1C;
          border: 1px solid rgba(201,168,76,0.15);
          padding: 36px 32px; text-align: center;
          width: 300px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .aw-jury-card:hover {
          border-color: rgba(201,168,76,0.35);
          box-shadow: 0 0 32px rgba(201,168,76,0.10);
        }
        .aw-jury-avatar {
          width: 120px; height: 120px; border-radius: 50%;
          border: 2px solid rgba(201,168,76,0.35);
          overflow: hidden;
          margin: 0 auto 18px;
          box-shadow: 0 0 28px rgba(201,168,76,0.18);
          background: #fff;
        }
        .aw-jury-avatar img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top center;
          display: block;
          mix-blend-mode: multiply;
        }
        .aw-jury-name {
          font-size: 15px; font-weight: 800; color: #fff;
          letter-spacing: -0.01em; margin-bottom: 6px;
        }
        .aw-jury-title { font-size: 12px; color: var(--coral); margin-bottom: 4px; }
        .aw-jury-company { font-size: 11px; color: var(--text-muted); line-height: 1.5; }

        /* ── Eligibility box ── */
        .aw-eligibility {
          background: rgba(8,6,22,0.80);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(201,168,76,0.18);
          padding: 48px;
          position: relative; overflow: hidden;
        }
        .aw-eligibility::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--coral), transparent);
        }
        .aw-eligibility-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: start;
        }
        .aw-elig-h3 {
          font-size: 22px; font-weight: 900; color: #fff;
          letter-spacing: -0.02em; margin-bottom: 20px;
        }
        .aw-elig-h3 span { color: var(--gold); }
        .aw-elig-list {
          list-style: none; display: flex; flex-direction: column; gap: 14px;
          margin-bottom: 32px;
        }
        .aw-elig-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 13.5px; color: var(--text-body); line-height: 1.6;
        }
        .aw-elig-item::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0; margin-top: 6px;
        }

        /* ── Bottom CTA ── */
        .aw-cta-strip {
          background: linear-gradient(120deg, #0A1628 0%, #0F3A36 50%, #0A2040 100%);
          padding: 72px 40px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .aw-cta-strip::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 80% at 50% 120%, rgba(0,0,0,0.30) 0%, transparent 60%);
          pointer-events: none;
        }
        .aw-cta-inner { max-width: 640px; margin: 0 auto; position: relative; z-index: 2; }
        .aw-cta-h2 {
          font-size: clamp(26px, 4vw, 44px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.1; margin-bottom: 14px;
        }
        .aw-cta-p { font-size: 15px; color: rgba(255,255,255,0.80); line-height: 1.7; margin-bottom: 32px; }
        .aw-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .aw-btn-white {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase;
          background: #fff; color: #0A1628;
          padding: 14px 28px; text-decoration: none;
          transition: background 0.25s, transform 0.25s;
          border: none;
        }
        .aw-btn-white:hover { background: rgba(255,255,255,0.88); transform: translateY(-1px); }
        .aw-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase;
          background: rgba(0,0,0,0.20); color: #fff;
          border: 1px solid rgba(255,255,255,0.40);
          padding: 14px 28px; text-decoration: none;
          transition: background 0.25s, border-color 0.25s;
        }
        .aw-btn-ghost:hover { background: rgba(0,0,0,0.35); border-color: rgba(255,255,255,0.70); }

        @media (max-width: 1024px) {
          .aw-awards-grid { grid-template-columns: 1fr; }
          .aw-why-grid { grid-template-columns: 1fr; }
          .aw-steps { grid-template-columns: repeat(2, 1fr); gap: 32px; }
          .aw-steps::before { display: none; }
          .aw-criteria-grid { grid-template-columns: repeat(2, 1fr); }
          .aw-eligibility-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 640px) {
          .aw-hero { padding: 72px 24px 64px; }
          .aw-section { padding: 56px 24px; }
          .aw-criteria-grid { grid-template-columns: 1fr; }
          .aw-steps { grid-template-columns: 1fr; }
          .aw-jury-card { width: 100%; }
          .aw-eligibility { padding: 32px 24px; }
          .aw-cta-strip { padding: 56px 24px; }
          .aw-award-card { padding: 32px 28px; }
        }
      `}</style>

      <div className="aw-page">

        {/* ── Hero ── */}
        <div className="aw-hero">
          <div className="aw-hero-bg" />
          <div className="aw-hero-overlay" />
          {/* Awards graphic from the official site */}
          <div className="aw-hero-banner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/awards/cx-awards-logo.png" alt="World CX Summit & Awards 2026" />
          </div>

          <div className="aw-hero-inner">
            <div className="aw-overline">World CX Summit &amp; Awards · Bengaluru 2026</div>
            <h1 className="aw-h1">
              Recognising <span>Excellence</span><br />in Customer Experience
            </h1>
            <p className="aw-sub">
              Honouring India&apos;s top 100 CX leaders and marketing innovators at the 14th Global Edition of World CX Summit — 4 June 2026, Bengaluru.
            </p>
            <div className="aw-hero-meta">
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                4 June 2026
              </span>
              <div className="aw-hero-meta-dot" />
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Bengaluru, India
              </span>
              <div className="aw-hero-meta-dot" />
              <span>14th Global Edition</span>
            </div>
            <div className="aw-hero-btns">
              <a href="/awards#nominate" className="wcx-btn-gold">
                Nominate Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="https://konfhub.com/checkout/world-cx-summit-awards?ticketId=93844%7C1%3B&selectedCode=MKTWEBSITE" target="_blank" rel="noopener noreferrer" className="wcx-btn-outline">
                Get Your Pass
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Award Categories ── */}
        <div className="aw-section">
          <div className="aw-sec-head">
            <div className="aw-sec-overline">The Awards</div>
            <h2 className="aw-sec-h2">Two <span>Prestigious</span> Awards Programmes</h2>
            <p className="aw-sec-sub">
              Each award benchmarks excellence against the highest industry standards — evaluated by an independent jury of global CX thought leaders.
            </p>
          </div>

          <div className="aw-awards-grid">
            {/* Award 1 */}
            <div className="aw-award-card">
              <div className="aw-award-num">01</div>
              <div className="aw-award-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Flagship Award
              </div>
              <h3 className="aw-award-h3">Top 100 <span>CX Leaders</span><br />in India Award</h3>
              <p className="aw-award-desc">
                Celebrating CX professionals for industry leadership, strategic influence and their significant contribution towards delivering excellence and innovation in the CX space. We aim to benchmark CX excellence and innovation in India and recognise the immense talent within the industry — the true flag bearers of customer experience.
              </p>
              <a href="/awards#nominate" className="wcx-btn-gold">
                Nominate for CX Award
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            {/* Award 2 */}
            <div className="aw-award-card">
              <div className="aw-award-num">02</div>
              <div className="aw-award-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Marketing Award
              </div>
              <h3 className="aw-award-h3">Marketing <span>Leader</span><br />Awards</h3>
              <p className="aw-award-desc">
                Honouring marketing visionaries for their industry leadership, strategic impact, and substantial contributions in advancing excellence and innovation within the marketing sphere. Recognising the leaders and innovators who are redefining how brands connect with customers in India&apos;s fast-evolving marketplace.
              </p>
              <a href="/awards#nominate" className="wcx-btn-outline">
                Nominate for Marketing Award
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Why Nominate ── */}
        <div className="aw-section-alt-img">
          <div className="aw-section-alt-img-bg" />
          <div className="aw-section-alt-img-overlay" />
          <div className="aw-section">
            <div className="aw-sec-head">
              <div className="aw-sec-overline">Why Nominate</div>
              <h2 className="aw-sec-h2">What <span>Winning</span> Means</h2>
              <p className="aw-sec-sub">
                A World CX Award is not just a trophy — it is a career-defining credential recognised across India&apos;s entire CX ecosystem.
              </p>
            </div>
            <div className="aw-why-grid">
              {whyNominate.map((w) => (
                <div key={w.title} className="aw-why-card">
                  <div className="aw-why-icon">{w.icon}</div>
                  <div>
                    <div className="aw-why-title">{w.title}</div>
                    <div className="aw-why-desc">{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── How to Nominate ── */}
        <div className="aw-section">
          <div className="aw-sec-head">
            <div className="aw-sec-overline">Nomination Process</div>
            <h2 className="aw-sec-h2">How to <span>Nominate</span></h2>
            <p className="aw-sec-sub">Four simple steps from nomination to standing on stage at Bengaluru&apos;s most prestigious CX gathering.</p>
          </div>
          <div className="aw-steps">
            {steps.map((s) => (
              <div key={s.num} className="aw-step">
                <div className="aw-step-num">{s.num}</div>
                <div className="aw-step-label">{s.label}</div>
                <div className="aw-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Selection Criteria ── */}
        <div className="aw-section-alt">
          <div className="aw-section">
            <div className="aw-sec-head">
              <div className="aw-sec-overline">Evaluation Framework</div>
              <h2 className="aw-sec-h2">Winner Selection <span>Parameters</span></h2>
              <p className="aw-sec-sub">Every nomination is assessed against six rigorous criteria by our independent advisory jury.</p>
            </div>
            <div className="aw-criteria-grid">
              {criteria.map((c, i) => (
                <div key={c.label} className="aw-crit-card">
                  <div className="aw-crit-num">0{i + 1}</div>
                  <div className="aw-crit-label">{c.label}</div>
                  <div className="aw-crit-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Jury ── */}
        <div className="aw-section">
          <div className="aw-sec-head">
            <div className="aw-sec-overline">Awards Jury</div>
            <h2 className="aw-sec-h2">Judged by <span>Industry Leaders</span></h2>
            <p className="aw-sec-sub">Our independent jury comprises some of the most respected names in CX, technology, and business leadership.</p>
          </div>
          <div className="aw-jury-grid">
            <div className="aw-jury-card">
              <div className="aw-jury-avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/awards/satyam.png" alt="Dr. Satyam Priyadarshy" />
              </div>
              <div className="aw-jury-name">Dr. Satyam Priyadarshy</div>
              <div className="aw-jury-title">Founder</div>
              <div className="aw-jury-company">ReIgnite Future</div>
            </div>
            <div className="aw-jury-card">
              <div className="aw-jury-avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/awards/ganesh.png" alt="Dr. Ganesh Natarajan" />
              </div>
              <div className="aw-jury-name">Dr. Ganesh Natarajan</div>
              <div className="aw-jury-title">Founder &amp; Chairman</div>
              <div className="aw-jury-company">5F World · Chairman, Honeywell Automation · Board Director, SBI Payments</div>
            </div>
          </div>
        </div>

        {/* ── Eligibility ── */}
        <div className="aw-section-elig-img">
          <div className="aw-section-elig-img-bg" />
          <div className="aw-section-elig-img-overlay" />
          <div className="aw-section">
            <div className="aw-sec-head">
              <div className="aw-sec-overline">Terms &amp; Eligibility</div>
              <h2 className="aw-sec-h2">Are You <span>Eligible?</span></h2>
            </div>
            <div className="aw-eligibility">
              <div className="aw-eligibility-grid">
                <div>
                  <div className="aw-elig-h3">Eligibility <span>Criteria</span></div>
                  <ul className="aw-elig-list">
                    <li className="aw-elig-item">Nominees must register as approved participants of World CX Summit &amp; Awards 2026.</li>
                    <li className="aw-elig-item">Participants must be employees or shareholders at a registered company in India or abroad.</li>
                    <li className="aw-elig-item">Nominations must demonstrate excellence and innovation in CX or Marketing.</li>
                    <li className="aw-elig-item">The advisory committee reserves the right to approve or reject any nomination at its discretion.</li>
                  </ul>
                  <a href="#nominate" className="wcx-btn-gold">
                    Submit Nomination
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
                <div>
                  <div className="aw-elig-h3">What You <span>Need to Know</span></div>
                  <ul className="aw-elig-list">
                    <li className="aw-elig-item">Awards are co-hosted alongside the 14th Global Edition of World CX Summit on 4 June 2026 in Bengaluru.</li>
                    <li className="aw-elig-item">The awards programme was conceptualized in collaboration with global CX thought leaders and industry practitioners.</li>
                    <li className="aw-elig-item">Winners receive recognition at the live ceremony attended by 400+ senior CX and technology leaders.</li>
                    <li className="aw-elig-item">Award credentials are promoted across Trescon&apos;s global CX network and media partners.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Nomination Form ── */}
        <div id="nominate" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "72px 40px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14 }}>Nominations Open</div>
            <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 12 }}>
              Submit Your Nomination
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 36 }}>
              Fill in the form below and our awards committee will review your entry and get back to you within 3 business days.
            </p>
            <AwardsNominationForm />
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="aw-cta-strip">
          <div className="aw-cta-inner">
            <h2 className="aw-cta-h2">Ready to Be Recognised?</h2>
            <p className="aw-cta-p">
              Nominations are open. Secure your place among India&apos;s top 100 CX leaders — and join 400+ senior professionals at the most prestigious CX gathering of 2026.
            </p>
            <div className="aw-cta-btns">
              <a href="#nominate" className="aw-btn-white">
                Nominate Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="https://konfhub.com/checkout/world-cx-summit-awards?ticketId=93844%7C1%3B&selectedCode=MKTWEBSITE" target="_blank" rel="noopener noreferrer" className="aw-btn-ghost">
                Get Your Pass
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
