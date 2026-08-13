import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-bg-elev/40 py-12 mt-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span aria-hidden className="grid h-7 w-7 place-items-center rounded-md bg-brand text-white text-xs font-bold">
              N
            </span>
            <span className="font-display text-lg">Neuro Studio</span>
          </div>
          <p className="mt-3 text-sm text-fg-muted max-w-xs">
            IA aplicada al negocio automotriz. SaaS, chatbots y webs que venden.
          </p>
        </div>
        <div className="text-sm">
          <h2 className="text-fg-dim uppercase tracking-widest text-xs">Navegar</h2>
          <ul className="mt-3 space-y-2">
            {site.nav.map((l) => (
              <li key={l.href}>
                <a className="text-fg-muted hover:text-fg" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <h2 className="text-fg-dim uppercase tracking-widest text-xs">Contacto</h2>
          <ul className="mt-3 space-y-2 text-fg-muted">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-fg">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg"
              >
                Agendar reunión
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-6 text-xs text-fg-dim">
        © {new Date().getFullYear()} Neuro Studio. Todos los derechos reservados.
      </div>
    </footer>
  );
}
