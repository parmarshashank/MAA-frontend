import apiClient from '../config/api.config';

class AuthService {
  async register(role, userData) {
    try {
      const response = await apiClient.post(`/auth/register/${role}`, userData);
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

  async login(role, email, password) {
    try {
      const response = await apiClient.post(`/auth/login/${role}`, {
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
      const response = await apiClient.get('/auth/me');
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