# Portfolio - Andres Caso Iglesias

## Descripcion

Portfolio profesional para Developer mostrando trayectoria, proyectos y habilidades tecnicas. Incluye chat interactivo con Gemini AI, sistema i18n bilingue, y visualizacion tecnica de proyectos (ERD, snippets, OpenAPI).

## Stack Tecnologico

| Categoria | Tecnologia | Version |
|-----------|------------|---------|
| **Framework** | Next.js (App Router) | 16.2.1 |
| **Lenguaje** | TypeScript (strict) | 5.9.3 |
| **UI** | React | 19.2.4 |
| **Estilos** | Tailwind CSS v4 | 4.2.2 |
| **Testing** | Vitest + Playwright | 4.1.8 / 1.61.0 |
| **Hosting** | Vercel | - |
| **Gestor** | npm | - |
| **Chat AI** | Google Gemini | API |
| **CI/CD** | GitHub Actions | - |

## Configuracion del Proyecto

### Instalacion de dependencias
```bash
cd portfolio
npm install
```

### Variable de Entorno (opcional)
```bash
# .env.local - Para habilitar Gemini AI en el chat
GEMINI_API_KEY=tu-api-key-de-gemini
# Sin esta variable, el chat usa fallback rule-based
```

### Desarrollo local
```bash
npm run dev
```
Abre http://localhost:3000

### Build para produccion
```bash
npm run build
npm run start
```

### Scripts disponibles
| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo (con --webpack) |
| `npm run build` | Build de produccion |
| `npm run start` | Iniciar servidor de produccion |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript --noEmit |
| `npm run test` | Smoke tests (i18n + seo) |
| `npm run test:unit` | Vitest unit tests (252 tests) |
| `npm run test:e2e` | Playwright E2E tests (36 tests) |

## Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css              # Estilos globales (Tailwind v4)
│   │   ├── layout.tsx               # Root layout (LanguageProvider, metadata, JSON-LD)
│   │   ├── page.tsx                 # Home (Server Component)
│   │   ├── sitemap.ts               # MetadataRoute.Sitemap
│   │   ├── robots.ts                # MetadataRoute.Robots
│   │   ├── not-found.tsx            # 404 bilingue
│   │   ├── opengraph-image.tsx      # OG image 1200x630
│   │   ├── icon.svg                 # Favicon (Next 16 convention)
│   │   ├── apple-icon.svg           # Apple touch icon
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts         # Gemini AI chat endpoint
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx         # Pagina de detalle (RSC)
│   ├── components/
│   │   ├── Modal.tsx                # Modal de vista rapida (createPortal)
│   │   ├── SnippetViewer.tsx        # UI comun de snippets
│   │   ├── Timeline.tsx             # Componente principal del timeline
│   │   ├── LanguageSwitch.tsx       # Switch de idioma
│   │   ├── HomeClientContent.tsx    # Hero/About/Skills/Projects/Contact/Footer
│   │   ├── ProfileIntroText.tsx     # Texto introductorio
│   │   ├── EducationSection.tsx     # Seccion de educacion
│   │   ├── ProjectsGrid.tsx         # Grid de proyectos
│   │   ├── timeline/
│   │   │   ├── TimelineDesktop.tsx  # Version escritorio
│   │   │   └── TimelineMobile.tsx   # Version movil
│   │   └── chat/
│   │       ├── Chat.tsx             # Contenedor principal
│   │       ├── ChatMessage.tsx      # Presentacion de mensajes
│   │       ├── ChatInput.tsx        # Input del usuario
│   │       ├── ProjectCard.tsx      # Tarjeta de proyecto
│   │       └── index.ts            # Barrel exports
│   ├── data/
│   │   ├── projectsData.ts          # Interfaz Project + array
│   │   ├── skillsData.ts            # Interfaz SkillCategory (8 categorias)
│   │   ├── timelineData.ts          # Interfaz TimelineItem
│   │   ├── educationData.ts         # Interfaz EducationItem
│   │   └── chat/
│   │       ├── index.ts             # Barrel exports
│   │       ├── types.ts             # Interfaces
│   │       ├── config.ts            # ChatConfig
│   │       ├── fallback.ts          # Fallback responses
│   │       ├── followUps.ts         # Follow-up responses
│   │       ├── quickActions.ts      # Quick action buttons
│   │       ├── allResponses.ts      # Array priorizado
│   │       ├── aiContext.ts         # Contexto para Gemini AI
│   │       └── responses/           # 46 archivos de respuestas
│   ├── lib/
│   │   ├── utils.ts                 # cn() utility
│   │   ├── timelineUtils.ts         # Funciones puras de timeline
│   │   ├── chatUtils.ts             # Logica de matching
│   │   ├── i18n.ts                  # Barrel client-safe
│   │   ├── i18n-context.tsx         # LanguageContext ("use client")
│   │   ├── i18n-server.ts           # getLangFromCookie ("server-only")
│   │   ├── snippetLoader.ts         # loadSnippetsServer ("server-only")
│   │   ├── snippetLoaderClient.ts   # loadSnippetsClient ("use client")
│   │   └── rateLimiter.ts           # Rate limiter para API chat
│   ├── hooks/
│   │   └── useChat.ts               # Estado del chat
│   └── i18n/
│       ├── locales.json             # Traducciones ES + EN
│       └── types.ts                 # Tipo Lang
├── public/
│   ├── erd/                         # 5 SVG de diagramas ERD
│   ├── snippets/                    # 7 fragmentos de codigo
│   ├── swagger/                     # OpenAPI specs
│   ├── fonts/                       # CabinetGrotesk (8 variantes .otf)
│   ├── profile.jpg                  # Foto de perfil
│   ├── chat.png                     # Screenshot del chat
│   ├── espanola.png                 # Icono bandera espanola
│   ├── ingles.png                   # Icono bandera inglesa
│   ├── andres_caso_iglesias_Es.pdf  # CV en espanol
│   ├── andres_caso_iglesias_EN.pdf  # CV en ingles
│   └── favicon.ico                  # Favicon (legacy)
├── tests/
│   ├── e2e/                         # 4 spec files (Playwright)
│   ├── i18n_smoke.js                # Smoke test i18n
│   └── seo_smoke.js                 # Smoke test SEO
├── .github/workflows/ci.yml         # CI/CD pipeline
├── vitest.config.ts
├── vitest.setup.tsx
├── playwright.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── next.config.ts                   # CSP, security headers
├── docker-compose.yml
├── tsconfig.json
└── package.json
```

## Decisiones de Diseno

### Tailwind CSS v4
- **NO usa** `tailwind.config.js` ni `npx tailwindcss init`
- **USA** `@import "tailwindcss"` en globals.css
- **PostCSS** configurado con `@tailwindcss/postcss`

### cn() Utility
```typescript
// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
- Usar para **clases condicionales** y **merging** de clases
- NO usar para clases estaticas simples

