import type { MetadataRoute } from 'next';
import { projects, projectWithoutDetailPage } from '@/data/projectsData';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          es: siteUrl,
          en: `${siteUrl}/?lang=en`,
        },
      },
    },
  ];

  const projectUrls: MetadataRoute.Sitemap = projects
    .filter(project => !projectWithoutDetailPage.has(project.slug))
    .map(project => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${siteUrl}/projects/${project.slug}?lang=es`,
          en: `${siteUrl}/projects/${project.slug}?lang=en`,
        },
      },
    }));

  return [...staticUrls, ...projectUrls];
}
