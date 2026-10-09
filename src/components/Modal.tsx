'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

const FOCUS_RING = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-blue-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white',
  'dark:focus-visible:ring-offset-slate-900',
].join(' ');

type ModalTabKey = 'challenge' | 'solution' | 'architecture' | 'circuits' | 'snippets';

export default function Modal({ project, onClose }: ModalProps) {
  const { lang } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ModalTabKey>('challenge');
  const [focusedTab, setFocusedTab] = useState<ModalTabKey>('challenge');
  const [snippetsContent, setSnippetsContent] = useState<Snippet[]>([]);
  const [isLoadingSnippets, setIsLoadingSnippets] = useState(false);

  const tabOrder: ModalTabKey[] = ['challenge', 'solution', 'architecture'];
  if (project.images && project.images.length > 0) tabOrder.push('circuits');
  if (project.snippetPaths && project.snippetPaths.length > 0) tabOrder.push('snippets');

  const handleClose = useCallback(() => {
    setActiveTab('challenge');
    setFocusedTab('challenge');
    onClose();
  }, [onClose]);

  const handleTabChange = useCallback(
    (tab: ModalTabKey) => {
      setActiveTab(tab);
      if (tab === 'snippets' && snippetsContent.length === 0 && !isLoadingSnippets) {
        setIsLoadingSnippets(true);
        loadSnippetsClient(project.snippetPaths || []).then(snippets => {
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

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    dialogRef.current?.focus();

    return () => {
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, []);

  // Scroll-lock: measure the scrollbar width BEFORE hiding it (measuring after
  // returns 0). StrictMode-safe: each setup captures its own previous values.
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    if (scrollbarWidth > 0) {
      const computedPadding = parseFloat(window.getComputedStyle(document.body).paddingRight);
      const basePadding = Number.isNaN(computedPadding) ? 0 : computedPadding;
      document.body.style.paddingRight = `${basePadding + scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  const focusTab = (tab: ModalTabKey) => {
    setFocusedTab(tab);
    tabListRef.current?.querySelector<HTMLElement>(`#modal-tab-${tab}`)?.focus();
  };

  // Manual activation: arrows only move focus, Enter/Space/click activates.
  const handleTabListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const count = tabOrder.length;
    const current = tabOrder.indexOf(focusedTab);
    let next: number;

    switch (e.key) {
      case 'ArrowRight':
        next = current < 0 ? 0 : (current + 1) % count;
        break;
      case 'ArrowLeft':
        next = current < 0 ? count - 1 : (current - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    focusTab(tabOrder[next]);
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      handleClose();
      return;
    }
    if (e.key !== 'Tab') return;

    const root = dialogRef.current;
    if (!root) return;

    const focusables = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      el => !el.hasAttribute('aria-hidden') && !el.hasAttribute('disabled')
    );
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (e.shiftKey) {
      if (active === first || active === root || !root.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || active === root || !root.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm focus:outline-none"
      onClick={handleClose}
      onKeyDown={handleOverlayKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-700 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-neutral-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10 rounded-t-xl">
          <h2 id="modal-title" className="text-xl font-semibold text-neutral-900 dark:text-white">
            {lang === 'en' && project.enName ? project.enName : project.name}
          </h2>
          <button
            onClick={handleClose}
            aria-label={lang === 'en' ? 'Close modal' : 'Cerrar modal'}
            className={`min-h-6 min-w-6 p-1 text-neutral-500 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-800 ${FOCUS_RING}`}
          >
            &times;
          </button>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-neutral-700 dark:text-slate-300 mb-4">
            {lang === 'en' && project.enDescription ? project.enDescription : project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 rounded text-xs"
              >
                {tech}
              </span>
            ))}
            {project.statusNote && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs border bg-neutral-100 border-neutral-200 text-neutral-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                {lang === 'en' && project.enStatusNote ? project.enStatusNote : project.statusNote}
              </span>
            )}
          </div>

          <div
            ref={tabListRef}
            role="tablist"
            tabIndex={-1}
            aria-orientation="horizontal"
            aria-label={lang === 'en' ? 'Project detail sections' : 'Secciones de detalle'}
            onKeyDown={handleTabListKeyDown}
            className="flex flex-wrap gap-2 mb-4 border-b border-neutral-200 dark:border-slate-700 pb-2"
          >
            <button
              role="tab"
              id="modal-tab-challenge"
              aria-selected={activeTab === 'challenge'}
              aria-controls="modal-tabpanel"
              tabIndex={focusedTab === 'challenge' ? 0 : -1}
              onClick={() => {
                setFocusedTab('challenge');
                handleTabChange('challenge');
              }}
              className={`px-3 py-1 text-xs rounded transition-colors ${FOCUS_RING} ${
                activeTab === 'challenge'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-200 dark:bg-slate-700 text-neutral-700 dark:text-slate-300 hover:bg-neutral-300 dark:hover:bg-slate-600'
              }`}
            >
              {lang === 'en' ? 'Challenge' : 'Reto'}
            </button>
            <button
              role="tab"
              id="modal-tab-solution"
              aria-selected={activeTab === 'solution'}
              aria-controls="modal-tabpanel"
              tabIndex={focusedTab === 'solution' ? 0 : -1}
              onClick={() => {
                setFocusedTab('solution');
                handleTabChange('solution');
              }}
              className={`px-3 py-1 text-xs rounded transition-colors ${FOCUS_RING} ${
                activeTab === 'solution'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-200 dark:bg-slate-700 text-neutral-700 dark:text-slate-300 hover:bg-neutral-300 dark:hover:bg-slate-600'
              }`}
            >
              {lang === 'en' ? 'Solution' : 'Solución'}
            </button>
            <button
              role="tab"
              id="modal-tab-architecture"
              aria-selected={activeTab === 'architecture'}
              aria-controls="modal-tabpanel"
              tabIndex={focusedTab === 'architecture' ? 0 : -1}
              onClick={() => {
                setFocusedTab('architecture');
                handleTabChange('architecture');
              }}
              className={`px-3 py-1 text-xs rounded transition-colors ${FOCUS_RING} ${
                activeTab === 'architecture'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-200 dark:bg-slate-700 text-neutral-700 dark:text-slate-300 hover:bg-neutral-300 dark:hover:bg-slate-600'
              }`}
            >
              {lang === 'en' ? 'Architecture' : 'Arquitectura'}
            </button>
            {project.images && project.images.length > 0 && (
              <button
                role="tab"
                id="modal-tab-circuits"
                aria-selected={activeTab === 'circuits'}
                aria-controls="modal-tabpanel"
                tabIndex={focusedTab === 'circuits' ? 0 : -1}
                onClick={() => {
                  setFocusedTab('circuits');
                  handleTabChange('circuits');
                }}
                className={`px-3 py-1 text-xs rounded transition-colors ${FOCUS_RING} ${
                  activeTab === 'circuits'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-200 dark:bg-slate-700 text-neutral-700 dark:text-slate-300 hover:bg-neutral-300 dark:hover:bg-slate-600'
                }`}
              >
                {lang === 'en' ? 'Circuits' : 'Circuitos'}
              </button>
            )}
            {project.snippetPaths && project.snippetPaths.length > 0 && (
              <button
                role="tab"
                id="modal-tab-snippets"
                aria-selected={activeTab === 'snippets'}
                aria-controls="modal-tabpanel"
                tabIndex={focusedTab === 'snippets' ? 0 : -1}
                onClick={() => {
                  setFocusedTab('snippets');
                  handleTabChange('snippets');
                }}
                className={`px-3 py-1 text-xs rounded transition-colors ${FOCUS_RING} ${
                  activeTab === 'snippets'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-200 dark:bg-slate-700 text-neutral-700 dark:text-slate-300 hover:bg-neutral-300 dark:hover:bg-slate-600'
                }`}
              >
                {lang === 'en' ? 'Code Snippets' : 'Snippets de Código'}
              </button>
            )}
          </div>

          <div
            role="tabpanel"
            id="modal-tabpanel"
            aria-labelledby={`modal-tab-${activeTab}`}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- APG: tabpanel gets focus so its content is announced
            tabIndex={0}
            aria-busy={activeTab === 'snippets' && isLoadingSnippets}
            className="text-neutral-700 dark:text-slate-300 text-base"
          >
            {activeTab === 'challenge' && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                  {lang === 'en'
                    ? project.enChallenge || 'No content.'
                    : project.challenge || 'Sin contenido.'}
                </p>
              </div>
            )}
            {activeTab === 'solution' && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                  {lang === 'en'
                    ? project.enSolution || 'No content.'
                    : project.solution || 'Sin contenido.'}
                </p>
              </div>
            )}
            {activeTab === 'architecture' && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                  {lang === 'en'
                    ? project.enArchitecture || 'No content.'
                    : project.architecture || 'Sin contenido.'}
                </p>

                {/* ERD Diagram */}
                {project.erdPath && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
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
            {activeTab === 'circuits' && project.images && project.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[5/2] overflow-hidden rounded-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <Image
                      src={src}
                      alt={
                        project.imageAlts?.[i]
                          ? lang === 'en' && project.imageAlts[i].enText
                            ? project.imageAlts[i].enText
                            : project.imageAlts[i].text
                          : ''
                      }
                      fill
                      sizes="(min-width: 640px) 400px, 90vw"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'snippets' && (
              <div className="space-y-6 mt-4">
                {isLoadingSnippets ? (
                  <p className="animate-pulse">
                    {lang === 'en' ? 'Loading snippets...' : 'Cargando snippets...'}
                  </p>
                ) : (
                  <SnippetViewer snippets={snippetsContent} />
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
