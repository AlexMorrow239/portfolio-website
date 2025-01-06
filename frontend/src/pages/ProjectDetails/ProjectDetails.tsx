import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { defaultTransition, staggerTransition } from '@/animations/transitions';
import { fadeIn, fadeInUp, staggerContainer } from '@/animations/variants';
import { ProjectLinks } from '@/components/ProjectElements/ProjectLinks/ProjectLinks';
import { ProjectTags } from '@/components/ProjectElements/ProjectTags/ProjectTags';
import { ProjectsService } from '@/services/projects.service';
import { type Project } from '@/types/project';

import './ProjectDetails.scss';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        if (id) {
          const projectData = await ProjectsService.getProjectById(id);
          setProject(projectData);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch project';
        console.error('Failed to fetch project:', error);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className="project-detail__loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-detail__error">
        <h2>Error Loading Project</h2>
        <p>{error ?? 'Project not found'}</p>
        <motion.button
          className="btn btn--primary"
          onClick={() => void navigate('/projects')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={defaultTransition}
        >
          Back to Projects
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      className="project-detail"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      transition={staggerTransition(0.2)}
    >
      <motion.button
        className="btn btn--ghost project-detail__back-button"
        onClick={() => void navigate('/projects')}
        variants={fadeIn}
        whileHover={{ x: -10 }}
        transition={defaultTransition}
      >
        <ArrowLeft size={20} />
        <span>Back to Projects</span>
      </motion.button>

      <motion.div
        className="project-detail__content"
        variants={fadeInUp}
        transition={defaultTransition}
      >
        {project.imageUrl && (
          <motion.div className="project-detail__hero" variants={fadeIn}>
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={defaultTransition}
            />
          </motion.div>
        )}

        <motion.div className="project-detail__header" variants={fadeIn}>
          <h1>{project.title}</h1>
          {project.links && (
            <ProjectLinks
              links={project.links}
              variant="detailed"
              className="project-detail__links"
            />
          )}
        </motion.div>

        <motion.div className="project-detail__description" variants={fadeIn}>
          <h2>About this Project</h2>
          <p>{project.description}</p>
        </motion.div>

        <motion.div
          className="project-detail__info-grid"
          variants={staggerContainer}
          transition={staggerTransition(0.1)}
        >
          <motion.div className="project-detail__section" variants={fadeIn}>
            <h2>Technologies</h2>
            <ProjectTags
              tags={project.technologies}
              variant="detailed"
              className="project-detail__tags"
            />
          </motion.div>

          {project.skills && project.skills.length > 0 && (
            <motion.div className="project-detail__section" variants={fadeIn}>
              <h2>Skills Applied</h2>
              <ProjectTags
                tags={project.skills}
                variant="detailed"
                className="project-detail__tags"
              />
            </motion.div>
          )}
        </motion.div>

        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <motion.div className="project-detail__metrics-section" variants={fadeIn}>
            <h2>Key Metrics</h2>
            <motion.div
              className="project-detail__metrics"
              variants={staggerContainer}
              transition={staggerTransition(0.1)}
            >
              {Object.entries(project.metrics).map(([key, value]) => (
                <motion.div
                  key={key}
                  className="project-detail__metric"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={defaultTransition}
                >
                  <h3>{key}</h3>
                  <p>{value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
