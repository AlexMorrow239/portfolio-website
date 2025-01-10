import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { HelpCircle, Info, RotateCw } from 'lucide-react';

import { API_BASE_URL } from '@/config';
import { defaultTransition, staggerTransition } from '@/utils/animations/transitions';
import { fadeIn, fadeInUp } from '@/utils/animations/variants';

import { SolverInput, SolverOutput } from '../../types';
import { InputForm } from '../InputForm/InputForm';
import { OutputDisplay } from '../OutputDisplay/OutputDisplay';
import './DemoRunner.scss';

export const DemoRunner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<SolverOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [runCount, setRunCount] = useState(0);

  const runDemo = async (params: SolverInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/demos/three-sat/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          n: params.integer,
          ratio: params.float,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to run demo');
      }

      const data: SolverOutput = await response.json();
      setOutput(data);
      setRunCount((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOutput(null);
    setError(null);
  };

  return (
    <motion.div
      className="demo-runner"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={defaultTransition}
    >
      <div className="demo-runner__container">
        <div className="demo-runner__content">
          <motion.aside
            className="demo-runner__sidebar"
            variants={fadeInUp}
            transition={staggerTransition(0.1)}
          >
            {/* Control Panel */}
            <div className="control-panel">
              <div className="panel-header">
                <h3>Demo Controls</h3>
                {runCount > 0 && (
                  <button className="reset-button" onClick={handleReset} disabled={isLoading}>
                    <RotateCw size={16} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
              <InputForm onSubmit={runDemo} isLoading={isLoading} />
            </div>

            {/* Info Cards */}
            <div className="info-section">
              <div className="info-card">
                <div className="card-header">
                  <Info size={20} />
                  <h3>How it Works</h3>
                </div>
                <div className="card-content">
                  <p>
                    This demo generates and solves random 3-SAT formulas using the DPLL algorithm.
                    The parameters you choose affect the problem's complexity and solvability.
                  </p>
                  <div className="parameter-info">
                    <h4>
                      <span>Parameters</span>
                      <HelpCircle size={16} />
                    </h4>
                    <ul>
                      <li>
                        <strong>Number of Variables (n):</strong>
                        <p>More variables increase the problem's complexity exponentially.</p>
                      </li>
                      <li>
                        <strong>Clause/Variable Ratio:</strong>
                        <p>
                          Higher ratios typically make formulas harder to satisfy. The phase
                          transition occurs around 4.3.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.main
            className="demo-runner__main"
            variants={fadeInUp}
            transition={staggerTransition(0.2)}
          >
            <OutputDisplay output={output} error={error} isLoading={isLoading} />
          </motion.main>
        </div>
      </div>
    </motion.div>
  );
};
