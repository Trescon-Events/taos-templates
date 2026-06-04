"use client";
import { motion } from "framer-motion";

const EXPERIENCES = [
  { num: "01", label: "Global Plenary: Dialogues from the Vault 2047", wide: false },
  { num: "02", label: "The Mumbai Accord Roundtables", wide: false },
  { num: "03", label: "Sovereign Shield Pavilion", wide: false },
  { num: "04", label: "The Cyber Foundry", wide: true },
  { num: "05", label: "Cyber-Powered Skills Pods", wide: true },
];

const BG_COLORS = [
  "linear-gradient(145deg, #0F1520, #1A2535)",
  "linear-gradient(145deg, #150F20, #251535)",
  "linear-gradient(145deg, #0F1820, #1A2830)",
  "linear-gradient(145deg, #1A1205, #2A1E08)",
  "linear-gradient(145deg, #0A1518, #142028)",
];

export default function Experience() {
  return (
    <section id="experience" style={{ background: "#13130E", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div className="container-vault">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: 52 }}
        >
          <span className="section-label">Experience the Event</span>
          <h2 className="section-title">A Cyber Ecosystem In Action</h2>
        </motion.div>

        {/* Top row — 3 equal */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
          {EXPERIENCES.slice(0, 3).map((exp, i) => (
            <motion.div
              key={exp.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
              style={{
                height: 260,
                background: BG_COLORS[i],
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Grid overlay */}
              <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />

              {/* Orange glow */}
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse at ${i % 2 === 0 ? "30%" : "70%"} 50%, rgba(184,106,46,0.08), transparent)`,
              }} />

              {/* Number */}
              <div style={{
                position: "absolute", top: 16, left: 16,
                fontSize: 12, fontWeight: 700, color: "rgba(240,237,232,0.5)",
                letterSpacing: "0.1em",
              }}>{exp.num}</div>

              {/* Label */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "40px 20px 18px",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                  {exp.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row — 2 wider */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {EXPERIENCES.slice(3).map((exp, i) => (
            <motion.div
              key={exp.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
              style={{
                height: 260,
                background: BG_COLORS[3 + i],
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse at ${i === 0 ? "40%" : "60%"} 50%, rgba(184,106,46,0.07), transparent)`,
              }} />

              <div style={{
                position: "absolute", top: 16, left: 20,
                fontSize: 12, fontWeight: 700, color: "rgba(240,237,232,0.5)",
                letterSpacing: "0.1em",
              }}>{exp.num}</div>

              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "40px 24px 20px",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
              }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                  {exp.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section:has(#experience-grid) .container-vault > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
