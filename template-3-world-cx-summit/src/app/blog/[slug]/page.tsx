"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { blogPosts, BlogPost } from "@/data/blog";

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";
  const post: BlogPost | undefined = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div style={{ background: "#0A1628", minHeight: "100vh", paddingTop: 72, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ color: "#fff", fontSize: 24, fontWeight: 900 }}>Post not found</div>
        <Link href="/blog" style={{ color: "#36BCB0", fontSize: 13, textDecoration: "none", fontWeight: 700 }}>Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .blg-page {
          background: #0A1628;
          min-height: 100vh;
          padding-top: 72px;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .blg-hero {
          background: #0F1E38;
          border-bottom: 1px solid rgba(54,188,176,0.12);
          position: relative; overflow: hidden;
        }
        .blg-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 80% at 100% 50%, rgba(54,188,176,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .blg-hero-inner {
          max-width: 860px; margin: 0 auto;
          padding: 56px 40px 52px;
          position: relative; z-index: 2;
        }
        .blg-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.10em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          text-decoration: none; margin-bottom: 28px;
          transition: color 0.2s;
        }
        .blg-back:hover { color: #36BCB0; }
        .blg-cat {
          display: inline-flex; align-items: center;
          font-size: 9px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; padding: 4px 12px;
          margin-bottom: 18px;
        }
        .blg-cat-coral { color: #36BCB0; background: rgba(54,188,176,0.10); border: 1px solid rgba(54,188,176,0.25); }
        .blg-cat-gold { color: #C9A84C; background: rgba(201,168,76,0.10); border: 1px solid rgba(201,168,76,0.25); }
        .blg-title {
          font-size: clamp(24px, 4vw, 42px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.1; margin-bottom: 20px;
        }
        .blg-meta {
          display: flex; align-items: center; gap: 20px;
          font-size: 12px; color: rgba(255,255,255,0.45);
          flex-wrap: wrap;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .blg-meta-item { display: flex; align-items: center; gap: 6px; }
        .blg-cover {
          width: 100%; max-height: 480px; object-fit: cover; object-position: center;
          display: block; filter: brightness(0.85);
        }
        .blg-body {
          max-width: 860px; margin: 0 auto;
          padding: 56px 40px 100px;
        }
        .blg-content {
          font-size: 16px; line-height: 1.85;
          color: rgba(255,255,255,0.80);
          white-space: pre-wrap;
        }
        .blg-content strong { color: #fff; font-weight: 700; }
        @media (max-width: 768px) {
          .blg-hero-inner { padding: 40px 24px 36px; }
          .blg-body { padding: 40px 24px 72px; }
          .blg-title { font-size: 26px; }
        }
      `}</style>

      <div className="blg-page">
        <div className="blg-hero">
          <div className="blg-hero-inner">
            <Link href="/blog" className="blg-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              All Articles
            </Link>
            <div className={`blg-cat ${post.categoryColor === "coral" ? "blg-cat-coral" : "blg-cat-gold"}`}>
              {post.category}
            </div>
            <h1 className="blg-title">{post.title}</h1>
            <div className="blg-meta">
              <div className="blg-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <span>{post.author}{post.authorTitle ? ` · ${post.authorTitle}` : ""}</span>
              </div>
              <div className="blg-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>{post.readTime}</span>
              </div>
              <div className="blg-meta-item">
                <span>{post.publishDate}</span>
              </div>
            </div>
          </div>
          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt={post.coverAlt} className="blg-cover" />
          )}
        </div>

        <div className="blg-body">
          <div className="blg-content">{post.content}</div>
        </div>
      </div>
    </>
  );
}
