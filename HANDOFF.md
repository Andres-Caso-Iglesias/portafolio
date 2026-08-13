# HANDOFF.md - Contexto de Continuacion del Proyecto Portfolio

> **Proposito**: Este archivo es el puente entre sesiones. Si arrancas una sesion nueva en este proyecto, lee este archivo PRIMERO. Te ahorra 20 minutos de "que carajo hicimos la ultima vez".
>
> **Ultima actualizacion**: Julio 2026, revision de documentacion completa.

---

## TL;DR (30 segundos)

El proyecto esta **deployado en produccion**. Sprint production-readiness completado y mergado a `main`. Gemini AI integrado en el chat con rate limiting y fallback rule-based.

**Estado actual:**
- Branch `main` deployada en produccion
- Gemini AI integrado en chat (`/api/chat/route.ts`) con rate limiting, contexto del perfil y fallback rule-based
- 252 unit tests + 36 E2E tests + CI/CD completo
- 46 archivos de respuestas chat (refactorizado desde monolito 2300+ lineas)

---

## Estado del Repo

| Recurso | Estado |
|---------|--------|
| Branch actual | `main` |
| `main` | Deployado, al dia con `origin/main` |
| Working tree | Limpio |
| Ultimo commit | `04b0f2f fix: dont trust IA it boke he lint` |

Commits recientes:
```bash
git log --oneline -5
# 04b0f2f fix: dont trust IA it boke he lint
# 0dd39ff fix: cambio keywords por error en tests
# cd849d8 fix: reajustes respuestas chat, cambio colores botones y sub botones enlace a hack platforms
```

---

## Stack Actual (versiones exactas)

| Paquete | Version |
|---------|---------|
| Next.js | 16.2.1 |
| React | 19.2.4 |
| TypeScript | 5.9.3 (strict) |
| Tailwind CSS | 4.2.2 |
| Vitest | 4.1.8 |
| Playwright | 1.61.0 |
| server-only | 0.0.1 |

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
npm run test:unit    # Vitest unit tests (252 tests)
npm run test:e2e     # Playwright E2E tests (36 tests)
```

---

## Estructura de Tests

```
/src/lib/__tests__/
  utils.test.ts           # 6 tests - cn()
  timelineUtils.test.ts   # 71 tests - fechas, duraciones, posiciones
  chatUtils.test.ts       # 117 tests - matching, respuestas, pipeline
  i18n.test.ts            # 13 tests - traducciones, interpolacion
  snippetLoader.test.ts   # 22 tests - deteccion idioma, carga server
  snippetLoaderClient.test.ts # 23 tests - deteccion idioma, carga client

/tests/e2e/
  navigation.spec.ts      # 9 tests - home, secciones, footer
  i18n.spec.ts            # 5 tests - toggle idioma, persistencia
  projects.spec.ts        # 14 tests - cards, modal, slug pages
  chat.spec.ts            # 10 tests - toggle, mensajes, quick actions
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
npm run test:unit                    # 252 unit tests
npx vitest run --reporter=verbose    # verbose output
npm run test:e2e                     # 36 E2E tests
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

*Si encontras algo desactualizado en este archivo, actualizalo. Es living documentation.*
