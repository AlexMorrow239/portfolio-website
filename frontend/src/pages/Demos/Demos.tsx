import React from 'react';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

import { defaultTransition, staggerTransition } from '@/animations/transitions';
import { fadeInUp, staggerContainer } from '@/animations/variants';

import './Demos.scss';

const demos = [
  {
    id: 'three-sat-module',
    title: 'SAT Solver Demo',
    description:
      'Interactive demonstration of a Python-based SAT solver running in a secure Docker container',
    icon: <Terminal size={24} />,
    tags: ['Python', 'Docker', 'Backend'],
    path: '/demos/three-sat-module',
  },
  // Add more demos here
];

const Demos: React.FC = () => {
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
        {demos.map((demo) => (
          <Link key={demo.id} to={demo.path}>
            <motion.div className="demo-card" variants={fadeInUp} transition={defaultTransition}>
              <div className="demo-card__icon">{demo.icon}</div>
              <h2>{demo.title}</h2>
              <p>{demo.description}</p>
              <div className="demo-card__tags">
                {demo.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Demos;
