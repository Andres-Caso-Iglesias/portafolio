import { type ChatResponse } from '../types';

export const futureResponse: ChatResponse = {
  id: 'future',
  keywords: [
    // Español - específicos
    'plan futuro carrera',
    'objetivos profesionales',
    'especialización arquitectura',
    'ciberseguridad aplicada',
    'corto plazo largo plazo',
    // Inglés
    'future career plan',
    'professional goals',
    'architecture specialization',
    'applied cybersecurity',
    'short term long term',
  ],
  message: {
    es: 'Mi plan a corto plazo es obtener la certificación eJPT y consolidarme como desarrollador fullstack. A largo plazo, me gustaría especializarme en arquitectura de software y ciberseguridad aplicada.',
    en: "My short-term plan is to obtain the eJPT certification and establish myself as a fullstack developer. Long-term, I'd like to specialize in software architecture and applied cybersecurity.",
  },
};
