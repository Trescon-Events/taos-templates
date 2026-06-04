"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const happenings = [
  {
    title: "Top-Tier Content",
    desc: "Thought leadership sessions from CFOs, regulators, and central bank governors navigating Indonesia's financial transformation.",
    img: "/hap-top-tier.jpg",
    tag: "Sessions",
  },
  {
    title: "Elite Keynotes",
    desc: "High-impact keynotes from Indonesia's top financial minds and global industry visionaries setting the agenda for 2045.",
    img: "/hap-elite-keynote.jpg",
    tag: "Keynotes",
  },
  {
    title: "A Frontier for Technologies",
    desc: "Exhibition floor featuring the latest in RegTech, WealthTech, PayTech, and AI-powered financial infrastructure.",
    img: "/hap-frontier.jpg",
    tag: "Exhibition",
  },
  {
    title: "Precision Matchmaking",
    desc: "Bypass the noise with curated meetings designed strictly for immediate capital deployment between investors and founders.",
    img: "/hap-matchmaking.jpg",
    tag: "Meetings",
  },
  {
    title: "Networking Like No Other",
    desc: "Build high-value relationships with the exact executives shaping the financial landscape — in curated roundtables and evening events.",
    img: "/hap-networking.jpg",
    tag: "Networking",
  },
  {
    title: "Global Amplification",
    desc: "Pan-regional and global media coverage ensuring your brand story reaches decision-makers across Asia, the Middle East, and beyond.",
    img: "/hap-global.jpg",
    tag: "Media",
  },
];

const SCROLL_PX = 380;

