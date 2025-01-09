import React from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { defaultTransition } from '@/utils/animations/transitions';
import { fadeInUp } from '@/utils/animations/variants';

import { DemoInfo } from '../../types';
import './DemoCard.scss';

export const DemoCard: React.FC<DemoInfo> = ({ title, description, icon, tags, path }) => {
  return (
    <Link to={path}>
      <motion.div className="demo-card" variants={fadeInUp} transition={defaultTransition}>
        <div className="demo-card__icon">{icon}</div>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="demo-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </Link>
  );
};
