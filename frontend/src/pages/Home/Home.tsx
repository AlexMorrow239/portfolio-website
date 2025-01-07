import { motion } from 'framer-motion';
import {
  Boxes,
  Code,
  Cpu,
  Database,
  GitBranch,
  Lock,
  Server,
  Terminal,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionDivider from '@/components/common/SectionDivider/SectionDivider';
import { type Circle, type Metric, type Skill } from '@/types/home';

import './Home.scss';
import { heroVariants, skillsVariants } from './animations';

// Background circle positions for the hero section\
const circles: Circle[] = [
  { x: '10%', y: '20%', size: 80, delay: 0 },
  { x: '85%', y: '15%', size: 120, delay: 0.2 },
  { x: '70%', y: '60%', size: 100, delay: 0.4 },
  { x: '20%', y: '75%', size: 140, delay: 0.6 },
];

const Home: React.FC = () => {
  const skills: Skill[] = [
    {
      icon: <Server size={24} />,
      title: 'Backend Engineering',
      description:
        'Architecting robust server systems and APIs that prioritize performance, scalability, and clean code architecture',
    },
    {
      icon: <Database size={24} />,
      title: 'Database Systems',
      description:
        'I have designined efficient database schemas, and implemented them using MongoDB',
    },
    {
      icon: <Workflow size={24} />,
      title: 'System Architecture',
      description:
        'I have built many projects from scratch, starting with system design. Check out my projects to see them in action!',
    },
    {
      icon: <Lock size={24} />,
      title: 'Security & Authentication',
      description:
        'One of my projects required profiles. This sent me down a spiral of learning about JWT tokens and bearer auth and secure encryption strategies',
    },
    {
      icon: <Terminal size={24} />,
      title: 'Tech Explorer',
      description:
        'I love to explore new open source tools & plugins. There are so many amazing tools that help optimize projects and my workflow!',
    },
    {
      icon: <Code size={24} />,
      title: 'Life-Long Learner',
      description:
        'At my core, I love the study of computer science as a whole. I love learning end-to-end about operating systems, algorithms, and system architecture',
    },
  ];

  const metrics: Metric[] = [
    {
      icon: <Cpu size={24} />,
      label: 'Systems Built',
      value: '5+',
      description: 'Explore these projects on my projects page!',
    },
    {
      icon: <GitBranch size={24} />,
      label: 'Technologies',
      value: '15+',
      description: 'I have a broad range of skills, from Machine Learning to AWS Services',
    },
    {
      icon: <Boxes size={24} />,
      label: 'Code Quality',
      value: 'A+',
      description: 'I will never share code I am not proud to claim as my own',
    },
  ];
  return (
    <div className="home">
      <section className="hero">
        {circles.map((circle, index) => (
          <motion.div
            key={index}
            className="hero__circle"
            variants={heroVariants.circle}
            custom={circle.delay}
            initial="hidden"
            animate="visible"
            style={{
              left: circle.x,
              top: circle.y,
              width: circle.size,
              height: circle.size,
            }}
          />
        ))}

        <div className="hero__stripes" />

        <div className="hero__content">
          <motion.div
            variants={heroVariants.container}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div className="hero__badge" variants={heroVariants.item}>
              <Terminal size={16} /> Software Engineer
            </motion.div>

            <motion.h1 className="hero__title" variants={heroVariants.item}>
              Building the Future
              <br />
              <motion.span className="hero__title-highlight" variants={heroVariants.item}>
                One Line of Code
              </motion.span>
              <br />
              at a Time
            </motion.h1>

            <motion.p className="hero__subtitle" variants={heroVariants.item}>
              Welcome to my portfolio! My name is Alex, and I'm a sofware engineer with experience
              across the entire stack. However, I have a particular passion for backend/systems
              engineering & design.
            </motion.p>

            <motion.div className="hero__cta" variants={heroVariants.item}>
              <Link to="/projects" className="btn btn--primary">
                Explore My Work
              </Link>
              <Link to="/about" className="btn btn--secondary">
                Get to Know Me
              </Link>
            </motion.div>

            <motion.div
              className="hero__scroll-indicator"
              variants={heroVariants.scrollIndicator}
              animate="animate"
            >
              <div className="hero__scroll-text">Scroll to explore</div>
              <div className="hero__scroll-line" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="minimal" spacing="md" />

      <section className="skills">
        <div className="container">
          <motion.div
            variants={skillsVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 className="skills__title" variants={skillsVariants.card}>
              Engineering Excellence
            </motion.h2>

            <motion.p className="skills__subtitle" variants={skillsVariants.card}>
              Turning complex challenges into elegant, efficient solutions
            </motion.p>

            <div className="skills__grid">
              {skills.map((skill, index) => (
                <motion.div key={index} className="skill-card" variants={skillsVariants.card}>
                  <div className="skill-card__icon">{skill.icon}</div>
                  <h3 className="skill-card__title">{skill.title}</h3>
                  <p className="skill-card__description">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="code" spacing="md" />

      <section className="metrics">
        <div className="container">
          <motion.div
            className="metrics__grid"
            variants={skillsVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {metrics.map((metric, index) => (
              <motion.div key={index} className="metric-card" variants={skillsVariants.card}>
                <div className="metric-card__icon">{metric.icon}</div>
                <div className="metric-card__content">
                  <h3 className="metric-card__value">{metric.value}</h3>
                  <p className="metric-card__label">{metric.label}</p>
                  <span className="metric-card__description">{metric.description}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
