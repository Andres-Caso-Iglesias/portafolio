export interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
}

export const projects: Project[] = [
  {
    name: "Bolsa de Empleo",
    description:
      "Aplicación de gestión de ofertas de empleo. Desarrollo multiplataforma con Dart.",
    tech: ["Dart", "Flutter", "nest.JS", "PostgreSQL"],
    github: "https://github.com/Andres-Caso-Iglesias/Bolsa_Empleo",
    live: null,
  },
  {
    name: "FoodBites",
    description:
      "Sistema de gestión de foodtrucks y sus pedidos de comida. Backend en Java con arquitectura modular y MySQL.",
    tech: ["Java 17", "MySQL", "Spring Boot", "REST", "Maven", "JPA"],
    github: "https://github.com/Andres-Caso-Iglesias/FoodBites",
    live: null,
  },
  {
    name: "Gestor de Huertos Urbanos",
    description:
      "Plataforma web para gestión de huertos urbanos comunitarios. HTML, CSS y JavaScript.",
    tech: ["Java 17", "MySQL", "Spring Boot", "Lombok", "Maven", "MapStruct", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Andres-Caso-Iglesias/Gestor_Huertos_Urbanos",
    live: null,
  },
];