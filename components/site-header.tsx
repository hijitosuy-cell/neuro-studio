import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Neuro Studio inicio">
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white text-sm font-bold">
            N
          </span>
          <span className="font-display text-xl">Neuro Studio</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-fg-muted md:flex">
          {site.nav.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex h-10 items-center rounded-full px-4 text-sm font-medium"
        >
          Agendar reunión
        </a>
      </div>
    </header>
  );
}
