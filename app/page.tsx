import Image from "next/image";
import Script from "next/script";
import { site, fases, serviciosWeb } from "@/lib/site";
import { WhatsappMock } from "@/components/brand-mark";
import { Reveal } from "@/components/reveal";
import { DiagnosticoTool } from "@/components/diagnostico-tool";

export default function Home() {
  return (
    <>
      <Hero />
      <Diagnostico />
      <Servicios />
      <Metodo />
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

/* ─── 1. Hero ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 520, height: 520, top: -160, left: -120 }} />
      <div aria-hidden className="glow-blob glow-blob--hi animate-blob" style={{ width: 420, height: 420, top: -80, right: -80, animationDelay: "3s" }} />

      <div className="wrap relative pt-24 pb-28 md:pt-32 md:pb-36">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h1 className="font-display font-semibold text-paper" style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)", lineHeight: 1.02 }}>
            Tu automotora pierde ventas
            <br className="hidden sm:block" /> todos los días.
            <br />
            <span className="accent-gradient">Nosotros encontramos dónde.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg" style={{ color: "var(--paper-dim)" }}>
            Hacé el diagnóstico gratis y en minutos sabés en qué porcentaje trabaja
            tu concesionaria. Después construimos el sistema para recuperar lo que se escapa.
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#diagnostico" className="btn btn-shiny" style={{ borderRadius: "999px", height: 54, padding: "0 2rem" }}>
              Hacer el diagnóstico gratis
            </a>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark" style={{ borderRadius: "999px", height: 54 }}>
              Agendar reunión
            </a>
          </div>
        </Reveal>

        {/* Panel flotante con mockup, da profundidad al hero */}
        <Reveal className="reveal-scale mx-auto mt-16 max-w-md md:mt-20" delay={150}>
          <div className="glass p-3">
            <WhatsappMock />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 2. Diagnóstico (panel claro, foco de la página) ─── */
function Diagnostico() {
  return (
    <section id="diagnostico" className="relative scroll-mt-20 overflow-hidden" style={{ background: "var(--page-2)" }}>
      <div aria-hidden className="glow-blob glow-blob--brand" style={{ width: 500, height: 500, top: -140, left: "40%" }} />
      <div className="wrap relative py-24 md:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display font-semibold text-paper" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}>
            ¿En qué porcentaje trabaja tu automotora?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "var(--paper-dim)" }}>
            Respondé unas preguntas y te damos un puntaje por área y uno general, con
            el detalle de dónde estás perdiendo ventas. Gratis, sin cuenta, en minutos.
          </p>
        </Reveal>

        {/* Panel claro que resalta sobre el fondo oscuro */}
        <Reveal className="reveal-scale mt-14 rounded-3xl p-5 md:p-8" style={{ background: "var(--bg)", boxShadow: "0 40px 120px -40px rgba(47,95,214,0.5)" }}>
          <DiagnosticoTool />
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 3. Servicios ─── */
function Servicios() {
  return (
    <section id="servicios" className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div aria-hidden className="glow-blob glow-blob--hi animate-blob" style={{ width: 460, height: 460, top: 100, right: -140 }} />
      <div className="wrap relative py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "#8fb0ff" }}>Qué construimos</div>
          <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
            Todo tu negocio, conectado.
          </h2>
          <p className="mt-5 text-lg" style={{ color: "var(--paper-dim)" }}>
            Cinco piezas que se combinan distinto en cada automotora. El diagnóstico
            decide cuáles necesitás: capaz una, capaz las cinco.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviciosWeb.map((s, i) => (
            <Reveal as="article" key={s.n} delay={i * 70} className="glass reveal-scale p-7">
              <div className="num-xl" style={{ color: "rgba(143,176,255,0.22)" }}>{s.n}</div>
              <h3 className="font-display font-semibold mt-3 text-xl text-paper">{s.name}</h3>
              <p className="mt-3 text-sm" style={{ color: "var(--paper-dim)" }}>{s.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.canales.map((c) => (
                  <span key={c} className="chip chip-on-dark">{c}</span>
                ))}
              </div>
            </Reveal>
          ))}

          {/* Plan a medida */}
          <Reveal as="article" delay={serviciosWeb.length * 70} className="reveal-scale flex flex-col justify-between rounded-2xl p-7" style={{ background: "linear-gradient(150deg, var(--brand-accent), #16306b)", border: "1px solid rgba(143,176,255,0.35)", boxShadow: "0 20px 60px -20px rgba(47,95,214,0.6)" }}>
            <div>
              <span className="chip" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>
                Precio a medida
              </span>
              <h3 className="font-display font-semibold mt-4 text-xl text-white">No vendemos paquetes cerrados.</h3>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.88)" }}>
                Armamos un plan según tu diagnóstico y tu presupuesto. Pagás por lo que
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

/* ─── 4. Método ─── */
function Metodo() {
  return (
    <section id="metodo" className="relative overflow-hidden" style={{ background: "var(--page-2)" }}>
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 440, height: 440, bottom: -120, left: -100 }} />
      <div className="wrap relative py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "#8fb0ff" }}>Cómo trabajamos</div>
          <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
            Cinco pasos. Siempre los mismos.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {fases.map((f, i) => (
            <Reveal as="li" key={f.n} delay={i * 70} className="glass p-7">
              <div className="grid h-11 w-11 place-items-center rounded-full font-display font-semibold text-lg text-white" style={{ background: "var(--brand-accent)", boxShadow: "0 0 22px -4px rgba(47,95,214,0.7)" }}>
                {f.n}
              </div>
              <h3 className="font-display font-semibold mt-5 text-xl text-paper">{f.title}</h3>
              <p className="mt-3 text-sm" style={{ color: "var(--paper-dim)" }}>{f.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── 5. FAQ ─── */
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
      <div className="wrap relative py-24 md:py-32">
        <Reveal className="grid gap-12 md:grid-cols-[320px_1fr]">
          <div>
            <div className="label" style={{ color: "#8fb0ff" }}>Preguntas</div>
            <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)" }}>
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

/* ─── 6. CTA ─── */
function CTA() {
  return (
    <section id="contacto" className="relative overflow-hidden" style={{ background: "var(--page-2)" }}>
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 560, height: 400, top: -80, left: "50%", transform: "translateX(-50%)" }} />
      <div className="wrap relative py-24 md:py-32 text-center">
        <Reveal>
          <h2 className="font-display font-semibold mx-auto max-w-3xl text-paper" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
            Empezá por el diagnóstico.
            <br />
            <span className="accent-gradient">Es gratis y no te compromete a nada.</span>
          </h2>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#diagnostico" className="btn btn-shiny" style={{ borderRadius: "999px", height: 54, padding: "0 2rem" }}>
              Hacer el diagnóstico
            </a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark" style={{ borderRadius: "999px", height: 54 }}>
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
