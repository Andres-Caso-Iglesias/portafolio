'use client';

import { useState } from 'react';
import { projects, Project } from '@/data/projectsData';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import { useLanguage, t } from '@/lib/i18n';

export default function ProjectsGrid() {
  const { lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const loopProjects = [...projects, ...projects];

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

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.animationPlayState = 'paused';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.animationPlayState = 'running';
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
        }
      `}</style>
      <div
        className="overflow-hidden w-full"
        role="region"
        aria-label={lang === 'en' ? 'Projects' : 'Proyectos'}
      >
        <div
          className="flex gap-6 marquee-track"
          style={{
            animation: 'marquee 30s linear infinite',
            width: 'max-content',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {loopProjects.map((p, i) => (
            <article
              key={`${p.slug}-${i}`}
              className="flex-none w-[280px] min-h-[500px] bg-white dark:bg-slate-900 rounded-lg p-6 border border-neutral-200 dark:border-slate-700 hover:border-blue-500 transition-colors cursor-pointer flex flex-col justify-between"
              onClick={() => handleProjectClick(p)}
              onKeyDown={e => handleCardKeyDown(e, p)}
              tabIndex={0}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role="button"
              aria-label={`${displayName(p)} - ${displayDesc(p)}`}
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white leading-tight">{displayName(p)}</h3>
                <p className="text-neutral-700 dark:text-slate-300 leading-relaxed line-clamp-5">{displayDesc(p)}</p>
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
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                {t(lang, 'home.viewGithub')} →
              </a>
            </article>
          ))}
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
