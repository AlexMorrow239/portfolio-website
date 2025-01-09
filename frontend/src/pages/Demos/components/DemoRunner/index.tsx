import React, { useState } from 'react';

import { motion } from 'framer-motion';

import { API_BASE_URL } from '@/config';
import { defaultTransition, staggerTransition } from '@/utils/animations/transitions';
import { fadeInUp, staggerContainer } from '@/utils/animations/variants';

import './DemoRunner.scss';
import { InputForm } from './InputForm';
import { OutputDisplay } from './OutputDisplay';

interface DemoRunnerProps {
  title: string;
  description: string;
}

export const DemoRunner: React.FC<DemoRunnerProps> = ({ title, description }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runDemo = async (params: { integer: number; float: number }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/demos/three-sat/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          n: params.integer,
          ratio: params.float,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to run demo');
      }

      const data = await response.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="demo-runner"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={staggerTransition()}
    >
      <motion.div
        className="demo-runner__header"
        variants={fadeInUp}
        transition={defaultTransition}
      >
        <h2>{title}</h2>
        <p>{description}</p>
      </motion.div>

      <div className="demo-runner__content">
        <InputForm onSubmit={runDemo} isLoading={isLoading} />
        <OutputDisplay output={output} error={error} isLoading={isLoading} />
      </div>
    </motion.div>
  );
};
