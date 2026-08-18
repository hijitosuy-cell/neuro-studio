"use client";

import { site } from "@/lib/site";
import { WhatsappMock, NeuroPanelMock } from "@/components/brand-mark";
import { Reveal } from "@/components/reveal";
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
      <Servicios />
      <div className="horizon horizon-dark" aria-hidden />
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
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 480, height: 480, top: -160, left: -120 }} />
      <div aria-hidden className="glow-blob glow-blob--hi animate-blob" style={{ width: 380, height: 380, top: -40, right: -80, animationDelay: "3s" }} />
      <div className="wrap relative flex min-h-[86vh] flex-col items-center justify-center py-24 text-center">
        <Reveal className="max-w-3xl">
          <span className="chip chip-on-dark">{t.hero.chip}</span>
          <h1 className="font-display font-semibold mt-6 text-paper" style={{ fontSize: "clamp(2rem, 4.6vw, 3.75rem)", lineHeight: 1.05 }}>
            {t.hero.title1}
            <br />
            <span className="accent-gradient">{t.hero.title2}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base md:text-lg" style={{ color: "var(--paper-dim)" }}>{t.hero.sub}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(2rem, 4.4vw, 3.25rem)", color: "var(--brand)" }}>{t.diag.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg" style={{ color: "var(--fg-muted)" }}>{t.diag.sub}</p>
        </Reveal>
        <div className="mt-12">
          <DiagnosticoLauncher />
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Método (OSCURO) ─── */
function Metodo() {
  const { t, fases, servicios } = useLang();
  return (
    <section id="metodo" className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 460, height: 460, top: 60, left: -140 }} />
      <div className="wrap relative py-24 md:py-28">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "#8fb0ff" }}>{t.metodo.kicker}</div>
          <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>{t.metodo.title}</h2>
          <p className="mt-5 text-lg" style={{ color: "var(--paper-dim)" }}>{t.metodo.sub}</p>
        </Reveal>

        <div className="relative mt-16">
          <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px lg:block" style={{ background: "linear-gradient(90deg, transparent, rgba(47,95,214,0.6) 12%, rgba(47,95,214,0.6) 88%, transparent)" }} />
          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {fases.map((f, i) => (
              <Reveal as="li" key={f.n} delay={i * 90} className="relative">
                <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full font-display font-semibold text-base text-white" style={{ background: "var(--brand-accent)", boxShadow: "0 0 0 4px var(--page), 0 0 24px -4px rgba(47,95,214,0.8)" }}>{f.n}</div>
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8fb0ff" }}>{f.kicker}</div>
                  <h3 className="font-display font-semibold mt-1.5 text-lg text-paper">{f.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--paper-dim)" }}>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-24 max-w-2xl">
          <div className="label" style={{ color: "#8fb0ff" }}>{t.metodo.showKicker}</div>
          <h3 className="font-display font-semibold mt-3 text-2xl md:text-3xl text-paper">{t.metodo.showTitle}</h3>
          <p className="mt-4 text-base" style={{ color: "var(--paper-dim)" }}>{t.metodo.showSub}</p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Reveal className="glass p-3.5"><NeuroPanelMock /></Reveal>
          <Reveal className="glass p-3.5" delay={120}><WhatsappMock /></Reveal>
        </div>

        <Reveal className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {servicios.map((s) => (
            <div key={s.n} className="rounded-xl px-4 py-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(143,176,255,0.14)" }}>
              <span className="font-mono text-xs" style={{ color: "#8fb0ff" }}>{s.n}</span>
              <div className="mt-1.5 text-sm font-medium text-paper">{s.name}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.canales.slice(0, 2).map((c) => (
                  <span key={c} className="rounded-full px-2 py-0.5 text-[10px]" style={{ background: "rgba(47,95,214,0.14)", color: "#8fb0ff" }}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 4. Servicios (CLARO) ─── */
function Servicios() {
  const { t, servicios } = useLang();
  return (
    <section id="servicios" style={{ background: "#fff" }}>
      <div className="wrap py-24 md:py-28">
        <Reveal className="max-w-2xl">
          <div className="label" style={{ color: "var(--brand-accent)" }}>{t.servicios.kicker}</div>
          <h2 className="font-display font-semibold mt-4" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "var(--brand)" }}>{t.servicios.title}</h2>
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

/* ─── 5. FAQ (OSCURO) ─── */
function FAQ() {
  const { t, faqs } = useLang();
  return (
    <section id="preguntas" className="relative overflow-hidden" style={{ background: "var(--page)" }}>
      <div className="wrap relative py-24 md:py-28">
        <Reveal className="grid gap-12 md:grid-cols-[320px_1fr]">
          <div>
            <div className="label" style={{ color: "#8fb0ff" }}>{t.faqKicker}</div>
            <h2 className="font-display font-semibold mt-4 text-paper" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}>{t.faqTitle}</h2>
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

/* ─── 6. CTA (OSCURO) ─── */
function CTA() {
  const { t } = useLang();
  return (
    <section id="contacto" className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom, var(--page), var(--page-2))" }}>
      <div aria-hidden className="bg-grid absolute inset-0" style={{ maskImage: "linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent)" }} />
      <div aria-hidden className="glow-blob glow-blob--brand animate-blob" style={{ width: 560, height: 380, top: -40, left: "50%", transform: "translateX(-50%)" }} />
      <div className="wrap relative py-24 md:py-28 text-center">
        <Reveal>
          <h2 className="font-display font-semibold mx-auto max-w-3xl text-paper" style={{ fontSize: "clamp(2rem, 4.6vw, 3.5rem)" }}>
            {t.cta.title1}
            <br />
            <span className="accent-gradient">{t.cta.title2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base md:text-lg" style={{ color: "var(--paper-dim)" }}>{t.cta.sub}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#diagnostico" className="btn btn-shiny" style={{ borderRadius: "999px", height: 52, padding: "0 1.9rem" }}>{t.cta.cta1}</a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark" style={{ borderRadius: "999px", height: 52 }}>{t.cta.cta2}</a>
          </div>
          <p className="mt-6 text-sm" style={{ color: "var(--paper-dim)" }}>
            {t.cta.agenda}{" "}
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="underline text-white">{t.cta.agendaLink}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
