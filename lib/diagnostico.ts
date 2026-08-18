export type AreaId =
  | "captacion"
  | "velocidad"
  | "seguimiento"
  | "digital"
  | "stock"
  | "datos";

export const AREAS: { id: AreaId; nombre: string; corto: string }[] = [
  { id: "captacion", nombre: "Captación de clientes", corto: "Captación" },
  { id: "velocidad", nombre: "Velocidad de respuesta", corto: "Respuesta" },
  { id: "seguimiento", nombre: "Seguimiento y CRM", corto: "Seguimiento" },
  { id: "digital", nombre: "Presencia digital", corto: "Digital" },
  { id: "stock", nombre: "Stock y precios", corto: "Stock" },
  { id: "datos", nombre: "Datos y control", corto: "Datos" },
];

export type Opcion = { label: string; score?: number };

export type Campo =
  | { tipo: "texto"; id: string; label: string; ayuda?: string; placeholder?: string; requerido?: boolean; express?: boolean }
  | { tipo: "numero"; id: string; label: string; ayuda?: string; placeholder?: string; express?: boolean }
  | { tipo: "textarea"; id: string; label: string; ayuda?: string; placeholder?: string; requerido?: boolean; express?: boolean }
  | { tipo: "select"; id: string; label: string; ayuda?: string; area?: AreaId; express?: boolean; opciones: Opcion[] }
  | { tipo: "multi"; id: string; label: string; ayuda?: string; area?: AreaId; express?: boolean; opciones: Opcion[] };

export type Seccion = { id: string; nombre: string; intro?: string; campos: Campo[] };

/**
 * Recorrido Sandler:
 * motivo → situación → dolor → inacción → inversión → decisión → obstáculos → compromiso
 */
