# agents.md - Información del Proyecto y Guía de Estilo

## Resumen del Proyecto

**Portafolio Profesional - Andrés Caso Iglesias**

Este portafolio presenta la trayectoria, proyectos y habilidades de Andrés Caso Iglesias, un profesional con casi 20 años de experiencia liderando equipos en hostelería y logística que realizó un giro radical hacia el desarrollo de software; en estos momentos cursando un master en ciberseguridad & IA, para obtener el ejpt. El sitio combina una presentación visual atractiva con una demostración activa de buenas prácticas de ingeniería de software, arquitectura limpia y código escalable.

## Stack Tecnológico

| Categoría | Tecnología | Detalles |
|-----------|------------|----------|
| **Frontend** | Next.js 16 (App Router) | Framework React para aplicaciones híbridas estáticas y servidor-side |
| | React 19 | Biblioteca de UI con últimas características (React Compiler) |
| | TypeScript | Tipado estricto para seguridad y autocompletado |
| **Estilos** | Tailwind CSS v4 | Framework utility-first para diseño responsivo y mantenible |
| **Iconos** | SVG inline | Íconos personalizados y accesibles |
| **Despliegue** | Vercel | Plataforma de despliegue optimizada para Next.js |
| **Gestión de Paquetes** | npm | Gestor de paquetes estándar |
| **Control de Versiones** | Git | Con convenciones de commits convencionales |

## Arquitectura y Organización del Código

### Principios de Diseño
- **Separación de Responsabilidades (SRP)**: Los datos deben ser datos, la lógica debe ser lógica, y la presentación debe ser presentación.
- **Desacoplamiento**: Componentes especializados que consumen datos a través de funciones puras, evitando monolíticos.
- **Tipado Estricto**: Uso de interfaces explícitas, evitando `any`.
- **Lógica Pura y Testable**: Funciones de utilidad aisladas y sin efectos secundarios.

### Estructura de Directorios
```
/src
  /app           # Enrutamiento, layouts y páginas (App Router de Next.js)
  /components    # Capa de Presentación (JSX y estado UI exclusivamente)
    /timeline    # Componentes especializados (TimelineDesktop, TimelineMobile)
  /data          # Capa de Datos (arrays estáticos y tipados)
    projectsData.ts
    skillsData.ts
    timelineData.ts
    educationData.ts   # ← Nueva sección añadida
  /lib           # Capa de Lógica (utilidades, cálculos puros y helpers)
    utils.ts
    timelineUtils.ts
```

### Flujo de Datos
1. **Capa de Datos** (`/src/data`): Contiene únicamente arrays estáticos y interfaces TypeScript. Nada de lógica ni efectos secundarios.
2. **Capa de Lógica** (`/src/lib`): Funciones puras que transforman, formatean o calculan datos. Fáciles de testear unitariamente.
3. **Capa de Presentación** (`/src/components`): Componentes React que consumen datos y lógica a través de props. Estado limitado a UI (ej. toggles, animaciones).

## Guía de Estilo y Convenciones

### Convenciones de Nombrado
- **Archivos**: `kebab-case` para componentes y utilidades (`timelineDesktop.tsx`, `dateUtils.ts`).
- **Interfaces y Types**: `PascalCase` (`TimelineItem`, `SkillCategory`).
- **Constantes**: `UPPER_SNAKE_CASE` cuando aplique (poco usado en este proyecto).
- **Funciones y Variables**: `camelCase` (`getTimelineItems`, `formatDate`).

### Organización de Components
- **Presentación Pura**: Componentes que solo renderizan props y no usan estado o efectos.
- **Components con Estado**: Solo cuando es necesario para UI (modos, toggles, animaciones). Deben marcarse con `"use client"` en Next.js App Router.
- **Reutilización**: Crear components genéricos cuando se repitan patrones (tarjetas, botones, enlaces).

### Estilos con Tailwind
- **Orden de Clases**: Seguir el orden lógico (layout → posicionamiento → espaciado → tipografía → colores → efectos).
- **Responsividad**: Utilizar los prefijos de breakpoint (`md:`, `lg:`, `xl:`) en lugar de media queries custom.
- **Colores**: Usar la paleta de Tailwind (`slate`, `blue`, etc.) en lugar de valores hexadecimales hardcodeados.
- **Espaciado**: Utilizar la escala de espaciado de Tailwind (`px-4`, `py-6`, `space-y-4`, etc.).
- **Tipografía**: Aprovechar los tamaños de fuente responsive (`text-base md:text-lg`) y utilidades como `leading-relaxed`, `tracking-tight`.

