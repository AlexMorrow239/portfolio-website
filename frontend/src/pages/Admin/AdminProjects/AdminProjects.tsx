import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Project } from '@/types/project';
import { ProjectsService } from '@/services/projects.service';
import { APP_CONFIG } from '@/config';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchProjects = async (): Promise<void> => {
    try {
      const data = await ProjectsService.getAllProjectsAdmin();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects: ', err);
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProjects();
  }, []);

  const toggleVisibility = async (id: string, currentVisibility: boolean): Promise<void> => {
    try {
      const projectData = {
        visible: !currentVisibility,
      };

      const response = await fetch(APP_CONFIG.endpoints.projects.byId(id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to update project visibility');
      }

      // Update local state to reflect the change
      setProjects(
        projects.map((project) =>
          project._id === id ? { ...project, visible: !project.visible } : project,
        ),
      );
    } catch (err) {
      console.error('Toggle visibility error:', err);
      setError('Failed to update project visibility');
    }
  };

  const deleteProject = async (id: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(APP_CONFIG.endpoints.projects.byId(id), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      // Show success message
      setSuccessMessage('Project deleted successfully');

      // Refresh the projects list
      await fetchProjects();

      // Clear message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error deleting project: ', err);
      setError('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="admin-projects">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-projects">
      <div className="admin-header">
        <h1>Manage Projects</h1>
        <Link to="/admin/projects/new" className="btn btn--primary">
          <Plus size={20} />
          New Project
        </Link>
      </div>

      {error && <div className="alert alert--error">{error}</div>}
      {successMessage && <div className="alert alert--success">{successMessage}</div>}

      <div className="projects-grid">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            className="project-card"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="project-card__header">
              <h3>{project.title}</h3>
              <div className="project-card__actions">
                <button
                  onClick={() => toggleVisibility(project._id, project.visible)}
                  className={`btn btn--icon ${project.visible ? 'btn--primary' : 'btn--secondary'}`}
                  title={project.visible ? 'Hide project' : 'Show project'}
                >
                  {project.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <Link
                  to={`/admin/projects/edit/${project._id}`}
                  className="btn btn--icon btn--secondary"
                  title="Edit project"
                >
                  <Edit2 size={18} />
                </Link>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="btn btn--icon btn--danger"
                  title="Delete project"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="project-card__description">{project.description}</p>
            <div className="project-card__meta">
              <div className="project-card__tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
              {project.featured && <span className="badge badge--featured">Featured</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
