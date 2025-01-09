import { API_BASE_URL } from '@/config';

interface ApiOptions {
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * Wrapper for demo API calls with retry logic
 */
export const demoApiCall = async <T>(
  endpoint: string,
  data: unknown,
  options: ApiOptions = {},
): Promise<T> => {
  const maxRetries = options.maxRetries ?? 3;
  const retryDelay = options.retryDelay ?? 1000;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API call failed');
      }

      return await response.json();
    } catch (error) {
      attempts++;
      if (attempts === maxRetries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }

  throw new Error('Maximum retry attempts reached');
};
