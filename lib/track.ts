import { track as vercelTrack } from "@vercel/analytics";

/**
 * Eventos que nos importan del embudo: de dónde entra la gente, hasta dónde
 * baja y qué hace. Los nombres son fijos para poder compararlos en el tiempo.
 */
export type EventoNombre =
  | "diagnostico_abierto"
  | "diagnostico_paso"
  | "diagnostico_enviado"
  | "diagnostico_abandonado"
  | "agendar_click"
  | "whatsapp_click"
  | "email_click"
  | "red_social_click"
  | "seccion_vista"
  | "scroll_profundidad"
  | "idioma_cambiado";

type Props = Record<string, string | number | boolean | null>;

/**
 * Origen de la visita. Se lee una vez y viaja con los eventos clave, así
 * sabemos qué canal trae las reuniones y no solo cuántos entran.
 */
function origen(): Props {
  if (typeof window === "undefined") return {};
  try {
    const p = new URLSearchParams(window.location.search);
    const ref = document.referrer;
    let canal = "directo";
    if (p.get("utm_source")) canal = p.get("utm_source") as string;
    else if (ref) {
      const h = new URL(ref).hostname.replace(/^www\./, "");
      canal = h === window.location.hostname ? "interno" : h;
    }
    return {
      canal,
      campania: p.get("utm_campaign") ?? "",
      medio: p.get("utm_medium") ?? "",
    };
  } catch {
    return {};
  }
}

/** Envía un evento. Nunca rompe la página si el analytics falla. */
export function track(nombre: EventoNombre, props: Props = {}) {
  try {
    vercelTrack(nombre, { ...origen(), ...props });
  } catch {
    // el tracking no puede tumbar la web
  }
}
