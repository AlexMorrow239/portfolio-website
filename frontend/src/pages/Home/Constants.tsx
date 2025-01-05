import {
  Server,
  Database,
  Workflow,
  Lock,
  Terminal,
  Code,
  Cpu,
  GitBranch,
  Boxes,
} from 'lucide-react';
import { type Skill, type Metric, type Circle } from '@/types/home';

// Background circle positions for the hero section\
export const circles: Circle[] = [
  { x: '10%', y: '20%', size: 80, delay: 0 },
  { x: '85%', y: '15%', size: 120, delay: 0.2 },
  { x: '70%', y: '60%', size: 100, delay: 0.4 },
  { x: '20%', y: '75%', size: 140, delay: 0.6 },
];

export const skills: Skill[] = [
  {
    icon: <Server size={24} />,
    title: 'Backend Engineering',
    description:
      'Architecting robust server systems and APIs that prioritize performance, scalability, and clean code architecture',
  },
  {
    icon: <Database size={24} />,
    title: 'Database Systems',
    description:
      'Designing efficient database schemas and implementing optimized query patterns using MongoDB, PostgreSQL, and modern ORMs',
  },
  {
    icon: <Workflow size={24} />,
    title: 'System Architecture',
    description:
      'Building scalable distributed systems with a focus on microservices, API design, and efficient data processing pipelines',
  },
  {
    icon: <Lock size={24} />,
    title: 'Security & Authentication',
    description: 'Implementing robust security measures and OAuth2/JWT authentication systems',
  },
  {
    icon: <Terminal size={24} />,
    title: 'Tech Explorer',
    description:
      'Constantly discovering and implementing cutting-edge tools and frameworks to enhance development efficiency',
  },
  {
    icon: <Code size={24} />,
    title: 'Algorithm Enthusiast',
    description:
      'Deep passion for computational problem-solving, from optimizing complex algorithms to implementing efficient data structures',
  },
];

export const metrics: Metric[] = [
  {
    icon: <Cpu size={24} />,
    label: 'Systems Built',
    value: '5+',
    description: 'Including distributed backends and data pipelines',
  },
  {
    icon: <GitBranch size={24} />,
    label: 'Technologies',
    value: '15+',
    description: 'From Node.js to advanced cloud services',
  },
  {
    icon: <Boxes size={24} />,
    label: 'Code Quality',
    value: 'A+',
    description: 'Emphasis on clean, maintainable architecture',
  },
];
