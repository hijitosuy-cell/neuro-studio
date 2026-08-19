"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

const HITOS = [25, 50, 75, 100] as const;
const SECCIONES = ["ver-diagnostico", "metodo", "producto", "agendar", "preguntas", "contacto"];

/**
 * Mide el recorrido dentro de la página: hasta qué profundidad baja la gente
 * y qué secciones llega a ver. Sin esto solo sabríamos cuántos entran.
 */
export function ScrollTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Profundidad de scroll, una sola vez por hito
    const alcanzados = new Set<number>();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const alto = document.documentElement.scrollHeight - window.innerHeight;
        if (alto <= 0) return;
        const pct = Math.round((window.scrollY / alto) * 100);
        for (const h of HITOS) {
          if (pct >= h && !alcanzados.has(h)) {
            alcanzados.add(h);
            track("scroll_profundidad", { profundidad: h });
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Secciones efectivamente vistas
    const vistas = new Set<string>();
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const id = e.target.id;
          if (e.isIntersecting && !vistas.has(id)) {
            vistas.add(id);
            track("seccion_vista", { seccion: id });
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.35 }
    );
    for (const id of SECCIONES) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return null;
}
