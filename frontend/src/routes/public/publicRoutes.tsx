import About from '@/pages/About/About';
import Contact from '@/pages/Contact/Contact';
import Home from '@/pages/Home/Home';
import ProjectDetail from '@/pages/ProjectDetails/ProjectDetails';
import Projects from '@/pages/Projects/Projects';

import MainLayout from '@components/layout/MainLayout/MainLayout';

export const publicRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: <Projects />,
          },
          {
            path: ':id',
            element: <ProjectDetail />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
];
