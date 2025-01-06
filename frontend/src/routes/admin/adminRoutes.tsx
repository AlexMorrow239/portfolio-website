import { Navigate } from 'react-router-dom';

import AdminLayoutWrapper from '@/pages/Admin/AdminLayoutWrapper/AdminLayoutWrapper';
import AdminProjects from '@/pages/Admin/AdminProjects/AdminProjects';
import { Login } from '@/pages/Admin/Login/Login';
import ProjectForm from '@/pages/Admin/ProjectForm/ProjectForm';

import { AuthGuard } from '@components/auth/AuthGuard';

import { type AdminRouteObject } from './types';

export const adminRoutes: AdminRouteObject[] = [
  {
    path: '/admin/login',
    element: <Login />,
    title: 'Admin Login',
    requiresAuth: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: '/admin',
    element: (
      <AuthGuard>
        <AdminLayoutWrapper />
      </AuthGuard>
    ),
    title: 'Admin Dashboard',
    requiresAuth: true,
    permissions: ['admin'],
    children: [
      {
        index: true,
        element: <Navigate to="/admin/projects" replace />,
        requiresAuth: true,
      },
      {
        path: 'projects',
        requiresAuth: true,
        permissions: ['admin', 'editor'],
        children: [
          {
            index: true,
            element: <AdminProjects />,
            title: 'Projects',
            requiresAuth: true,
            meta: {
              breadcrumb: 'Projects',
              icon: 'project', // if you're using icons
            },
          },
          {
            path: 'new',
            element: <ProjectForm mode="create" />,
            title: 'New Project',
            requiresAuth: true,
            permissions: ['admin', 'editor'],
            meta: {
              breadcrumb: 'New Project',
            },
          },
          {
            path: 'edit/:id',
            element: <ProjectForm mode="edit" />,
            title: 'Edit Project',
            requiresAuth: true,
            permissions: ['admin', 'editor'],
            meta: {
              breadcrumb: 'Edit Project',
            },
          },
        ],
      },
    ],
  },
];
