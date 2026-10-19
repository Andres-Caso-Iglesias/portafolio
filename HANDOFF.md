# HANDOFF.md - Contexto de Continuacion del Proyecto Portfolio

> **Proposito**: Este archivo es el puente entre sesiones. Si arrancas una sesion nueva en este proyecto, lee este archivo PRIMERO. Te ahorra 20 minutos de "que carajo hicimos la ultima vez".
>
> **Ultima actualizacion**: Octubre 2026 — rediseño v3.2, Fase 1 (casos de estudio) completada.

---

## TL;DR (30 segundos)

El proyecto esta **deployado en produccion** (via `main`). El rediseño v3.2 se ejecuta en la rama `rediseño`: Fase 0a y 0b completadas, **Fase 1 (casos de estudio) completada y empujada**.

**Estado actual:**

- Branch activa: `rediseño` (commits `2cdd506`, `d227667`, `a8ac6d3` pushados a `origin/rediseño`); NO tocar `main` hasta el lanzamiento del MVP
- Fase 1: 3 casos de estudio en `/case-studies/[slug]` (QReaper, VulnPrio, Security Header Scanner) con enlace desde la ficha de proyecto y respuestas de chat sincronizadas
- Gemini AI **dormido**: sin `GOOGLE_AI_API_KEY` en Vercel, chat 100% rule-based (flag `NEXT_PUBLIC_AI_ENABLED=false`)
- 298 unit tests + 51 E2E tests, todas las puertas en verde (lint, typecheck, smoke, build)

---

## Estado del Repo

| Recurso       | Estado                                                        |
| ------------- | ------------------------------------------------------------- |
| Branch actual | `rediseño`                                                    |
| `main`        | Deployado en produccion (intacto durante el rediseño)          |
| `rediseño`    | Al dia con `origin/rediseño`                                  |
| Working tree  | Limpio                                                        |
| Ultimo commit | `a8ac6d3 feat(fase-1): anade casos de estudio...`             |

Commits recientes (rama `rediseño`):

```bash
git log --oneline -4
# a8ac6d3 feat(fase-1): anade casos de estudio de QReaper, VulnPrio y Security Header Scanner
# d227667 feat(fase-0b): refuerzo de cabeceras, flag AI, tokens de diseno e i18n
# 2cdd506 fix(seo): unifica siteUrl en constante compartida y corrige errata
# ce59caa feat: update cv's
```

---

## Stack Actual (versiones exactas)

| Paquete      | Version        |
| ------------ | -------------- |
| Next.js      | 16.4.0         |
| React        | 19.2.4         |
| TypeScript   | 5.9.3 (strict) |
| Tailwind CSS | 4.2.2          |
| Vitest       | 4.1.8          |
| Playwright   | 1.61.0         |
| server-only  | 0.0.1          |

**NOTA**: `framer-motion` NO esta instalado (solo es mockeado en `vitest.setup.tsx`).

Path aliases: `@/*` -> `./src/*` (definido en `tsconfig.json`).

---

## Scripts Disponibles

```bash
npm run dev          # Next.js dev server (--webpack)
npm run build        # Next.js production build
npm run start        # Next.js production server
npm run lint         # ESLint
npm run typecheck    # TypeScript --noEmit
npm run test         # Smoke tests (i18n + seo)
npm run test:unit    # Vitest unit tests (298 tests)
npm run test:e2e     # Playwright E2E tests (51 tests)
```

---

## Estructura de Tests

```
/src/lib/__tests__/  # 8 archivos, 298 tests (todos en verde)
  utils.test.ts           # 6 tests - cn()
  timelineUtils.test.ts   # 71 tests - fechas, duraciones, posiciones
  chatUtils.test.ts       # 117 tests - matching, respuestas, pipeline
  i18n.test.ts            # 18 tests - traducciones, interpolacion, paridad ES/EN
  snippetLoader.test.ts   # 22 tests - deteccion idioma, carga server
  snippetLoaderClient.test.ts # 23 tests - deteccion idioma, carga client
  projectsChatSync.test.ts # 18 tests - sync projectsData con secciones de chat
  caseStudyChatSync.test.ts # 23 tests - sync caseStudiesData con respuestas de chat

/tests/e2e/  # 5 archivos, 51 tests (aprobados en chromium, webkit y firefox)
  navigation.spec.ts      # 9 tests - home, secciones, footer
  i18n.spec.ts            # 5 tests - toggle idioma, persistencia
  projects.spec.ts        # 16 tests - cards, modal, slug pages
  chat.spec.ts            # 10 tests - toggle, mensajes, quick actions
  case-studies.spec.ts    # 9 tests - secciones, ERD, back-link, 404, EN
  tsconfig.json           # Config TS para tests E2E
```

---

## Funcionalidades Clave

### Chat "Pinche de Andres" (Gemini AI)

- **Endpoint**: `/api/chat/route.ts` — Gemini AI con rate limiting in-memory
- **Contexto**: `src/data/chat/aiContext.ts` — perfil estatico para system prompt
- **Rate Limiter**: `src/lib/rateLimiter.ts` — IP + session
- **Fallback**: Rule-based con 46 categorias de respuesta en `/data/chat/responses/`
- **Config**: Sin `GEMINI_API_KEY` en `.env.local`, el chat usa fallback rule-based

### i18n Custom

