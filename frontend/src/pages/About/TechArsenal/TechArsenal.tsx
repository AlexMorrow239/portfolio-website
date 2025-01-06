import { motion } from 'framer-motion';
import { Cloud, Code2, Database, Server } from 'lucide-react';

import { defaultTransition, staggerTransition } from '@/animations/transitions';
import { fadeIn, fadeInUp, staggerContainer } from '@/animations/variants';

import './TechArsenal.scss';

const TechArsenal: React.FC = () => (
  <motion.section
    className="about__section tech-arsenal"
    variants={fadeInUp}
    transition={defaultTransition}
  >
    <motion.div className="about__section-header" variants={fadeIn} transition={defaultTransition}>
      <Code2 className="icon" />
      <h2>Tech Arsenal</h2>
    </motion.div>

    <motion.div
      className="tech-arsenal__grid"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={staggerTransition(0.1)}
    >
      {/* Frontend */}
      <motion.div
        className="tech-arsenal__category"
        variants={fadeIn}
        transition={defaultTransition}
      >
        <motion.div className="about__inline-icon" variants={fadeIn}>
          <Code2 className="icon" />
          <h3>Frontend</h3>
        </motion.div>
        <ul className="tech-arsenal__list">
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            React & Next.js
          </motion.li>
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            TypeScript
          </motion.li>
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            SCSS/Tailwind
          </motion.li>
        </ul>
      </motion.div>

      {/* Backend */}
      <motion.div
        className="tech-arsenal__category"
        variants={fadeIn}
        transition={defaultTransition}
      >
        <motion.div className="about__inline-icon" variants={fadeIn}>
          <Server className="icon" />
          <h3>Backend</h3>
        </motion.div>
        <ul className="tech-arsenal__list">
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            Nest.js (Express + Node.js Wrapper)
          </motion.li>
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            Python & FastAPI
          </motion.li>
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            Postman & Swagger (Backend Testing Tools)
          </motion.li>
        </ul>
      </motion.div>

      {/* Database */}
      <motion.div
        className="tech-arsenal__category"
        variants={fadeIn}
        transition={defaultTransition}
      >
        <motion.div className="about__inline-icon" variants={fadeIn}>
          <Database className="icon" />
          <h3>Database</h3>
        </motion.div>
        <ul className="tech-arsenal__list">
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            PostgreSQL
          </motion.li>
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            MongoDB
          </motion.li>
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            Redis
          </motion.li>
        </ul>
      </motion.div>

      {/* Cloud & DevOps */}
      <motion.div
        className="tech-arsenal__category"
        variants={fadeIn}
        transition={defaultTransition}
      >
        <motion.div className="about__inline-icon" variants={fadeIn}>
          <Cloud className="icon" />
          <h3>Cloud & DevOps</h3>
        </motion.div>
        <ul className="tech-arsenal__list">
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            AWS & GCP
          </motion.li>
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            Docker & K8s
          </motion.li>
          <motion.li whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
            CI/CD
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default TechArsenal;
