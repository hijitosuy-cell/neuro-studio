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
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div ref={ref} className="absolute inset-0 will-change-transform">
        {/* Video opcional: si no existe, queda el grid+glow de abajo */}
        <video
          className="h-full w-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster="/neuro-studio-logo.png"
          onError={(e) => ((e.currentTarget.style.display = "none"))}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Velo azulado para que resalten los textos */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,10,22,0.7), rgba(6,10,22,0.92))" }} />
    </div>
  );
}
