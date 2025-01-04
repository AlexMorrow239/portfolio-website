import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import Link from 'next/link';
import './ProjectsList.scss';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  if (projects.length === 0) return null;

  return (
    <section className="project-list">
      <h2>Other Projects</h2>
      <div className="project-list__grid">
        {projects.map((project) => (
          <motion.article
            key={project._id}
            className="project-list-card"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={`/projects/${project._id}`} className="project-list-card__content">
              <header className="project-list-card__header">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </header>

              <footer className="project-list-card__footer">
                <div className="project-list-card__tags">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="project-list-card__tag">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="project-list-card__tag project-list-card__tag--more">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </footer>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
