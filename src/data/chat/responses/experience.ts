import { type ChatResponse } from '../types';

export const experienceResponse: ChatResponse = {
  id: 'experience',
  keywords: [
    // Español - palabras específicas (no genéricas)
    'experiencia laboral',
    'experiencia profesional',
    'trayectoria laboral',
    'historial laboral',
    'años de experiencia',
    'antigüedad laboral',
    'trabajos anteriores',
    'empleos anteriores',
    // Inglés
    'work experience',
    'professional experience',
    'work history',
    'years of experience',
    'employment history',
    'previous jobs',
    'career history',
  ],
  message: {
    es: 'Tengo casi 20 años de experiencia liderando equipos en hostelería y logística. Actualmente estoy cursando un Máster en Ciberseguridad e IA para obtener el eJPT. Mi giro hacia el desarrollo de software comenzó hace 3 años, y combino mi experiencia en gestión con habilidades técnicas en C#/.NET, Java y TypeScript.',
    en: "I have nearly 20 years of experience leading teams in hospitality and logistics. I'm currently pursuing a Master's in Cybersecurity & AI to obtain the eJPT. My transition into software development started 3 years ago, combining management experience with technical skills in C#/.NET, Java, and TypeScript.",
  },
};
