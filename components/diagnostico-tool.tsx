"use client";

import { useMemo, useState } from "react";
import {
  camposDe,
  contarCampos,
  calcular,
  recomendar,
  interpretar,
  WHATSAPP,
  CALENDAR_URL,
  type Campo,
} from "@/lib/diagnostico";

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

  const bloques = useMemo(() => camposDe(modo), [modo]);
  const bloque = bloques[seccionIdx];

  const resultado = useMemo(() => calcular(r), [r]);
  const recomendados = useMemo(() => recomendar(r), [r]);

  function empezar(m: Modo) {
    setModo(m);
    setR({});
    setErrores({});
    setElegidos([]);
    setSeccionIdx(0);
    setPaso("form");
  }

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
      window.document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setElegidos(recomendados.slice(0, 3).map((s) => s.id));
      setPaso("resultado");
      window.document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const mensaje = useMemo(() => {
    const nombresElegidos = recomendados.filter((s) => elegidos.includes(s.id)).map((s) => s.nombre);
    const l = [
      `Hola, soy ${r.contacto || "—"} de ${r.empresa || "—"}${r.ciudad ? ` (${r.ciudad})` : ""}.`,
      "",
      `Hice el diagnóstico ${modo} en la web.`,
      `Puntaje general: ${resultado.total}/100`,
      "",
      "Áreas más flojas:",
      ...resultado.criticas.map((c) => `• ${c.nombre}: ${c.score}/100`),
    ];
    if (nombresElegidos.length) {
      l.push("", "Me interesa:", ...nombresElegidos.map((n) => `• ${n}`));
    }
    if (r.dolor) l.push("", `Mi principal problema: ${r.dolor}`);
    l.push("", "Quiero coordinar una reunión.");
    return encodeURIComponent(l.join("\n"));
  }, [r, modo, resultado, recomendados, elegidos]);

  /* ── Inicio ── */
  if (paso === "inicio") {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        <Tarjeta
          titulo="Diagnóstico express"
          meta={`${contarCampos("express")} preguntas · 4 minutos`}
          texto="Lo esencial de cada área. Suficiente para ver dónde estás parado."
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
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {bloques.map((b, i) => (
            <span
              key={b.seccion.id}
              style={{
                color: i === seccionIdx ? "var(--brand)" : "var(--fg-muted)",
                fontWeight: i === seccionIdx ? 600 : 400,
                opacity: i > seccionIdx ? 0.5 : 1,
              }}
            >
              {b.seccion.nombre}
            </span>
          ))}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(11,28,63,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${(seccionIdx / bloques.length) * 100}%`, background: "var(--brand-accent)" }}
          />
        </div>

        <div className="surface mt-6 p-7 md:p-9">
          <div className="label" style={{ color: "var(--brand-accent)" }}>
            Sección {seccionIdx + 1} de {bloques.length}
          </div>
          <h3 className="font-display font-semibold mt-2 text-2xl md:text-3xl" style={{ color: "var(--brand)" }}>
            {bloque.seccion.nombre}
          </h3>

          <div className="mt-8 grid gap-7">
            {bloque.campos.map((c) => (
              <CampoInput key={c.id} campo={c} valor={r[c.id]} error={errores[c.id]} onChange={(v) => set(c.id, v)} />
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={avanzar} className="btn btn-brand">
              {seccionIdx + 1 < bloques.length ? "Siguiente" : "Ver resultado"}
            </button>
            <button
              onClick={() => (seccionIdx > 0 ? setSeccionIdx(seccionIdx - 1) : setPaso("inicio"))}
              className="btn"
            >
              Anterior
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs" style={{ color: "var(--fg-muted)" }}>
          No guardamos nada en ningún servidor. Todo queda en tu navegador hasta que decidas enviarlo.
        </p>
      </div>
    );
  }

  /* ── Resultado ── */
  const lectura = interpretar(resultado.total);
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl p-8 md:p-12" style={{ background: "var(--ink)" }}>
        <div className="label" style={{ color: "#8fb0ff" }}>
          Resultado · {String(r.empresa || "tu automotora")}
        </div>

        <div className="mt-6 grid gap-10 md:grid-cols-[230px_1fr] md:gap-14">
          <div>
            <div className="font-display font-semibold text-paper leading-none" style={{ fontSize: "5.5rem" }}>
              {resultado.total}
              <span style={{ color: "var(--paper-dim)", fontSize: "2.75rem" }}>/100</span>
            </div>
            <div className="font-display font-semibold mt-4 text-xl text-paper">{lectura.titulo}</div>
            <p className="mt-2 text-sm" style={{ color: "var(--paper-dim)" }}>{lectura.texto}</p>
          </div>

          <ul className="grid gap-3.5">
            {resultado.porArea.map((a) => (
              <li key={a.id} className="text-sm">
                <div className="flex items-baseline justify-between text-paper">
                  <span style={{ opacity: a.respondidas ? 1 : 0.45 }}>{a.nombre}</span>
                  <span style={{ color: "var(--paper-dim)" }}>{a.respondidas ? a.score : "—"}</span>
                </div>
                <div className="score-bar-track mt-1.5">
                  <div
                    className="score-bar-fill"
                    style={{ width: `${a.score}%`, transition: "width 900ms cubic-bezier(0.22,1,0.36,1)" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {recomendados.length > 0 && (
        <div className="mt-10">
          <h3 className="font-display font-semibold text-2xl" style={{ color: "var(--brand)" }}>
            Lo que te recomendamos
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            Elegí lo que te interesa y lo incluimos en la propuesta.
          </p>

          <ul className="mt-6 grid gap-4">
            {recomendados.map((s) => {
              const activo = elegidos.includes(s.id);
              return (
                <li key={s.id}>
                  <button
                    onClick={() =>
                      setElegidos((e) => (activo ? e.filter((x) => x !== s.id) : [...e, s.id]))
                    }
                    aria-pressed={activo}
                    className="surface w-full p-6 text-left transition"
                    style={activo ? { border: "2px solid var(--brand)", background: "rgba(20,42,82,0.03)" } : {}}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-display font-semibold text-xl" style={{ color: "var(--brand)" }}>
                          {s.nombre}
                        </div>
                        <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{s.desc}</p>
                      </div>
                      <span
                        aria-hidden
                        className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs text-white"
                        style={{
                          background: activo ? "var(--brand)" : "transparent",
                          border: activo ? "none" : "1.5px solid var(--rule-strong)",
                        }}
                      >
                        {activo ? "✓" : ""}
                      </span>
                    </div>
                    <div className="mt-4 border-t rule pt-3">
                      <div className="label" style={{ fontSize: 12 }}>Por qué</div>
                      <ul className="mt-2 grid gap-1 text-sm" style={{ color: "var(--fg-muted)" }}>
                        {s.razones.map((m) => (
                          <li key={m}>· {m}</li>
                        ))}
                      </ul>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: "var(--bg-2)" }}>
        <h3 className="font-display font-semibold text-2xl" style={{ color: "var(--brand)" }}>
          Coordinemos una reunión
        </h3>
        <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
          Te llevamos el resultado analizado y una propuesta concreta.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn btn-brand">
            Elegir día y hora
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${mensaje}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Enviar por WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <button onClick={() => { setR({}); setElegidos([]); setSeccionIdx(0); setPaso("inicio"); }} style={{ color: "var(--fg-muted)" }}>
          Volver a empezar
        </button>
        {modo === "express" && (
          <button onClick={() => empezar("completo")} className="prose-link">
            Hacer el diagnóstico completo
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Campos ─── */

function CampoInput({
  campo,
  valor,
  error,
  onChange,
}: {
  campo: Campo;
  valor: Valor;
  error?: string;
  onChange: (v: Valor) => void;
}) {
  const req = "requerido" in campo && campo.requerido;
  const base = {
    borderColor: error ? "#dc2626" : "var(--rule-strong)",
    background: "white",
  };

  return (
    <div className="grid gap-1.5">
      <label htmlFor={campo.id} className="text-sm font-medium">
        {campo.label}
        {!req && campo.tipo !== "multi" && (
          <span style={{ color: "var(--fg-muted)", fontWeight: 400 }}> (opcional)</span>
        )}
      </label>
      {"ayuda" in campo && campo.ayuda && (
        <p className="text-xs" style={{ color: "var(--fg-muted)" }}>{campo.ayuda}</p>
      )}

      {campo.tipo === "texto" && (
        <input id={campo.id} value={(valor as string) ?? ""} placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 rounded-lg border px-4" style={base} />
      )}

      {campo.tipo === "numero" && (
        <input id={campo.id} type="number" inputMode="numeric" value={(valor as string) ?? ""} placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 rounded-lg border px-4" style={base} />
      )}

      {campo.tipo === "textarea" && (
        <textarea id={campo.id} rows={3} value={(valor as string) ?? ""} placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-lg border p-4" style={base} />
      )}

      {campo.tipo === "select" && (
        <div className="grid gap-2 sm:grid-cols-2">
          {campo.opciones.map((o) => {
            const activo = valor === o.label;
            return (
              <button key={o.label} type="button" onClick={() => onChange(o.label)} aria-pressed={activo}
                className="rounded-lg border px-4 py-3 text-left text-sm transition"
                style={{
                  borderColor: activo ? "var(--brand)" : error ? "#dc2626" : "var(--rule-strong)",
                  borderWidth: activo ? 2 : 1,
                  background: activo ? "rgba(20,42,82,0.04)" : "white",
                  fontWeight: activo ? 500 : 400,
                }}>
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
                style={{
                  borderColor: activo ? "var(--brand)" : "var(--rule-strong)",
                  borderWidth: activo ? 2 : 1,
                  background: activo ? "rgba(20,42,82,0.04)" : "white",
                  fontWeight: activo ? 500 : 400,
                }}>
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

function Tarjeta({
  titulo, meta, texto, cta, onClick, href, destacado,
}: {
  titulo: string; meta: string; texto: string; cta: string;
  onClick?: () => void; href?: string; destacado?: boolean;
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