### Reglas de Estilos Tailwind v4
1. **NUNCA usar `var()` en className** -> usar clases semanticas de Tailwind
2. **NUNCA usar colores hex** -> usar clases como `text-white`, `bg-slate-900`
3. **Arbitrary values** (`w-[327px]`) -> OK para valores unicos, NO para colores

### TypeScript Strict
- `strict: true` en tsconfig.json
- Sin `any`, `@ts-ignore`, `console.log`
- Interfaces explicitas para todos los objetos
- Path alias: `@/*` -> `./src/*`

### Seguridad
- CSP environment-aware (unsafe-eval solo en dev)
- HSTS (max-age=63072000, includeSubDomains, preload)
- X-Frame-Options DENY, X-Content-Type-Options nosniff
- Permissions-Policy, COOP/CORP
- Rate limiting en API chat (IP + session)
- `server-only` en imports criticos (defense-in-depth)

### i18n Custom
- Cookie `lang` + localStorage + LanguageContext
- `<html lang>` dinamico desde el primer byte
- `suppressHydrationWarning` en `<html>` para evitar hydration mismatch
- Migracion a `next-intl` con routing `/en/*` en backlog

## Secciones del Portfolio

### 1. Hero (page.tsx)
- Nombre: "Andres Caso Iglesias"
- Titulo: "Backend Developer"
- Pitch personal con experiencia previa
- Botones: GitHub, LinkedIn

### 2. Timeline Interactivo (components/Timeline.tsx)
- **Arquitectura refactorizada**: Separacion de datos, logica y presentacion
- **Dos tracks paralelos** (lineas horizontales fijas):
  - Track superior: eventos de experiencia profesional
  - Track inferior: eventos de educacion/formacion
- Colores de eventos: Verde (hosteleria), Ambar (logistica), Azul (IT), Morado (formacion)
- Responsive: Mobile muestra listas verticales
- Codigo dividido en componentes especializados para desktop y movil

### 3. Skills (components/HomeClientContent.tsx)
- Datos separados en `src/data/skillsData.ts`
- Grid responsive con categorias
- 8 categorias: OSINT, Sistemas Operativos, Redes, Lenguajes, Frameworks, Bases de Datos, DevOps & Cloud, Herramientas de IA

### 4. Proyectos (components/ProjectsGrid.tsx)
- Datos separados en `src/data/projectsData.ts`
- 5 proyectos: Security Header Scanner, Bolsa Empleo, FoodBites, Gestor Huertos Urbanos, Portafolio Profesional
- Modal con pestanas: Reto, Solucion, Arquitectura, Snippets
- Pagina de detalle individual en `/projects/[slug]`

