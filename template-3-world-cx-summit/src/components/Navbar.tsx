"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { EVENT } from "@/config/event";

const PASS_URL = EVENT.register_url;

type Child = { href: string; label: string; external?: boolean };
type NavItem =
  | { href: string; label: string; children?: undefined }
  | { label: string; href: string; children: Child[] };

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  {
    label: "Attend",
    href: "/attend",
    children: [
      { href: "/attend",                                  label: "Overview" },
      { href: "/attend?tab=delegate",                     label: "Delegate" },
      { href: "/attend?tab=sponsor#enquire-form",         label: "Sponsor" },
      { href: "/attend?tab=exhibitor#enquire-form",       label: "Exhibitor" },
      { href: "/attend?tab=speaker#enquire-form",         label: "Speaker" },
      { href: "/attend?tab=media-partner",                label: "Media Partner" },
      { href: "/attend?tab=faqs",                         label: "FAQs" },
    ],
  },
  {
    label: "Agenda",
    href: "/agenda",
    children: [
      { href: "/agenda",            label: "Overview" },
      { href: "/agenda?tab=agenda", label: "Agenda" },
      { href: "/agenda?tab=themes", label: "Themes" },
    ],
  },
  { href: "/speakers", label: "Speakers" },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { href: "/partners",                                label: "Overview" },
      { href: "/partners?tab=sponsors",                   label: "Sponsors" },
      { href: "/partners?tab=exhibitors",                 label: "Exhibitors" },
      { href: "/partners?tab=media",                      label: "Media Partners" },
      { href: "/attend?tab=sponsor#enquire-form",         label: "Become a Partner" },
    ],
  },
  {
    label: "Connect",
    href: "/networking",
    children: [
      { href: "/networking",                        label: "Overview" },
      { href: "/networking?tab=attendee-app",       label: "Attendee App" },
      { href: "/networking?tab=ai-matchmaking",     label: "AI Matchmaking" },
      { href: "/networking?tab=photo-gallery",      label: "Photo Gallery" },
      { href: "/networking?tab=whatsapp",           label: "WhatsApp Marketing" },
    ],
  },
  { href: "/knowledge-hub", label: "Knowledge Hub" },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [openDrop, setOpenDrop]     = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const navRef      = useRef<HTMLElement>(null);
  const leaveTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onNavEnter = (label: string) => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
    setOpenDrop(label);
  };
  const onNavLeave = () => {
    leaveTimer.current = setTimeout(() => { setOpenDrop(null); leaveTimer.current = null; }, 120);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDrop(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) { setMenuOpen(false); setMobileOpen(null); }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{`
        .wcx-nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.35s, box-shadow 0.35s, border-color 0.35s;
          border-bottom: 1px solid transparent;
        }
        .wcx-nav.scrolled {
          background: rgba(10,22,40,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(54,188,176,0.18);
          box-shadow: 0 1px 0 rgba(54,188,176,0.08), 0 8px 32px rgba(0,0,0,0.4);
        }
        .wcx-nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 40px; height: 72px;
          display: flex; align-items: center; gap: 0;
        }
        .wcx-nav-logo {
          flex-shrink: 0; display: flex; align-items: center;
        }

        /* ── Desktop links ── */
        .wcx-nav-links {
          display: flex; align-items: center;
          gap: 2px; list-style: none;
          margin: 0 auto; padding: 0;
        }
        .wcx-nav-links > li {
          position: relative; height: 72px;
          display: flex; align-items: center;
        }
        .wcx-nav-link,
        .wcx-nav-drop-trigger {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.10em; text-transform: uppercase;
          color: rgba(255,255,255,0.70);
          background: none; border: none; cursor: pointer;
          padding: 6px 10px;
          display: flex; align-items: center; gap: 4px;
          transition: color 0.2s; white-space: nowrap;
          position: relative;
        }
        .wcx-nav-link::after,
        .wcx-nav-drop-trigger::after {
          content: '';
          position: absolute; bottom: -2px; left: 10px; right: 10px;
          height: 1.5px;
          background: var(--coral);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s ease;
        }
        .wcx-nav-link:hover,
        .wcx-nav-drop-trigger:hover,
        .wcx-nav-drop-trigger.active { color: #fff; }
        .wcx-nav-link:hover::after,
        .wcx-nav-drop-trigger.active::after { transform: scaleX(1); }

        .wcx-chevron {
          width: 9px; height: 9px;
          transition: transform 0.2s; flex-shrink: 0;
        }
        .wcx-nav-drop-trigger.active .wcx-chevron { transform: rotate(180deg); }

        /* ── Dropdown panel ── */
        .wcx-dropdown {
          position: absolute; top: 72px; left: 50%;
          transform: translateX(-50%);
          background: rgba(10,20,36,0.99);
          border: 1px solid rgba(54,188,176,0.22);
          border-top: 2px solid #36BCB0;
          min-width: 200px; overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.60);
          animation: wcx-dd 0.12s ease;
          z-index: 200;
          border-radius: 0 0 10px 10px;
        }
        @keyframes wcx-dd {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .wcx-dd-link {
          display: block; padding: 10px 20px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          transition: background 0.15s, color 0.15s, padding-left 0.15s;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .wcx-dd-link:last-child { border-bottom: none; }
        .wcx-dd-link:hover {
          background: rgba(54,188,176,0.12); color: #36BCB0; padding-left: 24px;
        }

        /* ── Awards pill ── */
        .wcx-nav-awards-pill {
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--gold);
          border: 1px solid rgba(201,168,76,0.45); padding: 6px 14px;
          display: inline-flex; align-items: center; gap: 6px;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          white-space: nowrap; text-decoration: none; margin-left: 8px;
          border-radius: 6px;
        }
        .wcx-nav-awards-pill:hover {
          background: rgba(201,168,76,0.10); border-color: var(--gold); color: var(--gold);
        }
        .wcx-nav-awards-pill svg { flex-shrink: 0; }

        /* ── CTAs ── */
        .wcx-nav-ctas {
          display: flex; align-items: center; gap: 10px;
          margin-left: auto; flex-shrink: 0;
        }
        .wcx-nav-register {
          font-size: 11px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: #fff;
          background: var(--coral); padding: 9px 20px;
          border: none; border-radius: 10px; cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s; white-space: nowrap;
        }
        .wcx-nav-register:hover {
          background: var(--coral-light);
          box-shadow: 0 4px 16px rgba(54,188,176,0.35);
        }
        .wcx-nav-enquire {
          font-size: 11px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: #fff;
          background: transparent; padding: 8px 20px;
          border: 1.5px solid rgba(255,255,255,0.25); border-radius: 10px;
          cursor: pointer; transition: border-color 0.2s, color 0.2s; white-space: nowrap;
        }
        .wcx-nav-enquire:hover { border-color: var(--coral); color: var(--coral); }

        /* ── Hamburger ── */
        .wcx-hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 4px; margin-left: auto;
          background: none; border: none; outline: none;
          user-select: none; -webkit-tap-highlight-color: transparent;
        }
        .wcx-hamburger span {
          width: 22px; height: 2px; background: #fff;
          border-radius: 2px; transition: all 0.25s; display: block;
        }
        .wcx-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .wcx-hamburger.open span:nth-child(2) { opacity: 0; }
        .wcx-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .wcx-mobile-menu {
          display: none;
          position: fixed; top: 72px; left: 0; right: 0; bottom: 0;
          background: rgba(10,22,40,0.98);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          z-index: 999; flex-direction: column;
          padding: 24px 24px 40px; gap: 0; overflow-y: auto;
        }
        .wcx-mobile-menu.open { display: flex; }
        .wcx-mob-link {
          font-size: 16px; font-weight: 700;
          color: rgba(255,255,255,0.85); padding: 14px 0;
          border-bottom: 1px solid rgba(54,188,176,0.10);
          display: flex; align-items: center; justify-content: space-between;
          background: none; border-top: none; border-left: none; border-right: none;
          cursor: pointer; width: 100%; text-align: left; transition: color 0.2s;
          text-decoration: none;
        }
        .wcx-mob-link:hover { color: var(--coral); }

        /* Split trigger row: label navigates, chevron toggles accordion */
        .wcx-mob-trigger-row {
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(54,188,176,0.10);
        }
        .wcx-mob-trigger-label {
          font-size: 16px; font-weight: 700;
          color: rgba(255,255,255,0.85);
          padding: 14px 0; flex: 1;
          transition: color 0.2s; text-decoration: none;
        }
        .wcx-mob-trigger-label:hover { color: var(--coral); }
        .wcx-mob-chevron-btn {
          background: none; border: none; cursor: pointer;
          padding: 14px 0 14px 20px;
          display: flex; align-items: center;
          color: rgba(255,255,255,0.45);
          -webkit-tap-highlight-color: transparent;
          transition: color 0.2s;
        }
        .wcx-mob-chevron-btn:hover { color: var(--coral); }
        .wcx-mob-chevron {
          width: 16px; height: 16px; transition: transform 0.2s;
        }
        .wcx-mob-children { overflow: hidden; transition: max-height 0.25s ease; }
        .wcx-mob-child {
          display: block; font-size: 13px; font-weight: 600; letter-spacing: 0.06em;
          color: rgba(255,255,255,0.50); padding: 10px 0 10px 20px;
          border-bottom: 1px solid rgba(54,188,176,0.06); transition: color 0.2s;
        }
        .wcx-mob-child:hover { color: var(--coral); }
        .wcx-mob-awards {
          color: var(--gold) !important;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .wcx-mob-awards:hover { color: #DBC06A !important; }
        .wcx-mob-btns {
          margin-top: 24px; display: flex; flex-direction: column; gap: 12px;
        }

        @media (max-width: 1024px) {
          .wcx-nav-links { display: none; }
          .wcx-nav-ctas  { display: none; }
          .wcx-hamburger { display: flex; }
        }
        @media (max-width: 768px) {
          .wcx-nav-inner { padding: 0 20px; }
        }
      `}</style>

      <nav className={`wcx-nav${scrolled ? " scrolled" : ""}`} ref={navRef}>
        <div className="wcx-nav-inner">

          <Link href="/" className="wcx-nav-logo" aria-label="World CX Summit & Awards">
            <Logo width={100} />
          </Link>

          {/* Desktop links */}
          <ul className="wcx-nav-links">
            {NAV.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  onMouseEnter={() => onNavEnter(item.label)}
                  onMouseLeave={onNavLeave}
                >
                  <button
                    className={`wcx-nav-drop-trigger${openDrop === item.label ? " active" : ""}`}
                    onClick={() => router.push(item.href)}
                  >
                    {item.label}
                    <svg className="wcx-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {openDrop === item.label && (
                    <div className="wcx-dropdown" onMouseEnter={() => onNavEnter(item.label)} onMouseLeave={onNavLeave}>
                      {item.children.map((c, ci) =>
                        c.external ? (
                          <a key={ci} href={c.href} className="wcx-dd-link" target="_blank" rel="noopener noreferrer" onClick={() => setOpenDrop(null)}>
                            {c.label}
                          </a>
                        ) : (
                          <Link key={ci} href={c.href} className="wcx-dd-link" onClick={() => setOpenDrop(null)}>
                            {c.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="wcx-nav-link">{item.label}</Link>
                </li>
              )
            )}
          </ul>

          <Link href="/awards" className="wcx-nav-awards-pill">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Awards
          </Link>

          <div className="wcx-nav-ctas">
            <Link href="/attend?tab=sponsor#enquire-form" className="wcx-nav-enquire">Enquire</Link>
            <a href={PASS_URL} className="wcx-nav-register" target="_blank" rel="noopener noreferrer">Register</a>
          </div>

          <button
            className={`wcx-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`wcx-mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV.map((item) =>
          item.children ? (
            <div key={item.label}>
              <div className="wcx-mob-trigger-row">
                <Link
                  href={item.href}
                  className="wcx-mob-trigger-label"
                  onClick={() => { setMenuOpen(false); setMobileOpen(null); }}
                >
                  {item.label}
                </Link>
                <button
                  className="wcx-mob-chevron-btn"
                  onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
                  aria-label={`Toggle ${item.label} submenu`}
                >
                  <svg
                    className="wcx-mob-chevron"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transform: mobileOpen === item.label ? "rotate(180deg)" : "none" }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </div>
              <div
                className="wcx-mob-children"
                style={{ maxHeight: mobileOpen === item.label ? `${item.children.length * 48}px` : "0" }}
              >
                {item.children.map((c, ci) =>
                  c.external ? (
                    <a
                      key={ci}
                      href={c.href}
                      className="wcx-mob-child"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { setMenuOpen(false); setMobileOpen(null); }}
                    >
                      {c.label}
                    </a>
                  ) : (
                    <Link
                      key={ci}
                      href={c.href}
                      className="wcx-mob-child"
                      onClick={() => { setMenuOpen(false); setMobileOpen(null); }}
                    >
                      {c.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="wcx-mob-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          )
        )}
        <Link href="/awards" className="wcx-mob-link wcx-mob-awards" onClick={() => setMenuOpen(false)}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Awards
          </span>
        </Link>
        <div className="wcx-mob-btns">
          <Link href="/attend?tab=sponsor#enquire-form" className="wcx-btn-outline" style={{ textAlign: "center" }} onClick={() => setMenuOpen(false)}>Enquire</Link>
          <a href={PASS_URL} className="wcx-btn-primary" style={{ textAlign: "center" }} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Register</a>
        </div>
      </div>
    </>
  );
}
