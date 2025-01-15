import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Filter, X } from 'lucide-react';

import { defaultTransition, staggerTransition } from '@utils/animations/transitions';
import { fadeIn, fadeInUp, staggerContainer } from '@utils/animations/variants';

import './ProjectFilters.scss';

interface ProjectsFiltersProps {
  technologies: string[];
  selectedTech: string | null;
  onTechSelect: (tech: string | null) => void;
}

const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({
  technologies,
  selectedTech,
  onTechSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTechnologies = technologies.filter((tech) =>
    tech.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleTechSelect = (tech: string | null): void => {
    onTechSelect(tech);
    setIsDropdownOpen(false);
  };

  return (
    <motion.div className="projects-filters" variants={fadeInUp} transition={defaultTransition}>
      {/* Header with clear filter option */}
      <motion.div className="projects-filters__header" variants={fadeIn}>
        <h3>Filter by Technology</h3>
        {selectedTech && (
          <motion.button
            className="projects-filters__clear"
            onClick={() => handleTechSelect(null)}
            whileHover={{ x: -5 }}
            transition={defaultTransition}
          >
            Clear filter
            <X className="projects-filters__clear-icon" size={14} />
          </motion.button>
        )}
      </motion.div>

      <motion.div
        className="projects-filters__container"
        variants={staggerContainer}
        transition={staggerTransition(0.1)}
      >
        {/* Mobile Filter Button */}
        <motion.button
          className="projects-filters__mobile-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          variants={fadeIn}
          whileHover={{ scale: 1.02 }}
          transition={defaultTransition}
        >
          <Filter size={16} />
          <span>Filter Projects</span>
          <ChevronDown
            size={16}
            className={`projects-filters__icon ${isDropdownOpen ? 'projects-filters__icon--open' : ''}`}
          />
        </motion.button>

        {/* Desktop Filter Pills */}
        <motion.div
          className="projects-filters__pills"
          variants={staggerContainer}
          transition={staggerTransition(0.05)}
        >
          <motion.button
            variants={fadeIn}
            className={`projects-filters__pill ${!selectedTech ? 'projects-filters__pill--active' : ''}`}
            onClick={() => handleTechSelect(null)}
            whileHover={{ scale: 1.05 }}
            transition={defaultTransition}
          >
            All Projects
          </motion.button>
          {technologies.map((tech) => (
            <motion.button
              key={tech}
              variants={fadeIn}
              className={`projects-filters__pill ${selectedTech === tech ? 'projects-filters__pill--active' : ''}`}
              onClick={() => handleTechSelect(tech)}
              whileHover={{ scale: 1.05 }}
              transition={defaultTransition}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="projects-filters__dropdown"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={defaultTransition}
            >
              <motion.input
                type="text"
                className="projects-filters__search"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variants={fadeIn}
              />

              <motion.div
                className="projects-filters__options"
                variants={staggerContainer}
                transition={staggerTransition(0.05)}
              >
                <motion.button
                  variants={fadeIn}
                  className={`projects-filters__option ${!selectedTech ? 'projects-filters__option--active' : ''}`}
                  onClick={() => handleTechSelect(null)}
                  whileHover={{ x: 5 }}
                  transition={defaultTransition}
                >
                  All Projects
                </motion.button>
                {filteredTechnologies.map((tech) => (
                  <motion.button
                    key={tech}
                    variants={fadeIn}
                    className={`projects-filters__option ${selectedTech === tech ? 'projects-filters__option--active' : ''}`}
                    onClick={() => handleTechSelect(tech)}
                    whileHover={{ x: 5 }}
                    transition={defaultTransition}
                  >
                    {tech}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsFilters;
