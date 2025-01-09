import React from 'react';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

import { defaultTransition, staggerTransition } from '@/animations/transitions';
import { fadeIn, fadeInUp, staggerContainer } from '@/animations/variants';
import { DemoRunner } from '@/pages/Demos/components/DemoRunner';

import './ThreeSatDemo.scss';

const ThreeSatDemo: React.FC = () => {
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
        <h1>Python Module Demo</h1>
        <p>Interactive demonstration of a Python module running in a secure Docker container</p>

        <motion.div className="python-demo__links" variants={fadeIn}>
          <a
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            <Github size={20} />
            <span>View Source</span>
          </a>
          <a
            href="https://your-documentation-link.com"
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
        <DemoRunner
          title="Try It Out"
          description="Enter parameters below to run the Python module in a secure environment"
        />
      </motion.section>
    </motion.div>
  );
};

export default ThreeSatDemo;
