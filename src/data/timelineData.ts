export interface TimelineItem {
  id: number;
  startDateStr: string;
  endDateStr: string;
  year: string;
  expTitle?: string;
  expSubtitle?: string;
  expColor?: "green" | "orange" | "blue";
  eduTitle?: string;
  eduSubtitle?: string;
  durationStr?: string;
  // Calculated positions for timeline layout
  startPos?: number; // 0-100 percentage
  endPos?: number; // 0-100 percentage
  durationMonths?: number;
  // For sorting
  sortDate?: { year: number; month: number };
}

export const rawTimelineData: TimelineItem[] = [
  // Education items (will appear in bottom bubbles)
  {
    id: 1,
    startDateStr: "septiembre 2023",
    endDateStr: "diciembre 2025",
    year: "2023",
    eduTitle: "Desarrollo de aplicaciones multiplataforma",
    eduSubtitle: "I.E.S. Juan José Calvo Miguel",
  },
  {
    id: 2,
    startDateStr: "septiembre 2022",
    endDateStr: "junio 2023",
    year: "2022",
    eduTitle: "Desarrollo de aplicaciones multiplataforma",
    eduSubtitle: "I.E.S. Nº1",
  },
  {
    id: 3,
    startDateStr: "enero 2021",
    endDateStr: "octubre 2021",
    year: "2021",
    eduTitle: "Administración de servicios de internet",
    eduSubtitle: "Mentiona",
  },
  {
    id: 4,
    startDateStr: "septiembre 2007",
    endDateStr: "febrero 2008",
    year: "2007",
    eduTitle: "Técnico en pastelería y panadería",
    eduSubtitle: "C.I.F.P. de hostelería y turismo",
  },
  {
    id: 5,
    startDateStr: "septiembre 2002",
    endDateStr: "junio 2005",
    year: "2002",
    eduTitle: "Técnico en cocina",
    eduSubtitle: "I.E.S. de Llanes",
  },
  {
    id: 6,
    startDateStr: "septiembre 2000",
    endDateStr: "junio 2002",
    year: "2000",
    eduTitle: "Bachiller humanidades y ciencias sociales",
    eduSubtitle: "I.E.S. Rey Pelayo",
  },
  // Experience items (top bubbles)
  {
    id: 7,
    startDateStr: "sept. 2006",
    endDateStr: "sept. 2007",
    year: "2006",
    expTitle: "Jefe de partida",
    expSubtitle: "Casa Marcial",
    expColor: "green" as const,
  },
  {
    id: 8,
    startDateStr: "sept. 2007",
    endDateStr: "abr. 2008",
    year: "2007",
    expTitle: "Ayudante de cocina",
    expSubtitle: "La Palmera",
    expColor: "green" as const,
  },
  {
    id: 9,
    startDateStr: "abr. 2008",
    endDateStr: "sept. 2008",
    year: "2008",
    expTitle: "Cocinero jefe de partida",
    expSubtitle: "The Royal Oak",
    expColor: "green" as const,
  },
  {
    id: 10,
    startDateStr: "oct. 2008",
    endDateStr: "mar. 2009",
    year: "2008",
    expTitle: "Ayudante de cocina",
    expSubtitle: "La Cuadra de Antón",
    expColor: "green" as const,
  },
  {
    id: 11,
    startDateStr: "abr. 2009",
    endDateStr: "mar. 2010",
    year: "2009",
    expTitle: "Cocinero",
    expSubtitle: "Casa María",
    expColor: "green" as const,
  },
  {
    id: 12,
    startDateStr: "abr. 2010",
    endDateStr: "nov. 2021",
    year: "2010",
    expTitle: "Jefe de cocina",
    expSubtitle: "Posada del Valle C.B.",
    expColor: "green" as const,
  },
  {
    id: 13,
    startDateStr: "mar. 2022",
    endDateStr: "mar. 2023",
    year: "2022",
    expTitle: "Chef ejecutivo",
    expSubtitle: "HPV C.B.",
    expColor: "green" as const,
  },
  {
    id: 14,
    startDateStr: "jul. 2023",
    endDateStr: "nov. 2023",
    year: "2023",
    expTitle: "Representante de ventas y almacén",
    expSubtitle: "Eurosigns C.B.",
    expColor: "orange" as const,
  },
  {
    id: 15,
    startDateStr: "abr. 2024",
    endDateStr: "oct. 2024",
    year: "2024",
    expTitle: "Operario maquinista",
    expSubtitle: "Quesería Lafuente S.A.",
    expColor: "orange" as const,
  },
    {
      id: 16,
      startDateStr: "oct. 2025",
      endDateStr: "ene. 2026",
      year: "2025",
      expTitle: "Residencia Técnica Profesional",
      expSubtitle: "Mecalux Software Solutions",
      expColor: "blue" as const,
    },
    {
      id: 17,
      startDateStr: "abr. 2026",
      endDateStr: "dic. 2026",
      year: "2026",
      eduTitle: "Máster en Ciberseguridad e IA",
      eduSubtitle: "Evolve - Enfoque en desarrollo seguro e inteligencia aplicada",
    },
];
