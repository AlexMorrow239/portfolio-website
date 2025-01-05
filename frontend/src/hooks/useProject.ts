import { useState, useCallback, useEffect, useRef } from 'react';
import { type Project } from '@/types/project';
import { ProjectsService } from '@/services/projects.service';

export const useProjects = (): {
  projects: Project[];
  isLoading: boolean;
  showLoader: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  fetchProjects: () => Promise<void>;
} => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      loaderTimeoutRef.current = setTimeout(() => {
        setShowLoader(true);
      }, 300);

      const fetchedProjects = await ProjectsService.getAllProjects();
      setProjects(fetchedProjects);

      if (showLoader) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
      console.error('Failed to fetch projects:', error);
      setError(errorMessage);
    } finally {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
      setIsLoading(false);
      setShowLoader(false);
    }
  }, [showLoader]);

  useEffect(() => {
    void fetchProjects();
    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, [fetchProjects]);

  return { projects, isLoading, showLoader, setShowLoader, error, fetchProjects };
};
