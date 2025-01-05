import { motion } from 'framer-motion';
import { type FC } from 'react';
import { fadeIn } from '@/animations';
import { defaultTransition } from '@/animations/transitions';

import './ProjectTags.scss';

interface ProjectTagsProps {
  tags: string[];
  variant?: 'featured' | 'minimal' | 'detailed';
  limit?: number;
  className?: string;
}

export const ProjectTags: FC<ProjectTagsProps> = ({
  tags,
  variant = 'featured',
  limit,
  className = '',
}) => {
  const displayTags = limit ? tags.slice(0, limit) : tags;

  return (
    <div className={`project-tags project-tags--${variant} ${className}`.trim()}>
      {displayTags.map((tag) => (
        <motion.span
          key={tag}
          className="project-tag"
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          transition={defaultTransition}
        >
          {tag}
        </motion.span>
      ))}
      {limit && tags.length > limit && (
        <motion.span
          className="project-tag project-tag--more"
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          transition={defaultTransition}
        >
          +{tags.length - limit}
        </motion.span>
      )}
    </div>
  );
};
