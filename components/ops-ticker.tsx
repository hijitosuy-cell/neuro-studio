"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function OpsTicker() {
  const [t, setT] = useState<string>("");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} · ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} UYT`;
    };
    setT(fmt());
    const id = window.setInterval(() => setT(fmt()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="border-b rule text-[11px]"
      style={{ background: "var(--bg-3)", color: "var(--fg-muted)", fontFamily: "var(--font-mono), monospace" }}
    >
      <div className="wrap flex h-8 items-center justify-between gap-6 overflow-hidden">
        <div className="flex items-center gap-3 shrink-0">
          <span className="signal-dot" />
          <span>NEURO-STUDIO / OPS 01</span>
          <span className="hidden sm:inline text-fg-dim">·</span>
          <span className="hidden sm:inline">Aceptando 2 clientes · 2026</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-fg-dim overflow-hidden">
          <span>SALTO / URUGUAY</span>
          <span>·</span>
          <span>{site.coords}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span>{t || "—"}</span>
        </div>
      </div>
    </div>
  );
}

export function CategoryMarquee() {
  const items = [
    "Sedán", "Hatchback", "SUV", "Pickup", "Utilitario",
    "0 km", "Usados", "Rent-a-car", "Comerciales", "Postventa",
    "WhatsApp Business", "Google Calendar", "CRM sync", "Meta Ads", "SEO local",
  ];
  const track = [...items, ...items];
  return (
    <div
      aria-hidden
      className="border-y rule overflow-hidden py-4"
      style={{ background: "var(--bg-3)" }}
    >
      <div className="marquee-track mono-tag-upper text-[11px]" style={{ color: "var(--fg-muted)" }}>
        {track.map((it, i) => (
          <span key={i} className="flex items-center gap-6">
            {it}
            <span aria-hidden style={{ color: "var(--fg-dim)" }}>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
