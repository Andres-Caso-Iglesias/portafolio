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
| | TypeScript | Tipado estricto para seguridad y autocompletado |
| **Estilos** | Tailwind CSS v4 | Framework utility-first para diseno responsivo y mantenible |
| **Iconos** | SVG inline | Iconos personalizados y accesibles |
| **Chat** | Rule-based + IA (futuro) | Chatbot interactivo para reclutadores con 35+ categorias |
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
    /projects
      /[slug]       # Pagina dinamica de detalle de proyecto
  /components       # Capa de Presentacion (JSX y estado UI exclusivamente)
    Modal.tsx       # Modal de vista rapida de proyectos
    Timeline.tsx    # Componente principal del timeline
    /timeline       # Componentes especializados (TimelineDesktop, TimelineMobile)
    /chat           # Componentes del chat interactivo
      Chat.tsx      # Contenedor principal con header, mensajes y input
      ChatMessage.tsx # Presentacion de mensajes con parseo de markdown
      ChatInput.tsx # Input del usuario con envio por Enter
      index.ts      # Barrel exports
  /data             # Capa de Datos (arrays estaticos y tipados)
    projectsData.ts
    skillsData.ts
    timelineData.ts
    educationData.ts
    /chat           # Chat data modular (refactorizado desde monolito chatData.ts)
      index.ts              # Barrel exports
      types.ts              # Interfaces (ChatResponse, FollowUpResponse, etc.)
      config.ts             # ChatConfig, defaultChatConfig, systemPrompts
      fallback.ts           # fallbackResponse, welcomeMessage, affirmativeKeywords
      followUps.ts          # Follow-up responses (context-aware)
      quickActions.ts       # Quick action buttons
      allResponses.ts       # Array ordenado por prioridad explicita
      /responses            # 35 archivos individuales (uno por categoria)
  /lib              # Capa de Logica (utilidades, calculos puros y helpers)
    utils.ts
    timelineUtils.ts
    chatUtils.ts    # Logica de matching, contexto conversacional y futuro soporte IA
    i18n.ts                 # Barrel Client-safe (re-exporta de i18n-context)
    i18n-context.tsx        # LanguageContext + useLanguage + LanguageProvider ("use client")
    i18n-server.ts          # getLangFromCookie server-only (importa "server-only")
    snippetLoader.ts        # loadSnippetsServer con fs/promises (importa "server-only")
    snippetLoaderClient.ts  # loadSnippetsClient con fetch ("use client")
  /hooks            # Hooks personalizados
    useChat.ts      # Estado del chat con tracking de contexto
/public
  /erd              # Diagramas ERD (SVG) de cada proyecto
  /snippets         # Fragmentos de codigo representativos
  /swagger          # OpenAPI specs (bolsa-empleo.json, foodbites.json placeholder)
