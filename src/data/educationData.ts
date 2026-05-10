export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period: string; // e.g., "Sep 2020 – Jun 2022"
  details?: string[];
  enTitle?: string;
  enInstitution?: string;
  enPeriod?: string;
  enDetails?: string[];
}

export const educationData: EducationItem[] = [
  {
    id: "1",
    enTitle: "Master in Cybersecurity and AI",
    enInstitution: "Evolve",
    enPeriod: "Apr 2026 – Dec 2026",
    enDetails: [
      "Focus on system security, cryptography, and applied AI",
      "Projects on practical pentesting, incident management, and defense in depth",
      "Collaborating with development teams to integrate security practices",
    ],
    title: "Máster en Ciberseguridad e IA",
    institution: "Evolve",
    period: "abr 2026 – dic 2026",
    details: [
      "Enfoque en seguridad de sistemas, criptografía e IA aplicada",
      "Con foco en la obtención de la certificación eJPT (eLearnSecurity)",
      "Proyectos prácticos de pentesting, gestión de incidentes y defensa en profundidad",
      "Colaboración con equipos de desarrollo para incorporar prácticas de seguridad",
    ]
  },
  {
    id: "2",
    enTitle: "Higher Technician in Multiplatform Application Development",
    enInstitution: "IES Juan Jose Calvo Miguel, Sotrondio",
    enPeriod: "Sep 2022 – Dec 2025",
    enDetails: [
      "Final project: Multiplatform task management app (Flutter + Firebase)",
      "MongoDB Java Developer Path certification",
      "Specialization in multiplatform development",
    ],
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
      id: "3",
      title: "Residencia Técnica Profesional",
      institution: "Mecalux Software Solutions",
      period: "oct 2025 – ene 2026",
      details: [
        "Residencia técnica de 4 meses en empresa líder en software logístico",
        "Desarrollo en C# y .NET Framework para sistemas de gestión de almacenes",
        "Optimización de procedimientos almacenados y consultas complejas en SQL Server",
        "Implementación de protocolos de seguridad NIS2 en software crítico",
        "Desarrollo y despliegue en ecosistema .NET & Azure",
        "Participación en metodologías ágiles y revisiones de código"
      ],
      enTitle: "Professional Technical Residency",
      enInstitution: "Mecalux Software Solutions",
      enPeriod: "Oct 2025 – Jan 2026",
      enDetails: [
        "4-month technical residency at leading logistics software company",
        "Development in C# and .NET Framework for warehouse management systems",
        "Optimization of stored procedures and complex queries in SQL Server",
        "Implementation of NIS2 security protocols in critical software",
        "Development and deployment within .NET & Azure ecosystem",
        "Participation in agile methodologies and code reviews"
      ]
    },
  {
    id: "4",
    enTitle: "Internet services administration",
    enInstitution: "Mentiona",
    enPeriod: "Jan 2021 – Oct 2021",
    enDetails: [
      "Network administration",
      "Active Directory",
      "IIS, DNS",
      "Application deployment, data handling"
    ],
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
    id: "5",
    enTitle: "Technical Leadership Professional Experience",
    enInstitution: "Hospitality and Logistics Sector",
    enPeriod: "2003 – 2020",
    enDetails: [
      "Team leadership of up to 10 people",
      "High-pressure operations management",
      "Process optimization in logistics",
      "Continuous leadership training in hospitality"
    ],
    title: "Experiencia Profesional Liderazgo Técnico",
    institution: "Sector Hostelería y Logística",
    period: "2003 – 2020",
    details: [
      "Direccion de equipos de hasta 10 personas",
      "Gestión de operaciones bajo presión alta",
      "Optimización de procesos logísticos",
      "Formación continua en gestión y liderazgo en hosteleria"
    ]
  }
];
