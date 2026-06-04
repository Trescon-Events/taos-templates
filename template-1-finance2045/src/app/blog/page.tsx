import Link from "next/link";
import { posts, formatDate } from "@/data/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Finance 2045 Indonesia",
  description:
    "Insights, analysis and expert perspectives on Indonesia's financial transformation — from digital banking and CBDC to Islamic fintech, AI, and financial inclusion.",
  keywords: [
    "Finance 2045 blog",
    "Indonesia fintech news",
    "Indonesian banking insights",
    "digital finance Indonesia",
    "QRIS CBDC Indonesia",
  ],
  openGraph: {
    title: "Finance 2045 Blog — Indonesia's Financial Future",
    description:
      "Expert insights on Indonesia's financial transformation: digital banking, CBDC, Islamic fintech, AI, and financial inclusion.",
    type: "website",
    url: "https://www.finance2045.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance 2045 Blog — Indonesia's Financial Future",
    description:
      "Expert insights on Indonesia's financial transformation.",
  },
  alternates: { canonical: "https://www.finance2045.com/blog" },
};

const categoryColors: Record<string, string> = {
  "Macro & Policy":    "#E9C268",
  "Digital Banking":   "#00a5a3",
  "Central Banking":   "#00a5a3",
  "Payments":          "#00a5a3",
  "Islamic Finance":   "#E9C268",
  "Technology":        "#00a5a3",
  "Financial Inclusion": "#E9C268",
};

const [featured, ...rest] = posts;

