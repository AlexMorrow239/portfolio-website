import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { skills, metrics, circles } from './constants';
import { heroVariants, skillsVariants } from './animations';
import './Home.scss';
import SectionDivider from '@/components/common/SectionDivider/SectionDivider';

const Home: React.FC = () => {
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
              Welcome to my portfolio! My name is Alex, and I am passionate about crafting robust,
              scalable systems and exploring the endless possibilities of backend technology. Every
              project is an opportunity to innovate and excel.
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
              Turning complex backend challenges into elegant, efficient solutions
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
