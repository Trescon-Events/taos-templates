"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { EVENT } from "@/config/event";

const NAV_ITEMS = EVENT.nav_items;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };
  const keepOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(30,35,35,0.97)" : "#1E2323",
        borderBottom: scrolled ? "1px solid rgba(240,237,232,0.07)" : "none",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <div style={{
          maxWidth: 1440, margin: "0 auto", padding: "0 40px",
          display: "flex", alignItems: "center", height: 72, gap: 0,
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", marginRight: 48, flexShrink: 0 }}>
            <img src={EVENT.assets.logo} alt={EVENT.name} style={{ height: 44, width: "auto", display: "block" }} />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 0, flex: 1 }} className="vault-desktop-nav">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => item.links ? openMenu(item.label) : undefined}
                onMouseLeave={() => item.links ? closeMenu() : undefined}
              >
                {item.links ? (
                  <button style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "8px 16px", fontSize: 14, fontWeight: 600,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    color: activeMenu === item.label ? "#fff" : "rgba(240,237,232,0.75)",
                    display: "flex", alignItems: "center", gap: 5,
                    transition: "color 0.2s",
                  }}>
                    {item.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.55, transform: activeMenu === item.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                ) : (
                  <a href={item.href} style={{
                    padding: "8px 16px", fontSize: 14, fontWeight: 600,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    color: "rgba(240,237,232,0.75)",
                    textDecoration: "none", display: "block",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,237,232,0.75)")}
                  >
                    {item.label}
                  </a>
                )}

                {/* Dropdown */}
                {item.links && activeMenu === item.label && (
                  <div
                    onMouseEnter={keepOpen}
                    onMouseLeave={closeMenu}
                    style={{
                      position: "absolute", top: "calc(100% + 4px)", left: 0,
                      background: "#1E2323",
                      border: "1px solid rgba(240,237,232,0.10)",
                      minWidth: 210, zIndex: 200,
                      animation: "fadeSlideDown 0.15s ease",
                      boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                    }}
                  >
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setActiveMenu(null)}
                        style={{
                          display: "block", padding: "11px 20px",
                          fontSize: 13, fontFamily: "'IBM Plex Sans', sans-serif",
                          fontWeight: 500,
                          color: "rgba(240,237,232,0.65)",
                          textDecoration: "none",
                          borderBottom: "1px solid rgba(240,237,232,0.05)",
                          transition: "background 0.15s, color 0.15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,106,46,0.10)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "rgba(240,237,232,0.65)"; }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 8, marginLeft: 16, flexShrink: 0 }} className="vault-desktop-nav">
            <a href={EVENT.enquire_url} style={{
              padding: "10px 20px", fontSize: 14, fontWeight: 600,
              fontFamily: "'IBM Plex Sans', sans-serif",
              color: "#fff",
              border: "none",
              background: "rgba(255,255,255,0.10)",
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
            >
              {EVENT.cta_secondary_label}
            </a>
            <a href={EVENT.register_url} style={{
              padding: "10px 24px", fontSize: 14, fontWeight: 600,
              fontFamily: "'IBM Plex Sans', sans-serif",
              color: "#fff",
              background: "#0D6665",
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#0A4F4E")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0D6665")}
            >
              {EVENT.cta_primary_label}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="vault-mobile-btn"
            style={{
              display: "none", background: "none", border: "none",
              cursor: "pointer", padding: 6, flexDirection: "column", gap: 5, marginLeft: "auto",
            }}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 2, background: "var(--text-primary)", transition: "0.3s" }} />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        }} onClick={() => setMobileOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute", top: 72, right: 0,
              width: 300, maxHeight: "calc(100vh - 72px)",
              background: "#1E2323",
              borderLeft: "1px solid rgba(240,237,232,0.08)",
              overflowY: "auto",
              padding: "16px 0",
            }}
          >
            {NAV_ITEMS.map(item => (
              <div key={item.label}>
                {item.links ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      style={{
                        width: "100%", background: "none", border: "none", cursor: "pointer",
                        padding: "13px 24px", textAlign: "left",
                        fontSize: 14, fontWeight: 600, fontFamily: "'IBM Plex Sans', sans-serif",
                        color: "var(--text-primary)",
                        display: "flex", justifyContent: "space-between",
                      }}
                    >
                      {item.label}
                      <span style={{ color: "#B86A2E", fontSize: 18 }}>{mobileExpanded === item.label ? "−" : "+"}</span>
                    </button>
                    {mobileExpanded === item.label && (
                      <div style={{ background: "rgba(0,0,0,0.3)", padding: "4px 0" }}>
                        {item.links.map(link => (
                          <a key={link.label} href={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{ display: "block", padding: "10px 40px", fontSize: 13, color: "rgba(240,237,232,0.6)", textDecoration: "none" }}
                          >{link.label}</a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ display: "block", padding: "13px 24px", fontSize: 14, fontWeight: 600, fontFamily: "'IBM Plex Sans', sans-serif", color: "var(--text-primary)", textDecoration: "none" }}
                  >{item.label}</a>
                )}
              </div>
            ))}
            <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid rgba(240,237,232,0.08)", marginTop: 8 }}>
              <a href={EVENT.enquire_url} style={{ textAlign: "center", padding: "12px", background: "rgba(255,255,255,0.10)", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>{EVENT.cta_secondary_label}</a>
              <a href={EVENT.register_url} style={{ textAlign: "center", padding: "12px", background: "#0D6665", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>{EVENT.cta_primary_label}</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1100px) {
          .vault-desktop-nav { display: none !important; }
          .vault-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
