"use client";

import { site } from "@/lib/site";
import { WhatsappMock, NeuroPanelMock, CatalogoMock, AdsMock, ContenidoMock } from "@/components/brand-mark";
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
      <Sistema />
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

/* ─── 3. Método (OSCURO): proceso conectado, monocromo azul ─── */
/** Íconos de cada fase (stroke, a medida) */
const FASE_ICONS = [
  // 1 Detectamos — lupa
  <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.4-4.4" /></>,
  // 2 Diseñamos — regla/escuadra
  <><path d="M4 16.5L16.5 4l3.5 3.5L7.5 20z" /><path d="M9 9l2 2M12.5 5.5l2 2M6.5 11.5l2 2" /></>,
  // 3 Construimos — bloques
  <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><path d="M17 13.5v7M13.5 17h7" /></>,
  // 4 Activamos — cohete
  <><path d="M12 3c3.5 2 5.5 5.5 5.5 9.5L12 17l-5.5-4.5C6.5 8.5 8.5 5 12 3z" /><circle cx="12" cy="10" r="1.8" /><path d="M9 18.5c-1 1.5-1 3 -1 3s1.5 0 3-1M15 18.5c1 1.5 1 3 1 3s-1.5 0-3-1" /></>,
  // 5 Escalamos — barras en alza
  <><path d="M4 20h16" /><rect x="6" y="12" width="3.5" height="5" rx="1" /><rect x="11.5" y="8" width="3.5" height="9" rx="1" /><rect x="17" y="4.5" width="3.5" height="12.5" rx="1" /></>,
];

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

        {/* Bloques con spotlight, ícono y contenido centrado */}
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {fases.map((f, i) => (
            <Spotlight as="li" key={f.n} tone="dark" className="step-card h-full p-6 text-center" style={{ transitionDelay: `${i * 70}ms` }}>
              <span aria-hidden className="pointer-events-none absolute right-4 top-3 font-display font-semibold leading-none select-none" style={{ fontSize: 44, color: "rgba(143,176,255,0.10)" }}>{f.n}</span>
              <div
                className="relative mx-auto grid h-12 w-12 place-items-center rounded-xl"
                style={{ background: "rgba(47,95,214,0.18)", border: "1px solid rgba(143,176,255,0.28)", boxShadow: "0 8px 24px -12px rgba(47,95,214,0.8)" }}
              >
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="#8fb0ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {FASE_ICONS[i]}
                </svg>
              </div>
              <div className="relative mt-4 text-[11px] font-semibold uppercase" style={{ color: "#8fb0ff", letterSpacing: "0.14em" }}>{f.kicker}</div>
              <h3 className="font-display font-semibold mt-1.5 text-base text-paper">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>{f.body}</p>
            </Spotlight>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── 4. Sistema (CLARO): las piezas, cada una con su ejemplo real ─── */
function Sistema() {
  const { t, servicios } = useLang();
  const mocks = [<NeuroPanelMock key="p" />, <WhatsappMock key="w" />, <CatalogoMock key="c" />, <AdsMock key="a" />, <ContenidoMock key="n" />];

  return (
    <section id="producto" className="scroll-mt-20" style={{ background: "#fff" }}>
      <div className="wrap py-24 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="label" style={{ color: "var(--brand-accent)" }}>{t.metodo.showKicker}</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(1.55rem, 5vw, 3rem)", color: "var(--brand)" }}>{t.metodo.showTitle}</h2>
          <p className="mx-auto mt-5 max-w-md text-base md:max-w-xl md:text-lg" style={{ color: "var(--fg-muted)" }}>{t.servicios.sub}</p>
        </Reveal>

        <div id="servicios" className="mt-16 grid gap-14 scroll-mt-20 md:gap-20">
          {servicios.map((s, i) => (
            <Reveal key={s.n} as="article" className="grid items-center gap-7 lg:grid-cols-2 lg:gap-12">
              {/* Texto — alterna de lado en desktop */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-bold" style={{ color: "rgba(47,95,214,0.22)" }}>{s.n}</span>
                  <h3 className="font-display font-semibold text-xl md:text-2xl" style={{ color: "var(--brand)" }}>{s.name}</h3>
                </div>
                <p className="mt-3 text-[0.95rem] md:text-base" style={{ color: "var(--fg-muted)" }}>{s.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.canales.map((c) => (<span key={c} className="chip">{c}</span>))}
                </div>
              </div>
              {/* Ejemplo real del sistema */}
              <div className={`rounded-2xl p-2.5 ${i % 2 === 1 ? "lg:order-1" : ""}`} style={{ background: "var(--bg-2)", border: "1px solid var(--rule)" }}>
                {mocks[i]}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center md:p-10"
          style={{ background: "linear-gradient(150deg, var(--brand-accent), #16306b)", boxShadow: "0 20px 60px -20px rgba(47,95,214,0.5)" }}>
          <div>
            <span className="chip" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>{t.servicios.planChip}</span>
            <h3 className="font-display font-semibold mt-4 text-xl text-white md:text-2xl">{t.servicios.planTitle}</h3>
            <p className="mt-3 max-w-xl text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{t.servicios.planBody}</p>
          </div>
          <a href="#diagnostico" className="btn shrink-0" style={{ background: "#fff", borderColor: "#fff", color: "var(--brand)", borderRadius: "999px" }}>
            {t.servicios.planCta}
          </a>
        </Reveal>
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
      <div className="wrap relative py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="chip chip-on-dark">{t.agendar.kicker}</span>
          <h2 className="font-display font-semibold mt-5 text-paper" style={{ fontSize: "clamp(1.6rem, 5vw, 3.25rem)" }}>{t.agendar.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base md:text-lg" style={{ color: "var(--paper-dim)" }}>{t.agendar.sub}</p>
        </Reveal>

        {/* Qué pasa en la llamada: compacto en celular, tarjetas en desktop */}
        <div className="mx-auto mt-9 grid max-w-3xl gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          {cards.map((c, i) => (
            <Reveal as="article" key={c.n} delay={i * 80} className="step-card flex gap-3 p-4 md:block md:p-6">
              <span className="font-display text-lg font-bold leading-none md:text-2xl" style={{ color: "rgba(143,176,255,0.4)" }}>{c.n}</span>
              <div className="md:mt-3">
                <h3 className="font-display font-semibold text-[15px] text-paper md:text-lg">{c.ti}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed md:mt-2.5 md:text-sm" style={{ color: "var(--paper-dim)" }}>{c.bo}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Calendario, con rótulo explícito de que es para reservar el horario */}
        <Reveal className="mx-auto mt-12 max-w-4xl">
          <div className="text-center">
            <h3 className="font-display font-semibold inline-flex items-center gap-2 text-lg text-paper md:text-xl">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="#8fb0ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
              </svg>
              {t.agendar.calTitle}
            </h3>
            <p className="mt-1.5 text-[13px]" style={{ color: "var(--paper-dim)" }}>{t.agendar.calNote}</p>
          </div>

          <div className="reveal-scale mt-5 overflow-hidden rounded-2xl" style={{ border: "1px solid var(--rule-d)", background: "#0b1122" }}>
            <iframe
              src={`${site.bookingUrl}?embed=true&theme=dark&hideEventTypeDetails=false`}
              title="Elegir día y hora para la reunión"
              className="h-[620px] w-full md:h-[760px]"
              style={{ border: "0" }}
              loading="lazy"
            />
          </div>
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
      {/* Showroom como textura de fondo, muy opaca: cierra el relato sin distraer */}
      <div aria-hidden className="absolute inset-0">
        <img src="/showroom.jpg" alt="" className="h-full w-full object-cover" style={{ opacity: 0.14 }} loading="lazy" decoding="async" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--page-2) 0%, rgba(10,17,34,0.82) 45%, var(--page-2) 100%)" }} />
      </div>
      <div aria-hidden className="glow-blob glow-blob--brand" style={{ width: 620, height: 320, bottom: -140, left: "50%", transform: "translateX(-50%)" }} />
      <div className="wrap relative border-t py-20 text-center" style={{ borderColor: "var(--rule-d)" }}>
        <Reveal>
          <p className="font-display font-semibold mx-auto max-w-4xl text-paper md:whitespace-nowrap" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.3rem)", lineHeight: 1.15 }}>
            {t.cta.title2}
          </p>
          <div className="mt-8">
            <a href="#diagnostico" className="btn btn-shiny" style={{ borderRadius: "999px", height: 54, padding: "0 2.2rem" }}>{t.cta.cta1}</a>
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
