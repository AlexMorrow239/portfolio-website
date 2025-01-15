import React from 'react';

import { motion } from 'framer-motion';
import { Briefcase, Building2, Calendar, ExternalLink } from 'lucide-react';

import { defaultTransition, staggerTransition } from '@utils/animations/transitions';
import { fadeIn, fadeInUp, slideInLeft, staggerContainer } from '@utils/animations/variants';

import './Professional.scss';

interface Position {
  title: string;
  date: string;
  description: string;
}

interface Role {
  company: string;
  website?: string;
  positions: Position[];
}

const professionalData: Role[] = [
  {
    company: 'Bonsai Applied Computations Group',
    website: 'https://bonsaiacg.com',
    positions: [
      {
        title: 'Project Manager - Physics Data Aquisition & ML',
        date: 'Jan 2024 - Present',
        description:
          "I am leading an exciting project at the intersection of hardware engineering and data science, where we developed a complete data acquisition pipeline for behavioral neuroscience research. Using low-level C programming, we built a precise interface with NIDAQMX hardware to capture fruit fly behavior data - a challenge that required deep understanding of circuit architecture and careful management of digital signals. What made this project particularly fascinating was creating an end-to-end solution: from programming the hardware's clock and demultiplexer for accurate data collection, to designing an automated system that packages data into 30-minute snapshots and seamlessly uploads them to the cloud. It was incredibly rewarding to bridge the gap between intricate hardware control and modern data science, setting the stage for future machine learning analysis of behavioral patterns.",
      },
      {
        title: 'Research Analyst - Quantitative finance',
        date: 'Jan 2024 - May 2024',
        description:
          "I dove deep into the fascinating world of statistical arbitrage, where I get to combine my passion for data science with financial markets. I've developed a comprehensive toolkit for analyzing trading pairs, including a Jupyter notebook that uses k-means clustering and LSTM models to identify optimal entry and exit points. It's been incredibly rewarding to see how machine learning can uncover hidden patterns in market data.",
      },
    ],
  },
  {
    company: 'University of Miami',
    website: 'https://miami.edu',
    positions: [
      {
        title: 'Teaching Assistant - Statistical Analysis',
        date: 'Jan 2024 - Present',
        description:
          "As a Teaching Assistant for Statistical Analysis and Inference, I guided students through the fascinating world of statistical modeling and hypothesis testing. Whether we were diving into natural experiments, exploring real-world datasets using R, or creating compelling visualizations to tell data stories, I loved seeing students have those 'aha' moments. Seeing students transform from being intimidated by statistics to confidently conducting their own analyses was so rewarding.",
      },
      {
        title: 'Teaching Assistant - Computer Organization & Architecture',
        date: 'Jan 2025 - Present',
        description: "I haven't just began this position so we will see what is to come!",
      },
    ],
  },
  {
    company: 'Captain Fanplastic',
    website: 'https://captainfanplastic.com/',
    positions: [
      {
        title: 'Software Engineer Intern',
        date: 'May 2024 - June 2024',
        description:
          'I had the incredible opportunity to work with a charity focused on ocean conservation, where I helped build a donation platform that could handle transactions from anywhere in the world. Using React.js and MongoDB, we created a seamless experience that made it easy for global supporters to contribute to the cause. It was amazing to see how technology could directly impact environmental conservation efforts.',
      },
    ],
  },
  {
    company: 'Quest For Success',
    website: 'https://www.questforsuccess.com/',
    positions: [
      {
        title: 'Tutoring Director',
        date: 'May 2020 - July 2023',
        description:
          'I led a tutoring team at this college preparatory program. We worked closely with students to not just improve their academic performance, but to build their confidence and problem-solving skills. It was incredible to see our students grow and achieve their educational goals.',
      },
    ],
  },
];

const Professional: React.FC = () => (
  <motion.section
    className="about__section professional"
    variants={fadeInUp}
    transition={defaultTransition}
  >
    <motion.div className="about__section-header" variants={fadeIn} transition={defaultTransition}>
      <Briefcase className="icon" />
      <h2>Professional Journey</h2>
    </motion.div>

    <motion.div
      className="professional__timeline"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={staggerTransition(0.2)}
    >
      {professionalData.map((role, index) => (
        <motion.div
          key={index}
          className="professional__role"
          variants={slideInLeft}
          transition={defaultTransition}
        >
          <motion.div className="professional__role-header" variants={fadeIn}>
            <div className="about__inline-icon">
              <Building2 className="icon" />
              <h3>{role.company}</h3>
            </div>
            {role.website && (
              <a
                href={role.website}
                target="_blank"
                rel="noopener noreferrer"
                className="professional__company-link"
              >
                <ExternalLink className="icon" />
              </a>
            )}
          </motion.div>

          <div className="professional__positions">
            {role.positions.map((position, posIndex) => (
              <motion.div key={posIndex} className="professional__position" variants={fadeIn}>
                <motion.div
                  className="professional__position-card"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h4>{position.title}</h4>
                  <div className="about__inline-icon professional__date">
                    <Calendar className="icon" />
                    <span>{position.date}</span>
                  </div>
                  <p>{position.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.section>
);

export default Professional;
