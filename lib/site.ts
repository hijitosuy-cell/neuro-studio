export const site = {
  name: "Neuro Studio",
  method: "Método Neuro Studio",
  location: "Salto · Uruguay",
  coords: "—31.383 S · —57.960 W",
  year: "2026",
  email: "neurovidstudioia@gmail.com",
  bookingUrl: "https://cal.com/neurostudio/neuro-scan",
  nav: [
    { href: "#metodo", label: "Método" },
    { href: "#neuro-scan", label: "Neuro Scan" },
    { href: "#modulos", label: "Módulos" },
    { href: "#ofertas", label: "Ofertas" },
    { href: "#preguntas", label: "Preguntas" },
  ],
  promise:
    "Detectamos dónde tu automotora pierde ventas, tiempo y rentabilidad — y construimos el sistema para recuperarlas.",
};

/**
 * 5 fases del Método Neuro Studio — el corazón de la oferta.
 */
export const fases = [
  {
    n: "F.01",
    slug: "scan",
    title: "Neuro Scan",
    subtitle: "Detectamos.",
    body:
      "Auditoría completa de tu concesionaria: captación, velocidad comercial, gestión de vendedores, stock, marketing, finanzas, datos, experiencia del cliente, automatización y dirección. Salís con tu Neuro Score y el mapa de dónde estás perdiendo dinero.",
    outputs: ["Neuro Score (0–100)", "Mapa de fugas", "Prioridades comerciales"],
  },
  {
    n: "F.02",
    slug: "blueprint",
    title: "Neuro Blueprint",
    subtitle: "Diseñamos.",
    body:
      "Plan de transformación específico para tu operación. Definimos qué construir primero, qué integrar y qué medir. No mandamos un menú de servicios: mandamos un blueprint contra las fugas reales de tu concesionaria.",
    outputs: ["Roadmap por sprints", "Alcance cerrado", "KPIs comprometidos"],
  },
  {
    n: "F.03",
    slug: "build",
    title: "Neuro Build",
    subtitle: "Construimos.",
    body:
      "Implementamos: CRM/DMS, chatbot con IA, sitio web, dashboards, integraciones (WhatsApp Business, Meta Ads, MercadoLibre, calendarios, ERP) y automatizaciones. Cada dos semanas ves una versión real corriendo, no una diapositiva.",
    outputs: ["Sistema en producción", "Integraciones activas", "Datos unificados"],
  },
  {
    n: "F.04",
    slug: "launch",
    title: "Neuro Launch",
    subtitle: "Activamos.",
    body:
      "Migración de datos, capacitación al equipo, configuración de roles y SLAs internos, y acompañamiento intensivo en las primeras semanas. Un sistema que nadie usa no cambió nada: acá nos aseguramos de que se adopte.",
    outputs: ["Equipo capacitado", "Datos migrados", "SLA de respuesta activo"],
  },
  {
    n: "F.05",
    slug: "scale",
    title: "Neuro Scale",
    subtitle: "Optimizamos.",
    body:
      "Cada mes medimos, detectamos, corregimos, automatizamos, mejoramos. Re-evaluamos el Neuro Score, afinamos las automatizaciones y lanzamos iteraciones de marketing. El sistema no termina cuando entregamos: ahí empieza la mejora continua.",
    outputs: ["Cierres automáticos", "Neuro Score mensual", "Iteraciones marketing"],
  },
];

/**
 * 10 áreas del Neuro Scan — se muestran como scorecard visual.
 * Los puntajes son ilustrativos (una automotora promedio).
 */
export const scanAreas = [
  { code: "01", label: "Captación", score: 62 },
  { code: "02", label: "Velocidad comercial", score: 31 },
  { code: "03", label: "Gestión de vendedores", score: 54 },
  { code: "04", label: "Stock", score: 67 },
  { code: "05", label: "Marketing", score: 42 },
  { code: "06", label: "Finanzas y rentabilidad", score: 46 },
  { code: "07", label: "Datos y control", score: 35 },
  { code: "08", label: "Experiencia del cliente", score: 28 },
  { code: "09", label: "Automatización", score: 18 },
  { code: "10", label: "Dirección y reporting", score: 21 },
];

