import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import './About.scss';
import TechArsenal from '@/components/TechArsenal/TechArsenal';
import Education from '@/components/Education/Education';
import Professional from '@/components/Professional/Professional';
import Interests from '@/components/Interests/Interests';

const About: React.FC = () => {
  return (
    <div className="about">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about__section about__intro"
      >
        <Terminal className="about__section-icon" />
        <h1>Full-Stack Developer with Backend Passion</h1>
        <p>
          While I enjoy crafting complete solutions across the stack, my true passion lies in
          backend engineering and systems design. I thrive on building robust architectures,
          optimizing performance, and solving complex computational challenges that power modern
          applications.
        </p>
      </motion.section>

      <Education />
      <TechArsenal />
      <Professional />
      <Interests />
    </div>
  );
};

export default About;
