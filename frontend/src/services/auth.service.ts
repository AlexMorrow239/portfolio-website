import { APP_CONFIG } from "../config";

export interface LoginCredentials {
  username: string;
  password: string;
}

export const AuthService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await fetch(APP_CONFIG.endpoints.auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem("adminToken");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("adminToken");
  },
};
