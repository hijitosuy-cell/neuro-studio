import Image from "next/image";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t rule" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Image src="/neuro-studio-logo.png" alt="" width={56} height={56} style={{ filter: "brightness(0) invert(1)" }} />
            <span className="font-display text-2xl font-semibold text-paper">Neuro Studio</span>
          </div>
          <p className="mt-4 text-sm text-body max-w-xs" style={{ color: "var(--paper-dim)" }}>
            Estudio uruguayo. Método propio para transformar automotoras en sistemas comerciales medibles.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="mono-label" style={{ color: "rgba(255,255,255,0.5)" }}>Navegar</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.nav.map((l) => (
              <li key={l.href}>
                <a className="text-paper-dim hover:text-paper" href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="mono-label" style={{ color: "rgba(255,255,255,0.5)" }}>Contacto</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={`mailto:${site.email}`} className="text-paper hover:text-white">{site.email}</a></li>
            <li>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-paper hover:text-white">
                Agendar Neuro Scan ↗
              </a>
            </li>
            <li className="mono-label pt-2" style={{ color: "rgba(255,255,255,0.5)" }}>{site.location} · {site.coords}</li>
          </ul>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="wrap flex flex-col justify-between gap-2 py-6 text-xs md:flex-row" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span>© {new Date().getFullYear()} Neuro Studio</span>
          <span className="font-mono">v1 · 2026</span>
        </div>
      </div>
    </footer>
  );
}
