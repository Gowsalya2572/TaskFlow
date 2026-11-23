
import { create } from "zustand";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

const useProjectStore = create((set) => ({
  projects: getProjects(),

  addProject: (projectData) => {
    const newProject = createProject(projectData);

    set((state) => ({
      projects: [newProject, ...state.projects],
    }));

    return newProject;
  },

  editProject: (projectId, updates) => {
    const updatedProject = updateProject(projectId, updates);

    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ? updatedProject : project
      ),
    }));

    return updatedProject;
  },

  removeProject: (projectId) => {
    deleteProject(projectId);

    set((state) => ({
      projects: state.projects.filter(
        (project) => project.id !== projectId
      ),
    }));
  },
}));

export default useProjectStore;
