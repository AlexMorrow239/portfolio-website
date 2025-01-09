import React from 'react';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { defaultTransition } from '@/utils/animations/transitions';
import { fadeInUp } from '@/utils/animations/variants';

import './DemoLayout.scss';

interface DemoLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  githubUrl?: string;
  docsUrl?: string;
}

export const DemoLayout: React.FC<DemoLayoutProps> = ({
  title,
  description,
  children,
  githubUrl,
  docsUrl,
}) => {
  return (
    <motion.div
      className="demo-layout"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={defaultTransition}
    >
      <Link to="/demos" className="demo-layout__back">
        <ArrowLeft size={20} />
        <span>Back to Demos</span>
      </Link>

      <div className="demo-layout__header">
        <h1>{title}</h1>
        <p>{description}</p>

        {(githubUrl || docsUrl) && (
          <div className="demo-layout__links">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                <span>View Source</span>
              </a>
            )}
            {docsUrl && (
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                <span>Documentation</span>
              </a>
            )}
          </div>
        )}
      </div>

      <div className="demo-layout__content">{children}</div>
    </motion.div>
  );
};
