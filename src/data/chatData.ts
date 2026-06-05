import { Lang } from "@/i18n/types";

// ──────────────────────────────────────────────────────────────
// Chat Response Interface
// ──────────────────────────────────────────────────────────────
export interface ChatResponse {
  id: string;
  keywords: string[];
  message: Record<Lang, string>;
}

// ──────────────────────────────────────────────────────────────
// Follow-Up Response Interface (for context-aware replies)
// ──────────────────────────────────────────────────────────────
export interface FollowUpResponse {
  triggerTopic: string; // The topic that was just discussed
  affirmativeKeywords: string[];
  message: Record<Lang, string>;
}

// ──────────────────────────────────────────────────────────────
// Quick Action Button Interface
// ──────────────────────────────────────────────────────────────
export interface QuickAction {
  id: string;
  label: Record<Lang, string>;
  keywords: string[];
}

// ──────────────────────────────────────────────────────────────
// Chat Config Interface (for future AI integration)
// ──────────────────────────────────────────────────────────────
export interface ChatConfig {
  mode: "rule-based" | "ai" | "hybrid";
  aiProvider?: "gemini" | "openai" | "anthropic";
  apiKey?: string;
  maxTokens?: number;
  systemPrompt?: Record<Lang, string>;
}

// ──────────────────────────────────────────────────────────────
// Default Chat Configuration
// ──────────────────────────────────────────────────────────────
export const defaultChatConfig: ChatConfig = {
  mode: "rule-based",
  // Future AI config:
  // mode: "hybrid",
  // aiProvider: "gemini",
  // apiKey: process.env.NEXT_PUBLIC_AI_API_KEY,
  // maxTokens: 150,
};

// ──────────────────────────────────────────────────────────────
// System Prompts for AI Mode (future use)
// ──────────────────────────────────────────────────────────────
export const systemPrompts: Record<Lang, string> = {
  es: `Eres el pinche virtual del portafolio de Andrés Caso Iglesias.
       Tu función es responder preguntas sobre su perfil profesional.
       Sé conciso, profesional y amable.
       Si no sabes la respuesta, di que pueden contactarle directamente.
       Responde en máximo 2-3 oraciones.`,
  en: `You are the virtual sous-chef for Andrés Caso Iglesias' portfolio.
       Your function is to answer questions about his professional profile.
       Be concise, professional, and friendly.
       If you don't know the answer, say they can contact him directly.
       Respond in 2-3 sentences maximum.`,
};

