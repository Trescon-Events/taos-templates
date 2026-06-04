"use client";


const topics = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "AI-First Customer Experience",
    desc: "How AI is moving from tool to strategy — reshaping every touchpoint in the customer journey from first contact to loyalty.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    title: "Hyper-Personalisation at Scale",
    desc: "Delivering one-to-one experiences to millions — how data, AI and real-time decisioning make mass personalisation possible.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Omnichannel in Mobile-First India",
    desc: "Building seamless experiences across WhatsApp, app, web, voice and in-store for India's mobile-native consumer base.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "AI as a Teammate in CX",
    desc: "From chatbots to autonomous agents — redefining the human–AI collaboration model in customer service and support.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>
      </svg>
    ),
    title: "Digital Workflows & CX Transformation",
    desc: "How enterprises are rewiring internal processes to become truly customer-centric — from back-office to frontline.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77"/>
      </svg>
    ),
    title: "Proactive & Predictive Customer Service",
    desc: "Moving from reactive resolution to anticipatory service — using data and ML to solve problems before customers feel them.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Building Trust in the Age of AI",
    desc: "Transparency, data ethics and responsible AI deployment — the new pillars of customer confidence and brand loyalty.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Human + AI Balance in CX",
    desc: "Where empathy still wins — defining the irreplaceable human role in an increasingly automated customer experience landscape.",
  },
];

export default function TopicsSection() {
  return (
    <>
      <style>{`
        .wcx-topics {
          background: var(--bg-surface);
          padding: 100px 40px;
          position: relative;
          overflow: hidden;
        }
        .wcx-topics::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(54,188,176,0.3), rgba(201,168,76,0.2), transparent);
        }
        .wcx-topics::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(54,188,176,0.15), transparent);
        }
        .wcx-topics-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .wcx-topics-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 64px;
          flex-wrap: wrap;
        }
        .wcx-topics-head-text {}
        .wcx-topics-overline {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--coral);
          margin-bottom: 16px;
        }
        .wcx-topics-overline::before {
          content: '';
          width: 28px; height: 1.5px;
          background: var(--coral);
          flex-shrink: 0;
        }
        .wcx-topics-h2 {
          font-size: clamp(26px, 3.2vw, 44px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 14px;
        }
        .wcx-topics-h2 span { color: var(--coral); }
        .wcx-topics-sub {
          font-size: 15px;
          color: var(--text-body);
          max-width: 560px;
          line-height: 1.7;
        }
        .wcx-topics-head-cta {
          flex-shrink: 0;
        }
        .wcx-topics-speak-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 28px;
          border: 1.5px solid rgba(54,188,176,0.45);
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, color 0.25s, transform 0.2s, box-shadow 0.25s;
        }
        .wcx-topics-speak-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(54,188,176,0.10) 0%, rgba(54,188,176,0.04) 100%);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .wcx-topics-speak-btn:hover {
          border-color: var(--coral);
          color: var(--coral);
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.35),
            0 0 24px rgba(54,188,176,0.35),
            0 0 52px rgba(54,188,176,0.14);
        }
        .wcx-topics-speak-btn:hover::before { opacity: 1; }
        .wcx-topics-speak-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(54,188,176,0.12);
          border: 1px solid rgba(54,188,176,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--coral);
          transition: background 0.25s, box-shadow 0.25s;
        }
        .wcx-topics-speak-btn:hover .wcx-topics-speak-icon {
          background: rgba(54,188,176,0.22);
          box-shadow: 0 0 12px rgba(54,188,176,0.40);
        }
        @media (max-width: 768px) {
          .wcx-topics-head { align-items: flex-start; }
          .wcx-topics-head-cta { width: 100%; }
          .wcx-topics-speak-btn { width: 100%; justify-content: center; }
        }

        /* Grid */
        .wcx-topics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .wcx-topic-card {
          background: var(--bg-surface);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 36px 28px;
          position: relative;
          transition: background 0.25s, box-shadow 0.3s, border-color 0.3s;
          cursor: pointer;
          overflow: hidden;
          outline: none;
        }
        .wcx-topic-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 0 0 16px 16px;
          background: linear-gradient(90deg, var(--coral), var(--gold));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .wcx-topic-card:hover {
          background: var(--bg-card);
          border-color: rgba(54,188,176,0.70);
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.35),
            0 0 32px rgba(54,188,176,0.38),
            0 0 72px rgba(54,188,176,0.18),
            inset 0 0 32px rgba(54,188,176,0.08);
        }
        .wcx-topic-card:hover::after { transform: scaleX(1); }

        .wcx-topic-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(54,188,176,0.08);
          border: 1px solid rgba(54,188,176,0.15);
          color: var(--coral);
          margin-bottom: 20px;
          transition: background 0.25s, border-color 0.25s, box-shadow 0.3s;
          flex-shrink: 0;
        }
        .wcx-topic-card:hover .wcx-topic-icon {
          background: rgba(54,188,176,0.22);
          border-color: rgba(54,188,176,0.60);
          box-shadow: 0 0 20px rgba(54,188,176,0.40);
          color: #4ECFC4;
        }
        .wcx-topic-title {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .wcx-topic-desc {
          font-size: 12.5px;
          color: var(--text-body);
          line-height: 1.7;
        }

        @media (max-width: 1024px) {
          .wcx-topics-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .wcx-topics-grid { grid-template-columns: 1fr; }
          .wcx-topics { padding: 72px 24px; }
          .wcx-topic-card { padding: 28px 20px; }
        }
      `}</style>

      <section className="wcx-topics">
        <div className="wcx-topics-inner">
          <div className="wcx-topics-head">
            <div className="wcx-topics-head-text">
              <div className="wcx-topics-overline">Programme Focus</div>
              <h2 className="wcx-topics-h2">
                Key <span>Conversations</span>
              </h2>
              <p className="wcx-topics-sub">
                Eight high-impact discussion tracks driving the agenda — from AI strategy to human empathy, these are the conversations shaping the future of CX.
              </p>
            </div>
            <div className="wcx-topics-head-cta">
              <a href="/attend?tab=speaker#enquire-form" className="wcx-topics-speak-btn">
                <span className="wcx-topics-speak-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
                    <path d="M12 8v4l3 3"/>
                  </svg>
                </span>
                Apply to Speak
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="wcx-topics-grid">
            {topics.map((t) => (
              <div key={t.title} className="wcx-topic-card">
                <div className="wcx-topic-icon">{t.icon}</div>
                <div className="wcx-topic-title">{t.title}</div>
                <div className="wcx-topic-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
