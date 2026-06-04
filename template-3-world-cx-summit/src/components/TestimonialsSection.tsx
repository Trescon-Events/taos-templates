"use client";

const testimonials = [
  {
    quote: "We're loving the energy, the excitement, and the enthusiasm this event is creating. The delegates are asking very pertinent questions, which is fantastic because it means the pre-qualification of delegates has been done very well.",
    name: "Sudhanshu Mishra",
    title: "VP - Business Development",
    company: "Ozonetel Communications",
    initials: "SM",
  },
  {
    quote: "The special thing about the World CX Summit is the opportunity to interact with some of the best thought leaders in the industry. Engaging with them and gaining their insights is incredibly valuable.",
    name: "Prakash Bharath",
    title: "Director & Regional Head",
    company: "Freshworks",
    initials: "PB",
  },
  {
    quote: "The World CX Summit was phenomenal in achieving its purpose and opening numerous opportunities, not just for us but for the entire industry. Thank you for organizing such a brilliant event that exceeded all expectations.",
    name: "Vaibhav Anand",
    title: "Associate Director - Enterprise Sales",
    company: "Yellow.AI",
    initials: "VA",
  },
  {
    quote: "The World CX Summit was well-curated, providing us with valuable interactions. The discussions were well-coordinated and expertly moderated, making the event truly worthwhile.",
    name: "Pooja Mahija",
    title: "Executive Director & Co-Founder",
    company: "Phonon Communications",
    initials: "PM",
  },
  {
    quote: "Amazing experience, great ecosystem, every moment is a gain here!",
    name: "Tata Communications",
    title: "Gold Partner",
    company: "Tata Communications",
    initials: "TC",
  },
  {
    quote: "I am having a great experience at the summit today, especially with the opportunity to meet all these leaders and listen to their insights. It has been particularly rewarding.",
    name: "Aniket Baipai",
    title: "Founder",
    company: "LimeChat",
    initials: "AB",
  },
];

// Triple for seamless loop
const looped = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
  return (
    <>
      <style>{`
        .tst-section {
          background: var(--bg-surface);
          padding: 88px 0 96px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .tst-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(54,188,176,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .tst-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative; z-index: 2;
        }

        /* Header */
        .tst-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .tst-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--coral);
          margin-bottom: 16px;
        }
        .tst-overline::before,
        .tst-overline::after {
          content: ''; width: 24px; height: 1.5px;
          background: var(--coral); flex-shrink: 0;
        }
        .tst-h2 {
          font-size: clamp(26px, 3vw, 42px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.1;
          margin: 0;
        }
        .tst-h2 em { font-style: normal; color: var(--coral); }

        /* Carousel track */
        .tst-carousel {
          overflow: hidden;
          margin: 0 -40px;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          padding: 12px 0 16px;
        }

        @keyframes tst-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }

        .tst-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: tst-scroll 55s linear infinite;
        }
        .tst-carousel:hover .tst-track {
          animation-play-state: paused;
        }

        /* Card */
        .tst-card {
          width: 400px;
          flex-shrink: 0;
          background: var(--bg-primary);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 32px 32px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 24px;
          position: relative;
          transition: border-color 0.3s, box-shadow 0.3s;
          cursor: default;
        }
        .tst-card:hover {
          border-color: rgba(54,188,176,0.25);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(54,188,176,0.08);
        }

        /* Coral top accent */
        .tst-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--coral), var(--gold), transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .tst-card:hover::before { transform: scaleX(1); }

        /* Quote mark */
        .tst-quote-mark {
          font-size: 72px;
          line-height: 0.6;
          color: rgba(54,188,176,0.18);
          font-family: Georgia, serif;
          font-weight: 900;
          margin-bottom: 4px;
          display: block;
          user-select: none;
        }

        .tst-quote {
          font-size: 14px;
          color: var(--text-body);
          line-height: 1.8;
          flex: 1;
          font-style: italic;
        }

        /* Author row */
        .tst-author {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .tst-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(54,188,176,0.30), rgba(201,168,76,0.20));
          border: 1px solid rgba(54,188,176,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800;
          color: var(--coral); letter-spacing: 0.02em;
          flex-shrink: 0;
        }
        .tst-author-info { flex: 1; min-width: 0; }
        .tst-author-name {
          font-size: 13px; font-weight: 800;
          color: #fff; letter-spacing: -0.01em;
          line-height: 1.3; margin-bottom: 3px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .tst-author-title {
          font-size: 11px; color: var(--text-muted);
          line-height: 1.4; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .tst-company-badge {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold);
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.18);
          padding: 4px 10px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .tst-section { padding: 72px 0 80px; }
          .tst-inner { padding: 0 32px; }
          .tst-carousel { margin: 0 -32px; }
        }
        @media (max-width: 768px) {
          .tst-section { padding: 64px 0 72px; }
          .tst-inner { padding: 0 20px; }
          .tst-carousel { margin: 0 -20px; }
          .tst-card { width: 300px; padding: 24px 22px 20px; }
        }
        @media (max-width: 480px) {
          .tst-section { padding: 52px 0 60px; }
          .tst-card { width: 268px; padding: 20px 18px 16px; }
        }
      `}</style>

      <section className="tst-section">
        <div className="tst-section-bg" />

        <div className="tst-inner">
          <div className="tst-header">
            <div className="tst-overline">Testimonials</div>
            <h2 className="tst-h2">What Attendees<br /><em>Say About Us</em></h2>
          </div>
        </div>

        <div className="tst-carousel">
          <div className="tst-track">
            {looped.map((t, i) => (
              <div key={i} className="tst-card">
                <div>
                  <span className="tst-quote-mark">&ldquo;</span>
                  <p className="tst-quote">{t.quote}</p>
                </div>
                <div className="tst-author">
                  <div className="tst-avatar">{t.initials}</div>
                  <div className="tst-author-info">
                    <div className="tst-author-name">{t.name}</div>
                    <div className="tst-author-title">{t.title}</div>
                  </div>
                  <div className="tst-company-badge">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}