// ──────────────────────────────────────────────────────────────
// Predefined Responses (Rule-Based)
// ──────────────────────────────────────────────────────────────
export const chatResponses: ChatResponse[] = [
  // ─── EXPERIENCIA / EXPERIENCE ───────────────────────────────
  {
    id: "experience",
    keywords: [
      // Español - palabras sueltas
      "experiencia",
      "trayectoria",
      "laboral",
      "trabajo",
      "empleo",
      "curriculum",
      "cv",
      "profesional",
      "职业",
      "años",
      "antigüedad",
      "experiencia laboral",
      "experiencia profesional",
      "trayectoria laboral",
      "historial",
      "pasado",
      "antecedentes",
      // Inglés - palabras sueltas
      "experience",
      "work",
      "job",
      "career",
      "background",
      "resume",
      "cv",
      "professional",
      "years",
      "tenure",
      "work experience",
      "professional experience",
      "work history",
      "past",
      "background",
    ],
    message: {
      es: "Tengo casi 20 años de experiencia liderando equipos en hostelería y logística. Actualmente estoy cursando un Máster en Ciberseguridad e IA para obtener el eJPT. Mi giro hacia el desarrollo de software comenzó hace 3 años, y combino mi experiencia en gestión con habilidades técnicas en C#/.NET, Java y TypeScript.",
      en: "I have nearly 20 years of experience leading teams in hospitality and logistics. I'm currently pursuing a Master's in Cybersecurity & AI to obtain the eJPT. My transition into software development started 3 years ago, combining management experience with technical skills in C#/.NET, Java, and TypeScript.",
    },
  },

  // ─── HABILIDADES / SKILLS ───────────────────────────────────
  {
    id: "skills",
    keywords: [
      // Español
      "habilidades",
      "tecnologías",
      "tech",
      "skills",
      "technologies",
      "stack",
      "lenguajes",
      "languages",
      "frameworks",
      "herramientas",
      "tools",
      "saber",
      "conocimientos",
      "competencias",
      "capacidades",
      "programación",
      "desarrollo",
      "coding",
      "development",
      "tech stack",
      "satck",
      // Inglés
      "skills",
      "technologies",
      "tech",
      "stack",
      "languages",
      "frameworks",
      "tools",
      "know",
      "knowledge",
      "competencies",
      "abilities",
      "programming",
      "development",
      "coding",
    ],
    message: {
      es: "Mi stack principal incluye: C#, .NET, Java 17, Spring Boot, TypeScript, NestJS y bases de datos como PostgreSQL, SQL Server y MongoDB. En frontend trabajo con React y Angular. También tengo experiencia en DevOps con Docker, Azure y Git. Actualmente profundizando en ciberseguridad con herramientas como NMAP, Wireshark y Kali Linux.",
      en: "My main stack includes: C#, .NET, Java 17, Spring Boot, TypeScript, NestJS, and databases like PostgreSQL, SQL Server, and MongoDB. For frontend I work with React and Angular. I also have DevOps experience with Docker, Azure, and Git. Currently deepening in cybersecurity with tools like NMAP, Wireshark, and Kali Linux.",
    },
  },

  // ─── FORMACIÓN / EDUCATION ──────────────────────────────────
  {
    id: "education",
    keywords: [
      // Español
      "estudiaste",
      "formación",
      "educación",
      "estudios",
      "título",
      "universidad",
      "estudiar",
      "estudio",
      "carrera",
      "grado",
      "universidad",
      "学院",
      "estudie",
      "formado",
      "educado",
      "titulado",
      "graduado",
      "estudiar",
      "aprender",
      "curso",
      "cursos",
      // Inglés
      "education",
      "study",
      "degree",
      "university",
      "studied",
      "college",
      "school",
      "graduated",
      "bachelor",
      "master",
      "learn",
      "course",
      "studying",
    ],
    message: {
      es: "Mi formación incluye: un Máster en Ciberseguridad e IA (Evolve, 2026), un Grado en Desarrollo de Aplicaciones Multiplataforma (I.E.S. Juan José Calvo Miguel), y anteriormente estudios de cocina y pastelería. Esta diversidad me da una perspectiva única para resolver problemas.",
      en: "My education includes: a Master's in Cybersecurity & AI (Evolve, 2026), a Degree in Multiplatform Application Development (I.E.S. Juan José Calvo Miguel), and previous studies in cooking and pastry. This diversity gives me a unique perspective for problem-solving.",
    },
  },

  // ─── CONTACTO / CONTACT ─────────────────────────────────────
  {
    id: "contact",
    keywords: [
      // Español
      "contacto",
      "contactar",
      "email",
      "correo",
      "teléfono",
      "llamar",
      "escribir",
      "linkedin",
      "github",
      "redes",
      "social",
      "whatsapp",
      "telegram",
      "mensaje",
      "mensajes",
      "hablar",
      "comunicar",
      "comunicación",
      "联络",
      "联系",
      // Inglés
      "contact",
      "email",
      "phone",
      "call",
      "reach",
      "linkedin",
      "github",
      "social",
      "networks",
      "whatsapp",
      "telegram",
      "message",
      "messages",
      "talk",
      "communicate",
      "communication",
    ],
    message: {
      es: "Puedes contactarme a través de LinkedIn o directamente por email. También tengo repositorios en GitHub con mis proyectos. ¿Te gustaría que te dé los enlaces?",
      en: "You can contact me through LinkedIn or directly via email. I also have GitHub repositories with my projects. Would you like me to provide the links?",
    },
  },

  // ─── PROYECTOS / PROJECTS ───────────────────────────────────
  {
    id: "projects",
    keywords: [
      // Español
      "proyectos",
      "portfolio",
      "trabajos",
      "proyecto",
      "aplicaciones",
      "apps",
      "web",
      "sitio",
      "pagina",
      "página",
      "aplicación",
      "软件",
      "trabajo",
      "realización",
      "creaciones",
      "desarrollos",
      // Inglés
      "project",
      "portfolio",
      "works",
      "projects",
      "applications",
      "apps",
      "web",
      "site",
      "page",
      "application",
      "developments",
      "creations",
    ],
    message: {
      es: "Mis proyectos destacados son:\n\nBolsa de Empleo - NestJS + PostgreSQL\nFoodBites - Spring Boot + MySQL\nGestor Huertos Urbanos - Java Spring Boot\nAuditoria de Seguridad - NestJS + React\nPortafolio - Next.js 16 + TypeScript\n\nEscribe el nombre de un proyecto para ver más detalles.",
      en: "My featured projects are:\n\nBolsa de Empleo - NestJS + PostgreSQL\nFoodBites - Spring Boot + MySQL\nGestor Huertos Urbanos - Java Spring Boot\nSecurity Audit - NestJS + React\nPortfolio - Next.js 16 + TypeScript\n\nType a project name to see more details.",
    },
  },

  // ─── PROYECTO: Bolsa de Empleo ──────────────────────────────
  {
    id: "project-bolsa",
    keywords: [
      "bolsa",
      "bolsa de empleo",
      "bolsa empleo",
      "empleo",
      "job",
      "jobs",
      "bolsa-empleo",
      "bolsaempleo",
      "trabajo",
      "empleo",
      "ofertas",
    ],
    message: {
      es: "Bolsa de Empleo - API RESTful con NestJS 11 + PostgreSQL + TypeORM + Flutter 3. Autenticación JWT, roles por usuario, gestión de ofertas laborales y notificaciones.",
      en: "Bolsa de Empleo - RESTful API with NestJS 11 + PostgreSQL + TypeORM + Flutter 3. JWT authentication, role-based users, job offers management and notifications.",
    },
  },

  // ─── PROYECTO: FoodBites ────────────────────────────────────
  {
    id: "project-foodbites",
    keywords: [
      "foodbites",
      "food",
      "bites",
      "food bites",
      "food-bites",
      "foodtruck",
      "food truck",
      "comida",
      "restaurant",
      "restaurante",
      "camion",
      "camión",
      "furgoneta",
    ],
    message: {
      es: "FoodBites - Backend Spring Boot 3.2.0 + Java 17 + MySQL 8.2. Gestión de food trucks con 6 entidades, búsqueda por ubicación y recomendaciones por tipo de cocina.",
      en: "FoodBites - Spring Boot 3.2.0 Backend + Java 17 + MySQL 8.2. Food truck management with 6 entities, location search and cuisine recommendations.",
    },
  },

  // ─── PROYECTO: Gestor Huertos Urbanos ───────────────────────
  {
    id: "project-huertos",
    keywords: [
      "huertos",
      "huerto",
      "urbanos",
      "urbano",
      "gestor",
      "garden",
      "gardens",
      "urban",
      "huertos-urbanos",
      "huertosurbanos",
      "jardin",
      "jardín",
      "plantas",
    ],
    message: {
      es: "Gestor Huertos Urbanos - Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + Bootstrap 5. Aplicación web para gestión de huertos urbanos con CRUD completo.",
      en: "Gestor Huertos Urbanos - Java 17 + Spring Boot 3.2.0 + MySQL 8.2 + Bootstrap 5. Web application for urban garden management with full CRUD.",
    },
  },

  // ─── PROYECTO: Auditoria de Seguridad ──────────────────────
  {
    id: "project-auditoria",
    keywords: [
      "auditoria",
      "auditoría",
      "seguridad",
      "security",
      "audit",
      "auditoria-web",
      "auditoriaweb",
      "penetration",
      "pentest",
      "owasp",
      "vulnerabilidades",
      "hacking",
    ],
    message: {
      es: "Auditoria de Seguridad - NestJS 11 + React 19 + TypeScript. Herramienta de auditoría que analiza vulnerabilidades OWASP Top 10.",
      en: "Security Audit - NestJS 11 + React 19 + TypeScript. Auditing tool that analyzes OWASP Top 10 vulnerabilities.",
    },
  },

  // ─── PROYECTO: Portafolio ──────────────────────────────────
  {
    id: "project-portfolio",
    keywords: [
      "portafolio",
      "portfolio",
      "este proyecto",
      "this project",
      "este sitio",
      "this site",
      "esta web",
      "this web",
    ],
    message: {
      es: "Portafolio Profesional - Next.js 16 + React 19 + TypeScript + Tailwind CSS v4. Arquitectura en capas con chat interactivo bilingüe.",
      en: "Professional Portfolio - Next.js 16 + React 19 + TypeScript + Tailwind CSS v4. Layered architecture with bilingual interactive chat.",
    },
  },

  // ─── DISPONIBILIDAD / AVAILABILITY ──────────────────────────
  {
    id: "availability",
    keywords: [
      // Español
      "disponibilidad",
      "disponible",
      "contratar",
      "empezar",
      "incorporar",
      "unirse",
      "nuevo empleo",
      "cambio empleo",
      "busco",
      "buscar",
      "oferta",
      "ofertas",
      "位置",
      "remoto",
      "presencial",
      "hibrido",
      "híbrido",
      "trabajar",
      "contratación",
      // Inglés
      "availability",
      "available",
      "hire",
      "start",
      "join",
      "new job",
      "looking",
      "seek",
      "offer",
      "offers",
      "remote",
      "onsite",
      "hybrid",
      "work",
      "hiring",
    ],
    message: {
      es: "Estoy disponible para oportunidades laborales, tanto presenciales en España como en remoto. Mi disponibilidad es inmediata. ¿Te gustaría agendar una llamada para conversar sobre oportunidades?",
      en: "I'm available for job opportunities, both onsite in Spain and remote. My availability is immediate. Would you like to schedule a call to discuss opportunities?",
    },
  },

  // ─── CIBERSEGURIDAD / CYBERSECURITY ─────────────────────────
  {
    id: "cybersecurity",
    keywords: [
      // Español
      "ciberseguridad",
      "seguridad",
      "hacking",
      "pentesting",
      "ejpt",
      "osint",
      "kali",
      "nmap",
      "wireshark",
      "sherlock",
      "maigret",
      "penetración",
      "vulnerabilidades",
      "amenazas",
      "ataques",
      "defensa",
      "red",
      "redes",
      "firewall",
      "vpn",
      "网络安全",
      "hackear",
      "hackear",
      "investigador",
      "analista",
      // Inglés
      "cybersecurity",
      "security",
      "hacking",
      "pentest",
      "ejpt",
      "osint",
      "kali",
      "nmap",
      "wireshark",
      "sherlock",
      "maigret",
      "penetration",
      "vulnerabilities",
      "threats",
      "attacks",
      "defense",
      "network",
      "networks",
      "firewall",
      "vpn",
      "hacker",
      "researcher",
      "analyst",
    ],
    message: {
      es: "Actualmente estoy cursando un Máster en Ciberseguridad e IA. Mis habilidades incluyen OSINT (Maigret, Sherlock), análisis de redes (Wireshark, NMAP), y pentesting básico con Kali Linux. Mi objetivo es obtener la certificación eJPT.",
      en: "I'm currently pursuing a Master's in Cybersecurity & AI. My skills include OSINT (Maigret, Sherlock), network analysis (Wireshark, NMAP), and basic pentesting with Kali Linux. My goal is to obtain the eJPT certification.",
    },
  },

  // ─── CERTIFICACIONES / CERTIFICATIONS ───────────────────────
  {
    id: "certifications",
    keywords: [
      // Español
      "certificaciones",
      "certificación",
      "certificado",
      "certificados",
      "titulación",
      "acreditación",
      "资质",
      "homologación",
      "reconocimiento",
      "oficial",
      "oficiales",
      // Inglés
      "certifications",
      "certification",
      "certificate",
      "certificates",
      "credential",
      "credentials",
      "accreditation",
      "recognition",
      "official",
    ],
    message: {
      es: "Actualmente estoy trabajando hacia la certificación eJPT (eLearnSecurity Junior Penetration Tester). Mi Máster en Ciberseguridad e IA me está preparando para esta y otras certificaciones del sector. También tengo formación oficial en Desarrollo de Aplicaciones Multiplataforma.",
      en: "I'm currently working towards the eJPT (eLearnSecurity Junior Penetration Tester) certification. My Master's in Cybersecurity & AI is preparing me for this and other industry certifications. I also have official training in Multiplatform Application Development.",
    },
  },

  // ─── IDIOMAS / LANGUAGES ────────────────────────────────────
  {
    id: "languages",
    keywords: [
      // Español
      "idiomas",
      "idioma",
      "español",
      "inglés",
      "english",
      "spanish",
      "castellano",
      "languages",
      "hablar",
      "speak",
      "fluente",
      "fluido",
      "nivel",
      "bilingüe",
      "bilingue",
      "multilingüe",
      "语言",
      "extranjero",
      // Inglés
      "languages",
      "language",
      "spanish",
      "english",
      "speak",
      "fluent",
      "fluency",
      "level",
      "bilingual",
      "multilingual",
      "foreign",
    ],
    message: {
      es: "Soy hispanohablante nativo (castellano) y tengo un nivel de inglés que me permite trabajar en entornos técnicos internacionales. Mi experiencia en hostelería me dio exposición a múltiples idiomas en entornos reales.",
      en: "I'm a native Spanish speaker (Castilian) and I have an English level that allows me to work in international technical environments. My hospitality experience gave me exposure to multiple languages in real-world settings.",
    },
  },

  // ─── SALARIO / SALARY ───────────────────────────────────────
  {
    id: "salary",
    keywords: [
      // Español
      "salario",
      "sueldo",
      "remuneración",
      "compensación",
      "pagar",
      "cuanto",
      "cuánto",
      "cobrar",
      "euros",
      "€",
      "money",
      "dinero",
      "presupuesto",
      "薪资",
      "renta",
      "ingresos",
      // Inglés
      "salary",
      "pay",
      "compensation",
      "remuneration",
      "how much",
      "money",
      "budget",
      "income",
      "wage",
      "wages",
    ],
    message: {
      es: "Mi expectativa salarial depende del rol y las responsabilidades. Estoy abierto a discutirlo en una entrevista. Lo más importante para mí es el crecimiento profesional y el aprendizaje continuo.",
      en: "My salary expectations depend on the role and responsibilities. I'm open to discussing it in an interview. What matters most to me is professional growth and continuous learning.",
    },
  },

  // ─── SOBRE MÍ / ABOUT ME ───────────────────────────────────
  {
    id: "about",
    keywords: [
      // Español
      "sobre",
      "mí",
      "ti",
      "quién",
      "quien",
      "cuentame",
      "cuéntame",
      "háblame",
      "hablame",
      "contar",
      "presentar",
      "presentación",
      "presentacion",
      "介绍",
      "perfil",
      "resumen",
      "resumir",
      // Inglés
      "about",
      "you",
      "yourself",
      "who",
      "tell",
      "introduce",
      "introduction",
      "profile",
      "summary",
      "summarize",
    ],
    message: {
      es: "Soy Andrés Caso Iglesias, un profesional con casi 20 años de experiencia en hostelería y logística que realizó un giro hacia el desarrollo de software. Actualmente cursando un Máster en Ciberseguridad e IA. Mi objetivo es combinar mi experiencia en gestión con habilidades técnicas para crear soluciones innovadoras.",
      en: "I'm Andrés Caso Iglesias, a professional with nearly 20 years of experience in hospitality and logistics who made a transition into software development. Currently pursuing a Master's in Cybersecurity & AI. My goal is to combine management experience with technical skills to create innovative solutions.",
    },
  },

  // ─── FRONTEND ───────────────────────────────────────────────
  {
    id: "frontend",
    keywords: [
      // Español
      "frontend",
      "front-end",
      "front end",
      "react",
      "angular",
      "next",
      "nextjs",
      "next.js",
      "ui",
      "ux",
      "interfaces",
      "visual",
      "diseño",
      "diseno",
      "css",
      "html",
      "tailwind",
      "bootstrap",
      "前端",
      // Inglés
      "frontend",
      "front-end",
      "front end",
      "react",
      "angular",
      "next",
      "nextjs",
      "next.js",
      "ui",
      "ux",
      "interfaces",
      "visual",
      "design",
      "css",
      "html",
      "tailwind",
      "bootstrap",
    ],
    message: {
      es: "En frontend trabajo con React y Angular, utilizando TypeScript y Tailwind CSS. He desarrollado aplicaciones con Next.js (App Router) y me enfoco en crear interfaces responsivas, accesibles y con buenas prácticas de arquitectura limpia.",
      en: "For frontend I work with React and Angular, using TypeScript and Tailwind CSS. I've developed applications with Next.js (App Router) and I focus on creating responsive, accessible interfaces with clean architecture practices.",
    },
  },

  // ─── BACKEND ────────────────────────────────────────────────
  {
    id: "backend",
    keywords: [
      // Español
      "backend",
      "back-end",
      "back end",
      "servidor",
      "server",
      "api",
      "apis",
      "rest",
      "restful",
      "microservicios",
      "base datos",
      "basededatos",
      "postgresql",
      "mysql",
      "mongodb",
      "sql",
      "nosql",
      "后端",
      "nest",
      "nestjs",
      "spring",
      "springboot",
      "java",
      "c#",
      "csharp",
      ".net",
      "dotnet",
      // Inglés
      "backend",
      "back-end",
      "back end",
      "server",
      "api",
      "apis",
      "rest",
      "restful",
      "microservices",
      "database",
      "databases",
      "postgresql",
      "mysql",
      "mongodb",
      "sql",
      "nosql",
      "nest",
      "nestjs",
      "spring",
      "springboot",
      "java",
      "c#",
      "csharp",
      ".net",
      "dotnet",
    ],
    message: {
      es: "Mi fuerte en backend es C#/.NET y Java con Spring Boot. Trabajo con bases de datos relacionales (PostgreSQL, SQL Server, MySQL) y NoSQL (MongoDB). He creado APIs RESTful y microservicios con NestJS en TypeScript. Enfocado en arquitectura limpia y patrones de diseño.",
      en: "My backend strength is C#/.NET and Java with Spring Boot. I work with relational databases (PostgreSQL, SQL Server, MySQL) and NoSQL (MongoDB). I've built RESTful APIs and microservices with NestJS in TypeScript. Focused on clean architecture and design patterns.",
    },
  },

  // ─── DEVOPS / CLOUD ─────────────────────────────────────────
  {
    id: "devops",
    keywords: [
      // Español
      "devops",
      "cloud",
      "nube",
      "docker",
      "azure",
      "aws",
      "amazon",
      "microsoft",
      "git",
      "github",
      "ci/cd",
      "deploy",
      "despliegue",
      "servidor",
      "virtualización",
      "virtualizacion",
      "vmware",
      "virtualbox",
      "hyper-v",
      "containers",
      "contenedores",
      "运维",
      // Inglés
      "devops",
      "cloud",
      "docker",
      "azure",
      "aws",
      "amazon",
      "microsoft",
      "git",
      "github",
      "ci/cd",
      "deploy",
      "deployment",
      "server",
      "virtualization",
      "vmware",
      "virtualbox",
      "hyper-v",
      "containers",
    ],
    message: {
      es: "Tengo experiencia en DevOps con Docker, Azure y Git/GitHub. He trabajado con virtualización (VMware, VirtualBox, Hyper-V) y configuración de servidores. Mi formación en ciberseguridad me da una perspectiva única en seguridad de infraestructuras.",
      en: "I have DevOps experience with Docker, Azure, and Git/GitHub. I've worked with virtualization (VMware, VirtualBox, Hyper-V) and server configuration. My cybersecurity training gives me a unique perspective on infrastructure security.",
    },
  },

  // ─── SOFT SKILLS ────────────────────────────────────────────
  {
    id: "softskills",
    keywords: [
      // Español
      "liderazgo",
      "lider",
      "líder",
      "gestión",
      "gestion",
      "equipo",
      "comunicación",
      "comunicacion",
      "trabajo en equipo",
      "organización",
      "organizacion",
      "adaptabilidad",
      "creatividad",
      "resolución",
      "resolucion",
      "problemas",
      "pensamiento",
      "crítico",
      "critico",
      "soft skills",
      "blandas",
      "habilidades blandas",
      "人际",
      // Inglés
      "leadership",
      "leader",
      "management",
      "team",
      "communication",
      "teamwork",
      "organization",
      "adaptability",
      "creativity",
      "problem solving",
      "critical thinking",
      "soft skills",
      "soft",
      "interpersonal",
    ],
    message: {
      es: "Mi experiencia de casi 20 años liderando equipos me ha dado habilidades sólidas en gestión, comunicación y resolución de problemas. Soy creativo, adaptable y trabajo bien en equipo. Estas habilidades complementan mis capacidades técnicas.",
      en: "My nearly 20 years of experience leading teams has given me strong skills in management, communication, and problem-solving. I'm creative, adaptable, and work well in teams. These skills complement my technical capabilities.",
    },
  },

  // ─── IA / INTELIGENCIA ARTIFICIAL ──────────────────────────
  {
    id: "ai",
    keywords: [
      // Español
      "ia",
      "inteligencia artificial",
      "machine learning",
      "ml",
      "deep learning",
      "redes neuronales",
      "neural",
      "chatgpt",
      "gemini",
      "claude",
      "copilot",
      "github copilot",
      "antigravity",
      "opencode",
      "notebooklm",
      "人工智能",
      "datos",
      "data",
      // Inglés
      "ai",
      "artificial intelligence",
      "machine learning",
      "ml",
      "deep learning",
      "neural",
      "networks",
      "chatgpt",
      "gemini",
      "claude",
      "copilot",
      "github copilot",
      "antigravity",
      "opencode",
      "notebooklm",
      "data",
    ],
    message: {
      es: "Mi Máster en Ciberseguridad e IA me está dando formación en inteligencia artificial aplicada. Uso herramientas como GitHub Copilot, Claude, Gemini y ChatGPT en mi día a día. Estoy aprendiendo sobre ML y su aplicación en ciberseguridad.",
      en: "My Master's in Cybersecurity & AI is giving me training in applied artificial intelligence. I use tools like GitHub Copilot, Claude, Gemini, and ChatGPT daily. I'm learning about ML and its application in cybersecurity.",
    },
  },

  // ─── HOSTELERÍA / HOSPITALITY ──────────────────────────────
  {
    id: "hospitality",
    keywords: [
      // Español
      "hostelería",
      "hosteleria",
      "cocina",
      "chef",
      "gastronomía",
      "gastronomia",
      "restaurante",
      "hotel",
      "turismo",
      "pastelería",
      "panaderia",
      "panadería",
      "jefe de cocina",
      "cocinero",
      "餐饮",
      // Inglés
      "hospitality",
      "cooking",
      "chef",
      "gastronomy",
      "restaurant",
      "hotel",
      "tourism",
      "pastry",
      "bakery",
      "head chef",
      "cook",
    ],
    message: {
      es: "Antes de mi transición al desarrollo, fui jefe de cocina durante más de 10 años en restaurantes de Asturias. Esta experiencia me enseñó liderazgo, gestión de equipos, trabajo bajo presión y atención al detalle. Es una base que valoro mucho en mi carrera tech.",
      en: "Before my transition to development, I was a head chef for over 10 years in Asturian restaurants. This experience taught me leadership, team management, working under pressure, and attention to detail. It's a foundation I greatly value in my tech career.",
    },
  },

  // ─── EDAD / AGE ─────────────────────────────────────────────
  {
    id: "age",
    keywords: [
      // Español
      "edad",
      "cuantos años",
      "cuántos años",
      "viejo",
      "joven",
      "年",
      "nacido",
      "nacimiento",
      // Inglés
      "age",
      "how old",
      "years old",
      "old",
      "young",
      "born",
      "birth",
    ],
    message: {
      es: "Tengo 40 años y estoy en un momento profesional de crecimiento. Mi edad es una ventaja: combino la madurez y experiencia de casi 20 años liderando equipos con la energía y curiosidad de alguien que está aprendiendo un nuevo oficio.",
      en: "I'm 40 years old and I'm in a moment of professional growth. My age is an advantage: I combine the maturity and experience of nearly 20 years leading teams with the energy and curiosity of someone learning a new trade.",
    },
  },

  // ─── UBICACIÓN / LOCATION ──────────────────────────────────
  {
    id: "location",
    keywords: [
      // Español
      "ubicación",
      "ubicacion",
      "dónde",
      "donde",
      "vives",
      "vivir",
      "asturias",
      "españa",
      "spain",
      "location",
      "position",
      "dirección",
      "direccion",
      "ciudad",
      "pueblo",
      "地址",
      // Inglés
      "location",
      "where",
      "live",
      "living",
      "asturias",
      "spain",
      "address",
      "city",
      "town",
    ],
    message: {
      es: "Resido en Asturias, España. Estoy abierto a oportunidades presenciales en la zona, así como a posiciones remotas en cualquier parte de España o Europa.",
      en: "I live in Asturias, Spain. I'm open to onsite opportunities in the area, as well as remote positions anywhere in Spain or Europe.",
    },
  },

  // ─── LOGÍSTICA / LOGISTICS ──────────────────────────────────
  {
    id: "logistics",
    keywords: [
      // Español
      "logística",
      "logistica",
      "almacén",
      "almacen",
      "inventario",
      "cadena",
      "suministro",
      "supply chain",
      "warehouse",
      "inventory",
      "operaciones",
      "operativo",
      "物流",
      // Inglés
      "logistics",
      "warehouse",
      "inventory",
      "supply chain",
      "operations",
      "operational",
    ],
    message: {
      es: "Tengo experiencia en logística y almacén de mi tiempo en Quesería Lafuente. Entiendo procesos de inventario, cadena de suministro y operaciones. Esta experiencia complementa mi capacidad para desarrollar sistemas de gestión empresarial.",
      en: "I have logistics and warehouse experience from my time at Quesería Lafuente. I understand inventory processes, supply chain, and operations. This experience complements my ability to develop business management systems.",
    },
  },

  // ─── PROCESOS / PROCESSES ──────────────────────────────────
  {
    id: "processes",
    keywords: [
      // Español
      "procesos",
      "metodologías",
      "metodologias",
      "agile",
      "scrum",
      "kanban",
      "ciclo",
      "desarrollo",
      "workflow",
      "flujo",
      "工序",
      "procedimientos",
      // Inglés
      "processes",
      "methodologies",
      "agile",
      "scrum",
      "kanban",
      "cycle",
      "development",
      "workflow",
      "procedures",
    ],
    message: {
      es: "Trabajo con metodologías ágiles (Scrum, Kanban) y entiendo los ciclos de desarrollo de software. Mi experiencia gestionando equipos me ha enseñado la importancia de procesos claros, comunicación efectiva y mejora continua.",
      en: "I work with agile methodologies (Scrum, Kanban) and understand software development cycles. My experience managing teams has taught me the importance of clear processes, effective communication, and continuous improvement.",
    },
  },

  // ─── MOTIVACIÓN / MOTIVATION ─────────────────────────────────
  {
    id: "motivation",
    keywords: [
      // Español
      "motivación",
      "motivacion",
      "por qué",
      "porque",
      "por que",
      "razón",
      "razon",
      "objetivo",
      "meta",
      "ilusión",
      "ilusion",
      "ganas",
      "pasión",
      "pasion",
      "entusiasmo",
      "motivos",
      "为什么",
      "anhelo",
      // Inglés
      "motivation",
      "motivated",
      "why",
      "reason",
      "goal",
      "objective",
      "passion",
      "enthusiasm",
      "drive",
      "ambition",
    ],
    message: {
      es: "Mi motivación es crear soluciones tecnológicas que hagan la vida más fácil. Después de 20 años en hostelería, descubrí que mi pasión está en resolver problemas con código. Cada proyecto nuevo es un reto que me impulsa a aprender más.",
      en: "My motivation is creating technological solutions that make life easier. After 20 years in hospitality, I discovered that my passion lies in solving problems with code. Every new project is a challenge that drives me to learn more.",
    },
  },

  // ─── DEBILIDADES / WEAKNESSES ────────────────────────────────
  {
    id: "weaknesses",
    keywords: [
      // Español
      "debilidades",
      "debilidad",
      "mejorar",
      "error",
      "errores",
      "fallo",
      "fallos",
      "defecto",
      "punto débil",
      "punto debil",
      "fracaso",
      "fracasar",
      "困难",
      "limitación",
      "limitacion",
      // Inglés
      "weakness",
      "weaknesses",
      "improve",
      "error",
      "errors",
      "fail",
      "failure",
      "flaw",
      "weak point",
      "limitation",
    ],
    message: {
      es: "Soy consciente de que soy nuevo en el desarrollo de software, por lo que me falta experiencia práctica en proyectos grandes. Sin embargo, mi capacidad de aprendizaje rápido y mi experiencia gestionando equipos me ayudan a cerrar esa brecha rápidamente.",
      en: "I'm aware that I'm new to software development, so I lack practical experience in large projects. However, my fast learning ability and experience managing teams help me close that gap quickly.",
    },
  },

  // ─── FORTALEZAS / STRENGTHS ─────────────────────────────────
  {
    id: "strengths",
    keywords: [
      // Español
      "fortalezas",
      "fortaleza",
      "punto fuerte",
      "ventaja",
      "cualidad",
      "cualidades",
      "virtud",
      "virtudes",
      "擅长",
      "fuerte",
      "bueno",
      "buena",
      // Inglés
      "strength",
      "strengths",
      "strong point",
      "advantage",
      "quality",
      "qualities",
      "virtue",
      "strong",
      "good",
    ],
    message: {
      es: "Mis principales fortalezas son: liderazgo (20 años gestionando equipos), resolución de problemas, adaptabilidad y mi capacidad para combinar pensamiento técnico con visión de negocio. Mi diversidad de experiencia es mi mayor activo.",
      en: "My main strengths are: leadership (20 years managing teams), problem-solving, adaptability, and my ability to combine technical thinking with business vision. My diverse experience is my greatest asset.",
    },
  },

  // ─── SUELDO / SALARY (variation) ────────────────────────────
  {
    id: "compensation",
    keywords: [
      // Español
      "sueldo",
      "salario",
      "pagar",
      "cobrar",
      "remuneración",
      "remuneracion",
      "compensación",
      "compensacion",
      "€",
      "euros",
      "dinero",
      "presupuesto",
      "薪资",
      "cuanto",
      "cuánto",
      // Inglés
      "salary",
      "pay",
      "compensation",
      "money",
      "budget",
      "how much",
      "offer",
    ],
    message: {
      es: "Mi expectativa salarial depende del rol y las responsabilidades. Estoy abierto a discutirlo en una entrevista. Lo más importante para mí es el crecimiento profesional y el aprendizaje continuo.",
      en: "My salary expectations depend on the role and responsibilities. I'm open to discussing it in an interview. What matters most to me is professional growth and continuous learning.",
    },
  },

  // ─── PROYECTOS PERSONALES / PERSONAL PROJECTS ────────────────
  {
    id: "personalprojects",
    keywords: [
      // Español
      "personal",
      "proyecto personal",
      "proyectos personales",
      "hobby",
      "hobbies",
      "pasatiempo",
      "pasatiempos",
      "tiempo libre",
      "ocio",
      "兴趣",
      "side project",
      "lado",
      // Inglés
      "personal",
      "personal project",
      "hobby",
      "hobbies",
      "side project",
      "free time",
      "leisure",
    ],
    message: {
      es: "En mi tiempo libre me gusta experimentar con nuevas tecnologías, contributing a open source, y trabajar en proyectos personales que resuelven problemas reales. Actualmente estoy construyendo este portafolio como muestra de mis habilidades.",
      en: "In my free time I like to experiment with new technologies, contribute to open source, and work on personal projects that solve real problems. I'm currently building this portfolio as a showcase of my skills.",
    },
  },

  // ─── EMPLEO ANTERIOR / PREVIOUS EMPLOYMENT ───────────────────
  {
    id: "previousemployment",
    keywords: [
      // Español
      "anterior",
      "anteriores",
      "previous",
      "pasado",
      "antes",
      "último",
      "ultimo",
      "última",
      "ultima",
      "empresa",
      "empresas",
      "trabajé",
      "trabaje",
      "前工作",
      "donde trabajaste",
      "dónde trabajaste",
      // Inglés
      "previous",
      "last",
      "former",
      "past",
      "company",
      "companies",
      "worked",
      "employment",
      "jobs",
    ],
    message: {
      es: "Mi último puesto fue en Mecalux Software Solutions como residente técnica profesional (2025). Anteriormente fui operario maquinista en Quesería Lafuente y representante de ventas en Eurosigns. Mi experiencia más larga fue como jefe de cocina en Posada del Valle durante 11 años.",
      en: "My last position was at Mecalux Software Solutions as a professional technical resident (2025). Previously I was a machine operator at Quesería Lafuente and sales representative at Eurosigns. My longest experience was as head chef at Posada del Valle for 11 years.",
    },
  },

  // ─── REFERENCIAS / REFERENCES ───────────────────────────────
  {
    id: "references",
    keywords: [
      // Español
      "referencias",
      "referencia",
      "recomendación",
      "recomendacion",
      "testimonio",
      "testimonios",
      "opinión",
      "opinion",
      "推荐",
      "calificación",
      "calificacion",
      // Inglés
      "references",
      "reference",
      "recommendation",
      "testimonial",
      "testimonials",
      "opinion",
      "reviews",
      "rating",
    ],
    message: {
      es: "Puedo proporcionar referencias profesionales de mis anteriores empleadores y colegas. Mis supervisores en Mecalux, Quesería Lafuente y otros pueden dar fe de mi trabajo y compromiso. ¿Te gustaría que te contacte con alguno?",
      en: "I can provide professional references from my previous employers and colleagues. My supervisors at Mecalux, Quesería Lafuente, and others can vouch for my work and commitment. Would you like me to connect you with any of them?",
    },
  },

  // ─── TECNOLOGÍAS ESPECÍFICAS / SPECIFIC TECHNOLOGIES ─────────
  {
    id: "techSpecific",
    keywords: [
      // Español
      "typescript",
      "javascript",
      "python",
      "csharp",
      "c sharp",
      "c#",
      "java",
      "kotlin",
      "swift",
      "ruby",
      "php",
      "go",
      "rust",
      "scala",
      "kotlin",
      "perl",
      "r",
      "matlab",
      "sql",
      "nosql",
      "graphql",
      "rest",
      "restful",
      "soap",
      "grpc",
      // Inglés
      "typescript",
      "javascript",
      "python",
      "csharp",
      "c sharp",
      "c#",
      "java",
      "kotlin",
      "swift",
      "ruby",
      "php",
      "go",
      "rust",
      "scala",
      "perl",
      "r",
      "matlab",
      "sql",
      "nosql",
      "graphql",
      "rest",
      "restful",
      "soap",
      "grpc",
    ],
    message: {
      es: "Mi lenguaje principal es TypeScript/JavaScript para fullstack, C#/.NET y Java para backend. También tengo experiencia con Python para scripts y automatización. En bases de datos domino SQL (PostgreSQL, MySQL) y NoSQL (MongoDB). ¿Hay alguna tecnología específica que te interese?",
      en: "My main language is TypeScript/JavaScript for fullstack, C#/.NET and Java for backend. I also have experience with Python for scripts and automation. In databases I master SQL (PostgreSQL, MySQL) and NoSQL (MongoDB). Is there a specific technology you're interested in?",
    },
  },

  // ─── FRAMEWORKS ESPECÍFICOS / SPECIFIC FRAMEWORKS ────────────
  {
    id: "frameworks",
    keywords: [
      // Español
      "next",
      "nextjs",
      "next.js",
      "react",
      "angular",
      "vue",
      "svelte",
      "nuxt",
      "express",
      "fastify",
      "django",
      "flask",
      "spring",
      "springboot",
      "spring boot",
      "laravel",
      "rails",
      "ruby on rails",
      ".net",
      "dotnet",
      "nest",
      "nestjs",
      // Inglés
      "next",
      "nextjs",
      "next.js",
      "react",
      "angular",
      "vue",
      "svelte",
      "nuxt",
      "express",
      "fastify",
      "django",
      "flask",
      "spring",
      "springboot",
      "spring boot",
      "laravel",
      "rails",
      "ruby on rails",
      ".net",
      "dotnet",
      "nest",
      "nestjs",
    ],
    message: {
      es: "Tengo experiencia con Next.js (App Router), React, Angular en frontend. Para backend uso NestJS, Spring Boot y .NET. Todos mis proyectos siguen principios de arquitectura limpia y están tipados en TypeScript o C#.",
      en: "I have experience with Next.js (App Router), React, Angular for frontend. For backend I use NestJS, Spring Boot, and .NET. All my projects follow clean architecture principles and are typed in TypeScript or C#.",
    },
  },

  // ─── BASES DE DATOS / DATABASES ─────────────────────────────
  {
    id: "databases",
    keywords: [
      // Español
      "base de datos",
      "basededatos",
      "bases de datos",
      "postgres",
      "postgresql",
      "mysql",
      "sql server",
      "sqlserver",
      "mongodb",
      "mongo",
      "redis",
      "elasticsearch",
      "firebase",
      "supabase",
      "dynamo",
      "dynamodb",
      "cassandra",
      "oracle",
      "sqlite",
      // Inglés
      "database",
      "databases",
      "postgres",
      "postgresql",
      "mysql",
      "sql server",
      "sqlserver",
      "mongodb",
      "mongo",
      "redis",
      "elasticsearch",
      "firebase",
      "supabase",
      "dynamo",
      "dynamodb",
      "cassandra",
      "oracle",
      "sqlite",
    ],
    message: {
      es: "En bases de datos relacionales tengo experiencia con PostgreSQL, SQL Server y MySQL. En NoSQL he trabajado con MongoDB. Entiendo diseño de esquemas, normalización, índices y consultas optimizadas.",
      en: "In relational databases I have experience with PostgreSQL, SQL Server, and MySQL. In NoSQL I've worked with MongoDB. I understand schema design, normalization, indexes, and optimized queries.",
    },
  },

  // ─── TESTING / TESTING ──────────────────────────────────────
  {
    id: "testing",
    keywords: [
      // Español
      "test",
      "tests",
      "pruebas",
      "prueba",
      "testing",
      "unit",
      "integración",
      "integracion",
      "e2e",
      "end to end",
      "cypress",
      "jest",
      "vitest",
      "junit",
      "selenium",
      "playwright",
      "tdd",
      "bdd",
      "cobertura",
      // Inglés
      "test",
      "tests",
      "testing",
      "unit",
      "integration",
      "e2e",
      "end to end",
      "cypress",
      "jest",
      "vitest",
      "junit",
      "selenium",
      "playwright",
      "tdd",
      "bdd",
      "coverage",
    ],
    message: {
      es: "Entiendo la importancia del testing. Tengo conocimientos en testing unitario con Jest/Vitest, integración y E2E con Playwright. Mi enfoque es escribir código testable desde el diseño, aplicando TDD cuando es posible.",
      en: "I understand the importance of testing. I have knowledge in unit testing with Jest/Vitest, integration and E2E with Playwright. My approach is to write testable code from the design, applying TDD when possible.",
    },
  },

  // ─── SEGURIDAD / SECURITY ───────────────────────────────────
  {
    id: "security",
    keywords: [
      // Español
      "seguridad",
      "security",
      "autenticación",
      "autenticacion",
      "autorización",
      "autorizacion",
      "oauth",
      "jwt",
      "token",
      "tokens",
      "encriptación",
      "encriptacion",
      "cifrado",
      "hash",
      "contraseña",
      "contrasena",
      "密码",
      "firewall",
      "waf",
      "owasp",
      "vulnerabilidad",
      // Inglés
      "security",
      "authentication",
      "authorization",
      "oauth",
      "jwt",
      "token",
      "tokens",
      "encryption",
      "cipher",
      "hash",
      "password",
      "firewall",
      "waf",
      "owasp",
      "vulnerability",
    ],
    message: {
      es: "Con mi formación en ciberseguridad, entiendo conceptos de autenticación (OAuth, JWT), autorización, encriptación y buenas prácticas de seguridad. Conozco el OWASP Top 10 y aplico principios de seguridad en el desarrollo.",
      en: "With my cybersecurity training, I understand authentication (OAuth, JWT), authorization, encryption, and security best practices. I know the OWASP Top 10 and apply security principles in development.",
    },
  },

  // ─── ARQUITECTURA / ARCHITECTURE ────────────────────────────
  {
    id: "architecture",
    keywords: [
      // Español
      "arquitectura",
      "architecture",
      "patrones",
      "patterns",
      "diseño",
      "diseno",
      "clean",
      "limpia",
      "hexagonal",
      "screaming",
      "solid",
      "dry",
      "kiss",
      "yagni",
      "mvc",
      "mvvm",
      "mvp",
      "repository",
      "factory",
      "singleton",
      // Inglés
      "architecture",
      "patterns",
      "design",
      "clean",
      "hexagonal",
      "screaming",
      "solid",
      "dry",
      "kiss",
      "yagni",
      "mvc",
      "mvvm",
      "mvp",
      "repository",
      "factory",
      "singleton",
    ],
    message: {
      es: "Aplico principios de arquitectura limpia, SOLID y patrones de diseño como Repository, Factory y Singleton. Mis proyectos siguen la regla de dependencias y separación de responsabilidades. Creo en código mantenible y escalable.",
      en: "I apply clean architecture principles, SOLID, and design patterns like Repository, Factory, and Singleton. My projects follow dependency rules and separation of responsibilities. I believe in maintainable and scalable code.",
    },
  },

  // ─── GIT / VERSION CONTROL ──────────────────────────────────
  {
    id: "git",
    keywords: [
      // Español
      "git",
      "github",
      "gitlab",
      "bitbucket",
      "control de versiones",
      "repositorio",
      "repositorios",
      "commit",
      "commits",
      "branch",
      "branches",
      "merge",
      "pull request",
      "pullrequest",
      "code review",
      // Inglés
      "git",
      "github",
      "gitlab",
      "bitbucket",
      "version control",
      "repository",
      "repositories",
      "commit",
      "commits",
      "branch",
      "branches",
      "merge",
      "pull request",
      "pullrequest",
      "code review",
    ],
    message: {
      es: "Domino Git y GitHub para control de versiones. Trabajo con flujos de trabajo basados en branches, pull requests y code reviews. Mantengo historiales de commit limpios y convencionales.",
      en: "I master Git and GitHub for version control. I work with branch-based workflows, pull requests, and code reviews. I maintain clean and conventional commit histories.",
    },
  },

  // ─── METODOLOGÍA / METHODOLOGY ──────────────────────────────
  {
    id: "methodology",
    keywords: [
      // Español
      "metodología",
      "metodologia",
      "metodologías",
      "metodologias",
      "proceso",
      "procesos",
      "ciclo",
      "ciclos",
      "flujo",
      "flujos",
      "workflow",
      "procedimiento",
      "procedimientos",
      // Inglés
      "methodology",
      "methodologies",
      "process",
      "processes",
      "cycle",
      "cycles",
      "workflow",
      "procedures",
    ],
    message: {
      es: "Trabajo con metodologías ágiles como Scrum y Kanban. Entiendo los ciclos de desarrollo de software y la importancia de retrospectivas, daily stand-ups y planning. Mi experiencia gestionando equipos me da una perspectiva práctica.",
      en: "I work with agile methodologies like Scrum and Kanban. I understand software development cycles and the importance of retrospectives, daily stand-ups, and planning. My team management experience gives me a practical perspective.",
    },
  },

  // ─── COMUNICACIÓN / COMMUNICATION ───────────────────────────
  {
    id: "communication",
    keywords: [
      // Español
      "comunicación",
      "comunicacion",
      "comunicar",
      "hablar",
      "explicar",
      "presentar",
      "exponer",
      "reunión",
      "reunion",
      "meetings",
      "汇报",
      "escritura",
      "documentación",
      "documentacion",
      // Inglés
      "communication",
      "communicate",
      "speak",
      "explain",
      "present",
      "meetings",
      "writing",
      "documentation",
      "documentation",
    ],
    message: {
      es: "Valoro mucho la comunicación clara. Mi experiencia liderando equipos me ha enseñado a explicar conceptos técnicos a audiencias no técnicas, documentar decisiones y facilitar reuniones efectivas.",
      en: "I highly value clear communication. My experience leading teams has taught me to explain technical concepts to non-technical audiences, document decisions, and facilitate effective meetings.",
    },
  },

  // ─── CREANDO / CREATING ─────────────────────────────────────
  {
    id: "creating",
    keywords: [
      // Español
      "crear",
      "creando",
      "construir",
      "construyendo",
      "desarrollar",
      "desarrollando",
      "hacer",
      "haciendo",
      "programar",
      "programando",
      "编码",
      "code",
      "coding",
      // Inglés
      "create",
      "creating",
      "build",
      "building",
      "develop",
      "developing",
      "make",
      "making",
      "code",
      "coding",
    ],
    message: {
      es: "Actualmente estoy creando este portafolio para demostrar mis habilidades. Me gusta construir cosas que resuelvan problemas reales. Cada proyecto es una oportunidad para aprender algo nuevo y mejorar como desarrollador.",
      en: "I'm currently building this portfolio to showcase my skills. I like to build things that solve real problems. Each project is an opportunity to learn something new and improve as a developer.",
    },
  },

  // ─── APRENDIENDO / LEARNING ─────────────────────────────────
  {
    id: "learning",
    keywords: [
      // Español
      "aprender",
      "aprendiendo",
      "aprendizaje",
      "estudiar",
      "estudiando",
      "formación",
      "formando",
      "cursando",
      "curso",
      "cursos",
      "taller",
      "talleres",
      "bootcamp",
      "master",
      "máster",
      "学习",
      // Inglés
      "learn",
      "learning",
      "study",
      "studying",
      "training",
      "course",
      "courses",
      "workshop",
      "bootcamp",
      "master",
    ],
    message: {
      es: "El aprendizaje continuo es mi filosofía. Actualmente estoy cursando un Máster en Ciberseguridad e IA. También tomo cursos online, leo documentación y experimento con nuevas tecnologíasregularmente.",
      en: "Continuous learning is my philosophy. I'm currently pursuing a Master's in Cybersecurity & AI. I also take online courses, read documentation, and experiment with new technologies regularly.",
    },
  },

  // ─── COLABORACIÓN / COLLABORATION ────────────────────────────
  {
    id: "collaboration",
    keywords: [
      // Español
      "colaboración",
      "colaboracion",
      "colaborar",
      "trabajar juntos",
      "equipo",
      "team",
      "grupo",
      "grupal",
      "pair programming",
      "programación en pareja",
      "合作",
      // Inglés
      "collaboration",
      "collaborate",
      "work together",
      "team",
      "group",
      "pair programming",
    ],
    message: {
      es: "Disfruto trabajando en equipo. Mi experiencia en hostelería me enseñó que los mejores resultados vienen de la colaboración. Me gusta el pair programming, las code reviews y aprender de mis compañeros.",
      en: "I enjoy working in teams. My hospitality experience taught me that the best results come from collaboration. I like pair programming, code reviews, and learning from my colleagues.",
    },
  },

  // ─── PROBLEMAS / PROBLEMS ───────────────────────────────────
  {
    id: "problems",
    keywords: [
      // Español
      "problema",
      "problemas",
      "resolver",
      "resolving",
      "solución",
      "solucion",
      "debugging",
      "debug",
      "bug",
      "bugs",
      "error",
      "errores",
      "困难",
      "difícil",
      "dificil",
      "reto",
      "retos",
      // Inglés
      "problem",
      "problems",
      "resolve",
      "resolving",
      "solution",
      "debugging",
      "debug",
      "bug",
      "bugs",
      "error",
      "errors",
      "difficult",
      "challenge",
      "challenges",
    ],
    message: {
      es: "Me encanta resolver problemas. Mi enfoque es: entender el problema, descomponerlo en partes manejables, investigar soluciones y implementar la más elegante. Mi experiencia en hostelería me entrenó para pensar rápido bajo presión.",
      en: "I love solving problems. My approach is: understand the problem, break it into manageable parts, research solutions, and implement the most elegant one. My hospitality experience trained me to think fast under pressure.",
    },
  },

  // ─── FUTURO / FUTURE ────────────────────────────────────────
  {
    id: "future",
    keywords: [
      // Español
      "futuro",
      "future",
      "próximo",
      "proximo",
      "siguiente",
      "plan",
      "planes",
      "objetivos",
      "metas",
      "愿景",
      "año",
      "años",
      "largo plazo",
      "corto plazo",
      // Inglés
      "future",
      "next",
      "following",
      "plan",
      "plans",
      "goals",
      "objectives",
      "vision",
      "year",
      "years",
      "long term",
      "short term",
    ],
    message: {
      es: "Mi plan a corto plazo es obtener la certificación eJPT y consolidarme como desarrollador fullstack. A largo plazo, me gustaría especializararme en arquitectura de software y ciberseguridad aplicada.",
      en: "My short-term plan is to obtain the eJPT certification and establish myself as a fullstack developer. Long-term, I'd like to specialize in software architecture and applied cybersecurity.",
    },
  },

  // ─── HERRAMIENTAS / TOOLS ──────────────────────────────────
  {
    id: "tools",
    keywords: [
      // Español
      "herramientas",
      "herramienta",
      "tools",
      "tool",
      "entorno",
      "entornos",
      "ide",
      "vscode",
      "visual studio",
      "intellij",
      "eclipse",
      "vim",
      "neovim",
      "tmux",
      "zellij",
      "terminal",
      "consola",
      "命令行",
      // Inglés
      "tools",
      "tool",
      "environment",
      "environments",
      "ide",
      "vscode",
      "visual studio",
      "intellij",
      "eclipse",
      "vim",
      "neovim",
      "tmux",
      "zellij",
      "terminal",
      "console",
    ],
    message: {
      es: "Uso VS Code como IDE principal, con terminales como tmux o Zellij para productividad. Git para versiones, Docker para containers, y Azure DevOps para CI/CD. Mi entorno está optimizado para flujo de trabajo eficiente.",
      en: "I use VS Code as my main IDE, with terminals like tmux or Zellij for productivity. Git for versions, Docker for containers, and Azure DevOps for CI/CD. My environment is optimized for efficient workflow.",
    },
  },

  // ─── OPEN SOURCE ────────────────────────────────────────────
  {
    id: "opensource",
    keywords: [
      // Español
      "open source",
      "opensource",
      "código abierto",
      "codigo abierto",
      "contribuir",
      "contribución",
      "comunidad",
      "开源",
      "comunitario",
      "gratuito",
      // Inglés
      "open source",
      "opensource",
      "contribute",
      "contribution",
      "community",
      "free software",
      "oss",
    ],
    message: {
      es: "Creo en el poder del open source. Uso y contribuyo a proyectos comunitarios cuando puedo. Mi portafolio es abierto para que cualquiera pueda aprender de él. El conocimiento se multiplica cuando se comparte.",
      en: "I believe in the power of open source. I use and contribute to community projects when I can. My portfolio is open for anyone to learn from. Knowledge multiplies when shared.",
    },
  },
];

