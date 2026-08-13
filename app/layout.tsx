import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://neurostudio.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neuro Studio — SaaS, Chatbots y Webs para automotoras",
    template: "%s · Neuro Studio",
  },
  description:
    "Agencia de automatización con IA. Construimos SaaS, chatbots y sitios web de alto rendimiento para concesionarias y automotoras que quieren vender más sin sumar personal.",
  keywords: [
    "agencia de IA",
    "SaaS para automotoras",
    "chatbots para concesionarias",
    "webs para automotoras",
    "automatización con IA",
    "Neuro Studio",
  ],
  authors: [{ name: "Neuro Studio" }],
  creator: "Neuro Studio",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Neuro Studio",
    title: "Neuro Studio — SaaS, Chatbots y Webs para automotoras",
    description:
      "SaaS, chatbots y webs con IA para concesionarias que quieren vender más sin sumar personal.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Neuro Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neuro Studio",
    description: "SaaS, chatbots y webs con IA para automotoras.",
    images: ["/og.png"],
  },
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#05080f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Neuro Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Agencia de automatización con IA especializada en SaaS, chatbots y webs para automotoras.",
  sameAs: [] as string[],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "hola@neurostudio.ai",
      contactType: "sales",
      availableLanguage: ["Spanish", "English"],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-bg text-fg antialiased">
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
