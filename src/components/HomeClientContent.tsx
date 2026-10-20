'use client';
import Link from 'next/link';
import Image from 'next/image';
import { skills } from '@/data/skillsData';
import ProjectsGrid from '@/components/ProjectsGrid';
import ProfileIntroText from '@/components/ProfileIntroText';
import Reveal from '@/components/Reveal';
import { useLanguage, t } from '@/lib/i18n';

const FOCUS_RING = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-blue-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white',
  'dark:focus-visible:ring-offset-slate-900',
].join(' ');

function HeroSection() {
  const { lang } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(37,99,235,0.14),transparent_70%)]"
      />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 py-16 md:flex-row md:gap-14 md:py-20">
        <div className="relative h-72 w-56 shrink-0 overflow-hidden rounded-3xl border border-neutral-300 shadow-2xl ring-1 ring-blue-500/20 md:h-96 md:w-72 dark:border-slate-700">
          <Image
            src="/profile.jpg"
            alt="Andrés Caso Iglesias"
            fill
            sizes="(max-width: 768px) 224px, 288px"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-400/30 dark:text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            {t(lang, 'home.heroStatus')}
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 text-balance md:text-6xl dark:text-white">
            {t(lang, 'home.title')}
          </h1>
          <p className="mb-6 text-xl font-medium text-blue-600 md:text-2xl dark:text-blue-400">
            {t(lang, 'home.subtitle')}
          </p>
          <ProfileIntroText />
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href={lang === 'en' ? '/andres_caso_iglesias_EN.pdf' : '/andres_caso_iglesias_Es.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors ${FOCUS_RING}`}
            >
              {t(lang, 'home.resume')}
            </a>
            <Link
              href={
                lang === 'en'
                  ? 'https://www.linkedin.com/in/andrescasoiglesias/?locale=en-US'
                  : 'https://www.linkedin.com/in/andrescasoiglesias/'
              }
              className={`px-6 py-3 rounded-lg font-semibold border border-neutral-300 text-neutral-900 hover:bg-neutral-100 transition-colors dark:border-slate-600 dark:text-white dark:hover:bg-slate-800 ${FOCUS_RING}`}
            >
              {t(lang, 'home.linkedin')}
            </Link>
            <Link
              href="https://github.com/Andres-Caso-Iglesias"
              className={`px-6 py-3 rounded-lg font-semibold border border-neutral-300 text-neutral-900 hover:bg-neutral-100 transition-colors dark:border-slate-600 dark:text-white dark:hover:bg-slate-800 ${FOCUS_RING}`}
            >
              {t(lang, 'home.github')}
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3 border-t border-neutral-300 pt-5 md:justify-start dark:border-slate-700">
            <a
              href="https://app.hackthebox.com/public/users/3412608"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 border border-green-600 text-green-700 dark:text-green-400 hover:bg-green-600/10 hover:text-green-600 dark:hover:text-green-300 rounded-lg font-medium text-sm transition-colors ${FOCUS_RING}`}
            >
              {t(lang, 'home.hackTheBox')}
            </a>
            <a
              href="https://labs.thehackerslabs.com/hacker/10479"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 border border-red-600 text-red-700 dark:text-red-400 hover:bg-red-600/10 hover:text-red-600 dark:hover:text-red-300 rounded-lg font-medium text-sm transition-colors ${FOCUS_RING}`}
            >
              {t(lang, 'home.theHackersLabs')}
            </a>
            <a
              href="https://tryhackme.com/p/Drosc0"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 border border-orange-600 text-orange-700 dark:text-orange-400 hover:bg-orange-600/10 hover:text-orange-600 dark:hover:text-orange-300 rounded-lg font-medium text-sm transition-colors ${FOCUS_RING}`}
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
    <section
      id="perfil"
      className="bg-white px-6 py-20 transition-colors duration-300 dark:bg-slate-900"
    >
      <Reveal>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold text-neutral-900 dark:text-white">
            {t(lang, 'home.profileTitle')}
          </h2>
        </div>
        <div className="px-4 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <div className="space-y-4 text-neutral-700 lg:col-span-2 dark:text-slate-300">
              <p className="text-lg leading-relaxed">{t(lang, 'home.profileIntro')}</p>
              <p className="text-lg leading-relaxed">{t(lang, 'home.profileIntro2')}</p>
            </div>
            <div className="rounded-lg border-l-4 border-blue-500 bg-neutral-50 p-6 dark:bg-slate-800">
              <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                {t(lang, 'home.profileDifferTitle')}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-neutral-500 dark:text-slate-400">
                {t(lang, 'home.profileDifferText')}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SkillsSection() {
  const { lang } = useLanguage();
  const cyberCategories = ['OSINT', 'Sistemas Operativos', 'Redes'];

  const skillCardClass =
    'bg-white rounded-lg p-6 border border-neutral-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/60 dark:border-slate-700 dark:bg-slate-900';

  const groupHeadingClass =
    'flex items-center gap-3 text-xl min-[1440px]:text-2xl font-semibold text-teal-700 dark:text-teal-400 mb-6 max-w-4xl mx-auto';

  return (
    <section
      id="habilidades"
      className="w-full bg-slate-50 px-6 py-20 transition-colors duration-300 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-3xl min-[1440px]:text-4xl font-bold text-neutral-900 dark:text-white">
          {t(lang, 'home.skillsTitle')}
        </h2>
      </div>
      <Reveal>
        <div className="mx-auto w-full max-w-screen-2xl">
          <div className="mb-8">
            <h3 className={groupHeadingClass}>
              <span className="h-6 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />
              {t(lang, 'home.skillsCybersecurity')}
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-6">
              {skills
                .filter(s => cyberCategories.includes(s.category))
                .map(skill => (
                  <div key={skill.category} className={`${skillCardClass} md:col-span-2`}>
                    <h4 className="mb-4 text-lg min-[1440px]:text-xl font-semibold text-blue-600 dark:text-blue-400">
                      {skill.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(item => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm text-neutral-800 dark:text-slate-200"
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
            <h3 className={groupHeadingClass}>
              <span className="h-6 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />
              {t(lang, 'home.skillsDevelopment')}
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-6">
              {skills
                .filter(s => !cyberCategories.includes(s.category))
                .map(skill => {
                  const wide =
                    skill.category === 'DevOps & Cloud' || skill.category === 'Herramientas de IA';
                  return (
                    <div
                      key={skill.category}
                      className={`${skillCardClass} ${wide ? 'md:col-span-3' : 'md:col-span-2'}`}
                    >
                      <h4 className="mb-4 text-lg min-[1440px]:text-xl font-semibold text-blue-600 dark:text-blue-400">
                        {skill.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map(item => (
                          <span
                            key={item}
                            className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm text-neutral-800 dark:text-slate-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ProjectsSection() {
  const { lang } = useLanguage();
  return (
    <section
      id="proyectos"
      className="w-full bg-white px-6 py-20 transition-colors duration-300 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-3xl min-[1440px]:text-4xl font-bold text-neutral-900 dark:text-white">
          {t(lang, 'home.projectsTitle')}
        </h2>
      </div>
      <Reveal>
        <div className="mx-auto w-full max-w-screen-2xl">
          <ProjectsGrid />
        </div>
      </Reveal>
    </section>
  );
}

function ContactSection() {
  const { lang } = useLanguage();
  return (
    <section
      id="contacto"
      className="bg-slate-50 px-6 py-20 text-center transition-colors duration-300 dark:bg-slate-950"
    >
      <Reveal>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
            {t(lang, 'home.contactTitle')}
          </h2>
          <p className="mb-6 text-neutral-600 dark:text-slate-300">
            {t(lang, 'home.contactIntro')}
          </p>
          <a
            href="mailto:andrescasoiglesias@gmail.com"
            className={`inline-block rounded-lg bg-blue-600 px-8 py-4 font-medium text-white shadow-md transition-colors hover:bg-blue-700 ${FOCUS_RING}`}
          >
            {t(lang, 'home.contactEmail')}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="border-t border-neutral-200 bg-neutral-100 px-6 py-8 text-center text-sm text-neutral-600 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
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
