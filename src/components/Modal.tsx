"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Project } from '@/data/projectsData';
import { useGlobalLang } from '@/hooks/useGlobalLang';

interface ModalProps {
  project: Project;
  onClose: () => void;
}

export default function Modal({ project, onClose }: ModalProps) {
  const { lang } = useGlobalLang();
  const [activeTab, setActiveTab] = useState<'challenge' | 'solution' | 'architecture' | 'snippets'>('challenge');
  const [snippetsContent, setSnippetsContent] = useState<{path: string, content: string}[]>([]);
  const [isLoadingSnippets, setIsLoadingSnippets] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (activeTab === 'snippets' && project.snippetPaths && project.snippetPaths.length > 0 && snippetsContent.length === 0) {
      setIsLoadingSnippets(true);
      Promise.all(
        project.snippetPaths.map(async (path) => {
          try {
            const res = await fetch(path);
            const text = await res.text();
            return { path, content: text };
          } catch (e) {
            return { path, content: 'Error loading snippet' };
          }
        })
      ).then(data => {
        setSnippetsContent(data);
        setIsLoadingSnippets(false);
      });
    }
  }, [activeTab, project.snippetPaths, snippetsContent.length]);

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

          <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-700 pb-2">
            <button
              onClick={() => setActiveTab('challenge')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === 'challenge' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {lang === 'en' ? 'Challenge' : 'Reto'}
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === 'solution' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {lang === 'en' ? 'Solution' : 'Solución'}
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === 'architecture' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {lang === 'en' ? 'Architecture' : 'Arquitectura'}
            </button>
            {project.snippetPaths && project.snippetPaths.length > 0 && (
              <button
                onClick={() => setActiveTab('snippets')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeTab === 'snippets' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {lang === 'en' ? 'Code Snippets' : 'Snippets de Código'}
              </button>
            )}
          </div>

          <div className="text-slate-300 text-sm">
            {activeTab === 'challenge' && (
              <div className="prose prose-invert max-w-none">
                <p>{lang === 'en' ? (project.enChallenge || 'No content.') : (project.challenge || 'Sin contenido.')}</p>
              </div>
            )}
            {activeTab === 'solution' && (
              <div className="prose prose-invert max-w-none">
                <p>{lang === 'en' ? (project.enSolution || 'No content.') : (project.solution || 'Sin contenido.')}</p>
              </div>
            )}
            {activeTab === 'architecture' && (
              <div className="prose prose-invert max-w-none">
                <p>{lang === 'en' ? (project.enArchitecture || 'No content.') : (project.architecture || 'Sin contenido.')}</p>
              </div>
            )}
            {activeTab === 'snippets' && (
              <div className="space-y-6 mt-4">
                {isLoadingSnippets ? (
                  <p className="animate-pulse">{lang === 'en' ? 'Loading snippets...' : 'Cargando snippets...'}</p>
                ) : (
                  snippetsContent.map((snippet, idx) => (
                    <div key={idx} className="bg-[#0f172a] rounded-lg border border-slate-700 overflow-hidden shadow-lg">
                      <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                        <span className="text-xs font-mono text-blue-400">
                          {snippet.path.split('/').pop()}
                        </span>
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                        </div>
                      </div>
                      <div className="p-4 overflow-x-auto text-xs sm:text-sm text-slate-300 font-mono leading-relaxed bg-[#0d1117]">
                        <pre><code>{snippet.content}</code></pre>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
