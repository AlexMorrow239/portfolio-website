import { ReactNode } from 'react';

/**
 * Base demo information
 */
export interface DemoInfo {
  /** Unique identifier for the demo */
  id: string;
  /** Display title */
  title: string;
  /** Short description of the demo */
  description: string;
  /** Icon component to display */
  icon: ReactNode;
  /** Technology tags */
  tags: string[];
  /** Route path */
  path: string;
  /** Optional GitHub repository URL */
  githubUrl?: string;
  /** Optional documentation URL */
  docsUrl?: string;
}

/**
 * Demo category for grouping demos
 */
export interface DemoCategory {
  /** Category identifier */
  id: string;
  /** Display name */
  name: string;
  /** Category description */
  description: string;
  /** Demos in this category */
  demos: DemoInfo[];
}

/**
 * Demo run states
 */
export enum DemoRunState {
  IDLE = 'idle',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Base demo configuration
 */
export interface DemoConfig {
  /** Maximum runtime in seconds */
  maxRuntime: number;
  /** Whether to persist results */
  persistResults: boolean;
  /** Maximum retries on failure */
  maxRetries: number;
  /** Retry delay in milliseconds */
  retryDelay: number;
}
