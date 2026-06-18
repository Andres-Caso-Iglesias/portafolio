import { type ChatResponse } from '../types';

export const projectsResponse: ChatResponse = {
  id: 'projects',
  keywords: [
    // Español - específicos
    'proyectos destacados',
    'lista de proyectos',
    'qué proyectos tienes',
    'proyectos realizados',
    'aplicaciones desarrolladas',
    'portfolio proyectos',
    // Inglés
    'featured projects',
    'list of projects',
    'what projects',
    'projects completed',
    'applications developed',
    'portfolio projects',
  ],
  message: {
    es: 'Mis proyectos destacados son:\n\nBolsa de Empleo - NestJS + PostgreSQL\nFoodBites - Spring Boot + MySQL\nGestor Huertos Urbanos - Java Spring Boot\nAuditoria de Seguridad - NestJS + React\nPortafolio - Next.js 16 + TypeScript\n\nEscribe el nombre de un proyecto para ver más detalles.',
    en: 'My featured projects are:\n\nBolsa de Empleo - NestJS + PostgreSQL\nFoodBites - Spring Boot + MySQL\nGestor Huertos Urbanos - Java Spring Boot\nSecurity Audit - NestJS + React\nPortfolio - Next.js 16 + TypeScript\n\nType a project name to see more details.',
  },
};
