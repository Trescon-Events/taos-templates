'use client';
import HubSpotForm from "@/components/HubSpotForm";

const BENEFITS = [
  { num: "01", title: "Up to 18 SQM of exhibition real estate", body: "Position your product where 1,000+ procurement-active buyers walk and dwell. High-traffic placement around the main stage and networking zones." },
  { num: "02", title: "Live demo opportunities", body: "Schedule on-floor product demonstrations. Show your solution to active buyers in real time — not three weeks later on a Zoom call." },
  { num: "03", title: "Lead capture infrastructure", body: "Badge scanning, qualified lead reports delivered post-event, and integration with the official event CRM. Every booth conversation becomes a tracked, exportable lead." },
  { num: "04", title: "Cross-floor traffic from World AI Show", body: "Co-location means your booth catches traffic from 2,000+ combined attendees. Frontier-tech buyers cross-shopping fintech, and vice versa." },
  { num: "05", title: "Pre-event brand visibility", body: "Your logo and short product description featured in EDMs to the full delegate base before doors open. Buyers walk in already knowing who you are." },
  { num: "06", title: "AI Matchmaker — exhibitor access", body: "Buyers can request meetings at your booth directly from the matchmaker. No more 'drop by booth 47' prayers." },
  { num: "07", title: "Cost-efficient market entry", body: "A single booth at Finance 2045 puts your brand in front of the buyers it would take a six-month roadshow to meet individually." },
  { num: "08", title: "On-site team support", body: "Dedicated exhibitor concierge, on-floor matchmaker introductions to high-intent buyers, and structured post-event lead handoff." },
];

