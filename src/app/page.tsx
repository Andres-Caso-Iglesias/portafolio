"use client";
import Link from "next/link";
import Image from "next/image";
import Timeline from "@/components/Timeline";
import { projects } from "@/data/projectsData";
import { skills } from "@/data/skillsData";
import EducationSection from "@/components/EducationSection";
import LanguageSwitch from "@/components/LanguageSwitch";
import ProjectsGrid from "@/components/ProjectsGrid";
import { t } from '@/i18n/locales'
import { useGlobalLang } from '@/hooks/useGlobalLang'
import ProfileIntroText from '@/components/ProfileIntroText'

export default function Home() {
  const { lang } = useGlobalLang()
  // Client component: bilingual UI via LanguageSwitch, LocaleText, and ProjectsGrid
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-b from-slate-900 to-slate-800 relative">
        <div className="absolute top-6 right-6">
          <LanguageSwitch />
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mt-16 md:mt-0">
          {/* Columna Izquierda: Foto */}
          <div className="flex-shrink-0">
            <div className="relative w-56 h-72 md:w-72 md:h-96 rounded-[50%] overflow-hidden border-4 border-slate-700 shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Andrés Caso Iglesias"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Columna Derecha: Texto y Botones */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {t(lang, 'home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-400 mb-6">
              {t(lang, 'home.subtitle')}
            </p>
            <ProfileIntroText />
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                href="https://github.com/Andres-Caso-Iglesias"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              >
                {t(lang, 'home.github')}
              </Link>
              <Link
                href={lang === 'en' ? 'https://www.linkedin.com/in/andrescasoiglesias/?locale=en-US' : 'https://www.linkedin.com/in/andrescasoiglesias/'}
                className="px-6 py-3 border border-slate-500 hover:border-slate-400 rounded-lg font-medium transition-colors"
              >
                {t(lang, 'home.linkedin')}
              </Link>
              <a
                href={lang === 'en' ? '/andres_caso_iglesias_EN.pdf' : '/andres_caso_iglesias_Es.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
              >
                {t(lang, 'home.resume')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">{t(lang, 'home.profileTitle')}</h2>
          <div className="space-y-4 text-slate-300">
            <p>
              {t(lang, 'home.profileIntro')}
            </p>
            <p>
              {t(lang, 'home.profileIntro2')}
            </p>
            <div className="mt-6 p-4 bg-slate-900 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-400 font-medium">{t(lang, 'home.profileDifferTitle') || (lang === 'en' ? 'Why am I different?' : '¿Por qué soy diferente?')}</p>
              <p className="text-slate-400 mt-1">
                {t(lang, 'home.profileDifferText') || (lang === 'en' ? 'I know what excellence under constant pressure means. I understand the end user because I have been there. I bring discipline, resilience and leadership that few can offer.' : 'Sé lo que es la excelencia bajo presión constante. Entiendo al usuario final porque yo lo fui. Traigo disciplina, resiliencia y capacidad de liderazgo que pocos pueden ofrecer.')}
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
          <h2 className="text-3xl font-bold mb-8 text-white">{t(lang, 'home.skillsTitle')}</h2>
          
          {/* Ciberseguridad */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Ciberseguridad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.filter(s => ['OSINT', 'Sistemas Operativos', 'Redes'].includes(s.category)).map((skill) => (
                <div
                  key={skill.category}
                  className="bg-slate-900 rounded-lg p-6 border border-slate-700"
                >
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">
                    {skill.category}
                  </h4>
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
          
          {/* Desarrollo */}
          <div>
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Desarrollo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.filter(s => !['OSINT', 'Sistemas Operativos', 'Redes'].includes(s.category)).map((skill) => (
                <div
                  key={skill.category}
                  className="bg-slate-900 rounded-lg p-6 border border-slate-700"
                >
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">
                    {skill.category}
                  </h4>
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
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-slate-800 w-full">
        <div className="w-full max-w-screen-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">{t(lang, 'home.projectsTitle')}</h2>
          <ProjectsGrid />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-slate-900 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-white">{t(lang, 'home.contactTitle')}</h2>
          <p className="text-slate-300 mb-6">{t(lang, 'home.contactIntro')}</p>
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
