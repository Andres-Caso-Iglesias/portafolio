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
    es: 'Mis proyectos destacados son:\n\nQReaper - Analisis Anti-Quishing (Python, Playwright)\nVulnPrio - Plataforma de Priorización de Vulnerabilidades (Turborepo, Next.js, PostgreSQL)\nSecurity Header Scanner & Quick Assessment Tool (NestJS 11, React 19)\n\nEscribe el nombre de un proyecto para ver más detalles.',
    en: 'My featured projects are:\n\nQReaper - Anti-Phishing Analysis (Python, Playwright)\nVulnPrio - Vulnerability Prioritization Platform (Turborepo, Next.js, PostgreSQL)\nSecurity Header Scanner & Quick Assessment Tool (NestJS 11, React 19)\n\nType a project name to see more details.',
  },
};
