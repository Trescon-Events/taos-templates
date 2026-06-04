"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const PASS_URL = "https://konfhub.com/checkout/world-cx-summit-awards?ticketId=93844%7C1%3B&selectedCode=MKTWEBSITE";

const HS_PORTAL = "2953901";
const HS_FORMS = {
  sponsorExhibitor: "b91487d4-9b3a-40c8-a1f4-47e92cd97e27",
  speaker:          "c5a765f2-77cc-40a6-8fa8-9e266ee81069",
  media:            "816c065c-3d80-4961-a6d5-a2b44344b258",
};

function HubSpotForm({ formId, targetId }: { formId: string; targetId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    loaded.current = false;
  }, [formId]);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const init = () => {
      if (typeof (window as any).hbspt === "undefined" || !ref.current) return;
      ref.current.innerHTML = "";
      (window as any).hbspt.forms.create({
        portalId: HS_PORTAL,
        formId,
        region: "na1",
        target: `#${targetId}`,
        cssRequired: "",
        css: "",
      });
    };

    if (typeof (window as any).hbspt !== "undefined") {
      init();
    } else {
      const s = document.createElement("script");
      s.src = "//js.hsforms.net/forms/embed/v2.js";
      s.charset = "utf-8";
      s.onload = () => setTimeout(init, 100);
      document.head.appendChild(s);
    }
  }, [formId, targetId]);

  return <div id={targetId} ref={ref} style={{ minHeight: 120 }} />;
}

const STATS = [
  { value: "400+", label: "Senior Attendees" },
  { value: "40+",  label: "Speakers" },
  { value: "100+", label: "Award Categories" },
  { value: "1",    label: "Unmissable Day" },
];

const WHAT_TO_EXPECT = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Full-Day Programme",
    desc: "Keynotes, panel discussions, fireside chats, and product showcases from 08:00 to 18:00 IST.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    title: "Power Networking",
    desc: "Facilitated 1:1 meetings and roundtables with 400+ pre-qualified CX decision-makers.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "World CX Awards",
    desc: "100+ award categories recognising excellence in customer experience across industries.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "8 Focus Areas",
    desc: "AI-first CX, hyper-personalisation, omnichannel, human-AI balance, and more.",
  },
];

const PASS_INCLUDES = [
  "All keynote & panel sessions",
  "Product showcase floor access",
  "Networking lunch & coffee breaks",
  "World CX Awards ceremony",
  "Event app & speaker materials",
  "Access to 400+ senior CX leaders",
  "Post-event session recordings",
];

type Tab = "overview" | "delegate" | "sponsor" | "exhibitor" | "speaker" | "media-partner" | "faqs";

