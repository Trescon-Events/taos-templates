"use client";
import { useEffect } from "react";

export default function GlowCards() {
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const cards = document.querySelectorAll<HTMLElement>(".gc");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--gx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--gy", `${e.clientY - rect.top}px`);
      });
    }
    function onTouch(e: TouchEvent) {
      const t = e.touches[0];
      const cards = document.querySelectorAll<HTMLElement>(".gc");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--gx", `${t.clientX - rect.left}px`);
        card.style.setProperty("--gy", `${t.clientY - rect.top}px`);
      });
    }
    function onTap(e: MouseEvent) {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".gc");
      if (!card) return;
      // Use replaceWith clone to restart animation without forced reflow
      card.classList.remove("gc-tap");
      requestAnimationFrame(() => card.classList.add("gc-tap"));
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("click", onTap);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onTouch);
      document.removeEventListener("click", onTap);
    };
  }, []);
  return null;
}
