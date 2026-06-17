# HANDOFF.md - Contexto de Continuacion del Proyecto Portfolio

> **Proposito**: Este archivo es el puente entre sesiones. Si arrancas una sesion nueva en este proyecto, lee este archivo PRIMERO. Te ahorra 20 minutos de "que carajo hicimos la ultima vez".
>
> **Ultima actualizacion**: Junio 2026, sesion security hardening + metadata cleanup.

---

## TL;DR (30 segundos)

El proyecto esta **deployado en produccion**. Sprint production-readiness completado y mergado a `main`. Branch `dev` activa con security hardening, CI/CD mejorado y metadata cleanup.

**Completados en esta sesion:**
- Eliminado "Senior" del metadata (layout.tsx, opengraph-image.tsx) — titulo honesto "Backend Developer"
- CI/CD mejorado: + unit tests, + E2E tests, + security audit (npm audit)
- HSTS header agregado (max-age=63072000, includeSubDomains, preload)
- CSP environment-aware: unsafe-eval solo en development, eliminado en production
- Imports muertos eliminados (createPortal, framer-motion en HomeClientContent.tsx)
- robots.ts limpiado (disallow /api/ inexistente eliminado)
- Nivel de inglés aclarado en chat: bilingüe nativo con contexto familiar real

---

## Estado del Repo

| Recurso | Estado |
|---------|--------|
| Branch actual | `dev` |
| `main` | Deployado, al dia con `origin/main` |
| Working tree | Limpio |
| Ultimo commit | `2b0eed8 fix(security): CSP environment-aware, dead imports cleanup, robots, CI audit, i18n consistency` |

Commits en `dev` recientes:
```bash
git log --oneline -5
# 2b0eed8 fix(security): CSP environment-aware, dead imports cleanup, robots, CI audit, i18n consistency
# b6fb9e7 tests al CI pipeline,Agregar HSTS header
# 18ca816 chore: update lock file and agents.md testing section
# 01bfb84 docs: update README with testing infrastructure and CI/CD
# 0edb098 docs: update HANDOFF.md and AGENTS.md with current project state
```

---

## Lo que Queda Para Merge

La branch `dev` esta lista para PR a `main`. Contiene los cambios del sprint anterior + security hardening de esta sesion.

### Tests Unitarios (252 tests)

| Archivo | Tests | Funciones cubiertas |
|---------|-------|---------------------|
| `utils.test.ts` | 6 | `cn()` (clsx + twMerge) |
| `timelineUtils.test.ts` | 71 | `parseSpanishDate`, `computeDurationInMonths`, `computeDurationString`, `calculateTimelinePositions`, `expColors` |
| `chatUtils.test.ts` | 117 | `normalizeText`, `tokenize`, `calculateMatchScore`, `isAffirmativeResponse`, `findFollowUpResponse`, `findBestResponse`, `getResponseMessage`, `processUserMessage`, `isValidInput` |
| `i18n.test.ts` | 13 | `t()`, lookup, interpolation, bilingual |
| `snippetLoader.test.ts` | 22 | `detectLanguage` (15 extensions), `loadSnippetsServer` (mock fs) |
| `snippetLoaderClient.test.ts` | 23 | `detectLanguage` (15 extensions), `loadSnippetsClient` (mock fetch) |

### Tests E2E (36 tests)

| Archivo | Tests | Qué cubre |
|---------|-------|-----------|
| `navigation.spec.ts` | 9 | Home, secciones, footer, links |
| `i18n.spec.ts` | 5 | Default ES, toggle EN, persistencia, traducciones |
| `projects.spec.ts` | 14 | Cards, modal 4 tabs, close, slug pages |
| `chat.spec.ts` | 10 | Toggle, open, welcome, quick actions, send, close |

### CI/CD

- `.github/workflows/ci.yml` — lint + typecheck + security audit + unit tests + build + E2E tests
- `package.json` — scripts `typecheck`, `test:unit`, `test:e2e`
- **Security audit** (`npm audit --audit-level=high`) ejecuta antes de los tests
- **E2E tests** instalan chromium automaticamente en CI

### Para mergear:
```bash
git checkout main
git merge dev
git push origin main
```

---

## Gaps Residuales (Priorizados)

