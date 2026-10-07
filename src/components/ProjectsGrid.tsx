'use client';

import { useState } from 'react';
import Link from 'next/link';
import { featuredProjects, marqueeProjects, Project } from '@/data/projectsData';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import { useLanguage, t } from '@/lib/i18n';

const MARQUEE_COPIES = 4;
const MARQUEE_DURATION_S = 60;

const LINK_PILL = [
  'inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors',
  'border-blue-500 dark:border-blue-500',
  'text-blue-700 dark:text-blue-400',
  'hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-600/10 dark:hover:text-blue-300',
].join(' ');

const FOCUS_RING = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-blue-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white',
  'dark:focus-visible:ring-offset-slate-900',
].join(' ');

export default function ProjectsGrid() {
  const { lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const loopProjects = Array.from({ length: MARQUEE_COPIES }, () => marqueeProjects).flat();

  const displayName = (p: Project) => (lang === 'en' && p.enName ? p.enName : p.name);
  const displayDesc = (p: Project) =>
    lang === 'en' && p.enDescription ? p.enDescription : p.description;

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedProject(project);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.currentTarget.style.animationPlayState = 'paused';
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.currentTarget.style.animationPlayState = '';
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track:hover,
        .marquee-track:focus-within {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
          .marquee-viewport {
            overflow-x: auto !important;
          }
        }
      `}</style>

      <p
        id="projects-featured-label"
        className="max-w-4xl mx-auto mb-4 text-lg min-[1440px]:text-xl font-semibold text-neutral-600 dark:text-slate-400"
      >
        {t(lang, 'home.featuredLabel')}
      </p>

      <div
        role="region"
        aria-labelledby="projects-featured-label"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {featuredProjects.map(p => {
          const visibleLinks = (p.links ?? []).filter(link => !link.detailOnly);
          const hasCtaContent =
            Boolean(p.github) || visibleLinks.length > 0 || Boolean(p.statusNote);

          return (
            <article
              key={p.slug}
              className="relative flex flex-col justify-between min-h-[420px] bg-white dark:bg-slate-900 rounded-lg p-6 border border-neutral-200 dark:border-slate-700 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 transition-colors"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-xl min-[1440px]:text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {displayName(p)}
                    <span className="after:absolute after:inset-0 after:content-['']" />
                  </Link>
                </h3>
                <p className="text-neutral-700 dark:text-slate-300 leading-relaxed line-clamp-5">
                  {displayDesc(p)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {hasCtaContent && (
                <div className="flex flex-wrap items-center gap-4 mt-6">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative z-10 ${LINK_PILL}`}
                    >
                      {t(lang, 'home.viewGithub')}
                    </a>
                  )}
                  {visibleLinks.map(link => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative z-10 ${LINK_PILL}`}
                    >
                      {lang === 'en' && link.enLabel ? link.enLabel : link.label}
                    </a>
                  ))}
                  {p.statusNote && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs border bg-neutral-100 border-neutral-200 text-neutral-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                      {lang === 'en' && p.enStatusNote ? p.enStatusNote : p.statusNote}
                    </span>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <p
        id="projects-more-label"
        className="max-w-4xl mx-auto mb-4 text-lg min-[1440px]:text-xl font-semibold text-neutral-600 dark:text-slate-400"
      >
        {t(lang, 'home.moreProjectsLabel')}
      </p>

      <div
        className="marquee-viewport overflow-hidden w-full"
        role="region"
        aria-labelledby="projects-more-label"
      >
        <div
          className="flex gap-6 marquee-track"
          style={{
            animation: `marquee ${MARQUEE_DURATION_S}s linear infinite`,
            animationPlayState: selectedProject ? 'paused' : undefined,
            width: 'max-content',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {loopProjects.map((p, i) => {
            const isClone = i >= marqueeProjects.length;
            const visibleLinks = (p.links ?? []).filter(link => !link.detailOnly);

            return (
              <article
                key={`${p.slug}-${i}`}
                aria-hidden={isClone ? true : undefined}
                className={`flex-none w-[280px] min-h-[500px] bg-white dark:bg-slate-900 rounded-lg p-6 border border-neutral-200 dark:border-slate-700 hover:border-blue-500 transition-colors cursor-pointer flex flex-col justify-between ${FOCUS_RING}`}
                onClick={() => handleProjectClick(p)}
                onKeyDown={e => handleCardKeyDown(e, p)}
                tabIndex={isClone ? -1 : 0}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="button"
                aria-label={
                  p.statusNote
                    ? `${displayName(p)} - ${displayDesc(p)}. ${
                        lang === 'en' && p.enStatusNote ? p.enStatusNote : p.statusNote
                      }`
                    : `${displayName(p)} - ${displayDesc(p)}`
                }
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
                    {displayName(p)}
                  </h3>
                  <p className="text-neutral-700 dark:text-slate-300 leading-relaxed line-clamp-5">
                    {displayDesc(p)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isClone ? -1 : undefined}
                      className={`relative z-10 ${LINK_PILL}`}
                      onClick={e => e.stopPropagation()}
                    >
                      {t(lang, 'home.viewGithub')}
                    </a>
                  )}
                  {visibleLinks.map(link => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isClone ? -1 : undefined}
                      className={`relative z-10 ${LINK_PILL}`}
                      onClick={e => e.stopPropagation()}
                    >
                      {lang === 'en' && link.enLabel ? link.enLabel : link.label}
                    </a>
                  ))}
                  {p.statusNote && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs border bg-neutral-100 border-neutral-200 text-neutral-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                      {lang === 'en' && p.enStatusNote ? p.enStatusNote : p.statusNote}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      {selectedProject &&
        createPortal(
          <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />,
          document.body
        )}
    </>
  );
}
