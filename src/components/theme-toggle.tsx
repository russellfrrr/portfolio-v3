'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  const handleThemeToggle = () => {
    const isDark = document.documentElement.classList.contains('dark');

    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={handleThemeToggle}
      className="inline-flex h-9 w-9 items-center justify-center border border-zinc-200 bg-white text-zinc-900 transition-colors duration-200 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
      aria-label="Toggle theme"
    >
      <Sun className="hidden dark:block" size={16} />
      <Moon className="dark:hidden" size={16} />
    </button>
  );
};
