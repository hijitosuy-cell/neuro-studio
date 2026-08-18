"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/**
 * Tarjeta con brillo que sigue al cursor (spotlight tipo Scalefy) + entrada al scroll.
 */
export function Spotlight({
  children,
  className = "",
  style,
  tone = "dark",
  as: Tag = "div",
  reveal = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tone?: "dark" | "light";
  as?: "div" | "article" | "li";
  reveal?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(!reveal);

  useEffect(() => {
    if (!reveal) return;
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reveal]);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const Component = Tag as React.ElementType;
  const glow =
    tone === "dark"
      ? "radial-gradient(240px circle at var(--mx) var(--my), rgba(143,176,255,0.16), rgba(120,160,255,0.05) 45%, transparent 65%)"
      : "radial-gradient(260px circle at var(--mx) var(--my), rgba(47,95,214,0.1), rgba(47,95,214,0.03) 45%, transparent 65%)";

  return (
    <Component
      ref={ref as never}
      onMouseMove={onMove}
      className={`spotlight ${reveal ? "reveal reveal-scale" : ""} ${inView ? "is-in" : ""} ${className}`}
      style={{ ...style, ["--spot" as string]: glow }}
    >
      {children}
    </Component>
  );
}
