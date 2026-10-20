import { TimelineItem } from '@/data/timelineData';
import { TimelineStageGroup } from '@/lib/timelineUtils';
import { cn } from '@/lib/utils';
import { t, useLanguage } from '@/lib/i18n';
import { stageMeta, type StageMeta } from './stageMeta';

interface StagePanelProps {
  group: TimelineStageGroup;
}

export default function StagePanel({ group }: StagePanelProps) {
  const { lang } = useLanguage();
  const meta = stageMeta[group.stage];
  const label = t(lang, meta.labelKey);

  return (
    <article
      data-stage={group.stage}
      className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      <header
        className={cn(
          'mb-4 flex items-center justify-between gap-2 rounded-lg px-3 py-2',
          meta.headerBg
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn('h-2.5 w-2.5 shrink-0 rounded-full', meta.dotSolid)}
            aria-hidden="true"
          />
          <h3 className={cn('truncate text-sm font-semibold sm:text-base', meta.text)}>{label}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-slate-800 dark:text-slate-400">
          {group.startYear}–{group.endYear}
        </span>
      </header>

      <ol className="flex flex-col gap-4">
        {group.items.map(item => (
          <StageItem key={item.id} item={item} meta={meta} />
        ))}
      </ol>
    </article>
  );
}

interface StageItemProps {
  item: TimelineItem;
  meta: StageMeta;
}

function StageItem({ item, meta }: StageItemProps) {
  const { lang } = useLanguage();
  const isExp = Boolean(item.expTitle);
  const title = isExp ? item.expTitle : item.eduTitle;
  const subtitle = isExp ? item.expSubtitle : item.eduSubtitle;

  return (
    <li className="flex gap-3">
      <span
        className={cn(
          'mt-1.5 h-3 w-3 shrink-0 rounded-full',
          isExp ? meta.dotSolid : cn('border-2 bg-white dark:bg-slate-900', meta.dotHollow)
        )}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className={cn('text-xs font-bold', meta.text)}>{item.year}</span>
          <span className="sr-only">
            {isExp ? t(lang, 'home.timelineExperience') : t(lang, 'home.timelineEducation')}
          </span>
        </div>
        <p className="text-sm font-medium leading-snug text-neutral-900 dark:text-white">{title}</p>
        {subtitle && <p className="text-xs text-neutral-500 dark:text-slate-400">{subtitle}</p>}
        <p className="mt-1 text-xs text-neutral-500 dark:text-slate-400">
          {item.startDateStr} – {item.endDateStr}
        </p>
        {item.durationStr && (
          <span className="mt-1.5 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-slate-800 dark:text-slate-400">
            {item.durationStr}
          </span>
        )}
      </div>
    </li>
  );
}
