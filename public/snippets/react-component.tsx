// @ts-nocheck - Display-only code example
// Ejemplo de componente React con TypeScript para el Portafolio Profesional
// Demuestra uso de tipado estric y patrones de clean architecture

interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
}

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick?: (slug: string) => void;
}

export default function ProjectsGrid({ projects, onProjectClick }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <article
          key={project.id}
          className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onProjectClick?.(project.slug)}
        >
          <h3 className="text-xl font-bold">{project.name}</h3>
          <p className="text-gray-600 mt-2">{project.description}</p>
          <div className="flex gap-2 mt-4">
            {project.tech.map((t) => (
              <span key={t} className="px-2 py-1 bg-slate-100 rounded text-sm">
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

// Hook personalizado para proyectos
export function useProjects() {
  // Lógica para obtener y filtrar proyectos
  const getProjects = () => { /* ... */ };
  const getProjectBySlug = (slug: string) => { /* ... */ };
  
  return { getProjects, getProjectBySlug };
}