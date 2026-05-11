# agents.md - Información del Proyecto y Guia de Estilo

## Resumen del Proyecto

**Portafolio Profesional - Andres Caso Iglesias**

Este portafolio presenta la trayectoria, proyectos y habilidades de Andres Caso Iglesias, un profesional con casi 20 anos de experiencia liderando equipos en hosteleria y logistica que realizo un giro radical hacia el desarrollo de software; en estos momentos cursando un master en ciberseguridad & IA, para obtener el eJPT. El sitio combina una presentacion visual atractiva con una demostracion activa de buenas practicas de ingenieria de software, arquitectura limpia y codigo escalable.

## Stack Tecnologico

| Categoria | Tecnologia | Detalles |
|-----------|------------|----------|
| **Frontend** | Next.js 16 (App Router) | Framework React para aplicaciones hibridas estaticas y servidor-side |
| | React 19 | Biblioteca de UI con ultimas caracteristicas (React Compiler) |
| | TypeScript | Tipado estricto para seguridad y autocompletado |
| **Estilos** | Tailwind CSS v4 | Framework utility-first para diseno responsivo y mantenible |
| **Iconos** | SVG inline | Iconos personalizados y accesibles |
| **Despliegue** | Vercel | Plataforma de despliegue optimizada para Next.js |
| **Gestion de Paquetes** | npm | Gestor de paquetes estandar |
| **Control de Versiones** | Git | Con convenciones de commits convencionales |

## Arquitectura y Organizacion del Codigo

### Principios de Diseno
- **Separacion de Responsabilidades (SRP)**: Los datos deben ser datos, la logica debe ser logica, y la presentacion debe ser presentacion.
- **Desacoplamiento**: Componentes especializados que consumen datos a traves de funciones puras, evitando monoliticos.
- **Tipado Estricto**: Uso de interfaces explicitas, evitando `any`.
- **Logica Pura y Testable**: Funciones de utilidad aisladas y sin efectos secundarios.

### Estructura de Directorios
```
/src
  /app              # Enrutamiento, layouts y paginas (App Router de Next.js)
    /projects
      /[slug]       # Pagina dinamica de detalle de proyecto
  /components       # Capa de Presentacion (JSX y estado UI exclusivamente)
    Modal.tsx       # Modal de vista rapida de proyectos
    Timeline.tsx   # Componente principal del timeline
    /timeline      # Componentes especializados (TimelineDesktop, TimelineMobile)
  /data             # Capa de Datos (arrays estaticos y tipados)
    projectsData.ts
    skillsData.ts
    timelineData.ts
    educationData.ts
  /lib              # Capa de Logica (utilidades, calculos puros y helpers)
    utils.ts
    timelineUtils.ts
  /hooks            # Hooks personalizados
    useGlobalLang.ts
/public
  /erd              # Diagramas ERD (SVG) de cada proyecto
  /snippets         # Fragmentos de codigo representativos
```

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
- **Code Snippets**: Fragmentos de codigo representativos en `/public/snippets/`
- **Contenido Bilingue**: Soporte completo para espanol e ingles en todos los campos de proyectos

### Rendimiento y Optimizacion
- **Code Splitting Automatico**: Next.js 16 con App Router optimiza la carga por rutas.
- **Imagenes Optimizadas**: Uso de `<NextImage>` cuando se requieran imagenes (lazy loading, tamano adecuado).
- **CSS Optimo**: Tailwind elimina CSS unused en produccion.
- **Fuentes del Sistema**: Uso de la pila de fuentes nativa para evitar cargas externas innecesarias.

### Accesibilidad (a11y)
- **Contraste de Colores**: Verificacion de que las combinaciones de texto/fondo cumplan WCAG AA/AAA.
- **Navegacion con Teclado**: Todos los elementos interactivos son accesibles mediante tab.
- **Labels y ARIA**: Uso adecuado de atributos de accesibilidad donde sea necesario.
- **Enfoque Visible**: Indicadores claros de foco en elementos interactivos.

### SEO y Metadatos
- **Metaetiquetas Completas**: Titulo descriptivo, descripcion rica en palabras clave.
- **Open Graph y Twitter Card**: Para compartir atractivo en redes sociales.
- **JSON-LD Estructurado**: Planificado para mejorar aparicion en buscadores (Person, WebSite).
- **Url Canonicass y Manejo de Idiomas**: Preparado para i18n con rutas localizadas (`/`, `/en/`).

## Testing y Calidad
- **Tipado Estricto**: Primer nivel de gestion de errores.
- **Revision de Codigo**: Estandares altos para pull requests (descripciones claras, convencional commits).
- **Pruebas Futuras**: Estructura preparada para agregar unit tests en `/lib` y component tests con Jest/Vitest y React Testing Library.

## Proximos Pasos (Mejoras Futuras)
1. **Menu de Navegacion con Resaltado de Seccion** - Mejora usabilidad en paginas largas.
2. **Modo Claro/Oscuro con Persistencia** - Usando `next-themes` correctamente configurado.
3. **Internacionalizacion (i18n)** - Soporte completo para espanol e ingles usando `next-intl`.
4. **Seccion de Descarga de CV** - Enlace directo a PDF en `/public/cv.pdf`.
5. **Pruebas Unitarias** - Para utilidades en `/lib` y components complejos.
6. **Optimizacion de Imagenes** - Cuando se anadan fotos o screenshots de proyectos.
7. **Analisis de Rendimiento** - Uso de Lighthouse y Web Vitals para monitorear y mejorar.

## NOTA IMPORTANTE: Sin Emojis
Este proyecto **NO utiliza emojis** en ninguna parte del codigo, documentacion o mensajes de commit. Al trabajar en este proyecto:
- No agregar emojis en commits
- No agregar emojis en documentacion (.md)
- No agregar emojis en codigo o comentarios
- Usar texto plano para一切的 descripciones

Esta decision se tomopara mantener consistencia y evitar problemas de compatibilidad entre diferentes sistemas y editores.

---

*Documento mantenido como referencia para desarrolladores, colaboradores y el propio autor para asegurar consistencia en el proyecto.*