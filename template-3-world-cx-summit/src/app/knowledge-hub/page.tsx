"use client";
import { useState } from "react";
import Link from "next/link";


const RESOURCES = [
  {
    category: "CX Strategy",
    color: "#36BCB0",
    items: [
      { title: "The CX Leader's Playbook for 2026", type: "Guide", desc: "A practical framework for building customer-first organisations in the age of AI." },
      { title: "From NPS to NRR: Measuring What Actually Matters", type: "Report", desc: "Why leading CX teams are moving beyond satisfaction scores to revenue-linked metrics." },
      { title: "Voice of the Customer at Scale", type: "Whitepaper", desc: "How to build a VoC programme that drives board-level decisions, not just service improvements." },
    ],
  },
  {
    category: "AI & Technology",
    color: "#C9A84C",
    items: [
      { title: "AI in CX: The India Opportunity Report 2026", type: "Report", desc: "How Indian enterprises are deploying AI across customer journeys — what's working, what isn't." },
      { title: "Generative AI for Contact Centres", type: "Guide", desc: "The implementation roadmap: from pilot to production without breaking the customer relationship." },
      { title: "Human–AI Balance in Customer Service", type: "Whitepaper", desc: "When to automate and when to escalate — the framework top CX leaders are using." },
    ],
  },
  {
    category: "Leadership",
    color: "#36BCB0",
    items: [
      { title: "The CXO Mandate: Building the Business Case for CX", type: "Guide", desc: "How to present CX investment to your CFO — with the numbers that actually land." },
      { title: "CX Team Structure for Scale", type: "Framework", desc: "Org design principles for CX teams managing 10M+ customer interactions a year." },
      { title: "Cross-functional CX: Getting Product, Tech and Service Aligned", type: "Playbook", desc: "The collaboration model that the best CX teams use to break silos." },
    ],
  },
  {
    category: "Personalisation",
    color: "#C9A84C",
    items: [
      { title: "Hyper-Personalisation Without Creeping Out Your Customers", type: "Guide", desc: "The ethics and mechanics of 1:1 personalisation at scale in the Indian market." },
      { title: "Data-Driven CX: From Segments to Individuals", type: "Report", desc: "How leading brands are moving from cohort-based to individual-level experience design." },
    ],
  },
];

const TABS = ["All Resources", "Guides", "Reports", "Whitepapers", "Frameworks", "Playbooks"];

