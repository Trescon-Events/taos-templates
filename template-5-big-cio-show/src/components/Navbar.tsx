"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { EVENT } from "@/config/event";

const REGISTER_URL = EVENT.register_url;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = EVENT.nav_items;

  return (
    <>
      <style>{`
        .bcio-nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.35s, box-shadow 0.35s, border-color 0.35s;
          border-bottom: 1px solid transparent;
        }
        .bcio-nav.scrolled {
          background: rgba(13,10,30,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(124,58,237,0.18);
          box-shadow: 0 1px 0 rgba(124,58,237,0.08), 0 8px 32px rgba(0,0,0,0.5);
        }
        .bcio-nav-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 32px; height: 68px;
          display: flex; align-items: center; gap: 0;
        }
        .bcio-nav-logo {
          flex-shrink: 0; display: flex; align-items: center;
          text-decoration: none; margin-right: 20px;
        }
        .bcio-nav-logo img {
          height: 32px; width: auto; display: block;
        }
        .bcio-nav-links {
          display: flex; align-items: center; gap: 2px;
          list-style: none; margin: 0 auto; padding: 0; flex: 1;
          justify-content: center;
        }
        .bcio-nav-links a {
          font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(255,255,255,0.85);
          padding: 6px 9px; border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          display: block; white-space: nowrap;
        }
        .bcio-nav-links a:hover {
          color: #fff; background: rgba(255,255,255,0.06);
        }
        .bcio-nav-awards {
          font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--gold);
          border: 1px solid rgba(201,168,76,0.40);
          padding: 5px 11px; border-radius: 6px;
          display: inline-flex; align-items: center; gap: 5px;
          transition: background 0.2s, border-color 0.2s;
          white-space: nowrap; text-decoration: none;
          margin-left: 4px; flex-shrink: 0;
        }
        .bcio-nav-awards:hover {
          background: rgba(201,168,76,0.10); border-color: var(--gold);
        }
        .bcio-nav-ctas {
          display: flex; align-items: center; gap: 8px;
          margin-left: 12px; flex-shrink: 0;
        }
        .bcio-nav-enquire {
          font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: #fff;
          padding: 7px 14px; border: 1.5px solid rgba(255,255,255,0.22);
          border-radius: 7px; transition: border-color 0.2s, color 0.2s;
          white-space: nowrap; background: transparent; cursor: pointer;
          text-decoration: none;
        }
        .bcio-nav-enquire:hover { border-color: var(--cyan); color: var(--cyan); }
        .bcio-nav-register {
          font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: #fff;
          padding: 8px 16px; border: none; border-radius: 7px;
          background: linear-gradient(135deg, #7C3AED, #C084FC);
          cursor: pointer; transition: opacity 0.2s, box-shadow 0.2s;
          white-space: nowrap; text-decoration: none;
        }
        .bcio-nav-register:hover {
          opacity: 0.88;
          box-shadow: 0 4px 20px rgba(124,58,237,0.45);
        }
        .bcio-hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 4px; margin-left: auto;
          background: none; border: none; outline: none;
        }
        .bcio-hamburger span {
          width: 22px; height: 2px; background: #fff;
          border-radius: 2px; transition: all 0.25s; display: block;
        }
        .bcio-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .bcio-hamburger.open span:nth-child(2) { opacity: 0; }
        .bcio-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .bcio-mobile-menu {
          display: none; position: fixed;
          top: 68px; left: 0; right: 0; bottom: 0;
          background: rgba(13,10,30,0.98);
          backdrop-filter: blur(20px); z-index: 999;
          flex-direction: column; padding: 32px 24px; gap: 0;
          overflow-y: auto;
        }
        .bcio-mobile-menu.open { display: flex; }
        .bcio-mobile-menu a {
          font-size: 18px; font-weight: 700; color: #ffffff;
          padding: 16px 0; border-bottom: 1px solid rgba(124,58,237,0.12);
          display: block; transition: color 0.2s;
        }
        .bcio-mobile-menu a:hover { color: var(--cyan); }
        .bcio-mobile-btns { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; }
        @media (max-width: 960px) {
          .bcio-nav-links, .bcio-nav-ctas { display: none; }
          .bcio-nav-awards { display: none; }
          .bcio-hamburger { display: flex; }
        }
        @media (max-width: 640px) {
          .bcio-nav-inner { padding: 0 20px; }
          .bcio-nav-logo img { height: 28px; }
        }
      `}</style>

      <nav className={`bcio-nav${scrolled ? " scrolled" : ""}`}>
        <div className="bcio-nav-inner">
          <Link href="/" className="bcio-nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={EVENT.assets.logo_white} alt={`${EVENT.name} ${EVENT.edition}`} />
          </Link>

          <ul className="bcio-nav-links">
            {links.map(l => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>

          <Link href="/awards" className="bcio-nav-awards">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Awards
          </Link>

          <div className="bcio-nav-ctas">
            <a href={EVENT.enquire_url} className="bcio-nav-enquire">{EVENT.cta_secondary_label}</a>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="bcio-nav-register">{EVENT.cta_primary_label}</a>
          </div>

          <button className={`bcio-hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`bcio-mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(l => <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>)}
        <Link href="/awards" onClick={() => setMenuOpen(false)} style={{ color: "var(--gold)" }}>Awards</Link>
        <div className="bcio-mobile-btns">
          <a href={EVENT.enquire_url} className="bcio-btn-outline" onClick={() => setMenuOpen(false)}>{EVENT.cta_secondary_label}</a>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="bcio-btn-primary" onClick={() => setMenuOpen(false)}>{EVENT.cta_primary_label}</a>
        </div>
      </div>
    </>
  );
}
