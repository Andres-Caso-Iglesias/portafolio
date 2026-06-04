"use client";

import { cn } from "@/lib/utils";

// ──────────────────────────────────────────────────────────────
// Project Data Interface
// ──────────────────────────────────────────────────────────────
export interface ProjectData {
  name: string;
  description: string;
  techStack: string;
  detailUrl: string;
  githubUrl?: string;
}

// ──────────────────────────────────────────────────────────────
// ProjectCard Props
// ──────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: ProjectData;
}

// ──────────────────────────────────────────────────────────────
// ProjectCard Component
// ──────────────────────────────────────────────────────────────
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-3 mt-2 border border-slate-600">
      <h4 className="text-white font-medium text-sm mb-1">{project.name}</h4>
      <p className="text-slate-300 text-xs mb-2 leading-relaxed">{project.description}</p>
      <p className="text-slate-400 text-xs mb-3">
        <span className="text-slate-500">Stack:</span> {project.techStack}
      </p>
      <div className="flex gap-2">
        <a
          href={project.detailUrl}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white 
                     rounded-md hover:bg-blue-700 transition-colors"
        >
          Ver detalle
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
          </svg>
        </a>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-700 text-slate-300 
                       rounded-md hover:bg-slate-600 transition-colors"
          >
            GitHub
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
              <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
