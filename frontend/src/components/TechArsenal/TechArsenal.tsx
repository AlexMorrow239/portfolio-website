import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import './TechArsenal.scss';

interface Category {
  title: string;
  skills: string[];
  color: string;
}

const categories: Category[] = [
  {
    title: 'Programming Languages',
    skills: ['Java', 'Python', 'C', 'C++', 'R', 'SQL', 'JavaScript', 'HTML', 'CSS'],
    color: 'var(--color-blue)',
  },
  {
    title: 'Tools & Platforms',
    skills: ['AWS', 'Google Cloud Storage', 'GitHub', 'Postman', 'Node.js', 'React.js', 'MongoDB'],
    color: 'var(--color-green)',
  },
  {
    title: 'Libraries & Frameworks',
    skills: ['Pandas', 'NumPy', 'Scikit-Learn', 'PyTorch', 'Express', 'Multer', 'Mongoose'],
    color: 'var(--color-purple)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TechArsenal = () => {
  return (
    <motion.section
      className="technical-arsenal"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="technical-arsenal__title" variants={itemVariants}>
        <Cpu className="icon" />
        <h2>Technical Arsenal</h2>
      </motion.div>

      <div className="technical-arsenal__grid">
        {categories.map((category) => (
          <motion.div
            key={category.title}
            className="technical-arsenal__category"
            variants={itemVariants}
          >
            <h3>{category.title}</h3>
            <div className="technical-arsenal__skills">
              {category.skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="technical-arsenal__skill"
                  whileHover={{ y: -2 }} // Only animate the y-transform
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TechArsenal;
