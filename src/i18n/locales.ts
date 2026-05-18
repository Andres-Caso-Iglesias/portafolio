import { Lang } from './types'

type HomeKeys = {
  title: string
  subtitle: string
  projectsTitle: string
  profileTitle: string
  profileIntro: string
  profileIntroFull: string
  profileIntro2: string
  profileDifferTitle: string
  profileDifferText: string
  seoTitle?: string
  seoDescription?: string
  educationTitle: string
  educationIntro: string
  skillsTitle: string
  contactTitle: string
  contactIntro: string
  resume: string
  github: string
  linkedin: string
  viewGithub: string
  timelineTitle: string
}

type LocalesMap = {
  es: {
    home: HomeKeys
  }
  en: {
    home: HomeKeys
  }
}

export const locales: LocalesMap = {
  es: {
    home: {
      title: 'Andrés Caso Iglesias',
      subtitle: 'Desarrollador',
      projectsTitle: 'Proyectos',
      profileTitle: 'Perfil Profesional',
      profileIntro: 'Desarrollador con formación técnica en aplicaciones multiplataforma y administración de servicios de internet. Experiencia práctica en entornos de desarrollo de software logístico y una trayectoria previa que respalda mi capacidad para trabajar bajo presión y resolución de problemas complejos.',
      profileIntroFull: 'Después de casi 20 años liderando equipos en hostelería y logística, di un giro radical hacia el desarrollo de software.\n\nCuento con una dilatada experiencia en liderazgo operativo en sectores críticos, una trayectoria que ahora canalizo hacia la ingeniería de software. Mi enfoque se centra en el desarrollo backend, la ciberseguridad y la alineación de soluciones técnicas con objetivos de negocio. Siempre me ha intrigado cómo funcionan las cosas por dentro.\n\nY por si no queda claro, soy bilingüe nativo español-inglés.',
      profileIntro2: 'Durante mis prácticas en Mecalux Software Solutions apliqué desarrollo en C#, optimización de bases de datos, implementación de seguridad NIS2 y gestión de entornos en la nube. Mis años previos me diferencian: sé trabajar bajo presión, liderar sin excusas, entender al usuario final y optimizar recursos al máximo.',
      profileDifferTitle: '¿Por qué soy diferente?',
      profileDifferText: 'Sé lo que es la excelencia bajo presión constante. Entiendo al usuario final porque yo lo fui. Traigo disciplina, resiliencia y capacidad de liderazgo que pocos pueden ofrecer.',
      educationTitle: 'Educación y Formación',
      educationIntro: 'Formación académica y práctica en desarrollo de software, gestión de proyectos y seguridad.',
      skillsTitle: 'Habilidades Técnicas',
      contactTitle: 'Contacto',
      contactIntro: 'Buscando una oportunidad como Developer (España, híbrido o remoto).',
      resume: 'Resumen',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      viewGithub: 'Ver en GitHub',
      timelineTitle: 'Mi Trayectoria',
      seoTitle: 'Andrés Caso Iglesias | Developer',
      seoDescription: 'Portfolio de Andrés Caso Iglesias - Developer especializado en C#/.NET, Java y TypeScript',
    },
  },
  en: {
    home: {
      title: 'Andrés Caso Iglesias',
      subtitle: 'Developer',
      projectsTitle: 'Projects',
      profileTitle: 'Professional Profile',
      profileIntro: 'Developer with a technical background in cross‑platform applications and internet services administration. Practical software development experience in logistics environments and a track record of working under pressure and solving complex problems.',
      profileIntroFull: 'After almost 20 years leading teams in hospitality and logistics, I pivoted to software development.\n\nI bring extensive experience in operational leadership in critical sectors, now channeled into software engineering with a focus on backend development, security, and business-aligned technical solutions. I have always been curious how things work internally.\n\nAnd to clarify, I am bilingual native Spanish-English.',
      profileIntro2: 'During my internship at Mecalux Software Solutions I applied development in C#, optimized databases, implemented NIS2 security and cloud management on Azure. My prior years differentiate me: I know how to work under pressure, lead without excuses, understand the end user and optimize resources to the max.',
      profileDifferTitle: 'Why am I different?',
      profileDifferText: 'I know what excellence under constant pressure means. I understand the end user because I have been there. I bring discipline, resilience and leadership that few can offer.',
      educationTitle: 'Education and Training',
      educationIntro: 'Academic and practical training in software development, project management, and security.',
      skillsTitle: 'Technical Skills',
      contactTitle: 'Contact',
      contactIntro: 'Seeking an opportunity as a Developer (Spain, hybrid or remote).',
      resume: 'Resume',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      viewGithub: 'View on GitHub',
      timelineTitle: 'My Timeline',
      seoTitle: 'Andrés Caso Iglesias | Developer',
      seoDescription: 'Portfolio of Andrés Caso Iglesias - Developer specialized in C#/.NET, Java and TypeScript',
    },
  },
}

// Simple translator: path format like 'home.title'
export function t(lang: Lang, path: string): string {
  const parts = path.split('.')
  // @ts-ignore
  let cur: any = locales[lang]
  for (const p of parts) {
    if (!cur) return ''
    cur = cur[p as keyof typeof cur]
  }
  return typeof cur === 'string' ? cur : ''
}

export const DEFAULT_LANG: Lang = 'es'
