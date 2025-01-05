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
import { fadeIn, fadeInUp, staggerContainer } from '@/animations/variants';
import { defaultTransition, staggerTransition } from '@/animations/transitions';
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
    <motion.div
      className="projects"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={staggerTransition(0.2)}
    >
      {/* Header Section */}
      <motion.div className="projects__header" variants={fadeInUp} transition={defaultTransition}>
        <h1>Project Portfolio</h1>
        <p>A collection of my recent work and technical explorations</p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeIn}>
        <ProjectsFilters
          technologies={allTechnologies}
          selectedTech={selectedTech}
          onTechSelect={setSelectedTech}
        />
      </motion.div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {featuredProjects.length > 0 && (
          <motion.div
            className="projects__featured"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={defaultTransition}
          >
            <FeaturedProjects projects={featuredProjects} />
          </motion.div>
        )}

        {nonFeaturedProjects.length > 0 && (
          <motion.div
            className="projects__list"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ ...defaultTransition, delay: 0.2 }}
          >
            <ProjectList projects={nonFeaturedProjects} />
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="projects__empty"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={defaultTransition}
          >
            <Terminal size={32} />
            <h3>No Projects Found</h3>
            <p>No projects match the selected filter. Try selecting a different technology.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
