import { motion } from 'framer-motion';
import { Activity, Dumbbell, Mountain, TreePine } from 'lucide-react';

import { defaultTransition, staggerTransition } from '@/animations/transitions';
import { fadeIn, fadeInUp, staggerContainer } from '@/animations/variants';

import './Interests.scss';

const Interests: React.FC = () => (
  <motion.section
    className="about__section interests"
    variants={fadeInUp}
    transition={defaultTransition}
  >
    <div className="about__section-header">
      <TreePine className="icon" />
      <h2>Beyond the Code</h2>
    </div>

    <motion.div
      className="interests__grid"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={staggerTransition(0.1)}
    >
      {/* Fitness Journey */}
      <motion.div
        className="interests__card"
        variants={fadeIn}
        transition={defaultTransition}
        whileHover={{ y: -5 }}
      >
        <div className="about__inline-icon">
          <Dumbbell className="icon" />
          <h3>Fitness Journey</h3>
        </div>
        <p>
          I've been weightlifting about 4 years now and absolutely love it. Recently, I've gotten
          really into triathlons - there's something amazing about pushing your limits across
          different disciplines. My next big goal? Training for an Ironman. It's a huge challenge,
          but that's what makes it exciting!
        </p>
      </motion.div>

      {/* The Great Outdoors */}
      <motion.div
        className="interests__card"
        variants={fadeIn}
        transition={defaultTransition}
        whileHover={{ y: -5 }}
      >
        <div className="about__inline-icon">
          <Mountain className="icon" />
          <h3>The Great Outdoors</h3>
        </div>
        <p>
          Give me a tough mountain trail and a beautiful sunrise, and I'm in my happy place. I love
          traveling to mountainous regions and finding challenging hikes. There's nothing quite like
          reaching the summit as the sun comes up - it's the perfect reward for an early morning
          start!
        </p>
      </motion.div>

      {/* Tech Meets Fitness */}
      <motion.div
        className="interests__card"
        variants={fadeIn}
        transition={defaultTransition}
        whileHover={{ y: -5 }}
      >
        <div className="about__inline-icon">
          <Activity className="icon" />
          <h3>Tech Meets Fitness</h3>
        </div>
        <p>
          I'm a bit of a data nerd when it comes to fitness tracking. I use everything from an
          Apollo Neuro to an Oura Ring and Apple Watch to track my biometrics. I'm collecting all
          this data with the hope of doing some cool AI projects with it someday. Who knows what
          patterns I might find?
        </p>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default Interests;
