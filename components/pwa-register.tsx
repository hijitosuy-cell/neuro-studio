"use client";

import { useEffect } from "react";

/** Registra el service worker: sin esto el navegador no ofrece instalar la app. */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    // En desarrollo no: interfiere con el hot reload
    if (window.location.hostname === "localhost") return;

    const id = window.setTimeout(() => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // si falla, la web sigue funcionando igual; solo no se puede instalar
      });
    }, 1200);

    return () => window.clearTimeout(id);
  }, []);

  return null;
}
