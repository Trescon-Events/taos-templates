import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agenda Overview | Finance 2045 Jakarta 2026",
  description: "Two days of capital, intelligence, and impact. Keynotes, panels, FinTech World Cup, precision matchmaking. 7–8 July 2026, Sheraton Grand Jakarta.",
};

export default function AgendaOverviewPage() {
  return (
    <>
      <style>{`
        .ag-ov { min-height:100vh; background:var(--bg-primary); padding-top:72px; }
        .ag-ov-hero { padding:80px 40px 64px; text-align:center; border-bottom:1px solid var(--border); background:linear-gradient(180deg,rgba(0,165,163,0.06) 0%,transparent 100%); }
        .ag-ov-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:10px; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; color:var(--teal); margin-bottom:18px; }
        .ag-ov-hero h1 { font-size:clamp(30px,4.5vw,56px); font-weight:900; letter-spacing:-0.03em; line-height:1.08; color:#fff; margin-bottom:18px; }
        .ag-ov-hero h1 span { color:var(--gold); }
        .ag-ov-hero p { font-size:clamp(14px,1.4vw,17px); color:var(--text-body); max-width:600px; margin:0 auto 40px; line-height:1.75; }
        .ag-ov-grid { max-width:1100px; margin:0 auto; padding:64px 40px 100px; display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        .ag-ov-card { background:var(--bg-card); border:1px solid rgba(255,255,255,0.06); padding:36px 32px; text-decoration:none; display:block; transition:border-color 0.2s,box-shadow 0.2s; }
        .ag-ov-card:hover { border-color:rgba(0,165,163,0.35); box-shadow:0 0 28px rgba(0,165,163,0.12); }
        .ag-ov-card-label { font-size:10px; font-weight:800; letter-spacing:0.16em; text-transform:uppercase; color:var(--teal); margin-bottom:14px; }
        .ag-ov-card h3 { font-size:24px; font-weight:900; color:#fff; margin-bottom:12px; letter-spacing:-0.01em; }
        .ag-ov-card p { font-size:14px; color:var(--text-body); line-height:1.7; margin-bottom:24px; }
        .ag-ov-cta { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:800; letter-spacing:0.10em; text-transform:uppercase; color:var(--teal); }
        @media (max-width:640px) { .ag-ov-grid { grid-template-columns:1fr; padding:40px 20px 80px; } .ag-ov-hero { padding:52px 24px 48px; } }
      `}</style>
      <div className="ag-ov">
        <div className="ag-ov-hero">
          <div className="ag-ov-eyebrow"><span style={{width:6,height:6,borderRadius:"50%",background:"var(--teal)",display:"inline-block"}} />Agenda</div>
          <h1>Two Days of Capital,<br /><span>Intelligence & Impact.</span></h1>
          <p>Keynotes from regulators and market leaders. Panels on AI, digital assets, and inclusion. Precision matchmaking. And the FinTech World Cup Indonesia Qualifiers.</p>
        </div>
        <div className="ag-ov-grid">
          {[
            { href:"/agenda/full",   label:"Full Agenda",       title:"The Programme",         desc:"Every session, keynote, panel, and networking block across both days. Click any session to expand." },
            { href:"/agenda/vision", label:"The 2045 Vision",   title:"Golden Indonesia 2045",  desc:"The macro thesis behind the summit — Indonesia's journey to become the world's fourth-largest economy." },
            { href:"/speakers",      label:"Speakers",          title:"Who's Speaking",         desc:"40+ confirmed speakers from central banks, global BFSI institutions, VC funds, and regulatory bodies." },
            { href:"/agenda/themes", label:"Themes",            title:"10 Thematic Pillars",    desc:"From CBDCs and Islamic Finance to AI risk analytics and financial inclusion — the full intellectual agenda." },
          ].map(c => (
            <Link key={c.href} href={c.href} className="ag-ov-card">
              <div className="ag-ov-card-label">{c.label}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="ag-ov-cta">Explore <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
