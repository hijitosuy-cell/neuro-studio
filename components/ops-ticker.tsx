export function CategoryMarquee() {
  const items = [
    "Concesionarias oficiales", "Multimarca", "Rent-a-car", "Talleres",
    "Grupos automotrices", "Usados", "0 km", "Postventa",
  ];
  const track = [...items, ...items];
  return (
    <div aria-hidden className="border-y rule overflow-hidden py-5" style={{ background: "var(--bg-2)" }}>
      <div className="marquee-track label">
        {track.map((it, i) => (
          <span key={i} className="flex items-center gap-6">
            {it}
            <span aria-hidden style={{ opacity: 0.4 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
