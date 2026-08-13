import Link from "next/link";
import { ArrowRight, Bot, Car, LayoutDashboard, Sparkles, ShieldCheck, Zap, LineChart } from "lucide-react";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <LogosStrip />
      <Services />
      <Process />
      <Cases />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div aria-hidden className="glow absolute inset-0 -z-0" />
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-brand-soft px-3 py-1 text-xs text-accent">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Agencia IA para el mundo automotor
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
            Vendé más autos con <em className="not-italic text-accent">IA que trabaja</em> por vos.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-fg-muted">
            Diseñamos y desplegamos SaaS a medida, chatbots que agendan test-drives y
            sitios web pensados para convertir. Todo integrado a tu CRM, sin agregar personal.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium"
            >
              Agendar reunión <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="#servicios"
              className="btn-ghost inline-flex h-12 items-center rounded-full px-6 text-sm font-medium"
            >
              Ver servicios
            </Link>
          </div>
          <p className="mt-6 text-xs text-fg-dim">Respuesta en menos de 24h · Sin compromiso</p>
        </div>
      </div>
    </section>
  );
}

function LogosStrip() {
  return (
    <section aria-label="Confían en nosotros" className="border-y border-border/60 bg-bg-elev/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 py-8 text-sm text-fg-dim">
        <span className="uppercase tracking-widest text-xs">Trabajamos con</span>
        <span>Concesionarias</span>
        <span>Multimarca</span>
        <span>Rent-a-car</span>
        <span>Talleres oficiales</span>
        <span>Grupos automotrices</span>
      </div>
    </section>
  );
}

const services = [
  {
    icon: LayoutDashboard,
    title: "SaaS a medida",
    desc: "Plataformas internas para gestionar stock, leads, financiación y postventa. Escalables, seguras y con dashboards que se entienden.",
    bullets: ["Gestión de leads y stock", "Integración con CRMs", "Panel multiusuario con roles"],
  },
  {
    icon: Bot,
    title: "Chatbots con IA",
    desc: "Asistentes que responden en WhatsApp y web 24/7, califican prospectos y agendan test-drives directo en el calendario del vendedor.",
    bullets: ["WhatsApp + Web + Instagram", "Handoff a humano sin fricción", "Reportes de conversión"],
  },
  {
    icon: Car,
    title: "Webs para automotoras",
    desc: "Sitios rápidos, con SEO técnico y catálogo de vehículos indexable. Diseñados para que Google los encuentre y los usuarios reserven.",
    bullets: ["Catálogo con filtros", "SEO local + schema Vehicle", "Lighthouse 95+"],
  },
];

function Services() {
  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl">Servicios</h2>
          <p className="mt-4 text-fg-muted">
            Tres productos, un mismo objetivo: que cada visitante y cada consulta se transforme en una venta.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="card p-8">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-accent">
                <s.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-fg-muted">{s.desc}</p>
              <ul className="mt-5 space-y-2 text-sm text-fg-muted">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", icon: Sparkles, title: "Descubrimiento", desc: "Una reunión para entender tu operación, tus números y dónde se pierden ventas." },
  { n: "02", icon: LineChart, title: "Propuesta y plan", desc: "Definimos alcance, KPIs y tiempos. Cero letra chica: sabés qué recibís y cuándo." },
  { n: "03", icon: Zap, title: "Build en sprints", desc: "Iteramos cada 1-2 semanas con demos reales, no promesas." },
  { n: "04", icon: ShieldCheck, title: "Deploy y soporte", desc: "Puesta en producción, capacitación al equipo y acompañamiento continuo." },
];

function Process() {
  return (
    <section id="proceso" className="relative py-24 md:py-32 bg-bg-elev/30 border-y border-border/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl">Cómo trabajamos</h2>
          <p className="mt-4 text-fg-muted">
            Un proceso claro, con entregables reales en cada etapa.
          </p>
        </div>
        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="card p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-fg-dim">Paso {s.n}</span>
                <s.icon className="h-4 w-4 text-accent" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section id="casos" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl">Casos y testimonios</h2>
          <p className="mt-4 text-fg-muted">
            Estamos preparando los primeros casos de estudio con métricas y videos reales de nuestros clientes.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-8">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-brand-soft to-transparent border border-border" />
              <h3 className="mt-5 text-lg font-semibold">Caso próximamente</h3>
              <p className="mt-2 text-sm text-fg-muted">
                Estamos grabando entrevistas con nuestros primeros clientes. Volvé pronto o agendá una reunión para verlos en vivo.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="relative py-24 md:py-32 border-t border-border/60 bg-bg-elev/30">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl">
          ¿Listos para automatizar <em className="not-italic text-accent">tu operación</em>?
        </h2>
        <p className="mt-4 text-fg-muted">
          Reservá 30 minutos con nosotros. Sin costo, sin obligación.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium"
          >
            Agendar reunión <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="btn-ghost inline-flex h-12 items-center rounded-full px-6 text-sm font-medium"
          >
            Escribinos a {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
