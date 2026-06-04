"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Speaker } from "@/types";

const TIER_LABELS = {
  national: "National & Global Security Anchors",
  global: "Global Cyber Leaders & Thinkers",
  enterprise: "Enterprise CISOs & Practitioners",
};

const TIER_COLORS = {
  national: "#B86A2E",
  global: "#0D6665",
  enterprise: "#B86A2E",
};

const SESSION_COLORS: Record<string, string> = {
  "CLOSED-DOOR KEYNOTE": "#B86A2E",
  "INAUGURAL ADDRESS": "#B86A2E",
  "MINISTERIAL KEYNOTE": "#B86A2E",
  "DISTINGUISHED LECTURE": "#0D6665",
  "STRATEGIC KEYNOTE": "#0D6665",
  "FIRESIDE CHAT": "#9AA0A6",
  "DISTINGUISHED TALK": "#9AA0A6",
  "KEYNOTE": "#0D6665",
  "CISO ROUNDTABLE": "#9AA0A6",
  "LEADERSHIP TALK": "#9AA0A6",
  "CASE STUDY": "#9AA0A6",
};

type TierKey = "national" | "global" | "enterprise";

function SpeakerCard({ speaker, index }: { speaker: Speaker; index: number }) {
  const tierColor = TIER_COLORS[speaker.tier] || "#B86A2E";
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(13,17,23,0.85)",
        border: "1px solid rgba(240,237,232,0.07)",
        cursor: "default",
        position: "relative",
      }}
    >
      {/* Photo area — no overflow:hidden so top-right bracket can peek outside */}
      <div style={{ height: 240, position: "relative", background: "#1e2323" }}>

        {/* ── Image — z:1, clipped to its own bounds ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, overflow: "hidden",
          transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}>
          {speaker.photo ? (
            <img
              src={speaker.photo}
              alt={speaker.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.12 }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M0 16H48V64H64V0H0V16Z" fill={tierColor}/>
                <path d="M16 0H0V64H64V48H16V0Z" fill={tierColor} opacity="0.5"/>
              </svg>
            </div>
          )}
        </div>

        {/* ── TOP-RIGHT L — z:0, behind image.
             Glass effect: thick border + backdrop blur + semi-transparent fill.
             At rest sits inside; on hover tips expand past image edge (peek from behind). ── */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          width: 66, height: 66,
          borderTop: `10px solid rgba(255,255,255,0.55)`,
          borderRight: `10px solid rgba(255,255,255,0.55)`,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
          zIndex: 0,
          transform: hovered ? "translate(20px, -20px)" : "translate(0, 0)",
          opacity: hovered ? 1 : 0.4,
          transition: "transform 0.44s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s",
          pointerEvents: "none",
        }} />

        {/* ── BOTTOM-LEFT L — z:3, in front of image.
             Glass effect with accent colour; expands toward corner on hover. ── */}
        <div style={{
          position: "absolute", bottom: 14, left: 14,
          width: 66, height: 66,
          borderBottom: `10px solid ${tierColor}`,
          borderLeft: `10px solid ${tierColor}`,
          background: `${tierColor}12`,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          boxShadow: `inset 0 0 0 1px ${tierColor}30`,
          zIndex: 3,
          transform: hovered ? "translate(-14px, 14px)" : "translate(0, 0)",
          opacity: hovered ? 1 : 0.6,
          transition: "transform 0.44s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s",
          pointerEvents: "none",
        }} />

        {/* Session badge */}
        <div style={{
          position: "absolute", top: 10, left: 10, zIndex: 4,
          fontSize: 8, fontWeight: 800, letterSpacing: "0.14em", color: "#fff",
          background: SESSION_COLORS[speaker.session] || "#B86A2E",
          padding: "3px 8px",
        }}>{speaker.session}</div>

        {/* Bottom bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
          padding: "8px 12px", background: "rgba(8,10,12,0.88)",
          borderTop: `1px solid ${tierColor}22`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "background 0.3s",
        }}>
          <span style={{ fontSize: 18 }}>{speaker.countryFlag}</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "2px 8px", border: `1px solid ${tierColor}44`, color: tierColor, background: `${tierColor}10` }}>
            CONFIRMED
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "16px 16px 20px" }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.2 }}>{speaker.name}</div>
        <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.4, marginBottom: 6 }}>{speaker.role}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: tierColor, letterSpacing: "0.05em" }}>{speaker.org}</div>
        {speaker.linkedin && (
          <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 10, fontSize: 10, color: "rgba(240,237,232,0.3)", textDecoration: "none", letterSpacing: "0.08em", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = tierColor)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,237,232,0.3)")}
          >LinkedIn →</a>
        )}
      </div>
    </motion.div>
  );
}

export default function Speakers({ initialSpeakers }: { initialSpeakers: Speaker[] }) {
  const [speakers, setSpeakers] = useState<Speaker[]>(initialSpeakers);
  const [activeTier, setActiveTier] = useState<TierKey>("national");

  useEffect(() => {
    fetch("/api/speakers")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSpeakers(data); })
      .catch(() => {});
  }, []);

  const filtered = speakers.filter(s => s.tier === activeTier);
  const tiers: TierKey[] = ["national", "global", "enterprise"];

  return (
    <section id="speakers" className="section-pad" style={{ background: "#020F0F", position: "relative" }}>
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      <div className="container-vault" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: 40 }}
        >
          <span className="section-label" style={{ marginBottom: 14 }}>Speakers</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
            <h2 className="section-title" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600 }}>Speakers at VAULT 2047</h2>
            <p style={{ fontSize: 13, color: "var(--text-dim)", maxWidth: 360, lineHeight: 1.6, textAlign: "right" }}>
              50+ global cyber leaders across national security, enterprise defence and frontier research.
            </p>
          </div>
        </motion.div>

        {/* Tier tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(240,237,232,0.08)", marginBottom: 32 }}>
          {tiers.map(tier => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "12px 24px", fontSize: 12, fontWeight: 700,
                letterSpacing: "0.06em",
                color: activeTier === tier ? "var(--accent-orange)" : "rgba(240,237,232,0.4)",
                borderBottom: activeTier === tier ? "2px solid var(--accent-orange)" : "2px solid transparent",
                marginBottom: -1, transition: "color 0.2s",
              }}
            >
              {TIER_LABELS[tier]}
            </button>
          ))}
        </div>

        {/* Speaker grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {filtered.map((s, i) => <SpeakerCard key={s.id} speaker={s} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginTop: 48, padding: "24px 32px",
            border: "1px solid rgba(240,237,232,0.08)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: 20, flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
            50+ Global Cyber Leaders · 20+ Countries · September 2026 · Mumbai
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#register" className="btn-primary">Register to Attend</a>
            <a href="#contact" className="btn-outline">Nominate a Speaker</a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #speakers .container-vault > div:nth-child(3) { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          #speakers .container-vault > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
