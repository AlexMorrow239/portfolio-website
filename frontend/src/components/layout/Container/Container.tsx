// src/components/layout/Container/Container.tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', fluid = false }) => {
  return (
    <div className={`container ${fluid ? 'container--fluid' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
};

export default Container;