function scrollToForm() {
  document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ExhibitPage() {
  return (
    <>
      <style>{`
        .att-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }
        .att-hero { position: relative; padding: 72px 40px 56px; text-align: center; overflow: hidden; background: linear-gradient(180deg, rgba(233,194,104,0.05) 0%, transparent 100%); border-bottom: 1px solid var(--border); }
        .att-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 18px; }
        .att-hero-h { font-size: clamp(28px, 4vw, 52px); font-weight: 900; letter-spacing: -0.03em; line-height: 1.08; color: #fff; margin-bottom: 16px; }
        .att-hero-h span { color: var(--gold); }
        .att-hero-p { font-size: clamp(14px, 1.4vw, 17px); color: var(--text-body); max-width: 560px; margin: 0 auto; line-height: 1.7; }
        .att-benefits { max-width: 1240px; margin: 0 auto; padding: 64px 40px 48px; }
        .att-sec-label { font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 10px; }
        .att-sec-h { font-size: clamp(22px, 2.5vw, 36px); font-weight: 900; letter-spacing: -0.02em; color: #fff; margin-bottom: 40px; line-height: 1.15; }
        .att-sec-h span { color: var(--gold); }
        .att-ben-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; background: rgba(255,255,255,0.04); margin-bottom: 40px; }
        .att-ben-card { background: var(--bg-surface); padding: 28px 24px; cursor: default; position: relative; transition: background 0.25s; }
        .att-ben-card::after { content: ''; position: absolute; inset: 0; box-shadow: inset 0 0 0 1.5px var(--teal); opacity: 0; transition: opacity 0.25s; pointer-events: none; }
        .att-ben-card:hover { background: rgba(0,165,163,0.06); }
        .att-ben-card:hover::after { opacity: 1; }
        .att-ben-num { font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); opacity: 0.5; margin-bottom: 14px; }
        .att-ben-title { font-size: 14px; font-weight: 800; color: #fff; line-height: 1.4; }
        .att-ben-desc { font-size: 12px; color: var(--text-body); line-height: 1.7; max-height: 0; overflow: hidden; opacity: 0; margin-top: 0; transition: max-height 0.4s ease, opacity 0.3s 0.05s ease, margin-top 0.25s ease; }
        .att-ben-card:hover .att-ben-desc { max-height: 200px; opacity: 1; margin-top: 10px; }
        .att-cta-strip { display: flex; align-items: center; justify-content: space-between; background: rgba(0,165,163,0.06); border: 1px solid rgba(0,165,163,0.18); padding: 24px 32px; gap: 20px; flex-wrap: wrap; }
        .att-cta-strip p { font-size: 14px; color: var(--text-body); line-height: 1.6; margin: 0; max-width: 520px; }
        .att-btn-primary { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; background: var(--teal); color: #fff; padding: 12px 26px; font-size: 11px; font-weight: 800; letter-spacing: 0.10em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.2s; text-decoration: none; white-space: nowrap; }
        .att-btn-primary:hover { background: var(--teal-light); }
        /* Form section — white full-width */
        .att-form-section { background: #fff; border-top: 1px solid var(--border); padding: 64px 40px 100px; }
        .att-form-inner { max-width: 1040px; margin: 0 auto; }
        .att-form-title { font-size: 22px; font-weight: 800; color: #111827; letter-spacing: -0.01em; margin-bottom: 6px; }
        .att-form-sub { font-size: 14px; color: #6b7280; line-height: 1.7; margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #e5e7eb; }
        .att-form-section .hs-form { display: grid !important; grid-template-columns: 1fr 1fr !important; column-gap: 28px !important; }
        .att-form-section .hs-form > fieldset.form-columns-2,
        .att-form-section .hs-form > fieldset:has(input[type="checkbox"]),
        .att-form-section .hs-form > fieldset:has(input[type="radio"]),
        .att-form-section .hs-form > fieldset:has(textarea),
        .att-form-section .hs-form > .hs_submit,
        .att-form-section .hs-form > .legal-consent-container,
        .att-form-section .hs-form > .hs_error_rollup,
        .att-form-section .hs-form > .hs_recaptcha { grid-column: 1 / -1 !important; }
        .att-form-section .hs-form fieldset { max-width: 100% !important; width: 100% !important; border: none !important; padding: 0 !important; margin: 0 !important; min-width: 0 !important; }
        .att-form-section .hs-form fieldset.form-columns-2 { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
        .att-form-section .hs-form fieldset.form-columns-2 .hs-form-field { width: 100% !important; float: none !important; padding: 0 !important; }
        @media (max-width: 1024px) { .att-ben-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 900px) {
          .att-form-section { padding: 48px 24px 72px; }
          .att-form-section .hs-form { grid-template-columns: 1fr !important; }
          .att-form-section .hs-form fieldset.form-columns-2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) { .att-hero { padding: 56px 24px 40px; } .att-benefits { padding: 40px 24px 32px; } .att-ben-grid { grid-template-columns: 1fr; } .att-cta-strip { flex-direction: column; align-items: flex-start; padding: 20px 24px; } }
      `}</style>

      <div className="att-page">
        <div className="att-hero">
          <div className="att-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
            Attend · Exhibit
          </div>
          <h1 className="att-hero-h">Exhibit at <span>Finance 2045</span></h1>
          <p className="att-hero-p">Two days. 1,000+ pre-qualified buyers walking your floor. The most concentrated lead-generation window in Indonesia's 2026 calendar.</p>
        </div>

        <div className="att-benefits">
          <div className="att-sec-label">Why Exhibit at Finance 2045?</div>
          <h2 className="att-sec-h">Demonstrate. Convert.<br /><span>Deploy.</span></h2>

          <div className="att-ben-grid">
            {BENEFITS.map((b) => (
              <div key={b.num} className="att-ben-card">
                <div className="att-ben-num">{b.num}</div>
                <div className="att-ben-title">{b.title}</div>
                <div className="att-ben-desc">{b.body}</div>
              </div>
            ))}
          </div>

          <div className="att-cta-strip">
            <p>Reserve your exhibition space before the floor plan fills. Limited booths available.</p>
            <button className="att-btn-primary" onClick={scrollToForm}>
              Reserve Your Booth
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div className="att-form-section" id="enquiry-form">
          <div className="att-form-inner">
            <div className="att-form-title">Reserve Your Exhibition Booth</div>
            <p className="att-form-sub">Limited floor space. Our team will confirm availability and pricing within 24 hours.</p>
            <HubSpotForm formId="de2a9330-cdcd-46b6-9e45-28705d90217a" targetId="hs-exhibit-form" theme="light" />
          </div>
        </div>
      </div>
    </>
  );
}
