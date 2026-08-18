import Script from "next/script";
import { site, fases, serviciosWeb } from "@/lib/site";
import { WhatsappMock, NeuroPanelMock } from "@/components/brand-mark";
import { Reveal } from "@/components/reveal";
import { Spotlight } from "@/components/spotlight";
import { HeroVideo } from "@/components/hero-video";
import { DiagnosticoTool } from "@/components/diagnostico-tool";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="horizon horizon-light" aria-hidden />
      <Diagnostico />
      <div className="horizon horizon-dark" aria-hidden />
      <Metodo />
      <div className="horizon horizon-light" aria-hidden />
      <Servicios />
      <div className="horizon horizon-dark" aria-hidden />
      <FAQ />
      <CTA />
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}

/* ─── 1. Hero (oscuro, video parallax, limpio) ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <HeroVideo />
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 480, height: 480, top: -160, left: -120 }} />
      <div aria-hidden className="glow-blob glow-blob--hi animate-blob" style={{ width: 380, height: 380, top: -40, right: -80, animationDelay: "3s" }} />

      <div className="wrap relative flex min-h-[86vh] flex-col items-center justify-center py-24 text-center">
        <Reveal className="max-w-3xl">
          <span className="chip chip-on-dark">Método Neuro Studio</span>
          <h1 className="font-display font-semibold mt-6 text-paper" style={{ fontSize: "clamp(2rem, 4.6vw, 3.75rem)", lineHeight: 1.05 }}>
            Tu automotora pierde ventas todos los días.
            <br />
            <span className="accent-gradient">Nosotros encontramos dónde.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base md:text-lg" style={{ color: "var(--paper-dim)" }}>
            No es otro CRM ni otro chatbot. Es un método: diagnosticamos tu concesionaria,
            encontramos las fugas y construimos el sistema para cerrarlas.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#diagnostico" className="btn btn-shiny" style={{ borderRadius: "999px", height: 52, padding: "0 1.9rem" }}>
              Hacer el diagnóstico gratis
            </a>
            <a href="#metodo" className="btn btn-on-dark" style={{ borderRadius: "999px", height: 52 }}>
              Ver el método
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 2. Diagnóstico (CLARO) ─── */
function Diagnostico() {
  return (
    <section id="diagnostico" className="scroll-mt-20" style={{ background: "#fff" }}>
      <div className="wrap py-24 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="label" style={{ color: "var(--brand-accent)" }}>Paso 1 · Gratis</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 4.4vw, 3.25rem)", color: "var(--brand)" }}>
            ¿En qué porcentaje trabaja tu automotora?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg" style={{ color: "var(--fg-muted)" }}>
            Respondé unas preguntas y te damos un puntaje por área y uno general, con el
            detalle de dónde estás perdiendo ventas. Sin costo, sin cuenta, en minutos.
          </p>
        </Reveal>
        <div className="mt-12">
          <DiagnosticoTool />
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Método (OSCURO, centro de todo) ─── */
function Metodo() {
  return (
    <section id="metodo" className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 460, height: 460, top: 60, left: -140 }} />
      <div className="wrap relative py-24 md:py-28">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "#8fb0ff" }}>El método</div>
          <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
            Un sistema, no una lista de servicios.
          </h2>
          <p className="mt-5 text-lg" style={{ color: "var(--paper-dim)" }}>
            Cada automotora pasa por los mismos cinco pasos. Lo que cambia es qué se
            construye en el medio. El método es lo que hace que todo tenga sentido.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {fases.map((f, i) => (
            <Spotlight as="li" key={f.n} tone="dark" className="glass relative overflow-hidden p-7" style={{ transitionDelay: `${i * 60}ms` }}>
              <div aria-hidden className="absolute right-4 top-2 font-display font-bold leading-none" style={{ fontSize: "5rem", color: "rgba(143,176,255,0.1)" }}>{f.n}</div>
              <div aria-hidden className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, var(--brand-accent), transparent)" }} />
              <div className="relative">
                <div className="label" style={{ color: "#8fb0ff" }}>Paso {f.n}</div>
                <h3 className="font-display font-semibold mt-2 text-xl text-paper">{f.title}</h3>
                <p className="mt-3 text-sm" style={{ color: "var(--paper-dim)" }}>{f.body}</p>
              </div>
            </Spotlight>
          ))}
        </ol>

        {/* Producto en acción — lo que queda funcionando */}
        <Reveal className="mt-20 max-w-2xl">
          <div className="label" style={{ color: "#8fb0ff" }}>Lo que queda funcionando</div>
          <h3 className="font-display font-semibold mt-3 text-2xl md:text-3xl text-paper">
            Un sistema que gestiona tu negocio, no una app suelta.
          </h3>
          <p className="mt-4 text-base" style={{ color: "var(--paper-dim)" }}>
            El cerebro que te dice qué hacer cada día, el asistente que atiende por vos,
            y todas las piezas conectadas trabajando juntas.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Spotlight tone="dark" className="glass p-3.5" reveal>
            <NeuroPanelMock />
          </Spotlight>
          <div className="grid gap-6">
            <Spotlight tone="dark" className="glass p-3.5" reveal>
              <WhatsappMock />
            </Spotlight>
          </div>
        </div>

        {/* Todas las piezas conectadas */}
        <Reveal className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {serviciosWeb.map((s) => (
            <div key={s.n} className="rounded-xl px-4 py-3.5 text-sm" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(143,176,255,0.14)" }}>
              <span className="font-mono text-xs" style={{ color: "#8fb0ff" }}>{s.n}</span>
              <div className="mt-1 font-medium text-paper">{s.name}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 4. Servicios (CLARO, piezas del sistema) ─── */
function Servicios() {
  return (
    <section id="servicios" style={{ background: "#fff" }}>
      <div className="wrap py-24 md:py-28">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "var(--brand-accent)" }}>Las piezas</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "var(--brand)" }}>
            Qué construimos, según lo que necesites.
          </h2>
          <p className="mt-5 text-lg" style={{ color: "var(--fg-muted)" }}>
            El diagnóstico decide cuáles de estas piezas van en tu sistema. Capaz una, capaz las cinco.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviciosWeb.map((s, i) => (
            <Spotlight as="article" key={s.n} tone="light" className="card-light p-7" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="num-xl" style={{ color: "rgba(47,95,214,0.16)" }}>{s.n}</div>
              <h3 className="font-display font-semibold mt-3 text-xl" style={{ color: "var(--brand)" }}>{s.name}</h3>
              <p className="mt-3 text-sm" style={{ color: "var(--fg-muted)" }}>{s.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.canales.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </Spotlight>
          ))}

          <Reveal as="article" delay={serviciosWeb.length * 60} className="flex flex-col justify-between rounded-2xl p-7" style={{ background: "linear-gradient(150deg, var(--brand-accent), #16306b)", boxShadow: "0 20px 60px -20px rgba(47,95,214,0.5)" }}>
            <div>
              <span className="chip" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>Precio a medida</span>
              <h3 className="font-display font-semibold mt-4 text-xl text-white">No vendemos paquetes cerrados.</h3>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                Armamos el plan según tu diagnóstico y tu presupuesto. Pagás por lo que
                necesitás. El diagnóstico es gratis.
              </p>
            </div>
            <a href="#diagnostico" className="mt-6 inline-flex text-sm font-medium text-white underline underline-offset-4">
              Empezar por el diagnóstico →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. FAQ (OSCURO) ─── */
const faqs = [
  { q: "¿Cuánto sale?", a: "El diagnóstico es gratis. Lo que se construye después se cotiza a medida según lo que necesites y el tamaño de tu operación. En la reunión te damos un precio cerrado, sin sorpresas." },
  { q: "¿Cuánto tarda?", a: "El diagnóstico lo hacés en minutos desde la web. Lo que se construye muestra resultados cada 2 semanas; los primeros números comerciales se ven al segundo o tercer mes." },
  { q: "¿Se integra con lo que ya uso?", a: "Sí. WhatsApp Business, MercadoLibre, Instagram, Google Calendar, Meta Ads y los CRM más usados. Si tenés algo distinto, lo evaluamos en el diagnóstico." },
  { q: "¿De quién son los datos?", a: "Tuyos. El código y la información quedan en tu concesionaria. Si dejás de trabajar con nosotros, te queda todo funcionando." },
  { q: "¿Trabajan fuera de Uruguay?", a: "Nuestra base está en Salto, Uruguay, y ahí damos soporte cercano. Si estás en la región, escribinos igual y lo evaluamos." },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function FAQ() {
  return (
    <section id="preguntas" className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <div className="wrap relative py-24 md:py-28">
        <Reveal className="grid gap-12 md:grid-cols-[320px_1fr]">
          <div>
            <div className="label" style={{ color: "#8fb0ff" }}>Preguntas</div>
            <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}>
              Lo que nos preguntan.
            </h2>
          </div>
          <div className="border-t border-b" style={{ borderColor: "var(--rule-d)" }}>
            {faqs.map((f) => (
              <details key={f.q} className="group border-b py-6" style={{ borderColor: "var(--rule-d)" }}>
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                  <span className="font-display font-semibold text-lg md:text-xl text-paper">{f.q}</span>
                  <span aria-hidden className="shrink-0 text-xl transition group-open:rotate-45" style={{ color: "#8fb0ff" }}>+</span>
                </summary>
                <p className="mt-3 text-body" style={{ color: "var(--paper-dim)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 6. CTA (OSCURO, glow) ─── */
function CTA() {
  return (
    <section id="contacto" className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom, var(--page), var(--page-2))" }}>
      <div aria-hidden className="bg-grid absolute inset-0" style={{ maskImage: "linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent)" }} />
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 560, height: 380, top: -40, left: "50%", transform: "translateX(-50%)" }} />
      <div className="wrap relative py-24 md:py-28 text-center">
        <Reveal>
          <h2 className="font-display font-semibold mx-auto max-w-3xl text-paper" style={{ fontSize: "clamp(2rem, 4.6vw, 3.5rem)" }}>
            Empezá por el diagnóstico.
            <br />
            <span className="accent-gradient">Es gratis y no te compromete a nada.</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#diagnostico" className="btn btn-shiny" style={{ borderRadius: "999px", height: 52, padding: "0 1.9rem" }}>
              Hacer el diagnóstico
            </a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark" style={{ borderRadius: "999px", height: 52 }}>
              Escribinos por WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm" style={{ color: "var(--paper-dim)" }}>
            o agendá una reunión en{" "}
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="underline text-white">nuestra agenda</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
