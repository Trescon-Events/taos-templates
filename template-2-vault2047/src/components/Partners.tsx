"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Partner } from "@/types";

const EXHIBITOR_CATEGORIES = [
  {
    title: "Global Cybersecurity Technology Leaders",
    companies: ["Palo Alto Networks", "Microsoft Security", "CrowdStrike", "Fortinet", "Tenable", "Check Point", "Cisco Security", "IBM Security"],
  },
  {
    title: "Indian Cybersecurity Leaders",
    companies: ["JISA", "eGyanamTech", "IDfy", "Cyber Chakra", "Ram Antivirus", "Quick Heal", "Paladion", "CloudSEK"],
  },
  {
    title: "Infrastructure & Connectivity Security",
    companies: ["Jio", "Tata Communications", "AdaniConneX", "Yotta Infrastructure", "Reliance Infrastructure"],
  },
  {
    title: "Consulting & Professional Services",
    companies: ["PwC", "Deloitte", "EY", "KPMG", "Capgemini", "Accenture"],
  },
  {
    title: "Investors & Capital",
    companies: ["Sequoia", "Accel", "Lightspeed", "Blume Ventures", "SoftBank Vision Fund", "Temasek", "Google Ventures", "M12"],
  },
];

const MARQUEE_LOGOS = [
  "Palo Alto Networks", "Microsoft", "CrowdStrike", "Fortinet", "IBM Security",
  "Cisco", "PwC", "Deloitte", "EY", "KPMG", "Accenture", "Tenable",
  "Check Point", "Jio", "Tata Comms", "JISA", "IDfy", "CloudSEK",
  "Sequoia", "Temasek", "Google Ventures",
];

function LogoChip({ name }: { name: string }) {
  return (
    <div style={{
      minWidth: 140, height: 44, padding: "0 20px",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: 0.5, transition: "opacity 0.2s",
    }}
    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
    onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
    >
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "var(--text-primary)", whiteSpace: "nowrap" }}>
        {name}
      </span>
    </div>
  );
}

export default function Partners({ initialPartners }: { initialPartners: Partner[] }) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);

  useEffect(() => {
    fetch("/api/partners")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPartners(data); })
      .catch(() => {});
  }, []);

  const marqueeNames = partners.length > 0
    ? partners.map(p => p.name)
    : MARQUEE_LOGOS;

  const doubled = [...marqueeNames, ...marqueeNames];

  return (
    <section id="partners" className="section-pad" style={{ background: "#020F0F", overflow: "hidden" }}>
      <div className="container-vault" style={{ marginBottom: 52 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="section-label">Partners & Exhibitors</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
            <h2 className="section-title" style={{ maxWidth: 500 }}>
              India's Cyber Ecosystem Under One Roof
            </h2>
            <a href="#contact" className="btn-outline" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
              Become an Exhibitor
            </a>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, maxWidth: 620, marginTop: 16, lineHeight: 1.65 }}>
            100+ exhibitors spanning global cybersecurity technology leaders, Indian cyber companies,
            infrastructure providers, consulting firms, and cyber startups.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{ overflow: "hidden", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", padding: "20px 0", marginBottom: 16 }}>
        <div className="marquee-track">{doubled.map((n, i) => <LogoChip key={i} name={n} />)}</div>
      </div>
      <div style={{ overflow: "hidden", padding: "20px 0", marginBottom: 64 }}>
        <div className="marquee-track" style={{ animationDirection: "reverse", animationDuration: "22s" }}>
          {doubled.map((n, i) => <LogoChip key={i} name={marqueeNames[(i + 9) % marqueeNames.length]} />)}
        </div>
      </div>

      {/* Exhibitor category breakdown */}
      <div className="container-vault">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "var(--text-dim)", marginBottom: 24 }}>
            EXHIBITOR CATEGORIES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {EXHIBITOR_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "280px 1fr",
                  gap: 32,
                  padding: "20px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{cat.title}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.companies.map(c => (
                    <span key={c} style={{
                      fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                      padding: "5px 12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-secondary)",
                    }}>{c}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sponsorship tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginTop: 64 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "var(--text-dim)", marginBottom: 24 }}>
            SPONSORSHIP OPPORTUNITIES
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { tier: "Platinum", color: "#E5C87A", desc: "Title sponsorship — full brand integration, dedicated speaking slots, premium Sovereign Shield Pavilion space." },
              { tier: "Gold", color: "#C4A44A", desc: "Prime visibility across all touchpoints, panel participation, strategic networking, Mumbai Accord access." },
              { tier: "Silver", color: "#9AA0A6", desc: "Brand exposure, exhibition space, delegate passes for security leadership team." },
              { tier: "Startup", color: "var(--accent-teal)", desc: "Cyber Foundry participation, demo zone, VC matchmaking, and investor access for emerging cyber companies." },
            ].map((p, i) => (
              <motion.div
                key={p.tier}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{ padding: "28px 22px" }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: p.color, marginBottom: 12 }}>
                  {p.tier.toUpperCase()} PARTNER
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 18 }}>{p.desc}</p>
                <a href="#contact" style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-orange)", textDecoration: "none", letterSpacing: "0.06em" }}>
                  Enquire →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #partners .container-vault > div:nth-child(2) > div:last-child > div { grid-template-columns: 280px 1fr !important; }
          #partners .container-vault > div:nth-child(2) > div:nth-child(2) > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #partners .container-vault > div:nth-child(2) > div:last-child > div { grid-template-columns: 1fr !important; }
          #partners .container-vault > div:nth-child(2) > div:nth-child(2) > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
