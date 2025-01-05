import React from 'react';
import { motion } from 'framer-motion';
import { type Project } from '@/types/project';
import Link from 'next/link';
import { fadeIn, fadeInUp, staggerContainer } from '@/animations/variants';
import { defaultTransition, staggerTransition } from '@/animations/transitions';
import './ProjectsList.scss';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  if (projects.length === 0) {
    return null;
  }

  return (
    <motion.section className="project-list" variants={fadeInUp} transition={defaultTransition}>
      <motion.h2 variants={fadeIn} transition={defaultTransition}>
        Other Projects
      </motion.h2>

      <motion.div
        className="project-list__grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={staggerTransition(0.1)}
      >
        {projects.map((project) => (
          <motion.article
            key={project._id}
            className="project-list-card"
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            transition={defaultTransition}
          >
            <Link href={`/projects/${project._id}`} className="project-list-card__content">
              <motion.header className="project-list-card__header" variants={fadeIn}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </motion.header>

              <motion.footer className="project-list-card__footer" variants={fadeIn}>
                <motion.div
                  className="project-list-card__tags"
                  variants={staggerContainer}
                  transition={staggerTransition(0.05)}
                >
                  {project.technologies.slice(0, 3).map((tech) => (
                    <motion.span
                      key={tech}
                      className="project-list-card__tag"
                      variants={fadeIn}
                      whileHover={{ scale: 1.05 }}
                      transition={defaultTransition}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 3 && (
                    <motion.span
                      className="project-list-card__tag project-list-card__tag--more"
                      variants={fadeIn}
                      whileHover={{ scale: 1.05 }}
                      transition={defaultTransition}
                    >
                      +{project.technologies.length - 3}
                    </motion.span>
                  )}
                </motion.div>
              </motion.footer>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ProjectList;
