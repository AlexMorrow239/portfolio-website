import { motion } from 'framer-motion';
import { Brain, Building2, Calculator, CheckCircle, GraduationCap, Laptop } from 'lucide-react';

import { defaultTransition, staggerTransition } from '@/animations/transitions';
import { fadeIn, fadeInUp, slideInLeft, staggerContainer } from '@/animations/variants';

import './Education.scss';

const Education: React.FC = () => (
  <motion.section
    className="about__section education"
    variants={fadeInUp}
    transition={defaultTransition}
  >
    {/* Section Header */}
    <motion.div className="about__section-header" variants={fadeIn} transition={defaultTransition}>
      <GraduationCap className="icon" />
      <h2>Education</h2>
    </motion.div>

    {/* Timeline Content */}
    <motion.div
      className="education__timeline"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={staggerTransition(0.2)}
    >
      <motion.div className="education__school" variants={fadeIn} transition={defaultTransition}>
        {/* University Title */}
        <motion.div
          className="about__inline-icon education__school-title"
          variants={fadeIn}
          transition={defaultTransition}
        >
          <Building2 className="icon" />
          <h3>University of Miami</h3>
        </motion.div>

        {/* Degrees */}
        <motion.div
          className="education__degree"
          variants={slideInLeft}
          transition={defaultTransition}
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
          variants={slideInLeft}
          transition={defaultTransition}
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
          variants={fadeIn}
          transition={defaultTransition}
          whileHover={{ scale: 1.05 }}
        >
          <Calculator className="icon" />
          <span>Minor in Mathematics</span>
        </motion.div>

        {/* Status */}
        <motion.div
          className="about__inline-icon education__status"
          variants={fadeIn}
          transition={defaultTransition}
        >
          <CheckCircle className="icon" />
          <span>On track for dual graduation in 2027</span>
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default Education;
