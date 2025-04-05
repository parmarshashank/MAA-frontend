import apiClient from '../config/api.config';

class AuthService {
  async login(email, password, role) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
        role, // 'admin', 'doctor', or 'pharmacist'
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', role);
      }
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

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getCurrentRole() {
    return localStorage.getItem('role');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService(); 