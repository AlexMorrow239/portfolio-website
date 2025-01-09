#!/usr/bin/env python3
import json
import sys
from typing import Dict, Any, Optional

from .utils import Formula, RandomFormulaGenerator, FormulaError
from .solver import DPLLSolver

def parse_arguments() -> Dict[str, Any]:
    """Parse and validate command line arguments"""
    if len(sys.argv) != 3:
        raise ValueError("Expected 2 arguments: number of variables and clause ratio")
    
    try:
        n_variables = int(sys.argv[1])
        clause_ratio = float(sys.argv[2])
        
        # Validate ranges
        if not (3 <= n_variables <= 5):
            raise ValueError("Number of variables must be between 3 and 5")
        if not (2.0 <= clause_ratio <= 5.0):
            raise ValueError("Clause ratio must be between 2.0 and 5.0")
            
        return {
            "n_variables": n_variables,
            "clause_ratio": clause_ratio
        }
    except ValueError as e:
        raise ValueError(f"Invalid input: {str(e)}")

def generate_formula(n_variables: int, clause_ratio: float) -> Formula:
    """Generate a random 3-SAT formula"""
    generator = RandomFormulaGenerator()
    n_clauses = int(n_variables * clause_ratio)
    return generator.generate(n_variables, n_clauses)

def format_output(formula: Formula, solution: Optional[Dict[int, bool]], solver: DPLLSolver) -> dict:
    """Format the solution into the expected output structure"""
    # Ensure we have steps and statistics even if empty
    solving_steps = solver.get_solving_steps() or []
    solving_stats = solver.get_statistics() or {
        "total_steps": 0,
        "max_depth": 0,
        "unit_propagations": 0,
        "pure_literals": 0,
        "backtracks": 0,
        "two_clause_rules": 0
    }

    return {
        "formula": str(formula),
        "satisfiable": solution is not None,
        "assignment": solution,
        "num_variables": formula.num_variables,
        "num_clauses": len(formula.clauses),
        "solving_process": {
            "steps": solving_steps,
            "statistics": solving_stats
        }
    }

def main() -> None:
    """Main entry point for the SAT solver demo"""
    try:
        # Parse arguments
        args = parse_arguments()
        
        # Generate formula
        formula = generate_formula(args["n_variables"], args["clause_ratio"])
        
        # Solve formula using DPLL with debug enabled
        solver = DPLLSolver(debug=True)  # Changed to True
        solver.stats.start_timer()  # Start timing the solution
        solution = solver.solve(formula)
        solver.stats.stop_timer()   # Stop timing
        
        # Format and output result
        result = format_output(formula, solution, solver)
        print(json.dumps(result, ensure_ascii=False))
        
    except (ValueError, FormulaError) as e:
        error_response = {"error": str(e)}
        print(json.dumps(error_response, ensure_ascii=False), file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        error_response = {"error": "An unexpected error occurred"}
        print(json.dumps(error_response, ensure_ascii=False), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()