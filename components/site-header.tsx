"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang, LangToggle } from "@/components/lang-provider";
import { track } from "@/lib/track";

export function SiteHeader() {
  const { t } = useLang();
  const nav = [
    { href: "#diagnostico", label: t.nav.diagnostico },
    { href: "#servicios", label: t.nav.servicios },
    { href: "#metodo", label: t.nav.metodo },
    { href: "#preguntas", label: t.nav.preguntas },
  ];
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ background: "rgba(6,10,22,0.96)", backdropFilter: "blur(12px)", borderColor: "var(--rule-d)" }}
    >
      <div className="wrap flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Neuro Studio">
          <Image src="/neuro-studio-logo.png" alt="" width={44} height={44} priority className="logo-hover" style={{ filter: "brightness(0) invert(1)" }} />
          <span className="font-display text-xl font-semibold hidden sm:inline text-paper transition-colors group-hover:text-white">Neuro Studio</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: "var(--paper-dim)" }}>
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle onDark />
          <a
            href="#agendar"
            onClick={() => track("agendar_click", { lugar: "header" })}
            className="btn btn-shiny text-[0.78rem] md:text-[0.88rem]"
            style={{ minHeight: "34px", height: "34px", padding: "0 0.85rem", borderRadius: "999px" }}
          >
            <span className="sm:hidden">{t.ctaHeaderShort}</span>
            <span className="hidden sm:inline">{t.ctaHeader}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