export default function BlogPage() {
  return (
    <>
      <style>{`
        .bl-page {
          background: var(--bg-primary);
          min-height: 100vh;
        }

        /* ── Hero ── */
        .bl-hero {
          position: relative;
          padding: 148px 40px 80px;
          text-align: center;
          overflow: hidden;
        }
        .bl-hero-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,165,163,0.1) 0%, transparent 70%);
        }
        .bl-hero-grid {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.035;
          background-image:
            linear-gradient(rgba(0,165,163,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,165,163,1) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 70%);
        }
        .bl-hero-inner {
          position: relative; z-index: 1;
          max-width: 720px; margin: 0 auto;
        }
        .bl-hero h1 {
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: #fff;
          margin-bottom: 18px;
        }
        .bl-hero h1 span {
          background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bl-hero p {
          font-size: 16px;
          color: rgba(255,255,255,0.52);
          line-height: 1.8;
          max-width: 500px;
          margin: 0 auto;
        }

        /* ── Inner container ── */
        .bl-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 100px;
        }

        /* ── Featured article ── */
        .bl-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid rgba(0,165,163,0.15);
          background: var(--bg-surface);
          margin-bottom: 56px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .bl-featured::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #00a5a3, #E9C268, rgba(0,165,163,0.1));
        }
        .bl-featured:hover {
          border-color: rgba(0,165,163,0.4);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 12px 40px rgba(0,0,0,0.4);
        }
        .bl-featured-visual {
          position: relative;
          min-height: 380px;
          background: #0a1a2e;
          overflow: hidden;
        }
        .bl-featured-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease;
        }
        .bl-featured:hover .bl-featured-img { transform: scale(1.04); }
        .bl-featured-visual-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(10,26,46,0.72) 0%, rgba(10,26,46,0.45) 100%);
        }
        .bl-featured-badge {
          position: absolute; top: 24px; left: 24px;
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(0,165,163,0.15);
          border: 1px solid rgba(0,165,163,0.35);
          color: #00a5a3;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 100px;
          z-index: 2;
        }
        .bl-featured-content {
          padding: 48px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .bl-cat-pill {
          display: inline-flex;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 4px;
          margin-bottom: 18px;
          width: fit-content;
        }
        .bl-featured-title {
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.18;
          color: #fff;
          margin-bottom: 16px;
        }
        .bl-featured-excerpt {
          font-size: 14px;
          color: rgba(255,255,255,0.52);
          line-height: 1.78;
          margin-bottom: 28px;
          flex: 1;
        }
        .bl-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .bl-meta-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.2); }
        .bl-read-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #00a5a3;
          transition: gap 0.2s, color 0.2s;
        }
        .bl-read-link:hover { gap: 14px; color: #fff; }

        /* ── Divider ── */
        .bl-divider {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }
        .bl-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.2), transparent);
        }
        .bl-divider-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          white-space: nowrap;
        }

        /* ── Articles grid ── */
        .bl-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .bl-card {
          background: var(--bg-surface);
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .bl-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #00a5a3, rgba(0,165,163,0.1));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .bl-card:hover {
          border-color: rgba(0,165,163,0.35);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 8px 32px rgba(0,0,0,0.35);
          transform: translateY(-3px);
        }
        .bl-card:hover::before { opacity: 1; }

        .bl-card-visual {
          height: 200px;
          background: #0a1a2e;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .bl-card-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
        }
        .bl-card:hover .bl-card-img { transform: scale(1.06); }
        .bl-card-visual-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(10,26,46,0.25) 0%, rgba(10,26,46,0.55) 100%);
        }
        .bl-card-visual-cat {
          position: absolute; bottom: 14px; left: 16px;
          z-index: 2;
        }
        .bl-card-body {
          padding: 24px 24px 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .bl-card-title {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: #fff;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        .bl-card:hover .bl-card-title { color: rgba(255,255,255,0.9); }
        .bl-card-excerpt {
          font-size: 12.5px;
          color: rgba(255,255,255,0.42);
          line-height: 1.72;
          flex: 1;
          margin-bottom: 18px;
        }
        .bl-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 14px;
        }
        .bl-card-meta {
          font-size: 10px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.04em;
        }
        .bl-card-arrow {
          color: rgba(0,165,163,0.5);
          transition: color 0.2s, transform 0.2s;
        }
        .bl-card:hover .bl-card-arrow {
          color: #00a5a3;
          transform: translateX(4px);
        }

        /* ── JSON-LD script ── */

        @media (max-width: 1024px) {
          .bl-grid { grid-template-columns: repeat(2, 1fr); }
          .bl-featured { grid-template-columns: 1fr; }
          .bl-featured-visual { min-height: 240px; }
          .bl-featured-content { padding: 36px 32px; }
        }
        @media (max-width: 640px) {
          .bl-hero { padding: 120px 20px 60px; }
          .bl-inner { padding: 0 20px 72px; }
          .bl-grid { grid-template-columns: 1fr; }
          .bl-featured-content { padding: 28px 24px; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Finance 2045 Blog",
            description: "Expert insights on Indonesia's financial transformation",
            url: "https://www.finance2045.com/blog",
            publisher: {
              "@type": "Organization",
              name: "Finance 2045",
              logo: { "@type": "ImageObject", url: "https://www.finance2045.com/logo.png" },
            },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `https://www.finance2045.com/blog/${p.slug}`,
              datePublished: p.publishDate,
              author: { "@type": "Person", name: p.author },
              description: p.metaDescription,
              keywords: p.keywords.join(", "),
            })),
          }),
        }}
      />

      <div className="bl-page">

        {/* Hero */}
        <div className="bl-hero">
          <div className="bl-hero-glow" />
          <div className="bl-hero-grid" />
          <div className="bl-hero-inner">
            <div className="f45-eyebrow" style={{ justifyContent: "center" }}>
              <span className="f45-eyebrow-dot" />
              Insights & Analysis
            </div>
            <h1>Finance 2045 <span>Blog</span></h1>
            <p>
              Expert perspectives on Indonesia&apos;s financial transformation — digital banking, CBDC, Islamic fintech, AI, and the path to 2045.
            </p>
          </div>
        </div>

        <div className="bl-inner">

          {/* Featured */}
          <Link href={`/blog/${featured.slug}`} className="bl-featured">
            <div className="bl-featured-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.coverImage} alt={featured.coverAlt} className="bl-featured-img" />
              <div className="bl-featured-visual-overlay" />
              <div className="bl-featured-badge">
                <svg width="7" height="7" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
                Featured Article
              </div>
            </div>
            <div className="bl-featured-content">
              <div
                className="bl-cat-pill"
                style={{
                  background: `${categoryColors[featured.category]}18`,
                  color: categoryColors[featured.category],
                  border: `1px solid ${categoryColors[featured.category]}40`,
                }}
              >
                {featured.category}
              </div>
              <div className="bl-featured-title">{featured.title}</div>
              <div className="bl-meta">
                <span>{featured.author}</span>
                <span className="bl-meta-sep" />
                <span>{formatDate(featured.publishDate)}</span>
                <span className="bl-meta-sep" />
                <span>{featured.readTime}</span>
              </div>
              <div className="bl-featured-excerpt">{featured.excerpt}</div>
              <div className="bl-read-link">
                Read Article
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>

          {/* Divider */}
          <div className="bl-divider">
            <div className="bl-divider-line" />
            <span className="bl-divider-label">More Articles</span>
            <div className="bl-divider-line" />
          </div>

          {/* Grid */}
          <div className="bl-grid">
            {rest.map((post) => {
              const color = categoryColors[post.category] || "#00a5a3";
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="bl-card">
                  <div className="bl-card-visual">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.coverImage} alt={post.coverAlt} className="bl-card-img" />
                    <div className="bl-card-visual-overlay" />
                    <div className="bl-card-visual-cat">
                      <div
                        className="bl-cat-pill"
                        style={{
                          background: `${color}25`,
                          color,
                          border: `1px solid ${color}50`,
                          margin: 0,
                        }}
                      >
                        {post.category}
                      </div>
                    </div>
                  </div>
                  <div className="bl-card-body">
                    <div className="bl-card-title">{post.title}</div>
                    <div className="bl-card-excerpt">{post.excerpt}</div>
                    <div className="bl-card-footer">
                      <span className="bl-card-meta">{post.author} · {post.readTime}</span>
                      <svg className="bl-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
