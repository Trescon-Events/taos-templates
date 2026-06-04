"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/types";

export default function Testimonials({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(() => {});
  }, []);

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#13130E",
        minHeight: 480,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(13,102,101,0.04) 0%, transparent 60%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, rgba(184,106,46,0.05) 0%, transparent 70%)",
      }} />
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      {/* Orange top border accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--accent-orange)" }} />

      <div className="container-vault" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ marginBottom: 48 }}
        >
          <h2 className="section-title" style={{ textAlign: "center" }}>
            What Leaders Say About Us.
          </h2>
        </motion.div>

        {/* Card */}
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          {/* Prev/Next arrows */}
          <button
            onClick={() => setActive(a => (a - 1 + testimonials.length) % testimonials.length)}
            style={{
              position: "absolute", left: -60, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)", width: 40, height: 40,
              cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-orange)"; e.currentTarget.style.color = "var(--accent-orange)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >‹</button>
          <button
            onClick={() => setActive(a => (a + 1) % testimonials.length)}
            style={{
              position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)", width: 40, height: 40,
              cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-orange)"; e.currentTarget.style.color = "var(--accent-orange)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >›</button>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="glass-card"
              style={{ padding: "48px 52px" }}
            >
              {/* Quote icon */}
              <div style={{
                width: 40, height: 36,
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                  <path d="M0 22V13.75C0 9.583 1.25 6.25 3.75 3.75S9.583 0 13.75 0v4.5C11.5 4.5 9.75 5.208 8.5 6.625S6.5 9.917 6.5 12.5H11V22H0zm16.5 0V13.75c0-4.167 1.25-7.5 3.75-10S25.833 0 30 0v4.5c-2.25 0-4 .708-5.25 2.125S23 9.917 23 12.5h4.5V22H16.5z" fill="#B86A2E"/>
                </svg>
              </div>

              <p style={{
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: "var(--text-primary)",
                lineHeight: 1.75,
                marginBottom: 32,
                fontStyle: "normal",
              }}>
                {testimonials[active]?.quote ?? ""}
              </p>

              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent-orange)" }}>
                  {testimonials[active]?.role ?? ""}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", letterSpacing: "0.12em", marginTop: 4 }}>
                  {testimonials[active]?.org ?? ""}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
            {testimonials.map((_t: Testimonial, i: number) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 28 : 8, height: 3,
                  background: i === active ? "var(--accent-orange)" : "var(--border-subtle)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.3s, background 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
