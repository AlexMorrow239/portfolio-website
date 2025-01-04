import { AuthUtils } from '@/utils/auth';
import { APP_CONFIG } from '../config';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  message?: string;
}

export const AuthService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await fetch(APP_CONFIG.endpoints.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok) {
        throw new Error(data.message ?? 'Login failed');
      }

      // Store the token
      localStorage.setItem('adminToken', data.access_token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout() {
    AuthUtils.clearToken();
  },

  isAuthenticated(): boolean {
    const token = AuthUtils.getStoredToken();
    return AuthUtils.isTokenValid(token);
  },
};
