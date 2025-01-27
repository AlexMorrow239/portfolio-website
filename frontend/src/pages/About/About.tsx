import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

import SectionDivider from '@/components/common/SectionDivider/SectionDivider';
import Education from '@/pages/About/components/Education/Education';
import Professional from '@/pages/About/components/Professional/Professional';
import TechArsenal from '@/pages/About/components/TechArsenal/TechArsenal';
import { defaultTransition, staggerTransition } from '@/utils/animations/transitions';
import { fadeInUp, staggerContainer } from '@/utils/animations/variants';

import './About.scss';
import Interests from './components/Interests/Interests';

const About: React.FC = () => (
  <motion.div
    className="about"
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    transition={staggerTransition()}
  >
    <motion.section
      variants={fadeInUp}
      transition={defaultTransition}
      className="about__section about__intro"
    >
      <Terminal className="about__section-icon" />
      <h1>Full-Stack Developer with Backend Passion</h1>
      <p>
        Learn more about my professional and personal journey. I've known this is what I wanted to
        do since I was 16. Everything I've done since then has only strengthened my passion fo
        programming. My dream is to show everyone how amazing code and computers can be.
      </p>
    </motion.section>

    <SectionDivider variant="binary" spacing="sm" />
    <Education />
    <SectionDivider variant="terminal" spacing="sm" />
    <TechArsenal />
    <SectionDivider variant="code" spacing="sm" />
    <Professional />
    <SectionDivider variant="database" spacing="sm" />
    <Interests />
  </motion.div>
);

export default About;