export default function KnowledgeHubPage() {
  const [activeTab, setActiveTab] = useState("All Resources");
  const [search, setSearch] = useState("");

  const allItems = RESOURCES.flatMap(r => r.items.map(i => ({ ...i, category: r.category, color: r.color })));
  const filtered = allItems.filter(item => {
    const matchesTab = activeTab === "All Resources" || item.type === activeTab.slice(0, -1);
    const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <style>{`
        .kh-page { padding-top: 72px; }

        .kh-hero {
          position: relative; padding: 90px 40px 70px; text-align: center; overflow: hidden;
        }
        .kh-hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .kh-hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 6px 16px; margin-bottom: 28px;
        }
        .kh-hero-title {
          font-size: clamp(34px, 5vw, 58px); font-weight: 800; line-height: 1.08;
          letter-spacing: -0.02em; margin-bottom: 18px;
        }
        .kh-hero-title span {
          background: linear-gradient(135deg, var(--gold), var(--coral));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .kh-hero-sub {
          font-size: 16px; color: var(--text-body); max-width: 580px;
          margin: 0 auto 40px; line-height: 1.7;
        }

        /* Search */
        .kh-search-wrap { max-width: 520px; margin: 0 auto 56px; position: relative; }
        .kh-search {
          width: 100%; padding: 14px 20px 14px 46px;
          background: var(--bg-card); border: 1px solid var(--border);
          color: #fff; font-size: 14px; font-family: inherit; outline: none;
          transition: border-color 0.2s;
        }
        .kh-search:focus { border-color: rgba(201,168,76,0.4); }
        .kh-search::placeholder { color: var(--text-muted); }
        .kh-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }

        /* Tabs */
        .kh-tabs { display: flex; align-items: center; gap: 4px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
        .kh-tab {
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 8px 18px; border: 1px solid var(--border); background: none; cursor: pointer;
          color: var(--text-muted); transition: all 0.2s;
        }
        .kh-tab:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
        .kh-tab.active { color: var(--gold); border-color: rgba(201,168,76,0.4); background: rgba(201,168,76,0.06); }

        /* Grid */
        .kh-body { max-width: 1200px; margin: 0 auto; padding: 0 40px 80px; }
        .kh-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .kh-card {
          background: var(--bg-card); border: 1px solid var(--border); padding: 28px;
          display: flex; flex-direction: column; gap: 12px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .kh-card:hover { border-color: rgba(201,168,76,0.3); box-shadow: 0 0 28px rgba(201,168,76,0.06); }
        .kh-card-meta { display: flex; align-items: center; gap: 10px; }
        .kh-card-type {
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 3px 9px;
        }
        .kh-card-cat { font-size: 10px; color: var(--text-muted); font-weight: 600; }
        .kh-card-title { font-size: 15px; font-weight: 800; line-height: 1.35; }
        .kh-card-desc { font-size: 13px; color: var(--text-body); line-height: 1.6; flex: 1; }
        .kh-card-cta {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--coral); background: none; border: none; cursor: pointer; padding: 0;
          transition: gap 0.2s;
        }
        .kh-card-cta:hover { gap: 10px; }

        /* Empty state */
        .kh-empty { text-align: center; padding: 60px 20px; color: var(--text-muted); font-size: 14px; grid-column: 1/-1; }

        /* CTA strip */
        .kh-cta-strip {
          background: var(--bg-surface); border-top: 1px solid var(--border); padding: 60px 40px; text-align: center;
        }
        .kh-cta-strip h3 { font-size: 26px; font-weight: 800; margin-bottom: 12px; }
        .kh-cta-strip p { font-size: 15px; color: var(--text-body); max-width: 480px; margin: 0 auto 28px; line-height: 1.6; }
        .kh-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 900px) { .kh-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) {
          .kh-grid { grid-template-columns: 1fr; }
          .kh-hero, .kh-body, .kh-cta-strip { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>

      <div className="kh-page">
        <div className="kh-hero">
          <div className="kh-hero-bg" />
          <div className="kh-hero-tag">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/>
            </svg>
            Knowledge Hub
          </div>
          <h1 className="kh-hero-title">
            CX Intelligence,<br /><span>Ready to Use</span>
          </h1>
          <p className="kh-hero-sub">
            Guides, reports, whitepapers and frameworks from the World CX Summit community —
            built for CX leaders who need insight they can act on.
          </p>

          <div className="kh-search-wrap">
            <svg className="kh-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              className="kh-search"
              placeholder="Search guides, reports, frameworks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="kh-tabs">
            {TABS.map(t => (
              <button key={t} className={`kh-tab${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="kh-body">
          <div className="kh-grid">
            {filtered.length === 0 ? (
              <div className="kh-empty">No resources found. Try a different search or filter.</div>
            ) : filtered.map((item, i) => (
              <div key={i} className="kh-card">
                <div className="kh-card-meta">
                  <span className="kh-card-type">{item.type}</span>
                  <span className="kh-card-cat">{item.category}</span>
                </div>
                <div className="kh-card-title">{item.title}</div>
                <div className="kh-card-desc">{item.desc}</div>
                <button className="kh-card-cta">
                  Download Free
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="kh-cta-strip">
          <h3>Speak at World CX Summit 2026</h3>
          <p>Share your expertise with 400+ senior CX leaders. Applications open for keynotes, panels, and fireside chats.</p>
          <div className="kh-cta-btns">
            <a href="/attend?tab=speaker#enquire-form" className="wcx-btn-primary">
              Apply to Speak
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/enquire" className="wcx-btn-outline">Enquire</a>
          </div>
        </div>
      </div>
    </>
  );
}
