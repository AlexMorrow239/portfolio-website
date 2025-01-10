import React from 'react';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, Loader2, Terminal, XCircle } from 'lucide-react';

import { defaultTransition } from '@/utils/animations/transitions';
import { fadeIn, fadeInUp } from '@/utils/animations/variants';

import { SolverOutput } from '../../types';
import { SolvingProcess } from '../SolvingProcess/SolvingProcess';
import './OutputDisplay.scss';

interface OutputDisplayProps {
  output: SolverOutput | null;
  error: string | null;
  isLoading: boolean;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, error, isLoading }) => {
  const renderStatusIcon = (satisfiable: boolean) => {
    return satisfiable ? (
      <CheckCircle className="status-icon success" size={24} />
    ) : (
      <XCircle className="status-icon error" size={24} />
    );
  };

  const renderOutput = () => {
    if (!output) return null;

    const { formula, satisfiable, assignment, num_variables, num_clauses, solving_process } =
      output;

    return (
      <motion.div className="output-content" variants={fadeInUp} transition={defaultTransition}>
        {/* Status Banner */}
        <div className={`status-banner ${satisfiable ? 'success' : 'error'}`}>
          {renderStatusIcon(satisfiable)}
          <div className="status-text">
            <h4>{satisfiable ? 'Formula is Satisfiable' : 'Formula is Unsatisfiable'}</h4>
            <p>
              {satisfiable ? 'A valid assignment has been found' : 'No valid assignment exists'}
            </p>
          </div>
        </div>

        {/* Formula Statistics */}
        <div className="statistics-panel">
          <div className="panel-header">
            <Info size={20} />
            <h3>Formula Statistics</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{num_variables}</div>
              <div className="stat-label">Variables</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{num_clauses}</div>
              <div className="stat-label">Clauses</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{(num_clauses / num_variables).toFixed(2)}</div>
              <div className="stat-label">Clause/Variable Ratio</div>
            </div>
          </div>
        </div>

        {/* Formula Display */}
        <div className="formula-panel">
          <div className="panel-header">
            <Terminal size={20} />
            <h3>Formula</h3>
          </div>
          <div className="formula-content">
            <code className="formula-text">{formula}</code>
          </div>
        </div>

        {/* Assignment Display */}
        {satisfiable && assignment && (
          <div className="assignment-panel">
            <div className="panel-header">
              <CheckCircle size={20} />
              <h3>Variable Assignments</h3>
            </div>
            <div className="assignment-grid">
              {Object.entries(assignment).map(([variable, value]) => (
                <div key={variable} className={`assignment-card ${value ? 'true' : 'false'}`}>
                  <div className="variable">x{variable}</div>
                  <div className="value">{String(value)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solving Process */}
        {solving_process && (
          <motion.div variants={fadeInUp} transition={{ ...defaultTransition, delay: 0.2 }}>
            <SolvingProcess steps={solving_process.steps} statistics={solving_process.statistics} />
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div className="output-display" variants={fadeIn} transition={defaultTransition}>
      {isLoading ? (
        <div className="output-display__loading">
          <Loader2 className="icon spin" />
          <div className="loading-text">
            <h4>Running Solver</h4>
            <p>This may take a few seconds...</p>
          </div>
        </div>
      ) : error ? (
        <div className="output-display__error">
          <AlertCircle className="icon" />
          <div className="error-text">
            <h4>Error Occurred</h4>
            <p>{error}</p>
          </div>
        </div>
      ) : output ? (
        renderOutput()
      ) : (
        <div className="output-display__empty">
          <Terminal className="icon" />
          <div className="empty-text">
            <h4>Ready to Solve</h4>
            <p>Configure parameters and run the demo to see results</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
