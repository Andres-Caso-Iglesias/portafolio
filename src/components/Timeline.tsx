'use client';

import TimelineStages from '@/components/timeline/TimelineStages';
import { rawTimelineData } from '@/data/timelineData';
import { groupTimelineByStage } from '@/lib/timelineUtils';
import Reveal from '@/components/Reveal';
import { t, useLanguage } from '@/lib/i18n';

export default function Timeline() {
  const { lang } = useLanguage();
  const groups = groupTimelineByStage(rawTimelineData);

  return (
    <section
      id="trayectoria"
      className="bg-slate-50 px-6 py-20 transition-colors duration-300 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-white">
            {t(lang, 'home.timelineTitle')}
          </h2>
          <TimelineStages groups={groups} />
        </Reveal>
      </div>
    </section>
  );
}
