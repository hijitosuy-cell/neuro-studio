"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/** Link de cal.com sin el dominio: "usuario/evento" */
const CAL_LINK = "neurostudio/diagnostico-comercial-para-automotoras-neuro-studio";

/**
 * Calendario embebido con el embed oficial de Cal.com.
 * Se usa el script propio de Cal (embed.js) porque la ruta /embed en un iframe
 * pelado queda en blanco: espera la configuración que le manda ese script.
 */
export function CalEmbed() {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const cal = await getCalApi({ namespace: "diagnostico" });
        cal("ui", {
          theme: "dark",
          // La ficha del evento (titulo, descripcion larga, duracion) ya esta
          // arriba en la pagina: repetirla hacia la seccion muchisimo mas larga
          hideEventTypeDetails: true,
          cssVarsPerTheme: {
            light: { "cal-brand": "#2f5fd6" },
            dark: { "cal-brand": "#8fb0ff" },
          },
        });
        if (!cancelado) setListo(true);
      } catch {
        // Si falla, queda el enlace de respaldo que se muestra debajo del calendario
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ border: "1px solid var(--rule-d)", background: "#0b1122", minHeight: listo ? undefined : 420 }}
    >
      {!listo && (
        <div className="absolute inset-0 grid place-items-center text-sm" style={{ color: "var(--paper-dim)" }}>
          Cargando el calendario…
        </div>
      )}
      {/* Sin alto fijo: el embed se ajusta solo al calendario, sin scroll dentro de scroll */}
      <Cal
        namespace="diagnostico"
        calLink={CAL_LINK}
        className="w-full"
        style={{ width: "100%", height: "auto", overflow: "hidden" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
