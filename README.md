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
| **Despliegue** | Vercel | Plataforma de despliegue optimizada para Next.js |
| **Gestion de Paquetes** | npm | Gestor de paquetes estandar |
| **Control de Versiones** | Git | Con convenciones de commits convencionales |

---

## Arquitectura y Organizacion del Codigo

El proyecto ha sido refactorizado y disenado siguiendo principios de ingenieria de software para asegurar su mantenibilidad y escalabilidad:

### Principios de Diseno
- **Separacion de Responsabilidades (SRP):** Los datos deben ser datos, la logica debe ser logica, y la presentacion debe ser presentacion.
- **Desacoplamiento:** Componentes especializados que consumen datos a traves de funciones puras, evitando monoliticos.
- **Tipado Estricto (TypeScript):** Uso de interfaces explicitas (`TimelineItem`, `Project`, etc.), evitando el uso de tipos `any` y garantizando contratos claros entre capas.
- **Logica Pura y Testable:** Funciones de utilidad aisladas y sin efectos secundarios.

### Estructura de Directorios
```
/src
  /app           # Enrutamiento, layouts y paginas (App Router de Next.js)
    /projects
      /[slug]    # Pagina dinamica de detalle de proyecto
  /components    # Capa de Presentacion (JSX y estado UI exclusivamente)
    Modal.tsx    # Modal de vista rapida de proyectos
    Timeline.tsx
    /timeline    # Componentes especializados (TimelineDesktop, TimelineMobile)
  /data          # Capa de Datos (arrays estaticos y tipados)
    projectsData.ts
    skillsData.ts
    timelineData.ts
    educationData.ts
  /lib           # Capa de Logica (utilidades, calculos puros y helpers)
    utils.ts
    timelineUtils.ts
  /hooks         # Hooks personalizados
    useGlobalLang.ts
/public
  /erd           # Diagramas ERD (SVG) de cada proyecto
  /snippets      # Fragmentos de codigo representativos
```

### Flujo de Datos
1. **Capa de Datos** (`/src/data`): Contiene unicamente arrays estaticos e interfaces TypeScript. Nada de logica ni efectos secundarios.
2. **Capa de Logica** (`/src/lib`): Funciones puras que transforman, formatean o calculan datos. Faciles de testear unitariamente.
3. **Capa de Presentacion** (`/src/components`): Componentes React que consumen datos y logica a traves de props. Estado limitado a UI.

---

## Buenas Practicas Implementadas

- **Arquitectura Limpia:** Capas bien definidas con dependencias unidireccionales (Presentacion -> Logica -> Datos).
- **Rendimiento y Optimizacion:** Code splitting automatico de Next.js 16, CSS optimo con Tailwind (elimina unused CSS), y uso de fuentes del sistema.
- **Accesibilidad (a11y):** Contraste de colores adecuado, navegacion por teclado, uso de labels/ARIA y enfoque visible.
- **SEO y Metadatos:** Metaetiquetas completas, Open Graph, Twitter Card y preparado para JSON-LD.
- **Testing y Calidad:** Tipado estricto y estructura preparada para unit tests.

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

### 3. Build para Produccion
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
- [Auditoria de Seguridad](https://andres-caso-iglesias.vercel.app/projects/auditoria-seguridad) - Next.js 16 + TypeScript

### Estrategia de Visualizacion Tecnica

Cada proyecto incluye una vista detallada con:
- **Diagramas ER** (Entity Relationship) en formato SVG en `public/erd/`
- **Fragmentos de codigo** representativos en `public/snippets/`
- **Secciones de Reto, Solucion y Arquitectura** con contenido bilingue (espanol/ingles)
- **Pagina de detalle** accesible mediante `/projects/[slug]`

Proyectos con contenido disponible:
| Proyecto | ERD | Snippets | Pagina Detalle |
|----------|-----|----------|----------------|
| Bolsa de Empleo | bolsa-empleo.svg | nestjs-dto-validation.ts, postgres-index-optimization.sql | /projects/bolsa-empleo |
| FoodBites | foodbites.svg | react-component.tsx | /projects/foodbites |
| Gestor Huertos | gestor-huertos.svg | - | /projects/gestor-huertos |
| Portafolio | portafolio.svg | - | /projects/portafolio-profesional |
| Auditoria Seguridad | auditoria-seguridad.svg | security-audit.ts | /projects/auditoria-seguridad |

---

## Contacto

- **Ubicacion:** Asturias, Espana
- **Email:** andrescasoiglesias@gmail.com
- **GitHub:** [Andres-Caso-Iglesias](https://github.com/Andres-Caso-Iglesias)
- **LinkedIn:** [andrescasoiglesias](https://linkedin.com/in/andrescasoiglesias)
- **Web:** [https://andres-caso-iglesias.vercel.app/](https://andres-caso-iglesias.vercel.app/)

---

## NOTA: Sin Emojis

Este proyecto **NO utiliza emojis** en ninguna parte del codigo, documentacion o mensajes de commit. Esta decision se tomo para mantener consistencia y evitar problemas de compatibilidad entre diferentes sistemas y editores.