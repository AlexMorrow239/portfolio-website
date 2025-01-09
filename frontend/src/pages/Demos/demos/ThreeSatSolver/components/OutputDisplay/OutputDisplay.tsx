import React from 'react';

import { motion } from 'framer-motion';
import { AlertCircle, Terminal } from 'lucide-react';

import { defaultTransition } from '@/utils/animations/transitions';
import { fadeIn } from '@/utils/animations/variants';

import { SolverOutput } from '../../types';
import { SolvingProcess } from '../SolvingProcess';
import './OutputDisplay.scss';

interface OutputDisplayProps {
  output: SolverOutput | null;
  error: string | null;
  isLoading: boolean;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, error, isLoading }) => {
  const renderOutput = () => {
    if (!output) return null;

    const { formula, satisfiable, assignment, num_variables, num_clauses, solving_process } =
      output;

    return (
      <div className="output-content">
        {/* Formula Information */}
        <div className="formula-info">
          <h3>Formula Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Variables</span>
              <span className="value">{num_variables}</span>
            </div>
            <div className="info-item">
              <span className="label">Clauses</span>
              <span className="value">{num_clauses}</span>
            </div>
            <div className="info-item">
              <span className="label">Clause/Variable Ratio</span>
              <span className="value">{(num_clauses / num_variables).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Formula Result */}
        <div className="formula-result">
          <h3>Formula Result</h3>
          <div className={`result-box ${satisfiable ? 'satisfiable' : 'unsatisfiable'}`}>
            <p className="formula">{formula}</p>
            <p className="result">{satisfiable ? '✅ SATISFIABLE' : '❌ UNSATISFIABLE'}</p>
            {satisfiable && assignment && (
              <div className="assignments">
                {Object.entries(assignment).map(([variable, value]) => (
                  <span
                    key={variable}
                    className={`assignment ${Boolean(value) ? 'true' : 'false'}`}
                  >
                    x{variable} = {String(value)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Solving Process */}
        {solving_process && (
          <SolvingProcess steps={solving_process.steps} statistics={solving_process.statistics} />
        )}
      </div>
    );
  };

  return (
    <motion.div className="output-display" variants={fadeIn} transition={defaultTransition}>
      {isLoading ? (
        <div className="output-display__loading">
          <Terminal className="icon" />
          <p>Running demo...</p>
        </div>
      ) : error ? (
        <div className="output-display__error">
          <AlertCircle className="icon" />
          <p>{error}</p>
        </div>
      ) : output ? (
        renderOutput()
      ) : (
        <div className="output-display__empty">
          <Terminal className="icon" />
          <p>Run the demo to see the output</p>
        </div>
      )}
    </motion.div>
  );
};
