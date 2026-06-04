"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/f45-core-dir-1.png", alt: "Finance 2045 core directive" },
  { src: "/f45-core-dir-2.png", alt: "Finance 2045 networking" },
  { src: "/f45-core-dir-3.png", alt: "Finance 2045 panel discussion" },
  { src: "/f45-core-dir-4.png", alt: "Finance 2045 innovation showcase" },
  { src: "/f45-core-dir-5.png", alt: "Finance 2045 audience" },
];

export default function CoreDirectivesSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        .cds-wrap { position: relative; width: 100%; height: 100%; }
        .cds-slide {
          position: absolute; inset: 0;
          opacity: 0; transition: opacity 0.8s ease;
        }
        .cds-slide.active { opacity: 1; }
        .cds-dots {
          position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 7px; z-index: 3;
        }
        .cds-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.3); border: none; padding: 0; cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }
        .cds-dot.active { background: var(--gold); transform: scale(1.3); }
      `}</style>
      <div className="cds-wrap">
        {SLIDES.map((s, i) => (
          <div key={s.src} className={`cds-slide${i === current ? " active" : ""}`}>
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              quality={90}
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority={i === 0}
            />
          </div>
        ))}
        <div className="cds-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`cds-dot${i === current ? " active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
