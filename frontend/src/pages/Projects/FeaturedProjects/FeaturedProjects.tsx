import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { type Project } from '@/types/project';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './FeaturedProjects.scss';

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="featured-projects">
      <h2>Featured Projects</h2>
      <div className="featured-projects__grid">
        {projects.map((project) => (
          <motion.article
            key={project._id}
            className="featured-project-card"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={`/projects/${project._id}`}
              className="featured-project-card__content-wrapper"
            >
              {project.imageUrl && (
                <div className="featured-project-card__image">
                  <img src={project.imageUrl} alt={project.title} />
                  <div className="featured-project-card__image-overlay" />
                </div>
              )}

              <div className="featured-project-card__content">
                <header>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </header>

                <div className="featured-project-card__info">
                  <div className="featured-project-card__section">
                    <h4>Technologies</h4>
                    <div className="featured-project-card__tags">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="featured-project-card__tag featured-project-card__tag--tech"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.skills && project.skills.length > 0 && (
                    <div className="featured-project-card__section">
                      <h4>Skills</h4>
                      <div className="featured-project-card__tags">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="featured-project-card__tag featured-project-card__tag--skill"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.links && (
                    <div className="featured-project-card__section">
                      <h4>Links</h4>
                      <div className="featured-project-card__links">
                        {project.links.documentation && (
                          <a
                            href={project.links.documentation}
                            className="featured-project-card__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Documentation"
                          >
                            <ExternalLink className="featured-project-card__icon" />
                            <span>Documentation</span>
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            className="featured-project-card__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View GitHub Repository"
                          >
                            <FontAwesomeIcon
                              icon={faGithub}
                              className="featured-project-card__icon"
                            />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            className="featured-project-card__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Live Demo"
                          >
                            <ExternalLink className="featured-project-card__icon" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
