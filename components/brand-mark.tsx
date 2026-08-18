export function BrandMark({ size = 28, title = "Neuro Studio" }: { size?: number; title?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width={size} height={size} role="img" aria-label={title} fill="none">
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="currentColor" strokeWidth="1.25" />
      <path d="M11 29 V11 L29 29 V11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
      <circle cx="29" cy="11" r="2.5" fill="var(--color-brand)" />
    </svg>
  );
}

/**
 * Hero centerpiece: central Neuro logo mark with orbiting product-icon nodes.
 * Clarasight-style visual cluster — the mark sits at the center of a diamond of module icons.
 */
export function HeroCluster() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" className="w-full h-auto" role="img" aria-label="Diagrama del Método Neuro Studio">
        <defs>
          <radialGradient id="cen-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(43,92,255,0.35)" />
            <stop offset="70%" stopColor="rgba(43,92,255,0.05)" />
            <stop offset="100%" stopColor="rgba(43,92,255,0)" />
          </radialGradient>
        </defs>

        {/* Connectors — dashed thin */}
        <g stroke="rgba(11,15,26,0.14)" strokeWidth="1" strokeDasharray="3 4" fill="none">
          <line x1="360" y1="160" x2="140" y2="80" />
          <line x1="360" y1="160" x2="580" y2="80" />
          <line x1="360" y1="160" x2="140" y2="240" />
          <line x1="360" y1="160" x2="580" y2="240" />
          <line x1="360" y1="160" x2="360" y2="40" />
          <line x1="360" y1="160" x2="360" y2="280" />
        </g>

        {/* Central mark glow */}
        <circle cx="360" cy="160" r="110" fill="url(#cen-glow)" />
        {/* Central mark */}
        <g transform="translate(320, 120)">
          <rect x="1" y="1" width="80" height="80" rx="16" fill="#ffffff" stroke="rgba(11,15,26,0.12)" strokeWidth="1" />
          <path d="M23 61 V21 L57 61 V21" stroke="#0b0f1a" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
          <circle cx="57" cy="21" r="4.5" fill="var(--color-brand)" />
        </g>

        {/* Orbit nodes */}
        {[
          { x: 140, y: 80, label: "SCAN" },
          { x: 580, y: 80, label: "BUILD" },
          { x: 140, y: 240, label: "BLUEPRINT" },
          { x: 580, y: 240, label: "SCALE" },
          { x: 360, y: 40, label: "LAUNCH" },
          { x: 360, y: 280, label: "SCORE" },
        ].map((n) => (
          <g key={n.label} transform={`translate(${n.x - 44}, ${n.y - 20})`}>
            <rect x="0" y="0" width="88" height="40" rx="20" fill="#ffffff" stroke="rgba(11,15,26,0.12)" strokeWidth="1" />
            <text x="44" y="24.5" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.5" fill="#0b0f1a">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * Realistic stock panel — light theme.
 */
export function StockPanelMock() {
  const rows = [
    { code: "TY-COR-24-091", model: "Toyota Corolla XEI", year: "2024", km: "0", status: "Disponible", tone: "signal" },
    { code: "CH-ONX-23-042", model: "Chevrolet Onix Premier", year: "2023", km: "18 400", status: "Reservado", tone: "warn" },
    { code: "VW-TCR-24-015", model: "VW T-Cross Highline", year: "2024", km: "0", status: "Disponible", tone: "signal" },
    { code: "PG-208-22-207", model: "Peugeot 208 Feline", year: "2022", km: "31 220", status: "Test-drive", tone: "brand" },
    { code: "RN-DUS-24-063", model: "Renault Duster Iconic", year: "2024", km: "0", status: "Disponible", tone: "signal" },
  ];
  return (
    <div className="surface-elev overflow-hidden text-[13px]">
      <div className="flex items-center justify-between border-b rule px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="signal-dot" />
          <span className="mono-tag">panel/stock · 47 vehículos</span>
        </div>
        <span className="mono-tag">actualizado 14:22:07 UYT</span>
      </div>
      <div className="grid grid-cols-[110px_1fr_60px_80px_110px] gap-4 border-b rule px-4 py-2 mono-tag-upper text-[10.5px]">
        <span>CÓDIGO</span><span>MODELO</span><span>AÑO</span><span>KM</span><span>ESTADO</span>
      </div>
      {rows.map((r) => (
        <div key={r.code} className="grid grid-cols-[110px_1fr_60px_80px_110px] gap-4 border-b rule px-4 py-2.5 items-center last:border-b-0">
          <span className="font-mono text-fg-muted">{r.code}</span>
          <span className="text-fg">{r.model}</span>
          <span className="font-mono text-fg-muted">{r.year}</span>
          <span className="font-mono text-fg-muted">{r.km}</span>
          <span className="flex items-center gap-2 text-fg">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background:
                  r.tone === "signal" ? "var(--color-signal)" :
                  r.tone === "warn" ? "var(--color-warn)" : "var(--color-brand)",
              }}
            />
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export function WhatsappMock() {
  return (
    <div className="surface-elev overflow-hidden">
      <div className="flex items-center justify-between border-b rule px-4 py-2.5 text-[13px]">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white text-xs font-semibold">N</span>
          <div>
            <div className="text-fg leading-tight">Ventas · Auto Sur</div>
            <div className="mono-tag text-[10.5px]">en línea · asistente IA</div>
          </div>
        </div>
        <span className="mono-tag">+598 99 · WA-API</span>
      </div>
      <div className="flex flex-col gap-2 px-4 py-4" style={{ background: "#0b141a", minHeight: "260px" }}>
        <div className="wa-bubble wa-bubble--in">
          Hola, vi el Corolla XEI 2024 en el sitio. ¿Sigue disponible?
          <div className="wa-meta">14:19</div>
        </div>
        <div className="wa-bubble wa-bubble--out">
          Buenas Marcos. Sí, el Corolla XEI 2024 está disponible. Color blanco perla, 0 km, precio USD 32.900.
          <div className="wa-meta">14:19 · ✓✓</div>
        </div>
        <div className="wa-bubble wa-bubble--out">
          ¿Querés que te agende un test-drive? Tengo jueves 15h o viernes 11h con Diego.
          <div className="wa-meta">14:19 · ✓✓</div>
        </div>
        <div className="wa-bubble wa-bubble--in">
          Viernes 11 me viene bien.
          <div className="wa-meta">14:22</div>
        </div>
        <div className="wa-bubble wa-bubble--out">
          Listo. Viernes 17, 11:00 en Auto Sur — Salto. Te confirma Diego y recibís recordatorio 1 h antes.
          <div className="wa-meta">14:22 · ✓✓</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t rule px-4 py-2 mono-tag">
        <span>agenda sincronizada · Google Calendar</span>
        <span>handoff → Diego</span>
      </div>
    </div>
  );
}

export function LeadsMock() {
  const bars = [8, 12, 9, 14, 11, 16, 13, 18, 15, 22, 19, 24, 21, 27];
  return (
    <div className="surface-elev p-5">
      <div className="flex items-center justify-between text-[13px]">
        <span className="mono-tag-upper">Leads · últimos 14 días</span>
        <span className="mono-tag" style={{ color: "var(--color-signal)" }}>▲ +38% vs mes previo</span>
      </div>
      <div className="mt-6 flex items-baseline gap-4">
        <div className="font-display leading-none" style={{ fontSize: "3.75rem", fontVariationSettings: '"wdth" 100, "opsz" 72' }}>
          287
        </div>
        <div className="mono-tag text-fg-muted">leads calificados</div>
      </div>
      <div className="mt-6 flex h-24 items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${Math.min(100, h * 3.5)}%`,
              background: i === bars.length - 1 ? "var(--color-brand-hi)" : "var(--color-brand)",
              opacity: 0.35 + i / bars.length / 1.6,
            }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 border-t rule pt-4 text-[13px]">
        <div>
          <div className="mono-tag-upper text-[10px]">RESPUESTA</div>
          <div className="mt-1 text-fg font-mono">12 s</div>
        </div>
        <div>
          <div className="mono-tag-upper text-[10px]">TEST-DRIVES</div>
          <div className="mt-1 text-fg font-mono">42 / sem</div>
        </div>
        <div>
          <div className="mono-tag-upper text-[10px]">CIERRE</div>
          <div className="mt-1 text-fg font-mono">18 %</div>
        </div>
      </div>
    </div>
  );
}

/** No longer used — VehicleBlueprint kept for future decoration if needed. */
export function VehicleBlueprint() {
  return null;
}

export function BrandLockup() {
  return null;
}
