import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Neuro Studio trata los datos que dejás en el diagnóstico y el sitio.",
  robots: { index: true, follow: true },
};

export default function Privacidad() {
  return (
    <main style={{ background: "var(--page)" }}>
      <div className="wrap py-24 md:py-28" style={{ maxWidth: "48rem" }}>
        <h1 className="font-display font-semibold text-paper" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Política de privacidad
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--paper-dim)" }}>
          Última actualización: agosto de 2026
        </p>

        <div className="mt-10 grid gap-8 text-body" style={{ color: "var(--paper-dim)", maxWidth: "none" }}>
          <Section titulo="Quiénes somos">
            Neuro Studio es un estudio con base en Salto, Uruguay, que construye software con IA
            para automotoras. Podés contactarnos en{" "}
            <a href={`mailto:${site.email}`} className="underline text-white">{site.email}</a>.
          </Section>

          <Section titulo="Qué datos recolectamos">
            Cuando completás el diagnóstico guardamos las respuestas que ingresás: el nombre de tu
            automotora, tu nombre, tu WhatsApp, tu ciudad y las respuestas sobre tu operación.
            No pedimos datos de tarjetas, contraseñas ni información sensible.
          </Section>

          <Section titulo="Para qué los usamos">
            Usamos esa información para preparar el análisis de tu diagnóstico y para contactarte
            si nos lo pedís (por WhatsApp o agendando una reunión). No los usamos para otra cosa.
          </Section>

          <Section titulo="Con quién los compartimos">
            No vendemos ni compartimos tus datos con terceros para publicidad. Se almacenan en
            infraestructura de Google (Firebase), que actúa como proveedor de hosting de la base de datos.
          </Section>

          <Section titulo="Cuánto tiempo los guardamos">
            Conservamos los diagnósticos mientras exista una relación comercial o interés de contacto.
            Podés pedirnos que los borremos cuando quieras escribiéndonos al correo de arriba.
          </Section>

          <Section titulo="Tus derechos">
            Podés pedir acceso a los datos que tenemos sobre vos, su corrección o su eliminación.
            Escribinos a {site.email} y lo resolvemos.
          </Section>

          <Section titulo="Cookies">
            El sitio no usa cookies de seguimiento ni analítica invasiva. El diagnóstico guarda tus
            respuestas en tu navegador hasta que las enviás.
          </Section>
        </div>

        <div className="mt-12">
          <a href="/" className="text-sm underline" style={{ color: "#8fb0ff" }}>← Volver al inicio</a>
        </div>
      </div>
    </main>
  );
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-semibold text-xl text-paper">{titulo}</h2>
      <p className="mt-2 text-sm leading-relaxed">{children}</p>
    </section>
  );
}
