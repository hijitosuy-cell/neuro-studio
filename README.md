# Neuro Studio

Sitio corporativo de Neuro Studio — agencia de IA especializada en **SaaS, chatbots y webs para automotoras**.

Stack: **Next.js 16** (App Router) · **Tailwind v4** · **TypeScript** · deploy en **Vercel**.

## Desarrollo local

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Configuración

Variables de entorno (opcional — todo funciona sin ellas):

- `NEXT_PUBLIC_SITE_URL` — URL de producción, ej `https://neurostudio.ai`. Se usa en metadata, sitemap, robots y JSON-LD.

Edita `lib/site.ts` para cambiar:

- Email de contacto (`hola@neurostudio.ai`)
- URL de Cal.com (`https://cal.com/neurostudio/intro`)
- Enlaces de navegación

## SEO incluido

- `metadata` con OG + Twitter cards, `metadataBase`, canonical
- `app/sitemap.ts` y `app/robots.ts` dinámicos
- JSON-LD `Organization` en `layout.tsx`
- Jerarquía correcta: un solo `h1`, `h2` por sección, `h3` en tarjetas
- Lang `es`, `theme-color`, viewport meta
- Sin dependencias pesadas — 100% static, Lighthouse 95+ esperado

## Seguridad

En `next.config.ts` ya están configurados los headers:

- Strict-Transport-Security (HSTS + preload)
- Content-Security-Policy (frame permitido para `cal.com`)
- X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- `poweredByHeader: false`

Formulario de contacto: por ahora usa `mailto:` y booking externo (Cal.com), así **no exponemos** ninguna API pública ni base de datos. Si más adelante querés un formulario propio, se agrega una API route con rate-limit + validación con Zod + envío por Resend.

## Deploy en Vercel (gratis)

**Opción A — desde el dashboard (más simple):**

1. Subí el repo a GitHub (ver más abajo).
2. Entrá a [vercel.com/new](https://vercel.com/new), conectá tu GitHub y seleccioná el repo `neuro-studio`.
3. Vercel detecta Next.js automáticamente. Click "Deploy".
4. En **Settings → Environment Variables** agregá `NEXT_PUBLIC_SITE_URL` con la URL final (ej `https://neurostudio.vercel.app` o tu dominio).
5. Redeploy.

**Opción B — CLI:**

```bash
npm i -g vercel
vercel login        # abre el navegador
vercel              # primer deploy (preview)
vercel --prod       # deploy a producción
```

## Subir a GitHub

```bash
cd neuro-studio
git init
git add .
git commit -m "Neuro Studio site"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/neuro-studio.git
git push -u origin main
```

## Impeccable (skills de diseño)

Ya instalado en `.claude/`. Comandos disponibles dentro de Claude Code:

- `/impeccable init` — configuración inicial (correr una vez)
- `/impeccable audit` — chequeo técnico (a11y, performance, responsive)
- `/impeccable critique` — review de diseño
- `/impeccable polish` — pulido final antes de shippear
- `/impeccable bolder` · `/impeccable quieter` — ajustar intensidad visual

## Higgsfield (generación de imágenes/video)

CLI y skills instaladas. Pasos que tenés que hacer vos:

```bash
higgsfield auth login
```

Se abre el navegador para iniciar sesión. Después las skills `higgsfield-*` en `.claude/skills/` quedan listas para usar dentro de Claude Code.

## Estructura

```
app/
  layout.tsx        # metadata SEO, fuentes, JSON-LD
  page.tsx          # home
  globals.css       # tokens de color, componentes base
  sitemap.ts
  robots.ts
components/
  site-header.tsx
  site-footer.tsx
lib/
  site.ts           # configuración pública del sitio
  cn.ts
```
