import 'server-only';

import { promises as fs } from 'fs';
import path from 'path';

export interface Snippet {
  path: string;
  language: string;
  content: string;
}

const EXTENSION_MAP: Record<string, string> = {
  '.ts': 'typescript',
  '.tsx': 'tsx',
  '.js': 'javascript',
  '.jsx': 'jsx',
  '.java': 'java',
  '.cs': 'csharp',
  '.sql': 'sql',
  '.py': 'python',
  '.md': 'markdown',
  '.json': 'json',
  '.yml': 'yaml',
  '.yaml': 'yaml',
  '.sh': 'bash',
};

export function detectLanguage(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return EXTENSION_MAP[ext] ?? 'text';
}

export async function loadSnippetsServer(paths: string[]): Promise<Snippet[]> {
  return Promise.all(
    paths.map(async p => {
      const relative = p.startsWith('/') ? p.slice(1) : p;
      const fullPath = path.join(process.cwd(), 'public', relative);
      const content = await fs.readFile(fullPath, 'utf-8');
      return {
        path: p,
        language: detectLanguage(p),
        content,
      };
    })
  );
}
