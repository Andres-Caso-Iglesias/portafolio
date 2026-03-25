export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period: string; // e.g., "Sep 2020 – Jun 2022"
  details?: string[];
}

export const educationData: EducationItem[] = [
  {
    id: "1",
    title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
    institution: "IES Leopoldo Alas Clarín, Oviedo",
    period: "Sep 2020 – Jun 2022",
    details: [
      "Proyecto final: Aplicación de gestión de tareas multiplataforma (Flutter + Firebase)",
      "Certificación en Fundamentos de Azure (AZ-900)",
      "Especialización en desarrollo multiplataforme y administración de servicios de internet"
    ]
  },
  {
    id: "2",
    title: "Formación Práctica en Desarrollo de Software",
    institution: "Mecalux Software Solutions",
    period: "Jan 2023 – Mar 2023",
    details: [
      "Desarrollo en C# y .NET Framework",
      "Optimización de bases de datos SQL Server",
      "Implementación de seguridad NIS2",
      "Gestión de entornos cloud en Azure",
      "Metodologías ágiles de desarrollo"
    ]
  },
  {
    id: "3",
    title: "Experiencia Profesional Liderazgo Técnico",
    institution: "Sector Hostelería y Logística",
    period: "2003 – 2020",
    details: [
      "Lideramiento de equipos de hasta 50 personas",
      "Gestión de operaciones bajo presión alta",
      "Optimización de procesos logísticos",
      "Formación continua en gestión y liderazgo"
    ]
  }
];