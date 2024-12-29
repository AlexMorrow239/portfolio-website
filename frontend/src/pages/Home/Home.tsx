import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Database,
  Server,
  Cloud,
  Lock,
  GitBranch,
  Terminal,
  Clock,
  Activity,
} from "lucide-react";

import SystemMetrics from "@components/SystemMetrics/SystemMetrics";

const Home: React.FC = () => {
  const skills = [
    {
      icon: <Database size={24} />,
      title: "Database Architecture",
      description:
        "Designing and optimizing complex database systems with PostgreSQL, MongoDB, and Redis",
    },
    {
      icon: <Server size={24} />,
      title: "System Design",
      description:
        "Building scalable, distributed systems with microservices architecture",
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud Infrastructure",
      description:
        "Deploying and managing applications on AWS, with expertise in containerization and orchestration",
    },
    {
      icon: <Lock size={24} />,
      title: "Security & Authentication",
      description:
        "Implementing robust security measures and OAuth2/JWT authentication systems",
    },
    {
      icon: <GitBranch size={24} />,
      title: "API Development",
      description:
        "Creating RESTful and GraphQL APIs with comprehensive documentation",
    },
    {
      icon: <Terminal size={24} />,
      title: "DevOps & CI/CD",
      description:
        "Automating deployment pipelines and maintaining infrastructure as code",
    },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Backend Engineering Excellence</h1>
          <p className="hero__subtitle">
            Architecting robust, scalable systems and APIs that power modern
            applications
          </p>
          <div className="hero__cta">
            <Link to="/projects" className="button button--primary">
              View My Systems
            </Link>
            <Link to="/contact" className="button button--secondary">
              Discuss Architecture
            </Link>
          </div>
        </div>
      </section>

      <section className="skills">
        <div className="container">
          <h2 className="skills__title">Core Competencies</h2>
          <div className="skills__grid">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="skill-card__icon">{skill.icon}</div>
                <h3 className="skill-card__title">{skill.title}</h3>
                <p className="skill-card__description">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SystemMetrics
        title="System Performance"
        variant="detailed"
        metrics={[
          {
            icon: <Clock size={24} />,
            value: "<100ms",
            label: "Response Time",
            description: "Average API response time across all endpoints",
          },
          {
            icon: <Activity size={24} />,
            value: "99.99%",
            label: "Uptime",
            description: "System availability over the last 12 months",
          },
          {
            icon: <Server size={24} />,
            value: "10k+",
            label: "RPS",
            description: "Requests handled per second at peak load",
          },
          {
            icon: <Database size={24} />,
            value: "50TB+",
            label: "Data",
            description: "Total data processed monthly through our pipelines",
          },
        ]}
      />
    </>
  );
};

export default Home;
