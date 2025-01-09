import { useCallback, useState } from 'react';

import { DemoRunState } from '../types';
import { demoApiCall } from './api';
import { DemoStorage } from './storage';

interface UseDemoRunnerOptions {
  demoId: string;
  endpoint: string;
  persistResults?: boolean;
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * Custom hook for managing demo execution
 */
export const useDemoRunner = <TInput, TOutput>({
  demoId,
  endpoint,
  persistResults = true,
  maxRetries = 3,
  retryDelay = 1000,
}: UseDemoRunnerOptions) => {
  const [state, setState] = useState<DemoRunState>(DemoRunState.IDLE);
  const [output, setOutput] = useState<TOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runDemo = useCallback(
    async (input: TInput) => {
      setState(DemoRunState.RUNNING);
      setError(null);

      try {
        const result = await demoApiCall<TOutput>(endpoint, input, {
          maxRetries,
          retryDelay,
        });

        setOutput(result);
        setState(DemoRunState.SUCCESS);

        if (persistResults) {
          DemoStorage.saveResult(demoId, result);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        setState(DemoRunState.ERROR);
      }
    },
    [demoId, endpoint, persistResults, maxRetries, retryDelay],
  );

  return {
    state,
    output,
    error,
    runDemo,
    reset: () => {
      setState(DemoRunState.IDLE);
      setOutput(null);
      setError(null);
    },
  };
};
