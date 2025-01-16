import React from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { ProjectLinks } from '@/components/ProjectElements/ProjectLinks/ProjectLinks';
import { ProjectTags } from '@/components/ProjectElements/ProjectTags/ProjectTags';
import { type Project } from '@/types/project';
import { defaultTransition } from '@/utils/animations/transitions';
import { fadeIn, fadeInUp } from '@/utils/animations/variants';

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

      <motion.div className="project-list__grid">
        {projects.map((project) => (
          <motion.article
            key={project._id}
            className="project-list-card"
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            transition={defaultTransition}
          >
            <div className="project-list-card__content">
              <motion.header className="project-list-card__header" variants={fadeIn}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </Link>
              </motion.header>

              <motion.footer
                className="project-list-card__footer"
                variants={fadeIn}
                onClick={(e) => e.stopPropagation()}
              >
                <ProjectTags tags={project.technologies} variant="minimal" limit={3} />
                {project.links && <ProjectLinks links={project.links} variant="minimal" />}
              </motion.footer>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ProjectList;
