"""
SAT Solver Demo Module

This module provides a demonstration of SAT solving algorithms,
specifically focusing on the DPLL (Davis-Putnam-Logemann-Loveland) algorithm
for solving Boolean satisfiability problems.
"""

from .utils import Formula, RandomFormulaGenerator, FormulaError
from .stats import (
    SolverStatistics, 
    DPLLStatistics, 
    StatisticsAnalyzer,
    create_solver_statistics
)
from .solver import DPLLSolver, RandomSATSolver, ExhaustiveSATSolver

__all__ = [
    'Formula',
    'RandomFormulaGenerator',
    'FormulaError',
    'DPLLSolver',
    'RandomSATSolver',
    'ExhaustiveSATSolver',
    'SolverStatistics',
    'DPLLStatistics',
    'StatisticsAnalyzer',
    'create_solver_statistics'
]

__version__ = '1.0.0'