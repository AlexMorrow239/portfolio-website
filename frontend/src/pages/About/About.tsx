import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import './About.scss';
import TechArsenal from '@/pages/About/TechArsenal/TechArsenal';
import Education from '@/pages/About/Education/Education';
import Professional from '@/pages/About/Professional/Professional';
import Interests from '@/pages/About/Interests/Interests';
import SectionDivider from '@/components/common/SectionDivider/SectionDivider';
// Add these imports
import { fadeInUp, staggerContainer } from '@/animations/variants';
import { defaultTransition, staggerTransition } from '@/animations/transitions';

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
        While I enjoy crafting complete solutions across the stack, my true passion lies in backend
        engineering and systems design. I thrive on building robust architectures, optimizing
        performance, and solving complex computational challenges that power modern applications.
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
