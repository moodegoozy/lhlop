import { create } from 'zustand';
import type { TeacherFilters, LessonMode } from '@/types';

interface FiltersStore {
  filters: TeacherFilters;
  setFilter: <K extends keyof TeacherFilters>(key: K, value: TeacherFilters[K]) => void;
  setFilters: (filters: Partial<TeacherFilters>) => void;
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
}

const initialFilters: TeacherFilters = {
  search: '',
  subject_id: undefined,
  service_id: undefined,
  city_id: undefined,
  nationality: undefined,
  degree: undefined,
  lesson_mode: undefined,
  min_price: undefined,
  max_price: undefined,
  min_rating: undefined,
  gender: undefined,
  sort_by: 'rating',
};

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  filters: initialFilters,

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  clearFilters: () =>
    set({
      filters: { ...initialFilters },
    }),

  hasActiveFilters: () => {
    const { filters } = get();
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'sort_by') return false; // Don't count sort_by as active filter
      if (value === undefined || value === '' || value === null) return false;
      return true;
    });
  },
}));

// Helper function to filter teachers based on filters
export function filterTeachers<T extends {
  user?: { full_name: string };
  bio?: string;
  subjects?: { id: string }[];
  services?: { id: string }[];
  city_id?: string;
  nationality?: string;
  degree?: string;
  lesson_mode?: LessonMode;
  lesson_price: number;
  average_rating: number;
  years_of_experience: number;
  total_reviews: number;
}>(
  teachers: T[],
  filters: TeacherFilters
): T[] {
  let result = [...teachers];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.user?.full_name.toLowerCase().includes(searchLower) ||
        t.bio?.toLowerCase().includes(searchLower)
    );
  }

  // Subject filter
  if (filters.subject_id) {
    result = result.filter((t) =>
      t.subjects?.some((s) => s.id === filters.subject_id)
    );
  }

  // Service filter
  if (filters.service_id) {
    result = result.filter((t) =>
      t.services?.some((s) => s.id === filters.service_id)
    );
  }

  // City filter
  if (filters.city_id) {
    result = result.filter((t) => t.city_id === filters.city_id);
  }

  // Nationality filter
  if (filters.nationality) {
    result = result.filter((t) => t.nationality === filters.nationality);
  }

  // Degree filter
  if (filters.degree) {
    result = result.filter((t) => t.degree === filters.degree);
  }

  // Lesson mode filter
  if (filters.lesson_mode) {
    result = result.filter(
      (t) =>
        t.lesson_mode === filters.lesson_mode || t.lesson_mode === 'both'
    );
  }

  // Price range filter
  if (filters.min_price !== undefined) {
    result = result.filter((t) => t.lesson_price >= filters.min_price!);
  }
  if (filters.max_price !== undefined) {
    result = result.filter((t) => t.lesson_price <= filters.max_price!);
  }

  // Rating filter
  if (filters.min_rating !== undefined) {
    result = result.filter((t) => t.average_rating >= filters.min_rating!);
  }

  // Sorting
  switch (filters.sort_by) {
    case 'rating':
      result.sort((a, b) => b.average_rating - a.average_rating);
      break;
    case 'price_asc':
      result.sort((a, b) => a.lesson_price - b.lesson_price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.lesson_price - a.lesson_price);
      break;
    case 'experience':
      result.sort((a, b) => b.years_of_experience - a.years_of_experience);
      break;
    case 'reviews':
      result.sort((a, b) => b.total_reviews - a.total_reviews);
      break;
  }

  return result;
}