export default function AttendPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as Tab | null;
    if (t && (["overview","delegate","sponsor","exhibitor","speaker","media-partner","faqs"] as string[]).includes(t)) {
      setTab(t);
      if (window.location.hash === "#enquire-form") {
        setTimeout(() => {
          document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    }
  }, []);

  return (
    <>
      <style>{`
        .att-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 72px;
        }

        /* ── Tab bar ── */
        .att-tabbar {
          background: var(--bg-surface);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky;
          top: 72px;
          z-index: 50;
        }
        .att-tabbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .att-tabbar-inner::-webkit-scrollbar { display: none; }
        .att-tab {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          padding: 16px 24px;
          cursor: pointer;
          border: none;
          background: none;
          font-family: inherit;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
        }
        .att-tab:hover { color: rgba(255,255,255,0.7); }
        .att-tab.active { color: #36BCB0; border-bottom-color: #36BCB0; }
        .att-tab.soon {
          color: rgba(255,255,255,0.2);
          cursor: default;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .att-soon-badge {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 2px 6px;
        }

        /* ── OVERVIEW ── */

        /* Hero */
        .att-hero {
          background: var(--bg-surface);
          padding: 80px 40px 72px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(54,188,176,0.10);
        }
        .att-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 60% at 50% 0%, rgba(54,188,176,0.09) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 80% 80%, rgba(201,168,76,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .att-hero-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .att-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--coral);
          margin-bottom: 20px;
        }
        .att-overline::before {
          content: ''; width: 24px; height: 1.5px;
          background: var(--coral); flex-shrink: 0;
        }
        .att-overline::after {
          content: ''; width: 24px; height: 1.5px;
          background: var(--coral); flex-shrink: 0;
        }
        .att-h1 {
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.12;
          margin-bottom: 20px;
        }
        .att-h1 span { color: var(--gold); }
        .att-sub {
          font-size: 16px;
          color: var(--text-body);
          max-width: 560px;
          margin: 0 auto 36px;
          line-height: 1.7;
        }
        .att-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #36BCB0;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 16px 40px;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .att-hero-cta:hover { background: #4ECFC4; transform: translateY(-2px); }

        /* Event meta strip */
        .att-meta-strip {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .att-meta-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.60);
        }
        .att-meta-item svg { color: var(--coral); flex-shrink: 0; }

        /* Stats */
        .att-stats {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 40px;
        }
        .att-stats-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--coral);
          text-align: center; margin-bottom: 48px;
        }
        .att-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .att-stat {
          background: var(--bg-surface);
          padding: 40px 32px;
          text-align: center;
          transition: background 0.2s;
        }
        .att-stat:hover { background: rgba(54,188,176,0.05); }
        .att-stat-val {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 8px;
        }
        .att-stat-lbl {
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.45);
        }

        /* What to expect */
        .att-expect {
          background: var(--bg-surface);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .att-expect-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 40px;
        }
        .att-section-head {
          text-align: center;
          margin-bottom: 48px;
        }
        .att-section-overline {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--coral);
          margin-bottom: 12px;
        }
        .att-section-h2 {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 900; letter-spacing: -0.02em;
          color: #fff;
        }
        .att-section-h2 em { color: var(--gold); font-style: normal; }
        .att-expect-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .att-expect-card {
          background: var(--bg-primary);
          border: 1px solid var(--border);
          padding: 28px 24px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .att-expect-card:hover {
          border-color: rgba(54,188,176,0.35);
          transform: translateY(-3px);
        }
        .att-expect-icon {
          width: 44px; height: 44px;
          background: rgba(54,188,176,0.10);
          border: 1px solid rgba(54,188,176,0.20);
          display: flex; align-items: center; justify-content: center;
          color: #36BCB0;
          margin-bottom: 16px;
        }
        .att-expect-title {
          font-size: 14px; font-weight: 800; color: #fff;
          margin-bottom: 8px; letter-spacing: -0.01em;
        }
        .att-expect-desc {
          font-size: 12px; color: var(--text-body);
          line-height: 1.7;
        }

        /* Bottom CTA */
        .att-bottom-cta {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 40px;
          text-align: center;
        }
        .att-bottom-cta h3 {
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 900; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 12px;
        }
        .att-bottom-cta h3 span { color: var(--coral); }
        .att-bottom-cta p {
          font-size: 14px; color: var(--text-body);
          margin-bottom: 28px; max-width: 480px;
          margin-left: auto; margin-right: auto;
          line-height: 1.7;
        }

        /* ── GET YOUR PASS ── */
        .att-pass-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 64px 40px 100px;
        }
        .att-pass-hero {
          text-align: center;
          margin-bottom: 56px;
        }
        .att-pass-hero h2 {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; margin-bottom: 12px;
          text-transform: uppercase;
        }
        .att-pass-hero h2 span { color: var(--gold); }
        .att-pass-hero p {
          font-size: 15px; color: var(--text-body);
          max-width: 480px; margin: 0 auto;
          line-height: 1.7;
        }
        .att-pass-card {
          background: var(--bg-surface);
          border: 1px solid rgba(54,188,176,0.25);
          position: relative;
          overflow: hidden;
        }
        .att-pass-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #36BCB0, #C9A84C);
        }
        .att-pass-card-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .att-pass-left {
          padding: 48px 40px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .att-pass-right {
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: rgba(54,188,176,0.03);
        }
        .att-pass-type {
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--coral);
          margin-bottom: 8px;
        }
        .att-pass-name {
          font-size: 28px; font-weight: 900; color: #fff;
          letter-spacing: -0.02em; margin-bottom: 24px;
        }
        .att-pass-includes-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          margin-bottom: 16px;
        }
        .att-pass-feature {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: rgba(255,255,255,0.75);
          margin-bottom: 12px; line-height: 1.5;
        }
        .att-pass-feature svg { color: #36BCB0; flex-shrink: 0; margin-top: 1px; }
        .att-pass-price-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          margin-bottom: 8px;
        }
        .att-pass-price {
          font-size: 44px; font-weight: 900; color: var(--gold);
          letter-spacing: -0.04em; line-height: 1;
          margin-bottom: 4px;
        }
        .att-pass-price-note {
          font-size: 11px; color: rgba(255,255,255,0.35);
          margin-bottom: 32px;
        }
        .att-pass-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #36BCB0; color: #fff;
          font-size: 12px; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 16px 36px; border-radius: 100px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          width: 100%; justify-content: center;
        }
        .att-pass-btn:hover { background: #4ECFC4; transform: translateY(-2px); }
        .att-pass-note {
          font-size: 11px; color: rgba(255,255,255,0.30);
          margin-top: 14px; line-height: 1.6;
          text-align: center;
        }
        .att-pass-enquire {
          margin-top: 32px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          padding: 32px 40px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
          flex-wrap: wrap;
        }
        .att-pass-enquire-text h4 {
          font-size: 16px; font-weight: 800; color: #fff;
          margin-bottom: 4px;
        }
        .att-pass-enquire-text p {
          font-size: 13px; color: var(--text-body);
        }

        /* ── AUDIENCE TABS (Delegates / Sponsors / Partners / Media) ── */
        .att-audience-hero {
          background: var(--bg-surface);
          padding: 80px 40px 72px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(54,188,176,0.10);
        }
        .att-audience-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(54,188,176,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .att-audience-hero-inner {
          position: relative; z-index: 2;
          max-width: 860px; margin: 0 auto;
        }
        .att-audience-hero .att-h1 em { font-style: normal; }

        .att-benefits-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 40px 80px;
        }
        .att-benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }
        .att-benefit-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          padding: 28px 24px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .att-benefit-card:hover {
          border-color: rgba(54,188,176,0.30);
          transform: translateY(-3px);
        }
        .att-benefit-num {
          font-size: 11px; font-weight: 900;
          letter-spacing: 0.12em;
          margin-bottom: 14px;
          line-height: 1;
        }
        .att-benefit-title {
          font-size: 14px; font-weight: 800;
          color: #fff; margin-bottom: 8px;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .att-benefit-desc {
          font-size: 12px; color: var(--text-body);
          line-height: 1.7;
        }

        .att-audience-cta-strip {
          background: var(--bg-surface);
          border: 1px solid rgba(54,188,176,0.15);
          padding: 36px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .att-audience-cta-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 12px;
        }
        .att-audience-roles {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .att-role-pill {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.05em;
          color: #36BCB0;
          background: rgba(54,188,176,0.08);
          border: 1px solid rgba(54,188,176,0.22);
          padding: 5px 12px;
          white-space: nowrap;
        }

        /* ── EMBEDDED FORM SECTION ── */
        .att-form-section {
          max-width: 820px;
          margin: 0 auto;
          padding: 72px 40px 100px;
        }
        .att-form-heading {
          text-align: center;
          margin-bottom: 48px;
        }
        .att-form-overline {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--coral);
          display: block; margin-bottom: 14px;
        }
        .att-form-h2 {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 900; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 14px;
        }
        .att-form-h2 span { color: var(--gold); }
        .att-form-h2 em { color: #36BCB0; font-style: normal; }
        .att-form-desc {
          font-size: 14px; color: var(--text-body);
          max-width: 480px; margin: 0 auto;
          line-height: 1.75;
        }
        .att-form-card {
          background: var(--bg-surface);
          border: 1px solid rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
          padding: 48px 52px 56px;
        }
        .att-form-card-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
        }

        /* ── HubSpot form — consistent dark styling across all tabs ── */
        .att-form-card .hbspt-form,
        .att-form-card .hs-form-private,
        .att-form-card form { background: transparent !important; }

        .att-form-card .hs-form fieldset,
        .att-form-card .hs-form-private fieldset {
          max-width: 100% !important; border: none !important;
          padding: 0 !important; margin: 0 0 4px !important;
        }
        .att-form-card .hs-form .hs-form-field,
        .att-form-card .hs-form-private .hs-form-field {
          margin-bottom: 22px !important;
        }

        /* Labels */
        .att-form-card label,
        .att-form-card .hs-form label,
        .att-form-card .hs-form-private label {
          font-size: 10px !important; font-weight: 700 !important;
          letter-spacing: 0.14em !important; text-transform: uppercase !important;
          color: rgba(255,255,255,0.50) !important; margin-bottom: 8px !important;
          display: block !important; font-family: inherit !important;
          background: transparent !important;
        }

        /* All inputs, selects, textareas — covers .hs-input and type selectors */
        .att-form-card .hs-input,
        .att-form-card input.hs-input,
        .att-form-card select.hs-input,
        .att-form-card textarea.hs-input,
        .att-form-card .hs-form input[type="text"],
        .att-form-card .hs-form input[type="email"],
        .att-form-card .hs-form input[type="tel"],
        .att-form-card .hs-form input[type="number"],
        .att-form-card .hs-form input[type="url"],
        .att-form-card .hs-form select,
        .att-form-card .hs-form textarea,
        .att-form-card .hs-form-private input[type="text"],
        .att-form-card .hs-form-private input[type="email"],
        .att-form-card .hs-form-private input[type="tel"],
        .att-form-card .hs-form-private select,
        .att-form-card .hs-form-private textarea {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.14) !important;
          border-radius: 0 !important; color: #fff !important;
          padding: 12px 16px !important; width: 100% !important;
          font-size: 14px !important; font-family: inherit !important;
          box-sizing: border-box !important; outline: none !important;
          transition: border-color 0.2s, background 0.2s !important;
          appearance: none !important; -webkit-appearance: none !important;
          box-shadow: none !important;
        }
        .att-form-card input::placeholder,
        .att-form-card textarea::placeholder { color: rgba(255,255,255,0.22) !important; }
        .att-form-card .hs-input:focus,
        .att-form-card .hs-form input:focus,
        .att-form-card .hs-form select:focus,
        .att-form-card .hs-form textarea:focus,
        .att-form-card .hs-form-private input:focus,
        .att-form-card .hs-form-private select:focus {
          border-color: #36BCB0 !important;
          background: rgba(54,188,176,0.06) !important;
        }
        .att-form-card select option,
        .att-form-card .hs-form select option {
          background: #0A1628 !important; color: #fff !important;
        }

        /* File upload */
        .att-form-card input[type="file"] {
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.14) !important;
          color: rgba(255,255,255,0.55) !important;
          padding: 10px 14px !important; font-size: 13px !important;
          font-family: inherit !important; width: 100% !important;
          box-sizing: border-box !important; cursor: pointer !important;
        }

        /* Submit button */
        .att-form-card .hs-button,
        .att-form-card .hs-button.primary,
        .att-form-card input[type="submit"],
        .att-form-card .hs-form .hs-button,
        .att-form-card .hs-form-private .hs-button {
          background: #36BCB0 !important; color: #fff !important;
          font-size: 12px !important; font-weight: 700 !important;
          letter-spacing: 0.12em !important; text-transform: uppercase !important;
          padding: 14px 40px !important; border: none !important;
          border-radius: 0 !important; cursor: pointer !important;
          font-family: inherit !important; transition: background 0.2s !important;
          margin-top: 8px !important; display: inline-block !important;
          box-shadow: none !important;
        }
        .att-form-card .hs-button:hover,
        .att-form-card input[type="submit"]:hover { background: #4ECFC4 !important; }

        /* Errors, descriptions, success */
        .att-form-card .hs-error-msgs {
          list-style: none !important; padding: 0 !important; margin: 5px 0 0 !important;
        }
        .att-form-card .hs-error-msgs li,
        .att-form-card .hs-main-font-element,
        .att-form-card .no-list.hs-error-msgs li {
          font-size: 11px !important; color: #E8785A !important; font-family: inherit !important;
        }
        .att-form-card .hs-field-desc {
          font-size: 11px !important; color: rgba(255,255,255,0.30) !important;
          margin-top: 5px !important; font-family: inherit !important;
        }
        .att-form-card .actions { margin-top: 12px !important; }
        .att-form-card .submitted-message,
        .att-form-card .hs-form .submitted-message {
          font-size: 15px !important; color: #36BCB0 !important;
          font-weight: 700 !important; text-align: center !important;
          padding: 24px 0 !important; font-family: inherit !important;
        }

        /* Rich text block HubSpot injects (event banner on Sponsor form) */
        .att-form-card .hs-richtext { margin-bottom: 28px !important; }
        .att-form-card .hs-richtext img { max-width: 100% !important; display: block !important; }
        .att-form-card .hs-richtext p {
          color: rgba(255,255,255,0.70) !important; font-size: 14px !important;
          line-height: 1.6 !important; font-family: inherit !important;
        }

        @media (max-width: 640px) {
          .att-form-section { padding: 48px 24px 72px; }
          .att-form-card { padding: 36px 24px 44px; }
        }

        /* Responsive */
        @media (max-width: 900px) {
          .att-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .att-expect-grid { grid-template-columns: repeat(2, 1fr); }
          .att-pass-card-inner { grid-template-columns: 1fr; }
          .att-pass-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .att-benefits-grid { grid-template-columns: repeat(2, 1fr); }
          .att-audience-cta-strip { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 600px) {
          .att-hero { padding: 56px 24px 48px; }
          .att-stats { padding: 40px 24px; }
          .att-expect-inner { padding: 40px 24px; }
          .att-expect-grid { grid-template-columns: 1fr; }
          .att-bottom-cta { padding: 40px 24px; }
          .att-pass-page { padding: 40px 24px 72px; }
          .att-pass-left, .att-pass-right { padding: 32px 24px; }
          .att-tabbar-inner { padding: 0 16px; }
          .att-tab { padding: 14px 16px; }
          .att-meta-strip { gap: 20px; }
          .att-audience-hero { padding: 56px 24px 48px; }
          .att-benefits-section { padding: 40px 24px 60px; }
          .att-benefits-grid { grid-template-columns: 1fr; }
          .att-audience-cta-strip { padding: 28px 24px; }
        }
      `}</style>

      <div className="att-page">

        {/* Tab bar */}
        <div className="att-tabbar">
          <div className="att-tabbar-inner">
            {([
              ["overview",      "Overview"],
              ["delegate",      "Delegate"],
              ["sponsor",       "Sponsor"],
              ["exhibitor",     "Exhibitor"],
              ["speaker",       "Speaker"],
              ["media-partner", "Media Partner"],
              ["faqs",          "FAQs"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} className={`att-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id as Tab)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && (
          <>
            {/* Hero */}
            <div className="att-hero">
              <div className="att-hero-inner">
                <div className="att-overline">4 June 2026 · Bengaluru, India</div>
                <h1 className="att-h1">
                  India&apos;s Premier<br />
                  <span>Customer Experience</span><br />
                  Summit &amp; Awards
                </h1>
                <p className="att-sub">
                  One full day bringing together 400+ senior CX leaders from India&apos;s top enterprises — to learn, connect, and define the future of customer experience.
                </p>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="att-hero-cta">
                  Get Your Pass
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <div className="att-meta-strip">
                  <div className="att-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    4 June 2026
                  </div>
                  <div className="att-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    Bengaluru, India
                  </div>
                  <div className="att-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    08:00 – 18:00 IST
                  </div>
                  <div className="att-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    By Invitation &amp; Registration
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="att-stats">
              <div className="att-stats-label">The Scale of World CX Summit</div>
              <div className="att-stats-grid">
                {STATS.map(s => (
                  <div key={s.label} className="att-stat">
                    <div className="att-stat-val">{s.value}</div>
                    <div className="att-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to expect */}
            <div className="att-expect">
              <div className="att-expect-inner">
                <div className="att-section-head">
                  <div className="att-section-overline">What To Expect</div>
                  <h2 className="att-section-h2">One Day. <em>Every Format.</em></h2>
                </div>
                <div className="att-expect-grid">
                  {WHAT_TO_EXPECT.map(item => (
                    <div key={item.title} className="att-expect-card">
                      <div className="att-expect-icon">{item.icon}</div>
                      <div className="att-expect-title">{item.title}</div>
                      <div className="att-expect-desc">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="att-bottom-cta">
              <h3>Ready to <span>Attend?</span></h3>
              <p>Seats are limited to 400 senior CX professionals. Secure your place at India&apos;s premier customer experience summit.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="wcx-btn-gold">
                  Get Your Pass
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="/enquire" className="wcx-btn-outline">
                  Enquire Now
                </a>
              </div>
            </div>
          </>
        )}

        {/* ── DELEGATE TAB ── */}
        {tab === "delegate" && (
          <>
            <div className="att-audience-hero">
              <div className="att-audience-hero-inner">
                <div className="att-overline">Why Attend as a Delegate</div>
                <h1 className="att-h1">Built for <em style={{ color: "#36BCB0" }}>CX Leaders</em></h1>
                <p className="att-sub">World CX Summit is invitation-only and capped at 400 senior CX professionals. Every session, every conversation, and every connection is curated for people who own customer experience at scale.</p>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="att-hero-cta">
                  Register as Delegate
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
            <div className="att-benefits-section">
              <div className="att-benefits-grid">
                {[
                  { num: "01", title: "Access All Sessions", desc: "Full day access to every keynote, panel, fireside chat, and product showcase — no parallel tracks, no content missed." },
                  { num: "02", title: "Power Networking", desc: "Structured 1:1 meetings and open networking with 400+ Head of CX, CCO, VP CX, and Director CX from India's top brands." },
                  { num: "03", title: "World CX Awards Ceremony", desc: "Attend the most prestigious CX recognition night in India — 100+ award categories across every sector." },
                  { num: "04", title: "Speaker Materials & Recordings", desc: "Post-event access to session summaries, speaker decks, and selected session recordings via the event app." },
                  { num: "05", title: "Networking Lunch & Breaks", desc: "Hosted lunch and coffee breaks with dedicated time for introductions, follow-ups, and deal conversations." },
                  { num: "06", title: "Event App Access", desc: "Pre-event access to the attendee list, session scheduler, and 1:1 meeting booking — plan your day in advance." },
                ].map(b => (
                  <div key={b.num} className="att-benefit-card">
                    <div className="att-benefit-num" style={{ color: "#36BCB0" }}>{b.num}</div>
                    <div className="att-benefit-title">{b.title}</div>
                    <div className="att-benefit-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
              <div className="att-audience-cta-strip">
                <div>
                  <div className="att-audience-cta-label">Who Should Attend</div>
                  <div className="att-audience-roles">
                    {["Chief Customer Officer", "Head of CX", "VP Customer Experience", "Director CX & Service", "Head of Customer Success", "Head of Digital & CX"].map(r => (
                      <span key={r} className="att-role-pill">{r}</span>
                    ))}
                  </div>
                </div>
                <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="att-hero-cta" style={{ flexShrink: 0 }}>
                  Register Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </>
        )}

        {/* ── SPONSOR TAB ── */}
        {tab === "sponsor" && (
          <>
            <div className="att-audience-hero">
              <div className="att-audience-hero-inner">
                <div className="att-overline">Sponsorship Opportunities</div>
                <h1 className="att-h1">Reach <em style={{ color: "#C9A84C" }}>400+ CX Decision-Makers</em></h1>
                <p className="att-sub">Sponsoring World CX Summit puts your brand in front of India's most senior customer experience leadership — in a focused, high-trust environment where business gets done.</p>
                <button onClick={() => document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" })} className="att-hero-cta" style={{ background: "#C9A84C", border: "none", cursor: "pointer" }}>
                  Enquire About Sponsorship
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
            <div className="att-benefits-section">
              <div className="att-benefits-grid">
                {[
                  { num: "01", title: "Brand Visibility at Scale", desc: "Logo placement across the event venue, digital screens, event app, website, and all marketing communications reaching 10,000+ CX professionals." },
                  { num: "02", title: "Qualified Lead Generation", desc: "Direct access to 400+ pre-qualified CX decision-makers with verified purchasing authority — not just attendees, but buyers." },
                  { num: "03", title: "Product Showcase Floor", desc: "Dedicated exhibition space to demonstrate your solutions live to an audience actively evaluating CX technology." },
                  { num: "04", title: "Speaking Opportunities", desc: "Sponsored keynote or panel slot to position your brand as a thought leader in front of senior CX practitioners." },
                  { num: "05", title: "1:1 Hosted Meetings", desc: "Pre-scheduled meetings with pre-qualified delegates matched to your target profile — structured for business outcomes." },
                  { num: "06", title: "Awards Category Naming", desc: "Title a World CX Awards category to align your brand with India's most recognised CX recognition programme." },
                  { num: "07", title: "Post-Event Lead Report", desc: "Detailed post-event report including engagement data, scan leads, and content performance for ROI measurement." },
                ].map(b => (
                  <div key={b.num} className="att-benefit-card">
                    <div className="att-benefit-num" style={{ color: "#C9A84C" }}>{b.num}</div>
                    <div className="att-benefit-title">{b.title}</div>
                    <div className="att-benefit-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
              <div className="att-audience-cta-strip" style={{ borderColor: "rgba(201,168,76,0.20)" }}>
                <div>
                  <div className="att-audience-cta-label">Sponsorship Packages Available</div>
                  <div className="att-audience-roles">
                    {["Title Sponsor", "Strategic Sponsor", "Associate Sponsor", "Exhibitor", "Award Category Sponsor", "Networking Sponsor"].map(r => (
                      <span key={r} className="att-role-pill" style={{ borderColor: "rgba(201,168,76,0.25)", color: "#C9A84C", background: "rgba(201,168,76,0.08)" }}>{r}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" })} className="att-hero-cta" style={{ background: "#C9A84C", flexShrink: 0, border: "none", cursor: "pointer" }}>
                  Enquire Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* Embedded Sponsorship Form */}
            <div style={{ background: "var(--bg-surface)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div id="enquire-form" className="att-form-section">
                <div className="att-form-heading">
                  <span className="att-form-overline">Sponsorship Enquiry</span>
                  <h2 className="att-form-h2">Get in Touch About <span>Sponsorship</span></h2>
                  <p className="att-form-desc">Fill in the form below and our partnerships team will respond within one business day with the full sponsorship deck.</p>
                </div>
                <div className="att-form-card" style={{ borderColor: "rgba(201,168,76,0.20)" }}>
                  <div className="att-form-card-bar" style={{ background: "linear-gradient(90deg, #C9A84C, #36BCB0)" }} />
                  <HubSpotForm formId={HS_FORMS.sponsorExhibitor} targetId="hs-sponsor-form" />
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── EXHIBITOR TAB ── */}
        {tab === "exhibitor" && (
          <>
            <div className="att-audience-hero">
              <div className="att-audience-hero-inner">
                <div className="att-overline">Exhibitor Opportunities</div>
                <h1 className="att-h1">Showcase to <em style={{ color: "#36BCB0" }}>Serious Buyers</em></h1>
                <p className="att-sub">The World CX Summit exhibition floor puts your product or solution in front of 400+ CX leaders who are actively evaluating technology, services, and partners. No tyre-kickers — only decision-makers.</p>
                <button onClick={() => document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" })} className="att-hero-cta" style={{ border: "none", cursor: "pointer" }}>
                  Enquire About Exhibition
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
            <div className="att-benefits-section">
              <div className="att-benefits-grid">
                {[
                  { num: "01", title: "Prime Exhibition Space", desc: "Branded booth in the main delegate flow area — positioned for maximum footfall throughout the full day." },
                  { num: "02", title: "Live Product Demonstrations", desc: "Show your solution working live to an audience of CX technology buyers, not just general tech audiences." },
                  { num: "03", title: "Pre-Event Visibility", desc: "Listed as an exhibitor on the event website, event app, and all pre-event marketing to 10,000+ CX professionals." },
                  { num: "04", title: "Hosted Buyer Programme", desc: "Optional upgrade: pre-scheduled 20-minute meetings with qualified delegates matched to your ideal customer profile." },
                  { num: "05", title: "Networking Breaks at Stand", desc: "Coffee breaks and networking sessions bring the full delegate audience past your exhibition stand." },
                  { num: "06", title: "Company Profile in Event App", desc: "Full company description, product overview, and team contacts visible to all registered delegates pre-event." },
                  { num: "07", title: "Post-Event Lead Report", desc: "Full lead report with visit timestamps and delegate profiles — delivered within 48 hours." },
                ].map(b => (
                  <div key={b.num} className="att-benefit-card">
                    <div className="att-benefit-num" style={{ color: "#36BCB0" }}>{b.num}</div>
                    <div className="att-benefit-title">{b.title}</div>
                    <div className="att-benefit-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
              <div className="att-audience-cta-strip">
                <div>
                  <div className="att-audience-cta-label">Who Exhibits at World CX Summit</div>
                  <div className="att-audience-roles">
                    {["CX Technology Platforms", "Contact Centre Solutions", "AI & Automation", "Analytics & Insights", "Workforce Management", "Digital Experience Tools"].map(r => (
                      <span key={r} className="att-role-pill">{r}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" })} className="att-hero-cta" style={{ flexShrink: 0, border: "none", cursor: "pointer" }}>
                  Enquire Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* Embedded Exhibitor Form (same as sponsor) */}
            <div style={{ background: "var(--bg-surface)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div id="enquire-form" className="att-form-section">
                <div className="att-form-heading">
                  <span className="att-form-overline">Exhibition Enquiry</span>
                  <h2 className="att-form-h2">Book Your <em>Exhibition Stand</em></h2>
                  <p className="att-form-desc">Complete the form below and our team will respond within one business day with stand options and pricing.</p>
                </div>
                <div className="att-form-card">
                  <div className="att-form-card-bar" style={{ background: "linear-gradient(90deg, #36BCB0, #C9A84C)" }} />
                  <HubSpotForm formId={HS_FORMS.sponsorExhibitor} targetId="hs-exhibitor-form" />
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── SPEAKER TAB ── */}
        {tab === "speaker" && (
          <>
            <div className="att-audience-hero">
              <div className="att-audience-hero-inner">
                <div className="att-overline">Apply to Speak</div>
                <h1 className="att-h1">Share Your <em style={{ color: "#36BCB0" }}>CX Expertise</em></h1>
                <p className="att-sub">World CX Summit brings together India's most senior CX leaders. We're looking for practitioners — not vendors — with real stories, bold perspectives, and proven results to share from the stage.</p>
                <button onClick={() => document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" })} className="att-hero-cta" style={{ border: "none", cursor: "pointer" }}>
                  Apply to Speak
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
            <div className="att-benefits-section">
              <div className="att-benefits-grid">
                {[
                  { num: "01", title: "Keynote Sessions", desc: "30-minute solo keynotes for senior leaders with a bold, data-backed perspective on the future of customer experience." },
                  { num: "02", title: "Panel Discussions", desc: "60-minute moderated panels of 4–5 speakers debating the most pressing CX challenges facing Indian enterprises." },
                  { num: "03", title: "Fireside Chats", desc: "Intimate 20-minute conversations between a speaker and a moderator — ideal for personal stories and candid insights." },
                  { num: "04", title: "Workshop Sessions", desc: "Hands-on, problem-solving sessions for a smaller breakout audience — ideal for practitioners with a practical methodology." },
                  { num: "05", title: "Speaker Branding", desc: "Your photo, bio, and session listed on the event website, event app, and all marketing communications." },
                  { num: "06", title: "Full Event Access", desc: "Speakers receive full-day delegate access, VIP networking sessions, and priority seating at the World CX Awards ceremony." },
                ].map(b => (
                  <div key={b.num} className="att-benefit-card">
                    <div className="att-benefit-num" style={{ color: "#36BCB0" }}>{b.num}</div>
                    <div className="att-benefit-title">{b.title}</div>
                    <div className="att-benefit-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
              <div className="att-audience-cta-strip">
                <div>
                  <div className="att-audience-cta-label">Ideal Speaker Profiles</div>
                  <div className="att-audience-roles">
                    {["Chief Customer Officer", "Head of CX", "VP Customer Experience", "CX Technology Leader", "Director of Service Design", "Chief Digital Officer"].map(r => (
                      <span key={r} className="att-role-pill">{r}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" })} className="att-hero-cta" style={{ flexShrink: 0, border: "none", cursor: "pointer" }}>
                  Apply Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* Embedded Speaker Form */}
            <div style={{ background: "var(--bg-surface)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div id="enquire-form" className="att-form-section">
                <div className="att-form-heading">
                  <span className="att-form-overline">Speaker Application</span>
                  <h2 className="att-form-h2">Apply to <em>Speak</em></h2>
                  <p className="att-form-desc">Fill in the form below. Speaker applications are reviewed on a rolling basis and confirmed speakers are notified directly.</p>
                </div>
                <div className="att-form-card">
                  <div className="att-form-card-bar" style={{ background: "linear-gradient(90deg, #36BCB0, #C9A84C)" }} />
                  <HubSpotForm formId={HS_FORMS.speaker} targetId="hs-speaker-form" />
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── MEDIA PARTNER TAB ── */}
        {tab === "media-partner" && (
          <>
            <div className="att-audience-hero">
              <div className="att-audience-hero-inner">
                <div className="att-overline">Media Partnership</div>
                <h1 className="att-h1">Cover India&apos;s <em style={{ color: "#C9A84C" }}>CX Summit</em></h1>
                <p className="att-sub">World CX Summit is India's premier customer experience event. Media partners and accredited journalists get full access to cover the event, interview speakers, and publish exclusive content from the summit floor.</p>
                <button onClick={() => document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" })} className="att-hero-cta" style={{ background: "#C9A84C", border: "none", cursor: "pointer" }}>
                  Apply for Media Partnership
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
            <div className="att-benefits-section">
              <div className="att-benefits-grid">
                {[
                  { num: "01", title: "Full Event Access", desc: "Press passes covering all keynotes, panels, fireside chats, product showcases, and the World CX Awards ceremony." },
                  { num: "02", title: "Press Room & Facilities", desc: "Dedicated press room with Wi-Fi, charging stations, and a quiet workspace for filing stories throughout the day." },
                  { num: "03", title: "Speaker Interview Access", desc: "Pre-arranged 10-minute 1:1 interview slots with confirmed speakers — coordinated by our media team." },
                  { num: "04", title: "Official Press Kit", desc: "High-resolution images, speaker bios, event statistics, and official press releases — ready to publish from day one." },
                  { num: "05", title: "Co-Promotion of Your Coverage", desc: "Your published articles and coverage amplified across World CX Summit's website, social media, and email newsletters." },
                  { num: "06", title: "Logo on Event Materials", desc: "Media partner logo on the event website, email communications, and at the venue — with 10,000+ CX professional reach." },
                  { num: "07", title: "Exclusive Story Access", desc: "First access to World CX Awards winners, key announcements, and exclusive data from the event's research reports." },
                  { num: "08", title: "Networking Access", desc: "Full access to networking sessions to connect directly with CX leaders, speakers, and sponsors for story development." },
                ].map(b => (
                  <div key={b.num} className="att-benefit-card">
                    <div className="att-benefit-num" style={{ color: "#C9A84C" }}>{b.num}</div>
                    <div className="att-benefit-title">{b.title}</div>
                    <div className="att-benefit-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
              <div className="att-audience-cta-strip" style={{ borderColor: "rgba(201,168,76,0.20)" }}>
                <div>
                  <div className="att-audience-cta-label">Eligible Media Types</div>
                  <div className="att-audience-roles">
                    {["Print & Digital Publications", "Business News Outlets", "CX & Tech Blogs", "Podcasts & Video Channels", "Industry Newsletters", "Freelance Journalists"].map(r => (
                      <span key={r} className="att-role-pill" style={{ borderColor: "rgba(201,168,76,0.25)", color: "#C9A84C", background: "rgba(201,168,76,0.08)" }}>{r}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" })} className="att-hero-cta" style={{ background: "#C9A84C", flexShrink: 0, border: "none", cursor: "pointer" }}>
                  Apply Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* Embedded Media Partner Form */}
            <div style={{ background: "var(--bg-surface)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div id="enquire-form" className="att-form-section">
                <div className="att-form-heading">
                  <span className="att-form-overline">Media Partnership Enquiry</span>
                  <h2 className="att-form-h2">Apply for <span>Media Partnership</span></h2>
                  <p className="att-form-desc">Fill in the form below and our media team will respond within one business day with accreditation details and the official media pack.</p>
                </div>
                <div className="att-form-card" style={{ borderColor: "rgba(201,168,76,0.20)" }}>
                  <div className="att-form-card-bar" style={{ background: "linear-gradient(90deg, #C9A84C, #36BCB0)" }} />
                  <HubSpotForm formId={HS_FORMS.media} targetId="hs-media-form" />
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── FAQs TAB ── */}
        {tab === "faqs" && (
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "60px 40px 80px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--coral)", marginBottom: 12 }}>FAQs</div>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, marginBottom: 40 }}>Frequently Asked Questions</h2>
            {[
              { q: "When and where is World CX Summit 2026?", a: "World CX Summit & Awards 2026 takes place on 4 June 2026 in Bengaluru, India. The venue will be confirmed and communicated to registered delegates." },
              { q: "Is registration free?", a: "Delegate passes are free to register. Registration requires a valid work or official email address and is subject to approval. Trescon reserves the right to decline registrations that do not meet the delegate criteria." },
              { q: "Who should attend?", a: "World CX Summit is designed for senior customer experience professionals — Chief Customer Officers, Heads of CX, VP Customer Experience, Directors of Service & Experience, and CX Technology decision-makers from India's leading brands." },
              { q: "How do I register?", a: "Click 'Register Now' from any page on this site. You will be redirected to our registration partner KonfHub, where you can complete your delegate registration. Work email required." },
              { q: "How do I apply to speak?", a: "Visit the Speakers page and click 'Apply to Speak'. Applications for keynotes, panel discussions, and fireside chats are reviewed on a rolling basis. Confirmed speakers are notified directly." },
              { q: "How does sponsorship work?", a: "Sponsorship packages range from Title Sponsor to Associate Sponsor, Exhibitor, and Award Category Sponsor. Each package includes a different combination of branding, speaking, and lead generation benefits. Contact us via the Enquire page for the full sponsorship deck." },
              { q: "How do I become a media partner?", a: "Media partnerships are available for publications, broadcasters, podcasts, and digital outlets covering CX, technology, and business. Apply via the Enquire page selecting 'Media Partnership' as your enquiry type." },
              { q: "What is included in the delegate pass?", a: "Full-day access to all keynote and panel sessions, the product showcase floor, networking lunch, coffee breaks, the World CX Awards ceremony, event app access, and post-event session materials." },
              { q: "Will sessions be recorded?", a: "Selected sessions will be made available post-event via the event app to registered delegates. Not all sessions are recorded — speaker consent is required." },
              { q: "Who organises World CX Summit?", a: "World CX Summit is organised by Trescon, a global business events and intelligence company headquartered in Dubai. Trescon produces events annually across 40+ countries." },
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{ width: "100%", background: "none", border: "none", padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{faq.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, color: "var(--coral)", transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {faqOpen === i && (
                  <div style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7, paddingBottom: 20 }}>{faq.a}</div>
                )}
              </div>
            ))}
            <div style={{ marginTop: 48, padding: "28px 32px", background: "rgba(54,188,176,0.06)", border: "1px solid rgba(54,188,176,0.2)", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Still have questions?</div>
                <div style={{ fontSize: 13, color: "var(--text-body)" }}>Our team responds to all enquiries within one business day.</div>
              </div>
              <a href="/enquire" className="wcx-btn-primary" style={{ flexShrink: 0 }}>
                Contact Us
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        )}

        {/* legacy fallback — never shown with new tabs */}
        {false && (
          <div className="att-pass-page">
            <div className="att-pass-hero">
              <h2>Get Your <span>Pass</span></h2>
              <p>Join 400+ senior CX leaders on 4 June 2026 in Bengaluru for India&apos;s most focused customer experience summit.</p>
            </div>

            <div className="att-pass-card">
              <div className="att-pass-card-inner">
                {/* Left — what's included */}
                <div className="att-pass-left">
                  <div className="att-pass-type">Delegate Pass</div>
                  <div className="att-pass-name">World CX Summit &amp; Awards 2026</div>
                  <div className="att-pass-includes-label">What&apos;s Included</div>
                  {PASS_INCLUDES.map(item => (
                    <div key={item} className="att-pass-feature">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Right — CTA */}
                <div className="att-pass-right">
                  <div className="att-pass-price-label">Registration</div>
                  <div className="att-pass-price">Free</div>
                  <div className="att-pass-price-note">18% GST applicable · Work email required</div>
                  <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="att-pass-btn">
                    Register on Konfhub
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                  <p className="att-pass-note">Registration is by invitation and approval. Official or work email addresses required.</p>
                </div>
              </div>
            </div>

            {/* Group / Sponsor enquiry */}
            <div className="att-pass-enquire">
              <div className="att-pass-enquire-text">
                <h4>Bringing a team or interested in sponsoring?</h4>
                <p>Contact us for group registrations, speaking opportunities, or sponsorship packages.</p>
              </div>
              <Link href="/enquire" className="wcx-btn-outline">
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
