/**
 * Demo result storage handler
 */
export const DemoStorage = {
  /**
   * Saves demo result
   */
  saveResult: (demoId: string, result: unknown): void => {
    try {
      const results = DemoStorage.getResults(demoId);
      results.unshift(result);
      const maxResults = 10; // Keep last 10 results
      if (results.length > maxResults) {
        results.pop();
      }
      localStorage.setItem(`demo_${demoId}`, JSON.stringify(results));
    } catch (error) {
      console.error('Failed to save demo result:', error);
    }
  },

  /**
   * Gets demo results history
   */
  getResults: (demoId: string): unknown[] => {
    try {
      const stored = localStorage.getItem(`demo_${demoId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get demo results:', error);
      return [];
    }
  },

  /**
   * Clears demo results
   */
  clearResults: (demoId: string): void => {
    localStorage.removeItem(`demo_${demoId}`);
  },
};
