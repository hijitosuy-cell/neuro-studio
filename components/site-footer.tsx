"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { useLang } from "@/components/lang-provider";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const { t } = useLang();
  const nav = [
    { href: "#diagnostico", label: t.nav.diagnostico },
    { href: "#servicios", label: t.nav.servicios },
    { href: "#metodo", label: t.nav.metodo },
    { href: "#preguntas", label: t.nav.preguntas },
  ];
  return (
    <footer style={{ background: "var(--page-2)", borderTop: "1px solid var(--rule-d)" }}>
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            <Image src="/neuro-studio-logo.png" alt="" width={48} height={48} style={{ filter: "brightness(0) invert(1)" }} />
            <span className="font-display text-2xl font-semibold text-paper">Neuro Studio</span>
          </div>
          <p className="mt-4 text-sm" style={{ color: "var(--paper-dim)" }}>{site.location}</p>
          <div className="mt-5">
            <SocialLinks />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{t.footer.nav}</div>
          <ul className="space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a className="hover:text-white transition" style={{ color: "var(--paper-dim)" }} href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <ul className="space-y-2.5 text-sm">
            <li><a href={`mailto:${site.email}`} className="text-paper hover:text-white">{site.email}</a></li>
            <li><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-paper hover:text-white">WhatsApp</a></li>
            <li><a href="/privacidad" className="text-paper hover:text-white">{t.footer.priv}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="wrap flex flex-col justify-between gap-2 py-5 text-xs md:flex-row" style={{ color: "rgba(255,255,255,0.45)" }}>
          <span>© {new Date().getFullYear()} Neuro Studio · {site.location}</span>
          <a href="/privacidad" className="hover:text-white">{t.footer.priv}</a>
        </div>
      </div>
    </footer>
  );
}
