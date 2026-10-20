import { TimelineStage } from '@/data/timelineData';

export interface StageMeta {
  /** i18n key for the stage title */
  labelKey: string;
  /** Solid dot for experience items */
  dotSolid: string;
  /** Coloured outline dot for education items */
  dotHollow: string;
  /** Text colour for the stage title and accents */
  text: string;
  /** Subtle tinted background for the stage header */
  headerBg: string;
}

/**
 * Fase 2 — Canonical stage palette: Cocina (green) -> Logística (amber)
 * -> IT (blue) -> Formación (purple). Matches the legacy timeline legend.
 */
export const stageMeta: Record<TimelineStage, StageMeta> = {
  cocina: {
    labelKey: 'home.stageCocina',
    dotSolid: 'bg-green-500',
    dotHollow: 'border-green-500',
    text: 'text-green-700 dark:text-green-400',
    headerBg: 'bg-green-500/10',
  },
  logistica: {
    labelKey: 'home.stageLogistica',
    dotSolid: 'bg-amber-500',
    dotHollow: 'border-amber-500',
    text: 'text-amber-700 dark:text-amber-400',
    headerBg: 'bg-amber-500/10',
  },
  it: {
    labelKey: 'home.stageIt',
    dotSolid: 'bg-blue-500',
    dotHollow: 'border-blue-500',
    text: 'text-blue-700 dark:text-blue-400',
    headerBg: 'bg-blue-500/10',
  },
  formacion: {
    labelKey: 'home.stageFormacion',
    dotSolid: 'bg-purple-500',
    dotHollow: 'border-purple-500',
    text: 'text-purple-700 dark:text-purple-400',
    headerBg: 'bg-purple-500/10',
  },
};
