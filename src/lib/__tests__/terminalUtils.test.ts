import { describe, it, expect } from 'vitest';
import {
  parseTerminalCommand,
  getCommandOutput,
  isLangArg,
  type CommandOutputContext,
} from '@/lib/terminalUtils';

function makeCtx(overrides: Partial<CommandOutputContext> = {}): CommandOutputContext {
  return {
    t: (key: string) => `t:${key}`,
    lang: 'es',
    projects: [{ name: 'QReaper' }, { name: 'VulnPrio' }],
    ...overrides,
  };
}

describe('parseTerminalCommand', () => {
  it('parses a simple command', () => {
    expect(parseTerminalCommand('help')).toEqual({ command: 'help' });
  });

  it('parses a command with extra whitespace', () => {
    expect(parseTerminalCommand('  whoami  ')).toEqual({ command: 'whoami' });
  });

  it('parses spanish aliases', () => {
    expect(parseTerminalCommand('ayuda')).toEqual({ command: 'help' });
    expect(parseTerminalCommand('proyectos')).toEqual({ command: 'projects' });
    expect(parseTerminalCommand('habilidades')).toEqual({ command: 'skills' });
    expect(parseTerminalCommand('contacto')).toEqual({ command: 'contact' });
    expect(parseTerminalCommand('idioma')).toEqual({ command: 'lang' });
    expect(parseTerminalCommand('limpiar')).toEqual({ command: 'clear' });
  });

  it('parses commands case-insensitively', () => {
    expect(parseTerminalCommand('HELP')).toEqual({ command: 'help' });
    expect(parseTerminalCommand('Proyectos')).toEqual({ command: 'projects' });
  });

  it('captures the lang argument', () => {
    expect(parseTerminalCommand('lang en')).toEqual({ command: 'lang', arg: 'en' });
    expect(parseTerminalCommand('lang es')).toEqual({ command: 'lang', arg: 'es' });
  });

  it('returns null for free text', () => {
    expect(parseTerminalCommand('que experiencia tienes con Spring')).toBeNull();
  });

  it('returns null for empty input', () => {
    expect(parseTerminalCommand('')).toBeNull();
    expect(parseTerminalCommand('   ')).toBeNull();
  });

  it('returns null when the command word is unknown', () => {
    expect(parseTerminalCommand('unknown extra')).toBeNull();
  });
});

describe('getCommandOutput', () => {
  it('returns help lines from the dictionary', () => {
    const result = getCommandOutput({ command: 'help' }, makeCtx());
    expect(result).toEqual({ lines: ['t:terminal.helpBody'], kind: 'ok' });
  });

  it('returns whoami from the dictionary', () => {
    const result = getCommandOutput({ command: 'whoami' }, makeCtx());
    expect(result).toEqual({ lines: ['t:terminal.whoami'], kind: 'ok' });
  });

  it('returns skills from the dictionary', () => {
    const result = getCommandOutput({ command: 'skills' }, makeCtx());
    expect(result).toEqual({ lines: ['t:terminal.skills'], kind: 'ok' });
  });

  it('returns contact from the dictionary', () => {
    const result = getCommandOutput({ command: 'contact' }, makeCtx());
    expect(result).toEqual({ lines: ['t:terminal.contact'], kind: 'ok' });
  });

  it('lists project names', () => {
    const result = getCommandOutput({ command: 'projects' }, makeCtx());
    expect(result).toEqual({ lines: ['- QReaper', '- VulnPrio'], kind: 'ok' });
  });

  it('returns an error line when there are no projects', () => {
    const result = getCommandOutput({ command: 'projects' }, makeCtx({ projects: [] }));
    expect(result).toEqual({ lines: ['t:terminal.projectsEmpty'], kind: 'error' });
  });

  it('returns a usage error for lang without a valid argument', () => {
    expect(getCommandOutput({ command: 'lang' }, makeCtx())).toEqual({
      lines: ['t:terminal.langUsage'],
      kind: 'error',
    });
    expect(getCommandOutput({ command: 'lang', arg: 'fr' }, makeCtx())).toEqual({
      lines: ['t:terminal.langUsage'],
      kind: 'error',
    });
  });

  it('returns null for lang with a valid argument (side effect handled by caller)', () => {
    expect(getCommandOutput({ command: 'lang', arg: 'en' }, makeCtx())).toBeNull();
  });

  it('returns null for clear (side effect handled by caller)', () => {
    expect(getCommandOutput({ command: 'clear' }, makeCtx())).toBeNull();
  });
});

describe('isLangArg', () => {
  it('accepts es and en only', () => {
    expect(isLangArg('es')).toBe(true);
    expect(isLangArg('en')).toBe(true);
    expect(isLangArg('fr')).toBe(false);
    expect(isLangArg(undefined)).toBe(false);
  });
});
