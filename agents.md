# agents.md - Información del Proyecto y Guia de Estilo

## Resumen del Proyecto

**Portafolio Profesional - Andres Caso Iglesias**

Este portafolio presenta la trayectoria, proyectos y habilidades de Andres Caso Iglesias, un profesional con casi 20 anos de experiencia liderando equipos en hosteleria y logistica que realizo un giro radical hacia el desarrollo de software; en estos momentos cursando un master en ciberseguridad & IA, para obtener el eJPT. El sitio combina una presentacion visual atractiva con una demostracion activa de buenas practicas de ingenieria de software, arquitectura limpia y codigo escalable.

## Stack Tecnologico

| Categoria                | Tecnologia              | Detalles                                                             |
| ------------------------ | ----------------------- | -------------------------------------------------------------------- |
| **Frontend**             | Next.js 16 (App Router) | Framework React para aplicaciones hibridas estaticas y servidor-side |
|                          | React 19                | Biblioteca de UI con ultimas caracteristicas (React Compiler)        |
|                          | TypeScript              | Tipado estricto para seguridad y autocompletado                      |
| **Estilos**              | Tailwind CSS v4         | Framework utility-first para diseno responsivo y mantenible          |
| **Iconos**               | SVG inline              | Iconos personalizados y accesibles                                   |
| **Despliegue**           | Vercel                  | Plataforma de despliegue optimizada para Next.js                     |
| **Gestion de Paquetes**  | npm                     | Gestor de paquetes estandar                                          |
| **Control de Versiones** | Git                     | Con convenciones de commits convencionales                           |

## Arquitectura y Organizacion del Codigo

### Principios de Diseno

- **Separacion de Responsabilidades (SRP)**: Los datos deben ser datos, la logica debe ser logica, y la presentacion debe ser presentacion.
- **Desacoplamiento**: Componentes especializados que consumen datos a traves de funciones puras, evitando monoliticos.
- **Tipado Estricto**: Uso de interfaces explicitas, evitando `any`.
- **Logica Pura y Testable**: Funciones de utilidad aisladas y sin efectos secundarios.

### Estructura de Directorios (post-sprint production-readiness)

