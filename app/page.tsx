import Image from "next/image";
import Script from "next/script";
import { site, fases, areas, sistema, planes, datos } from "@/lib/site";
import { WhatsappMock } from "@/components/brand-mark";
import { CategoryMarquee } from "@/components/ops-ticker";
import { Reveal, CountUp } from "@/components/reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryMarquee />
      <Datos />
      <Metodo />
      <Diagnostico />
      <Sistema />
      <Planes />
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
      <div className="wrap relative pt-20 pb-24 md:pt-28 md:pb-32">
        <Reveal className="max-w-4xl">
          <h1
            className="font-display font-semibold text-paper"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Tu automotora pierde ventas todos los días.
            <br />
            <span style={{ color: "#8fb0ff" }}>Nosotros encontramos dónde.</span>
          </h1>
          <p className="mt-8 text-lg text-body" style={{ color: "var(--paper-dim)" }}>
            Diagnosticamos tu concesionaria, te mostramos exactamente qué se te
            está escapando y construimos el sistema para recuperarlo.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid-on-dark">
              Pedir diagnóstico gratis
            </a>
            <a href="#metodo" className="btn btn-on-dark">Ver cómo trabajamos</a>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span className="signal-dot" />
            Tomamos 2 clientes nuevos este semestre
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

/* ─── 3. Método ─── */
function Metodo() {
  return (
    <section id="metodo" className="border-b rule" style={{ background: "var(--bg-2)" }}>
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
              <div
                className="grid h-11 w-11 place-items-center rounded-full font-display font-semibold text-lg text-white"
                style={{ background: "var(--brand)" }}
              >
                {f.n}
              </div>
              <h3 className="font-display font-semibold mt-5 text-2xl" style={{ color: "var(--brand)" }}>
                {f.title}
              </h3>
              <p className="mt-3 text-body" style={{ color: "var(--fg-muted)" }}>{f.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── 4. Diagnóstico (dark) ─── */
function Diagnostico() {
  const total = Math.round(areas.reduce((s, a) => s + a.score, 0) / areas.length);
  return (
    <section style={{ background: "var(--ink)" }}>
      <div className="wrap py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "#8fb0ff" }}>Paso 1 · Diagnóstico</div>
          <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
            Un puntaje que te dice cuánta plata dejás sobre la mesa.
          </h2>
        </Reveal>

        <Reveal className="mt-14 grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
          <div>
            <div className="font-display font-semibold text-paper leading-none" style={{ fontSize: "6rem" }}>
              <CountUp end={total} />
              <span style={{ color: "var(--paper-dim)", fontSize: "3rem" }}>/100</span>
            </div>
            <p className="mt-4 text-body" style={{ color: "var(--paper-dim)" }}>
              Puntaje típico de una automotora uruguaya antes de trabajar con nosotros.
            </p>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid-on-dark mt-8">
              Ver el tuyo
            </a>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {areas.map((a) => (
              <li key={a.label} className="text-sm">
                <div className="flex items-baseline justify-between text-paper">
                  <span>{a.label}</span>
                  <span style={{ color: "var(--paper-dim)" }}>{a.score}</span>
                </div>
                <div className="score-bar-track mt-2" style={{ "--score": `${a.score}%` } as React.CSSProperties}>
                  <div className="score-bar-fill" />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 5. Sistema ─── */
function Sistema() {
  return (
    <section id="sistema" className="border-b rule">
      <div className="wrap py-24 md:py-32">
        <Reveal>
          <div className="label" style={{ color: "var(--brand-accent)" }}>Qué construimos</div>
          <h2 className="font-display font-semibold mt-4 max-w-2xl" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--brand)" }}>
            Todo tu negocio en un solo lugar.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 lg:items-center">
          <ul className="grid gap-8 sm:grid-cols-2">
            {sistema.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="border-t-2 pt-5" style={{ borderColor: "var(--brand)" }}>
                <h3 className="font-display font-semibold text-xl" style={{ color: "var(--brand)" }}>{s.title}</h3>
                <p className="mt-2 text-body" style={{ color: "var(--fg-muted)" }}>{s.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140}>
            <WhatsappMock />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Planes ─── */
function Planes() {
  return (
    <section id="planes" className="border-b rule" style={{ background: "var(--bg-2)" }}>
      <div className="wrap py-24 md:py-32">
        <Reveal>
          <div className="label" style={{ color: "var(--brand-accent)" }}>Planes</div>
          <h2 className="font-display font-semibold mt-4 max-w-2xl" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--brand)" }}>
            Empezás por donde estás.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {planes.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 70}>
              <div className="surface flex h-full flex-col p-8" style={p.featured ? { border: "2px solid var(--brand)" } : {}}>
                <h3 className="font-display font-semibold text-2xl" style={{ color: "var(--brand)" }}>{p.name}</h3>
                <div className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>{p.price}</div>
                <p className="mt-4 text-body" style={{ color: "var(--fg-muted)" }}>{p.body}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.outputs.map((o) => (
                    <li key={o} className="flex items-start gap-2.5">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--brand-accent)" }} />
                      {o}
                    </li>
                  ))}
                </ul>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto pt-8 ${p.featured ? "" : ""}`}
                  style={{ color: "var(--brand-accent)", fontWeight: 500 }}
                >
                  Empezar →
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── 7. FAQ ─── */
const faqs = [
  {
    q: "¿Cuánto sale?",
    a: "El diagnóstico es un pago único que definimos según el tamaño de tu operación. La primera reunión es sin costo y ahí te damos el precio cerrado.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "El diagnóstico, 2 a 3 semanas. La construcción muestra resultados cada 2 semanas. Los primeros números comerciales se ven al segundo o tercer mes.",
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
    a: "Por ahora solo Uruguay, para poder dar soporte cercano. Escribinos igual si estás en la región y lo evaluamos.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function FAQ() {
  return (
    <section id="preguntas" className="border-b rule">
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

/* ─── 8. CTA ─── */
function CTA() {
  return (
    <section id="contacto" style={{ background: "var(--ink)" }}>
      <div className="wrap py-24 md:py-32 text-center">
        <Reveal>
          <h2 className="font-display font-semibold mx-auto max-w-3xl text-paper" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
            Media hora. Sin costo.
            <br />
            Salís con un plan.
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid-on-dark">
              Agendar diagnóstico
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-on-dark">{site.email}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
