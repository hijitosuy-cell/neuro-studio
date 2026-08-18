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
            <div className="text-[10px]" style={{ color: "var(--paper-dim)" }}>{k.label}</div>
            <div className="mt-1 font-display text-xl font-semibold" style={{ color: k.tone }}>{k.value}</div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-3">
        <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-[10px]" style={{ color: "var(--paper-dim)" }}>Ventas · últimos 8 meses</div>
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
