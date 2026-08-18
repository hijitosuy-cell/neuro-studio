export type AreaId =
  | "captacion"
  | "velocidad"
  | "seguimiento"
  | "digital"
  | "stock"
  | "datos";

export const AREAS: { id: AreaId; nombre: string }[] = [
  { id: "captacion", nombre: "Captación de clientes" },
  { id: "velocidad", nombre: "Velocidad de respuesta" },
  { id: "seguimiento", nombre: "Seguimiento y CRM" },
  { id: "digital", nombre: "Presencia digital" },
  { id: "stock", nombre: "Stock y precios" },
  { id: "datos", nombre: "Datos y control" },
];

export type Opcion = { label: string; score?: number };

export type Campo =
  | { tipo: "texto"; id: string; label: string; placeholder?: string; requerido?: boolean; express?: boolean }
  | { tipo: "numero"; id: string; label: string; placeholder?: string; express?: boolean }
  | { tipo: "textarea"; id: string; label: string; placeholder?: string; requerido?: boolean; express?: boolean }
  | { tipo: "select"; id: string; label: string; ayuda?: string; area?: AreaId; express?: boolean; opciones: Opcion[] }
  | { tipo: "multi"; id: string; label: string; ayuda?: string; area?: AreaId; express?: boolean; opciones: Opcion[] };

export type Seccion = { id: string; nombre: string; campos: Campo[] };

