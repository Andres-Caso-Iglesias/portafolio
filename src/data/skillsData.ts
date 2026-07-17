export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  // Ciberseguridad
  {
    category: 'OSINT',
    items: ['Maigret', 'Sherlock', 'Whatsmyname', 'OSINT-Framework', 'Google Dorks'],
  },
  {
    category: 'Sistemas Operativos',
    items: ['Windows Server', 'Windows', 'Kali Linux', 'Ubuntu', 'Bash Scripting'],
  },
  {
    category: 'Redes',
    items: ['Firewalls', 'VPN', 'Wireshark', 'TCP/IP', 'NMAP', 'Gobuster', 'Burp Suite'],
  },
  // Desarrollo - Lenguajes
  {
    category: 'Lenguajes',
    items: ['C#', 'Java 17', 'TypeScript', 'Dart', 'PL/SQL'],
  },
  // Desarrollo - Frameworks
  {
    category: 'Frameworks',
    items: ['.NET', 'NestJS 10', 'LINQ', 'Spring Boot 3.x'],
  },
  // Desarrollo - Bases de Datos
  {
    category: 'Bases de Datos',
    items: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB'],
  },
  // Desarrollo - DevOps & Cloud
  {
    category: 'DevOps & Cloud',
    items: ['Azure', 'Docker', 'Git', 'Hyper-V', 'VMware', 'VirtualBox'],
  },
  // Desarrollo - Herramientas de IA
  {
    category: 'Herramientas de IA',
    items: [
      'Antigravity',
      'OpenCode',
      'notebookLM',
      'GitHub Copilot',
      'Claude',
      'Gemini',
      'ChatGPT',
    ],
  },
];
