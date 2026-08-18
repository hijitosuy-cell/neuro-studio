"use client";

import { site } from "@/lib/site";
import { WhatsappMock, NeuroPanelMock } from "@/components/brand-mark";
import { Reveal } from "@/components/reveal";
import { Spotlight } from "@/components/spotlight";
import { HeroVideo } from "@/components/hero-video";
import { DiagnosticoLauncher } from "@/components/diagnostico-launcher";
import { useLang } from "@/components/lang-provider";
import { faqsI18n } from "@/lib/i18n";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqsI18n.es.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero />
      <div className="horizon horizon-light" aria-hidden />
      <Diagnostico />
      <div className="horizon horizon-dark" aria-hidden />
      <Metodo />
      <div className="horizon horizon-light" aria-hidden />
      <Producto />
      <Servicios />
      <div className="horizon horizon-dark" aria-hidden />
      <Agendar />
      <FAQ />
      <CTA />
    </>
  );
}

/* ─── 1. Hero ─── */
function Hero() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <HeroVideo />
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 440, height: 440, top: 160, left: -140, opacity: 0.32 }} />
      <div aria-hidden className="glow-blob glow-blob--hi animate-blob" style={{ width: 360, height: 360, top: 280, right: -110, opacity: 0.3, animationDelay: "3s" }} />
      <div className="wrap relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center py-14 text-center md:min-h-[86vh] md:py-24">
        <Reveal className="max-w-4xl">
          <span className="chip chip-on-dark">{t.hero.chip}</span>
          <h1 className="font-display font-semibold mt-5 text-paper md:mt-6" style={{ fontSize: "clamp(1.45rem, 5.4vw, 3.4rem)", lineHeight: 1.1 }}>
            {t.hero.title1}
            <br />
            <span className="accent-gradient whitespace-nowrap">{t.hero.title2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] md:mt-6 md:text-lg" style={{ color: "var(--paper-dim)" }}>{t.hero.sub}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9">
            <a href="#diagnostico" className="btn btn-shiny" style={{ borderRadius: "999px", height: 52, padding: "0 1.9rem" }}>{t.hero.cta1}</a>
            <a href="#metodo" className="btn btn-on-dark" style={{ borderRadius: "999px", height: 52 }}>{t.hero.cta2}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 2. Diagnóstico (CLARO, abre modal) ─── */