- Cookie `lang` + localStorage + LanguageContext
- `<html lang>` dinamico desde el primer byte
- `server-only` en `i18n-server.ts` y `snippetLoader.ts` (defense-in-depth)

### SEO

- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (1200x630)
- JSON-LD Person en `layout.tsx`
- Favicons: `icon.svg` + `apple-icon.svg` (Next 16 convention) + `favicon.ico` (legacy)

---

## Pendientes de Revision y Material (Fase 1 - casos de estudio)

> Registrado en Octubre 2026. Estos dos items quedan **abiertos a proposito**: el codigo esta completo y verificado, pero el contenido y el material visual dependen de revision/produccion del autor.

### 1. Revisar las secciones "Que haria distinto" (REDACCION PENDIENTE DEL AUTOR)

Los 3 casos de estudio (`src/data/caseStudiesData.ts`) incluyen la seccion `lessons` ("Que haria distinto" / "What I would do differently"). **Esas secciones fueron redactadas por IA a partir de la arquitectura existente** en `projectsData.ts`; no pasaron por la voz profesional de Andres.

- **Que falta**: que el autor lea las 3 secciones (`lessons` de `qreaper`, `vulnprio` y `auditoria-web`) y las reescriba/refine en primera persona con su criterio real.
- **Por que importa**: es contenido de posicionamiento profesional dirigido a reclutadores y clientes; la voz autentica pesa mas que la correccion tecnica.
- **Donde tocar**: `src/data/caseStudiesData.ts`, campo `lessons` de cada caso. Bilingue (ES + EN).
- **No rompe nada**: cambiar texto no afecta tests (las suites solo validan presencia y longitud, no contenido exacto).

### 2. Capturas / GIFs de proyectos (MATERIAL PENDIENTE DEL AUTOR)

Los casos de estudio y las fichas de proyecto funcionan sin imagenes de interfaz, pero ganarian mucho con material visual.

- **Mas impactantes**: VulnPrio (dashboard de priorizacion / scoring) y Security Header Scanner (resultado del escaneo con score 0-100).
- **Donde ponerlo**: `/public/screenshots/` (directorio aun no existe). En `caseStudiesData.ts` se puede anadir un campo opcional tipo `gallery` si se quiere un carrusel; hoy la pagina ya renderiza el ERD si `erdPath` esta presente.
- **Nota**: QReaper no tiene ERD (es un pipeline, no una base de datos); su representacion visual natural seria un diagrama de las 5 etapas o un GIF del decode.

---

## Gaps Residuales (Priorizados)

### MEDIA prioridad

1. **Migrar a `next-intl`** con routing `/en/*` (reemplaza i18n custom con cookie)
2. **Cerrar 9 manual browser tests** del SDD previo `estrategia-visualizacion-tecnica`
3. **Dynamic import del Chat** en layout (carga en cada pagina incluyendo 404)
4. **Mover "use client"** de Timeline.tsx a TimelineDesktop/Mobile
5. **Agregar error.tsx** en app/ y projects/[slug]/

### BAJA prioridad

1. Menu de navegacion con resaltado de seccion
2. Modo claro/oscuro con persistencia (next-themes)
3. Optimizacion de imagenes (reemplazar <img> por next/image)
4. Analisis de rendimiento (Lighthouse, Web Vitals)
5. Tests de componentes (@testing-library/react)

---

## Convenciones que se Mantienen

- **Sin emojis** en codigo, commits, docs, specs, mensajes
- **Sin `Co-Authored-By`** en commits
- **Conventional commits**: `<tipo>(<alcance>): <descripcion>` (feat, fix, docs, style, refactor, perf, test, chore)
- **1 task = 1 commit**, subject sin punto final
- **No `npm run build`** durante desarrollo (norma del proyecto)
- **TS strict**: sin `any`, `@ts-ignore`, `console.log`
- **Idioma commits**: espanol o ingles consistente
- **Rioplatense** en comunicacion con el autor

---

## Comandos Utiles

```bash
# Estado del repo
git status
git log --oneline -10
git diff main..dev --stat

# Tests
npm run test:unit                    # 298 unit tests
npx vitest run --reporter=verbose    # verbose output
npm run test:e2e                     # 51 E2E tests
npx playwright test --project=chromium  # solo chromium (rapido)
npx playwright test --ui             # UI interactiva

# CI/CD local
npm run lint
npm run typecheck
npm run build

# Smoke tests (rapidos)
node tests/i18n_smoke.js
node tests/seo_smoke.js

# Buscar regresiones
grep -r "Seniority Hibrido" src/ tests/
```

---

## Como Recuperar Contexto en una Sesion Nueva

### Paso 1: Engram (memoria entre sesiones)

```bash
mem_search query="production-readiness portfolio" project="C:\Users\intri\Desktop\openCodeProy\portfolio"
mem_context project="C:\Users\intri\Desktop\openCodeProy\portfolio"
```

### Paso 2: Este archivo

Leer `HANDOFF.md` (este) + `AGENTS.md` (convenciones + estado actual).

### Paso 3: Git

```bash
git log --oneline -10
git status
git branch -a
```

### Paso 4: Skill registry

Leer `.atl/skill-registry.md` para saber que skills hay disponibles en el proyecto.

---

_Si encontras algo desactualizado en este archivo, actualizalo. Es living documentation._
