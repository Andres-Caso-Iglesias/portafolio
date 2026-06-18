import { type ChatResponse } from '../types';

export const motivationResponse: ChatResponse = {
  id: 'motivation',
  keywords: [
    // Español - específicos
    'motivación cambio',
    'por qué desarrollo',
    'razón giro carrera',
    'objetivo profesional',
    'pasión programación',
    // Inglés
    'motivation change',
    'why development',
    'reason career change',
    'professional goal',
    'passion programming',
  ],
  message: {
    es: 'Mi motivación es crear soluciones tecnológicas que hagan la vida más fácil. Después de 20 años en hostelería, descubrí que mi pasión está en resolver problemas con código. Cada proyecto nuevo es un reto que me impulsa a aprender más.',
    en: 'My motivation is creating technological solutions that make life easier. After 20 years in hospitality, I discovered that my passion lies in solving problems with code. Every new project is a challenge that drives me to learn more.',
  },
};
