import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProjectForm } from '@/hooks/useProjectForm';
import ImageUpload from '@/pages/Admin/ProjectForm/ImageUpload/ImageUpload';
import TagInput from '@/pages/Admin/ProjectForm/TagInput/TagInput';
import './ProjectForm.scss';

interface ProjectFormProps {
  mode: 'create' | 'edit';
}

const ProjectForm: React.FC<ProjectFormProps> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    errors,
    loading,
    setSelectedImage,
    imagePreview,
    setImagePreview,
    handleSubmit,
  } = useProjectForm(mode, id);

  return (
    <div className="project-form">
      <div className="project-form__header">
        <button
          onClick={() => {
            void navigate('/admin/projects');
          }}
          className="btn btn--icon btn--secondary"
          title="Back to projects"
        >
          <ArrowLeft size={20} />
        </button>
        <h1>{mode === 'create' ? 'Create New Project' : 'Edit Project'}</h1>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <motion.form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="project-form__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className={errors.title ? 'error' : ''}
              placeholder="Enter project title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className={errors.description ? 'error' : ''}
              placeholder="Describe your project..."
              rows={5}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Project Image</label>
            <ImageUpload
              imagePreview={imagePreview}
              onImageSelect={(file) => {
                setSelectedImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }}
              onImageRemove={() => {
                setSelectedImage(null);
                setImagePreview(null);
              }}
              error={errors.image}
            />
          </div>

          <div className="form-group">
            <label>Technologies *</label>
            <TagInput
              tags={formData.technologies}
              onTagsChange={(newTags) =>
                setFormData((prev) => ({ ...prev, technologies: newTags }))
              }
              placeholder="Add technology (e.g., React, Node.js)..."
              error={errors.technologies}
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <TagInput
              tags={formData.skills}
              onTagsChange={(newTags) => setFormData((prev) => ({ ...prev, skills: newTags }))}
              placeholder="Add skill (e.g., Frontend Development, API Design)..."
              error={errors.skills}
            />
          </div>

          <div className="form-group">
            <label>Project Links</label>
            <div className="links-group">
              <div className="form-group">
                <label htmlFor="githubLink">
                  <LinkIcon size={16} /> GitHub URL
                </label>
                <input
                  type="url"
                  id="githubLink"
                  value={formData.links.github ?? ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      links: { ...prev.links, github: e.target.value },
                    }))
                  }
                  placeholder="https://github.com/username/project"
                />
                {errors.links?.github && (
                  <span className="error-message">{errors.links.github}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="liveLink">
                  <LinkIcon size={16} /> Live URL
                </label>
                <input
                  type="url"
                  id="liveLink"
                  value={formData.links.live ?? ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      links: { ...prev.links, live: e.target.value },
                    }))
                  }
                  placeholder="https://your-project.com"
                />
                {errors.links?.live && <span className="error-message">{errors.links.live}</span>}
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                />
                Featured Project
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.visible}
                  onChange={(e) => setFormData((prev) => ({ ...prev, visible: e.target.checked }))}
                />
                Visible
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => {
                void navigate('/admin/projects');
              }}
              className="btn btn--secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              <Save size={20} />
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default ProjectForm;
