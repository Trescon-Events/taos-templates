"use client";
import Link from "next/link";
import { EVENT } from "@/config/event";

const PASS_URL = EVENT.register_url;

const socials = [
  {
    name: "LinkedIn",
    href: EVENT.footer.social.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: EVENT.footer.social.twitter,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@tresconworld",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#060F1C"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: EVENT.footer.social.instagram,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-footer {
          background: #060F1C;
          border-top: 1px solid rgba(54,188,176,0.18);
          position: relative;
          overflow: hidden;
        }
        .ft-footer::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--coral) 35%, var(--gold) 65%, transparent);
        }

        /* Ghost logo */
        .ft-ghost {
          position: absolute;
          bottom: -30px; right: -40px;
          pointer-events: none; z-index: 0;
        }
        .ft-ghost img {
          height: 280px; width: auto;
          filter: brightness(0) invert(1);
          opacity: 0.025;
          user-select: none;
        }

        /* ── Main grid ── */
        .ft-main {
          max-width: 1240px;
          margin: 0 auto;
          padding: 64px 40px 48px;
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 48px;
          position: relative; z-index: 2;
        }

        /* Brand col */
        .ft-brand {}

        /* Social icons */
        .ft-socials {
          display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;
        }

        /* Trescon block */
        .ft-trescon-block {
          padding-top: 4px;
        }
        .ft-trescon-label {
          font-size: 8px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          margin-bottom: 10px;
        }
        .ft-trescon-logo {
          height: 80px; width: auto;
          display: block;
          margin-bottom: 12px;
          object-fit: contain;
        }
        .ft-trescon-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.38);
          line-height: 1.70;
          margin-bottom: 12px;
          max-width: 280px;
        }
        .ft-trescon-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--coral);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .ft-trescon-link:hover { opacity: 0.75; }
        .ft-social {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.10);
          color: var(--text-muted);
          text-decoration: none;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .ft-social:hover {
          border-color: rgba(54,188,176,0.45);
          color: var(--coral);
          background: rgba(54,188,176,0.08);
        }

        /* Link columns */
        .ft-col-title {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #fff;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 8px;
        }
        .ft-col-title::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(54,188,176,0.25);
        }
        .ft-links {
          list-style: none;
          display: flex; flex-direction: column; gap: 12px;
        }
        .ft-links a {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          transition: color 0.2s, gap 0.2s;
        }
        .ft-links a::before {
          content: '';
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(54,188,176,0.40);
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .ft-links a:hover { color: #fff; gap: 8px; }
        .ft-links a:hover::before { background: var(--coral); }

        /* ── Divider ── */
        .ft-divider {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative; z-index: 2;
        }
        .ft-divider-line {
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        /* ── Disclaimer ── */
        .ft-disclaimer-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 24px 40px;
          position: relative; z-index: 2;
        }
        .ft-disclaimer {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          line-height: 1.7;
          margin-bottom: 0;
        }
        .ft-disclaimer strong { color: rgba(255,255,255,0.40); font-weight: 600; }

        /* ── Bottom bar ── */
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative; z-index: 2;
        }
        .ft-bottom-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 18px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .ft-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.30);
        }
        .ft-copy span { color: var(--coral); }
        .ft-legal-links {
          display: flex; gap: 20px; flex-wrap: wrap;
        }
        .ft-legal-links a {
          font-size: 11px;
          color: rgba(255,255,255,0.30);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-legal-links a:hover { color: rgba(255,255,255,0.70); }

        @media (max-width: 1024px) {
          .ft-main { grid-template-columns: 1fr 1fr; gap: 40px; }
          .ft-brand { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .ft-main { grid-template-columns: 1fr; padding: 48px 24px 36px; }
          .ft-brand { grid-column: span 1; }
          .ft-bottom-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
          .ft-divider { padding: 0 24px; }
          .ft-disclaimer-wrap { padding: 20px 24px; }
          .ft-bottom-inner { padding: 16px 24px; }
          .ft-legal-links { gap: 12px; }
        }
      `}</style>

      <footer className="ft-footer">
        <div className="ft-ghost">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trescon-logo.png" alt="" aria-hidden="true" />
        </div>

        {/* Main columns */}
        <div className="ft-main">

          {/* Brand */}
          <div className="ft-brand">
            <div className="ft-socials">
              {socials.map((s) => (
                <a key={s.name} href={s.href} className="ft-social" target="_blank" rel="noopener noreferrer" title={s.name}>
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="ft-trescon-block">
              <div className="ft-trescon-label">An Event By</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trescon-logo.png" alt="Trescon Global" className="ft-trescon-logo" />
              <p className="ft-trescon-desc">
                Trescon is a global business events and consulting firm providing a wide range of business services to a diversified client base — delivering innovative, high-quality platforms for growth markets worldwide.
              </p>
              <a href="https://www.tresconglobal.com" target="_blank" rel="noopener noreferrer" className="ft-trescon-link">
                Visit Trescon Global
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer columns from config */}
          {EVENT.footer.columns.map((col) => (
            <div key={col.heading}>
              <div className="ft-col-title">{col.heading}</div>
              <ul className="ft-links">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="ft-divider"><div className="ft-divider-line" /></div>

        {/* Disclaimer */}
        <div className="ft-disclaimer-wrap">
          <p className="ft-disclaimer">
            <strong>Disclaimer:</strong> No part of this document/website may be reproduced, stored in a retrieval system, or transmitted, in any form or by any means, mechanical, electronic, photocopying, recording, or otherwise, without prior written permission of Trescon.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom">
          <div className="ft-bottom-inner">
            <div className="ft-copy">
              {EVENT.footer.copyright} {EVENT.name} — {EVENT.venue_city}, {EVENT.venue_country}.
            </div>
            <div className="ft-legal-links">
              <Link href="/terms">Terms &amp; Conditions</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms#general">General Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
