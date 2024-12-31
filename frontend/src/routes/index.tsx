import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./admin/adminRoutes";
import { publicRoutes } from "./public/publicRoutes";

export const router = createBrowserRouter([...publicRoutes, ...adminRoutes]);
