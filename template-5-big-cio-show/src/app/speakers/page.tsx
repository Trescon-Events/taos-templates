"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const SPEAKERS = [
  { name: "Mohit Kapoor",             title: "Group Chief Technology Officer",          org: "Mahindra Group",                          photo: "Mohit-Kapoor.webp" },
  { name: "Gaurav Duggal",            title: "SVP IT & Innovation",                     org: "Jio Platforms",                           photo: "Gaurav-Duggal.webp" },
  { name: "Rajiv Chetwani",           title: "Director DISM",                           org: "ISRO",                                    photo: "Rajiv-Chetwani.webp" },
  { name: "Apurva Dalal",             title: "Chief Information Officer",               org: "Adani Green Energy",                      photo: "apurva-dalal.webp" },
  { name: "Rajkumar Ayyella",         title: "Chief Information Officer",               org: "RPG Group",                               photo: "Rajkumar-Ayyella.webp" },
  { name: "Tejas Shah",               title: "Chief Information Officer",               org: "L'Oreal India",                           photo: "Tejas-Shah.webp" },
  { name: "Pallavi Katiyar",          title: "Chief Information Officer",               org: "Tech Mahindra",                           photo: "Pallavi-Katiyar.webp" },
  { name: "Pavan Goyal",              title: "Chief Information Officer",               org: "Mphasis",                                 photo: "Pavan-Goyal.webp" },
  { name: "Ekroop Caur",              title: "Secretary IT, BT & S&T",                  org: "Govt of Karnataka",                       photo: "Ekroop-Caur.webp" },
  { name: "Neeta Verma",              title: "Director General of Information Technology", org: "Election Commission of India",          photo: "Neeta-Verma.webp" },
  { name: "Sanjay Dubey",             title: "Chairman MPSEDC",                         org: "Govt of Madhya Pradesh",                  photo: "Sanjay-Dubey.webp" },
  { name: "Alok Shankar Pandey",      title: "Group GM IT & CISO",                      org: "DFCCIL",                                  photo: "Alok-Shankar-Pandey.webp" },
  { name: "Anand Deodhar",            title: "Group CIO & Head IT",                     org: "Force Motors",                            photo: "anand-deodhar.webp" },
  { name: "Arunraja Karthick",        title: "Head IT Services & Security",             org: "DTDC Express",                            photo: "Arunraja-Karthick.webp" },
  { name: "Bhargab Dutta",            title: "Chief Digital Officer",                   org: "Century Plyboards",                       photo: "Bhargab-Dutta.webp" },
  { name: "Dr. Balakrishnan Nair T.M.", title: "Director",                              org: "INCOIS",                                  photo: "Dr.-Balakrishnan-Nair-T.M.webp" },
  { name: "Gaurav Srivastava",        title: "Head of Technology",                      org: "NPCI",                                    photo: "Gaurav-Srivastava.webp" },
  { name: "Joseph Jeune",             title: "VP — Head of Architecture & Digital",     org: "Bangalore International Airport",         photo: "Joseph-Jeune.webp" },
  { name: "Rahul Bharde",             title: "SVP, Head of Analytics & Insights",       org: "Jubilant Foodworks",                      photo: "Rahul-Bharde.webp" },
  { name: "Ritesh Mohan Srivastava",  title: "Chief AI Officer",                        org: "Jindal Steel & Power",                    photo: "Ritesh-Mohan-Srivastava.webp" },
  { name: "Sanjay Maradi",            title: "Partner CIO; Lead Member Firm Tech",      org: "KPMG Global Services",                    photo: "Sanjay-Maradi.webp" },
  { name: "Sanjay Rastogi",           title: "Vice President Technology",               org: "Jio Financial Services",                  photo: "Sanjay-Rastogi.webp" },
  { name: "Suresh Yadav",             title: "Senior Director, AI & Transformative Tech", org: "Commonwealth International",            photo: "Suresh-Yadav.webp" },
  { name: "Sushil Meher",             title: "Medical Informatics",                     org: "AIIMS",                                   photo: "Sushil-Meher.webp" },
  { name: "Udit Pahwa",               title: "Chief Information Officer",               org: "Blue Star Limited",                       photo: "Udit-Pahwa.webp" },
  { name: "V Ranganathan Iyer",       title: "Senior EVP & Group CIO",                  org: "JBM Group",                               photo: "V-Ranganathan-Iyer.webp" },
  { name: "Vivek Zakarde",            title: "Head of Data Engineering & Data Sciences", org: "India First Life",                       photo: "Vivek-Zakarde.webp" },
];

const BASE = "/speakers/";

const SPEAK_FORM_URL = "https://share.hsforms.com/17VGEEbEbTyKJfeJncVy0DA1rb8t";