```
/portfolio
  /src
    /app              # Enrutamiento, layouts y paginas (App Router de Next.js)
      layout.tsx     # Layout root: LanguageProvider + html lang dinamico + JSON-LD Person + metadata expandido
      page.tsx       # Home (Server Component, envuelve con LocaleContent)
      sitemap.ts     # MetadataRoute.Sitemap (6 URLs, en/es)
      robots.ts      # MetadataRoute.Robots
      not-found.tsx  # 404 bilingue branded
      opengraph-image.tsx  # next/og 1200x630 placeholder
      icon.svg       # Favicon (convencion Next 16)
      apple-icon.svg # Apple touch icon
      globals.css    # Estilos globales (Tailwind v4)
      /api
        /chat
          route.ts   # Endpoint Gemini AI con rate limiting e hybrid fallback
      /projects
        /[slug]       # Pagina detalle RSC con generateMetadata, generateStaticParams, snippets via loader
    /components       # Capa de Presentacion (JSX y estado UI exclusivamente)
      Modal.tsx       # Modal de vista rapida (usa createPortal)
      SnippetViewer.tsx # UI comun de snippets (Server-safe + boton copy Client)
      Timeline.tsx    # Componente principal del timeline
      LanguageSwitch.tsx # Switch de idioma (setea cookie + localStorage + evento)
      HomeClientContent.tsx # Hero/About/Skills/Projects/Contact/Footer
      ProfileIntroText.tsx # Texto introductorio del perfil
      EducationSection.tsx # Seccion de educacion
      ProjectsGrid.tsx # Grid de proyectos (usa createPortal)
      /timeline      # Componentes especializados (TimelineDesktop, TimelineMobile)
      /chat          # Componentes del chat interactivo
        Chat.tsx     # Contenedor principal del chat (dentro de LanguageProvider)
        ChatMessage.tsx # Presentacion de mensajes con parseo de markdown
        ChatInput.tsx   # Input del usuario con envio por Enter
        ProjectCard.tsx # Tarjeta de proyecto para respuestas del chat
        index.ts     # Barrel exports
    /data             # Capa de Datos (arrays estaticos y tipados)
      projectsData.ts # Interfaz Project + projects array (bilingue, sin campo id)
      skillsData.ts   # Interfaz SkillCategory + skills array (8 categorias)
      timelineData.ts # Interfaz TimelineItem + rawTimelineData
      educationData.ts # Interfaz EducationItem + educationData
      /chat           # Chat data modular (refactorizado desde monolito chatData.ts)
        index.ts              # Barrel exports
        types.ts              # Interfaces (ChatResponse, FollowUpResponse, etc.)
        config.ts             # ChatConfig, defaultChatConfig, systemPrompts
        fallback.ts           # fallbackResponse, welcomeMessage, affirmativeKeywords
        followUps.ts          # Follow-up responses (context-aware)
        quickActions.ts       # Quick action buttons
        allResponses.ts       # Array ordenado por prioridad explicita
        aiContext.ts          # Contexto estatico del perfil para system prompt del chat IA
        /responses            # 46 archivos individuales (uno por categoria)
    /lib              # Capa de Logica (utilidades, calculos puros y helpers)
      utils.ts        # cn() utility (clsx + twMerge)
      timelineUtils.ts # Funciones puras para fechas, duraciones, posiciones
      chatUtils.ts    # Logica de matching, contexto conversacional y soporte IA
      i18n.ts         # BARREL Client-safe (re-exporta de i18n-context)
      i18n-context.tsx # "use client" - LanguageContext, useLanguage, LanguageProvider
      i18n-server.ts  # Server-only - getLangFromCookie (lee cookies() de next/headers)
      snippetLoader.ts       # Server: loadSnippetsServer (usa fs/promises, importa "server-only")
      snippetLoaderClient.ts # "use client" - loadSnippetsClient (usa fetch)
      rateLimiter.ts         # Rate limiter in-memory (IP + session) para API chat
    /hooks            # Hooks personalizados
      useChat.ts      # Estado del chat con tracking de contexto
    /i18n             # Traducciones
      locales.json    # ES + EN, contiene "Seniority Hibrido" copy
      types.ts        # Tipo Lang ('es' | 'en')
  /public
    /erd              # 5 SVG de diagramas ERD
    /snippets         # 7 fragmentos de codigo representativos
    /swagger          # OpenAPI specs
      bolsa-empleo.json
      foodbites.json  # OpenAPI 3.0 placeholder (marcado PLACEHOLDER)
    /fonts            # Fuente CabinetGrotesk (8 variantes .otf)
    profile.jpg       # Foto de perfil
    chat.png          # Screenshot del chat
    espanola.png      # Icono bandera espanola
    ingles.png        # Icono bandera inglesa
    andres_caso_iglesias_Es.pdf  # CV en espanol
    andres_caso_iglesias_EN.pdf  # CV en ingles
    favicon.ico       # Favicon (legacy, Next 16 tambien lee /src/app/icon.svg)
  /tests
    /e2e              # 4 spec files (Playwright)
    i18n_smoke.js     # Smoke test i18n
    seo_smoke.js      # Smoke test SEO
  /.github
    /workflows
      ci.yml          # GitHub Actions CI/CD
  /.agent             # Agent skills directory
  /.atl               # SDD artifacts (proposals, specs, skill-registry)
  vitest.config.ts    # Vitest configuration
  vitest.setup.tsx    # Vitest setup (jsdom, mocks)
  playwright.config.ts # Playwright configuration
  eslint.config.mjs   # ESLint flat config
  postcss.config.mjs  # PostCSS configuration
  next.config.ts      # Next.js config (CSP, security headers)
  docker-compose.yml  # Docker Compose configuration
  AGENTS.md           # Agent conventions (este archivo)
  HANDOFF.md          # Session continuation context
```

### Archivos Eliminados (sprint production-readiness)

- `src/hooks/useGlobalLang.tsx` — codigo muerto (reemplazado por LanguageContext)
- `src/hooks/useLocale.tsx` — codigo muerto
- `src/components/LocaleContent.tsx` — Provider redundante (movido al layout)
- `src/components/LocaleText.tsx` — codigo muerto
- `src/components/SeoClient.tsx` — hack con document.querySelector (reemplazado por metadata)
- `src/i18n/locales.ts` — fusionado a `locales.json`
- `public/erd/bolsa-empleo.png` — huerfano
- `public/erd/foodbites.png` — huerfano
- `public/snippets/linq-csharp.cs` — huerfano
- `public/snippets/linq-csharp.png` — vacio
- `public/snippets/java-spring.png` — vacio

