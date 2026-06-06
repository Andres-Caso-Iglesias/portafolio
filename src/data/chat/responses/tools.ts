import { type ChatResponse } from "../types";

export const toolsResponse: ChatResponse = {
  id: "tools",
  keywords: [
    // Español - específicos
    "herramientas desarrollo",
    "vscode ide principal",
    "tmux zellij terminal",
    "docker contenedores",
    "azure devops ci cd",
    // Inglés
    "development tools",
    "vscode main ide",
    "tmux zellij terminal",
    "docker containers",
    "azure devops ci cd",
  ],
  message: {
    es: "Uso VS Code como IDE principal, con terminales como tmux o Zellij para productividad. Git para versiones, Docker para containers, y Azure DevOps para CI/CD. Mi entorno está optimizado para flujo de trabajo eficiente.",
    en: "I use VS Code as my main IDE, with terminals like tmux or Zellij for productivity. Git for versions, Docker for containers, and Azure DevOps for CI/CD. My environment is optimized for efficient workflow.",
  },
};