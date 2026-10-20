'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'dark' | 'light';

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export type ThemeProviderProps = {
  children: ReactNode;
  initialTheme: Theme;
};

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme);
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      } catch {
        // ignore storage / cookie errors
      }
    }
  }, []);

  // Sync class on mount: honor the blocking script result when the user has
  // not chosen a theme yet (no cookie), avoiding a post-hydration flip that
  // races with axe/LCP; explicit cookie keeps driving the class.
  useEffect(() => {
    const hasThemeCookie = /(?:^|;\s*)theme=/.test(document.cookie);
    if (!hasThemeCookie) {
      const scriptIsDark = document.documentElement.classList.contains('dark');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(scriptIsDark ? 'dark' : 'light');
      return;
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
