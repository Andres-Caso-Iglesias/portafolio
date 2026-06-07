# HANDOFF.md - Contexto de Continuacion del Proyecto Portfolio

> **Proposito**: Este archivo es el puente entre sesiones. Si arrancas una sesion nueva en este proyecto, lee este archivo PRIMERO. Te ahorra 20 minutos de "que carajo hicimos la ultima vez".
>
> **Ultima actualizacion**: Junio 2026, post-sprint `production-readiness-sprint` + refactor chatData + server-only install.

---

## TL;DR (30 segundos)

Sprint **production-readiness** cerrado y archivado. 39 commits atomicos, 36/36 requirements OK. Branch `dev` listo para PR a `main`. Lo unico que falta para deploy: ajustar placeholders de JSON-LD, hacer `npm run build`, correr 14 manual browser tests, mergear y deployar a Vercel.

**Completados post-sprint:**
- ✅ Refactor `chatData.ts` monolito (2300+ lineas) → arquitectura modular `/data/chat/` (35 archivos individuales, deduplicado salary+compensation, keywords limpias, prioridad explicita)
- ✅ Fix 2 errores TS pre-existentes (`messagesEndRef` tipado en `ChatActions`)
- ✅ Instalado `server-only` package en `i18n-server.ts` y `snippetLoader.ts` (defense-in-depth)

**Pendiente ALTA:** Vitest + tests unitarios para `/lib` (utils, timelineUtils, chatUtils, chatData matching)

---

## Estado del Repo

| Recurso | Estado |
|---------|--------|
| Branch actual | `dev` |
| Sync con `origin/dev` | Al dia |
| `main` | Espera merge + deploy |
| Ultimo commit | cierre del sprint (39 commits desde inicio) |
| Working tree | Limpio (cambios de docs en `AGENTS.md` + `HANDOFF.md` por este handoff) |

Comando para ver el sprint entero:
```bash
git log --oneline -39
git diff origin/dev..HEAD
```

---

## Lo que Falta Para Deploy (INMEDIATO)

### 1. Ajustar placeholders de JSON-LD (5 min)
Archivo: `src/app/layout.tsx`

Buscar el bloque `JSON-LD Person` y reemplazar:
- `sameAs`: URLs reales de LinkedIn y GitHub del autor (estan vacias hoy)
- `alumniOf`: nombre real de la universidad donde curso el master

### 2. Build local
```bash
npm run build
```
Verificar que compile sin errores. El proyecto no usa `npm run build` durante desarrollo (norma), pero para deploy hay que confirmar que compila.

