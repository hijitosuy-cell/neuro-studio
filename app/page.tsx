import Image from "next/image";
import Script from "next/script";
import { site, fases, modulos, ofertas, evidencia } from "@/lib/site";
import { WhatsappMock, StockPanelMock, LeadsMock } from "@/components/brand-mark";
import { CategoryMarquee } from "@/components/ops-ticker";
import { Reveal, CountUp } from "@/components/reveal";
import { NeuroScoreCard } from "@/components/neuro-score";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Evidence />
      <Metodo />
      <ProductGallery />
      <NeuroScanSection />
      <Modulos />
      <Ofertas />
      <Confianza />
      <Cases />
      <FAQ />
      <ContactCTA />
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}

/* ─── Hero: dark navy protagónico, tipográfico ─── */
function Hero() {
  return (
    <section aria-label="Presentación" className="relative overflow-hidden" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="wrap relative pt-16 pb-20 md:pt-24 md:pb-28">
        <Reveal className="max-w-4xl">
          <div className="mono-label" style={{ color: "rgba(255,255,255,0.55)" }}>
            Método Neuro Studio · Salto, Uruguay
          </div>
          <h1
            className="font-display font-semibold mt-6 text-paper"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)", lineHeight: 1.02 }}
          >
            La plataforma comercial <br className="hidden md:block" />
            para automotoras <span style={{ color: "#8fb0ff" }}>uruguayas.</span>
          </h1>
          <p className="mt-8 text-lg text-body" style={{ color: "var(--paper-dim)", maxWidth: "38rem" }}>
            Detectamos dónde tu concesionaria pierde ventas, tiempo y rentabilidad — y construimos el sistema para recuperarlas. Diagnóstico, blueprint, build, launch y scale bajo un mismo método.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid-on-dark">
              Solicitar Neuro Scan →
            </a>
            <a href="#metodo" className="btn btn-on-dark">
              Cómo funciona el método
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            <span className="flex items-center gap-2"><span className="signal-dot" />Aceptando 2 clientes · 2026</span>
            <span className="hidden sm:inline">·</span>
            <span>Respuesta en menos de 24 h</span>
          </div>
        </Reveal>

        {/* Right-side logo watermark on desktop */}
        <div aria-hidden className="pointer-events-none hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.06]">
          <Image src="/neuro-studio-logo.png" alt="" width={520} height={520} style={{ filter: "brightness(0) invert(1)" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── Trust strip ─── */
function TrustStrip() {
  return (
    <>
      <div className="border-b rule" style={{ background: "var(--bg-2)" }}>
        <div className="wrap py-5 text-center mono-label text-[11px]">
          Diseñado para concesionarias oficiales · multimarca · rent-a-car · talleres y grupos automotrices
        </div>
      </div>
      <CategoryMarquee />
    </>
  );
}

/* ─── Evidence ─── */
function Evidence() {
  return (
    <section aria-label="Evidencia del sector" className="border-b rule">
      <div className="wrap py-20 md:py-28">
        <Reveal className="max-w-3xl">
          <div className="mono-label" style={{ color: "var(--brand-accent)" }}>Evidencia · 2024/25</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", color: "var(--brand)" }}>
            Uruguay vende más autos y pierde más leads que nunca.
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {evidencia.map((e, i) => (
            <Reveal as="li" key={e.figure} delay={i * 80}>
              <div className="font-display font-semibold" style={{ fontSize: "clamp(2.4rem, 3.5vw, 3rem)", color: "var(--brand)", lineHeight: 1 }}>
                {e.figure}
              </div>
              <div className="mt-1 mono-label" style={{ color: "var(--brand-accent)" }}>{e.unit}</div>
              <p className="mt-3 text-sm text-body" style={{ color: "var(--fg-muted)" }}>{e.body}</p>
              <div className="mt-3 mono-label text-[11px]">— {e.source}</div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Método (DARK section) ─── */
function Metodo() {
  return (
    <section id="metodo" aria-label="Método Neuro Studio" className="on-dark" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="wrap py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <div className="mono-label" style={{ color: "#8fb0ff" }}>Método · 5 fases</div>
          <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}>
            Un sistema repetible para transformar automotoras.
          </h2>
          <p className="mt-6 text-body" style={{ color: "var(--paper-dim)" }}>
            Cada cliente pasa por las cinco fases. Lo que cambia es el Blueprint. El software y la IA pueden cambiar — el método sobrevive.
          </p>
        </Reveal>
        <div className="mt-16">
          <ol className="relative">
            <div aria-hidden className="absolute left-[15px] top-4 bottom-4 w-px" style={{ background: "var(--rule-d-strong)" }} />
            {fases.map((f, i) => (
              <Reveal as="li" key={f.slug} delay={i * 90} className="relative pl-12 pb-10 last:pb-0">
                <span aria-hidden className="absolute left-0 top-1 grid h-[30px] w-[30px] place-items-center rounded-full font-mono text-[11px] text-white font-semibold" style={{ background: "var(--brand-accent)" }}>
                  {f.n.replace("F.", "")}
                </span>
                <div className="grid gap-3 md:grid-cols-[160px_1fr] md:gap-8">
                  <div>
                    <div className="mono-label" style={{ color: "rgba(255,255,255,0.45)" }}>{f.n}</div>
                    <div className="font-display font-semibold mt-1 text-xl md:text-2xl text-paper">{f.subtitle}</div>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl md:text-2xl text-paper">{f.title}</h3>
                    <p className="mt-3 text-body" style={{ color: "var(--paper-dim)" }}>{f.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {f.outputs.map((o) => (
                        <li key={o} className="rounded-full px-3 py-1 mono-label text-[11px]" style={{ background: "rgba(47,95,214,0.18)", border: "1px solid rgba(47,95,214,0.35)", color: "#a0b8ff" }}>
                          → {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─── Product gallery ─── */
function ProductGallery() {
  return (
    <section aria-label="Sistema en producción" className="border-b rule">
      <div className="wrap py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <div className="mono-label" style={{ color: "var(--brand-accent)" }}>Neuro Build · en producción</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", color: "var(--brand)" }}>
            Así se ve tu concesionaria cuando el sistema está andando.
          </h2>
          <p className="mt-6 text-body" style={{ color: "var(--fg-muted)" }}>
            WhatsApp que responde, califica y agenda. Panel de stock unificado. Dashboard de leads con atribución real. Todo conectado, sin planillas paralelas, sin datos que se pierden entre vendedores.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={80}>
            <WhatsappMock />
            <div className="mt-3 mono-label text-[11px]">M.02 · Chatbot WhatsApp con handoff</div>
          </Reveal>
          <div className="grid gap-6 lg:col-span-7">
            <Reveal delay={160}>
              <LeadsMock />
              <div className="mt-3 mono-label text-[11px]">M.01 · Dashboard de leads</div>
            </Reveal>
            <Reveal delay={240}>
              <StockPanelMock />
              <div className="mt-3 mono-label text-[11px]">M.01 · Panel de stock unificado</div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Neuro Scan ─── */
function NeuroScanSection() {
  return (
    <section id="neuro-scan" aria-label="Neuro Scan" className="border-b rule" style={{ background: "var(--bg-2)" }}>
      <div className="wrap py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <div className="mono-label" style={{ color: "var(--brand-accent)" }}>Fase 1 · Neuro Scan</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", color: "var(--brand)" }}>
            Antes de vender tecnología, medimos cuánto estás perdiendo.
          </h2>
          <p className="mt-6 text-body" style={{ color: "var(--fg-muted)" }}>
            Auditoría de 10 áreas de tu concesionaria. Cada una recibe una puntuación de 0 a 100. El agregado es tu <strong style={{ color: "var(--fg)" }}>Neuro Score</strong>: cuánto de tu potencial operativo digital estás usando hoy.
          </p>
        </Reveal>
        <div className="mt-12">
          <NeuroScoreCard />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 mono-label text-[12px]">
          <span>* Puntajes ilustrativos de una automotora promedio uruguaya.</span>
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="prose-link">
            Solicitar tu Neuro Scan real →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Módulos ─── */
function Modulos() {
  return (
    <section id="modulos" aria-label="Módulos" className="border-b rule">
      <div className="wrap py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <div className="mono-label" style={{ color: "var(--brand-accent)" }}>Neuro Build · Módulos</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", color: "var(--brand)" }}>
            Cinco piezas que se combinan según tu Blueprint.
          </h2>
          <p className="mt-6 text-body" style={{ color: "var(--fg-muted)" }}>
            No todas las automotoras necesitan lo mismo. Estos son los módulos que combinamos.
          </p>
        </Reveal>
        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {modulos.map((m, i) => (
            <Reveal as="li" key={m.code} delay={i * 60} className="border-t-2 pt-6" style={{ borderColor: "var(--brand)" }}>
              <div className="mono-label text-[11px]">{m.code}</div>
              <h3 className="font-display font-semibold mt-2 text-2xl" style={{ color: "var(--brand)" }}>
                {m.title}
              </h3>
              <p className="mt-3 text-sm text-body" style={{ color: "var(--fg-muted)" }}>{m.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Ofertas ─── */
function Ofertas() {
  return (
    <section id="ofertas" aria-label="Ofertas" className="border-b rule" style={{ background: "var(--bg-2)" }}>
      <div className="wrap py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <div className="mono-label" style={{ color: "var(--brand-accent)" }}>Oferta comercial</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", color: "var(--brand)" }}>
            Tres niveles. Empezás por donde estás.
          </h2>
          <p className="mt-6 text-body" style={{ color: "var(--fg-muted)" }}>
            La mayoría arranca con Neuro Scan porque necesita saber qué está pasando antes de invertir. Otras vienen decididas a transformar. Scale empieza cuando el sistema ya está andando.
          </p>
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {ofertas.map((o, i) => (
            <Reveal as="li" key={o.code} delay={i * 80}>
              <div className="surface flex h-full flex-col p-8" style={i === 1 ? { border: "2px solid var(--brand)", background: "var(--bg)" } : {}}>
                <div className="flex items-baseline justify-between">
                  <div className="mono-label">{o.code}</div>
                  <div className="mono-label" style={{ color: "var(--brand-accent)" }}>{o.tag}</div>
                </div>
                <h3 className="font-display font-semibold mt-4 text-3xl" style={{ color: "var(--brand)" }}>{o.name}</h3>
                <div className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>{o.price}</div>
                <p className="mt-5 text-sm text-body" style={{ color: "var(--fg-muted)" }}>{o.body}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {o.outputs.map((out) => (
                    <li key={out} className="flex items-start gap-2.5" style={{ color: "var(--fg)" }}>
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--brand-accent)" }} />
                      {out}
                    </li>
                  ))}
                </ul>
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={`mt-8 btn ${i === 1 ? "btn-brand" : ""}`} style={{ minHeight: "42px", padding: "0.65rem 1.15rem", fontSize: "0.85rem" }}>
                  Empezar por {o.name} →
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Confianza (DARK) ─── */
function Confianza() {
  const items = [
    { k: "NDA", v: "Firmamos acuerdo de confidencialidad antes de mirar tus datos." },
    { k: "Datos tuyos", v: "El código y los datos son de tu concesionaria. Sin lock-in." },
    { k: "Infra propia", v: "Podemos desplegar dentro de tu servidor si el proyecto lo requiere." },
    { k: "Equipo in-house", v: "No tercerizamos. El mismo equipo que construye te acompaña." },
  ];
  return (
    <section aria-label="Confianza" className="on-dark" style={{ background: "var(--ink-2)", color: "var(--paper)" }}>
      <div className="wrap py-24 md:py-32">
        <Reveal className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="mono-label" style={{ color: "#8fb0ff" }}>Confianza</div>
            <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}>
              Tus datos son críticos. Los protegemos como corresponde.
            </h2>
          </div>
          <ul className="md:col-span-7 grid gap-4 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal as="li" key={it.k} delay={i * 60} className="surface-dark p-6">
                <div className="grid h-9 w-9 place-items-center rounded-md font-mono text-[11px] font-semibold" style={{ background: "rgba(47,95,214,0.2)", color: "#a0b8ff", border: "1px solid rgba(47,95,214,0.32)" }}>
                  ✓
                </div>
                <div className="mt-4 font-display font-semibold text-lg text-paper">{it.k}</div>
                <p className="mt-1.5 text-sm text-body" style={{ color: "var(--paper-dim)" }}>{it.v}</p>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Cases ─── */
function Cases() {
  return (
    <section aria-label="Casos" className="border-b rule">
      <div className="wrap py-24 md:py-32">
        <Reveal className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="mono-label" style={{ color: "var(--brand-accent)" }}>Casos · cupo 2026</div>
            <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", color: "var(--brand)" }}>
              Vas a poder ser el primer caso público.
            </h2>
            <p className="mt-6 text-body" style={{ color: "var(--fg-muted)" }}>
              Neuro Studio es nuevo. Estamos cerrando la primera implementación con una concesionaria uruguaya. Cuando tengamos datos verificados los publicamos acá con nombre, cifras y video. No inventamos testimonios.
            </p>
          </div>
          <div className="md:col-span-6">
            <div className="surface p-8" style={{ background: "var(--bg-2)" }}>
              <div className="mono-label text-[11px]">Disponibilidad 2026</div>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display font-semibold leading-none" style={{ fontSize: "5rem", color: "var(--brand)" }}>
                  <CountUp end={2} />
                </span>
                <span className="text-sm" style={{ color: "var(--fg-muted)" }}>clientes nuevos<br />este semestre</span>
              </div>
              <p className="mt-4 text-sm text-body" style={{ color: "var(--fg-muted)" }}>
                Trabajamos con pocas cuentas a la vez para que el acompañamiento sea real. Si querés ser el primero — o el segundo — hay lugar.
              </p>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-6 btn btn-brand">
                Reservar tu cupo →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
const faqs = [
  { q: "¿En qué se diferencia el Método Neuro Studio de contratar una agencia?", a: "Una agencia te vende marketing. Un software factory te vende software. Nosotros hacemos el diagnóstico primero, definimos qué cambiar y con qué combinación de piezas (CRM, chatbot, web, ads, marketing), y después lo construimos. El método es lo que vendemos — el software es la consecuencia." },
  { q: "¿Cuánto sale el Neuro Scan?", a: "El diagnóstico es un pago único que definimos según el tamaño de la operación. En la reunión inicial (sin costo, 30 minutos) te damos el precio cerrado antes de que decidas seguir. Si contratás Neuro Transform después, el Scan se descuenta." },
  { q: "¿Cuánto tarda ver resultados?", a: "El Neuro Scan entrega el informe en 2 a 3 semanas. Neuro Build empieza a mostrar valor por sprint (cada 2 semanas). Los resultados comerciales medibles se ven a partir del segundo o tercer mes de operación." },
  { q: "¿Se integra con lo que ya tenemos?", a: "Sí. Trabajamos con Salesforce, HubSpot, Pipedrive, Kommo, Zoho, AOS, la API oficial de WhatsApp Business, MercadoLibre, Instagram, Meta Ads, Google Calendar, Outlook. Si tu sistema no está en esa lista, lo evaluamos en el Scan y te decimos con honestidad si conviene integrar o migrar." },
  { q: "¿Quién es dueño del software y los datos?", a: "Vos. El código y los datos son de tu concesionaria. Podemos desplegar el sistema en tu propia infraestructura si el proyecto lo requiere. No hay lock-in: si decidís dejar de trabajar con nosotros, te queda todo funcionando." },
  { q: "¿Trabajan fuera de Uruguay?", a: "Por ahora sólo en Uruguay, porque queremos dar soporte cercano en las primeras cuentas. En 2027 abrimos a la región. Si estás fuera de Uruguay y querés hablar, escribinos igual — evaluamos cada caso." },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function FAQ() {
  return (
    <section id="preguntas" aria-label="Preguntas frecuentes" className="border-b rule" style={{ background: "var(--bg-2)" }}>
      <div className="wrap py-24 md:py-32">
        <Reveal className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mono-label" style={{ color: "var(--brand-accent)" }}>Preguntas frecuentes</div>
            <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--brand)" }}>
              ¿Qué más querés saber?
            </h2>
            <p className="mt-4 text-sm text-body" style={{ color: "var(--fg-muted)" }}>
              Si tu pregunta no está acá, <a href={`mailto:${site.email}`} className="prose-link">escribinos</a> y te respondemos en menos de 24 h.
            </p>
          </div>
          <div className="md:col-span-8 space-y-3">
            {faqs.map((f, i) => (
              <Reveal as="div" key={f.q} delay={i * 40}>
                <details className="group surface p-5">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-left">
                    <span className="font-display font-semibold text-lg" style={{ color: "var(--brand)" }}>{f.q}</span>
                    <span aria-hidden className="mono-label shrink-0 transition group-open:rotate-90">→</span>
                  </summary>
                  <p className="mt-3 text-sm text-body" style={{ color: "var(--fg-muted)" }}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Contact CTA ─── */
function ContactCTA() {
  return (
    <section id="contacto" aria-label="Contacto">
      <div className="wrap py-20 md:py-28">
        <Reveal className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center" style={{ background: "var(--ink)" }}>
          <div className="mono-label" style={{ color: "#8fb0ff" }}>Empezar</div>
          <h2 className="font-display font-semibold mt-4 mx-auto max-w-3xl text-paper" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05 }}>
            Contanos qué está atascado en tu automotora.
          </h2>
          <p className="mt-6 mx-auto max-w-xl" style={{ color: "var(--paper-dim)" }}>
            Reservá 30 minutos con nosotros. Sin costo. Salís de la charla con un plan claro — hayamos cerrado o no.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid-on-dark">
              Agendar Neuro Scan →
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-on-dark">{site.email}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