### Flujo de Datos

1. **Capa de Datos** (`/src/data`): Contiene unicamente arrays estaticos e interfaces TypeScript. Nada de logica ni efectos secundarios.
2. **Capa de Logica** (`/src/lib`): Funciones puras que transforman, formatean o calculan datos. Faciles de testear unitariamente.
3. **Capa de Presentacion** (`/src/components`): Componentes React que consumen datos y logica a traves de props. Estado limitado a UI (ej. toggles, animaciones, modales).

### Funcionalidades Actuales

#### Proyectos con Extension Visual

Cada proyecto en `projectsData.ts` ahora incluye:

- **slug**: Identificador unico para URL (`/projects/[slug]`)
- **erdPath**: Ruta al diagrama ERD en SVG (`/erd/*.svg`)
- **snippetPaths**: Array de rutas a fragmentos de codigo (`/snippets/*.ts`, `*.tsx`, `*.sql`)
- **Contenido Bilingue**: name/enName, description/enDescription, challenge/enChallenge, solution/enSolution, architecture/enArchitecture

#### Modal de Proyectos

El componente `Modal.tsx` muestra proyectos con pestanas:

- **Reto** (Challenge): Descripcion del problema
- **Solucion** (Solution): Enfoque tecnico
- **Arquitectura** (Architecture): Diagrama ERD + descripcion
- **Snippets** (Code): Fragmentos de codigo representativos

#### Pagina de Detalle (`/projects/[slug]`)

Pagina estatica para cada proyecto con:

- Descripcion completa
- Diagrama ERD
- Codigo snippets
- Links a GitHub y demo

#### Chat Interactivo ("Pinche de Andres")

Chatbot rule-based para responder preguntas de reclutadores sobre el perfil profesional:

- **Arquitectura en Capas**: Datos (`/data/chat`), Logica (`/lib/chatUtils.ts`), Presentacion (`/components/chat/`)
- **37 Categorias de Respuesta** (refactorizadas a archivos individuales en `/data/chat/responses/`): Experiencia, habilidades, formacion, contacto, proyectos, certificaciones, idiomas, disponibilidad, salario, sobre mi, frontend, backend, devops, soft skills, IA, hosteleria, edad, ubicacion, logistica, procesos, motivacion, debilidades, fortalezas, proyectos personales, empleo anterior, referencias, tecnologias especificas, frameworks, bases de datos, testing, git, metodologia, comunicacion, creando, aprendiendo, colaboracion, problemas, futuro, herramientas, open source.
- **Arquitectura Modular**: Eliminado monolito `chatData.ts` (2300+ lineas) → 46 archivos en `/data/chat/responses/`, `allResponses.ts` con prioridad explicita project-specific > general > broader.
- **Deduplicacion**: `salary` + `compensation` (respuestas identicas) fusionados en uno solo.
- **Keywords Limpias**: Sin solapamiento entre categorias, especificas no genericas.
- **Contexto Conversacional**: Trackea el ultimo tema discutido para follow-ups (ej. despues de "contacto" pregunta si quiere los enlaces y los da con markdown clickeable).
- **Deteccion de Afirmaciones**: Detecta "si", "dale", "claro", "ok", "yes", "sure" para responder follow-ups.
- **Respuestas de Seguimiento**: Enlaces reales clickeables (LinkedIn, GitHub, Email) despues de preguntar.
- **Bilingue**: Soporte completo para espanol e ingles en todas las respuestas.
- **Quick Actions**: 10 botones para preguntas frecuentes.
- **Markdown Links**: Parseo de syntax `[texto](url)` para enlaces clickeables.
- **Matching Mejorado**: Fuzzy matching con Levenshtein para tolerancia a typos.
- **Defense-in-depth**: `server-only` package en `i18n-server.ts` y `snippetLoader.ts` para evitar imports accidentales en Client Components.

## Guia de Estilo y Convenciones

### Convenciones de Nombrado

