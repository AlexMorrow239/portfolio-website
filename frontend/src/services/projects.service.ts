import { APP_CONFIG } from '../config';
import { type Project } from '../types/project';

interface ErrorResponse {
  message?: string;
  error?: {
    message?: string;
  };
}

export const ProjectsService = {
  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await fetch(APP_CONFIG.endpoints.projects.base);

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.message ?? 'Failed to fetch projects');
      }

      const data = (await response.json()) as Project[];

      return data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },

  async getAllProjectsAdmin(): Promise<Project[]> {
    try {
      const response = await fetch(APP_CONFIG.endpoints.projects.admin, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const data = (await response.json()) as ErrorResponse | Project[];

      if (!response.ok) {
        const errorData = data as ErrorResponse;
        throw new Error(errorData.error?.message ?? 'Failed to fetch projects');
      }

      return data as Project[];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  },

  async getProjectById(id: string): Promise<Project | null> {
    try {
      const response = await fetch(APP_CONFIG.endpoints.projects.byId(id));
      const data = (await response.json()) as ErrorResponse | Project;

      if (!response.ok) {
        const errorData = data as ErrorResponse;
        throw new Error(errorData.error?.message ?? 'Failed to fetch project');
      }

      return data as Project;
    } catch (error) {
      console.error('Failed to fetch project:', error);
      return null;
    }
  },
};
