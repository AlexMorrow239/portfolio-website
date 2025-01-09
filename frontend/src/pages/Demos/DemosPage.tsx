import React from 'react';

import { motion } from 'framer-motion';

import { defaultTransition, staggerTransition } from '@/utils/animations/transitions';
import { fadeInUp, staggerContainer } from '@/utils/animations/variants';

import './DemosPage.scss';
import { DemoCard } from './components/DemoCard/DemoCard';
import { availableDemos } from './demos';

const DemosPage: React.FC = () => {
  return (
    <motion.div
      className="demos"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={staggerTransition(0.2)}
    >
      <motion.div className="demos__header" variants={fadeInUp} transition={defaultTransition}>
        <h1>Interactive Demos</h1>
        <p>
          Explore live demonstrations of various projects and technical implementations. Each demo
          runs in a secure, isolated environment with defined resource limits.
        </p>
      </motion.div>

      <motion.div
        className="demos__grid"
        variants={staggerContainer}
        transition={staggerTransition(0.1)}
      >
        {availableDemos.map((demo) => (
          <DemoCard key={demo.id} {...demo} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DemosPage;