// ──────────────────────────────────────────────────────────────
// Follow-Up Responses (Context-Aware)
// ──────────────────────────────────────────────────────────────
export const followUpResponses: FollowUpResponse[] = [
  // ─── CONTACTO: Enlaces después de preguntar ──────────────────
  {
    triggerTopic: "contact",
    affirmativeKeywords: [
      // Español
      "sí",
      "si",
      "claro",
      "dale",
      "por favor",
      "pf",
      "ok",
      "vale",
      "guay",
      "perfecto",
      "excelente",
      "genial",
      "dale",
      "yes",
      "yep",
      "yeah",
      "sure",
      "please",
      "thanks",
      "gracias",
    ],
    message: {
      es: "Aquí tienes los enlaces:\n\n[LinkedIn](https://www.linkedin.com/in/andrescasoiglesias/)\n[GitHub](https://github.com/Andres-Caso-Iglesias)\n[Email](mailto:andrescasoiglesias@gmail.com)\n\n¿Hay algo más que quieras saber?",
      en: "Here are the links:\n\n[LinkedIn](https://www.linkedin.com/in/andrescasoiglesias/?locale=en-US)\n[GitHub](https://github.com/Andres-Caso-Iglesias)\n[Email](mailto:andrescasoiglesias@gmail.com)\n\nIs there anything else you'd like to know?",
    },
  },

  // ─── DISPONIBILIDAD: Agendar llamada ─────────────────────────
  {
    triggerTopic: "availability",
    affirmativeKeywords: [
      "sí",
      "si",
      "claro",
      "dale",
      "me gustaría",
      "gustaría",
      "quiero",
      "yes",
      "sure",
      "i'd like",
      "i would like",
    ],
    message: {
      es: "Perfecto. Puedes contactarme por [LinkedIn](https://www.linkedin.com/in/andrescasoiglesias/) o [email](mailto:andrescasoiglesias@gmail.com) para agendar una llamada. ¿Prefieres que te escriba yo o prefieres contactarme directamente?",
      en: "Perfect. You can reach me via [LinkedIn](https://www.linkedin.com/in/andrescasoiglesias/?locale=en-US) or [email](mailto:andrescasoiglesias@gmail.com) to schedule a call. Would you prefer me to write to you or contact me directly?",
    },
  },

  // ─── PROYECTOS: Ver detalles ────────────────────────────────
  {
    triggerTopic: "projects",
    affirmativeKeywords: [
      "sí",
      "si",
      "claro",
      "dale",
      "muéstrame",
      "muestrame",
      "ver",
      "quiero ver",
      "yes",
      "sure",
      "show me",
      "i want to see",
    ],
    message: {
      es: "Aquí tienes los enlaces a cada proyecto:\n\n<a href='https://andres-caso-iglesias.vercel.app/projects/bolsa-empleo' target='_blank' rel='noopener noreferrer' class='chat-link'>Bolsa de Empleo</a> - API NestJS + PostgreSQL con Swagger\n<a href='https://andres-caso-iglesias.vercel.app/projects/foodbites' target='_blank' rel='noopener noreferrer' class='chat-link'>FoodBites</a> - Backend Spring Boot + MySQL\n<a href='https://andres-caso-iglesias.vercel.app/projects/gestor-huertos' target='_blank' rel='noopener noreferrer' class='chat-link'>Gestor Huertos Urbanos</a> - Java Spring Boot + MySQL\n<a href='https://andres-caso-iglesias.vercel.app/projects/auditoria-web' target='_blank' rel='noopener noreferrer' class='chat-link'>Auditoria de Seguridad</a> - NestJS 11 + React 19\n<a href='https://github.com/Andres-Caso-Iglesias/portafolio' target='_blank' rel='noopener noreferrer' class='chat-link'>Portafolio</a> - Next.js 16 + React 19 + TypeScript\n\n¿Hay alguno que te interese especialmente?",
      en: "Here are the links to each project:\n\n<a href='https://andres-caso-iglesias.vercel.app/projects/bolsa-empleo' target='_blank' rel='noopener noreferrer' class='chat-link'>Bolsa de Empleo</a> - NestJS API + PostgreSQL with Swagger\n<a href='https://andres-caso-iglesias.vercel.app/projects/foodbites' target='_blank' rel='noopener noreferrer' class='chat-link'>FoodBites</a> - Spring Boot Backend + MySQL\n<a href='https://andres-caso-iglesias.vercel.app/projects/gestor-huertos' target='_blank' rel='noopener noreferrer' class='chat-link'>Gestor Huertos Urbanos</a> - Java Spring Boot + MySQL\n<a href='https://andres-caso-iglesias.vercel.app/projects/auditoria-web' target='_blank' rel='noopener noreferrer' class='chat-link'>Security Audit</a> - NestJS 11 + React 19\n<a href='https://github.com/Andres-Caso-Iglesias/portafolio' target='_blank' rel='noopener noreferrer' class='chat-link'>Portfolio</a> - Next.js 16 + React 19 + TypeScript\n\nIs there any that interests you especially?",
    },
  },

  // ─── HABILIDADES: Profundizar en alguna ─────────────────────
  {
    triggerTopic: "skills",
    affirmativeKeywords: [
      "sí",
      "si",
      "claro",
      "cuéntame",
      "cuentame",
      "háblame",
      "hablame",
      "yes",
      "sure",
      "tell me",
    ],
    message: {
      es: "¿Sobre cuál te gustaría saber más?\n\nC#/.NET, Java, TypeScript, React, Angular, NestJS, PostgreSQL, MongoDB, Docker, Azure, Git, o alguna otra en concreto?",
      en: "Which one would you like to know more about?\n\nC#/.NET, Java, TypeScript, React, Angular, NestJS, PostgreSQL, MongoDB, Docker, Azure, Git, or any other specific one?",
    },
  },

  // ─── CERTIFICACIONES: Cuáles tiene ──────────────────────────
  {
    triggerTopic: "certifications",
    affirmativeKeywords: [
      "cuáles",
      "cuales",
      "qué",
      "que",
      "cuáles son",
      "cuales son",
      "yes",
      "which",
      "what",
    ],
    message: {
      es: "Actualmente estoy trabajando hacia la certificación eJPT. Mi Máster en Ciberseguridad e IA me está preparando para esta y otras certificaciones. ¿Te gustaría saber más sobre mi formación?",
      en: "I'm currently working towards the eJPT certification. My Master's in Cybersecurity & AI is preparing me for this and other certifications. Would you like to know more about my education?",
    },
  },

  // ─── IDIOMAS: Nivel específico ──────────────────────────────
  {
    triggerTopic: "languages",
    affirmativeKeywords: [
      "cuál",
      "cual",
      "qué nivel",
      "que nivel",
      "how good",
      "what level",
      "which",
    ],
    message: {
      es: "Soy hispanohablante nativo (castellano). Mi nivel de inglés me permite trabajar en entornos técnicos internacionales, leer documentación y comunicarme con equipos. ¿Necesitas algún nivel específico?",
      en: "I'm a native Spanish speaker (Castilian). My English level allows me to work in international technical environments, read documentation, and communicate with teams. Do you need a specific level?",
    },
  },
];

