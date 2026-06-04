'use client';
import { useState, useEffect, useRef } from "react";

function KonfHubWidget({ buttonId }: { buttonId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://widget.konfhub.com/widget.js";
    script.setAttribute("button_id", buttonId);
    script.async = true;

    container.appendChild(script);
  }, [buttonId]);

  return <div ref={containerRef} style={{ width: "100%", display: "flex", justifyContent: "center" }} />;
}


const BUSINESS_BENEFITS = [
  { title: "All keynotes, panels, and fireside chats", body: "Both days, full agenda. Ministry of Investment, OJK, Bank Indonesia, and Tier-1 BFSI leadership." },
  { title: "Exhibition floor access", body: "80+ exhibitors across Finance 2045 and the co-located AI Innovation Floor." },
  { title: "FinTech World Cup Indonesia Qualifiers", body: "Live pitches from the region's strongest startups competing for the DFS Grand Finale." },
  { title: "Cross-event access", body: "Walk straight into the 47th World AI Show. 2,000+ combined finance and AI leaders." },
  { title: "AI Matchmaker — standard access", body: "Browse and request meetings with delegates whose priorities align with yours." },
  { title: "Networking sessions and structured breaks", body: "Curated connection opportunities across both days including the official evening reception." },
  { title: "Full hospitality", body: "Catered lunch and refreshments across both days at Sheraton Grand Jakarta." },
  { title: "Conference materials and select recordings", body: "Session decks and highlight recordings shared with all registered delegates post-event." },
];

const VIP_BENEFITS = [
  { title: "AI Matchmaker — priority access", body: "Pre-schedule 1-on-1s with your target list 15 days before doors open." },
  { title: "VIP Deal Room", body: "Closed-door conversations with senior decision-makers, regulators, and peers. By appointment only." },
  { title: "Executive Networking Lounge", body: "High-signal space with on-demand meeting rooms and premium refreshments." },
  { title: "Curated meeting schedules", body: "Priority placement with regulators, sovereign capital representatives, and Tier-1 bank leadership." },
  { title: "Private speaker meet-and-greets", body: "Off-the-record access to officials from Ministry of Investment, OJK, and Bank Indonesia." },
  { title: "Cross-event VIP rights", body: "Same access tier across the co-located 47th World AI Show. 2,000+ combined leaders." },
  { title: "All keynotes, panels, and exhibition floor", body: "Everything included in the full-access experience, retained at VIP tier." },
  { title: "Premium hospitality", body: "VIP catering, dedicated registration desk, and priority entry across both days." },
];

