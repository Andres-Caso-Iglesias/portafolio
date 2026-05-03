"use client";
import { educationData } from "@/data/educationData";

export default function EducationSection() {
  // Sort education chronologically (oldest first) so Master (2026) appears in its correct position
  const getYearFromEdu = (edu: typeof educationData[number]) => {
    const yearMatch = edu.period.match(/(\d{4})/g);
    if (yearMatch && yearMatch.length > 0) {
      // take the last year mentioned as the end of the period (or current)
      return parseInt(yearMatch[yearMatch.length - 1], 10);
    }
    return 0;
  }
  // Helper to extract start year from a period string like "Sep 2022 – Dic 2025" or similar
  const extractStartYear = (period?: string) => {
    if (!period) return 0
    const m = period.match(/(\d{4})/g)
    if (m && m.length > 0) {
      // The first year in the period is the start year
      return parseInt(m[0], 10)
    }
    return 0
  }
  const sortedEducation = educationData
    .slice()
    .sort((a, b) => {
      const byEnd = getYearFromEdu(b) - getYearFromEdu(a)
      if (byEnd !== 0) return byEnd
      // Tie-breaker: later start year comes first
      const aStart = extractStartYear(a.period)
      const bStart = extractStartYear(b.period)
      return bStart - aStart
    });

  return (
    <section className="py-20 px-6 bg-slate-800">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-white">
        Educación y Formación
      </h2>
        <div className="space-y-6">
          {sortedEducation.map((edu) => (
            <div key={edu.id} className="bg-slate-900 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
                {edu.title}
              </h3>
              <p className="text-sm text-slate-400 mb-2">
                {edu.institution} · {edu.period}
              </p>
              {edu.details && edu.details.length > 0 && (
                <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                  {edu.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
