/**
 * Input parameters for the SAT solver
 */
export interface SolverInput {
  /** Number of variables in the formula (3-5) */
  integer: number;
  /** Clause to variable ratio (0.1-6.0) */
  float: number;
}

/**
 * Step in the solving process
 */
export interface SolvingStep {
  /** Step number in the solving sequence */
  step_number: number;
  /** Current depth in the search tree */
  depth: number;
  /** Type of operation performed (e.g., 'UNIT_PROPAGATION', 'PURE_LITERAL', 'BACKTRACK', 'BRANCH') */
  action_type: string;
  /** Human-readable description of the step */
  description: string;
  /** Current state of the formula */
  formula_state: string;
  /** Current variable assignments */
  assignments: Record<string, boolean>;
  /** Whether this step led to a successful path */
  success: boolean;
}

/**
 * Statistics about the solving process
 */
export interface SolvingStatistics {
  /** Total number of steps taken */
  total_steps: number;
  /** Maximum depth reached in the search tree */
  max_depth: number;
  /** Number of unit propagations performed */
  unit_propagations: number;
  /** Number of pure literals identified and assigned */
  pure_literals: number;
  /** Number of times the solver had to backtrack */
  backtracks: number;
  /** Number of two-clause rules applied */
  two_clause_rules: number;
}

/**
 * Complete solving process information
 */
export interface SolvingProcess {
  /** Sequence of steps taken during solving */
  steps: SolvingStep[];
  /** Final statistics of the solving process */
  statistics: SolvingStatistics;
}

/**
 * Complete output from the SAT solver
 */
export interface SolverOutput {
  /** The generated 3-SAT formula */
  formula: string;
  /** Whether the formula is satisfiable */
  satisfiable: boolean;
  /** Variable assignments that satisfy the formula (null if unsatisfiable) */
  assignment: Record<string, boolean> | null;
  /** Number of variables in the formula */
  num_variables: number;
  /** Number of clauses in the formula */
  num_clauses: number;
  /** Detailed information about the solving process */
  solving_process?: SolvingProcess;
}

/**
 * Action types for solver steps
 */
export enum SolverAction {
  UNIT_PROPAGATION = 'UNIT_PROPAGATION',
  PURE_LITERAL = 'PURE_LITERAL',
  BACKTRACK = 'BACKTRACK',
  BRANCH = 'BRANCH',
}

/**
 * Formula clause representation
 */
export interface Clause {
  /** Variables in the clause (positive numbers for positive literals, negative for negated) */
  literals: number[];
}

/**
 * Formula representation
 */
export interface Formula {
  /** List of clauses in the formula */
  clauses: Clause[];
  /** Number of variables in the formula */
  num_variables: number;
}
