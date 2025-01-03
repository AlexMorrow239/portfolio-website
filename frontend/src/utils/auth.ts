interface DecodedToken {
  exp: number;
  username: string;
  role: string;
}

export const AuthUtils = {
  isTokenValid(token: string | null): boolean {
    if (!token) {
      return false;
    }

    try {
      // Decode the JWT token (basic decoding, not verification)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );

      const decoded: DecodedToken = JSON.parse(jsonPayload) as DecodedToken;

      // Check if token is expired
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  },

  getStoredToken(): string | null {
    return localStorage.getItem('adminToken');
  },

  clearToken(): void {
    localStorage.removeItem('adminToken');
  },
};
