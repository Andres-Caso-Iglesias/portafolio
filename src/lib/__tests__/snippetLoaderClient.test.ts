import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectLanguage, loadSnippetsClient } from '@/lib/snippetLoaderClient';

beforeEach(() => {
  vi.restoreAllMocks();
  Object.defineProperty(window, 'location', {
    value: { origin: 'http://localhost:3000' },
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('detectLanguage (client)', () => {
  it('detects TypeScript (.ts)', () => {
    expect(detectLanguage('utils.ts')).toBe('typescript');
  });

  it('detects TSX (.tsx)', () => {
    expect(detectLanguage('Component.tsx')).toBe('tsx');
  });

  it('detects JavaScript (.js)', () => {
    expect(detectLanguage('script.js')).toBe('javascript');
  });

  it('detects JSX (.jsx)', () => {
    expect(detectLanguage('App.jsx')).toBe('jsx');
  });

  it('detects Java (.java)', () => {
    expect(detectLanguage('Main.java')).toBe('java');
  });

  it('detects C# (.cs)', () => {
    expect(detectLanguage('Controller.cs')).toBe('csharp');
  });

  it('detects SQL (.sql)', () => {
    expect(detectLanguage('query.sql')).toBe('sql');
  });

  it('detects Python (.py)', () => {
    expect(detectLanguage('main.py')).toBe('python');
  });

  it('detects Markdown (.md)', () => {
    expect(detectLanguage('README.md')).toBe('markdown');
  });

  it('detects JSON (.json)', () => {
    expect(detectLanguage('config.json')).toBe('json');
  });

  it('detects YAML (.yml)', () => {
    expect(detectLanguage('config.yml')).toBe('yaml');
  });

  it('detects YAML (.yaml)', () => {
    expect(detectLanguage('config.yaml')).toBe('yaml');
  });

  it('detects Bash (.sh)', () => {
    expect(detectLanguage('deploy.sh')).toBe('bash');
  });

  it('returns text for unknown extension', () => {
    expect(detectLanguage('file.xyz')).toBe('text');
  });

  it('returns text for file with no extension', () => {
    expect(detectLanguage('Makefile')).toBe('text');
  });

  it('handles path with directories', () => {
    expect(detectLanguage('/src/components/App.tsx')).toBe('tsx');
  });

  it('is case-insensitive for extensions', () => {
    expect(detectLanguage('file.TS')).toBe('typescript');
    expect(detectLanguage('file.Ts')).toBe('typescript');
  });
});

describe('loadSnippetsClient', () => {
  it('fetches file content and returns Snippet array', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        text: vi.fn().mockResolvedValue('const x = 1;'),
      })
    );

    const result = await loadSnippetsClient(['/snippets/app.ts']);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/snippets/app.ts');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      path: '/snippets/app.ts',
      language: 'typescript',
      content: 'const x = 1;',
    });
  });

  it('handles multiple paths', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({
          text: vi.fn().mockResolvedValue('code A'),
        })
        .mockResolvedValueOnce({
          text: vi.fn().mockResolvedValue('code B'),
        })
    );

    const result = await loadSnippetsClient(['/snippets/a.ts', '/snippets/b.sql']);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(2);
    expect(result[0].language).toBe('typescript');
    expect(result[1].language).toBe('sql');
  });

  it('returns error fallback when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network')));

    const result = await loadSnippetsClient(['/snippets/missing.ts']);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      path: '/snippets/missing.ts',
      language: 'typescript',
      content: 'Error loading snippet',
    });
  });

  it('returns error fallback when response.text() fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        text: vi.fn().mockRejectedValue(new Error('Parse error')),
      })
    );

    const result = await loadSnippetsClient(['/snippets/bad.ts']);

    expect(result[0].content).toBe('Error loading snippet');
  });

  it('constructs URL using window.location.origin', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        text: vi.fn().mockResolvedValue('ok'),
      })
    );

    await loadSnippetsClient(['/snippets/test.ts']);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/snippets/test.ts');
  });

  it('preserves path without leading slash', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        text: vi.fn().mockResolvedValue('ok'),
      })
    );

    await loadSnippetsClient(['snippets/test.ts']);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000snippets/test.ts');
  });
});
