"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo del hero con parallax al scroll.
 * Si existe /hero.mp4 lo usa como video; si no, cae al grid + glow (sin romperse).
 */
export function HeroVideo() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const y = window.scrollY;
        el.style.transform = `translateY(${y * 0.35}px) scale(1.1)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ background: "var(--page)" }}>
      <div ref={ref} className="absolute inset-0 will-change-transform" style={{ background: "var(--page)" }}>
        {/* Video con poster (primer frame) para que no haya parpadeo antes de cargar */}
        <video
          className="h-full w-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          onError={(e) => ((e.currentTarget.style.display = "none"))}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Velo azulado: se funde a fondo sólido abajo para que no se note el corte con la sección siguiente */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,10,22,0.55) 0%, rgba(6,10,22,0.8) 55%, rgba(6,10,22,0.97) 88%, var(--page) 100%)",
        }}
      />
    </div>
  );
}
