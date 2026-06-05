import { TimelineItem } from "@/data/timelineData";
import { calculateTimelinePositions } from "@/lib/timelineUtils";
import { cn } from "@/lib/utils";
import { t, useLanguage } from '@/lib/i18n'

interface TimelineMobileProps {
  items: TimelineItem[];
}

export default function TimelineMobile({ items }: TimelineMobileProps) {
  const { lang } = useLanguage()
  const positionedTimelineData = calculateTimelinePositions(items);

  return (
    <div className="md:hidden space-y-8 px-6">
      {/* Experience Section */}
      <div>
        <h3 className="text-lg font-semibold text-green-400 mb-4">
          {t(lang, 'home.timelineExperience')}
        </h3>
        {positionedTimelineData
          .filter((item) => item.expTitle)
          .map((item) => (
            <ExperienceItem
              key={`exp-mobile-${item.id}`}
              item={item}
            />
          ))}
      </div>

      {/* Education Section */}
      <div>
        <h3 className="text-lg font-semibold text-purple-400 mb-4">
          {t(lang, 'home.timelineEducation')}
        </h3>
        {positionedTimelineData
          .filter((item) => item.eduTitle)
          .map((item) => (
            <EducationItem
              key={`edu-mobile-${item.id}`}
              item={item}
            />
          ))}
      </div>
    </div>
  );
}

// Experience item component for mobile
function ExperienceItem({ item }: { item: TimelineItem }) {
  return (
    <div className="flex items-start gap-4 mb-4">
      <div
        className={cn(
          "w-3 h-3 rounded-full mt-1.5 flex-shrink-0",
          item.expColor === "green"
            ? "bg-green-500"
            : item.expColor === "orange"
            ? "bg-amber-500"
            : "bg-blue-500"
        )}
      />
      <div>
        <span
          className={cn(
            "font-bold",
            item.expColor === "green"
              ? "text-green-400"
              : item.expColor === "orange"
              ? "text-amber-400"
              : "text-blue-400"
          )}
        >
          {item.year}
        </span>
        <p className="text-white font-medium">{item.expTitle}</p>
        <p className="text-slate-400 text-sm">{item.expSubtitle}</p>
        {item.durationStr && (
          <p className="text-slate-400 text-xs mt-1">{item.durationStr}</p>
        )}
      </div>
    </div>
  );
}

// Education item component for mobile
function EducationItem({ item }: { item: TimelineItem }) {
  return (
    <div className="flex items-start gap-4 mb-4">
      <div className="w-3 h-3 rounded-full mt-1.5 bg-purple-500 flex-shrink-0" />
      <div>
        <span className="font-bold text-purple-400">{item.year}</span>
        <p className="text-white font-medium">{item.eduTitle}</p>
        <p className="text-slate-400 text-sm">{item.eduSubtitle}</p>
        {item.durationStr && (
          <p className="text-slate-400 text-xs mt-1">{item.durationStr}</p>
        )}
      </div>
    </div>
  );
}

