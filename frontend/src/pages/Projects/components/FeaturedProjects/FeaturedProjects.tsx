import React from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { ProjectLinks } from '@/components/ProjectElements/ProjectLinks/ProjectLinks';
import { ProjectTags } from '@/components/ProjectElements/ProjectTags/ProjectTags';
import { type Project } from '@/types/project';
import { defaultTransition, staggerTransition } from '@/utils/animations/transitions';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations/variants';

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
              to={`/projects/${project._id}`}
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
                    <ProjectTags tags={project.technologies} variant="featured" />
                  </motion.div>

                  {project.skills && project.skills.length > 0 && (
                    <motion.div className="featured-project-card__section" variants={fadeIn}>
                      <h4>Skills</h4>
                      <ProjectTags tags={project.skills} variant="featured" type="skill" />
                    </motion.div>
                  )}

                  {project.links && (
                    <motion.div className="featured-project-card__section" variants={fadeIn}>
                      <h4>Links</h4>
                      <ProjectLinks links={project.links} variant="featured" />
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
