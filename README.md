# Portafolio Profesional - Andres Caso Iglesias

**Enlace al Portafolio:** [https://andres-caso-iglesias.vercel.app/](https://andres-caso-iglesias.vercel.app/)

> "Despues de casi 20 anos liderando equipos en hosteleria y logistica bajo presion, di un giro radical hacia IT. Traigo disciplina, resiliencia y liderazgo que pocos pueden ofrecer."

Este portafolio presenta mi trayectoria, proyectos y habilidades como desarrollador. No es solo un escaparate visual, sino una demostracion activa de buenas practicas de ingenieria de software, arquitectura limpia y codigo escalable. Actualmente cursando un master en ciberseguridad & IA, para obtener la certificacion eJPT.

---

## Stack Tecnologico

| Categoria | Tecnologia | Detalles |
|-----------|------------|----------|
| **Frontend** | Next.js 16 (App Router) | Framework React para aplicaciones hibridas estaticas y servidor-side |
| | React 19 | Biblioteca de UI con ultimas caracteristicas (React Compiler) |
| | TypeScript 5.9 | Tipado estricto para seguridad y autocompletado |
| **Estilos** | Tailwind CSS v4 | Framework utility-first para diseno responsivo y mantenible |
| **Iconos** | SVG inline | Iconos personalizados y accesibles |
| **Chat** | Gemini AI + Rule-based fallback | Chatbot interactivo para reclutadores con 46+ categorias, rate limiting e contexto conversacional |
| **Testing** | Vitest + Playwright | 252 unit tests + 36 E2E tests |
| **Despliegue** | Vercel | Plataforma de despliegue optimizada para Next.js |
| **Gestion de Paquetes** | npm | Gestor de paquetes estandar |
| **Control de Versiones** | Git | Con convenciones de commits convencionales |

---

## Arquitectura y Organizacion del Codigo

El proyecto ha sido disenado siguiendo principios de ingenieria de software para asegurar su mantenibilidad y escalabilidad:

### Principios de Diseno
- **Separacion de Responsabilidades (SRP):** Los datos deben ser datos, la logica debe ser logica, y la presentacion debe ser presentacion.
- **Desacoplamiento:** Componentes especializados que consumen datos a traves de funciones puras, evitando monoliticos.
- **Tipado Estricto (TypeScript):** Uso de interfaces explicitas (`TimelineItem`, `Project`, `ChatResponse`, etc.), evitando el uso de tipos `any` y garantizando contratos claros entre capas.
- **Logica Pura y Testable:** Funciones de utilidad aisladas y sin efectos secundarios.

### Estructura de Directorios
```
src
  /app              # Enrutamiento, layouts y paginas (App Router de Next.js)
    layout.tsx     # Layout root: LanguageProvider + html lang dinamico + JSON-LD Person + metadata
    page.tsx       # Home (Server Component, envuelve con LocaleContent)
    sitemap.ts     # MetadataRoute.Sitemap (6 URLs, en/es)
    robots.ts      # MetadataRoute.Robots
    not-found.tsx  # 404 bilingue branded
    opengraph-image.tsx  # next/og 1200x630 placeholder
    icon.svg       # Favicon (convencion Next 16)
    apple-icon.svg # Apple touch icon
    /api
      /chat
        route.ts   # Endpoint Gemini AI con rate limiting e hybrid fallback
    /projects
      /[slug]       # Pagina dinamica de detalle de proyecto (RSC)
  /components       # Capa de Presentacion (JSX y estado UI exclusivamente)
    Modal.tsx       # Modal de vista rapida de proyectos (usa createPortal)
    SnippetViewer.tsx # UI comun de snippets (Server-safe + boton copy Client)
    Timeline.tsx    # Componente principal del timeline
    LanguageSwitch.tsx # Switch de idioma (setea cookie + localStorage + evento)
    HomeClientContent.tsx # Hero/About/Skills/Projects/Contact/Footer
    ProfileIntroText.tsx # Texto introductorio del perfil
    EducationSection.tsx # Seccion de educacion
    ProjectsGrid.tsx # Grid de proyectos (usa createPortal)
    /timeline       # Componentes especializados (TimelineDesktop, TimelineMobile)
    /chat           # Componentes del chat interactivo
      Chat.tsx      # Contenedor principal con header, mensajes y input
      ChatMessage.tsx # Presentacion de mensajes con parseo de markdown
      ChatInput.tsx # Input del usuario con envio por Enter
      ProjectCard.tsx # Tarjeta de proyecto para respuestas del chat
      index.ts      # Barrel exports
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
    i18n.ts                 # Barrel Client-safe (re-exporta de i18n-context)
    i18n-context.tsx        # LanguageContext + useLanguage + LanguageProvider ("use client")
    i18n-server.ts          # getLangFromCookie server-only (importa "server-only")
    snippetLoader.ts        # loadSnippetsServer con fs/promises (importa "server-only")
    snippetLoaderClient.ts  # loadSnippetsClient con fetch ("use client")
    rateLimiter.ts          # Rate limiter in-memory (IP + session) para API chat
  /hooks            # Hooks personalizados
    useChat.ts      # Estado del chat con tracking de contexto
  /i18n             # Traducciones (UNICO archivo)
    locales.json   # ES + EN, contiene "Seniority Hibrido" copy
    types.ts       # Tipo Lang ('es' | 'en')
/public
  /erd              # 5 SVG de diagramas ERD
  /snippets         # 7 fragmentos de codigo representativos
  /swagger          # OpenAPI specs (bolsa-empleo.json, foodbites.json placeholder)
  /fonts            # Fuente CabinetGrotesk (8 variantes .otf)
  profile.jpg       # Foto de perfil
  chat.png          # Screenshot del chat
  espanola.png      # Icono bandera espanola
  ingles.png        # Icono bandera inglesa
  andres_caso_iglesias_Es.pdf  # CV en espanol
  andres_caso_iglesias_EN.pdf  # CV en ingles
  favicon.ico       # Favicon (legacy, Next 16 tambien lee /src/app/icon.svg)
```

### Flujo de Datos
1. **Capa de Datos** (`/src/data`): Contiene unicamente arrays estaticos e interfaces TypeScript. Nada de logica ni efectos secundarios.
2. **Capa de Logica** (`/src/lib`): Funciones puras que transforman, formatean o calculan datos. Faciles de testear unitariamente.
3. **Capa de Presentacion** (`/src/components`): Componentes React que consumen datos y logica a traves de props. Estado limitado a UI.

---

## Funcionalidades

### Chat Interactivo "Pinche de Andres"

Chatbot con Gemini AI y fallback rule-based para responder preguntas de reclutadores sobre mi perfil profesional:

- **Gemini AI**: Integracion con Google Gemini para respuestas inteligentes via `/api/chat/route.ts` con rate limiting in-memory y contexto estatico del perfil (`aiContext.ts`).
- **Fallback Rule-based**: Si Gemini no esta configurado o falla, el sistema responde con matching por keywords y fuzzy match (Levenshtein).
- **46 Categorias de Respuesta** (archivos individuales en `/data/chat/responses/`): OSINT, ciberseguridad, experiencia, habilidades, formacion, contacto, proyectos, certificaciones, idiomas, disponibilidad, salario, sobre mi, frontend, backend, devops, soft skills, IA, hosteleria, edad, ubicacion, logistica, procesos, motivacion, debilidades, fortalezas, proyectos personales, empleo anterior, referencias, tecnologias especificas, frameworks, bases de datos, testing, git, metodologia, comunicacion, creando, aprendiendo, colaboracion, problemas, futuro, herramientas, open source y mas.
- **Arquitectura Modular:** Datos en `/data/chat/responses/` (46 archivos), logica en `/lib/chatUtils.ts`, presentacion en `/components/chat/`. Eliminado monolito `chatData.ts` de 2300+ lineas.
- **Contexto Conversacional:** Trackea el ultimo tema discutido para follow-ups (ej. despues de "contacto" pregunta si quiere los enlaces y los da con markdown clickeable).
- **Deteccion de Afirmaciones:** Detecta "si", "dale", "claro", "ok", "yes", "sure" para responder follow-ups.
- **Bilingue:** Soporte completo para espanol e ingles en todas las respuestas.
- **Quick Actions:** 10 botones para preguntas frecuentes (Experiencia, Habilidades, Formacion, Proyectos, Contacto, Certificaciones, Idiomas, Sobre mi, Ciberseguridad, Disponibilidad).
- **Matching Mejorado:** Fuzzy matching con Levenshtein para tolerancia a typos, prioridad explicita project-specific > general > broader.
- **Defense-in-depth:** `server-only` package en `i18n-server.ts` y `snippetLoader.ts` para evitar imports accidentales en Client Components.

### Proyectos con Extension Visual
Cada proyecto incluye:
- **slug**: Identificador unico para URL (`/projects/[slug]`)
- **erdPath**: Ruta al diagrama ERD en SVG (`/erd/*.svg`)
- **snippetPaths**: Array de rutas a fragmentos de codigo (`/snippets/*.ts`, `*.tsx`, `*.sql`, `*.java`)
- **apiDocPath**: Ruta a documentacion OpenAPI (`/swagger/*.json`)
- **Contenido Bilingue**: name/enName, description/enDescription, challenge/enChallenge, solution/enSolution, architecture/enArchitecture
- **Impacto y Rol**: impact?, role? para contexto de reclutador

### Modal de Proyectos
El componente `Modal.tsx` muestra proyectos con pestanas:
- **Reto** (Challenge): Descripcion del problema
- **Solucion** (Solution): Enfoque tecnico
- **Arquitectura** (Architecture): Diagrama ERD + descripcion
- **Snippets** (Code): Fragmentos de codigo representativos

### Pagina de Detalle (`/projects/[slug]`)
Pagina estatica (RSC) para cada proyecto con:
- Descripcion completa bilingue
- Diagrama ERD
- Codigo snippets (cargados via `loadSnippetsServer` con `fs/promises`)
- Links a GitHub y demo
- Metadata dinamica (`generateMetadata`, `generateStaticParams`)

---

## Buenas Practicas Implementadas

- **Arquitectura Limpia:** Capas bien definidas con dependencias unidireccionales (Presentacion -> Logica -> Datos).
- **Rendimiento y Optimizacion:** Code splitting automatico de Next.js 16, CSS optimo con Tailwind (elimina unused CSS), y fuentes CabinetGrotesk self-hosted.
- **Accesibilidad (a11y):** Contraste de colores adecuado, navegacion por teclado, uso de labels/ARIA y enfoque visible.
- **SEO y Metadatos:** Metaetiquetas completas, Open Graph, Twitter Card, JSON-LD, sitemap dinamico y robots.txt.
- **Seguridad:** CSP environment-aware (unsafe-eval solo en dev), HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Permissions-Policy, COOP/CORP. URL sanitization en chat (bloquea javascript:, data:, vbscript:). Rate limiting en API chat.
- **Testing y Calidad:** 252 tests unitarios (Vitest) + 36 tests E2E (Playwright) + CI/CD con GitHub Actions (lint + typecheck + audit + unit tests + build + E2E tests).

## Testing y Calidad

### Unit Tests (Vitest)
252 tests cubriendo toda la capa `/src/lib/`:

| Archivo | Tests | Funciones |
|---------|-------|-----------|
| `utils.test.ts` | 6 | `cn()` (clsx + twMerge) |
| `timelineUtils.test.ts` | 71 | Fechas espanolas, duraciones, posiciones timeline |
| `chatUtils.test.ts` | 117 | Matching, scoring, fuzzy match, follow-ups, pipeline |
| `i18n.test.ts` | 13 | Traducciones, interpolacion, bilingual |
| `snippetLoader.test.ts` | 22 | Deteccion idioma (15 extensions), carga server |
| `snippetLoaderClient.test.ts` | 23 | Deteccion idioma, carga client |

### E2E Tests (Playwright)
36 tests en chromium cubriendo los flujos principales:

| Archivo | Tests | Cobertura |
|---------|-------|-----------|
| `navigation.spec.ts` | 9 | Home, secciones, footer |
| `i18n.spec.ts` | 5 | Toggle idioma, persistencia, traducciones |
| `projects.spec.ts` | 14 | Cards, modal 4 tabs, slug pages |
| `chat.spec.ts` | 10 | Toggle, mensajes, quick actions |

### CI/CD (GitHub Actions)
Pipeline automatico en cada PR y push a `main`:
- **Lint** (ESLint + Prettier)
- **Typecheck** (TypeScript --noEmit)
- **Security Audit** (npm audit --audit-level=high)
- **Unit Tests** (Vitest - 252 tests)
- **Build** (Next.js production build)
- **E2E Tests** (Playwright - 36 tests en chromium)

---

## Ejecucion Local

Para ejecutar este portfolio en tu entorno local, sigue estos pasos:

### 1. Clonar e Instalar
```bash
git clone https://github.com/Andres-Caso-Iglesias/portafolio.git
cd portafolio
npm install
```

### 2. Variable de Entorno (opcional)
Para habilitar el chat con IA real, crear un archivo `.env.local`:
```bash
GEMINI_API_KEY=tu-api-key-de-gemini
```
Sin esta variable, el chat usa el fallback rule-based (funcional sin IA).

### 3. Servidor de Desarrollo
```bash
npm run dev
```
La aplicacion estara disponible en `http://localhost:3000`.

### 4. Tests
```bash
npm run test:unit    # 252 tests unitarios (Vitest)
npm run test:e2e     # 36 tests E2E (Playwright)
npm run lint         # ESLint + Prettier
npm run typecheck    # TypeScript --noEmit
```

### 5. Build para Produccion
```bash
npm run build
npm run start
```

---

## Proyectos Destacados

Puedes ver el detalle tecnico de cada proyecto en las siguientes paginas o haciendo click en cualquier proyecto desde la home:
- [Security Header Scanner](https://andres-caso-iglesias.vercel.app/projects/auditoria-web) - NestJS 11 + React 19 + TypeScript
- [Bolsa de Empleo](https://andres-caso-iglesias.vercel.app/projects/bolsa-empleo) - API NestJS + PostgreSQL, documentacion Swagger disponible
- [FoodBites](https://andres-caso-iglesias.vercel.app/projects/foodbites) - Backend Java Spring Boot + MySQL, diagrama ER disponible
- [Gestor Huertos Urbanos](https://andres-caso-iglesias.vercel.app/projects/gestor-huertos) - Java Spring Boot + MySQL
- [Portafolio Profesional](https://andres-caso-iglesias.vercel.app/projects/portafolio-profesional) - Next.js 16 + React 19 + TypeScript

### Estrategia de Visualizacion Tecnica

Cada proyecto incluye una vista detallada con:
- **Diagramas ER** (Entity Relationship) en formato SVG en `public/erd/`
- **Fragmentos de codigo** representativos en `public/snippets/` (7 archivos)
- **Documentacion OpenAPI** en `public/swagger/`
- **Secciones de Reto, Solucion y Arquitectura** con contenido bilingue (espanol/ingles)
- **Pagina de detalle** accesible mediante `/projects/[slug]`

Proyectos con contenido disponible:
| Proyecto | ERD | Snippets | Pagina Detalle |
|----------|-----|----------|----------------|
| Security Header Scanner | auditoria-seguridad.svg | security-audit.ts | /projects/auditoria-web |
| Bolsa de Empleo | bolsa-empleo.svg | nestjs-dto-validation.ts, typeorm-entities.ts | /projects/bolsa-empleo |
| FoodBites | foodbites.svg | java-record-entity.java, spring-boot-transactional-service.java | /projects/foodbites |
| Gestor Huertos | gestor-huertos.svg | bancal-entity.java | /projects/gestor-huertos |
| Portafolio | portafolio.svg | react-component.tsx | /projects/portafolio-profesional |

---

## Contacto

- **Ubicacion:** Asturias, Espana
- **Email:** andrescasoiglesias@gmail.com
- **GitHub:** [Andres-Caso-Iglesias](https://github.com/Andres-Caso-Iglesias)
- **LinkedIn:** [andrescasoiglesias](https://linkedin.com/in/andrescasoiglesias)
- **Web:** [https://andres-caso-iglesias.vercel.app/](https://andres-caso-iglesias.vercel.app/)

**Tambien puedes preguntarle al "Pinche de Andres"** directamente en el chat interactivo del portafolio para obtener informacion rapida sobre mi perfil. Si tenes una API key de Gemini, podes configurarla en `.env.local` para obtener respuestas con IA real.

---
