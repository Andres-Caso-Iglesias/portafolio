import { type ChatResponse } from '../types';

export const referencesResponse: ChatResponse = {
  id: 'references',
  keywords: [
    // Español - específicos
    'referencias profesionales',
    'recomendaciones laborales',
    'testimonios trabajo',
    'contactar antiguos jefes',
    // Inglés
    'professional references',
    'work recommendations',
    'work testimonials',
    'contact former bosses',
  ],
  message: {
    es: 'Puedo proporcionar referencias profesionales de mis anteriores empleadores y colegas. Mis supervisores en Mecalux, Quesería Lafuente y otros pueden dar fe de mi trabajo y compromiso. ¿Te gustaría que te contacte con alguno?',
    en: 'I can provide professional references from my previous employers and colleagues. My supervisors at Mecalux, Quesería Lafuente, and others can vouch for my work and commitment. Would you like me to connect you with any of them?',
  },
};
