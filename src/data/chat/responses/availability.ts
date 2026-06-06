import { type ChatResponse } from "../types";

export const availabilityResponse: ChatResponse = {
  id: "availability",
  keywords: [
    // Español - específicos
    "disponibilidad laboral",
    "disponible para trabajar",
    "busco empleo",
    "busco trabajo",
    "contratación inmediata",
    "disponibilidad inmediata",
    "trabajo remoto",
    "empleo híbrido",
    // Inglés
    "job availability",
    "available for work",
    "looking for job",
    "immediate availability",
    "remote work",
    "hybrid work",
    "hiring now",
  ],
  message: {
    es: "Estoy disponible para oportunidades laborales, tanto presenciales en España como en remoto. Mi disponibilidad es inmediata. ¿Te gustaría agendar una llamada para conversar sobre oportunidades?",
    en: "I'm available for job opportunities, both onsite in Spain and remote. My availability is immediate. Would you like to schedule a call to discuss opportunities?",
  },
};