import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ROLES } from '../utils/roles';

// Mock user data for different roles
const mockUsers = {
  [ROLES.ADMIN]: {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: ROLES.ADMIN
  },
  [ROLES.DOCTOR]: {
    id: '2',
    name: 'Doctor User',
    email: 'doctor@example.com',
    role: ROLES.DOCTOR
  },
  [ROLES.PHARMACIST]: {
    id: '3',
    name: 'Pharmacist User',
    email: 'pharmacist@example.com',
    role: ROLES.PHARMACIST
  }
};

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (token, user, role) => set({
        token,
        user,
        role,
        isAuthenticated: true,
        error: null
      }),

      clearAuth: () => set({
        token: null,
        user: null,
        role: null,
        isAuthenticated: false,
        error: null
      }),

      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),

      login: async (role, email) => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Get mock user for the selected role
          const mockUser = mockUsers[role];
          
          // For testing purposes, accept any email for the selected role
          set({
            token: 'mock-token',
            user: { ...mockUser, email }, // Use provided email
            role: role,
            isAuthenticated: true,
            error: null
          });
          
          return { token: 'mock-token', user: mockUser };
        } catch (error) {
          set({ error: 'Login failed' });
          throw error;
        }
      },

      register: async (userData) => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const newUser = {
            id: Math.random().toString(),
            ...userData,
            role: ROLES.ADMIN
          };
          
          set({
            token: 'mock-token',
            user: newUser,
            role: ROLES.ADMIN,
            isAuthenticated: true,
            error: null
          });
          
          return { token: 'mock-token', admin: newUser };
        } catch (error) {
          set({ error: 'Registration failed' });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('auth-storage');
        set({
          token: null,
          user: null,
          role: null,
          isAuthenticated: false,
          error: null
        });
      },

      getProfile: async () => {
        const { role } = useAuthStore.getState();
        return mockUsers[role];
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore; 