- **Archivos**: `kebab-case` para componentes y utilidades (`timelineDesktop.tsx`, `dateUtils.ts`).
- **Interfaces y Types**: `PascalCase` (`TimelineItem`, `SkillCategory`, `Project`).
- **Constantes**: `UPPER_SNAKE_CASE` cuando aplique (poco usado en este proyecto).
- **Funciones y Variables**: `camelCase` (`getTimelineItems`, `formatDate`).

### Organizacion de Components

- **Presentacion Pura**: Componentes que solo renderizan props y no usan estado o efectos.
- **Components con Estado**: Solo cuando es necesario para UI (modos, toggles, animaciones, modales). Deben marcarse con `"use client"` en Next.js App Router.
- **Reutilizacion**: Crear components genericos cuando se repitan patrones (tarjetas, botones, enlaces).

### Estilos con Tailwind

- **Orden de Clases**: Seguir el orden logico (layout -> posicionamiento -> espaciado -> tipografia -> colores -> efectos).
- **Responsividad**: Utilizar los prefijos de breakpoint (`md:`, `lg:`, `xl:`) en lugar de media queries custom.
- **Colores**: Usar la paleta de Tailwind (`slate`, `blue`, etc.) en lugar de valores hexadecimales hardcodeados.
- **Espaciado**: Utilizar la escala de espaciado de Tailwind (`px-4`, `py-6`, `space-y-4`, etc.).
- **Tipografia**: Aprovechar los tamanos de fuente responsive (`text-base md:text-lg`) y utilidades como `leading-relaxed`, `tracking-tight`.

### TypeScript Strict

- **Modo Estricto**: `strict: true` en `tsconfig.json`.
- **No `any`**: Evitar el tipo `any` en cualquier circunstancia. Usar `unknown` cuando el tipo sea realmente desconocido y hacer narrowing.
- **Interfaces Explicitas**: Definir interfaces para objetos, incluso si parecen simples.
- **Arrays Tipados**: Siempre especificar el tipo de los elementos (`string[]`, `number[]`, etc.).
- **Funciones**: Especificar tipos de parametros y retorno.

### Commits y Git

- **Convencional Commits**: Usar formato `<tipo>(<alcance>): <descripcion>` (feat, fix, docs, style, refactor, perf, test, chore).
- **No AI Attribution**: Nunca agregar "Co-Authored-By" o menciones de IA en los commits.
- **No Emojis**: Este proyecto no utiliza emojis en commits, documentacion ni codigo.
- **Build After Changes**: No ejecutar `npm run build` despues de cada cambio; solo cuando se solicite explicitamente.
- **Revision de Reclamos**: Antes de aceptar cualquier afirmacion tecnica, verificar primero el codigo o documentacion.

## Buenas Practicas Implementadas

### Arquitectura Limpia

- **Capas Bien Definidas**: Cada capa tiene una unica responsabilidad y conoce minimamente sobre las otras.
- **Dependencias Unidireccionales**: La presentacion depende de la logica, la logica depende de los datos, pero nunca al reves.
- **Testabilidad**: La logica pura en `/lib` puede ser testeada de forma aislada y sencilla.

### Extension de Proyectos

- **Diagramas ERD**: Cada proyecto tiene un diagrama Entidad-Relacion en formato SVG (`/public/erd/*.svg`)
- **Code Snippets**: 7 fragmentos de codigo representativos en `/public/snippets/`
- **Documentacion OpenAPI**: Specs en `/public/swagger/`
- **Contenido Bilingue**: Soporte completo para espanol e ingles en todos los campos de proyectos

### Rendimiento y Optimizacion

- **Code Splitting Automatico**: Next.js 16 con App Router optimiza la carga por rutas.
- **Imagenes Optimizadas**: Uso de `<NextImage>` cuando se requieran imagenes (lazy loading, tamano adecuado).
- **CSS Optimo**: Tailwind elimina CSS unused en produccion.
- **Fuentes Self-hosted**: CabinetGrotesk (8 variantes .otf) en `/public/fonts/`, sin dependencias externas.

### Accesibilidad (a11y)

- **Contraste de Colores**: Verificacion de que las combinaciones de texto/fondo cumplan WCAG AA/AAA.
- **Navegacion con Teclado**: Todos los elementos interactivos son accesibles mediante tab.
- **Labels y ARIA**: Uso adecuado de atributos de accesibilidad donde sea necesario.
- **Enfoque Visible**: Indicadores claros de foco en elementos interactivos.

