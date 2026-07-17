'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Project } from '@/data/projectsData';
import { useLanguage } from '@/lib/i18n';
import { loadSnippetsClient, type Snippet } from '@/lib/snippetLoaderClient';
import SnippetViewer from '@/components/SnippetViewer';

interface ModalProps {
  project: Project;
  onClose: () => void;
}

export default function Modal({ project, onClose }: ModalProps) {
  const { lang } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'challenge' | 'solution' | 'architecture' | 'snippets'
  >('challenge');
  const [snippetsContent, setSnippetsContent] = useState<Snippet[]>([]);
  const [isLoadingSnippets, setIsLoadingSnippets] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    setActiveTab('challenge');
    onClose();
  }, [onClose]);

  const handleTabChange = useCallback(
    (tab: 'challenge' | 'solution' | 'architecture' | 'snippets') => {
      setActiveTab(tab);
      if (tab === 'snippets' && snippetsContent.length === 0 && !isLoadingSnippets) {
        setIsLoadingSnippets(true);
        loadSnippetsClient(project.snippetPaths || []).then((snippets) => {
          setSnippetsContent(snippets);
          setIsLoadingSnippets(false);
        });
      }
    },
    [project.snippetPaths, snippetsContent.length, isLoadingSnippets]
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  if (!isMounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm z-10 rounded-t-xl">
          <h2 id="modal-title" className="text-xl font-semibold text-white">
            {lang === 'en' && project.enName ? project.enName : project.name}
          </h2>
          <button
            onClick={handleClose}
            aria-label={lang === 'en' ? 'Close modal' : 'Cerrar modal'}
            className="p-1 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
          >
            &times;
          </button>
        </div>

        <div className="p-6 md:p-8">
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
              onClick={() => handleTabChange('challenge')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === 'challenge'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {lang === 'en' ? 'Challenge' : 'Reto'}
            </button>
            <button
              onClick={() => handleTabChange('solution')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === 'solution'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {lang === 'en' ? 'Solution' : 'Solución'}
            </button>
            <button
              onClick={() => handleTabChange('architecture')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {lang === 'en' ? 'Architecture' : 'Arquitectura'}
            </button>
            {project.snippetPaths && project.snippetPaths.length > 0 && (
              <button
                onClick={() => handleTabChange('snippets')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeTab === 'snippets'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {lang === 'en' ? 'Code Snippets' : 'Snippets de Código'}
              </button>
            )}
          </div>

          <div className="text-slate-300 text-base">
            {activeTab === 'challenge' && (
              <div className="prose prose-invert max-w-none">
                <p>
                  {lang === 'en'
                    ? project.enChallenge || 'No content.'
                    : project.challenge || 'Sin contenido.'}
                </p>
              </div>
            )}
            {activeTab === 'solution' && (
              <div className="prose prose-invert max-w-none">
                <p>
                  {lang === 'en'
                    ? project.enSolution || 'No content.'
                    : project.solution || 'Sin contenido.'}
                </p>
              </div>
            )}
            {activeTab === 'architecture' && (
              <div className="prose prose-invert max-w-none">
                <p>
                  {lang === 'en'
                    ? project.enArchitecture || 'No content.'
                    : project.architecture || 'Sin contenido.'}
                </p>

                {/* ERD Diagram */}
                {project.erdPath && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {lang === 'en'
                        ? 'Entity Relationship Diagram (ERD)'
                        : 'Diagrama Entidad-Relación (ERD)'}
                    </h3>
                    <div className="border rounded-lg overflow-hidden bg-white">
                      <Image
                        src={project.erdPath}
                        alt={`${project.name} ERD`}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'snippets' && (
              <div className="space-y-6 mt-4">
                {isLoadingSnippets ? (
                  <p className="animate-pulse">
                    {lang === 'en' ? 'Loading snippets...' : 'Cargando snippets...'}
                  </p>
                ) : (
                  <SnippetViewer
                    snippets={snippetsContent}
                    emptyLabel={
                      lang === 'en' ? 'No snippets available.' : 'No hay snippets disponibles.'
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}