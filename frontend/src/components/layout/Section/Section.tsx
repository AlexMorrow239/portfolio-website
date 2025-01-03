import { ReactNode } from 'react';
import Container from '../Container/Container';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  fluid?: boolean;
}

export const Section = ({ children, id, className = '', fluid = false }: SectionProps) => {
  return (
    <section id={id} className={`section ${className}`}>
      <Container fluid={fluid}>{children}</Container>
    </section>
  );
};
