# Portfolio - Andrés Caso Iglesias

## Descripción
Portfolio profesional para Backend Developer buscando su primera oportunidad en IT.

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Hosting**: Vercel (pendiente deploy)
- **Gestor**: npm

## Configuración del Proyecto

### Instalación de dependencias
```bash
cd portfolio
npm install
```

### Desarrollo local
```bash
npm run dev
```
Abre http://localhost:3000

### Build para producción
```bash
npm run build
```

### Scripts disponibles
| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Iniciar servidor de producción |
| `npm run lint` | Linter de código |

## Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css     # Estilos globales (Tailwind v4)
│   │   ├── layout.tsx      # Root layout (metadata, fonts)
│   │   └── page.tsx        # Página principal
│   ├── components/
│   │   ├── Timeline.tsx
│   │   └── timeline/
│   │       ├── TimelineDesktop.tsx
│   │       └── TimelineMobile.tsx
│   ├── data/
│   │   ├── timelineData.ts
│   │   ├── projectsData.ts
│   │   └── skillsData.ts
│   └── lib/
│       ├── timelineUtils.ts
│       └── utils.ts          # Utilidades (cn() para Tailwind)
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── SPEC.md                  # Este archivo
```

## Decisiones de Diseño

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
- NO usar para clases estáticas simples

### Reglas de Estilos Tailwind v4
1. **NUNCA usar `var()` en className** → usar clases semánticas de Tailwind
2. **NUNCA usar colores hex** → usar clases como `text-white`, `bg-slate-900`
3. **Arbitrary values** (`w-[327px]`) → OK para valores únicos, NO para colores

## Secciones del Portfolio

### 1. Hero (page.tsx)
- Nombre: "Andrés Caso Iglesias"
- Título: "Backend Developer"
- Pitch personal con experiencia previa
- Botones: GitHub, LinkedIn

### 2. Perfil Profesional (page.tsx)
- Texto narrativo sobre trayectoria
- Diferenciador: 20 años de experiencia + recién graduado en IT
- Cita destacada sobre habilidades transferibles

### 3. Timeline Interactivo (components/Timeline.tsx)
- **Arquitectura refactorizada**: Separación de datos, lógica y presentación
- **Dos tracks paralelos** (líneas horizontales fijas): 
  - Track superior: eventos de experiencia profesional
  - Track inferior: eventos de educación/formación
- **Al hacer hover en un evento (punto/año)**: 
  - Aparece una barra semitransparente **entre los dos tracks** que representa la duración completa del evento
  - El color de la barra corresponde al tipo de evento (verde=hostelería, ámbar=logística, azul=IT, morado=educación)
- Colores de eventos: Verde (hostelería), Ámbar (logística), Azul (IT), Morado (formación/educación por defecto)
- Responsive: Mobile muestra listas verticales
- Código dividido en componentes especializados para desktop y móvil

#### Estructura de Datos
Los datos del timeline están separados en `src/data/timelineData.ts` con:
- Interfaz `TimelineItem` tipada
- Array `rawTimelineData` con todos los eventos
- Funciones de utilidad en `src/lib/timelineUtils.ts` para cálculos de fechas y posiciones

**Experiencia:**
| ID | Año | Rol | Empresa | Color |
|----|-----|-----|---------|-------|
| 7 | 2006 | Jefe de partida | Casa Marcial | verde |
| 8 | 2007 | Ayudante de cocina | La Palmera | verde |
| 9 | 2008 | Cocinero jefe de partida | The Royal Oak | verde |
| 10 | 2008 | Ayudante de cocina | La Cuadra de Antón | verde |
| 11 | 2009 | Cocinero | Casa María | verde |
| 12 | 2010 | Jefe de cocina | Posada del Valle C.B. | verde |
| 13 | 2022 | Chef ejecutivo | HPV C.B. | verde |
| 14 | 2023 | Representante de ventas y almacén | Eurosigns C.B. | ámbar |
| 15 | 2024 | Operario maquinista | Quesería Lafuente S.A. | ámbar |
| 16 | 2025 | Intenship | Mecalux | azul |

**Educación:**
| ID | Año | Título | Centro |
|----|-----|--------|--------|
| 1 | 2023 | Desarrollo de aplicaciones multiplataforma | I.E.S. Juan José Calvo Miguel |
| 2 | 2022 | Desarrollo de aplicaciones multiplataforma | I.E.S. Nº1 |
| 3 | 2021 | Administración de servicios de internet | - |
| 4 | 2007 | Técnico en pastelería y panadería | C.I.F.P. de hostelería y turismo |
| 5 | 2002 | Técnico en cocina | I.E.S. de Llanes |
| 6 | 2000 | Bachiller humanidades y ciencias sociales | I.E.S. Rey Pelayo |

#### Implementación Técnica
- `src/components/timeline/TimelineDesktop.tsx`: 
  - Dos tracks fijos (superior para experiencia, inferior para educación)
  - Puntos con años centrados entre los tracks
  - Burbujas de experiencia arriba del track superior
  - Burbujas de educación abajo del track inferior
  - Barra de duración que aparece **entre los tracks** al hacer hover en un punto
- `src/components/timeline/TimelineMobile.tsx`: Versión para móvil con layout vertical
- `src/lib/timelineUtils.ts`: Funciones puras para parsear fechas, calcular duraciones y posiciones
- Uso de `useState` para manejar el estado de hover

### 4. Skills (components/sections/SkillsSection.tsx)
- Datos separados en `src/data/skillsData.ts`
- Grid 2x2 con categorías
- Lenguajes: C#, Java 17, TypeScript, Dart, PL/SQL
- Frameworks: .NET, NestJS 10, LINQ
- Bases de Datos: PostgreSQL, SQL Server
- DevOps & Cloud: Azure, Docker, Git, Hyper-V

### 5. Proyectos (components/sections/ProjectsSection.tsx)
- Datos separados en `src/data/projectsData.ts`
- Bolsa_Empleo (Dart/Flutter)
- FoodBites (Java/PostgreSQL)
- Gestor_Huertos_Urbanos (HTML/CSS/JS)

### 6. Contacto (page.tsx)
- Email: andrescasoiglesias@gmail.com
- Botón de envío

## Información del Usuario

### Datos Personales
- **Nombre**: Andrés Caso Iglesias
- **GitHub**: https://github.com/Andres-Caso-Iglesias
- **LinkedIn**: https://linkedin.com/in/andrescasoiglesias
- **Email**: andrescasoiglesias@gmail.com
- **Ubicación**: Asturias, España

### Trayectoria Resumida
- **2006-2023**: Hostelería y logística (20 años)
  - Jefe de Cocina en Posada del Valle (11 años)
  - Chef Ejecutivo en HPV cb (1 año)
  - Jefe de Partida en Casa Marcial y The Royal Oak (Inglaterra)
  - Logística en Eurosigns y Quesería Lafuente
- **2021-2025**: Formación IT
  - Certificado Admin. Servicios Internet (Nivel 3)
  - Ciclo Superior DAM (graduado 2025)
- **2025**: Prácticas en Mecalux Software Solutions (3 meses)
  - Desarrollo Backend: C#, LINQ, PL/SQL
  - Ciberseguridad: NIS2
  - Infraestructura: Azure, Hyper-V, VPN/RDP

### Diferenciador Principal
"Después de casi 20 años liderando equipos en hostelería y logística bajo presión, di un giro radical hacia IT. Traigo disciplina, resiliencia y liderazgo que pocos pueden ofrecer."

## Pendiente

- [ ] Deploy a Vercel
- [ ] Configurar dominio personalizado (cuando tenga ingresos)
- [ ] Añadir screenshot/demo de proyectos
- [ ] Optimizar para SEO
- [ ] Añadir Open Graph images

## Notas para Agentes

1. **NO agregar "Co-Authored-By"** en commits - usar conventional commits
2. **NO hacer build después de cambios** - el usuario lo hace manualmente
3. **Guardar decisiones técnicas** en Engram si es proyecto de larga duración
4. **Tailwind v4** es diferente a v3 - no usar `tailwind.config.js`
5. **Todos los componentes** que usan estado/interactividad son "use client"
6. **Mobile-first** - el Timeline tiene versión vertical para móvil
7. **Clean Code Estructurado** - datos, lógica y presentación separados en carpetas específicas

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs/upgrade-guide)
- [Vercel Deploy](https://vercel.com/docs/deployments/overview)