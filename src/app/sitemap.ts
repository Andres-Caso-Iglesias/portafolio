import type { MetadataRoute } from "next";
import { projects } from "@/data/projectsData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://andres-caso-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          es: siteUrl,
          en: `${siteUrl}/?lang=en`,
        },
      },
    },
  ];

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
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
