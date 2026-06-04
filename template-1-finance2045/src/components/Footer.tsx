import Link from "next/link";
import Logo from "@/components/Logo";
import { EVENT } from "@/config/event";

export default function Footer() {
  return (
    <>
      <style>{`
        .f45-footer {
          background: var(--bg-surface);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 64px 0 0;
        }
        .f45-footer-inner {
          max-width: 1240px; margin: 0 auto; padding: 0 40px;
        }
        .f45-footer-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
          gap: 40px; padding-bottom: 56px;
        }
        .f45-footer-brand {
          display: flex; flex-direction: column; gap: 16px;
        }
        .f45-footer-tagline {
          font-size: 14px; color: rgba(255,255,255,0.50);
          line-height: 1.65; max-width: 220px;
        }
        .f45-footer-col h4 {
          font-size: 11px; font-weight: 800;
          color: rgba(255,255,255,0.40);
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 20px;
        }
        .f45-footer-col ul {
          list-style: none; display: flex;
          flex-direction: column; gap: 12px;
        }
        .f45-footer-col ul li a {
          font-size: 13px; color: rgba(255,255,255,0.55);
          transition: color 0.2s;
        }
        .f45-footer-col ul li a:hover { color: var(--teal); }
        .f45-footer-contact-email {
          font-size: 13px; color: rgba(255,255,255,0.55); margin-bottom: 20px;
        }
        .f45-footer-social {
          display: flex; gap: 10px;
        }
        .f45-footer-social a {
          width: 36px; height: 36px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.50);
          transition: border-color 0.2s, color 0.2s;
        }
        .f45-footer-social a:hover { border-color: var(--teal); color: var(--teal); }
        .f45-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 22px 0; text-align: center;
        }
        .f45-footer-copy {
          font-size: 12px; color: rgba(255,255,255,0.30);
        }
        @media (max-width: 1024px) {
          .f45-footer-top { grid-template-columns: 1fr 1fr 1fr; }
          .f45-footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .f45-footer-top { grid-template-columns: 1fr 1fr; gap: 32px; padding-bottom: 40px; }
          .f45-footer-inner { padding: 0 20px; }
          .f45-footer { padding: 48px 0 0; }
        }
        @media (max-width: 400px) {
          .f45-footer-top { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="f45-footer">
        <div className="f45-footer-inner">
          <div className="f45-footer-top">

            {/* Brand */}
            <div className="f45-footer-brand">
              <Logo width={140} />
              <div className="f45-footer-tagline">
                {EVENT.footer.tagline}
              </div>
            </div>

            {/* Footer columns from config */}
            {EVENT.footer.columns.map((col) => (
              <div key={col.heading} className="f45-footer-col">
                <h4>{col.heading}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div className="f45-footer-col">
              <h4>Contact</h4>
              <div className="f45-footer-contact-email">{EVENT.footer.email}</div>
              <div className="f45-footer-social">
                {EVENT.footer.social.linkedin && (
                  <a href={EVENT.footer.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                )}
                {EVENT.footer.social.twitter && (
                  <a href={EVENT.footer.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                )}
                {EVENT.footer.social.instagram && (
                  <a href={EVENT.footer.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  </a>
                )}
                {EVENT.footer.social.youtube && (
                  <a href={EVENT.footer.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
                  </a>
                )}
              </div>
            </div>

          </div>

          <div className="f45-footer-bottom">
            <div className="f45-footer-copy">
              {EVENT.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
