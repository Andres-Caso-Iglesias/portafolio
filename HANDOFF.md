# HANDOFF.md - Contexto de Continuacion del Proyecto Portfolio

> **Proposito**: Este archivo es el puente entre sesiones. Si arrancas una sesion nueva en este proyecto, lee este archivo PRIMERO. Te ahorra 20 minutos de "que carajo hicimos la ultima vez".
>
> **Ultima actualizacion**: Octubre 2026 — rediseño v3.2, Fase 3 (terminal y secretos) completada.

---

## TL;DR (30 segundos)

El proyecto esta **deployado en produccion** (via `main`). El rediseño v3.2 se ejecuta en la rama `rediseño`: Fase 0a, 0b, 1 (casos de estudio), 2 (rediseño visual) y **3 (terminal REPL + secretos) completadas**.

**Estado actual:**

- Branch activa: `rediseño`; NO tocar `main` hasta el lanzamiento del MVP
- Fase 3: chat UI eliminado y sustituido por terminal REPL flotante (chunk async diferido), secretos konami/iddqd, honeypot `/admin-backup`, teapot 418
- Gemini AI **dormido**: sin `GOOGLE_AI_API_KEY` en Vercel; IA de la terminal desactivada salvo `NEXT_PUBLIC_AI_ENABLED=true` (cero peticiones a `/api/chat` por defecto)
- 359 unit tests + 61 E2E tests por navegador (6 ficheros), todas las puertas en verde (lint, typecheck, smoke, build, E2E 3 navegadores, axe)

---

## Estado del Repo

| Recurso       | Estado                                                        |
| ------------- | ------------------------------------------------------------- |
| Branch actual | `rediseño`                                                    |
| `main`        | Deployado en produccion (intacto durante el rediseño)          |
| `rediseño`    | Fases 0a/0b/1/2/3 completadas                                  |
| Working tree  | Limpio tras el commit de Fase 3                                |

Commits recientes (rama `rediseño`):

```bash
git log --oneline -5
# feat(fase-3): terminal REPL, secretos, honeypot y teapot (hash en git log)
# 421c8e6 docs(handoff): registra puertas verdes del gate visual de la fase 2
# abd8234 docs(handoff): registra decisiones y hallazgos de la fase 2
# 7694dc0 docs(handoff): registra auditorias de la fase 2 (axe y lighthouse)
# 4724444 feat(fase-2): rediseño visual con header fijo, bento, timeline por etapas y animaciones
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
npm run test:unit    # Vitest unit tests (359 tests)
npm run test:e2e     # Playwright E2E tests (61 tests por navegador)
```

---

## Estructura de Tests

```
/src/lib/__tests__/  # 8 archivos
  utils.test.ts           # 6 tests - cn()
  timelineUtils.test.ts   # 80 tests - fechas, duraciones, posiciones, etapas
  chatUtils.test.ts       # 117 tests - matching, respuestas, pipeline
  i18n.test.ts            # 26 tests - traducciones, interpolacion, paridad ES/EN, terminal, secretos
  snippetLoader.test.ts   # 22 tests - deteccion idioma, carga server
  snippetLoaderClient.test.ts # 23 tests - deteccion idioma, carga client
  projectsChatSync.test.ts # 18 tests - sync projectsData con secciones de chat
  caseStudyChatSync.test.ts # 23 tests - sync caseStudiesData con respuestas de chat
  keySequence.test.ts     # tracker puro: konami, iddqd, ~, `, Ctrl+K
  terminalUtils.test.ts   # parser/output del REPL (alias, lang, clear)

/src/hooks/__tests__/ # 1 archivo
  useKeySequence.test.ts  # hook con deteccion de contenteditable (jsdom)

/tests/e2e/  # 6 archivos, 61 tests (aprobados en chromium, webkit y firefox)
  navigation.spec.ts      # 9 tests - home, secciones, footer
  i18n.spec.ts            # 5 tests - toggle idioma, persistencia
  projects.spec.ts        # 18 tests - cards, modal, slug pages, marquee
  case-studies.spec.ts    # 9 tests - secciones, ERD, back-link, 404, EN
  terminal.spec.ts        # 12 tests - FAB, Ctrl+K, comandos, lang, links, cero /api/chat, axe dialog
  secrets.spec.ts         # 8 tests - konami, iddqd, honeypot cero red, teapot 418
  tsconfig.json           # Config TS para tests E2E
