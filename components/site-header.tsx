import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ background: "rgba(6,10,22,0.75)", backdropFilter: "blur(12px)", borderColor: "var(--rule-d)" }}
    >
      <div className="wrap flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Neuro Studio, inicio">
          <Image src="/neuro-studio-logo.png" alt="" width={44} height={44} priority style={{ filter: "brightness(0) invert(1)" }} />
          <span className="font-display text-xl font-semibold hidden sm:inline text-paper">Neuro Studio</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: "var(--paper-dim)" }}>
          {site.nav.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</a>
          ))}
        </nav>
        <a
          href="#diagnostico"
          className="btn btn-shiny"
          style={{ minHeight: "42px", padding: "0.55rem 1.2rem", fontSize: "0.88rem", borderRadius: "999px" }}
        >
          Diagnóstico gratis
        </a>
      </div>
    </header>
  );
}
