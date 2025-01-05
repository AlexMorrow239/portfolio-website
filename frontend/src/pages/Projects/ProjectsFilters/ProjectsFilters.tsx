import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, ChevronDown } from 'lucide-react';
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
    <div className="projects-filters">
      {/* Header with clear filter option */}
      <div className="projects-filters__header">
        <h3>Filter by Technology</h3>
        {selectedTech && (
          <button className="projects-filters__clear" onClick={() => handleTechSelect(null)}>
            Clear filter
            <X className="projects-filters__clear-icon" size={14} />
          </button>
        )}
      </div>

      <div className="projects-filters__container">
        {/* Mobile Filter Button */}
        <button
          className="projects-filters__mobile-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Filter size={16} />
          <span>Filter Projects</span>
          <ChevronDown
            size={16}
            className={`projects-filters__icon ${isDropdownOpen ? 'projects-filters__icon--open' : ''}`}
          />
        </button>

        {/* Desktop Filter Pills */}
        <div className="projects-filters__pills">
          <button
            className={`projects-filters__pill ${!selectedTech ? 'projects-filters__pill--active' : ''}`}
            onClick={() => handleTechSelect(null)}
          >
            All Projects
          </button>
          {technologies.map((tech) => (
            <button
              key={tech}
              className={`projects-filters__pill ${selectedTech === tech ? 'projects-filters__pill--active' : ''}`}
              onClick={() => handleTechSelect(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="projects-filters__dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                className="projects-filters__search"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="projects-filters__options">
                <button
                  className={`projects-filters__option ${!selectedTech ? 'projects-filters__option--active' : ''}`}
                  onClick={() => handleTechSelect(null)}
                >
                  All Projects
                </button>
                {filteredTechnologies.map((tech) => (
                  <button
                    key={tech}
                    className={`projects-filters__option ${selectedTech === tech ? 'projects-filters__option--active' : ''}`}
                    onClick={() => handleTechSelect(tech)}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsFilters;
