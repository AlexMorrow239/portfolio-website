import { RouteObject } from 'react-router-dom';

// Base route type extending React Router's RouteObject
export type AppRouteObject = RouteObject & {
  title?: string; // For page titles
  requiresAuth?: boolean; // For protected routes
  permissions?: string[]; // For role-based access
  meta?: {
    // Additional metadata
    breadcrumb?: string;
    icon?: string;
    hideInMenu?: boolean;
  };
  children?: AppRouteObject[];
};
