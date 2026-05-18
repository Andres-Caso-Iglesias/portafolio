# Portfolio - Andres Caso Iglesias

## Descripcion
Portfolio profesional para Developer mostrando trayectoria, proyectos y habilidades tecnicas.

## Stack Tecnologico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Hosting**: Vercel
- **Gestor**: npm

## Configuracion del Proyecto

### Instalacion de dependencias
```bash
cd portfolio
npm install
```

### Desarrollo local
```bash
npm run dev
```
Abre http://localhost:3000

### Build para produccion
```bash
npm run build
```

### Scripts disponibles
| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de produccion |
| `npm run start` | Iniciar servidor de produccion |
| `npm run lint` | Linter de codigo |

## Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # Estilos globales (Tailwind v4)
│   │   ├── layout.tsx           # Root layout (metadata, fonts)
│   │   ├── page.tsx             # Pagina principal
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx     # Pagina de detalle de proyecto
│   ├── components/
│   │   ├── Modal.tsx            # Modal de vista rapida de proyectos
│   │   ├── Timeline.tsx         # Componente principal del timeline
│   │   └── timeline/
│   │       ├── TimelineDesktop.tsx
│   │       └── TimelineMobile.tsx
│   ├── data/
│   │   ├── timelineData.ts
│   │   ├── projectsData.ts      # Proyectos con contenido bilingue + ERD + snippets
│   │   ├── skillsData.ts
│   │   └── educationData.ts
│   ├── lib/
│   │   ├── timelineUtils.ts
│   │   └── utils.ts
│   └── hooks/
│       └── useGlobalLang.ts     # Hook para idioma (es/en)
├── public/
│   ├── erd/                     # Diagramas ERD en SVG
│   │   ├── bolsa-empleo.svg
│   │   ├── foodbites.svg
│   │   ├── gestor-huertos.svg
│   │   ├── portafolio.svg
│   │   └── auditoria-seguridad.svg
│   └── snippets/                # Fragmentos de codigo
│       ├── nestjs-dto-validation.ts
│       ├── typeorm-entities.ts
│       ├── react-component.tsx
│       ├── security-audit.ts
│       ├── java-record-entity.java
│       └── spring-boot-transactional-service.java
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── SPEC.md
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

## Secciones del Portfolio

### 1. Hero (page.tsx)
- Nombre: "Andres Caso Iglesias"
- Titulo: "Developer"
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

### 3. Skills (components/sections/SkillsSection.tsx)
- Datos separados en `src/data/skillsData.ts`
- Grid 2x2 con categorias
- Lenguajes, Frameworks, Bases de Datos, DevOps & Cloud

### 4. Proyectos (components/sections/ProjectsSection.tsx)
- Datos separados en `src/data/projectsData.ts`
- 5 proyectos: Bolsa_Empleo, FoodBites, Gestor_Huertos_Urbanos, Portafolio_Profesional, Auditoria_Web
- Modal con pestanas: Reto, Solucion, Arquitectura, Snippets
- Pagina de detalle individual en `/projects/[slug]`

### 5. Modal de Proyectos
Cada proyecto muestra:
- **Reto (Challenge)**: Descripcion del problema
- **Solucion (Solution)**: Enfoque tecnico
- **Arquitectura (Architecture)**: Diagrama ERD + descripcion
- **Snippets (Code)**: Fragmentos de codigo representativos

### 6. Contenido Bilingue
- Todos los proyectos tienen contenido en espanol e ingles
- Interfaces en `projectsData.ts`: `name/enName`, `description/enDescription`, `challenge/enChallenge`, `solution/enSolution`, `architecture/enArchitecture`
- Hook `useGlobalLang` para cambiar entre idiomas

## Proyectos con Extension Visual

| Proyecto | slug | erdPath | snippetPaths |
|----------|------|---------|--------------|
| Bolsa de Empleo | bolsa-empleo | /erd/bolsa-empleo.svg | nestjs-dto-validation.ts, typeorm-entities.ts |
| FoodBites | foodbites | /erd/foodbites.svg | java-record-entity.java, spring-boot-transactional-service.java |
| Gestor Huertos Urbanos | gestor-huertos | /erd/gestor-huertos.svg | - |
| Portafolio Profesional | portafolio-profesional | /erd/portafolio.svg | - |
| Auditoria de Seguridad | auditoria-web | /erd/auditoria-seguridad.svg | security-audit.ts |

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

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs/upgrade-guide)
- [Vercel Deploy](https://vercel.com/docs/deployments/overview)

---
