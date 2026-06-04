"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { NAV_TOP } from "@/data/nav";
import { EVENT } from "@/config/event";

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 1200) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{`
        .f45-nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          background: transparent;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .f45-nav.scrolled {
          background: rgba(31,39,51,0.96);
          backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 rgba(0,165,163,0.20);
        }
        .f45-nav.open {
          background: rgba(31,39,51,0.96);
          box-shadow: none;
        }
        .f45-nav-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 32px; height: 72px;
          display: flex; align-items: center; gap: 0;
        }
        .f45-nav-logo {
          flex-shrink: 0; display: flex; align-items: center;
          gap: 14px; align-self: center; min-width: 0;
        }

        /* Desktop nav links */
        .f45-nav-links {
          display: flex; align-items: center;
          gap: 2px; list-style: none;
          margin: 0 auto; padding: 0;
        }
        .f45-nav-links > li {
          height: 72px;
          display: flex; align-items: center;
        }
        .f45-nav-link {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.78);
          padding: 6px 10px;
          display: flex; align-items: center;
          transition: color 0.2s; white-space: nowrap;
          text-decoration: none;
        }
        .f45-nav-link:hover { color: #00a5a3; }

        /* CTA buttons */
        .f45-nav-ctas {
          display: flex; align-items: center; gap: 10px;
          margin-left: 16px; flex-shrink: 0;
        }
        .f45-nav-book {
          font-size: 10px; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: #fff;
          background: #00A5A3; padding: 9px 18px;
          border: none; cursor: pointer; white-space: nowrap;
          transition: background 0.2s; text-decoration: none;
          display: inline-flex; align-items: center;
        }
        .f45-nav-book:hover { background: #00bfbd; }
        .f45-nav-enquire {
          font-size: 10px; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: #fff;
          background: transparent; padding: 8px 18px;
          border: 1.5px solid rgba(255,255,255,0.30);
          cursor: pointer; white-space: nowrap;
          transition: border-color 0.2s, color 0.2s; text-decoration: none;
          display: inline-flex; align-items: center;
        }
        .f45-nav-enquire:hover { border-color: #00a5a3; color: #00a5a3; }

        /* Hamburger */
        .f45-hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 4px; margin-left: auto;
          background: none; border: none;
          -webkit-tap-highlight-color: transparent;
        }
        .f45-hamburger span {
          width: 22px; height: 2px; background: #fff;
          border-radius: 2px; transition: all 0.25s;
        }

        /* Mobile menu */
        .f45-mobile {
          display: none;
          position: fixed; top: 72px; left: 0; right: 0; bottom: 0;
          background: rgba(31,39,51,0.99);
          backdrop-filter: blur(16px);
          z-index: 999;
          flex-direction: column;
          padding: 24px 24px 40px;
          overflow-y: auto;
          gap: 0;
        }
        .f45-mobile.open { display: flex; }
        .f45-mob-link {
          font-size: 16px; font-weight: 700;
          color: rgba(255,255,255,0.85);
          padding: 14px 0;
          border-bottom: 1px solid rgba(0,165,163,0.10);
          display: flex; align-items: center;
          text-decoration: none;
          transition: color 0.2s;
        }
        .f45-mob-link:hover { color: #00a5a3; }
        .f45-mob-btns {
          margin-top: 24px; display: flex; flex-direction: column; gap: 12px;
        }

        @media (max-width: 1200px) {
          .f45-nav-links { display: none; }
          .f45-nav-ctas  { display: none; }
          .f45-hamburger { display: flex; }
        }
        @media (max-width: 768px) {
          .f45-nav-inner { padding: 0 20px; }
        }
      `}</style>

      <nav className={`f45-nav ${scrolled ? "scrolled" : ""} ${menuOpen ? "open" : ""}`}>
        <div className="f45-nav-inner">
          <Link href="/" className="f45-nav-logo" aria-label="Finance 2045 home">
            <Logo width={110} />
          </Link>

          {/* Desktop links */}
          <ul className="f45-nav-links">
            {NAV_TOP.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="f45-nav-link">{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className="f45-nav-ctas">
            <Link href={EVENT.register_url} className="f45-nav-book">{EVENT.cta_primary_label}</Link>
            <Link href={EVENT.enquire_url} className="f45-nav-enquire">{EVENT.cta_secondary_label}</Link>
          </div>

          <button className="f45-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`f45-mobile${menuOpen ? " open" : ""}`}>
        {NAV_TOP.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="f45-mob-link"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div className="f45-mob-btns">
          <Link href={EVENT.register_url} className="f45-nav-book" style={{ textAlign: "center" }} onClick={() => setMenuOpen(false)}>{EVENT.cta_primary_label}</Link>
          <Link href={EVENT.enquire_url} className="f45-nav-enquire" style={{ textAlign: "center" }} onClick={() => setMenuOpen(false)}>{EVENT.cta_secondary_label}</Link>
        </div>
      </div>
    </>
  );
}
