# HANDOFF.md - Contexto de Continuacion del Proyecto Portfolio

> **Proposito**: Este archivo es el puente entre sesiones. Si arrancas una sesion nueva en este proyecto, lee este archivo PRIMERO. Te ahorra 20 minutos de "que carajo hicimos la ultima vez".
>
> **Ultima actualizacion**: Junio 2026, sesion post-merge a main + testing + CI/CD.

---

## TL;DR (30 segundos)

El proyecto esta **deployado en produccion**. Sprint production-readiness completado y mergado a `main`. Branch `feat/vitest-unit-tests` activa con 252 tests unitarios + 36 tests E2E + GitHub Actions CI/CD configurado.

**Completados en esta sesion:**
- Merge `ref` -> `main` (fast-forward, 3 commits: refactor chat, headers/protocols, CV)
- Eliminadas branches obsoletas (`dev`, `ref`, `cambios-en-proyecto`) local y remotamente
- 252 tests unitarios en `/src/lib/__tests__/` (6 archivos, 100% pass)
- 36 tests E2E con Playwright en `/tests/e2e/` (4 archivos, 100% pass en chromium)
- GitHub Actions CI/CD (lint + typecheck + build en cada PR/push a main)
- Scripts nuevos: `typecheck`, `test:unit`, `test:e2e`

---

## Estado del Repo

| Recurso | Estado |
|---------|--------|
| Branch actual | `feat/vitest-unit-tests` |
| `main` | Deployado, al dia con `origin/main` |
| Working tree | Limpio |
| Ultimo commit | `bf9f0ab test(e2e): add Playwright E2E tests` |

Commits en `feat/vitest-unit-tests` desde `main`:
```bash
git log --oneline main..feat/vitest-unit-tests
# bf9f0ab test(e2e): add Playwright E2E tests for navigation, i18n, projects and chat
# 02317d1 ci: add GitHub Actions workflow for lint, typecheck and build
# aa8cc12 test(lib): add unit tests for timelineUtils, chatUtils, i18n, snippetLoader
```

---

## Lo que Queda Para Merge

La branch `feat/vitest-unit-tests` esta lista para PR a `main`. Contiene:

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

- `.github/workflows/ci.yml` — lint + typecheck + build en cada PR/push a main
- `package.json` — scripts `typecheck`, `test:unit`, `test:e2e`

### Para mergear:
```bash
git checkout main
git merge feat/vitest-unit-tests
git push origin main
```

---

## Gaps Residuales (Priorizados)

### MEDIA prioridad
1. **Migrar a `next-intl`** con routing `/en/*` (reemplaza i18n custom con cookie)
2. **Cerrar 9 manual browser tests** del SDD previo `estrategia-visualizacion-tecnica`
3. **IA real en el chat** con Gemini API (interfaz `AIProvider`/`ChatConfig` ya preparada)

### BAJA prioridad
1. Menu de navegacion con resaltado de seccion
2. Modo claro/oscuro con persistencia (next-themes)
3. Optimizacion de imagenes
4. Analisis de rendimiento (Lighthouse, Web Vitals)

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
git diff main..feat/vitest-unit-tests --stat

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
