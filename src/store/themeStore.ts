import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';

import { lightTheme } from '../themes/lightTheme';
import { darkTheme } from '../themes/darkTheme';
import { Theme } from '../types/Theme';

interface ThemeStore {
  theme: Theme;
  isDark: boolean;
  isHydrated: boolean;

  toggleTheme: () => void;
  setDark: (value: boolean) => void;
  setHydrated: (value: boolean) => void;
}

const systemScheme = Appearance.getColorScheme();

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => {
      Appearance.addChangeListener(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
        if (!get().isHydrated) return;

        set({
          isDark: colorScheme === 'dark',
          theme: colorScheme === 'dark' ? darkTheme : lightTheme,
        });
      });

      const initialDark = systemScheme === 'dark';

      return {
        isDark: initialDark,
        theme: initialDark ? darkTheme : lightTheme,
        isHydrated: false,

        toggleTheme: () =>
          set((state) => {
            const newIsDark = !state.isDark;
            return {
              isDark: newIsDark,
              theme: newIsDark ? darkTheme : lightTheme,
            };
          }),

        setDark: (value: boolean) =>
          set({
            isDark: value,
            theme: value ? darkTheme : lightTheme,
          }),

        setHydrated: (value) => set({ isHydrated: value }),
      };
    },
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        isDark: state.isDark,
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.theme = state.isDark ? darkTheme : lightTheme;
        state.setHydrated(true);
      },
    }
  )
);