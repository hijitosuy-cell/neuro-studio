"use client";

import { Reveal, CountUp } from "@/components/reveal";
import { scanAreas } from "@/lib/site";

/**
 * Neuro Score scorecard — dark variant (sits inside dark section).
 */
export function NeuroScoreCard({ dark = false }: { dark?: boolean }) {
  const total = Math.round(scanAreas.reduce((s, a) => s + a.score, 0) / scanAreas.length);

  const surface = dark ? "surface-dark on-dark" : "surface-elev";
  const bodyText = dark ? "text-paper-dim" : "text-fg-muted";
  const rule = dark ? "rule-d" : "rule";
  const meta = dark ? { color: "rgba(242,237,226,0.55)" } : {};

  return (
    <Reveal className={`${surface} p-6 md:p-8`}>
      <div className={`flex items-center justify-between border-b ${rule} pb-4`} style={dark ? { borderColor: "var(--rule-d)" } : {}}>
        <div className="flex items-center gap-2">
          <span className="signal-dot" />
          <span className="mono-tag" style={meta}>informe/neuro-scan · dealer 001</span>
        </div>
        <span className="mono-tag" style={meta}>DIAGNÓSTICO · UY-2026</span>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr] md:gap-10">
        <div>
          <div className="mono-tag-upper text-[10.5px]" style={meta}>Neuro Score</div>
          <div
            className={`font-display mt-2 leading-none ${dark ? "text-paper" : ""}`}
            style={{ fontSize: "5rem", fontVariationSettings: '"wdth" 100, "opsz" 96' }}
          >
            <CountUp end={total} />
            <span className={dark ? "text-paper-dim text-[3rem]" : "text-fg-dim text-[3rem]"}>/100</span>
          </div>
          <p className={`mt-3 text-sm ${bodyText}`}>
            Esta automotora está usando <span className={dark ? "text-paper" : "text-fg"}>~{total}%</span> de su potencial operativo digital.
          </p>
          <div className="mt-6 space-y-2 mono-tag text-[11px]" style={meta}>
            <div className="flex items-center justify-between">
              <span>Fuga estimada / mes</span>
              <span className={dark ? "text-paper" : "text-fg"}>USD 42 000</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Áreas críticas</span>
              <span className={dark ? "text-paper" : "text-fg"}>3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Recuperable en 90 días</span>
              <span className={dark ? "text-paper" : "text-fg"}>USD 18 000</span>
            </div>
          </div>
        </div>

        <div>
          <ul className="grid gap-3">
            {scanAreas.map((a) => (
              <li key={a.code} className="grid grid-cols-[36px_1fr_44px] items-center gap-4 text-sm">
                <span className="mono-tag" style={dark ? { color: "rgba(242,237,226,0.5)" } : { color: "var(--fg-dim)" }}>{a.code}</span>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className={dark ? "text-paper" : "text-fg"}>{a.label}</span>
                  </div>
                  <div className="score-bar-track mt-1.5" style={{ "--score": `${a.score}%` } as React.CSSProperties}>
                    <div className="score-bar-fill" />
                  </div>
                </div>
                <span className={`mono-tag text-right ${dark ? "text-paper" : "text-fg"}`}>{a.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
