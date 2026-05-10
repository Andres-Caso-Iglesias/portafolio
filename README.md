# Portafolio Profesional - Andrés Caso Iglesias

![Despliegue Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Enlace al Portafolio:** [https://andres-caso-iglesias.vercel.app/](https://andres-caso-iglesias.vercel.app/)

> "Después de casi 20 años liderando equipos en hostelería y logística bajo presión, di un giro radical hacia IT. Traigo disciplina, resiliencia y liderazgo que pocos pueden ofrecer."

Este portafolio presenta mi trayectoria, proyectos y habilidades como desarrollador. No es solo un escaparate visual, sino una demostración activa de buenas prácticas de ingeniería de software, arquitectura limpia y código escalable. Actualmente cursando un master en ciberseguridad & IA, para obtener la certificación eJPT.

---

## 📚 Stack Tecnológico

| Categoría | Tecnología | Detalles |
|-----------|------------|----------|
| **Frontend** | Next.js 16 (App Router) | Framework React para aplicaciones híbridas estáticas y servidor-side |
| | React 19 | Biblioteca de UI con últimas características (React Compiler) |
| | TypeScript | Tipado estricto para seguridad y autocompletado |
| **Estilos** | Tailwind CSS v4 | Framework utility-first para diseño responsivo y mantenible |
| **Iconos** | SVG inline | Iconos personalizados y accesibles |
| **Despliegue** | Vercel | Plataforma de despliegue optimizada para Next.js |
| **Gestión de Paquetes** | npm | Gestor de paquetes estándar |
| **Control de Versiones** | Git | Con convenciones de commits convencionales |

---

## 🏗️ Arquitectura y Organización del Código

El proyecto ha sido refactorizado y diseñado siguiendo principios de ingeniería de software para asegurar su mantenibilidad y escalabilidad:

### Principios de Diseño
- **Separación de Responsabilidades (SRP):** Los datos deben ser datos, la lógica debe ser lógica, y la presentación debe ser presentación.
- **Desacoplamiento:** Componentes especializados que consumen datos a través de funciones puras, evitando monolíticos.
- **Tipado Estricto (TypeScript):** Uso de interfaces explícitas (`TimelineItem`, `Project`, etc.), evitando el uso de tipos `any` y garantizando contratos claros entre capas.
- **Lógica Pura y Testable:** Funciones de utilidad aisladas y sin efectos secundarios.

### Estructura de Directorios
```
/src
  /app           # Enrutamiento, layouts y páginas (App Router de Next.js)
  /components    # Capa de Presentación (JSX y estado UI exclusivamente)
    /timeline    # Componentes especializados (TimelineDesktop, TimelineMobile, EducationSection)
  /data          # Capa de Datos (arrays estáticos y tipados)
    projectsData.ts
    skillsData.ts
    timelineData.ts
    educationData.ts
  /lib           # Capa de Lógica (utilidades, cálculos puros y helpers)
    utils.ts
    timelineUtils.ts
```

### Flujo de Datos
1. **Capa de Datos** (`/src/data`): Contiene únicamente arrays estáticos e interfaces TypeScript. Nada de lógica ni efectos secundarios.
2. **Capa de Lógica** (`/src/lib`): Funciones puras que transforman, formatean o calculan datos. Fáciles de testear unitariamente.
3. **Capa de Presentación** (`/src/components`): Componentes React que consumen datos y lógica a través de props. Estado limitado a UI.

---

## ✨ Buenas Prácticas Implementadas

- **Arquitectura Limpia:** Capas bien definidas con dependencias unidireccionales (Presentación → Lógica → Datos).
- **Rendimiento y Optimización:** Code splitting automático de Next.js 16, CSS óptimo con Tailwind (elimina unused CSS), y uso de fuentes del sistema.
- **Accesibilidad (a11y):** Contraste de colores adecuado, navegación por teclado, uso de labels/ARIA y enfoque visible.
- **SEO y Metadatos:** Metaetiquetas completas, Open Graph, Twitter Card y preparado para JSON-LD.
- **Testing y Calidad:** Tipado estricto y estructura preparada para unit tests.

---

## 🖥️ Ejecución Local

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
La aplicación estará disponible en `http://localhost:3000`.

### 3. Build para Producción
```bash
npm run build
npm run start
```

---

## 🚀 Proyectos Destacados

Puedes ver el detalle técnico de cada proyecto en las siguientes páginas:
- [Bolsa de Empleo](https://andres-caso-iglesias.vercel.app/projects/bolsa-empleo) - API NestJS + PostgreSQL, documentación Swagger disponible
- [FoodBites](https://andres-caso-iglesias.vercel.app/projects/foodbites) - Backend Java Spring Boot + MySQL, diagrama ER disponible
- [Gestor Huertos Urbanos](https://andres-caso-iglesias.vercel.app/projects/gestor-huertos) - Java Spring Boot + MySQL
- [Portafolio Profesional](https://andres-caso-iglesias.vercel.app/projects/portafolio-profesional) - Next.js 16 + React 19 + TypeScript
- [Auditoría de Seguridad](https://andres-caso-iglesias.vercel.app/projects/auditoria-seguridad) - Next.js 16 + TypeScript

### 🔍 Nueva Funcionalidad: Estrategia de Visualización Técnica
Cada proyecto ahora incluye una vista detallada accesible mediante `/projects/[slug]` que muestra:
- **Diagramas ER** (Entity Relationship) en `public/erd/`
- **Documentación API** (Swagger/OpenAPI) en `public/swagger/`
- **Fragmentos de código representativos** en `public/snippets/`
- **Información de configuración Docker** cuando aplica
- **Secciones de Reto, Solución y Arquitectura** existentes

Proyectos con backend disponen de configuración Docker:
- `docker-compose.yml` en la raíz del proyecto configura servicios para:
  - MySQL (FoodBites, Gestor Huertos)
  - PostgreSQL (Bolsa de Empleo)
  - Java Spring Boot (FoodBites, Gestor Huertos)
  - NestJS (Bolsa de Empleo)

Documentación técnica y diagramas disponibles en:
- Diagramas ER: `public/erd/`
- Documentación API: `public/swagger/`
- Fragmentos de código: `public/snippets/`

---

## 📞 Contacto

- **Ubicación:** Asturias, España
- **Email:** andrescasoiglesias@gmail.com
- **GitHub:** [Andres-Caso-Iglesias](https://github.com/Andres-Caso-Iglesias)
- **LinkedIn:** [andrescasoiglesias](https://linkedin.com/in/andrescasoiglesias)
- **Web:** [https://andres-caso-iglesias.vercel.app/](https://andres-caso-iglesias.vercel.app/)