const FREE_BENEFITS = [
  { title: "All keynotes, panels, and fireside chats", body: "Both days, full agenda. Ministry of Investment, OJK, Bank Indonesia, and Tier-1 BFSI leadership." },
  { title: "Exhibition floor access", body: "80+ exhibitors across Finance 2045 and the co-located AI Innovation Floor." },
  { title: "FinTech World Cup Indonesia Qualifiers", body: "Live pitches from the region's strongest startups competing for the DFS Grand Finale." },
  { title: "Cross-event access", body: "Walk straight into the 47th World AI Show. 2,000+ combined finance and AI leaders." },
  { title: "AI Matchmaker — standard access", body: "Browse and request meetings with delegates whose priorities align with yours." },
  { title: "Networking sessions and structured breaks", body: "Curated connection opportunities across both days including the official evening reception." },
  { title: "Full hospitality", body: "Catered lunch and refreshments across both days at Sheraton Grand Jakarta." },
  { title: "Conference materials and select recordings", body: "Session decks and highlight recordings shared with all registered delegates post-event." },
];

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`dlg-toggle-chevron${open ? " open" : ""}`}
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
  >
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function DelegatePage() {
  const [bizExpanded,  setBizExpanded]  = useState(false);
  const [vipExpanded,  setVipExpanded]  = useState(false);
  const [freeExpanded, setFreeExpanded] = useState(false);

  return (
    <>
      <style>{`
        .dlg-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }

        /* Hero */
        .dlg-hero {
          padding: 72px 40px 64px; text-align: center;
          background: linear-gradient(180deg, rgba(233,194,104,0.05) 0%, transparent 100%);
          border-bottom: 1px solid var(--border);
        }
        .dlg-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 18px;
        }
        .dlg-hero-h {
          font-size: clamp(28px, 4vw, 52px); font-weight: 900;
          letter-spacing: -0.03em; line-height: 1.08; color: #fff; margin-bottom: 14px;
        }
        .dlg-hero-h span { color: var(--gold); }
        .dlg-hero-p {
          font-size: clamp(14px, 1.4vw, 16px); color: var(--text-body);
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* Tickets container — 3 columns */
        .dlg-tickets-wrap {
          max-width: 1200px; margin: 0 auto; padding: 64px 40px 80px;
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;
        }

        /* Individual ticket */
        .dlg-ticket {
          position: relative; display: flex; flex-direction: column;
          border: 1px solid var(--border); overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .dlg-ticket.vip {
          border-color: rgba(233,194,104,0.35);
        }
        .dlg-ticket.vip:hover {
          border-color: rgba(233,194,104,0.65);
          box-shadow: 0 0 40px rgba(233,194,104,0.08);
        }
        .dlg-ticket.business:hover,
        .dlg-ticket.free:hover {
          border-color: rgba(0,165,163,0.45);
          box-shadow: 0 0 40px rgba(0,165,163,0.08);
        }

        /* Ticket top bar */
        .dlg-ticket-bar { height: 4px; width: 100%; }
        .dlg-ticket.vip      .dlg-ticket-bar { background: linear-gradient(90deg, var(--gold), rgba(233,194,104,0.3)); }
        .dlg-ticket.business .dlg-ticket-bar { background: linear-gradient(90deg, var(--teal), rgba(0,165,163,0.3)); }
        .dlg-ticket.free     .dlg-ticket-bar { background: linear-gradient(90deg, var(--teal), rgba(0,165,163,0.3)); }

        /* Ticket body */
        .dlg-ticket-body { padding: 36px 32px; flex: 1; }

        .dlg-ticket-type {
          font-size: 9px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; margin-bottom: 10px; min-height: 16px;
        }
        .dlg-ticket.vip      .dlg-ticket-type { color: var(--gold); }
        .dlg-ticket.business .dlg-ticket-type { color: var(--teal); }
        .dlg-ticket.free     .dlg-ticket-type { color: var(--teal); }

        .dlg-ticket-name {
          font-size: clamp(18px, 2vw, 26px); font-weight: 900;
          letter-spacing: -0.02em; color: #fff; line-height: 1.15; margin-bottom: 6px;
        }
        .dlg-ticket-price {
          font-size: 20px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 4px;
        }
        .dlg-ticket.vip      .dlg-ticket-price { color: var(--gold); }
        .dlg-ticket.business .dlg-ticket-price { color: #fff; }
        .dlg-ticket.free     .dlg-ticket-price { color: var(--teal); }

        .dlg-ticket-subtext {
          font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.35);
          margin-bottom: 24px; letter-spacing: 0.04em;
        }

        /* Perforation line */
        .dlg-ticket-perf {
          height: 1px; margin: 0 -32px 24px;
          background: repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(255,255,255,0.08) 6px, rgba(255,255,255,0.08) 12px);
        }

        /* Highlights (always visible) */
        .dlg-ticket-highlights { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .dlg-ticket-hl {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.5;
        }
        .dlg-hl-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 7px;
        }
        .dlg-ticket.vip      .dlg-hl-dot { background: var(--gold); }
        .dlg-ticket.business .dlg-hl-dot { background: var(--teal); }
        .dlg-ticket.free     .dlg-hl-dot { background: var(--teal); }

        /* View all benefits toggle */
        .dlg-toggle-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; background: none; border: none;
          cursor: pointer; padding: 0; margin-bottom: 20px; transition: opacity 0.2s;
        }
        .dlg-ticket.vip      .dlg-toggle-btn { color: var(--gold); }
        .dlg-ticket.business .dlg-toggle-btn { color: var(--teal); }
        .dlg-ticket.free     .dlg-toggle-btn { color: var(--teal); }
        .dlg-toggle-btn:hover { opacity: 0.75; }
        .dlg-toggle-chevron { transition: transform 0.25s; }
        .dlg-toggle-chevron.open { transform: rotate(180deg); }

        /* Expanded benefits */
        .dlg-benefits-list {
          overflow: hidden; transition: max-height 0.45s ease, opacity 0.35s ease;
        }
        .dlg-benefits-list.collapsed { max-height: 0; opacity: 0; }
        .dlg-benefits-list.expanded  { max-height: 1200px; opacity: 1; }
        .dlg-benefit-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dlg-benefit-item:last-child { border-bottom: none; }
        .dlg-benefit-check {
          width: 18px; height: 18px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
        }
        .dlg-ticket.vip      .dlg-benefit-check { color: var(--gold); }
        .dlg-ticket.business .dlg-benefit-check { color: var(--teal); }
        .dlg-ticket.free     .dlg-benefit-check { color: var(--teal); }
        .dlg-benefit-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .dlg-benefit-body  { font-size: 12px; color: var(--text-body); line-height: 1.6; }

        /* Ticket CTA area */
        .dlg-ticket-cta {
          padding: 24px 32px 32px; border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column; gap: 12px;
        }

        /* Buttons */
        .dlg-btn-vip {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: linear-gradient(135deg, #b8972a 0%, #d4af37 50%, #b8972a 100%);
          color: #0a0f1a; font-size: 13px; font-weight: 800; letter-spacing: 0.06em;
          text-transform: uppercase; padding: 16px 28px; border-radius: 6px;
          text-decoration: none; border: none; cursor: pointer;
          transition: filter 0.2s, transform 0.15s;
        }
        .dlg-btn-vip:hover { filter: brightness(1.12); transform: translateY(-1px); }

        .dlg-btn-teal {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: #00a5a3; color: #fff; font-size: 13px; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase; padding: 16px 28px;
          border-radius: 6px; text-decoration: none; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .dlg-btn-teal:hover { background: #00bfbd; transform: translateY(-1px); }

        .dlg-ticket-note {
          font-size: 11px; color: rgba(255,255,255,0.30); line-height: 1.6; text-align: center;
        }

        /* KonfHub widget container */
        .dlg-widget-wrap {
          margin-top: 4px;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 16px;
          width: 100%; overflow: hidden;
        }
        .dlg-widget-wrap iframe {
          display: block; width: 100%; border: none;
          border-radius: 4px; overflow: hidden;
        }

        @media (max-width: 960px) {
          .dlg-tickets-wrap { grid-template-columns: 1fr; max-width: 520px; }
        }
        @media (max-width: 600px) {
          .dlg-hero { padding: 56px 24px 40px; }
          .dlg-tickets-wrap { padding: 40px 20px 60px; }
          .dlg-ticket-body { padding: 28px 24px; }
          .dlg-ticket-cta { padding: 20px 24px 28px; }
          .dlg-ticket-perf { margin: 0 -24px 24px; }
        }
      `}</style>

      <div className="dlg-page">

        {/* Hero */}
        <div className="dlg-hero">
          <div className="dlg-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
            Attend · Passes
          </div>
          <h1 className="dlg-hero-h">Choose Your <span>Pass</span></h1>
          <p className="dlg-hero-p">
            All passes are subject to approval by the Finance 2045 driving committee. Work or official email addresses required.
          </p>
        </div>

        {/* 3 Tickets */}
        <div className="dlg-tickets-wrap">

          {/* ── CARD 1: BUSINESS PASS ── */}
          <div className="dlg-ticket business">
            <div className="dlg-ticket-bar" />
            <div className="dlg-ticket-body">
              <div className="dlg-ticket-type">&nbsp;</div>
              <div className="dlg-ticket-name">Business Pass</div>
              <div className="dlg-ticket-price">$499 <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>USD</span></div>
              <div className="dlg-ticket-subtext">Paid</div>
              <div className="dlg-ticket-perf" />

              <div className="dlg-ticket-highlights">
                {[
                  "Full 2-day agenda access",
                  "Exhibition floor & FinTech World Cup",
                  "AI Matchmaker — standard access",
                  "Networking lunch & evening reception",
                ].map(hl => (
                  <div key={hl} className="dlg-ticket-hl">
                    <span className="dlg-hl-dot" />
                    {hl}
                  </div>
                ))}
              </div>

              <button className="dlg-toggle-btn" onClick={() => setBizExpanded(v => !v)}>
                {bizExpanded ? "Hide benefits" : "View all benefits"}
                <ChevronIcon open={bizExpanded} />
              </button>

              <div className={`dlg-benefits-list${bizExpanded ? " expanded" : " collapsed"}`}>
                {BUSINESS_BENEFITS.map(b => (
                  <div key={b.title} className="dlg-benefit-item">
                    <span className="dlg-benefit-check"><CheckIcon /></span>
                    <div>
                      <div className="dlg-benefit-title">{b.title}</div>
                      <div className="dlg-benefit-body">{b.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dlg-ticket-cta">
              <KonfHubWidget buttonId="btn_922abed125b5" />
            </div>
          </div>

          {/* ── CARD 2: VIP PASS ── */}
          <div className="dlg-ticket vip">
            <div className="dlg-ticket-bar" />
            <div className="dlg-ticket-body">
              <div className="dlg-ticket-type">VIP Executive Pass</div>
              <div className="dlg-ticket-name">VIP Pass</div>
              <div className="dlg-ticket-price">$799 <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(233,194,104,0.6)" }}>USD</span></div>
              <div className="dlg-ticket-subtext">Paid</div>
              <div className="dlg-ticket-perf" />

              <div className="dlg-ticket-highlights">
                {[
                  "VIP Deal Room access",
                  "AI Matchmaker priority (15 days early)",
                  "Private speaker meet-and-greets",
                  "Executive Networking Lounge",
                ].map(hl => (
                  <div key={hl} className="dlg-ticket-hl">
                    <span className="dlg-hl-dot" />
                    {hl}
                  </div>
                ))}
              </div>

              <button className="dlg-toggle-btn" onClick={() => setVipExpanded(v => !v)}>
                {vipExpanded ? "Hide benefits" : "View all benefits"}
                <ChevronIcon open={vipExpanded} />
              </button>

              <div className={`dlg-benefits-list${vipExpanded ? " expanded" : " collapsed"}`}>
                {VIP_BENEFITS.map(b => (
                  <div key={b.title} className="dlg-benefit-item">
                    <span className="dlg-benefit-check"><CheckIcon /></span>
                    <div>
                      <div className="dlg-benefit-title">{b.title}</div>
                      <div className="dlg-benefit-body">{b.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dlg-ticket-cta">
              <KonfHubWidget buttonId="btn_adec43400b88" />
            </div>
          </div>

          {/* ── CARD 3: FREE DELEGATE PASS ── */}
          <div className="dlg-ticket free">
            <div className="dlg-ticket-bar" />
            <div className="dlg-ticket-body">
              <div className="dlg-ticket-type">Complimentary Pass</div>
              <div className="dlg-ticket-name">Free Delegate Pass</div>
              <div className="dlg-ticket-price">Free</div>
              <div className="dlg-ticket-subtext">Free · Subject to approval</div>
              <div className="dlg-ticket-perf" />

              <div className="dlg-ticket-highlights">
                {[
                  "Full 2-day agenda access",
                  "Exhibition floor & FinTech World Cup",
                  "AI Matchmaker — standard access",
                  "Networking lunch & evening reception",
                ].map(hl => (
                  <div key={hl} className="dlg-ticket-hl">
                    <span className="dlg-hl-dot" />
                    {hl}
                  </div>
                ))}
              </div>

              <button className="dlg-toggle-btn" onClick={() => setFreeExpanded(v => !v)}>
                {freeExpanded ? "Hide benefits" : "View all benefits"}
                <ChevronIcon open={freeExpanded} />
              </button>

              <div className={`dlg-benefits-list${freeExpanded ? " expanded" : " collapsed"}`}>
                {FREE_BENEFITS.map(b => (
                  <div key={b.title} className="dlg-benefit-item">
                    <span className="dlg-benefit-check"><CheckIcon /></span>
                    <div>
                      <div className="dlg-benefit-title">{b.title}</div>
                      <div className="dlg-benefit-body">{b.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dlg-ticket-cta">
              <KonfHubWidget buttonId="btn_cf1ac31fc453" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