export const secciones: Seccion[] = [
  {
    id: "motivo",
    nombre: "Por qué estás acá",
    intro:
      "Antes de contarte nada sobre nosotros, queremos entender tu situación. Si al final vemos que no podemos ayudarte, te lo vamos a decir.",
    campos: [
      { tipo: "texto", id: "empresa", label: "Nombre de la automotora", placeholder: "Auto Sur", requerido: true, express: true },
      { tipo: "texto", id: "contacto", label: "Tu nombre", placeholder: "Marcos", requerido: true, express: true },
      { tipo: "texto", id: "telefono", label: "WhatsApp", placeholder: "099 123 456", express: true },
      { tipo: "texto", id: "ciudad", label: "Ciudad", placeholder: "Salto", express: true },
      { tipo: "numero", id: "vendedores", label: "¿Cuántos vendedores trabajan?", placeholder: "4", express: true },
      {
        tipo: "textarea", id: "motivo", requerido: true, express: true,
        label: "¿Qué te hizo querer hacer este diagnóstico justo ahora?",
        ayuda: "Contanos con tus palabras. No hay respuesta correcta.",
        placeholder: "Sentimos que se nos escapan consultas y no sabemos bien por dónde…",
      },
    ],
  },

  {
    id: "situacion",
    nombre: "Cómo trabajan hoy",
    intro: "Preguntas concretas sobre la operación. De acá sale el puntaje por área.",
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
      {
        tipo: "select", id: "tiempo_respuesta", label: "¿En cuánto tiempo responden una consulta nueva?",
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
        tipo: "select", id: "seguimiento_no_compra", label: "¿Hacen seguimiento a quien consulta y no compra?",
        area: "seguimiento", express: true,
        opciones: [
          { label: "Sí, con recordatorios automáticos", score: 100 },
          { label: "Sí, pero manual y si se acuerdan", score: 45 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "select", id: "donde_stock", label: "¿Dónde está cargado el stock?",
        area: "stock", express: true,
        opciones: [
          { label: "En un sistema que todos consultan", score: 100 },
          { label: "En una planilla compartida", score: 45 },
          { label: "En varias planillas distintas", score: 15 },
          { label: "En la cabeza de alguien", score: 0 },
        ],
      },
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
        tipo: "select", id: "atribucion", label: "¿Saben de qué canal llega cada cliente que compra?",
        area: "datos", express: true,
        opciones: [
          { label: "Sí, lo medimos", score: 100 },
          { label: "Tenemos una idea", score: 40 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "select", id: "ganancia_unidad", label: "¿Saben cuánto ganaron con cada vehículo vendido?",
        ayuda: "Contando compra, gastos, taller, comisión y documentación.",
        area: "datos", express: true,
        opciones: [
          { label: "Sí, con el número exacto", score: 100 },
          { label: "Aproximado", score: 45 },
          { label: "No lo calculamos así", score: 0 },
        ],
      },
      {
        tipo: "multi", id: "redes", label: "¿En qué canales están activos?",
        area: "digital", express: true,
        opciones: [
          { label: "Instagram", score: 35 },
          { label: "Facebook", score: 25 },
          { label: "TikTok", score: 20 },
          { label: "MercadoLibre", score: 30 },
          { label: "YouTube", score: 10 },
          { label: "Ninguno", score: 0 },
        ],
      },
      {
        tipo: "select", id: "publicidad", label: "¿Hacen publicidad paga?",
        area: "captacion",
        opciones: [
          { label: "Sí, con seguimiento de resultados", score: 100 },
          { label: "Sí, pero sin medir bien", score: 50 },
          { label: "Probamos alguna vez", score: 25 },
          { label: "No pautamos", score: 0 },
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
        tipo: "select", id: "stock_viejo", label: "¿Pueden saber qué vehículos llevan más de 60 días sin venderse?",
        area: "stock",
        opciones: [
          { label: "Sí, el sistema avisa", score: 100 },
          { label: "Sí, mirando la planilla", score: 50 },
          { label: "No", score: 0 },
        ],
      },
      {
        tipo: "select", id: "auto_no_stock", label: "Cuando preguntan por un auto que no tienen, ¿queda registrado?",
        area: "stock",
        opciones: [
          { label: "Sí, y avisamos cuando entra uno similar", score: 100 },
          { label: "Se anota en algún lado", score: 40 },
          { label: "No queda registro", score: 0 },
        ],
      },
      {
        tipo: "select", id: "cierre_mes", label: "¿Cuánto tardan en armar el cierre del mes?",
        area: "datos",
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
        tipo: "select", id: "gmb", label: "¿Tienen Google Maps actualizado?",
        area: "digital",
        opciones: [
          { label: "Sí, con fotos y horarios al día", score: 100 },
          { label: "Lo tenemos pero desactualizado", score: 40 },
          { label: "No lo tenemos", score: 0 },
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
    ],
  },

  {
    id: "dolor",
    nombre: "El problema",
    intro: "Acá queremos entender de verdad qué está pasando, no vender nada.",
    campos: [
      {
        tipo: "textarea", id: "dolor_principal", requerido: true, express: true,
        label: "De todo lo anterior, ¿qué es lo que más te preocupa?",
        placeholder: "Contá el problema como se lo contarías a un socio.",
      },
      {
        tipo: "textarea", id: "dolor_ejemplo", express: true,
        label: "Dame un ejemplo concreto de la última vez que pasó",
        ayuda: "Un caso puntual dice más que una descripción general.",
        placeholder: "La semana pasada un cliente preguntó por una Hilux un sábado y…",
      },
      {
        tipo: "select", id: "dolor_tiempo", label: "¿Desde cuándo viene pasando?",
        express: true,
        opciones: [
          { label: "Hace menos de 6 meses" },
          { label: "Entre 6 meses y un año" },
          { label: "Entre uno y tres años" },
          { label: "Desde siempre, es como trabajamos" },
        ],
      },
      {
        tipo: "textarea", id: "dolor_intentos",
        label: "¿Qué intentaron para resolverlo?",
        placeholder: "Sistemas que probaron, gente que contrataron, cosas que quedaron por la mitad…",
      },
      {
        tipo: "select", id: "dolor_funciono", label: "¿Funcionó?",
        opciones: [
          { label: "Sí, bastante" },
          { label: "Un poco, pero no alcanzó" },
          { label: "No" },
          { label: "Todavía no probamos nada" },
        ],
      },
      {
        tipo: "select", id: "dolor_costo", express: true,
        label: "¿Cuánto creés que les está costando por mes?",
        ayuda: "En ventas que no se cerraron, tiempo perdido o stock parado. Un número aproximado alcanza.",
        opciones: [
          { label: "Menos de USD 1.000" },
          { label: "Entre USD 1.000 y 5.000" },
          { label: "Entre USD 5.000 y 15.000" },
          { label: "Más de USD 15.000" },
          { label: "No tengo idea, y eso también me preocupa" },
        ],
      },
    ],
  },

  {
    id: "inaccion",
    nombre: "Si nada cambia",
    campos: [
      {
        tipo: "select", id: "inaccion_12m", express: true,
        label: "Si dentro de 12 meses esto sigue exactamente igual, ¿qué pasa?",
        opciones: [
          { label: "Nos arreglamos, no es grave" },
          { label: "Perdemos terreno frente a la competencia" },
          { label: "Se nos complica bastante el negocio" },
          { label: "Es insostenible" },
        ],
      },
      {
        tipo: "select", id: "prioridad", express: true,
        label: "¿Qué prioridad tiene resolverlo?",
        opciones: [
          { label: "Es lo más importante que tengo ahora" },
          { label: "Está entre las tres prioridades" },
          { label: "Importa, pero hay cosas más urgentes" },
          { label: "Estoy explorando nomás" },
        ],
      },
    ],
  },

  {
    id: "inversion",
    nombre: "Inversión y recursos",
    intro: "Preferimos hablar esto ahora y no después de hacerte perder una hora.",
    campos: [
      {
        tipo: "select", id: "presupuesto", express: true,
        label: "¿Tienen prevista alguna inversión para resolverlo?",
        opciones: [
          { label: "Sí, ya tenemos un monto pensado" },
          { label: "No definido, pero hay disposición" },
          { label: "Depende de lo que se justifique" },
          { label: "No hay presupuesto por ahora" },
        ],
      },
      {
        tipo: "select", id: "como_definen",
        label: "¿Cómo definen cuánto invertir en algo así?",
        opciones: [
          { label: "Por el retorno que pueda generar" },
          { label: "Por lo que podemos pagar por mes" },
          { label: "Comparando presupuestos" },
          { label: "Nunca invertimos en esto, sería la primera vez" },
        ],
      },
      {
        tipo: "multi", id: "recursos", express: true,
        label: "Además de la plata, ¿qué puede poner el equipo?",
        ayuda: "Un sistema que nadie usa no cambia nada. Esto importa tanto como el presupuesto.",
        opciones: [
          { label: "Tiempo para capacitarse" },
          { label: "Una persona que lidere el cambio" },
          { label: "Datos ordenados para migrar" },
          { label: "Decisión firme de la dirección" },
          { label: "Poco, estamos a full" },
        ],
      },
    ],
  },

  {
    id: "decision",
    nombre: "Cómo deciden",
    campos: [
      {
        tipo: "select", id: "quien_decide", express: true,
        label: "¿Quién participa en una decisión como esta?",
        opciones: [
          { label: "Yo solo, decido y avanzo" },
          { label: "Yo con un socio" },
          { label: "Lo decide la dirección o el directorio" },
          { label: "Tengo que consultarlo con un tercero" },
        ],
      },
      {
        tipo: "multi", id: "criterios",
        label: "¿Qué van a mirar para decidir?",
        opciones: [
          { label: "El precio" },
          { label: "El retorno esperado" },
          { label: "Que sea fácil de usar" },
          { label: "El soporte y acompañamiento" },
          { label: "Casos de otras automotoras" },
          { label: "El plazo de implementación" },
        ],
      },
      {
        tipo: "multi", id: "obstaculos", express: true,
        label: "¿Qué podría hacer que finalmente decidan no avanzar?",
        ayuda: "Preferimos saberlo ahora. Si algo no tiene solución, te lo decimos de entrada.",
        opciones: [
          { label: "Que salga más de lo que podemos" },
          { label: "Que ya tengamos algo parecido andando" },
          { label: "Que el equipo no lo adopte" },
          { label: "Que no estemos seguros de que funcione" },
          { label: "Que no sea el momento" },
          { label: "Que dependa de otra persona que no está convencida" },
          { label: "No veo obstáculos" },
        ],
      },
      {
        tipo: "select", id: "plazo", express: true,
        label: "¿Para cuándo necesitarían tenerlo funcionando?",
        opciones: [
          { label: "Lo antes posible" },
          { label: "En uno a tres meses" },
          { label: "Este año" },
          { label: "Sin fecha, estoy viendo" },
        ],
      },
    ],
  },

  {
    id: "compromiso",
    nombre: "Para no hacernos perder tiempo",
    campos: [
      {
        tipo: "select", id: "compromiso", express: true,
        label:
          "Si te presentamos algo que resuelve exactamente lo que marcaste, entra en la inversión que manejás y se implementa en tu plazo, ¿estarías en condiciones de darnos un sí o un no?",
        ayuda: "Un no también nos sirve. Lo que no nos sirve a ninguno de los dos es un quizás eterno.",
        opciones: [
          { label: "Sí, podría decidir" },
          { label: "Sí, pero necesito sumar a alguien más" },
          { label: "No, primero necesito ver otras opciones" },
          { label: "No, todavía estoy muy lejos de decidir" },
        ],
      },
    ],
  },
];

/* ─────────── Objeciones (respuesta estilo Sandler) ─────────── */

export const objeciones: Record<string, { titulo: string; respuesta: string }> = {
  "Que salga más de lo que podemos": {
    titulo: "Si el número no cierra",
    respuesta:
      "Puede pasar. Antes de hablar de precio queremos saber cuánto te está costando el problema hoy. Si lo que perdés por mes es menor a lo que cuesta resolverlo, te lo decimos y no avanzamos. No trabajamos con paquetes fijos: se arma según lo que el diagnóstico marque como prioritario.",
  },
  "Que ya tengamos algo parecido andando": {
    titulo: "Si ya tienen un sistema",
    respuesta:
      "Es muy posible que no necesiten cambiarlo. La pregunta que nos interesa es otra: de todo lo que marcaste como problema, ¿qué parte resuelve hoy el sistema que ya tienen? Si lo resuelve casi todo, te conviene quedarte donde estás y te lo vamos a decir.",
  },
  "Que el equipo no lo adopte": {
    titulo: "Si el equipo no lo usa",
    respuesta:
      "Es la razón número uno por la que estos proyectos fracasan, y tenés razón en marcarlo. Por eso la puesta en marcha es una fase entera del trabajo, no un manual que dejamos y nos vamos. Si el equipo no lo va a usar, el proyecto no sirve y preferimos no empezarlo.",
  },
  "Que no estemos seguros de que funcione": {
    titulo: "Si no están seguros",
    respuesta:
      "Razonable, somos nuevos y no tenemos casos publicados todavía. Por eso trabajamos por etapas: cada dos semanas ves una versión real andando y decidís si seguimos. Si en el primer hito no ves valor, cortamos ahí.",
  },
  "Que no sea el momento": {
    titulo: "Si no es el momento",
    respuesta:
      "Puede que no lo sea. La pregunta útil es qué cambia si esperamos seis meses más: si el costo de seguir igual es bajo, esperar es la decisión correcta. Si el problema se agrava, esperar sale más caro que empezar.",
  },
  "Que dependa de otra persona que no está convencida": {
    titulo: "Si depende de alguien más",
    respuesta:
      "Mejor sumarlo desde el principio. Podemos hacer la reunión con esa persona presente y que escuche el diagnóstico de primera mano, en vez de que se lo cuentes vos de segunda. Suele ahorrar semanas.",
  },
};

/* ─────────── Servicios ─────────── */

export type Servicio = {
  id: string;
  nombre: string;
  desc: string;
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
    desc: "Responde 24/7, califica al cliente, consulta el stock y agenda el test-drive solo. Deriva al vendedor cuando hay intención real.",
    motivos: (r) => {
      const m: string[] = [];
      if (es(r, "tiempo_respuesta", "Entre 1 y 3 horas", "Más de 3 horas", "Es muy variable")) m.push("Hoy tardan demasiado en responder");
      if (es(r, "fuera_horario", "No", "A veces, si alguien está")) m.push("Las consultas de fin de semana quedan sin responder");
      if (es(r, "queja", "Sí, pasa seguido", "Alguna vez")) m.push("Hubo clientes que se quejaron por falta de respuesta");
      return m;
    },
  },
  {
    id: "saas",
    nombre: "Sistema de gestión propio",
    desc: "Stock, consultas, vendedores, financiaciones y comisiones en un panel. Reportes que salen solos y datos que no se pierden.",
    motivos: (r) => {
      const m: string[] = [];
      if (es(r, "registro", "En una planilla de Excel", "En papel o cuaderno", "No las registramos")) m.push("Las consultas no viven en un sistema");
      if (es(r, "donde_stock", "En una planilla compartida", "En varias planillas distintas", "En la cabeza de alguien")) m.push("El stock está en planillas o en la memoria de alguien");
      if (es(r, "planillas", "Tres o más", "Perdí la cuenta")) m.push("Hay demasiadas planillas conviviendo");
      if (es(r, "cierre_mes", "Una semana o más", "No hacemos cierre formal")) m.push("El cierre de mes lleva demasiado tiempo");
      if (es(r, "ganancia_unidad", "Aproximado", "No lo calculamos así")) m.push("No se sabe con precisión la ganancia por vehículo");
      if (es(r, "vendedor_se_va", "Se pierden con su teléfono", "Hay que pedirle la información")) m.push("Si se va un vendedor, se van sus clientes");
      if (es(r, "seguimiento_no_compra", "No", "Sí, pero manual y si se acuerdan")) m.push("El seguimiento depende de que alguien se acuerde");
      return m;
    },
  },
  {
    id: "web",
    nombre: "Sitio web con catálogo",
    desc: "Sitio propio rápido, con buscador de vehículos, ficha por unidad y formularios que entran directo al sistema.",
    motivos: (r) => {
      const m: string[] = [];
      if (es(r, "web", "No tenemos")) m.push("No tienen sitio web propio");
      if (es(r, "web", "Sí, pero básica o informativa")) m.push("La web actual no muestra catálogo ni capta consultas");
      if (es(r, "gmb", "No lo tenemos", "Lo tenemos pero desactualizado")) m.push("La ficha de Google Maps está sin usar o desactualizada");
      return m;
    },
  },
  {
    id: "ads",
    nombre: "Publicidad con seguimiento",
    desc: "Campañas en Meta y Google conectadas al sistema: qué anuncio trajo qué consulta y qué consulta terminó en venta.",
    motivos: (r) => {
      const m: string[] = [];
      if (es(r, "publicidad", "No pautamos", "Probamos alguna vez")) m.push("Casi no invierten en publicidad");
      if (es(r, "publicidad", "Sí, pero sin medir bien")) m.push("Invierten sin medir el retorno");
      if (es(r, "atribucion", "No", "Tenemos una idea")) m.push("No saben qué canal trae los clientes que compran");
      return m;
    },
  },
  {
    id: "contenido",
    nombre: "Contenido y redes",
    desc: "Fotos, videos y publicaciones armadas desde el stock que hay que mover, no desde un calendario genérico.",
    motivos: (r) => {
      const m: string[] = [];
      if (incluye(r, "redes", "Ninguno")) m.push("No tienen presencia activa en redes");
      if (es(r, "auto_no_stock", "No queda registro")) m.push("La demanda de autos que no tienen se pierde");
      if (es(r, "stock_viejo", "No")) m.push("No saben qué stock hay que mover con urgencia");
      return m;
    },
  },
];

/* ─────────── Utilidades ─────────── */

export const WHATSAPP = "59898169358";
export const CALENDAR_URL = "https://calendar.app.google/itbzQ1a5Bn24EeGH7";

export function camposDe(modo: "express" | "completo"): { seccion: Seccion; campos: Campo[] }[] {
  return secciones
    .map((s) => ({ seccion: s, campos: modo === "express" ? s.campos.filter((c) => c.express) : s.campos }))
    .filter((s) => s.campos.length > 0);
}

export function contarCampos(modo: "express" | "completo") {
  return camposDe(modo).reduce((n, s) => n + s.campos.length, 0);
}

function scoreDeCampo(campo: Campo, valor: unknown): number | null {
  if (campo.tipo === "select") return campo.opciones.find((o) => o.label === valor)?.score ?? null;
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
  const acum: Record<string, number[]> = {};
  for (const s of secciones) {
    for (const campo of s.campos) {
      const area = "area" in campo ? campo.area : undefined;
      if (!area) continue;
      const sc = scoreDeCampo(campo, respuestas[campo.id]);
      if (sc === null) continue;
      (acum[area] ||= []).push(sc);
    }
  }
  const porArea = AREAS.map((a) => {
    const vals = acum[a.id] ?? [];
    return {
      id: a.id, nombre: a.nombre, corto: a.corto, respondidas: vals.length,
      score: vals.length ? Math.round(vals.reduce((x, y) => x + y, 0) / vals.length) : 0,
    };
  });
  const conDatos = porArea.filter((a) => a.respondidas > 0);
  const total = conDatos.length ? Math.round(conDatos.reduce((s, a) => s + a.score, 0) / conDatos.length) : 0;
  const criticas = [...conDatos].sort((a, b) => a.score - b.score).slice(0, 3);
  return { porArea, total, criticas };
}

export function recomendar(respuestas: Record<string, unknown>) {
  return servicios
    .map((s) => ({ ...s, razones: s.motivos(respuestas) }))
    .filter((s) => s.razones.length > 0)
    .sort((a, b) => b.razones.length - a.razones.length);
}

export function objecionesDe(respuestas: Record<string, unknown>) {
  const sel = Array.isArray(respuestas.obstaculos) ? (respuestas.obstaculos as string[]) : [];
  return sel.map((k) => objeciones[k]).filter(Boolean);
}

export function detalleRespuestas(
  modo: "express" | "completo",
  respuestas: Record<string, unknown>
): { area: string; pregunta: string; respuesta: string }[] {
  const nombreArea = (id?: AreaId) => (id ? AREAS.find((a) => a.id === id)?.nombre ?? "General" : "General");
  const filas: { area: string; pregunta: string; respuesta: string }[] = [];
  for (const { seccion, campos } of camposDe(modo)) {
    for (const campo of campos) {
      const v = respuestas[campo.id];
      if (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0)) continue;
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
  if (score >= 75) return { titulo: "Operación ordenada", texto: "Tienen buena base. Lo que queda es automatizar y afinar lo que ya funciona." };
  if (score >= 55) return { titulo: "Bien encaminados", texto: "Hay sistema, pero conviven partes manuales que cuestan tiempo y ventas." };
  if (score >= 35) return { titulo: "Varias fugas abiertas", texto: "Buena parte de la operación depende de personas y planillas. Hay bastante para recuperar." };
  return { titulo: "Operación muy manual", texto: "Casi todo depende de memoria, WhatsApp y Excel. El margen de mejora es grande." };
}

/** Señal de calificación interna (Sandler): dolor + presupuesto + decisión + compromiso */
export function calificacion(r: Record<string, unknown>) {
  let p = 0;
  if (es(r, "inaccion_12m", "Es insostenible", "Se nos complica bastante el negocio")) p += 25;
  else if (es(r, "inaccion_12m", "Perdemos terreno frente a la competencia")) p += 15;
  if (es(r, "prioridad", "Es lo más importante que tengo ahora")) p += 25;
  else if (es(r, "prioridad", "Está entre las tres prioridades")) p += 15;
  if (es(r, "presupuesto", "Sí, ya tenemos un monto pensado")) p += 25;
  else if (es(r, "presupuesto", "No definido, pero hay disposición", "Depende de lo que se justifique")) p += 15;
  if (es(r, "compromiso", "Sí, podría decidir")) p += 25;
  else if (es(r, "compromiso", "Sí, pero necesito sumar a alguien más")) p += 15;
  return p;
}
