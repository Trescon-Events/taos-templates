"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types";

const ARTICLES = [
  {
    type: "PRESS RELEASE",
    date: "February 24, 2026",
    title: "Vault 2047 Announces India's First Sovereign Cyber Resilience Summit",
    excerpt: "Mumbai, India. Vault 2047 marks a watershed moment in India's cybersecurity journey, bringing together the nation's top defence, policy, and technology leaders...",
  },
  {
    type: "PRESS RELEASE",
    date: "February 24, 2026",
    title: "100+ Global Cyber Leaders Confirmed for Vault 2047 Mumbai",
    excerpt: "Mumbai, India. The roster of confirmed speakers for Vault 2047 reads like a who's who of the global cybersecurity establishment, with CISOs from Fortune 500...",
  },
  {
    type: "FEATURE",
    date: "February 24, 2026",
    title: "Why Vault 2047 Is Redefining India's Role in Global Cyber Governance",
    excerpt: "Mumbai, India. As cyberattacks grow in sophistication and scale, India is positioning itself as a global leader in cybersecurity policy through platforms like...",
  },
];

const SOCIAL_ICONS = [
  { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.626L18.244 2.25z" },
  { label: "Li", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "Fb", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "◎", path: "" },
];

export default function Media({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const [articles, setArticles] = useState<BlogPost[]>(initialBlogs.length > 0 ? initialBlogs : ARTICLES as unknown as BlogPost[]);

  useEffect(() => {
    fetch("/api/blogs")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setArticles(data); })
      .catch(() => {});
  }, []);

  // use articles instead of ARTICLES below
  void 0;
  return (
    <section id="media" className="section-pad" style={{ background: "#020F0F", position: "relative" }}>
      <div className="container-vault">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: 52 }}
        >
          <span className="section-label">Media & Insights</span>
          <h2 className="section-title">Updates in the Cyber Space</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
              className="glass-card"
              style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              {/* Image placeholder */}
              <div style={{
                height: 180,
                background: `linear-gradient(145deg, #0F1318, #1A1F28)`,
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 30% 50%, rgba(224,123,44,0.08), transparent)",
                }} />
                <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
              </div>

              <div style={{ padding: "24px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Meta */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                    color: "var(--accent-orange)",
                  }}>{a.type}</span>
                  <span style={{ fontSize: 10, color: "var(--text-dim)" }}>{a.date}</span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 15, fontWeight: 700, color: "var(--text-primary)",
                  lineHeight: 1.4, marginBottom: 12,
                }}>{a.title}</h3>

                {/* Excerpt */}
                <p style={{
                  fontSize: 13, color: "var(--text-secondary)",
                  lineHeight: 1.6, flex: 1, marginBottom: 20,
                }}>{a.excerpt}</p>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
                  {/* Social icons */}
                  <div style={{ display: "flex", gap: 10 }}>
                    {["𝕏", "in", "f", "◎"].map(icon => (
                      <button key={icon} style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: 14, color: "var(--text-dim)",
                        transition: "color 0.2s",
                        padding: 0,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                  <a href="#media" style={{
                    fontSize: 12, fontWeight: 600, color: "var(--accent-orange)",
                    textDecoration: "none", display: "flex", alignItems: "center", gap: 4,
                    letterSpacing: "0.05em",
                  }}>
                    Read More →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 48 }}
        >
          <a href="#media" className="btn-primary">Read More</a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #media .container-vault > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          #media .container-vault > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
