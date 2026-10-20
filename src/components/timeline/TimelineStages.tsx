'use client';

import { TimelineStageGroup } from '@/lib/timelineUtils';
import StagePanel from './StagePanel';

interface TimelineStagesProps {
  groups: TimelineStageGroup[];
}

/**
 * Fase 2 — Timeline agrupada por etapas (Cocina -> Logística -> IT -> Formación).
 * Responsive: single column on mobile, two columns on md, four on xl.
 */
export default function TimelineStages({ groups }: TimelineStagesProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {groups.map(group => (
        <StagePanel key={group.stage} group={group} />
      ))}
    </div>
  );
}
