import { type FC } from 'react';

import { motion } from 'framer-motion';

import { fadeIn } from '@/utils/animations';
import { defaultTransition } from '@/utils/animations/transitions';

import './ProjectTags.scss';

interface ProjectTagsProps {
  tags: string[];
  variant?: 'featured' | 'minimal' | 'detailed';
  type?: 'technology' | 'skill';
  limit?: number;
  className?: string;
}

export const ProjectTags: FC<ProjectTagsProps> = ({
  tags,
  variant = 'featured',
  type = 'technology',
  limit,
  className = '',
}) => {
  const displayTags = limit ? tags.slice(0, limit) : tags;

  return (
    <div className={`project-tags project-tags--${variant} ${className}`.trim()}>
      {displayTags.map((tag) => (
        <motion.span
          key={tag}
          className={`project-tag project-tag--${type}`}
          variants={fadeIn}
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.05,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 10,
            },
          }}
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
