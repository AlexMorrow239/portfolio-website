import { motion } from 'framer-motion';
import { GraduationCap, Building2, Laptop, Brain, Calculator, CheckCircle } from 'lucide-react';
import './Education.scss';

const Education = () => {
  return (
    <motion.section
      className="education"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="education__title"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GraduationCap className="icon" />
        <h2>Education</h2>
      </motion.div>

      <div className="education__timeline">
        <motion.div
          className="education__school"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>
            <Building2 className="university-icon" />
            University of Miami
          </h3>

          <motion.div
            className="education__degree"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <Laptop className="education__degree-icon" />
            <div className="education__degree-content">
              <h4>
                B.S. in Computer Science and Data Science/AI
                <span className="gpa">3.882 GPA</span>
              </h4>
            </div>
          </motion.div>

          <motion.div
            className="education__degree"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <Brain className="education__degree-icon" />
            <div className="education__degree-content">
              <h4>M.S. in Computer Science</h4>
              <div className="education__degree-detail">4+1 Program</div>
            </div>
          </motion.div>

          <motion.div
            className="education__minor"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Calculator className="icon" />
            Minor in Mathematics
          </motion.div>

          <motion.div
            className="education__status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <CheckCircle className="icon" />
            On track for dual graduation in 2027
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;
