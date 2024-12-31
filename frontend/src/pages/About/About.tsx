import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  GraduationCap,
  Cpu,
  Code,
  Activity,
  Dumbbell,
  Mountain,
  TreePine,
} from "lucide-react";
import "./About.scss";

const About: React.FC = () => {
  const techStack = {
    "Programming Languages": [
      "Java",
      "Python",
      "C",
      "C++",
      "R",
      "SQL",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    "Tools & Platforms": [
      "AWS",
      "Google Cloud Storage",
      "GitHub",
      "Postman",
      "Node.js",
      "React.js",
      "MongoDB",
    ],
    "Libraries & Frameworks": [
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "PyTorch",
      "Express",
      "Multer",
      "Mongoose",
    ],
  };

  const experiences = [
    {
      year: "Mar 2024 - Present",
      role: "Research Analyst",
      company: "Bonsai Applied Computations Group",
      location: "Coral Gables, Florida",
      type: "Internship",
      description: [
        "Conducted various forms of statistical analysis to identify ideal candidates for statistical arbitrage pairs trading strategies",
        "Put together in-depth/comprehensive backtests to test strategies over a fixed period of historical data",
        "Calculated, analyzed, and visualized performance results (realized profit and loss, Sharpe ratio, drawdowns, etc.) upon receiving backtest results",
        "Developed a Jupyter notebook for identifying ideal pair-candidates through k-means clustering and forecasting optimal entry and exit positions through an LSTM (long-short term model)",
        "Participated in IMC's Prosperity-2, a 15-day long intensive algorithmic trading competition",
      ],
      skills: ["Statistical Data Analysis", "Data Visualization"],
    },
    {
      year: "Jan 2024 - Present",
      role: "Teaching Assistant",
      company: "University of Miami",
      location: "Coral Gables, Florida",
      type: "Part-time",
      description: [
        "Demonstrated mastery of course material by conducting my own analysis on the efficacy of capital punishment with regards to decreasing the national murder rate",
        "Job responsibilities include providing guidance to students during office hours and feedback on assignments",
      ],
      skills: ["Data Analysis", "Big Data"],
    },
    {
      year: "May 2024 - Jun 2024",
      role: "Software Engineer",
      company: "Captain Fanplastic",
      location: "City of Cape Town, South Africa",
      type: "Internship",
      description: [
        "Conducted research and selected third party payment platform based on specified criterion",
        "Extensively researched payment platform API documentation, and used the API to integrate the payment platform seamlessly into the webpage",
        "Designed and built out a relational database structure that could process user, individual transaction, and donation goal data effectively. The database design was critical in correctly creating the tax receipts",
        "Ensured the webpage flowed seamlessly from the existing website. This included recreating certain components of the original website such as the navigation bar and footer. Additionally, this included using the Mailchimp API to subscribe email addresses to the charity's newsletter",
      ],
      skills: ["React.js", "MongoDB"],
    },
  ];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="about">
      {/* Introduction Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants}
        className="about__section about__intro"
      >
        <Terminal className="about__section-icon" />
        <h1>Full-Stack Developer with Backend Passion</h1>
        <p>
          While I enjoy crafting complete solutions across the stack, my true
          passion lies in backend engineering and systems design. I thrive on
          building robust architectures, optimizing performance, and solving
          complex computational challenges that power modern applications.
        </p>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants}
        className="about__section"
      >
        <div className="about__section-title">
          <GraduationCap className="icon" />
          <h2>Educational Journey</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="education"
        >
          <h3>University of Miami</h3>
          <div className="education__details">
            <p>B.S. in Computer Science and Data Science/AI (GPA: 3.882)</p>
            <p>M.S. in Computer Science (4+1 Program)</p>
            <p>Minor in Mathematics</p>
          </div>
          <p className="education__note">
            Completed all undergraduate computer science coursework, on track to
            graduate with both degrees in 2027
          </p>
        </motion.div>
      </motion.section>

      {/* Technical Arsenal Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants}
        className="about__section"
      >
        <div className="about__section-title">
          <Cpu className="icon" />
          <h2>Technical Arsenal</h2>
        </div>
        <div className="tech-stack">
          {Object.entries(techStack).map(([category, items], index) => (
            <motion.div
              key={category}
              className="tech-stack__card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{category}</h3>
              <div className="tech-stack__tags">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Professional Journey Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants}
        className="about__section"
      >
        <div className="about__section-title">
          <Code className="icon" />
          <h2>Professional Journey</h2>
        </div>
        <div className="experience">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience__timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="experience__card">
                <div className="experience__card-date">{exp.year}</div>
                <h3 className="experience__card-role">{exp.role}</h3>
                <h4 className="experience__card-company">
                  {exp.company} • {exp.location}
                </h4>
                <ul className="experience__card-details">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Personal Interests Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants}
        className="about__section"
      >
        <div className="about__section-title">
          <TreePine className="icon" />
          <h2>Beyond the Code</h2>
        </div>
        <div className="interests">
          <motion.div
            className="interests__grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              staggerChildren: 0.1,
            }}
          >
            <motion.div
              className="interests__card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="interests__card-header">
                <Dumbbell className="interests__card-icon" />
                <h3>Fitness Journey</h3>
              </div>
              <p>
                I've been weightlifting about 4 years now and absolutely love
                it. Recently, I've gotten really into triathlons - there's
                something amazing about pushing your limits across different
                disciplines. My next big goal? Training for an Ironman. It's a
                huge challenge, but that's what makes it exciting!
              </p>
            </motion.div>

            <motion.div
              className="interests__card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="interests__card-header">
                <Mountain className="interests__card-icon" />
                <h3>The Great Outdoors</h3>
              </div>
              <p>
                Give me a tough mountain trail and a beautiful sunrise, and I'm
                in my happy place. I love traveling to mountainous regions and
                finding challenging hikes. There's nothing quite like reaching
                the summit as the sun comes up - it's the perfect reward for an
                early morning start!
              </p>
            </motion.div>

            <motion.div
              className="interests__card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="interests__card-header">
                <Activity className="interests__card-icon" />
                <h3>Tech Meets Fitness</h3>
              </div>
              <p>
                I'm a bit of a data nerd when it comes to fitness tracking. I
                use everything from an Apollo Neuro to an Oura Ring and Apple
                Watch to track my biometrics. I'm collecting all this data with
                the hope of doing some cool AI projects with it someday. Who
                knows what patterns I might find?
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
