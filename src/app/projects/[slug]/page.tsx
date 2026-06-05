import { notFound } from "next/navigation";
import { projects } from "@/data/projectsData";
import { loadSnippetsServer } from "@/lib/snippetLoader";
import SnippetViewer from "@/components/SnippetViewer";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const snippets = project.snippetPaths && project.snippetPaths.length > 0
    ? await loadSnippetsServer(project.snippetPaths)
    : [];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="mt-2 text-gray-600">{project.description}</p>
      </div>

      <section className="space-y-8">
        {project.erdPath && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Entity Relationship Diagram (ERD)</h2>
            <div className="border rounded-lg overflow-hidden shadow">
              <img src={project.erdPath} alt={`${project.name} ERD`} className="w-full h-auto" />
            </div>
          </div>
        )}

        {project.apiDocPath && (
          <div>
            <h2 className="text-xl font-semibold mb-4">API Documentation</h2>
            <div className="border rounded-lg overflow-hidden shadow">
              <a
                href={project.apiDocPath}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 hover:bg-gray-100"
              >
                View API Spec ({project.apiDocPath.split("/").pop()})
              </a>
            </div>
          </div>
        )}

        {project.snippetPaths && project.snippetPaths.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Code Snippets</h2>
            <SnippetViewer snippets={snippets} />
          </div>
        )}

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

      <section className="mt-12 space-y-6">
        {project.challenge && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Challenge (Reto)</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{project.challenge}</p>
          </div>
        )}
        {project.solution && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Solution (Solución)</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{project.solution}</p>
          </div>
        )}
        {project.architecture && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Architecture (Arquitectura)</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{project.architecture}</p>
          </div>
        )}
      </section>

      <div className="mt-12 flex gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            GitHub Repository
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
