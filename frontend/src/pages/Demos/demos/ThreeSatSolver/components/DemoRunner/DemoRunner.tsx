import React, { useState } from 'react';

import { motion } from 'framer-motion';

import { API_BASE_URL } from '@/config';
import { defaultTransition } from '@/utils/animations/transitions';
import { fadeIn } from '@/utils/animations/variants';

import { SolverInput, SolverOutput } from '../../types';
import { InputForm } from '../InputForm';
import { OutputDisplay } from '../OutputDisplay';
import './DemoRunner.scss';

export const DemoRunner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<SolverOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
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
          <aside className="demo-runner__sidebar">
            <InputForm onSubmit={runDemo} isLoading={isLoading} />

            <div className="demo-runner__info">
              <h3>How it Works</h3>
              <p>This demo generates a random 3-SAT formula based on your inputs:</p>
              <ul>
                <li>
                  <strong>Number of Variables:</strong> Determines the complexity of the formula
                </li>
                <li>
                  <strong>Clause/Variable Ratio:</strong> Affects the likelihood of satisfiability
                </li>
              </ul>
            </div>
          </aside>

          <main className="demo-runner__main">
            <OutputDisplay output={output} error={error} isLoading={isLoading} />
          </main>
        </div>
      </div>
    </motion.div>
  );
};
