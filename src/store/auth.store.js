import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { adminService, doctorService, pharmacistService } from '../services/api.service';
import { ROLES } from '../utils/roles';

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

      login: async (credentials, role) => {
        try {
          set({ isLoading: true, error: null });
          let response;

          switch (role) {
            case ROLES.ADMIN:
              response = await adminService.login(credentials);
              break;
            case ROLES.DOCTOR:
              response = await doctorService.login(credentials);
              break;
            case ROLES.PHARMACIST:
              response = await pharmacistService.login(credentials);
              break;
            default:
              throw new Error('Invalid role');
          }

          const { token, user } = response;
          set({
            token,
            user,
            role,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          // Set token in axios headers
          localStorage.setItem('token', token);
          
          return { token, user, role };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Login failed'
          });
          throw error;
        }
      },

      register: async (role, userData) => {
        try {
          set({ isLoading: true, error: null });
          let response;

          switch (role) {
            case ROLES.ADMIN:
              response = await adminService.register(userData);
              break;
            case ROLES.DOCTOR:
              response = await doctorService.register(userData);
              break;
            case ROLES.PHARMACIST:
              response = await pharmacistService.register(userData);
              break;
            default:
              throw new Error('Invalid role');
          }

          const { token, user } = response;
          set({
            token,
            user,
            role,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          // Set token in axios headers
          localStorage.setItem('token', token);
          
          return { token, user, role };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Registration failed'
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
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