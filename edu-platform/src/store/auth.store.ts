import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole, AuthState, LoginCredentials, RegisterData } from '@/types';
import { mockUsers } from '@/data/mock';
import { ROLE_DASHBOARD_ROUTES } from '@/lib/constants';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  getDashboardRoute: () => string;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock authentication - find user by email
        const user = mockUsers.find(
          u => u.email === credentials.email && u.is_active
        );

        if (!user) {
          set({ isLoading: false });
          return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
        }

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Check if email exists
        const exists = mockUsers.some(u => u.email === data.email);
        if (exists) {
          set({ isLoading: false });
          return { success: false, error: 'البريد الإلكتروني مستخدم بالفعل' };
        }

        // Create new user (mock)
        const newUser: User = {
          id: `user_${Date.now()}`,
          email: data.email,
          phone: data.phone,
          full_name: data.full_name,
          avatar_url: null,
          role: data.role,
          is_active: data.role !== 'teacher', // Teachers need approval
          is_verified: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // For demo, auto-login after registration (except teachers)
        if (data.role !== 'teacher') {
          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }

        return { success: true };
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      getDashboardRoute: () => {
        const { user } = get();
        if (!user) return '/';
        return ROLE_DASHBOARD_ROUTES[user.role] || '/';
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper hooks
export function useUser(): User | null {
  return useAuthStore((state) => state.user);
}

export function useIsAuthenticated(): boolean {
  return useAuthStore((state) => state.isAuthenticated);
}

export function useUserRole(): UserRole | null {
  return useAuthStore((state) => state.user?.role ?? null);
}
