/** Panel "Neuro Twin" — dashboard rico que representa el sistema completo. Datos de ejemplo. */
export function NeuroPanelMock() {
  const areas = [
    { label: "Ventas", val: 72, color: "#8fb0ff" },
    { label: "Marketing", val: 58, color: "#8fb0ff" },
    { label: "Seguimiento", val: 43, color: "#ffbf47" },
    { label: "Conversión", val: 88, color: "#7cff9e" },
    { label: "Postventa", val: 64, color: "#8fb0ff" },
    { label: "Stock", val: 51, color: "#ffbf47" },
  ];
  const recs = [
    { n: 1, t: "Contactar 13 oportunidades calientes sin seguimiento", tone: "#ff6b6b" },
    { n: 2, t: "Responder 4 conversaciones sin leer", tone: "#ffbf47" },
    { n: 3, t: "Revisar 25 leads sin contacto hace +2 días", tone: "#8fb0ff" },
  ];
  return (
    <div className="overflow-hidden rounded-xl text-left" style={{ background: "#0b1122", border: "1px solid rgba(143,176,255,0.18)" }}>
      <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "rgba(143,176,255,0.14)" }}>
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg text-[11px] font-semibold text-white" style={{ background: "linear-gradient(135deg,#2f5fd6,#7c4dff)" }}>◉</span>
          <div>
            <div className="text-[13px] font-semibold text-paper">Neuro Twin</div>
            <div className="text-[11px]" style={{ color: "var(--paper-dim)" }}>El gemelo digital de tu automotora</div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {["Modo CEO", "Embudo", "Salud"].map((t, i) => (
            <span key={t} className="rounded-md px-2 py-1 text-[11px]" style={{ background: i === 0 ? "rgba(47,95,214,0.25)" : "rgba(255,255,255,0.04)", color: i === 0 ? "#8fb0ff" : "var(--paper-dim)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Insight banner */}
      <div className="m-3 rounded-lg p-3.5" style={{ background: "linear-gradient(120deg, rgba(47,95,214,0.14), rgba(124,77,255,0.1))", border: "1px solid rgba(143,176,255,0.16)" }}>
        <div className="text-[13px] font-semibold text-paper">Buenas tardes, Gerencia.</div>
        <p className="mt-1.5 text-[11.5px] leading-relaxed" style={{ color: "var(--paper-dim)" }}>
          Hoy entraron <b className="text-paper">3</b> oportunidades nuevas. Tenés <b className="text-paper">35</b> leads activos, <b className="text-paper">17</b> calientes.
        </p>
        <p className="mt-1 text-[11.5px]" style={{ color: "#ff9b9b" }}>
          13 calientes llevan +24 h sin seguimiento. Hay ~US$ 42.000 en riesgo.
        </p>
      </div>

      {/* Salud del negocio */}
      <div className="mx-3 rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[11px]" style={{ color: "var(--paper-dim)" }}>Salud del negocio</span>
          <span className="font-display text-lg font-semibold" style={{ color: "#ffbf47" }}>63<span className="text-[11px]" style={{ color: "var(--paper-dim)" }}>/100</span></span>
        </div>
        <div className="mt-3 grid grid-cols-6 gap-2">
          {areas.map((a) => (
            <div key={a.label} className="flex flex-col items-center gap-1.5">
              <svg viewBox="0 0 36 36" className="h-9 w-9">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke={a.color} strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${(a.val / 100) * 94} 94`} transform="rotate(-90 18 18)" />
                <text x="18" y="21" textAnchor="middle" fontSize="9" fill="#fff">{a.val}</text>
              </svg>
              <span className="text-[11px]" style={{ color: "var(--paper-dim)" }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="p-3">
        <div className="mb-2 text-[11px]" style={{ color: "var(--paper-dim)" }}>Neuro recomienda hoy</div>
        <ul className="grid gap-1.5">
          {recs.map((r) => (
            <li key={r.n} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11.5px]" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white" style={{ background: r.tone }}>{r.n}</span>
              <span className="text-paper">{r.t}</span>
              <span className="ml-auto" style={{ color: "var(--paper-dim)" }}>›</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Mockup de panel SaaS (datos de ejemplo, no reales). Tema oscuro. */
export function SaasMock() {
  const kpis = [
    { label: "Leads activos", value: "38", tone: "#8fb0ff" },
    { label: "Ventas del mes", value: "12", tone: "#7cff9e" },
    { label: "Ganancia", value: "US$ 41k", tone: "#8fb0ff" },
    { label: "Sin contacto", value: "5", tone: "#ffbf47" },
  ];
  const bars = [40, 62, 48, 75, 58, 84, 70, 92];
  return (
    <div className="overflow-hidden rounded-xl" style={{ background: "#0b1122", border: "1px solid rgba(143,176,255,0.18)" }}>
      <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: "rgba(143,176,255,0.14)" }}>
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md text-[11px] font-semibold text-white" style={{ background: "var(--brand-accent)" }}>N</span>
          <span className="text-[13px] text-paper">Panel · Automotora Demo</span>
        </div>
        <span className="text-[11px]" style={{ color: "var(--paper-dim)" }}>Todas las sucursales</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-3 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-[11px]" style={{ color: "var(--paper-dim)" }}>{k.label}</div>
            <div className="mt-1 font-display text-xl font-semibold" style={{ color: k.tone }}>{k.value}</div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-3">
        <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-[11px]" style={{ color: "var(--paper-dim)" }}>Ventas · últimos 8 meses</div>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {bars.map((h, i) => (
              <span key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === bars.length - 1 ? "#8fb0ff" : "var(--brand-accent)", opacity: 0.4 + i / bars.length / 1.6 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sitio web con catálogo: buscador + fichas de unidades. Datos de ejemplo. */
export function CatalogoMock() {
  const autos = [
    { m: "Corolla XEI 2024", km: "0 km", p: "US$ 32.900", tag: "Nuevo" },
    { m: "Hilux SRV 4x4 2022", km: "48.000 km", p: "US$ 41.500", tag: "Usado" },
    { m: "Onix LT 2023", km: "19.500 km", p: "US$ 18.900", tag: "Usado" },
  ];
  return (
    <div className="overflow-hidden rounded-xl" style={{ background: "#0b1122", border: "1px solid rgba(143,176,255,0.18)" }}>
      <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "rgba(143,176,255,0.14)" }}>
        <span className="flex gap-1.5">
          {["#ff6b6b", "#ffbf47", "#7cff9e"].map((c) => (<span key={c} className="h-2 w-2 rounded-full" style={{ background: c, opacity: 0.7 }} />))}
        </span>
        <span className="ml-2 flex-1 truncate rounded-md px-2 py-1 text-[10.5px]" style={{ background: "rgba(255,255,255,0.05)", color: "var(--paper-dim)" }}>autosur.com.uy/catalogo</span>
      </div>
      <div className="flex gap-1.5 px-3 pt-3">
        <span className="flex-1 rounded-md px-2.5 py-1.5 text-[11px]" style={{ background: "rgba(255,255,255,0.04)", color: "var(--paper-dim)" }}>Buscar marca, modelo…</span>
        {["Marca", "Precio"].map((f) => (
          <span key={f} className="rounded-md px-2.5 py-1.5 text-[11px]" style={{ background: "rgba(47,95,214,0.18)", color: "#8fb0ff" }}>{f}</span>
        ))}
      </div>
      <div className="grid gap-2 p-3">
        {autos.map((a) => (
          <div key={a.m} className="flex items-center gap-2.5 rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="grid h-10 w-14 shrink-0 place-items-center rounded-md text-[9px]" style={{ background: "linear-gradient(135deg, rgba(47,95,214,0.35), rgba(143,176,255,0.12))", color: "var(--paper-dim)" }}>foto</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-medium text-paper">{a.m}</div>
              <div className="text-[10.5px]" style={{ color: "var(--paper-dim)" }}>{a.km}</div>
            </div>
            <div className="text-right">
              <div className="text-[12px] font-semibold" style={{ color: "#8fb0ff" }}>{a.p}</div>
              <span className="text-[9.5px]" style={{ color: "var(--paper-dim)" }}>{a.tag}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t px-3 py-2 text-[10.5px]" style={{ borderColor: "rgba(143,176,255,0.14)", color: "var(--paper-dim)" }}>
        Cada consulta del formulario entra directo al sistema
      </div>
    </div>
  );
}

/** Publicidad con seguimiento: qué anuncio trajo qué venta. Datos de ejemplo. */
export function AdsMock() {
  const filas = [
    { c: "Hilux 4x4 · Meta", cli: "412", lead: "28", v: "3", top: true },
    { c: "0 km · Google", cli: "306", lead: "19", v: "2", top: false },
    { c: "Usados · Meta", cli: "255", lead: "11", v: "1", top: false },
  ];
  return (
    <div className="overflow-hidden rounded-xl" style={{ background: "#0b1122", border: "1px solid rgba(143,176,255,0.18)" }}>
      <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: "rgba(143,176,255,0.14)" }}>
        <span className="text-[13px] text-paper">Campañas · septiembre</span>
        <span className="rounded-md px-2 py-1 text-[10.5px]" style={{ background: "rgba(124,255,158,0.14)", color: "#7cff9e" }}>ROI 4,2x</span>
      </div>
      <div className="grid gap-2 px-3 pt-3 text-[10px] uppercase" style={{ gridTemplateColumns: "1.9fr .7fr .7fr .8fr", color: "var(--paper-dim)", letterSpacing: "0.08em" }}>
        <span>Campaña</span><span className="text-right">Clics</span><span className="text-right">Leads</span><span className="text-right">Ventas</span>
      </div>
      <div className="grid gap-1.5 p-3 pt-2">
        {filas.map((f) => (
          <div key={f.c} className="grid items-center gap-2 rounded-lg px-2.5 py-2 text-[11.5px]"
            style={{ gridTemplateColumns: "1.9fr .7fr .7fr .8fr", background: f.top ? "rgba(47,95,214,0.16)" : "rgba(255,255,255,0.03)", border: `1px solid ${f.top ? "rgba(143,176,255,0.28)" : "rgba(255,255,255,0.06)"}` }}>
            <span className="truncate text-paper">{f.c}</span>
            <span className="text-right" style={{ color: "var(--paper-dim)" }}>{f.cli}</span>
            <span className="text-right" style={{ color: "var(--paper-dim)" }}>{f.lead}</span>
            <span className="text-right font-semibold" style={{ color: f.top ? "#7cff9e" : "#8fb0ff" }}>{f.v}</span>
          </div>
        ))}
      </div>
      <div className="border-t px-3 py-2 text-[10.5px]" style={{ borderColor: "rgba(143,176,255,0.14)", color: "var(--paper-dim)" }}>
        Sabés qué anuncio pagó el auto que vendiste
      </div>
    </div>
  );
}

/** Contenido armado desde el stock a mover. Datos de ejemplo. */
export function ContenidoMock() {
  const posts = [
    { t: "Reel · Hilux 4x4", e: "Publicado", c: "#7cff9e" },
    { t: "Foto · Corolla 0 km", e: "Programado jue 10h", c: "#8fb0ff" },
    { t: "Carrusel · Usados", e: "En edición", c: "#ffbf47" },
  ];
  return (
    <div className="overflow-hidden rounded-xl" style={{ background: "#0b1122", border: "1px solid rgba(143,176,255,0.18)" }}>
      <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: "rgba(143,176,255,0.14)" }}>
        <span className="text-[13px] text-paper">Contenido de la semana</span>
        <span className="text-[10.5px]" style={{ color: "var(--paper-dim)" }}>desde tu stock</span>
      </div>
      <div className="m-3 rounded-lg p-2.5 text-[11px]" style={{ background: "rgba(47,95,214,0.12)", border: "1px solid rgba(143,176,255,0.16)", color: "var(--paper-dim)" }}>
        <b className="text-paper">3 Hilux</b> llevan +60 días en el predio. El contenido de esta semana apunta ahí.
      </div>
      <div className="grid gap-2 px-3 pb-3">
        {posts.map((p) => (
          <div key={p.t} className="flex items-center gap-2.5 rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-[9px]" style={{ background: "linear-gradient(135deg, rgba(47,95,214,0.35), rgba(143,176,255,0.12))", color: "var(--paper-dim)" }}>▶</span>
            <span className="min-w-0 flex-1 truncate text-[12px] text-paper">{p.t}</span>
            <span className="shrink-0 rounded-md px-2 py-1 text-[10px]" style={{ background: `${p.c}1f`, color: p.c }}>{p.e}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhatsappMock() {
  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center justify-between border-b rule px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full text-white text-xs font-semibold" style={{ background: "var(--brand)" }}>N</span>
          <div>
            <div className="text-sm leading-tight" style={{ color: "var(--fg)" }}>Ventas · Auto Sur</div>
            <div className="text-xs" style={{ color: "var(--fg-muted)" }}>en línea</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4 py-4" style={{ background: "#0b141a", minHeight: "300px" }}>
        <div className="wa-bubble wa-bubble--in">
          Hola, vi el Corolla 2024. ¿Sigue disponible?
          <div className="wa-meta">14:19</div>
        </div>
        <div className="wa-bubble wa-bubble--out">
          Buenas Marcos. Sí, está disponible. Blanco perla, 0 km, USD 32.900.
          <div className="wa-meta">14:19 ✓✓</div>
        </div>
        <div className="wa-bubble wa-bubble--out">
          ¿Te agendo un test-drive? Tengo jueves 15h o viernes 11h.
          <div className="wa-meta">14:19 ✓✓</div>
        </div>
        <div className="wa-bubble wa-bubble--in">
          Viernes 11 me sirve.
          <div className="wa-meta">14:22</div>
        </div>
        <div className="wa-bubble wa-bubble--out">
          Listo. Viernes 17, 11:00 en Auto Sur. Te confirma Diego y te llega recordatorio.
          <div className="wa-meta">14:22 ✓✓</div>
        </div>
      </div>
      <div className="border-t rule px-4 py-2.5 text-xs" style={{ color: "var(--fg-muted)" }}>
        Agendado automáticamente · Google Calendar
      </div>
    </div>
  );
}
