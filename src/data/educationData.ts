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
    institution: "IES Juan Jose Calvo Miguel, Sotrondio",
    period: "Sep 2022 – Dic 2025",
    details: [
      "Proyecto final: Aplicación de gestión de tareas multiplataforma (Flutter + Firebase)",
      "Certificación MongoDB Java Developer Path",
      "Especialización en desarrollo multiplataforme "
    ]
  },
  {
    id: "2",
    title: "Formación Práctica en Desarrollo de Software",
    institution: "Mecalux Software Solutions",
    period: "oct 2025 – dic 2025",
    details: [
      "Desarrollo en C# y .NET Framework",
      "Optimización de bases de datos SQL Server",
      "Implementación de seguridad NIS2",
      "Gestión de entornos cloud en Azure",
      "Metodologías ágiles de desarrollo",
      "Logistica"
    ]
  },
  {
    id: "3",
    title: "Administración de servicios de internet",
    institution: "Mentiona",
    period: " ene 2021 – oct 2021",
    details: [
      "Administracion de redes",
      "Active Directory",
      "IIS, DNS",
      "Despliegue de aplicaciones, manejo de datos "
    ]
  },
  {
    id: "4",
    title: "Experiencia Profesional Liderazgo Técnico",
    institution: "Sector Hostelería y Logística",
    period: "2003 – 2020",
    details: [
      "Direccion de equipos de hasta 10 personas",
      "Gestión de operaciones bajo presión alta",
      "Optimización de procesos logísticos",
      "Formación continua en gestión y liderazgo en hosteleria"
    ]
  },
  {
    id: "5",
    title: "Máster en Ciberseguridad e IA",
    institution: "Evolve",
    period: "abr 2026 – presente",
    details: [
      "Enfoque en seguridad de sistemas, criptografía e IA aplicada",
      "Con foco en la obtención de la certificación eJPT (eLearnSecurity)",
      "Proyectos prácticos de pentesting, gestión de incidentes y defensa en profundidad",
      "Colaboración con equipos de desarrollo para incorporar prácticas de seguridad",
    ]
  }
];