### SEO y Metadatos

- **Metaetiquetas Completas**: Titulo descriptivo, descripcion rica en palabras clave.
- **Open Graph y Twitter Card**: Implementado en `layout.tsx` (`opengraph-image.tsx` con `next/og` 1200x630).
- **JSON-LD Estructurado**: Implementado en `layout.tsx` (Person schema). `sameAs` y `alumniOf` son placeholders honestos que requieren datos reales.
- **Sitemap y Robots**: `app/sitemap.ts` (6 URLs, en/es) y `app/robots.ts` (MetadataRoute).
- **Favicons**: `app/icon.svg` y `app/apple-icon.svg` (convención Next 16).
- **Url Canonicas y Manejo de Idiomas**: i18n custom con cookie `lang` + `suppressHydrationWarning` en `<html lang>`. Migracion completa a `next-intl` con routing `/en/*` esta en backlog.

## Testing y Calidad

### Unit Tests (Vitest)

- **252 tests** en `/src/lib/__tests__/` (6 archivos, 100% pass)
- `utils.test.ts` — 6 tests: `cn()` (clsx + twMerge)
- `timelineUtils.test.ts` — 71 tests: fechas espanolas, duraciones, posiciones timeline
- `chatUtils.test.ts` — 117 tests: matching, scoring, fuzzy match, follow-ups, pipeline completo
- `i18n.test.ts` — 13 tests: traducciones, interpolacion, bilingual
- `snippetLoader.test.ts` — 22 tests: deteccion idioma (15 extensions), carga server (mock fs)
- `snippetLoaderClient.test.ts` — 23 tests: deteccion idioma, carga client (mock fetch)

### E2E Tests (Playwright)

- **36 tests** en `/tests/e2e/` (4 archivos, 100% pass en chromium)
- `navigation.spec.ts` — 9 tests: home, secciones, footer
- `i18n.spec.ts` — 5 tests: toggle idioma, persistencia, traducciones
- `projects.spec.ts` — 14 tests: cards, modal 4 tabs, slug pages
- `chat.spec.ts` — 10 tests: toggle, mensajes, quick actions

### CI/CD (GitHub Actions)

- `.github/workflows/ci.yml` — lint + typecheck + security audit + unit tests + build + E2E tests en cada PR/push a main
- Protege la rama principal: si alguno falla, el PR no se puede mergear

### Scripts de testing

```bash
npm run test:unit    # Vitest unit tests (252 tests)
npm run test:e2e     # Playwright E2E (36 tests)
npm run lint         # ESLint + Prettier
npm run typecheck    # TypeScript --noEmit
```

### Tipado Estricto

- **TS strict**: sin `any`, `@ts-ignore`, `console.log`
- **Revision de Codigo**: Estandares altos para pull requests (descripciones claras, convencional commits).

## Proximos Pasos (Mejoras Futuras)

### Sprint futuro - ALTA prioridad

1. **Migrar a `next-intl`** con routing `/en/*` (reemplaza i18n custom con cookie, mejora SEO).

### Sprint futuro - MEDIA prioridad

1. **Cerrar 9 manual browser tests** del SDD previo `estrategia-visualizacion-tecnica`.

### Sprint futuro - BAJA prioridad

1. **Menu de navegacion con resaltado de seccion** - mejora usabilidad en paginas largas.
2. **Modo claro/oscuro con persistencia** - usando `next-themes` correctamente configurado.
3. **Optimizacion de imagenes** - cuando se anadan fotos o screenshots de proyectos.
4. **Analisis de rendimiento** - Lighthouse y Web Vitals para monitorear y mejorar.

## NOTA IMPORTANTE: Sin Emojis

Este proyecto **NO utiliza emojis** en ninguna parte del codigo, documentacion o mensajes de commit. Al trabajar en este proyecto:

- No agregar emojis en commits
- No agregar emojis en documentacion (.md)
- No agregar emojis en codigo o comentarios
- Usar texto plano para一切的 descripciones

Esta decision se tomopara mantener consistencia y evitar problemas de compatibilidad entre diferentes sistemas y editores.

## Estado Actual del Proyecto (Junio 2026)

