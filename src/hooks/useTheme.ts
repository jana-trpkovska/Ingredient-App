import { useThemeStore } from '../store/themeStore';

export const useTheme = () => {
  const { theme, toggleTheme, isDark } = useThemeStore();
  return { theme, toggleTheme, isDark };
};