export default function HappeningsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [visible, setVisible] = useState(false);
  const [activeDot, setActiveDot] = useState(0);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const isPaused = useRef(false);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateNav = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setActiveDot(Math.round(progress * (happenings.length - 1)));
  };

  const scrollToNext = () => {
    const el = trackRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 8;
    if (atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: SCROLL_PX, behavior: "smooth" });
    }
  };

  const scroll = (dir: "prev" | "next") => {
    trackRef.current?.scrollBy({
      left: dir === "next" ? SCROLL_PX : -SCROLL_PX,
      behavior: "smooth",
    });
  };

  const startAuto = () => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      if (!isPaused.current) scrollToNext();
    }, 3200);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    dragScrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.4;
  };
  const onDragEnd = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateNav, { passive: true });
    updateNav();

    // Entry animation
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          startAuto();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => {
      el.removeEventListener("scroll", updateNav);
      obs.disconnect();
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .hap-root {
          background: var(--bg-primary);
          padding: 96px 0 88px;
          position: relative;
        }
        .hap-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,165,163,0.35), transparent);
        }
        .hap-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Carousel wrapper ── */
        .hap-carousel-wrap {
          position: relative;
        }

        /* Right fade-out edge */
        .hap-carousel-wrap::after {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 96px;
          background: linear-gradient(to right, transparent, var(--bg-primary));
          pointer-events: none;
          z-index: 4;
          transition: opacity 0.3s;
        }
        .hap-carousel-wrap.hap-at-end::after { opacity: 0; }

        /* Left fade-out edge */
        .hap-carousel-wrap::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 96px;
          background: linear-gradient(to left, transparent, var(--bg-primary));
          pointer-events: none;
          z-index: 4;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .hap-carousel-wrap.hap-scrolled::before { opacity: 1; }

        /* ── Track ── */
        .hap-track {
          display: flex;
          gap: 16px;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          cursor: grab;
          user-select: none;
          /* entry animation */
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .hap-track.hap-visible { opacity: 1; transform: translateY(0); }
        .hap-track::-webkit-scrollbar { display: none; }
        .hap-track:active { cursor: grabbing; }

        /* ── Card ── */
        .hap-card {
          flex-shrink: 0;
          width: calc((100% - 2 * 16px) / 3.2);
          scroll-snap-align: start;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 3/4;
          border: 1px solid rgba(255,255,255,0.07);
          transition:
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }
        .hap-card:hover {
          border-color: rgba(0,165,163,0.55);
          box-shadow:
            0 0 28px rgba(0,165,163,0.38),
            0 0 56px rgba(0,165,163,0.15),
            0 10px 36px rgba(0,0,0,0.55);
        }

        /* Photo */
        .hap-photo {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          pointer-events: none;
        }
        .hap-card:hover .hap-photo { transform: scale(1.08); }

        /* Teal top bar */
        .hap-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, #00a5a3, rgba(0,165,163,0.2));
          z-index: 3;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .hap-card:hover::before { opacity: 1; }

        /* Gradient overlay */
        .hap-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,14,22,0.97) 0%,
            rgba(10,14,22,0.80) 35%,
            rgba(10,14,22,0.30) 65%,
            rgba(10,14,22,0.05) 100%
          );
          transition: background 0.4s ease;
          z-index: 1;
        }
        .hap-card:hover .hap-overlay {
          background: linear-gradient(
            to top,
            rgba(10,14,22,0.98) 0%,
            rgba(10,14,22,0.88) 45%,
            rgba(10,14,22,0.45) 75%,
            rgba(10,14,22,0.10) 100%
          );
        }

        /* Text block */
        .hap-body {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 28px 24px;
          z-index: 2;
        }

        /* Tag */
        .hap-tag {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #00a5a3;
          border: 1px solid rgba(0,165,163,0.3);
          background: rgba(0,165,163,0.08);
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;
        }
        .hap-card:hover .hap-tag { opacity: 1; transform: translateY(0); }

        .hap-title {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: #fff;
          margin-bottom: 0;
          transition: margin-bottom 0.35s ease;
        }
        .hap-card:hover .hap-title {
          margin-bottom: 12px;
          background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hap-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.65);
          line-height: 1.72;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(10px);
          transition:
            max-height 0.4s ease,
            opacity 0.35s ease,
            transform 0.35s ease;
        }
        .hap-card:hover .hap-desc {
          max-height: 120px;
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Navigation arrows ── */
        .hap-nav-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          margin-bottom: 24px;
        }
        .hap-nav-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(0,165,163,0.35);
          background: rgba(0,165,163,0.06);
          color: rgba(255,255,255,0.6);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s, opacity 0.25s;
          flex-shrink: 0;
        }
        .hap-nav-btn:hover:not(:disabled) {
          border-color: rgba(0,165,163,0.8);
          background: rgba(0,165,163,0.14);
          color: #00a5a3;
          box-shadow: 0 0 14px rgba(0,165,163,0.3);
        }
        .hap-nav-btn:disabled {
          opacity: 0.25;
          cursor: default;
        }

        /* ── Progress dots ── */
        .hap-dots {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
        }
        .hap-dot {
          height: 2px;
          border-radius: 2px;
          background: rgba(255,255,255,0.15);
          flex: 1;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .hap-dot.hap-dot-active {
          background: rgba(0,165,163,0.25);
        }
        /* Animated fill on active dot */
        .hap-dot.hap-dot-active::after {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          background: #00a5a3;
          border-radius: 2px;
          animation: hap-dot-fill 3.2s linear forwards;
        }
        @keyframes hap-dot-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        @media (max-width: 960px) {
          .hap-inner { padding: 0 20px; }
          .hap-card { width: calc((100% - 16px) / 2.15); }
        }
        @media (max-width: 560px) {
          .hap-root { padding: 64px 0 56px; }
          .hap-card {
            width: calc(100% - 40px);
            aspect-ratio: 4/3;
          }
          /* Always show on mobile */
          .hap-tag { opacity: 1; transform: translateY(0); }
          .hap-card .hap-desc { max-height: 120px; opacity: 1; transform: translateY(0); }
          .hap-card .hap-title {
            margin-bottom: 10px;
            background: linear-gradient(135deg, #ffffff 0%, #00a5a3 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .hap-carousel-wrap::after,
          .hap-carousel-wrap::before { width: 48px; }
        }
      `}</style>

      <section className="hap-root">
        <div className="hap-inner">

          <div className="f45-section-head">
            <div className="f45-eyebrow">
              <span className="f45-eyebrow-dot" />
              Happenings
            </div>
            <h2>The Architecture of <span>Opportunity</span></h2>
            <p>Every format, every interaction — engineered for capital deployment and high-impact deal flow.</p>
          </div>

          {/* Nav row above carousel */}
          <div className="hap-nav-row">
            <div className="hap-dots">
              {happenings.map((_, i) => (
                <div
                  key={i}
                  className={`hap-dot${i === activeDot ? " hap-dot-active" : ""}`}
                />
              ))}
            </div>
            <button
              className="hap-nav-btn"
              onClick={() => scroll("prev")}
              disabled={!canPrev}
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              className="hap-nav-btn"
              onClick={() => scroll("next")}
              disabled={!canNext}
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

          <div
            className={`hap-carousel-wrap${canPrev ? " hap-scrolled" : ""}${!canNext ? " hap-at-end" : ""}`}
            onMouseEnter={() => { isPaused.current = true; }}
            onMouseLeave={() => { isPaused.current = false; }}
          >
            <div
              className={`hap-track${visible ? " hap-visible" : ""}`}
              ref={trackRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
            >
              {happenings.map((h) => (
                <div key={h.title} className="hap-card">
                  <Image
                    src={h.img}
                    alt={h.title}
                    fill
                    sizes="(max-width: 560px) 90vw, (max-width: 960px) 48vw, 32vw"
                    quality={90}
                    className="hap-photo"
                    draggable={false}
                  />
                  <div className="hap-overlay" />
                  <div className="hap-body">
                    <div className="hap-tag">{h.tag}</div>
                    <div className="hap-title">{h.title}</div>
                    <div className="hap-desc">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
