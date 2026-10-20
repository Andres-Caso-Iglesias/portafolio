import type { Lang } from '@/i18n/types';

export type TerminalCommand =
  'help' | 'whoami' | 'projects' | 'skills' | 'contact' | 'lang' | 'clear';

export interface ParsedTerminalCommand {
  command: TerminalCommand;
  arg?: string;
}

export interface TerminalProjectItem {
  name: string;
}

export interface CommandOutputContext {
  t: (key: string) => string;
  lang: Lang;
  projects: TerminalProjectItem[];
}

export interface CommandOutputResult {
  lines: string[];
  kind: 'ok' | 'error';
}

const COMMAND_ALIASES: Record<string, TerminalCommand> = {
  help: 'help',
  ayuda: 'help',
  whoami: 'whoami',
  projects: 'projects',
  proyectos: 'projects',
  skills: 'skills',
  habilidades: 'skills',
  contact: 'contact',
  contacto: 'contact',
  lang: 'lang',
  idioma: 'lang',
  clear: 'clear',
  limpiar: 'clear',
};

export const TERMINAL_COMMAND_LIST: TerminalCommand[] = [
  'help',
  'whoami',
  'projects',
  'skills',
  'contact',
  'lang',
  'clear',
];

export function parseTerminalCommand(input: string): ParsedTerminalCommand | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const [first, ...rest] = trimmed.split(/\s+/);
  const command = COMMAND_ALIASES[first.toLowerCase()];
  if (!command) return null;
  const arg = rest.join(' ').trim();
  return arg ? { command, arg } : { command };
}

function linesFrom(text: string): string[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
}

export function getCommandOutput(
  parsed: ParsedTerminalCommand,
  ctx: CommandOutputContext
): CommandOutputResult | null {
  switch (parsed.command) {
    case 'help':
      return { lines: linesFrom(ctx.t('terminal.helpBody')), kind: 'ok' };
    case 'whoami':
      return { lines: linesFrom(ctx.t('terminal.whoami')), kind: 'ok' };
    case 'skills':
      return { lines: linesFrom(ctx.t('terminal.skills')), kind: 'ok' };
    case 'contact':
      return { lines: linesFrom(ctx.t('terminal.contact')), kind: 'ok' };
    case 'projects':
      if (ctx.projects.length === 0) {
        return { lines: [ctx.t('terminal.projectsEmpty')], kind: 'error' };
      }
      return { lines: ctx.projects.map(project => `- ${project.name}`), kind: 'ok' };
    case 'lang':
      if (parsed.arg === 'es' || parsed.arg === 'en') return null;
      return { lines: linesFrom(ctx.t('terminal.langUsage')), kind: 'error' };
    case 'clear':
      return null;
  }
}

export function isLangArg(arg: string | undefined): arg is Lang {
  return arg === 'es' || arg === 'en';
}
