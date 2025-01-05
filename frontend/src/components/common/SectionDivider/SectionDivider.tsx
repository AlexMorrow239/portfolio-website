import React from 'react';
import { Terminal, Database, Code } from 'lucide-react';
import './SectionDivider.scss';

interface SectionDividerProps {
  variant?: 'code' | 'terminal' | 'database' | 'binary' | 'minimal';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'code',
  spacing = 'xl',
  className = '',
}) => {
  const getIcon = (): JSX.Element | null => {
    switch (variant) {
      case 'code':
        return <Code className="section-divider__icon" />;
      case 'terminal':
        return <Terminal className="section-divider__icon" />;
      case 'database':
        return <Database className="section-divider__icon" />;
      case 'binary':
        return null;
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        section-divider 
        section-divider--${variant} 
        section-divider--${spacing}
        ${className}
      `}
    >
      {variant !== 'minimal' && <div className="section-divider__content">{getIcon()}</div>}
    </div>
  );
};

export default SectionDivider;
