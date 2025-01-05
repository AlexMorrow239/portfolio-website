import { useState, useCallback, useEffect } from 'react';
import { type Project } from '@/types/project';
import { ProjectsService } from '@/services/projects.service';

export const useProjects = (): {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
} => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedProjects = await ProjectsService.getAllProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
      console.error('Failed to fetch projects:', error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  return { projects, isLoading, error, fetchProjects };
};
