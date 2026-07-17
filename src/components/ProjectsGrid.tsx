'use client';

import { useState } from 'react';
import { projects, Project } from '@/data/projectsData';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import { useLanguage, t } from '@/lib/i18n';

export default function ProjectsGrid() {
  const { lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const displayName = (p: Project) => (lang === 'en' && p.enName ? p.enName : p.name);
  const displayDesc = (p: Project) =>
    lang === 'en' && p.enDescription ? p.enDescription : p.description;

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedProject(project);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
      {projects.map((p) => (
        <article
          key={p.slug}
          className="bg-slate-900 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer"
          onClick={() => handleProjectClick(p)}
          onKeyDown={(e) => handleKeyDown(e, p)}
          tabIndex={0}
          role="button"
          aria-label={`${displayName(p)} - ${displayDesc(p)}`}
        >
          <h3 className="text-xl font-semibold mb-2 text-white">{displayName(p)}</h3>
          <p className="text-slate-300 mb-4">{displayDesc(p)}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {p.tech.map((tech: string) => (
              <span key={tech} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            {t(lang, 'home.viewGithub')} →
          </a>
        </article>
      ))}
      {selectedProject &&
        createPortal(
          <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />,
          document.body
        )}
    </div>
  );
}