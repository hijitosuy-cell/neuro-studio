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
