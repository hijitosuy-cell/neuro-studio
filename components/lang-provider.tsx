"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, fasesI18n, serviciosI18n, faqsI18n, type Lang } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof dict)["es"];
  fases: (typeof fasesI18n)["es"];
  servicios: (typeof serviciosI18n)["es"];
  faqs: (typeof faqsI18n)["es"];
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("ns-lang")) as Lang | null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("ns-lang", l);
      document.documentElement.lang = l === "en" ? "en" : "es-UY";
    }
  };

  const value: Ctx = {
    lang,
    setLang,
    t: dict[lang],
    fases: fasesI18n[lang],
    servicios: serviciosI18n[lang],
    faqs: faqsI18n[lang],
  };

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang debe usarse dentro de LangProvider");
  return c;
}

/** Toggle ES/EN estilo Scalefy */
export function LangToggle({ onDark = true }: { onDark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className="inline-flex items-center rounded-full p-0.5 text-xs font-semibold"
      style={{ background: onDark ? "rgba(255,255,255,0.06)" : "var(--bg-2)", border: `1px solid ${onDark ? "var(--rule-d)" : "var(--rule)"}` }}
    >
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="rounded-full px-2.5 py-1 uppercase transition"
          style={{
            background: lang === l ? "var(--brand-accent)" : "transparent",
            color: lang === l ? "#fff" : onDark ? "var(--paper-dim)" : "var(--fg-muted)",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
