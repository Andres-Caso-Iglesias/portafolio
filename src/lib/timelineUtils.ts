import { TimelineItem } from "@/data/timelineData";

// Helper to parse Spanish month names to number
export function parseSpanishDate(dateStr: string): { year: number; month: number } | null {
  const months: { [key: string]: number } = {
    enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
    julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
    ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6,
    jul: 7, ago: 8, sept: 9, oct: 10, nov: 11, dic: 12
  };
  // Normalize: lowercase, remove punctuation
  const clean = dateStr.toLowerCase().replace(/[.,]/g, "").trim();
  // Expected format: "mes año" or "mes año - mes año"
  const parts = clean.split(/\s+/);
  // Find month and year
  let month = null;
  let year = null;
  for (const p of parts) {
    if (months[p] !== undefined) {
      month = months[p];
    } else {
      const y = parseInt(p);
      if (!isNaN(y) && y >= 1000 && y <= 9999) {
        year = y;
      }
    }
  }
  if (month !== null && year !== null) {
    return { year, month };
  }
  return null;
}

// Compute duration in months between two dates
export function computeDurationInMonths(startStr: string, endStr: string): number {
  const start = parseSpanishDate(startStr);
  const end = parseSpanishDate(endStr);
  if (!start || !end) {
    return 0;
  }
  let totalMonths = (end.year - start.year) * 12 + (end.month - start.month);
  return Math.max(0, totalMonths);
}

// Compute duration string (e.g., "2 años 3 meses")
export function computeDurationString(startStr: string, endStr: string): string {
  const months = computeDurationInMonths(startStr, endStr);
  if (months === 0) return "< 1 mes";
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  let parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} año${years > 1 ? "s" : ""}`);
  }
  if (remainingMonths > 0) {
    parts.push(`${remainingMonths} mes${remainingMonths > 1 ? "es" : ""}`);
  }
  return parts.join(" ");
}

// Calculate normalized positions (0-100%) for timeline items
export function calculateTimelinePositions(items: TimelineItem[]): TimelineItem[] {
  // Sort timeline data chronologically by start date
  const sortedTimelineData = items
    .map(item => {
      const startDate = parseSpanishDate(item.startDateStr);
      return {
        ...item,
        sortDate: startDate
      };
    })
    .sort((a, b) => {
      if (!a.sortDate || !b.sortDate) return 0;
      if (a.sortDate.year !== b.sortDate.year) {
        return a.sortDate.year - b.sortDate.year;
      }
      return a.sortDate.month - b.sortDate.month;
    })
    .map(item => {
      const { sortDate, ...rest } = item;
      return rest;
    });

  // Calculate positions for all items
  const timelineData = sortedTimelineData.map(item => {
    const startDate = parseSpanishDate(item.startDateStr)!;
    const endDate = parseSpanishDate(item.endDateStr)!;
    const durationMonths = computeDurationInMonths(item.startDateStr, item.endDateStr);
    
    return {
      ...item,
      durationMonths,
      durationStr: computeDurationString(item.startDateStr, item.endDateStr),
      // Positions will be calculated after we find min/max dates
      startPos: 0,
      endPos: 0
    };
  });

  // Find the earliest and latest dates to normalize positions
  const allDatesRaw = timelineData.flatMap(item => [
    parseSpanishDate(item.startDateStr),
    parseSpanishDate(item.endDateStr)
  ]);

  // Filter out any nulls to avoid runtime errors when reading .year
  const allDates = allDatesRaw.filter((d): d is { year: number; month: number } => d != null);

  const minYear = Math.min(...allDates.map(d => d.year));
  // For min month, consider entries that have the min year
  const minDate = {
    year: minYear,
    month: Math.min(
      ...allDates.filter(d => d.year === minYear).map(d => d.month)
    )
  };

  const maxYear = Math.max(...allDates.map(d => d.year));
  const maxDate = {
    year: maxYear,
    month: Math.max(
      ...allDates.filter(d => d.year === maxYear).map(d => d.month)
    )
  };

  const totalMonths = (maxDate.year - minDate.year) * 12 + (maxDate.month - minDate.month);

  // Calculate normalized positions (0-100%)
  const positionedTimelineData = timelineData.map(item => {
    const startDate = parseSpanishDate(item.startDateStr);
    const endDate = parseSpanishDate(item.endDateStr);
    
    if (!startDate || !endDate) {
      return { ...item, startPos: 0, endPos: 0 };
    }
    const startMonthsFromMin = (startDate.year - minDate.year) * 12 + (startDate.month - minDate.month);
    const endMonthsFromMin = (endDate.year - minDate.year) * 12 + (endDate.month - minDate.month);
    
    const startPos = (startMonthsFromMin / totalMonths) * 100;
    const endPos = (endMonthsFromMin / totalMonths) * 100;
    
    return {
      ...item,
      startPos,
      endPos
    };
  });

  return positionedTimelineData;
}

// Experience colors mapping
export const expColors = {
  green: { border: "border-green-500", text: "text-green-400", bubble: "bg-green-500", line: "from-green-500 to-green-400" },
  orange: { border: "border-amber-500", text: "text-amber-400", bubble: "bg-amber-400", line: "from-amber-500 to-amber-400" },
  blue: { border: "border-blue-500", text: "text-blue-400", bubble: "bg-blue-500", line: "from-blue-500 to-blue-400" },
};