### 3. Manual browser tests
Hay **14 test cases** documentados en el verify-report (engram ID #180) que requieren validacion manual. Cubren: cambio de idioma, modal de proyectos, slug page, chat, theme switch, JSON-LD rendering, OG image, etc.

### 4. Merge a main y deploy
```bash
git checkout main
git merge dev
git push origin main
# Vercel detectara el push y deployara automaticamente
```

---

### Estado de Gaps ALTA (Post-Sprint)

| Gap | Estado | Detalle |
|-----|--------|---------|
| Fix 2 errores TS (`messagesEndRef`) | ✅ **DONE** | Agregado `messagesEndRef: React.RefObject<HTMLDivElement \| null>` a `ChatActions` |
| Instalar `server-only` | ✅ **DONE** | `npm i server-only`, agregado a `i18n-server.ts` y `snippetLoader.ts` |
| Refactor `chatData.ts` monolito | ✅ **DONE** | 2300+ lineas → 35 archivos en `/data/chat/responses/`, deduplicado, keywords limpias |
| **Vitest + tests unitarios `/lib`** | 🔴 **PENDIENTE** | utils, timelineUtils, chatUtils, chatData matching |

---

## Contexto del Sprint Anterior (production-readiness)

### 5 puntos originales del sprint
1. Stack actualizado a Next.js 16 + React 19 + TypeScript 5.9 + Tailwind 4
2. i18n custom con cookie (LanguageContext + useLanguage + getLangFromCookie)
3. Slug page optimizada con loadSnippetsServer (441 → 186 lineas)
4. SEO completo (sitemap, robots, OG image, JSON-LD, favicons)
5. Chat con Next.js 16 (era Next.js 19 stale) + follow-ups con markdown links

### Logros cuantificables
- 39 commits atomicos (1 task = 1 commit)
- 36/36 requirements OK en verify
- 14 archivos creados
- 16+ archivos modificados
- 9 archivos eliminados
- Net **-200 lineas de codigo** (cleanup agresivo)

### Decisiones de arquitectura clave
- **Approach B** para fix de `next/headers` en barrel: `i18n.ts` solo re-exporta Client-safe, server components importan `getLangFromCookie` directo de `@/lib/i18n-server`
- **Chat dentro de `<LanguageProvider>`** en layout.tsx (no era `not-found.tsx` el problema del bug del patch 2, era `<Chat />` como sibling del Provider)
- **8 regresiones pineadas con tests** (no con buenas intenciones), incluyendo la silenciosa "Seniority Hibrido" que llevaba ahi desde la unificacion
- **OpenAPI 3.0 placeholder honesto** en `public/swagger/foodbites.json` marcado como PLACEHOLDER (no se lleno con datos inventados)

### Lecciones aprendidas
- Smoke tests + grep checks **NO detectan** bugs estructurales de providers
- Server-only imports en barrel files **rompen** Client Components
- "No se rompe = no esta bien" — la regresion "Seniority Hibrido" no daba symptoms visibles
- El AGENTS.md debe ser el contract de convenciones, no un changelog

---

## Stack Actual (versiones exactas)

| Paquete | Version |
|---------|---------|
| Next.js | 16.2.1 |
| React | 19.2.4 |
| TypeScript | 5.9.3 (strict) |
| Tailwind CSS | 4.2.2 |
| framer-motion | 12.38.0 |
| npm | gestor de paquetes |
| Node | (revisar `package.json` engines) |

Path aliases: `@/*` -> `./src/*` (definido en `tsconfig.json`).

---

## Lineage de Archivos Importantes

### Nuevos (creados en el sprint)
- `src/lib/i18n.ts` — barrel Client-safe
- `src/lib/i18n-context.tsx` — Context Provider + useLanguage (`"use client"`)
- `src/lib/i18n-server.ts` — getLangFromCookie + cookies() de next/headers (**+ `import "server-only"`**)
- `src/lib/snippetLoader.ts` — loadSnippetsServer con fs/promises (**+ `import "server-only"`**)
- `src/lib/snippetLoaderClient.ts` — loadSnippetsClient con fetch
- `src/components/SnippetViewer.tsx` — UI comun de snippets
- `src/app/sitemap.ts` — MetadataRoute.Sitemap 6 URLs
- `src/app/robots.ts` — MetadataRoute.Robots
- `src/app/not-found.tsx` — 404 bilingue branded
- `src/app/opengraph-image.tsx` — ImageResponse next/og 1200x630
- `src/app/icon.svg` — favicon
- `src/app/apple-icon.svg` — apple-touch-icon
- `public/swagger/foodbites.json` — OpenAPI 3.0 placeholder
- `.atl/skill-registry.md` — skill registry (sdd-init)

### Nuevos (post-sprint: refactor chatData)
- `src/data/chat/index.ts` — barrel exports
- `src/data/chat/types.ts` — interfaces
- `src/data/chat/config.ts` — ChatConfig, systemPrompts
- `src/data/chat/fallback.ts` — fallbackResponse, welcomeMessage, affirmativeKeywords
- `src/data/chat/followUps.ts` — follow-up responses
- `src/data/chat/quickActions.ts` — quick action buttons
- `src/data/chat/allResponses.ts` — array ordenado por prioridad
- `src/data/chat/responses/*.ts` — 35 archivos individuales (uno por categoria)

### Modificados (high-impact)
- `src/app/layout.tsx` — metadata expandido + LanguageProvider + JSON-LD
- `src/app/projects/[slug]/page.tsx` — RSC + generateMetadata + loadSnippetsServer
- `src/data/chatData.ts` — **ELIMINADO** (era monolito 2300+ lineas)
- `src/hooks/useChat.ts` — fix TS: `messagesEndRef` tipado en `ChatActions`
- `src/i18n/locales.json` — unico archivo i18n, contiene "Seniority Hibrido"
- `tests/i18n_smoke.js` — pinea "Seniority Hibrido"
- `tests/seo_smoke.js` — migrado a locales.json
- `.gitignore` — `+*.tsbuildinfo`

### Eliminados
- `src/hooks/useGlobalLang.tsx` — codigo muerto
- `src/hooks/useLocale.tsx` — codigo muerto
- `src/components/LocaleContent.tsx` — Provider redundante
- `src/components/LocaleText.tsx` — codigo muerto
- `src/components/SeoClient.tsx` — hack con document.querySelector
- `src/i18n/locales.ts` — fusionado a locales.json
- `public/erd/bolsa-empleo.png` y `foodbites.png` — huerfanos
- `public/snippets/linq-csharp.cs` — huerfano
- `public/snippets/linq-csharp.png` y `java-spring.png` — vacios
- `src/data/chatData.ts` — **refactorizado a `/data/chat/` modular**

---

## Gaps Residuales (Priorizados)

### ALTA prioridad
1. **Vitest + tests unitarios** para `lib/utils.ts`, `lib/timelineUtils.ts`, `lib/chatUtils.ts`, `lib/chatData.ts` matching logic.

### MEDIA prioridad
1. **ESLint + Prettier + CI/CD** con GitHub Actions (lint + typecheck + build por PR)
2. **Tests E2E con Playwright** cubriendo: cambio de idioma, modal, slug, chat, theme
3. **Migrar a `next-intl`** con routing `/en/*` (reemplaza i18n custom con cookie)
4. **Cerrar 9 manual browser tests** del SDD previo `estrategia-visualizacion-tecnica`
5. **IA real en el chat** con Gemini API (interfaz `AIProvider`/`ChatConfig` ya preparada)

### BAJA prioridad
1. Menu de navegacion con resaltado de seccion
2. Modo claro/oscuro con persistencia (next-themes)
3. Seccion de descarga de CV
4. Optimizacion de imagenes
5. Analisis de rendimiento (Lighthouse, Web Vitals)

---

## Como Recuperar Contexto en una Sesion Nueva

### Paso 1: Engram (memoria entre sesiones)
```bash
# Si tenes acceso a la CLI de engram
mem_search query="production-readiness portfolio" project="C:\Users\intri\Desktop\openCodeProy\portfolio"
mem_context project="C:\Users\intri\Desktop\openCodeProy\portfolio"
```

Las observations persistidas (11 total del sprint):
- `#172` sdd-init
- `#173` skill-registry
- `#174` explore
- `#175` propose
- `#176` spec
- `#177` design
- `#178` tasks
- `#179` apply-progress
- `#180` verify-report
- `#182` archive-report
- `#183` state

### Paso 2: Este archivo
Leer `HANDOFF.md` (este) + `AGENTS.md` (convenciones + estado actual).

### Paso 3: Git
```bash
git log --oneline -39
git status
git diff origin/dev..HEAD --stat
```

### Paso 4: Skill registry
Leer `.atl/skill-registry.md` para saber que skills hay disponibles en el proyecto.

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
git diff origin/dev..HEAD

# Verificar que el codigo compila (SOLO cuando el usuario lo pida)
npm run build

# Smoke tests (grep-based, rapidos)
node tests/i18n_smoke.js
node tests/seo_smoke.js

# Buscar regresiones pineadas
grep -r "Seniority Hibrido" src/ tests/

# Engram
mem_search query="<keyword>" project="<project-path>"
mem_get_observation id=<id>
```

---

## Proximos Pasos Sugeridos (en orden de valor)

1. **Ajustar placeholders de JSON-LD** (5 min, desbloquea deploy)
2. **Build + manual tests** (30 min, valida el sprint)
3. **Merge a main + deploy Vercel** (5 min, saca el portfolio a produccion)
4. **Sprint de Vitest + tests unitarios `/lib`** (1-2 dias, base para refactors seguros)
5. **Sprint de `next-intl` migration** (1-2 dias, mejora DX de i18n)
6. **Sprint de CI/CD + Playwright** (2-3 dias, profesionaliza el workflow)

---

*Si encontras algo desactualizado en este archivo, actualizalo. Es living documentation.*
