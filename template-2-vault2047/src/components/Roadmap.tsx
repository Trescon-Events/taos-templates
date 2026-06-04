"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const YEARS = [
  {
    year: "2026",
    label: "Year 1",
    phase: "Cyber Adopter",
    color: "#B86A2E",
    desc: "Launch Vault2047. Implement national cybersecurity standards. Build basic defense infrastructure. Establish Vault2047 as the pinnacle of cyber-policy in India.",
    milestones: ["Vault2047 Inaugural Edition", "National Standards Launch", "Sovereign Shield Pavilion Debut", "Mumbai Accord Signed", "Cyber Foundry — First Unicorn Hunt"],
  },
  {
    year: "2027",
    label: "Year 2",
    phase: "Cyber Innovator",
    color: "#0D6665",
    desc: "Develop indigenous cyber-defense technology. Operationalize sovereign infrastructure — Cyber Command & Control Centre (CCC) and Defence Threat Analytics Centre (DTAC).",
    milestones: ["CCC Fully Operational", "DTAC AI Threat Detection Live", "Indigenous Cyber-Tech Stack", "Vault2047 Year 2 — Expanded Scope", "Cyber Dialogues — National Series"],
  },
  {
    year: "2028",
    label: "Year 3",
    phase: "Cyber Exporter",
    color: "#E5C87A",
    desc: "Export cybersecurity solutions globally. Establish India as the trusted cyber-resilience partner for the Global South. Maharashtra becomes the Cybersecurity Capital of Asia.",
    milestones: ["Global South Cyber-Tech Export", "DPI Resilience Frameworks Exported", "Maharashtra: Asia's Cyber Capital", "Vault2047 — The Davos of Cyber-Policy", "Self-Sustaining $1T Cyber Ecosystem"],
  },
];

export default function Roadmap() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} id="roadmap" className="section-pad" style={{ background: "#020F0F", position: "relative", overflow: "hidden" }}>
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      {/* Teal glow */}
      <div style={{
        position: "absolute", top: "40%", right: "5%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(0,180,176,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-vault" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: 72 }}
        >
          <span className="section-label">3-Year Roadmap</span>
          <h2 className="section-title">Our Path to Global Leadership</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 560, marginTop: 16, lineHeight: 1.65 }}>
            From Cyber Adopter to Cyber Exporter — India's structured journey to becoming the
            trusted cyber-resilience partner for the Global South by 2028.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: 0 }}>
          {/* Left spacer on first row */}
          {YEARS.map((y, i) => (
            <>
              {/* Left content — alternate */}
              <div key={`left-${y.year}`} style={{ paddingBottom: 64, paddingRight: 48, display: "flex", justifyContent: "flex-end" }}>
                {i % 2 === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, delay: 0.1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    className="glass-card"
                    style={{ padding: "28px 26px", maxWidth: 380, width: "100%", borderColor: `${y.color}22` }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: y.color, marginBottom: 8 }}>{y.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "var(--text-primary)", marginBottom: 4, letterSpacing: "-0.02em" }}>{y.phase}</div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 20 }}>{y.desc}</p>
                    <ul style={{ listStyle: "none" }}>
                      {y.milestones.map(m => (
                        <li key={m} style={{
                          fontSize: 12, color: "var(--text-dim)",
                          padding: "6px 0", borderBottom: "1px solid var(--border-subtle)",
                          display: "flex", alignItems: "center", gap: 10,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: y.color, flexShrink: 0 }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : <div />}
              </div>

              {/* Center timeline */}
              <div key={`center-${y.year}`} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {i === 0 && (
                  <div style={{ width: 2, flex: "0 0 40px", background: "var(--border-subtle)" }} />
                )}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  style={{
                    width: 52, height: 52,
                    border: `2px solid ${y.color}`,
                    background: `${y.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 900, color: y.color }}>{y.year.slice(-2)}</span>
                </motion.div>
                {i < YEARS.length - 1 && (
                  <motion.div style={{ width: 2, flex: 1, background: y.color, opacity: 0.3, minHeight: 80 }} />
                )}
              </div>

              {/* Right content — alternate */}
              <div key={`right-${y.year}`} style={{ paddingBottom: 64, paddingLeft: 48 }}>
                {i % 2 === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, delay: 0.1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    className="glass-card"
                    style={{ padding: "28px 26px", maxWidth: 380, width: "100%", borderColor: `${y.color}22` }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: y.color, marginBottom: 8 }}>{y.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "var(--text-primary)", marginBottom: 4, letterSpacing: "-0.02em" }}>{y.phase}</div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 20 }}>{y.desc}</p>
                    <ul style={{ listStyle: "none" }}>
                      {y.milestones.map(m => (
                        <li key={m} style={{
                          fontSize: 12, color: "var(--text-dim)",
                          padding: "6px 0", borderBottom: "1px solid var(--border-subtle)",
                          display: "flex", alignItems: "center", gap: 10,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: y.color, flexShrink: 0 }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : <div />}
              </div>
            </>
          ))}
        </div>

        {/* Vision footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 16 }}
        >
          {[
            { icon: "◈", title: `"The Davos" of Cyber-Policy`, desc: "Vault2047 will evolve into the standard annual gathering for global cyber-policy and sovereign defense." },
            { icon: "◉", title: "Viksit Bharat 2047 Alignment", desc: "Directly contributing to India's \"developed nation\" status by securing the technology-led economic transformation." },
            { icon: "⬡", title: "Self-Sustaining Ecosystem", desc: "A transition from cyber-importer to cyber-exporter, creating a resilient $1 Trillion economy for Maharashtra." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                padding: "28px 24px",
                border: "1px solid var(--border-subtle)",
                borderTop: "2px solid var(--accent-orange)",
              }}
            >
              <div style={{ fontSize: 20, color: "var(--accent-orange)", marginBottom: 14 }}>{v.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10, lineHeight: 1.3 }}>{v.title}</div>
              <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 }}>{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #roadmap-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
