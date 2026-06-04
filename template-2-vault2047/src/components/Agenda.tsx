"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRACKS = [
  {
    num: "01",
    icon: "◈",
    title: "Cyber-Defense & Critical Infrastructure Nexus",
    desc: "Positioning India as Asia's cyber-defense capital. Showcasing Cyber Command & Control Centre (CCC), Defence Threat Analytics Centre (DTAC), and sovereign defense infrastructure protecting BFSI, Power, Telecom, Healthcare, and Government.",
    tags: ["CCC", "DTAC", "CERT-In", "DCyA"],
  },
  {
    num: "02",
    icon: "◉",
    title: "Cyber-Talent & Skills Pipeline",
    desc: "Addressing the global cybersecurity talent gap (3.5M shortfall) by leveraging India's 200,000+ annual STEM graduates. Building indigenous cyber-defender pipelines and Cyber-Powered Skills Pods for immediate upskilling and certification.",
    tags: ["CompTIA", "CEH", "CISSP", "SANS"],
  },
  {
    num: "03",
    icon: "⬡",
    title: "AI–Cyber Nexus",
    desc: "Exploring AI-driven cyber-defense through DTAC threat detection and predictive analytics. Addressing AI-driven threats — deepfakes, AI-generated malware, adversarial ML — and bridging the AI security skills gap.",
    tags: ["Threat Detection", "Predictive AI", "Adversarial ML"],
  },
  {
    num: "04",
    icon: "◬",
    title: "Emerging Threat Landscape",
    desc: "Cutting-edge challenges including quantum-resistant cryptography, dark web forensics, advanced persistent threats (APTs), cloud/container security, zero-trust architectures, and supply chain cyber risks.",
    tags: ["Zero-Trust", "APT", "Quantum Crypto", "Dark Web"],
  },
  {
    num: "05",
    icon: "◎",
    title: "IT/OT/IoT Convergence Security",
    desc: "Securing Enterprise IT, Industrial OT, and IoT systems to protect critical infrastructure, ensure operational resilience, and enable trusted digital operations across manufacturing, energy, utilities, and smart cities.",
    tags: ["SCADA", "ICS", "Smart Cities", "OT Security"],
  },
  {
    num: "06",
    icon: "◐",
    title: "Digital Trust, Cyber Awareness & Citizen Safety",
    desc: "Building digital trust by strengthening cyber awareness, digital hygiene, and citizen safety against UPI fraud, digital payment scams, identity theft, deepfakes, and social engineering attacks.",
    tags: ["UPI Fraud", "Digital Hygiene", "Deepfakes", "DPI"],
  },
];

const FORMAT = [
  { num: "01", title: "Global Plenary: Dialogues from the Vault", icon: "◈", desc: "Keynote addresses from National Security Advisors, ministerial dialogues, panel discussions, fireside chats, and high-level cyber-policy announcements." },
  { num: "02", title: "Sovereign Shield Pavilion", icon: "◉", desc: "Dedicated zone showcasing India's sovereign cyber-defense capabilities — CCC, DTAC, CERT-In operations, DCyA initiatives, NCSC frameworks, and Maharashtra Cyber use-cases." },
  { num: "03", title: "Innovation Precincts", icon: "⬡", desc: "Sector Alleys (BFSI, Telecom, Power, Healthcare), Technology Showcases, Startup Zones, and live Cyber Hackathon with real-world security challenges." },
  { num: "04", title: "Youthpreneurs Innovation Zone", icon: "◬", desc: "Mentorship sessions with global CISOs and direct employer connects for cybersecurity job opportunities for India's next generation of cyber talent." },
  { num: "05", title: "Cyber-Powered Skills Pods", icon: "◎", desc: "Partners (PwC, Deloitte, EY, Palo Alto, Microsoft) set up onsite skill development centers for immediate hands-on training and certification — CompTIA, CEH, CISSP, SANS." },
  { num: "06", title: "The Cyber Foundry: India's Cyber Unicorn Hunt", icon: "◐", desc: "Live pitches from 10–15 cyber startup finalists competing for seed funding, VC access, government pilot opportunities, and enterprise partnerships." },
  { num: "07", title: "The Mumbai Accord", icon: "◈", desc: "Closed-door ministerial roundtables for G2G and B2G sessions — institutionalizing public-private threat intelligence sharing with signed protocols, not just discussion." },
  { num: "08", title: "Exclusive CISO Forums", icon: "◉", desc: "Invitation-only sessions for CISOs, CIOs, and CROs from Fortune 500 companies, Indian enterprises, and government departments to share threat intelligence and best practices." },
  { num: "09", title: "Awards Gala", icon: "⬡", desc: "Black-tie evening honoring CISO of the Year, Global Cyber Leader, Women in Cyber, and Cyber Innovation Award — recognizing the architects of India's cyber future." },
  { num: "10", title: "Exhibition Area", icon: "◬", desc: "Pavilions and demo zones from Palo Alto Networks, Microsoft, CrowdStrike, Fortinet — alongside Indian cyber companies JISA, IDfy, Cyber Chakra, Ram Antivirus." },
  { num: "11", title: "Media Center", icon: "◎", desc: "Dedicated space for Bloomberg, WIRED, Economic Times, CNBC TV18 — with real-time briefings, exclusive speaker interviews, and press kit distribution." },
];

type TabType = "tracks" | "format";

export default function Agenda() {
  const [tab, setTab] = useState<TabType>("tracks");

  return (
    <section id="agenda" className="section-pad" style={{ background: "#13130E", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: 0, top: "10%", bottom: "10%", width: 2, background: "linear-gradient(to bottom, transparent, rgba(184,106,46,0.35), transparent)" }} />

      <div className="container-vault">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: 48 }}
        >
          <span className="section-label">Programme</span>
          <h2 className="section-title">The Vault 2047 Agenda</h2>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 40, borderBottom: "1px solid var(--border-subtle)" }}>
          {([
            { key: "tracks", label: "6 Thematic Tracks" },
            { key: "format", label: "11 Event Formats" },
          ] as { key: TabType; label: string }[]).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "14px 28px",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.06em",
                color: tab === t.key ? "var(--accent-orange)" : "var(--text-dim)",
                borderBottom: tab === t.key ? "2px solid var(--accent-orange)" : "2px solid transparent",
                marginBottom: -1,
                transition: "color 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "tracks" ? (
            <motion.div
              key="tracks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
            >
              {TRACKS.map((t, i) => (
                <motion.div
                  key={t.num}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="glass-card"
                  style={{ padding: "28px 26px" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "var(--accent-orange)", marginBottom: 6 }}>
                        {t.num} {t.icon}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 10 }}>
                        {t.title}
                      </div>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 16 }}>
                        {t.desc}
                      </p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {t.tags.map(tag => (
                          <span key={tag} style={{
                            fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
                            padding: "3px 8px",
                            background: "rgba(184,106,46,0.08)",
                            border: "1px solid rgba(184,106,46,0.18)",
                            color: "var(--accent-orange)",
                          }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="format"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              style={{ display: "flex", flexDirection: "column", gap: 0 }}
            >
              {FORMAT.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "64px 1fr",
                    gap: 24,
                    padding: "22px 0",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                  whileHover={{ x: 4 }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", color: "var(--accent-orange)", paddingTop: 2 }}>
                    {f.num}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                      <span style={{ color: "var(--accent-orange)", marginRight: 8 }}>{f.icon}</span>
                      {f.title}
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #agenda .container-vault > div:last-child > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
