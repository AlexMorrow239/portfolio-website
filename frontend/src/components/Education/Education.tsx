import { motion } from 'framer-motion';
import { GraduationCap, Building2, Laptop, Brain, Calculator, CheckCircle } from 'lucide-react';
import './Education.scss';

const Education = () => {
  return (
    <motion.section
      className="about__section education"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="about__section-header">
        <GraduationCap className="icon" />
        <h2>Education</h2>
      </div>

      {/* Timeline Content */}
      <div className="education__timeline">
        <motion.div
          className="education__school"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* University Title */}
          <div className="about__inline-icon education__school-title">
            <Building2 className="icon" />
            <h3>University of Miami</h3>
          </div>

          {/* Degrees */}
          <motion.div
            className="education__degree"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ x: 10 }}
          >
            <Laptop className="icon" />
            <div className="education__degree-content">
              <h4>
                B.S. in Computer Science and Data Science/AI
                <span className="education__gpa">3.882 GPA</span>
              </h4>
            </div>
          </motion.div>

          <motion.div
            className="education__degree"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ x: 10 }}
          >
            <Brain className="icon" />
            <div className="education__degree-content">
              <h4>M.S. in Computer Science</h4>
              <div className="education__degree-detail">4+1 Program</div>
            </div>
          </motion.div>

          {/* Minor */}
          <motion.div
            className="about__inline-icon education__minor"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Calculator className="icon" />
            <span>Minor in Mathematics</span>
          </motion.div>

          {/* Status */}
          <motion.div
            className="about__inline-icon education__status"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <CheckCircle className="icon" />
            <span>On track for dual graduation in 2027</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;
