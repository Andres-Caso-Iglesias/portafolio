import { Lang } from './types'

type HomeKeys = {
  title: string
  subtitle: string
  projectsTitle: string
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
    },
  },
  en: {
    home: {
      title: 'Andrés Caso Iglesias',
      subtitle: 'Developer',
      projectsTitle: 'Projects',
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
