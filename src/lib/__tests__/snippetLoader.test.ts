import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('server-only', () => ({}));

const { mockReadFile } = vi.hoisted(() => ({
  mockReadFile: vi.fn(),
}));

vi.mock('fs', () => ({
  __esModule: true,
  default: { promises: { readFile: mockReadFile } },
  promises: { readFile: mockReadFile },
}));

import { detectLanguage, loadSnippetsServer } from '@/lib/snippetLoader';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('detectLanguage (server)', () => {
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

describe('loadSnippetsServer', () => {
  it('reads file content and returns Snippet array', async () => {
    mockReadFile.mockResolvedValue('const x = 1;');

    const result = await loadSnippetsServer(['/snippets/app.ts']);

    expect(mockReadFile).toHaveBeenCalledWith(
      expect.stringMatching(/public[/\\]snippets[/\\]app\.ts$/),
      'utf-8'
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      path: '/snippets/app.ts',
      language: 'typescript',
      content: 'const x = 1;',
    });
  });

  it('handles multiple paths', async () => {
    mockReadFile.mockResolvedValueOnce('code A').mockResolvedValueOnce('code B');

    const result = await loadSnippetsServer(['/snippets/a.ts', '/snippets/b.sql']);

    expect(mockReadFile).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(2);
    expect(result[0].language).toBe('typescript');
    expect(result[1].language).toBe('sql');
    expect(result[0].content).toBe('code A');
    expect(result[1].content).toBe('code B');
  });

  it('strips leading slash from path before joining', async () => {
    mockReadFile.mockResolvedValue('content');

    await loadSnippetsServer(['/snippets/test.js']);

    expect(mockReadFile).toHaveBeenCalledWith(
      expect.stringMatching(/public[/\\]snippets[/\\]test\.js$/),
      'utf-8'
    );
  });

  it('does not double-strip paths without leading slash', async () => {
    mockReadFile.mockResolvedValue('content');

    await loadSnippetsServer(['snippets/test.js']);

    expect(mockReadFile).toHaveBeenCalledWith(
      expect.stringMatching(/public[/\\]snippets[/\\]test\.js$/),
      'utf-8'
    );
  });

  it('propagates file read errors', async () => {
    mockReadFile.mockRejectedValue(new Error('ENOENT'));

    await expect(loadSnippetsServer(['/missing/file.ts'])).rejects.toThrow('ENOENT');
  });
});
