import { ThemeOption } from '../types/settings';

const THEME_KEY = 'oceanx_theme';

export const getSavedTheme = (): ThemeOption => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved as ThemeOption;
  }
  return 'light';
};

export const applyTheme = (theme: ThemeOption) => {
  localStorage.setItem(THEME_KEY, theme);
  let resolved: 'light' | 'dark' = 'light';

  if (theme === 'system') {
    resolved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } else {
    resolved = theme;
  }

  document.documentElement.setAttribute('data-theme', resolved);
};

export const initTheme = () => {
  const current = getSavedTheme();
  applyTheme(current);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const active = getSavedTheme();
      if (active === 'system') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }
};
