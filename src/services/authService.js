import api from './api';

export const authService = {
  login: async (credentials) => {
    // POST /api/auth/login -> { email, password }
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    // POST /api/auth/register -> { name, email, password }
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};
