import Link from "next/link";
import Timeline from "@/components/Timeline";
import { projects } from "@/data/projectsData";
import { skills } from "@/data/skillsData";
import EducationSection from "@/components/EducationSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-slate-900 to-slate-800">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Andrés Caso Iglesias
        </h1>
        <p className="text-xl md:text-2xl text-blue-400 mb-6">
          Developer
        </p>
        <p className="max-w-2xl text-slate-300 mb-8 text-lg leading-relaxed">
          Después de casi 20 años liderando equipos en hostelería y logística,
          di un giro radical hacia el desarrollo de software.<br />
          Como no soy una IA no voy a decir que programar me apasiona, 
          pero siempre me ha fascinado entender como funcionaban las cosas por dentro.<br />
          Y por si no lo dejo claro mas adelante soy bilingüe nativo español-inglés.
        </p>
        <div className="flex gap-4">
          <Link
            href="https://github.com/Andres-Caso-Iglesias"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/andrescasoiglesias"
            className="px-6 py-3 border border-slate-500 hover:border-slate-400 rounded-lg font-medium transition-colors"
          >
            LinkedIn
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">Perfil Profesional</h2>
          <div className="space-y-4 text-slate-300">
            <p>
              Desarrollador con formación técnica en aplicaciones multiplataforma y
              administración de servicios de internet.<br />
              Experiencia práctica en entornos de desarrollo de software logístico y una trayectoria previa
              que respalda mi capacidad para trabajar bajo presión y resolución de problemas complejos.
            </p>
            <p>
              Durante mis prácticas en Mecalux Software Solutions apliqué desarrollo
              en C#, optimización de bases de datos, implementación de seguridad NIS2
              y gestión de entornos en la nube. Mis años previos me diferencian:
              sé trabajar bajo presión, liderar sin excusas, entender al usuario final
              y optimizar recursos al máximo.
            </p>
            <div className="mt-6 p-4 bg-slate-900 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-400 font-medium">¿Por qué soy diferente?</p>
              <p className="text-slate-400 mt-1">
                Sé lo que es la excelencia bajo presión constante. Entiendo al usuario final
                porque yo lo fui. Traigo disciplina, resiliencia y capacidad de liderazgo
                que pocos juniors pueden ofrecer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />

      {/* Education Section */}
      <EducationSection />

      {/* Skills Section */}
      <section className="py-20 px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">Skills Técnicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="bg-slate-900 rounded-lg p-6 border border-slate-700"
              >
                <h3 className="text-lg font-semibold text-blue-400 mb-4">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">Proyectos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.name}
                className="bg-slate-900 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {project.name}
                </h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.github}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Ver en GitHub →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-slate-900 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-white">Contacto</h2>
          <p className="text-slate-300 mb-6">
            Buscando una oportunidad como Junior Backend en Asturias,
            híbrido o remoto. ¿Hablamos?
          </p>
          <a
            href="mailto:andrescasoiglesias@gmail.com"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Enviar email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-950 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Andrés Caso Iglesias. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}