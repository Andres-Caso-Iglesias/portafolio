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
    name: "Security Header Scanner & Quick Assessment Tool",
    enName: "Security Header Scanner & Quick Assessment Tool",
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
  },
  {
    name: "Bolsa de Empleo",
    description: "Plataforma integral de gestión de procesos de reclutamiento que conecta empresas y candidatos. Frontend multiplataforma Flutter con backend NestJS y PostgreSQL.",
    enName: "Job Board App",
    enDescription: "Comprehensive recruitment management platform connecting companies and candidates. Cross-platform Flutter frontend with NestJS backend and PostgreSQL.",
    tech: ["Dart", "Flutter 3", "NestJS 11", "PostgreSQL", "TypeORM", "JWT", "Docker"],
    github: "https://github.com/Andres-Caso-Iglesias/Bolsa_Empleo",
    live: null,
    impact: "Proyecto completo de ingeniería de software con arquitectura limpia (Clean Architecture) en Flutter, backend NestJS modular con autenticación JWT + Passport, TypeORM con migraciones, Docker para PostgreSQL, y plan de pruebas con 7 tipos de testing (unitario, integración, seguridad, usabilidad, etc.). Roles diferenciados Candidato/Empresa con dashboards específicos.",
    enImpact: "Complete software engineering project with Clean Architecture in Flutter, modular NestJS backend with JWT + Passport authentication, TypeORM with migrations, Docker for PostgreSQL, and a testing plan covering 7 testing types (unit, integration, security, usability, etc.). Differentiated Candidate/Company roles with specific dashboards.",
    role: "Full-stack Developer & Software Architect",
    challenge: "El reto principal fue diseñar una plataforma de reclutamiento funcional con dos roles de usuario diferenciados (Candidato y Empresa) que compartieran la misma base de autenticación pero con perfiles, dashboards y funcionalidades completamente distintos. En el frontend Flutter, había que gestionar el estado de sesión de forma segura (SecureStorage + Provider), la navegación inteligente según rol autenticado, y la sincronización con una API REST NestJS. En el backend, el desafío era implementar autenticación JWT con guards globales, herencia de usuarios con TypeORM (Single Table Inheritance o relaciones 1:1), y DTOs con validación estricta en cada endpoint.",
    enChallenge: "The main challenge was designing a functional recruitment platform with two differentiated user roles (Candidate and Company) sharing the same auth base but with completely different profiles, dashboards, and functionalities. On the Flutter frontend, managing session state securely (SecureStorage + Provider), intelligent navigation based on authenticated role, and synchronization with a NestJS REST API. On the backend, implementing JWT authentication with global guards, user inheritance with TypeORM (1:1 relations), and DTOs with strict validation on every endpoint.",
    solution: "Backend NestJS 11 monolítico con 2 módulos principales (Auth + Recruitment). AuthModule con JwtService + Passport.js (JwtAuthGuard global, RolesGuard para autorización por rol), bcrypt para hash de contraseñas, y DTOs con class-validator. RecruitmentModule orquesta 3 submódulos: Aspirants (perfiles, skills, experiencia), Companies (perfiles, ofertas de empleo), Applications (postulaciones). TypeORM con entidades User (hereda a AspirantProfile y CompanyProfile vía 1:1), JobOffer y Application. Frontend Flutter 3 con Clean Architecture: capa Core (ApiService, SecureStorageService), Data (Modelos, Repositorios), Presentation (Provider ViewModels + Widgets organizados por feature: auth, home, dashboard/company, dashboard/applicant, shared). Docker Compose para PostgreSQL en desarrollo.",
    enSolution: "Monolithic NestJS 11 backend with 2 main modules (Auth + Recruitment). AuthModule with JwtService + Passport.js (global JwtAuthGuard, RolesGuard for role-based authorization), bcrypt for password hashing, and class-validator DTOs. RecruitmentModule orchestrates 3 submodules: Aspirants (profiles, skills, experience), Companies (profiles, job offers), Applications (applications). TypeORM with User entity (maps to AspirantProfile and CompanyProfile via 1:1), JobOffer and Application. Flutter 3 frontend with Clean Architecture: Core layer (ApiService, SecureStorageService), Data (Models, Repositories), Presentation (Provider ViewModels + feature-based Widgets: auth, home, dashboard/company, dashboard/applicant, shared). Docker Compose for PostgreSQL in development.",
    architecture: "NestJS 11 (TypeScript) + Flutter 3 (Dart) + PostgreSQL + TypeORM + Passport.js/JWT + class-validator + Docker. Backend monolítico modular con AppModule que importa AuthModule y RecruitmentModule (submódulos: Aspirants, Companies, Applications). Guards globales JwtAuthGuard + RolesGuard decorados con @UseGuards. TypeORM con autoLoadEntities + synchronize en desarrollo, migraciones en producción (conexión SSL/TLS para entornos cloud). Frontend Flutter con Provider como gestor de estado, SecureStorage para persistencia de tokens, Clean Architecture (Core/Data/Presentation), navegación por rol autenticado con botón dinámico GoToDashboard. Pruebas: Jest + Supertest en backend, flutter_test en frontend, Postman para validación de flujos API.",
    enArchitecture: "NestJS 11 (TypeScript) + Flutter 3 (Dart) + PostgreSQL + TypeORM + Passport.js/JWT + class-validator + Docker. Modular monolithic backend with AppModule importing AuthModule and RecruitmentModule (submodules: Aspirants, Companies, Applications). Global guards JwtAuthGuard + RolesGuard with @UseGuards. TypeORM with autoLoadEntities + synchronize in development, migrations in production (SSL/TLS for cloud environments). Flutter frontend with Provider for state management, SecureStorage for token persistence, Clean Architecture (Core/Data/Presentation), role-based navigation with dynamic GoToDashboard button. Testing: Jest + Supertest on backend, flutter_test on frontend, Postman for API flow validation.",
    slug: "bolsa-empleo",
    erdPath: "/erd/bolsa-empleo.svg",
    apiDocPath: "/swagger/bolsa-empleo.json",
    snippetPaths: ["/snippets/nestjs-dto-validation.ts", "/snippets/typeorm-entities.ts"],
    dockerCompose: true,
  },
  {
    name: "FoodBites",
    description: "API RESTful para la gestión integral de food trucks: camiones, menús, pedidos, usuarios y ubicaciones. Backend Java con Spring Boot 3 y MySQL.",
    enName: "FoodBites",
    enDescription: "RESTful API for comprehensive food truck management: trucks, menus, orders, users, and locations. Java backend with Spring Boot 3 and MySQL.",
    tech: ["Java 17", "Spring Boot 3.2", "MySQL", "JPA/Hibernate", "Lombok", "Maven", "Jakarta Validation", "Thymeleaf"],
    github: "https://github.com/Andres-Caso-Iglesias/FoodBites",
    live: null,
    impact: "API REST completa con 6 controladores (FoodTruck, Menu, Pedido, Usuario, Notificacion, Ubicacion), endpoints de búsqueda por proximidad y recomendaciones por tipo de cocina con ordenación y límite. Pruebas unitarias con JUnit + Mockito para servicios, y batería de tests funcionales con curl. Arquitectura MVC clásica con inyección de dependencias por constructor y DTOs para transferencia de datos.",
    enImpact: "Complete REST API with 6 controllers (FoodTruck, Menu, Order, User, Notification, Location), proximity search and cuisine type recommendation endpoints with sorting and limits. Unit tests with JUnit + Mockito for services, and functional test suite with curl. Classic MVC architecture with constructor injection and DTOs for data transfer.",
    role: "Backend Developer & Java Specialist",
    challenge: "El reto principal fue diseñar y construir una API RESTful completa desde cero para la gestión de food trucks, con 6 entidades interrelacionadas (FoodTruck, Menu, Pedido, Usuario, Notificacion, Ubicacion) y operaciones que incluyen desde CRUD básico hasta búsquedas por proximidad geográfica (ciudad/calle), recomendaciones por tipo de cocina con paginación, cálculo de beneficios medios por pedido, y ranking de food trucks más populares. Todo ello siguiendo el patrón MVC con capas bien diferenciadas (Controller, Service, Repository, DTO) y buenas prácticas como inyección de dependencias por constructor en lugar de @Autowired.",
    enChallenge: "The main challenge was designing and building a complete RESTful API from scratch for food truck management, with 6 interrelated entities (FoodTruck, Menu, Order, User, Notification, Location) and operations ranging from basic CRUD to geographic proximity search (city/street), cuisine type recommendations with pagination, average profit per order calculation, and top food trucks ranking. All following the MVC pattern with well-differentiated layers (Controller, Service, Repository, DTO) and best practices like constructor injection instead of @Autowired.",
    solution: "Backend Spring Boot 3.2.0 con arquitectura MVC clásica: 6 entidades JPA (FoodTruck, Menu, Pedido, Usuario, Notificacion, Ubicacion) mapeadas a MySQL con Spring Data JPA + Hibernate. 6 controladores REST con endpoints CRUD completos más operaciones específicas: búsqueda por ubicación (FoodTruckController.cerca), recomendaciones con filtro por tipo de cocina y límite (recomendar), ranking por pedidos (top-by-orders), beneficio medio (average-profit), y menús más consumidos. Servicios con lógica de negocio usando inyección de dependencias por constructor, repositorios JPA con consultas derivadas y @Query. DTOs con Lombok para transferencia de datos. Thymeleaf para vistas del frontend básico.",
    enSolution: "Spring Boot 3.2.0 backend with classic MVC architecture: 6 JPA entities (FoodTruck, Menu, Order, User, Notification, Location) mapped to MySQL via Spring Data JPA + Hibernate. 6 REST controllers with full CRUD endpoints plus specific operations: location search (FoodTruckController.nearby), cuisine type recommendations with limit (recommend), order ranking (top-by-orders), average profit (average-profit), and most consumed menus. Services with business logic using constructor injection, JPA repositories with derived queries and @Query. Lombok DTOs for data transfer. Thymeleaf for basic frontend views.",
    architecture: "Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + Spring Data JPA/Hibernate + Lombok + Maven + Jakarta Bean Validation + Thymeleaf. Arquitectura MVC con 3 capas: Controller (6 @RestController con inyección por constructor), Service (lógica de negocio con @Transactional), Repository (Spring Data JpaRepository con consultas derivadas y @Query personalizadas para agregaciones). DTOs con Lombok @Getter/@Setter para desacoplar la API de las entidades JPA. Validación con Jakarta Bean Validation (@NotNull, @Size, etc). Tests unitarios con JUnit 5 + Mockito en la capa de servicios.",
    enArchitecture: "Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + Spring Data JPA/Hibernate + Lombok + Maven + Jakarta Bean Validation + Thymeleaf. MVC architecture with 3 layers: Controller (6 @RestController with constructor injection), Service (business logic with @Transactional), Repository (Spring Data JpaRepository with derived queries and custom @Query for aggregations). DTOs with Lombok @Getter/@Setter to decouple API from JPA entities. Jakarta Bean Validation (@NotNull, @Size, etc). Unit tests with JUnit 5 + Mockito in the service layer.",
    slug: "foodbites",
    erdPath: "/erd/foodbites.svg",
    apiDocPath: "/swagger/foodbites.json",
    snippetPaths: ["/snippets/java-record-entity.java", "/snippets/spring-boot-transactional-service.java"],
    dockerCompose: false,
  },
  {
    name: "Gestor de Huertos Urbanos",
    description: "Aplicación web para la gestión de huertos personales: organización de bancales, registro de cultivos e inventario de semillas. Frontend vanilla HTML/CSS/JS con Bootstrap, backend Spring Boot 3.2 + MySQL.",
    enName: "Urban Garden Manager",
    enDescription: "Web application for personal garden management: plot organization, crop registration, and seed inventory. Vanilla HTML/CSS/JS frontend with Bootstrap, Spring Boot 3.2 + MySQL backend.",
    tech: ["Java 17", "Spring Boot 3.2", "MySQL", "JPA/Hibernate", "Lombok", "Maven", "MapStruct", "Bootstrap 5", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Andres-Caso-Iglesias/Gestor_Huertos_Urbanos",
    live: null,
    impact: "Aplicación web completa con 5 entidades JPA (Huerto, Bancal, Semilla, RegistroCultivo, Siembra), 3 pantallas frontend con Bootstrap 5, API REST con 20+ endpoints CRUD, y DTOs con mapeo manual a entidades.",
    enImpact: "Complete web application with 5 JPA entities (Garden, Plot, Seed, CropRecord, Sowing), 3 Bootstrap 5 frontend screens, REST API with 20+ CRUD endpoints, and DTOs with manual entity mapping.",
    role: "Full-stack Developer",
    challenge: "El reto principal fue diseñar un sistema de gestión de huertos que permitiera organizar el espacio físico en bancales, llevar un registro detallado de los cultivos y mantener un inventario de semillas, todo con relaciones complejas: un huerto tiene múltiples bancales, cada bancal puede tener una semilla asignada, y el registro de cultivo vincula bancal con semilla y fecha. Además, se necesitaba una interfaz accesible para usuarios no técnicos que permitiera gestionar estas entidades sin conocer la complejidad subyacente.",
    enChallenge: "The main challenge was designing a garden management system that allowed organizing physical space into plots, keeping detailed crop records, and maintaining a seed inventory, all with complex relationships: a garden has multiple plots, each plot can have an assigned seed, and the crop record links plot to seed and date. Additionally, an accessible interface for non-technical users was needed to manage these entities without understanding the underlying complexity.",
    solution: "Backend Spring Boot 3.2.0 con 5 entidades JPA: Huerto (nombre, ubicacion) con cascade 1:N a Bancal (nombre, dimensiones), Semilla (nombre, variedad, cantidad, proveedor), RegistroCultivo (bancal 1:1, semilla 1:1, fecha) y Siembra. Un único controller REST (HuertoController) expone endpoints para CRUD de huertos, gestión de bancales (crear, asignar/desasignar semillas) y CRUD de semillas. DTOs con conversión manual a entidades (métodos toEntity()). Frontend con 3 HTMLs vanilla + Bootstrap 5.3.2: landing page, CRUD huertos+bancales, CRUD semillas. Fetch API para comunicación con el backend.",
    enSolution: "Spring Boot 3.2.0 backend with 5 JPA entities: Garden (name, location) with cascade 1:N to Plot (name, dimensions), Seed (name, variety, quantity, supplier), CropRecord (plot 1:1, seed 1:1, date) and Sowing. Single REST controller (GardenController) exposes endpoints for garden CRUD, plot management (create, assign/unassign seeds) and seed CRUD. DTOs with manual entity conversion (toEntity() methods). Frontend with 3 vanilla HTML + Bootstrap 5.3.2 pages: landing page, garden+plot CRUD, seed CRUD. Fetch API for backend communication.",
    architecture: "Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + JPA/Hibernate + Lombok + Maven + MapStruct (declarado) + Bootstrap 5.3.2 + HTML/CSS/JS vanilla. MVC clásico con 1 @RestController (HuertoController), repositorios Spring Data JPA con consultas derivadas, servicios con @Transactional. DTOs separados por entidad con métodos toEntity() manuales. Frontend sin framework: 3 HTMLs con Bootstrap 5 via CDN, CSS embebido, JS vanilla con fetch() para API REST. ddl-auto=update para sincronización automática del esquema MySQL.",
    enArchitecture: "Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + JPA/Hibernate + Lombok + Maven + MapStruct (declared) + Bootstrap 5.3.2 + vanilla HTML/CSS/JS. Classic MVC with 1 @RestController (GardenController), Spring Data JPA repositories with derived queries, services with @Transactional. Separate DTOs per entity with manual toEntity() methods. Frameworkless frontend: 3 HTML pages with Bootstrap 5 via CDN, embedded CSS, vanilla JS with fetch() for REST API. ddl-auto=update for automatic MySQL schema synchronization.",
    slug: "gestor-huertos",
    erdPath: "/erd/gestor-huertos.svg",
    snippetPaths: ["/snippets/bancal-entity.java"],
    dockerCompose: false,
  },
  {
    name: "Portafolio Profesional",
    description: "Portafolio web personal construido con Next.js 16, React 19 y TypeScript, siguiendo principios de arquitectura limpia: separación de capas (datos, lógica, presentación), tipado estricto y diseño responsivo con Tailwind CSS v4.",
    enName: "Professional Portfolio",
    enDescription: "Personal web portfolio built with Next.js 16, React 19 and TypeScript, applying clean architecture principles: layered separation (data, logic, presentation), strict typing and responsive design with Tailwind CSS v4.",
    tech: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS v4", "Vercel"],
    github: "https://github.com/Andres-Caso-Iglesias/portafolio",
    live: "https://portafolio-livid-two-33.vercel.app",
    impact: "24 commits de evolución con refactorización completa a clean architecture (datos, lógica, presentación), tests de humo automatizados (i18n + SEO), tipado estricto con TypeScript strict mode, y buenas prácticas de ingeniería en producción.",
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
];
