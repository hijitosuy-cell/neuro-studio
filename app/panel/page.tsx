"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, orderBy, limit, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, auth } from "@/lib/firebase";

type Diag = {
  id: string;
  negocio?: string;
  contacto?: string;
  telefono?: string;
  pais?: string;
  ciudad?: string;
  tipo?: string;
  puntajeGeneral?: number;
  calificacion?: number;
  visto?: boolean;
  creadoEnMs?: number;
  dolorPrincipal?: string;
  presupuesto?: string;
  inversionInicial?: string;
  inversionMensual?: string;
  serviciosInteres?: string[];
  areas?: { nombre: string; puntaje: number }[];
  respuestas?: { area: string; pregunta: string; respuesta: string }[];
  presupuestoInterno?: {
    diagnostico?: string;
    implTotal?: [number, number];
    mensualTotal?: [number, number];
    items?: { servicio: string; impl: [number, number]; mensual: [number, number] }[];
    notas?: string[];
  };
};

// Gate simple del lado del cliente. La seguridad REAL la dan las reglas de
// Firestore (deben exigir auth para leer). La clave sale de una variable de
// entorno para no quedar fija en el código.
export default function Panel() {
  const [user, setUser] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ? u.email : null);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  async function entrar() {
    setErr("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (e: unknown) {
      const code = (e as { code?: string })?.code || "";
      const msg =
        code === "auth/operation-not-allowed"
          ? "El proveedor Email/Contraseña no está activado en Firebase. Activalo en Authentication → Sign-in method."
          : code === "auth/invalid-email"
          ? "El email no tiene un formato válido."
          : code === "auth/user-not-found"
          ? "No existe un usuario con ese email. Crealo en Firebase → Authentication → Users."
          : code === "auth/wrong-password" || code === "auth/invalid-credential"
          ? "Email o contraseña incorrectos."
          : code === "auth/too-many-requests"
          ? "Demasiados intentos. Esperá unos minutos y probá de nuevo."
          : `Error: ${code || "no se pudo iniciar sesión"}`;
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return <main style={{ background: "var(--page)", minHeight: "80vh" }} />;
  }

  if (!user) {
    return (
      <main style={{ background: "var(--page)", minHeight: "80vh" }}>
        <div className="wrap flex min-h-[70vh] items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl p-8" style={{ background: "var(--bg)" }}>
            <h1 className="font-display text-2xl font-semibold" style={{ color: "var(--brand)" }}>Panel interno</h1>
            <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>Acceso solo para el equipo de Neuro Studio.</p>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErr(""); }}
              placeholder="Email"
              className="mt-6 h-12 w-full rounded-lg border px-4"
              style={{ borderColor: "var(--rule-strong)", background: "#fff", color: "var(--fg)" }}
            />
            <input
              type="password"
              autoComplete="current-password"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setErr(""); }}
              onKeyDown={(e) => e.key === "Enter" && entrar()}
              placeholder="Contraseña"
              className="mt-3 h-12 w-full rounded-lg border px-4"
              style={{ borderColor: "var(--rule-strong)", background: "#fff", color: "var(--fg)" }}
            />
            {err && <p className="mt-2 text-sm" style={{ color: "#dc2626" }}>{err}</p>}
            <button onClick={entrar} disabled={loading} className="btn btn-brand mt-4 w-full">
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return <PanelContent email={user} onSalir={() => signOut(auth)} />;
}

