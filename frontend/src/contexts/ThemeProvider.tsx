import { useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useTheme() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  useEffect(() => {
    // Sync localStorage with Mantine color scheme
    const stored = localStorage.getItem('bucketwise-theme');
    if (stored === 'light' || stored === 'dark') {
      if (stored !== colorScheme) {
        setColorScheme(stored);
      }
    } else if (colorScheme) {
      localStorage.setItem('bucketwise-theme', colorScheme);
    }
  }, [colorScheme, setColorScheme]);

  const toggleTheme = () => {
    const newTheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newTheme);
    localStorage.setItem('bucketwise-theme', newTheme);
  };

  return {
    theme: colorScheme as 'light' | 'dark',
    toggleTheme,
  };
}
