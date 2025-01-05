import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { type Project } from '@/types/project';
import { fadeIn, fadeInUp, staggerContainer } from '@/animations/variants';
import { defaultTransition, staggerTransition } from '@/animations/transitions';
import './FeaturedProjects.scss';

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  if (projects.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="featured-projects"
      variants={fadeInUp}
      transition={defaultTransition}
    >
      <motion.h2 variants={fadeIn} transition={defaultTransition}>
        Featured Projects
      </motion.h2>

      <motion.div
        className="featured-projects__grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={staggerTransition(0.2)}
      >
        {projects.map((project) => (
          <motion.article
            key={project._id}
            className="featured-project-card"
            variants={fadeInUp}
            transition={defaultTransition}
            whileHover={{ y: -8 }}
          >
            <Link
              href={`/projects/${project._id}`}
              className="featured-project-card__content-wrapper"
            >
              {project.imageUrl && (
                <motion.div className="featured-project-card__image" variants={fadeIn}>
                  <img src={project.imageUrl} alt={project.title} />
                  <div className="featured-project-card__image-overlay" />
                </motion.div>
              )}

              <motion.div
                className="featured-project-card__content"
                variants={staggerContainer}
                transition={staggerTransition(0.1)}
              >
                <motion.header variants={fadeIn}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </motion.header>

                <motion.div
                  className="featured-project-card__info"
                  variants={staggerContainer}
                  transition={staggerTransition(0.1)}
                >
                  <motion.div className="featured-project-card__section" variants={fadeIn}>
                    <h4>Technologies</h4>
                    <motion.div
                      className="featured-project-card__tags"
                      variants={staggerContainer}
                      transition={staggerTransition(0.05)}
                    >
                      {project.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          className="featured-project-card__tag featured-project-card__tag--tech"
                          variants={fadeIn}
                          whileHover={{ scale: 1.05 }}
                          transition={defaultTransition}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  {project.skills && project.skills.length > 0 && (
                    <motion.div className="featured-project-card__section" variants={fadeIn}>
                      <h4>Skills</h4>
                      <motion.div
                        className="featured-project-card__tags"
                        variants={staggerContainer}
                        transition={staggerTransition(0.05)}
                      >
                        {project.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            className="featured-project-card__tag featured-project-card__tag--skill"
                            variants={fadeIn}
                            whileHover={{ scale: 1.05 }}
                            transition={defaultTransition}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {project.links && (
                    <motion.div className="featured-project-card__section" variants={fadeIn}>
                      <h4>Links</h4>
                      <motion.div
                        className="featured-project-card__links"
                        variants={staggerContainer}
                        transition={staggerTransition(0.05)}
                      >
                        {project.links.documentation && (
                          <motion.a
                            href={project.links.documentation}
                            className="featured-project-card__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Documentation"
                            variants={fadeIn}
                            whileHover={{ x: 5 }}
                            transition={defaultTransition}
                          >
                            <ExternalLink className="featured-project-card__icon" />
                            <span>Documentation</span>
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            className="featured-project-card__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View GitHub Repository"
                            variants={fadeIn}
                            whileHover={{ x: 5 }}
                            transition={defaultTransition}
                          >
                            <FontAwesomeIcon
                              icon={faGithub}
                              className="featured-project-card__icon"
                            />
                            <span>GitHub</span>
                          </motion.a>
                        )}
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            className="featured-project-card__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Live Demo"
                            variants={fadeIn}
                            whileHover={{ x: 5 }}
                            transition={defaultTransition}
                          >
                            <ExternalLink className="featured-project-card__icon" />
                            <span>Live Demo</span>
                          </motion.a>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturedProjects;
