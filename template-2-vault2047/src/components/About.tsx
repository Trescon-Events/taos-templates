"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EVENT_FOCUS = [
  {
    num: "01",
    title: "Unify global cyber-resilience leadership",
    desc: "Bring together the world's foremost cyber leaders, policymakers and enterprises to align on a unified global security agenda.",
  },
  {
    num: "02",
    title: "Drive sovereign cyber-defence capabilities",
    desc: "Catalyze indigenous cyber-defense innovation — transitioning India from cyber-importer to cyber-exporter aligned with Viksit Bharat 2047.",
  },
  {
    num: "03",
    title: "Enable critical infrastructure protection",
    desc: "Unite BFSI, Power, Telecom, Healthcare, and Government sectors to secure India's critical digital infrastructure against emerging threats.",
  },
  {
    num: "04",
    title: "Bridge the global cybersecurity talent gap",
    desc: "Address the 3.5M global talent shortfall through India's 200,000+ annual STEM graduates, Cyber-Powered Skills Pods, and Youthpreneurs Zone.",
  },
  {
    num: "05",
    title: "Facilitate direct investment & job creation",
    desc: "Secure commitments for cyber R&D centers, MSSP hubs, threat intelligence centers, and startup funding through The Cyber Foundry.",
  },
  {
    num: "06",
    title: "Institutionalize public-private collaboration",
    desc: "The Mumbai Accord — moving beyond discussion to signed protocols for threat intelligence sharing between government and private sectors.",
  },
];

export default function About() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section id="about" className="section-pad" style={{ background: "#13130E", position: "relative", overflow: "hidden" }}>
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      <div className="container-vault" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 72, alignItems: "start" }}>

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 500, lineHeight: 1.3,
              color: "#B86A2E",
              marginBottom: 24,
            }}>
              A Global Platform for<br />Cyber-Resilience Leadership
            </h2>

            <p style={{
              fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75,
              marginBottom: 40, fontStyle: "italic",
            }}>
              Vault2047 is India's flagship global platform for cybersecurity resilience — bringing together
              policymakers, defence agencies, CISOs, innovators, investors and academia to co-create
              the future of cyber defence.
            </p>

            {/* Quote block */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(240,237,232,0.08)",
              borderLeft: "3px solid #0D6665",
              padding: "28px 28px 28px 32px",
              position: "relative",
            }}>
              <div style={{
                fontSize: 60, color: "#0D6665", lineHeight: 0.6,
                fontFamily: "Georgia, serif", marginBottom: 12, opacity: 0.9,
              }}>"</div>
              <p style={{
                fontSize: "clamp(14px, 1.5vw, 16px)",
                color: "var(--text-secondary)",
                lineHeight: 1.7, fontStyle: "italic",
              }}>
                This is where policy, technology, and capital converge to build the next generation
                of cybersecurity ecosystems.
              </p>
            </div>

            <div style={{ marginTop: 40, display: "flex", gap: 14 }}>
              <a href="#register" className="btn-primary">Get Your Pass</a>
              <a href="#contact" className="btn-outline">Enquire Now</a>
            </div>
          </motion.div>

          {/* Right — Event Focus accordion */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Header bar */}
            <div style={{
              background: "rgba(184,106,46,0.15)",
              border: "1px solid rgba(184,106,46,0.2)",
              padding: "14px 24px",
              marginBottom: 2,
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(240,237,232,0.6)" }}>
                Event Focus
              </span>
            </div>

            {/* Accordion items */}
            {EVENT_FOCUS.map((item, i) => (
              <div key={item.num} style={{ borderBottom: "1px solid rgba(240,237,232,0.06)" }}>
                <button
                  onClick={() => setActiveItem(activeItem === i ? -1 : i)}
                  style={{
                    width: "100%", background: activeItem === i ? "rgba(184,106,46,0.06)" : "rgba(0,0,0,0.2)",
                    border: "none", cursor: "pointer",
                    padding: "18px 24px",
                    display: "flex", alignItems: "center", gap: 16,
                    textAlign: "left", transition: "background 0.2s",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "var(--accent-orange)", minWidth: 28, opacity: 0.8 }}>
                    {item.num}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", flex: 1, lineHeight: 1.3 }}>
                    {item.title}
                  </span>
                  <span style={{
                    fontSize: 18, color: "var(--accent-orange)",
                    transform: activeItem === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.25s",
                    flexShrink: 0,
                  }}>+</span>
                </button>

                <AnimatePresence>
                  {activeItem === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr",
                        gap: 0,
                      }}>
                        {/* Text */}
                        <div style={{ padding: "20px 24px 24px 68px" }}>
                          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                            {item.desc}
                          </p>
                          <a href="#about" style={{ fontSize: 12, color: "var(--accent-orange)", marginTop: 12, display: "inline-block", textDecoration: "none" }}>→</a>
                        </div>
                        {/* Image placeholder */}
                        <div style={{
                          background: `linear-gradient(145deg, #0F1520, #1A2535)`,
                          minHeight: 120,
                          position: "relative",
                          overflow: "hidden",
                        }}>
                          <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
                          <div style={{
                            position: "absolute", inset: 0,
                            background: "radial-gradient(ellipse at 40% 50%, rgba(184,106,46,0.08), transparent)",
                          }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container-vault > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
