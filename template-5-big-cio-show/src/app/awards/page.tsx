import Link from "next/link";

export default function AwardsPage() {
  return (
    <>
      <style>{`
        .baw { background: var(--bg-primary); min-height: 100vh; padding-top: 72px; }

        /* ── HERO — centered, no split ── */
        .baw-hero {
          background: var(--bg-surface);
          border-bottom: 1px solid rgba(201,168,76,0.15);
          position: relative; overflow: hidden;
          padding: 60px 40px 56px;
          text-align: center;
        }
        .baw-hero::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(ellipse 70% 80% at 50% -10%, rgba(201,168,76,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 40% 60% at 10% 100%, rgba(124,58,237,0.05) 0%, transparent 60%);
        }
        .baw-hero-inner { position:relative; z-index:2; max-width:860px; margin:0 auto; }
        .baw-hero-logo {
          width: 200px; height: auto; display: block; margin: 0 auto 28px;
          filter: drop-shadow(0 0 32px rgba(201,168,76,0.30));
        }
        .baw-hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(201,168,76,0.10); border:1px solid rgba(201,168,76,0.32);
          border-radius:100px; padding:5px 16px; margin-bottom:20px;
          font-size: 13px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold);
        }
        .baw-hero-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); box-shadow:0 0 8px var(--gold); animation:bcio-pulse 2s ease-in-out infinite; }
        .baw-hero-h1 { font-size:clamp(24px,3vw,44px); font-weight:900; letter-spacing:-0.03em; color:#fff; line-height:1.12; margin-bottom:14px; }
        .baw-hero-h1 em { font-style:normal; color:var(--gold); }
        .baw-hero-p { font-size: 18px; color:rgba(255,255,255,0.85); line-height:1.8; margin:0 auto 24px; max-width:520px; }
        .baw-hero-ctas { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:36px; }
        .baw-hero-stats {
          display:inline-flex; gap:0; padding-top:32px;
          border-top:1px solid rgba(255,255,255,0.07);
          flex-wrap:wrap; justify-content:center;
        }
        .baw-hero-stat {
          padding: 0 36px; border-right:1px solid rgba(255,255,255,0.07); text-align:center;
        }
        .baw-hero-stat:last-child { border-right:none; }
        .baw-stat-v { font-size:26px; font-weight:900; letter-spacing:-0.03em; color:var(--gold); line-height:1; margin-bottom:5px; }
        .baw-stat-l { font-size: 13px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.90); }

        /* ── BODY ── */
        .baw-body { max-width:1320px; margin:0 auto; padding:0 40px 80px; }
        .baw-sec { padding:56px 0; }

        .baw-eyebrow {
          font-size: 13px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase;
          color:var(--gold); margin-bottom:12px;
          display:flex; align-items:center; gap:10px;
        }
        .baw-eyebrow::before,.baw-eyebrow::after { content:''; height:1px; width:18px; background:rgba(201,168,76,0.38); }
        .baw-eyebrow.c { justify-content:center; }
        .baw-h2 { font-size:clamp(18px,2vw,28px); font-weight:900; letter-spacing:-0.02em; color:#fff; margin-bottom:8px; line-height:1.25; }
        .baw-h2 em { font-style:normal; color:var(--gold); }
        .baw-sub { font-size: 18px; color:rgba(255,255,255,0.80); line-height:1.8; max-width:500px; }
        .baw-head { margin-bottom:28px; }
        .baw-head.c { text-align:center; }
        .baw-head.c .baw-sub { margin:0 auto; }

        /* ── AWARD CARDS — 3 col, uniform ── */
        .baw-tier-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .baw-tier {
          background:var(--bg-card); border-radius:16px; overflow:hidden;
          border:1px solid rgba(255,255,255,0.07);
          display:flex; flex-direction:column;
          transition:border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .baw-tier::before { content:''; display:block; height:3px; }
        .baw-tier.gold::before { background:linear-gradient(90deg,#C9A84C,#DBC06A); }
        .baw-tier.blue::before { background:linear-gradient(90deg,#0055DD,#C084FC); }
        .baw-tier.cyan::before { background:linear-gradient(90deg,#C084FC,#7C3AED); }
        .baw-tier:hover {
          transform:translateY(-4px); border-color:rgba(201,168,76,0.35);
          box-shadow:0 0 0 1px rgba(201,168,76,0.15), 0 0 32px rgba(201,168,76,0.10), 0 12px 32px rgba(0,0,0,0.30);
        }
        .baw-tier-img {
          height:180px; display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,0.02); padding:20px;
          border-bottom:1px solid rgba(255,255,255,0.05);
          overflow:hidden;
        }
        .baw-tier-img img {
          max-height:148px; max-width:100%; width:auto; object-fit:contain;
          filter:drop-shadow(0 4px 16px rgba(201,168,76,0.18));
          transition:transform 0.4s ease;
        }
        .baw-tier:hover .baw-tier-img img { transform:scale(1.07) translateY(-3px); }
        .baw-tier-body { padding:20px 24px 24px; flex:1; display:flex; flex-direction:column; }
        .baw-tier-tag { font-size: 13px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:7px; }
        .baw-tier.gold .baw-tier-tag { color:var(--gold); }
        .baw-tier.blue .baw-tier-tag { color:#4499FF; }
        .baw-tier.cyan .baw-tier-tag { color:var(--cyan); }
        .baw-tier-title { font-size: 13px; font-weight:900; letter-spacing:-0.02em; color:#fff; margin-bottom:10px; line-height:1.25; }
        .baw-tier-desc { font-size: 18px; color:#ffffff; line-height:1.75; flex:1; margin-bottom:14px; }
        .baw-tier-rule {
          font-size: 18px; color:rgba(255,255,255,0.75);
          padding:8px 12px; background:rgba(255,255,255,0.04);
          border-radius:7px; border-left:2px solid rgba(201,168,76,0.28);
          line-height:1.55; margin-bottom:14px;
        }
        .baw-tier.cyan .baw-tier-rule { border-left-color:rgba(192,132,252,0.35); }
        .baw-tier-rule strong { color:#ffffff; }
        .baw-tier-badge {
          display:inline-block; font-size: 13px; font-weight:700; letter-spacing:0.10em; text-transform:uppercase;
          padding:4px 11px; border-radius:100px; align-self:flex-start;
        }
        .baw-tier.gold .baw-tier-badge { background:rgba(201,168,76,0.10); border:1px solid rgba(201,168,76,0.28); color:var(--gold); }
        .baw-tier.blue .baw-tier-badge { background:rgba(124,58,237,0.10); border:1px solid rgba(68,153,255,0.28); color:#4499FF; }
        .baw-tier.cyan .baw-tier-badge { background:rgba(192,132,252,0.08); border:1px solid rgba(192,132,252,0.25); color:var(--cyan); }

        /* ── JURY + TIMELINE ── */
        .baw-jury-wrap { display:grid; grid-template-columns:1fr 260px; gap:16px; }
        .baw-jury-panel {
          background:var(--bg-card); border:1px solid rgba(201,168,76,0.12);
          border-radius:16px; overflow:hidden;
        }
        .baw-jury-head { padding:28px 32px 0; }
        .baw-jury-note {
          display:inline-flex; align-items:center; gap:6px; margin-top:14px;
          background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.18);
          border-radius:6px; padding:7px 12px;
          font-size: 18px; color:rgba(255,255,255,0.88);
        }
        .baw-jury-note strong { color:var(--gold); }
        .baw-jury-grid { display:grid; grid-template-columns:1fr 1fr; margin-top:24px; }
        .baw-jury-crit {
          padding:22px 28px; border-top:1px solid rgba(255,255,255,0.05);
          border-right:1px solid rgba(255,255,255,0.05);
        }
        .baw-jury-crit:nth-child(2n) { border-right:none; }
        .baw-jury-num { font-size:32px; font-weight:900; letter-spacing:-0.04em; color:rgba(201,168,76,0.17); line-height:1; margin-bottom:12px; }
        .baw-jury-t { font-size: 18px; font-weight:800; color:#fff; margin-bottom:5px; line-height:1.35; }
        .baw-jury-d { font-size: 18px; color:rgba(255,255,255,0.78); line-height:1.65; }

        .baw-timeline {
          background:var(--bg-card); border:1px solid rgba(201,168,76,0.12);
          border-radius:16px; padding:28px 24px;
          display:flex; flex-direction:column;
        }
        .baw-tl-h { font-size: 18px; font-weight:800; color:#fff; margin-bottom:16px; }
        .baw-tl-items { display:flex; flex-direction:column; gap:2px; flex:1; }
        .baw-tl-item {
          padding:13px 16px; border-radius:10px; border:1px solid transparent;
          transition:background 0.2s, border-color 0.2s;
        }
        .baw-tl-item:hover { background:rgba(201,168,76,0.04); border-color:rgba(201,168,76,0.14); }
        .baw-tl-step { font-size:8px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:rgba(201,168,76,0.52); margin-bottom:3px; }
        .baw-tl-label { font-size: 18px; color:rgba(255,255,255,0.92); margin-bottom:2px; }
        .baw-tl-val { font-size: 18px; font-weight:800; color:#fff; }
        .baw-tl-cta { margin-top:20px; }

        /* ── NUMBERS ── */
        .baw-numbers {
          display:grid; grid-template-columns:repeat(4,1fr);
          background:var(--bg-card); border:1px solid rgba(255,255,255,0.07);
          border-radius:16px; overflow:hidden;
        }
        .baw-num-item {
          padding:32px 28px; border-right:1px solid rgba(255,255,255,0.06);
          transition:background 0.2s;
        }
        .baw-num-item:last-child { border-right:none; }
        .baw-num-item:hover { background:rgba(201,168,76,0.03); }
        .baw-num-v { font-size:36px; font-weight:900; letter-spacing:-0.04em; color:var(--gold); line-height:1; margin-bottom:8px; }
        .baw-num-t { font-size: 18px; font-weight:800; color:#fff; margin-bottom:4px; }
        .baw-num-d { font-size: 18px; color:rgba(255,255,255,0.75); line-height:1.65; }

        /* ── SECTORS ── */
        .baw-sector-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; }
        .baw-sector {
          background:var(--bg-card); border:1px solid rgba(201,168,76,0.09);
          border-radius:14px; padding:20px 18px;
          transition:border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .baw-sector:hover {
          border-color:rgba(201,168,76,0.35); transform:translateY(-3px);
          box-shadow:0 0 20px rgba(201,168,76,0.09);
        }
        .baw-sector-ico {
          width:32px; height:32px; border-radius:7px;
          background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.15);
          display:flex; align-items:center; justify-content:center;
          color:var(--gold); margin-bottom:12px;
        }
        .baw-sector-name { font-size: 18px; font-weight:800; color:#fff; margin-bottom:5px; line-height:1.3; }
        .baw-sector-count { font-size: 18px; color:rgba(201,168,76,0.68); font-weight:700; }

        /* ── PROCESS ── */
        .baw-process { display:grid; grid-template-columns:repeat(4,1fr); position:relative; }
        .baw-process::before {
          content:''; position:absolute; top:34px; left:12.5%; right:12.5%; height:1px;
          background:linear-gradient(90deg, transparent, rgba(201,168,76,0.25) 20%, rgba(201,168,76,0.25) 80%, transparent);
          z-index:0;
        }
        .baw-step { position:relative; z-index:1; padding:0 16px; text-align:center; display:flex; flex-direction:column; align-items:center; }
        .baw-step-circle {
          width:68px; height:68px; border-radius:50%; margin-bottom:18px;
          background:var(--bg-card); border:2px solid rgba(201,168,76,0.22);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          transition:border-color 0.3s, box-shadow 0.3s, background 0.3s;
        }
        .baw-step:hover .baw-step-circle {
          border-color:var(--gold); background:rgba(201,168,76,0.07);
          box-shadow:0 0 0 8px rgba(201,168,76,0.05), 0 0 24px rgba(201,168,76,0.15);
        }
        .baw-step-n { font-size:8px; font-weight:700; letter-spacing:0.10em; color:rgba(201,168,76,0.48); }
        .baw-step-ico { color:var(--gold); }
        .baw-step-title { font-size: 18px; font-weight:800; color:#fff; margin-bottom:7px; }
        .baw-step-desc { font-size: 18px; color:rgba(255,255,255,0.78); line-height:1.7; max-width:170px; }

        /* ── CTA ── */
        .baw-cta {
          background:var(--bg-surface); border:1px solid rgba(201,168,76,0.18);
          border-radius:16px; overflow:hidden; position:relative;
          display:grid; grid-template-columns:1fr auto;
        }
        .baw-cta::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse 50% 100% at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 70%);
          pointer-events:none;
        }
        .baw-cta-body { padding:48px 52px; position:relative; z-index:2; }
        .baw-cta-h2 { font-size:clamp(18px,2vw,30px); font-weight:900; letter-spacing:-0.02em; color:#fff; margin-bottom:10px; }
        .baw-cta-h2 em { font-style:normal; color:var(--gold); }
        .baw-cta-p { font-size: 18px; color:#ffffff; line-height:1.8; margin-bottom:20px; max-width:380px; }
        .baw-cta-dl {
          display:inline-flex; align-items:center; gap:8px; margin-bottom:24px;
          background:rgba(201,168,76,0.10); border:1px solid rgba(201,168,76,0.28);
          border-radius:7px; padding:8px 14px;
          font-size: 18px; font-weight:700; color:var(--gold);
        }
        .baw-cta-btns { display:flex; gap:10px; flex-wrap:wrap; }
        .baw-cta-right {
          display:flex; align-items:center; justify-content:center;
          padding:32px 40px; position:relative; z-index:2;
          border-left:1px solid rgba(201,168,76,0.08);
        }
        .baw-cta-right img { width:160px; height:auto; filter:drop-shadow(0 0 24px rgba(201,168,76,0.20)); }

        /* ── RESPONSIVE ── */
        @media (max-width:1100px) {
          .baw-tier-grid { grid-template-columns:1fr 1fr; }
          .baw-jury-wrap { grid-template-columns:1fr; }
          .baw-numbers { grid-template-columns:repeat(2,1fr); }
          .baw-num-item:nth-child(2n) { border-right:none; border-bottom:1px solid rgba(255,255,255,0.06); }
          .baw-num-item:last-child { border-bottom:none; }
          .baw-sector-grid { grid-template-columns:repeat(3,1fr); }
          .baw-process { grid-template-columns:repeat(2,1fr); gap:32px; }
          .baw-process::before { display:none; }
          .baw-cta { grid-template-columns:1fr; }
          .baw-cta-right { border-left:none; border-top:1px solid rgba(201,168,76,0.08); }
        }
        @media (max-width:768px) {
          .baw-tier-grid { grid-template-columns:1fr; }
          .baw-jury-grid { grid-template-columns:1fr; }
          .baw-jury-crit { border-right:none; }
          .baw-sector-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:640px) {
          .baw-hero { padding:44px 24px 40px; }
          .baw-hero-logo { width:150px; }
          .baw-body { padding:0 24px 56px; }
          .baw-sec { padding:40px 0; }
          .baw-numbers { grid-template-columns:1fr 1fr; }
          .baw-num-item { padding:24px 20px; }
          .baw-num-v { font-size:28px; }
          .baw-process { grid-template-columns:1fr 1fr; }
          .baw-sector-grid { grid-template-columns:1fr 1fr; }
          .baw-cta-body { padding:36px 24px; }
          .baw-hero-stat { padding:0 20px; }
        }
      `}</style>

      <div className="baw">

        {/* ── HERO — centered ── */}
        <div className="baw-hero">
          <div className="baw-hero-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="baw-hero-logo" src="/awards/bcio-award-logo.svg" alt="Big CIO Awards 2026" />
            <div className="baw-hero-badge">
              <div className="baw-hero-dot" />
              Nominations Open · Deadline 28 May 2026
            </div>
            <h1 className="baw-hero-h1">India&apos;s Most Credible <em>Technology Awards</em></h1>
            <p className="baw-hero-p">Three tiers. An independent CIO jury. No pay-to-win. Recognised at India&apos;s largest CIO summit in front of 8,500+ technology leaders.</p>
            <div className="baw-hero-ctas">
              <Link href="https://bigcioshow.com/awards-nominations" className="bcio-btn-gold">
                Nominate Now
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <a href="https://konfhub.com/checkout/big-cio-show-awards-2026?ticketId=93845%7C1%3B&selectedCode=MKTWEBSITE" target="_blank" rel="noopener noreferrer" className="bcio-btn-outline">Register to Attend</a>
            </div>
            <div className="baw-hero-stats">
              {[
                { v: "500+",   l: "Past Winners"       },
                { v: "8,500+", l: "Industry Witnesses" },
                { v: "100+",   l: "Award Categories"   },
                { v: "3",      l: "Award Tiers"        },
              ].map(s => (
                <div key={s.l} className="baw-hero-stat">
                  <div className="baw-stat-v">{s.v}</div>
                  <div className="baw-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="baw-body">

          {/* ── AWARD TIERS ── */}
          <div className="baw-sec">
            <div className="baw-head">
              <div className="baw-eyebrow">Award Categories</div>
              <h2 className="baw-h2">Three Tiers. One <em>Night to Remember.</em></h2>
              <p className="baw-sub">Each award is built for a distinct profile of technology leader — from C-suite executives to hands-on innovators and community favourites.</p>
            </div>
            <div className="baw-tier-grid">

              <div className="baw-tier gold">
                <div className="baw-tier-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/awards/bcio-leaders-award.svg" alt="CIO Leaders Award" />
                </div>
                <div className="baw-tier-body">
                  <div className="baw-tier-tag">Leaders Award</div>
                  <div className="baw-tier-title">Technology Leaders</div>
                  <p className="baw-tier-desc">For CEOs, MDs, Group CIOs, Global CIOs and CTOs who have demonstrated transformational leadership over a sustained career and set the benchmark for an entire industry.</p>
                  <div className="baw-tier-rule"><strong>Eligibility — </strong>20+ years experience · Projects within last 5 years</div>
                  <div className="baw-tier-badge">C-Suite &amp; Board Level</div>
                </div>
              </div>

              <div className="baw-tier blue">
                <div className="baw-tier-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/awards/bcio-innovators-award.svg" alt="CIO Innovators Award" />
                </div>
                <div className="baw-tier-body">
                  <div className="baw-tier-tag">Innovators Award</div>
                  <div className="baw-tier-title">Technology Innovators</div>
                  <p className="baw-tier-desc">For CIOs, CTOs, SVP/VP-IT, CDOs and CISOs who have delivered breakthrough innovation — real projects with measurable business impact that peers can benchmark against.</p>
                  <div className="baw-tier-rule"><strong>Eligibility — </strong>Measurable outcomes · Last 24 months</div>
                  <div className="baw-tier-badge">Practice &amp; Execution</div>
                </div>
              </div>

              <div className="baw-tier cyan">
                <div className="baw-tier-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/awards/bcio-popular-choice-award.svg" alt="Popular Choice Award" />
                </div>
                <div className="baw-tier-body">
                  <div className="baw-tier-tag">Popular Choice</div>
                  <div className="baw-tier-title">People&apos;s Choice Award</div>
                  <p className="baw-tier-desc">The most democratic award in Indian enterprise technology — chosen entirely by the community. Open to all technology leaders. Max votes on the night wins.</p>
                  <div className="baw-tier-rule"><strong>Eligibility — </strong>Nominated &amp; voted by community · No jury</div>
                  <div className="baw-tier-badge">Community Voted</div>
                </div>
              </div>

            </div>
          </div>

          {/* ── JURY + TIMELINE ── */}
          <div className="baw-sec">
            <div className="baw-head">
              <div className="baw-eyebrow">Jury Evaluation</div>
              <h2 className="baw-h2">How Nominations Get <em>Scored</em></h2>
            </div>
            <div className="baw-jury-wrap">
              <div className="baw-jury-panel">
                <div className="baw-jury-head">
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.80)", lineHeight:1.8, margin:0 }}>An independent CIO jury scores every submission. Scores are confidential. Top 50 per category are shortlisted.</p>
                  <div className="baw-jury-note">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    Scored <strong>&nbsp;1–4&nbsp;</strong> per criterion · Confidential
                  </div>
                </div>
                <div className="baw-jury-grid">
                  {[
                    { num:"01", t:"Project Execution Rationale", d:"How clearly the need was defined, planned, and justified against business objectives." },
                    { num:"02", t:"Business Process Necessity",  d:"The degree to which the project addressed a genuine operational or strategic challenge." },
                    { num:"03", t:"Level of Innovation",         d:"Novelty of approach, technology choices, and departure from conventional solutions." },
                    { num:"04", t:"Market Impact",               d:"Measurable outcomes — revenue, cost, efficiency, security, or competitive advantage." },
                  ].map(c => (
                    <div key={c.num} className="baw-jury-crit">
                      <div className="baw-jury-num">{c.num}</div>
                      <div className="baw-jury-t">{c.t}</div>
                      <div className="baw-jury-d">{c.d}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="baw-timeline">
                <div className="baw-tl-h">Key Dates</div>
                <div className="baw-tl-items">
                  {[
                    { step:"Step 01", label:"Nomination closes",    val:"28 May 2026"            },
                    { step:"Step 02", label:"Shortlist notified",   val:"June 2026"               },
                    { step:"Step 03", label:"Awards Ceremony",      val:"Big CIO Show, Bengaluru" },
                  ].map(m => (
                    <div key={m.step} className="baw-tl-item">
                      <div className="baw-tl-step">{m.step}</div>
                      <div className="baw-tl-label">{m.label}</div>
                      <div className="baw-tl-val">{m.val}</div>
                    </div>
                  ))}
                </div>
                <div className="baw-tl-cta">
                  <Link href="https://bigcioshow.com/awards-nominations" className="bcio-btn-gold" style={{ width:"100%", justifyContent:"center", fontSize:"11px", padding:"10px 14px" }}>
                    Submit Nomination
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── WHY IT MATTERS ── */}
          <div className="baw-sec">
            <div className="baw-head c" style={{ textAlign:"center" }}>
              <div className="baw-eyebrow c">Why It Matters</div>
              <h2 className="baw-h2" style={{ textAlign:"center" }}>What Winning <em>Actually Means</em></h2>
            </div>
            <div className="baw-numbers">
              {[
                { v:"500+",   t:"Past Winners",       d:"Recognised across six years of India's biggest CIO summit." },
                { v:"8,500+", t:"Industry Witnesses", d:"Your achievement in front of the entire enterprise technology community." },
                { v:"100+",   t:"Award Categories",   d:"Spanning every discipline and industry vertical." },
                { v:"Zero",   t:"Pay-to-Win",         d:"Every winner is chosen on merit alone by an independent jury." },
              ].map(n => (
                <div key={n.t} className="baw-num-item">
                  <div className="baw-num-v">{n.v}</div>
                  <div className="baw-num-t">{n.t}</div>
                  <div className="baw-num-d">{n.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTORS ── */}
          <div className="baw-sec">
            <div className="baw-head">
              <div className="baw-eyebrow">Award Sectors</div>
              <h2 className="baw-h2">A Category for <em>Every Leader</em></h2>
              <p className="baw-sub">Five domains. 100+ categories across every technology discipline and vertical.</p>
            </div>
            <div className="baw-sector-grid">
              {[
                { name:"Technology Leadership", count:"20+ categories", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { name:"Cybersecurity",          count:"18+ categories", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                { name:"Cloud & Infrastructure", count:"22+ categories", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg> },
                { name:"AI & Data",              count:"24+ categories", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
                { name:"Industry Verticals",     count:"16+ categories", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
              ].map(s => (
                <div key={s.name} className="baw-sector">
                  <div className="baw-sector-ico">{s.icon}</div>
                  <div className="baw-sector-name">{s.name}</div>
                  <div className="baw-sector-count">{s.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── PROCESS ── */}
          <div className="baw-sec">
            <div className="baw-head c" style={{ textAlign:"center" }}>
              <div className="baw-eyebrow c">The Process</div>
              <h2 className="baw-h2" style={{ textAlign:"center" }}>From Nomination <em>to the Stage</em></h2>
            </div>
            <div className="baw-process">
              {[
                { n:"01", title:"Submit",       desc:"Complete the form. Nominate yourself, your team, or a peer.", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg> },
                { n:"02", title:"Jury Review",  desc:"Independent CIO peers score each submission 1–4 across four criteria.", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                { n:"03", title:"Shortlist",    desc:"Top 50 per category notified and invited to attend the summit.", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
                { n:"04", title:"Win the Night", desc:"Winners announced at the Big CIO Awards Ceremony. No pay-to-win.", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/></svg> },
              ].map(s => (
                <div key={s.n} className="baw-step">
                  <div className="baw-step-circle">
                    <div className="baw-step-n">{s.n}</div>
                    <div className="baw-step-ico">{s.icon}</div>
                  </div>
                  <div className="baw-step-title">{s.title}</div>
                  <div className="baw-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="baw-sec" style={{ paddingTop:0 }}>
            <div className="baw-cta">
              <div className="baw-cta-body">
                <div className="baw-eyebrow" style={{ marginBottom:16 }}>Open Now</div>
                <h2 className="baw-cta-h2">Ready to Be <em>Recognised?</em></h2>
                <p className="baw-cta-p">Nominations are open. Submit before the deadline and stand on India&apos;s most-watched technology awards stage.</p>
                <div className="baw-cta-dl">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Deadline · 28 May 2026 · Bengaluru
                </div>
                <div className="baw-cta-btns">
                  <Link href="https://bigcioshow.com/awards-nominations" className="bcio-btn-gold">
                    Submit Nomination
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="https://bigcioshow.com/general-enquiry" className="bcio-btn-outline">Contact Awards Team</Link>
                </div>
              </div>
              <div className="baw-cta-right">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/awards/bcio-award-logo.svg" alt="Big CIO Awards" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