// ──────────────────────────────────────────────────────────────
// Affirmative Response Keywords (for detecting "yes" type answers)
// ──────────────────────────────────────────────────────────────
export const affirmativeKeywords: string[] = [
  // Español
  "sí",
  "si",
  "claro",
  "dale",
  "por favor",
  "pf",
  "ok",
  "vale",
  "guay",
  "perfecto",
  "excelente",
  "genial",
  "por supuesto",
  "desde luego",
  "obvio",
  "ya",
  "ya quiero",
  "quiero",
  "me gustaría",
  "gustaría",
  // Inglés
  "yes",
  "yep",
  "yeah",
  "sure",
  "please",
  "ok",
  "okay",
  "definitely",
  "absolutely",
  "of course",
  "why not",
  "I'd like",
  "i would like",
  "I want",
  "want",
];

// ──────────────────────────────────────────────────────────────
// Quick Action Buttons
// ──────────────────────────────────────────────────────────────
export const quickActions: QuickAction[] = [
  {
    id: "experience",
    label: {
      es: "Experiencia",
      en: "Experience",
    },
    keywords: ["experiencia", "experience"],
  },
  {
    id: "skills",
    label: {
      es: "Habilidades",
      en: "Skills",
    },
    keywords: ["habilidades", "skills"],
  },
  {
    id: "education",
    label: {
      es: "Formación",
      en: "Education",
    },
    keywords: ["formación", "education"],
  },
  {
    id: "projects",
    label: {
      es: "Proyectos",
      en: "Projects",
    },
    keywords: ["proyectos", "projects"],
  },
  {
    id: "contact",
    label: {
      es: "Contacto",
      en: "Contact",
    },
    keywords: ["contacto", "contact"],
  },
  {
    id: "certifications",
    label: {
      es: "Certificaciones",
      en: "Certifications",
    },
    keywords: ["certificaciones", "certifications"],
  },
  {
    id: "languages",
    label: {
      es: "Idiomas",
      en: "Languages",
    },
    keywords: ["idiomas", "languages"],
  },
  {
    id: "about",
    label: {
      es: "Sobre mí",
      en: "About me",
    },
    keywords: ["sobre mí", "about me"],
  },
  {
    id: "security",
    label: {
      es: "Seguridad",
      en: "Security",
    },
    keywords: ["seguridad", "security"],
  },
  {
    id: "architecture",
    label: {
      es: "Arquitectura",
      en: "Architecture",
    },
    keywords: ["arquitectura", "architecture"],
  },
];

// ──────────────────────────────────────────────────────────────
// Default Fallback Response
// ──────────────────────────────────────────────────────────────
export const fallbackResponse: Record<Lang, string> = {
  es: "No estoy seguro de haber entendido tu pregunta. Puedo ayudarte con información sobre mi experiencia, habilidades, formación, proyectos, certificaciones, idiomas, seguridad, arquitectura, testing o contacto. ¿Qué te gustaría saber?",
  en: "I'm not sure I understood your question. I can help with information about my experience, skills, education, projects, certifications, languages, security, architecture, testing, or contact. What would you like to know?",
};

// ──────────────────────────────────────────────────────────────
// Welcome Message
// ──────────────────────────────────────────────────────────────
export const welcomeMessage: Record<Lang, string> = {
  es: "¡Hola! Soy el pinche de Andrés. Puedo responder preguntas sobre su perfil profesional. ¿Qué te gustaría saber?",
  en: "Hello! I'm Andrés' sous-chef. I can answer questions about his professional profile. What would you like to know?",
};