function Diagnostico() {
  const { t } = useLang();
  return (
    <section id="ver-diagnostico" className="scroll-mt-20" style={{ background: "#fff" }}>
      <div className="wrap py-24 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="label" style={{ color: "var(--brand-accent)" }}>{t.diag.kicker}</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(1.6rem, 5vw, 3.25rem)", color: "var(--brand)" }}>{t.diag.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg" style={{ color: "var(--fg-muted)" }}>{t.diag.sub}</p>
        </Reveal>
        <div className="mt-12">
          <DiagnosticoLauncher />
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Método (OSCURO): proceso en bloques conectados ─── */
const FASE_ACCENTS = ["#8fb0ff", "#7cff9e", "#ffbf47", "#ff9b9b", "#c9a0ff"];

function Metodo() {
  const { t, fases } = useLang();
  return (
    <section id="metodo" className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <div className="wrap relative py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="label" style={{ color: "#8fb0ff" }}>{t.metodo.kicker}</div>
          <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(1.55rem, 5vw, 2.7rem)" }}>{t.metodo.title}</h2>
          <p className="mt-4 text-base" style={{ color: "var(--paper-dim)" }}>{t.metodo.sub}</p>
        </Reveal>

        {/* Mobile/tablet: línea de tiempo vertical conectada, con números de color por fase */}
        <ol className="relative mx-auto mt-12 max-w-md lg:hidden">
          <span aria-hidden className="absolute bottom-3 left-[21px] top-3 w-px" style={{ background: "linear-gradient(180deg, #8fb0ff, #c9a0ff)" }} />
          {fases.map((f, i) => (
            <Reveal as="li" key={f.n} delay={i * 60} className="relative flex gap-4 pb-8 last:pb-0">
              <span
                className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-base font-semibold"
                style={{ background: "var(--page)", border: `2px solid ${FASE_ACCENTS[i]}`, color: FASE_ACCENTS[i] }}
              >
                {f.n}
              </span>
              <div className="pt-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: FASE_ACCENTS[i] }}>{f.kicker}</div>
                <h3 className="font-display font-semibold text-[17px] text-paper" style={{ marginTop: 2 }}>{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>{f.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Desktop: 5 pasos en fila, cada uno con su color */}
        <ol className="mt-14 hidden gap-5 lg:grid lg:grid-cols-5">
          {fases.map((f, i) => (
            <Spotlight as="li" key={f.n} tone="dark" className="step-card h-full p-6" style={{ transitionDelay: `${i * 70}ms` }}>
              <span aria-hidden className="pointer-events-none absolute right-4 top-3 font-display font-semibold leading-none select-none" style={{ fontSize: 44, color: `${FASE_ACCENTS[i]}1f` }}>{f.n}</span>
              <div className="relative flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-semibold" style={{ background: `${FASE_ACCENTS[i]}22`, color: FASE_ACCENTS[i], border: `1px solid ${FASE_ACCENTS[i]}55` }}>{f.n}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: FASE_ACCENTS[i] }}>{f.kicker}</span>
              </div>
              <h3 className="font-display font-semibold mt-4 text-base text-paper">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>{f.body}</p>
            </Spotlight>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── 4. Producto (CLARO): el software real ─── */
function Producto() {
  const { t } = useLang();
  return (
    <section id="producto" style={{ background: "#fff" }}>
      <div className="wrap py-24 md:py-28">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "var(--brand-accent)" }}>{t.metodo.showKicker}</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(1.55rem, 5vw, 3rem)", color: "var(--brand)" }}>{t.metodo.showTitle}</h2>
          <p className="mt-5 text-lg" style={{ color: "var(--fg-muted)" }}>{t.metodo.showSub}</p>
        </Reveal>

        <Reveal className="reveal-scale mt-10 overflow-hidden rounded-2xl" style={{ border: "1px solid var(--rule)" }}>
          <img
            src="/showroom.jpg"
            alt="Autos en exposición dentro de un showroom moderno"
            className="h-[220px] w-full object-cover md:h-[300px]"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Reveal>
            <div className="flex items-baseline gap-2">
              <span className="chip">El cerebro</span>
              <h3 className="font-display font-semibold text-lg" style={{ color: "var(--brand)" }}>Tu panel de control</h3>
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
              Cada mañana te dice qué hacer: a qué clientes llamar primero, cuánta plata está en riesgo y cómo va cada área. Ejemplo con datos de muestra.
            </p>
            <div className="mt-4 rounded-2xl p-2" style={{ background: "var(--bg-2)" }}>
              <NeuroPanelMock />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-baseline gap-2">
              <span className="chip">El asistente</span>
              <h3 className="font-display font-semibold text-lg" style={{ color: "var(--brand)" }}>Atiende por WhatsApp</h3>
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
              Responde 24/7, informa el stock y agenda test-drives solo. Deriva al vendedor cuando el cliente está listo para comprar.
            </p>
            <div className="mt-4 rounded-2xl p-2" style={{ background: "var(--bg-2)" }}>
              <WhatsappMock />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Servicios (CLARO): las piezas ─── */
function Servicios() {
  const { t, servicios } = useLang();
  return (
    <section id="servicios" className="border-t rule" style={{ background: "var(--bg-2)" }}>
      <div className="wrap py-24 md:py-28">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "var(--brand-accent)" }}>{t.servicios.kicker}</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(1.55rem, 5vw, 3rem)", color: "var(--brand)" }}>{t.servicios.title}</h2>
          <p className="mt-5 text-lg" style={{ color: "var(--fg-muted)" }}>{t.servicios.sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <Reveal as="article" key={s.n} delay={i * 60} className="card-light p-7">
              <div className="num-xl" style={{ color: "rgba(47,95,214,0.16)" }}>{s.n}</div>
              <h3 className="font-display font-semibold mt-3 text-xl" style={{ color: "var(--brand)" }}>{s.name}</h3>
              <p className="mt-3 text-sm" style={{ color: "var(--fg-muted)" }}>{s.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.canales.map((c) => (<span key={c} className="chip">{c}</span>))}
              </div>
            </Reveal>
          ))}

          <Reveal as="article" delay={servicios.length * 60} className="flex flex-col justify-between rounded-2xl p-7" style={{ background: "linear-gradient(150deg, var(--brand-accent), #16306b)", boxShadow: "0 20px 60px -20px rgba(47,95,214,0.5)" }}>
            <div>
              <span className="chip" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>{t.servicios.planChip}</span>
              <h3 className="font-display font-semibold mt-4 text-xl text-white">{t.servicios.planTitle}</h3>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{t.servicios.planBody}</p>
            </div>
            <a href="#diagnostico" className="mt-6 inline-flex text-sm font-medium text-white underline underline-offset-4">{t.servicios.planCta}</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Agendar (OSCURO, embed cal.com) ─── */
function Agendar() {
  const { t } = useLang();
  const cards = [
    { n: "01", ti: t.agendar.c1t, bo: t.agendar.c1b },
    { n: "02", ti: t.agendar.c2t, bo: t.agendar.c2b },
    { n: "03", ti: t.agendar.c3t, bo: t.agendar.c3b },
  ];
  return (
    <section id="agendar" className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <div className="wrap relative py-24 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <span className="chip chip-on-dark">{t.agendar.kicker}</span>
            <h2 className="font-display font-semibold mt-5 text-paper" style={{ fontSize: "clamp(1.6rem, 5vw, 3.25rem)" }}>{t.agendar.title}</h2>
            <p className="mt-5 max-w-2xl text-lg" style={{ color: "var(--paper-dim)" }}>{t.agendar.sub}</p>
          </Reveal>
          <Reveal delay={120} className="reveal-scale overflow-hidden rounded-2xl" style={{ border: "1px solid var(--rule-d)" }}>
            <img
              src="/asesor.jpg"
              alt="Un asesor repasa un auto junto a una clienta en el showroom"
              className="h-[240px] w-full object-cover lg:h-[300px]"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal as="article" key={c.n} delay={i * 80} className="step-card p-6">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl font-bold" style={{ color: "rgba(143,176,255,0.4)" }}>{c.n}</span>
                <h3 className="font-display font-semibold text-lg text-paper">{c.ti}</h3>
              </div>
              <p className="mt-2.5 text-sm" style={{ color: "var(--paper-dim)" }}>{c.bo}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="reveal-scale mt-10 overflow-hidden rounded-2xl" style={{ border: "1px solid var(--rule-d)", background: "#0b1122" }}>
          <iframe
            src={`${site.bookingUrl}?embed=true&theme=dark&hideEventTypeDetails=false`}
            title="Agendar reunión"
            className="w-full"
            style={{ height: "760px", border: "0" }}
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FAQ (OSCURO) ─── */
function FAQ() {
  const { t, faqs } = useLang();
  return (
    <section id="preguntas" className="border-t" style={{ background: "var(--page-2)", borderColor: "var(--rule-d)" }}>
      <div className="wrap py-24 md:py-28">
        <Reveal className="grid gap-12 md:grid-cols-[320px_1fr]">
          <div>
            <div className="label" style={{ color: "#8fb0ff" }}>{t.faqKicker}</div>
            <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(1.55rem, 5vw, 2.75rem)" }}>{t.faqTitle}</h2>
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

/* ─── CTA final (distinto al hero): cierre simple ─── */
function CTA() {
  const { t } = useLang();
  return (
    <section id="contacto" className="relative overflow-hidden" style={{ background: "var(--page-2)" }}>
      <div aria-hidden className="glow-blob glow-blob--brand" style={{ width: 620, height: 320, bottom: -140, left: "50%", transform: "translateX(-50%)" }} />
      <div className="wrap relative border-t py-20 text-center" style={{ borderColor: "var(--rule-d)" }}>
        <Reveal>
          <p className="font-display font-semibold mx-auto max-w-4xl text-paper md:whitespace-nowrap" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.3rem)", lineHeight: 1.15 }}>
            {t.cta.title2}
          </p>
          <div className="mt-8">
            <a href="#agendar" className="btn btn-shiny" style={{ borderRadius: "999px", height: 54, padding: "0 2.2rem" }}>{t.cta.cta1}</a>
          </div>
          <p className="mt-5 text-sm" style={{ color: "var(--paper-dim)" }}>
            {t.cta.agenda}{" "}
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline text-white">WhatsApp</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
