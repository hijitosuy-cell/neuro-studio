export const site = {
  name: "Neuro Studio",
  location: "Salto · Uruguay",
  email: "neurovidstudioia@gmail.com",
  bookingUrl: "https://calendar.app.google/itbzQ1a5Bn24EeGH7",
  whatsapp: "59898169358",
  whatsappUrl:
    "https://wa.me/59898169358?text=" +
    encodeURIComponent("Hola, quiero coordinar una reunión para mi automotora."),
  nav: [
    { href: "#diagnostico", label: "Diagnóstico" },
    { href: "#servicios", label: "Servicios" },
    { href: "#metodo", label: "Método" },
    { href: "#preguntas", label: "Preguntas" },
  ],
};

/** 5 fases — timeline conectado, con kicker corto */
export const fases = [
  {
    n: "1",
    kicker: "Detectamos",
    title: "Diagnóstico",
    body: "Auditamos 10 áreas de tu concesionaria y te damos un puntaje del 0 al 100. Salís sabiendo exactamente dónde se te va la plata.",
  },
  {
    n: "2",
    kicker: "Diseñamos",
    title: "Plan a medida",
    body: "Definimos qué construir primero, con qué presupuesto y en qué orden. Alcance cerrado, sin sorpresas.",
  },
  {
    n: "3",
    kicker: "Construimos",
    title: "El sistema",
    body: "Armamos CRM, chatbot, web, integraciones y automatizaciones. Cada 2 semanas ves una versión real andando.",
  },
  {
    n: "4",
    kicker: "Activamos",
    title: "Puesta en marcha",
    body: "Migramos tus datos, capacitamos al equipo y acompañamos las primeras semanas hasta que todos lo usen.",
  },
  {
    n: "5",
    kicker: "Escalamos",
    title: "Optimización",
    body: "Todos los meses medimos, corregimos y automatizamos más. El sistema mejora con tu negocio.",
  },
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

/** Servicios modulares que se combinan según el diagnóstico. */
export const serviciosWeb = [
  {
    n: "01",
    name: "Sistema de gestión",
    canales: ["Stock", "Leads", "Comisiones"],
    body: "Stock, consultas, vendedores, financiaciones y comisiones en un panel. Reportes que salen solos, datos que no se pierden.",
  },
  {
    n: "02",
    name: "Asistente de WhatsApp con IA",
    canales: ["WhatsApp", "Instagram", "Web"],
    body: "Responde 24/7, califica al cliente, consulta el stock y agenda test-drives solo. Deriva al vendedor cuando hay intención real.",
  },
  {
    n: "03",
    name: "Sitio web con catálogo",
    canales: ["Google", "Catálogo", "Formularios"],
    body: "Sitio propio rápido, con buscador de vehículos, ficha por unidad y formularios que entran directo al sistema.",
  },
  {
    n: "04",
    name: "Publicidad con seguimiento",
    canales: ["Meta Ads", "Google Ads"],
    body: "Campañas conectadas al sistema: qué anuncio trajo qué consulta y qué consulta terminó en venta.",
  },
  {
    n: "05",
    name: "Contenido y redes",
    canales: ["Reels", "Fotos", "Posts"],
    body: "Contenido armado desde el stock que hay que mover, no desde un calendario genérico.",
  },
];

/** Datos duros del sector */
export const datos = [
  { figure: "65.909", label: "autos vendidos en Uruguay en 2024", source: "Uruguay XXI" },
  { figure: "1 de 3", label: "leads cierra en la misma concesionaria", source: "Urban Science" },
  { figure: "88%", label: "de las planillas de Excel tienen errores", source: "EuSpRIG" },
  { figure: "5%", label: "de las automotoras usa IA para su stock", source: "LotLinx" },
];
