"use client";

export interface Snippet {
  path: string;
  language: string;
  content: string;
}

const EXTENSION_MAP: Record<string, string> = {
  ".ts": "typescript",
  ".tsx": "tsx",
  ".js": "javascript",
  ".jsx": "jsx",
  ".java": "java",
  ".cs": "csharp",
  ".sql": "sql",
  ".py": "python",
  ".md": "markdown",
  ".json": "json",
  ".yml": "yaml",
  ".yaml": "yaml",
  ".sh": "bash",
};

export function detectLanguage(filePath: string): string {
  const idx = filePath.lastIndexOf(".");
  const ext = idx >= 0 ? filePath.slice(idx).toLowerCase() : "";
  return EXTENSION_MAP[ext] ?? "text";
}

export async function loadSnippetsClient(paths: string[]): Promise<Snippet[]> {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return Promise.all(
    paths.map(async (p) => {
      try {
        const res = await fetch(`${baseUrl}${p}`);
        const content = await res.text();
        return {
          path: p,
          language: detectLanguage(p),
          content,
        };
      } catch {
        return {
          path: p,
          language: detectLanguage(p),
          content: "Error loading snippet",
        };
      }
    })
  );
}
