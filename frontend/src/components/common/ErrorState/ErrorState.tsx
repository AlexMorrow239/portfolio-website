import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <motion.div
    className="projects__error"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Terminal size={32} className="error-icon" />
    <h3>Error Loading Projects</h3>
    <p>{message}</p>
    <button className="btn btn--primary" onClick={onRetry}>
      Try Again
    </button>
  </motion.div>
);
