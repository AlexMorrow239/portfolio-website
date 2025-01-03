import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Project } from '@/types/project';
import { ProjectsService } from '@/services/projects.service';
import './Projects.scss';
import Loader from '@/components/common/Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await ProjectsService.getAllProjects();
        setProjects(fetchedProjects);
        setIsSuccess(true);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setIsSuccess(false);
      }
    };

    fetchProjects();
  }, []);

  // Get unique technologies for filters
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet);
  }, [projects]);

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (!selectedTech) return projects;
    return projects.filter((project) => project.technologies.includes(selectedTech));
  }, [selectedTech, projects]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

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

  return (
    <div className="projects">
      {/* Header Section */}
      <motion.div
        className="projects__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Featured Projects</h1>
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
          className={`btn btn--secondary ${!selectedTech ? 'active' : ''}`}
          onClick={() => setSelectedTech(null)}
        >
          All Projects
        </button>
        {allTechnologies.map((tech) => (
          <button
            key={tech}
            className={`btn btn--secondary ${selectedTech === tech ? 'active' : ''}`}
            onClick={() => setSelectedTech(tech)}
          >
            {tech}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="projects__grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              className="project-card"
              variants={cardVariants}
              layout
              whileHover={{ y: -8 }}
            >
              {project.imageUrl && (
                <div className="project-card__image">
                  <img src={project.imageUrl} alt={project.title} loading="lazy" />
                </div>
              )}

              <div className="project-card__content">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>

                <div className="project-card__tags">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="project-card__tag"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="project-card__links">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--secondary"
                    >
                      <FontAwesomeIcon icon={faGithub} size="sm" />
                      GitHub
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div className="projects__empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Terminal size={32} />
          <h3>No projects found</h3>
          <p>No projects match the selected filter. Try selecting a different technology.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
