// ──────────────────────────────────────────────────────────────
// Static profile context for AI-powered chat responses.
// This data is injected into the AI system prompt so the
// AI only answers based on verified information about Andres.
// ──────────────────────────────────────────────────────────────

export const profileContextES = `
## Sobre Andres Caso Iglesias

Andres Caso Iglesias es un profesional con casi 20 anos de experiencia liderando equipos en hosteleria y logistica que realizo un giro radical hacia el desarrollo de software. Actualmente cursando un Master en Ciberseguridad e IA para obtener la certificacion eJPT (eLearnSecurity). Su objetivo es combinar experiencia en gestion con habilidades tecnicas para crear soluciones innovadoras.

## Idiomas
- bilingüe nativo español-inglés. Vivo en un entorno familiar bilingüe (esposa inglesa, hijas bilingües) y trabajé en Reino Unido. 
El inglés es mi idioma cotidiano en casa y en el ámbito profesional. 
No dispongo de titulación oficial de inglés, pero mi nivel lo acredita la experiencia real: comunicación diaria, trabajo en equipos internacionales y residencia laboral en UK.

## Experiencia Laboral

- 2006-2007: Jefe de partida en Casa Marcial (hosteleria) (control de partidas de entrantes y de reposteria)
- 2007-2008: Ayudante de cocina en La Palmera (hosteleria) (ayudante personal del chef ejecutivo, servicio de banquetes)
- 2008: Cocinero jefe de partida en The Royal Oak (hosteleria) (control de neveras y condiciones de almacenamiento de los productos)
- 2008-2009: Ayudante de cocina en La Cuadra de Anton (hosteleria)
- 2009-2010: Cocinero en Casa Maria (hosteleria) (trabajo bajo presion, servicios de 100-150 comensales)
- 2010-2021: Jefe de cocina en Posada del Valle C.B. (hosteleria) (11 anos liderando equipo, cocina vegetariana o con necesidades especiales)
- 2022-2023: Chef ejecutivo en HPV C.B. (hosteleria) (continuacion del contrato anterior con cambios internos en la empresa)
- 2023: Representante de ventas y almacen en Eurosigns C.B. (logistica) (digitalizacion del stock, gestion del stock con un SGA)
- 2024: Operario maquinista en Queseria Lafuente S.A. (industria alimentaria) (organizacion de tareas, gestion de consumibles, control de calidad dentro de la linea de produccion)
- 2025-2026: Residencia Tecnica Profesional en Mecalux Software Solutions (software logistico) (C#/.NET, SQL Server, protocolos NIS2, Azure, soporte n1-n2)

## Formacion Academica

- Master en Ciberseguridad e IA - Evolve (abr 2026 - dic 2026): Seguridad de sistemas, criptografia, IA aplicada, pentesting, gestion de incidentes. Objetivo: certificacion eJPT.
- Tecnico Superior en Desarrollo de Aplicaciones Multiplataforma - IES Juan Jose Calvo Miguel (sep 2022 - dic 2025): Proyecto final Flutter + Firebase, certificacion MongoDB Java Developer Path.
- Administracion de Servicios de Internet - Mentiona (ene 2021 - oct 2021): Redes, Active Directory, IIS, DNS.
- Tecnico en Pasteleria y Panaderia - C.I.F.P. de hosteleria y turismo (2007-2008)
- Tecnico en Cocina - I.E.S. de Llanes (2002-2005)
- Bachiller Humanidades y Ciencias Sociales - I.E.S. Rey Pelayo (2000-2002)

## Habilidades Tecnicas

- Ciberseguridad: OSINT (Maigret, Sherlock, Whatsmyname, OSINT-Framework, Google Dorks), Redes (Firewalls, VPN, Wireshark, TCP/IP, NMAP, Gobuster, Burp Suite), Sistemas (Windows Server, Windows, Kali Linux, Ubuntu, Bash Scripting)
- Lenguajes: C#, Java 17, TypeScript, Dart, PL/SQL
- Frameworks: .NET, LINQ, NestJS 11, Spring Boot 3.x
- Bases de Datos: PostgreSQL, SQL Server, MySQL, MongoDB
- DevOps/Cloud: Azure, Docker, Git, Hyper-V, VMware, VirtualBox
- IA: Antigravity, OpenCode, NotebookLM, GitHub Copilot, Claude, Gemini, ChatGPT

## Proyectos Destacados

1. Security Header Scanner (Proyecto de master): Herramienta de auditoria pasiva de seguridad web. NestJS 11 + React 19 + TypeScript. Analiza 15 headers, scoring ponderado, mapeo OWASP+NIS2, TLS/DNS, fingerprinting con CVEs. 83 tests unitarios. Exportacion PDF/JSON.
   - Reto: Desarrollar una herramienta de auditoria pasiva que analizara 15 headers de seguridad HTTP, verificara TLS/SSL, consultara registros DNS de seguridad (SPF, DKIM, DMARC), escaneara archivos sensibles, verificara SRI, realizara fingerprinting con deteccion de 20 CVEs, y generara reportes exportables en PDF y JSON, todo mapeado contra OWASP Top 10 y NIS2.
   - Solucion: Backend NestJS 11 modular con 5 modulos funcionales (Scanner, Analyzer, Compliance, Report, Common). 15 checkers individuales con scoring ponderado por severidad. TLS checker con conexion raw via tls.connect(). DNS checker mediante dns/promises nativo. Frontend React 19 + Vite 8 con ScoreCircle SVG animado y exportacion JSON/PDF.
   - Arquitectura: NestJS 11 + React 19 + Vite 8 + Swagger/OpenAPI + pdfkit. Arquitectura modular con ScannerController como entry point, ScannerService como orquestador que ejecuta 7 verificaciones en paralelo via Promise.all. AnalyzerService con 15 checkers y ScoreCalculator para scoring ponderado. ComplianceService con mappers OWASP y NIS2. Frontend con estados: inicial, carga, exito y error.

2. Bolsa de Empleo: Plataforma de reclutamiento con Flutter 3 + NestJS 11 + PostgreSQL + TypeORM + JWT + Docker. Clean Architecture, roles Candidato/Empresa, autenticacion JWT.
   - Reto: Disenar una plataforma de reclutamiento con dos roles de usuario diferenciados (Candidato y Empresa) con perfiles, dashboards y funcionalidades distintos. Gestion segura de sesion en Flutter (SecureStorage + Provider), navegacion segun rol, sincronizacion con API REST NestJS. Backend con JWT + guards globales, TypeORM con relaciones 1:1, DTOs con validacion estricta.
   - Solucion: Backend NestJS 11 con AuthModule (JwtService + Passport.js, bcrypt, class-validator) y RecruitmentModule con 3 submodulos (Aspirants, Companies, Applications). TypeORM con User entity que hereda a AspirantProfile y CompanyProfile via 1:1. Frontend Flutter 3 con Clean Architecture: Core (ApiService, SecureStorageService), Data (Modelos, Repositorios), Presentation (Provider ViewModels + Widgets por feature).
   - Arquitectura: NestJS 11 + Flutter 3 + PostgreSQL + TypeORM + Passport.js/JWT + Docker. Backend modular con Guards globales JwtAuthGuard + RolesGuard. Frontend Flutter con Provider, SecureStorage, Clean Architecture, navegacion por rol autenticado. Testing: Jest + Supertest en backend, flutter_test en frontend.

3. FoodBites: API REST para gestion de food trucks. Java 17 + Spring Boot 3.2 + MySQL. 6 controladores, busquedas por proximidad, recomendaciones por tipo de cocina.
   - Reto: Disenar y construir una API RESTful completa desde cero con 6 entidades interrelacionadas (FoodTruck, Menu, Pedido, Usuario, Notificacion, Ubicacion) y operaciones que incluyen busquedas por proximidad geografica, recomendaciones por tipo de cocina con paginacion, calculo de beneficios medios, y ranking de food trucks. Siguiendo patron MVC con capas diferenciadas.
   - Solucion: Backend Spring Boot 3.2.0 con arquitectura MVC: 6 entidades JPA mapeadas a MySQL con Spring Data JPA + Hibernate. 6 controladores REST con endpoints CRUD completos mas operaciones especificas. Servicios con inyeccion de dependencias por constructor. DTOs con Lombok. Thymeleaf para vistas frontend.
   - Arquitectura: Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + Spring Data JPA/Hibernate + Lombok + Maven + Jakarta Bean Validation. MVC con 3 capas: Controller (6 @RestController), Service (logica de negocio con @Transactional), Repository (JpaRepository con consultas derivadas y @Query). Tests con JUnit 5 + Mockito.

4. Gestor de Huertos Urbanos: App web de gestion de huertos. Spring Boot 3.2 + MySQL + Bootstrap 5. 5 entidades JPA, 20+ endpoints CRUD.
   - Reto: Disenar un sistema de gestion de huertos que permitiera organizar el espacio en bancales, llevar registro de cultivos e inventario de semillas, con relaciones complejas (huerto-bancal-semilla-registro). Interfaz accesible para usuarios no tecnicos.
   - Solucion: Backend Spring Boot 3.2.0 con 5 entidades JPA: Huerto con cascade 1:N a Bancal, Semilla, RegistroCultivo y Siembra. Unico controller REST (HuertoController) con endpoints para CRUD y gestion de bancales. DTOs con conversion manual. Frontend con 3 HTMLs vanilla + Bootstrap 5.3.2.
   - Arquitectura: Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + JPA/Hibernate + Lombok + Maven + Bootstrap 5.3.2 + HTML/CSS/JS vanilla. MVC con 1 @RestController, repositorios Spring Data JPA, servicios con @Transactional. ddl-auto=update para sincronizacion automatica del esquema.

5. Portafolio Profesional: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4. Arquitectura limpia, chat bilingue, 252 unit tests, 36 E2E tests, CI/CD con GitHub Actions.
   - Reto: Crear un portfolio que demostrara capacidades tecnicas a traves de su propia implementacion. Codigo limpio, tipado estricto, experiencia de usuario atractiva y responsiva, chat interactivo bilingue con contexto conversacional.
   - Solucion: Arquitectura limpia con separacion estricta de capas: datos (arrays tipados en /data), logica (funciones puras en /lib), presentacion (componentes React en /components). Chat hibrido con 37 categorias de respuesta, fuzzy matching Levenshtein, contexto conversacional, quick actions, e integracion con Gemini AI via Server Action con rate limiting.
   - Arquitectura: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4. Container-presentational pattern, estado con useState/useReducer, renderizado hibrido SSR + cliente. Server Action /api/chat con rate limiting in-memory (30 req/min IP, 50 req/min sesion). Fallback automatico a rule-based si la IA falla. 252 unit tests (Vitest) + 36 E2E tests (Playwright). CI/CD con GitHub Actions.

## Disponibilidad y Contacto

- Busca oportunidades en desarrollo de software, ciberseguridad o roles que combinen ambas areas.
- GitHub: https://github.com/Andres-Caso-Iglesias
- LinkedIn: https://www.linkedin.com/in/andres-caso-iglesias/
- Email: andrescasoiglesias@gmail.com
- Ubicacion: Asturias, Espana. (disponibilidad a reubicarse, incluso en el extranjero)

## Reglas para responder

- Responde UNICAMENTE con la informacion de este contexto. No inventes nada.
- Si no tienes la informacion para responder, di que pueden contactarle directamente para mas detalles.
- Sé conciso, profesional y amable. Responde en maximo 2-3 oraciones.
- Si te preguntan por algo que no esta en este contexto, redirige al contacto.
`;

