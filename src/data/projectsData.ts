export interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
  // recruiter-focused details
  impact?: string;
  role?: string;
  // English translations
  enName?: string;
  enDescription?: string;
}

export const projects: Project[] = [
  {
    name: "Bolsa de Empleo",
    description:
      "Aplicación de gestión de ofertas de empleo. Desarrollo multiplataforma con Dart.",
    enName: "Job Board App",
    enDescription:
      "Cross-platform job offers management app with a Dart/Flutter frontend and NestJS backend.",
    tech: ["Dart", "Flutter", "nest.JS", "PostgreSQL"],
    github: "https://github.com/Andres-Caso-Iglesias/Bolsa_Empleo",
    live: null,
    impact:
      "Contribuyó a la estabilidad de la versión móvil multiplataforma y a la integración con backend REST, reduciendo tiempos de entrega de iteraciones.",
    role: "Frontend/Mobile & Backend integration",
  },
  {
    name: "FoodBites",
    description:
      "Sistema de gestión de foodtrucks y sus pedidos de comida. Backend en Java con arquitectura modular y MySQL.",
    enName: "FoodBites",
    enDescription:
      "Food truck management system with a modular Java backend and MySQL.",
    tech: ["Java 17", "MySQL", "Spring Boot", "REST", "Maven", "JPA"],
    github: "https://github.com/Andres-Caso-Iglesias/FoodBites",
    live: null,
    impact:
      "Arquitectura modular que facilita pruebas y futuras extensiones; API REST robusta con buena cobertura de casos de uso comunes.",
    role: "Backend / Full-stack",
  },
  {
    name: "Gestor de Huertos Urbanos",
    description:
      "Plataforma web para gestión de huertos urbanos comunitarios. HTML, CSS y JavaScript.",
    enName: "Urban Garden Manager",
    enDescription:
      "Web platform for managing community urban gardens. HTML/CSS/JS with a Java/Spring backend.",
    tech: ["Java 17", "MySQL", "Spring Boot", "Lombok", "Maven", "MapStruct", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Andres-Caso-Iglesias/Gestor_Huertos_Urbanos",
    live: null,
    impact:
      "UI amigable que impulsó adopción del sistema entre comunidades; estructura de datos clara para reporte de actividades.",
    role: "Frontend / Full-stack",
  },
  {
    name: "Portafolio Profesional",
    description:
      "Portafolio web personal construido con Next.js 16, React 19 y TypeScript, siguiendo principios de arquitectura limpia: separación de capas (datos, lógica, presentación), tipado estricto y diseño responsivo con Tailwind CSS v4.",
    enName: "Professional Portfolio",
    enDescription:
      "Personal web portfolio built with Next.js 16, React 19 and TypeScript, applying clean architecture principles: layered separation (data, logic, presentation), strict typing and responsive design with Tailwind CSS v4.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Vercel"],
    github: "https://github.com/Andres-Caso-Iglesias/portafolio",
    live: "https://andres-caso-iglesias.vercel.app",
    impact:
      "Demuestra la aplicación práctica de clean architecture, tipado estricto y buenas prácticas de ingeniería en un proyecto real desplegado en producción.",
    role: "Frontend / Diseño & Arquitectura",
  }
];
