import { SolverInput } from '../demos/ThreeSatSolver/types';
import { DemoConfig } from '../types';

/**
 * Validates solver input parameters
 */
export const validateSolverInput = (input: SolverInput): string[] => {
  const errors: string[] = [];

  if (input.integer < 3 || input.integer > 5) {
    errors.push('Number of variables must be between 3 and 5');
  }

  if (input.float < 0.1 || input.float > 6.0) {
    errors.push('Clause/Variable ratio must be between 0.1 and 6.0');
  }

  return errors;
};

/**
 * Validates demo configuration
 */
export const validateDemoConfig = (config: DemoConfig): string[] => {
  const errors: string[] = [];

  if (config.maxRuntime <= 0) {
    errors.push('Maximum runtime must be greater than 0');
  }

  if (config.maxRetries < 0) {
    errors.push('Maximum retries cannot be negative');
  }

  if (config.retryDelay < 0) {
    errors.push('Retry delay cannot be negative');
  }

  return errors;
};
