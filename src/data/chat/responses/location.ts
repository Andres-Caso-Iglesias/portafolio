import { type ChatResponse } from '../types';

export const locationResponse: ChatResponse = {
  id: 'location',
  keywords: [
    // Español - específicos
    'dónde vives',
    'ubicación actual',
    'vives en asturias',
    'ciudad residencia',
    // Inglés
    'where do you live',
    'current location',
    'live in asturias',
    'city of residence',
  ],
  message: {
    es: 'Resido en Asturias, España. Estoy abierto a oportunidades presenciales en la zona, así como a posiciones remotas en cualquier parte de España o Europa.',
    en: "I live in Asturias, Spain. I'm open to onsite opportunities in the area, as well as remote positions anywhere in Spain or Europe.",
  },
};
