"use client";
import { motion } from "framer-motion";

const THEMES = [
  {
    num: "01",
    title: "Cyber Defence & Critical Infrastructure",
    desc: "Securing financial systems, telecom networks, energy grids and national infrastructure.",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path d="M26 4L8 12V28C8 38.4 16.8 47.4 26 50C35.2 47.4 44 38.4 44 28V12L26 4Z" stroke="#B86A2E" strokeWidth="1.5" fill="none"/>
        <circle cx="26" cy="26" r="8" stroke="#B86A2E" strokeWidth="1.5"/>
        <path d="M26 18V22M26 30V34M18 26H22M30 26H34" stroke="#B86A2E" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="26" cy="26" r="2" fill="#B86A2E"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Emerging Threat Landscape",
    desc: "Quantum security, dark web intelligence, advanced persistent threats, zero trust.",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <rect x="10" y="10" width="32" height="32" rx="4" stroke="#B86A2E" strokeWidth="1.5"/>
        <circle cx="26" cy="26" r="6" stroke="#B86A2E" strokeWidth="1.5"/>
        <path d="M26 14V20M26 32V38M14 26H20M32 26H38" stroke="#B86A2E" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="26" cy="14" r="2" fill="#B86A2E"/>
        <circle cx="26" cy="38" r="2" fill="#B86A2E"/>
        <circle cx="14" cy="26" r="2" fill="#B86A2E"/>
        <circle cx="38" cy="26" r="2" fill="#B86A2E"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "AI & Cyber Nexus",
    desc: "Leveraging AI for threat detection while combating AI-driven cyber risk.",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path d="M26 8C16.1 8 8 16.1 8 26S16.1 44 26 44S44 35.9 44 26S35.9 8 26 8Z" stroke="#B86A2E" strokeWidth="1.5"/>
        <path d="M14 26C14 26 18 18 26 18S38 26 38 26S34 34 26 34S14 26 14 26Z" stroke="#B86A2E" strokeWidth="1.5"/>
        <circle cx="26" cy="26" r="4" fill="#B86A2E" fillOpacity="0.3" stroke="#B86A2E" strokeWidth="1.5"/>
        <path d="M26 14V18M26 34V38M14 26H18M34 26H38" stroke="#B86A2E" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "IT–OT–IoT Security Convergence",
    desc: "Protecting connected industrial and enterprise ecosystems.",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <rect x="8" y="18" width="12" height="16" rx="2" stroke="#B86A2E" strokeWidth="1.5"/>
        <rect x="22" y="12" width="8" height="28" rx="2" stroke="#B86A2E" strokeWidth="1.5"/>
        <rect x="32" y="20" width="12" height="12" rx="2" stroke="#B86A2E" strokeWidth="1.5"/>
        <path d="M14 26H22M30 26H32" stroke="#B86A2E" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="26" r="2" fill="#B86A2E"/>
        <circle cx="38" cy="26" r="2" fill="#B86A2E"/>
        <circle cx="26" cy="26" r="2" fill="#B86A2E"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "Cyber-Talent & Skills Pipeline",
    desc: "Addressing the 3.5M global talent gap using India's 200,000+ annual STEM graduates.",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="18" r="7" stroke="#B86A2E" strokeWidth="1.5"/>
        <path d="M12 42C12 35.4 18.3 30 26 30S40 35.4 40 42" stroke="#B86A2E" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M34 22C36.2 20.8 38 18.6 38 16C38 12.7 35.3 10 32 10" stroke="#B86A2E" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M40 38C42 37 44 34.5 44 32" stroke="#B86A2E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "06",
    title: "Digital Trust & Citizen Safety",
    desc: "Building digital trust against UPI fraud, deepfakes, social engineering and identity theft.",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path d="M26 6L10 14V30C10 40 18 48 26 50C34 48 42 40 42 30V14L26 6Z" stroke="#B86A2E" strokeWidth="1.5" fill="none"/>
        <path d="M18 26L23 31L34 20" stroke="#B86A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Themes() {
  return (
    <section id="themes" className="section-pad" style={{ background: "#13130E", position: "relative", overflow: "hidden" }}>
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      <div className="container-vault" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: 52 }}
        >
          <span className="section-label">Core Thematic Areas</span>
          <h2 className="section-title">Shaping the Future of Cybersecurity</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {THEMES.map((t, i) => (
            <motion.div
              key={t.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              viewport={{ once: true, margin: "-40px" }}
              style={{
                background: "linear-gradient(145deg, #13130E, #0A0D08)",
                border: "1px solid rgba(240,237,232,0.06)",
                padding: "40px 36px 36px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "border-color 0.3s",
              }}
              whileHover={{ borderColor: "rgba(184,106,46,0.25)" } as never}
            >
              {/* Background number */}
              <div style={{
                position: "absolute", right: 20, top: 16,
                fontSize: 80, fontWeight: 900, color: "rgba(184,106,46,0.04)",
                lineHeight: 1, userSelect: "none", pointerEvents: "none",
              }}>{t.num}</div>

              <div style={{ marginBottom: 24, position: "relative", zIndex: 1 }}>{t.icon}</div>

              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
                color: "rgba(240,237,232,0.35)", marginBottom: 10,
              }}>{t.num}</div>

              <h3 style={{
                fontSize: 18, fontWeight: 700, color: "var(--text-primary)",
                marginBottom: 12, lineHeight: 1.3, letterSpacing: "-0.01em",
              }}>{t.title}</h3>

              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{t.desc}</p>

              {/* Bottom accent line on hover */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, var(--accent-orange), transparent)",
                opacity: 0,
                transition: "opacity 0.3s",
              }} className="theme-hover-line" />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #themes .container-vault > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
