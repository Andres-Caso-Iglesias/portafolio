"use client";
import React, { useEffect, useState } from 'react'
import { projects, Project } from '@/data/projectsData'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import Modal from './Modal'
import { useGlobalLang } from '@/hooks/useGlobalLang'
import { t } from '@/i18n/locales'

export default function ProjectsGrid() {
  const { lang } = useGlobalLang()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  useEffect(() => {
    try {
      const v = localStorage.getItem('lang') as 'es'|'en' | null
      // Lang is managed by useLocale; this local state is deprecated but kept for compatibility
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _ = v
    } catch {}
  }, [])

  // Language changes are handled by useLocale context; no local listener needed here

  const displayName = (p: Project) => (lang === 'en' && p.enName) ? p.enName : p.name
  const displayDesc = (p: Project) => (lang === 'en' && p.enDescription) ? p.enDescription : p.description

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
      {projects.map((p) => (
        <motion.div layoutId={p.name} key={p.name} className="bg-slate-900 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer" onClick={() => setSelectedProject(p)}>
          <h3 className="text-xl font-semibold mb-2 text-white">{displayName(p)}</h3>
          <p className="text-slate-300 mb-4">{displayDesc(p)}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {p.tech.map((t: string) => (
              <span key={t} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">{t}</span>
            ))}
          </div>
          <a href={p.github} target="_blank" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">{t(lang, 'home.viewGithub')} →</a>
        </motion.div>
      ))}
      {selectedProject && createPortal(
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />,
        document.body
      )}
    </div>
  )
}
