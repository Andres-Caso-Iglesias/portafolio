export interface LocalizedText {
  es: string;
  en: string;
}

export interface CaseStudyDecision {
  title: LocalizedText;
  body: LocalizedText;
}

export interface CaseStudyLink {
  label: LocalizedText;
  url: string;
}

export interface CaseStudy {
  /** Matches the project slug in projectsData */
  slug: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  tech: string[];
  context: LocalizedText;
  problem: LocalizedText;
  decisions: CaseStudyDecision[];
  architecture: LocalizedText;
  /** Optional diagram (ERD or module architecture) */
  erdPath?: string;
  erdAlt?: LocalizedText;
  erdCaption?: LocalizedText;
  results: LocalizedText[];
  lessons: LocalizedText[];
  links: CaseStudyLink[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'qreaper',
    title: {
      es: 'QReaper — Cómo atacamos el quishing desde el decodificador',
      en: 'QReaper — Attacking quishing from the decoder up',
    },
    subtitle: {
      es: 'Caso de estudio del módulo de decodificación QR en un pipeline anti-phishing de 5 etapas.',
      en: 'Case study of the QR decoding module in a 5-stage anti-phishing pipeline.',
    },
    tech: ['Python 3.10+', 'OpenCV', 'pyzbar', 'Playwright', 'ReportLab', 'PyMuPDF'],
    context: {
      es: 'Proyecto de equipo (5 personas) para el Máster en Ciberseguridad de Evolve Academy. El objetivo: una herramienta capaz de detectar URLs maliciosas ocultas dentro de QR codes presentes en emails, PDFs e imágenes. Yo fui responsable del módulo de decodificación: la pieza que convierte un archivo en una lista de URLs analizables.',
      en: 'Team project (5 people) for the Master in Cybersecurity at Evolve Academy. The goal: a tool that detects malicious URLs hidden inside QR codes found in emails, PDFs, and images. I was responsible for the decoding module: the piece that turns a file into a list of analyzable URLs.',
    },
    problem: {
      es: 'Los filtros de email no pueden leer QR codes porque son imágenes: la URL maliciosa es invisible hasta que un humano escanea el código con el móvil. El quishing estaba en auge en 2026 y no existían herramientas automáticas de detección. El decoder era el cuello de botella: si no extraía el QR, el resto del pipeline no tenía nada que analizar.',
      en: 'Email filters cannot read QR codes because they are images: the malicious URL stays invisible until a human scans the code with their phone. Quishing was surging in 2026 and no automatic detection tools existed. The decoder was the bottleneck: if it did not extract the QR, the rest of the pipeline had nothing to analyze.',
    },
    decisions: [
      {
        title: {
          es: 'Pipeline modular con contratos explícitos',
          en: 'Modular pipeline with explicit contracts',
        },
        body: {
          es: 'Cada módulo se desarrolló en su propia rama de Git con un contrato escrito en CONTRATOS.md antes de escribir código: qué entrada recibe, qué salida produce. El decoder expone decode(file_path) -> list[str] y no sabe nada del análisis posterior. Esto permitió que 5 personas trabajaran en paralelo sin bloquearse.',
          en: 'Each module was developed on its own Git branch with a contract written in CONTRATOS.md before any code: what input it receives, what output it produces. The decoder exposes decode(file_path) -> list[str] and knows nothing about downstream analysis. This let 5 people work in parallel without blocking each other.',
        },
      },
      {
        title: {
          es: 'Decodificación agresiva con 6 técnicas de preprocesamiento',
          en: 'Aggressive decoding with 6 preprocessing techniques',
        },
        body: {
          es: 'Un solo intento de decodificación pierde QRs reales: JPEG comprimido, escaneado de baja resolución, reflejos. El módulo aplica grayscale, binarización Otsu en versión normal e invertida, upscaling, CLAHE y adaptive threshold antes de intentar pyzbar. Cada técnica es una defensa contra un tipo de fallo de imagen distinto.',
          en: 'A single decoding attempt misses real-world QRs: compressed JPEG, low-resolution scans, glare. The module applies grayscale, Otsu binarization in normal and inverted versions, upscaling, CLAHE, and adaptive threshold before trying pyzbar. Each technique defends against a different image failure mode.',
        },
      },
      {
        title: {
          es: 'Motor dual de PDF con fallback',
          en: 'Dual PDF engine with fallback',
        },
        body: {
          es: 'pdf2image depende de poppler-installado en el sistema; PyMuPDF es puro Python pero con licencia AGPL. Se implementaron ambos con fallback automático: si uno falla o no está disponible, se usa el otro. La robustez de la herramienta no debería depender de una única librería externa.',
          en: 'pdf2image depends on poppler installed in the system; PyMuPDF is pure Python but AGPL-licensed. Both were implemented with automatic fallback: if one fails or is unavailable, the other is used. Tool robustness should not depend on a single external library.',
        },
      },
      {
        title: {
          es: 'Fixtures-as-code para tests reproducibles',
          en: 'Fixtures-as-code for reproducible tests',
        },
        body: {
          es: 'Los archivos de test (QRs válidos, corruptos, con múltiples códigos) se generan programáticamente con OpenCV en cada suite, en lugar de adjuntar binarios al repo. Los tests son deterministas y el repo se mantiene ligero.',
          en: 'Test files (valid QRs, corrupted ones, multi-code images) are generated programmatically with OpenCV on every suite run, instead of committing binaries. Tests stay deterministic and the repo stays light.',
        },
      },
    ],
    architecture: {
      es: 'Pipeline de 5 etapas con contratos tipados entre módulos: decode.decode(file_path) -> list[str] -> analisis_url.analizar_url(url) -> dict -> sandbox.detonar(url) -> dict -> scoring.puntuar(signals, sandbox) -> dict -> informe.generar_informe(result, format) -> str. Desarrollo contract-driven con CONTRATOS.md y branch-per-module en Git.',
      en: '5-stage pipeline with typed contracts between modules: decode.decode(file_path) -> list[str] -> analisis_url.analizar_url(url) -> dict -> sandbox.detonar(url) -> dict -> scoring.puntuar(signals, sandbox) -> dict -> informe.generar_informe(result, format) -> str. Contract-driven development with CONTRATOS.md and branch-per-module in Git.',
    },
    results: [
      {
        es: 'Módulo de decodificación completo: extracción de QR de imágenes, emails .eml y PDFs.',
        en: 'Complete decoding module: QR extraction from images, .eml emails, and PDFs.',
      },
      {
        es: '6 técnicas de preprocesamiento de imagen para detección robusta en entradas degradadas.',
        en: '6 image preprocessing techniques for robust detection on degraded inputs.',
      },
      {
        es: 'Doble motor de PDF (pdf2image + PyMuPDF) con fallback automático.',
        en: 'Dual PDF engine (pdf2image + PyMuPDF) with automatic fallback.',
      },
      {
        es: 'Equipo de 5 entregó un pipeline funcional de extremo a extremo para la asignatura.',
        en: 'Team of 5 delivered a working end-to-end pipeline for the course.',
      },
    ],
    lessons: [
      {
        es: 'Definir los contratos de los 5 módulos en una sola sesión de equipo al inicio, en lugar de módulo a módulo: reduciría la fricción de integración en la recta final.',
        en: 'Define all 5 module contracts in a single team session at the start, rather than module by module: it would reduce end-game integration friction.',
      },
      {
        es: 'Añadir tests de integración entre decode y analisis_url desde la semana 1: los fallos de contrato entre módulos aparecieron tarde.',
        en: 'Add integration tests between decode and analisis_url from week 1: contract failures between modules surfaced late.',
      },
      {
        es: 'Generar un dataset de QRs degradados sintéticos como fixture compartido: habría permitido comparar técnicas de preprocesamiento con métricas, no con impresiones.',
        en: 'Generate a shared synthetic dataset of degraded QRs as a fixture: it would have let us compare preprocessing techniques with metrics instead of impressions.',
      },
    ],
    links: [],
  },
  {
    slug: 'vulnprio',
    title: {
      es: 'VulnPrio — Priorización de vulnerabilidades para PYMEs',
      en: 'VulnPrio — Vulnerability prioritization for SMEs',
    },
    subtitle: {
      es: 'Caso de estudio del TFG: un SaaS multi-tenant con scoring determinístico e IA para priorizar CVEs.',
      en: 'Case study of the master thesis: a multi-tenant SaaS with deterministic scoring and AI to prioritize CVEs.',
    },
    tech: [
      'Turborepo',
      'Express.js',
      'Next.js 14',
      'PostgreSQL 16',
      'Redis 7',
      'Drizzle ORM',
      'Claude AI',
      'Stripe',
    ],
    context: {
      es: 'Proyecto de fin de máster (PGPIVP). Un SaaS completo para que las PYMEs prioricen vulnerabilidades sin un equipo de seguridad dedicado. El sistema ingiere un SBOM, lo enriquece con múltiples fuentes de datos, calcula un scoring determinístico, usa IA como capa de explicación y gestiona billing, multi-tenant y compliance NIS2/ENS.',
      en: 'Master thesis project (PGPIVP). A complete SaaS for SMEs to prioritize vulnerabilities without a dedicated security team. The system ingests an SBOM, enriches it with multiple data sources, computes a deterministic score, uses AI as an explanation layer, and handles billing, multi-tenancy, and NIS2/ENS compliance.',
    },
    problem: {
      es: 'Las PYMEs no pueden priorizar vulnerabilidades de forma efectiva: las herramientas existentes son demasiado complejas, caras o ignoran el contexto del negocio. El 60% de las brechas en PYMEs se podrían haber evitado con priorización correcta. NIS2 exige un nivel de gestión de vulnerabilidades que muchas PYMEs ni siquiera saben cómo empezar a implementar.',
      en: 'SMEs cannot effectively prioritize vulnerabilities: existing tools are too complex, expensive, or ignore business context. 60% of SME breaches could have been prevented with correct prioritization. NIS2 requires a level of vulnerability management that many SMEs do not even know how to start implementing.',
    },
    decisions: [
      {
        title: {
          es: 'Scoring determinístico primero, IA como capa de explicación',
          en: 'Deterministic scoring first, AI as explanation layer',
        },
        body: {
          es: 'La priorización no puede depender de una IA no determinista: un mismo input debe producir el mismo ranking. El scoring base combina CVSS (30%), EPSS (25%), criticalidad del activo (25%), exposición (20%) y bonus por presencia en CISA KEV. Claude Sonnet se usa solo para explicar y priorizar narrativamente los resultados ya calculados, con fallback si el servicio cae.',
          en: 'Prioritization cannot depend on non-deterministic AI: the same input must produce the same ranking. The base scoring combines CVSS (30%), EPSS (25%), asset criticality (25%), exposure (20%), and a CISA KEV presence bonus. Claude Sonnet is used only to explain and narratively prioritize already-computed results, with fallback if the service is down.',
        },
      },
      {
        title: {
          es: 'Monorepo Turborepo: API y dashboard versionados juntos',
          en: 'Turborepo monorepo: API and dashboard versioned together',
        },
        body: {
          es: 'Express.js API (24 servicios) y dashboard Next.js 14 comparten tipos y contratos a través del monorepo. Un cambio en el esquema de la base de datos se propaga a ambos extremos sin desincronización. Turborepo cachea los builds para mantener el feedback loop corto.',
          en: 'The Express.js API (24 services) and Next.js 14 dashboard share types and contracts through the monorepo. A database schema change propagates to both ends without drift. Turborepo caches builds to keep the feedback loop short.',
        },
      },
      {
        title: {
          es: 'Arquitectura por capas con DI y contract-first con Zod',
          en: 'Layered architecture with DI and Zod contract-first',
        },
        body: {
          es: 'Presentation -> API -> Service Layer (24 servicios) -> Repository Layer (9 interfaces) -> Data. Los contratos de las rutas se validan con Zod antes de llegar a la lógica de negocio. Los valores por defecto son fail-closed: si falta un dato de seguridad, el sistema se niega, no asume.',
          en: 'Presentation -> API -> Service Layer (24 services) -> Repository Layer (9 interfaces) -> Data. Route contracts are validated with Zod before reaching business logic. Default values are fail-closed: if security data is missing, the system refuses rather than assumes.',
        },
      },
      {
        title: {
          es: 'Multi-tenant con RBAC y MFA desde el diseño',
          en: 'Multi-tenant with RBAC and MFA from the design',
        },
        body: {
          es: '4 roles (RBAC) sobre un modelo multi-tenant con aislamiento por tenant. Autenticación multifactor con TOTP. Protecciones contra SSRF y command injection en el pipeline que ejecuta herramientas externas como Syft. La seguridad no es una capa añadida al final: forma parte del modelo de datos.',
          en: '4 roles (RBAC) over a multi-tenant model with tenant isolation. Multifactor authentication with TOTP. Protections against SSRF and command injection in the pipeline that runs external tools like Syft. Security is not a layer bolted on at the end: it is part of the data model.',
        },
      },
    ],
    architecture: {
      es: 'Layered Architecture con DI: Presentation (Next.js) -> API (Express Routes) -> Service Layer (24 services) -> Repository Layer (9 interfaces) -> Data (PostgreSQL 16 + Redis 7). Pipeline pattern para el scanner: SBOM (Syft) -> Enrichment (OSV, NVD, GHSA, EPSS, CISA KEV) -> Scoring determinístico -> AI (Claude con fallback) -> Persistencia. Contract-first con Zod, fail-closed security defaults, GitHub Action con security gates, Stripe billing con 4 tiers.',
      en: 'Layered Architecture with DI: Presentation (Next.js) -> API (Express Routes) -> Service Layer (24 services) -> Repository Layer (9 interfaces) -> Data (PostgreSQL 16 + Redis 7). Pipeline pattern for the scanner: SBOM (Syft) -> Enrichment (OSV, NVD, GHSA, EPSS, CISA KEV) -> Deterministic scoring -> AI (Claude with fallback) -> Persistence. Contract-first with Zod, fail-closed security defaults, GitHub Action with security gates, Stripe billing with 4 tiers.',
    },
    erdPath: '/erd/vulnprio.svg',
    erdAlt: {
      es: 'Modelo de datos de VulnPrio: 11 tablas PostgreSQL con Drizzle ORM.',
      en: 'VulnPrio data model: 11 PostgreSQL tables with Drizzle ORM.',
    },
    erdCaption: {
      es: 'Modelo de datos de VulnPrio: 11 tablas PostgreSQL (Drizzle ORM).',
      en: 'VulnPrio data model: 11 PostgreSQL tables (Drizzle ORM).',
    },
    results: [
      {
        es: 'SaaS multi-tenant completo: 4 tiers de billing con Stripe, RBAC con 4 roles, MFA TOTP.',
        en: 'Complete multi-tenant SaaS: 4 Stripe billing tiers, RBAC with 4 roles, TOTP MFA.',
      },
      {
        es: 'Pipeline de 5 etapas con 24 servicios backend sobre Turborepo y PostgreSQL con 11 tablas.',
        en: '5-stage pipeline with 24 backend services on Turborepo and PostgreSQL with 11 tables.',
      },
      {
        es: 'Compliance con 2 marcos regulatorios (NIS2 + ENS) mapeado en el producto.',
        en: 'Compliance with 2 regulatory frameworks (NIS2 + ENS) mapped into the product.',
      },
      {
        es: 'Framework de evaluación con métricas Precision@K, NDCG@K y MRR para validar la priorización.',
        en: 'Evaluation framework with Precision@K, NDCG@K, and MRR metrics to validate prioritization.',
      },
    ],
    lessons: [
      {
        es: 'Empezar por un vertical slice mínimo (un tenant, un tier, un pipeline simplificado) antes de construir los 24 servicios: el scope inicial fue ambicioso para el tiempo disponible.',
        en: 'Start with a minimal vertical slice (one tenant, one tier, one simplified pipeline) before building all 24 services: the initial scope was ambitious for the available time.',
      },
      {
        es: 'Añadir load testing al pipeline de ingestión desde el diseño: la cola BullMQ con Redis resuelve la teoría, pero los límites reales de concurrencia se conocen midiendo.',
        en: 'Add load testing to the ingestion pipeline from the design: the BullMQ queue with Redis solves the theory, but real concurrency limits are known by measuring.',
      },
      {
        es: 'Definir presupuesto de coste de IA y alertas antes de conectar Claude en producción: el fallback existe, pero el control de gasto debe ser explícito desde el día 1.',
        en: 'Define AI spend budget and alerts before connecting Claude in production: the fallback exists, but cost control must be explicit from day 1.',
      },
    ],
    links: [],
  },
  {
    slug: 'auditoria-web',
    title: {
      es: 'Security Header Scanner — Auditoría pasiva con mapeo normativo',
      en: 'Security Header Scanner — Passive auditing with compliance mapping',
    },
    subtitle: {
      es: 'Caso de estudio de la herramienta que audita este mismo portafolio.',
      en: 'Case study of the tool that audits this very portfolio.',
    },
    tech: ['NestJS 11', 'React 19', 'TypeScript 5', 'Vite 8', 'Node.js 22', 'pdfkit'],
    context: {
      es: 'Proyecto del Máster en Ciberseguridad en Evolve Academy. Una herramienta de auditoría pasiva que analiza los headers HTTP de respuesta de cualquier URL pública, genera un puntaje de seguridad (0-100) y mapea los resultados contra OWASP Top 10 y la Directiva NIS2. Es el proyecto del que este portafolio es sujeto pasivo: la nota de seguridad de esta web se generó con esta herramienta.',
      en: 'Master in Cybersecurity project at Evolve Academy. A passive auditing tool that analyzes HTTP response headers from any public URL, generates a security score (0-100), and maps results against OWASP Top 10 and the NIS2 Directive. This portfolio is its passive subject: the security score of this site was produced by this tool.',
    },
    problem: {
      es: 'Auditar los headers de seguridad de un sitio web hoy implica revisar manualmente decenas de cabeceras, cruzarlas con marcos normativos y producir un informe. Las herramientas existentes o son demasiado simples (solo listan headers) o demasiado pesadas ( scanners activos que requieren permiso). Faltaba una auditoría pasiva, completa y con salida profesional.',
      en: 'Auditing a website security headers today means manually reviewing dozens of headers, cross-referencing them with regulatory frameworks, and producing a report. Existing tools are either too simple (they only list headers) or too heavy (active scanners that require permission). A complete passive audit with professional output was missing.',
    },
    decisions: [
      {
        title: {
          es: '15 checkers individuales detrás de una interfaz',
          en: '15 individual checkers behind one interface',
        },
        body: {
          es: 'Cada header se audita con su propio checker implementando la interfaz HeaderChecker. Añadir un header nuevo es crear una clase, no modificar un switch gigante. El patrón open/closed permite crecer de 15 a más checkers sin tocar el orquestador.',
          en: 'Each header is audited by its own checker implementing the HeaderChecker interface. Adding a new header means creating a class, not editing a giant switch. The open/closed pattern lets the tool grow beyond 15 checkers without touching the orchestrator.',
        },
      },
      {
        title: {
          es: 'Scoring ponderado por severidad',
          en: 'Severity-weighted scoring',
        },
        body: {
          es: 'Los headers no pesan igual: un CSP ausente es más grave que un X-XPTO-Options ausente. El ScoreCalculator asigna pesos por severidad (critical=25, high=15, medium=10, low=5) con máximo de 165 puntos, normalizados a 0-100. El número es discutible; la estructura para discutirlo está construida.',
          en: 'Headers do not weigh the same: a missing CSP is graver than a missing X-XPTO-Options. The ScoreCalculator assigns severity weights (critical=25, high=15, medium=10, low=5) with a 165-point maximum, normalized to 0-100. The number is debatable; the structure to debate it is built.',
        },
      },
      {
        title: {
          es: 'APIs nativas de Node para TLS y DNS',
          en: 'Native Node APIs for TLS and DNS',
        },
        body: {
          es: 'La verificación TLS/SSL usa tls.connect() en crudo para extraer versión de protocolo y certificado completo; DNS usa dns/promises nativo para SPF/DKIM/DMARC. Sin dependencias externas para lo que el runtime ya sabe hacer: menos superficie de ataque y menos rotura por updates.',
          en: 'TLS/SSL verification uses raw tls.connect() to extract protocol version and full certificate; DNS uses native dns/promises for SPF/DKIM/DMARC. No external dependencies for what the runtime already knows how to do: less attack surface and less breakage on updates.',
        },
      },
      {
        title: {
          es: 'Escaneo paralelo con Promise.all',
          en: 'Parallel scanning with Promise.all',
        },
        body: {
          es: 'Tras la petición HTTP inicial, las 6 categorías de verificación (TLS, DNS, security files, sensitive files, SRI, fingerprinting) se ejecutan en paralelo. La latencia total se acerca a la de la verificación más lenta, no a la suma. Para una herramienta que se usa contra sitios de terceros, el tiempo de respuesta importa.',
          en: 'After the initial HTTP request, the 6 verification categories (TLS, DNS, security files, sensitive files, SRI, fingerprinting) run in parallel. Total latency approaches the slowest check, not the sum. For a tool used against third-party sites, response time matters.',
        },
      },
    ],
    architecture: {
      es: 'Backend NestJS 11 modular con 4 módulos funcionales (Scanner, Analyzer, Compliance, Report) comunicados mediante inyección de dependencias. ScannerController como entry point, ScannerService como orquestador con Promise.all. AnalyzerService con 15 checkers (HeaderChecker) y ScoreCalculator ponderado. ComplianceService con mappers para OWASP Top 10, NIS2, ENS e ISO 27001. ReportService y ExportService con salida JSON y PDF (pdfkit). Frontend React 19 + Vite 8: ScoreCircle SVG animado, grilla de headers con barras de progreso, secciones de compliance, TLS/DNS, SRI y fingerprinting con tabla de CVEs, y recomendaciones priorizadas por severidad.',
      en: 'Modular NestJS 11 backend with 4 functional modules (Scanner, Analyzer, Compliance, Report) wired through dependency injection. ScannerController as entry point, ScannerService as orchestrator with Promise.all. AnalyzerService with 15 checkers (HeaderChecker) and weighted ScoreCalculator. ComplianceService with mappers for OWASP Top 10, NIS2, ENS, and ISO 27001. ReportService and ExportService with JSON and PDF output (pdfkit). React 19 + Vite 8 frontend: animated SVG ScoreCircle, header grid with progress bars, compliance, TLS/DNS, SRI, and fingerprinting sections with CVE table, and severity-prioritized recommendations.',
    },
    erdPath: '/erd/auditoria-seguridad.svg',
    erdAlt: {
      es: 'Security Header Scanner: arquitectura de módulos.',
      en: 'Security Header Scanner: module architecture.',
    },
    erdCaption: {
      es: 'Módulos Scanner, Analyzer, Compliance y Report comunicados por inyección de dependencias.',
      en: 'Scanner, Analyzer, Compliance, and Report modules wired through dependency injection.',
    },
    results: [
      {
        es: '83 tests unitarios en 19 suites: cada checker tiene su batería de tests.',
        en: '83 unit tests across 19 suites: every checker has its own test battery.',
      },
      {
        es: 'Escáner de 15 headers con scoring ponderado y mapeo a OWASP Top 10, NIS2, ENS e ISO 27001.',
        en: '15-header scanner with weighted scoring and mapping to OWASP Top 10, NIS2, ENS, and ISO 27001.',
      },
      {
        es: 'Verificaciones TLS/SSL, DNS (SPF/DKIM/DMARC), archivos de seguridad (RFC 9116), SRI y fingerprinting con 25 CVEs conocidos.',
        en: 'TLS/SSL, DNS (SPF/DKIM/DMARC), security files (RFC 9116), SRI, and fingerprinting with 25 known CVEs.',
      },
      {
        es: 'Exportación profesional a PDF y JSON; documentación OpenAPI con Swagger.',
        en: 'Professional PDF and JSON export; OpenAPI documentation with Swagger.',
      },
      {
        es: 'La herramienta audita este portafolio: la nota de cabeceras de esta web es un output real del scanner.',
        en: 'The tool audits this portfolio: the header score of this site is a real scanner output.',
      },
    ],
    lessons: [
      {
        es: 'Añadir tests de contrato para los checkers (una suite que verifique que cada checker cumple la interfaz HeaderChecker): los 15 checkers se escribieron a mano y un test genérico habría detectado desviaciones antes.',
        en: 'Add contract tests for the checkers (a suite verifying each checker honors the HeaderChecker interface): the 15 checkers were written by hand and a generic test would have caught deviations earlier.',
      },
      {
        es: 'Mantener una fixtures de sitios conocidos (headers capturados de sitios reales) como tests de regresión del scoring: cambia el peso de un header y ves al instante el impacto en la nota.',
        en: 'Keep fixtures of known sites (captured headers from real sites) as scoring regression tests: change a header weight and instantly see the score impact.',
      },
      {
        es: 'Si se publica una demo, añadir rate limiting y cache de resultados por URL con TTL: el escáner es pasivo, pero un endpoint público sin límite es un DoS contra uno mismo.',
        en: 'If a demo is published, add rate limiting and per-URL result caching with TTL: the scanner is passive, but an unlimited public endpoint is a DoS against yourself.',
      },
    ],
    links: [
      {
        label: { es: 'Repositorio en GitHub', en: 'GitHub repository' },
        url: 'https://github.com/Andres-Caso-Iglesias/Auditoria-web',
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug);
}

export function getCaseStudyForProject(projectSlug: string): CaseStudy | undefined {
  return getCaseStudy(projectSlug);
}
