import { Lang } from "@/i18n/types";
import { type FollowUpResponse } from "./types";

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
      // Inglés
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
      es: "Aquí tienes los enlaces a cada proyecto:\n\n[Bolsa de Empleo](https://andres-caso-iglesias.vercel.app/projects/bolsa-empleo) - API NestJS + PostgreSQL con Swagger\n[FoodBites](https://andres-caso-iglesias.vercel.app/projects/foodbites) - Backend Spring Boot + MySQL\n[Gestor Huertos Urbanos](https://andres-caso-iglesias.vercel.app/projects/gestor-huertos) - Java Spring Boot + MySQL\n[Auditoria de Seguridad](https://andres-caso-iglesias.vercel.app/projects/auditoria-web) - NestJS 11 + React 19\n[Portafolio](https://github.com/Andres-Caso-Iglesias/portafolio) - Next.js 16 + React 19 + TypeScript\n\n¿Hay alguno que te interese especialmente?",
      en: "Here are the links to each project:\n\n[Bolsa de Empleo](https://andres-caso-iglesias.vercel.app/projects/bolsa-empleo) - NestJS API + PostgreSQL with Swagger\n[FoodBites](https://andres-caso-iglesias.vercel.app/projects/foodbites) - Spring Boot Backend + MySQL\n[Gestor Huertos Urbanos](https://andres-caso-iglesias.vercel.app/projects/gestor-huertos) - Java Spring Boot + MySQL\n[Security Audit](https://andres-caso-iglesias.vercel.app/projects/auditoria-web) - NestJS 11 + React 19\n[Portfolio](https://github.com/Andres-Caso-Iglesias/portafolio) - Next.js 16 + React 19 + TypeScript\n\nIs there any that interests you especially?",
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
      es: "Soy bilingüe nativo español-inglés. Mi familia es bilingüe, trabajé en UK y el inglés es mi idioma cotidiano. ¿Necesitas algún nivel específico o certificación?",
      en: "I'm a bilingual native Spanish-English speaker. My family is bilingual, I've worked in the UK, and English is my daily language. Do you need a specific level or certification?",
    },
  },
];