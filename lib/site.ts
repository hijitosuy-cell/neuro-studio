export const site = {
  name: "Neuro Studio",
  location: "Salto · Uruguay",
  email: "neurovidstudioia@gmail.com",
  bookingUrl: "https://cal.com/neurostudio/diagnostico",
  nav: [
    { href: "#metodo", label: "Método" },
    { href: "#sistema", label: "Sistema" },
    { href: "#planes", label: "Planes" },
    { href: "#preguntas", label: "Preguntas" },
  ],
};

/** 5 fases — nombres en español, copy corto */
export const fases = [
  {
    n: "1",
    title: "Diagnóstico",
    body: "Auditamos 10 áreas de tu concesionaria y te damos un puntaje del 0 al 100. Salís sabiendo exactamente dónde se te va la plata.",
  },
  {
    n: "2",
    title: "Plan",
    body: "Definimos qué construir primero, con qué presupuesto y en qué orden. Alcance cerrado, sin sorpresas.",
  },
  {
    n: "3",
    title: "Construcción",
    body: "Armamos el sistema: CRM, chatbot, web, integraciones y automatizaciones. Cada 2 semanas ves una versión real andando.",
  },
  {
    n: "4",
    title: "Puesta en marcha",
    body: "Migramos tus datos, capacitamos al equipo y acompañamos las primeras semanas hasta que todos lo usen.",
  },
  {
    n: "5",
    title: "Optimización",
    body: "Todos los meses medimos, corregimos y automatizamos más. El sistema mejora con tu negocio.",
  },
];

/** Áreas del diagnóstico */
export const areas = [
  { label: "Captación de leads", score: 62 },
  { label: "Velocidad de respuesta", score: 31 },
  { label: "Gestión de vendedores", score: 54 },
  { label: "Control de stock", score: 67 },
  { label: "Marketing", score: 42 },
  { label: "Rentabilidad", score: 46 },
  { label: "Datos y reportes", score: 35 },
  { label: "Atención al cliente", score: 28 },
  { label: "Automatización", score: 18 },
  { label: "Dirección", score: 21 },
];

/** Lo que construimos — nombres directos */
export const sistema = [
  {
    title: "Sistema de gestión",
    body: "Stock, leads, financiaciones y comisiones en un solo panel.",
  },
  {
    title: "Asistente de WhatsApp",
    body: "Responde 24/7, califica al cliente y agenda test-drives solo.",
  },
  {
    title: "Sitio web y catálogo",
    body: "Rápido, indexable en Google, con ficha por vehículo.",
  },
  {
    title: "Publicidad y contenido",
    body: "Campañas con atribución real: qué anuncio vendió qué auto.",
  },
];

/** 3 planes */
export const planes = [
  {
    name: "Diagnóstico",
    price: "Pago único",
    body: "Auditoría completa + puntaje + plan de prioridades.",
    outputs: ["Informe con las 10 áreas", "Puntaje 0–100", "Plan de acción"],
    featured: false,
  },
  {
    name: "Implementación",
    price: "Según el plan",
    body: "Construimos e instalamos todo lo que el diagnóstico marcó.",
    outputs: ["Sistema andando", "Equipo capacitado", "Datos migrados"],
    featured: true,
  },
  {
    name: "Acompañamiento",
    price: "Mensual",
    body: "Soporte, mejoras, marketing y reportes todos los meses.",
    outputs: ["Cierres mensuales", "Nuevas automatizaciones", "Marketing continuo"],
    featured: false,
  },
];

/** Datos duros del sector */
export const datos = [
  { figure: "65.909", label: "autos vendidos en Uruguay en 2024", source: "Uruguay XXI" },
  { figure: "1 de 3", label: "leads cierra en la misma concesionaria", source: "Urban Science" },
  { figure: "88%", label: "de las planillas de Excel tienen errores", source: "EuSpRIG" },
  { figure: "5%", label: "de las automotoras usa IA para su stock", source: "LotLinx" },
];
