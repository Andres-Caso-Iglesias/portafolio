export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Lenguajes",
    items: ["C#", "Java 17", "TypeScript", "Dart", "PL/SQL"],
  },
  {
    category: "Frameworks",
    items: [".NET", "NestJS 10", "LINQ", "Spring Boot 3.x"],
  },
  {
    category: "Bases de Datos",
    items: ["PostgreSQL", "SQL Server", "MySQL", "MongoDB"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Azure", "Docker", "Git", "Hyper-V"],
  },
  {
    category: "Herramientas de IA",
    items: ["Antigravity", "OpenCode", "notebookLM", "GitHub Copilot", "Claude", "Gemini", "ChatGPT"],
  }
];