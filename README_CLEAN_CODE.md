# Refactorizacion Clean Code - Portfolio Andres Caso Iglesias

## Resumen de Cambios

Este documento describe la evolucion de la arquitectura del portfolio, desde la refactorizacion inicial de clean code hasta la arquitectura modular actual.

## Evolucion de la Arquitectura

### Fase 1: Clean Code (original)

- Separacion de datos, logica y presentacion
- Componentes especializados y reutilizables
- Responsabilidad unica por archivo

### Fase 2: Production Readiness

- i18n custom con cookie + LanguageContext
- SEO completo (sitemap, robots, OG, JSON-LD)
- Testing infrastructure (Vitest + Playwright + CI/CD)
- Seguridad (CSP, HSTS, rate limiting)

### Fase 3: Modular Chat

- Refactor de monolito `chatData.ts` (2300+ lineas) → 46 archivos modulares
- Gemini AI integration con fallback rule-based
- Contexto conversacional y follow-ups

## Estructura Actual de Archivos

```
src/
├── app/
│   ├── layout.tsx              # Root layout (LanguageProvider, metadata, JSON-LD)
│   ├── page.tsx                # Home (Server Component)
│   ├── sitemap.ts              # MetadataRoute.Sitemap
│   ├── robots.ts               # MetadataRoute.Robots
│   ├── not-found.tsx           # 404 bilingue
│   ├── opengraph-image.tsx     # OG image 1200x630
│   ├── icon.svg                # Favicon (Next 16)
│   ├── apple-icon.svg          # Apple touch icon
│   ├── globals.css             # Estilos globales (Tailwind v4)
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # Gemini AI chat endpoint
│   └── projects/
│       └── [slug]/
│           └── page.tsx        # Pagina de detalle (RSC)
├── components/
│   ├── Modal.tsx               # Modal de vista rapida (createPortal)
│   ├── SnippetViewer.tsx       # UI comun de snippets
│   ├── Timeline.tsx            # Componente principal del timeline
│   ├── LanguageSwitch.tsx      # Switch de idioma
│   ├── HomeClientContent.tsx   # Hero/About/Skills/Projects/Contact/Footer
│   ├── ProfileIntroText.tsx    # Texto introductorio
│   ├── EducationSection.tsx    # Seccion de educacion
│   ├── ProjectsGrid.tsx        # Grid de proyectos
│   ├── timeline/
│   │   ├── TimelineDesktop.tsx # Version escritorio
│   │   └── TimelineMobile.tsx  # Version movil
│   └── chat/
│       ├── Chat.tsx            # Contenedor principal
│       ├── ChatMessage.tsx     # Presentacion de mensajes
│       ├── ChatInput.tsx       # Input del usuario
│       ├── ProjectCard.tsx     # Tarjeta de proyecto
│       └── index.ts           # Barrel exports
├── data/
│   ├── projectsData.ts         # Interfaz Project + array (sin campo id)
│   ├── skillsData.ts           # Interfaz SkillCategory (8 categorias)
│   ├── timelineData.ts         # Interfaz TimelineItem
│   ├── educationData.ts        # Interfaz EducationItem
│   └── chat/
│       ├── index.ts            # Barrel exports
│       ├── types.ts            # Interfaces
│       ├── config.ts           # ChatConfig
│       ├── fallback.ts         # Fallback responses
│       ├── followUps.ts        # Follow-up responses
│       ├── quickActions.ts     # Quick action buttons
│       ├── allResponses.ts     # Array priorizado
│       ├── aiContext.ts        # Contexto para Gemini AI
│       └── responses/          # 46 archivos de respuestas
├── lib/
│   ├── utils.ts                # cn() utility (clsx + twMerge)
│   ├── timelineUtils.ts        # Funciones puras de timeline
│   ├── chatUtils.ts            # Logica de matching
│   ├── i18n.ts                 # Barrel client-safe
│   ├── i18n-context.tsx        # LanguageContext ("use client")
│   ├── i18n-server.ts          # getLangFromCookie ("server-only")
│   ├── snippetLoader.ts        # loadSnippetsServer ("server-only")
│   ├── snippetLoaderClient.ts  # loadSnippetsClient ("use client")
│   └── rateLimiter.ts          # Rate limiter para API chat
├── hooks/
│   └── useChat.ts              # Estado del chat
└── i18n/
    ├── locales.json            # Traducciones ES + EN
    └── types.ts                # Tipo Lang
```

## Principios Aplicados

### 1. Separacion de Responsabilidades (SRP)

- **Datos**: `src/data/*` contiene exclusivamente estructuras de datos y arrays estaticos
- **Logica**: `src/lib/*` contiene funciones puras sin efectos secundarios
- **Presentacion**: `src/components/*` contiene exclusivamente JSX y estado de UI
- **Orquestacion**: `src/components/Timeline.tsx` solo coordina sub-componentes

### 2. Componentes Especializados

- `Timeline.tsx` - Solo importa y coordina
- `TimelineDesktop.tsx` - Logica especifica de escritorio
- `TimelineMobile.tsx` - Logica especifica de movil
- `Modal.tsx` - Modal con pestanas (Challenge/Solution/Architecture/Snippets)
- `ProjectsGrid.tsx` - Grid de proyectos con createPortal
- `HomeClientContent.tsx` - Orquestador de secciones principales
- `chat/Chat.tsx` - Contenedor del chat con LanguageProvider

### 3. Tipado Estricto TypeScript

