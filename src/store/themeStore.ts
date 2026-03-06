import { create } from 'zustand';
import { Appearance, ColorSchemeName } from 'react-native';
import { lightTheme } from '../themes/lightTheme';
import { darkTheme } from '../themes/darkTheme';
import { Theme } from '../types/Theme';

interface ThemeStore {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (value: boolean) => void;
}

const systemColorScheme = Appearance.getColorScheme();

export const useThemeStore = create<ThemeStore>((set) => {
  Appearance.addChangeListener(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
    set({ 
      isDark: colorScheme === 'dark', 
      theme: colorScheme === 'dark' ? darkTheme : lightTheme 
    });
  });

  return {
    isDark: systemColorScheme === 'dark',
    theme: systemColorScheme === 'dark' ? darkTheme : lightTheme,
    toggleTheme: () =>
      set((state) => {
        const newIsDark = !state.isDark;
        return { isDark: newIsDark, theme: newIsDark ? darkTheme : lightTheme };
      }),
    setDark: (value: boolean) =>
      set({ isDark: value, theme: value ? darkTheme : lightTheme }),
  };
});