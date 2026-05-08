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
  enImpact?: string;
  // New bilingual fields: Challenge-Solution-Architecture
  challenge?: string;
  enChallenge?: string;
  solution?: string;
  enSolution?: string;
  architecture?: string;
  enArchitecture?: string;
}

export const projects: Project[] = [
  {
    name: "Bolsa de Empleo",
    description:
      "Aplicación de gestión de ofertas de empleo. Desarrollo multiplataforma con Dart.",
    enName: "Job Board App",
    enDescription:
      "Cross-platform job offers management app with a Dart/Flutter frontend and NestJS backend.",
    tech: ["Dart", "Flutter", "NestJS", "PostgreSQL"],
    github: "https://github.com/Andres-Caso-Iglesias/Bolsa_Empleo",
    live: null,
    impact:
      "Contribuyó a la estabilidad de la versión móvil multiplataforma y a la integración con backend REST, reduciendo tiempos de entrega de iteraciones.",
    role: "Frontend/Mobile & Backend integration",
    challenge: "Sincronización multiplataforma de ofertas de empleo con alta concurrencia y validación de datos en tiempo real.",
    enChallenge: "Cross-platform job offer synchronization with high concurrency and real-time data validation.",
    solution: "Backend escalable con NestJS 10 y TypeScript. Validación estricta con DTOs y persistencia relacional en PostgreSQL.",
    enSolution: "Scalable backend with NestJS 10 and TypeScript. Strict validation with DTOs and relational persistence in PostgreSQL.",
    architecture: "NestJS 10, TypeScript, PostgreSQL, REST API, DTO validation pattern.",
    enArchitecture: "NestJS 10, TypeScript, PostgreSQL, REST API, DTO validation pattern.",
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
    challenge: "Gestión sincronizada de inventarios y pedidos en tiempo real para redes de foodtrucks con alta carga transaccional.",
    enChallenge: "Synchronized inventory and order management in real-time for foodtruck networks with high transactional load.",
    solution: "Arquitectura modular con Java 17 usando Records para inmutabilidad, Spring Boot 3.x, JPA/Hibernate para integridad transaccional y MySQL.",
    enSolution: "Modular architecture with Java 17 using Records for immutability, Spring Boot 3.x, JPA/Hibernate for transactional integrity and MySQL.",
    architecture: "Java 17, Spring Boot 3.x, MySQL, JPA/Hibernate, Maven, Lombok.",
    enArchitecture: "Java 17, Spring Boot 3.x, MySQL, JPA/Hibernate, Maven, Lombok.",
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
    challenge: "Plataforma web para gestión de huertos urbanos comunitarios con UI amigable y estructura de datos clara.",
    enChallenge: "Web platform for managing community urban gardens with friendly UI and clear data structure.",
    solution: "Frontend con HTML/CSS/JS y backend Java/Spring. MapStruct para mapeo DTOs, Lombok para reducción de boilerplate.",
    enSolution: "Frontend with HTML/CSS/JS and Java/Spring backend. MapStruct for DTO mapping, Lombok for boilerplate reduction.",
    architecture: "Java 17, Spring Boot, MySQL, MapStruct, Lombok, HTML, CSS, JavaScript.",
    enArchitecture: "Java 17, Spring Boot, MySQL, MapStruct, Lombok, HTML, CSS, JavaScript.",
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
    challenge: "Demostrar aplicación práctica de clean architecture y buenas prácticas de ingeniería en un portfolio personal desplegado.",
    enChallenge: "Demonstrate practical application of clean architecture and engineering best practices in a deployed personal portfolio.",
    solution: "Separación de capas (datos, lógica, presentación), tipado estricto con TypeScript, diseño responsivo con Tailwind CSS v4 y despliegue en Vercel.",
    enSolution: "Layered separation (data, logic, presentation), strict typing with TypeScript, responsive design with Tailwind CSS v4, and deployment on Vercel.",
    architecture: "Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vercel, App Router.",
    enArchitecture: "Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vercel, App Router.",
    },
   {
     name: "Auditoría de Seguridad Web Básica",
     enName: "Basic Web Security Audit",
     description: "Herramienta de auditoría básica que verifica headers de seguridad faltantes, vulnerabilidades XSS/SQL injection comunes y cumplimiento de normativas básicas.",
     enDescription: "Basic audit tool that checks for missing security headers, common XSS/SQL injection vulnerabilities, and basic regulatory compliance.",
     tech: ["Next.js 16", "TypeScript", "REST API"],
     github: "",
     live: null,
     impact: "Demuestra conocimientos prácticos de auditoría de seguridad y alineación con normativas como NIS2.",
     enImpact: "Demonstrates practical security audit knowledge and alignment with regulations like NIS2.",
      role: "Backend / Security",
    challenge: "Verificar headers de seguridad faltantes y vulnerabilidades comunes (XSS/SQL injection) en aplicaciones web.",
    enChallenge: "Check missing security headers and common vulnerabilities (XSS/SQL injection) in web applications.",
    solution: "Herramienta de auditoría básica usando Next.js 16 API routes para análisis de respuestas HTTP y detección de patrones inseguros.",
    enSolution: "Basic audit tool using Next.js 16 API routes for HTTP response analysis and insecure pattern detection.",
    architecture: "Next.js 16, TypeScript, REST API, HTTP headers analysis.",
    enArchitecture: "Next.js 16, TypeScript, REST API, HTTP headers analysis.",
    }
  ];