```

---

## Funcionalidades Clave

### Terminal REPL "Pinche de Andres" (motor rule-based)

- **UI**: terminal flotante en `/components/terminal/` (Fase 3); la UI del chat fue eliminada
- **Endpoint**: `/api/chat/route.ts` — Gemini AI con rate limiting in-memory (solo si `NEXT_PUBLIC_AI_ENABLED=true`)
- **Contexto**: `src/data/chat/aiContext.ts` — perfil estatico para system prompt
- **Rate Limiter**: `src/lib/rateLimiter.ts` — IP + session
- **Fallback**: Rule-based con 46 categorias de respuesta en `/data/chat/responses/`
- **Config**: por defecto cero peticiones a `/api/chat` (IA off en la terminal)

### i18n Custom

- Cookie `lang` + localStorage + LanguageContext
- `<html lang>` dinamico desde el primer byte
- `server-only` en `i18n-server.ts` y `snippetLoader.ts` (defense-in-depth)

### SEO

- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (1200x630)
- JSON-LD Person en `layout.tsx`
- Favicons: `icon.svg` + `apple-icon.svg` (Next 16 convention) + `favicon.ico` (legacy)

---

## Fase 2 (rediseño visual) — Completada (commit `4724444`)

### Entregado

- **SiteHeader sticky** (`src/components/SiteHeader.tsx`): skip-link a `#contenido`, navegacion por anclas (5 secciones, `/#id` fuera de home), ThemeToggle + LanguageSwitch integrados; sustituye a `SiteControls` (borrado). Todos los `<main>` llevan `id="contenido"`.
- **Hero renovado**: chip de disponibilidad (`home.heroStatus`), foto rectangular con ring, CV como CTA primario, LinkedIn/GitHub outline.
- **Bento de proyectos**: QReaper `col-span-3 row-span-2` + VulnPrio/Scanner a la derecha; tarjetas grises (`neutral-50/slate-800`) sobre seccion blanca; pill "Leer caso de estudio" en las 3 featured (closes el enlace home->caso pendiente de Fase 1). Marquee intacto (contrato E2E: 5 originales + 15 clones).
- **Bento de skills**: grid `md:grid-cols-6` con spans asimetricos (ciber 2/2/2, dev 2/2/2 + 3/3).
- **Timeline por etapas**: `groupTimelineByStage`/`deriveStage` puros en `timelineUtils.ts` (+9 unit tests); paneles `StagePanel` (Cocina/Logística/IT/Formación, marcador lleno=experiencia, hueco=formacion, periodo `start-end`); `timelineData.ts` anotado con `stage` en los 17 items.
- **Animaciones**: `Reveal.tsx` (IntersectionObserver con fallback si no existe) sobre secciones + bloque global `prefers-reduced-motion` en `globals.css`; `scroll-behavior: smooth` solo bajo `no-preference`.

### Puertas ejecutadas (todas en verde)

- lint · typecheck · 307/307 unit · smoke i18n/seo · build · **E2E 153/153** (51 x chromium/firefox/webkit, 0 fallos)
- **1 flaky persistente en firefox**: `case-studies.spec.ts:92` (language switch) — pasa en retry (config: retries 1 local / 2 CI). CI corre solo chromium.
- **axe (one-off, 4 paginas)**: slug pages 0 violaciones (tras anadir `id="contenido"`); home solo el **marquee pre-existente** (`role="button"` en `<article>` con links anidados = `nested-interactive`/`aria-allowed-role`). NO se toca: es el markup que exige `projects.spec.ts` (20 articulos, 15 clones, 4 links originales).
- **Lighthouse baseline (nueva, no existia medicion previa)**: performance 85 · accessibility 100 · seo 100 · best-practices 100. Fix aplicado en la ronda de ajustes: `aria-label="Andrés Caso Iglesias"` en el logo del header (en móvil el `AC` era `aria-hidden` y el nombre completo `display:none` -> enlace sin nombre; solo lo veia Lighthouse porque usa viewport 412).

### Decisiones de la fase

- **CSP `upgrade-insecure-requests` condicional a `process.env.VERCEL`** (`next.config.ts`): WebKit sube `http://localhost` a `https://localhost` (SSL connect error) -> pagina sin estilos en webkit local -> 25 E2E en rojo. Produccion (Vercel) mantiene la directiva; local la omite. **Chrome/Firefox no lo necesitan** (excluyen localhost del upgrade); solo WebKit.
- **Logo del header con `aria-label` estable** (nombre identico en ES/EN, independiente del breakpoint).
- **Ronda de ajuste unica** (regla del plan): QReaper hero card con `md:justify-start` (elimina el hueco central de `justify-between` en la tarjeta de doble fila).

### Pendiente del gate manual

- **Revision en dispositivo real del autor** (obligatoria por el plan): movil fisico, dark/light, anclas del nav, marquee con dedo.

### Capturas de la fase

- Helper: `$env:TEMP\opencode\capture.cjs <prefix>` (chromium, full-page, reducedMotion). La variante light usa **cookie `theme=light`** porque el server fuerza dark por defecto.
- Capturas "after" de Fase 2 en `$env:TEMP\opencode\after-*.png` (desktop dark/light, mobile, case study).

---

## Fase 3 (terminal y secretos) — Completada

### Entregado

