"use client";

import { TimelineItem } from "@/data/timelineData";
import TimelineDesktop from "@/components/timeline/TimelineDesktop";
import TimelineMobile from "@/components/timeline/TimelineMobile";
import { rawTimelineData } from "@/data/timelineData";
import { t, useLanguage } from '@/lib/i18n'

export default function Timeline() {
  const { lang } = useLanguage()
  return (
    <section className="py-20 bg-slate-900 overflow-hidden">
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-16 text-white text-center">
          {t(lang, 'home.timelineTitle')}
        </h2>

        <TimelineDesktop items={rawTimelineData} />
        <TimelineMobile items={rawTimelineData} />
      </div>
    </section>
  );
}
