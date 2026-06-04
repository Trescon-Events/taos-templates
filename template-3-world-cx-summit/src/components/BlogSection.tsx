"use client";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

const looped = [...blogPosts, ...blogPosts, ...blogPosts];

export default function BlogSection() {
  return (
    <>
      <style>{`
        .bl-section {
          background: var(--bg-surface);
          padding: 64px 0 72px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .bl-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .bl-head-left { display: flex; flex-direction: column; gap: 0; }
        .bl-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--coral);
          margin-bottom: 6px;
        }
        .bl-overline::before {
          content: ''; width: 24px; height: 1.5px;
          background: var(--coral); flex-shrink: 0;
        }
        .bl-h2 {
          font-size: clamp(22px, 2.5vw, 34px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.1; margin: 0;
        }
        .bl-h2 em { font-style: normal; color: var(--coral); }

        /* Carousel */
        .bl-carousel {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          padding: 8px 0 12px;
        }

        @keyframes bl-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }

        .bl-track {
          display: flex;
          gap: 18px;
          width: max-content;
          animation: bl-scroll 60s linear infinite;
        }
        .bl-carousel:hover .bl-track {
          animation-play-state: paused;
        }

        /* Card */
        .bl-card {
          width: 320px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          background: var(--bg-primary);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          position: relative;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          cursor: pointer;
        }
        .bl-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--coral), var(--gold), transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease; z-index: 3;
        }
        .bl-card:hover {
          border-color: rgba(54,188,176,0.28);
          box-shadow:
            0 0 24px rgba(54,188,176,0.14),
            0 8px 28px rgba(0,0,0,0.35);
          transform: translateY(-3px);
        }
        .bl-card:hover::before { transform: scaleX(1); }

        /* Image */
        .bl-img-wrap {
          position: relative;
          height: 170px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .bl-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
          transition: transform 0.55s ease;
          filter: brightness(0.78);
        }
        .bl-card:hover .bl-img { transform: scale(1.06); filter: brightness(0.88); }
        .bl-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 35%, rgba(10,22,40,0.80) 100%);
        }
        .bl-cat {
          position: absolute; bottom: 12px; left: 12px; z-index: 2;
          font-size: 9px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; padding: 4px 10px;
        }
        .bl-cat-coral {
          color: var(--coral); background: rgba(10,22,40,0.80);
          border: 1px solid rgba(54,188,176,0.30);
          backdrop-filter: blur(6px);
        }
        .bl-cat-gold {
          color: var(--gold); background: rgba(10,22,40,0.80);
          border: 1px solid rgba(201,168,76,0.30);
          backdrop-filter: blur(6px);
        }

        /* Body */
        .bl-body {
          padding: 18px 18px 16px;
          display: flex; flex-direction: column; gap: 8px; flex: 1;
        }
        .bl-title {
          font-size: 13.5px; font-weight: 800;
          color: #fff; letter-spacing: -0.01em; line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.25s;
        }
        .bl-card:hover .bl-title { color: var(--coral); }
        .bl-meta {
          font-size: 10.5px; color: var(--text-muted);
          display: flex; align-items: center; gap: 8px;
          margin-top: auto; padding-top: 10px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .bl-meta-dot {
          width: 2px; height: 2px; border-radius: 50%;
          background: rgba(255,255,255,0.25); flex-shrink: 0;
        }
        .bl-arrow {
          margin-left: auto;
          color: rgba(54,188,176,0.45);
          transition: color 0.25s, transform 0.25s;
          display: flex;
        }
        .bl-card:hover .bl-arrow { color: var(--coral); transform: translateX(3px); }

        @media (max-width: 1024px) {
          .bl-section { padding: 56px 0 64px; }
          .bl-inner { padding: 0 32px; margin-bottom: 32px; }
          .bl-card { width: 290px; }
        }
        @media (max-width: 768px) {
          .bl-section { padding: 48px 0 56px; }
          .bl-inner { padding: 0 20px; margin-bottom: 24px; }
          .bl-card { width: 260px; }
        }
        @media (max-width: 480px) {
          .bl-section { padding: 40px 0 48px; }
          .bl-card { width: 240px; }
        }
      `}</style>

      <section className="bl-section">
        <div className="bl-inner">
          <div className="bl-head-left">
            <div className="bl-overline">Insights &amp; Ideas</div>
            <h2 className="bl-h2">CX <em>Intelligence</em></h2>
          </div>
          <Link href="/blog" className="wcx-btn-outline">
            View All Articles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="bl-carousel">
          <div className="bl-track">
            {looped.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="bl-card">
                <div className="bl-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.coverImage} alt={post.coverAlt} className="bl-img" />
                  <div className="bl-img-overlay" />
                  <div className={`bl-cat ${post.categoryColor === "coral" ? "bl-cat-coral" : "bl-cat-gold"}`}>
                    {post.category}
                  </div>
                </div>
                <div className="bl-body">
                  <div className="bl-title">{post.title}</div>
                  <div className="bl-meta">
                    <span>{post.readTime}</span>
                    <div className="bl-meta-dot" />
                    <span>{post.publishDate}</span>
                    <span className="bl-arrow">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}
