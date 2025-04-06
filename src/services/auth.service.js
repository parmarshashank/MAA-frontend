import axios from 'axios';
import { ROLES } from '../utils/roles';

const API_URL = 'http://localhost:5000/api/auth';

class AuthService {
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/admin/register`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', ROLES.ADMIN);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(email, password, role) {
    try {
      const endpoint = `${API_URL}/${role.toLowerCase()}/login`;
      const response = await axios.post(endpoint, { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', role);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getStoredRole() {
    return localStorage.getItem('role');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  handleError(error) {
    if (error.response) {
      const { data, status } = error.response;
      
      switch (status) {
        case 400:
          return new Error(data.errors ? Object.values(data.errors).join(', ') : data.message);
        case 401:
        case 409:
          return new Error(data.message);
        default:
          return new Error('An unexpected error occurred');
      }
    }
    return new Error('Network error occurred');
  }
}

export default new AuthService(); 