- **Terminal REPL flotante** (`/components/terminal/`): FAB + dialog + Ctrl+K; comandos bilingues help/ayuda, whoami, projects, skills, contact, lang, clear (alias en `COMMAND_ALIASES` de `terminalUtils.ts`); texto libre pasa por el matcher existente (`processUserMessage`); links `[texto](url)` parseados a `<a>`; ProjectCard reutilizado.
- **Carga diferida real**: `TerminalMount.tsx` con `dynamic(() => import('./Terminal'), {ssr: false})` + montaje tras `requestIdleCallback`; la logica del REPL vive en un chunk async (`1ixcntz7250ek.js`) que NO aparece en `rootMainFiles` del build manifest.
- **Logica pura testada**: `src/lib/terminalUtils.ts` (parser/output), `src/lib/keySequence.ts` (tracker de secuencias: konami, iddqd, ~, backquote, Ctrl+K), `src/hooks/useKeySequence.ts` (detecta contenteditable via getAttribute en jsdom).
- **Secretos**: Konami alterna `html.retro` + toast; iddqd solo toast; `~`/`` ` `` como alias retro; Ctrl+K toggle terminal; console.log art una vez (`secrets.consoleArt`). SecretWatcher montado dentro de LanguageProvider.
- **Honeypot**: `/admin-backup` con `FakeAdminLogin` (solo estado React, cero fetch), `robots: noindex, noarchive`, disallow en robots.ts y header `X-Robots-Tag` en next.config.ts.
- **Easter egg**: `/teapot` devuelve 418 con texto bilingue.
- **Chat UI eliminada**: Chat.tsx, ChatInput.tsx, ChatMessage.tsx, chat/index.ts, useChat.ts, quickActions.ts, chat.spec.ts; el motor de respuestas (`/data/chat/`, chatUtils) se conserva y lo consume la terminal. `welcomeMessage` y los quick actions desaparecieron del diccionario.
- **Fix de tema**: `theme-context.tsx` sincroniza el estado con el resultado del script bloqueante cuando no hay cookie `theme` (antes forzaba 'dark' post-hidratacion = flip visual y carrera con axe).

### Puertas ejecutadas (todas en verde)

- lint · typecheck · **359/359 unit** · smoke i18n/seo · build · **E2E 182 passed / 0 failed** (61 x chromium/firefox/webkit) + 1 flaky persistente conocido (`case-studies.spec.ts:92`, firefox, pasa en retry; CI solo chromium)
- **axe (2 pasadas)**: home/dialog solo el marquee pre-existente; **admin-backup 0 violaciones**; **not-found 0 violaciones**.
- **Lighthouse**: perf **82** · a11y 100 · bp 100 · seo 100 (mediana de 5 runs locales tras diferir terminal a idle). Baseline Fase 2: 85/100/100/100. Auditorias identicas al baseline salvo un `forced-reflow` ~75ms sin atribuir (nuevo, sin causa localizada); LCP ~4.6s ya estaba en el baseline (~4.2s). Documentado como gap BAJA; re-medir en produccion (Fase 4).

### Decisiones de la fase

- **IA off por defecto**: `AI_ENABLED = NEXT_PUBLIC_AI_ENABLED === 'true'`; terminal 100% local. El endpoint `/api/chat` se conserva para uso futuro.
- **`langChanged` bilingue identico** en ES/EN: el `t` del contexto esta stale tras `setLang` (decisión ya conocida en Fase 2).
- **`@axe-core/playwright` como devDependency** (`^4.14.0`) en vez de resolucion puntual; casteo del page de Playwright al tipo de AxeBuilder.
- **Fondos de 404/honeypot**: white/slate-900 (no slate-50/950) para pasar contraste axe.
- **ProjectCard se queda en `components/chat/`** (lo consumen terminal y chatUtils) en vez de moverlo a `/terminal` (menos churn).

### Pendiente del gate manual

- Revisar terminal y secretos en **movil real** del autor (teclado, Ctrl+K inexistente → FAB, konami imposible sin teclado fisico → alias `~`).

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
3. **Agregar error.tsx** en app/ y projects/[slug]/
4. **Investigar flaky de firefox**: `case-studies.spec.ts:92` (language switch pasa en retry; CI solo chromium, riesgo bajo)
5. **Re-sincronizar README.md, SPEC.md y README_CLEAN_CODE.md** con Fase 3 (todavia describen el chat UI y `useChat.ts`; AGENTS.md ya esta al dia)

### BAJA prioridad

1. Menu de navegacion con resaltado de seccion activa (el header sticky ya existe; ver Fase 2)
2. Tests de componentes (@testing-library/react)
3. Optimizar imagenes nuevas (screenshots pendientes del autor) con next/image
4. **Lighthouse local de Fase 3: 82 vs baseline 85** — forced-reflow ~75ms sin atribuir + LCP del hero (~4.6s, ya ~4.2s en baseline); re-medir en produccion (Fase 4)
5. `public/chat.png` eliminado (huerfano tras borrar la UI del chat); si se quiere documentar la terminal, capturar un screenshot nuevo

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
npm run test:unit                    # 359 unit tests
npx vitest run --reporter=verbose    # verbose output
npm run test:e2e                     # 61 E2E tests por navegador
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
