import type { Metadata, Viewport } from "next";
import { Poppins, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const display = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://neuro-studio-l6lj.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neuro Studio · Sistemas para automotoras en Uruguay",
    template: "%s · Neuro Studio",
  },
    description:
    "Detectamos dónde tu automotora pierde ventas y construimos el sistema para recuperarlas. Diagnóstico gratuito para concesionarias uruguayas.",
  keywords: [
    "Método Neuro Studio",
    "software para automotoras Uruguay",
    "CRM para concesionarias",
    "chatbot para concesionaria",
    "SaaS automotor",
    "Neuro Scan",
    "automatización concesionaria",
    "Neuro Studio Salto Uruguay",
  ],
  authors: [{ name: "Neuro Studio" }],
  creator: "Neuro Studio",
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: SITE_URL,
    siteName: "Neuro Studio",
    title: "Neuro Studio · Método de transformación para automotoras",
    description: "Detectamos dónde tu automotora pierde ventas y construimos el sistema para recuperarlas.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Neuro Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neuro Studio",
    description: "Método de transformación comercial para automotoras.",
    images: ["/og.png"],
  },
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1c3f",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Neuro Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/neuro-studio-logo.png`,
  description: "Estudio uruguayo de software con IA especializado en automotoras. Método propio de transformación comercial.",
  areaServed: { "@type": "Country", name: "Uruguay" },
  contactPoint: [{
    "@type": "ContactPoint",
    email: "neurovidstudioia@gmail.com",
    contactType: "sales",
    availableLanguage: ["Spanish"],
  }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-UY" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen antialiased">
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
