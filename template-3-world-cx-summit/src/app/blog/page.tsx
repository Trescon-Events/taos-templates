import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <style>{`
        .blp-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 72px;
        }

        /* Hero */
        .blp-hero {
          background: var(--bg-surface);
          padding: 72px 40px 64px;
          border-bottom: 1px solid rgba(54,188,176,0.12);
          position: relative; overflow: hidden;
        }
        .blp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 80% at 100% 50%, rgba(54,188,176,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .blp-hero-inner {
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 2;
        }
        .blp-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--coral); margin-bottom: 14px;
        }
        .blp-overline::before {
          content: ''; width: 24px; height: 1.5px;
          background: var(--coral); flex-shrink: 0;
        }
        .blp-h1 {
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.12; margin: 0 0 14px;
        }
        .blp-h1 span { color: var(--coral); }
        .blp-sub {
          font-size: 15px; color: var(--text-body);
          max-width: 540px; line-height: 1.7;
        }

        /* Body */
        .blp-body {
          max-width: 1200px; margin: 0 auto;
          padding: 64px 40px 100px;
        }

        /* Same card styles as BlogSection — reuse classes */
        .bl-section { padding: 0; background: transparent; border: none; }
        .bl-section::before { display: none; }
        .bl-inner { max-width: none; }
        .bl-header { margin-bottom: 40px; }

        /* Full 7-article grid */
        .blp-full-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* Cat pills */
        .bl-cat-pill {
          display: inline-flex; align-items: center;
          font-size: 9px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; padding: 4px 12px; width: fit-content;
        }
        .bl-cat-coral {
          color: var(--coral); background: rgba(54,188,176,0.10);
          border: 1px solid rgba(54,188,176,0.25);
        }
        .bl-cat-gold {
          color: var(--gold); background: rgba(201,168,76,0.10);
          border: 1px solid rgba(201,168,76,0.25);
        }

        /* Featured */
        .bl-featured {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          background: var(--bg-surface);
          border: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          margin-bottom: 28px;
          transition: border-color 0.3s, box-shadow 0.3s;
          position: relative;
          text-decoration: none;
        }
        .bl-featured::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--coral), var(--gold), transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s ease; z-index: 3;
        }
        .bl-featured:hover {
          border-color: rgba(54,188,176,0.30);
          box-shadow: 0 0 28px rgba(54,188,176,0.18), 0 0 56px rgba(54,188,176,0.08), 0 12px 40px rgba(0,0,0,0.40);
        }
        .bl-featured:hover::before { transform: scaleX(1); }
        .bl-feat-img-wrap { position: relative; overflow: hidden; min-height: 340px; }
        .bl-img-fallback {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #1a1035 0%, #2a1f1a 50%, #1f1518 100%);
          display: flex; align-items: center; justify-content: center;
        }
        .bl-img-fallback-text {
          font-size: 10px; font-weight: 700; letter-spacing: 0.20em;
          text-transform: uppercase; color: rgba(54,188,176,0.30);
        }
        .bl-feat-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, transparent 60%, rgba(15,30,56,0.80) 100%);
        }
        .bl-feat-badge {
          position: absolute; top: 18px; left: 18px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #fff;
          background: var(--coral); padding: 5px 12px; z-index: 2;
        }
        .bl-feat-body {
          padding: 44px 40px;
          display: flex; flex-direction: column;
          justify-content: center; gap: 18px;
        }
        .bl-feat-title {
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 900; letter-spacing: -0.02em;
          color: #fff; line-height: 1.25; transition: color 0.25s;
        }
        .bl-featured:hover .bl-feat-title { color: var(--coral); }
        .bl-feat-excerpt {
          font-size: 13.5px; color: var(--text-body); line-height: 1.8;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .bl-feat-meta {
          display: flex; align-items: center; gap: 16px;
          font-size: 11px; color: var(--text-muted);
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.07);
          flex-wrap: wrap;
        }
        .bl-feat-meta span { display: flex; align-items: center; gap: 5px; }
        .bl-read-link {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--coral);
          text-decoration: none; transition: gap 0.25s; margin-top: 4px;
        }
        .bl-featured:hover .bl-read-link { gap: 11px; }

        /* Grid cards */
        .bl-card {
          display: flex; flex-direction: column;
          background: var(--bg-surface);
          border: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          position: relative; text-decoration: none;
        }
        .bl-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--coral), var(--gold), transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease; z-index: 3;
        }
        .bl-card:hover {
          border-color: rgba(54,188,176,0.28);
          box-shadow: 0 0 28px rgba(54,188,176,0.15), 0 0 56px rgba(54,188,176,0.06), 0 8px 32px rgba(0,0,0,0.35);
          transform: translateY(-4px);
        }
        .bl-card:hover::before { transform: scaleX(1); }
        .bl-card-img-wrap { position: relative; height: 200px; overflow: hidden; }
        .bl-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(15,30,56,0.75) 100%);
        }
        .bl-card-cat { position: absolute; bottom: 14px; left: 14px; z-index: 2; }
        .bl-card-body {
          padding: 22px 22px 20px;
          display: flex; flex-direction: column; flex: 1; gap: 12px;
        }
        .bl-card-title {
          font-size: 15px; font-weight: 800; color: #fff;
          letter-spacing: -0.01em; line-height: 1.35;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
          transition: color 0.25s;
        }
        .bl-card:hover .bl-card-title { color: var(--coral); }
        .bl-card-excerpt {
          font-size: 12.5px; color: var(--text-body); line-height: 1.75; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .bl-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
          font-size: 11px; color: var(--text-muted);
        }
        .bl-card-arrow {
          color: rgba(54,188,176,0.50);
          transition: color 0.25s, transform 0.25s; display: flex;
        }
        .bl-card:hover .bl-card-arrow { color: var(--coral); transform: translateX(4px); }

        .blp-section-head {
          display: flex; align-items: center; gap: 16px; margin-bottom: 28px;
        }
        .blp-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--text-muted); white-space: nowrap;
        }
        .blp-section-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--border), transparent);
        }

        @media (max-width: 1024px) {
          .bl-featured { grid-template-columns: 1fr; }
          .bl-feat-img-wrap { min-height: 240px; }
          .blp-full-grid { grid-template-columns: repeat(2, 1fr); }
          .blp-body { padding: 40px 24px 72px; }
          .blp-hero { padding: 56px 24px 48px; }
        }
        @media (max-width: 640px) {
          .blp-full-grid { grid-template-columns: 1fr; }
          .bl-feat-body { padding: 28px 24px; }
        }
      `}</style>

      <div className="blp-page">
        <div className="blp-hero">
          <div className="blp-hero-inner">
            <div className="blp-overline">Insights &amp; Ideas</div>
            <h1 className="blp-h1">CX <span>Intelligence</span></h1>
            <p className="blp-sub">
              Expert perspectives, strategic insights, and actionable ideas for India&apos;s senior customer experience leaders.
            </p>
          </div>
        </div>

        <div className="blp-body">

          {featured && (
            <>
              {/* Featured */}
              <div className="blp-section-head">
                <div className="blp-section-label">Featured Article</div>
                <div className="blp-section-line" />
              </div>

              <Link href={`/blog/${featured.slug}`} className="bl-featured" style={{ display: "grid" }}>
                <div className="bl-feat-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.coverImage} alt={featured.coverAlt} className="bl-feat-img" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block", transition:"transform 0.6s ease", filter:"brightness(0.80)" }} />
                  <div className="bl-feat-img-overlay" />
                  <div className="bl-feat-badge">Featured</div>
                </div>
                <div className="bl-feat-body">
                  <div className={`bl-cat-pill ${featured.categoryColor === "coral" ? "bl-cat-coral" : "bl-cat-gold"}`}>
                    {featured.category}
                  </div>
                  <div className="bl-feat-title">{featured.title}</div>
                  <div className="bl-feat-excerpt">{featured.excerpt}</div>
                  <div className="bl-feat-meta">
                    <span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      {featured.readTime}
                    </span>
                    <span>{featured.publishDate}</span>
                  </div>
                  <div className="bl-read-link">
                    Read Article
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </Link>
            </>
          )}

          {rest.length > 0 && (
            <>
              <div className="blp-section-head" style={{ marginTop: 44 }}>
                <div className="blp-section-label">All Articles — {rest.length} Insights</div>
                <div className="blp-section-line" />
              </div>

              <div className="blp-full-grid">
                {rest.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="bl-card">
                    <div className="bl-card-img-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.coverImage} alt={post.coverAlt} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block", transition:"transform 0.5s ease", filter:"brightness(0.80)" }} />
                      <div className="bl-card-img-overlay" />
                      <div className="bl-card-cat">
                        <span className={`bl-cat-pill ${post.categoryColor === "coral" ? "bl-cat-coral" : "bl-cat-gold"}`}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="bl-card-body">
                      <div className="bl-card-title">{post.title}</div>
                      <div className="bl-card-excerpt">{post.excerpt}</div>
                      <div className="bl-card-footer">
                        <span>{post.readTime} · {post.publishDate}</span>
                        <span className="bl-card-arrow">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
