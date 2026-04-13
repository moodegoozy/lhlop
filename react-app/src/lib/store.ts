import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TeacherFilters } from '@/types';

interface ThemeStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setDarkMode: (value) => set({ darkMode: value }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

interface FilterStore {
  filters: TeacherFilters;
  setFilter: <K extends keyof TeacherFilters>(key: K, value: TeacherFilters[K]) => void;
  clearFilters: () => void;
  setFilters: (filters: Partial<TeacherFilters>) => void;
}

const defaultFilters: TeacherFilters = {
  search: '',
  sortBy: 'rating',
  gender: '',
  qualification: '',
  lessonLocation: '',
  nationality: '',
  countryCode: '',
  cityId: '',
  categoryId: null,
  teachingMethod: '',
  page: 1,
  perPage: 20,
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilters,
  setFilter: (key, value) => 
    set((state) => ({ 
      filters: { ...state.filters, [key]: value, page: key !== 'page' ? 1 : value as number } 
    })),
  clearFilters: () => set({ filters: defaultFilters }),
  setFilters: (newFilters) => 
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));

interface MobileMenuStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));

interface FilterModalStore {
  showMobileFilters: boolean;
  showDesktopFilters: boolean;
  setShowMobileFilters: (value: boolean) => void;
  setShowDesktopFilters: (value: boolean) => void;
}

export const useFilterModalStore = create<FilterModalStore>((set) => ({
  showMobileFilters: false,
  showDesktopFilters: false,
  setShowMobileFilters: (value) => set({ showMobileFilters: value }),
  setShowDesktopFilters: (value) => set({ showDesktopFilters: value }),
}));
