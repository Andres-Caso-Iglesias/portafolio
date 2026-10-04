import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/data/projectsData';
import { loadSnippetsServer } from '@/lib/snippetLoader';
import { getLangFromCookie } from '@/lib/i18n-server';
import { t } from '@/lib/translate';
import SnippetViewer from '@/components/SnippetViewer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andres-caso-portfolio.vercel.app';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  const lang = await getLangFromCookie();

  if (!project) {
    return { title: 'Proyecto no encontrado' };
  }

  const name = lang === 'en' && project.enName ? project.enName : project.name;
  const description =
    lang === 'en' && project.enDescription ? project.enDescription : project.description;

  return {
    title: name,
    description,
    keywords: project.tech,
    openGraph: {
      type: 'article',
      locale: 'es_ES',
      alternateLocale: ['en_US'],
      url: `${siteUrl}/projects/${slug}`,
      title: name,
      description,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: ['/opengraph-image'],
    },
    alternates: {
      canonical: `${siteUrl}/projects/${slug}`,
    },
  };
}

const FOCUS_RING = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-blue-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white',
  'dark:focus-visible:ring-offset-slate-900',
].join(' ');

const SECTION_TITLE =
  'text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white';

const PANEL =
  'rounded-lg border border-neutral-200 dark:border-slate-700 bg-neutral-50 dark:bg-slate-800';

const ACCENT_PANEL = 'rounded-lg border-l-4 border-blue-500 bg-neutral-50 dark:bg-slate-800';

const BODY = 'text-neutral-700 dark:text-slate-300 text-lg leading-relaxed';

const PRIMARY_CTA = [
  'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium',
  'bg-blue-600 dark:bg-blue-600 text-white dark:text-white',
  'hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors',
  FOCUS_RING,
].join(' ');

const SECONDARY_CTA = [
  'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium',
  'bg-neutral-900 dark:bg-slate-700 text-white dark:text-white',
  'hover:bg-neutral-700 dark:hover:bg-slate-600 transition-colors',
  FOCUS_RING,
].join(' ');

const GHOST_CTA = [
  'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium',
  'border border-neutral-300 dark:border-slate-600',
  'text-neutral-900 dark:text-white',
  'hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors',
  FOCUS_RING,
].join(' ');

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  const lang = await getLangFromCookie();
  const isEn = lang === 'en';

  const name = isEn && project.enName ? project.enName : project.name;
  const description = isEn && project.enDescription ? project.enDescription : project.description;
  const challenge = isEn && project.enChallenge ? project.enChallenge : project.challenge;
  const solution = isEn && project.enSolution ? project.enSolution : project.solution;
  const architecture =
    isEn && project.enArchitecture ? project.enArchitecture : project.architecture;

  const snippets =
    project.snippetPaths && project.snippetPaths.length > 0
      ? await loadSnippetsServer(project.snippetPaths)
      : [];

  const apiDocFile = project.apiDocPath ? (project.apiDocPath.split('/').pop() ?? '') : '';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <header className="mb-10 pb-8 border-b border-neutral-200 dark:border-slate-700">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {name}
        </h1>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-slate-300">
          {description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map(tech => (
            <li
              key={tech}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 rounded text-xs"
            >
              {tech}
            </li>
          ))}
        </ul>
      </header>

      <section className="space-y-10">
        {project.erdPath && (
          <section>
            <h2 className={`${SECTION_TITLE} mb-4`}>{t(lang, 'project.erdTitle')}</h2>
            <div className="rounded-lg border border-neutral-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
              <Image
                src={project.erdPath}
                alt={`${name} ERD`}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </section>
        )}

        {project.apiDocPath && (
          <section>
            <h2 className={`${SECTION_TITLE} mb-4`}>{t(lang, 'project.apiDocTitle')}</h2>
            <a
              href={project.apiDocPath}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 text-neutral-700 dark:text-slate-300 transition-colors hover:bg-neutral-100 dark:hover:bg-slate-700 ${PANEL} ${FOCUS_RING}`}
            >
              {t(lang, 'project.viewApiSpec', { file: apiDocFile })}
            </a>
          </section>
        )}

        {project.snippetPaths && project.snippetPaths.length > 0 && (
          <section>
            <h2 className={`${SECTION_TITLE} mb-4`}>{t(lang, 'project.snippetsTitle')}</h2>
            <SnippetViewer snippets={snippets} />
          </section>
        )}

        {project.dockerCompose && (
          <section>
            <h2 className={`${SECTION_TITLE} mb-4`}>{t(lang, 'project.dockerTitle')}</h2>
            <div className={`${PANEL} p-5`}>
              <p className="font-semibold text-neutral-900 dark:text-white">
                {t(lang, 'project.dockerIntro')}
              </p>
              <ul className="mt-3 list-disc list-inside space-y-2 text-neutral-700 dark:text-slate-300">
                <li>{t(lang, 'project.dockerMysql')}</li>
                <li>{t(lang, 'project.dockerPostgres')}</li>
                <li>{t(lang, 'project.dockerBackend')}</li>
              </ul>
              <p className="mt-3 text-sm text-neutral-600 dark:text-slate-400">
                {t(lang, 'project.dockerSeePrefix')}{' '}
                <code className="bg-neutral-200 dark:bg-slate-700 text-neutral-800 dark:text-white px-1 rounded">
                  docker-compose.yml
                </code>{' '}
                {t(lang, 'project.dockerSeeSuffix')}
              </p>
            </div>
          </section>
        )}
      </section>

      <section className="mt-12 space-y-6">
        {challenge && (
          <div className={`${ACCENT_PANEL} p-6`}>
            <h2 className={SECTION_TITLE}>{t(lang, 'project.challenge')}</h2>
            <p className={`mt-3 ${BODY}`}>{challenge}</p>
          </div>
        )}
        {solution && (
          <div className={`${ACCENT_PANEL} p-6`}>
            <h2 className={SECTION_TITLE}>{t(lang, 'project.solution')}</h2>
            <p className={`mt-3 ${BODY}`}>{solution}</p>
          </div>
        )}
        {architecture && (
          <div className={`${ACCENT_PANEL} p-6`}>
            <h2 className={SECTION_TITLE}>{t(lang, 'project.architecture')}</h2>
            <p className={`mt-3 ${BODY}`}>{architecture}</p>
          </div>
        )}
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={PRIMARY_CTA}
          >
            {t(lang, 'project.github')}
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={SECONDARY_CTA}
          >
            {t(lang, 'project.live')}
          </a>
        )}
        {project.links?.map(link => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={GHOST_CTA}
          >
            {isEn && link.enLabel ? link.enLabel : link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
