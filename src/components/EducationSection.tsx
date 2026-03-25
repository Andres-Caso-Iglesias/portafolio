import { educationData } from "@/data/educationData";

export default function EducationSection() {
  return (
    <section className="py-20 px-6 bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Educación y Formación
        </h2>
        <div className="space-y-6">
          {educationData.map((edu) => (
            <div key={edu.id} className="bg-slate-900 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <span className="text-xl">🎓</span>
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