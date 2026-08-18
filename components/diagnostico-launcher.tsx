"use client";

import { useEffect, useState, useCallback } from "react";
import { DiagnosticoTool } from "@/components/diagnostico-tool";
import { site } from "@/lib/site";

/**
 * Invitación + modal del diagnóstico.
 * Cualquier enlace a #diagnostico abre el modal. Cierra con Escape o clic fuera.
 */
export function DiagnosticoLauncher() {
  const [open, setOpen] = useState(false);

  const abrir = useCallback(() => setOpen(true), []);
  const cerrar = useCallback(() => {
    setOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#diagnostico") {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Abrir si la URL trae #diagnostico o si se hace clic en un enlace a #diagnostico
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#diagnostico") setOpen(true);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href="#diagnostico"]');
      if (a) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onHash = () => {
      if (window.location.hash === "#diagnostico") setOpen(true);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  // Escape + bloquear scroll de fondo
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cerrar();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, cerrar]);

  return (
    <>
      {/* Invitación */}
      <div className="mx-auto max-w-3xl rounded-3xl p-8 text-center md:p-12" style={{ background: "var(--bg)", boxShadow: "0 30px 90px -40px rgba(47,95,214,0.35)" }}>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {[
            ["Análisis de tu caso concreto", "no un PDF genérico"],
            ["Lo revisa una persona", "antes de llegarte"],
            ["Gratis y sin compromiso", "vos decidís después"],
          ].map(([a, b]) => (
            <div key={a} className="rounded-xl px-4 py-3 text-sm" style={{ background: "var(--bg-2)" }}>
              <div className="font-medium" style={{ color: "var(--brand)" }}>{a}</div>
              <div className="text-xs" style={{ color: "var(--fg-muted)" }}>{b}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={abrir} className="btn btn-shiny" style={{ borderRadius: "999px", height: 54, padding: "0 2rem" }}>
            Empezar mi diagnóstico gratis →
          </button>
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ borderRadius: "999px", height: 54 }}>
            Prefiero agendar una reunión
          </a>
        </div>
        <p className="mt-4 text-xs" style={{ color: "var(--fg-muted)" }}>
          Son 5 minutos. Al final elegís si agendás o nos escribís por WhatsApp.
        </p>
      </div>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Diagnóstico Neuro Studio"
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 md:p-8"
          style={{ background: "rgba(6,10,22,0.8)", backdropFilter: "blur(6px)" }}
          onClick={(e) => e.target === e.currentTarget && cerrar()}
        >
          <div className="relative my-auto w-full max-w-4xl rounded-3xl p-4 md:p-6" style={{ background: "var(--bg)", boxShadow: "0 40px 120px -30px rgba(0,0,0,0.6)" }}>
            <button
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-lg transition hover:opacity-70"
              style={{ background: "var(--bg-2)", color: "var(--fg-muted)" }}
            >
              ✕
            </button>
            <DiagnosticoTool />
          </div>
        </div>
      )}
    </>
  );
}
