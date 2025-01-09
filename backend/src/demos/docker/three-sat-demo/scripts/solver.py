import random
from typing import Dict, List, Optional, Tuple

from .stats import create_solver_statistics
from .utils import Formula, FormulaSimplifier, Literal

class SATSolver:
    """Base class for SAT solvers"""
    def __init__(self, debug: bool = False):
        self.debug = debug
        self.stats = None

    def solve(self, formula: Formula) -> Optional[Dict[int, bool]]:
        """Solve the given formula"""
        raise NotImplementedError

    def _complete_assignment(self, partial: Dict[int, bool], num_vars: int) -> Dict[int, bool]:
        """Complete a partial assignment by setting unassigned variables to True"""
        return {
            var: partial.get(var, True)
            for var in range(1, num_vars + 1)
        }

class DPLLSolver(SATSolver):
    """DPLL-based SAT solver implementation with detailed logging"""
    
    def __init__(self, debug: bool = False):
        super().__init__(debug)
        self.stats = create_solver_statistics("dpll")
        self._current_depth = 0
        self._step_counter = 0

    def get_solving_steps(self) -> List[dict]:
        """Get the solution steps from statistics"""
        return self.stats.stats["solution_steps"].value

    def get_statistics(self) -> dict:
        """Get formatted statistics for output"""
        return {
            "total_steps": self._step_counter,
            "max_depth": self.stats.stats["max_decision_depth"].value,
            "unit_propagations": self.stats.stats["unit_propagations"].value,
            "pure_literals": self.stats.stats["pure_literals"].value,
            "backtracks": self.stats.stats["backtracks"].value,
            "two_clause_rules": self.stats.stats["two_clause_rules"].value
        }

    def solve(self, formula: Formula) -> Optional[Dict[int, bool]]:
        """Solve using the DPLL algorithm"""
        self.stats.reset()  # Reset statistics
        self._step_counter = 0
        self._current_depth = 0
        
        self.stats.start_timer()
        try:
            self._log_step(
                "start",
                "Starting DPLL solver",
                formula,
                {},
            )
            
            result = self._dpll(formula, {})
            
            if result is not None:
                self.stats.successful_solves.value += 1
                self._log_step(
                    "complete",
                    "Found satisfying assignment",
                    formula,
                    result,
                )
            else:
                self.stats.failed_solves.value += 1
                self._log_step(
                    "complete",
                    "Formula is unsatisfiable",
                    formula,
                    {},
                    success=False
                )
            return result
        finally:
            self.stats.stop_timer()

    def _log_step(self, action_type: str, description: str, formula: Formula, 
                 assignments: Dict[int, bool], success: bool = True):
        """Log a solution step with detailed information"""
        if self.debug:
            self._step_counter += 1
            step = {
                "step_number": self._step_counter,
                "depth": self._current_depth,
                "action_type": action_type,
                "description": description,
                "formula_state": str(formula),
                "assignments": assignments.copy(),
                "success": success
            }
            self.stats.stats["solution_steps"].value.append(step)
            
            # Update max depth if needed
            self.stats.stats["max_decision_depth"].value = max(
                self.stats.stats["max_decision_depth"].value,
                self._current_depth
            )

    def _dpll(self, formula: Formula, assignments: Dict[int, bool]) -> Optional[Dict[int, bool]]:
        """Core DPLL recursive implementation with detailed logging"""
        self._current_depth += 1
        self.stats.append("decision_depths", self._current_depth)

        # Base cases
        if not formula.clauses:
            self._log_step(
                "success",
                "All clauses satisfied",
                formula,
                assignments
            )
            self._current_depth -= 1
            return self._complete_assignment(assignments, formula.num_variables)

        if any(not clause.literals for clause in formula.clauses):
            self._log_step(
                "backtrack",
                "Empty clause found - backtracking",
                formula,
                assignments,
                success=False
            )
            self.stats.increment("backtracks")
            self._current_depth -= 1
            return None

        # Unit propagation
        unit_clause = next((clause for clause in formula.clauses if clause.is_unit()), None)
        if unit_clause:
            lit = unit_clause.literals[0]
            self._log_step(
                "unit_propagation",
                f"Found unit clause {unit_clause}, setting {lit}",
                formula,
                assignments
            )
            
            self.stats.increment("unit_propagations")
            new_assignments = assignments.copy()
            new_assignments[lit.variable] = lit.is_positive

            simplified = FormulaSimplifier.simplify_formula(formula, new_assignments)
            self.stats.append("clause_sizes", len(simplified.clauses))

            return self._dpll(simplified, new_assignments)

        # Pure literal elimination
        pure_literal = self._find_pure_literal(formula)
        if pure_literal:
            self._log_step(
                "pure_literal",
                f"Found pure literal {pure_literal}",
                formula,
                assignments
            )
            
            self.stats.increment("pure_literals")
            new_assignments = assignments.copy()
            new_assignments[pure_literal.variable] = pure_literal.is_positive

            return self._dpll(
                FormulaSimplifier.simplify_formula(formula, new_assignments),
                new_assignments
            )

        # Two-clause rule
        two_clause_result = self._apply_two_clause_rule(formula)
        if two_clause_result:
            var, value = two_clause_result
            self._log_step(
                "two_clause",
                f"Applied two-clause rule, setting x{var} = {value}",
                formula,
                assignments
            )
            
            self.stats.increment("two_clause_rules")
            new_assignments = assignments.copy()
            new_assignments[var] = value

            return self._dpll(
                FormulaSimplifier.simplify_formula(formula, new_assignments),
                new_assignments
            )

        # Variable selection
        var = self._choose_next_variable(formula)
        self.stats.append("variable_frequencies", var)
        self._log_step(
            "branching",
            f"Branching on variable x{var}",
            formula,
            assignments
        )

        # Try assignments
        for value in [True, False]:
            self._log_step(
                "try_value",
                f"Trying x{var} = {value}",
                formula,
                assignments
            )
            
            new_assignments = assignments.copy()
            new_assignments[var] = value
            result = self._dpll(
                FormulaSimplifier.simplify_formula(formula, new_assignments),
                new_assignments
            )
            if result is not None:
                self._current_depth -= 1
                return result

        self._log_step(
            "backtrack",
            f"Both values for x{var} failed - backtracking",
            formula,
            assignments,
            success=False
        )
        self.stats.increment("backtracks")
        self._current_depth -= 1
        return None

    def _find_pure_literal(self, formula: Formula) -> Optional[Literal]:
        """Find a pure literal in the formula"""
        polarities = {}
        for clause in formula.clauses:
            for lit in clause.literals:
                if lit.variable not in polarities:
                    polarities[lit.variable] = lit.is_positive
                elif polarities[lit.variable] != lit.is_positive:
                    polarities[lit.variable] = None

        for var, polarity in polarities.items():
            if polarity is not None:
                return Literal(var, polarity)
        return None

    def _apply_two_clause_rule(self, formula: Formula) -> Optional[Tuple[int, bool]]:
        """Apply the two-clause rule if possible"""
        # Find clauses with exactly two literals
        two_lit_clauses = [c for c in formula.clauses if len(c.literals) == 2]
        
        for clause in two_lit_clauses:
            lit1, lit2 = clause.literals
            # Look for a complementary clause
            for other_clause in two_lit_clauses:
                if other_clause == clause:
                    continue
                # Check if we have (a ∨ b) ∧ (a ∨ ¬b) -> a must be true
                if lit1.variable == other_clause.literals[0].variable:
                    if lit2.variable == other_clause.literals[1].variable and \
                      lit2.is_positive != other_clause.literals[1].is_positive:
                        return lit1.variable, lit1.is_positive
                # Check the other combination
                elif lit1.variable == other_clause.literals[1].variable:
                    if lit2.variable == other_clause.literals[0].variable and \
                      lit2.is_positive != other_clause.literals[0].is_positive:
                        return lit1.variable, lit1.is_positive
                    
        return None

    def _choose_next_variable(self, formula: Formula) -> int:
        """Choose the next variable for branching"""
        # Count variable frequencies
        frequencies = {}
        for clause in formula.clauses:
            for lit in clause.literals:
                frequencies[lit.variable] = frequencies.get(lit.variable, 0) + 1
        
        # Return the most frequent variable
        return max(frequencies.items(), key=lambda x: x[1])[0]
  