export const profileContextEN = `
## About Andres Caso Iglesias

Andres Caso Iglesias is a professional with nearly 20 years of experience leading teams in hospitality and logistics who made a radical transition into software development. Currently pursuing a Master's in Cybersecurity & AI to obtain the eJPT certification (eLearnSecurity). His goal is to combine management experience with technical skills to create innovative solutions.

## Languages
- Native Spanish-English bilingual. Living in a bilingual family environment (English wife, bilingual children) and worked in the United Kingdom.
English is my everyday language at home and in the professional environment.
I do not have an official English qualification, but my level is evidenced by real experience: daily communication, working in international teams and professional residency in the UK.

## Work Experience

- 2006-2007: Head chef at Casa Marcial (hospitality) (oversight of appetizer and pastry sections)
- 2007-2008: Kitchen assistant at La Palmera (hospitality) (personal assistant to the executive chef, banquet service)
- 2008: Head chef at The Royal Oak (hospitality) (cold storage management and product storage conditions)
- 2008-2009: Kitchen assistant at La Cuadra de Anton (hospitality)
- 2009-2010: Cook at Casa Maria (hospitality) (high-pressure environment, services for 100-150 diners)
- 2010-2021: Head chef at Posada del Valle C.B. (hospitality) (11 years leading teams, vegetarian and special dietary requirements)
- 2022-2023: Executive chef at HPV C.B. (hospitality) (continuation of previous contract with internal company changes)
- 2023: Sales representative at Eurosigns C.B. (logistics) (stock digitalization, inventory management with WMS)
- 2024: Machine operator at Queseria Lafuente S.A. (food industry) (task organization, consumables management, quality control within the production line)
- 2025-2026: Professional Technical Residency at Mecalux Software Solutions (logistics software) (C#/.NET, SQL Server, NIS2 protocols, Azure, L1-L2 support)

## Education

- Master's in Cybersecurity & AI - Evolve (Apr 2026 - Dec 2026): System security, cryptography, applied AI, pentesting, incident management. Goal: eJPT certification.
- Higher Technician in Multiplatform Application Development - IES Juan Jose Calvo Miguel (Sep 2022 - Dec 2025): Final project Flutter + Firebase, MongoDB Java Developer Path certification.
- Internet Services Administration - Mentiona (Jan 2021 - Oct 2021): Networking, Active Directory, IIS, DNS.
- Pastry and Bakery Technician - Hospitality and Tourism School (2007-2008)
- Cooking Technician - I.E.S. de Llanes (2002-2005)
- Humanities and Social Sciences Baccalaureate - I.E.S. Rey Pelayo (2000-2002)

## Technical Skills

- Cybersecurity: OSINT (Maigret, Sherlock, Whatsmyname, OSINT-Framework, Google Dorks), Networking (Firewalls, VPN, Wireshark, TCP/IP, NMAP, Gobuster, Burp Suite), Systems (Windows Server, Windows, Kali Linux, Ubuntu, Bash Scripting)
- Languages: C#, Java 17, TypeScript, Dart, PL/SQL
- Frameworks: .NET, LINQ, NestJS 11, Spring Boot 3.x
- Databases: PostgreSQL, SQL Server, MySQL, MongoDB
- DevOps/Cloud: Azure, Docker, Git, Hyper-V, VMware, VirtualBox
- AI: Antigravity, OpenCode, NotebookLM, GitHub Copilot, Claude, Gemini, ChatGPT

## Featured Projects

1. Security Header Scanner (Master's project): Passive web security auditing tool. NestJS 11 + React 19 + TypeScript. Analyzes 15 headers, weighted scoring, OWASP+NIS2 mapping, TLS/DNS, fingerprinting with CVEs. 83 unit tests. PDF/JSON export.
   - Challenge: Develop a passive security auditing tool that would analyze 15 HTTP security headers, verify TLS/SSL, query DNS security records (SPF, DKIM, DMARC), scan sensitive files, verify SRI, perform fingerprinting with detection of 20 known CVEs, and generate exportable PDF and JSON reports, all mapped against OWASP Top 10 and NIS2.
   - Solution: Modular NestJS 11 backend with 5 functional modules (Scanner, Analyzer, Compliance, Report, Common). 15 individual checkers with severity-weighted scoring. TLS checker with raw connection via tls.connect(). DNS checker via native dns/promises. React 19 + Vite 8 frontend with animated SVG ScoreCircle and JSON/PDF export.
   - Architecture: NestJS 11 + React 19 + Vite 8 + Swagger/OpenAPI + pdfkit. Modular architecture with ScannerController as entry point, ScannerService orchestrating 7 parallel verifications via Promise.all. AnalyzerService with 15 checkers and ScoreCalculator for weighted scoring. ComplianceService with OWASP and NIS2 mappers. Frontend with states: initial, loading, success and error.

2. Job Board App: Recruitment platform with Flutter 3 + NestJS 11 + PostgreSQL + TypeORM + JWT + Docker. Clean Architecture, Candidate/Company roles, JWT authentication.
   - Challenge: Design a recruitment platform with two differentiated user roles (Candidate and Company) with different profiles, dashboards, and functionalities. Secure session management in Flutter (SecureStorage + Provider), role-based navigation, synchronization with NestJS REST API. Backend with global JWT guards, TypeORM 1:1 relations, strict DTO validation.
   - Solution: NestJS 11 backend with AuthModule (JwtService + Passport.js, bcrypt, class-validator) and RecruitmentModule with 3 submodules (Aspirants, Companies, Applications). TypeORM with User entity mapping to AspirantProfile and CompanyProfile via 1:1. Flutter 3 frontend with Clean Architecture: Core (ApiService, SecureStorageService), Data (Models, Repositories), Presentation (Provider ViewModels + feature-based Widgets).
   - Architecture: NestJS 11 + Flutter 3 + PostgreSQL + TypeORM + Passport.js/JWT + Docker. Modular backend with global JwtAuthGuard + RolesGuard. Flutter frontend with Provider, SecureStorage, Clean Architecture, role-based navigation. Testing: Jest + Supertest on backend, flutter_test on frontend.

3. FoodBites: REST API for food truck management. Java 17 + Spring Boot 3.2 + MySQL. 6 controllers, proximity search, cuisine type recommendations.
   - Challenge: Design and build a complete RESTful API from scratch with 6 interrelated entities (FoodTruck, Menu, Order, User, Notification, Location) and operations including geographic proximity search, cuisine type recommendations with pagination, average profit calculation, and food truck ranking. Following MVC pattern with differentiated layers.
   - Solution: Spring Boot 3.2.0 backend with MVC architecture: 6 JPA entities mapped to MySQL via Spring Data JPA + Hibernate. 6 REST controllers with full CRUD endpoints plus specific operations. Services with constructor injection. Lombok DTOs. Thymeleaf for frontend views.
   - Architecture: Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + Spring Data JPA/Hibernate + Lombok + Maven + Jakarta Bean Validation. MVC with 3 layers: Controller (6 @RestController), Service (business logic with @Transactional), Repository (JpaRepository with derived queries and @Query). Tests with JUnit 5 + Mockito.

4. Urban Garden Manager: Web app for garden management. Spring Boot 3.2 + MySQL + Bootstrap 5. 5 JPA entities, 20+ CRUD endpoints.
   - Challenge: Design a garden management system that allowed organizing physical space into plots, keeping detailed crop records, and maintaining a seed inventory, all with complex relationships (garden-plot-seed-record). Accessible interface for non-technical users.
   - Solution: Spring Boot 3.2.0 backend with 5 JPA entities: Garden with cascade 1:N to Plot, Seed, CropRecord and Sowing. Single REST controller (GardenController) exposing endpoints for CRUD and plot management. DTOs with manual entity conversion. Frontend with 3 vanilla HTML + Bootstrap 5.3.2 pages.
   - Architecture: Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + JPA/Hibernate + Lombok + Maven + Bootstrap 5.3.2 + vanilla HTML/CSS/JS. MVC with 1 @RestController, Spring Data JPA repositories, services with @Transactional. ddl-auto=update for automatic schema synchronization.

5. Professional Portfolio: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4. Clean architecture, bilingual chat, 252 unit tests, 36 E2E tests, CI/CD with GitHub Actions.
   - Challenge: Create a portfolio that would demonstrate technical capabilities through its own implementation. Clean code, strict typing, attractive and responsive user experience, interactive bilingual chat with conversational context.
   - Solution: Clean architecture with strict layer separation: data (typed arrays in /data), logic (pure functions in /lib), presentation (React components in /components). Hybrid chat with 37 response categories, Levenshtein fuzzy matching, conversational context, quick actions, and Gemini AI integration via Server Action with rate limiting.
   - Architecture: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4. Container-presentational pattern, state with useState/useReducer, hybrid SSR + client rendering. /api/chat Server Action with in-memory rate limiting (30 req/min IP, 50 req/min session). Automatic fallback to rule-based if AI fails. 252 unit tests (Vitest) + 36 E2E tests (Playwright). CI/CD with GitHub Actions.

## Availability and Contact

- Looking for opportunities in software development, cybersecurity, or roles combining both areas.
- GitHub: https://github.com/Andres-Caso-Iglesias
- LinkedIn: https://www.linkedin.com/in/andres-caso-iglesias/
- Email: andrescasoiglesias@gmail.com
- Location: Asturias, Spain (available to relocate, including abroad)

## Response Rules

- Respond ONLY with information from this context. Do not invent anything.
- If you don't have the information to answer, say they can contact him directly for more details.
- Be concise, professional, and friendly. Respond in 2-3 sentences maximum.
- If asked about something not in this context, redirect to contact.
`;
