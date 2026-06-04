import Link from "next/link";
import { EVENT } from "@/config/event";

export default function Footer() {
  return (
    <>
      <style>{`
        .bcio-footer {
          background: #030812;
          border-top: 1px solid rgba(124,58,237,0.12);
          padding: 72px 40px 0;
        }
        .bcio-footer-inner { max-width: 1320px; margin: 0 auto; }
        .bcio-footer-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.4fr 1.4fr;
          gap: 56px; margin-bottom: 56px;
        }
        /* ── Col header ── */
        .bcio-footer-col-title {
          font-size: 13px; font-weight: 700; letter-spacing: 0.20em;
          text-transform: uppercase; color: #fff;
          margin-bottom: 24px;
        }
        /* ── Col 1: Event By ── */
        .bcio-footer-trescon-logo {
          display: block; margin-bottom: 28px;
        }
        .bcio-footer-trescon-logo img {
          height: 64px; width: auto; display: block;
          filter: brightness(0) invert(1);
          opacity: 0.90;
        }
        .bcio-footer-socials { display: flex; gap: 10px; }
        .bcio-footer-social {
          width: 38px; height: 38px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #ffffff;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .bcio-footer-social:hover {
          border-color: var(--cyan); color: var(--cyan);
          background: rgba(192,132,252,0.06);
        }
        /* ── Col 2–4: links ── */
        .bcio-footer-links { display: flex; flex-direction: column; gap: 14px; }
        .bcio-footer-links a {
          font-size: 18px; color: #ffffff;
          transition: color 0.2s; line-height: 1;
        }
        .bcio-footer-links a:hover { color: #fff; }
        /* ── Contact details ── */
        .bcio-footer-address {
          font-size: 18px; color: #ffffff;
          line-height: 1.75; margin-bottom: 16px;
        }
        .bcio-footer-contact-row {
          display: flex; flex-direction: column; gap: 10px;
        }
        .bcio-footer-contact-row a {
          font-size: 18px; color: #ffffff;
          transition: color 0.2s;
        }
        .bcio-footer-contact-row a:hover { color: var(--cyan); }
        /* ── Bottom bar ── */
        .bcio-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 24px 0 28px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .bcio-footer-copy {
          font-size: 18px; color: rgba(255,255,255,0.70);
        }
        .bcio-footer-legal { display: flex; gap: 24px; }
        .bcio-footer-legal a {
          font-size: 18px; color: rgba(255,255,255,0.72);
          transition: color 0.2s;
        }
        .bcio-footer-legal a:hover { color: #fff; }
        @media (max-width: 1024px) {
          .bcio-footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 540px) {
          .bcio-footer { padding: 56px 24px 0; }
          .bcio-footer-top { grid-template-columns: 1fr; gap: 36px; }
          .bcio-footer-legal { gap: 16px; }
        }
      `}</style>

      <footer className="bcio-footer">
        <div className="bcio-footer-inner">
          <div className="bcio-footer-top">

            {/* COL 1 — EVENT BY */}
            <div>
              <div className="bcio-footer-col-title">Event By</div>
              <a href={EVENT.site_url} target="_blank" rel="noopener noreferrer" className="bcio-footer-trescon-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={EVENT.assets.logo} alt={EVENT.organiser} />
              </a>
              <div className="bcio-footer-socials">
                <a href={EVENT.footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="bcio-footer-social" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href={EVENT.footer.social.twitter} target="_blank" rel="noopener noreferrer" className="bcio-footer-social" aria-label="X / Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href={EVENT.footer.social.instagram} target="_blank" rel="noopener noreferrer" className="bcio-footer-social" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              </div>
            </div>

            {/* COL 2–4 — Dynamic columns from config */}
            {EVENT.footer.columns.map(col => (
              <div key={col.heading}>
                <div className="bcio-footer-col-title">{col.heading}</div>
                <div className="bcio-footer-links">
                  {col.links.map(link => (
                    <Link key={link.href} href={link.href}>{link.label}</Link>
                  ))}
                </div>
              </div>
            ))}

          </div>

          {/* BOTTOM BAR */}
          <div className="bcio-footer-bottom">
            <div className="bcio-footer-copy">
              {EVENT.footer.copyright}
            </div>
            <div className="bcio-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
