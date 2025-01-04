import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { Project } from '@/types/project';
import { ProjectsService } from '@/services/projects.service';
import './Projects.scss';
import Loader from '@/components/common/Loader/Loader';
import FeaturedProjects from './FeaturedProjects/FeaturedProjects';
import ProjectList from './ProjectsList/ProjectList';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedProjects = await ProjectsService.getAllProjects();
      setProjects(fetchedProjects);
      setIsSuccess(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
      console.error('Failed to fetch projects:', error);
      setError(errorMessage);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchProjects();
  }, []);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) return projects;
    return projects.filter((project) => project.technologies.includes(selectedTech));
  }, [selectedTech, projects]);

  const featuredProjects = useMemo(() => {
    return filteredProjects.filter((project) => project.featured);
  }, [filteredProjects]);

  const nonFeaturedProjects = useMemo(() => {
    return filteredProjects.filter((project) => !project.featured);
  }, [filteredProjects]);

  if (isLoading) {
    return (
      <Loader
        messages={['Fetching projects...', 'Loading project details...', 'Preparing showcase...']}
        completionMessage="Projects loaded successfully!"
        duration={2000}
        onComplete={() => {
          setIsLoading(false);
          setIsSuccess(false);
        }}
        isSuccess={isSuccess}
      />
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

      {/* Filters Section */}
      <motion.div
        className="projects__filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          className={`projects__filter ${!selectedTech ? 'active' : ''}`}
          onClick={() => setSelectedTech(null)}
        >
          All Projects
        </button>
        {allTechnologies.map((tech) => (
          <button
            key={tech}
            className={`projects__filter ${selectedTech === tech ? 'active' : ''}`}
            onClick={() => setSelectedTech(tech)}
          >
            {tech}
          </button>
        ))}
      </motion.div>

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
