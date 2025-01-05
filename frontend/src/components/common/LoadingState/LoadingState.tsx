import { motion } from 'framer-motion';
import './LoadingState.scss';

const LoadingState: React.FC = () => (
  <div className="loading-state">
    {/* Header Skeleton */}
    <div className="loading-state__header">
      <motion.div
        className="loading-state__title"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="loading-state__subtitle"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
    </div>

    {/* Filters Skeleton */}
    <div className="loading-state__filters">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="loading-state__filter"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>

    {/* Featured Projects Skeleton */}
    <div className="loading-state__featured">
      {[1, 2].map((i) => (
        <motion.div
          key={i}
          className="loading-state__featured-card"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
        >
          <div className="loading-state__image" />
          <div className="loading-state__content">
            <div className="loading-state__card-title" />
            <div className="loading-state__card-text" />
            <div className="loading-state__tags">
              {[1, 2, 3].map((j) => (
                <div key={j} className="loading-state__tag" />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Project List Skeleton */}
    <div className="loading-state__list">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="loading-state__list-card"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        >
          <div className="loading-state__card-content">
            <div className="loading-state__card-title" />
            <div className="loading-state__card-text" />
            <div className="loading-state__tags">
              {[1, 2].map((j) => (
                <div key={j} className="loading-state__tag" />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default LoadingState;
