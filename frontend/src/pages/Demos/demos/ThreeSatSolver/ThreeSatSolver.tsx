import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Code, ExternalLink, Github, PlayCircle } from 'lucide-react';

import { defaultTransition, staggerTransition } from '@/utils/animations/transitions';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations/variants';

import './ThreeSatSolver.scss';
import { DemoRunner } from './components/DemoRunner/DemoRunner';

const ThreeSatSolver: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demo' | 'theory'>('demo');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'theory':
        return (
          <motion.div
            className="theory-content"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={defaultTransition}
          >
            <div className="theory-grid">
              <div className="info-card">
                <h3>Problem Definition</h3>
                <p>
                  The 3-SAT problem is a specific case of the boolean satisfiability problem where
                  each clause contains exactly three literals. Given a boolean formula in
                  conjunctive normal form, determine if there exists an assignment of variables that
                  makes the formula true.
                </p>
              </div>
              <div className="info-card">
                <h3>DPLL Algorithm</h3>
                <p>
                  The Davis-Putnam-Logemann-Loveland (DPLL) algorithm is a complete,
                  backtracking-based search algorithm for deciding the satisfiability of
                  propositional logic formulae in conjunctive normal form.
                </p>
              </div>
              <div className="info-card">
                <h3>Time Complexity</h3>
                <p>
                  The worst-case time complexity of the DPLL algorithm is O(2^n), where n is the
                  number of variables. However, for many practical instances, the algorithm performs
                  much better due to its efficient pruning techniques.
                </p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={defaultTransition}
          >
            <DemoRunner />
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      className="sat-solver"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={staggerTransition(0.2)}
    >
      {/* Header Section */}
      <motion.div className="sat-solver__header" variants={fadeInUp} transition={defaultTransition}>
        <h1>3-SAT Problem Solver</h1>
        <p>
          Explore this interactive demonstration of a 3-SAT problem solver using the DPLL algorithm.
          Generate random instances, visualize the solving process, and analyze the algorithm's
          performance in real-time.
        </p>

        <motion.div className="action-buttons" variants={fadeIn}>
          <a
            href="https://github.com/AlexMorrow239/3SAT-Problem"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            <Github size={20} />
            <span>View Source</span>
          </a>
          <a
            href="https://github.com/AlexMorrow239/3SAT-Problem/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            <ExternalLink size={20} />
            <span>Documentation</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.nav className="sat-solver__nav" variants={fadeInUp} transition={defaultTransition}>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            <PlayCircle size={18} />
            <span>Demo</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'theory' ? 'active' : ''}`}
            onClick={() => setActiveTab('theory')}
          >
            <Code size={18} />
            <span>Theory</span>
          </button>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <motion.section className="sat-solver__content">{renderTabContent()}</motion.section>
    </motion.div>
  );
};

export default ThreeSatSolver;
