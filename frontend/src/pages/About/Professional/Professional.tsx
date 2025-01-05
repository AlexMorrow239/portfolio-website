import { motion } from 'framer-motion';
import { Briefcase, Building2, Calendar, ExternalLink } from 'lucide-react';
import './Professional.scss';
import React from 'react';

const Professional: React.FC = () => (
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
      {/* Bonsai Applied Computations Group */}
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
            <h3>Bonsai Applied Computations Group</h3>
          </div>
        </div>

        <div className="professional__position">
          <motion.div
            className="professional__position-card"
            whileHover={{ x: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h4>Research Analyst</h4>
            <div className="about__inline-icon professional__date">
              <Calendar className="icon" />
              <span>Mar 2024 - Present</span>
            </div>
            <p>
              I'm diving deep into the fascinating world of statistical arbitrage, where I get to
              combine my passion for data science with financial markets. I've developed a
              comprehensive toolkit for analyzing trading pairs, including a Jupyter notebook that
              uses k-means clustering and LSTM models to identify optimal entry and exit points.
              It's been incredibly rewarding to see how machine learning can uncover hidden patterns
              in market data.
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
            <h4>Teaching Assistant</h4>
            <div className="about__inline-icon professional__date">
              <Calendar className="icon" />
              <span>Jan 2024 - Present</span>
            </div>
            <p>
              I've had the unique opportunity to explore the intersection of criminal justice and
              data science, conducting an in-depth analysis on capital punishment's relationship
              with national murder rates. This project has allowed me to apply statistical methods
              to real-world policy questions, making complex data accessible and meaningful for
              policy discussions.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Captain Fanplastic */}
      <motion.div
        className="professional__role"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="professional__role-header">
          <div className="about__inline-icon">
            <Building2 className="icon" />
            <h3>Captain Fanplastic</h3>
          </div>
        </div>

        <div className="professional__position">
          <motion.div
            className="professional__position-card"
            whileHover={{ x: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h4>Software Engineer</h4>
            <div className="about__inline-icon professional__date">
              <Calendar className="icon" />
              <span>May 2024 - Jun 2024</span>
            </div>
            <p>
              I had the incredible opportunity to work with a charity focused on ocean conservation,
              where I helped build a donation platform that could handle transactions from anywhere
              in the world. Using React.js and MongoDB, we created a seamless experience that made
              it easy for global supporters to contribute to the cause. It was amazing to see how
              technology could directly impact environmental conservation efforts.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Quest for Success */}
      <motion.div
        className="professional__role"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="professional__role-header">
          <div className="about__inline-icon">
            <Building2 className="icon" />
            <h3>Quest for Success</h3>
          </div>
        </div>

        <div className="professional__position">
          <motion.div
            className="professional__position-card"
            whileHover={{ x: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h4>Tutoring Director</h4>
            <div className="about__inline-icon professional__date">
              <Calendar className="icon" />
              <span>May 2020 - Jul 2023</span>
            </div>
            <p>
              Leading a tutoring team at this college preparatory program was one of my most
              rewarding experiences. We worked closely with students to not just improve their
              academic performance, but to build their confidence and problem-solving skills. It was
              incredible to see our students grow and achieve their educational goals.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

export default Professional;
