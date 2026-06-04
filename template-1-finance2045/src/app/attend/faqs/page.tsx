"use client";
import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "What is Finance 2045?",
    a: `Finance 2045 is Southeast Asia's preeminent financial summit. It is an exclusive, two-day "deal room" that connects global capital and frontier technology with Indonesia's booming $18 billion fintech market to empower the "Golden Indonesia 2045" vision.`,
  },
  {
    q: "When and where is the event taking place?",
    a: "The summit will be held on 7–8 July 2026 at the Sheraton Grand in Jakarta, Indonesia.",
  },
  {
    q: "Who should attend Finance 2045?",
    a: "The event is strictly curated for over 1,000 C-suite and senior executives. The audience includes 300+ BFSI leaders (CEOs, CTOs, Digital Chiefs), 500+ Enterprise & SME leaders (CFOs, Treasurers), 100+ top-tier Investors, and 100+ key policymakers from institutions like Bank Indonesia and OJK.",
  },
  {
    q: "Who is organising Finance 2045?",
    a: "The summit is organised by Trescon — a premier architect of global financial technology ecosystems and the strategic force behind world-renowned events like the Dubai Fintech Summit and the World AI Show.",
  },
  {
    q: `What does "co-located with the World AI Show" mean for attendees?`,
    a: "Finance 2045 is proudly co-located with the 47th global edition of the World AI Show (WAIS). One delegate pass grants you unrestricted access to both mega-events, giving you double the networking power and access to enterprise-grade AI innovations on the same floor.",
  },
  {
    q: "What is the FinTech World Cup Qualifier?",
    a: "Finance 2045 is the official host of the Indonesia Qualifiers for the FinTech World Cup. Top disruptors will pitch live to an elite jury of active investors, and the winner will advance directly to the Grand Finale at the Dubai FinTech Summit.",
  },
  {
    q: "How can I schedule meetings with specific buyers or investors?",
    a: "We guarantee pipeline momentum through our AI Matchmaker. Attendees and sponsors can use it to pre-schedule targeted, 1-on-1 meetings up to 15 days before landing in Jakarta — ensuring you maximise your time on-site.",
  },
  {
    q: "Can anyone buy a ticket to attend?",
    a: "No. To maintain the exclusivity of our executive deal room, attendance is not a standard ticket purchase. Passes are strictly limited and subject to approval by the event driving committee and advisory board. You can submit an enquiry or apply for a complimentary pass via our website.",
  },
  {
    q: "What are the benefits of sponsoring Finance 2045?",
    a: `Unlike traditional expos, Finance 2045 focuses on outcomes over access. Sponsors bypass gatekeepers to access high-intent foot traffic, pitch to cross-sector buyers with verified budgets, and lead closed-door CXO boardrooms. We also offer a "Wishlist Guarantee" — where we personally invite and pre-schedule meetings with your specific target accounts.`,
  },
  {
    q: `What is the "Indonesian Arbitrage" opportunity?`,
    a: "While many markets face high acquisition costs and shrinking margins, Indonesia offers massive untapped scale (a population of 270 million), pro-innovation regulatory tailwinds, and significantly higher transaction margins. Finance 2045 is the ultimate vehicle to capitalise on this exact market gap.",
  },
];

export default function FAQsPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .faq-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }
        .faq-hero {
          padding: 72px 40px 56px; text-align: center;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(0,165,163,0.05) 0%, transparent 100%);
        }
        .faq-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 18px; }
        .faq-hero h1 { font-size: clamp(28px, 4vw, 52px); font-weight: 900; letter-spacing: -0.03em; color: #fff; margin-bottom: 16px; }
        .faq-hero h1 span { color: var(--teal); }
        .faq-hero p { font-size: 16px; color: var(--text-body); max-width: 540px; margin: 0 auto; line-height: 1.7; }
        .faq-body { max-width: 780px; margin: 0 auto; padding: 60px 40px 100px; }
        .faq-item {
          border: 1px solid rgba(255,255,255,0.07);
          border-left: 3px solid transparent;
          margin-bottom: 8px;
          transition: border-color 0.2s;
          background: var(--bg-card);
        }
        .faq-item.open {
          border-left-color: var(--teal);
          box-shadow: 0 0 28px rgba(0,165,163,0.12);
        }
        .faq-q {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 20px 22px;
          cursor: pointer; background: none; border: none;
          width: 100%; text-align: left; font-family: inherit;
        }
        .faq-q-text {
          font-size: 15px; font-weight: 700; color: #fff; line-height: 1.45;
        }
        .faq-item.open .faq-q-text { color: var(--teal); }
        .faq-chevron {
          width: 20px; height: 20px; flex-shrink: 0;
          color: var(--text-muted); transition: transform 0.22s, color 0.2s;
        }
        .faq-item.open .faq-chevron { transform: rotate(180deg); color: var(--teal); }
        .faq-a {
          padding: 0 22px 20px;
          font-size: 14px; color: var(--text-body); line-height: 1.75;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 16px;
        }
        .faq-cta {
          margin-top: 56px; text-align: center;
          padding: 40px 32px;
          background: var(--bg-surface); border: 1px solid var(--border);
        }
        .faq-cta h3 { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 10px; }
        .faq-cta p { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; line-height: 1.6; }
        .f45-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--teal); color: #fff; padding: 12px 26px; font-size: 12px; font-weight: 800; letter-spacing: 0.10em; text-transform: uppercase; text-decoration: none; transition: background 0.2s; }
        .f45-btn-primary:hover { background: var(--teal-light); }
        @media (max-width: 640px) { .faq-hero { padding: 52px 24px 40px; } .faq-body { padding: 40px 20px 80px; } .faq-q { padding: 16px 18px; } .faq-q-text { font-size: 14px; } .faq-a { padding: 0 18px 16px; padding-top: 12px; } }
      `}</style>

      <div className="faq-page">
        <div className="faq-hero">
          <div className="faq-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
            Attend · FAQs
          </div>
          <h1>Frequently Asked <span>Questions</span></h1>
          <p>Everything you need to know about Finance 2045 — before you book your seat.</p>
        </div>

        <div className="faq-body">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="faq-q-text">
                  <span style={{ color: "var(--gold)", marginRight: 10, fontWeight: 900 }}>0{i + 1}</span>
                  {item.q}
                </span>
                <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {open === i && <div className="faq-a">{item.a}</div>}
            </div>
          ))}

          <div className="faq-cta">
            <h3>Still have questions?</h3>
            <p>Our team responds to all enquiries within 24 hours.</p>
            <Link href="/attend/sponsor" className="f45-btn-primary">
              Submit an Enquiry
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
