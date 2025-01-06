import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { APP_CONFIG } from '@/config';
import { type Project, type ProjectFormData, type ProjectFormErrors } from '@/types/project';

export const useProjectForm = (
  mode: 'create' | 'edit',
  projectId?: string,
): {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  errors: ProjectFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<ProjectFormErrors>>;
  loading: boolean;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  imageRemoved: boolean;
  setImageRemoved: React.Dispatch<React.SetStateAction<boolean>>;
  validateForm: () => boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
} => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    technologies: [],
    skills: [],
    featured: false,
    visible: true,
    links: {},
  });
  const [errors, setErrors] = useState<ProjectFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && projectId) {
      void fetchProject(projectId);
    }
  }, [mode, projectId]);

  const fetchProject = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(APP_CONFIG.endpoints.projects.byId(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project data');
      }

      const projectData: unknown = await response.json();
      const project: Project = projectData as Project;

      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        skills: project.skills,
        featured: project.featured,
        visible: project.visible,
        links: project.links,
      });

      if (project.imageUrl) {
        setImagePreview(project.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ProjectFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    // Validate URLs if provided
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (formData.links.github && !urlRegex.test(formData.links.github)) {
      newErrors.links = { ...newErrors.links, github: 'Invalid GitHub URL' };
    }
    if (formData.links.live && !urlRegex.test(formData.links.live)) {
      newErrors.links = { ...newErrors.links, live: 'Invalid Live URL' };
    }
    if (formData.links.documentation && !urlRegex.test(formData.links.documentation)) {
      newErrors.links = { ...newErrors.links, documentation: 'Invalid Documentation URL' };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'technologies' || key === 'skills' || key === 'links') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      // Handle image state
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      } else if (imageRemoved) {
        formDataToSend.append('removeImage', 'true');
      }

      const endpoint =
        mode === 'create'
          ? APP_CONFIG.endpoints.projects.base
          : APP_CONFIG.endpoints.projects.byId(projectId!);

      const response = await fetch(endpoint, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      void navigate('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    loading,
    selectedImage,
    setSelectedImage,
    imagePreview,
    setImagePreview,
    imageRemoved,
    setImageRemoved,
    validateForm,
    handleSubmit,
  };
};