- Todas las interfaces definidas explicitamente (`TimelineItem`, `Project`, `SkillCategory`, `ChatResponse`)
- Sin `any`, `@ts-ignore`, `console.log`
- Props tipadas en todos los componentes
- `server-only` en imports criticos (defense-in-depth)

### 4. Logica Pura y Testable

- Funciones en `timelineUtils.ts` y `chatUtils.ts` son puras:
  - Mismos inputs -> mismos outputs
  - Sin efectos secundarios
  - Faciles de testear unitariamente (252 tests)
  - Reutilizables en cualquier parte de la app

### 5. Arquitectura Modular del Chat

#### Evolucion

```
chatData.ts (2300+ lineas, monolito)
    ↓ refactor
/data/chat/
    ├── types.ts          # Interfaces
    ├── config.ts         # ChatConfig
    ├── fallback.ts       # Fallback responses
    ├── followUps.ts      # Follow-up responses
    ├── quickActions.ts   # Quick action buttons
    ├── allResponses.ts   # Array priorizado (project-specific > general > broader)
    ├── aiContext.ts      # Contexto para Gemini AI
    └── responses/        # 46 archivos individuales (uno por categoria)
```

#### Capas

- **Datos**: `/data/chat/` — respuestas, tipos, configuracion
- **Logica**: `/lib/chatUtils.ts` — matching, scoring, fuzzy match (Levenshtein)
- **Presentacion**: `/components/chat/` — Chat, ChatMessage, ChatInput, ProjectCard
- **API**: `/api/chat/route.ts` — Gemini AI con rate limiting y fallback

### 6. Extension de Activos Tecnicos

#### Diagramas ERD

```
public/erd/
    ├── auditoria-seguridad.svg
    ├── bolsa-empleo.svg
    ├── foodbites.svg
    ├── gestor-huertos.svg
    └── portafolio.svg
```

#### Code Snippets (7 archivos)

```
public/snippets/
    ├── bancal-entity.java
    ├── java-record-entity.java
    ├── nestjs-dto-validation.ts
    ├── react-component.tsx
    ├── security-audit.ts
    ├── spring-boot-transactional-service.java
    └── typeorm-entities.ts
```

#### Documentacion OpenAPI

```
public/swagger/
    ├── bolsa-empleo.json
    └── foodbites.json  # PLACEHOLDER
```

### 7. i18n Custom

- Cookie `lang` + localStorage + LanguageContext
- `<html lang>` dinamico desde el primer byte
- `server-only` en `i18n-server.ts` (no se puede importar en Client Components)
- Barrel `i18n.ts` re-exporta solo lo safe para clientes

### 8. Testing Infrastructure

#### Unit Tests (Vitest - 252 tests)

```
src/lib/__tests__/
    ├── utils.test.ts              # 6 tests - cn()
    ├── timelineUtils.test.ts      # 71 tests - fechas, duraciones
    ├── chatUtils.test.ts          # 117 tests - matching, pipeline
    ├── i18n.test.ts               # 13 tests - traducciones
    ├── snippetLoader.test.ts      # 22 tests - deteccion idioma
    └── snippetLoaderClient.test.ts # 23 tests - deteccion idioma
```

#### E2E Tests (Playwright - 36 tests)

```
tests/e2e/
    ├── navigation.spec.ts  # 9 tests - home, secciones
    ├── i18n.spec.ts        # 5 tests - toggle idioma
    ├── projects.spec.ts    # 14 tests - cards, modal, slug
    └── chat.spec.ts        # 10 tests - toggle, mensajes
```

#### CI/CD (GitHub Actions)

Pipeline en `.github/workflows/ci.yml`:

1. Lint (ESLint)
2. Typecheck (TypeScript --noEmit)
3. Security Audit (npm audit)
4. Unit Tests (Vitest)
5. Build (Next.js)
6. E2E Tests (Playwright)

## Verificacion de Implementacion

1. **TypeScript Compila**: `npm run typecheck` -> Exito
2. **Lint Passing**: `npm run lint` -> Sin errores
3. **252 Unit Tests**: `npm run test:unit` -> 100% pass
4. **36 E2E Tests**: `npm run test:e2e` -> 100% pass en chromium
5. **Separacion Clara**: Cada capa tiene responsabilidad unica
6. **Responsive**: Versiones especializadas para cada breakpoint
7. **Mantenible**: Cambios en datos no requieren tocar componentes UI
8. **Seguridad**: CSP, HSTS, rate limiting, server-only

## Lecciones Aprendidas

1. **Smoke tests + grep checks no detectan bugs estructurales de providers** — descubierto en patch 2
2. **Server-only imports en barrel files rompen Client Components** — descubierto en patch 1
3. **"No se rompe = no esta bien"** — la regresion "Seniority Hibrido" estaba ahi sin symptoms visibles
4. **El AGENTS.md debe ser el contract** de convenciones, no un changelog
5. **Refactor incremental funciona** — de monolito a modular sin romper nada

## Conclusion

La arquitectura del portfolio demuestra que **clean code no es solo estetica** — es la base que permite:

- Agregar Gemini AI sin reescribir el chat
- Agregar i18n sin romper componentes
- Agregar testing sin mocks infinitos
- Agregar CI/CD sin configuracion manual

El principio fundamental sigue siendo: **"Los datos deben ser datos, la logica debe ser logica, y la presentacion debe ser presentacion"** — nunca mezcladas en el mismo archivo.

---
