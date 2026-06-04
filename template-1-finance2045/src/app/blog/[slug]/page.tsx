import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, getRelatedPosts, formatDate } from "@/data/blog";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Finance 2045 Blog`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.keywords,
      url: `https://www.finance2045.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
    alternates: { canonical: `https://www.finance2045.com/blog/${post.slug}` },
  };
}

const categoryColors: Record<string, string> = {
  "Macro & Policy":      "#E9C268",
  "Digital Banking":     "#00a5a3",
  "Central Banking":     "#00a5a3",
  "Payments":            "#00a5a3",
  "Islamic Finance":     "#E9C268",
  "Technology":          "#00a5a3",
  "Financial Inclusion": "#E9C268",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const color = categoryColors[post.category] || "#00a5a3";
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    author: { "@type": "Person", name: post.author, jobTitle: post.authorRole },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    publisher: {
      "@type": "Organization",
      name: "Finance 2045",
      logo: { "@type": "ImageObject", url: "https://www.finance2045.com/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.finance2045.com/blog/${post.slug}` },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "en",
  };

  return (
    <>
      <style>{`
        .art-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 88px;
        }

        /* ── Header ── */
        .art-header {
          position: relative;
          padding: 64px 40px 72px;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .art-header-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 70% at 50% 0%, rgba(0,165,163,0.08) 0%, transparent 70%);
        }
        .art-header-inner {
          max-width: 800px;
          margin: 0 auto;
          position: relative; z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .art-header-top {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 22px;
          width: 100%;
        }
        .art-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          transition: color 0.2s, gap 0.2s;
          white-space: nowrap;
        }
        .art-back:hover { color: #00a5a3; gap: 4px; }
        .art-header-sep {
          width: 1px; height: 14px;
          background: rgba(255,255,255,0.12);
          flex-shrink: 0;
        }
        .art-cat {
          display: inline-flex;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 4px;
        }

        /* ── Cover image ── */
        .art-cover {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 40px 40px;
        }
        .art-cover-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          object-position: center;
          display: block;
          border: 1px solid rgba(255,255,255,0.06);
        }
        @media (max-width: 640px) {
          .art-cover { padding: 0 20px 32px; }
          .art-cover-img { height: 220px; }
        }
        .art-title {
          font-size: clamp(26px, 4vw, 44px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.08;
          color: #fff;
          margin-bottom: 24px;
        }
        .art-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .art-author-block {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .art-author-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(0,165,163,0.3), rgba(0,165,163,0.1));
          border: 1px solid rgba(0,165,163,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #00a5a3;
          flex-shrink: 0;
        }
        .art-author-name {
          font-size: 13px; font-weight: 700; color: #fff;
        }
        .art-author-role {
          font-size: 10px; color: rgba(255,255,255,0.38);
          letter-spacing: 0.03em;
        }
        .art-meta-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.15); }
        .art-meta-item {
          font-size: 11px; color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
        }

        /* ── Body ── */
        .art-body-wrap {
          max-width: 800px;
          margin: 0 auto;
          padding: 64px 40px 80px;
        }
        .art-lead {
          font-size: 18px;
          color: rgba(255,255,255,0.75);
          line-height: 1.82;
          font-weight: 400;
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(0,165,163,0.15);
        }
        .art-para {
          font-size: 16px;
          color: rgba(255,255,255,0.58);
          line-height: 1.88;
          margin-bottom: 28px;
        }

        /* ── Keywords ── */
        .art-keywords {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .art-keywords-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 12px;
        }
        .art-keywords-list {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .art-keyword {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 5px 12px; border-radius: 4px;
          background: rgba(255,255,255,0.02);
        }

        /* ── CTA Banner ── */
        .art-cta {
          background: var(--bg-surface);
          border: 1px solid rgba(0,165,163,0.2);
          border-left: 3px solid #00a5a3;
          padding: 28px 32px;
          margin: 48px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .art-cta-text {
          font-size: 14px; font-weight: 700; color: #fff;
          margin-bottom: 4px;
        }
        .art-cta-sub {
          font-size: 12px; color: rgba(255,255,255,0.42);
        }

        /* ── Related ── */
        .art-related {
          background: var(--bg-surface);
          border-top: 1px solid rgba(0,165,163,0.15);
          padding: 72px 40px 80px;
        }
        .art-related-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .art-related h2 {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 8px 0 36px;
        }
        .art-related h2 span { color: #00a5a3; }
        .art-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .art-rel-card {
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          padding: 24px;
          display: flex; flex-direction: column; gap: 12px;
          position: relative; overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .art-rel-card::before {
          content: '';
          position: absolute; top: 0; left: 0; bottom: 0; width: 2px;
          background: #00a5a3; opacity: 0;
          transition: opacity 0.25s;
        }
        .art-rel-card:hover {
          border-color: rgba(0,165,163,0.3);
          box-shadow: 0 0 24px rgba(0,165,163,0.2), 0 6px 24px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .art-rel-card:hover::before { opacity: 1; }
        .art-rel-cat {
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #00a5a3;
        }
        .art-rel-title {
          font-size: 13px; font-weight: 800;
          color: #fff; line-height: 1.35;
          letter-spacing: -0.01em;
        }
        .art-rel-meta {
          font-size: 10px; color: rgba(255,255,255,0.28);
          margin-top: auto;
        }

        @media (max-width: 900px) {
          .art-related-grid { grid-template-columns: repeat(2, 1fr); }
          .art-related { padding: 56px 24px 64px; }
        }
        @media (max-width: 640px) {
          .art-header { padding: 48px 20px 56px; }
          .art-body-wrap { padding: 48px 20px 64px; }
          .art-related-grid { grid-template-columns: 1fr; }
          .art-cta { flex-direction: column; align-items: flex-start; }
          .art-para { font-size: 15px; }
          .art-lead { font-size: 16px; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="art-page">

        {/* ── Header ── */}
        <div className="art-header">
          <div className="art-header-glow" />
          <div className="art-header-inner">
            <div className="art-header-top">
              <Link href="/blog" className="art-back">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Blog
              </Link>
              <div className="art-header-sep" />
              <div
                className="art-cat"
                style={{
                  background: `${color}18`,
                  color,
                  border: `1px solid ${color}40`,
                }}
              >
                {post.category}
              </div>
            </div>

            <h1 className="art-title">{post.title}</h1>

            <div className="art-meta">
              <div className="art-author-block">
                <div className="art-author-avatar">
                  {post.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="art-author-name">{post.author}</div>
                  <div className="art-author-role">{post.authorRole}</div>
                </div>
              </div>
              <span className="art-meta-sep" />
              <span className="art-meta-item">{formatDate(post.publishDate)}</span>
              <span className="art-meta-sep" />
              <span className="art-meta-item">{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* ── Cover image ── */}
        <div className="art-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.coverAlt} className="art-cover-img" />
        </div>

        {/* ── Article body ── */}
        <div className="art-body-wrap">

          {/* Lead paragraph */}
          <p className="art-lead">{paragraphs[0]}</p>

          {/* Body paragraphs */}
          {paragraphs.slice(1).map((para, i) => (
            <p key={i} className="art-para">{para}</p>
          ))}

          {/* CTA */}
          <div className="art-cta">
            <div>
              <div className="art-cta-text">Hear these topics live at Finance 2045 Jakarta</div>
              <div className="art-cta-sub">7–8 July 2026 · Sheraton Grand · 500+ Delegates · 40+ Speakers</div>
            </div>
            <Link href="/enquire" className="f45-btn-primary" style={{ whiteSpace: "nowrap" }}>
              Enquire Now
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Keywords */}
          <div className="art-keywords">
            <div className="art-keywords-label">Topics</div>
            <div className="art-keywords-list">
              {post.keywords.map((kw) => (
                <span key={kw} className="art-keyword">{kw}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related articles ── */}
        <div className="art-related">
          <div className="art-related-inner">
            <div className="f45-eyebrow">
              <span className="f45-eyebrow-dot" />
              Continue Reading
            </div>
            <h2>More from the <span>Finance 2045 Blog</span></h2>
            <div className="art-related-grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="art-rel-card">
                  <div className="art-rel-cat">{r.category}</div>
                  <div className="art-rel-title">{r.title}</div>
                  <div className="art-rel-meta">{r.author} · {r.readTime}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
