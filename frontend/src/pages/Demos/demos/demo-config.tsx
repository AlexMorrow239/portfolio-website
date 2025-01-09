import { Terminal } from 'lucide-react';

import { DemoInfo } from '../types';

export const availableDemos: DemoInfo[] = [
  {
    id: 'three-sat-solver',
    title: 'SAT Solver Demo',
    description:
      'Interactive demonstration of a Python-based SAT solver running in a secure Docker container',
    icon: <Terminal size={24} />,
    tags: ['Python', 'Docker', 'Backend'],
    path: '/demos/three-sat-solver',
    githubUrl: 'https://github.com/yourusername/your-repo',
    docsUrl: 'https://your-documentation-link.com',
  },
  // Add more demos here as needed
];