```

### Flujo de Datos
1. **Capa de Datos** (`/src/data`): Contiene unicamente arrays estaticos e interfaces TypeScript. Nada de logica ni efectos secundarios.
2. **Capa de Logica** (`/src/lib`): Funciones puras que transforman, formatean o calculan datos. Faciles de testear unitariamente.
3. **Capa de Presentacion** (`/src/components`): Componentes React que consumen datos y logica a traves de props. Estado limitado a UI.

---

## Funcionalidades

### Chat Interactivo "Pinche de Andres"
Chatbot rule-based para responder preguntas de reclutadores sobre mi perfil profesional:

- **37 Categorias de Respuesta** (refactorizadas a archivos individuales): Experiencia, habilidades, formacion, contacto, proyectos, certificaciones, idiomas, disponibilidad, salario, sobre mi, frontend, backend, devops, soft skills, IA, hosteleria, edad, ubicacion, logistica, procesos, motivacion, debilidades, fortalezas, proyectos personales, empleo anterior, referencias, tecnologias especificas, frameworks, bases de datos, testing, git, metodologia, comunicacion, creando, aprendiendo, colaboracion, problemas, futuro, herramientas, open source.
- **Arquitectura Modular:** Datos en `/data/chat/responses/` (35 archivos), logica en `/lib/chatUtils.ts`, presentacion en `/components/chat/`. Eliminado monolito `chatData.ts` de 2300+ lineas.
- **Deduplicacion:** `salary` + `compensation` (respuestas identicas) fusionados en uno solo.
- **Contexto Conversacional:** Trackea el ultimo tema discutido para follow-ups (ej. despues de "contacto" pregunta si quiere los enlaces y los da con markdown clickeable).
- **Deteccion de Afirmaciones:** Detecta "si", "dale", "claro", "ok", "yes", "sure" para responder follow-ups.
- **Bilingue:** Soporte completo para espanol e ingles en todas las respuestas.
- **Quick Actions:** 10 botones para preguntas frecuentes (Experiencia, Habilidades, Formacion, Proyectos, Contacto, Certificaciones, Idiomas, Sobre mi, Ciberseguridad, Disponibilidad).
- **Matching Mejorado:** Fuzzy matching con Levenshtein para tolerancia a typos, prioridad explicita project-specific > general > broader.
- **Preparado para IA:** Interfaz `AIProvider` y `ChatConfig` para futuro soporte de Gemini/OpenAI.
- **Defense-in-depth:** `server-only` package en `i18n-server.ts` y `snippetLoader.ts` para evitar imports accidentales en Client Components.

### Proyectos con Extension Visual
Cada proyecto incluye:
- **slug**: Identificador unico para URL (`/projects/[slug]`)
- **erdPath**: Ruta al diagrama ERD en SVG (`/erd/*.svg`)
- **snippetPaths**: Array de rutas a fragmentos de codigo (`/snippets/*.ts`, `*.tsx`, `*.sql`)
- **Contenido Bilingue**: name/enName, description/enDescription, challenge/enChallenge, solution/enSolution, architecture/enArchitecture

### Modal de Proyectos
El componente `Modal.tsx` muestra proyectos con pestanas:
- **Reto** (Challenge): Descripcion del problema
- **Solucion** (Solution): Enfoque tecnico
- **Arquitectura** (Architecture): Diagrama ERD + descripcion
- **Snippets** (Code): Fragmentos de codigo representativos

---

## Buenas Practicas Implementadas

- **Arquitectura Limpia:** Capas bien definidas con dependencias unidireccionales (Presentacion -> Logica -> Datos).
- **Rendimiento y Optimizacion:** Code splitting automatico de Next.js 16, CSS optimo con Tailwind (elimina unused CSS), y uso de fuentes del sistema.
- **Accesibilidad (a11y):** Contraste de colores adecuado, navegacion por teclado, uso de labels/ARIA y enfoque visible.
- **SEO y Metadatos:** Metaetiquetas completas, Open Graph, Twitter Card, JSON-LD, sitemap dinamico y robots.txt.
- **Testing y Calidad:** 252 tests unitarios (Vitest) + 36 tests E2E (Playwright) + CI/CD con GitHub Actions.

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
- **Build** (Next.js production build)

---

## Ejecucion Local

Para ejecutar este portfolio en tu entorno local, sigue estos pasos:

### 1. Clonar e Instalar
```bash
git clone https://github.com/Andres-Caso-Iglesias/portafolio.git
cd portafolio
npm install
```

### 2. Servidor de Desarrollo
```bash
npm run dev
```
La aplicacion estara disponible en `http://localhost:3000`.

### 3. Tests
```bash
npm run test:unit    # 252 tests unitarios (Vitest)
npm run test:e2e     # 36 tests E2E (Playwright)
npm run lint         # ESLint + Prettier
npm run typecheck    # TypeScript --noEmit
```

### 4. Build para Produccion
```bash
npm run build
npm run start
```

---

## Proyectos Destacados

Puedes ver el detalle tecnico de cada proyecto en las siguientes paginas o haciendo click en cualquier proyecto desde la home:
- [Bolsa de Empleo](https://andres-caso-iglesias.vercel.app/projects/bolsa-empleo) - API NestJS + PostgreSQL, documentacion Swagger disponible
- [FoodBites](https://andres-caso-iglesias.vercel.app/projects/foodbites) - Backend Java Spring Boot + MySQL, diagrama ER disponible
- [Gestor Huertos Urbanos](https://andres-caso-iglesias.vercel.app/projects/gestor-huertos) - Java Spring Boot + MySQL
- [Portafolio Profesional](https://andres-caso-iglesias.vercel.app/projects/portafolio-profesional) - Next.js 16 + React 19 + TypeScript
- [Auditoria de Seguridad](https://andres-caso-iglesias.vercel.app/projects/auditoria-web) - NestJS 11 + React 19 + TypeScript

### Estrategia de Visualizacion Tecnica

Cada proyecto incluye una vista detallada con:
- **Diagramas ER** (Entity Relationship) en formato SVG en `public/erd/`
- **Fragmentos de codigo** representativos en `public/snippets/`
- **Secciones de Reto, Solucion y Arquitectura** con contenido bilingue (espanol/ingles)
- **Pagina de detalle** accesible mediante `/projects/[slug]`

Proyectos con contenido disponible:
| Proyecto | ERD | Snippets | Pagina Detalle |
|----------|-----|----------|----------------|
| Bolsa de Empleo | bolsa-empleo.svg | nestjs-dto-validation.ts, typeorm-entities.ts | /projects/bolsa-empleo |
| FoodBites | foodbites.svg | java-record-entity.java, spring-boot-transactional-service.java | /projects/foodbites |
| Gestor Huertos | gestor-huertos.svg | bancal-entity.java | /projects/gestor-huertos |
| Portafolio | portafolio.svg | react-component.tsx | /projects/portafolio-profesional |
| Auditoria Seguridad | auditoria-seguridad.svg | security-audit.ts | /projects/auditoria-web |

---

## Contacto

- **Ubicacion:** Asturias, Espana
- **Email:** andrescasoiglesias@gmail.com
- **GitHub:** [Andres-Caso-Iglesias](https://github.com/Andres-Caso-Iglesias)
- **LinkedIn:** [andrescasoiglesias](https://linkedin.com/in/andrescasoiglesias)
- **Web:** [https://andres-caso-iglesias.vercel.app/](https://andres-caso-iglesias.vercel.app/)

**Tambien puedes preguntarle al "Pinche de Andres"** directamente en el chat interactivo del portafolio para obtener informacion rapida sobre mi perfil.

---