'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center border border-zinc-800 bg-zinc-950 text-zinc-100 hover:bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};
