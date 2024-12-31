import { Navigate, RouteObject } from "react-router-dom";
import AdminLayoutWrapper from "@/pages/Admin/AdminLayoutWrapper";
import AdminProjects from "@/pages/Admin/Projects/AdminProjects";
import ProjectForm from "@/pages/Admin/Projects/ProjectForm";
import { Login } from "@/pages/Admin/Login/Login";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayoutWrapper />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/projects" replace />,
      },
      {
        path: "projects",
        children: [
          {
            index: true,
            element: <AdminProjects />,
          },
          {
            path: "new",
            element: <ProjectForm mode="create" />,
          },
          {
            path: "edit/:id",
            element: <ProjectForm mode="edit" />,
          },
        ],
      },
    ],
  },
];
