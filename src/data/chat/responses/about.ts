import { type ChatResponse } from "../types";

export const aboutResponse: ChatResponse = {
  id: "about",
  keywords: [
    // Español - específicos
    "sobre andrés",
    "quién es andrés",
    "perfil profesional",
    "resumen perfil",
    "presentación personal",
    "cuéntame de ti",
    // Inglés
    "about andrés",
    "who is andrés",
    "professional profile",
    "profile summary",
    "personal introduction",
    "tell me about yourself",
  ],
  message: {
    es: "Soy Andrés Caso Iglesias, un profesional con casi 20 años de experiencia en hostelería y logística que realizó un giro hacia el desarrollo de software. Actualmente cursando un Máster en Ciberseguridad e IA. Mi objetivo es combinar mi experiencia en gestión con habilidades técnicas para crear soluciones innovadoras.",
    en: "I'm Andrés Caso Iglesias, a professional with nearly 20 years of experience in hospitality and logistics who made a transition into software development. Currently pursuing a Master's in Cybersecurity & AI. My goal is to combine management experience with technical skills to create innovative solutions.",
  },
};