export const secciones: Seccion[] = [
  {
    id: "negocio",
    nombre: "Tu automotora",
    campos: [
      { tipo: "texto", id: "empresa", label: "Nombre de la automotora", placeholder: "Auto Sur", requerido: true, express: true },
      { tipo: "texto", id: "contacto", label: "Tu nombre", placeholder: "Marcos", requerido: true, express: true },
      { tipo: "texto", id: "ciudad", label: "Ciudad", placeholder: "Salto", express: true },
      { tipo: "texto", id: "telefono", label: "WhatsApp", placeholder: "099 123 456", express: true },
      { tipo: "numero", id: "sucursales", label: "¿Cuántas sucursales tienen?", placeholder: "1" },
      { tipo: "numero", id: "vendedores", label: "¿Cuántos vendedores trabajan?", placeholder: "4", express: true },
      { tipo: "numero", id: "stock_cant", label: "¿Cuántos vehículos tienen en stock aprox.?", placeholder: "40" },
      {
        tipo: "select", id: "que_venden", label: "¿Qué venden?", express: true,
        opciones: [{ label: "Solo usados" }, { label: "Solo 0 km" }, { label: "Ambos" }],
      },
      {
        tipo: "select", id: "taller", label: "¿Tienen taller o postventa?",
        opciones: [{ label: "Sí, propio" }, { label: "Tercerizado" }, { label: "No" }],
      },
      {
        tipo: "select", id: "financiacion", label: "¿Ofrecen financiación?",
        opciones: [{ label: "Propia" }, { label: "Solo banco o financiera" }, { label: "Ambas" }, { label: "No ofrecemos" }],
      },
    ],
  },

  {
    id: "ventas",
    nombre: "Ventas y seguimiento",
    campos: [
      {
        tipo: "select", id: "registro", label: "¿Dónde registran las consultas que reciben?",
        area: "seguimiento", express: true,
        opciones: [
          { label: "En un CRM o sistema", score: 100 },
          { label: "En una planilla de Excel", score: 45 },
          { label: "En papel o cuaderno", score: 15 },
          { label: "No las registramos", score: 0 },
        ],
      },
      { tipo: "numero", id: "leads_mes", label: "¿Cuántas consultas reciben por mes aprox.?", placeholder: "80", express: true },
      { tipo: "numero", id: "ventas_mes", label: "¿Cuántas ventas cierran por mes?", placeholder: "12", express: true },
      {
        tipo: "select", id: "reparto", label: "¿Cómo se reparten las consultas entre vendedores?",
        area: "captacion", express: true,
        opciones: [
          { label: "Sistema automático por turno", score: 100 },
          { label: "Por canal o tipo de vehículo", score: 70 },
          { label: "El que atiende primero", score: 30 },
          { label: "No tenemos sistema", score: 0 },
          { label: "Hay un solo vendedor", score: 50 },
        ],
      },
      {
        tipo: "select", id: "seguimiento_no_compra", label: "¿Hacen seguimiento a los que consultan y no compran?",
        area: "seguimiento", express: true,
        opciones: [
          { label: "Sí, con recordatorios automáticos", score: 100 },
          { label: "Sí, pero manual y si se acuerdan", score: 45 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "select", id: "venta_perdida", label: "¿Alguna vez perdieron una venta por no responder a tiempo?",
        area: "velocidad", express: true,
        opciones: [
          { label: "No que sepamos", score: 100 },
          { label: "Alguna vez", score: 45 },
          { label: "Sí, varias veces", score: 0 },
        ],
      },
      {
        tipo: "select", id: "ver_vendedores", label: "¿Podés saber qué vendedor vende más y por qué?",
        area: "datos",
        opciones: [
          { label: "Sí, con datos del sistema", score: 100 },
          { label: "Más o menos, por intuición", score: 40 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "select", id: "leads_activos", label: "¿Podés ver cuántas consultas abiertas tiene cada vendedor ahora?",
        area: "seguimiento",
        opciones: [
          { label: "Sí, en tiempo real", score: 100 },
          { label: "Preguntándole a cada uno", score: 30 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "select", id: "vendedor_se_va", label: "Si un vendedor se va, ¿qué pasa con sus clientes?",
        area: "seguimiento",
        opciones: [
          { label: "Quedan en el sistema, los toma otro", score: 100 },
          { label: "Hay que pedirle la información", score: 35 },
          { label: "Se pierden con su teléfono", score: 0 },
        ],
      },
      {
        tipo: "select", id: "tiempo_cierre", label: "¿Cuánto pasa desde la consulta hasta la venta?",
        area: "seguimiento",
        opciones: [
          { label: "Menos de una semana", score: 100 },
          { label: "Una a dos semanas", score: 75 },
          { label: "Dos a cuatro semanas", score: 50 },
          { label: "Más de un mes", score: 25 },
          { label: "No lo medimos", score: 0 },
        ],
      },
    ],
  },

  {
    id: "digital",
    nombre: "Presencia digital",
    campos: [
      {
        tipo: "select", id: "web", label: "¿Tienen página web?",
        area: "digital", express: true,
        opciones: [
          { label: "Sí, con buscador de vehículos", score: 100 },
          { label: "Sí, pero básica o informativa", score: 45 },
          { label: "No tenemos", score: 0 },
        ],
      },
      {
        tipo: "multi", id: "redes", label: "¿En qué redes están activos?",
        area: "digital", express: true,
        opciones: [
          { label: "Instagram", score: 35 },
          { label: "Facebook", score: 25 },
          { label: "TikTok", score: 20 },
          { label: "YouTube", score: 10 },
          { label: "MercadoLibre", score: 30 },
          { label: "Ninguna", score: 0 },
        ],
      },
      {
        tipo: "select", id: "contenido", label: "¿Quién genera el contenido?",
        area: "digital",
        opciones: [
          { label: "Agencia o especialista externo", score: 100 },
          { label: "Un empleado asignado a eso", score: 70 },
          { label: "Nosotros cuando podemos", score: 35 },
          { label: "Nadie, casi no publicamos", score: 0 },
        ],
      },
      {
        tipo: "select", id: "publicidad", label: "¿Hacen publicidad paga?",
        area: "captacion", express: true,
        opciones: [
          { label: "Sí, con seguimiento de resultados", score: 100 },
          { label: "Sí, pero sin medir bien", score: 50 },
          { label: "Probamos alguna vez", score: 25 },
          { label: "No pautamos", score: 0 },
        ],
      },
      {
        tipo: "select", id: "atribucion", label: "¿Saben de qué canal llega cada cliente?",
        area: "datos", express: true,
        opciones: [
          { label: "Sí, lo medimos", score: 100 },
          { label: "Tenemos una idea", score: 40 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "select", id: "gmb", label: "¿Tienen Google Maps / Perfil de Empresa actualizado?",
        area: "digital",
        opciones: [
          { label: "Sí, actualizado con fotos y horarios", score: 100 },
          { label: "Lo tenemos pero desactualizado", score: 40 },
          { label: "No lo tenemos", score: 0 },
          { label: "No sé qué es", score: 0 },
        ],
      },
      {
        tipo: "select", id: "publicar_nuevo", label: "¿Cuánto tardan en publicar un vehículo que acaba de ingresar?",
        area: "digital",
        opciones: [
          { label: "El mismo día", score: 100 },
          { label: "Dentro de la semana", score: 55 },
          { label: "Puede pasar más de una semana", score: 15 },
          { label: "No siempre se publican", score: 0 },
        ],
      },
    ],
  },

  {
    id: "atencion",
    nombre: "Atención al cliente",
    campos: [
      {
        tipo: "multi", id: "canales", label: "¿Por qué canales les escriben?",
        area: "captacion", express: true,
        opciones: [
          { label: "WhatsApp", score: 30 },
          { label: "Teléfono", score: 15 },
          { label: "Presencial", score: 15 },
          { label: "Instagram", score: 20 },
          { label: "Facebook", score: 10 },
          { label: "MercadoLibre", score: 20 },
          { label: "Email", score: 10 },
        ],
      },
      {
        tipo: "select", id: "tiempo_respuesta", label: "¿En cuánto tiempo responden en promedio?",
        area: "velocidad", express: true,
        opciones: [
          { label: "Menos de 5 minutos", score: 100 },
          { label: "Entre 5 y 30 minutos", score: 75 },
          { label: "Entre 30 minutos y una hora", score: 50 },
          { label: "Entre 1 y 3 horas", score: 25 },
          { label: "Más de 3 horas", score: 5 },
          { label: "Es muy variable", score: 20 },
        ],
      },
      {
        tipo: "select", id: "fuera_horario", label: "¿Responden fuera de horario y fines de semana?",
        area: "velocidad", express: true,
        opciones: [
          { label: "Sí, siempre", score: 100 },
          { label: "A veces, si alguien está", score: 45 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "select", id: "quien_responde", label: "¿Quién responde los mensajes?",
        area: "velocidad",
        opciones: [
          { label: "Una persona dedicada a eso", score: 90 },
          { label: "Cada vendedor los suyos", score: 45 },
          { label: "El dueño", score: 30 },
          { label: "El que puede en el momento", score: 15 },
        ],
      },
      {
        tipo: "select", id: "queja", label: "¿Algún cliente se quejó de que no le respondieron?",
        area: "velocidad",
        opciones: [
          { label: "No que sepamos", score: 100 },
          { label: "Alguna vez", score: 40 },
          { label: "Sí, pasa seguido", score: 0 },
        ],
      },
      {
        tipo: "select", id: "plantillas", label: "¿Tienen respuestas armadas o cada uno contesta como quiere?",
        area: "velocidad",
        opciones: [
          { label: "Tenemos plantillas para todo", score: 100 },
          { label: "Algunas cosas están armadas", score: 55 },
          { label: "Cada uno a su manera", score: 0 },
        ],
      },
      {
        tipo: "select", id: "postventa", label: "¿Contactan al cliente después de entregarle el vehículo?",
        area: "seguimiento",
        opciones: [
          { label: "Sí, con un plan de postventa", score: 100 },
          { label: "A veces, informalmente", score: 40 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "textarea", id: "preguntas_frecuentes",
        label: "¿Cuáles son las 3 preguntas que más les hacen los clientes?",
        placeholder: "Precio, si aceptan permuta, si tiene financiación…",
      },
    ],
  },

  {
    id: "stock",
    nombre: "Stock y números",
    campos: [
      {
        tipo: "select", id: "donde_stock", label: "¿Dónde está cargado el stock hoy?",
        area: "stock", express: true,
        opciones: [
          { label: "En un sistema que todos consultan", score: 100 },
          { label: "En una planilla compartida", score: 45 },
          { label: "En varias planillas distintas", score: 15 },
          { label: "En la cabeza de alguien", score: 0 },
        ],
      },
      {
        tipo: "select", id: "stock_viejo", label: "¿Podés saber qué vehículos llevan más de 60 días sin venderse?",
        area: "stock", express: true,
        opciones: [
          { label: "Sí, el sistema me avisa", score: 100 },
          { label: "Sí, mirando la planilla", score: 50 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "select", id: "auto_no_stock", label: "Cuando preguntan por un auto que no tenés, ¿queda registrado?",
        ayuda: "Esa demanda no atendida suele ser la fuga más silenciosa.",
        area: "stock",
        opciones: [
          { label: "Sí, y avisamos cuando entra uno similar", score: 100 },
          { label: "Se anota en algún lado", score: 40 },
          { label: "No queda registro", score: 0 },
        ],
      },
      {
        tipo: "select", id: "precios", label: "¿Los precios están iguales en todos los canales?",
        area: "stock",
        opciones: [
          { label: "Sí, se actualizan solos", score: 100 },
          { label: "Los actualizamos a mano en cada lugar", score: 45 },
          { label: "Suele haber diferencias", score: 0 },
        ],
      },
      {
        tipo: "select", id: "ganancia_unidad", label: "¿Sabés cuánto ganaste con cada vehículo vendido?",
        ayuda: "Contando compra, gastos, taller, comisión y documentación.",
        area: "datos", express: true,
        opciones: [
          { label: "Sí, con el número exacto", score: 100 },
          { label: "Aproximado", score: 45 },
          { label: "No lo calculamos así", score: 0 },
        ],
      },
      {
        tipo: "select", id: "cierre_mes", label: "¿Cuánto tardás en armar el cierre del mes?",
        area: "datos", express: true,
        opciones: [
          { label: "Sale automático", score: 100 },
          { label: "Un par de días", score: 45 },
          { label: "Una semana o más", score: 10 },
          { label: "No hacemos cierre formal", score: 0 },
        ],
      },
      {
        tipo: "select", id: "planillas", label: "¿Cuántas planillas de Excel distintas usan?",
        area: "datos",
        opciones: [
          { label: "Ninguna, todo en sistema", score: 100 },
          { label: "Una o dos", score: 55 },
          { label: "Tres o más", score: 10 },
          { label: "Perdí la cuenta", score: 0 },
        ],
      },
      {
        tipo: "select", id: "tablero", label: "¿Tenés un tablero para ver cómo va el mes sin pedirle datos a nadie?",
        area: "datos",
        opciones: [
          { label: "Sí, en tiempo real", score: 100 },
          { label: "Armo un informe cuando necesito", score: 40 },
          { label: "No", score: 0 },
        ],
      },
    ],
  },

  {
    id: "prioridades",
    nombre: "Prioridades",
    campos: [
      {
        tipo: "textarea", id: "dolor", label: "¿Cuál es el problema más grande que tienen hoy?",
        placeholder: "Contanos con tus palabras qué es lo que más te complica.",
        requerido: true, express: true,
      },
      {
        tipo: "textarea", id: "intentaron", label: "¿Qué intentaron para resolverlo?",
        placeholder: "Sistemas que probaron, gente que contrataron, cosas que no funcionaron…",
      },
      {
        tipo: "textarea", id: "una_cosa", label: "Si pudieras mejorar una sola cosa del negocio, ¿cuál sería?",
        placeholder: "",
        express: true,
      },
      {
        tipo: "select", id: "urgencia", label: "¿Para cuándo lo necesitás funcionando?",
        express: true,
        opciones: [
          { label: "Urgente, ya" },
          { label: "En 1 a 3 meses" },
          { label: "Sin apuro, estoy explorando" },
        ],
      },
    ],
  },
];

/* ─────────── Servicios ─────────── */

export type Servicio = {
  id: string;
  nombre: string;
  desc: string;
  /** devuelve motivos por los que se recomienda, según respuestas */
  motivos: (r: Record<string, unknown>) => string[];
};

const es = (r: Record<string, unknown>, id: string, ...vals: string[]) =>
  vals.includes(String(r[id] ?? ""));

const incluye = (r: Record<string, unknown>, id: string, val: string) =>
  Array.isArray(r[id]) && (r[id] as string[]).includes(val);

export const servicios: Servicio[] = [
  {
    id: "chatbot",
    nombre: "Asistente de WhatsApp con IA",
    desc: "Responde consultas 24/7, califica al cliente, consulta el stock y agenda el test-drive solo. Deriva al vendedor cuando hay intención real de compra.",
    motivos: (r) => {
      const m: string[] = [];
      if (es(r, "tiempo_respuesta", "Entre 1 y 3 horas", "Más de 3 horas", "Es muy variable"))
        m.push("Hoy tardan demasiado en responder");
      if (es(r, "fuera_horario", "No", "A veces, si alguien está"))
        m.push("Las consultas de fin de semana quedan sin responder");
      if (es(r, "venta_perdida", "Sí, varias veces", "Alguna vez"))
        m.push("Ya perdieron ventas por no contestar a tiempo");
      if (es(r, "queja", "Sí, pasa seguido", "Alguna vez"))
        m.push("Hubo clientes que se quejaron por falta de respuesta");
      if (es(r, "plantillas", "Cada uno a su manera"))
        m.push("Cada vendedor responde distinto, sin criterio común");
      return m;
    },
  },
  {
    id: "saas",
    nombre: "Sistema de gestión propio",
    desc: "Un panel donde viven stock, consultas, vendedores, financiaciones y comisiones. Con reportes que salen solos y datos que no se pierden.",
    motivos: (r) => {
      const m: string[] = [];
      if (es(r, "registro", "En una planilla de Excel", "En papel o cuaderno", "No las registramos"))
        m.push("Las consultas no viven en un sistema");
      if (es(r, "donde_stock", "En una planilla compartida", "En varias planillas distintas", "En la cabeza de alguien"))
        m.push("El stock está en planillas o en la memoria de alguien");
      if (es(r, "planillas", "Tres o más", "Perdí la cuenta"))
        m.push("Hay demasiadas planillas conviviendo");
      if (es(r, "cierre_mes", "Una semana o más", "No hacemos cierre formal"))
        m.push("El cierre de mes lleva demasiado tiempo");
      if (es(r, "ganancia_unidad", "Aproximado", "No lo calculamos así"))
        m.push("No se sabe con precisión la ganancia por vehículo");
      if (es(r, "vendedor_se_va", "Se pierden con su teléfono", "Hay que pedirle la información"))
        m.push("Si se va un vendedor, se van sus clientes");
      if (es(r, "tablero", "No", "Armo un informe cuando necesito"))
        m.push("No hay un tablero para ver el negocio en vivo");
      return m;
    },
  },
  {
    id: "web",
    nombre: "Sitio web con catálogo",
    desc: "Sitio propio rápido, con buscador de vehículos, ficha por unidad, simulador de cuota y formularios que entran directo al sistema.",
    motivos: (r) => {
      const m: string[] = [];
      if (es(r, "web", "No tenemos"))
        m.push("No tienen sitio web propio");
      if (es(r, "web", "Sí, pero básica o informativa"))
        m.push("La web actual no muestra el catálogo ni capta consultas");
      if (es(r, "gmb", "No lo tenemos", "No sé qué es", "Lo tenemos pero desactualizado"))
        m.push("La ficha de Google Maps está sin usar o desactualizada");
      if (es(r, "publicar_nuevo", "Puede pasar más de una semana", "No siempre se publican"))
        m.push("Los vehículos nuevos tardan en salir publicados");
      return m;
    },
  },
  {
    id: "ads",
    nombre: "Publicidad con seguimiento",
    desc: "Campañas en Meta y Google conectadas al sistema, para saber qué anuncio trajo qué consulta y qué consulta terminó en venta.",
    motivos: (r) => {
      const m: string[] = [];
      if (es(r, "publicidad", "No pautamos", "Probamos alguna vez"))
        m.push("Casi no invierten en publicidad");
      if (es(r, "publicidad", "Sí, pero sin medir bien"))
        m.push("Invierten en publicidad sin medir el retorno");
      if (es(r, "atribucion", "No", "Tenemos una idea"))
        m.push("No saben qué canal les trae los clientes que compran");
      return m;
    },
  },
  {
    id: "contenido",
    nombre: "Contenido y redes",
    desc: "Fotos, videos y publicaciones armadas desde el stock que hay que mover, no desde un calendario genérico.",
    motivos: (r) => {
      const m: string[] = [];
      if (es(r, "contenido", "Nadie, casi no publicamos", "Nosotros cuando podemos"))
        m.push("El contenido se hace sin una estrategia detrás");
      if (incluye(r, "redes", "Ninguna"))
        m.push("No tienen presencia activa en redes");
      if (es(r, "publicar_nuevo", "Puede pasar más de una semana", "No siempre se publican"))
        m.push("Hay vehículos en stock que nunca se promocionaron");
      return m;
    },
  },
];

/* ─────────── Utilidades ─────────── */

export const WHATSAPP = "59898169358";
export const CALENDAR_URL = "https://calendar.app.google/itbzQ1a5Bn24EeGH7";

export function camposDe(modo: "express" | "completo"): { seccion: Seccion; campos: Campo[] }[] {
  return secciones
    .map((s) => ({
      seccion: s,
      campos: modo === "express" ? s.campos.filter((c) => c.express) : s.campos,
    }))
    .filter((s) => s.campos.length > 0);
}

export function contarCampos(modo: "express" | "completo") {
  return camposDe(modo).reduce((n, s) => n + s.campos.length, 0);
}

function scoreDeCampo(campo: Campo, valor: unknown): number | null {
  if (campo.tipo === "select") {
    const op = campo.opciones.find((o) => o.label === valor);
    return op?.score ?? null;
  }
  if (campo.tipo === "multi") {
    if (!Array.isArray(valor) || valor.length === 0) return null;
    const suma = campo.opciones
      .filter((o) => (valor as string[]).includes(o.label))
      .reduce((s, o) => s + (o.score ?? 0), 0);
    return Math.min(100, suma);
  }
  return null;
}

export function calcular(respuestas: Record<string, unknown>) {
  const acumulado: Record<string, number[]> = {};
  for (const s of secciones) {
    for (const campo of s.campos) {
      const area = "area" in campo ? campo.area : undefined;
      if (!area) continue;
      const sc = scoreDeCampo(campo, respuestas[campo.id]);
      if (sc === null) continue;
      (acumulado[area] ||= []).push(sc);
    }
  }
  const porArea = AREAS.map((a) => {
    const vals = acumulado[a.id] ?? [];
    return {
      id: a.id,
      nombre: a.nombre,
      respondidas: vals.length,
      score: vals.length ? Math.round(vals.reduce((x, y) => x + y, 0) / vals.length) : 0,
    };
  });
  const conDatos = porArea.filter((a) => a.respondidas > 0);
  const total = conDatos.length
    ? Math.round(conDatos.reduce((s, a) => s + a.score, 0) / conDatos.length)
    : 0;
  const criticas = [...conDatos].sort((a, b) => a.score - b.score).slice(0, 3);
  return { porArea, total, criticas };
}

export function recomendar(respuestas: Record<string, unknown>) {
  return servicios
    .map((s) => ({ ...s, razones: s.motivos(respuestas) }))
    .filter((s) => s.razones.length > 0)
    .sort((a, b) => b.razones.length - a.razones.length);
}

/**
 * Aplana las respuestas a { area, pregunta, respuesta } para guardarlas
 * legibles en el SaaS. Ignora los campos que quedaron vacíos.
 */
export function detalleRespuestas(
  modo: "express" | "completo",
  respuestas: Record<string, unknown>
): { area: string; pregunta: string; respuesta: string }[] {
  const nombreArea = (id?: AreaId) =>
    id ? (AREAS.find((a) => a.id === id)?.nombre ?? "General") : "General";

  const filas: { area: string; pregunta: string; respuesta: string }[] = [];

  for (const { seccion, campos } of camposDe(modo)) {
    for (const campo of campos) {
      const v = respuestas[campo.id];
      const vacio =
        v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
      if (vacio) continue;

      filas.push({
        area: "area" in campo && campo.area ? nombreArea(campo.area) : seccion.nombre,
        pregunta: campo.label,
        respuesta: Array.isArray(v) ? v.join(", ") : String(v),
      });
    }
  }

  return filas;
}

export function interpretar(score: number) {
  if (score >= 75)
    return { titulo: "Operación ordenada", texto: "Tienen buena base. Lo que queda es automatizar y afinar lo que ya funciona." };
  if (score >= 55)
    return { titulo: "Bien encaminados", texto: "Hay sistema, pero todavía conviven partes manuales que les cuestan tiempo y ventas." };
  if (score >= 35)
    return { titulo: "Varias fugas abiertas", texto: "Buena parte de la operación depende de personas y planillas. Hay bastante para recuperar." };
  return { titulo: "Operación muy manual", texto: "Casi todo depende de memoria, WhatsApp y Excel. El margen de mejora es grande." };
}