export default function SpeakersPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [liveSpeakers, setLiveSpeakers] = useState<{id:string|number; name:string; title:string; company:string; img:string}[]>([]);
  const [speakersLoading, setSpeakersLoading] = useState(true);

  useEffect(() => {
    fetch("/api/speakers")
      .then(r => r.json())
      .then(data => {
        if (data.speakers && data.speakers.length > 0) {
          setLiveSpeakers(data.speakers);
        }
      })
      .catch(() => {})
      .finally(() => setSpeakersLoading(false));
  }, []);

  const displaySpeakers = liveSpeakers.length > 0
    ? liveSpeakers
    : SPEAKERS.map(s => ({ id: s.name, name: s.name, title: s.title, company: s.org, img: `${BASE}${s.photo}` }));

  return (
    <>
      <style>{`
        .bsp-page { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }

        /* ── HERO ── */
        .bsp-hero {
          background: var(--bg-surface);
          padding: 80px 40px 72px;
          text-align: center;
          position: relative; overflow: hidden;
          border-bottom: 1px solid rgba(124,58,237,0.12);
        }
        .bsp-hero::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 30% 40% at 90% 80%, rgba(192,132,252,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .bsp-hero-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .bsp-h1 {
          font-size: clamp(22px, 2.6vw, 38px); font-weight: 800;
          letter-spacing: -0.03em; color: #fff; line-height: 1.12; margin-bottom: 16px;
        }
        .bsp-h1 em { font-style: normal; color: var(--cyan); }
        .bsp-sub {
          font-size: 18px; color: var(--text-body);
          max-width: 580px; margin: 0 auto 36px; line-height: 1.75;
        }
        .bsp-hero-stats {
          display: flex; justify-content: center; gap: 48px; flex-wrap: wrap;
          padding-top: 40px; margin-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .bsp-hero-stat-val {
          font-size: 32px; font-weight: 900; letter-spacing: -0.02em;
          background: linear-gradient(135deg, #7C3AED, #C084FC);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: 5px;
        }
        .bsp-hero-stat-lbl {
          font-size: 13px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(255,255,255,0.90);
        }

        /* ── GRID ── */
        .bsp-body { max-width: 1320px; margin: 0 auto; padding: 80px 40px 100px; }
        .bsp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 72px;
        }
        .bsp-card {
          background: var(--bg-card);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          position: relative;
        }
        .bsp-card:hover {
          border-color: rgba(124,58,237,0.60);
          box-shadow:
            0 0 0 1px rgba(124,58,237,0.30),
            0 0 28px rgba(124,58,237,0.35),
            0 0 56px rgba(124,58,237,0.14);
          transform: translateY(-4px);
        }
        .bsp-card-top { position: relative; overflow: hidden; }
        .bsp-photo {
          width: 100%; aspect-ratio: 1/1;
          object-fit: cover; object-position: top center;
          display: block;
          filter: grayscale(15%) brightness(0.92);
          transition: filter 0.4s, transform 0.4s;
        }
        .bsp-card:hover .bsp-photo {
          filter: grayscale(0%) brightness(1.0);
          transform: scale(1.04);
        }
        .bsp-photo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(13,10,30,0.85) 100%);
          pointer-events: none;
        }
        .bsp-photo-fallback {
          width: 100%; aspect-ratio: 1/1;
          background: linear-gradient(135deg, rgba(124,58,237,0.20) 0%, rgba(192,132,252,0.10) 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; font-weight: 900; letter-spacing: -0.02em;
          color: rgba(192,132,252,0.50);
        }
        .bsp-card-body { padding: 20px 20px 22px; }
        .bsp-name {
          font-size: 18px; font-weight: 800; color: #fff;
          letter-spacing: -0.01em; line-height: 1.25; margin-bottom: 5px;
        }
        .bsp-title {
          font-size: 18px; color: rgba(192,132,252,0.75);
          font-weight: 600; line-height: 1.4; margin-bottom: 5px;
        }
        .bsp-org {
          font-size: 18px; font-weight: 700;
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.04em;
        }
        .bsp-card-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7C3AED, #C084FC);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s ease;
        }
        .bsp-card:hover .bsp-card-accent { transform: scaleX(1); }

        /* ── CTA ── */
        .bsp-apply {
          background: var(--bg-surface);
          border: 1px solid rgba(124,58,237,0.18);
          border-radius: 20px;
          padding: 72px 48px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .bsp-apply::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .bsp-apply-inner { position: relative; z-index: 2; }
        .bsp-apply h2 {
          font-size: clamp(18px, 2.2vw, 28px); font-weight: 800;
          letter-spacing: -0.02em; color: #fff; margin-bottom: 12px;
        }
        .bsp-apply h2 em { font-style: normal; color: var(--cyan); }
        .bsp-apply p {
          font-size: 18px; color: var(--text-body);
          max-width: 520px; margin: 0 auto 32px; line-height: 1.75;
        }

        @media (max-width: 1100px) { .bsp-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .bsp-hero { padding: 56px 24px 48px; }
          .bsp-body { padding: 48px 24px 72px; }
          .bsp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .bsp-apply { padding: 48px 24px; }
          .bsp-hero-stats { gap: 28px; }
        }
        @media (max-width: 480px) {
          .bsp-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }

        /* ── SPEAK MODAL ── */
        .bsp-modal-backdrop {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(0,0,0,0.78); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .bsp-modal {
          background: #fff; border-radius: 12px;
          width: 100%; max-width: 680px; max-height: 90vh;
          display: flex; flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.60);
        }
        .bsp-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 1px solid #e5e7eb;
          background: #fff; flex-shrink: 0;
        }
        .bsp-modal-title {
          font-size: 15px; font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: #111827;
        }
        .bsp-modal-close {
          background: none; border: none; cursor: pointer;
          color: #6b7280; padding: 4px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px; transition: background 0.15s, color 0.15s;
        }
        .bsp-modal-close:hover { background: #f3f4f6; color: #111827; }
        .bsp-modal iframe {
          flex: 1; border: none; width: 100%;
          min-height: 600px;
        }
      `}</style>

      <div className="bsp-page">

        {/* HERO */}
        <div className="bsp-hero">
          <div className="bsp-hero-inner">
            <div className="bcio-eyebrow">Confirmed Speakers · 15th Edition</div>
            <h1 className="bsp-h1">The CIOs <em>Already in the Room</em></h1>
            <p className="bsp-sub">
              India&apos;s most senior technology executives — CIOs, CTOs, Chief AI Officers, and government technology leaders from 27 of India&apos;s most influential organisations.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://konfhub.com/checkout/big-cio-show-awards-2026?ticketId=93845%7C1%3B&selectedCode=MKTWEBSITE" target="_blank" rel="noopener noreferrer" className="bcio-btn-primary">
                Register to Attend
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <button onClick={() => setFormOpen(true)} className="bcio-btn-outline">Apply to Speak</button>
            </div>
            <div className="bsp-hero-stats">
              {[
                { val: "27+", lbl: "Confirmed Speakers" },
                { val: "800+", lbl: "Across 15 Editions" },
                { val: "20+", lbl: "Industries Represented" },
              ].map(s => (
                <div key={s.lbl} style={{ textAlign: "center" }}>
                  <div className="bsp-hero-stat-val">{s.val}</div>
                  <div className="bsp-hero-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SPEAKERS GRID */}
        <div className="bsp-body">
          {speakersLoading ? (
            <div style={{ padding: "80px 0", textAlign: "center", color: "var(--text-muted)" }}>Loading speakers...</div>
          ) : (
          <div className="bsp-grid">
            {displaySpeakers.map((s, i) => (
              <div
                key={s.id}
                className="bsp-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="bsp-card-accent" />
                <div className="bsp-card-top">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={s.name}
                    className="bsp-photo"
                    onError={e => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="bsp-photo-fallback" style={{ display: "none" }}>
                    {s.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="bsp-photo-overlay" />
                </div>
                <div className="bsp-card-body">
                  <div className="bsp-name">{s.name}</div>
                  <div className="bsp-title">{s.title}</div>
                  <div className="bsp-org">{s.company}</div>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* APPLY CTA */}
          <div className="bsp-apply">
            <div className="bsp-apply-inner">
              <h2>Your Story Belongs <em>on This Stage</em></h2>
              <p>
                We are finalising the speaker lineup for the 15th edition. We select practitioners — not vendors. If you have led a transformation that moved the needle, apply now.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setFormOpen(true)} className="bcio-btn-primary">
                  Submit Speaker Application
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <Link href="/agenda" className="bcio-btn-outline">View Agenda Themes</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPEAKER APPLICATION MODAL */}
      {formOpen && (
        <div className="bsp-modal-backdrop" onClick={() => setFormOpen(false)}>
          <div className="bsp-modal" onClick={e => e.stopPropagation()}>
            <div className="bsp-modal-header">
              <span className="bsp-modal-title">Speaker Application — BIG CIO Show 2026</span>
              <button className="bsp-modal-close" onClick={() => setFormOpen(false)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <iframe src={SPEAK_FORM_URL} title="Speaker Application Form" loading="lazy" />
          </div>
        </div>
      )}
    </>
  );
}
