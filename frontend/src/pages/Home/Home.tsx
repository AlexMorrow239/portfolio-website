import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Database,
  Server,
  Lock,
  GitBranch,
  Terminal,
  Workflow,
  Boxes,
  Code,
  Cpu,
} from "lucide-react";
import "./Home.scss";

const Home: React.FC = () => {
  const skills = [
    {
      icon: <Server size={24} />,
      title: "Backend Engineering",
      description:
        "Architecting robust server systems and APIs that prioritize performance, scalability, and clean code architecture",
    },
    {
      icon: <Database size={24} />,
      title: "Database Systems",
      description:
        "Designing efficient database schemas and implementing optimized query patterns using MongoDB, PostgreSQL, and modern ORMs",
    },
    {
      icon: <Workflow size={24} />,
      title: "System Architecture",
      description:
        "Building scalable distributed systems with a focus on microservices, API design, and efficient data processing pipelines",
    },
    {
      icon: <Lock size={24} />,
      title: "Security & Authentication",
      description:
        "Implementing robust security measures and OAuth2/JWT authentication systems",
    },
    {
      icon: <Terminal size={24} />,
      title: "Tech Explorer",
      description:
        "Constantly discovering and implementing cutting-edge tools and frameworks to enhance development efficiency",
    },
    {
      icon: <Code size={24} />,
      title: "Algorithm Enthusiast",
      description:
        "Deep passion for computational problem-solving, from optimizing complex algorithms to implementing efficient data structures",
    },
  ];

  const featuredMetrics = [
    {
      icon: <Cpu className="text-blue-600" size={24} />,
      label: "Systems Built",
      value: "10+",
      description: "Including distributed backends and data pipelines",
    },
    {
      icon: <GitBranch className="text-blue-600" size={24} />,
      label: "Technologies",
      value: "15+",
      description: "From Node.js to advanced cloud services",
    },
    {
      icon: <Boxes className="text-blue-600" size={24} />,
      label: "Code Quality",
      value: "A+",
      description: "Emphasis on clean, maintainable architecture",
    },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="hero__title">Aspiring Software Engineer</h1>
            <p className="hero__subtitle">
              Passionate about building robust, scalable systems and exploring
              the endless possibilities of backend technology. Every line of
              code is an opportunity to create something extraordinary.
            </p>
            <div className="hero__cta">
              <Link to="/projects" className="button button--primary">
                See My Work
              </Link>
              <Link to="/about" className="button button--secondary">
                Get to Know Me
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Dynamic Terminal Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
        />
      </section>

      <section className="skills">
        <div className="container">
          <h2 className="skills__title">Engineering Excellence</h2>
          <p className="skills__subtitle">
            Turning complex backend challenges into elegant, efficient solutions
          </p>

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

      <section className="metrics">
        <div className="container">
          <div className="metrics__grid">
            {featuredMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="metric-card__icon">{metric.icon}</div>
                <div className="metric-card__content">
                  <h3 className="metric-card__value">{metric.value}</h3>
                  <p className="metric-card__label">{metric.label}</p>
                  <span className="metric-card__description">
                    {metric.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
