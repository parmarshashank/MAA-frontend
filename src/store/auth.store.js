import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { adminService, doctorService, pharmacistService } from '../services/api.service';
import { ROLES } from '../utils/roles';
import authService from '../services/auth.service';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: authService.getStoredUser(),
      role: authService.getStoredRole(),
      isAuthenticated: authService.isAuthenticated(),
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

      login: async (role, email, password) => {
        try {
          set({ isLoading: true, error: null });
          const data = await authService.login(role, email, password);
          set({
            token: data.token,
            user: data.user,
            role: role.toLowerCase(),
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          // Set token in axios headers
          localStorage.setItem('token', data.token);
          
          return data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Login failed'
          });
          throw error;
        }
      },

      register: async (userData) => {
        try {
          set({ isLoading: true, error: null });
          const data = await authService.register(userData);
          set({
            token: data.token,
            user: data.admin,
            role: 'admin',
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          // Set token in axios headers
          localStorage.setItem('token', data.token);
          
          return data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Registration failed'
          });
          throw error;
        }
      },

      createDoctor: async (doctorData) => {
        try {
          set({ isLoading: true, error: null });
          const data = await adminService.createDoctor({
            name: doctorData.name,
            email: doctorData.email,
            password: doctorData.password
          });
          set({ isLoading: false });
          return data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Failed to create doctor'
          });
          throw error;
        }
      },

      createPharmacist: async (pharmacistData) => {
        try {
          set({ isLoading: true, error: null });
          const data = await adminService.createPharmacist({
            name: pharmacistData.name,
            email: pharmacistData.email,
            password: pharmacistData.password
          });
          set({ isLoading: false });
          return data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Failed to create pharmacist'
          });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({
          token: null,
          user: null,
          role: null,
          isAuthenticated: false,
          error: null
        });
      },

      getProfile: async () => {
        try {
          set({ isLoading: true, error: null });
          const { role } = useAuthStore.getState();
          let response;

          switch (role) {
            case ROLES.ADMIN:
              response = await adminService.getProfile();
              break;
            case ROLES.DOCTOR:
              response = await doctorService.getProfile();
              break;
            case ROLES.PHARMACIST:
              response = await pharmacistService.getProfile();
              break;
            default:
              throw new Error('Invalid role');
          }

          set({
            user: response.user,
            isLoading: false
          });

          return response.user;
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Failed to fetch profile'
          });
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore; 