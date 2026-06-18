import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TimelineItem } from '@/data/timelineData';
import { calculateTimelinePositions } from '@/lib/timelineUtils';
import { t, useLanguage } from '@/lib/i18n';

interface TimelineDesktopProps {
  items: TimelineItem[];
}

export default function TimelineDesktop({ items }: TimelineDesktopProps) {
  const { lang } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const positioned = calculateTimelinePositions(items);

  // Calculate display positions to prevent overlapping years
  const displayItems = positioned.map(item => ({ ...item, displayPos: item.startPos! }));

  const resolveCollisions = (itemsToResolve: typeof displayItems) => {
    itemsToResolve.sort((a, b) => a.displayPos - b.displayPos);
    for (let i = 1; i < itemsToResolve.length; i++) {
      if (itemsToResolve[i].displayPos - itemsToResolve[i - 1].displayPos < 4.5) {
        itemsToResolve[i].displayPos = itemsToResolve[i - 1].displayPos + 4.5;
      }
    }
  };

  resolveCollisions(displayItems.filter(i => i.expTitle));
  resolveCollisions(displayItems.filter(i => i.eduTitle));

  const hoveredItem = displayItems.find(i => i.id === hoveredId);

  const getEventTheme = (item: TimelineItem) => {
    // defaults to purple for education
    if (item.eduTitle)
      return {
        border: 'border-purple-500',
        text: 'text-purple-400',
        bgSemi: 'bg-purple-500/20',
        bar: 'bg-purple-500',
      };
    if (item.expColor === 'green')
      return {
        border: 'border-green-500',
        text: 'text-green-400',
        bgSemi: 'bg-green-500/20',
        bar: 'bg-green-500',
      };
    if (item.expColor === 'orange')
      return {
        border: 'border-amber-500',
        text: 'text-amber-400',
        bgSemi: 'bg-amber-500/20',
        bar: 'bg-amber-500',
      };
    if (item.expColor === 'blue')
      return {
        border: 'border-blue-500',
        text: 'text-blue-400',
        bgSemi: 'bg-blue-500/20',
        bar: 'bg-blue-500',
      };
    return {
      border: 'border-purple-500',
      text: 'text-purple-400',
      bgSemi: 'bg-purple-500/20',
      bar: 'bg-purple-500',
    };
  };

  return (
    <div className="relative min-h-[500px] hidden md:block w-full max-w-[98%] mx-auto mt-12 mb-20 px-4">
      {/* Tracks */}
      <div className="absolute left-[4%] right-[4%] top-[40%] h-[2px] bg-slate-700/50 rounded-full" />
      <div className="absolute left-[4%] right-[4%] top-[60%] h-[2px] bg-slate-700/50 rounded-full" />

      {/* Track Labels */}
      <div
        className="absolute left-[4%] text-slate-400 text-xs font-semibold uppercase tracking-widest pl-2 border-l-2 border-slate-600"
        style={{ top: 'calc(40% - 30px)' }}
      >
        {t(lang, 'home.timelineExperience')}
      </div>
      <div
        className="absolute left-[4%] text-slate-400 text-xs font-semibold uppercase tracking-widest pl-2 border-l-2 border-slate-600"
        style={{ top: 'calc(60% - 30px)' }}
      >
        {t(lang, 'home.timelineEducation')}
      </div>

      {/* Hover Duration Bar */}
      {hoveredItem && (
        <div
          className={cn(
            'absolute top-[40%] h-[20%] opacity-20 transition-all duration-300 pointer-events-none rounded-md',
            getEventTheme(hoveredItem).bar
          )}
          style={{
            left: `calc(4% + ${hoveredItem.displayPos * 0.92}%)`,
            width: `calc(${Math.max(hoveredItem.endPos! - hoveredItem.displayPos, 1.5) * 0.92}%)`,
          }}
        />
      )}

      {/* Timeline Points */}
      {displayItems.map(item => {
        const isExp = !!item.expTitle;
        const isHovered = hoveredId === item.id;
        const theme = getEventTheme(item);
        const topClass = isExp ? 'top-[40%]' : 'top-[60%]';
        const zIndex = isHovered ? 'z-40' : 'z-20';

        return (
          <div
            key={item.id}
            className={cn(
              'absolute -translate-y-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group',
              topClass,
              zIndex
            )}
            style={{ left: `calc(4% + ${item.displayPos * 0.92}%)` }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Point */}
            <div
              className={cn(
                'w-4 h-4 rounded-full border-2 transition-all duration-300 bg-slate-900',
                theme.border,
                isHovered ? 'scale-150 bg-slate-800 ring-4 ring-white/10' : 'group-hover:scale-125'
              )}
            />

            {/* Year Label */}
            <span
              className={cn(
                'absolute mt-6 text-base font-bold whitespace-nowrap transition-all duration-300',
                theme.text,
                isHovered ? 'opacity-100 scale-110' : 'opacity-40'
              )}
            >
              {item.year}
            </span>

            {/* Title / Info Bubble */}
            {isHovered && (
              <div
                className={cn(
                  'absolute left-1/2 -translate-x-1/2 w-60 p-4 transition-all duration-300 pointer-events-none',
                  theme.bgSemi,
                  'rounded-xl shadow-2xl border border-white/5 backdrop-blur-md',
                  isExp ? 'bottom-8 mb-4' : 'top-8 mt-4'
                )}
              >
                {/* Connector Triangle */}
                <div
                  className={cn(
                    'absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent pointer-events-none',
                    isExp
                      ? 'border-t-8 border-t-white/10 -bottom-[8px]'
                      : 'border-b-8 border-b-white/10 -top-[8px]'
                  )}
                />

                <h4 className="font-bold text-white text-[13px] leading-tight text-center mb-1.5 drop-shadow-sm">
                  {isExp ? item.expTitle : item.eduTitle}
                </h4>
                <p className="text-[11px] text-slate-300 text-center leading-snug">
                  {isExp ? item.expSubtitle : item.eduSubtitle}
                </p>
                {item.durationStr && (
                  <div
                    className={cn(
                      'mt-3 text-[10px] font-bold tracking-wide text-center px-2.5 py-1 rounded-full w-fit mx-auto bg-slate-900/60 shadow-inner',
                      theme.text
                    )}
                  >
                    {item.durationStr}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-6 z-20 w-full px-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-slate-400 text-[11px] font-medium tracking-wide uppercase">
            {t(lang, 'home.legendHospitality')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <span className="text-slate-400 text-[11px] font-medium tracking-wide uppercase">
            {t(lang, 'home.legendLogistics')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <span className="text-slate-400 text-[11px] font-medium tracking-wide uppercase">
            {t(lang, 'home.legendIT')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          <span className="text-slate-400 text-[11px] font-medium tracking-wide uppercase">
            {t(lang, 'home.legendTraining')}
          </span>
        </div>
      </div>
    </div>
  );
}
