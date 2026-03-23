# Portafolio - Andrés Caso Iglesias

> "Después de casi 20 años liderando equipos en hostelería y logística bajo presión, di un giro radical hacia IT. Traigo disciplina, resiliencia y liderazgo que pocos juniors pueden ofrecer."

Portafolio profesional que presenta mi trayectoria, proyectos y habilidades como Junior Backend Developer. No es solo un escaparate visual, sino una demostración activa de buenas prácticas, arquitectura limpia y código escalable.

---

## Arquitectura y Clean Code

El proyecto ha sido refactorizado y diseñado siguiendo principios de ingeniería de software para asegurar su mantenibilidad y escalabilidad:

- **Separación de Responsabilidades (SRP):** Aplicación estricta del principio *"Los datos deben ser datos, la lógica debe ser lógica, y la presentación debe ser presentación"*.
- **Desacoplamiento:** Componentes especializados de presentación (Desktop/Mobile) que consumen datos estáticos a través de funciones puras, eliminando componentes monolíticos.
- **Tipado Estricto (TypeScript):** Uso de interfaces explícitas (`TimelineItem`, `Project`, etc.), evitando el uso de tipos `any` y garantizando contratos claros entre capas.
- **Lógica Pura y Testable:** Funciones de utilidad aisladas y sin efectos secundarios, preparadas para pruebas unitarias.

---

## Stack Tecnológico

| Front-end | Configuración & Estilos | Deploy & Herramientas |
|:---|:---|:---|
| Next.js 16 (App Router) | TypeScript | Vercel |
| React | Tailwind CSS v4 | npm |

---

## Estructura del Código

La organización del proyecto refleja su enfoque modular y limpio:

```text
src/
├── app/              # Enrutamiento, layouts y páginas (App Router)
├── components/       # Capa de Presentación (exclusivamente JSX y estado UI)
│   └── timeline/     # Componentes especializados (TimelineDesktop y TimelineMobile)
├── data/             # Capa de Datos (exclusivamente arrays estáticos y tipados)
└── lib/              # Capa de Lógica (utilidades, cálculos puros y helpers de Tailwind)
```

---

## Ejecución Local

Para ejecutar este portfolio en tu entorno local, sigue estos pasos:

### 1. Clonar e Instalar
```bash
git clone https://github.com/Andres-Caso-Iglesias/portafolio.git
cd portfolio
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

## Proyectos Destacados

- **Bolsa Empleo:** Aplicación multiplataforma desarrollada con Flutter (Dart), Nest.JS y PostgreSQL.
- **FoodBites:** API Backend robusta desarrollada en Java 17 y MySQL.
- **Gestor Huertos Urbanos:** Interfaz web desarrollada en Java 17 con Spring Boot y MySQL.

---

## Contacto

- **Ubicación:** Asturias, España
- **Email:** andrescasoiglesias@gmail.com
- **GitHub:** [Andres-Caso-Iglesias](https://github.com/Andres-Caso-Iglesias)
- **LinkedIn:** [andrescasoiglesias](https://linkedin.com/in/andrescasoiglesias)
