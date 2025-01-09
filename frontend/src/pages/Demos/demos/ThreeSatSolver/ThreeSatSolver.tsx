import React from 'react';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

import { defaultTransition, staggerTransition } from '@/utils/animations/transitions';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations/variants';

import './ThreeSatSolver.scss';
import { DemoRunner } from './components/DemoRunner';

const ThreeSatSolver: React.FC = () => {
  return (
    <motion.div
      className="python-demo"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={staggerTransition(0.2)}
    >
      {/* Header Section */}
      <motion.div
        className="python-demo__header"
        variants={fadeInUp}
        transition={defaultTransition}
      >
        <h1>3-Satisfisfiability Problem Solver</h1>
        <p>
          This is a demonstration of a randomly generated 3-SAT problem solved using the DPLL
          algorithm. I analyze this algorithm in depth and also look at other algorithms on my
          Github.
        </p>

        <motion.div className="python-demo__links" variants={fadeIn}>
          <a
            href="https://github.com/AlexMorrow239/3SAT-Problem"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            <Github size={20} />
            <span>View Source</span>
          </a>
          <a
            href="https://github.com/AlexMorrow239/3SAT-Problem/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            <ExternalLink size={20} />
            <span>Documentation</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Demo Section */}
      <motion.section variants={fadeInUp} transition={defaultTransition}>
        <DemoRunner />
      </motion.section>
    </motion.div>
  );
};

export default ThreeSatSolver;
