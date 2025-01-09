import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, AlertCircle } from 'lucide-react';
import { defaultTransition } from '@/animations/transitions';
import { fadeIn } from '@/animations/variants';

interface OutputDisplayProps {
  output: string | null;
  error: string | null;
  isLoading: boolean;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, error, isLoading }) => {
  return (
    <motion.div
      className="demo-output"
      variants={fadeIn}
      transition={defaultTransition}
    >
      {isLoading ? (
        <div className="demo-output__loading">
          <Terminal className="icon" />
          <p>Running demo...</p>
        </div>
      ) : error ? (
        <div className="demo-output__error">
          <AlertCircle className="icon" />
          <p>{error}</p>
        </div>
      ) : output ? (
        <div className="demo-output__content">
          <pre>{output}</pre>
        </div>
      ) : (
        <div className="demo-output__empty">
          <Terminal className="icon" />
          <p>Run the demo to see the output</p>
        </div>
      )}
    </motion.div>
  );
};