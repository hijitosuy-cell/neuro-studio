export type Opcion = { label: string; score: number };
export type Pregunta = {
  id: string;
  q: string;
  help?: string;
  express?: boolean;
  opciones: Opcion[];
};
export type Area = {
  id: string;
  nombre: string;
  descripcion: string;
  preguntas: Pregunta[];
};

/** Escalas reutilizables */
const SI_NO: Opcion[] = [
  { label: "Sí, siempre", score: 100 },
  { label: "A veces", score: 50 },
  { label: "No", score: 0 },
];

const MADUREZ: Opcion[] = [
  { label: "Sí, con un sistema", score: 100 },
  { label: "Sí, pero manual o en planillas", score: 50 },
  { label: "No lo tenemos", score: 0 },
];

export const areas: Area[] = [
  {
    id: "captacion",
    nombre: "Captación de leads",
    descripcion: "De dónde llegan tus clientes y si sabés cuál canal te vende.",
    preguntas: [
      {
        id: "cap1",
        express: true,
        q: "¿Sabés de qué canal viene cada consulta que recibís?",
        help: "WhatsApp, Instagram, MercadoLibre, web, salón, referidos.",
        opciones: MADUREZ,
      },
      {
        id: "cap2",
        q: "¿Todas las consultas entran a un mismo lugar o cada vendedor recibe las suyas?",
        opciones: [
          { label: "Todo entra a un sistema central", score: 100 },
          { label: "Un número único pero se reparte a mano", score: 50 },
          { label: "Cada vendedor tiene su propio número", score: 0 },
        ],
      },
      {
        id: "cap3",
        q: "¿Sabés cuántas consultas recibiste el mes pasado?",
        opciones: [
          { label: "Sí, con el número exacto", score: 100 },
          { label: "Más o menos, estimado", score: 40 },
          { label: "No tengo idea", score: 0 },
        ],
      },
      {
        id: "cap4",
        q: "¿Sabés qué canal genera más ventas reales, no solo más consultas?",
        opciones: MADUREZ,
      },
      {
        id: "cap5",
        q: "¿Cuántas consultas te llegan fuera del horario de atención?",
        opciones: [
          { label: "Las medimos y se responden igual", score: 100 },
          { label: "Llegan pero se contestan al otro día", score: 40 },
          { label: "No sabemos cuántas son", score: 0 },
        ],
      },
    ],
  },
  {
    id: "velocidad",
    nombre: "Velocidad de respuesta",
    descripcion: "Cuánto tardás en contestar. Acá se pierden más ventas que en ningún lado.",
    preguntas: [
      {
        id: "vel1",
        express: true,
        q: "¿Cuánto tarda tu equipo en responder una consulta nueva?",
        opciones: [
          { label: "Menos de 5 minutos", score: 100 },
          { label: "Entre 5 y 60 minutos", score: 60 },
          { label: "Algunas horas", score: 25 },
          { label: "Al otro día o más", score: 0 },
        ],
      },
      {
        id: "vel2",
        q: "¿Hay un tiempo máximo de respuesta acordado con el equipo?",
        opciones: SI_NO,
      },
      {
        id: "vel3",
        q: "¿Qué pasa si el vendedor asignado no responde?",
        opciones: [
          { label: "El sistema lo reasigna automáticamente", score: 100 },
          { label: "Alguien lo nota y lo reasigna a mano", score: 45 },
          { label: "Queda sin responder", score: 0 },
        ],
      },
      {
        id: "vel4",
        q: "¿Se responden las consultas de fines de semana y feriados?",
        opciones: [
          { label: "Sí, automáticamente", score: 100 },
          { label: "Algunos vendedores contestan por su cuenta", score: 45 },
          { label: "No, esperan al lunes", score: 0 },
        ],
      },
      {
        id: "vel5",
        q: "¿Podés ver cuántos leads quedaron sin contestar esta semana?",
        opciones: MADUREZ,
      },
    ],
  },
  {
    id: "vendedores",
    nombre: "Gestión de vendedores",
    descripcion: "Si podés ver qué hace cada vendedor y quién convierte mejor.",
    preguntas: [
      {
        id: "ven1",
        express: true,
        q: "¿Podés ver cuántos leads activos tiene cada vendedor ahora mismo?",
        opciones: MADUREZ,
      },
      {
        id: "ven2",
        q: "¿Sabés qué vendedor convierte mejor y cuál responde más rápido?",
        opciones: MADUREZ,
      },
      {
        id: "ven3",
        q: "Si un vendedor se va o falta, ¿qué pasa con sus clientes?",
        opciones: [
          { label: "Están en el sistema, los toma otro", score: 100 },
          { label: "Hay que pedirle la información", score: 35 },
          { label: "Se pierden con su teléfono", score: 0 },
        ],
      },
      {
        id: "ven4",
        q: "¿Las comisiones se calculan automáticamente?",
        opciones: MADUREZ,
      },
      {
        id: "ven5",
        q: "¿Hay algún ranking o meta visible para el equipo comercial?",
        opciones: SI_NO,
      },
    ],
  },
  {
    id: "stock",
    nombre: "Control de stock",
    descripcion: "Si sabés qué tenés, hace cuánto y cuánto te está costando tenerlo parado.",
    preguntas: [
      {
        id: "sto1",
        express: true,
        q: "¿Dónde vive tu stock hoy?",
        opciones: [
          { label: "En un sistema que todos consultan", score: 100 },
          { label: "En una planilla compartida", score: 40 },
          { label: "En varias planillas o en la cabeza de alguien", score: 0 },
        ],
      },
      {
        id: "sto2",
        q: "¿Podés saber qué vehículos llevan más de 60 días sin venderse?",
        opciones: MADUREZ,
      },
      {
        id: "sto3",
        q: "Cuando alguien pregunta por un auto que no tenés, ¿queda registrado?",
        help: "Esa demanda no atendida es plata que se va a la competencia.",
        opciones: MADUREZ,
      },
      {
        id: "sto4",
        q: "¿Los precios están actualizados en todos los canales al mismo tiempo?",
        opciones: [
          { label: "Sí, se actualizan solos", score: 100 },
          { label: "Se actualizan a mano en cada lugar", score: 40 },
          { label: "Suele haber diferencias", score: 0 },
        ],
      },
      {
        id: "sto5",
        q: "¿Sabés cuánto tiempo promedio tarda en venderse cada modelo?",
        opciones: MADUREZ,
      },
    ],
  },
  {
    id: "marketing",
    nombre: "Marketing",
    descripcion: "Si tu inversión en publicidad se puede rastrear hasta la venta.",
    preguntas: [
      {
        id: "mkt1",
        express: true,
        q: "¿Sabés qué campaña de publicidad generó qué venta?",
        opciones: MADUREZ,
      },
      {
        id: "mkt2",
        q: "¿Quién decide qué vehículos se publican y con qué criterio?",
        opciones: [
          { label: "Según qué stock hay que mover", score: 100 },
          { label: "Según lo que parece más lindo", score: 35 },
          { label: "No hay criterio definido", score: 0 },
        ],
      },
      {
        id: "mkt3",
        q: "¿Cuánto tardás en publicar un vehículo que acaba de ingresar?",
        opciones: [
          { label: "El mismo día", score: 100 },
          { label: "Dentro de la semana", score: 50 },
          { label: "Puede pasar más de una semana", score: 0 },
        ],
      },
      {
        id: "mkt4",
        q: "¿Hay vehículos en tu stock que nunca se promocionaron?",
        opciones: [
          { label: "No, todos tienen contenido", score: 100 },
          { label: "Algunos sí", score: 40 },
          { label: "Muchos", score: 0 },
        ],
      },
      {
        id: "mkt5",
        q: "¿Sabés cuánto te cuesta conseguir un lead?",
        opciones: MADUREZ,
      },
    ],
  },
  {
    id: "rentabilidad",
    nombre: "Rentabilidad",
    descripcion: "Si sabés cuánto ganás de verdad por auto, marca y vendedor.",
    preguntas: [
      {
        id: "ren1",
        express: true,
        q: "¿Sabés exactamente cuánto ganaste con cada vehículo vendido?",
        help: "Costo de compra, gastos, taller, comisión, documentación.",
        opciones: MADUREZ,
      },
      {
        id: "ren2",
        q: "¿Podés ver la ganancia por marca o por modelo?",
        opciones: MADUREZ,
      },
      {
        id: "ren3",
        q: "¿Sabés qué vendedor te deja más margen, no solo más ventas?",
        opciones: MADUREZ,
      },
      {
        id: "ren4",
        q: "¿Los gastos de taller y preparación se cargan a cada unidad?",
        opciones: MADUREZ,
      },
      {
        id: "ren5",
        q: "¿Podés saber si un vehículo te dio pérdida antes de que sea tarde?",
        opciones: SI_NO,
      },
    ],
  },
  {
    id: "datos",
    nombre: "Datos y reportes",
    descripcion: "Cuánto tiempo perdés armando información que debería salir sola.",
    preguntas: [
      {
        id: "dat1",
        express: true,
        q: "¿Cuánto tardás en armar el cierre del mes?",
        opciones: [
          { label: "Sale automático", score: 100 },
          { label: "Un par de días", score: 45 },
          { label: "Una semana o más", score: 0 },
        ],
      },
      {
        id: "dat2",
        q: "¿Cuántas planillas de Excel distintas usan en la operación?",
        opciones: [
          { label: "Ninguna, todo en sistema", score: 100 },
          { label: "Una o dos", score: 55 },
          { label: "Más de tres", score: 0 },
        ],
      },
      {
        id: "dat3",
        q: "¿La misma información se carga más de una vez en lugares distintos?",
        opciones: [
          { label: "No, se carga una sola vez", score: 100 },
          { label: "A veces", score: 40 },
          { label: "Sí, seguido", score: 0 },
        ],
      },
      {
        id: "dat4",
        q: "¿Podés ver cómo va el mes sin pedirle datos a nadie?",
        opciones: MADUREZ,
      },
      {
        id: "dat5",
        q: "¿Aparecen diferencias entre lo que dice un sistema y otro?",
        opciones: [
          { label: "Nunca", score: 100 },
          { label: "De vez en cuando", score: 40 },
          { label: "Seguido", score: 0 },
        ],
      },
    ],
  },
  {
    id: "atencion",
    nombre: "Atención al cliente",
    descripcion: "Qué pasa desde que consultan hasta después de que compran.",
    preguntas: [
      {
        id: "ate1",
        express: true,
        q: "¿Se hace seguimiento al cliente que consultó y no compró?",
        opciones: [
          { label: "Sí, con recordatorios automáticos", score: 100 },
          { label: "Si el vendedor se acuerda", score: 35 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "ate2",
        q: "¿Se confirma la visita o el test-drive antes de que llegue?",
        opciones: MADUREZ,
      },
      {
        id: "ate3",
        q: "¿Contactan al cliente después de entregarle el vehículo?",
        opciones: SI_NO,
      },
      {
        id: "ate4",
        q: "¿Piden referidos o reseñas de forma sistemática?",
        opciones: SI_NO,
      },
      {
        id: "ate5",
        q: "¿Los reclamos quedan registrados en algún lado?",
        opciones: MADUREZ,
      },
    ],
  },
  {
    id: "automatizacion",
    nombre: "Automatización",
    descripcion: "Cuánto trabajo repetitivo hace tu equipo que podría hacer solo el sistema.",
    preguntas: [
      {
        id: "aut1",
        express: true,
        q: "¿Tenés alguna respuesta automática cuando entra una consulta?",
        opciones: [
          { label: "Sí, y además califica al cliente", score: 100 },
          { label: "Un mensaje automático simple", score: 45 },
          { label: "No, todo manual", score: 0 },
        ],
      },
      {
        id: "aut2",
        q: "¿Los turnos y test-drives se agendan solos o los coordina alguien?",
        opciones: [
          { label: "Se agendan solos en el calendario", score: 100 },
          { label: "Los coordina una persona", score: 30 },
          { label: "No hay agenda formal", score: 0 },
        ],
      },
      {
        id: "aut3",
        q: "¿Cuántas horas por semana se van en tareas repetitivas?",
        opciones: [
          { label: "Casi ninguna", score: 100 },
          { label: "Algunas horas", score: 50 },
          { label: "Muchísimas", score: 0 },
        ],
      },
      {
        id: "aut4",
        q: "¿Los recordatorios a clientes salen automáticamente?",
        opciones: MADUREZ,
      },
      {
        id: "aut5",
        q: "¿La publicación en portales y redes es manual?",
        opciones: [
          { label: "Automática desde el stock", score: 100 },
          { label: "Semi-automática", score: 50 },
          { label: "Todo a mano, uno por uno", score: 0 },
        ],
      },
    ],
  },
  {
    id: "direccion",
    nombre: "Dirección",
    descripcion: "Si tenés la información para decidir sin depender de que alguien te la arme.",
    preguntas: [
      {
        id: "dir1",
        express: true,
        q: "¿Tenés un tablero donde ver cómo va el negocio en tiempo real?",
        opciones: MADUREZ,
      },
      {
        id: "dir2",
        q: "¿Podés comparar este mes contra el mismo mes del año pasado?",
        opciones: MADUREZ,
      },
      {
        id: "dir3",
        q: "¿Tenés metas definidas por vendedor y por sucursal?",
        opciones: SI_NO,
      },
      {
        id: "dir4",
        q: "Si tenés más de una sucursal, ¿podés compararlas fácilmente?",
        opciones: [
          { label: "Sí, en un solo tablero", score: 100 },
          { label: "Armando el informe a mano", score: 40 },
          { label: "No / tengo una sola sucursal", score: 50 },
        ],
      },
      {
        id: "dir5",
        q: "¿Las decisiones importantes se toman con datos o por intuición?",
        opciones: [
          { label: "Con datos del sistema", score: 100 },
          { label: "Mezcla de datos e intuición", score: 50 },
          { label: "Principalmente por experiencia", score: 0 },
        ],
      },
    ],
  },
];

export const WHATSAPP = "59898169358";
export const CALENDAR_URL = "https://calendar.app.google/itbzQ1a5Bn24EeGH7";

export function preguntasDe(modo: "express" | "completo"): Pregunta[] {
  return areas.flatMap((a) =>
    modo === "express" ? a.preguntas.filter((p) => p.express) : a.preguntas
  );
}

export function totalPreguntas(modo: "express" | "completo") {
  return preguntasDe(modo).length;
}

/** Interpretación del puntaje */
export function interpretar(score: number) {
  if (score >= 75)
    return {
      titulo: "Operación ordenada",
      texto: "Tenés buena base. Las oportunidades están en automatizar y afinar lo que ya funciona.",
    };
  if (score >= 50)
    return {
      titulo: "Mitad de camino",
      texto: "Hay sistema pero conviven partes manuales que te frenan y te cuestan ventas.",
    };
  if (score >= 30)
    return {
      titulo: "Muchas fugas abiertas",
      texto: "Buena parte de la operación depende de personas y planillas. Hay bastante para recuperar.",
    };
  return {
    titulo: "Operación totalmente manual",
    texto: "Casi todo depende de memoria, WhatsApp y Excel. El margen de mejora es enorme.",
  };
}
