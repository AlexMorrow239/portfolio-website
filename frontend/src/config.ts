// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://backend-production-4d7b.up.railway.app/api';

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
};

export const APP_CONFIG = {
  // Contact form settings
  contact: {
    minMessageLength: 20,
    minNameLength: 2,
  },

  // API endpoints
  endpoints: {
    contact: `${API_BASE_URL}/contact`,
    projects: {
      base: `${API_BASE_URL}/projects`,
      admin: `${API_BASE_URL}/projects/admin`,
      byId: (id: string) => `${API_BASE_URL}/projects/${id}`,
    },
    auth: {
      base: `${API_BASE_URL}/auth`,
      login: `${API_BASE_URL}/auth/login`,
    },
  },

  // Request timeouts (in milliseconds)
  timeouts: {
    default: 5000,
    upload: 30000,
  },
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^\+?[\d\s-]{10,}$/,
};

// Environment checks
export const IS_DEVELOPMENT = import.meta.env.DEV;
export const IS_PRODUCTION = import.meta.env.PROD;
