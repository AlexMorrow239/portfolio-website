import { Project } from "../types/project";
import { APP_CONFIG } from "../config";

export const ProjectsService = {
  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await fetch(APP_CONFIG.endpoints.projects.base);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch projects");
      }

      return data;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      return [];
    }
  },

  async getAllProjectsAdmin(): Promise<Project[]> {
    try {
      const response = await fetch(APP_CONFIG.endpoints.projects.admin, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch projects");
      }

      return data;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      return [];
    }
  },

  async getProjectById(id: string): Promise<Project | null> {
    try {
      const response = await fetch(APP_CONFIG.endpoints.projects.byId(id));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch project");
      }

      return data;
    } catch (error) {
      console.error("Failed to fetch project:", error);
      return null;
    }
  },
};
