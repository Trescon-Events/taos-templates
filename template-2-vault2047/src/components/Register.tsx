"use client";
import { motion } from "framer-motion";

const PASSES = [
  {
    type: "Delegate",
    tag: "Most Popular",
    featured: false,
    desc: "Full access to all plenary sessions, tracks, exhibition floor, Sovereign Shield Pavilion, and networking events.",
    features: [
      "All 6 Thematic Tracks",
      "Global Plenary: Dialogues from the Vault",
      "Sovereign Shield Pavilion",
      "Exhibition & Demo Zones",
      "Networking & Matchmaking Sessions",
      "Summit Materials & Reports",
    ],
    cta: "Register Now",
  },
  {
    type: "CISO Forum",
    tag: "Invitation Only",
    featured: true,
    desc: "Curated experience for CISOs, CIOs, and CROs — private roundtables, executive briefings, hosted 1:1 meetings, and invite-only dinners.",
    features: [
      "All Delegate Benefits",
      "Exclusive CISO Forums & Roundtables",
      "Private Threat Intelligence Sessions",
      "Executive Briefings",
      "Hosted 1:1 Meetings",
      "Invite-Only VIP Dinners",
      "Mumbai Accord Access",
    ],
    cta: "Apply Now",
  },
  {
    type: "Government / Defence",
    tag: "Complimentary",
    featured: false,
    desc: "For officials from government agencies, ministries, DCyA, CERT-In, NCSC, and defence establishments. Invitation-based.",
    features: [
      "All Sessions & Plenary",
      "Mumbai Accord Roundtables",
      "Sovereign Shield Pavilion — Full Access",
      "Policy Briefings & Whitepaper",
      "Protocol & Concierge Support",
    ],
    cta: "Request Invitation",
  },
  {
    type: "Startup / Founder",
    tag: "Cyber Foundry",
    featured: false,
    desc: "For cyber startup founders — pitch at The Cyber Foundry, access VC matchmaking, demo zones, and mentorship from global CISOs.",
    features: [
      "Cyber Foundry Pitch Stage",
      "VC & Investor Matchmaking",
      "Demo Zone Access",
      "CISO Mentorship Sessions",
      "Enterprise Pilot Opportunities",
    ],
    cta: "Apply for Cyber Foundry",
  },
];

const KEY_HIGHLIGHTS = [
  { icon: "◈", title: "The Mumbai Accord", desc: "Ministerial roundtables producing signed public-private threat intelligence sharing protocols — not just discussion." },
  { icon: "◉", title: "Sovereign Shield Pavilion", desc: "Showcasing India's CCC, DTAC, CERT-In operations, DCyA initiatives, and Maharashtra Cyber use-cases live." },
  { icon: "⬡", title: "The Cyber Foundry", desc: "India's Cyber Unicorn Hunt — 10–15 finalists pitching for seed funding, VC access, and government pilot opportunities." },
  { icon: "◬", title: "Awards Gala", desc: "Black-tie evening honoring CISO of the Year, Global Cyber Leader, Women in Cyber, and Cyber Innovation Award." },
  { icon: "◎", title: "Cyber Hackathon", desc: "Real-world security challenges with prizes — the most intense practical cybersecurity competition in India." },
  { icon: "◐", title: "Pre-Event Cyber Dialogues", desc: "Roundtables in Mumbai, Pune, Bengaluru, and Delhi — shaping the agenda with regional CISOs months in advance." },
];

export default function Register() {
  return (
    <section id="register" className="section-pad" style={{ background: "#13130E", position: "relative", overflow: "hidden" }}>
      {/* Watermark */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "clamp(60px, 12vw, 160px)",
        fontWeight: 900, letterSpacing: "-0.04em",
        color: "rgba(224,123,44,0.025)",
        pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none",
      }}>VAULT 2047</div>

      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      <div className="container-vault" style={{ position: "relative", zIndex: 1 }}>
        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: 64 }}
        >
          <span className="section-label">Key Highlights</span>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            What Makes Vault 2047 Different
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {KEY_HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{ padding: "24px 20px" }}
              >
                <div style={{ fontSize: 18, color: "var(--accent-orange)", marginBottom: 12 }}>{h.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{h.title}</div>
                <p style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.6 }}>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Register section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-60px" }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="section-label" style={{ justifyContent: "center" }}>Register</span>
          <h2 className="section-title">
            Secure Your Place at Vault 2047
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, maxWidth: 500, margin: "16px auto 0", lineHeight: 1.65 }}>
            September 2026 · Jio World Convention Centre, Mumbai · Limited passes · Apply early.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {PASSES.map((p, i) => (
            <motion.div
              key={p.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{
                padding: "32px 24px",
                borderColor: p.featured ? "rgba(224,123,44,0.4)" : "var(--border-subtle)",
                position: "relative",
              }}
            >
              {p.featured && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--accent-orange)" }} />
              )}
              <span style={{
                fontSize: 9, fontWeight: 800, letterSpacing: "0.14em",
                padding: "3px 9px",
                background: p.featured ? "var(--accent-orange)" : "rgba(255,255,255,0.05)",
                color: p.featured ? "#fff" : "var(--text-dim)",
                display: "inline-block", marginBottom: 18,
              }}>{p.tag.toUpperCase()}</span>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", marginBottom: 10, lineHeight: 1.2 }}>
                {p.type}
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
                {p.desc}
              </p>
              <ul style={{ listStyle: "none", marginBottom: 28 }}>
                {p.features.map(f => (
                  <li key={f} style={{
                    fontSize: 12, color: "var(--text-secondary)",
                    padding: "7px 0",
                    borderBottom: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "flex-start", gap: 8,
                  }}>
                    <span style={{ color: "var(--accent-orange)", fontSize: 8, marginTop: 3, flexShrink: 0 }}>◆</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={p.featured ? "btn-primary" : "btn-outline"}
                style={{ display: "block", textAlign: "center", fontSize: 12 }}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Group / institutional */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginTop: 40,
            padding: "28px 36px",
            border: "1px solid var(--border-subtle)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: 20, flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
              Group & Institutional Registrations
            </div>
            <div style={{ fontSize: 13, color: "var(--text-dim)" }}>
              Delegations of 5+ receive priority access, dedicated concierge support, and custom briefing sessions.
            </div>
          </div>
          <a href="mailto:vault@trescon.com" className="btn-outline" style={{ flexShrink: 0 }}>
            Contact Us
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          #register .container-vault > div:nth-child(4) { grid-template-columns: repeat(2, 1fr) !important; }
          #register .container-vault > div:nth-child(2) > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #register .container-vault > div:nth-child(4) { grid-template-columns: 1fr !important; }
          #register .container-vault > div:nth-child(2) > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
