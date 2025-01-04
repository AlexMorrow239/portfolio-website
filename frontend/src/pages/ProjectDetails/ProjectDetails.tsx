import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '@/types/project';
import { ProjectsService } from '@/services/projects.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './ProjectDetails.scss';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
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
        <p>{error || 'Project not found'}</p>
        <button className="btn btn--primary" onClick={() => navigate('/projects')}>
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="project-detail__back-button" onClick={() => navigate('/projects')}>
        <ArrowLeft size={20} />
        <span>Back to Projects</span>
      </button>

      <div className="project-detail__content">
        {project.imageUrl && (
          <div className="project-detail__hero">
            <img src={project.imageUrl} alt={project.title} />
          </div>
        )}

        <div className="project-detail__header">
          <h1>{project.title}</h1>
          <div className="project-detail__links">
            {project.links?.github && (
              <a
                href={project.links.github}
                className="project-detail__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>View Code</span>
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                className="project-detail__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink />
                <span>Live Demo</span>
              </a>
            )}
            {project.links?.documentation && (
              <a
                href={project.links.documentation}
                className="project-detail__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink />
                <span>Documentation</span>
              </a>
            )}
          </div>
        </div>

        <div className="project-detail__description">
          <h2>About this Project</h2>
          <p>{project.description}</p>
        </div>

        <div className="project-detail__info-grid">
          <div className="project-detail__section">
            <h2>Technologies</h2>
            <div className="project-detail__tags">
              {project.technologies.map((tech) => (
                <span key={tech} className="project-detail__tag project-detail__tag--tech">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.skills && project.skills.length > 0 && (
            <div className="project-detail__section">
              <h2>Skills Applied</h2>
              <div className="project-detail__tags">
                {project.skills.map((skill) => (
                  <span key={skill} className="project-detail__tag project-detail__tag--skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <div className="project-detail__section">
            <h2>Key Metrics</h2>
            <div className="project-detail__metrics">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="project-detail__metric">
                  <h3>{key}</h3>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
