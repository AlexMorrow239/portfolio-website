import { motion } from 'framer-motion';
import { Briefcase, Building2, Calendar, ExternalLink } from 'lucide-react';
import './Professional.scss';

const Professional = () => {
  return (
    <motion.section
      className="about__section professional"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="about__section-header">
        <Briefcase className="icon" />
        <h2>Professional Journey</h2>
      </div>

      <div className="professional__timeline">
        {/* Amazon */}
        <motion.div
          className="professional__role"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="professional__role-header">
            <div className="about__inline-icon">
              <Building2 className="icon" />
              <h3>Amazon</h3>
            </div>
            <a
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="professional__company-link"
            >
              <ExternalLink className="icon" />
            </a>
          </div>

          <div className="professional__position">
            <motion.div
              className="professional__position-card"
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4>Software Development Engineer Intern</h4>
              <div className="about__inline-icon professional__date">
                <Calendar className="icon" />
                <span>Summer 2024</span>
              </div>
              <p>
                Incoming SDE Intern on the AWS Lambda team, where I'll be working on serverless
                computing solutions and distributed systems.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* University of Miami */}
        <motion.div
          className="professional__role"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="professional__role-header">
            <div className="about__inline-icon">
              <Building2 className="icon" />
              <h3>University of Miami</h3>
            </div>
            <a
              href="https://miami.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="professional__company-link"
            >
              <ExternalLink className="icon" />
            </a>
          </div>

          <div className="professional__position">
            <motion.div
              className="professional__position-card"
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4>Undergraduate Research Assistant</h4>
              <div className="about__inline-icon professional__date">
                <Calendar className="icon" />
                <span>2023 - Present</span>
              </div>
              <p>
                Working on cutting-edge research in distributed systems and cloud computing,
                focusing on optimizing resource allocation in serverless environments.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Professional;
