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
];
