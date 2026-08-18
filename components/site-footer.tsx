import Image from "next/image";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--page-2)", borderTop: "1px solid var(--rule-d)" }}>
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            <Image src="/neuro-studio-logo.png" alt="" width={48} height={48} style={{ filter: "brightness(0) invert(1)" }} />
            <span className="font-display text-2xl font-semibold text-paper">Neuro Studio</span>
          </div>
          <p className="mt-4 text-sm" style={{ color: "var(--paper-dim)" }}>
            {site.location}
          </p>
        </div>
        <div className="md:col-span-3">
          <ul className="space-y-2.5 text-sm">
            {site.nav.map((l) => (
              <li key={l.href}>
                <a className="hover:text-white transition" style={{ color: "var(--paper-dim)" }} href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <ul className="space-y-2.5 text-sm">
            <li><a href={`mailto:${site.email}`} className="text-paper hover:text-white">{site.email}</a></li>
            <li>
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-paper hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-paper hover:text-white">
                Agendar reunión
              </a>
            </li>
            <li><a href="/privacidad" className="text-paper hover:text-white">Política de privacidad</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="wrap flex flex-col justify-between gap-2 py-5 text-xs md:flex-row" style={{ color: "rgba(255,255,255,0.45)" }}>
          <span>© {new Date().getFullYear()} Neuro Studio · {site.location}</span>
          <span><a href="/privacidad" className="hover:text-white">Privacidad</a></span>
        </div>
      </div>
    </footer>
  );
}
