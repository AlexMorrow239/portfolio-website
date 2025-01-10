import React from 'react';

import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';

import { defaultTransition } from '@/utils/animations/transitions';
import { fadeIn } from '@/utils/animations/variants';

import { SolvingStatistics, SolvingStep } from '../../types';
import './SolvingProcess.scss';

interface SolvingProcessProps {
  steps: SolvingStep[];
  statistics: SolvingStatistics;
}

export const SolvingProcess: React.FC<SolvingProcessProps> = ({ steps, statistics }) => {
  console.log('Steps data:', steps);

  return (
    <motion.div
      className="solving-process"
      variants={fadeIn}
      transition={defaultTransition}
      key="solving-process"
    >
      {/* Statistics Summary */}
      <div className="solving-process__stats">
        <h3>Solving Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="label">Total Steps</span>
            <span className="value">{statistics.total_steps}</span>
          </div>
          <div className="stat-item">
            <span className="label">Max Depth</span>
            <span className="value">{statistics.max_depth}</span>
          </div>
          <div className="stat-item">
            <span className="label">Unit Propagations</span>
            <span className="value">{statistics.unit_propagations}</span>
          </div>
          <div className="stat-item">
            <span className="label">Pure Literals</span>
            <span className="value">{statistics.pure_literals}</span>
          </div>
          <div className="stat-item">
            <span className="label">Backtracks</span>
            <span className="value">{statistics.backtracks}</span>
          </div>
          <div className="stat-item">
            <span className="label">Two-Clause Rules</span>
            <span className="value">{statistics.two_clause_rules}</span>
          </div>
        </div>
      </div>

      {/* Solution Steps */}
      <div className="solving-process__steps">
        <h3>Solution Steps</h3>
        <div className="step-list">
          {steps.map((step, index) => (
            <motion.div
              key={`step-${step.step_number}-${index}`}
              className={`step-item ${step.success ? 'success' : 'failure'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="step-header">
                <GitCommit size={16} className="step-icon" />
                <span className="step-number">Step {step.step_number}</span>
                <span className="step-depth">Depth {step.depth}</span>
                {step.action_type && (
                  <span className={`step-action ${step.action_type.toLowerCase()}`}>
                    {step.action_type}
                  </span>
                )}
              </div>
              <div className="step-content">
                <p className="description">{step.description}</p>
                <div className="formula">
                  <pre>{step.formula_state}</pre>
                </div>
                <div className="assignments">
                  {Object.entries(step.assignments).map(([variable, value]) => (
                    <span
                      key={`${step.step_number}-${variable}`}
                      className={`assignment ${value ? 'true' : 'false'}`}
                    >
                      {variable} = {value.toString()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
