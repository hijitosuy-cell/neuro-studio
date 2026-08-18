"use client";

import { useMemo, useRef, useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  camposDe,
  contarCampos,
  calcular,
  recomendar,
  objecionesDe,
  interpretar,
  calificacion,
  analisisCliente,
  presupuestoInterno,
  tamanoAutomotora,
  nombresDeServicios,
  detalleRespuestas,
  WHATSAPP,
  CALENDAR_URL,
  type Campo,
} from "@/lib/diagnostico";
import { RadarAreas, DonutAreas, generarInformePNG } from "@/components/diagnostico-informe";

type Modo = "express" | "completo";
type Paso = "inicio" | "form" | "resultado";
type Valor = string | string[] | undefined;

export function DiagnosticoTool() {
  const [paso, setPaso] = useState<Paso>("inicio");
  const [modo, setModo] = useState<Modo>("express");
  const [seccionIdx, setSeccionIdx] = useState(0);
  const [r, setR] = useState<Record<string, Valor>>({});
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [elegidos, setElegidos] = useState<string[]>([]);
  const [descargando, setDescargando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const guardadoRef = useRef(false);
  const docIdRef = useRef<string | null>(null);

  const bloques = useMemo(() => camposDe(modo), [modo]);
  const bloque = bloques[seccionIdx];

  const resultado = useMemo(() => calcular(r), [r]);
  const recomendados = useMemo(() => recomendar(r), [r]);
  const objecionesSel = useMemo(() => objecionesDe(r), [r]);

  function empezar(m: Modo) {
    setModo(m);
    setR({});
    setErrores({});
    setElegidos([]);
    guardadoRef.current = false;
    setSeccionIdx(0);
    setPaso("form");
    scrollTop();
  }

  const scrollTop = () =>
    window.document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" });

  function set(id: string, v: Valor) {
    setR((prev) => ({ ...prev, [id]: v }));
    if (errores[id]) setErrores((e) => ({ ...e, [id]: "" }));
  }

  function avanzar() {
    const faltan: Record<string, string> = {};
    for (const c of bloque.campos) {
      const req = "requerido" in c && c.requerido;
      const v = r[c.id];
      const vacio = v === undefined || v === "" || (Array.isArray(v) && v.length === 0);
      if (req && vacio) faltan[c.id] = "Completá este campo para seguir.";
    }
    if (Object.keys(faltan).length) {
      setErrores(faltan);
      return;
    }
    if (seccionIdx + 1 < bloques.length) {
      setSeccionIdx(seccionIdx + 1);
      scrollTop();
    } else {
      setElegidos([]);
      setPaso("resultado");
      guardarEnSaaS();
      scrollTop();
    }
  }

  async function guardarEnSaaS() {
    if (guardadoRef.current) return;
    guardadoRef.current = true;
    try {
      // al llegar al resultado guardamos con los recomendados (aún no eligió)
      const idsInteres = recomendados.map((s) => s.id);
      const nombresInteres = nombresDeServicios(idsInteres);
      const presupuesto = presupuestoInterno(r, idsInteres, resultado.total);

      const ref = await addDoc(collection(db, "diagnosticos_web"), {
        tipo: modo,
        negocio: r.empresa ?? "",
        contacto: r.contacto ?? "",
        pais: r.pais ?? "",
        ciudad: r.ciudad ?? "",
        telefono: r.telefono ?? "",
        vendedores: r.vendedores ?? "",
        sucursales: r.sucursales ?? "",
        stockAprox: r.stock_aprox ?? "",
        tamano: tamanoAutomotora(r),
        puntajeGeneral: resultado.total,
        areas: resultado.porArea
          .filter((a) => a.respondidas > 0)
          .map((a) => ({ nombre: a.nombre, puntaje: a.score })),
        respuestas: detalleRespuestas(modo, r),
        // Sandler
        motivo: r.motivo ?? "",
        dolorPrincipal: r.dolor_principal ?? "",
        costoEstimado: r.dolor_costo ?? "",
        prioridad: r.prioridad ?? "",
        presupuesto: r.presupuesto ?? "",
        inversionInicial: r.inversion_inicial ?? "",
        inversionMensual: r.inversion_mensual ?? "",
        quienDecide: r.quien_decide ?? "",
        plazo: r.plazo ?? "",
        compromiso: r.compromiso ?? "",
        obstaculos: Array.isArray(r.obstaculos) ? r.obstaculos : [],
        calificacion: calificacion(r),
        // Servicios: nombres (mostrar) + ids (filtrar "todos los que quieren chatbot")
        recomendados: recomendados.map((s) => s.nombre),
        serviciosIds: idsInteres,
        serviciosInteres: nombresInteres,
        // Presupuesto interno — solo para el equipo, no se muestra al cliente
        presupuestoInterno: presupuesto,
        contactoSolicitado: false,
        creadoEnMs: Date.now(),
        creadoEnISO: new Date().toISOString(),
        visto: false,
      });
      docIdRef.current = ref.id;
    } catch {
      /* silencioso */
    }
  }

  /** Guarda la selección final del cliente y marca que pidió contacto. */
  async function confirmarContacto() {
    setEnviando(true);
    try {
      const ids = elegidos.length ? elegidos : recomendados.map((s) => s.id);
      const presupuesto = presupuestoInterno(r, ids, resultado.total);
      if (docIdRef.current) {
        await updateDoc(doc(db, "diagnosticos_web", docIdRef.current), {
          serviciosIds: ids,
          serviciosInteres: nombresDeServicios(ids),
          presupuestoInterno: presupuesto,
          contactoSolicitado: true,
        });
      }
      setEnviado(true);
    } catch {
      setEnviado(true); // igual mostramos confirmación; el lead ya se guardó al llegar
    } finally {
      setEnviando(false);
    }
  }

  const mensaje = useMemo(() => {
    const elegidosNombres = recomendados.filter((s) => elegidos.includes(s.id)).map((s) => s.nombre);
    const l = [
      "*Diagnóstico Neuro Studio*",
      "━━━━━━━━━━━━━━━",
      `🏢 ${r.empresa || "—"}${r.ciudad ? ` · ${r.ciudad}` : ""}`,
      `👤 ${r.contacto || "—"}`,
      "",
      `📊 *Puntaje general: ${resultado.total}/100*`,
      `_${interpretar(resultado.total).titulo}_`,
      "",
      "*Puntaje por área:*",
      ...resultado.porArea
        .filter((a) => a.respondidas > 0)
        .map((a) => `${barra(a.score)} ${a.corto} — ${a.score}`),
    ];
    if (r.dolor_principal) l.push("", `🎯 *Principal problema:*`, String(r.dolor_principal));
    if (r.dolor_costo) l.push("", `💸 Costo estimado por mes: ${r.dolor_costo}`);
    const inv: string[] = [];
    if (r.inversion_inicial) inv.push(`Inicial: ${r.inversion_inicial}`);
    if (r.inversion_mensual) inv.push(`Mensual: ${r.inversion_mensual}`);
    if (inv.length) l.push("", `💰 *Inversión que maneja:* ${inv.join(" · ")}`);
    if (elegidosNombres.length) l.push("", "*Me interesa:*", ...elegidosNombres.map((n) => `✅ ${n}`));
    l.push("", "Quiero coordinar una reunión. 🗓️");
    return encodeURIComponent(l.join("\n"));
  }, [r, resultado, recomendados, elegidos]);

  async function descargarInforme() {
    setDescargando(true);
    try {
      await generarInformePNG({
        empresa: String(r.empresa || "Tu automotora"),
        contacto: String(r.contacto || ""),
        ciudad: String(r.ciudad || ""),
        total: resultado.total,
        lectura: interpretar(resultado.total).titulo,
        areas: resultado.porArea.filter((a) => a.respondidas > 0).map((a) => ({ nombre: a.nombre, score: a.score })),
        dolor: String(r.dolor_principal || ""),
        servicios: recomendados.filter((s) => elegidos.includes(s.id)).map((s) => s.nombre),
      });
    } finally {
      setDescargando(false);
    }
  }

  /* ── Inicio ── */
  if (paso === "inicio") {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        <Tarjeta
          titulo="Diagnóstico express"
          meta={`${contarCampos("express")} preguntas · 5 minutos`}
          texto="Lo esencial de cada área más el problema de fondo. Suficiente para ver dónde estás parado."
          cta="Empezar express"
          onClick={() => empezar("express")}
        />
        <Tarjeta
          destacado
          titulo="Diagnóstico completo"
          meta={`${contarCampos("completo")} preguntas · 12 minutos`}
          texto="El relevamiento entero, el mismo que hacemos en una reunión. Resultado mucho más preciso."
          cta="Empezar completo"
          onClick={() => empezar("completo")}
        />
        <Tarjeta
          titulo="Que lo hagamos nosotros"
          meta="Reunión de 30 minutos"
          texto="Agendás y lo completamos juntos por videollamada."
          cta="Agendar reunión"
          href={CALENDAR_URL}
        />
      </div>
    );
  }

  /* ── Formulario ── */
  if (paso === "form" && bloque) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="label" style={{ color: "var(--brand-accent)" }}>
            Sección {seccionIdx + 1} de {bloques.length}
          </span>
          <span style={{ color: "var(--fg-muted)" }}>{bloque.seccion.nombre}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(11,28,63,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${(seccionIdx / bloques.length) * 100}%`, background: "var(--brand-accent)" }}
          />
        </div>

        <div className="surface mt-6 p-7 md:p-9">
          <h3 className="font-display font-semibold text-2xl md:text-3xl" style={{ color: "var(--brand)" }}>
            {bloque.seccion.nombre}
          </h3>
          {bloque.seccion.intro && (
            <p className="mt-3 text-sm" style={{ color: "var(--fg-muted)" }}>{bloque.seccion.intro}</p>
          )}

          <div className="mt-8 grid gap-7">
            {bloque.campos.map((c) => (
              <CampoInput key={c.id} campo={c} valor={r[c.id]} error={errores[c.id]} onChange={(v) => set(c.id, v)} />
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={avanzar} className="btn btn-brand">
              {seccionIdx + 1 < bloques.length ? "Siguiente" : "Ver mi resultado"}
            </button>
            <button onClick={() => (seccionIdx > 0 ? (setSeccionIdx(seccionIdx - 1), scrollTop()) : setPaso("inicio"))} className="btn">
              Anterior
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs" style={{ color: "var(--fg-muted)" }}>
          Guardamos tus respuestas para preparar el análisis antes de la reunión. No las compartimos con nadie.
        </p>
      </div>
    );
  }

  /* ── Resultado ── */
  const lectura = interpretar(resultado.total);
  const analisis = analisisCliente(r, resultado.total, resultado.criticas, recomendados.map((s) => s.nombre));
  return (
    <div className="mx-auto max-w-4xl">
      {/* Panel puntaje + radar */}
      <div className="rounded-2xl p-8 md:p-12" style={{ background: "var(--ink)" }}>
        <div className="label" style={{ color: "#8fb0ff" }}>
          Resultado · {String(r.empresa || "tu automotora")}
        </div>

        <div className="mt-6 grid gap-10 md:grid-cols-[300px_1fr] md:gap-12 md:items-center">
          {/* Circular */}
          <DonutAreas total={resultado.total} areas={resultado.porArea.map((a) => ({ label: a.corto, score: a.respondidas ? a.score : 0 }))} />
          <div>
            <div className="font-display font-semibold text-2xl text-paper">{lectura.titulo}</div>
            <p className="mt-3 text-body" style={{ color: "var(--paper-dim)" }}>{analisis.resumen}</p>
            {analisis.porQue && <p className="mt-3 text-body" style={{ color: "var(--paper-dim)" }}>{analisis.porQue}</p>}
          </div>
        </div>

        {/* Barras por área */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:gap-x-10">
          {resultado.porArea.map((a) => (
            <li key={a.id} className="text-sm">
              <div className="flex items-baseline justify-between text-paper">
                <span style={{ opacity: a.respondidas ? 1 : 0.4 }}>{a.nombre}</span>
                <span style={{ color: "var(--paper-dim)" }}>{a.respondidas ? a.score : "—"}</span>
              </div>
              <div className="score-bar-track mt-1.5">
                <div className="score-bar-fill" style={{ width: `${a.score}%`, transition: "width 900ms cubic-bezier(0.22,1,0.36,1)" }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ¿Podemos ayudarte? (honesto, Sandler) */}
      <div className="mt-8 rounded-2xl p-6 md:p-8" style={{ background: analisis.fit === "bajo" ? "var(--bg-2)" : "rgba(47,95,214,0.06)", border: `1px solid ${analisis.fit === "bajo" ? "var(--rule)" : "rgba(47,95,214,0.25)"}` }}>
        <div className="label" style={{ color: "var(--brand-accent)" }}>¿Podemos ayudarte?</div>
        <p className="mt-3 text-body" style={{ color: "var(--fg)" }}>{analisis.fitTexto}</p>
      </div>

      {/* Lo que perdés hoy (Sandler: inacción) */}
      {(r.dolor_costo || r.dolor_principal) && (
        <div className="mt-8 rounded-2xl p-8" style={{ background: "var(--bg-2)", border: "1px solid var(--rule)" }}>
          <div className="label" style={{ color: "var(--brand-accent)" }}>Lo que está en juego</div>
          {r.dolor_principal ? (
            <p className="mt-3 font-display text-xl" style={{ color: "var(--brand)" }}>
              “{String(r.dolor_principal)}”
            </p>
          ) : null}
          {r.dolor_costo ? (
            <p className="mt-3 text-sm" style={{ color: "var(--fg-muted)" }}>
              Estimás que esto te cuesta <strong style={{ color: "var(--brand)" }}>{String(r.dolor_costo)}</strong> por mes.
              Si nada cambia, en un año son doce veces ese número. Ese es el costo real de seguir igual.
            </p>
          ) : null}
        </div>
      )}

      {/* Servicios recomendados */}
      {recomendados.length > 0 && (
        <div className="mt-10">
          <h3 className="font-display font-semibold text-2xl" style={{ color: "var(--brand)" }}>Lo que más te ayudaría</h3>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>Estas son las piezas que más moverían la aguja en tu caso. Marcá las que te interesan (ninguna viene marcada) y las sumamos a tu propuesta.</p>
          <ul className="mt-6 grid gap-4">
            {recomendados.map((s) => {
              const activo = elegidos.includes(s.id);
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setElegidos((e) => (activo ? e.filter((x) => x !== s.id) : [...e, s.id]))}
                    aria-pressed={activo}
                    className="surface w-full p-6 text-left transition"
                    style={activo ? { border: "2px solid var(--brand)", background: "rgba(20,42,82,0.03)" } : {}}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-display font-semibold text-xl" style={{ color: "var(--brand)" }}>{s.nombre}</div>
                        <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{s.desc}</p>
                      </div>
                      <span aria-hidden className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs text-white"
                        style={{ background: activo ? "var(--brand)" : "transparent", border: activo ? "none" : "1.5px solid var(--rule-strong)" }}>
                        {activo ? "✓" : ""}
                      </span>
                    </div>
                    <div className="mt-4 border-t rule pt-3">
                      <div className="label" style={{ fontSize: 12 }}>Por qué</div>
                      <ul className="mt-2 grid gap-1 text-sm" style={{ color: "var(--fg-muted)" }}>
                        {s.razones.map((m) => <li key={m}>· {m}</li>)}
                      </ul>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Objeciones resueltas (Sandler) */}
      {objecionesSel.length > 0 && (
        <div className="mt-10">
          <h3 className="font-display font-semibold text-2xl" style={{ color: "var(--brand)" }}>
            Sobre lo que te frena
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            Marcaste algunas cosas que podrían hacerte no avanzar. Preferimos responderlas de una.
          </p>
          <ul className="mt-6 grid gap-4">
            {objecionesSel.map((o) => (
              <li key={o.titulo} className="surface p-6">
                <div className="font-display font-semibold text-lg" style={{ color: "var(--brand)" }}>{o.titulo}</div>
                <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{o.respuesta}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA final: guardar + contacto */}
      <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: "var(--ink)" }}>
        {enviado ? (
          <>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full text-2xl" style={{ background: "rgba(16,185,129,0.15)", color: "#7cff9e" }}>✓</div>
            <h3 className="font-display font-semibold mt-5 text-2xl text-paper">Listo, ya lo tenemos.</h3>
            <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--paper-dim)" }}>
              Tu diagnóstico nos llegó. Te contactamos en menos de 24 horas hábiles con el análisis y una propuesta para tu automotora. Si querés adelantar, agendá o escribinos:
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn btn-solid-on-dark">Agendar la reunión</a>
              <a href={`https://wa.me/${WHATSAPP}?text=${mensaje}`} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark">Escribinos por WhatsApp</a>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-display font-semibold text-2xl text-paper">Guardá tu diagnóstico y te contactamos</h3>
            <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--paper-dim)" }}>
              Lo revisamos nosotros y te llegamos con el análisis y una propuesta concreta. No hace falta que hagas nada más.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={confirmarContacto} disabled={enviando} className="btn btn-solid-on-dark">
                {enviando ? "Guardando…" : "Guardar y que me contacten"}
              </button>
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark">Prefiero agendar ahora</a>
            </div>
          </>
        )}
        <button onClick={descargarInforme} disabled={descargando} className="mt-5 text-sm underline" style={{ color: "var(--paper-dim)" }}>
          {descargando ? "Generando…" : "Descargar informe en imagen"}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <button onClick={() => { setR({}); setElegidos([]); setSeccionIdx(0); guardadoRef.current = false; docIdRef.current = null; setEnviado(false); setPaso("inicio"); }} style={{ color: "var(--fg-muted)" }}>
          Volver a empezar
        </button>
        {modo === "express" && (
          <button onClick={() => empezar("completo")} className="prose-link">Hacer el diagnóstico completo</button>
        )}
      </div>
    </div>
  );
}

