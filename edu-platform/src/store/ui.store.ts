import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface UIStore {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Mobile Menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;

  // Filter Sheet
  isFilterSheetOpen: boolean;
  toggleFilterSheet: () => void;
  setFilterSheetOpen: (open: boolean) => void;

  // Loading States
  isPageLoading: boolean;
  setPageLoading: (loading: boolean) => void;

  // Toast
  toast: {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;

  // Modal
  activeModal: string | null;
  modalData: Record<string, unknown> | null;
  openModal: (modalId: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  // Theme
  theme: 'system',
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.removeItem('theme');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  },

  // Sidebar
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  // Mobile Menu
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  // Filter Sheet
  isFilterSheetOpen: false,
  toggleFilterSheet: () => set((state) => ({ isFilterSheetOpen: !state.isFilterSheetOpen })),
  setFilterSheetOpen: (open) => set({ isFilterSheetOpen: open }),

  // Loading States
  isPageLoading: false,
  setPageLoading: (loading) => set({ isPageLoading: loading }),

  // Toast
  toast: null,
  showToast: (message, type = 'success') => {
    set({
      toast: { message, type, isVisible: true },
    });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      get().hideToast();
    }, 3000);
  },
  hideToast: () => set({ toast: null }),

  // Modal
  activeModal: null,
  modalData: null,
  openModal: (modalId, data = {}) =>
    set({
      activeModal: modalId,
      modalData: data,
    }),
  closeModal: () =>
    set({
      activeModal: null,
      modalData: null,
    }),
}));
