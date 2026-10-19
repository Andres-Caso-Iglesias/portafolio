import { type ChatResponse } from '../types';

export const projectVulnprioResponse: ChatResponse = {
  id: 'project-vulnprio',
  keywords: [
    'vulnprio',
    'vuln prio',
    'priorizacion vulnerabilidades',
    'vulnerability prioritization',
    'priorizar cve',
    'cve prioritization',
    'sas vulnerabilidades',
    'nis2 pymes',
    'nis2 smes',
    'tfg vulnerabilidades',
  ],
  message: {
    es: 'VulnPrio - Plataforma de Priorización de Vulnerabilidades (Turborepo, Next.js, PostgreSQL). SaaS multi-tenant para PYMEs: pipeline de 5 etapas (SBOM, enriquecimiento OSV/NVD/EPSS/KEV, scoring determinístico, IA con Claude como capa de explicación, persistencia), 24 servicios backend, 11 tablas, billing Stripe con 4 tiers y compliance NIS2+ENS. Proyecto de fin de máster.',
    en: 'VulnPrio - Vulnerability Prioritization Platform (Turborepo, Next.js, PostgreSQL). Multi-tenant SaaS for SMEs: 5-stage pipeline (SBOM, OSV/NVD/EPSS/KEV enrichment, deterministic scoring, Claude AI as explanation layer, persistence), 24 backend services, 11 tables, Stripe billing with 4 tiers, and NIS2+ENS compliance. Master thesis project.',
  },
};
