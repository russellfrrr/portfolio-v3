'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  const handleThemeToggle = () => {
    const isDark = document.documentElement.classList.contains('dark');

    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button
      aria-label="Toggle theme"
      onClick={handleThemeToggle}
      size="icon"
      type="button"
      variant="outline"
    >
      <Sun className="hidden dark:block" size={16} />
      <Moon className="dark:hidden" size={16} />
    </Button>
  );
};
