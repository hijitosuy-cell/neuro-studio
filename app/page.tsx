import Image from "next/image";
import Script from "next/script";
import { site, fases, serviciosWeb, datos } from "@/lib/site";
import { WhatsappMock } from "@/components/brand-mark";
import { CategoryMarquee } from "@/components/ops-ticker";
import { Reveal } from "@/components/reveal";
import { DiagnosticoTool } from "@/components/diagnostico-tool";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryMarquee />
      <Datos />
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
    <section className="relative overflow-hidden" style={{ background: "var(--ink)" }}>
      <div aria-hidden className="glow-top absolute inset-x-0 top-0 h-[60%]" />
      <div className="wrap relative pt-20 pb-24 md:pt-28 md:pb-32">
        <Reveal className="max-w-4xl">
          <span className="chip chip-on-dark pulse-badge">
            <span className="signal-dot mr-2" /> Diagnóstico 100% gratis
          </span>
          <h1
            className="font-display font-semibold mt-6 text-paper"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Tu automotora pierde ventas todos los días.
            <br />
            <span className="accent-gradient">Nosotros encontramos dónde.</span>
          </h1>
          <p className="mt-8 text-lg text-body" style={{ color: "var(--paper-dim)" }}>
            Hacé el diagnóstico y en minutos sabés en qué porcentaje trabaja tu
            concesionaria. Después construimos el sistema para recuperar lo que se escapa.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#diagnostico" className="btn btn-solid-on-dark lift">
              Hacer el diagnóstico gratis
            </a>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark">
              Agendar reunión
            </a>
          </div>
        </Reveal>

        <div aria-hidden className="pointer-events-none hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.07]">
          <Image src="/neuro-studio-logo.png" alt="" width={560} height={560} style={{ filter: "brightness(0) invert(1)" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Datos ─── */
function Datos() {
  return (
    <section className="border-b rule">
      <div className="wrap py-20 md:py-24">
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {datos.map((d, i) => (
            <Reveal as="li" key={d.figure} delay={i * 70}>
              <div className="font-display font-semibold" style={{ fontSize: "clamp(2.5rem, 4vw, 3.25rem)", color: "var(--brand)" }}>
                {d.figure}
              </div>
              <p className="mt-2 text-sm text-body" style={{ color: "var(--fg-muted)" }}>{d.label}</p>
              <div className="mt-2 text-xs" style={{ color: "var(--fg-muted)", opacity: 0.7 }}>{d.source}</div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── 3. Diagnóstico (prominente, banda destacada) ─── */
function Diagnostico() {
  return (
    <section id="diagnostico" className="relative scroll-mt-20 border-b rule" style={{ background: "var(--bg-2)" }}>
      <div aria-hidden className="glow-top absolute inset-x-0 top-0 h-40" />
      <div className="wrap relative py-24 md:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="chip pulse-badge" style={{ background: "rgba(16,185,129,0.1)", color: "#059669", borderColor: "rgba(16,185,129,0.25)" }}>
            <span className="signal-dot mr-2" /> Gratis · sin cuenta · 5 minutos
          </span>
          <h2 className="font-display font-semibold mt-6" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", color: "var(--brand)" }}>
            ¿En qué porcentaje trabaja tu automotora?
          </h2>
          <p className="mt-6 text-lg text-body mx-auto" style={{ color: "var(--fg-muted)" }}>
            Respondé unas preguntas y te damos un puntaje por área y uno general, con
            el detalle de dónde estás perdiendo ventas. Es el primer paso, y no te cuesta nada.
          </p>
        </Reveal>

        <div className="mt-14">
          <DiagnosticoTool />
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Servicios (numerados, estilo agentes) + plan a medida ─── */
function Servicios() {
  return (
    <section id="servicios" className="border-b rule" style={{ background: "var(--ink)" }}>
      <div className="wrap py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "#8fb0ff" }}>Qué construimos</div>
          <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
            Todo tu negocio en un solo lugar.
          </h2>
          <p className="mt-5 text-body" style={{ color: "var(--paper-dim)" }}>
            Estas son las piezas. En tu automotora se combinan distinto según lo que
            marque el diagnóstico: capaz necesitás una, capaz las cinco.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviciosWeb.map((s, i) => (
            <Reveal as="article" key={s.n} delay={i * 60} className="surface-dark lift p-7">
              <div className="num-xl" style={{ color: "rgba(143,176,255,0.2)" }}>{s.n}</div>
              <h3 className="font-display font-semibold mt-3 text-xl text-paper">{s.name}</h3>
              <p className="mt-3 text-sm text-body" style={{ color: "var(--paper-dim)" }}>{s.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.canales.map((c) => (
                  <span key={c} className="chip chip-on-dark">{c}</span>
                ))}
              </div>
            </Reveal>
          ))}

          {/* Tarjeta plan a medida */}
          <Reveal as="article" delay={serviciosWeb.length * 60} className="lift flex flex-col justify-between rounded-[14px] p-7" style={{ background: "var(--brand-accent)", border: "1px solid var(--brand-accent)" }}>
            <div>
              <div className="chip" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>
                Precio a medida
              </div>
              <h3 className="font-display font-semibold mt-4 text-xl text-white">
                No vendemos paquetes cerrados.
              </h3>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                Armamos un plan según tu diagnóstico y tu presupuesto. Pagás por lo que
                necesitás, no por una lista de servicios que no vas a usar. El diagnóstico es gratis.
              </p>
            </div>
            <a href="#diagnostico" className="mt-6 inline-flex text-sm font-medium text-white underline underline-offset-4">
              Empezar por el diagnóstico →
            </a>
          </Reveal>
        </div>

        {/* Mockup WhatsApp como muestra viva */}
        <Reveal className="mt-16 grid gap-10 lg:grid-cols-[1fr_400px] lg:items-center">
          <div>
            <div className="label" style={{ color: "#8fb0ff" }}>En acción</div>
            <h3 className="font-display font-semibold mt-3 text-2xl md:text-3xl text-paper">
              Así responde el asistente mientras dormís.
            </h3>
            <p className="mt-4 text-body" style={{ color: "var(--paper-dim)" }}>
              Un cliente escribe un sábado a la noche. El asistente le contesta al
              instante, le pasa el precio, coordina el test-drive y le avisa al vendedor.
              Sin que nadie del equipo tenga que estar.
            </p>
          </div>
          <WhatsappMock />
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 5. Método ─── */
function Metodo() {
  return (
    <section id="metodo" className="border-b rule">
      <div className="wrap py-24 md:py-32">
        <Reveal>
          <div className="label" style={{ color: "var(--brand-accent)" }}>Cómo trabajamos</div>
          <h2 className="font-display font-semibold mt-4 max-w-2xl" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--brand)" }}>
            Cinco pasos. Siempre los mismos.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {fases.map((f, i) => (
            <Reveal as="li" key={f.n} delay={i * 70}>
              <div className="grid h-11 w-11 place-items-center rounded-full font-display font-semibold text-lg text-white" style={{ background: "var(--brand)" }}>
                {f.n}
              </div>
              <h3 className="font-display font-semibold mt-5 text-2xl" style={{ color: "var(--brand)" }}>{f.title}</h3>
              <p className="mt-3 text-body" style={{ color: "var(--fg-muted)" }}>{f.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── 6. FAQ ─── */
const faqs = [
  {
    q: "¿Cuánto sale?",
    a: "El diagnóstico es gratis. Lo que se construye después se cotiza a medida según lo que necesites y el tamaño de tu operación. En la reunión te damos un precio cerrado, sin sorpresas.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "El diagnóstico lo hacés en minutos desde la web. Lo que se construye muestra resultados cada 2 semanas; los primeros números comerciales se ven al segundo o tercer mes.",
  },
  {
    q: "¿Se integra con lo que ya uso?",
    a: "Sí. WhatsApp Business, MercadoLibre, Instagram, Google Calendar, Meta Ads y los CRM más usados. Si tenés algo distinto, lo evaluamos en el diagnóstico.",
  },
  {
    q: "¿De quién son los datos?",
    a: "Tuyos. El código y la información quedan en tu concesionaria. Si dejás de trabajar con nosotros, te queda todo funcionando.",
  },
  {
    q: "¿Trabajan fuera de Uruguay?",
    a: "Nuestra base está en Salto, Uruguay, y ahí damos soporte cercano. Si estás en la región, escribinos igual y lo evaluamos.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function FAQ() {
  return (
    <section id="preguntas" className="border-b rule" style={{ background: "var(--bg-2)" }}>
      <div className="wrap py-24 md:py-32">
        <Reveal className="grid gap-12 md:grid-cols-[320px_1fr]">
          <div>
            <div className="label" style={{ color: "var(--brand-accent)" }}>Preguntas</div>
            <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", color: "var(--brand)" }}>
              Lo que nos preguntan.
            </h2>
          </div>
          <div className="divide-y rule border-t border-b rule">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                  <span className="font-display font-semibold text-lg md:text-xl" style={{ color: "var(--brand)" }}>{f.q}</span>
                  <span aria-hidden className="shrink-0 text-xl transition group-open:rotate-45" style={{ color: "var(--fg-muted)" }}>+</span>
                </summary>
                <p className="mt-3 text-body" style={{ color: "var(--fg-muted)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 7. CTA ─── */
function CTA() {
  return (
    <section id="contacto" className="relative overflow-hidden" style={{ background: "var(--ink)" }}>
      <div aria-hidden className="glow-top absolute inset-x-0 top-0 h-[70%]" />
      <div className="wrap relative py-24 md:py-32 text-center">
        <Reveal>
          <h2 className="font-display font-semibold mx-auto max-w-3xl text-paper" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
            Empezá por el diagnóstico.
            <br />
            <span className="accent-gradient">Es gratis y no te compromete a nada.</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#diagnostico" className="btn btn-solid-on-dark lift">
              Hacer el diagnóstico
            </a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark">
              Escribinos por WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm" style={{ color: "var(--paper-dim)" }}>
            o agendá una reunión en{" "}
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "white" }}>
              nuestra agenda
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
