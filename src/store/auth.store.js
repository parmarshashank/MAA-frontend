import { create } from 'zustand';
import authService from '../services/auth.service';

const useAuthStore = create((set) => ({
  user: authService.getCurrentUser(),
  role: authService.getCurrentRole(),
  isAuthenticated: authService.isAuthenticated(),

  login: async (email, password, role) => {
    try {
      const data = await authService.login(email, password, role);
      set({
        user: data.user,
        role: role,
        isAuthenticated: true,
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
    });
  },

  updateUser: (userData) => {
    const updatedUser = { ...authService.getCurrentUser(), ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
}));

export default useAuthStore; 