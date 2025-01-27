export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectLinks {
  github?: string;
  live?: string;
  documentation?: string;
  demo?: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  technologies: string[];
  skills: string[];
  imageUrl?: string;
  featured: boolean;
  visible: boolean;
  links: ProjectLinks;
}

export interface ProjectFormErrors {
  title?: string;
  description?: string;
  technologies?: string;
  skills?: string;
  image?: string;
  links?: ProjectLinks;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  skills: string[];
  imageUrl?: string;
  featured: boolean;
  visible: boolean;
  metrics?: Record<string, string>;
  links: ProjectLinks;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  technologies: { value: string }[];
  skills: { value: string }[];
  imageUrl?: string;
  featured?: boolean;
  visible?: boolean;
  metrics?: Record<string, string>;
  links?: ProjectLinks;
}

export type UpdateProjectDto = Partial<CreateProjectDto>;

// Response types for API calls
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
