"use client";
import { EVENT } from "@/config/event";

const NAV_COLS = EVENT.footer.columns;

export default function Footer() {
  return (
    <footer style={{
      background: "#050608",
      borderTop: "1px solid var(--border-subtle)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top orange line */}
      <div style={{ height: 2, background: "var(--accent-orange)", opacity: 0.7 }} />

      <div className="container-vault" style={{ padding: "64px 40px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>
          {/* Brand col */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <img src={EVENT.assets.logo} alt={EVENT.name} style={{ height: 52, width: "auto", display: "block" }} />
            </div>
            <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7, maxWidth: 280 }}>
              {EVENT.footer.tagline}
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              {EVENT.footer.social.twitter && (
                <a href={EVENT.footer.social.twitter} target="_blank" rel="noopener noreferrer" style={{
                  width: 36, height: 36, background: "none",
                  border: "1px solid var(--border-subtle)", cursor: "pointer",
                  color: "var(--text-dim)", fontSize: 14, transition: "0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-orange)"; e.currentTarget.style.color = "var(--accent-orange)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-dim)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
              {EVENT.footer.social.linkedin && (
                <a href={EVENT.footer.social.linkedin} target="_blank" rel="noopener noreferrer" style={{
                  width: 36, height: 36, background: "none",
                  border: "1px solid var(--border-subtle)", cursor: "pointer",
                  color: "var(--text-dim)", fontSize: 14, transition: "0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-orange)"; e.currentTarget.style.color = "var(--accent-orange)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-dim)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              )}
              {EVENT.footer.social.facebook && (
                <a href={EVENT.footer.social.facebook} target="_blank" rel="noopener noreferrer" style={{
                  width: 36, height: 36, background: "none",
                  border: "1px solid var(--border-subtle)", cursor: "pointer",
                  color: "var(--text-dim)", fontSize: 14, transition: "0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-orange)"; e.currentTarget.style.color = "var(--accent-orange)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-dim)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Nav cols */}
          {NAV_COLS.map(col => (
            <div key={col.heading}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.16em",
                color: "var(--accent-orange)", marginBottom: 20,
              }}>{col.heading.toUpperCase()}</div>
              <ul style={{ listStyle: "none" }}>
                {col.links.map(link => (
                  <li key={link.label} style={{ marginBottom: 10 }}>
                    <a href={link.href} style={{
                      fontSize: 13, color: "var(--text-dim)", textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
                    >{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trescon credibility strip */}
        <div style={{
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: 32, paddingBottom: 24,
          marginBottom: 0,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "var(--text-dim)", marginBottom: 18 }}>
            ORGANISED BY TRESCON — PIONEER IN GLOBAL BUSINESS EVENTS SINCE 2016
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
            {EVENT.footer.trescon_stats.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "var(--accent-orange)", letterSpacing: "-0.02em" }}>{s.num}</div>
                <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2, letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid var(--border-subtle)", paddingTop: 28,
          flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
            {EVENT.footer.copyright}
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(link => (
              <a key={link} href="#" style={{
                fontSize: 12, color: "var(--text-dim)", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
              >{link}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container-vault > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          footer .container-vault > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
