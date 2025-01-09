export interface ThreeSatParams {
  n: number;
  ratio: number;
}

export interface ThreeSatResult {
  formula: string;
  satisfiable: boolean;
  assignment: Record<string, boolean>;
  num_variables: number;
  num_clauses: number;
}