**Sprint production-readiness COMPLETO y archivado.** 39 commits atomicos, 36/36 requirements OK (100%), 9 gaps residuales documentados con prioridad clara.

### Logros del sprint

- **Stack actualizado a Next.js 16 / React 19 / TypeScript 5.9 / Tailwind 4** y documentado con las versiones exactas.
- **i18n custom con cookie**: LanguageContext + useLanguage hook + getLangFromCookie server-side. `<html lang>` dinamico desde el primer byte.
- **Single source of truth**: `src/i18n/locales.json` unico (eliminados `locales.ts` y 2 hooks duplicados).
- **Slug page optimizada**: 441 → 186 lineas (-58%) gracias a `loadSnippetsServer` con `fs/promises` en RSC.
- **SEO completo**: sitemap, robots, OG image 1200x630, JSON-LD Person, favicons, metadata expandido.
- **Chat con Next.js 16** (era Next.js 19 stale) + follow-ups con markdown links clickeables.
- **OpenAPI placeholder** honesto en `public/swagger/foodbites.json` marcado como PLACEHOLDER.
- **8 regresiones pineadas** con tests, no con buenas intenciones.
- **Net -200 lineas** de codigo (cleanup agresivo: 9 archivos eliminados, 14 creados, 16+ modificados).

### Logros post-sprint (Junio 2026)

- **Refactor `chatData.ts` monolito** (2300+ lineas) → arquitectura modular `/data/chat/` (46 archivos individuales, deduplicado salary+compensation, keywords limpias, prioridad explicita en `allResponses.ts`).
- **Fix 2 errores TS pre-existentes** (`messagesEndRef` tipado en `ChatActions`).
- **Instalado `server-only` package** en `i18n-server.ts` y `snippetLoader.ts` (defense-in-depth: build falla si se importa en Client Component).
- **252 tests unitarios** en `/src/lib/__tests__/` (6 archivos, 100% pass).
- **36 tests E2E** con Playwright en `/tests/e2e/` (4 archivos, 100% pass en chromium).
- **GitHub Actions CI/CD** configurado (lint + typecheck + audit + unit tests + build + E2E tests en cada PR/push a main).
- **Gemini AI integrado** en chat (`/api/chat/route.ts`) con rate limiting, contexto estatico del perfil (`aiContext.ts`) y fallback rule-based.

### Gaps residuales (out-of-scope, priorizados)

- **MEDIA** — Migrar a `next-intl` con routing `/en/*`.
- **MEDIA** — Cerrar 9 manual browser tests del SDD previo `estrategia-visualizacion-tecnica`.
- **MEDIA** — IA real en el chat (interfaz `AIProvider` ya preparada).
- **BAJA** — Dark mode con persistencia, menu con resaltado, optimizacion imagenes, Lighthouse.

### Branch state

- `feat/vitest-unit-tests` activa, al dia con `origin/feat/vitest-unit-tests`. Listo para PR a `main`.
- `main` deployado en produccion.

### Contexto persistido

- **Engram (memoria entre sesiones)**: 11 observations del sprint (sdd-init, explore, propose, spec, design, tasks, apply-progress, verify-report, archive-report, state, skill-registry). Usar `mem_search` con keywords del proyecto en la proxima sesion.
- **Archivo HANDOFF.md** en raiz: contexto completo de continuacion (lineage de archivos, regresiones pineadas, comandos utiles, decisiones de arquitectura).
- **Skill-registry** en `.atl/skill-registry.md`: registro de skills del proyecto (creado en sdd-init).

### Lecciones aprendidas del sprint

- **Smoke tests + grep checks no detectan bugs estructurales de providers** (descubierto en patch 2: `<Chat />` sibling de `</LanguageProvider>`).
- **Server-only imports en barrel files** rompen Client Components (descubierto en patch 1: barrel re-exportaba `getLangFromCookie` con `next/headers`).
- **"No se rompe = no esta bien"** — la regresion "Seniority Hibrido" estaba ahi desde la unificacion, sin symptoms visibles, solo detectable con grep.
- **El AGENTS.md debe ser el contract** de convenciones, no un changelog (por eso el estado del sprint va en HANDOFF.md).

---

_Documento mantenido como referencia para desarrolladores, colaboradores y el propio autor para asegurar consistencia en el proyecto._
