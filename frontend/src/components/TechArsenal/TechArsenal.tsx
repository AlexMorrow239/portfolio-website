import { motion } from 'framer-motion';
import { Code2, Server, Database, Cloud } from 'lucide-react';
import './TechArsenal.scss';

const TechArsenal = () => {
  return (
    <motion.section
      className="about__section tech-arsenal"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="about__section-header">
        <Code2 className="icon" />
        <h2>Tech Arsenal</h2>
      </div>

      <div className="tech-arsenal__grid">
        {/* Frontend */}
        <motion.div
          className="tech-arsenal__category"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="about__inline-icon">
            <Code2 className="icon" />
            <h3>Frontend</h3>
          </div>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="about__inline-icon">
            <Server className="icon" />
            <h3>Backend</h3>
          </div>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="about__inline-icon">
            <Database className="icon" />
            <h3>Database</h3>
          </div>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="about__inline-icon">
            <Cloud className="icon" />
            <h3>Cloud & DevOps</h3>
          </div>
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
      </div>
    </motion.section>
  );
};

export default TechArsenal;
