import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Networking | Finance 2045 Jakarta 2026",
  description: "AI Matchmaking, WhatsApp networking, dedicated attendee app, and more. Finance 2045 engineers every connection on purpose.",
};

const LINKS = [
  { href:"/networking/attendee-app",   label:"Attendee App",      desc:"Your personal summit companion. Schedule, sessions, and 1-on-1 meeting requests — all in one place." },
  { href:"/networking/ai-matchmaking", label:"AI Matchmaking",    desc:"Pre-schedule targeted meetings up to 15 days before the event. Our engine matches by role, intent, and deal size." },
  { href:"/networking/photo-gallery",  label:"Photo Gallery",     desc:"Highlights from past Trescon global events — Dubai FinTech Summit, World AI Show, and more." },
  { href:"/networking/whatsapp",       label:"WhatsApp Networking",desc:"Join the official Finance 2045 WhatsApp community for real-time updates and peer introductions." },
];

export default function NetworkingPage() {
  return (
    <>
      <style>{`
        .nw-page { min-height:100vh; background:var(--bg-primary); padding-top:72px; }
        .nw-hero { padding:80px 40px 64px; text-align:center; border-bottom:1px solid var(--border); background:linear-gradient(180deg,rgba(0,165,163,0.06) 0%,transparent 100%); }
        .nw-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:10px; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; color:var(--teal); margin-bottom:18px; }
        .nw-hero h1 { font-size:clamp(30px,4.5vw,56px); font-weight:900; letter-spacing:-0.03em; color:#fff; margin-bottom:18px; line-height:1.08; }
        .nw-hero h1 span { color:var(--teal); }
        .nw-hero p { font-size:clamp(14px,1.4vw,17px); color:var(--text-body); max-width:580px; margin:0 auto; line-height:1.75; }
        .nw-grid { max-width:1000px; margin:0 auto; padding:64px 40px 100px; display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        .nw-card { background:var(--bg-card); border:1px solid rgba(255,255,255,0.06); padding:32px 28px; text-decoration:none; display:flex; flex-direction:column; transition:border-color 0.2s,box-shadow 0.2s; }
        .nw-card:hover { border-color:rgba(0,165,163,0.35); box-shadow:0 0 28px rgba(0,165,163,0.12); }
        .nw-card-label { font-size:10px; font-weight:800; letter-spacing:0.16em; text-transform:uppercase; color:var(--teal); margin-bottom:14px; }
        .nw-card h3 { font-size:20px; font-weight:900; color:#fff; margin-bottom:10px; }
        .nw-card p { font-size:13px; color:var(--text-body); line-height:1.7; flex:1; margin-bottom:24px; }
        .nw-cta { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:800; letter-spacing:0.10em; text-transform:uppercase; color:var(--teal); }
        @media (max-width:640px) { .nw-grid { grid-template-columns:1fr; padding:40px 20px 80px; } .nw-hero { padding:52px 24px 48px; } }
      `}</style>
      <div className="nw-page">
        <div className="nw-hero">
          <div className="nw-eyebrow"><span style={{width:6,height:6,borderRadius:"50%",background:"var(--teal)",display:"inline-block"}} />Networking</div>
          <h1>Every Connection<br /><span>Engineered on Purpose.</span></h1>
          <p>Finance 2045 does not leave networking to chance. AI Matchmaking, pre-scheduled 1-on-1 meetings, and dedicated tools ensure every conversation advances your pipeline.</p>
        </div>
        <div className="nw-grid">
          {LINKS.map(l=>(
            <Link key={l.href} href={l.href} className="nw-card">
              <div className="nw-card-label">{l.label}</div>
              <h3>{l.label}</h3>
              <p>{l.desc}</p>
              <span className="nw-cta">Learn More <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
