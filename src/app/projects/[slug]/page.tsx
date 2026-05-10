import { projects } from '@/data/projectsData';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Project Not Found</h1>
        <p className="text-center">The project with slug '{params.slug}' does not exist.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Home
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="mt-2 text-gray-600">{project.description}</p>
      </div>

      {/* Technical Visualization Section */}
      <section className="space-y-8">
        {/* ERD Diagram */}
        {project.erdPath && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Entity Relationship Diagram (ERD)</h2>
            <div className="border rounded-lg overflow-hidden shadow">
              <img src={project.erdPath} alt={`${project.name} ERD`} className="w-full h-auto" />
            </div>
          </div>
        )}

        {/* API Documentation */}
        {project.apiDocPath && (
          <div>
            <h2 className="text-xl font-semibold mb-4">API Documentation</h2>
            <div className="border rounded-lg overflow-hidden shadow">
              {/* For simplicity, we'll show a link or embedded preview if JSON */}
              <a href={project.apiDocPath} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 hover:bg-gray-100">
                View API Spec ({project.apiDocPath.split('/').pop()})
              </a>
            </div>
          </div>
        )}

        {/* Code Snippets */}
        {project.snippetPaths && project.snippetPaths.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Code Snippets</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.snippetPaths.map((path, index) => (
                <div key={index} className="border rounded-lg overflow-hidden shadow">
                  <img src={path} alt={`Code snippet ${index + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Docker Info */}
        {project.dockerCompose && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Docker Configuration</h2>
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="font-semibold mb-2">This project includes Docker Compose configuration:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>MySQL service for FoodBites and Urban Garden Manager</li>
                <li>PostgreSQL service for Bolsa de Empleo</li>
                <li>Backend services (Java Spring Boot, NestJS)</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                See <code className="bg-gray-200 px-1 rounded">docker-compose.yml</code> in the repository root for full details.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Challenge/Solution/Architecture (existing) */}
      <section className="mt-12 space-y-6">
        {project.challenge && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Challenge (Reto)</h2>
            <p className="text-gray-700">{project.challenge}</p>
          </div>
        )}
        {project.solution && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Solution (Solución)</h2>
            <p className="text-gray-700">{project.solution}</p>
          </div>
        )}
        {project.architecture && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Architecture (Arquitectura)</h2>
            <p className="text-gray-700">{project.architecture}</p>
          </div>
        )}
      </section>

      {/* Links */}
      <div className="mt-12 flex gap-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            GitHub Repository
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}