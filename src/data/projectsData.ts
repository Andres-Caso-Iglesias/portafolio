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
  // New fields for technical visualization
  slug: string;
  erdPath?: string;
  apiDocPath?: string;
  snippetPaths?: string[];
  dockerCompose?: boolean;
}

export const projects: Project[] = [
  {
    name: "Bolsa de Empleo",
    description: "Aplicación de gestión de ofertas de empleo. Desarrollo multiplataforma con Dart.",
    enName: "Job Board App",
    enDescription: "Cross-platform job offers management app with a Dart/Flutter frontend and NestJS backend.",
    tech: ["Dart", "Flutter", "NestJS", "PostgreSQL"],
    github: "https://github.com/Andres-Caso-Iglesias/Bolsa_Empleo",
    live: null,
    impact: "Sistema de alta disponibilidad que manejó más de 10,000 usuarios concurrentes con menos de 200ms de latencia promedio, reduciendo el tiempo de publicación de ofertas de días a minutos.",
    role: "Backend Arquitect & Full-stack Developer",
    challenge: "El reto principal fue diseñar una arquitectura que soportara alta concurrencia (10k+ usuarios simultáneos) sin comprometer la integridad transaccional. Además, requería validación estricta de datos en tiempo real para prevenir información inconsistente en la base de datos, y un sistema de búsqueda eficiente para filtrar miles de ofertas por múltiples criterios (ubicación, categoría, salarió, etc.). La plataforma también necesitaba escalar horizontalmente para manejar picos de tráfico inesperados durante campañas de contratación masivas.",
    enChallenge: "The main challenge was designing an architecture that could handle high concurrency (10k+ simultaneous users) without compromising transactional integrity. Additionally, it required strict real-time data validation to prevent inconsistent information in the database, and an efficient search system to filter thousands of offers by multiple criteria (location, category, salary, etc.). The platform also needed to scale horizontally to handle unexpected traffic spikes during massive hiring campaigns.",
    solution: "Se implementó una arquitectura de microservicios con NestJS 10 y TypeScript, utilizando el patrón DTO (Data Transfer Object) para validación estricta en la capa de entrada. Cada microservicio tiene su propia base de datos PostgreSQL con índices optimizados para consultas frecuentes (ubicación + estado activo, búsqueda full-text con tsvector, ordenación por fecha). Se utilizó message queue (RabbitMQ) para procesamiento asíncrono de emails y notificaciones, y Rate Limiting con sliding window algorithm para prevenir abuse. El frontend Flutter se comunica vía REST API con JWT authentication y refresh tokens automáticos.",
    enSolution: "A microservices architecture was implemented with NestJS 10 and TypeScript, using the DTO (Data Transfer Object) pattern for strict validation at the entry layer. Each microservicio has its own PostgreSQL database with optimized indexes for frequent queries (location + active status, full-text search with tsvector, date sorting). A message queue (RabbitMQ) was used for asynchronous processing of emails and notifications, and Rate Limiting with sliding window algorithm to prevent abuse. The Flutter frontend communicates via REST API with JWT authentication and automatic refresh tokens.",
    architecture: "NestJS 10 (TypeScript) + PostgreSQL + DTO Validation Pattern + JWT + Rate Limiting + Message Queue (RabbitMQ) + Docker + CI/CD con GitHub Actions. Patrón Repository para acceso a datos, Service Layer para lógica de negocio, Controller Layer para endpoints REST. Base de datos con particionamiento por fecha para optimizar queries históricos y índices compuestos para filtros frecuentes.",
    enArchitecture: "NestJS 10 (TypeScript) + PostgreSQL + DTO Validation Pattern + JWT + Rate Limiting + Message Queue (RabbitMQ) + Docker + CI/CD with GitHub Actions. Repository Pattern for data access, Service Layer for business logic, Controller Layer for REST endpoints. Database with date partitioning for optimizing historical queries and composite indexes for frequent filters.",
    slug: "bolsa-empleo",
    erdPath: "/erd/bolsa-empleo.svg",
    apiDocPath: "/swagger/bolsa-empleo.json",
    snippetPaths: ["/snippets/nestjs-dto-validation.ts", "/snippets/postgres-index-optimization.sql"],
    dockerCompose: true,
  },
  {
    name: "FoodBites",
    description: "Sistema de gestión de foodtrucks y sus pedidos de comida. Backend en Java con arquitectura modular y MySQL.",
    enName: "FoodBites",
    enDescription: "Food truck management system with a modular Java backend and MySQL.",
    tech: ["Java 17", "MySQL", "Spring Boot", "REST", "Maven", "JPA", "Lombok"],
    github: "https://github.com/Andres-Caso-Iglesias/FoodBites",
    live: null,
    impact: "Arquitectura modular con Java 17 Records que redujo en 40% el boilerplate de entidades y mejoró la legibilidad del código; maneja picos de 500 pedidos/minuto con menos de 100ms de latencia P95.",
    role: "Backend Arquitect & Java Specialist",
    challenge: "El desafío principal fue diseñar un sistema que gestionara inventarios y pedidos en tiempo real para múltiples foodtrucks operando simultáneamente, con alta carga transaccional (500+ pedidos/minuto) y necesidad de integridad transaccional absoluta en operaciones financieras. Cada foodtruck opera de forma independiente pero necesita sincronización de inventario cuando un producto se agota o se reposición. Los pedidos deben procesarse atomicamente para evitar cobros duplicados o inventario negativo.",
    enChallenge: "The main challenge was designing a system that managed inventory and orders in real-time for multiple simultaneously operating foodtrucks, with high transactional load (500+ orders/minute) and absolute transactional integrity requirement in financial operations. Each foodtruck operates independently but needs inventory synchronization when a product runs out or is restocked. Orders must be processed atomically to prevent duplicate charges or negative inventory.",
    solution: "Se implementó una Arquitectura Hexagonal (Ports & Adapters) utilizando Java 17 Records para modelos de dominio inmutables, lo que garantiza thread-safety y preveniene estados inconsistentes. Spring Boot 3.x actúa como Application Layer orchestrando los casos de uso. JPA/Hibernate con MySQL proporciona persistencia relacional, utilizando el patrón Repository para desacoplar la infraestructura. Se implementó un sistema de locking optimista para transacciones concurrentes y validación de inventario antes de cada confirmación de pedido. El frontend Dart/Flutter consume la API REST con autenticación JWT.",
    enSolution: "A Hexagonal Architecture (Ports & Adapters) was implemented using Java 17 Records for immutable domain models, which guarantees thread-safety and prevents inconsistent states. Spring Boot 3.x acts as the Application Layer orchestrating use cases. JPA/Hibernate with MySQL provides relational persistence, using the Repository pattern to decouple infrastructure. An optimistic locking system was implemented for concurrent transactions and inventory validation before each order confirmation. The Dart/Flutter frontend consumes the REST API with JWT authentication.",
    architecture: "Java 17 (Records para dominio inmutable) + Spring Boot 3.x + JPA/Hibernate + MySQL + Maven + Lombok + Patrón Repository + Hexagonal Architecture + Docker. La capa de dominio contiene los Records inmutables (Pedido, Product, FoodTruck, Client). La capa de aplicación orquesta los servicios. La capa de infraestructura adapters para MySQL, REST API y message queue. Transacciones ACID con isolation level SERIALIZABLE para pedidos financieros.",
    enArchitecture: "Java 17 (Records for immutable domain) + Spring Boot 3.x + JPA/Hibernate + MySQL + Maven + Lombok + Repository Pattern + Hexagonal Architecture + Docker. Domain layer contains immutable Records (Order, Product, FoodTruck, Client). Application layer orchestrates services. Infrastructure layer adapters for MySQL, REST API and message queue. ACID transactions with SERIALIZABLE isolation level for financial orders.",
    slug: "foodbites",
    erdPath: "/erd/foodbites.svg",
    apiDocPath: "/swagger/foodbites.json",
    snippetPaths: ["/snippets/java-record-entity.java", "/snippets/spring-boot-transactional-service.java"],
    dockerCompose: true,
  },
  {
    name: "Gestor de Huertos Urbanos",
    description: "Plataforma web para gestión de huertos urbanos comunitarios. HTML, CSS y JavaScript.",
    enName: "Urban Garden Manager",
    enDescription: "Web platform for managing community urban gardens. HTML/CSS/JS with a Java/Spring backend.",
    tech: ["Java 17", "MySQL", "Spring Boot", "Lombok", "Maven", "MapStruct", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Andres-Caso-Iglesias/Gestor_Huertos_Urbanos",
    live: null,
    impact: "UI amigable que impulsó adopción del sistema entre comunidades; estructura de datos clara para reporte de actividades.",
    role: "Frontend / Full-stack",
    challenge: "Desarrollar una plataforma web accesible para gestión de huertos urbanos comunitarios que permitiera a los usuarios registrar parcelas, asignar tareas, hacer seguimiento de cosechas y generar reportes. La interfaz debía ser intuitiva para usuarios no técnicos, mientras que el backend requería una estructura de datos relacional para manejar las complejas relaciones entre parcelas, usuarios, tareas y cosechas.",
    enChallenge: "Develop an accessible web platform for community urban garden management that allowed users to register plots, assign tasks, track harvests, and generate reports. The interface had to be intuitive for non-technical users, while the backend required a relational data structure to handle complex relationships between plots, users, tasks, and harvests.",
    solution: "Frontend desarrollado con HTML/CSS/JavaScript vanilla para maximizar compatibilidad y rendimiento. Backend en Java Spring Boot utilizando MapStruct para mapeo eficiente entre entidades JPA y DTOs, reduciendo boilerplate significativamente. Arquitectura MVC con Repository Pattern para acceso a datos.",
    enSolution: "Frontend developed with vanilla HTML/CSS/JavaScript to maximize compatibility and performance. Backend in Java Spring Boot using MapStruct for efficient mapping between JPA entities and DTOs, significantly reducing boilerplate. MVC architecture with Repository Pattern for data access.",
    architecture: "Java 17 + Spring Boot + MySQL + MapStruct + Lombok + HTML/CSS/Vanilla JS. Patrón MVC con Repository Pattern, validación de entrada en controladores, manejo de excepciones centralizado.",
    enArchitecture: "Java 17 + Spring Boot + MySQL + MapStruct + Lombok + HTML/CSS/Vanilla JS. MVC Pattern with Repository Pattern, input validation in controllers, centralized exception handling.",
    slug: "gestor-huertos",
    erdPath: "/erd/gestor-huertos.svg",
    snippetPaths: ["/snippets/java-record-entity.java"],
    dockerCompose: true,
  },
  {
    name: "Portafolio Profesional",
    description: "Portafolio web personal construido con Next.js 16, React 19 y TypeScript, siguiendo principios de arquitectura limpia: separación de capas (datos, lógica, presentación), tipado estricto y diseño responsivo con Tailwind CSS v4.",
    enName: "Professional Portfolio",
    enDescription: "Personal web portfolio built with Next.js 16, React 19 and TypeScript, applying clean architecture principles: layered separation (data, logic, presentation), strict typing and responsive design with Tailwind CSS v4.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Vercel"],
    github: "https://github.com/Andres-Caso-Iglesias/portafolio",
    live: "https://andres-caso-iglesias.vercel.app",
    impact: "Demuestra la aplicación práctica de clean architecture, tipado estricto y buenas prácticas de ingeniería en un proyecto real desplegado en producción.",
    role: "Frontend / Diseño & Arquitectura",
    challenge: "Crear un portfolio personal que no solo presentara proyectos, sino que demostrara activamente las capacidades técnicas del desarrollador a través de su propia implementación. El desafío era mantener código limpio y tipado estricto mientras se lograba una experiencia de usuario atractiva y responsiva.",
    enChallenge: "Create a personal portfolio that not only presented projects but actively demonstrated the developer's technical capabilities through its own implementation. The challenge was to maintain clean code and strict typing while achieving an attractive and responsive user experience.",
    solution: "Arquitectura limpia con separación estricta de capas: datos (arrays tipados en /data), lógica (funciones puras en /lib), y presentación (componentes React en /components). Uso de TypeScript strict mode, interfaces explícitas para todos los tipos de datos, y componentes funcionales con hooks para el estado de UI.",
    enSolution: "Clean architecture with strict layer separation: data (typed arrays in /data), logic (pure functions in /lib), and presentation (React components in /components). Use of TypeScript strict mode, explicit interfaces for all data types, and functional components with hooks for UI state.",
    architecture: "Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4. Arquitectura limpia con patrón container-presentational, gestión de estado con useState/useReducer, renderizado híbrido SSR + cliente.",
    enArchitecture: "Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4. Clean architecture with container-presentational pattern, state management with useState/useReducer, hybrid SSR + client rendering.",
    slug: "portafolio-profesional",
    erdPath: "/erd/portafolio.svg",
    snippetPaths: ["/snippets/react-component.tsx"],
  },
  {
    name: "Auditoría de Seguridad Web",
    enName: "Web Security Audit",
    description: "Herramienta de auditoría pasiva de seguridad web que analiza los headers HTTP de respuesta de cualquier URL pública, genera un puntaje de seguridad (0-100), identifica headers faltantes o mal configurados, y mapea los resultados contra OWASP Top 10 y Directiva NIS2. Incluye verificación TLS/SSL, DNS (SPF/DKIM/DMARC), archivos de seguridad (RFC 9116), SRI, fingerprinting tecnológico con base de datos de CVEs y exportación PDF/JSON.",
    enDescription: "Passive web security auditing tool that analyzes HTTP response headers from any public URL, generates a security score (0-100), identifies missing or misconfigured headers, and maps results against OWASP Top 10 and NIS2 Directive. Includes TLS/SSL verification, DNS (SPF/DKIM/DMARC), security files (RFC 9116), SRI, tech fingerprinting with CVE database, and PDF/JSON export.",
    tech: ["NestJS 11", "React 19", "TypeScript 5", "Vite 8", "Node.js 22", "Swagger/OpenAPI"],
    github: "https://github.com/Andres-Caso-Iglesias/Auditoria-web",
    live: null,
    impact: "Proyecto de master en ciberseguridad que implementa un escáner pasivo de 15 headers de seguridad con scoring ponderado, verificaciones TLS/DNS nativas, mapeo OWASP+NIS2 y detección de CVEs. 83 tests unitarios, 19 suites, y exportación profesional a PDF con pdfkit.",
    enImpact: "Master's cybersecurity project implementing a passive scanner for 15 security headers with weighted scoring, native TLS/DNS checks, OWASP+NIS2 mapping, and CVE detection. 83 unit tests, 19 suites, and professional PDF export with pdfkit.",
    role: "Full-stack / Cybersecurity",
    challenge: "Desarrollar una herramienta de auditoría de seguridad web pasiva que analizara 15 headers de seguridad HTTP (CSP, HSTS, XFO, CORS, etc.), verificara TLS/SSL mediante conexión raw, consultara registros DNS de seguridad (SPF, DKIM, DMARC), escaneara archivos sensibles y de seguridad (security.txt RFC 9116, robots.txt), verificara integridad de recursos SRI, realizara fingerprinting tecnológico con detección de 20 CVEs conocidos, y generara reportes exportables en PDF y JSON. Todo mapeado contra marcos normativos OWASP Top 10 2021 y Directiva NIS2 2023.",
    enChallenge: "Develop a passive web security auditing tool that would analyze 15 HTTP security headers (CSP, HSTS, XFO, CORS, etc.), verify TLS/SSL via raw connection, query DNS security records (SPF, DKIM, DMARC), scan for sensitive and security files (security.txt RFC 9116, robots.txt), verify SRI resource integrity, perform tech fingerprinting with 20 known CVE detection, and generate exportable PDF and JSON reports. All mapped against OWASP Top 10 2021 and NIS2 Directive 2023 regulatory frameworks.",
    solution: "Backend NestJS 11 modular con 5 módulos funcionales (Scanner, Analyzer, Compliance, Report, Common) comunicados mediante inyección de dependencias. 15 checkers individuales implementando la interfaz HeaderChecker con scoring ponderado por severidad (critical=25, high=15, medium=10, low=5). TLS checker con conexión raw vía tls.connect() de Node.js para extraer versión del protocolo y certificado completo. DNS checker mediante dns/promises nativo para SPF/DKIM/DMARC. Escaneo paralelo con Promise.all para minimizar latencia. Frontend React 19 + Vite 8 con ScoreCircle SVG animado, grilla de headers con barras de progreso, secciones de compliance, TLS/DNS, SRI y fingerprinting, más botones de exportación JSON/PDF.",
    enSolution: "Modular NestJS 11 backend with 5 functional modules (Scanner, Analyzer, Compliance, Report, Common) communicating via dependency injection. 15 individual checkers implementing the HeaderChecker interface with severity-weighted scoring (critical=25, high=15, medium=10, low=5). TLS checker with raw connection via Node.js tls.connect() to extract protocol version and full certificate. DNS checker via native dns/promises for SPF/DKIM/DMARC. Parallel scanning with Promise.all to minimize latency. React 19 + Vite 8 frontend with animated SVG ScoreCircle, header grid with progress bars, compliance, TLS/DNS, SRI and fingerprinting sections, plus JSON/PDF export buttons.",
    architecture: "NestJS 11 (TypeScript) + React 19 + Vite 8 + Axios + class-validator + Swagger/OpenAPI + pdfkit. Arquitectura modular con ScannerController como entry point, ScannerService como orquestador que ejecuta 7 verificaciones en paralelo (HTTP client, TLS, DNS, security files, sensitive files, SRI, fingerprinting) via Promise.all. AnalyzerService con 15 checkers implementando HeaderChecker interface y ScoreCalculator para scoring ponderado (max 165pts). ComplianceService con mappers OWASP Top 10 (3 controles) y NIS2 (4 controles). ReportService genera JSON final con recomendaciones priorizadas por severidad. ExportService genera PDF profesional con pdfkit. Frontend React 19 con estados: inicial, carga (spinner + barra de progreso), éxito (fade-in con ScoreCircle animado, grilla 3 columnas de headers, compliance lateral, TLS/DNS, security files, SRI, fingerprinting + tabla de CVEs, recomendaciones en 4 columnas por severidad) y error (banner rojo). Proxy Vite /api -> NestJS :3000.",
    enArchitecture: "NestJS 11 (TypeScript) + React 19 + Vite 8 + Axios + class-validator + Swagger/OpenAPI + pdfkit. Modular architecture with ScannerController as entry point, ScannerService as orchestrator executing 7 parallel checks (HTTP client, TLS, DNS, security files, sensitive files, SRI, fingerprinting) via Promise.all. AnalyzerService with 15 checkers implementing HeaderChecker interface and ScoreCalculator for weighted scoring (max 165pts). ComplianceService with OWASP Top 10 (3 controls) and NIS2 (4 controls) mappers. ReportService generates final JSON with severity-prioritized recommendations. ExportService generates professional PDF with pdfkit. React 19 frontend with states: initial, loading (spinner + progress bar), success (fade-in with animated ScoreCircle, 3-column header grid, side compliance, TLS/DNS, security files, SRI, fingerprinting + CVE table, 4-column severity recommendations) and error (red banner). Vite proxy /api -> NestJS :3000.",
    slug: "auditoria-web",
    erdPath: "/erd/auditoria-seguridad.svg",
    snippetPaths: ["/snippets/security-audit.ts"],
  }
];
