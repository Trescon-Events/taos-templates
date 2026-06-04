"use client";
import { useEffect, useRef, useCallback } from "react";

export default function CursorGlow() {
  const glowRef   = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const posRef    = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number>(0);

  // Smooth follow via rAF
  const tick = useCallback(() => {
    if (glowRef.current) {
      glowRef.current.style.transform =
        `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onClick = (e: MouseEvent) => {
      const el = document.createElement("div");
      el.className = "wcx-ripple";
      el.style.left = `${e.clientX}px`;
      el.style.top  = `${e.clientY}px`;
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click",     onClick);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return (
    <>
      <style>{`
        /* Ambient cursor spotlight */
        .wcx-cursor-glow {
          position: fixed;
          top: 0; left: 0;
          width: 520px; height: 520px;
          margin-left: -260px; margin-top: -260px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(201,168,76,0.055) 0%,
            rgba(54,188,176,0.030) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 9990;
          will-change: transform;
          mix-blend-mode: screen;
        }

        /* Click ripple burst */
        .wcx-ripple {
          position: fixed;
          width: 6px; height: 6px;
          margin-left: -3px; margin-top: -3px;
          border-radius: 50%;
          border: 1.5px solid rgba(201,168,76,0.70);
          pointer-events: none;
          z-index: 9991;
          animation: wcx-ripple-out 0.55s ease-out forwards;
        }
        @keyframes wcx-ripple-out {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(18);  opacity: 0;   }
        }

        /* ── Global section card hover glows ── */

        /* Speaker cards */
        .wcx-spk-card:hover,
        .spk-card:hover {
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.18),
            0 12px 40px rgba(0,0,0,0.45),
            0 0 32px rgba(201,168,76,0.10);
        }

        /* About stat cards */
        .wcx-about-card:hover {
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.20),
            0 8px 32px rgba(0,0,0,0.40),
            0 0 28px rgba(54,188,176,0.08);
        }

        /* Topic cards */
        .wcx-topic-card:hover {
          box-shadow:
            0 0 0 1px rgba(54,188,176,0.15),
            0 8px 32px rgba(0,0,0,0.35),
            0 0 24px rgba(54,188,176,0.07);
        }

        /* Agenda session cards */
        .ag-session-card:hover {
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.18),
            0 8px 32px rgba(0,0,0,0.40),
            0 0 28px rgba(201,168,76,0.08);
        }

        /* Stat strip items */
        .wcx-stat:hover {
          background: rgba(255,255,255,0.02);
        }
        .wcx-stat:hover .wcx-stat-num {
          text-shadow: 0 0 20px rgba(201,168,76,0.45);
        }

        /* CTA buttons */
        .wcx-btn-primary:hover,
        .wcx-btn-gold:hover {
          box-shadow:
            0 8px 24px rgba(54,188,176,0.30),
            0 0 32px rgba(201,168,76,0.15);
        }

        /* Navbar register */
        .wcx-nav-register:hover {
          box-shadow: 0 0 24px rgba(54,188,176,0.30);
        }
      `}</style>

      <div ref={glowRef} className="wcx-cursor-glow" />
    </>
  );
}
