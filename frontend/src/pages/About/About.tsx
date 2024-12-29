import React from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Server, Database } from "lucide-react";

const About: React.FC = () => {
  const experiences = [
    {
      year: "2021 - Present",
      role: "Senior Backend Engineer",
      company: "Tech Solutions Inc.",
      description:
        "Leading backend architecture and system design for distributed systems",
    },
    {
      year: "2019 - 2021",
      role: "Backend Developer",
      company: "Data Systems Corp",
      description: "Developed high-performance APIs and microservices",
    },
  ];

  const techStack = {
    languages: ["Go", "Python", "TypeScript", "Rust"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "Cassandra"],
    tools: ["Docker", "Kubernetes", "AWS", "Terraform"],
    testing: [
      "Unit Testing",
      "Integration Testing",
      "Load Testing",
      "Chaos Engineering",
    ],
  };

  return (
    <div className="about">
      <motion.section
        className="about__intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Terminal className="about__icon" size={48} />
        <h1 className="about__title">Backend Engineering Focus</h1>
        <p className="about__description">
          Specialized in building robust, scalable backend systems with a focus
          on performance, reliability, and maintainability. Passionate about
          distributed systems and database optimization.
        </p>
      </motion.section>

      <section className="about__tech-stack">
        <h2 className="about__section-title">Technical Arsenal</h2>
        <div className="tech-grid">
          {Object.entries(techStack).map(([category, items], index) => (
            <motion.div
              key={category}
              className="tech-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="tech-card__title">{category}</h3>
              <div className="tech-card__items">
                {items.map((item) => (
                  <span key={item} className="tech-tag">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about__experience">
        <h2 className="about__section-title">Professional Journey</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline__item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="timeline__year">{exp.year}</div>
              <div className="timeline__content">
                <h3>{exp.role}</h3>
                <h4>{exp.company}</h4>
                <p>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
