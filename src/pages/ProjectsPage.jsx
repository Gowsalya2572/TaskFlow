
import { useState } from "react";
import { Plus, FolderKanban } from "lucide-react";

import useProjectStore from "../store/projectStore";
import ProjectCard from "../components/project/ProjectCard";
import ProjectForm from "../components/project/ProjectForm";
import { deleteTasksByProject } from "../services/taskService";

const ProjectsPage = () => {
  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);
  const editProject = useProjectStore((state) => state.editProject);
  const removeProject = useProjectStore((state) => state.removeProject);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCreate = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleSubmit = (formData) => {
    if (selectedProject) {
      editProject(selectedProject.id, formData);
    } else {
      addProject(formData);
    }

    setIsFormOpen(false);
    setSelectedProject(null);
  };

  const handleDelete = (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project and its tasks?"
    );

    if (!confirmed) return;

    deleteTasksByProject(projectId);
    removeProject(projectId);
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">
            Projects
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage and track all your projects.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <FolderKanban size={17} />
        {projects.length} Projects
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white p-12 text-center">
          <FolderKanban className="mx-auto text-text-secondary" size={36} />
          <h2 className="mt-4 font-semibold text-text-main">
            No projects yet
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Create your first project to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsFormOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-form-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2
              id="project-form-title"
              className="mb-5 text-xl font-bold text-text-main"
            >
              {selectedProject ? "Edit Project" : "Create Project"}
            </h2>

            <ProjectForm
              project={selectedProject}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectsPage;
