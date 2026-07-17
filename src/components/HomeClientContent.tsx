'use client';
import Link from 'next/link';
import Image from 'next/image';
import { skills } from '@/data/skillsData';
import LanguageSwitch from '@/components/LanguageSwitch';
import ProjectsGrid from '@/components/ProjectsGrid';
import ProfileIntroText from '@/components/ProfileIntroText';
import { useLanguage, t } from '@/lib/i18n';

function HeroSection() {
  const { lang } = useLanguage();
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-b from-slate-900 to-slate-800 relative">
      <div className="absolute top-6 right-6">
        <LanguageSwitch />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mt-16 md:mt-0">
        <div className="flex-shrink-0">
          <div className="relative w-56 h-72 md:w-72 md:h-96 rounded-[50%] overflow-hidden border-4 border-slate-700 shadow-xl">
            <Image
              src="/profile.jpg"
              alt="Andrés Caso Iglesias"
              fill
              sizes="(max-width: 768px) 224px, 288px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {t(lang, 'home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-400 mb-6">{t(lang, 'home.subtitle')}</p>
          <ProfileIntroText />
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              href={
                lang === 'en'
                  ? 'https://www.linkedin.com/in/andrescasoiglesias/?locale=en-US'
                  : 'https://www.linkedin.com/in/andrescasoiglesias/'
              }
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg font-medium transition-colors"
            >
              {t(lang, 'home.linkedin')}
            </Link>
            <Link
              href="https://github.com/Andres-Caso-Iglesias"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg font-medium transition-colors"
            >
              {t(lang, 'home.github')}
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
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4 pt-4 border-t border-slate-700">
            <a
              href="https://app.hackthebox.com/public/users/3412608"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-green-600 text-green-400 hover:bg-green-600/10 hover:text-green-300 rounded-lg font-medium text-sm transition-colors"
            >
              {t(lang, 'home.hackTheBox')}
            </a>
            <a
              href="https://labs.thehackerslabs.com/hacker/10479"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-red-600 text-red-400 hover:bg-red-600/10 hover:text-red-300 rounded-lg font-medium text-sm transition-colors"
            >
              {t(lang, 'home.theHackersLabs')}
            </a>
            <a
              href="https://tryhackme.com/p/Drosc0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-orange-600 text-orange-400 hover:bg-orange-600/10 hover:text-orange-300 rounded-lg font-medium text-sm transition-colors"
            >
              {t(lang, 'home.tryHackMe')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { lang } = useLanguage();
  return (
    <section className="py-20 px-6 bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">{t(lang, 'home.profileTitle')}</h2>
        <div className="space-y-4 text-slate-300">
          <p>{t(lang, 'home.profileIntro')}</p>
          <p>{t(lang, 'home.profileIntro2')}</p>
          <div className="mt-6 p-4 bg-slate-900 rounded-lg border-l-4 border-blue-500">
            <p className="text-blue-400 font-medium">
              {t(lang, 'home.profileDifferTitle') ||
                (lang === 'en' ? 'Why am I different?' : '¿Por qué soy diferente?')}
            </p>
            <p className="text-slate-400 mt-1">
              {t(lang, 'home.profileDifferText') ||
                (lang === 'en'
                  ? 'I know what excellence under constant pressure means. I understand the end user because I have been there. I bring discipline, resilience and leadership that few can offer.'
                  : 'Sé lo que es la excelencia bajo presión constante. Entiendo al usuario final porque yo lo fui. Traigo disciplina, resiliencia y capacidad de liderazgo que pocos pueden ofrecer.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const { lang } = useLanguage();
  const cyberCategories = ['OSINT', 'Sistemas Operativos', 'Redes'];
  return (
    <section className="py-20 px-6 bg-slate-800 w-full">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl min-[1440px]:text-4xl font-bold mb-8 text-white">
          {t(lang, 'home.skillsTitle')}
        </h2>
      </div>
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xl min-[1440px]:text-2xl font-semibold text-teal-400 mb-4 max-w-4xl mx-auto text-center">
            {t(lang, 'home.skillsCybersecurity')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills
              .filter(s => cyberCategories.includes(s.category))
              .map(skill => (
                <div
                  key={skill.category}
                  className="bg-slate-900 rounded-lg p-6 border border-slate-700"
                >
                  <h4 className="text-lg min-[1440px]:text-xl font-semibold text-blue-400 mb-4">
                    {skill.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(item => (
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
        <div>
          <h3 className="text-xl min-[1440px]:text-2xl font-semibold text-teal-400 mb-4 max-w-4xl mx-auto text-center">
            {t(lang, 'home.skillsDevelopment')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills
              .filter(s => !cyberCategories.includes(s.category))
              .map(skill => (
                <div
                  key={skill.category}
                  className="bg-slate-900 rounded-lg p-6 border border-slate-700"
                >
                  <h4 className="text-lg min-[1440px]:text-xl font-semibold text-blue-400 mb-4">
                    {skill.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(item => (
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
  );
}

function ProjectsSection() {
  const { lang } = useLanguage();
  return (
    <section className="py-20 px-6 bg-slate-800 w-full">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl min-[1440px]:text-4xl font-bold mb-8 text-white">
          {t(lang, 'home.projectsTitle')}
        </h2>
      </div>
      <div className="w-full max-w-screen-2xl mx-auto">
        <ProjectsGrid />
      </div>
    </section>
  );
}

function ContactSection() {
  const { lang } = useLanguage();
  return (
    <section className="py-20 px-6 bg-slate-900 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-white">{t(lang, 'home.contactTitle')}</h2>
        <p className="text-slate-300 mb-6">{t(lang, 'home.contactIntro')}</p>
        <a
          href="mailto:andrescasoiglesias@gmail.com"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          {t(lang, 'home.contactEmail')}
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="py-8 px-6 bg-slate-950 text-center text-slate-500 text-sm">
      <p>
        © {new Date().getFullYear()} Andrés Caso Iglesias. {t(lang, 'home.footerRights')}
      </p>
    </footer>
  );
}

export function HeroAboutClient() {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  );
}

export function SkillsProjectsContactClient() {
  return (
    <>
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
