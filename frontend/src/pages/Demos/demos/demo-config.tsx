import { Terminal } from 'lucide-react';

import { DemoInfo } from '../types';

export const availableDemos: DemoInfo[] = [
  {
    id: 'three-sat-solver',
    title: 'SAT Solver Demo',
    description:
      'Explore the demo here. If youre interested I cover the topic in more depth on my github. Just go to this repo!',
    icon: <Terminal size={24} />,
    tags: ['Python', 'Docker', 'Backend'],
    path: '/demos/three-sat-solver',
    githubUrl: 'https://github.com/yourusername/your-repo',
    docsUrl: 'https://your-documentation-link.com',
  },
  // Add more demos here as needed
];
