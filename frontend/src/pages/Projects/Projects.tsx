import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Project } from "../../types/project";
import { ProjectsService } from "../../services/projects.service";
import Loader from "@/components/common/Loader/Loader";
import "./Projects.scss";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectsService.getAllProjects();
        setProjects(data);
        setIsSuccess(true);
      } catch (err) {
        setError("Failed to load projects");
        setIsSuccess(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Loader
        messages={[
          "Fetching projects...",
          "Loading details...",
          "Preparing display...",
        ]}
        completionMessage="Projects loaded successfully!"
        duration={3500}
        onComplete={() => setLoading(false)}
        isSuccess={isSuccess}
      />
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="projects">
      <div className="projects__header">
        <h1>Featured Projects</h1>
        <p>A collection of my recent work and technical explorations</p>
      </div>

      <div className="projects__grid">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {project.imageUrl && (
              <div className="project-card__image">
                <img src={project.imageUrl} alt={project.title} />
              </div>
            )}

            <div className="project-card__content">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>

              <div className="project-card__tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="project-card__tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-card__links">
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link project-card__link--secondary"
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
                    className="project-card__link project-card__link--primary"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
