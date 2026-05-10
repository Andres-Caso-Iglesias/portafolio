"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Project } from '@/data/projectsData';
import { useGlobalLang } from '@/hooks/useGlobalLang';
import { t } from '@/i18n/locales';

interface ModalProps {
  project: Project;
  onClose: () => void;
}

export default function Modal({ project, onClose }: ModalProps) {
  const { lang } = useGlobalLang();
  const [activeTab, setActiveTab] = useState<'challenge' | 'solution' | 'architecture'>('challenge');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          layoutId={project.name}
          className="relative z-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-slate-900 rounded-xl p-8 m-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors text-xl"
          >
            &times;
          </button>
          
          <h2 className="text-2xl font-semibold mb-2 text-white">
            {lang === 'en' && project.enName ? project.enName : project.name}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {lang === 'en' && project.enDescription ? project.enDescription : project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech: string) => (
              <span key={tech} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('challenge')}
              className={`px-3 py-1 text-xs rounded ${
                activeTab === 'challenge' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {lang === 'en' ? 'Challenge' : 'Reto'}
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-3 py-1 text-xs rounded ${
                activeTab === 'solution' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {lang === 'en' ? 'Solution' : 'Solución'}
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1 text-xs rounded ${
                activeTab === 'architecture' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {lang === 'en' ? 'Architecture' : 'Arquitectura'}
            </button>
          </div>

          <div className="text-slate-300 text-sm">
            {activeTab === 'challenge' && (
              <p>{lang === 'en' ? (project.enChallenge || 'No content.') : (project.challenge || 'Sin contenido.')}</p>
            )}
            {activeTab === 'solution' && (
              <p>{lang === 'en' ? (project.enSolution || 'No content.') : (project.solution || 'Sin contenido.')}</p>
            )}
            {activeTab === 'architecture' && (
              <p>{lang === 'en' ? (project.enArchitecture || 'No content.') : (project.architecture || 'Sin contenido.')}</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
