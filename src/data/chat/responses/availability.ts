import { type ChatResponse } from '../types';

export const availabilityResponse: ChatResponse = {
  id: 'availability',
  keywords: [
    // Español - específicos (más específicos primero)
    'disponibilidad laboral inmediata',
    'disponibilidad para trabajar',
    'disponible para trabajar',
    'busco empleo',
    'busco trabajo',
    'contratación inmediata',
    'disponibilidad inmediata',
    'trabajo remoto',
    'empleo híbrido',
    'disponibilidad laboral',
    'inmediatamente disponible',
    'seeking employment',
    // Inglés
    'job availability',
    'available for work',
    'looking for job',
    'immediate availability',
    'remote work',
    'hybrid work',
    'hiring now',
    'immediately available',
  ],
  message: {
    es: 'Estoy disponible para oportunidades laborales, tanto presenciales en España como en remoto, y no tendría ningún inconveniente en recolocar mi lugar de residencia. Mi disponibilidad es inmediata. ¿Te gustaría agendar una llamada para conversar sobre oportunidades?',
    en: "I'm available for job opportunities, both onsite in Spain and remote, and I would have no issue relocating. My availability is immediate. Would you like to schedule a call to discuss opportunities?",
  },
};
