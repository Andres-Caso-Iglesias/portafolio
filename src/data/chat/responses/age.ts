import { type ChatResponse } from '../types';

export const ageResponse: ChatResponse = {
  id: 'age',
  keywords: [
    // Español - específicos
    'cuántos años tienes',
    'edad actual',
    'años tienes',
    'qué edad',
    // Inglés
    'how old are you',
    'current age',
    'what age',
    'years old',
  ],
  message: {
    es: 'Tengo 40 años y estoy en un momento profesional de crecimiento. Mi edad es una ventaja: combino la madurez y experiencia de casi 20 años liderando equipos con la energía y curiosidad de alguien que está aprendiendo un nuevo oficio.',
    en: "I'm 40 years old and I'm in a moment of professional growth. My age is an advantage: I combine the maturity and experience of nearly 20 years leading teams with the energy and curiosity of someone learning a new trade.",
  },
};
