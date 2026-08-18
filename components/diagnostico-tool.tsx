"use client";

import { useMemo, useState } from "react";
import {
  areas,
  preguntasDe,
  totalPreguntas,
  interpretar,
  WHATSAPP,
  CALENDAR_URL,
  type Pregunta,
} from "@/lib/diagnostico";

type Modo = "express" | "completo";
type Paso = "inicio" | "datos" | "preguntas" | "resultado";

export function DiagnosticoTool() {
  const [paso, setPaso] = useState<Paso>("inicio");
  const [modo, setModo] = useState<Modo>("express");
  const [empresa, setEmpresa] = useState("");
  const [nombre, setNombre] = useState("");
  const [errorDatos, setErrorDatos] = useState("");
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [indice, setIndice] = useState(0);

  const preguntas = useMemo(() => preguntasDe(modo), [modo]);
  const actual = preguntas[indice];

  const resultado = useMemo(() => {
    const porArea = areas.map((a) => {
      const suyas = a.preguntas.filter((p) => respuestas[p.id] !== undefined);
      const score = suyas.length
        ? Math.round(suyas.reduce((s, p) => s + respuestas[p.id], 0) / suyas.length)
        : 0;
      return { nombre: a.nombre, score, respondidas: suyas.length };
    });
    const conDatos = porArea.filter((a) => a.respondidas > 0);
    const total = conDatos.length
      ? Math.round(conDatos.reduce((s, a) => s + a.score, 0) / conDatos.length)
      : 0;
    const criticas = [...conDatos].sort((a, b) => a.score - b.score).slice(0, 3);
    return { porArea, total, criticas };
  }, [respuestas]);

  function empezar(m: Modo) {
    setModo(m);
    setRespuestas({});
    setIndice(0);
    setPaso("datos");
  }

  function confirmarDatos() {
    if (!empresa.trim()) {
      setErrorDatos("Escribí el nombre de tu automotora para continuar.");
      return;
    }
    setErrorDatos("");
    setPaso("preguntas");
  }

  function responder(p: Pregunta, score: number) {
    setRespuestas((r) => ({ ...r, [p.id]: score }));
    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
    } else {
      setPaso("resultado");
    }
  }

  const mensajeWhatsapp = useMemo(() => {
    const lineas = [
      `Hola, soy ${nombre || "—"} de ${empresa || "—"}.`,
      "",
      `Hice el diagnóstico ${modo === "express" ? "express" : "completo"} en la web.`,
      `Puntaje: ${resultado.total}/100`,
      "",
      "Áreas más flojas:",
      ...resultado.criticas.map((c) => `• ${c.nombre}: ${c.score}/100`),
      "",
      "Quiero coordinar una reunión.",
    ];
    return encodeURIComponent(lineas.join("\n"));
  }, [nombre, empresa, modo, resultado]);

  const mensajeDirecto = encodeURIComponent(
    "Hola, quiero coordinar una reunión para que hagan el diagnóstico de mi automotora."
  );

  /* ── Inicio ── */
  if (paso === "inicio") {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        <Opcion
          titulo="Diagnóstico express"
          meta={`${totalPreguntas("express")} preguntas · 3 minutos`}
          texto="Una pregunta clave por área. Te da un panorama rápido de dónde estás parado."
          cta="Empezar express"
          onClick={() => empezar("express")}
        />
        <Opcion
          destacado
          titulo="Diagnóstico completo"
          meta={`${totalPreguntas("completo")} preguntas · 10 minutos`}
          texto="Las 10 áreas a fondo. El mismo relevamiento que hacemos en una reunión, pero lo hacés vos."
          cta="Empezar completo"
          onClick={() => empezar("completo")}
        />
        <Opcion
          titulo="Que lo hagamos nosotros"
          meta="Reunión de 30 minutos"
          texto="Agendás y lo hacemos juntos por videollamada, sin que completes nada ahora."
          cta="Agendar reunión"
          href={CALENDAR_URL}
        />
      </div>
    );
  }

  /* ── Datos ── */
  if (paso === "datos") {
    return (
      <div className="surface mx-auto max-w-xl p-8">
        <div className="label" style={{ color: "var(--brand-accent)" }}>
          Diagnóstico {modo === "express" ? "express" : "completo"}
        </div>
        <h3 className="font-display font-semibold mt-3 text-2xl" style={{ color: "var(--brand)" }}>
          Antes de empezar
        </h3>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Nombre de tu automotora</span>
            <input
              value={empresa}
              onChange={(e) => { setEmpresa(e.target.value); if (errorDatos) setErrorDatos(""); }}
              placeholder="Auto Sur"
              className="h-12 rounded-lg border px-4"
              style={{ borderColor: "var(--rule-strong)", background: "white" }}
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Tu nombre <span style={{ color: "var(--fg-muted)", fontWeight: 400 }}>(opcional)</span></span>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Marcos"
              className="h-12 rounded-lg border px-4"
              style={{ borderColor: "var(--rule-strong)", background: "white" }}
            />
          </label>
          {errorDatos && (
            <p className="text-sm" style={{ color: "#dc2626" }}>{errorDatos}</p>
          )}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={confirmarDatos} className="btn btn-brand">
            Comenzar
          </button>
          <button onClick={() => setPaso("inicio")} className="btn">Volver</button>
        </div>
        <p className="mt-5 text-xs" style={{ color: "var(--fg-muted)" }}>
          No guardamos nada en ningún servidor. Los datos quedan en tu navegador hasta que decidas enviarlos.
        </p>
      </div>
    );
  }

  /* ── Preguntas ── */
  if (paso === "preguntas" && actual) {
    const pct = Math.round((indice / preguntas.length) * 100);
    const areaActual = areas.find((a) => a.preguntas.some((p) => p.id === actual.id));
    return (
      <div className="surface mx-auto max-w-2xl p-8 md:p-10">
        <div className="flex items-baseline justify-between text-sm" style={{ color: "var(--fg-muted)" }}>
          <span>{areaActual?.nombre}</span>
          <span>{indice + 1} de {preguntas.length}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(11,28,63,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%`, background: "var(--brand-accent)" }}
          />
        </div>

        <h3 className="font-display font-semibold mt-8 text-2xl md:text-3xl" style={{ color: "var(--brand)" }}>
          {actual.q}
        </h3>
        {actual.help && (
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{actual.help}</p>
        )}

        <div className="mt-7 grid gap-3">
          {actual.opciones.map((o) => (
            <button
              key={o.label}
              onClick={() => responder(actual, o.score)}
              className="rounded-xl border px-5 py-4 text-left transition hover:border-current"
              style={{ borderColor: "var(--rule-strong)" }}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-sm">
          <button
            onClick={() => (indice > 0 ? setIndice(indice - 1) : setPaso("datos"))}
            style={{ color: "var(--fg-muted)" }}
          >
            ← Atrás
          </button>
          {Object.keys(respuestas).length > 0 && (
            <button onClick={() => setPaso("resultado")} className="prose-link">
              Ver resultado con lo respondido
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Resultado ── */
  const lectura = interpretar(resultado.total);
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl p-8 md:p-12" style={{ background: "var(--ink)" }}>
        <div className="label" style={{ color: "#8fb0ff" }}>
          Resultado · {empresa || "tu automotora"}
        </div>

        <div className="mt-6 grid gap-10 md:grid-cols-[240px_1fr] md:gap-14">
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
              <li key={a.nombre} className="text-sm">
                <div className="flex items-baseline justify-between text-paper">
                  <span style={{ opacity: a.respondidas ? 1 : 0.4 }}>{a.nombre}</span>
                  <span style={{ color: "var(--paper-dim)" }}>
                    {a.respondidas ? `${a.score}` : "—"}
                  </span>
                </div>
                <div className="score-bar-track mt-1.5">
                  <div className="score-bar-fill" style={{ width: `${a.score}%`, transition: "width 900ms cubic-bezier(0.22,1,0.36,1)" }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
          <p className="text-paper text-body">
            Con este resultado ya podemos armarte un plan concreto. Elegí cómo seguir:
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn btn-solid-on-dark">
              Agendar reunión
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${mensajeWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-on-dark"
            >
              Enviar resultado por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <button onClick={() => { setRespuestas({}); setIndice(0); setPaso("inicio"); }} style={{ color: "var(--fg-muted)" }}>
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

function Opcion({
  titulo,
  meta,
  texto,
  cta,
  onClick,
  href,
  destacado,
}: {
  titulo: string;
  meta: string;
  texto: string;
  cta: string;
  onClick?: () => void;
  href?: string;
  destacado?: boolean;
}) {
  return (
    <div
      className="surface flex flex-col p-7"
      style={destacado ? { border: "2px solid var(--brand)" } : {}}
    >
      <h3 className="font-display font-semibold text-xl" style={{ color: "var(--brand)" }}>{titulo}</h3>
      <div className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>{meta}</div>
      <p className="mt-4 text-sm flex-1" style={{ color: "var(--fg-muted)" }}>{texto}</p>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`btn mt-6 ${destacado ? "btn-brand" : ""}`}>
          {cta}
        </a>
      ) : (
        <button onClick={onClick} className={`btn mt-6 ${destacado ? "btn-brand" : ""}`}>
          {cta}
        </button>
      )}
    </div>
  );
}
