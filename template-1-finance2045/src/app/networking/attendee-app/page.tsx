import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Attendee App | Finance 2045 Jakarta 2026", description: "Your personal Finance 2045 companion. Manage your schedule and request 1-on-1 meetings from your phone." };
export default function Page() {
  return (
    <>
      <style>{`
        .sk-page{min-height:100vh;background:var(--bg-primary);padding-top:72px}
        .sk-hero{padding:80px 40px 64px;text-align:center;border-bottom:1px solid var(--border);background:linear-gradient(180deg,rgba(0,165,163,0.06) 0%,transparent 100%)}
        .sk-ey{display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:var(--teal);margin-bottom:18px}
        .sk-h1{font-size:clamp(26px,4vw,50px);font-weight:900;letter-spacing:-0.03em;color:#fff;margin-bottom:18px}
        .sk-p{font-size:16px;color:var(--text-body);max-width:560px;margin:0 auto 0;line-height:1.75}
        .sk-box{max-width:640px;margin:64px auto;padding:40px;background:var(--bg-surface);border:1px solid var(--border);text-align:center}
        .sk-box h3{font-size:20px;font-weight:800;color:#fff;margin-bottom:10px}
        .sk-box p{font-size:14px;color:var(--text-muted);line-height:1.7;margin-bottom:24px}
        .f45-btn{display:inline-flex;align-items:center;gap:8px;background:var(--teal);color:#fff;padding:12px 26px;font-size:12px;font-weight:800;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;transition:background 0.2s}
        .f45-btn:hover{background:var(--teal-light)}
      `}</style>
      <div className="sk-page">
        <div className="sk-hero">
          <div className="sk-ey"><span style={{width:6,height:6,borderRadius:"50%",background:"var(--teal)",display:"inline-block"}}/>Networking · Attendee App</div>
          <h1 className="sk-h1">Attendee App</h1>
          <p className="sk-p">Your personal Finance 2045 companion. Manage your schedule and request 1-on-1 meetings from your phone.</p>
        </div>
        <div style={{padding:"0 40px"}}>
          <div className="sk-box">
            <h3>Coming Soon</h3>
            <p>This section is being finalised. Register your interest and we will notify you when it goes live.</p>
            <Link href="/attend/sponsor" className="f45-btn">Register Interest <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          </div>
        </div>
      </div>
    </>
  );
}