### Completados en esta sesion
- ~~Quitar "Senior" del metadata~~ (layout.tsx, opengraph-image.tsx)
- ~~Tests en CI pipeline~~ (unit + E2E + security audit)
- ~~HSTS header~~ (next.config.ts)
- ~~CSP environment-aware~~ (unsafe-eval solo en dev)
- ~~Imports muertos eliminados~~ (createPortal, framer-motion)
- ~~robots.ts limpiado~~ (disallow /api/ eliminado)
- ~~Nivel de inglés aclarado~~ (chat responses: bilingüe nativo con contexto familiar)

### MEDIA prioridad
1. **Migrar a `next-intl`** con routing `/en/*` (reemplaza i18n custom con cookie)
2. **Cerrar 9 manual browser tests** del SDD previo `estrategia-visualizacion-tecnica`
3. **IA real en el chat** con Gemini API (interfaz `AIProvider`/`ChatConfig` ya preparada)
4. **Dynamic import del Chat** en layout (carga en cada pagina incluyendo 404)
5. **Mover "use client"** de Timeline.tsx a TimelineDesktop/Mobile
6. **Agregar error.tsx** en app/ y projects/[slug]/

### BAJA prioridad
1. Menu de navegacion con resaltado de seccion
2. Modo claro/oscuro con persistencia (next-themes)
3. Optimizacion de imagenes (reemplazar <img> por next/image)
4. Analisis de rendimiento (Lighthouse, Web Vitals)
5. Tests de componentes (@testing-library/react)
6. Deployar Security Header Scanner como live demo

---

## Stack Actual (versiones exactas)

| Paquete | Version |
|---------|---------|
| Next.js | 16.2.1 |
| React | 19.2.4 |
| TypeScript | 5.9.3 (strict) |
| Tailwind CSS | 4.2.2 |
| framer-motion | 12.38.0 |
| Vitest | 4.1.8 |
| Playwright | latest |
| npm | gestor de paquetes |

Path aliases: `@/*` -> `./src/*` (definido en `tsconfig.json`).

---

## Scripts Disponibles

```bash
npm run dev          # Next.js dev server
npm run build        # Next.js production build
npm run lint         # ESLint + Prettier check
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

## Lineage de Archivos Importantes

### Nuevos (esta sesion)
- `.github/workflows/ci.yml` — GitHub Actions CI/CD
- `src/lib/__tests__/timelineUtils.test.ts` — 71 tests unitarios
- `src/lib/__tests__/chatUtils.test.ts` — 117 tests unitarios
- `src/lib/__tests__/i18n.test.ts` — 13 tests unitarios
- `src/lib/__tests__/snippetLoader.test.ts` — 22 tests unitarios
- `src/lib/__tests__/snippetLoaderClient.test.ts` — 23 tests unitarios
- `playwright.config.ts` — Config Playwright
- `tests/e2e/navigation.spec.ts` — 9 tests E2E
- `tests/e2e/i18n.spec.ts` — 5 tests E2E
- `tests/e2e/projects.spec.ts` — 14 tests E2E
- `tests/e2e/chat.spec.ts` — 10 tests E2E
- `tests/e2e/tsconfig.json` — Config TS para E2E

### Modificados (esta sesion)
- `package.json` — scripts `typecheck`, `test:unit`, `test:e2e` + devDeps (vitest, playwright, testing-library)
- `src/app/layout.tsx` — "Senior" eliminado de todos los metadatos (title, OG, Twitter, JSON-LD)
- `src/app/opengraph-image.tsx` — "Senior" eliminado de alt text y titulo visible
- `.github/workflows/ci.yml` — +security audit, +unit tests, +E2E tests
- `next.config.ts` — CSP environment-aware, +HSTS header
- `src/app/robots.ts` — disallow /api/ eliminado
- `src/components/HomeClientContent.tsx` — imports muertos eliminados (createPortal, framer-motion)
- `src/data/chat/responses/languages.ts` — nivel de inglés actualizado a bilingüe nativo
- `src/data/chat/followUps.ts` — follow-up de idiomas actualizado

### Eliminados (esta sesion)
- `src/data/chatData.ts` — monolito 2300+ lineas (refactorizado a `/data/chat/` modular)
- Branches: `dev`, `ref`, `cambios-en-proyecto` (locales y remotas)

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
