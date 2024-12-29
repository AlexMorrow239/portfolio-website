import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  Server,
  Cloud,
  GitBranch,
  Scale,
  Shield,
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  demoUrl?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Distributed Cache System",
      description:
        "High-performance distributed caching system built with Redis and Go, supporting multiple eviction policies and cluster sharding.",
      icon: <Database size={24} />,
      tags: ["Go", "Redis", "Docker", "Kubernetes"],
      metrics: [
        { label: "Throughput", value: "100k ops/sec" },
        { label: "Latency", value: "<5ms" },
      ],
      githubUrl: "#",
    },
    {
      title: "API Gateway Service",
      description:
        "Scalable API gateway with rate limiting, authentication, and request transformation capabilities.",
      icon: <Server size={24} />,
      tags: ["Node.js", "Express", "MongoDB", "JWT"],
      metrics: [
        { label: "Uptime", value: "99.99%" },
        { label: "Daily Requests", value: "1M+" },
      ],
      githubUrl: "#",
      demoUrl: "#",
    },
    {
      title: "Load Balancer",
      description:
        "Custom load balancer implementing various algorithms (Round Robin, Least Connections, etc.) with health checking.",
      icon: <Scale size={24} />,
      tags: ["Python", "FastAPI", "Docker"],
      metrics: [
        { label: "Response Time", value: "<50ms" },
        { label: "Availability", value: "99.9%" },
      ],
      githubUrl: "#",
    },
  ];

  return (
    <div className="projects">
      <motion.h1
        className="projects__title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Backend Projects & Systems
      </motion.h1>

      <div className="projects__grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="project-card__icon">{project.icon}</div>
            <h2 className="project-card__title">{project.title}</h2>
            <p className="project-card__description">{project.description}</p>

            <div className="project-card__tags">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="project-card__tag">
                  {tag}
                </span>
              ))}
            </div>

            {project.metrics && (
              <div className="project-card__metrics">
                {project.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="project-card__metric">
                    <span className="project-card__metric-value">
                      {metric.value}
                    </span>
                    <span className="project-card__metric-label">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="project-card__links">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className="button button--secondary button--sm"
                >
                  View Source
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  className="button button--primary button--sm"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
