export interface ThreeSatParams {
  n: number;
  ratio: number;
}

export interface SolvingStep {
  step_number: number;
  depth: number;
  action_type: string;
  description: string;
  formula_state: string;
  assignments: Record<string, boolean>;
  success: boolean;
}

export interface SolvingStatistics {
  total_steps: number;
  max_depth: number;
  unit_propagations: number;
  pure_literals: number;
  backtracks: number;
  two_clause_rules: number;
}

export interface ThreeSatResult {
  formula: string;
  satisfiable: boolean;
  assignment: Record<string, boolean> | null;
  num_variables: number;
  num_clauses: number;
  solving_process: {
    steps: SolvingStep[];
    statistics: SolvingStatistics;
  };
}
