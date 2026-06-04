"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { EVENT } from "@/config/event";

const PASS_URL = EVENT.register_url;

const STATS = EVENT.stats;

const THEME_ICONS = [
  <svg key="AI" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 7h.01M12 7h.01M17 7h.01M7 11h.01M12 11h.01M17 11h.01"/></svg>,
  <svg key="SEC" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  <svg key="CLD" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  <svg key="DAT" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  <svg key="DX" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
  <svg key="ROI" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  <svg key="DEV" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="CHG" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  <svg key="WRK" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="MA" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
];

const THEMES = EVENT.themes.map((t, i) => ({
  ...t,
  icon: THEME_ICONS[i] ?? THEME_ICONS[0],
}));

const WHY = [
  {
    num: "01", title: "Peer-Level Intelligence",
    desc: "Every delegate is a CIO, CTO, CISO or VP of IT. No vendor noise — pure peer exchange with leaders from India's top 1,000 organisations.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    num: "02", title: "Vendor-Neutral Content",
    desc: "Sessions are curated, not sponsored. Speakers are selected on insight, not budget. You get real-world outcomes, not polished pitches.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    num: "03", title: "15 Editions of Proof",
    desc: "8,500+ CIOs have attended across 15 global editions. The network you build here stays with you for your entire career.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    num: "04", title: "Strategic Partner Access",
    desc: "Evaluate 50+ enterprise technology vendors in a single day. Structured demos, live POCs, and pre-scheduled 1:1 meetings.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="14" height="12" rx="2"/></svg>,
  },
  {
    num: "05", title: "Award Recognition",
    desc: "100+ award categories recognising technology leadership, innovation, and transformation across every sector and organisation size.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    num: "06", title: "Content You Can Use",
    desc: "Post-event access to session recordings, speaker decks, research reports, and exclusive CIO benchmarking data.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
];

const PAST_SPEAKERS = [
  { name: "Mohit Kapoor",               title: "Group CTO",                       org: "Mahindra Group",               photo: "Mohit-Kapoor.webp" },
  { name: "Gaurav Duggal",              title: "SVP IT & Innovation",             org: "Jio Platforms",                photo: "Gaurav-Duggal.webp" },
  { name: "Rajiv Chetwani",             title: "Director DISM",                   org: "ISRO",                         photo: "Rajiv-Chetwani.webp" },
  { name: "Apurva Dalal",               title: "Chief Information Officer",       org: "Adani Green Energy",           photo: "apurva-dalal.webp" },
  { name: "Rajkumar Ayyella",           title: "Chief Information Officer",       org: "RPG Group",                    photo: "Rajkumar-Ayyella.webp" },
  { name: "Tejas Shah",                 title: "Chief Information Officer",       org: "L'Oreal India",                photo: "Tejas-Shah.webp" },
  { name: "Pallavi Katiyar",            title: "Chief Information Officer",       org: "Tech Mahindra",                photo: "Pallavi-Katiyar.webp" },
  { name: "Pavan Goyal",                title: "Chief Information Officer",       org: "Mphasis",                      photo: "Pavan-Goyal.webp" },
  { name: "Ekroop Caur",                title: "Secretary IT, BT & S&T",          org: "Govt of Karnataka",            photo: "Ekroop-Caur.webp" },
  { name: "Neeta Verma",                title: "Director General IT",             org: "Election Commission of India", photo: "Neeta-Verma.webp" },
  { name: "Sanjay Dubey",               title: "Chairman MPSEDC",                 org: "Govt of Madhya Pradesh",       photo: "Sanjay-Dubey.webp" },
  { name: "Alok Shankar Pandey",        title: "Group GM IT & CISO",              org: "DFCCIL",                       photo: "Alok-Shankar-Pandey.webp" },
  { name: "Anand Deodhar",              title: "Group CIO & Head IT",             org: "Force Motors",                 photo: "anand-deodhar.webp" },
  { name: "Arunraja Karthick",          title: "Head IT Services & Security",     org: "DTDC Express",                 photo: "Arunraja-Karthick.webp" },
  { name: "Bhargab Dutta",              title: "Chief Digital Officer",           org: "Century Plyboards",            photo: "Bhargab-Dutta.webp" },
  { name: "Dr. Balakrishnan Nair T.M.", title: "Director",                        org: "INCOIS",                       photo: "Dr.-Balakrishnan-Nair-T.M.webp" },
  { name: "Gaurav Srivastava",          title: "Head of Technology",              org: "NPCI",                         photo: "Gaurav-Srivastava.webp" },
  { name: "Joseph Jeune",               title: "VP — Architecture & Digital",     org: "Bangalore Intl Airport",       photo: "Joseph-Jeune.webp" },
  { name: "Rahul Bharde",               title: "SVP, Analytics & Insights",       org: "Jubilant Foodworks",           photo: "Rahul-Bharde.webp" },
  { name: "Ritesh Mohan Srivastava",    title: "Chief AI Officer",                org: "Jindal Steel & Power",         photo: "Ritesh-Mohan-Srivastava.webp" },
  { name: "Sanjay Maradi",              title: "Partner CIO",                     org: "KPMG Global Services",         photo: "Sanjay-Maradi.webp" },
  { name: "Sanjay Rastogi",             title: "VP Technology",                   org: "Jio Financial Services",       photo: "Sanjay-Rastogi.webp" },
  { name: "Suresh Yadav",               title: "Sr. Director, AI & Tech",         org: "Commonwealth International",   photo: "Suresh-Yadav.webp" },
  { name: "Sushil Meher",               title: "Medical Informatics",             org: "AIIMS",                        photo: "Sushil-Meher.webp" },
  { name: "Udit Pahwa",                 title: "Chief Information Officer",       org: "Blue Star Limited",            photo: "Udit-Pahwa.webp" },
  { name: "V Ranganathan Iyer",         title: "Senior EVP & Group CIO",          org: "JBM Group",                    photo: "V-Ranganathan-Iyer.webp" },
  { name: "Vivek Zakarde",              title: "Head Data Engineering",           org: "India First Life",             photo: "Vivek-Zakarde.webp" },
];

const PAST_SPONSORS = [
  { name: "Intel",            logo: "https://bigcioshow.com/assets/img/clients/intel-logo.webp" },
  { name: "Dell Technologies",logo: "https://bigcioshow.com/assets/img/clients/dell-technologies.webp" },
  { name: "Cisco",            logo: "https://bigcioshow.com/assets/img/clients/cisco.webp" },
  { name: "IBM",              logo: "https://bigcioshow.com/assets/img/Testimonials/ibm.webp" },
  { name: "SAP",              logo: "https://bigcioshow.com/assets/img/clients/sap-concur.webp" },
  { name: "HPE",              logo: "https://bigcioshow.com/assets/img/clients/hpe.webp" },
  { name: "Fortinet",         logo: "https://bigcioshow.com/assets/img/clients/fortinet.webp" },
  { name: "TCS",              logo: "https://bigcioshow.com/assets/img/Testimonials/tcs.webp" },
  { name: "Cognizant",        logo: "https://bigcioshow.com/assets/img/Testimonials/cognizant.webp" },
  { name: "Darktrace",        logo: "https://bigcioshow.com/assets/img/clients/darktrace-logo.webp" },
  { name: "ManageEngine",     logo: "https://bigcioshow.com/assets/img/clients/manageengine.webp" },
  { name: "Tata Communications", logo: "https://bigcioshow.com/assets/img/clients/tata-communications.webp" },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        /* ── HERO ── */
        .bh-hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          overflow: hidden; background: var(--bg-primary);
        }
        .bh-hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          opacity: 0.90; pointer-events: none;
        }
        .bh-hero-overlay {
          position: absolute; inset: 0;
          background: rgba(13,10,30,0.20);
          pointer-events: none;
        }
        .bh-hero-vignette {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(to bottom,
              rgba(13,10,30,0.40) 0%,
              transparent 30%,
              transparent 60%,
              rgba(13,10,30,0.82) 100%);
        }
        .bh-hero-orbs {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.28) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 15% 60%, rgba(124,58,237,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 85% 55%, rgba(192,132,252,0.08) 0%, transparent 60%);
        }
        .bh-hero-content {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 140px 40px 100px; max-width: 900px; width: 100%;
        }
        @property --bh-spark {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes bh-spark-travel {
          to { --bh-spark: 360deg; }
        }
        .bh-hero-logo-frame {
          --bh-spark: 0deg;
          position: relative;
          border-radius: 22px;
          padding: 1.5px;
          margin-top: 18px;
          margin-bottom: 20px;
          background: conic-gradient(
            from var(--bh-spark),
            rgba(124,58,237,0.08)   0%,
            rgba(124,58,237,0.08)  38%,
            rgba(124,58,237,0.60)  44%,
            rgba(192,132,252,1.00)  50%,
            rgba(124,58,237,0.60)  56%,
            rgba(124,58,237,0.08)  62%,
            rgba(124,58,237,0.08) 100%
          );
          animation: bh-spark-travel 7s linear infinite;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .bh-hero-logo-frame.in { opacity: 1; transform: none; }
        .bh-hero-logo-row {
          display: flex; align-items: center; justify-content: center;
          gap: 0;
          background: rgba(10,8,22,0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 20px;
          padding: 20px 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .bh-hero-logo {
          width: 260px; height: auto; display: block;
          filter: drop-shadow(0 0 24px rgba(192,132,252,0.22));
        }
        .bh-hero-logo-divider {
          width: 1px; height: 52px; flex-shrink: 0;
          background: rgba(255,255,255,0.12);
          margin: 0 24px;
        }
        .bh-hero-trescon {
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 6px;
        }
        .bh-hero-trescon-label {
          font-size: 13px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: #ffffff;
          white-space: nowrap;
        }
        .bh-hero-trescon img {
          height: 34px; width: auto; display: block;
          opacity: 1;
          filter: brightness(0) invert(1);
        }
        @media (max-width: 540px) {
          .bh-hero-logo-frame { border-radius: 18px; }
          .bh-hero-logo-row { border-radius: 16px; padding: 16px 22px; }
          .bh-hero-logo { width: 190px; }
          .bh-hero-logo-divider { height: 38px; margin: 0 16px; }
          .bh-hero-trescon img { height: 22px; }
        }
        .bh-hero-logo-wrap {
          position: relative;
          display: inline-flex;
        }
        .bh-edition-badge {
          position: absolute; top: -18px; left: 4px;
          display: flex; align-items: center; gap: 10px;
          opacity: 0; transform: translateY(6px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }
        .bh-edition-badge.in { opacity: 1; transform: none; }
        .bh-edition-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
          background: #C084FC;
          box-shadow: 0 0 8px rgba(192,132,252,0.80);
          animation: bcio-pulse 2s ease-in-out infinite;
        }
        @keyframes bh-edition-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bh-edition-text {
          font-size: 13px; font-weight: 800; letter-spacing: 0.24em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #fff, #D8B4FE, #C084FC, #D8B4FE, #fff);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: bh-edition-shift 7s ease-in-out infinite;
        }
        .bh-hero-datevenue {
          display: flex; align-items: center; justify-content: center;
          gap: 24px; margin-top: 4px; margin-bottom: 36px;
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.7s ease 0.32s, transform 0.7s ease 0.32s;
        }
        .bh-hero-datevenue.in { opacity: 1; transform: none; }
        .bh-hero-datevenue-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.03em;
          color: #ffffff;
        }
        .bh-hero-datevenue-item svg { color: #C084FC; flex-shrink: 0; }
        .bh-hero-datevenue-sep {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(192,132,252,0.50); flex-shrink: 0;
        }
        .bh-h1 {
          font-size: clamp(32px, 4.5vw, 64px);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 1.05; color: #fff;
          margin-bottom: 20px;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.8s ease 0.30s, transform 0.8s ease 0.30s;
        }
        .bh-h1.in { opacity: 1; transform: none; }
        .bh-h1 .bh-grad {
          background: linear-gradient(110deg, #C084FC 0%, #fff 60%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bh-tagline {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 40px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .bh-tagline.in { opacity: 1; transform: none; }
        .bh-tagline-line {
          flex: 1; height: 1px; max-width: 60px;
          background: linear-gradient(90deg, transparent, rgba(192,132,252,0.50));
        }
        .bh-tagline-line:last-child {
          background: linear-gradient(90deg, rgba(192,132,252,0.50), transparent);
        }
        .bh-tagline-text {
          font-size: clamp(11px, 1.0vw, 13px); font-weight: 500;
          font-style: italic; letter-spacing: 0.06em;
          background: linear-gradient(100deg, #C084FC 0%, #ffffff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap; line-height: 1;
        }
        @media (max-width: 680px) {
          .bh-tagline-text { white-space: normal; text-align: center; font-size: 18px; }
          .bh-tagline-line { display: none; }
        }
        .bh-ctas {
          display: flex; align-items: center; gap: 12px;
          flex-wrap: wrap; justify-content: center;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.7s ease 0.56s, transform 0.7s ease 0.56s;
        }
        .bh-ctas.in { opacity: 1; transform: none; }
        @media (max-width: 768px) {
          .bh-hero-content { padding: 110px 24px 80px; }
          .bh-hero-logo { width: 160px; }
        }

        /* ── STATS ── */
        .bh-stats {
          background: var(--bg-surface);
          border-top: 1px solid rgba(124,58,237,0.20);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .bh-stats-inner {
          max-width: 1320px; margin: 0 auto;
          display: flex; justify-content: center;
          flex-wrap: wrap; gap: 0;
        }
        .bh-stat {
          padding: 36px 56px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative; cursor: default;
        }
        .bh-stat:last-child { border-right: none; }
        .bh-stat-val {
          font-size: 38px; font-weight: 900;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #7C3AED, #C084FC);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1; margin-bottom: 8px;
        }
        .bh-stat-lbl {
          font-size: 13px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: #ffffff;
        }
        .bh-stat::after {
          content: ''; position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          width: 0; height: 2px;
          background: linear-gradient(90deg, #7C3AED, #C084FC);
          transition: width 0.5s ease;
        }
        .bh-stat:hover::after { width: 60%; }

        /* ── THEMES ── */
        .bh-themes {
          max-width: 1320px; margin: 0 auto;
          padding: 100px 40px;
        }
        .bh-section-head { text-align: center; margin-bottom: 56px; }
        .bh-section-h2 {
          font-size: clamp(20px, 2.4vw, 32px); font-weight: 800;
          letter-spacing: -0.02em; color: #fff; line-height: 1.15;
        }
        .bh-section-h2 em {
          font-style: normal;
          background: linear-gradient(100deg, #9461FA 0%, #C084FC 55%, #D8B4FE 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bh-section-sub {
          font-size: 18px; color: var(--text-body);
          max-width: 560px; margin: 12px auto 0; line-height: 1.7;
        }
        .bh-themes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .bcio-theme-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 24px;
          position: relative;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          overflow: hidden;
        }
        .bcio-theme-card:hover {
          border-color: rgba(124,58,237,0.35); transform: translateY(-3px);
          box-shadow: 0 0 0 1px rgba(124,58,237,0.15), 0 0 28px rgba(124,58,237,0.12);
        }
        /* Featured card (AI — spans 2×2) */
        .bcio-theme-card-feat {
          grid-column: 1 / 3; grid-row: 1 / 3;
          padding: 36px 32px;
          display: flex; flex-direction: column; justify-content: flex-end;
          background: linear-gradient(145deg, rgba(124,58,237,0.14) 0%, var(--bg-card) 60%);
          border-color: rgba(124,58,237,0.22);
          min-height: 300px;
        }
        .bcio-theme-card-feat .bh-theme-ghost { font-size: 130px; opacity: 0.20; top: 6px; right: 16px; }
        .bcio-theme-card-feat .bh-theme-title { font-size: 22px; margin-bottom: 12px; }
        .bcio-theme-card-feat .bh-theme-desc { font-size: 18px; max-width: 360px; margin-bottom: 0; }
        .bcio-theme-card-feat .bh-theme-icon { width: 52px; height: 52px; border-radius: 14px; margin-bottom: 20px; }
        .bh-feat-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
        .bh-feat-tag {
          font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
          color: var(--cyan); background: rgba(124,58,237,0.12);
          border: 1px solid rgba(124,58,237,0.28);
          border-radius: 100px; padding: 5px 14px;
        }
        /* Wide card (M&A — spans all 4 cols, bottom row) */
        .bcio-theme-card-wide {
          grid-column: 1 / 5; grid-row: 4;
          display: flex; flex-direction: row;
          align-items: center; gap: 28px; padding: 28px 40px;
        }
        .bcio-theme-card-wide .bh-theme-ghost {
          position: relative; top: auto; right: auto;
          font-size: 72px; opacity: 0.20; flex-shrink: 0;
          line-height: 1; order: -1;
        }
        .bcio-theme-card-wide .bh-theme-content { flex: 1; }
        .bh-theme-ghost {
          position: absolute; top: 8px; right: 14px;
          font-size: 64px; font-weight: 900; letter-spacing: -0.04em;
          color: #7C3AED; opacity: 0.18; line-height: 1;
          pointer-events: none; user-select: none; z-index: 0;
        }
        .bh-theme-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(192,132,252,0.08) 100%);
          border: 1px solid transparent;
          background-clip: padding-box;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          position: relative; z-index: 1;
          transition: opacity 0.3s;
          flex-shrink: 0;
        }
        .bh-theme-icon::before {
          content: ''; position: absolute; inset: -1px;
          border-radius: 11px;
          background: linear-gradient(135deg, #7C3AED, #C084FC);
          z-index: -1; opacity: 0.35;
          transition: opacity 0.3s;
        }
        .bh-theme-icon svg { color: var(--cyan); position: relative; z-index: 1; }
        .bcio-theme-card:hover .bh-theme-icon::before { opacity: 0.65; }
        .bh-theme-title {
          font-size: 18px; font-weight: 800; color: #fff;
          margin-bottom: 8px; letter-spacing: -0.01em; line-height: 1.3;
          position: relative; z-index: 1;
        }
        .bh-theme-desc {
          font-size: 18px; color: #ffffff; line-height: 1.75;
          position: relative; z-index: 1;
        }

        /* ── WHY ATTEND ── */
        .bh-why {
          background: var(--bg-surface);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .bh-why-inner {
          max-width: 1320px; margin: 0 auto; padding: 80px 40px;
        }
        .bh-why-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
          margin-top: 48px;
        }
        .bcio-why-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px 28px 28px;
          position: relative;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .bcio-why-card:hover {
          border-color: rgba(192,132,252,0.25); transform: translateY(-3px);
          box-shadow: 0 0 0 1px rgba(192,132,252,0.10), 0 0 24px rgba(192,132,252,0.08);
        }
        .bh-why-ghost {
          position: absolute; top: 8px; right: 16px;
          font-size: 80px; font-weight: 900; letter-spacing: -0.05em;
          color: #7C3AED; opacity: 0.18; line-height: 1;
          pointer-events: none; user-select: none; z-index: 0;
        }
        .bh-why-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(192,132,252,0.08) 100%);
          border: 1px solid transparent;
          background-clip: padding-box;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          position: relative; z-index: 1;
          transition: opacity 0.3s;
        }
        .bh-why-icon::before {
          content: ''; position: absolute; inset: -1px;
          border-radius: 13px;
          background: linear-gradient(135deg, #7C3AED, #C084FC);
          z-index: -1; opacity: 0.35;
          transition: opacity 0.3s;
        }
        .bh-why-icon svg { color: var(--cyan); position: relative; z-index: 1; }
        .bcio-why-card:hover .bh-why-icon::before { opacity: 0.65; }
        .bh-why-title {
          font-size: 18px; font-weight: 800; color: #fff;
          margin-bottom: 10px; letter-spacing: -0.01em;
          position: relative; z-index: 1; line-height: 1.3;
        }
        .bh-why-desc {
          font-size: 18px; color: #ffffff; line-height: 1.75;
          position: relative; z-index: 1;
        }

        /* ── SPEAKERS CAROUSEL ── */
        .bh-speakers {
          padding: 80px 0;
          overflow: hidden;
        }
        .bh-speakers-head {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          text-align: center; margin-bottom: 48px;
        }
        @keyframes bh-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .bh-carousel-outer {
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }
        .bh-carousel-track {
          display: flex; gap: 16px;
          width: max-content;
          animation: bh-scroll 50s linear infinite;
        }
        .bh-carousel-outer:hover .bh-carousel-track {
          animation-play-state: paused;
        }
        .bh-spk-card {
          flex-shrink: 0; width: 200px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          cursor: default;
        }
        .bh-spk-card:hover {
          border-color: rgba(124,58,237,0.40); transform: translateY(-4px);
          box-shadow: 0 0 0 1px rgba(124,58,237,0.18), 0 0 32px rgba(124,58,237,0.14);
        }
        .bh-spk-photo {
          width: 100%; height: 220px; overflow: hidden;
          background: var(--bg-surface);
          position: relative;
        }
        .bh-spk-photo img {
          width: 100%; height: 100%; object-fit: cover; object-position: top center;
          display: block;
          transition: transform 0.4s ease;
        }
        .bh-spk-card:hover .bh-spk-photo img { transform: scale(1.05); }
        .bh-spk-photo::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60px;
          background: linear-gradient(to bottom, transparent, var(--bg-card));
        }
        .bh-spk-info {
          padding: 14px 16px 18px;
        }
        .bh-spk-name {
          font-size: 18px; font-weight: 800; color: #fff;
          margin-bottom: 3px; line-height: 1.3;
        }
        .bh-spk-role {
          font-size: 18px; color: var(--cyan); font-weight: 600;
          margin-bottom: 2px; line-height: 1.4;
        }
        .bh-spk-org {
          font-size: 18px; color: rgba(255,255,255,0.92);
          font-weight: 500; line-height: 1.4;
        }
        .bh-speakers-cta {
          text-align: center; margin-top: 40px;
        }

        /* ── SPONSORS ── */
        .bh-sponsors {
          background: var(--bg-surface);
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .bh-sponsors-inner {
          max-width: 1320px; margin: 0 auto; padding: 80px 40px;
        }
        .bh-sponsors-label {
          text-align: center; margin-bottom: 48px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.92);
        }
        .bh-sponsors-logo-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 12px;
        }
        @media (max-width: 900px) { .bh-sponsors-logo-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 540px) { .bh-sponsors-logo-grid { grid-template-columns: repeat(3, 1fr); } }
        .bh-sponsor-logo-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          height: 72px;
          display: flex; align-items: center; justify-content: center;
          padding: 12px 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
          overflow: hidden;
        }
        .bh-sponsor-logo-card:hover {
          border-color: rgba(255,255,255,0.16);
          box-shadow: 0 0 16px rgba(0,0,0,0.25);
        }
        .bh-sponsor-logo-card img {
          max-width: 100%; max-height: 40px;
          width: auto; height: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.70;
          transition: opacity 0.2s;
        }
        .bh-sponsor-logo-card:hover img { opacity: 1; }

        /* ── CTA STRIP ── */
        .bh-cta-strip {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #080614 0%, #060412 100%);
          border-top: 1px solid rgba(124,58,237,0.15);
        }
        .bh-cta-strip::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(124,58,237,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .bh-cta-inner {
          position: relative; z-index: 2;
          max-width: 860px; margin: 0 auto;
          padding: 100px 40px; text-align: center;
        }
        .bh-cta-inner h2 {
          font-size: clamp(20px, 2.4vw, 34px); font-weight: 800;
          letter-spacing: -0.02em; color: #fff;
          line-height: 1.15; margin-bottom: 16px;
        }
        .bh-cta-inner h2 span {
          background: linear-gradient(100deg, #7C3AED, #C084FC);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bh-cta-inner p {
          font-size: 18px; color: var(--text-body);
          max-width: 520px; margin: 0 auto 40px; line-height: 1.75;
        }
        .bh-cta-btns {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; flex-wrap: wrap;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .bh-themes-grid { grid-template-columns: repeat(2, 1fr); }
          .bcio-theme-card-feat { grid-column: 1 / 3; grid-row: auto; min-height: 0; }
          .bcio-theme-card-wide { grid-column: 1 / 3; grid-row: auto; flex-direction: column; align-items: flex-start; gap: 0; }
          .bcio-theme-card-wide .bh-theme-ghost { display: none; }
          .bh-why-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .bh-hero-content { padding: 96px 24px 56px; }
          .bh-stat { padding: 24px 28px; }
          .bh-stat-val { font-size: 28px; }
          .bh-themes, .bh-sponsors-inner { padding: 64px 24px; }
          .bh-why-inner { padding: 64px 24px; }
          .bh-cta-inner { padding: 72px 24px; }
          .bh-themes-grid { grid-template-columns: 1fr; }
          .bcio-theme-card-feat, .bcio-theme-card-wide { grid-column: auto; grid-row: auto; min-height: 0; }
          .bh-speakers-head { padding: 0 24px; }
        }
        @media (max-width: 540px) {
          .bh-why-grid { grid-template-columns: 1fr; }
          .bh-meta-sep { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="bh-hero">
        <video
          className="bh-hero-video"
          src={EVENT.assets.hero_video}
          poster={EVENT.assets.hero_poster}
          autoPlay muted loop playsInline
        />
        <div className="bh-hero-overlay" />
        <div className="bh-hero-vignette" />
        <div className="bh-hero-orbs" />

        <div className="bh-hero-content">
          <div className="bh-hero-logo-wrap">
            <div className={`bh-edition-badge${mounted ? " in" : ""}`}>
              <div className="bh-edition-badge-dot" />
              <span className="bh-edition-text">{EVENT.edition_num} Global Edition</span>
            </div>
            <div className={`bh-hero-logo-frame${mounted ? " in" : ""}`}>
              <div className="bh-hero-logo-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={EVENT.assets.logo} alt={`${EVENT.name} ${EVENT.edition}`} className="bh-hero-logo" />
                <div className="bh-hero-logo-divider" />
                <div className="bh-hero-trescon">
                  <span className="bh-hero-trescon-label">An Event by</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/trescon-logo.png" alt="Trescon" />
                </div>
              </div>
            </div>
          </div>
          <div className={`bh-hero-datevenue${mounted ? " in" : ""}`}>
            <div className="bh-hero-datevenue-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {EVENT.date_display}
            </div>
            <div className="bh-hero-datevenue-sep" />
            <div className="bh-hero-datevenue-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {EVENT.venue_display}
            </div>
          </div>
          <h1 className={`bh-h1${mounted ? " in" : ""}`}>
            India&apos;s Premier<br />
            <span className="bh-grad">CIO Leadership Summit</span>
          </h1>
          <div className={`bh-tagline${mounted ? " in" : ""}`}>
            <span className="bh-tagline-line" />
            <span className="bh-tagline-text">{EVENT.tagline}</span>
            <span className="bh-tagline-line" />
          </div>
          <div className={`bh-ctas${mounted ? " in" : ""}`}>
            <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
              {EVENT.cta_primary_label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href={EVENT.enquire_url} className="bcio-btn-gold">
              Sponsor / Exhibit
            </a>
            <a href={EVENT.enquire_url} className="bcio-btn-outline">Speak at the Event</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="bh-stats">
        <div className="bh-stats-inner">
          {STATS.map(s => (
            <div key={s.label} className="bh-stat bcio-stat-box">
              <div className="bh-stat-val">{s.value}</div>
              <div className="bh-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── THEMES ── */}
      <div className="bh-themes" ref={statsRef}>
        <div className="bh-section-head">
          <div className="bcio-eyebrow">10 Technology Focus Areas</div>
          <h2 className="bh-section-h2">The Agenda That <em>Moves CIOs</em></h2>
          <p className="bh-section-sub">Every session is curated for technology executives making decisions that cost tens of millions and affect thousands of people.</p>
        </div>
        <div className="bh-themes-grid">
          {THEMES.map((t, i) => {
            const isFeat = i === 0;
            const isWide = i === 9;
            const cls = `bcio-theme-card${isFeat ? " bcio-theme-card-feat" : ""}${isWide ? " bcio-theme-card-wide" : ""}`;
            const gridStyle: React.CSSProperties = i === 1 ? { gridColumn: "3", gridRow: "1" }
              : i === 2 ? { gridColumn: "4", gridRow: "1" }
              : i === 3 ? { gridColumn: "3", gridRow: "2" }
              : i === 4 ? { gridColumn: "4", gridRow: "2" }
              : i === 5 ? { gridColumn: "1", gridRow: "3" }
              : i === 6 ? { gridColumn: "2", gridRow: "3" }
              : i === 7 ? { gridColumn: "3", gridRow: "3" }
              : i === 8 ? { gridColumn: "4", gridRow: "3" }
              : {};
            if (isWide) {
              return (
                <div key={t.title} className={cls} style={gridStyle}>
                  <div className="bh-theme-ghost">{t.ghost}</div>
                  <div className="bh-theme-content">
                    <div className="bh-theme-icon">{t.icon}</div>
                    <div className="bh-theme-title">{t.title}</div>
                    <div className="bh-theme-desc">{t.desc}</div>
                  </div>
                </div>
              );
            }
            if (isFeat) {
              return (
                <div key={t.title} className={cls} style={gridStyle}>
                  <div className="bh-theme-ghost">{t.ghost}</div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div className="bh-theme-icon" style={{ marginBottom: 20 }}>{t.icon}</div>
                    <div className="bh-theme-title">{t.title}</div>
                    <div className="bh-theme-desc">{t.desc}</div>
                    <div className="bh-feat-tags">
                      {["Enterprise AI", "Intelligent Automation", "AI ROI", "Agentic Systems", "Process Automation", "AI Governance"].map(tag => (
                        <span key={tag} className="bh-feat-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={t.title} className={cls} style={gridStyle}>
                <div className="bh-theme-ghost">{t.ghost}</div>
                <div className="bh-theme-icon">{t.icon}</div>
                <div className="bh-theme-title">{t.title}</div>
                <div className="bh-theme-desc">{t.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── WHY ATTEND ── */}
      <div className="bh-why">
        <div className="bh-why-inner">
          <div className="bh-section-head">
            <div className="bcio-eyebrow">Why Attend</div>
            <h2 className="bh-section-h2">Built Exclusively <em>for CIOs</em></h2>
            <p className="bh-section-sub">Not a conference. A strategic convening of India&apos;s technology leadership — every format, every conversation, every connection designed for the C-suite.</p>
          </div>
          <div className="bh-why-grid">
            {WHY.map(w => (
              <div key={w.num} className="bcio-why-card">
                <div className="bh-why-ghost">{w.num}</div>
                <div className="bh-why-icon">{w.icon}</div>
                <div className="bh-why-title">{w.title}</div>
                <div className="bh-why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAST SPEAKERS CAROUSEL ── */}
      <div className="bh-speakers">
        <div className="bh-speakers-head">
          <div className="bcio-eyebrow" style={{ justifyContent:"center" }}>Past Speakers</div>
          <h2 className="bh-section-h2">CIOs Who Have <em>Spoken Here</em></h2>
          <p className="bh-section-sub">800+ technology leaders across 15 editions. 2026 speaker announcements coming soon.</p>
        </div>
        <div className="bh-carousel-outer">
          <div className="bh-carousel-track">
            {[...PAST_SPEAKERS, ...PAST_SPEAKERS].map((s, i) => (
              <div key={i} className="bh-spk-card">
                <div className="bh-spk-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/speakers/${s.photo}`} alt={s.name} />
                </div>
                <div className="bh-spk-info">
                  <div className="bh-spk-name">{s.name}</div>
                  <div className="bh-spk-role">{s.title}</div>
                  <div className="bh-spk-org">{s.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bh-speakers-cta">
          <Link href="/speakers" className="bcio-btn-outline">
            View All Speakers
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      {/* ── SPONSORS ── */}
      <div className="bh-sponsors">
        <div className="bh-sponsors-inner">
          <div className="bh-sponsors-label">Trusted by India&apos;s Leading Technology Brands</div>
          <div className="bh-sponsors-logo-grid">
            {PAST_SPONSORS.map(s => (
              <div key={s.name} className="bh-sponsor-logo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.logo} alt={s.name} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link href="/partners" className="bcio-btn-outline">
              View All Partners
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── CTA STRIP ── */}
      <div className="bh-cta-strip">
        <div className="bh-cta-inner">
          <h2>Ready to Join <span>India&apos;s Largest CIO Gathering?</span></h2>
          <p>Seats are limited and fill fast. Register as a delegate, enquire about sponsorship, or apply to speak at the 15th edition.</p>
          <div className="bh-cta-btns">
            <a href={PASS_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
              Register as Delegate
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href={EVENT.enquire_url} className="bcio-btn-gold">
              Sponsor the Event
            </a>
            <a href={EVENT.enquire_url} className="bcio-btn-outline">Apply to Speak</a>
          </div>
        </div>
      </div>
    </>
  );
}
