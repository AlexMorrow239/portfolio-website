import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { skills, metrics } from './Constants';
import './Home.scss';
import SectionDivider from '@/components/common/SectionDivider/SectionDivider';

const Home: React.FC = () => {
  // Background circle positions for the hero section
  const circles = [
    { x: '10%', y: '20%', size: 80, delay: 0 },
    { x: '85%', y: '15%', size: 120, delay: 0.2 },
    { x: '70%', y: '60%', size: 100, delay: 0.4 },
    { x: '20%', y: '75%', size: 140, delay: 0.6 },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="home">
      <section className="hero">
        {/* Animated background circles */}
        {circles.map((circle, index) => (
          <motion.div
            key={index}
            className="hero__circle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{
              duration: 1.5,
              delay: circle.delay,
              ease: 'easeOut',
            }}
            style={{
              left: circle.x,
              top: circle.y,
              width: circle.size,
              height: circle.size,
            }}
          />
        ))}

        {/* Animated stripes background */}
        <div className="hero__stripes" />

        <div className="hero__content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div className="hero__badge" variants={itemVariants}>
              <Terminal size={16} /> Software Engineer
            </motion.div>

            <motion.h1 className="hero__title" variants={itemVariants}>
              Building the Future
              <span className="hero__title-highlight">One Line of Code</span>
              at a Time
            </motion.h1>

            <motion.p className="hero__subtitle" variants={itemVariants}>
              Welcome to my portfolio! My name is Alex, and I am passionate about crafting robust,
              scalable systems and exploring the endless possibilities of backend technology. Every
              project is an opportunity to innovate and excel.
            </motion.p>

            <motion.div className="hero__cta" variants={itemVariants}>
              <Link to="/projects" className="btn btn--primary">
                Explore My Work
              </Link>
              <Link to="/about" className="btn btn--secondary">
                Get to Know Me
              </Link>
            </motion.div>

            <motion.div
              className="hero__scroll-indicator"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="hero__scroll-text">Scroll to explore</div>
              <div className="hero__scroll-line" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      <SectionDivider variant="minimal" spacing="md" />
      {/* Skills Section */}
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

      <SectionDivider variant="code" spacing="md" />

      {/* Metrics Section */}
      <section className="metrics">
        <div className="container">
          <div className="metrics__grid">
            {metrics.map((metric, index) => (
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
                  <span className="metric-card__description">{metric.description}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