/** Mini barra ASCII para el mensaje de WhatsApp */
function barra(score: number) {
  const full = Math.round(score / 10);
  return "█".repeat(full) + "░".repeat(10 - full);
}

/* ─── Campos ─── */

function CampoInput({ campo, valor, error, onChange }: {
  campo: Campo; valor: Valor; error?: string; onChange: (v: Valor) => void;
}) {
  const req = "requerido" in campo && campo.requerido;
  const base = { borderColor: error ? "#dc2626" : "var(--rule-strong)", background: "white" };

  return (
    <div className="grid gap-1.5">
      <label htmlFor={campo.id} className="text-sm font-medium">
        {campo.label}
        {!req && campo.tipo !== "multi" && <span style={{ color: "var(--fg-muted)", fontWeight: 400 }}> (opcional)</span>}
      </label>
      {"ayuda" in campo && campo.ayuda && <p className="text-xs" style={{ color: "var(--fg-muted)" }}>{campo.ayuda}</p>}

      {campo.tipo === "texto" && (
        <input id={campo.id} value={(valor as string) ?? ""} placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)} className="h-12 rounded-lg border px-4" style={base} />
      )}
      {campo.tipo === "numero" && (
        <input id={campo.id} type="number" inputMode="numeric" value={(valor as string) ?? ""} placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)} className="h-12 rounded-lg border px-4" style={base} />
      )}
      {campo.tipo === "textarea" && (
        <textarea id={campo.id} rows={3} value={(valor as string) ?? ""} placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)} className="rounded-lg border p-4" style={base} />
      )}
      {campo.tipo === "select" && (
        <div className="grid gap-2 sm:grid-cols-2">
          {campo.opciones.map((o) => {
            const activo = valor === o.label;
            return (
              <button key={o.label} type="button" onClick={() => onChange(o.label)} aria-pressed={activo}
                className="rounded-lg border px-4 py-3 text-left text-sm transition"
                style={{ borderColor: activo ? "var(--brand)" : error ? "#dc2626" : "var(--rule-strong)", borderWidth: activo ? 2 : 1, background: activo ? "rgba(20,42,82,0.04)" : "white", fontWeight: activo ? 500 : 400 }}>
                {o.label}
              </button>
            );
          })}
        </div>
      )}
      {campo.tipo === "multi" && (
        <div className="flex flex-wrap gap-2">
          {campo.opciones.map((o) => {
            const arr = (valor as string[]) ?? [];
            const activo = arr.includes(o.label);
            return (
              <button key={o.label} type="button" aria-pressed={activo}
                onClick={() => onChange(activo ? arr.filter((x) => x !== o.label) : [...arr, o.label])}
                className="rounded-full border px-4 py-2 text-sm transition"
                style={{ borderColor: activo ? "var(--brand)" : "var(--rule-strong)", borderWidth: activo ? 2 : 1, background: activo ? "rgba(20,42,82,0.04)" : "white", fontWeight: activo ? 500 : 400 }}>
                {o.label}
              </button>
            );
          })}
        </div>
      )}
      {error && <p className="text-sm" style={{ color: "#dc2626" }}>{error}</p>}
    </div>
  );
}

function Tarjeta({ titulo, meta, texto, cta, onClick, href, destacado }: {
  titulo: string; meta: string; texto: string; cta: string; onClick?: () => void; href?: string; destacado?: boolean;
}) {
  return (
    <div className="surface flex flex-col p-7" style={destacado ? { border: "2px solid var(--brand)" } : {}}>
      <h3 className="font-display font-semibold text-xl" style={{ color: "var(--brand)" }}>{titulo}</h3>
      <div className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>{meta}</div>
      <p className="mt-4 flex-1 text-sm" style={{ color: "var(--fg-muted)" }}>{texto}</p>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`btn mt-6 ${destacado ? "btn-brand" : ""}`}>{cta}</a>
      ) : (
        <button onClick={onClick} className={`btn mt-6 ${destacado ? "btn-brand" : ""}`}>{cta}</button>
      )}
    </div>
  );
}