function PanelContent({ email, onSalir }: { email: string; onSalir: () => void }) {
  const [items, setItems] = useState<Diag[]>([]);
  const [loading, setLoading] = useState(true);
  const [sel, setSel] = useState<Diag | null>(null);
  const [filtro, setFiltro] = useState("");
  const [servFiltro, setServFiltro] = useState("");

  async function cargar() {
    setLoading(true);
    try {
      const q = query(collection(db, "diagnosticos_web"), orderBy("creadoEnMs", "desc"), limit(200));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Diag, "id">) })));
    } catch {
      /* si falla, lista vacía */
    }
    setLoading(false);
  }
  useEffect(() => { cargar(); }, []);

  async function marcarVisto(d: Diag) {
    try {
      await updateDoc(doc(db, "diagnosticos_web", d.id), { visto: true });
      setItems((xs) => xs.map((x) => (x.id === d.id ? { ...x, visto: true } : x)));
    } catch { /* noop */ }
  }

  const servicios = useMemo(() => {
    const s = new Set<string>();
    items.forEach((i) => (i.serviciosInteres ?? []).forEach((x) => s.add(x)));
    return [...s];
  }, [items]);

  const filtrados = useMemo(() => {
    return items.filter((i) => {
      const txt = `${i.negocio} ${i.contacto} ${i.ciudad} ${i.pais}`.toLowerCase();
      const okTxt = !filtro || txt.includes(filtro.toLowerCase());
      const okServ = !servFiltro || (i.serviciosInteres ?? []).includes(servFiltro);
      return okTxt && okServ;
    });
  }, [items, filtro, servFiltro]);

  return (
    <main style={{ background: "var(--page)", minHeight: "100vh", color: "var(--paper)" }}>
      <div className="wrap py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-paper">Diagnósticos</h1>
            <p className="text-sm" style={{ color: "var(--paper-dim)" }}>{filtrados.length} de {items.length} · sin ver: {items.filter((i) => !i.visto).length}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs sm:inline" style={{ color: "var(--paper-dim)" }}>{email}</span>
            <button onClick={cargar} className="btn btn-on-dark" style={{ height: 40 }}>Actualizar</button>
            <button onClick={onSalir} className="btn btn-on-dark" style={{ height: 40 }}>Salir</button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <input value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Buscar negocio, ciudad…" className="h-11 rounded-lg border px-4 text-sm" style={{ borderColor: "var(--rule-d)", background: "var(--bg-2)", color: "var(--fg)", minWidth: 240 }} />
          <select value={servFiltro} onChange={(e) => setServFiltro(e.target.value)} className="h-11 rounded-lg border px-3 text-sm" style={{ borderColor: "var(--rule-d)", background: "var(--bg-2)", color: "var(--fg)" }}>
            <option value="">Todos los servicios</option>
            {servicios.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {loading ? (
          <p className="mt-10" style={{ color: "var(--paper-dim)" }}>Cargando…</p>
        ) : filtrados.length === 0 ? (
          <p className="mt-10" style={{ color: "var(--paper-dim)" }}>No hay diagnósticos guardados todavía.</p>
        ) : (
          <div className="mt-8 grid gap-3">
            {filtrados.map((d) => (
              <button key={d.id} onClick={() => { setSel(d); if (!d.visto) marcarVisto(d); }} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl p-4 text-left transition" style={{ background: d.visto ? "rgba(255,255,255,0.03)" : "rgba(47,95,214,0.12)", border: "1px solid var(--rule-d)" }}>
                <div>
                  <div className="flex items-center gap-2">
                    {!d.visto && <span className="signal-dot" style={{ background: "#8fb0ff" }} />}
                    <span className="font-semibold text-paper">{d.negocio || "—"}</span>
                    <span className="text-xs" style={{ color: "var(--paper-dim)" }}>{d.contacto} · {[d.ciudad, d.pais].filter(Boolean).join(", ")}</span>
                  </div>
                  <div className="mt-1 text-xs" style={{ color: "var(--paper-dim)" }}>
                    {d.tipo} · {d.creadoEnMs ? new Date(d.creadoEnMs).toLocaleString("es-UY") : ""} {d.telefono ? `· ${d.telefono}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div><div className="font-display text-xl font-semibold text-paper">{d.puntajeGeneral ?? "—"}</div><div className="text-[10px]" style={{ color: "var(--paper-dim)" }}>puntaje</div></div>
                  <div><div className="font-display text-xl font-semibold" style={{ color: (d.calificacion ?? 0) >= 60 ? "#7cff9e" : (d.calificacion ?? 0) >= 40 ? "#ffbf47" : "#ff6b6b" }}>{d.calificacion ?? "—"}</div><div className="text-[10px]" style={{ color: "var(--paper-dim)" }}>lead</div></div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {sel && <Detalle d={sel} onClose={() => setSel(null)} />}
    </main>
  );
}

function Detalle({ d, onClose }: { d: Diag; onClose: () => void }) {
  const wa = d.telefono
    ? `https://wa.me/${d.telefono.replace(/[^\d]/g, "")}`
    : null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:p-8" style={{ background: "rgba(6,10,22,0.85)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="my-auto w-full max-w-3xl rounded-2xl p-6 md:p-8" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold" style={{ color: "var(--brand)" }}>{d.negocio}</h2>
            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{d.contacto} · {[d.ciudad, d.pais].filter(Boolean).join(", ")} · {d.telefono}</p>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--bg-2)", color: "var(--fg-muted)" }}>✕</button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Badge label="Puntaje" value={`${d.puntajeGeneral ?? "—"}/100`} />
          <Badge label="Lead" value={`${d.calificacion ?? "—"}/100`} />
          <Badge label="Presupuesto" value={d.presupuesto || "—"} />
          <Badge label="Inicial" value={d.inversionInicial || "—"} />
          <Badge label="Mensual" value={d.inversionMensual || "—"} />
        </div>

        {d.dolorPrincipal && (
          <div className="mt-5 rounded-xl p-4" style={{ background: "var(--bg-2)" }}>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-accent)" }}>Dolor principal</div>
            <p className="mt-1">{d.dolorPrincipal}</p>
          </div>
        )}

        {/* Barras de áreas */}
        {d.areas && d.areas.length > 0 && (
          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-accent)" }}>Puntaje por área</div>
            <ul className="mt-3 grid gap-2">
              {d.areas.map((a) => (
                <li key={a.nombre} className="text-sm">
                  <div className="flex items-baseline justify-between"><span>{a.nombre}</span><span style={{ color: "var(--fg-muted)" }}>{a.puntaje}</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full" style={{ background: "rgba(11,28,63,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width: `${a.puntaje}%`, background: a.puntaje >= 60 ? "#10b981" : a.puntaje >= 35 ? "#f59e0b" : "#dc2626" }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Presupuesto interno */}
        {d.presupuestoInterno && (
          <div className="mt-6 rounded-xl p-4" style={{ background: "var(--bg-2)" }}>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-accent)" }}>Presupuesto interno (no lo ve el cliente)</div>
            <div className="mt-2 text-sm">
              <div>Implementación: <b>US$ {d.presupuestoInterno.implTotal?.join(" – ")}</b> · Mensual: <b>US$ {d.presupuestoInterno.mensualTotal?.join(" – ")}</b></div>
              <ul className="mt-2 grid gap-1 text-[13px]" style={{ color: "var(--fg-muted)" }}>
                {(d.presupuestoInterno.items ?? []).map((it) => (
                  <li key={it.servicio}>· {it.servicio}: {it.impl?.join("–")} / {it.mensual?.join("–")}/mes</li>
                ))}
              </ul>
              {(d.presupuestoInterno.notas ?? []).map((n) => <div key={n} className="mt-1 text-[13px]" style={{ color: "var(--fg-muted)" }}>{n}</div>)}
            </div>
          </div>
        )}

        {/* Respuestas completas */}
        {d.respuestas && d.respuestas.length > 0 && (
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium" style={{ color: "var(--brand-accent)" }}>Ver todas las respuestas ({d.respuestas.length})</summary>
            <ul className="mt-3 grid gap-2 text-sm">
              {d.respuestas.map((r, i) => (
                <li key={i} className="rounded-lg p-3" style={{ background: "var(--bg-2)" }}>
                  <div className="text-xs" style={{ color: "var(--fg-muted)" }}>{r.area}</div>
                  <div className="font-medium">{r.pregunta}</div>
                  <div style={{ color: "var(--brand)" }}>{r.respuesta}</div>
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-brand" style={{ height: 44 }}>WhatsApp al cliente</a>}
        </div>
      </div>
    </div>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg px-3 py-2" style={{ background: "var(--bg-2)" }}>
      <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