/**
 * Módulos que Neuro Build implementa según el Blueprint.
 * Subordinados al método — no son la oferta, son las piezas.
 */
export const modulos = [
  {
    code: "M.01",
    title: "SaaS / CRM propietario",
    body: "Panel único con stock, leads, financiaciones, comisiones y reporting. Diseñado para el proceso comercial real de una automotora, no un CRM genérico adaptado.",
  },
  {
    code: "M.02",
    title: "Chatbot con IA",
    body: "Asistente en WhatsApp Business, sitio web e Instagram. Entrenado con tu catálogo, agenda test-drives y hace handoff al vendedor cuando detecta intención de compra.",
  },
  {
    code: "M.03",
    title: "Sitio web y catálogo",
    body: "Sitio propio rápido, indexable en Google, con ficha por vehículo (schema.org Vehicle), simulador de financiación y formularios que van directo al CRM.",
  },
  {
    code: "M.04",
    title: "Ads y campañas",
    body: "Campañas Meta y Google Ads con atribución real: qué campaña generó qué venta, en qué stock, con qué margen. Sin ROI difuso.",
  },
  {
    code: "M.05",
    title: "Marketing de contenido",
    body: "Contenido que acelera el stock que el negocio necesita mover. Videos, publicaciones y anuncios pensados desde el inventario, no desde el calendario editorial.",
  },
];

/**
 * 3 niveles comerciales — la oferta.
 */
export const ofertas = [
  {
    code: "O.01",
    name: "Neuro Scan",
    tag: "Diagnóstico",
    price: "Pago único",
    body:
      "Auditoría de las 10 áreas + Neuro Score + mapa de fugas + roadmap de prioridades. Sirve para saber cuánto estás perdiendo antes de decidir qué implementar.",
    outputs: [
      "Informe ejecutivo",
      "Neuro Score con desglose",
      "Roadmap priorizado",
    ],
  },
  {
    code: "O.02",
    name: "Neuro Transform",
    tag: "Implementación",
    price: "Cotización según Blueprint",
    body:
      "Construimos lo que tu automotora necesita según el diagnóstico: CRM, chatbot, web, integraciones, dashboards, automatizaciones y capacitación.",
    outputs: [
      "Sistema en producción",
      "Equipo capacitado",
      "SLAs activos",
    ],
  },
  {
    code: "O.03",
    name: "Neuro Scale",
    tag: "Acompañamiento",
    price: "Mensualidad escalable",
    body:
      "Soporte, mantenimiento, nuevas automatizaciones, marketing, ads, reportes y mejora continua. El sistema evoluciona con tu negocio.",
    outputs: [
      "Cierres mensuales",
      "Nuevas automatizaciones",
      "Marketing continuo",
    ],
  },
];

/**
 * Datos duros del sector — evidencia, no adjetivos.
 * Fuentes: Uruguay XXI, LotLinx 2025, Cox Automotive 2025, Urban Science.
 */
export const evidencia = [
  {
    figure: "65 909",
    unit: "vehículos",
    body: "vendidos en Uruguay en 2024 — récord histórico del mercado.",
    source: "Uruguay XXI · 2025",
  },
  {
    figure: "1 de 3",
    unit: "leads",
    body: "convierte en la misma concesionaria. Los otros dos se van a la competencia.",
    source: "Urban Science · 2024",
  },
  {
    figure: "88 %",
    unit: "planillas",
    body: "de Excel contienen errores en sus fórmulas — y ahí vive tu stock hoy.",
    source: "European Spreadsheet Risks Interest Group",
  },
  {
    figure: "5 %",
    unit: "dealers",
    body: "usa IA para gestión de inventario o pricing. La ventana está abierta.",
    source: "LotLinx · 2025",
  },
];