### 5. Chat Interactivo "Pinche de Andres"
- **Gemini AI**: `/api/chat/route.ts` con rate limiting y contexto del perfil
- **Fallback Rule-based**: 46 categorias de respuesta en `/data/chat/responses/`
- **Contexto Conversacional**: Trackea ultimo tema para follow-ups
- **Bilingue**: Soporte completo ES/EN
- **Quick Actions**: 10 botones para preguntas frecuentes

### 6. Contenido Bilingue
- Todos los proyectos tienen contenido en espanol e ingles
- Interfaces: `name/enName`, `description/enDescription`, `challenge/enChallenge`, `solution/enSolution`, `architecture/enArchitecture`
- LanguageProvider con cookie + localStorage

## Proyectos con Extension Visual

| Proyecto | slug | erdPath | snippetPaths |
|----------|------|---------|--------------|
| Security Header Scanner | auditoria-web | /erd/auditoria-seguridad.svg | security-audit.ts |
| Bolsa de Empleo | bolsa-empleo | /erd/bolsa-empleo.svg | nestjs-dto-validation.ts, typeorm-entities.ts |
| FoodBites | foodbites | /erd/foodbites.svg | java-record-entity.java, spring-boot-transactional-service.java |
| Gestor Huertos Urbanos | gestor-huertos | /erd/gestor-huertos.svg | bancal-entity.java |
| Portafolio Profesional | portafolio-profesional | /erd/portafolio.svg | react-component.tsx |

## Informacion del Usuario

### Datos Personales
- **Nombre**: Andres Caso Iglesias
- **GitHub**: https://github.com/Andres-Caso-Iglesias
- **LinkedIn**: https://linkedin.com/in/andrescasoiglesias
- **Email**: andrescasoiglesias@gmail.com
- **Ubicacion**: Asturias, Espana

### Trayectoria Resumida
- **2006-2023**: Hosteleria y logistica (20 anos)
- **2021-2025**: Formacion IT
- **2025**: Practicas en Mecalux Software Solutions
- **2025-2026**: Master en Ciberseguridad & IA (en curso, objetivo eJPT)

### Diferenciador Principal
"Despues de casi 20 anos liderando equipos en hosteleria y logistica bajo presion, di un giro radical hacia IT. Traigo disciplina, resiliencia y liderazgo que pocos pueden ofrecer."

## Notas para Agentes

1. **NO agregar "Co-Authored-By"** en commits - usar conventional commits
2. **NO hacer build despues de cambios** - el usuario lo hace manualmente
3. **Guardar decisiones tecnicas** en Engram si es proyecto de larga duracion
4. **Tailwind v4** es diferente a v3 - no usar `tailwind.config.js`
5. **Todos los componentes** que usan estado/interactividad son "use client"
6. **Mobile-first** - el Timeline tiene version vertical para movil
7. **Clean Code Estructurado** - datos, logica y presentacion separados en carpetas especificas
8. **NO USAR EMOJIS** - Este proyecto no utiliza emojis en ninguna parte
9. **Server-only** - `i18n-server.ts` y `snippetLoader.ts` usan `server-only` package
10. **Chat AI** - Requiere `GEMINI_API_KEY` en `.env.local`; sin ella usa fallback rule-based

## Testing

### Unit Tests (Vitest)
252 tests en `src/lib/__tests__/` (6 archivos):
- `utils.test.ts` — 6 tests: cn()
- `timelineUtils.test.ts` — 71 tests: fechas, duraciones, posiciones
- `chatUtils.test.ts` — 117 tests: matching, scoring, pipeline
- `i18n.test.ts` — 13 tests: traducciones, interpolacion
- `snippetLoader.test.ts` — 22 tests: deteccion idioma, carga server
- `snippetLoaderClient.test.ts` — 23 tests: deteccion idioma, carga client

### E2E Tests (Playwright)
36 tests en `tests/e2e/` (4 archivos):
- `navigation.spec.ts` — 9 tests: home, secciones, footer
- `i18n.spec.ts` — 5 tests: toggle idioma, persistencia
- `projects.spec.ts` — 14 tests: cards, modal, slug pages
- `chat.spec.ts` — 10 tests: toggle, mensajes, quick actions

### CI/CD (GitHub Actions)
Pipeline en `.github/workflows/ci.yml`:
1. Lint (ESLint)
2. Typecheck (TypeScript --noEmit)
3. Security Audit (npm audit --audit-level=high)
4. Unit Tests (Vitest)
5. Build (Next.js)
6. E2E Tests (Playwright, chromium)

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs/upgrade-guide)
- [Vercel Deploy](https://vercel.com/docs/deployments/overview)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)

---
