import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./adminRoutes";
import MainLayout from "@components/layout/MainLayout/MainLayout";
import Home from "@/pages/Home/Home";
import Projects from "@/pages/Projects/Projects";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  ...adminRoutes,
]);