class RandomSATSolver(SATSolver):
    """Random walk SAT solver implementation"""
    def __init__(self, debug: bool = False, max_tries: int = 100):
        super().__init__(debug)
        self.stats = create_solver_statistics("random")
        self.max_tries = max_tries
        self._step_counter = 0

    def get_solving_steps(self) -> List[dict]:
        """Get the solution steps from statistics"""
        return self.stats.stats["solution_steps"].value

    def get_statistics(self) -> dict:
        """Get formatted statistics for output"""
        return {
            "total_steps": self._step_counter,
            "max_depth": 0,  # Random solver doesn't use depth
            "unit_propagations": 0,
            "pure_literals": 0,
            "backtracks": 0,
            "two_clause_rules": 0
        }

    def solve(self, formula: Formula) -> Optional[Dict[int, bool]]:
        """Solve using random assignment strategy"""
        self.stats.reset()
        self._step_counter = 0
        
        self.stats.start_timer()
        try:
            for _ in range(self.max_tries):
                # Generate random assignment
                assignment = {
                    var: random.choice([True, False])
                    for var in range(1, formula.num_variables + 1)
                }
                
                if self.debug:
                    self._log_step(
                        "try",
                        "Trying random assignment",
                        formula,
                        assignment
                    )
                
                # Check if assignment satisfies formula
                if formula.is_satisfied_by(assignment):
                    if self.debug:
                        self._log_step(
                            "success",
                            "Found satisfying assignment",
                            formula,
                            assignment
                        )
                    return assignment
            
            if self.debug:
                self._log_step(
                    "failure",
                    "Max tries reached without finding solution",
                    formula,
                    {},
                    success=False
                )
            return None
        finally:
            self.stats.stop_timer()

    def _log_step(self, action_type: str, description: str, formula: Formula, 
                 assignments: Dict[int, bool], success: bool = True):
        """Log a solution step"""
        if self.debug:
            self._step_counter += 1
            step = {
                "step_number": self._step_counter,
                "depth": 0,
                "action_type": action_type,
                "description": description,
                "formula_state": str(formula),
                "assignments": assignments.copy(),
                "success": success
            }
            self.stats.stats["solution_steps"].value.append(step)

