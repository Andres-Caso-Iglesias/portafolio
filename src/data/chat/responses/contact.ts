import { type ChatResponse } from "../types";

export const contactResponse: ChatResponse = {
  id: "contact",
  keywords: [
    // Español - específicos
    "información de contacto",
    "datos de contacto",
    "cómo contactarte",
    "enlace linkedin",
    "perfil linkedin",
    "github perfil",
    "email contacto",
    "correo electrónico",
    // Inglés
    "contact information",
    "contact details",
    "how to contact",
    "linkedin profile",
    "github profile",
    "email address",
    "contact email",
  ],
  message: {
    es: "Puedes contactarme a través de LinkedIn o directamente por email. También tengo repositorios en GitHub con mis proyectos. ¿Te gustaría que te dé los enlaces?",
    en: "You can contact me through LinkedIn or directly via email. I also have GitHub repositories with my projects. Would you like me to provide the links?",
  },
};