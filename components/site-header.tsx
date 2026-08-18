import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b rule" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)" }}>
      <div className="wrap flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Neuro Studio, inicio">
          <Image src="/neuro-studio-logo.png" alt="" width={44} height={44} priority />
          <span className="font-display text-xl font-semibold hidden sm:inline" style={{ color: "var(--brand)" }}>
            Neuro Studio
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-fg-muted md:flex">
          {site.nav.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-fg transition">{l.label}</a>
          ))}
        </nav>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-brand"
          style={{ minHeight: "40px", padding: "0.55rem 1.1rem", fontSize: "0.85rem" }}
        >
          Neuro Scan →
        </a>
      </div>
    </header>
  );
}
