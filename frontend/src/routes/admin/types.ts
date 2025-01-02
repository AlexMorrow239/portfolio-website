import { AppRouteObject } from "../types";

// Admin-specific route types
export type AdminRouteObject = AppRouteObject & {
  requiresAuth: true; // Always true for admin routes
  permissions?: Array<"admin" | "editor" | "viewer">;
  children?: AdminRouteObject[];
};

// Type for the Project form modes
export type ProjectFormMode = "create" | "edit";