class ExhaustiveSATSolver(SATSolver):
    """Exhaustive search SAT solver implementation"""
    def __init__(self, debug: bool = False):
        super().__init__(debug)
        self.stats = create_solver_statistics("exhaustive")
        self._step_counter = 0

    def get_solving_steps(self) -> List[dict]:
        """Get the solution steps from statistics"""
        return self.stats.stats["solution_steps"].value

    def get_statistics(self) -> dict:
        """Get formatted statistics for output"""
        return {
            "total_steps": self._step_counter,
            "max_depth": 0,
            "unit_propagations": 0,
            "pure_literals": 0,
            "backtracks": 0,
            "two_clause_rules": 0
        }

    def solve(self, formula: Formula) -> Optional[Dict[int, bool]]:
        """Solve using exhaustive search"""
        self.stats.reset()
        self._step_counter = 0
        
        self.stats.start_timer()
        try:
            # Try all possible assignments
            for i in range(2 ** formula.num_variables):
                assignment = {}
                for var in range(1, formula.num_variables + 1):
                    assignment[var] = bool((i >> (var - 1)) & 1)
                
                if self.debug:
                    self._log_step(
                        "try",
                        f"Trying assignment {i + 1}/{2 ** formula.num_variables}",
                        formula,
                        assignment
                    )
                
                if formula.is_satisfied_by(assignment):
                    if self.debug:
                        self._log_step(
                            "success",
                            "Found satisfying assignment",
                            formula,
                            assignment
                        )
                    return assignment
            
            if self.debug:
                self._log_step(
                    "failure",
                    "No solution found after exhaustive search",
                    formula,
                    {},
                    success=False
                )
            return None
        finally:
            self.stats.stop_timer()

    def _log_step(self, action_type: str, description: str, formula: Formula, 
                 assignments: Dict[int, bool], success: bool = True):
        """Log a solution step"""
        if self.debug:
            self._step_counter += 1
            step = {
                "step_number": self._step_counter,
                "depth": 0,
                "action_type": action_type,
                "description": description,
                "formula_state": str(formula),
                "assignments": assignments.copy(),
                "success": success
            }
            self.stats.stats["solution_steps"].value.append(step)