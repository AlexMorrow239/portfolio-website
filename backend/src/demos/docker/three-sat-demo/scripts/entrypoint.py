#!/usr/bin/env python3
import json
import sys
from typing import Dict, Any

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
        if not (3 <= n_variables <= 10):
            raise ValueError("Number of variables must be between 3 and 10")
        if not (0.1 <= clause_ratio <= 6.0):
            raise ValueError("Clause ratio must be between 0.1 and 6.0")
            
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

def format_output(formula: Formula, assignment: Dict[int, bool]) -> Dict[str, Any]:
    """Format the solution for JSON output"""
    return {
        "formula": str(formula),
        "satisfiable": assignment is not None,
        "assignment": assignment if assignment is not None else None,
        "num_variables": formula.num_variables,
        "num_clauses": len(formula.clauses)
    }

def main() -> None:
    """Main entry point for the SAT solver demo"""
    try:
        # Parse arguments
        args = parse_arguments()
        
        # Generate formula
        formula = generate_formula(args["n_variables"], args["clause_ratio"])
        
        # Solve formula using DPLL
        solver = DPLLSolver(debug=False)
        solution = solver.solve(formula)
        
        # Format and output result
        result = format_output(formula, solution)
        print(json.dumps(result))
        
    except (ValueError, FormulaError) as e:
        error_response = {"error": str(e)}
        print(json.dumps(error_response), file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        error_response = {"error": "An unexpected error occurred"}
        print(json.dumps(error_response), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()