### TypeScript Strict
- **Modo Estricto**: `strict: true` en `tsconfig.json`.
- **No `any`**: Evitar el tipo `any` en cualquier circunstancia. Usar `unknown` cuando el tipo sea realmente desconocido y hacer narrowing.
- **Interfaces Explícitas**: Definir interfaces para objetos, incluso si parecen simples.
- **Arrays Tipados**: Siempre especificar el tipo de los elementos (`string[]`, `number[]`, etc.).
- **Funciones**: Especificar tipos de parámetros y retorno.

### Commits y Git
- **Convencional Commits**: Usar formato `<tipo>(<alcance>): <descripción>` (feat, fix, docs, style, refactor, perf, test, chore).
- **No AI Attribution**: Nunca agregar "Co-Authored-By" o menciones de IA en los commits.
- **Build After Changes**: No ejecutar `npm run build` después de cada cambio; solo cuando se solicite explícitamente.
- **Revisión de Reclamos**: Antes de aceptar cualquier afirmación técnica, verificar primero el código o documentación.

## Buenas Prácticas Implementadas

### Arquitectura Limpia
- **Capas Bien Definidas**: Cada capa tiene una única responsabilidad y conoce mínimamente sobre las otras.
- **Dependencias Unidireccionales**: La presentación depende de la lógica, la lógica depende de los datos, pero nunca al revés.
- **Testabilidad**: La lógica pura en `/lib` puede ser testeada de forma aislada y sencilla.

### Rendimiento y Optimización
- **Code Splitting Automático**: Next.js 16 con App Router optimiza la carga por rutas.
- **Imágenes Optimizadas**: Uso futuro de `<NextImage>` cuando se añadan imágenes (lazy loading, tamaño adecuado).
- **CSS Óptimo**: Tailwind elimina CSS unused en producción.
- **Fuentes del Sistema**: Uso de la pila de fuentes nativa para evitar cargas externas innecesarias.

### Accesibilidad (a11y)
- **Contraste de Colores**: Verificación de que las combinaciones de texto/fondo cumplan WCAG AA/AAA.
- **Navegación con Teclado**: Todos los elementos interactivos son accesibles mediante tab.
- **Labels y ARIA**: Uso adecuado de atributos de accesibilidad donde sea necesario.
- **Enfoque Visible**: Indicadores claros de foco en elementos interactivos.

### SEO y Metadatos
- **Metaetiquetas Completas**: Título descriptivo, descripción rica en palabras clave.
- **Open Graph y Twitter Card**: Para compartir atractivo en redes sociales.
- **JSON-LD Estructurado**: Planificado para mejorar aparición en buscadores (Person, WebSite).
- **Url Canónicas y Manejo de Idiomas**: Preparado para i18n con rutas localizadas (`/`, `/en/`).

## Testing y Calidad
- **Tipado Estricto**: Primer nivel de detección de errores.
- **Revisión de Código**: Estándares altos para pull requests (descripciones claras, convencional commits).
- **Pruebas Futuras**: Estructura preparada para agregar unit tests en `/lib` y component tests con Jest/Vitest y React Testing Library.

##  Próximos Pasos (Mejoras Futuras)
1. **Menú de Navegación con Resaltado de Sección** - Mejora usabilidad en páginas largas.
2. **Modo Claro/Oscuro con Persistencia** - Usando `next-themes` correctamente configurado.
3. **Internacionalización (i18n)** - Soporte completo para español e inglés usando `next-intl`.
4. **Sección de Descarga de CV** - Enlace directo a PDF en `/public/cv.pdf` ().
5. **Pruebas Unitarias** - Para utilidades en `/lib` y components complejos.
6. **Optimización de Imágenes** - Cuando se añadan fotos o screenshots de proyectos.
7. **Análisis de Rendimiento** - Uso de Lighthouse y Web Vitals para monitorear y mejorar.

## Sobre el Autor
Andrés Caso Iglesias combina una extensa experiencia en liderazgo y operaciones bajo presión con formación técnica reciente en desarrollo de aplicaciones multiplataforma y backend. Este portafolio no solo muestra lo que ha construido, sino también cómo piensa, trabaja y aplica principios de ingeniería de software sólidos a cada aspecto de su trabajo profesional.

---

*Documento mantenido como referencia para desarrolladores, colaboradores y el propio autor para asegurar consistencia en el proyecto.*