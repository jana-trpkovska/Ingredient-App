import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

interface UserStore {
  userId: string | null;
  currentUser: User | null;
  isHydrated: boolean;

  setUserId: (id: string | null) => void;
  setCurrentUser: (user: User | null) => void;
  setHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: null,
      currentUser: null,
      isHydrated: false,

      setUserId: (id) => set({ userId: id }),
      setCurrentUser: (user) => set({ currentUser: user }),
      setHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({ userId: state.userId }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);