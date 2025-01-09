import { type FC } from 'react';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Play } from 'lucide-react';

import { fadeIn } from '@/utils/animations';
import { defaultTransition } from '@/utils/animations/transitions';

import './ProjectLinks.scss';

export interface ProjectLinks {
  github?: string;
  live?: string;
  documentation?: string;
  demo?: string;
}

interface ProjectLinksProps {
  links: ProjectLinks;
  variant?: 'minimal' | 'detailed' | 'featured';
  className?: string;
}

export const ProjectLinks: FC<ProjectLinksProps> = ({
  links,
  variant = 'minimal',
  className = '',
}) => {
  if (!Object.values(links).some(Boolean)) {
    return null;
  }

  return (
    <div className={`project-links project-links--${variant} ${className}`.trim()}>
      {links.github && (
        <motion.a
          href={links.github}
          className="project-link project-link--github"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeIn}
          whileHover={{ x: 5 }}
          transition={defaultTransition}
        >
          <FontAwesomeIcon icon={faGithub} />
          {variant !== 'minimal' && <span>View Code</span>}
        </motion.a>
      )}

      {links.live && (
        <motion.a
          href={links.live}
          className="project-link project-link--live"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeIn}
          whileHover={{ x: 5 }}
          transition={defaultTransition}
        >
          <ExternalLink size={16} />
          {variant !== 'minimal' && <span>Live Site</span>}
        </motion.a>
      )}

      {links.documentation && (
        <motion.a
          href={links.documentation}
          className="project-link project-link--docs"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeIn}
          whileHover={{ x: 5 }}
          transition={defaultTransition}
        >
          <FileText size={16} />
          {variant !== 'minimal' && <span>Documentation</span>}
        </motion.a>
      )}

      {links.demo && (
        <motion.a
          href={links.demo}
          className="project-link project-link--demo"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeIn}
          whileHover={{ x: 5 }}
          transition={defaultTransition}
        >
          <Play size={16} />
          {variant !== 'minimal' && <span>Watch Demo</span>}
        </motion.a>
      )}
    </div>
  );
};
