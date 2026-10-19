import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies } from '@/data/caseStudiesData';
import { getLangFromCookie } from '@/lib/i18n-server';
import { t } from '@/lib/translate';
import BackButton from '@/components/BackButton';
import { siteUrl } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find(cs => cs.slug === slug);
  const lang = await getLangFromCookie();

  if (!caseStudy) {
    return { title: 'Case study not found' };
  }

  const title = lang === 'en' ? caseStudy.title.en : caseStudy.title.es;
  const description = lang === 'en' ? caseStudy.subtitle.en : caseStudy.subtitle.es;

  return {
    title,
    description,
    keywords: caseStudy.tech,
    openGraph: {
      type: 'article',
      locale: lang === 'en' ? 'en_US' : 'es_ES',
      alternateLocale: [lang === 'en' ? 'es_ES' : 'en_US'],
      url: `${siteUrl}/case-studies/${slug}`,
      title,
      description,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
    alternates: {
      canonical: `${siteUrl}/case-studies/${slug}`,
    },
  };
}

const SECTION_TITLE =
  'text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white';

const PANEL =
  'rounded-lg border border-neutral-200 dark:border-slate-700 bg-neutral-50 dark:bg-slate-800';

const ACCENT_PANEL = 'rounded-lg border-l-4 border-blue-500 bg-neutral-50 dark:bg-slate-800';

const BODY = 'text-neutral-700 dark:text-slate-300 text-lg leading-relaxed';

const MEASURE = 'max-w-prose';

const DECISION_NUM =
  'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white';

const RESULT_BULLET =
  'mt-0.5 flex h-2 w-2 shrink-0 items-center justify-center rounded-full bg-emerald-500 mt-3';

const LESSON_BULLET =
  'mt-0.5 flex h-2 w-2 shrink-0 items-center justify-center rounded-full bg-amber-500 mt-3';

const FOCUS_RING = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-blue-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white',
  'dark:focus-visible:ring-offset-slate-900',
].join(' ');

const GHOST_CTA = [
  'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium',
  'border border-neutral-300 dark:border-slate-600',
  'text-neutral-900 dark:text-white',
  'hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors',
  FOCUS_RING,
].join(' ');

const PRIMARY_CTA = [
  'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium',
  'bg-blue-600 dark:bg-blue-600 text-white dark:text-white',
  'hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors',
  FOCUS_RING,
].join(' ');

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = caseStudies.find(cs => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const lang = await getLangFromCookie();
  const isEn = lang === 'en';

  const title = isEn ? caseStudy.title.en : caseStudy.title.es;
  const subtitle = isEn ? caseStudy.subtitle.en : caseStudy.subtitle.es;
  const context = isEn ? caseStudy.context.en : caseStudy.context.es;
  const problem = isEn ? caseStudy.problem.en : caseStudy.problem.es;
  const architecture = isEn ? caseStudy.architecture.en : caseStudy.architecture.es;

  const diagramAlt =
    (isEn ? caseStudy.erdAlt?.en : caseStudy.erdAlt?.es) ?? `${title} architecture`;

  return (
    <main className="px-4 sm:px-6 pt-28 pb-20">
      <BackButton />
      <header className="mb-10 pb-8 border-b border-neutral-200 dark:border-slate-700">
        <p className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {t(lang, 'caseStudy.caseStudyBadge')}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white text-center text-balance">
          {title}
        </h1>
        <p
          className={`mt-4 ${MEASURE} mx-auto text-center text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-slate-300`}
        >
          {subtitle}
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {caseStudy.tech.map(tech => (
            <li
              key={tech}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 rounded text-xs"
            >
              {tech}
            </li>
          ))}
        </ul>
      </header>

      <div className="space-y-6">
        <section className={`${PANEL} p-6`}>
          <h2 className={SECTION_TITLE}>{t(lang, 'caseStudy.contextTitle')}</h2>
          <p className={`mt-3 ${MEASURE} ${BODY}`}>{context}</p>
        </section>

        <section className={`${ACCENT_PANEL} p-6`}>
          <h2 className={SECTION_TITLE}>{t(lang, 'caseStudy.problemTitle')}</h2>
          <p className={`mt-3 ${MEASURE} ${BODY}`}>{problem}</p>
        </section>

        <section className={`${PANEL} p-6`}>
          <h2 className={SECTION_TITLE}>{t(lang, 'caseStudy.decisionsTitle')}</h2>
          <ol className="mt-4 space-y-5">
            {caseStudy.decisions.map((decision, index) => {
              const decisionTitle = isEn ? decision.title.en : decision.title.es;
              const decisionBody = isEn ? decision.body.en : decision.body.es;
              return (
                <li key={decisionTitle} className="flex gap-3">
                  <span className={DECISION_NUM} aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {decisionTitle}
                    </h3>
                    <p className={`mt-1 ${MEASURE} ${BODY}`}>{decisionBody}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={`${PANEL} p-6`}>
          <h2 className={SECTION_TITLE}>{t(lang, 'caseStudy.architectureTitle')}</h2>
          <p className={`mt-3 ${MEASURE} ${BODY}`}>{architecture}</p>
          {caseStudy.erdPath && (
            <figure className="mt-6">
              <div className="rounded-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
                <Image
                  src={caseStudy.erdPath}
                  alt={diagramAlt}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
              {(isEn ? caseStudy.erdCaption?.en : caseStudy.erdCaption?.es) && (
                <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-slate-400">
                  {isEn ? caseStudy.erdCaption?.en : caseStudy.erdCaption?.es}
                </figcaption>
              )}
            </figure>
          )}
        </section>

        <section className={`${PANEL} p-6`}>
          <h2 className={SECTION_TITLE}>{t(lang, 'caseStudy.resultsTitle')}</h2>
          <ul className="mt-4 space-y-3">
            {caseStudy.results.map(result => {
              const resultText = isEn ? result.en : result.es;
              return (
                <li key={resultText} className="flex gap-3">
                  <span className={RESULT_BULLET} aria-hidden="true" />
                  <p className={`${MEASURE} ${BODY}`}>{resultText}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={`${ACCENT_PANEL} p-6`}>
          <h2 className={SECTION_TITLE}>{t(lang, 'caseStudy.lessonsTitle')}</h2>
          <ul className="mt-4 space-y-3">
            {caseStudy.lessons.map(lesson => {
              const lessonText = isEn ? lesson.en : lesson.es;
              return (
                <li key={lessonText} className="flex gap-3">
                  <span className={LESSON_BULLET} aria-hidden="true" />
                  <p className={`${MEASURE} ${BODY}`}>{lessonText}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <footer className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href={`/projects/${caseStudy.slug}`} className={GHOST_CTA}>
          {t(lang, 'caseStudy.backToProject')}
        </Link>
        {caseStudy.links.map(link => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={PRIMARY_CTA}
          >
            {isEn ? link.label.en : link.label.es}
          </a>
        ))}
      </footer>
    </main>
  );
}
