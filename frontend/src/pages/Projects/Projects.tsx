import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { type Project } from '@/types/project';
import { ProjectsService } from '@/services/projects.service';
import './Projects.scss';
import Loader from '@/components/common/Loader/Loader';
import FeaturedProjects from './FeaturedProjects/FeaturedProjects';
import ProjectList from './ProjectsList/ProjectList';
import ProjectsFilters from './ProjectsFilters/ProjectsFilters';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchProjects = React.useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      loaderTimeoutRef.current = setTimeout(() => {
        setShowLoader(true);
      }, 300);

      const fetchedProjects = await ProjectsService.getAllProjects();
      setProjects(fetchedProjects);

      if (showLoader) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
      console.error('Failed to fetch projects:', error);
      setError(errorMessage);
    } finally {
      if (loaderTimeoutRef.current !== null) {
        clearTimeout(loaderTimeoutRef.current);
      }
      setIsLoading(false);
      setShowLoader(false);
    }
  }, [showLoader]);

  useEffect(() => {
    void fetchProjects();
    return () => {
      if (loaderTimeoutRef.current !== null) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, [fetchProjects]);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) {
      return projects;
    }
    return projects.filter((project) => project.technologies.includes(selectedTech));
  }, [selectedTech, projects]);

  const featuredProjects = useMemo(
    () => filteredProjects.filter((project) => project.featured),
    [filteredProjects],
  );

  const nonFeaturedProjects = useMemo(
    () => filteredProjects.filter((project) => !project.featured),
    [filteredProjects],
  );

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

  // Show loading skeleton or spinner for quick loads
  if (isLoading && !showLoader) {
    return (
      <div className="projects">
        <div className="projects__loading">
          {/* Add a simple loading spinner or skeleton here */}
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects">
        <motion.div
          className="projects__error"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Terminal size={32} className="error-icon" />
          <h3>Error Loading Projects</h3>
          <p>{error}</p>
          <button
            className="btn btn--primary"
            onClick={() => {
              setIsLoading(true);
              setError(null);
              void fetchProjects();
            }}
          >
            Try Again
          </button>
        </motion.div>
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

      <ProjectsFilters
        technologies={allTechnologies}
        selectedTech={selectedTech}
        onTechSelect={setSelectedTech}
      />

      {/* Featured Projects Section */}
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
      </AnimatePresence>

      {/* Project List Section */}
      <AnimatePresence mode="wait">
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
      </AnimatePresence>

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
    </div>
  );
};

export default Projects;
