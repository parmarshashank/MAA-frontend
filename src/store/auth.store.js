import { create } from 'zustand';
import authService from '../services/auth.service';

const useAuthStore = create((set, get) => ({
  user: authService.getStoredUser(),
  role: authService.getStoredRole(),
  isAuthenticated: authService.isAuthenticated(),
  hospital: null,

  register: async (role, userData) => {
    try {
      const data = await authService.register(role, userData);
      set({
        user: data.user,
        role: role.toLowerCase(),
        isAuthenticated: true,
        hospital: data.user.hospital,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  login: async (role, email, password) => {
    try {
      const data = await authService.login(role, email, password);
      set({
        user: data.user,
        role: role.toLowerCase(),
        isAuthenticated: true,
        hospital: data.user.hospital,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      role: null,
      isAuthenticated: false,
      hospital: null,
    });
  },

  fetchCurrentUser: async () => {
    try {
      const userData = await authService.getCurrentUser();
      set({
        user: userData,
        hospital: userData.hospital,
      });
      return userData;
    } catch (error) {
      get().logout();
      throw error;
    }
  },

  updateUser: (userData) => {
    const currentUser = get().user;
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
}));

export default useAuthStore; 