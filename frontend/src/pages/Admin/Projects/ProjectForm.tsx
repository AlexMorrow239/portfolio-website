import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, ArrowLeft, Save, Link as LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateProjectDto } from "@/types/project";
import { APP_CONFIG } from "@/config";

interface ProjectFormProps {
  mode: "create" | "edit";
}

const ProjectForm: React.FC<ProjectFormProps> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectDto>();

  // Fetch existing project data when in edit mode
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchProject = async () => {
        try {
          const response = await fetch(APP_CONFIG.endpoints.projects.byId(id), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch project");
          }

          const project = await response.json();

          // Set form data
          reset({
            title: project.title,
            description: project.description,
            featured: project.featured,
            visible: project.visible,
            links: project.links,
          });

          // Set technologies
          setTechnologies(project.technologies);

          // Set image preview if exists
          if (project.imageUrl) {
            setImagePreview(project.imageUrl);
          }
        } catch (err) {
          console.error("Error fetching project:", err);
          setError("Failed to load project data");
        }
      };

      fetchProject();
    }
  }, [mode, id, reset]);

  const handleAddTechnology = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = techInput.trim();
      if (value && !technologies.includes(value)) {
        setTechnologies([...technologies, value]);
        setTechInput("");
      }
    }
  };

  const handleRemoveTechnology = (indexToRemove: number) => {
    setTechnologies(technologies.filter((_, index) => index !== indexToRemove));
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = skillInput.trim();
      if (value && !skills.includes(value)) {
        setSkills([...skills, value]);
        setSkillInput("");
      }
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = async (data: CreateProjectDto) => {
    try {
      setSubmitting(true);
      setError(null);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("technologies", JSON.stringify(technologies));
      formData.append("skills", JSON.stringify(skills));
      formData.append("featured", String(data.featured));
      formData.append("visible", String(data.visible));
      formData.append("links", JSON.stringify(data.links));

      // Append image if a new one is selected
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const endpoint =
        mode === "create"
          ? APP_CONFIG.endpoints.projects.base
          : APP_CONFIG.endpoints.projects.byId(id!);

      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save project");
      }

      navigate("/admin/projects");
    } catch (err) {
      console.error("Error in form submission:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="project-form">
      <div className="admin-header">
        <div className="admin-header__title">
          <button
            onClick={() => navigate("/admin/projects")}
            className="button button--icon"
          >
            <ArrowLeft size={20} />
          </button>
          <h1>{mode === "create" ? "Create New Project" : "Edit Project"}</h1>
        </div>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form__grid">
          <div className="form__main">
            <div className="form-group">
              <label htmlFor="title">Project Title *</label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "Title is required" })}
                className={errors.title ? "error" : ""}
              />
              {errors.title && (
                <span className="error-message">{errors.title.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                rows={5}
                {...register("description", {
                  required: "Description is required",
                })}
                className={errors.description ? "error" : ""}
              />
              {errors.description && (
                <span className="error-message">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Technologies *</label>
              <div className="tags-input">
                <input
                  type="text"
                  placeholder="Add technology and press Enter"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleAddTechnology}
                />
                <div className="tags-list">
                  {technologies.map((tech, index) => (
                    <span key={index} className="tag">
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(index)}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Skills *</label>
              <div className="tags-input">
                <input
                  type="text"
                  placeholder="Add skill and press Enter"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                />
                <div className="tags-list">
                  {skills.map((skill, index) => (
                    <span key={index} className="tag">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Project Image</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedImage(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
              {imagePreview && (
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "200px" }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form__sidebar">
            <div className="form-card">
              <h3>Project Settings</h3>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" {...register("featured")} />
                  Featured Project
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" {...register("visible")} />
                  Visible
                </label>
              </div>

              <div className="form-group">
                <label>Links</label>
                <div className="input-group">
                  <LinkIcon size={18} />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    {...register("links.github")}
                  />
                </div>
                <div className="input-group">
                  <LinkIcon size={18} />
                  <input
                    type="url"
                    placeholder="Live URL"
                    {...register("links.live")}
                  />
                </div>
                <div className="input-group">
                  <LinkIcon size={18} />
                  <input
                    type="url"
                    placeholder="Documentation URL"
                    {...register("links.documentation")}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="button button--primary button--block"
              disabled={submitting}
            >
              {submitting ? (
                "Saving..."
              ) : (
                <>
                  <Save size={18} />
                  Save Project
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
