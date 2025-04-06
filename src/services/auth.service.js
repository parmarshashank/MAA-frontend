import apiClient from '../config/api.config';
import { ROLES } from '../utils/roles';

class AuthService {
  async register(role, userData) {
    try {
      let endpoint;
      switch (role) {
        case ROLES.ADMIN:
          endpoint = '/api/admin/register';
          break;
        case ROLES.DOCTOR:
          endpoint = '/api/auth/register/doctor';
          break;
        case ROLES.PHARMACIST:
          endpoint = '/api/auth/register/pharmacist';
          break;
        default:
          throw new Error('Invalid role');
      }

      const response = await apiClient.post(endpoint, userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Handle different response structures for admin vs doctor/pharmacist
        const user = response.data.admin || response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role.toLowerCase());
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(role, email, password) {
    try {
      const response = await apiClient.post(`/api/auth/login/${role}`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', role.toLowerCase());
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await apiClient.get('/api/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getStoredRole() {
    return localStorage.getItem('role');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService(); 