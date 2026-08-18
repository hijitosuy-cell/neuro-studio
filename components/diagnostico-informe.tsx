"use client";

/* Gráfica radar (araña) inline en SVG, para el resultado en pantalla. */
export function RadarAreas({ areas }: { areas: { label: string; score: number }[] }) {
  const n = areas.length;
  if (n < 3) return null;
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const rMax = size / 2 - 46;

  const punto = (i: number, radius: number) => {
    const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + radius * Math.cos(ang), cy + radius * Math.sin(ang)];
  };

  const anillos = [0.25, 0.5, 0.75, 1];
  const dataPts = areas.map((a, i) => punto(i, (a.score / 100) * rMax));
  const dataPath = dataPts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + "Z";

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[320px]" role="img" aria-label="Gráfica de áreas">
      {anillos.map((a, i) => (
        <polygon
          key={i}
          points={areas.map((_, idx) => punto(idx, a * rMax).map((v) => v.toFixed(1)).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
      ))}
      {areas.map((_, i) => {
        const [x, y] = punto(i, rMax);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />;
      })}
      <path d={dataPath} fill="rgba(47,95,214,0.35)" stroke="#4c78ff" strokeWidth="2" />
      {dataPts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#8fb0ff" />
      ))}
      {areas.map((a, i) => {
        const [x, y] = punto(i, rMax + 22);
        return (
          <text
            key={i}
            x={x}
            y={y}
            fill="rgba(255,255,255,0.75)"
            fontSize="11"
            textAnchor={Math.abs(x - cx) < 10 ? "middle" : x > cx ? "start" : "end"}
            dominantBaseline="middle"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

/* Donut: puntaje general al centro, aros por área alrededor */
export function DonutAreas({ total, areas }: { total: number; areas: { label: string; score: number }[] }) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const anillos = areas.slice(0, 6);
  const color = (s: number) => (s >= 60 ? "#7cff9e" : s >= 35 ? "#ffbf47" : "#ff6b6b");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[220px]" role="img" aria-label="Puntaje general">
      {anillos.map((a, i) => {
        const radius = 88 - i * 13;
        const c = 2 * Math.PI * radius;
        return (
          <g key={a.label}>
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
            <circle
              cx={cx} cy={cy} r={radius} fill="none" stroke={color(a.score)} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${(a.score / 100) * c} ${c}`} transform={`rotate(-90 ${cx} ${cy})`}
            />
          </g>
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="40" fontWeight="700" fill="#fff">{total}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.55)">/ 100</text>
    </svg>
  );
}

/* ─── Informe descargable como PNG (canvas) ─── */

type InformeData = {
  empresa: string;
  contacto: string;
  ciudad: string;
  total: number;
  lectura: string;
  areas: { nombre: string; score: number }[];
  dolor: string;
  servicios: string[];
};

const NAVY = "#0b1c3f";
const NAVY2 = "#14306a";
const BLUE = "#2f5fd6";
const BLUEHI = "#8fb0ff";
const PAPER = "#ffffff";
const DIM = "#c9d2e4";

export async function generarInformePNG(d: InformeData) {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Fondo
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, W, H);

  const P = 80;

  // Header
  ctx.fillStyle = BLUEHI;
  ctx.font = "600 22px system-ui, sans-serif";
  ctx.fillText("NEURO STUDIO · DIAGNÓSTICO", P, 90);

  ctx.fillStyle = PAPER;
  ctx.font = "700 52px system-ui, sans-serif";
  wrap(ctx, d.empresa, P, 155, W - P * 2, 56);

  ctx.fillStyle = DIM;
  ctx.font = "400 24px system-ui, sans-serif";
  const sub = [d.contacto, d.ciudad].filter(Boolean).join(" · ");
  if (sub) ctx.fillText(sub, P, 205);

  // Puntaje grande
  const scoreY = 340;
  ctx.fillStyle = PAPER;
  ctx.font = "700 150px system-ui, sans-serif";
  ctx.fillText(String(d.total), P, scoreY);
  const scoreW = ctx.measureText(String(d.total)).width;
  ctx.fillStyle = DIM;
  ctx.font = "700 56px system-ui, sans-serif";
  ctx.fillText("/100", P + scoreW + 14, scoreY);

  ctx.fillStyle = BLUEHI;
  ctx.font = "600 34px system-ui, sans-serif";
  ctx.fillText(d.lectura, P, scoreY + 56);

  // Barras por área
  let y = 500;
  ctx.font = "500 26px system-ui, sans-serif";
  const barW = W - P * 2;
  for (const a of d.areas) {
    ctx.fillStyle = PAPER;
    ctx.fillText(a.nombre, P, y);
    ctx.fillStyle = DIM;
    ctx.textAlign = "right";
    ctx.fillText(String(a.score), W - P, y);
    ctx.textAlign = "left";

    // track
    const trackY = y + 14;
    roundRect(ctx, P, trackY, barW, 12, 6);
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fill();
    // fill
    roundRect(ctx, P, trackY, Math.max(12, (barW * a.score) / 100), 12, 6);
    ctx.fillStyle = BLUE;
    ctx.fill();

    y += 62;
  }

  // Dolor principal
  if (d.dolor) {
    y += 20;
    ctx.fillStyle = BLUEHI;
    ctx.font = "600 20px system-ui, sans-serif";
    ctx.fillText("PRINCIPAL PROBLEMA", P, y);
    y += 44;
    ctx.fillStyle = PAPER;
    ctx.font = "italic 400 30px Georgia, serif";
    y = wrap(ctx, `“${d.dolor}”`, P, y, W - P * 2, 40);
  }

  // Servicios elegidos
  if (d.servicios.length) {
    y += 44;
    ctx.fillStyle = BLUEHI;
    ctx.font = "600 20px system-ui, sans-serif";
    ctx.fillText("RECOMENDADO PARA VOS", P, y);
    y += 44;
    ctx.font = "500 27px system-ui, sans-serif";
    for (const s of d.servicios) {
      ctx.fillStyle = BLUE;
      ctx.beginPath();
      ctx.arc(P + 6, y - 9, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = PAPER;
      ctx.fillText(s, P + 26, y);
      y += 44;
    }
  }

  // Footer
  ctx.fillStyle = NAVY2;
  ctx.fillRect(0, H - 90, W, 90);
  ctx.fillStyle = PAPER;
  ctx.font = "500 24px system-ui, sans-serif";
  ctx.fillText("Neuro Studio · Salto, Uruguay", P, H - 40);
  ctx.fillStyle = BLUEHI;
  ctx.textAlign = "right";
  ctx.fillText("wa.me/59898169358", W - P, H - 40);
  ctx.textAlign = "left";

  // Descarga
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `diagnostico-${slug(d.empresa)}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number) {
  const words = text.split(" ");
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y);
      line = w;
      y += lh;
    } else {
      line = test;
    }
  }
  if (line) {
    ctx.fillText(line, x, y);
    y += lh;
  }
  return y;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function slug(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "neuro-studio";
}
