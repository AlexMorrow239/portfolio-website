import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useProjects } from '@/hooks/useProject';
import Loader from '@/components/common/Loader/Loader';
import LoadingState from '@/components/common/LoadingState/LoadingState';
import { ErrorState } from '@/components/common/ErrorState/ErrorState';
import FeaturedProjects from './FeaturedProjects/FeaturedProjects';
import ProjectList from './ProjectsList/ProjectList';
import ProjectsFilters from './ProjectsFilters/ProjectsFilters';
import './Projects.scss';

const Projects: React.FC = () => {
  const { projects, isLoading, showLoader, setShowLoader, error, fetchProjects } = useProjects();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Memoized computations
  const { allTechnologies, filteredProjects, featuredProjects, nonFeaturedProjects } =
    useMemo(() => {
      // Get unique technologies
      const techSet = new Set<string>();
      projects.forEach((project) => {
        project.technologies.forEach((tech) => techSet.add(tech));
      });

      // Filter projects based on selected technology
      const filtered = !selectedTech
        ? projects
        : projects.filter((project) => project.technologies.includes(selectedTech));

      return {
        allTechnologies: Array.from(techSet).sort(),
        filteredProjects: filtered,
        featuredProjects: filtered.filter((project) => project.featured),
        nonFeaturedProjects: filtered.filter((project) => !project.featured),
      };
    }, [projects, selectedTech]);

  // Render states
  if (showLoader) {
    return (
      <Loader
        messages={['Fetching projects...', 'Loading project details...', 'Preparing showcase...']}
        completionMessage="Projects loaded successfully!"
        duration={3000}
        onComplete={() => setShowLoader(false)}
        isSuccess={true}
      />
    );
  }

  if (isLoading && !showLoader) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="projects">
        <ErrorState message={error} onRetry={() => void fetchProjects()} />
      </div>
    );
  }

  return (
    <div className="projects">
      {/* Header Section */}
      <motion.div
        className="projects__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Project Portfolio</h1>
        <p>A collection of my recent work and technical explorations</p>
      </motion.div>

      {/* Filters */}
      <ProjectsFilters
        technologies={allTechnologies}
        selectedTech={selectedTech}
        onTechSelect={setSelectedTech}
      />

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {featuredProjects.length > 0 && (
          <motion.div
            className="projects__featured"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <FeaturedProjects projects={featuredProjects} />
          </motion.div>
        )}

        {nonFeaturedProjects.length > 0 && (
          <motion.div
            className="projects__list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProjectList projects={nonFeaturedProjects} />
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="projects__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Terminal size={32} />
            <h3>No Projects Found</h3>
            <p>No projects match the selected filter. Try selecting a different technology.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
